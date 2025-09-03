const XP_ITEM_TRANSFERS = {
    'kubejs:golden_experience_cutter': 10,
    'kubejs:diamond_experience_cutter': 100,
    'kubejs:horizonite_experience_cutter': 1000,
    'kubejs:netherite_experience_cutter': 10000,
    'kubejs:immemorial_experience_cutter': 100000,
    'kubejs:fusion_experience_cutter': 1000000
}

const XP_ITEM_CUTTER_TO_ORBE = {
    'kubejs:golden_experience_cutter': 'kubejs:golden_experience_orbe',
    'kubejs:diamond_experience_cutter': 'kubejs:diamond_experience_orbe',
    'kubejs:horizonite_experience_cutter': 'kubejs:horizonite_experience_orbe',
    'kubejs:netherite_experience_cutter': 'kubejs:netherite_experience_orbe',
    'kubejs:immemorial_experience_cutter': 'kubejs:immemorial_experience_orbe',
    'kubejs:fusion_experience_cutter': 'kubejs:fusion_experience_orbe'
}

const XP_ITEM_ORBE_TO_CUTTER = {
    'kubejs:golden_experience_orbe': 'kubejs:golden_experience_cutter',
    'kubejs:diamond_experience_orbe': 'kubejs:diamond_experience_cutter',
    'kubejs:horizonite_experience_orbe': 'kubejs:horizonite_experience_cutter',
    'kubejs:netherite_experience_orbe': 'kubejs:netherite_experience_cutter',
    'kubejs:immemorial_experience_orbe': 'kubejs:immemorial_experience_cutter',
    'kubejs:fusion_experience_orbe': 'kubejs:fusion_experience_cutter'
}

function getXPToDrop(item_id) {
    if (XP_ITEM_TRANSFERS.hasOwnProperty(item_id)) {
        return XP_ITEM_TRANSFERS[item_id];
    }
    return 0;
}

function clearFromPlayer(player_name, item, server) {
    server.runCommandSilent(`/clear ${player_name} ${item} 1`);
}

ItemEvents.rightClicked(event => {
    let player = event.player;
    let server = event.server;
    let player_name = player.name.string;
    let mainHandItemID = player.mainHandItem.item.getId();

    if (mainHandItemID.includes('_experience_cutter')) {
        let xpToDrop = getXPToDrop(mainHandItemID);
        if (xpToDrop > 0) {
            let playerXP = player.getXp();
            if (playerXP > xpToDrop) {
                player.addXP((-1) * xpToDrop);
                player.give(Item.of(XP_ITEM_CUTTER_TO_ORBE[mainHandItemID]));
            }
        }
    }

    if (mainHandItemID.includes('_experience_orbe')) {
        let xpToRecieve = XP_ITEM_TRANSFERS[XP_ITEM_ORBE_TO_CUTTER[mainHandItemID]];
        player.addXP(xpToRecieve);
        clearFromPlayer(player_name, mainHandItemID, server)
    }
});



ServerEvents.recipes(event => {
    event.shaped('1x kubejs:golden_experience_cutter',
        ["IIS", "ISE", "SEE"],
        { "I": "minecraft:gold_ingot", "E": "minecraft:experience_bottle", "S": "minecraft:stick" });

    event.shaped('1x kubejs:diamond_experience_cutter',
        ["IIS", "ISE", "SEE"],
        { "I": "minecraft:diamond", "E": "minecraft:experience_bottle", "S": "minecraft:stick" });

    event.shaped('1x kubejs:horizonite_experience_cutter',
        ["IIS", "ISE", "SEE"],
        { "I": "blue_skies:horizonite_ingot", "E": "minecraft:experience_bottle", "S": "minecraft:stick" });

    event.shaped('1x kubejs:netherite_experience_cutter',
        ["IIS", "ISE", "SEE"],
        { "I": "minecraft:netherite_ingot", "E": "minecraft:experience_bottle", "S": "minecraft:stick" });

    event.shaped('1x kubejs:immemorial_experience_cutter',
        ["IIS", "ISE", "SEE"],
        { "I": "callfromthedepth_:immemorialingot", "E": "minecraft:experience_bottle", "S": "minecraft:stick" });

    event.shaped('1x kubejs:fusion_experience_cutter',
        ["IIS", "ISE", "SEE"],
        { "I": "theabyss:fusion_ingot", "E": "minecraft:experience_bottle", "S": "minecraft:stick" });
});