const fs = require("fs");
const {item_irons_spellbooks, item_minecraft, item_blue_skies, item_aether, item_undergarden, item_betterend,
    item_betternether, item_deeperdarker, item_theabyss
} = require("../../typedefs/item_typedefs");
const {getHelmetName, getChestplateName, getLeggingsName, getBootsName, chestplates, helmets, leggings, boots,
    getItemJson, getArmorJson
} = require("./data");
const {ensureDirSync} = require("../../../sync_util");
const {createCiaModifier, operation, createCiaHelmet, addItemToCia, createCiaChestplate, createCiaLeggings,
    createCiaBoots
} = require("../../utils/cia_util");
const {craftingRecipe} = require("../../utils/recipe_util");

const outputDir = "../../../..";
const scriptPath = `${outputDir}/kubejs/startup_scripts/mage_armors.js`;
const assetsPath = `${outputDir}/kubejs/assets`;
const ciaPath = `${outputDir}/config/custom_item_attributes.json5`

const template = `
ItemEvents.armorTierRegistry(event => {
    global.createArmorTier(event, {tierId}, {durabilityMultiplier}, {slotProtections}, {enchantmentValue}, {armorToughness}, {knockbackResistance}, {repairIngredientTag});
});

StartupEvents.registry("item", e => {
    const result = global.createGeckoArmorTier(e, {modId}, {tierId}, global.getMaterialTexturesObject({modId}, {tierId}), {helmName}, {chestName}, {legName}, {bootName}, {nameSuffix},
    {modelPath}, {texturePath}, {modelPath}, {texturePath}, {modelPath}, {texturePath}, {modelPath}, {texturePath});
});
`
const recipesTemplate = `
ServerEvents.recipes(event => { 
    {recipeStr}
})
`

const tiers = 7;
const durabilityMultipliers = [
    45, 79, 105, 158, 238, 272, 389, 437
]
const slotProtections = [
    [4, 7, 9, 4],
    [6, 9, 11, 6],
    [9, 15, 18, 12],
    [14, 17, 22, 14],
    [35, 47, 55, 35],
    [54, 68, 79, 54],
    [95, 105, 126, 94],
]
const armorToughnesses = [
    2, 4, 7, 9, 11, 13, 14
]
const knockbackResistances = [
    0, 0, 0, 0, 0, 0, 0
]
const spellPowers = [
    0.2, 0.4, 0.7, 0.9, 1.1, 1.3, 1.4
];
const manaBoosts = [
    25, 35, 50, 60, 70, 85, 100
]
const manaRegens = [
    0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.4
]
const enchantmentValue = 10;
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

function createAttributeModifiers(tier, spellPowerId) {
    const spellPower = spellPowers[tier];
    const manaBoost = manaBoosts[tier];
    const manaRegen = manaRegens[tier];
    const spellPowerModifier = createCiaModifier("irons_spellbooks:" + spellPowerId, operation.MULTIPLY_BASE, spellPower);
    const manaBoostModifier = createCiaModifier("irons_spellbooks:max_mana", operation.ADDITION, manaBoost);
    const manaRegenModifier = createCiaModifier("irons_spellbooks:mana_regen", operation.MULTIPLY_BASE, manaRegen);
    return [spellPowerModifier, manaBoostModifier, manaRegenModifier];
}

function getArmorModifierBySetName(setName) {
    switch (setName) {
        case "pyromancer":
            return "fire_spell_power";
        case "cryomancer":
            return "ice_spell_power";
        case "electromancer":
            return "lightning_spell_power";
        case "archevoker":
            return "evocation_spell_power";
        case "cultist":
            return "blood_spell_power";
        case "shadowwalker":
            return "ender_spell_power";
        case "priest":
            return "holy_spell_power";
        case "plagued":
            return "nature_spell_power";
    }
}

function createKubeJsScript() {
    let result = ""
    for (let tierIndex = 0; tierIndex < tiers; tierIndex++) {
        const formattedTierIndex = tierIndex + 2;

        const durabilityMultiplier = durabilityMultipliers[tierIndex];
        const slotProtection = slotProtections[tierIndex];
        const armorToughness = armorToughnesses[tierIndex];
        const knockbackResistance = knockbackResistances[tierIndex];
        const repairIngredientTag = repairIngredientTags[tierIndex];

        const sets = helmets.length;
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
                .replace("{enchantmentValue}", enchantmentValue)
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
                .replace("{helmetId}", `"${modId}:${tierId}_helmet"`)
                .replace("{chestplateId}", `"${modId}:${tierId}_chestplate"`)
                .replace("{leggingsId}", `"${modId}:${tierId}_leggings"`)
                .replace("{bootsId}", `"${modId}:${tierId}_boots"`)

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

function createCIAAttributeModifiers() {
    const ciaFileContents = fs.readFileSync(ciaPath, "utf-8");
    const ciaJson = JSON.parse(ciaFileContents);
    for (let tierIndex = 0; tierIndex < tiers; tierIndex++) {
        const formattedTierIndex = tierIndex + 2;

        const sets = helmets.length;
        for (let setIndex = 0; setIndex < sets; setIndex++) {
            const helmetFullId = helmets[setIndex];
            const helmetId = helmetFullId.split(":")[1];
            const originalSetId = helmetId.split("_")[0];
            const tierId = `${originalSetId}_tier_${formattedTierIndex}`;
            const modId = helmetFullId.split(":")[0];

            const spellPowerId = getArmorModifierBySetName(originalSetId);
            const attributeModifiers = createAttributeModifiers(tierIndex, spellPowerId);

            const helmetCiaEntry = createCiaHelmet(`${modId}:${tierId}_helmet`, attributeModifiers);
            const chestplateCiaEntry = createCiaChestplate(`${modId}:${tierId}_chestplate`, attributeModifiers);
            const leggingsCiaEntry = createCiaLeggings(`${modId}:${tierId}_leggings`, attributeModifiers);
            const bootsCiaEntry = createCiaBoots(`${modId}:${tierId}_boots`, attributeModifiers);

            addItemToCia(ciaJson, helmetCiaEntry);
            addItemToCia(ciaJson, chestplateCiaEntry);
            addItemToCia(ciaJson, leggingsCiaEntry);
            addItemToCia(ciaJson, bootsCiaEntry);
        }
    }
    const ciaJsonString = JSON.stringify(ciaJson, null, 4);
    fs.writeFileSync(ciaPath, ciaJsonString);
}

function getTierItemBase(tier) {
    switch (tier) {
        case 2:
            return item_blue_skies.i_aquite;
        case 3:
            return item_aether.i_zanite_gemstone;
        case 4:
            return item_betternether.i_nether_ruby;
        case 5:
            return item_undergarden.i_froststeel_ingot;
        case 6:
            return item_betterend.i_thallasium_forged_plate;
        case 7:
            return item_deeperdarker.i_reinforced_echo_shard;
        case 8:
            return item_theabyss.i_fixed_bone;
    }
}

function getSetRune(setName) {
    switch (setName) {
        case "pyromancer":
            return item_irons_spellbooks.i_fire_rune;
        case "cryomancer":
            return item_irons_spellbooks.i_ice_rune;
        case "electromancer":
            return item_irons_spellbooks.i_lightning_rune;
        case "archevoker":
            return item_irons_spellbooks.i_evocation_rune;
        case "cultist":
            return item_irons_spellbooks.i_blood_rune;
        case "shadowwalker":
            return item_irons_spellbooks.i_ender_rune;
        case "priest":
            return item_irons_spellbooks.i_holy_rune;
        case "plagued":
            return item_irons_spellbooks.i_nature_rune;
    }
}

function buildRecipe(tierItemBase, setRune) {
    return item => {
        if (item === "tier_item_base") {
            return tierItemBase;
        } else if (item === "set_rune") {
            return setRune;
        } else {
            return item;
        }
    };
}

function createRecipes() {
    const helmetRecipeTemplate = [
        null, null, null,
        "tier_item_base", "tier_item_base", "tier_item_base",
        "tier_item_base", "set_rune", "tier_item_base"
    ]
    const chestplateRecipeTemplate = [
        "tier_item_base", "set_rune", "tier_item_base",
        "tier_item_base", "tier_item_base", "tier_item_base",
        "tier_item_base", "tier_item_base", "tier_item_base"
    ]
    const leggingsRecipeTemplate = [
        "tier_item_base", "tier_item_base", "tier_item_base",
        "tier_item_base", "set_rune", "tier_item_base",
        "tier_item_base", null, "tier_item_base"
    ]
    const bootsRecipeTemplate = [
        null, null, null,
        "tier_item_base", null, "tier_item_base",
        "tier_item_base", "set_rune", "tier_item_base",
    ]
    const results = [];
    for (let tier = 0; tier < tiers; tier++) {
        const formattedTierIndex = tier + 2;
        const tierItemBase = getTierItemBase(formattedTierIndex);
        for (let setIndex = 0; setIndex < helmets.length; setIndex++) {
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

            const setRune = getSetRune(originalSetId);

            const helmetRecipe = helmetRecipeTemplate.map(buildRecipe(tierItemBase, setRune))
            const chestplateRecipe = chestplateRecipeTemplate.map(buildRecipe(tierItemBase, setRune))
            const leggingsRecipe = leggingsRecipeTemplate.map(buildRecipe(tierItemBase, setRune))
            const bootsRecipe = bootsRecipeTemplate.map(buildRecipe(tierItemBase, setRune))

            const helmetResultId = `${modId}:${tierId}_helmet`;
            const chestplateResultId = `${modId}:${tierId}_chestplate`;
            const leggingsResultId = `${modId}:${tierId}_leggings`;
            const bootsResultId = `${modId}:${tierId}_boots`;

            const helmetRecipeStr = craftingRecipe(helmetResultId, helmetRecipe, 1);
            const chestplateRecipeStr = craftingRecipe(chestplateResultId, chestplateRecipe, 1);
            const leggingsRecipeStr = craftingRecipe(leggingsResultId, leggingsRecipe, 1);
            const bootsRecipeStr = craftingRecipe(bootsResultId, bootsRecipe, 1);

            results.push(helmetRecipeStr);
            results.push(chestplateRecipeStr);
            results.push(leggingsRecipeStr);
            results.push(bootsRecipeStr);
        }
    }
    const result = results.join("\n");
    const recipesStr = recipesTemplate.replace("{recipeStr}", result);
    fs.writeFileSync(`${outputDir}/kubejs/server_scripts/mage_armors_recipes.js`, recipesStr);
}

createKubeJsScript();
createItemJsons();
createCIAAttributeModifiers();
createRecipes();
