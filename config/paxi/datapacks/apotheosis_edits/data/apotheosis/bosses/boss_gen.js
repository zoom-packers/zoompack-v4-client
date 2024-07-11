// CONFIG SECTION
allRarities = ["common", "uncommon", "rare", "epic", "mythic", "custom_0", "custom_1", "custom_2", "custom_3", "ancient"];
rarityModifiers = [1, 1.5, 2, 3, 4.5, 6, 8, 10, 12, 15];
// BOSSES SECTION

overrideOverworldBosses();
blueSkiesBosses();
aetherBosses();
overrideNetherBosses();
undergardenBosses();
overrideEndBosses();
deeperDarkerBosses();
abyssBosses();


function abyssBosses() {
    createBossFromDefault("theabyss:the_abyss",
        "theabyss:ice_knight",
        "overworld:zombie",
        "custom_3",
        "custom_3",
        20,
        40, 800, 50, 0.3, 20, 18);
    createBossFromDefault("theabyss:the_abyss",
        "theabyss:soul_guard",
        "overworld:zombie",
        "custom_3",
        "custom_3",
        20,
        40, 800, 50, 0.3, 20, 18);
    createBossFromDefault("theabyss:the_abyss",
        "theabyss:slime_spider",
        "overworld:zombie",
        "custom_3",
        "custom_3",
        20,
        40, 800, 50, 0.3, 20, 18);
    createBossFromDefault("theabyss:the_abyss",
        "theabyss:end_spider",
        "overworld:zombie",
        "custom_3",
        "custom_3",
        20,
        40, 800, 50, 0.3, 20, 18);
}
function deeperDarkerBosses() {
    createBossFromDefault("deeperdarker:otherside",
        "deeperdarker:skulk_leech",
        "overworld:zombie",
        "custom_1",
        "custom_2",
        20,
        34, 300, 30, 0.2, 16, 11);
    createBossFromDefault("deeperdarker:otherside",
        "deeperdarker:shattered",
        "overworld:zombie",
        "custom_1",
        "custom_3",
        20,
        35, 320, 30, 0.2, 16, 11);
    createBossFromDefault("deeperdarker:otherside",
        "deeperdarker:stalker",
        "overworld:zombie",
        "custom_2",
        "custom_3",
        20,
        36, 320, 30, 0.2, 16, 11);
}
function overrideEndBosses() {
    createBossFromDefault("minecraft:the_end",
        "minecraft:endermite",
        "overworld:zombie",
        "custom_0",
        "custom_1",
        20,
        29, 240, 27, 0.2, 14, 10);
    createBossFromDefault("minecraft:the_end",
        "minecraft:enderman",
        "overworld:zombie",
        "custom_0",
        "custom_2",
        20,
        30, 250, 28, 0.2, 14, 10);
    createBossFromDefault("minecraft:the_end",
        "minecraft:phantom",
        "overworld:zombie",
        "custom_0",
        "custom_2",
        20,
        30, 250, 28, 0.2, 14, 10);
    createBossFromDefault("minecraft:the_end",
        "minecraft:shulker",
        "overworld:zombie",
        "custom_0",
        "custom_2",
        20,
        30, 250, 28, 0.2, 14, 10);
    createBossFromDefault("minecraft:the_end",
        "minecraft:evoker",
        "overworld:zombie",
        "custom_1",
        "custom_2",
        20,
        30, 250, 28, 0.2, 14, 10);
}
function undergardenBosses() {
    createBossFromDefault("undergarden:undergarden",
        "undergarden:rotling",
        "overworld:zombie",
        "mythic",
        "custom_0",
        20,
        22, 200, 22, 0.2, 14, 8);
    createBossFromDefault("undergarden:undergarden",
        "undergarden:rotwalker",
        "overworld:zombie",
        "mythic",
        "custom_1",
        20,
        24, 220, 24, 0.2, 14, 8);
    createBossFromDefault("undergarden:undergarden",
        "undergarden:rotbeast",
        "overworld:zombie",
        "custom_0",
        "custom_1",
        20,
        26, 230, 25, 0.2, 14, 8);
}
function overrideNetherBosses() {
    createBossFromDefault("minecraft:the_nether",
        "minecraft:blaze",
        "overworld:zombie",
        "epic",
        "mythic",
        20,
        15, 150, 15, 0.2, 10, 5);
    createBossFromDefault("minecraft:the_nether",
        "minecraft:piglin",
        "overworld:zombie",
        "epic",
        "custom_0",
        20,
        16, 160, 16, 0.2, 11, 6);
    createBossFromDefault("minecraft:the_nether",
        "minecraft:zombified_piglin",
        "overworld:zombie",
        "epic",
        "custom_0",
        20,
        17, 170, 17, 0.2, 12, 6);
    createBossFromDefault("minecraft:the_nether",
        "minecraft:wither_skeleton",
        "overworld:zombie",
        "epic",
        "custom_0",
        20,
        18, 180, 18, 0.2, 13, 7);
    createBossFromDefault("minecraft:the_nether",
        "minecraft:piglin_brute",
        "overworld:zombie",
        "mythic",
        "custom_0",
        20,
        19, 180, 18, 0.2, 13, 7);
    createBossFromDefault("minecraft:the_nether",
        "minecraft:zoglin",
        "overworld:zombie",
        "mythic",
        "custom_0",
        20,
        20, 180, 18, 0.2, 13, 7);
}
function aetherBosses() {
    createBossFromDefault("aether:the_aether",
        "aether:zephyr",
        "overworld:zombie",
        "rare",
        "epic",
        20,
        10, 110, 10, 0.2, 7, 4);
    createBossFromDefault("aether:the_aether",
        "aether:mimic",
        "overworld:zombie",
        "rare",
        "mythic",
        20,
        11, 120, 11, 0.2, 8, 4);
    createBossFromDefault("aether:the_aether",
        "aether:valkyrie",
        "overworld:zombie",
        "rare",
        "mythic",
        20,
        12, 130, 12, 0.2, 8, 5);
    createBossFromDefault("aether:the_aether",
        "aether:fire_minion",
        "overworld:zombie",
        "epic",
        "mythic",
        20,
        13, 140, 12, 0.2, 9, 5);
}
function blueSkiesBosses() {
    createBossFromDefault("blue_skies:everbright",
        "blue_skies:polargeist",
        "overworld:zombie",
        "uncommon",
        "rare",
        20,
        5, 60, 5, 0, 7, 2);
    createBossFromDefault("blue_skies:everbright",
        "blue_skies:armored_frost_spirit",
        "overworld:zombie",
        "uncommon",
        "rare",
        20,
        6, 70, 6, 0.1, 7, 2);
    createBossFromDefault("blue_skies:everbright",
        "blue_skies:crynocerous",
        "overworld:zombie",
        "uncommon",
        "epic",
        20,
        7, 80, 7, 0.2, 7, 2);

    createBossFromDefault("blue_skies:everdawn",
        "blue_skies:venom_spider",
        "overworld:zombie",
        "uncommon",
        "epic",
        20,
        8, 80, 8, 0.2, 8, 3);
    createBossFromDefault("blue_skies:everdawn",
        "minecraft:vindicator",
        "overworld:zombie",
        "rare",
        "epic",
        20,
        9, 90, 8, 0.1, 8, 3);
    createBossFromDefault("blue_skies:everdawn",
        "blue_skies:emberback",
        "overworld:zombie",
        "rare",
        "epic",
        20,
        10, 90, 9, 0.2, 9, 3);
}
function overrideOverworldBosses(){

    createBossFromDefault("minecraft:overworld",
        "minecraft:husk",
        "overworld:zombie",
        "common",
        "uncommon",
        20,
        1, 30, 2, 0, 3, 1);
    createBossFromDefault("minecraft:overworld",
        "minecraft:zombie",
        "overworld:zombie",
        "common",
        "uncommon",
        20,
        1, 30, 2, 0, 3, 1);
    createBossFromDefault("minecraft:overworld",
        "minecraft:skeleton",
        "overworld:zombie",
        "common",
        "uncommon",
        20,
        1, 30, 2, 0, 3, 1);
    createBossFromDefault("minecraft:overworld",
        "minecraft:stray",
        "overworld:zombie",
        "common",
        "uncommon",
        20,
        2, 30, 3, 0, 3, 1);
    createBossFromDefault("minecraft:overworld",
        "minecraft:witch",
        "overworld:zombie",
        "common",
        "uncommon",
        20,
        3, 40, 3, 0, 3, 1);
    createBossFromDefault("minecraft:overworld",
        "minecraft:vindicator",
        "overworld:zombie",
        "uncommon",
        "uncommon",
        20,
        4, 50, 3, 0, 4, 2);
}



// BULK SCRIPT SECTION
let fs = require("fs");

function roundToDecimal(value, decimal) {
    let pow = Math.pow(10, decimal);
    return Math.round((value + Number.EPSILON) * pow) / pow;
}

function readDefaultBossFile(bossId) {
    let path = bossId.split(":").join("/") + ".json";
    let fs = require("fs");
    let fileContent = fs.readFileSync(path);
    let json = JSON.parse(fileContent);
    return json;
}

function addAttributeModifierAdditive(entry, attribute, value) {
    entry.attribute_modifiers.push({
        attribute: attribute,
        operation: "ADDITION",
        value: value
    });
}
function addAttributeModifierMultiplyBase(entry, attribute, value) {
    entry.attribute_modifiers.push({
        attribute: attribute,
        operation: "ADDITION",
        value: value
    });
}

function processBonuses(boss, minRarity, maxRarity, healthAdd, damageAdd, speedMul, armorAdd, armorToughenessAdd) {
    let stats = boss.stats;
    let allStatKeys = Object.keys(stats);
    let firstStatKey = allStatKeys[0];
    let firstStat = stats[firstStatKey];
    firstRarirtIndex = allRarities.indexOf(minRarity);
    lastRarityIndex = allRarities.indexOf(maxRarity);
    boss.stats = {};
    for (let i = firstRarirtIndex; i <= lastRarityIndex; i++) {
        let rarity = allRarities[i];
        let rarityModifier = rarityModifiers[i];
        let entry = JSON.parse(JSON.stringify(firstStat));

        entry.enchant_chance = 0.5;
        entry.enchantment_levels = [0,0,0,0];
        entry.effects = [];
        entry.attribute_modifiers = [];
        addAttributeModifierAdditive(entry, "minecraft:generic.max_health", healthAdd * (1 + rarityModifier));
        addAttributeModifierAdditive(entry, "minecraft:generic.attack_damage", damageAdd * (1 + rarityModifier));
        addAttributeModifierMultiplyBase(entry, "minecraft:generic.movement_speed", speedMul);
        addAttributeModifierAdditive(entry, "minecraft:generic.armor", armorAdd * (1 + rarityModifier));
        addAttributeModifierAdditive(entry, "minecraft:generic.armor_toughness", armorToughenessAdd * (1 + rarityModifier));

        boss.stats[rarity] = entry
    }
}

function createDimensionFolder(dimensionName) {
    let fs = require("fs");
    if (!fs.existsSync(dimensionName)) {
        fs.mkdirSync(dimensionName);
    }
}

function createBossFromDefault(bossDimension, bossEntity, bossTemplateId, minRarity, maxRarity, weight, quality, healthAdd, damageAdd, speedMul, armorAdd, armorToughenessAdd) {
    let dimensionName = bossDimension.split(":")[1];
    let mobName = bossEntity.split(":")[1];
    let boss = readDefaultBossFile(bossTemplateId);
    boss.dimensions = [bossDimension];
    boss.entity = bossEntity;
    boss.valid_gear_sets = [];
    boss.weight = weight;
    boss.quality = quality;
    boss.min_rarity = minRarity;
    boss.max_rarity = maxRarity;
    boss.replace = true;
    processBonuses(boss, minRarity, maxRarity, healthAdd, damageAdd, speedMul, armorAdd, armorToughenessAdd);
    createDimensionFolder(dimensionName);
    let bossJson = JSON.stringify(boss, null, 2);
    let fs = require("fs");
    fs.writeFileSync(dimensionName + "/" + mobName + ".json", bossJson);
}
