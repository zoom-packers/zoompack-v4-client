let PartyAPI = Java.loadClass("io.sedu.mc.parties.api.helper.PartyAPI");

let BRONZE_COIN = 'dotcoinmod:bronze_coin';
let SILVER_COIN = 'dotcoinmod:silver_coin';
let GOLD_COIN = 'dotcoinmod:gold_coin';
let EMERALD_COIN = 'dotcoinmod:emerald_coin';
let DIAMOND_COIN = 'dotcoinmod:diamond_coin';

const FREE_INV_SPACE_REQ = 5;
const CONVERSION_RATE = 64;
const TOTAL_WALLET_CAP = 999 + 64 * 999 + 64 * 64 * 999 + 64 * 64 * 64 * 999 + 64 * 64 * 64 * 64 * 999;
const WALLET_COIN_MAX = 999;
const COIN_SLOTS = {
    'bronze': 'coinslot9',
    'silver': 'coinslot7',
    'gold': 'coinslot2',
    'emerald': 'coinslot13',
    'diamond': 'coinslot12'
}

let COINS = [BRONZE_COIN, SILVER_COIN, GOLD_COIN, EMERALD_COIN, DIAMOND_COIN];

let DIMENSION_MULTIPLIERS = {
    'minecraft:overworld': 1
};
let ECONOMY_DIFFICULTY_MULTIPLIERS = {
    "origins-classes:difficulty/easy": 0.8,
    "origins-classes:difficulty/normal": 1,
    "origins-classes:difficulty/hard": 1.2,
    "origins-classes:difficulty/brutal": 1.5,
    "origins-classes:difficulty/nightmare": 2,
    "origins-classes:difficulty/uninstall": 3,
    "default": 1,
}

let ALL_BOSSES = ['minecraft:elder_guardian', 'aquamirae:captain_cornelia', 'aquamirae:maze_mother', 'aquamirae:eel', 'bosses_of_mass_destruction:lich', 'bosses_of_mass_destruction:void_blossom', 'blue_skies:alchemist', 'blue_skies:arachnarch', 'blue_skies:arachnarch', 'blue_skies:summoner', 'aether:slider', 'lost_aether_content:aerwhale_king', 'aether:valkyrie', 'aether:sun_spirit', 'minecraft:wither', 'bosses_of_mass_destruction:gauntlet', 'callfromthedepth_:agonysoul', 'call_of_yucutan:kukulkan', 'call_of_yucutan:ah_puch', 'mokels_boss_mantyd:boss_mantyd', 'minecraft:ender_dragon', 'bosses_of_mass_destruction:obsidilith', 'theabyss:abyssaur', 'theabyss:elder', 'theabyss:nightblade_boss', 'theabyss:the_roka', 'theabyss:crystal_golem', 'theabyss:magician'];

let LAST_CONVERTED = {};

/**
 *
 * @param {ServerPlayer} player
 */
function getPlayerDifficultyMultiplierForEconomy(player) {
    let playerData = player.nbt.ForgeCaps;
    let playerDifficulty = playerData["origins:origins"].Origins["origins-classes:difficulty"];
    if (!ECONOMY_DIFFICULTY_MULTIPLIERS[playerDifficulty]) {
        return ECONOMY_DIFFICULTY_MULTIPLIERS['default'];
    }
    return ECONOMY_DIFFICULTY_MULTIPLIERS[playerDifficulty];
}

function getPlayerCoinCount(player, coin_type) {
    return player.nbt.getInt(COIN_SLOTS[coin_type]);
}

function setPlayerCoinCount(player, coin_type, coin_count, server){
    server.runCommandSilent(`/execute as ${player.name.string} run currency set @s ${coin_type} ${coin_count}`);
}

// this just adds to player, no source
function addPlayerBalance(player, coin_type, coin_count, server) {
    let new_coin_count = getPlayerCoinCount(player, coin_type) + coin_count;
    server.runCommandSilent(`/execute as ${player.name.string} run currency set @s ${coin_type} ${new_coin_count}`);
}

function subtractPlayerBalance(player, coin_type, coin_count, server) {
    let new_coin_count = getPlayerCoinCount(player, coin_type) - coin_count;
    server.runCommandSilent(`/execute as ${player.name.string} run currency set @s ${coin_type} ${new_coin_count}`);
}

function setPlayerCoinRemainer(player, coin_type, coint_amount) {
    player.persistentData.putFloat("wallet_remain_" + coin_type, coint_amount);
}

function getPlayerCoinRemainer(player, coin_type) {
    let wallet_coin_remain = player.persistentData.getFloat("wallet_remain_" + coin_type);
    if (wallet_coin_remain) {
        return wallet_coin_remain;
    }
    else {
        player.persistentData.putFloat("wallet_remain_" + coin_type, 0);
        return 0;
    }
}

function addPlayerCoinRemainer(player, coin_type, coint_amount_addition) {
    setPlayerCoinRemainer(player, coin_type, getPlayerCoinRemainer(player, coin_type) + coint_amount_addition);
}

function subtractPlayerCoinRemainer(player, coin_type, coin_subtract_amount) {
    setPlayerCoinRemainer(player, coin_type, getPlayerCoinRemainer(player, coin_type) - coin_subtract_amount);
}

function getPlayerFreeInventorySlotCount(player) {
    let count = 0;
    let inventory = player.inventory;
    for (let i = 0; i < inventory.slots; i++) {
        let itemStack = inventory.getStackInSlot(i);
        if (itemStack.isEmpty()) {
            count += 1;
        }
    }
    return count;
}
function isEntityInBannedRewards(entity_id) {
    let banned_entity_ids = [
        'minecraft:player',
        'minecraft:armor_stand',
        'dummmmmmy:target_dummy',
        "medievalorigins:summon_skeleton",
        "medievalorigins:summon_wither_skeleton",
        "medievalorigins:summon_zombie"
    ]

    return banned_entity_ids.includes(entity_id)
}

function entityHasBannedTags(entity) {
    let banned_entity_tags = [
        'necroskelwall'
    ]

    let entityTags = entity.getTags().toString();
    let banned = false;

    banned_entity_tags.forEach(banned_tag => {
        if (entityTags.includes(banned_tag)) {
            banned = true;
        }
    })

    return banned;
}

function isItemCurrency(item_name) {
    return COINS.includes(item_name);
}

function isEntityHostile(entity) {
    return entity.getAttribute('minecraft:generic.attack_damage') != null;
}

function isEMobBoss(entity) {
    return ALL_BOSSES.includes(entity.getType());
}

function isEntityAllowed(entity) {
    if (isEMobBoss(entity)) {
        return true;
    }
    return !isEntityInBannedRewards(entity.getType()) && isEntityHostile(entity) && !entityHasBannedTags(entity);
}

function getCountPlayerItem(player, searched_item) {
    let item_count = 0;
    player.inventory.items.forEach(stack => {
        if (stack.is(searched_item)) {
            item_count += stack.count;
        }
    });
    return item_count;
}

function givePlayer(player, item, count) {
    player.give(Item.of(item, count ?? 1, {}));
}

function clearPlayer(player_name, item, count, server) {
    server.runCommandSilent(`/clear ${player_name} ${item} ${count}`);
}

function getReward(entity, party_len) {

    let health = entity.getMaxHealth();
    let dimension = entity.level.dimension;
    // TODO: nerf all dimensions

    // Randomness for drop
    health = health * ((Math.random() * 40 - 20) / 100 + 1);


    let bronze_amount_raw = health / 30 / (1 + party_len);
    let bronze_amount = Math.floor(bronze_amount_raw);
    if (Math.random() < 0.5) {
        bronze_amount = Math.ceil(bronze_amount_raw);
    }

    let silver_amount = 0;
    let gold_amount = 0;
    let emerald_amount = 0;
    let diamond_amount = 0;

    if (bronze_amount > 64) {
        let silver_amount_raw = bronze_amount / 64;
        silver_amount = Math.floor(silver_amount_raw);
        if (Math.random() < 0.5) {
            silver_amount = Math.ceil(silver_amount_raw);
        }
        bronze_amount = bronze_amount % 64;
    }
    else if (bronze_amount == 64) {
        silver_amount += 1;
        bronze_amount = 0;
    }

    if (silver_amount > 64) {
        let gold_amount_raw = silver_amount / 64;
        gold_amount = Math.floor(gold_amount_raw);
        if (Math.random() < 0.5) {
            gold_amount = Math.ceil(gold_amount_raw);
        }
        silver_amount = silver_amount % 64;
    }
    else if (silver_amount == 64) {
        gold_amount += 1;
        silver_amount = 0;
    }

    if (gold_amount > 64) {
        let emerald_amount_raw = gold_amount / 64;
        emerald_amount = Math.floor(emerald_amount_raw);
        if (Math.random() < 0.5) {
            emerald_amount = Math.ceil(emerald_amount_raw);
        }
        gold_amount = gold_amount % 64;
    }
    else if (gold_amount == 64) {
        emerald_amount += 1;
        gold_amount = 0;
    }

    if (emerald_amount > 64) {
        let diamond_amount_raw = emerald_amount / 64;
        diamond_amount = Math.floor(diamond_amount_raw);
        if (Math.random() < 0.5) {
            diamond_amount = Math.ceil(diamond_amount_raw);
        }
        emerald_amount = emerald_amount % 64;
    }
    else if (emerald_amount == 64) {
        diamond_amount += 1;
        emerald_amount = 0;
    }

    return [bronze_amount, silver_amount, gold_amount, emerald_amount, diamond_amount];
}

function updatePlayerCoin(player, coinType, newAmount, currentBalance, coinItem, server) {
    if (newAmount <= WALLET_COIN_MAX) {
        if (newAmount !== currentBalance) {
            setPlayerCoinCount(player, coinType, newAmount, server);
        }
    } else {
        if (currentBalance !== WALLET_COIN_MAX) {
            setPlayerCoinCount(player, coinType, WALLET_COIN_MAX, server);
        }
        givePlayer(player, coinItem, newAmount - WALLET_COIN_MAX);
    }
}

function grantReward(rewards, player, server, killedEntity) {
    let bronze_reward = rewards[0];
    let silver_reward = rewards[1];
    let gold_reward = rewards[2];
    let emerald_reward = rewards[3];
    let diamond_reward = rewards[4];

    let bronze_balance = getPlayerCoinCount(player, 'bronze');
    let silver_balance = getPlayerCoinCount(player, 'silver');
    let gold_balance = getPlayerCoinCount(player, 'gold');
    let emerald_balance = getPlayerCoinCount(player, 'emerald');
    let diamond_balance = getPlayerCoinCount(player, 'diamond');

    let total_reward = bronze_reward + CONVERSION_RATE * silver_reward + CONVERSION_RATE * CONVERSION_RATE * gold_reward + CONVERSION_RATE * CONVERSION_RATE * CONVERSION_RATE * emerald_reward + CONVERSION_RATE * CONVERSION_RATE * CONVERSION_RATE * CONVERSION_RATE * diamond_reward;
    let total_balance = bronze_balance + CONVERSION_RATE * silver_balance + CONVERSION_RATE * CONVERSION_RATE * gold_balance + CONVERSION_RATE * CONVERSION_RATE * CONVERSION_RATE * emerald_balance + CONVERSION_RATE * CONVERSION_RATE * CONVERSION_RATE * CONVERSION_RATE * diamond_balance;

    // Apply reward multipliers
    let total_reward_plus_difficulty = Math.round(total_reward * getPlayerDifficultyMultiplierForEconomy(player));

    let new_total_reward = total_reward_plus_difficulty + total_balance;

    let new_diamond = Math.floor(new_total_reward / (CONVERSION_RATE ** 4));
    new_total_reward %= (CONVERSION_RATE ** 4);

    let new_emerald = Math.floor(new_total_reward / (CONVERSION_RATE ** 3));
    new_total_reward %= (CONVERSION_RATE ** 3);

    let new_gold = Math.floor(new_total_reward / (CONVERSION_RATE ** 2));
    new_total_reward %= (CONVERSION_RATE ** 2);

    let new_silver = Math.floor(new_total_reward / CONVERSION_RATE);
    let new_bronze = new_total_reward % CONVERSION_RATE;

    updatePlayerCoin(player, 'bronze', new_bronze, bronze_balance, BRONZE_COIN, server);
    updatePlayerCoin(player, 'silver', new_silver, silver_balance, SILVER_COIN, server);
    updatePlayerCoin(player, 'gold', new_gold, gold_balance, GOLD_COIN, server);
    updatePlayerCoin(player, 'emerald', new_emerald, emerald_balance, EMERALD_COIN, server);
    updatePlayerCoin(player, 'diamond', new_diamond, diamond_balance, DIAMOND_COIN, server);

    let newRewards = [
        new_total_reward % CONVERSION_RATE,
        Math.floor(new_total_reward / CONVERSION_RATE),
        Math.floor(new_total_reward / (CONVERSION_RATE ** 2)),
        Math.floor(new_total_reward / (CONVERSION_RATE ** 3)),
        Math.floor(new_total_reward / (CONVERSION_RATE ** 4)),
    ]

    announceReward(server, player.name.string, newRewards, killedEntity);
}

function sendPlayerTitle(server, player_name, text) {
    server.runCommandSilent(`/title ${player_name} actionbar {"text":"${text}"}`);
}

function announceReward(server, player_name, rewards, entity_name) {
    let rewards_text = '';
    if (rewards[0] > 0) {
        rewards_text = rewards_text + `§f§o§l${rewards[0]}§4§l🪙 `;
    }
    if (rewards[1] > 0) {
        rewards_text = rewards_text + `§f§o§l${rewards[1]}§7§l🪙 `;
    }
    if (rewards[2] > 0) {
        rewards_text = rewards_text + `§f§o§l${rewards[2]}§6§l🪙 `;
    }
    if (rewards[3] > 0) {
        rewards_text = rewards_text + `§f§o§l${rewards[3]}§a§l🪙 `;
    }
    if (rewards[4] > 0) {
        rewards_text = rewards_text + `§f§o§l${rewards[4]}§b§l🪙 `;
    }

    if (rewards_text.length > 0) {
        let actionbar_text = `§e§lReceived: ${rewards_text}§e§lfrom killing ${entity_name}`;
        sendPlayerTitle(server, player_name, actionbar_text);
    }
}


EntityEvents.death(event => {
    let player = event.source.player;
    if (player != null) {
        let player_name = player.name.string;
        let server = event.server;
        let entity = event.entity;
        let entity_name = entity.name.string;

        if (player.getType() === 'minecraft:player') {
            if (isEntityAllowed(entity)) {
                let playerUUID = UUID.fromString(player.uuid);
                let partyMembers = PartyAPI.getNearMembersWithoutSelf(playerUUID);
                let drop_returns = getReward(entity, partyMembers.length);

                for (const partyMember of partyMembers) {
                    grantReward(drop_returns, partyMember, server, entity_name);
                }

                grantReward(drop_returns, player, server, entity_name);
            }
        }
    }
})

// documentation to use
// get event ugly
// console.log(JSON.stringify(event, null, 4));
// GET methods and attrs
// console.log(Object.keys(event));

ItemEvents.rightClicked(event => {
    let player = event.player;
    let server = event.server;
    let player_name = player.name.string;
    let mainHandItem = player.mainHandItem;
    let mainHandItemCount = mainHandItem.count;
    let mainHandItemID = player.mainHandItem.item.getId();
    let crouching = player.isCrouching();

    if (COINS.includes(mainHandItemID)) {
        if (LAST_CONVERTED[player_name] && (Date.now() - LAST_CONVERTED[player_name]) < 20) {
            event.cancel();
            return;
        }
        LAST_CONVERTED[player_name] = Date.now();

        if (crouching) {
            [[SILVER_COIN, BRONZE_COIN], [GOLD_COIN, SILVER_COIN], [EMERALD_COIN, GOLD_COIN], [DIAMOND_COIN, EMERALD_COIN]].forEach(conversiondata => {
                let from_coin = conversiondata[0];
                let to_coin = conversiondata[1];
                if (mainHandItemID == from_coin) {
                    clearPlayer(player_name, from_coin, 1, server);
                    givePlayer(player, to_coin, 64);
                }

            });
            event.cancel();
        }
        else {
            [[BRONZE_COIN, SILVER_COIN], [SILVER_COIN, GOLD_COIN], [GOLD_COIN, EMERALD_COIN], [EMERALD_COIN, DIAMOND_COIN]].forEach(conversiondata => {
                let from_coin = conversiondata[0];
                let to_coin = conversiondata[1];
                if (mainHandItemID == from_coin) {

                    if (mainHandItemCount == 64) {
                        clearPlayer(player_name, from_coin, 64, server);
                        givePlayer(player, to_coin, 1);
                        event.cancel();
                    }
                }
            });
        }
    }
});
