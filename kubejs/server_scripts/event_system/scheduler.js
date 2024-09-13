//priority: 997
let schedulerTimer = 0;
let announcerTimer = 0;
let playerTickTimer = 0;
let tickInterval = 20 * 10; // 30 seconds
let announceInterval = 20 * 60 * 30; // 30 minutes

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

ServerEvents.loaded((event) => {
    scheduleEvents(event);
});

ServerEvents.tick((event) => {
    announcerTimer++;
    if (announcerTimer % announceInterval === 0) {
        for (const activeEvent of activeEvents) {
            activeEvent.remindActive(event);
        }
    }
})

function scheduleEvents(event) {
    for (const scheduleElement of schedule) {
        if (!scheduleElement.isActive && scheduleElement.shouldBeActive()) {
            scheduleElement.isActive = true;
            activeEvents.push(scheduleElement);
            let formattedText = `§fEvent §r§a${scheduleElement.name}§r - §b${scheduleElement.description}§r §ehas started!§r`;
            event.server.runCommandSilent(`/tellraw @a "${formattedText}"`);
        }
        if (scheduleElement.isActive && !scheduleElement.shouldBeActive()) {
            scheduleElement.isActive = false;
            activeEvents = activeEvents.filter(e => e !== scheduleElement);
            let formattedText = `§fEvent §r§a${scheduleElement.name}§r - §b${scheduleElement.description}§r §chas ended!§r`;
            event.server.runCommandSilent(`/tellraw @a "${formattedText}"`);
        }
    }
    const players = event.server.getPlayerList().getPlayers();
    for (const player of players) {
        drawActiveEvents(event.server, player);
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
        drawActiveEvents(event.server, event.player);
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
    for (const activeEvent of activeEvents) {
        let formattedText = `§fEvent §r§a${activeEvent.name}§r - §b${activeEvent.description}§r§r is active, make sure to take advantage of it!§r`;
        event.player.sendSystemMessage(formattedText);
    }
    drawActiveEvents(event.server, event.player);
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

function drawActiveEvents(server, player) {
    const renderer = {
        wrapper: {},
        gradient: {},
        title: {},
        event_0: {},
        event_1: {},
        event_2: {},
        event_3: {},
        event_4: {},
        event_0_icon: {},
        event_1_icon: {},
        event_2_icon: {},
        event_3_icon: {},
        event_4_icon: {},
    }
    const persistentData = server.persistentData
    const playerUIInvisibleTag = persistentData.get(`events_ui_invisible_${player.getName().getString()}`);
    const playerUIInvisible = playerUIInvisibleTag === null ? false : playerUIInvisibleTag === true;
    if (activeEvents === undefined || activeEvents.length === 0 || playerUIInvisible) {
        var vals = Object.values(renderer);
        vals.forEach((value) => {
            value.visible = false;
        });
        player.paint(renderer);
        return;
    }
    const startX = 180;
    const startY = 14;
    const heightPerRow = 10;
    const extraHeight = 6;
    const eventCount = activeEvents.length;
    const totalHeight = (eventCount + 1) * heightPerRow + extraHeight;
    const allRows = ["Active Events:"];
    activeEvents.forEach((activeEvent) => {
        allRows.push(`${activeEvent.name} - ${activeEvent.description}`);
    });
    let max = 0;
    allRows.forEach((row) => {
        if (row.length > max) {
            max = row.length;
        }
    });
    const width = max * 5.2 + 25;

    const wrapper = {type: 'gradient', visible: true, x: startX, y: startY, w: width, h: totalHeight, colorT: "#282c36", colorB: "#1a1d24", u0: 0, v0: 0, u1: 1, v1: 1};
    const gradient = {type: 'gradient', visible: true, x: startX + 2, y: startY + 2, w: width - 4, h: totalHeight - 4, colorT: "#414758", colorB: "#21242e", u0: 0, v0: 0, u1: 1, v1: 1};
    const title = {type: "text", visible: true, text: "Active Events:", x: startX + 5, y: startY + 4, font: {size: 20, color: "#FFFFFF"}};
    renderer.wrapper = wrapper;
    renderer.gradient = gradient;
    renderer.title = title;

    activeEvents.forEach((activeEvent, index) => {
        renderer[`event_${index}`] = {type: "text", visible: true, text: `§a${activeEvent.name}§r - §b${activeEvent.description}§r`, x: startX + 20, y: startY + 4 + (index + 1) * heightPerRow, font: {size: 20, color: "#FFFFFF"}};
        renderer[`event_${index}_icon`] = {type: "rectangle", visible: true, x: startX + 5, y: startY + 4 + (index + 1) * heightPerRow, w: 10, h: 10, u: 0, v: 0, texture: activeEvent.icon};
    });
    player.paint(renderer);
}
