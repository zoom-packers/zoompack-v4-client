let pmmoWarnTicks = {}
let pmmoWarnLastSendTimes = {}
let pmmoWarnTimeBetweenMessage = 1000 * 5; // 5 seconds

PlayerEvents.inventoryChanged(event => {
    
    if (!pmmoWarnLastSendTimes[event.player.getName()]) {
        pmmoWarnLastSendTimes[event.player.getName()] = 0;
    }

    let weaknessId = 18;
    let miningFatigueId = 4;
    let slownessId = 2;
    let MOB_EFFECT = Java.loadClass("net.minecraft.world.effect.MobEffect");
    let player = event.player;
    let effectInstances = player.getActiveEffects();
    let hasWeakness2 = false;
    let hasMiningFatigue2 = false;
    let hasSlowness2 = false;

    for (let effect of effectInstances) {
        if (MOB_EFFECT.getId(effect.getEffect()) === weaknessId && effect.getAmplifier() === 1) {
            hasWeakness2 = true;
        }
        if (MOB_EFFECT.getId(effect.getEffect()) === miningFatigueId && effect.getAmplifier() === 1) {
            hasMiningFatigue2 = true;
        }
        if (MOB_EFFECT.getId(effect.getEffect()) === slownessId && effect.getAmplifier() === 1) {
            hasSlowness2 = true;
        }
    }

    if (hasWeakness2 && hasMiningFatigue2 && hasSlowness2) {
        let now = Date.now();

        if (now - pmmoWarnLastSendTimes[event.player.getName()] >= pmmoWarnTimeBetweenMessage) {
            player.sendSystemMessage("§7From your debuffs, it seems§r §4you are wearing/holding an item that has a higher requirement than your current level§r. §2Take it off to avoid these debuffs.§r");
            pmmoWarnLastSendTimes[event.player.getName()] = now;
        }
        
    }
})
