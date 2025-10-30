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

const COOLDOWN_TICKS = 20;

function getXPToDrop(item_id) {
    if (XP_ITEM_TRANSFERS.hasOwnProperty(item_id)) {
        return XP_ITEM_TRANSFERS[item_id];
    }
    return 0;
}


ItemEvents.rightClicked(event => {
    let player = event.player;
    let server = event.server;
    let level = event.level;
    let player_name = player.name.string;
    let mainHandItemID = player.mainHandItem.item.getId();
    const isCrouching = player.isCrouching();

    let lastUseKey = `last_${player_name}_exp_tool_use`;
    let lastUse = player.persistentData.getLong(lastUseKey) || 0;
    let nowTicks = level.time;

    if (nowTicks - lastUse < COOLDOWN_TICKS) {
        event.cancel();
        return;
    }

    player.persistentData.putLong(lastUseKey, nowTicks);

    if (mainHandItemID.includes('_experience_cutter')) {
        let multiplier = 1;
        if(isCrouching){
            multiplier = 64;
        }
        let xpToDrop = getXPToDrop(mainHandItemID)*multiplier;
        if (xpToDrop > 0) {
            let playerXP = player.getXp();
            if (playerXP > xpToDrop) {
                player.addXP((-1) * xpToDrop);
                player.give(Item.of(XP_ITEM_CUTTER_TO_ORBE[mainHandItemID], multiplier));
            }
            else{
                player.tell('§e§lTo Enough Experience, try a lower Cutter or gather some experience');
            }
        }
    }

    if (mainHandItemID.includes('_experience_orbe')) {
        let howManyToUse = 1;
        if(isCrouching){
            howManyToUse = player.mainHandItem.count;
        }
        let remainingCount = player.mainHandItem.count-howManyToUse;

        let xpToRecieve = XP_ITEM_TRANSFERS[XP_ITEM_ORBE_TO_CUTTER[mainHandItemID]]*howManyToUse;
        player.addXP(xpToRecieve);

        player.mainHandItem.count = remainingCount;
    }
});