//priority: 996

let DEFAULT_GEM_DROP_CHANCE = 0.045;

// RARITIES
// 0-9
let RARITIES = [
    "common", // 0
    "uncommon", // 1
    "rare", // 2
    "epic", // 3
    "mythic", // 4
    "custom_0", // 5 // radiant
    "custom_1", // 6 //celestial
    "custom_2", // 7 // angelic
    "custom_3", // 8 // godly
    "ancient" // 9 //perfect
]
let MAX_RARITY_LOOTABLE = RARITIES.length - 1;

let BOSSES = ['minecraft:elder_guardian', 'aquamirae:captain_cornelia', 'aquamirae:maze_mother', 'aquamirae:eel', 'bosses_of_mass_destruction:lich', 'bosses_of_mass_destruction:void_blossom', 'blue_skies:alchemist', 'blue_skies:arachnarch', 'blue_skies:arachnarch', 'blue_skies:summoner', 'aether:slider', 'lost_aether_content:aerwhale_king', 'aether:valkyrie', 'aether:sun_spirit', 'minecraft:wither', 'bosses_of_mass_destruction:gauntlet', 'callfromthedepth_:agonysoul', 'call_of_yucutan:kukulkan', 'call_of_yucutan:ah_puch', 'mokels_boss_mantyd:boss_mantyd', 'minecraft:ender_dragon', 'bosses_of_mass_destruction:obsidilith', 'theabyss:abyssaur', 'theabyss:elder', 'theabyss:nightblade_boss', 'theabyss:the_roka', 'theabyss:crystal_golem', 'theabyss:magician'];

let DIMENSION_RARITIES = {
    'minecraft:overworld': {
        'min': 0,
        'max': 2
    },
    'blue_skies:everbright': {
        'min': 0,
        'max': 2
    },
    'blue_skies:everdawn': {
        'min': 1,
        'max': 3
    },
    'aether:the_aether': {
        'min': 2,
        'max': 4
    },
    'minecraft:the_nether': {
        'min': 3,
        'max': 5
    },
    'undergarden:undergarden': {
        'min': 3,
        'max': 5
    },
    'minecraft:the_end': {
        'min': 3,
        'max': 6
    },
    'callfromthedepth_:depth': {
        'min': 4,
        'max': 6
    },
    'theabyss:the_abyss': {
        'min': 4,
        'max': 7
    },
    'theabyss:frost_world': {
        'min': 4,
        'max': 7
    }
}

//GEM TYPES
let GEM_TYPES = {
    "apotheosis:core/ballast": 1,
    "apotheosis:core/brawlers": 1,
    "apotheosis:core/breach": 1,
    "apotheosis:core/combatant": 1,
    "apotheosis:core/guardian": 1,
    "apotheosis:core/lightning": 1,
    "apotheosis:core/lunar": 1,
    "apotheosis:core/samurai": 1,
    "apotheosis:core/slipstream": 1,
    "apotheosis:core/solar": 1,
    "apotheosis:core/splendor": 1,
    "apotheosis:core/tyrannical": 1,
    "apotheosis:core/warlord": 1,
    "apotheosis:overworld/earth": 1,
    "apotheosis:overworld/royalty": 1,
    "apotheosis:the_nether/blood_lord": 1,
    "apotheosis:the_nether/inferno": 1,
    "apotheosis:the_end/endersurge": 1,
    "apotheosis:the_end/mageslayer": 1,
    "apotheosis:twilight/forest": 1,
    "apotheosis:twilight/queen": 1,
    'EQ_magic': {
        "zoomers_magic_apotheosis:magic_gems/spell_blood": 1,
        "zoomers_magic_apotheosis:magic_gems/spell_eldritch": 1,
        "zoomers_magic_apotheosis:magic_gems/spell_ender": 1,
        "zoomers_magic_apotheosis:magic_gems/spell_evocation": 1,
        "zoomers_magic_apotheosis:magic_gems/spell_fire": 1,
        "zoomers_magic_apotheosis:magic_gems/spell_general": 1,
        "zoomers_magic_apotheosis:magic_gems/spell_holy": 1,
        "zoomers_magic_apotheosis:magic_gems/spell_ice": 1,
        "zoomers_magic_apotheosis:magic_gems/spell_lightning": 1,
        "zoomers_magic_apotheosis:magic_gems/spell_nature": 1,
        "zoomers_magic_apotheosis:magic_gems/deepdiver": 1
    },
    'EQ_xp_boost': {
        "irons_spellbooks:blood": 1,
        "irons_spellbooks:cast_time": 1,
        "irons_spellbooks:cooldown": 1,
        "irons_spellbooks:ender": 1,
        "irons_spellbooks:evocation": 1,
        "irons_spellbooks:fire": 1,
        "irons_spellbooks:holy": 1,
        "irons_spellbooks:ice": 1,
        "irons_spellbooks:intelligent": 1,
        "irons_spellbooks:lightning": 1,
        "irons_spellbooks:nature": 1,
        "irons_spellbooks:spell_resist": 1,
        "irons_spellbooks:summoning": 1
    }

}

function willGemDrop() {
    const randomChance = Math.random();

    if (randomChance <= DEFAULT_GEM_DROP_CHANCE) {
        return true;
    } else {
        return false;
    }
}

function getRandomBetween(min, max) {
    if (min > max) {
        [min, max] = [max, min];
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomGem(gemTypes) {
    const keys = Object.keys(gemTypes);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];

    if (randomKey.startsWith("EQ_")) {
        const eqMagic = gemTypes[randomKey];
        return randomGem(eqMagic);
    } else {
        return randomKey
    }
}

function getRandomGem() {
    return randomGem(GEM_TYPES);
}

function isMobBoss(entity) {
    return BOSSES.includes(entity.getType());
}

function getRarity(entity) {
    let dimension = entity.level.dimension;

    if (DIMENSION_RARITIES[dimension]) {
        let min = DIMENSION_RARITIES[dimension]['min'];
        let max = DIMENSION_RARITIES[dimension]['max'];

        return RARITIES[getRandomBetween(min, max)];
    }

    return RARITIES[0];
}

function getBoostedRarity(entity, boost) {
    let dimension = entity.level.dimension;

    if (DIMENSION_RARITIES[dimension]) {
        let min = DIMENSION_RARITIES[dimension]['min'];
        let max = DIMENSION_RARITIES[dimension]['max'];

        return RARITIES[getRandomBetween(Math.min(min + boost, MAX_RARITY_LOOTABLE), Math.min(max + boost, MAX_RARITY_LOOTABLE))];
    }

    return RARITIES[0];
}

function summonGem(server, dimension, rarity, gem, count, x, y, z) {
    server.runCommandSilent(`execute in ${dimension} run execute summon minecraft:item ${x} ${y} ${z} {Item:{id:"apotheosis:gem",Count:${count},tag:{affix_data:{rarity:"${rarity}"},gem:"${gem}"}}}`)
}


function summonForEachPlayerInRange(server, x, y, z, dimension, rarity, gem) {
    let COMMAND = `execute in ${dimension} run execute positioned ${x} ${y} ${z} run execute as @p[distance=..15] run give @s apotheosis:gem{affix_data:{rarity:"${rarity}"},gem:"${gem}"}`
    console.log(COMMAND);
    server.runCommandSilent(COMMAND);
}

EntityEvents.death(event => {
    let player = event.source.player;
    if (player != null) {
        let server = event.server;
        let entity = event.entity;

        if (player.getType() === 'minecraft:player') {
            if (isEntityAllowed(entity)) {

                let x = entity.x;
                let y = entity.y;
                let z = entity.z;

                let gem = getRandomGem();
                let rarity = getRarity(entity);

                if (isMobBoss(entity)) {
                    summonForEachPlayerInRange(server, x, y, z, entity.level.dimension, rarity, gem);
                }
                if (willGemDrop()) {
                    summonGem(server, entity.level.dimension, rarity, gem, 1, x, y, z);
                }
            }
        }
    }
})

global.randomGem = getRandomGem;
global.GEM_TYPES = GEM_TYPES;
global.GEM_RARIETIES = RARITIES;
