const fs = require("fs");
const {operation} = require("../cia_util");
const {
    item_minecraft,
    item_blue_skies,
    item_aether,
    item_betternether,
    item_undergarden,
    item_betterend,
    item_deeperdarker,
    item_theabyss,
    item_irons_spellbooks
} = require("../../libs/item_typedefs");
const {craftingRecipe} = require("../recipe_util");


const outputDir = "../../../..";
const scriptPath = `${outputDir}/kubejs/startup_scripts/augments.js`;
const curiosDataPath = `${outputDir}/kubejs/data/curios/tags/items/augment.json`;

const template =`
StartupEvents.registry("item", e => {
{content}
});
`
const contentTemplate = `global.createAugument(e, {id}, {displayName}, {texture}, {attributes})`
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
    "plagued",
    "cooldown",
    "barbarian",
    "berserker",
    "crusader",
    "archer",
    "treasure_hunter",
    "explorer",
    "healer",
    "tank"
];
const mageAttributeValues = [0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18];
const attributeValues = {
    pyromancer: mageAttributeValues,
    cryomancer: mageAttributeValues,
    electromancer: mageAttributeValues,
    archevoker: mageAttributeValues,
    cultist: mageAttributeValues,
    shadowwalker: mageAttributeValues,
    priest: mageAttributeValues,
    plagued: mageAttributeValues,
    cooldown: [0.03, 0.06, 0.09, 0.12, 0.15, 0.18, 0.21, 0.24, 0.27],
    barbarian: [0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18],
    berserker: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09],
    crusader: [0.005, 0.01, 0.015, 0.02, 0.025, 0.03, 0.035, 0.04, 0.045],
    archer: [0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18],
    treasure_hunter: [0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18],
    explorer: [0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18],
    healer: [0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18],
    tank: [0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18],
};
const lastMageSetIndex = 7;
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

function getNonMageAttribute(setName) {
    switch (setName) {
        case "cooldown":
            return "irons_spellbooks:cooldown_reduction";
        case "barbarian":
            return "minecraft:generic.attack_damage";
        case "berserker":
            return "attributeslib:armor_pierce";
        case "crusader":
            return "minecraft:generic.attack_speed";
        case "archer":
            return "projectile_damage:generic";
        case "explorer":
            return "minecraft:generic.movement_speed";
        case "treasure_hunter":
            return "minecraft:generic.luck";
        case "healer":
            return "pufferfish_attributes:player.healing";
        case "tank":
            return "minecraft:generic.armor_toughness";
    }
}

function escape(value) {
    return value.replace(/"/g, '\\"');
}

const tiers = 9;
const content = [];
const ids = [];
for (let tierIndex = 0; tierIndex < tiers; tierIndex++) {
    for (let setIdIndex = 0; setIdIndex < setIds.length; setIdIndex++) {
        const setId = setIds[setIdIndex];
        const id = `"zoomers_magic:augment_${setId}_${tierIndex + 1}"`;
        const formattedSetId = setId.charAt(0).toUpperCase() + setId.slice(1).replace("_", " ");
        const displayName = `"Augment: ${formattedSetId} - Tier ${tierIndex + 1}"`;
        const texture = `"zoomers_magic:item/augment_${setId}"`;
        const isMageSet = setIdIndex <= lastMageSetIndex;
        const attributes = [
            {
                attribute: isMageSet ? `irons_spellbooks:${getSpellPowerByName(setId)}` : getNonMageAttribute(setId),
                uuid: id,
                operation: operation.MULTIPLY_BASE.toLowerCase(),
                value: attributeValues[setId][tierIndex],
            },
        ]
        content.push(contentTemplate
            .replace("{id}", id)
            .replace("{displayName}", displayName)
            .replace("{texture}", texture)
            .replace("{attributes}", JSON.stringify(attributes))
        );
        ids.push(id.replace(/"/g, ""));
    }
}

const script = template.replace("{content}", content.join("\n"));
fs.writeFileSync(scriptPath, script);

const curiosData = {
    replace: false,
    values: ids,
};
fs.writeFileSync(curiosDataPath, JSON.stringify(curiosData, null, 4));


const craftingTemplate = [
    null, "tier_item_base", null,
    "tier_item_base", "set_rune", "tier_item_base",
    null, "tier_item_base", null
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
        case "cooldown":
            return item_irons_spellbooks.i_cooldown_rune;
        case "barbarian":
            return item_minecraft.i_diamond_axe;
        case "berserker":
            return item_minecraft.i_iron_chestplate;
        case "crusader":
            return item_minecraft.i_diamond_sword;
        case "archer":
            return item_minecraft.i_bow;
        case "treasure_hunter":
            return item_minecraft.i_golden_shovel;
        case "explorer":
            return item_minecraft.i_leather_boots;
        case "healer":
            return item_minecraft.i_golden_apple;
        case "tank":
            return item_minecraft.i_diamond_chestplate;
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
fs.writeFileSync(`${outputDir}/kubejs/server_scripts/augments_recipes.js`, recipesStr);



