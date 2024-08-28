const fs = require("fs");
const {operation, addItemToCia, createCiaOffhand, createCiaMainHand} = require("../../utils/cia_util");
const {craftingRecipe, smithingRecipe} = require("../../utils/recipe_util");
const {kubejsPath, rootPath, kubejsStartupScriptsPath, kubejsServerScriptsPath} = require("../../utils/path_util");
const {item_minecraft, item_blue_skies, item_aether, item_betternether, item_undergarden, item_betterend, item_theabyss} = require("../../typedefs/item_typedefs");
const {modifySingleItem} = require("../../utils/pmmo_util");

const template =`
StartupEvents.registry("item", e => {
{content}
});
`
const weaponTemplate = `e.create("{id}", "sword").displayName("{displayName}").texture("{texture}").maxDamage({durability});`
const shieldTemplate = `e.create("{id}", "shield").displayName("{displayName}").texture("{texture}").maxDamage({durability});`
const recipesTemplate = `
ServerEvents.recipes(event => { 
    {recipeStr}
})
`

const outputDir = rootPath()
const startupScriptPath = `${kubejsStartupScriptsPath()}/armory.js`;
const serverScript = `${kubejsServerScriptsPath()}/armory.js`;

const modId = "zoomers_armory";
const materials = [
    {item: item_minecraft.i_flint, type: "crafting", name: "flint", base_damage: -2, durability: 100, armor: 0.5, pmmoLevel: 3},
    {item: item_minecraft.i_iron_ingot, type: "crafting", "name": "iron", base_damage: 1, durability: 250, armor: 1, pmmoLevel: 9},
    {item: item_minecraft.i_gold_ingot, type: "crafting", name: "gold", base_damage: 1.5, durability: 50, armor: 1.5, pmmoLevel: 12},
    {item: item_minecraft.i_diamond, type: "crafting", name: "diamond", base_damage: 2, durability: 500, armor: 2, pmmoLevel: 18},
    {item: item_minecraft.i_netherite_ingot, type: "smithing", name: "netherite", smithing: item_minecraft.i_netherite_upgrade_smithing_template, base: "diamond", base_damage: 25, durability: 1650, armor: 15, pmmoLevel: 58},
    {item: item_blue_skies.i_pyrope_gem, type: "crafting", name: "pyrope", base_damage: 2, durability: 800, armor: 2.5, pmmoLevel: 21},
    {item: item_blue_skies.i_aquite, type: "crafting", name: "aquite", base_damage: 2.5, durability: 850, armor: 2.75, pmmoLevel: 23},
    {item: item_blue_skies.i_diopside_gem, type: "crafting", name: "diopside", base_damage: 2.7, durability: 900, armor: 3, pmmoLevel: 25},
    {item: item_blue_skies.i_charoite, type: "crafting", name: "charoite", base_damage: 3, durability: 950, armor: 3.5, pmmoLevel: 29},
    {item: item_blue_skies.i_horizonite_ingot, type: "crafting", name: "horizonite", base_damage: 4.5, durability: 1000, armor: 4.5, pmmoLevel: 32},
    {item: item_aether.i_zanite_gemstone, type: "crafting", name: "zanite", base_damage: 5, durability: 1100, armor: 5, pmmoLevel: 35},
    {item: item_aether.i_enchanted_gravitite, type: "crafting", name: "enchanted_gravitite", base_damage: 6, durability: 1200, armor: 6, pmmoLevel: 39},
    {item: item_betternether.i_cincinnasite_ingot, type: "crafting", name: "cincinnasite", base_damage: 11, durability: 1300, armor: 11, pmmoLevel: 52},
    {item: item_minecraft.i_diamond, type: "smithing", name: "cincinnasite_diamond", smithing: item_betternether.i_cincinnasite_diamond_upgrade_smithing_template, "base": "cincinnasite", base_damage: 12, durability: 1400, armor: 12, pmmoLevel: 54},
    {item: item_betternether.i_nether_ruby, type: "crafting", name: "nether_ruby", base_damage: 15, durability: 1500, armor: 15, pmmoLevel: 56},
    {item: item_minecraft.i_sculk_catalyst, type: "smithing", name: "flaming_ruby", smithing: item_betternether.i_flaming_ruby_upgrade_smithing_template, "base": "nether_ruby", base_damage: 19, durability: 1600, armor: 19, pmmoLevel: 57},
    {item: item_undergarden.i_cloggrum_ingot, type: "crafting", name: "cloggrum", base_damage: 55, durability: 1700, armor: 55, pmmoLevel: 61},
    {item: item_undergarden.i_froststeel_ingot, type: "crafting", name: "froststeel", base_damage: 65, durability: 1800, armor: 65, pmmoLevel: 63},
    {item: item_undergarden.i_utherium_crystal, type: "crafting", name: "utherium", base_damage: 75, durability: 1900, armor: 75, pmmoLevel: 65},
    {item: item_undergarden.i_forgotten_ingot, type: "smithing", name: "forgotten", smithing: item_undergarden.i_forgotten_upgrade_smithing_template, "base": "utherium", base_damage: 85, durability: 2000, armor: 85, pmmoLevel: 67},
    {item: item_betterend.i_thallasium_forged_plate, type: "crafting", name: "thallasium", base_damage: 100, durability: 2200, armor: 100, pmmoLevel: 73},
    {item: item_betterend.i_terminite_ingot, type: "crafting", name: "terminite", base_damage: 127, durability: 2400, armor: 127, pmmoLevel: 75},
    {item: item_betterend.i_aeternium_forged_plate, type: "crafting", name: "aeternium", base_damage: 157, durability: 2600, armor: 157, pmmoLevel: 77},
    {item: item_betterend.i_aurora_crystal, type: "crafting", name: "aurora", base_damage: 186, durability: 2800, armor: 186, pmmoLevel: 79},
    {item: "callfromthedepth_:immemorialingot", type: "crafting", name: "immemorial", base_damage: 200, durability: 2800, armor: 200, pmmoLevel: 84},
    {item: item_theabyss.i_fixed_bone, type: "crafting", name: "fixed_bone", base_damage: 239, durability: 3200, armor: 239, pmmoLevel: 90},
    {item: item_theabyss.i_fusion_ingot, type: "crafting", name: "fusion", base_damage: 223, durability: 3400, armor: 223, pmmoLevel: 91},
    {item: item_theabyss.i_aberythe_gem, type: "crafting", name: "aberythe", base_damage: 232, durability: 3600, armor: 232, pmmoLevel: 92},
    {item: item_theabyss.i_ignisithe_gem, type: "crafting", name: "ignisithe", base_damage: 262, durability: 3800, armor: 262, pmmoLevel: 93},
    {item: item_theabyss.i_glacerythe_gem, type: "crafting", name: "glacerythe", base_damage: 285, durability: 4000, armor: 285, pmmoLevel: 94},
    {item: item_theabyss.i_garnite_ingot, type: "crafting", name: "garnite", base_damage: 302, durability: 4200, armor: 302, pmmoLevel: 95},
    {item: item_theabyss.i_phantom_ingot, type: "crafting", name: "phantom", base_damage: 324, durability: 4400, armor: 324, pmmoLevel: 96},
    {item: item_theabyss.i_unorithe_ingot, type: "crafting", name: "unorithe", base_damage: 355, durability: 4600, armor: 355, pmmoLevel: 97},
]


const weaponTypes = [
    {name: "dagger", recipe: ["","","","","material","","stick","",""], durabilityMultiplier: 0.9, damageMultiplier: 0.5, speedMultiplier: 0.5},
    {name: "shortsword", recipe: ["","","","","material","","","stick",""], durabilityMultiplier: 1, damageMultiplier: 0.8, speedMultiplier: 0.2},
    {name: "heavysword", recipe: ["","material","material","","material","","stick","",""], durabilityMultiplier: 1.5, damageMultiplier: 1.2, speedMultiplier: -0.2},
    {name: "cutlass", recipe: ["","material","","material","","","stick","",""], durabilityMultiplier: 1.2, damageMultiplier: 1.1, speedMultiplier: -0.1},
    {name: "mace", recipe: ["","material","material","","stick","material","stick","",""], durabilityMultiplier: 1.2, damageMultiplier: 1.15, speedMultiplier: -0.15},
    {name: "heavymace", recipe: ["","material","material","","material","material","","stick",""], durabilityMultiplier: 1.5, damageMultiplier: 1.3, speedMultiplier: -0.3},
    {name: "warhammer", recipe: ["material","material","material","","stick","material","stick","",""], durabilityMultiplier: 1.8, damageMultiplier: 1.5, speedMultiplier: -0.4},
    {name: "spear", recipe: ["","","material","","stick","","stick","",""], durabilityMultiplier: 1, damageMultiplier: 0.9, speedMultiplier: -0.15},
    {name: "halberd", recipe: ["","","material","","stick","material","stick","",""], durabilityMultiplier: 1.2, damageMultiplier: 1.1, speedMultiplier: -0.3},
]

const shieldTypes = [
    {name: "buckler", recipe: ["","#minecraft:planks","","#minecraft:planks","material","#minecraft:planks","","#minecraft:planks",""], durabilityMultiplier: 0.9, armorMultiplier: 0.75, speedMultiplier: 0},
    {name: "heater", recipe: ["#minecraft:planks","","#minecraft:planks","#minecraft:planks","material","#minecraft:planks","","#minecraft:planks",""], durabilityMultiplier: 1.2, armorMultiplier: 1, speedMultiplier: -0.1},
    {name: "tower", recipe: ["#minecraft:planks","#minecraft:planks","#minecraft:planks","#minecraft:planks","material","#minecraft:planks","#minecraft:planks","#minecraft:planks","#minecraft:planks"], durabilityMultiplier: 1.5, armorMultiplier: 1.25, speedMultiplier: -0.2},
]

const mergedTypes = [...weaponTypes, ...shieldTypes];

//=====================
// REGISTRATION
//=====================
let materialIndex = 0;
const startupContent = [];
for (const material of materials) {
    for (const weaponType of weaponTypes) {
        const materialIdPart = material.name;
        const id = `${modId}:${materialIdPart}_${weaponType.name}`;
        const displayName = `${materialIdPart.toUpperCase()[0] + materialIdPart.slice(1)} ${weaponType.name.toUpperCase()[0] + weaponType.name.slice(1)}`;
        const durability = material.durability * weaponType.durabilityMultiplier;
        const texture = `${modId}:textures/item/${id}`;
        startupContent.push(weaponTemplate.replace("{id}", id).replace("{displayName}", displayName).replace("{texture}", texture).replace("{durability}", durability));
    }
    for (const shieldType of shieldTypes) {
        const materialIdPart = material.name;
        const id = `${modId}:${materialIdPart}_${shieldType.name}`;
        const displayName = `${materialIdPart.toUpperCase()[0] + materialIdPart.slice(1)} ${shieldType.name.toUpperCase()[0] + shieldType.name.slice(1)}`;
        const durability = material.durability * shieldType.durabilityMultiplier;
        const texture = `${modId}:textures/item/${id}`;
        startupContent.push(shieldTemplate.replace("{id}", id).replace("{displayName}", displayName).replace("{texture}", texture).replace("{durability}", durability));
    }
    materialIndex++;
}
const startupScript = template.replace("{content}", startupContent.join("\n"));
fs.writeFileSync(startupScriptPath, startupScript);


//=====================
// CIA ATTIRUBTES
//=====================
const ciaPath = `${outputDir}/config/custom_item_attributes.json5`
const cia = JSON.parse(fs.readFileSync(ciaPath, "utf8"));

for (const material of materials) {
    for (const weaponType of weaponTypes) {
        const materialIdPart = material.name;
        const id = `${modId}:${materialIdPart}_${weaponType.name}`;
        const entry = createCiaSword(id, material, weaponType);
        addItemToCia(cia, entry);
    }
    for (const shieldType of shieldTypes) {
        const materialIdPart = material.name;
        const id = `${modId}:${materialIdPart}_${shieldType.name}`;
        const entry = createCiaShield(id, material, shieldType);
        addItemToCia(cia, entry);
    }
}
fs.writeFileSync(ciaPath, JSON.stringify(cia, null, 4), "utf8");

function createCiaSword(itemId, material, weaponType) {
    return createCiaMainHand(itemId, [
        {
            attribute: "minecraft:generic.attack_damage",
            operation: operation.ADDITION,
            value: material.base_damage > 0 ? material.base_damage * weaponType.damageMultiplier : material.base_damage / weaponType.damageMultiplier
        },
        {
            attribute: "minecraft:generic.attack_speed",
            operation: operation.MULTIPLY_BASE,
            value: weaponType.speedMultiplier
        },
    ])
}

function createCiaShield(itemId, material, shieldType) {
    return createCiaOffhand(itemId, [
        {
            attribute: "minecraft:generic.armor",
            operation: operation.ADDITION,
            value: material.armor * shieldType.armorMultiplier,
        },
        {
            attribute: "minecraft:generic.movement_speed",
            operation: operation.MULTIPLY_BASE,
            value: shieldType.speedMultiplier,
        },
    ])
}


//=====================
// RECIPES
//=====================
const recipes = [];
for (const mergedType of mergedTypes) {
    for (const material of materials) {
        const materialIdPart = material.name;
        const id = `${modId}:${materialIdPart}_${mergedType.name}`;
        if (material.type === "crafting") {
            const recipe = mergedType.recipe.map(item => {
                if (item === "material") {
                    return material.item;
                } else {
                    return item;
                }
            });
            const result = craftingRecipe(id, recipe);
            recipes.push(result);
        } else if (material.type === "smithing") {
            const baseItemId = `${modId}:${material.base}_${mergedType.name}`;
            const result = smithingRecipe(id, baseItemId, material.item);
            recipes.push(result);
        }
    }
}

const result = recipes.join("\n");
const recipesStr = recipesTemplate.replace("{recipeStr}", result);
fs.writeFileSync(serverScript, recipesStr);



//=====================
// PMMO LEVELS
//=====================
for (const mergedType of weaponTypes) {
    for (const material of materials) {
        const materialIdPart = material.name;
        const id = `${materialIdPart}_${mergedType.name}`;
        modifySingleItem(modId, id, "sword", material.pmmoLevel);
    }
}
for (const mergedType of shieldTypes) {
    for (const material of materials) {
        const materialIdPart = material.name;
        const id = `${materialIdPart}_${mergedType.name}`;
        modifySingleItem(modId, id, "shield", material.pmmoLevel);
    }
}
