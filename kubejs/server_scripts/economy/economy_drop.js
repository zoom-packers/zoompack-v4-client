let PartyAPI = Java.loadClass("io.sedu.mc.parties.api.helper.PartyAPI");

let BRONZE_COIN = 'dotcoinmod:bronze_coin';
let SILVER_COIN = 'dotcoinmod:silver_coin';
let GOLD_COIN = 'dotcoinmod:gold_coin';
let EMERALD_COIN = 'dotcoinmod:emerald_coin';

const FREE_INV_SPACE_REQ = 5;
const CONVERSION_RATE = CONVERSION_RATE;
const TOTAL_WALLET_CAP = 999 + CONVERSION_RATE * 999 + CONVERSION_RATE * CONVERSION_RATE * 999 + CONVERSION_RATE * CONVERSION_RATE * CONVERSION_RATE * 999;
const WALLET_COIN_MAX = 999;
const COIN_SLOTS = {
    'bronze': 'coinslot9',
    'silver': 'coinslot7',
    'gold': 'coinslot2',
    'emerald': 'coinslot13'
}

const COIN_SLOTS_SET = {
    'bronze': 9,
    'silver': 7,
    'gold': 2,
    'emerald': 13
}

const COIN_SLOTS_RM = {
    'bronze': BRONZE_COIN,
    'silver': SILVER_COIN,
    'gold': GOLD_COIN,
    'emerald': EMERALD_COIN
}

let COINS = [BRONZE_COIN, SILVER_COIN, GOLD_COIN, EMERALD_COIN];

let DIMENSION_MULTIPLIERS = {
    'minecraft:overworld': 1
};

let ALL_BOSSES = ['minecraft:elder_guardian', 'aquamirae:captain_cornelia', 'aquamirae:maze_mother', 'aquamirae:eel', 'bosses_of_mass_destruction:lich', 'bosses_of_mass_destruction:void_blossom', 'blue_skies:alchemist', 'blue_skies:arachnarch', 'blue_skies:arachnarch', 'blue_skies:summoner', 'aether:slider', 'lost_aether_content:aerwhale_king', 'aether:valkyrie', 'aether:sun_spirit', 'minecraft:wither', 'bosses_of_mass_destruction:gauntlet', 'callfromthedepth_:agonysoul', 'call_of_yucutan:kukulkan', 'call_of_yucutan:ah_puch', 'mokels_boss_mantyd:boss_mantyd', 'minecraft:ender_dragon', 'bosses_of_mass_destruction:obsidilith', 'theabyss:abyssaur', 'theabyss:elder', 'theabyss:nightblade_boss', 'theabyss:the_roka', 'theabyss:crystal_golem', 'theabyss:magician'];

let NO_ECONOMY_LOOT = [0, 0, 0, 0]

let LAST_CONVERTED = {};

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

    if (bronze_amount > CONVERSION_RATE) {
        let silver_amount_raw = bronze_amount / CONVERSION_RATE;
        silver_amount = Math.floor(silver_amount_raw);
        if (Math.random() < 0.5) {
            silver_amount = Math.ceil(silver_amount_raw);
        }
        bronze_amount = bronze_amount % CONVERSION_RATE;
    }
    else if (bronze_amount == CONVERSION_RATE) {
        silver_amount += 1;
        bronze_amount = 0;
    }

    if (silver_amount > CONVERSION_RATE) {
        let gold_amount_raw = silver_amount / CONVERSION_RATE;
        gold_amount = Math.floor(gold_amount_raw);
        if (Math.random() < 0.5) {
            gold_amount = Math.ceil(gold_amount_raw);
        }
        silver_amount = silver_amount % CONVERSION_RATE;
    }
    else if (silver_amount == CONVERSION_RATE) {
        gold_amount += 1;
        silver_amount = 0;
    }

    if (gold_amount > CONVERSION_RATE) {
        let emerald_amount_raw = gold_amount / CONVERSION_RATE;
        emerald_amount = Math.floor(emerald_amount_raw);
        if (Math.random() < 0.5) {
            emerald_amount = Math.ceil(emerald_amount_raw);
        }
        gold_amount = gold_amount % CONVERSION_RATE;
    }
    else if (gold_amount == CONVERSION_RATE) {
        emerald_amount += 1;
        gold_amount = 0;
    }

    return [bronze_amount, silver_amount, gold_amount, emerald_amount];
}

function grantReward(rewards, player, server) {
    let bronze_reward = rewards[0];
    let silver_reward = rewards[1];
    let gold_reward = rewards[2];
    let emerald_reward = rewards[3];

    let bronze_balance = getPlayerCoinCount(player, 'bronze');
    let silver_balance = getPlayerCoinCount(player, 'silver');
    let gold_balance = getPlayerCoinCount(player, 'gold');
    let emerald_balance = getPlayerCoinCount(player, 'emerald');

    let total_reward  = bronze_reward+CONVERSION_RATE*silver_reward+CONVERSION_RATE*CONVERSION_RATE*gold_reward +CONVERSION_RATE*CONVERSION_RATE*CONVERSION_RATE*emerald_reward;
    let total_balance = bronze_balance+CONVERSION_RATE*silver_balance+CONVERSION_RATE*CONVERSION_RATE*gold_balance +CONVERSION_RATE*CONVERSION_RATE*CONVERSION_RATE*emerald_balance;

    let new_total_reward = total_reward+total_balance;

    let new_emerald = Math.floor(new_total_reward / (CONVERSION_RATE ** 3));
    new_total_reward %= (CONVERSION_RATE ** 3);

    let new_gold = Math.floor(new_total_reward / (CONVERSION_RATE ** 2));
    new_total_reward %= (CONVERSION_RATE ** 2);

    let new_silver = Math.floor(new_total_reward / CONVERSION_RATE);
    let new_bronze = new_total_reward % CONVERSION_RATE;

    // Convert remainers
    let total_remainer  = getPlayerCoinRemainer(player, 'bronze')+CONVERSION_RATE*getPlayerCoinRemainer(player, 'silver')+CONVERSION_RATE*CONVERSION_RATE*getPlayerCoinRemainer(player, 'gold') +CONVERSION_RATE*CONVERSION_RATE*CONVERSION_RATE*getPlayerCoinRemainer(player, 'emerald');
    let new_emerald_remainer = Math.floor(total_remainer / (CONVERSION_RATE ** 3));
    total_remainer %= (CONVERSION_RATE ** 3);

    let new_gold_remainer = Math.floor(total_remainer / (CONVERSION_RATE ** 2));
    total_remainer %= (CONVERSION_RATE ** 2);

    let new_silver_remainer = Math.floor(total_remainer / CONVERSION_RATE);
    let new_bronze_remainer = total_remainer % CONVERSION_RATE;
    setPlayerCoinRemainer(player, 'bronze', new_bronze_remainer);
    setPlayerCoinRemainer(player, 'silver', new_silver_remainer);
    setPlayerCoinRemainer(player, 'gold', new_gold_remainer);
    setPlayerCoinRemainer(player, 'emerald', new_emerald_remainer);

    if(new_bronze<=WALLET_COIN_MAX){
        let bronze_remainer = getPlayerCoinRemainer(player, 'bronze');
        if(bronze_remainer+new_bronze<=WALLET_COIN_MAX){
            setPlayerCoinCount(player, 'bronze', new_bronze+bronze_remainer, server);
        }
        else{
            setPlayerCoinCount(player, 'bronze', new_bronze, server);
        }
        
    }
    else{
        let remainer_to_add_bronze = new_bronze-WALLET_COIN_MAX;
        addPlayerCoinRemainer(player, 'bronze', remainer_to_add_bronze);
        if(bronze_balance!=WALLET_COIN_MAX){
            setPlayerCoinCount(player, 'bronze', WALLET_COIN_MAX, server);
        }
    }

    if(new_silver<=WALLET_COIN_MAX){
        let silver_remainer = getPlayerCoinRemainer(player, 'silver');
        if(silver_remainer+new_silver<=WALLET_COIN_MAX){
            setPlayerCoinCount(player, 'silver', new_silver+silver_remainer, server);
        }
        else{
            setPlayerCoinCount(player, 'silver', new_silver, server);
        }
        
    }
    else{
        let remainer_to_add_silver = new_silver-WALLET_COIN_MAX;
        addPlayerCoinRemainer(player, 'silver', remainer_to_add_silver);
        if(silver_balance!=WALLET_COIN_MAX){
            setPlayerCoinCount(player, 'silver', WALLET_COIN_MAX, server);
        }
    }

    if(new_gold<=WALLET_COIN_MAX){
        let gold_remainer = getPlayerCoinRemainer(player, 'gold');
        if(gold_remainer+new_gold<=WALLET_COIN_MAX){
            setPlayerCoinCount(player, 'gold', new_gold+gold_remainer, server);
        }
        else{
            setPlayerCoinCount(player, 'gold', new_gold, server);
        }
        
    }
    else{
        let remainer_to_add_gold = new_gold-WALLET_COIN_MAX;
        addPlayerCoinRemainer(player, 'gold', remainer_to_add_gold);
        if(gold_balance!=WALLET_COIN_MAX){
            setPlayerCoinCount(player, 'gold', WALLET_COIN_MAX, server);
        }
    }

    if(new_emerald<=WALLET_COIN_MAX){
        let emerald_remainer = getPlayerCoinRemainer(player, 'emerald');
        if(emerald_remainer+new_emerald<=WALLET_COIN_MAX){
            setPlayerCoinCount(player, 'emerald', new_emerald+emerald_remainer, server);
        }
        else{
            setPlayerCoinCount(player, 'emerald', new_emerald, server);
        }
        
    }
    else{
        let remainer_to_add_emerald = new_emerald-WALLET_COIN_MAX;
        addPlayerCoinRemainer(player, 'emerald', remainer_to_add_emerald);
        if(emerald_balance!=WALLET_COIN_MAX){
            setPlayerCoinCount(player, 'emerald', WALLET_COIN_MAX, server);
        }
    }
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
                    grantReward(drop_returns, partyMember, server);
                    announceReward(server, partyMember.name.string, drop_returns, entity_name);
                }

                grantReward(drop_returns, player, server);
                announceReward(server, player_name, drop_returns, entity_name);
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
            [[SILVER_COIN, BRONZE_COIN], [GOLD_COIN, SILVER_COIN], [EMERALD_COIN, GOLD_COIN]].forEach(conversiondata => {
                let from_coin = conversiondata[0];
                let to_coin = conversiondata[1];
                if (mainHandItemID == from_coin) {
                    clearPlayer(player_name, from_coin, 1, server);
                    givePlayer(player, to_coin, CONVERSION_RATE);
                }

            });
            event.cancel();
        }
        else {
            [[BRONZE_COIN, SILVER_COIN], [SILVER_COIN, GOLD_COIN], [GOLD_COIN, EMERALD_COIN]].forEach(conversiondata => {
                let from_coin = conversiondata[0];
                let to_coin = conversiondata[1];
                if (mainHandItemID == from_coin) {

                    if (mainHandItemCount == CONVERSION_RATE) {
                        clearPlayer(player_name, from_coin, CONVERSION_RATE, server);
                        givePlayer(player, to_coin, 1);
                        event.cancel();
                    }
                }
            });
        }
    }
});
