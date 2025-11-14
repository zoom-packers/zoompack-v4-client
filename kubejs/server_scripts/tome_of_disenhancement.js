let PLAYER_DISENHANCE_RECYCLE_DATA = {};

function shouldPlayerDisenhance(playerName) {
    const playerInTable = PLAYER_DISENHANCE_RECYCLE_DATA[playerName];
    if (playerInTable) return false;
    return true;
}

PlayerEvents.inventoryChanged(event => {
    const { player, item, slot } = event;
    const playerName = player.name.string;

    if (!item.nbt) return;

    const recycleTag = item.nbt.ISBEnhanceRecycle;
    if (!recycleTag || recycleTag === '') return;

    if (!shouldPlayerDisenhance(playerName)) return;

    PLAYER_DISENHANCE_RECYCLE_DATA[playerName] = true;

    const cleanItem = item.copy();
    cleanItem.nbt.remove('ISBEnhanceRecycle');

    const recycleNbtString = `{ISBEnhanceRecycle:"${recycleTag}"}`;
    player.server.runCommandSilent(`clear ${playerName} ${item.id}${recycleNbtString}`);

    player.give(Item.of(cleanItem.id, cleanItem.nbt));

    const scroll = Item.of('irons_spellbooks:scroll');
    const scrollNbt = scroll.nbt || {};
    scrollNbt.ISB_Spells = {
        data: [{
            id: recycleTag,
        }],
        maxSpells:1
    };
    scroll.nbt = scrollNbt;

    player.give(scroll);

    player.server.scheduleInTicks(10, () => {
        delete PLAYER_DISENHANCE_RECYCLE_DATA[playerName];
    });
});

ServerEvents.recipes(event => {
    event.shaped(
        Item.of('kubejs:tome_of_disenhancement', 4),
        [
            "PBP",
            "BDB",
            "PBP"
        ],
        {
            P: "minecraft:paper",
            B: "minecraft:book",
            D: "minecraft:diamond",
        }
    );
});