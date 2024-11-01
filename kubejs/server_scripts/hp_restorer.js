PlayerEvents.loggedOut(event => {
    let player = event.player;
    let persistentData = player.persistentData;
    persistentData.putFloat("hp_to_restore", player.health);
});

PlayerEvents.loggedIn(event => {
    let player = event.player;
    let persistentData = player.persistentData;
    let hp_to_restore = persistentData.getFloat("hp_to_restore");

    if (hp_to_restore) {
        event.server.scheduleInTicks(20, () => {
            player.health = hp_to_restore;
            persistentData.remove("hp_to_restore");
        });
    }
});
