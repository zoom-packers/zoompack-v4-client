// Armors to generate:
// Archevoker
// Cryomancer
// Cultist
// Electromancer
// Plagued
// Priest
// Pyromancer
// Shadowwalker

import path from "path";
import {CiaModifier, operation} from "./lib/cia/util";
import {attribute_irons_spellbooks} from "../typedefs/attribute_typedefs";
import {item_irons_spellbooks} from "../typedefs/item_typedefs";
import {ArmorVariant, ChromaCreator, ChromaKeyOperation} from "./lib/material/ArmoryTypes";
import {capitalizeFirstLetter} from "./lib/utils";
import {GeckoArmorArmoryEntry} from "./lib/material/geckoArmorArmoryEntry";
import {createHealthPerLevelAttributes} from "./lib/armory/polymorphArmoryVariants";
import {DefaultAnimation} from "./lib/material/customArmoryEntry";

const assetsPath = path.join("mc", "assets", "_custom")
const geoPath = path.join(assetsPath, "geo")
const animPath = path.join(assetsPath, "animations")
const modelsPath = path.join(assetsPath, "models", "armor")
const texturesPath = path.join(assetsPath, "textures")
const pyromancerGeoPath = path.join(geoPath, "pyromancer_armor.geo.json")
const cryomancerGeoPath = path.join(geoPath, "cryomancer_armor.geo.json")
const electromancerGeoPath = path.join(geoPath, "electromancer_armor.geo.json")
const archevokerGeoPath = path.join(geoPath, "archevoker_armor.geo.json")
const cultistGeoPath = path.join(geoPath, "cultist_armor.geo.json")
const shadowwalkerGeoPath = path.join(geoPath, "shadowwalker_armor.geo.json")
const priestGeoPath = path.join(geoPath, "priest_armor.geo.json")
const plaguedGeoPath = path.join(geoPath, "plagued_armor.geo.json")

const pyromancerAnimPath = path.join(animPath, "pyromancer_armor.animation.json")


function getModelPath(name: string, piece: string): string {
    return path.join(modelsPath, `${name}_${piece}.json`);
}
function getTexturePath(name: string, piece: string): string {
    return path.join(texturesPath, `${name}_${piece}.png`);
}
function getGeoTexturePath(name: string): string {
    return path.join(texturesPath, "armor", `${name}_armor.png`);
}

const powerAdditionPerSetPerLevel = 0.1;
const powerMultiplierPerSetPerLevel = 0.01;

const pyromancerAttribute = attribute_irons_spellbooks.a_fire_spell_power;
const cryomancerAttribute = attribute_irons_spellbooks.a_ice_spell_power;
const electromancerAttribute = attribute_irons_spellbooks.a_lightning_spell_power;
const archevokerAttribute = attribute_irons_spellbooks.a_evocation_spell_power;
const cultistAttribute = attribute_irons_spellbooks.a_blood_spell_power;
const shadowwalkerAttribute = attribute_irons_spellbooks.a_ender_spell_power;
const priestAttribute = attribute_irons_spellbooks.a_holy_spell_power;
const plaguedAttribute = attribute_irons_spellbooks.a_nature_spell_power;

const pyromancerCraftingMaterial = item_irons_spellbooks.i_fire_rune;
const cryomancerCraftingMaterial = item_irons_spellbooks.i_ice_rune;
const electromancerCraftingMaterial = item_irons_spellbooks.i_lightning_rune;
const archevokerCraftingMaterial = item_irons_spellbooks.i_evocation_rune;
const cultistCraftingMaterial = item_irons_spellbooks.i_blood_rune;
const shadowwalkerCraftingMaterial = item_irons_spellbooks.i_ender_rune;
const priestCraftingMaterial = item_irons_spellbooks.i_holy_rune;
const plaguedCraftingMaterial = item_irons_spellbooks.i_nature_rune;

const helmetRecipe = ["material", "material", "material", "material", "rune", "material", "", "", ""];
const chestplateRecipe = ["material", "rune", "material", "material", "material", "material", "material", "material", "material"];
const leggingsRecipe = ["material", "material", "material", "material", "rune", "material", "material", "", "material"];
const bootsRecipe = ["", "", "", "material", "rune", "material", "material", "", "material"];

function createCiaAttribute(attribute: string, piece: 'helmet' | 'chestplate' | 'leggings' | 'boots', level: number): CiaModifier[] {
    return [
        {
            attribute: attribute_irons_spellbooks.a_mana_regen,
            operation: operation.ADDITION,
            value: 0.01,
        },
        {
            attribute: attribute_irons_spellbooks.a_mana_regen,
            operation: operation.MULTIPLY_BASE,
            value: 0.01,
        },
        {
            attribute: attribute_irons_spellbooks.a_max_mana,
            operation: operation.ADDITION,
            value: 2.5,
        },
        {
            attribute: attribute_irons_spellbooks.a_max_mana,
            operation: operation.MULTIPLY_BASE,
            value: 0.01,
        },
        {
            attribute: attribute,
            operation: operation.ADDITION,
            value: powerAdditionPerSetPerLevel * level / 4
        },
        {
            attribute: attribute,
            operation: operation.MULTIPLY_BASE,
            value: powerMultiplierPerSetPerLevel * level / 4
        },
        ...createHealthPerLevelAttributes(piece, "light")
    ]
}

function createArmorVariant(name: string, slot: string, rune): ArmorVariant {
    if (!(slot === "head" || slot === "chest" || slot === "legs" || slot === "feet")) {
        return;
    }

    let typeId;
    let typeDisplay;
    let recipe;
    switch (slot) {
        case "head":
            typeId = "helmet";
            typeDisplay = "hat";
            recipe = helmetRecipe;
            break;
        case "chest":
            typeId = "chestplate";
            typeDisplay = "robe";
            recipe = chestplateRecipe;
            break;
        case "legs":
            typeId = "leggings";
            typeDisplay = "leggings";
            recipe = leggingsRecipe;
            break;
        case "feet":
            typeId = "boots";
            typeDisplay = "boots";
            recipe = bootsRecipe;
            break;
    };
    let recipeCopy = [...recipe];
    recipeCopy[recipeCopy.indexOf("rune")] = rune;

    let attribute;
    switch (name) {
        case "pyromancer":
            attribute = pyromancerAttribute;
            break;
        case "cryomancer":
            attribute = cryomancerAttribute;
            break;
        case "electromancer":
            attribute = electromancerAttribute;
            break;
        case "archevoker":
            attribute = archevokerAttribute;
            break;
        case "cultist":
            attribute = cultistAttribute;
            break;
        case "shadowwalker":
            attribute = shadowwalkerAttribute;
            break;
        case "priest":
            attribute = priestAttribute;
            break;
        case "plagued":
            attribute = plaguedAttribute;
            break;
    };
    let modifiers = createCiaAttribute(attribute, typeId, 1);

    return {
        id: `${name}_${typeId}`,
        type: "armor",
        slot: slot,
        displayName: `${capitalizeFirstLetter(name)} ${capitalizeFirstLetter(typeDisplay)}`,
        recipe: recipeCopy,
        durabilityMultiplier: 0.75,
        armorMultiplier: 0.75,
        toughnessMultiplier: 0.75,
        knockbackResistanceMultiplier: 0.75,
        modelType: "normal",
        additionalAttributesPerLevel: modifiers,
        pmmoSkill: "magic"
    };
}

const pyromancerVariants = ["head", "chest", "legs", "feet"].map((slot) => createArmorVariant("pyromancer", slot, pyromancerCraftingMaterial));
const cryomancerVariants = ["head", "chest", "legs", "feet"].map((slot) => createArmorVariant("cryomancer", slot, cryomancerCraftingMaterial));
const electromancerVariants = ["head", "chest", "legs", "feet"].map((slot) => createArmorVariant("electromancer", slot, electromancerCraftingMaterial));
const archevokerVariants = ["head", "chest", "legs", "feet"].map((slot) => createArmorVariant("archevoker", slot, archevokerCraftingMaterial));
const cultistVariants = ["head", "chest", "legs", "feet"].map((slot) => createArmorVariant("cultist", slot, cultistCraftingMaterial));
const shadowwalkerVariants = ["head", "chest", "legs", "feet"].map((slot) => createArmorVariant("shadowwalker", slot, shadowwalkerCraftingMaterial));
const priestVariants = ["head", "chest", "legs", "feet"].map((slot) => createArmorVariant("priest", slot, priestCraftingMaterial));
const plaguedVariants = ["head", "chest", "legs", "feet"].map((slot) => createArmorVariant("plagued", slot, plaguedCraftingMaterial));

const pyromancerChromas = [
    ChromaCreator.create("#00ff00", "#000000", 0.1, "linear"),
];
const cryomancerChromas = [
    ChromaCreator.create("#182024", "#000000", 0.1, "linear"),
];
const electromancerChromas = [
    ChromaCreator.create("#f4a88d", "#000000", 0.1, "linear"),
];
const archevokerChromas = [
    ChromaCreator.create("#ffbb0f", "#000000", 0.1, "linear"),
];
const cultistChromas = [
    ChromaCreator.create("#5e5c4e", "#000000", 0.1, "linear"),
];
const shadowwalkerChromas = [
    ChromaCreator.create("#5b3138", "#000000", 0.1, "linear"),
];
const priestChromas = [
    ChromaCreator.create("#ffbb0f", "#000000", 0.05, "linear"),
];
const plaguedChromas = [
    ChromaCreator.create("#ebe9b5", "#000000", 0.1, "linear"),
];

function createArmorySet(name: string, geoPath: string, animPath: string, defaultAnims: DefaultAnimation[] | null, chromas: ChromaKeyOperation[], armorVariants: ArmorVariant[]): GeckoArmorArmoryEntry {
    const textures = {}
    textures[`${name}_helmet`] = [getTexturePath(name, "helmet")];
    textures[`${name}_chestplate`] = [getTexturePath(name, "chestplate")];
    textures[`${name}_leggings`] = [getTexturePath(name, "leggings")];
    textures[`${name}_boots`] = [getTexturePath(name, "boots")];
    return new GeckoArmorArmoryEntry(armorVariants)
        .withArmorId(name)
        .withGeoPaths([geoPath])
        .withAnimationPaths([animPath])
        .withDefaultAnimations(defaultAnims)
        .withModelPaths(["helmet", "chestplate", "leggings", "boots"].map((piece) => getModelPath(name, piece)))
        .withTextures(textures)
        .withAdditionalTextures([
            {
                path: getGeoTexturePath(name),
                resultFileName: `{material}_${name}_armor.png`
            }
        ])
        .withMaterialChromaKeyOperations(chromas)

}

export const magicArmorSets = [
    createArmorySet("pyromancer", pyromancerGeoPath, pyromancerAnimPath, [
        {
            name: "animation.deco.loop",
            piece: "chestplate",
        }
    ], pyromancerChromas, pyromancerVariants),
    // createArmorySet("cryomancer", cryomancerGeoPath, cryomancerChromas, cryomancerVariants),
    // createArmorySet("electromancer", electromancerGeoPath, electromancerChromas, electromancerVariants),
    // createArmorySet("archevoker", archevokerGeoPath, archevokerChromas, archevokerVariants),
    // createArmorySet("cultist", cultistGeoPath, cultistChromas, cultistVariants),
    // createArmorySet("shadowwalker", shadowwalkerGeoPath, shadowwalkerChromas, shadowwalkerVariants),
    // createArmorySet("priest", priestGeoPath, priestChromas, priestVariants),
    // createArmorySet("plagued", plaguedGeoPath, plaguedChromas, plaguedVariants),
]
