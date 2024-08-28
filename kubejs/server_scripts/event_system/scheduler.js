let schedulerTimer = 0;
let playerTickTimer = 0;
let tickInterval = 20 * 10; // 30 seconds

let activeEvents = [];
var timezoneOffset = 1;

function getInactiveEvents() {
    return schedule.filter(e => !e.isActive);
}
console.log("Scheduler loaded");

ServerEvents.tick((event) => {
    schedulerTimer++;
    if (schedulerTimer > tickInterval) {
        scheduleEvents(event)
        schedulerTimer = 0;
    }
});

function scheduleEvents(event) {
    for (const scheduleElement of schedule) {
        if (!scheduleElement.isActive && scheduleElement.shouldBeActive()) {
            scheduleElement.isActive = true;
            activeEvents.push(scheduleElement);
            let formattedText = `§fEvent §r§a${scheduleElement.name}§r - §b${scheduleElement.description}§r §ehas started!§r`;
            event.server.runCommand(`/tell @a ${formattedText}`);
        }
        if (scheduleElement.isActive && !scheduleElement.shouldBeActive()) {
            scheduleElement.isActive = false;
            activeEvents = activeEvents.filter(e => e !== scheduleElement);
            let formattedText = `§fEvent §r§a${scheduleElement.name}§r - §b${scheduleElement.description}§r §chas ended!§r`;
            event.server.runCommand(`/tell @a ${formattedText}`);
        }
    }
}

// Event Handlers

ServerEvents.tick((event) => {
    for (const activeEvent of activeEvents) {
        activeEvent.onServerTick(event);
    }
});

PlayerEvents.tick((event) => {
    playerTickTimer++;
    if (playerTickTimer > tickInterval) {
        const inactiveEvents = getInactiveEvents();
        for (const inactiveEvent of inactiveEvents) {
            cleanupEffects(inactiveEvent, event.server, event.player);
            cleanupModifiers(inactiveEvent, event.server, event.player);
        }
        for (const activeEvent of activeEvents) {
            if (activeEvent) {
                applyEffects(activeEvent, event.server, event.player);
                applyModifiers(activeEvent, event.server, event.player);
            }
        }
        playerTickTimer = 0;
    }
    for (const activeEvent of activeEvents) {
        activeEvent.onPlayerTick(event);
    }
});

PlayerEvents.loggedIn((event) => {
    const inactiveEvents = getInactiveEvents();
    for (const inactiveEvent of inactiveEvents) {
        cleanupEffects(inactiveEvent, event.server, event.player);
        cleanupModifiers(inactiveEvent, event.server, event.player);
    }
    for (const activeEvent of activeEvents) {
        activeEvent.onPlayerJoin(event);
        if (activeEvent) {
            applyEffects(activeEvent, event.server, event.player);
            applyModifiers(activeEvent, event.server, event.player);
        }
    }
});

PlayerEvents.loggedOut((event) => {
    for (const activeEvent of activeEvents) {
        activeEvent.onPlayerLeave(event);
    }
});

PlayerEvents.respawned((event) => {
    const inactiveEvents = getInactiveEvents();
    for (const inactiveEvent of inactiveEvents) {
        cleanupEffects(inactiveEvent, event.server, event.player);
        cleanupModifiers(inactiveEvent, event.server, event.player);
    }
    for (const activeEvent of activeEvents) {
        activeEvent.onPlayerRespawn(event);
        if (activeEvent) {
            applyEffects(activeEvent, event.server, event.player);
            applyModifiers(activeEvent, event.server, event.player);
        }
    }
});

EntityEvents.death((event) => {
    if (event.entity.type !== 'minecraft:player') {
        return;
    }
    for (const activeEvent of activeEvents) {
        activeEvent.onPlayerDeath(event);
    }
});

function applyEffects(event, server, player) {
    for (const effect of event.effects) {
        server.runCommandSilent(`/effect give ${player.getName().getString()} ${effect.effect} infinite ${effect.power}`);
    }
}

function cleanupEffects(event, server, player) {
    for (const effect of event.effects) {
        server.runCommandSilent(`/effect clear ${player.getName().getString()} ${effect.effect}`);
    }
}

function applyModifiers(event, server, player) {
    for (const modifier of event.attributeModifiers) {
        server.runCommandSilent(`/attribute ${player.getName().getString()} ${modifier.attribute} modifier add ${modifier.uuid} "Zoompack Event" ${modifier.amount} ${modifier.operation}`);
    }
}

function cleanupModifiers(event, server, player) {
    for (const modifier of event.attributeModifiers) {
        server.runCommandSilent(`/attribute ${player.getName().getString()} ${modifier.attribute} modifier remove ${modifier.uuid}`);
    }
}
