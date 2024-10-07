PlayerEvents.loggedOut(event => {
    let player = event.player;
    let persistentData = player.persistentData;
    persistentData.putFloat("hp_to_restore", player.health);
});

PlayerEvents.loggedIn(event => {
    let player = event.player;
});
let hpRestorerPlayerTicks = {};

PlayerEvents.tick(event => {
    let player = event.player;
    let uuid = player.uuid;
    if (!hpRestorerPlayerTicks[uuid]) {
        hpRestorerPlayerTicks[uuid] = 0;
    }
    if (hpRestorerPlayerTicks[uuid] < 0) {
        return;
    }
    hpRestorerPlayerTicks[uuid]++;

    if (hpRestorerPlayerTicks[uuid] >= 20) {
        let persistentData = player.persistentData;
        let hp_to_restore = persistentData.getFloat("hp_to_restore");
        if (hp_to_restore) {
            hpRestorerPlayerTicks[uuid] = -1;
            player.health = hp_to_restore;
            persistentData.remove("hp_to_restore");
        }
    }
});
