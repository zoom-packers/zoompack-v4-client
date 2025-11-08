let PLAYER_TRIM_RECYCLE_DATA = {}

function shouldPlayerRecycle(playerName) {
    const playerInTable = PLAYER_TRIM_RECYCLE_DATA[playerName];
    if (playerInTable) {
        // This means that it's set to either true
        return false;
    }
    return true;
}

PlayerEvents.inventoryChanged(event => {
    const { player, server, slot } = event;
    let item = event.getItem();
    const playerName = player.name.string;

    if (item.nbt) {
        let TrimRecycle = item.nbt.TrimRecycle;

        if (TrimRecycle) {
            if (TrimRecycle != '') {

                if (shouldPlayerRecycle(playerName)) {
                    let tmpItem = item.copy();
                    tmpItem.nbt.remove('TrimRecycle');

                    PLAYER_TRIM_RECYCLE_DATA[playerName] = true

                    event.server.runCommandSilent(`clear ${playerName} ${item.id}{TrimRecycle:"${TrimRecycle}"}`);

                    player.give(Item.of(tmpItem.id, tmpItem.nbt));
                    player.give(Item.of(TrimRecycle));
                    PLAYER_TRIM_RECYCLE_DATA[playerName] = false;
                }
            }
        }
    }
});
