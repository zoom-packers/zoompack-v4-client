
function lootlib_p_getRandomRune() {
    const runes = [
        "fire_rune",
        "ice_rune",
        "lightning_rune",
        "ender_rune",
        "holy_rune",
        "blood_rune",
        "evocation_rune",
        "arcane_rune",
        "cooldown_rune",
        "protection_rune",
        "nature_rune"
    ];
    return "iron_spellbooks:" + runes[Math.floor(Math.random() * runes.length)];
}
function lootlib_p_getRandomTome() {
    const tomes = [
        "helmet_tome",
        "chestplate_tome",
        "leggings_tome",
        "boots_tome",
        "weapon_tome",
        "bow_tome",
        "pickaxe_tome",
        "fishing_tome",
        "scrap_tome",
        "improved_scrap_tome",
        "extraction_tome"
    ];
    return "apotheosis:" + tomes[Math.floor(Math.random() * tomes.length)];
}
function lootlib_p_getMaterial(rarity) {
    const materials = [
        "common_material",
        "uncommon_material",
        "rare_material",
        "epic_material",
        "mythic_material",
    ];
    if (rarity < 5) {
        return "apotheosis:" + materials[rarity];
    }
    const customMaterials = [
        "radiant_material",
        "celestial_material",
        "angelic_material",
        "godly_material"
    ];
    return "ze_apotheosis:" + customMaterials[rarity - 5];
}
function lootlib_p_getSigil(socketingChance) {
    const sigils = [
        "sigil_of_withdrawal",
        "sigil_of_enhancement"
    ];
    if (Math.random() < socketingChance) {
        sigils.push("sigil_of_socketing");
    }
    return "apotheosis:" + sigils[Math.floor(Math.random() * sigils.length)];
}
function lootlib_p_getAugment(power) {
    let augments = [
        "augment_pyromancer",
        "augment_cryomancer",
        "augment_electromancer",
        "augment_archevoker",
        "augment_cultist",
        "augment_shadowwalker",
        "augment_priest",
        "augment_plagued",
        "augment_cooldown",
        "augment_barbarian",
        "augment_berserker",
        "augment_crusader",
        "augment_archer",
        "augment_treasure_hunter",
        "augment_explorer",
        "augment_healer",
        "augment_tank",
        "augment_health",
        "augment_armor",
        "augment_mana",
        "augment_mana_regen"
    ];
    return `zoomers_magic:${augments[Math.floor(Math.random() * augments.length)]}_${power + 1}`;
}
function lootlib_p_getInk(rarity_index) {
    const inks = [
        "common_ink",
        "uncommon_ink",
        "rare_ink",
        "epic_ink",
        "legendary_ink"
    ];
    return "iron_spellbooks:" + inks[rarity_index];
}
function lootlib_p_getScroll(level) {
    let spells = [
        "irons_spellbooks:fireball",
        "irons_spellbooks:wall_of_fire",
        "irons_spellbooks:fire_breath",
        "irons_spellbooks:magma_bomb",
        "irons_spellbooks:scorch",
        "irons_spellbooks:burning_dash",
        "irons_spellbooks:blaze_storm",
        "irons_spellbooks:firebolt",
        "irons_spellbooks:flaming_barrage",
        "irons_spellbooks:flaming_strike",
        "irons_spellbooks:poison_arrow",
        "irons_spellbooks:earthquake",
        "irons_spellbooks:poison_splash",
        "irons_spellbooks:firefly_swarm",
        "irons_spellbooks:root",
        "irons_spellbooks:stomp",
        "irons_spellbooks:poison_breath",
        "irons_spellbooks:frostbite",
        "irons_spellbooks:ice_block",
        "irons_spellbooks:ray_of_frost",
        "irons_spellbooks:cone_of_cold",
        "irons_spellbooks:frost_step",
        "irons_spellbooks:frostwave",
        "irons_spellbooks:summon_polar_bear",
        "irons_spellbooks:icicle",
        "irons_spellbooks:arrow_volley",
        "irons_spellbooks:fang_ward",
        "irons_spellbooks:fang_strike",
        "irons_spellbooks:chain_creeper",
        "irons_spellbooks:gust",
        "irons_spellbooks:invisibility",
        "irons_spellbooks:summon_vex",
        "irons_spellbooks:lob_creeper",
        "irons_spellbooks:shield",
        "irons_spellbooks:summon_horse",
        "irons_spellbooks:spectral_hammer",
        "irons_spellbooks:firecracker",
        "irons_spellbooks:magic_missile",
        "irons_spellbooks:magic_arrow",
        "irons_spellbooks:teleport",
        "irons_spellbooks:dragon_breath",
        "irons_spellbooks:counterspell",
        "irons_spellbooks:echoing_strikes",
        "irons_spellbooks:starfall",
        "irons_spellbooks:sculk_tentacles",
        "irons_spellbooks:telekinesis",
        "irons_spellbooks:planar_sight",
        "irons_spellbooks:eldritch_blast",
        "irons_spellbooks:abyssal_shroud",
        "irons_spellbooks:sonic_boom",
        "irons_spellbooks:healing_circle",
        "irons_spellbooks:blessing_of_life",
        "irons_spellbooks:angel_wing",
        "irons_spellbooks:sunbeam",
        "irons_spellbooks:fortify",
        "irons_spellbooks:guiding_bolt",
        "irons_spellbooks:heal",
        "irons_spellbooks:wisp",
        "irons_spellbooks:divine_smite",
        "irons_spellbooks:cloud_of_regeneration",
        "irons_spellbooks:raise_dead",
        "irons_spellbooks:blood_slash",
        "irons_spellbooks:blood_step",
        "irons_spellbooks:acupuncture",
        "irons_spellbooks:ray_of_siphoning",
        "irons_spellbooks:blood_needles",
        "irons_spellbooks:sacrifice",
        "irons_spellbooks:heartstop",
        "irons_spellbooks:devour",
        "irons_spellbooks:wither_skull",
        "irons_spellbooks:thunder_step",
        "irons_spellbooks:thunderstorm",
        "irons_spellbooks:ascension",
        "irons_spellbooks:lightning_lance",
        "irons_spellbooks:shockwave",
        "irons_spellbooks:electrocute",
        "irons_spellbooks:lightning_bolt",
        "irons_spellbooks:ball_lightning",
        "irons_spellbooks:chain_lightning",
    ]
    return {
        type: "scroll",
        level: level,
        scrollType: spells[Math.floor(Math.random() * spells.length)]
    }
}
function lootlib_p_getGem(rarity_index) {
    return {
        type: "gem",
        rarity: global.GEM_RARIETIES[rarity_index],
        gemType: global.randomGem(global.GEM_TYPES)
    }
}

function lootlib_p_getFortunasMaterial(rarity) {
    let materials = [
        'common_material',
        'uncommon_material',
        'rare_material',
        'epic_material',
        'legendary_material',
        'mythic_material',
        'ascended_material'
    ];
    return `fortunas_anvil:${materials[rarity]}`;
}

function lootlib_p_getFortunasCatalyst(rarity) {
    let catalysts = [
        'common_catalyst',
        'uncommon_catalyst',
        'rare_catalyst',
        'epic_catalyst',
        'legendary_catalyst',
        'mythic_catalyst',
        'ascended_catalyst'
    ]
    return `fortunas_anvil:${catalysts[rarity]}`;
}

function lootlib_p_getSmithingTemplate(dimension) {
    switch (dimension) {
        case "blue_skies:everbright":
            return 'zoomers_armory:everbright_smithing_template';
        case "blue_skies:everdawn":
            return 'zoomers_armory:everbright_smithing_template';
        case "aether:the_aether":
            return 'zoomers_armory:aether_smithing_template';
        case "minecraft:the_nether":
            return 'minecraft:netherite_upgrade_smithing_template';
        case "undergarden:undergarden":
            return 'undergarden:forgotten_upgrade_smithing_template';
        case "minecraft:the_end":
            return 'enderitemod:enderite_upgrade_smithing_template';
        case "callfromthedepth_:depth":
            return 'callfromthedepth_:immemorialupgradesmithingtemplate';
        case "theabyss:the_abyss":
            return 'zoomers_armory:abyssal_smithing_template';
    }
}

function lootlib_p_getFortunasProtectionRune() {
    return 'fortunas_anvil:protection_rune';
}

function weightedEntry(item, weight) {
    return {item: item, weight: weight};
}

function rollWeightedTable(table) {
    let totalWeight = table.reduce((acc, entry) => acc + entry.weight, 0);
    let roll = Math.random() * totalWeight;
    for (let entry of table) {
        roll -= entry.weight;
        if (roll <= 0) {
            return entry.item;
        }
    }
}

function lootlib_getItemDetails(details) {
    if (typeof details === "string") {
        // return `{Item:{id:"${details}",Count:1}}`;
        return [details, null];
    }
    let type = details.type;
    let tag = "";
    let id = "";
    switch (type) {
        case "gem":
            let {rarity, gemType} = details;
            id = "apotheosis:gem";
            tag = `affix_data:{rarity:"${rarity}"},gem:"${gemType}"`;
            break;
        case "scroll":
            let {level, scrollType} = details;
            id = "irons_spellbooks:scroll";
            tag = `ISB_Spells:{data:[{id:"${scrollType}",index:0,level:${level},locked:1b}],maxSpells:1,mustEquip:0b,spellWheel:0b}`;
            break;
        default:
            break;
    }
    return [id,`{${tag}}`];
}

function lootlib_summonItem(details, entity) {
    let args = lootlib_getItemDetails(details)
    if (args[1] === null) {
        entity.block.popItem(Item.of(args[0],1));
    } else {
        entity.block.popItem(Item.of(args[0],1,args[1]));
    }
}

function overworldEliteDrops(rolls) {
    let drops = [];
    for (let i = 0; i < rolls; i++) {
        // Floating point rolls logic
        var remainder = rolls - i
        if (remainder > 0 && remainder < 1) {
            var randomRoll = Math.random();
            if (randomRoll >= remainder) {
                continue;
            }
        }
        let weighted = [
            weightedEntry(lootlib_p_getRandomRune(), 30),
            weightedEntry(lootlib_p_getRandomTome(), 3),
            weightedEntry(lootlib_p_getSigil(0), 1),
            weightedEntry(lootlib_p_getAugment(0), 2),
            weightedEntry(lootlib_p_getInk(0), 30),
            weightedEntry(lootlib_p_getScroll(1), 70),
            weightedEntry(lootlib_p_getMaterial(0), 10),
            weightedEntry(lootlib_p_getMaterial(1), 10),
            weightedEntry(lootlib_p_getMaterial(2), 5),
            weightedEntry(lootlib_p_getGem(0), 10),
            weightedEntry(lootlib_p_getGem(1), 10),
            weightedEntry(lootlib_p_getGem(2), 5),
            weightedEntry(lootlib_p_getFortunasMaterial(0), 10),
            weightedEntry(lootlib_p_getFortunasCatalyst(0), 10),
            weightedEntry(lootlib_p_getFortunasProtectionRune(), 3),
        ]
        drops.push(rollWeightedTable(weighted));
    }
    return drops;
}

function everbrightEliteDrops(rolls) {
    let drops = [];
    for (let i = 0; i < rolls; i++) {
        // Floating point rolls logic
        var remainder = rolls - i
        if (remainder > 0 && remainder < 1) {
            var randomRoll = Math.random();
            if (randomRoll >= remainder) {
                continue;
            }
        }
        let weighted = [
            weightedEntry(lootlib_p_getRandomRune(), 25),
            weightedEntry(lootlib_p_getRandomTome(), 5),
            weightedEntry(lootlib_p_getSigil(0.05), 1),
            weightedEntry(lootlib_p_getAugment(1), 5),
            weightedEntry(lootlib_p_getInk(0), 30),
            weightedEntry(lootlib_p_getInk(1), 10),
            weightedEntry(lootlib_p_getScroll(3), 30),
            weightedEntry(lootlib_p_getMaterial(0), 10),
            weightedEntry(lootlib_p_getMaterial(1), 10),
            weightedEntry(lootlib_p_getMaterial(2), 10),
            weightedEntry(lootlib_p_getMaterial(3), 5),
            weightedEntry(lootlib_p_getGem(0), 10),
            weightedEntry(lootlib_p_getGem(1), 10),
            weightedEntry(lootlib_p_getGem(2), 10),
            weightedEntry(lootlib_p_getGem(3), 5),
            weightedEntry(lootlib_p_getFortunasMaterial(0), 10),
            weightedEntry(lootlib_p_getFortunasMaterial(1), 5),
            weightedEntry(lootlib_p_getFortunasCatalyst(0), 10),
            weightedEntry(lootlib_p_getFortunasCatalyst(1), 5),
            weightedEntry(lootlib_p_getFortunasProtectionRune(), 5),
            weightedEntry(lootlib_p_getSmithingTemplate("blue_skies:everbright"), 5),
        ]
        drops.push(rollWeightedTable(weighted));
    }
    return drops;
}

function everdawnEliteDrops(rolls) {
    let drops = [];
    for (let i = 0; i < rolls; i++) {
        // Floating point rolls logic
        var remainder = rolls - i
        if (remainder > 0 && remainder < 1) {
            var randomRoll = Math.random();
            if (randomRoll >= remainder) {
                continue;
            }
        }
        let weighted = [
            weightedEntry(lootlib_p_getRandomRune(), 20),
            weightedEntry(lootlib_p_getRandomTome(), 10),
            weightedEntry(lootlib_p_getSigil(0.3), 3),
            weightedEntry(lootlib_p_getAugment(1), 10),
            weightedEntry(lootlib_p_getInk(0), 30),
            weightedEntry(lootlib_p_getInk(1), 20),
            weightedEntry(lootlib_p_getScroll(5), 30),
            weightedEntry(lootlib_p_getMaterial(1), 10),
            weightedEntry(lootlib_p_getMaterial(2), 10),
            weightedEntry(lootlib_p_getMaterial(3), 10),
            weightedEntry(lootlib_p_getMaterial(4), 5),
            weightedEntry(lootlib_p_getGem(1), 5),
            weightedEntry(lootlib_p_getGem(2), 10),
            weightedEntry(lootlib_p_getGem(3), 10),
            weightedEntry(lootlib_p_getGem(4), 5),
            weightedEntry(lootlib_p_getFortunasMaterial(0), 5),
            weightedEntry(lootlib_p_getFortunasMaterial(1), 10),
            weightedEntry(lootlib_p_getFortunasMaterial(2), 5),
            weightedEntry(lootlib_p_getFortunasCatalyst(0), 5),
            weightedEntry(lootlib_p_getFortunasCatalyst(1), 10),
            weightedEntry(lootlib_p_getFortunasCatalyst(2), 5),
            weightedEntry(lootlib_p_getFortunasProtectionRune(), 6),
            weightedEntry(lootlib_p_getSmithingTemplate("blue_skies:everbright"), 10),
        ]
        drops.push(rollWeightedTable(weighted));
    }
    return drops;
}

function aetherEliteDrops(rolls) {
    let drops = [];
    for (let i = 0; i < rolls; i++) {
        // Floating point rolls logic
        var remainder = rolls - i
        if (remainder > 0 && remainder < 1) {
            var randomRoll = Math.random();
            if (randomRoll >= remainder) {
                continue;
            }
        }
        let weighted = [
            weightedEntry(lootlib_p_getRandomRune(), 15),
            weightedEntry(lootlib_p_getRandomTome(), 15),
            weightedEntry(lootlib_p_getSigil(0.5), 5),
            weightedEntry(lootlib_p_getAugment(2), 15),
            weightedEntry(lootlib_p_getInk(1), 10),
            weightedEntry(lootlib_p_getInk(2), 3),
            weightedEntry(lootlib_p_getScroll(7), 20),
            weightedEntry(lootlib_p_getMaterial(2), 5),
            weightedEntry(lootlib_p_getMaterial(3), 7),
            weightedEntry(lootlib_p_getMaterial(4), 7),
            weightedEntry(lootlib_p_getMaterial(5), 5),
            weightedEntry(lootlib_p_getGem(1), 5),
            weightedEntry(lootlib_p_getGem(3), 7),
            weightedEntry(lootlib_p_getGem(4), 7),
            weightedEntry(lootlib_p_getGem(5), 5),
            weightedEntry(lootlib_p_getFortunasMaterial(1), 5),
            weightedEntry(lootlib_p_getFortunasMaterial(2), 10),
            weightedEntry(lootlib_p_getFortunasMaterial(3), 5),
            weightedEntry(lootlib_p_getFortunasCatalyst(1), 5),
            weightedEntry(lootlib_p_getFortunasCatalyst(2), 10),
            weightedEntry(lootlib_p_getFortunasCatalyst(3), 5),
            weightedEntry(lootlib_p_getFortunasProtectionRune(), 7),
            weightedEntry(lootlib_p_getSmithingTemplate("aether:the_aether"), 10),
        ]
        drops.push(rollWeightedTable(weighted));
    }
    return drops;
}

function netherEliteDrops(rolls) {
    let drops = [];
    for (let i = 0; i < rolls; i++) {
        // Floating point rolls logic
        var remainder = rolls - i
        if (remainder > 0 && remainder < 1) {
            var randomRoll = Math.random();
            if (randomRoll >= remainder) {
                continue;
            }
        }
        let weighted = [
            weightedEntry(lootlib_p_getRandomRune(), 10),
            weightedEntry(lootlib_p_getRandomTome(), 5),
            weightedEntry(lootlib_p_getSigil(1), 10),
            weightedEntry(lootlib_p_getAugment(3), 10),
            weightedEntry(lootlib_p_getInk(1), 5),
            weightedEntry(lootlib_p_getInk(2), 5),
            weightedEntry(lootlib_p_getInk(3), 3),
            weightedEntry(lootlib_p_getScroll(10), 15),
            weightedEntry(lootlib_p_getMaterial(3), 5),
            weightedEntry(lootlib_p_getMaterial(4), 10),
            weightedEntry(lootlib_p_getMaterial(5), 10),
            weightedEntry(lootlib_p_getMaterial(6), 5),
            weightedEntry(lootlib_p_getGem(3), 5),
            weightedEntry(lootlib_p_getGem(4), 10),
            weightedEntry(lootlib_p_getGem(5), 10),
            weightedEntry(lootlib_p_getGem(6), 5),
            weightedEntry(lootlib_p_getFortunasMaterial(2), 5),
            weightedEntry(lootlib_p_getFortunasMaterial(3), 10),
            weightedEntry(lootlib_p_getFortunasMaterial(4), 5),
            weightedEntry(lootlib_p_getFortunasCatalyst(2), 5),
            weightedEntry(lootlib_p_getFortunasCatalyst(3), 10),
            weightedEntry(lootlib_p_getFortunasCatalyst(4), 5),
            weightedEntry(lootlib_p_getFortunasProtectionRune(), 8),
            weightedEntry(lootlib_p_getSmithingTemplate("minecraft:the_nether"), 10),
        ]
        drops.push(rollWeightedTable(weighted));
    }
    return drops;
}

function undergardenEliteDrops(rolls) {
    let drops = [];
    for (let i = 0; i < rolls; i++) {
        // Floating point rolls logic
        var remainder = rolls - i
        if (remainder > 0 && remainder < 1) {
            var randomRoll = Math.random();
            if (randomRoll >= remainder) {
                continue;
            }
        }
        let weighted = [
            weightedEntry(lootlib_p_getRandomRune(), 10),
            weightedEntry(lootlib_p_getSigil(1), 5),
            weightedEntry(lootlib_p_getAugment(4), 10),
            weightedEntry(lootlib_p_getInk(2), 5),
            weightedEntry(lootlib_p_getInk(3), 5),
            weightedEntry(lootlib_p_getScroll(12), 10),
            weightedEntry(lootlib_p_getMaterial(4), 6),
            weightedEntry(lootlib_p_getMaterial(5), 6),
            weightedEntry(lootlib_p_getMaterial(6), 8),
            weightedEntry(lootlib_p_getGem(4), 5),
            weightedEntry(lootlib_p_getGem(5), 8),
            weightedEntry(lootlib_p_getGem(6), 1),
            weightedEntry(lootlib_p_getFortunasMaterial(3), 15),
            weightedEntry(lootlib_p_getFortunasMaterial(4), 3),
            weightedEntry(lootlib_p_getFortunasMaterial(5), 1),
            weightedEntry(lootlib_p_getFortunasCatalyst(3), 15),
            weightedEntry(lootlib_p_getFortunasCatalyst(4), 3),
            weightedEntry(lootlib_p_getFortunasCatalyst(5), 1),
            weightedEntry(lootlib_p_getFortunasProtectionRune(), 10),
            weightedEntry(lootlib_p_getSmithingTemplate("undergarden:undergarden"), 10),
        ]
        drops.push(rollWeightedTable(weighted));
    }
    return drops;
}

function endEliteDrops(rolls) {
    let drops = [];
    for (let i = 0; i < rolls; i++) {
        // Floating point rolls logic
        var remainder = rolls - i
        if (remainder > 0 && remainder < 1) {
            var randomRoll = Math.random();
            if (randomRoll >= remainder) {
                continue;
            }
        }
        let weighted = [
            weightedEntry(lootlib_p_getRandomRune(), 3),
            weightedEntry(lootlib_p_getSigil(1), 7),
            weightedEntry(lootlib_p_getAugment(5), 10),
            weightedEntry(lootlib_p_getInk(2), 5),
            weightedEntry(lootlib_p_getInk(3), 8),
            weightedEntry(lootlib_p_getInk(4), 1),
            weightedEntry(lootlib_p_getScroll(15), 5),
            weightedEntry(lootlib_p_getMaterial(4), 4),
            weightedEntry(lootlib_p_getMaterial(5), 8),
            weightedEntry(lootlib_p_getMaterial(6), 3),
            weightedEntry(lootlib_p_getMaterial(7), 1),
            weightedEntry(lootlib_p_getGem(4), 4),
            weightedEntry(lootlib_p_getGem(5), 8),
            weightedEntry(lootlib_p_getGem(6), 3),
            weightedEntry(lootlib_p_getGem(7), 1),
            weightedEntry(lootlib_p_getFortunasMaterial(3), 8),
            weightedEntry(lootlib_p_getFortunasMaterial(4), 5),
            weightedEntry(lootlib_p_getFortunasMaterial(5), 2),
            weightedEntry(lootlib_p_getFortunasCatalyst(3), 8),
            weightedEntry(lootlib_p_getFortunasCatalyst(4), 5),
            weightedEntry(lootlib_p_getFortunasCatalyst(5), 2),
            weightedEntry(lootlib_p_getFortunasProtectionRune(), 12),
            weightedEntry(lootlib_p_getSmithingTemplate("minecraft:the_end"), 10),
        ]
        drops.push(rollWeightedTable(weighted));
    }
    return drops;
}

function deepEliteDrops(rolls) {
    let drops = [];
    for (let i = 0; i < rolls; i++) {
        // Floating point rolls logic
        var remainder = rolls - i
        if (remainder > 0 && remainder < 1) {
            var randomRoll = Math.random();
            if (randomRoll >= remainder) {
                continue;
            }
        }
        let weighted = [
            weightedEntry(lootlib_p_getRandomRune(), 4),
            weightedEntry(lootlib_p_getSigil(1), 10),
            weightedEntry(lootlib_p_getAugment(6), 10),
            weightedEntry(lootlib_p_getInk(2), 5),
            weightedEntry(lootlib_p_getInk(3), 8),
            weightedEntry(lootlib_p_getInk(4), 4),
            weightedEntry(lootlib_p_getScroll(17), 4),
            weightedEntry(lootlib_p_getMaterial(5), 2),
            weightedEntry(lootlib_p_getMaterial(6), 5),
            weightedEntry(lootlib_p_getMaterial(7), 3),
            weightedEntry(lootlib_p_getMaterial(8), 1),
            weightedEntry(lootlib_p_getGem(5), 2),
            weightedEntry(lootlib_p_getGem(6), 5),
            weightedEntry(lootlib_p_getGem(7), 3),
            weightedEntry(lootlib_p_getGem(8), 1),
            weightedEntry(lootlib_p_getFortunasMaterial(4), 8),
            weightedEntry(lootlib_p_getFortunasMaterial(5), 5),
            weightedEntry(lootlib_p_getFortunasMaterial(6), 2),
            weightedEntry(lootlib_p_getFortunasCatalyst(4), 8),
            weightedEntry(lootlib_p_getFortunasCatalyst(5), 5),
            weightedEntry(lootlib_p_getFortunasCatalyst(6), 2),
            weightedEntry(lootlib_p_getFortunasProtectionRune(), 15),
            weightedEntry(lootlib_p_getSmithingTemplate("callfromthedepth_:depth"), 10),
        ]
        drops.push(rollWeightedTable(weighted));
    }
    return drops;
}

function abyssEliteDrops(rolls) {
    let drops = [];
    for (let i = 0; i < rolls; i++) {
        // Floating point rolls logic
        var remainder = rolls - i
        if (remainder > 0 && remainder < 1) {
            var randomRoll = Math.random();
            if (randomRoll >= remainder) {
                continue;
            }
        }
        let weighted = [
            weightedEntry(lootlib_p_getRandomRune(), 5),
            weightedEntry(lootlib_p_getSigil(1), 15),
            weightedEntry(lootlib_p_getAugment(7), 10),
            weightedEntry(lootlib_p_getInk(3), 8),
            weightedEntry(lootlib_p_getInk(4), 10),
            weightedEntry(lootlib_p_getScroll(19), 3),
            weightedEntry(lootlib_p_getMaterial(6), 3),
            weightedEntry(lootlib_p_getMaterial(7), 6),
            weightedEntry(lootlib_p_getMaterial(8), 8),
            weightedEntry(lootlib_p_getGem(6), 6),
            weightedEntry(lootlib_p_getGem(7), 7),
            weightedEntry(lootlib_p_getGem(8), 3),
            weightedEntry(lootlib_p_getGem(9), 1),
            weightedEntry(lootlib_p_getFortunasMaterial(4), 5),
            weightedEntry(lootlib_p_getFortunasMaterial(5), 5),
            weightedEntry(lootlib_p_getFortunasMaterial(6), 5),
            weightedEntry(lootlib_p_getFortunasCatalyst(4), 5),
            weightedEntry(lootlib_p_getFortunasCatalyst(5), 5),
            weightedEntry(lootlib_p_getFortunasCatalyst(6), 5),
            weightedEntry(lootlib_p_getFortunasProtectionRune(), 15),
            weightedEntry(lootlib_p_getSmithingTemplate("theabyss:the_abyss"), 10),
        ]
        drops.push(rollWeightedTable(weighted));
    }
    return drops;
}

function overworldFortunasDrop() {
    let weighted = [
        weightedEntry(lootlib_p_getFortunasMaterial(0), 10),
        weightedEntry(lootlib_p_getFortunasCatalyst(0), 10),
        weightedEntry(lootlib_p_getFortunasProtectionRune(), 3),
    ]
    return rollWeightedTable(weighted);
}

function everbrightFortunasDrop() {
    let weighted = [
        weightedEntry(lootlib_p_getFortunasMaterial(0), 10),
        weightedEntry(lootlib_p_getFortunasMaterial(1), 5),
        weightedEntry(lootlib_p_getFortunasCatalyst(0), 10),
        weightedEntry(lootlib_p_getFortunasCatalyst(1), 5),
        weightedEntry(lootlib_p_getFortunasProtectionRune(), 5),
    ]
    return rollWeightedTable(weighted);
}

function everdawnFortunasDrop() {
    let weighted = [
        weightedEntry(lootlib_p_getFortunasMaterial(0), 5),
        weightedEntry(lootlib_p_getFortunasMaterial(1), 10),
        weightedEntry(lootlib_p_getFortunasMaterial(2), 5),
        weightedEntry(lootlib_p_getFortunasCatalyst(0), 5),
        weightedEntry(lootlib_p_getFortunasCatalyst(1), 10),
        weightedEntry(lootlib_p_getFortunasCatalyst(2), 5),
        weightedEntry(lootlib_p_getFortunasProtectionRune(), 6),
    ]
    return rollWeightedTable(weighted);
}

function aetherFortunasDrop() {
    let weighted = [
        weightedEntry(lootlib_p_getFortunasMaterial(1), 5),
        weightedEntry(lootlib_p_getFortunasMaterial(2), 10),
        weightedEntry(lootlib_p_getFortunasMaterial(3), 5),
        weightedEntry(lootlib_p_getFortunasCatalyst(1), 5),
        weightedEntry(lootlib_p_getFortunasCatalyst(2), 10),
        weightedEntry(lootlib_p_getFortunasCatalyst(3), 5),
        weightedEntry(lootlib_p_getFortunasProtectionRune(), 7),
    ]
    return rollWeightedTable(weighted);
}

function netherFortunasDrop() {
    let weighted = [
        weightedEntry(lootlib_p_getFortunasMaterial(2), 5),
        weightedEntry(lootlib_p_getFortunasMaterial(3), 10),
        weightedEntry(lootlib_p_getFortunasMaterial(4), 5),
        weightedEntry(lootlib_p_getFortunasCatalyst(2), 5),
        weightedEntry(lootlib_p_getFortunasCatalyst(3), 10),
        weightedEntry(lootlib_p_getFortunasCatalyst(4), 5),
        weightedEntry(lootlib_p_getFortunasProtectionRune(), 8),
    ]
    return rollWeightedTable(weighted);
}

function undergardenFortunasDrop() {
    let weighted = [
        weightedEntry(lootlib_p_getFortunasMaterial(3), 15),
        weightedEntry(lootlib_p_getFortunasMaterial(4), 3),
        weightedEntry(lootlib_p_getFortunasMaterial(5), 1),
        weightedEntry(lootlib_p_getFortunasCatalyst(3), 15),
        weightedEntry(lootlib_p_getFortunasCatalyst(4), 3),
        weightedEntry(lootlib_p_getFortunasCatalyst(5), 1),
        weightedEntry(lootlib_p_getFortunasProtectionRune(), 10),
    ]
    return rollWeightedTable(weighted);
}

function endFortunasDrop() {
    let weighted = [
        weightedEntry(lootlib_p_getFortunasMaterial(3), 8),
        weightedEntry(lootlib_p_getFortunasMaterial(4), 5),
        weightedEntry(lootlib_p_getFortunasMaterial(5), 2),
        weightedEntry(lootlib_p_getFortunasCatalyst(3), 8),
        weightedEntry(lootlib_p_getFortunasCatalyst(4), 5),
        weightedEntry(lootlib_p_getFortunasCatalyst(5), 2),
        weightedEntry(lootlib_p_getFortunasProtectionRune(), 12),
    ]
    return rollWeightedTable(weighted);
}

function deepFortunasDrop() {
    let weighted = [
        weightedEntry(lootlib_p_getFortunasMaterial(4), 8),
        weightedEntry(lootlib_p_getFortunasMaterial(5), 5),
        weightedEntry(lootlib_p_getFortunasMaterial(6), 2),
        weightedEntry(lootlib_p_getFortunasCatalyst(4), 8),
        weightedEntry(lootlib_p_getFortunasCatalyst(5), 5),
        weightedEntry(lootlib_p_getFortunasCatalyst(6), 2),
        weightedEntry(lootlib_p_getFortunasProtectionRune(), 15),
    ]
    return rollWeightedTable(weighted);
}

function abyssFortunasDrop() {
    let weighted = [
        weightedEntry(lootlib_p_getFortunasMaterial(4), 5),
        weightedEntry(lootlib_p_getFortunasMaterial(5), 5),
        weightedEntry(lootlib_p_getFortunasMaterial(6), 5),
        weightedEntry(lootlib_p_getFortunasCatalyst(4), 5),
        weightedEntry(lootlib_p_getFortunasCatalyst(5), 5),
        weightedEntry(lootlib_p_getFortunasCatalyst(6), 5),
        weightedEntry(lootlib_p_getFortunasProtectionRune(), 15),
    ]
    return rollWeightedTable(weighted);
}


global.lootlib_getItemDetails = lootlib_getItemDetails;
global.lootlib_summonItem = lootlib_summonItem;
global.overworldEliteDrops = overworldEliteDrops;
global.everbrightEliteDrops = everbrightEliteDrops;
global.everdawnEliteDrops = everdawnEliteDrops;
global.aetherEliteDrops = aetherEliteDrops;
global.netherEliteDrops = netherEliteDrops;
global.undergardenEliteDrops = undergardenEliteDrops;
global.endEliteDrops = endEliteDrops;
global.deepEliteDrops = deepEliteDrops;
global.abyssEliteDrops = abyssEliteDrops;

global.overworldFortunasDrop = overworldFortunasDrop;
global.everbrightFortunasDrop = everbrightFortunasDrop;
global.everdawnFortunasDrop = everdawnFortunasDrop;
global.aetherFortunasDrop = aetherFortunasDrop;
global.netherFortunasDrop = netherFortunasDrop;
global.undergardenFortunasDrop = undergardenFortunasDrop;
global.endFortunasDrop = endFortunasDrop;
global.deepFortunasDrop = deepFortunasDrop;
global.abyssFortunasDrop = abyssFortunasDrop;
