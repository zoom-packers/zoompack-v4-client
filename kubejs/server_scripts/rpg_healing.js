const MIN_FOOD_LEVEL = 18;
const COMBAT_CLEANUP = 100;
const RPG_HEALING_TICK_INTERVAL = 20;

function setPlayerInCombat(player){
    player.persistentData.lastDamageTime = player.level.time;
    player.persistentData.ON_COMBAT = true;
}

EntityEvents.hurt(event=>{
    if (event.entity.type == 'minecraft:player') {
        setPlayerInCombat(event.entity);
    }
})

function healPlayers(event){
    event.server.scheduleInTicks(RPG_HEALING_TICK_INTERVAL, callback => {
        event.server.players.forEach(player => {
            if (!player.persistentData.lastDamageTime) {
                player.persistentData.lastDamageTime = 0;
            }
        
            if (player.persistentData.lastDamageTime + COMBAT_CLEANUP < player.level.time) {
                player.persistentData.ON_COMBAT = false;
            }

            if (!player.persistentData.ON_COMBAT){
                if(player.foodData.foodLevel >= MIN_FOOD_LEVEL){
                    setPlayerInCombat(player);
                    player.heal(player.maxHealth * 0.1);
                }
            }
        });

        healPlayers(event);
    });
}

ServerEvents.loaded(event => {
    healPlayers(event);
})