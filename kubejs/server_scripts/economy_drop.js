const BRONZE_COIN = 'dotcoinmod:bronze_coin';
const SILVER_COIN = 'dotcoinmod:silver_coin';
const GOLD_COIN = 'dotcoinmod:gold_coin';
const EMERALD_COIN = 'dotcoinmod:emerald_coin';

const COINS = [BRONZE_COIN, SILVER_COIN, GOLD_COIN, EMERALD_COIN];

let DIMENSION_MULTIPLIERS = {
    'minecraft:overworld': 1
};

let LAST_CONVERTED = {};

function isEntityInBannedRewards(entity_id){
    let banned_entity_ids = [
        'minecraft:player',
        'minecraft:armor_stand',
        'dummmmmmy:target_dummy'
    ]

    return banned_entity_ids.includes(entity_id)
}

function isItemCurrency(item_name){
    return COINS.includes(item_name);
}

function isEntityHostile(entity){
    return entity.getAttribute('minecraft:generic.attack_damage')!= null;
}

function isEntityAllowed(entity){
    return !isEntityInBannedRewards(entity.getType()) && isEntityHostile(entity);
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

    // Randomness for drop
    health = health * ((Math.random() * 40 - 20)/100+1);

    if (dimension === 'minecraft:overworld'){
        health*=2;
    }

    let error = health%20;
    
    let bronze_amount = Math.floor(health/20);
    let silver_amount = 0;
    let gold_amount = 0;
    let emerald_amount = 0;


    if (bronze_amount > 64){
        silver_amount = Math.floor(bronze_amount/64);
        bronze_amount = bronze_amount%64;
    }
    else if(bronze_amount == 64){
        silver_amount+=1;
        bronze_amount=0;
    }

    if (silver_amount > 64){
        gold_amount = Math.floor(silver_amount/64);
        silver_amount = silver_amount%64;
    }
    else if(silver_amount == 64){
        gold_amount+=1;
        silver_amount=0;
    }

    if (gold_amount > 64){
        emerald_amount = Math.floor(gold_amount/64);
        gold_amount = gold_amount%64;
    }
    else if(gold_amount == 64){
        emerald_amount+=1;
        gold_amount=0;
    }

    return [bronze_amount, silver_amount, gold_amount, emerald_amount];
}

function grantReward(rewards, entity, server){
    let dimension = entity.level.dimension;
    let x = entity.x;
    let y = entity.y;
    let z = entity.z;
    let command_prefix = `execute in ${dimension} run summon minecraft:item`

    if(rewards[0]>0){
        server.runCommandSilent(`${command_prefix} ${x} ${y} ${z} {Item:{id:"${BRONZE_COIN}",Count:${rewards[0]}}}`);
    }
    if(rewards[1]>0){
        server.runCommandSilent(`${command_prefix} ${x} ${y} ${z} {Item:{id:"${SILVER_COIN}",Count:${rewards[1]}}}`);
    }
    if(rewards[2]>0){
        server.runCommandSilent(`${command_prefix} ${x} ${y} ${z} {Item:{id:"${GOLD_COIN}",Count:${rewards[2]}}}`);
    }
    if(rewards[3]>0){
        server.runCommandSilent(`${command_prefix} ${x} ${y} ${z} {Item:{id:"${EMERALD_COIN}",Count:${rewards[3]}}}`);
    }
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
        let actionbar_text = `§e§lRecieved: ${rewards_text}§e§lfrom killing ${entity_name}`;
        server.runCommandSilent(`/title ${player_name} actionbar {"text":"${actionbar_text}"}`);
    }
}

EntityEvents.death(event => {
    let player = event.source.player;
    let player_name = player.name.string;
    let server = event.server;
    let entity = event.entity;
    let entity_name = entity.name.string;    

    if (player.getType() === 'minecraft:player'){   
        if (isEntityAllowed(entity)){
            let drop_returns = getReward(entity, player);
            grantReward(drop_returns, entity, server);
            announceReward(server, player_name, drop_returns, entity_name);
        }
    }
})

// documentation to use
// get event ugly
// console.log(JSON.stringify(event, null, 4));
// GET methods and attrs
// console.log(Object.keys(event));

ItemEvents.pickedUp(event => {
    let player = event.player;
    let player_name = player.name.string;
    let server = event.server;
    let item = event.getItem();

    let item_id =item.item.getId();
    let item_count = item.getCount();

    if (isItemCurrency(item_id)){
        let player_item_count = getCountPlayerItem(player, item_id);
        [[BRONZE_COIN, SILVER_COIN], [SILVER_COIN, GOLD_COIN], [GOLD_COIN, EMERALD_COIN]].forEach(conversiondata=>{
            let from_coin = conversiondata[0];
            let to_coin = conversiondata[1];
            if(item_id == from_coin){
                let add_next_coin = parseInt(Math.floor(player_item_count/64));
                clearPlayer(player_name, from_coin, add_next_coin*64, server);
                givePlayer(player_name, to_coin, add_next_coin, server);
            }

        })        
    }
});


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
                    }
                }
    
            });
            event.cancel();
        }
    }
});