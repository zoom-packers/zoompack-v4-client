const fs = require("fs");
const {createCiaBoots, createCiaOffhand, operation, addItemToCia} = require("../../utils/cia_util");
const {
    item_blue_skies,
    item_aether,
    item_betternether,
    item_undergarden,
    item_betterend,
    item_deeperdarker,
    item_theabyss, item_minecraft, item_irons_spellbooks
} = require("../../typedefs/item_typedefs");
const {craftingRecipe} = require("../../utils/recipe_util");

const outputDir = "../../../..";
const scriptPath = `${outputDir}/kubejs/startup_scripts/mage_offhands.js`;
const curiosDataPath = `${outputDir}/kubejs/data/curios/tags/items/shield.json`;

const template =`
StartupEvents.registry("item", e => {
{content}
});
`
const contentTemplate = `global.createOffhand(e, "{itemId}", "{texture}", "{name}");`
const recipesTemplate = `
ServerEvents.recipes(event => { 
    {recipeStr}
})
`

const setIds = [
    "pyromancer",
    "cryomancer",
    "electromancer",
    "archevoker",
    "cultist",
    "shadowwalker",
    "priest",
    "plagued"
]
function getSpellPowerByName(setName) {
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

const tiers = 8;

const spellPowerMultipliers = [
    0.05, 0.1, 0.15, 0.2, 0.25, 0.30, 0.35, 0.4, 0.45,
]
const cooldownReductionMultipliers = [
    0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18
]
const manaRegenMultipliers = [
    0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18
]
const offhandManaMultipliers = [
    0.03, 0.06, 0.09, 0.12, 0.15, 0.18, 0.21, 0.24, 0.27
]

function createOffhandCiaEntry(itemId, setId, tier) {
    return createCiaOffhand(itemId, [
        {
            attribute: "irons_spellbooks:" + getSpellPowerByName(setId),
            operation: operation.MULTIPLY_TOTAL,
            value: spellPowerMultipliers[tier],
        },
        {
            attribute: "irons_spellbooks:cooldown_reduction",
            operation: operation.MULTIPLY_TOTAL,
            value: cooldownReductionMultipliers[tier],
        },
        {
            attribute: "irons_spellbooks:mana_regen",
            operation: operation.MULTIPLY_TOTAL,
            value: manaRegenMultipliers[tier],
        },
        {
            attribute: "irons_spellbooks:max_mana",
            operation: operation.MULTIPLY_TOTAL,
            value: offhandManaMultipliers[tier],
        }
    ])
}

const content = [];
const ids = [];
for (let tierIndex = 0; tierIndex < tiers; tierIndex++) {
    for (let setId of setIds) {
        const itemId = `zoomers_magic:${setId}_offhand_tier_${tierIndex + 1}`;
        const texture = `zoomers_magic:item/${setId}_offhand`;
        const name = `Magic Offhand: ${setId[0].toUpperCase() + setId.slice(1)}'s Will - Tier ${tierIndex + 1}`;
        content.push(contentTemplate.replace("{itemId}", itemId).replace("{texture}", texture).replace("{name}", name));
        ids.push(itemId);
    }
}

const contentStr = content.join("\n");
const script = template.replace("{content}", contentStr);
fs.writeFileSync(scriptPath, script, "utf8");

const ciaPath = `${outputDir}/config/custom_item_attributes.json5`
const cia = JSON.parse(fs.readFileSync(ciaPath, "utf8"));

for (let tierIndex = 0; tierIndex < tiers; tierIndex++) {
    for (let setId of setIds) {
        const itemId = `zoomers_magic:${setId}_offhand_tier_${tierIndex + 1}`;
        const entry = createOffhandCiaEntry(itemId, setId, tierIndex);
        addItemToCia(cia, entry);
    }
}
fs.writeFileSync(ciaPath, JSON.stringify(cia, null, 4), "utf8");

const curiosData = {
    replace: false,
    values: ids,
};

fs.writeFileSync(curiosDataPath, JSON.stringify(curiosData, null, 4), "utf8");

const craftingTemplate = [
    "tier_item_base", "tier_item_base", "tier_item_base",
    "tier_item_base", "set_rune", "tier_item_base",
    "tier_item_base", "tier_item_base", "tier_item_base"
]

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

function getTierItemBase(tier) {
    switch (tier) {
        case 1:
            return item_minecraft.i_diamond;
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
            return "callfromthedepth_:immemorialingot";
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

const recipes = [];
for (let tierIndex = 0; tierIndex < tiers; tierIndex++) {
    for (let setId of setIds) {
        const tierItemBase = getTierItemBase(tierIndex + 1);
        const setRune = getSetRune(setId);
        const recipe = craftingTemplate.map(buildRecipe(tierItemBase, setRune));
        const itemId = `zoomers_magic:${setId}_offhand_tier_${tierIndex + 1}`;
        const recipeStr = craftingRecipe(itemId, recipe, 1);
        recipes.push(recipeStr);
    }
}


const result = recipes.join("\n");
const recipesStr = recipesTemplate.replace("{recipeStr}", result);
fs.writeFileSync(`${outputDir}/kubejs/server_scripts/mage_offhands_recipes.js`, recipesStr);

