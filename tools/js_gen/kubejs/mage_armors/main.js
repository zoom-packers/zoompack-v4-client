const fs = require("fs");
const {item_irons_spellbooks} = require("../../libs/item_typedefs");
const {getHelmetName, getChestplateName, getLeggingsName, getBootsName, chestplates, helmets, leggings, boots,
    getItemJson, getArmorJson
} = require("./data");
const {ensureDirSync} = require("../../../sync_util");

const outputDir = "../../../../kubejs";
const scriptPath = `${outputDir}/startup_scripts/mage_armors.js`;
const assetsPath = `${outputDir}/assets`;

const template = `
ItemEvents.armorTierRegistry(event => {
    global.createArmorTier(event, {tierId}, {durabilityMultiplier}, {slotProtections}, {armorToughness}, {knockbackResistance}, {repairIngredientTag});
});

StartupEvents.registry("item", e => {
    const result = global.createGeckoArmorTier(e, {modId}, {tierId}, global.getMaterialTexturesObject({modId}, {tierId}), {helmName}, {chestName}, {legName}, {bootName}, {nameSuffix},
    {modelPath}, {texturePath}, {modelPath}, {texturePath}, {modelPath}, {texturePath}, {modelPath}, {texturePath});
});
`

const tiers = 7;
const durabilityMultipliers = [
    45, 79, 105, 158, 238, 272, 389, 437
]
const slotProtections = [
    [4, 9, 7, 4],
    [6, 11, 9, 6],
    [9, 18, 15, 12],
    [14, 22, 17, 14],
    [35, 55, 47, 35],
    [54, 79, 67, 54],
    [95, 126, 105, 94],
]
const armorToughnesses = [
    2, 4, 7, 9, 11, 13, 14
]
const knockbackResistances = [
    0, 0, 0, 0, 0, 0, 0
]
const repairIngredientTags = [
    "minecraft:diamond",
    "minecraft:emerald",
    "minecraft:netherite_ingot",
    "kubejs:item/cincinnasite_ingot",
    "kubejs:item/cincinnasite_ingot",
    "kubejs:item/cincinnasite_ingot",
    "kubejs:item/cincinnasite_ingot",
    "kubejs:item/cincinnasite_ingot"
]

function createKubeJsScript() {
    let result = ""
    for (let tierIndex = 0; tierIndex < tiers; tierIndex++) {
        const formattedTierIndex = tierIndex + 2;

        const durabilityMultiplier = durabilityMultipliers[tierIndex];
        const slotProtection = slotProtections[tierIndex];
        const armorToughness = armorToughnesses[tierIndex];
        const knockbackResistance = knockbackResistances[tierIndex];
        const repairIngredientTag = repairIngredientTags[tierIndex];

        const sets = helmets.length
        for (let setIndex = 0; setIndex < sets; setIndex++) {
            const helmetFullId = helmets[setIndex];
            const chestplateFullId = chestplates[setIndex];
            const leggingsFullId = leggings[setIndex];
            const bootsFullId = boots[setIndex];

            const helmetId = helmetFullId.split(":")[1];
            const chestplateId = chestplateFullId.split(":")[1];
            const leggingsId = leggingsFullId.split(":")[1];
            const bootsId = bootsFullId.split(":")[1];
            const setId = helmetId.split("_")[0];

            const helmetName = getHelmetName(helmetFullId);
            const chestplateName = getChestplateName(chestplateFullId);
            const leggingsName = getLeggingsName(leggingsFullId);
            const bootsName = getBootsName(bootsFullId);

            const originalSetId = helmetId.split("_")[0];
            const originalSetName = helmetName.split(" ")[0];
            const tierId = `${originalSetId}_tier_${formattedTierIndex}`;
            const modId = helmetFullId.split(":")[0];

            const nameSuffix = ` - Level ${formattedTierIndex}`;

            const formattedTemplate = template
                .replace("{tierId}", `"${tierId}"`)
                .replace("{tierId}", `"${tierId}"`)
                .replace("{tierId}", `"${tierId}"`)
                .replace("{durabilityMultiplier}", durabilityMultiplier)
                .replace("{slotProtections}", `[${slotProtection.join(", ")}]`)
                .replace("{armorToughness}", armorToughness)
                .replace("{knockbackResistance}", knockbackResistance)
                .replace("{repairIngredientTag}", `"${repairIngredientTag}"`)
                .replace("{modId}", `"${modId}"`)
                .replace("{modId}", `"${modId}"`)
                .replace("{helmName}", `"${helmetName}"`)
                .replace("{chestName}", `"${chestplateName}"`)
                .replace("{legName}", `"${leggingsName}"`)
                .replace("{bootName}", `"${bootsName}"`)
                .replace("{nameSuffix}", `"${nameSuffix}"`)
                .replace("{modelPath}", `"${modId}:geo/${originalSetId}_armor.geo.json"`)
                .replace("{texturePath}", `"${modId}:textures/models/armor/${originalSetId}.png"`)
                .replace("{modelPath}", `"${modId}:geo/${originalSetId}_armor.geo.json"`)
                .replace("{texturePath}", `"${modId}:textures/models/armor/${originalSetId}.png"`)
                .replace("{modelPath}", `"${modId}:geo/${originalSetId}_armor.geo.json"`)
                .replace("{texturePath}", `"${modId}:textures/models/armor/${originalSetId}.png"`)
                .replace("{modelPath}", `"${modId}:geo/${originalSetId}_armor.geo.json"`)
                .replace("{texturePath}", `"${modId}:textures/models/armor/${originalSetId}.png"`)

            result += formattedTemplate
        }
    }
    fs.writeFileSync(scriptPath, result)
}

function createItemJsons() {
    for (let tierIndex = 0; tierIndex < tiers; tierIndex++) {
        const formattedTierIndex = tierIndex + 2;

        const durabilityMultiplier = durabilityMultipliers[tierIndex];
        const slotProtection = slotProtections[tierIndex];
        const armorToughness = armorToughnesses[tierIndex];
        const knockbackResistance = knockbackResistances[tierIndex];
        const repairIngredientTag = repairIngredientTags[tierIndex];

        const sets = helmets.length
        for (let setIndex = 0; setIndex < sets; setIndex++) {
            const helmetFullId = helmets[setIndex];
            const chestplateFullId = chestplates[setIndex];
            const leggingsFullId = leggings[setIndex];
            const bootsFullId = boots[setIndex];

            const helmetId = helmetFullId.split(":")[1];
            const chestplateId = chestplateFullId.split(":")[1];
            const leggingsId = leggingsFullId.split(":")[1];
            const bootsId = bootsFullId.split(":")[1];
            const setId = helmetId.split("_")[0];

            const helmetName = getHelmetName(helmetFullId);
            const chestplateName = getChestplateName(chestplateFullId);
            const leggingsName = getLeggingsName(leggingsFullId);
            const bootsName = getBootsName(bootsFullId);

            const originalSetId = helmetId.split("_")[0];
            const originalSetName = helmetName.split(" ")[0];
            const tierId = `${originalSetId}_tier_${formattedTierIndex}`;
            const modId = helmetFullId.split(":")[0];

            const helmetItemJson = getItemJson(modId, originalSetId, "helmet");
            const chestplateItemJson = getItemJson(modId, originalSetId, "chestplate");
            const leggingsItemJson = getItemJson(modId, originalSetId, "leggings");
            const bootsItemJson = getItemJson(modId, originalSetId, "boots");

            const helmetPath = `${assetsPath}/${modId}/models/item/${tierId}_helmet.json`
            const chestplatePath = `${assetsPath}/${modId}/models/item/${tierId}_chestplate.json`
            const leggingsPath = `${assetsPath}/${modId}/models/item/${tierId}_leggings.json`
            const bootsPath = `${assetsPath}/${modId}/models/item/${tierId}_boots.json`

            ensureDirSync(`${assetsPath}`)
            ensureDirSync(`${assetsPath}/${modId}`)
            ensureDirSync(`${assetsPath}/${modId}/models`)
            ensureDirSync(`${assetsPath}/${modId}/models/item`)
            fs.writeFileSync(helmetPath, JSON.stringify(helmetItemJson, null, 4))
            fs.writeFileSync(chestplatePath, JSON.stringify(chestplateItemJson, null, 4))
            fs.writeFileSync(leggingsPath, JSON.stringify(leggingsItemJson, null, 4))
            fs.writeFileSync(bootsPath, JSON.stringify(bootsItemJson, null, 4))
        }
    }
}

createKubeJsScript();
createItemJsons();
