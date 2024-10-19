function setPlayerInCombat(player){
    player.persistentData.lastDamageTime = player.level.time;
    player.persistentData.ON_COMBAT = true;
}

PlayerEvents.tick(event => {
    let player = event.player;

    if (!player.persistentData.lastDamageTime) {
        player.persistentData.lastDamageTime = 0;
    }

    if (player.persistentData.lastDamageTime + 100 < player.level.time) {
        player.persistentData.ON_COMBAT = false;
    }

    if (!player.persistentData.ON_COMBAT && player.foodData.foodLevel >= 20) {
        let healAmount = player.maxHealth * (Math.random() * (0.10 - 0.05) + 0.05);
        setPlayerInCombat(player);
        player.heal(healAmount);
    }
});

EntityEvents.hurt(event=>{
    if (event.entity.type == 'minecraft:player') {
        let player = event.entity;
        setPlayerInCombat(player);
    }
})