global.activeEvents = [];

NetworkEvents.dataReceived("events:get", (event) => {
    const {entity, data, level, player} = event;
    global.activeEvents = JSON.parse(data.getString('events'));
    drawActiveEvents(player);
})

ClientEvents.tick(event => {
    const player = event.player;
    drawActiveEvents(player);
});

function drawActiveEvents(player) {
    let renderer = {
        wrapper: {type: 'gradient', visible: false, x: 0, y: 0, w: 0, h: 0},
        gradient: {type: 'gradient', visible: false, x: 0, y: 0, w: 0, h: 0},
        title: {type: 'text', visible: false, x: 0, y: 0, w: 0, h: 0},
        event_0: {type: 'text', visible: false, x: 0, y: 0, w: 0, h: 0},
        event_1: {type: 'text', visible: false, x: 0, y: 0, w: 0, h: 0},
        event_2: {type: 'text', visible: false, x: 0, y: 0, w: 0, h: 0},
        event_3: {type: 'text', visible: false, x: 0, y: 0, w: 0, h: 0},
        event_4: {type: 'text', visible: false, x: 0, y: 0, w: 0, h: 0},
        event_0_icon: {type: 'rectangle', visible: false, x: 0, y: 0, w: 0, h: 0},
        event_1_icon: {type: 'rectangle', visible: false, x: 0, y: 0, w: 0, h: 0},
        event_2_icon: {type: 'rectangle', visible: false, x: 0, y: 0, w: 0, h: 0},
        event_3_icon: {type: 'rectangle', visible: false, x: 0, y: 0, w: 0, h: 0},
        event_4_icon: {type: 'rectangle', visible: false, x: 0, y: 0, w: 0, h: 0}
    }
    let persistentData = player.persistentData
    let playerUIInvisibleTag = persistentData.get(`events_ui_invisible`);
    let playerUIInvisible = playerUIInvisibleTag === null ? false : playerUIInvisibleTag === true;
    if (global.activeEvents === undefined || global.activeEvents.length === 0 || playerUIInvisible) {
        var vals = Object.values(renderer);
        vals.forEach((value) => {
            value.visible = false;
        });
        player.paint(renderer);
        return;
    }
    let startX = 180;
    let startY = 14;
    let heightPerRow = 10;
    let extraHeight = 6;
    let eventCount = global.activeEvents.length;
    let totalHeight = (eventCount + 1) * heightPerRow + extraHeight;
    let allRows = ["Active Events:"];
    global.activeEvents.forEach((activeEvent) => {
        allRows.push(`${activeEvent.name} - ${activeEvent.description}`);
    });
    let max = 0;
    allRows.forEach((row) => {
        if (row.length > max) {
            max = row.length;
        }
    });
    let width = max * 5.2 + 25;

    let wrapper = {type: 'gradient', visible: true, x: startX, y: startY, w: width, h: totalHeight, colorT: "#282c36", colorB: "#1a1d24", u0: 0, v0: 0, u1: 1, v1: 1};
    let gradient = {type: 'gradient', visible: true, x: startX + 2, y: startY + 2, w: width - 4, h: totalHeight - 4, colorT: "#414758", colorB: "#21242e", u0: 0, v0: 0, u1: 1, v1: 1};
    let title = {type: "text", visible: true, text: "Active Events:", x: startX + 5, y: startY + 4, font: {size: 20, color: "#FFFFFF"}};
    renderer.wrapper = wrapper;
    renderer.gradient = gradient;
    renderer.title = title;

    global.activeEvents.forEach((activeEvent, index) => {
        console.log(`${activeEvent['name']} - ${activeEvent['description']} is liiiiiveeeeee`, activeEvent);
        renderer[`event_${index}`] = {type: "text", visible: true, text: `§a${activeEvent.name}§r - §b${activeEvent.description}§r`, x: startX + 20, y: startY + 4 + (index + 1) * heightPerRow, font: {size: 20, color: "#FFFFFF"}};
        renderer[`event_${index}_icon`] = {type: "rectangle", visible: true, x: startX + 5, y: startY + 4 + (index + 1) * heightPerRow, w: 10, h: 10, u: 0, v: 0, texture: activeEvent.icon};
    });
    player.paint(renderer);
}
