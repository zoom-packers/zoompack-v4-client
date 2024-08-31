const fs = require("fs");
const {operation, addItemToCia, createCiaOffhand, createCiaMainHand} = require("../../utils/cia_util");
const {craftingRecipe, smithingRecipe} = require("../../utils/recipe_util");
const {kubejsPath, rootPath, kubejsStartupScriptsPath, kubejsServerScriptsPath, kubejsAssetsPath} = require("../../utils/path_util");
const {item_minecraft, 
    item_blue_skies, 
    item_aether, 
    item_betternether, 
    item_undergarden, 
    item_callfromthedepth_, 
    item_call_of_yucutan, 
    item_endlessbiomes,
    item_ender_dragon_loot_,
    item_enlightened_end,
    item_enderitemod,
    item_phantasm,
    item_theabyss,
    item_aquaculture} = require("../../typedefs/item_typedefs");
const {modifySingleItem} = require("../../utils/pmmo_util");
const {WorkingTexture, combine} = require("../../utils/texture_util");

const template =`
StartupEvents.registry("item", e => {
{content}
});
`
const weaponTemplate = `e.create("{id}", "sword").displayName("{displayName}").texture("{texture}").maxDamage({durability});`
const shieldTemplate = `e.create("{id}", "shield").displayName("{displayName}").texture("{texture}").maxDamage({durability});`
const bowTemplate = `e.create("{id}", "bow").displayName("{displayName}").texture("{texture}").maxDamage({durability});`
const crossbowTemplate = `e.create("{id}", "crossbow").displayName("{displayName}").texture("{texture}").maxDamage({durability});`
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
    {item: item_minecraft.i_flint, type: "crafting", name: "flint", base_damage: -2, durability: 100, armor: 0.5, pmmoLevel: 3, materialColor: "#232323"},
    {item: item_minecraft.i_iron_ingot, type: "crafting", "name": "iron", base_damage: 1, durability: 250, armor: 1, pmmoLevel: 9, materialColor: "#C0C0C0"},
    {item: item_minecraft.i_gold_ingot, type: "crafting", name: "gold", base_damage: 1.5, durability: 50, armor: 1.5, pmmoLevel: 12, materialColor: "#FFD700"},
    {item: item_minecraft.i_diamond, type: "crafting", name: "diamond", base_damage: 2, durability: 500, armor: 2, pmmoLevel: 18, materialColor: "#00FFFF"},
    {item: item_aquaculture.i_neptunium_ingot, type: "crafting", name: "neptunium", base_damage: 2.5, durability: 1000, armor: 2, pmmoLevel: 19, materialColor: "#2cb28e", skip: ["bow"]},

    // Blue skies
    {item: item_blue_skies.i_pyrope_gem, type: "crafting", name: "pyrope", base_damage: 2, durability: 1600, armor: 2.5, pmmoLevel: 21, materialColor: "#e61542"},
    {item: item_blue_skies.i_aquite, type: "crafting", name: "aquite", base_damage: 2.5, durability: 1700, armor: 2.75, pmmoLevel: 23, materialColor: "#5aeaea"},
    {item: item_blue_skies.i_diopside_gem, type: "crafting", name: "diopside", base_damage: 2.7, durability: 1800, armor: 3, pmmoLevel: 25, materialColor: "#35bf35"},
    {item: item_blue_skies.i_charoite, type: "crafting", name: "charoite", base_damage: 3, durability: 1900, armor: 3.5, pmmoLevel: 29, materialColor: "#bf35af"},
    {item: item_blue_skies.i_horizonite_ingot, type: "crafting", name: "horizonite", base_damage: 4.5, durability: 2000, armor: 4.5, pmmoLevel: 32, materialColor: "#FFA500"},
    
    // Aether
    {item: item_aether.i_zanite_gemstone, type: "crafting", name: "zanite", base_damage: 5, durability: 2211, armor: 5, pmmoLevel: 35, materialColor: "#75108a"},
    {item: item_aether.i_enchanted_gravitite, type: "crafting", name: "enchanted_gravitite", base_damage: 6, durability: 2431, armor: 6, pmmoLevel: 39, materialColor: "#8a1053"},
    
    // Nether
    {item: item_betternether.i_cincinnasite_ingot, type: "crafting", name: "cincinnasite", base_damage: 11, durability: 2700, armor: 11, pmmoLevel: 52, materialColor: "#c28721"},
    {item: item_minecraft.i_diamond, type: "smithing", name: "cincinnasite_diamond", smithing: item_betternether.i_cincinnasite_diamond_upgrade_smithing_template, "base": "cincinnasite", base_damage: 12, durability: 2800, armor: 12, pmmoLevel: 54, materialColor: "#764e1e"},
    {item: item_betternether.i_nether_ruby, type: "crafting", name: "nether_ruby", base_damage: 15, durability: 2950, armor: 15, pmmoLevel: 56, materialColor: "#FF0000"},
    {item: item_minecraft.i_sculk_catalyst, type: "smithing", name: "flaming_ruby", smithing: item_betternether.i_flaming_ruby_upgrade_smithing_template, "base": "nether_ruby", base_damage: 19, durability: 3025, armor: 19, pmmoLevel: 57, materialColor: "#e50e6a"},
    {item: item_minecraft.i_netherite_ingot, type: "smithing", name: "netherite", smithing: item_minecraft.i_netherite_upgrade_smithing_template, base: "diamond", base_damage: 25, durability: 3100, armor: 15, pmmoLevel: 58, materialColor: "#282224"},
    
    // Undergarden
    {item: item_undergarden.i_cloggrum_ingot, type: "crafting", name: "cloggrum", base_damage: 55, durability: 3300, armor: 55, pmmoLevel: 61, materialColor: "#b1a17b"},
    {item: item_undergarden.i_froststeel_ingot, type: "crafting", name: "froststeel", base_damage: 65, durability: 3500, armor: 65, pmmoLevel: 63, materialColor: "#3786aa"},
    {item: item_undergarden.i_utherium_crystal, type: "crafting", name: "utherium", base_damage: 75, durability: 3700, armor: 75, pmmoLevel: 65, materialColor: "#831414"},
    {item: item_undergarden.i_forgotten_ingot, type: "smithing", name: "forgotten", smithing: item_undergarden.i_forgotten_upgrade_smithing_template, "base": "utherium", base_damage: 85, durability: 4100, armor: 85, pmmoLevel: 67, materialColor: "#29ae63"},
    {item: item_call_of_yucutan.i_jade, type: "crafting", name: "jade", base_damage: 80, durability: 4000, armor: 80, pmmoLevel: 69, materialColor: "#2f7d5c"},
    
    // End
    {item: item_phantasm.i_crystal_block, type: "crafting", name: "crystalline", base_damage: 100, durability: 4600, armor: 100, pmmoLevel: 73, materialColor: "#50437a"},
    {item: item_ender_dragon_loot_.i_dragon_scale, type: "smithing", name: "dragon", smithing: item_ender_dragon_loot_.i_dragon_upgrade_template, "base": "netherite", base_damage: 127, durability: 4800, armor: 127, pmmoLevel: 75, materialColor: "#343434"},
    {item: item_enlightened_end.i_adamantite_ingot, type: "smithing", name: "adamantite", smithing: item_enlightened_end.i_adamantite_smithing_template, "base": "diamond", base_damage: 157, durability: 5200, armor: 157, pmmoLevel: 77, materialColor: "#4a7dfd"},
    {item: item_enderitemod.i_enderite_ingot, type: "smithing", name: "enderite", smithing: item_enderitemod.i_enderite_upgrade_smithing_template, "base": "netherite", base_damage: 186, durability: 5500, armor: 186, pmmoLevel: 79, materialColor: "#1b564d"},
    
    // Call from the depth
    {item: item_callfromthedepth_.i_immemorialingot, type: "crafting", name: "immemorial", base_damage: 200, durability: 5700, armor: 200, pmmoLevel: 84, materialColor: "#629592"},
    {item: item_callfromthedepth_.i_soulingot, type: "smithing", name: "soul", smithing: item_callfromthedepth_.i_immemorialupgradesmithingtemplate, "base": "depth", base_damage: 220, durability: 6000, armor: 220, pmmoLevel: 88, materialColor: "#5474b4", skip:["bow"]},
    
    // Abyss
    {item: item_theabyss.i_fixed_bone, type: "crafting", name: "fixed_bone", base_damage: 239, durability: 6100, armor: 239, pmmoLevel: 90, materialColor: "#c6c6c6"},
    {item: item_theabyss.i_fusion_ingot, type: "crafting", name: "fusion", base_damage: 223, durability: 6250, armor: 223, pmmoLevel: 91, materialColor: "#39ebc7"},
    {item: item_theabyss.i_aberythe_gem, type: "crafting", name: "aberythe", base_damage: 232, durability: 6500, armor: 232, pmmoLevel: 92, materialColor: "#451e63"},
    {item: item_theabyss.i_ignisithe_gem, type: "crafting", name: "ignisithe", base_damage: 262, durability: 6750, armor: 262, pmmoLevel: 93, materialColor: "#33c0a4"},
    {item: item_theabyss.i_fixed_bone, type: "crafting", name: "knight", base_damage: 272, durability: 6875, armor: 272, pmmoLevel: 94, materialColor: "#969190"},
    {item: item_theabyss.i_glacerythe_gem, type: "crafting", name: "glacerythe", base_damage: 285, durability: 7000, armor: 285, pmmoLevel: 94, materialColor: "#2b9d86"},
    {item: item_theabyss.i_garnite_ingot, type: "crafting", name: "garnite", base_damage: 302, durability: 7250, armor: 302, pmmoLevel: 95, materialColor: "#268251"},
    {item: item_theabyss.i_phantom_ingot, type: "crafting", name: "phantom", base_damage: 324, durability: 7500, armor: 324, pmmoLevel: 96, materialColor: "#0f5226"},
    {item: item_theabyss.i_unorithe_ingot, type: "crafting", name: "unorithe", base_damage: 355, durability: 7750, armor: 355, pmmoLevel: 97, materialColor: "#092a23"},
    {item: item_theabyss.i_incorythe_gem, type: "crafting", name: "incorythe", base_damage: 400, durability: 8000, armor: 400, pmmoLevel: 98, materialColor: "#72d5ca"},

    // Meme
    {item: item_minecraft.i_amethyst_block, type: "crafting", name: "obliterator", base_damage: 9999999, durability: 1, pmmoLevel: 0, materialColor: "#ffffff", only: ["crossbow"], memeOverrides:
            [{
                attribute: "attributeslib:draw_speed",
                operation: operation.MULTIPLY_BASE,
                value: -0.9994444444 // Roughly 1 hour to draw
            }]},
]

const weaponTypes = [
    {name: "dagger", recipe: ["","","","","material","","#forge:rods/wooden","",""], durabilityMultiplier: 0.9, damageMultiplier: 0.5, speedMultiplier: 0.5, textureGenType: "normal"},
    {name: "shortsword", recipe: ["","","","","material","","","#forge:rods/wooden",""], durabilityMultiplier: 1, damageMultiplier: 0.8, speedMultiplier: 0.2, textureGenType: "normal"},
    {name: "heavysword", recipe: ["","material","material","","material","","#forge:rods/wooden","",""], durabilityMultiplier: 1.5, damageMultiplier: 1.2, speedMultiplier: -0.2, textureGenType: "long"},
    {name: "cutlass", recipe: ["","material","","material","","","#forge:rods/wooden","",""], durabilityMultiplier: 1.2, damageMultiplier: 1.1, speedMultiplier: -0.1, textureGenType: "normal"},
    {name: "mace", recipe: ["","material","material","","#forge:rods/wooden","material","#forge:rods/wooden","",""], durabilityMultiplier: 1.2, damageMultiplier: 1.15, speedMultiplier: -0.15, textureGenType: "normal"},
    {name: "heavymace", recipe: ["","material","material","","material","material","","#forge:rods/wooden",""], durabilityMultiplier: 1.5, damageMultiplier: 1.3, speedMultiplier: -0.3, textureGenType: "long"},
    {name: "warhammer", recipe: ["material","material","material","","#forge:rods/wooden","material","#forge:rods/wooden","",""], durabilityMultiplier: 1.8, damageMultiplier: 1.5, speedMultiplier: -0.4, textureGenType: "long"},
    {name: "spear", recipe: ["","","material","","#forge:rods/wooden","","#forge:rods/wooden","",""], durabilityMultiplier: 1, damageMultiplier: 0.9, speedMultiplier: -0.15, textureGenType: "spear"},
    {name: "halberd", recipe: ["","","material","","#forge:rods/wooden","material","#forge:rods/wooden","",""], durabilityMultiplier: 1.2, damageMultiplier: 1.1, speedMultiplier: -0.3, textureGenType: "spear"},
]

const shieldTypes = [
    {name: "buckler", recipe: ["","#minecraft:planks","","#minecraft:planks","material","#minecraft:planks","","#minecraft:planks",""], durabilityMultiplier: 0.9, armorMultiplier: 0.75, speedMultiplier: 0, textureGenType: "buckler_shield"},
    {name: "heater", recipe: ["#minecraft:planks","material","#minecraft:planks","#minecraft:planks","material","#minecraft:planks","","#minecraft:planks",""], durabilityMultiplier: 1.2, armorMultiplier: 1, speedMultiplier: -0.1, textureGenType: "heater_shield"},
    {name: "tower", recipe: ["#minecraft:planks","material","#minecraft:planks","#minecraft:planks","material","#minecraft:planks","#minecraft:planks","material","#minecraft:planks"], durabilityMultiplier: 1.5, armorMultiplier: 1.25, speedMultiplier: -0.2, textureGenType: "tower_shield"},
]

const bowTypes = [
    // {name: "shortbow", recipe: ["material","#forge:rods/wooden","","material","","#forge:rods/wooden","","material",""], durabilityMultiplier: 1, damageMultiplier: 0.8, speedMultiplier: 0.2, textureGenType: "normal"},
    {name: "bow", recipe: ["","material","#c:string","material","","#c:string","","material","#c:string"], durabilityMultiplier: 1, damageMultiplier: 1, speedMultiplier: 0, textureGenType: "normal"},
    // {name: "longbow", recipe: ["material","#forge:rods/wooden","","material","#forge:rods/wooden","","material","#forge:rods/wooden",""], durabilityMultiplier: 1.2, damageMultiplier: 1.1, speedMultiplier: -0.1, textureGenType: "long"}
]

const crossbowTypes = [
    {name: "crossbow", recipe: ["material","material","material","#c:string","minecraft:tripwire_hook","#c:string","","#forge:rods/wooden",""], durabilityMultiplier: 1.5, damageMultiplier: 1.2, speedMultiplier: 0, textureGenType: "normal"},
    // {name: "arbalest", recipe: ["material","material","material","material","#forge:rods/wooden","material","material","material",""], durabilityMultiplier: 1.8, damageMultiplier: 1.5, speedMultiplier: -0.4, textureGenType: "long"},
]


const mergedTypes = [...weaponTypes, ...shieldTypes, ...bowTypes, ...crossbowTypes];
const mergedArcheryTypes = [...bowTypes, ...crossbowTypes];

function materialWithTypeShouldBeSkiped(verified_material, item_to_be_created_type){
    let to_skip = [];

    if ('skip' in verified_material){
        to_skip = verified_material.skip;
    }

    if ('only' in verified_material){
        if (!verified_material.only.includes(item_to_be_created_type.name)){
            return true;
        }
    }

    return to_skip.includes(item_to_be_created_type.name);
}

//=====================
// REGISTRATION
//=====================
let materialIndex = 0;
const startupContent = [];
for (const material of materials) {
    for (const weaponType of weaponTypes) {
        if(materialWithTypeShouldBeSkiped(material, weaponType)){
            continue;
        }
        const materialIdPart = material.name;
        const id = `${modId}:${materialIdPart}_${weaponType.name}`;
        const displayName = `${materialIdPart.toUpperCase()[0] + materialIdPart.slice(1).replace('_', ' ')} ${weaponType.name.toUpperCase()[0] + weaponType.name.slice(1)}`;
        const durability = material.durability * weaponType.durabilityMultiplier;
        const texture = `${modId}:textures/item/${id}`;
        startupContent.push(weaponTemplate.replace("{id}", id).replace("{displayName}", displayName).replace("{texture}", texture).replace("{durability}", durability));
    }
    for (const shieldType of shieldTypes) {
        if(materialWithTypeShouldBeSkiped(material, shieldType)){
            continue;
        }
        const materialIdPart = material.name;
        const id = `${modId}:${materialIdPart}_${shieldType.name}`;
        const displayName = `${materialIdPart.toUpperCase()[0] + materialIdPart.slice(1)} ${shieldType.name.toUpperCase()[0] + shieldType.name.slice(1)}`;
        const durability = material.durability * shieldType.durabilityMultiplier;
        const texture = `${modId}:textures/item/${id}`;
        startupContent.push(shieldTemplate.replace("{id}", id).replace("{displayName}", displayName).replace("{texture}", texture).replace("{durability}", durability));
    }
    for (const bowType of bowTypes) {
        if(materialWithTypeShouldBeSkiped(material, bowType)){
            console.log("SKIPPING")
            continue;
        }
        const materialIdPart = material.name;
        const id = `${modId}:${materialIdPart}_${bowType.name}`;
        const displayName = `${materialIdPart.toUpperCase()[0] + materialIdPart.slice(1)} ${bowType.name.toUpperCase()[0] + bowType.name.slice(1)}`;
        const durability = material.durability * bowType.durabilityMultiplier;
        const texture = `${modId}:textures/item/${id}`;
        startupContent.push(bowTemplate.replace("{id}", id).replace("{displayName}", displayName).replace("{texture}", texture).replace("{durability}", durability));
    }
    for (const crossbowType of crossbowTypes) {
        if(materialWithTypeShouldBeSkiped(material, crossbowType)){
            continue;
        }
        const materialIdPart = material.name;
        const id = `${modId}:${materialIdPart}_${crossbowType.name}`;
        const displayName = `${materialIdPart.toUpperCase()[0] + materialIdPart.slice(1)} ${crossbowType.name.toUpperCase()[0] + crossbowType.name.slice(1)}`;
        const durability = material.durability * crossbowType.durabilityMultiplier;
        const texture = `${modId}:textures/item/${id}`;
        startupContent.push(crossbowTemplate.replace("{id}", id).replace("{displayName}", displayName).replace("{texture}", texture).replace("{durability}", durability));
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
        if(materialWithTypeShouldBeSkiped(material, weaponType)){
            continue;
        }
        const materialIdPart = material.name;
        const id = `${modId}:${materialIdPart}_${weaponType.name}`;
        const entry = createCiaWeapon(id, material, weaponType);
        applyMemeStats(entry, material.memeOverrides);
        addItemToCia(cia, entry);
    }
    for (const shieldType of shieldTypes) {
        if(materialWithTypeShouldBeSkiped(material, shieldType)){
            continue;
        }
        const materialIdPart = material.name;
        const id = `${modId}:${materialIdPart}_${shieldType.name}`;
        const entry = createCiaShield(id, material, shieldType);
        applyMemeStats(entry, material.memeOverrides);
        addItemToCia(cia, entry);
    }
    for (const archeryType of mergedArcheryTypes) {
        if(materialWithTypeShouldBeSkiped(material, archeryType)){
            continue;
        }
        const materialIdPart = material.name;
        const id = `${modId}:${materialIdPart}_${archeryType.name}`;
        const entry = createCiaProjectileWeapon(id, material, archeryType);
        applyMemeStats(entry, material.memeOverrides);
        addItemToCia(cia, entry);
    }
}
fs.writeFileSync(ciaPath, JSON.stringify(cia, null, 4), "utf8");

function createCiaWeapon(itemId, material, weaponType) {
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

/**
 *
 * @param ciaEntry {CiaEntry}
 * @param memeOverrides
 */
function applyMemeStats(ciaEntry, memeOverrides){
    if (memeOverrides === undefined) {
        return;
    }
    var allOverrides = [ciaEntry.overrides_chest, ciaEntry.overrides_feet, ciaEntry.overrides_head, ciaEntry.overrides_legs, ciaEntry.overrides_main_hand, ciaEntry.overrides_off_hand];
    for (const memeOverride of memeOverrides){
        for (const override of allOverrides) {
            const attributeIndex = override.findIndex(attr => attr.attribute === memeOverride.attribute);
            if (attributeIndex !== -1){
                override[attributeIndex] = memeOverride;
            }
        }
    }
}


function createCiaProjectileWeapon(itemId, material, weaponType) {
    return createCiaMainHand(itemId, [
        {
            attribute: "projectile_damage:generic",
            operation: operation.ADDITION,
            value: 6 + (material.base_damage > 0 ? material.base_damage * weaponType.damageMultiplier : material.base_damage / weaponType.damageMultiplier)
        },
        {
            attribute: "attributeslib:draw_speed",
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
        if(materialWithTypeShouldBeSkiped(material, mergedType)){
            continue;
        }
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
for (const weaponType of weaponTypes) {
    for (const material of materials) {
        if (materialWithTypeShouldBeSkiped(material, weaponType)){
            continue;
        }
        const materialIdPart = material.name;
        const id = `${materialIdPart}_${weaponType.name}`;
        modifySingleItem(modId, id, "sword", material.pmmoLevel);
    }
}
for (const shieldType of shieldTypes) {
    for (const material of materials) {
        if (materialWithTypeShouldBeSkiped(material, shieldType)){
            continue;
        }
        const materialIdPart = material.name;
        const id = `${materialIdPart}_${shieldType.name}`;
        modifySingleItem(modId, id, "shield", material.pmmoLevel);
    }
}
for (const archeryType of mergedArcheryTypes) {
    for (const material of materials) {
        if (materialWithTypeShouldBeSkiped(material, archeryType)){
            continue;
        }
        const materialIdPart = material.name;
        const id = `${materialIdPart}_${archeryType.name}`;
        modifySingleItem(modId, id, "bow", material.pmmoLevel);
    }
}


//=====================
// MODEL GEN
//=====================
const inputAssetsDir = `./assets`;
const inputTexturesDir = `${inputAssetsDir}/textures`;
const inputTexturesPaths = fs.readdirSync(inputTexturesDir).filter(path => path.endsWith(".png"));
const inputModelsDir = `${inputAssetsDir}/models`;
const inputModelsPaths = fs.readdirSync(inputModelsDir);
const outputAssetsDir = `${kubejsAssetsPath()}/zoomers_armory`;
const outputTexturesDir = `${outputAssetsDir}/textures/item`;
const outputModelsDir = `${outputAssetsDir}/models/item`;


for (const type of weaponTypes) {
    for (const material of materials) {
        if (materialWithTypeShouldBeSkiped(material, type)){
            continue;
        }
        const materialIdPart = material.name;
        const id = `${materialIdPart}_${type.name}`;
        const item = {
            textures: {}
        }
        item.parent = "zoomers_armory:item/" + type.textureGenType;
        item.textures.layer0 = `zoomers_armory:item/${id}`;
        fs.writeFileSync(`${outputModelsDir}/${id}.json`, JSON.stringify(item, null, 4), "utf8");
    }
}

const bucklerModel = require(`${inputModelsDir}/buckler_shield.json`);
const heaterModel = require(`${inputModelsDir}/heater_shield.json`);
const towerModel = require(`${inputModelsDir}/tower_shield.json`);
const bucklerBlockingModel = require(`${inputModelsDir}/buckler_shield_blocking.json`);
const heaterBlockingModel = require(`${inputModelsDir}/heater_shield_blocking.json`);
const towerBlockingModel = require(`${inputModelsDir}/tower_shield_blocking.json`);
for (const type of shieldTypes) {
    for (const material of materials) {
        if (materialWithTypeShouldBeSkiped(material, type)){
            continue;
        }
        const materialIdPart = material.name;
        const id = `${materialIdPart}_${type.name}`;
        let model;
        let blockingModel;
        switch (type.textureGenType) {
            case "buckler_shield":
                model = bucklerModel;
                blockingModel = bucklerBlockingModel;
                break;
            case "heater_shield":
                model = heaterModel;
                blockingModel = heaterBlockingModel;
                break;
            case "tower_shield":
                model = towerModel;
                blockingModel = towerBlockingModel;
                break;
        }
        model.textures["0"] = `zoomers_armory:item/${id}`;
        model.overrides[0].model = `zoomers_armory:item/${id}_blocking`;
        blockingModel.parent = `zoomers_armory:item/${id}`;
        fs.writeFileSync(`${outputModelsDir}/${id}.json`, JSON.stringify(model, null, 4), "utf8");
        fs.writeFileSync(`${outputModelsDir}/${id}_blocking.json`, JSON.stringify(blockingModel, null, 4), "utf8");
    }
}

const bowModel = require(`${inputModelsDir}/bow.json`);
const crossbowModel = require(`${inputModelsDir}/crossbow.json`);
for (const type of mergedArcheryTypes) {
    for (const material of materials) {
        if (materialWithTypeShouldBeSkiped(material, type)){
            continue;
        }
        const materialIdPart = material.name;
        const id = `${materialIdPart}_${type.name}`;
        const model = bowTypes.includes(type) ? JSON.parse(JSON.stringify(bowModel)) : JSON.parse(JSON.stringify(crossbowModel));
        model.textures.layer0 = `zoomers_armory:item/${id}`;
        model.overrides[0].model = `zoomers_armory:item/${id}_drawing_0`;
        model.overrides[1].model = `zoomers_armory:item/${id}_drawing_1`;
        model.overrides[2].model = `zoomers_armory:item/${id}_drawing_2`;

        for (let i = 1; i < 4; i++) {
            const subModel = {
                parent: `zoomers_armory:item/${id}`,
                textures: {
                    layer0: `zoomers_armory:item/${id}_drawing_${i - 1}`
                }
            }
            fs.writeFileSync(`${outputModelsDir}/${id}_drawing_${i - 1}.json`, JSON.stringify(subModel, null, 4), "utf8");
        }

        // Crossbow extra states
        if (crossbowTypes.includes(type)) {
            model.overrides[3].model = `zoomers_armory:item/${id}_locked`;
            model.overrides[4].model = `zoomers_armory:item/${id}_firework`;
            const extraStates = ["locked", "firework"];
            for (const extraState of extraStates) {
                const extraModel = {
                    parent: `zoomers_armory:item/${id}`,
                    textures: {
                        layer0: `zoomers_armory:item/${id}_${extraState}`
                    }
                }
                fs.writeFileSync(`${outputModelsDir}/${id}_${extraState}.json`, JSON.stringify(extraModel, null, 4), "utf8");
            }
        }

        fs.writeFileSync(`${outputModelsDir}/${id}.json`, JSON.stringify(model, null, 4), "utf8");
    }
}

const itemModelsToCopy = [
    `${inputModelsDir}/normal.json`,
    `${inputModelsDir}/long.json`,
    `${inputModelsDir}/spear.json`,
]

for (const modelPath of itemModelsToCopy) {
    fs.copyFileSync(modelPath, `${outputModelsDir}/${modelPath.split("/").pop()}`);
}


//=====================
// TEXTURE GEN
//=====================
async function genTextures() {
    // SWORDS & SHIELDS
    const types = [...weaponTypes, ...shieldTypes];
    for (const type of types) {
        let assets = inputTexturesPaths.filter(path => path.startsWith(type.name));
        if (assets.length === 0) {
            continue;
        }
        assets = assets.map(asset => `${inputTexturesDir}/${asset}`);
        console.log("Processing textures for", type.name);
        for (const material of materials) {
            if (materialWithTypeShouldBeSkiped(material, type)){
                continue;
            }
            const materialColor = material.materialColor;
            const workingAssets = [];
            for (const asset of assets) {
                if (asset.endsWith("no_tint.png")) {
                    workingAssets.push(new WorkingTexture().withPath(asset));
                } else {
                    workingAssets.push(new WorkingTexture().withPath(asset).withTint(materialColor));
                }
            }
            const id = `${material.name}_${type.name}`;
            const texture = await combine(workingAssets);
            texture.toFile(`${outputTexturesDir}/${id}.png`);
        }
    }

    // BOWS
    for (const type of mergedArcheryTypes) {
        console.log("Processing textures for", type.name);
        for (let i = 0; i < 4; i++) {
            const index = i + 1;
            const basePath = `${inputTexturesDir}/${type.name}_base_${index}.png`;
            const arrowPath = `${inputTexturesDir}/${type.name}_arrow_${index}.png`;
            const stringPath = `${inputTexturesDir}/${type.name}_string_${index}.png`;
            for (const material of materials) {
                if (materialWithTypeShouldBeSkiped(material, type)){
                    continue;
                }
                const materialColor = material.materialColor;
                const workingAssets = [
                    new WorkingTexture().withPath(basePath).withTint(materialColor),
                    new WorkingTexture().withPath(arrowPath),
                    new WorkingTexture().withPath(stringPath),
                ];
                let id = `${material.name}_${type.name}`;
                if ([1,2,3].includes(i)) {
                    id = `${material.name}_${type.name}_drawing_${i - 1}`;
                }
                const texture = await combine(workingAssets);
                texture.toFile(`${outputTexturesDir}/${id}.png`);
            }
        }
    }

    // CROSSBOWS Extra
    for (const type of crossbowTypes) {
        const extraStates = ["locked", "firework"]
        console.log("Processing extra textures for", type.name);
        for (const extraState of extraStates) {
            const basePath = `${inputTexturesDir}/${type.name}_${extraState}_base.png`;
            const stringPath = `${inputTexturesDir}/${type.name}_${extraState}_string.png`;
            const arrowPath = `${inputTexturesDir}/${type.name}_${extraState}_arrow.png`;
            for (const material of materials) {
                if (materialWithTypeShouldBeSkiped(material, type)){
                    continue;
                }
                const materialColor = material.materialColor;
                const workingAssets = [
                    new WorkingTexture().withPath(basePath).withTint(materialColor),
                    new WorkingTexture().withPath(stringPath),
                    new WorkingTexture().withPath(arrowPath),
                ];
                const id = `${material.name}_${type.name}_${extraState}`;
                const texture = await combine(workingAssets);
                texture.toFile(`${outputTexturesDir}/${id}.png`);
            }
        }
    }
}

genTextures();
