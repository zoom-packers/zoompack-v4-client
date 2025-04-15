let BRONZE_COIN = 'dotcoinmod:bronze_coin';
let SILVER_COIN = 'dotcoinmod:silver_coin';
let GOLD_COIN = 'dotcoinmod:gold_coin';
let EMERALD_COIN = 'dotcoinmod:emerald_coin';

const FREE_INV_SPACE_REQ = 5;
const CONVERSION_RATE = 64;
const TOTAL_WALLET_CAP = 999+64*999+64*64*999+64*64*64*999;
const WALLET_COIN_MAX = 999;
const COIN_SLOTS = {
    'bronze' : 'coinslot9',
    'silver' : 'coinslot7',
    'gold' : 'coinslot2',
    'emerald' : 'coinslot13'
}

const COIN_SLOTS_SET = {
    'bronze' : 9,
    'silver' : 7,
    'gold' : 2,
    'emerald' : 13
}

const COIN_SLOTS_RM = {
    'bronze' : BRONZE_COIN,
    'silver' : SILVER_COIN,
    'gold' : GOLD_COIN,
    'emerald' : EMERALD_COIN
}

let COINS = [BRONZE_COIN, SILVER_COIN, GOLD_COIN, EMERALD_COIN];

let DIMENSION_MULTIPLIERS = {
    'minecraft:overworld': 1
};

let NO_ECONOMY_LOOT = [0,0,0,0]

let LAST_CONVERTED = {};

function getPlayerCoinCount(player, coin_type){
    return player.nbt.getInt(COIN_SLOTS[coin_type]);
}

// this just adds to player, no source
function addPlayerBalance(player, coin_type, coin_count, server){
    let new_coin_count = getPlayerCoinCount(player, coin_type) + coin_count;
    server.runCommandSilent(`/currency set ${player.name.string} ${coin_type} ${new_coin_count}`);
}

function subtractPlayerBalance(player, coin_type, coin_count, server){
    let new_coin_count = getPlayerCoinCount(player, coin_type) - coin_count;
    server.runCommandSilent(`/currency set ${player.name.string} ${coin_type} ${new_coin_count}`);
}

function setPlayerCoinRemainer(player, coin_type, coint_amount){
    player.persistentData.putFloat("wallet_remain_"+coin_type,coint_amount);
}

function getPlayerCoinRemainer(player, coin_type){
    let wallet_coin_remain = player.persistentData.getFloat("wallet_remain_"+coin_type);
    if (wallet_coin_remain){
        return wallet_coin_remain;
    }
    else{
        player.persistentData.putFloat("wallet_remain_"+coin_type, 0);
        return 0;
    }
}

function addPlayerCoinRemainer(player, coin_type, coint_amount_addition){
    setPlayerCoinRemainer(player, coin_type, getPlayerCoinRemainer(player, coin_type)+coint_amount_addition);
}

function subtractPlayerCoinRemainer(player, coin_type, coin_subtract_amount){
    setPlayerCoinRemainer(player, coin_type, getPlayerCoinRemainer(player, coin_type)-coin_subtract_amount);
}

function getPlayerFreeInventorySlotCount(player){
    let count = 0;
    let inventory = player.inventory;
    for (let i = 0; i < inventory.slots; i++) {
        let itemStack = inventory.getStackInSlot(i);
        if (itemStack.isEmpty()) {
            count+=1;
        }
    }
    return count;
}
function isEntityInBannedRewards(entity_id){
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

function entityHasBannedTags(entity){
    let banned_entity_tags = [
        'necroskelwall'
    ]

    let entityTags = entity.getTags().toString();
    let banned = false;

    banned_entity_tags.forEach(banned_tag =>{
        if(entityTags.includes(banned_tag)){
            banned = true;
        }
    })

    return banned;
}

function isItemCurrency(item_name){
    return COINS.includes(item_name);
}

function isEntityHostile(entity){
    return entity.getAttribute('minecraft:generic.attack_damage')!= null;
}

function isEntityAllowed(entity){
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

function givePlayer(player_name, item, count, server){
    server.runCommandSilent(`/give ${player_name} ${item} ${count}`);
}

function clearPlayer(player_name, item, count, server){
    server.runCommandSilent(`/clear ${player_name} ${item} ${count}`);
}

function getReward(entity, player){

    let health = entity.getMaxHealth();
    let dimension = entity.level.dimension;
    // TODO: nerf all dimensions

    // Randomness for drop
    health = health * ((Math.random() * 40 - 20)/100+1);


    let bronze_amount_raw = health/30;
    let bronze_amount = Math.floor(bronze_amount_raw);
    if (Math.random() < 0.5) {
        bronze_amount = Math.ceil(bronze_amount_raw);
    }
    
    let silver_amount = 0;
    let gold_amount = 0;
    let emerald_amount = 0;

    if (bronze_amount > 64){ 
        let silver_amount_raw = bronze_amount/64;
        silver_amount = Math.floor(silver_amount_raw);
        if (Math.random() < 0.5) {
            silver_amount = Math.ceil(silver_amount_raw);
        }
        bronze_amount = bronze_amount%64;
    }
    else if(bronze_amount == 64){
        silver_amount+=1;
        bronze_amount=0;
    }

    if (silver_amount > 64){
        let gold_amount_raw = silver_amount/64;
        gold_amount = Math.floor(gold_amount_raw);
        if (Math.random() < 0.5) {
            gold_amount = Math.ceil(gold_amount_raw);
        }
        silver_amount = silver_amount%64;
    }
    else if(silver_amount == 64){
        gold_amount+=1;
        silver_amount=0;
    }

    if (gold_amount > 64){
        let emerald_amount_raw = gold_amount/64;
        emerald_amount = Math.floor(emerald_amount_raw);
        if (Math.random() < 0.5) {
            emerald_amount = Math.ceil(emerald_amount_raw);
        }
        gold_amount = gold_amount%64;
    }
    else if(gold_amount == 64){
        emerald_amount+=1;
        gold_amount=0;
    }

    return [bronze_amount, silver_amount, gold_amount, emerald_amount];
}

function grantReward(rewards, player, server){
    let bronze_reward = rewards[0];
    let silver_reward = rewards[1];
    let gold_reward = rewards[2];
    let emerald_reward = rewards[3];

    let bronze_balance = getPlayerCoinCount(player, 'bronze');
    let silver_balance = getPlayerCoinCount(player, 'silver');
    let gold_balance = getPlayerCoinCount(player, 'gold');
    let emerald_balance = getPlayerCoinCount(player, 'emerald');

    if(bronze_reward>0){
        if(bronze_balance+bronze_reward > WALLET_COIN_MAX){
            if(silver_reward+silver_balance+1>WALLET_COIN_MAX){
                let inventory_bronze_count = getCountPlayerItem(player, BRONZE_COIN);
                if(inventory_bronze_count+bronze_reward>CONVERSION_RATE){
                    let inventory_new_bronze_count = (inventory_bronze_count+bronze_reward)%CONVERSION_RATE;
                    clearPlayer(player.name.string, BRONZE_COIN, CONVERSION_RATE, server);
                    givePlayer(player.name.string, SILVER_COIN, 1, server);
                    givePlayer(player.name.string, BRONZE_COIN, inventory_new_bronze_count, server);
                }
                else{
                    if(getPlayerFreeInventorySlotCount(player)>FREE_INV_SPACE_REQ){
                        givePlayer(player.name.string, BRONZE_COIN, bronze_reward, server);
                        let bronze_remainer = getPlayerCoinRemainer(player, 'bronze');
                        if(inventory_bronze_count+bronze_remainer<=64){
                            givePlayer(player.name.string, BRONZE_COIN, bronze_remainer, server);
                            subtractPlayerCoinRemainer(player, 'bronze', bronze_remainer);
                        }
                    }
                    else{
                        addPlayerCoinRemainer(player, 'bronze', bronze_reward);
                        if(getPlayerCoinRemainer(player, 'bronze')>CONVERSION_RATE){
                            subtractPlayerCoinRemainer(player, 'bronze', CONVERSION_RATE);
                            addPlayerCoinRemainer(player, 'silver', 1);
                        }
                    }
                }
            }
            else{
                if(getPlayerFreeInventorySlotCount(player)>FREE_INV_SPACE_REQ){
                    subtractPlayerBalance(player, 'bronze', CONVERSION_RATE, server);
                    silver_reward+=1;
                }
                else{
                    addPlayerCoinRemainer(player, 'bronze', bronze_reward);
                }
            }
            
        }
        else{
            let bronze_remainer = getPlayerCoinRemainer(player, 'bronze');
            addPlayerBalance(player, 'bronze', bronze_reward, server);
            if(bronze_remainer>0 && bronze_balance+bronze_reward+bronze_remainer <= WALLET_COIN_MAX){
                addPlayerBalance(player, 'bronze', bronze_remainer, server);
                subtractPlayerCoinRemainer(player, 'bronze', bronze_remainer);
            }
            else{
                if(getPlayerFreeInventorySlotCount(player)>FREE_INV_SPACE_REQ){
                    givePlayer(player.name.string, BRONZE_COIN, bronze_remainer, server);
                    subtractPlayerCoinRemainer(player, 'bronze', bronze_remainer);
                }
            }
        }
        
    }

    if(silver_reward>0){
        if(silver_balance+silver_reward > WALLET_COIN_MAX){
            if(gold_reward+gold_balance+1>WALLET_COIN_MAX){
                let inventory_silver_count = getCountPlayerItem(player, SILVER_COIN);
                if(inventory_silver_count+silver_reward>CONVERSION_RATE){
                    let inventory_new_silver_count = (inventory_silver_count+silver_reward)%CONVERSION_RATE;
                    clearPlayer(player.name.string, SILVER_COIN, CONVERSION_RATE, server);
                    givePlayer(player.name.string, GOLD_COIN, 1, server);
                    givePlayer(player.name.string, SILVER_COIN, inventory_new_silver_count, server);
                }
                else{
                    if(getPlayerFreeInventorySlotCount(player)>FREE_INV_SPACE_REQ+1){
                        givePlayer(player.name.string, SILVER_COIN, silver_reward, server);
                        let silver_remainer = getPlayerCoinRemainer(player, 'silver');
                        if(inventory_silver_count+silver_remainer<=64){
                            givePlayer(player.name.string, SILVER_COIN, silver_remainer, server);
                            subtractPlayerCoinRemainer(player, 'silver', silver_remainer);
                        }
                    }
                    else{
                        addPlayerCoinRemainer(player, 'silver', silver_reward);
                        if(getPlayerCoinRemainer(player, 'silver')>CONVERSION_RATE){
                            subtractPlayerCoinRemainer(player, 'silver', CONVERSION_RATE);
                            addPlayerCoinRemainer(player, 'gold', 1);
                        }
                    }
                }
            }
            else{
                if(getPlayerFreeInventorySlotCount(player)>FREE_INV_SPACE_REQ+1){
                    subtractPlayerBalance(player, 'silver', CONVERSION_RATE, server);
                    gold_reward+=1;
                }
                else{
                    addPlayerCoinRemainer(player, 'silver', silver_reward);
                }
            }
            
        }
        else{
            let silver_remainer = getPlayerCoinRemainer(player, 'silver');
            addPlayerBalance(player, 'silver', silver_reward, server);
            if(silver_remainer>0 && silver_balance+silver_reward+silver_remainer <= WALLET_COIN_MAX){
                addPlayerBalance(player, 'silver', silver_remainer, server);
                subtractPlayerCoinRemainer(player, 'silver', silver_remainer);
            }
            else{
                if(getPlayerFreeInventorySlotCount(player)>FREE_INV_SPACE_REQ+1){
                    givePlayer(player.name.string, SILVER_COIN, silver_remainer, server);
                    subtractPlayerCoinRemainer(player, 'silver', silver_remainer);
                }
            }
        }
        
    }

    if(gold_reward>0){
        if(gold_balance+gold_reward > WALLET_COIN_MAX){
            if(emerald_reward+emerald_balance+1>WALLET_COIN_MAX){
                let inventory_gold_count = getCountPlayerItem(player, GOLD_COIN);
                if(inventory_gold_count+gold_reward>CONVERSION_RATE){
                    let inventory_new_gold_count = (inventory_gold_count+gold_reward)%CONVERSION_RATE;
                    clearPlayer(player.name.string, GOLD_COIN, CONVERSION_RATE, server);
                    givePlayer(player.name.string, EMERALD_COIN, 1, server);
                    givePlayer(player.name.string, GOLD_COIN, inventory_new_gold_count, server);
                }
                else{
                    if(getPlayerFreeInventorySlotCount(player)>FREE_INV_SPACE_REQ+2){
                        givePlayer(player.name.string, GOLD_COIN, gold_reward, server);
                        let gold_remainer = getPlayerCoinRemainer(player, 'gold');
                        if(inventory_gold_count+gold_remainer<=64){
                            givePlayer(player.name.string, GOLD_COIN, gold_remainer, server);
                            subtractPlayerCoinRemainer(player, 'gold', gold_remainer);
                        }
                    }
                    else{
                        addPlayerCoinRemainer(player, 'gold', gold_reward);
                        if(getPlayerCoinRemainer(player, 'gold')>CONVERSION_RATE){
                            subtractPlayerCoinRemainer(player, 'gold', CONVERSION_RATE);
                            addPlayerCoinRemainer(player, 'emerald', 1);
                        }
                    }
                    
                }
            }
            else{
                if(getPlayerFreeInventorySlotCount(player)>FREE_INV_SPACE_REQ+2){
                    subtractPlayerBalance(player, 'gold', CONVERSION_RATE, server);
                    gold_reward+=1;
                }
                else{
                    addPlayerCoinRemainer(player, 'gold', gold_reward);
                }
            }
        }
        else{
            let gold_remainer = getPlayerCoinRemainer(player, 'gold');
            addPlayerBalance(player, 'gold', gold_reward, server);
            if(gold_remainer>0 && gold_balance+gold_reward+gold_remainer <= WALLET_COIN_MAX){
                addPlayerBalance(player, 'gold', gold_remainer, server);
                subtractPlayerCoinRemainer(player, 'gold', gold_remainer);
            }
            else{
                if(getPlayerFreeInventorySlotCount(player)>FREE_INV_SPACE_REQ+2){
                    givePlayer(player.name.string, GOLD_COIN, gold_remainer, server);
                    subtractPlayerCoinRemainer(player, 'gold', gold_remainer);
                }
            }
        }
        
    }

    if(emerald_reward>0){
        if(emerald_balance+emerald_reward > WALLET_COIN_MAX){
            let count_to_inv = (emerald_balance+emerald_reward)%WALLET_COIN_MAX;
            addPlayerBalance(player, 'emerald', emerald_reward-count_to_inv, server);
            givePlayer(player.name.string, EMERALD_COIN, count_to_inv, server);
        }
        else{
            let emerald_remainer = getPlayerCoinRemainer(player, 'emerald');
            addPlayerBalance(player, 'emerald', emerald_reward, server);
            if(emerald_remainer>0 && emerald_balance+emerald_reward+emerald_remainer <= WALLET_COIN_MAX){
                addPlayerBalance(player, 'emerald', emerald_remainer, server);
                subtractPlayerCoinRemainer(player, 'emerald', emerald_remainer);
            }
        }
    }
}

function sendPlayerTitle(server, player_name, text){
    server.runCommandSilent(`/title ${player_name} actionbar {"text":"${text}"}`);
}

function announceReward(server, player_name, rewards, entity_name){
    let rewards_text = '';
    if(rewards[0]>0){
        rewards_text = rewards_text + `§f§o§l${rewards[0]}§4§l🪙 `;
    }
    if(rewards[1]>0){
        rewards_text = rewards_text + `§f§o§l${rewards[1]}§7§l🪙 `;
    }
    if(rewards[2]>0){
        rewards_text = rewards_text + `§f§o§l${rewards[2]}§6§l🪙 `;
    }
    if(rewards[3]>0){
        rewards_text = rewards_text + `§f§o§l${rewards[3]}§a§l🪙 `;
    }

    if (rewards_text.length > 0){
        let actionbar_text = `§e§lReceived: ${rewards_text}§e§lfrom killing ${entity_name}`;
        sendPlayerTitle(server, player_name, actionbar_text);
    }
}


EntityEvents.death(event => {
    let player = event.source.player;
    if(player!=null){
        let player_name = player.name.string;
        let server = event.server;
        let entity = event.entity;
        let entity_name = entity.name.string;    

        if (player.getType() === 'minecraft:player'){
            if (isEntityAllowed(entity)){
                let drop_returns = getReward(entity, player);
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

    if(COINS.includes(mainHandItemID)){
        if (LAST_CONVERTED[player_name] && (Date.now() - LAST_CONVERTED[player_name]) < 20) {
            event.cancel();
            return;
        }
        LAST_CONVERTED[player_name] = Date.now();

        if(crouching){
            [[SILVER_COIN, BRONZE_COIN], [GOLD_COIN, SILVER_COIN], [EMERALD_COIN, GOLD_COIN]].forEach(conversiondata=>{
                let from_coin = conversiondata[0];
                let to_coin = conversiondata[1];
                if(mainHandItemID == from_coin){
                    clearPlayer(player_name, from_coin, 1, server);
                    givePlayer(player_name, to_coin, 64, server);
                }
    
            });
            event.cancel();
        }
        else{
            [[BRONZE_COIN, SILVER_COIN], [SILVER_COIN, GOLD_COIN], [GOLD_COIN, EMERALD_COIN]].forEach(conversiondata=>{
                let from_coin = conversiondata[0];
                let to_coin = conversiondata[1];
                if(mainHandItemID == from_coin){

                    if(mainHandItemCount==64){
                        clearPlayer(player_name, from_coin, 64, server);
                        givePlayer(player_name, to_coin, 1, server);
                        event.cancel();
                    }
                }
            });
        }
    }
});
