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

/**
 * Calculates The total Experience a player has, while taking into account the player level, and the offset
 * @param {levels} The level a player currently is at
 * @param {expOffset} The extra exp a player has, at it's current level
 * @return {*|number}
 */
function levelsAndExperienceOffsetToRawExperience(levels, expOffset) {
    if (levels <= 16) {
        return levels * levels + 6 * levels + expOffset;
    } else if (levels <= 31) {
        return Math.round(2.5 * levels * levels - 40.5 * levels + 360) + expOffset;
    } else {
        return Math.round(4.5 * levels * levels - 162.5 * levels + 2220) + expOffset;
    }
}


/**
 * Calculates the Level and Experience leftovers that needs to be set to the player, from the rawExp value
 * @param {number} rawExp The total experience a player has
 * @return {{level: number, expOffset: number}} The values that need to be set to the player
 */
function rawExperienceToLevelsAndExperienceOffset(rawExp) {
    let level = 0;
    let expOffset = 0;

    // Level 0-16: rawExp = level² + 6*level + expOffset
    // At level 16: rawExp = 16² + 6*16 = 256 + 96 = 352
    if (rawExp < 352) {
        // Solve quadratic equation: level² + 6*level + (expOffset - rawExp) = 0
        // Use quadratic formula with discriminant approach
        let discriminant = 36 + 4 * rawExp; // 6² + 4*1*rawExp
        level = Math.floor((-6 + Math.sqrt(discriminant)) / 2);

        // Ensure level doesn't go below 0 or above 16
        level = Math.max(0, Math.min(16, level));

        expOffset = rawExp - (level * level + 6 * level);
    }
        // Level 17-31: rawExp = 2.5*level² - 40.5*level + 360 + expOffset
    // At level 31: rawExp = 2.5*31² - 40.5*31 + 360 = 2402.5 - 1255.5 + 360 = 1507
    else if (rawExp < 1507) {
        // Solve quadratic equation: 2.5*level² - 40.5*level + (360 + expOffset - rawExp) = 0
        let discriminant = 40.5 * 40.5 - 4 * 2.5 * (360 - rawExp); // b² - 4ac
        level = Math.floor((40.5 + Math.sqrt(discriminant)) / (2 * 2.5));

        // Ensure level is in range 17-31
        level = Math.max(17, Math.min(31, level));

        expOffset = rawExp - Math.round(2.5 * level * level - 40.5 * level + 360);
    }
    // Level 32+: rawExp = 4.5*level² - 162.5*level + 2220 + expOffset
    else {
        // Solve quadratic equation: 4.5*level² - 162.5*level + (2220 + expOffset - rawExp) = 0
        let discriminant = 162.5 * 162.5 - 4 * 4.5 * (2220 - rawExp); // b² - 4ac
        level = Math.floor((162.5 + Math.sqrt(discriminant)) / (2 * 4.5));

        // Ensure level is at least 32
        level = Math.max(32, level);

        expOffset = rawExp - Math.round(4.5 * level * level - 162.5 * level + 2220);
    }

    // Ensure expOffset is non-negative
    expOffset = Math.max(0, expOffset);

    return { level: level, expOffset: expOffset };
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
        let rawExp = player.totalExperience;
        let xpToDrop = getXPToDrop(mainHandItemID);
        let multiplier = 1;
        if(isCrouching){
            multiplier = Math.min(Math.floor(rawExp / xpToDrop), 64);
            xpToDrop *= multiplier;
        }
        if (rawExp < xpToDrop) {
            player.sendSystemMessage("You don't have enough experience.")
            return;
        }
        let newExp = rawExp - xpToDrop;
        let result = rawExperienceToLevelsAndExperienceOffset(newExp);
        player.give(Item.of(XP_ITEM_CUTTER_TO_ORBE[mainHandItemID], multiplier));
        player.experienceLevel = result.level;
        player.totalExperience = newExp;
        player.experienceProgress = result.expOffset / player.getXpNeededForNextLevel();
    }

    if (mainHandItemID.includes('_experience_orbe')) {
        let howManyToUse = 1;
        if(isCrouching){
            howManyToUse = player.mainHandItem.count;
        }
        let remainingCount = player.mainHandItem.count-howManyToUse;

        let xpToRecieve = XP_ITEM_TRANSFERS[XP_ITEM_ORBE_TO_CUTTER[mainHandItemID]]*howManyToUse;
        // let rawExp = levelsAndExperienceOffsetToRawExperience(player.getXpLevel(), player.getXp());
        let rawExp = player.totalExperience;
        let newExp = rawExp + xpToRecieve;
        let result = rawExperienceToLevelsAndExperienceOffset(newExp);
        player.experienceLevel = result.level;
        player.totalExperience = newExp;
        player.experienceProgress = result.expOffset / player.getXpNeededForNextLevel();

        player.mainHandItem.count = remainingCount;
    }
});
