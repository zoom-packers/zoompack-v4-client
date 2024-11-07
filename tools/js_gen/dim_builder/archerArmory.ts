import {CiaModifierBuilder, operation} from "./lib/cia/util";
import {attribute_minecraft, attribute_projectile_damage} from "../typedefs/attribute_typedefs";
import {ArmorVariant, ChromaCreator} from "./lib/material/ArmoryTypes";
import {createHealthPerLevelAttributes} from "./lib/armory/polymorphArmoryVariants";
import {GeckoArmorArmoryEntry, SimpleArmorArmoryEntry} from "./lib/material/geckoArmorArmoryEntry";
import path from "path";

const archerAssetsPath = path.join("mc", "assets", "_custom");
const archerGeoPath = path.join(archerAssetsPath, "geo");
const archerModelPath = path.join(archerAssetsPath, "models", "armor");
const archerArmorTexturePath = path.join(archerAssetsPath, "textures", "armor");
const archerItemTexturePath = path.join(archerAssetsPath, "textures");

const archerAttributes = [
    CiaModifierBuilder.create(attribute_minecraft.a_generic_movement_speed, operation.MULTIPLY_BASE, 0.05),
]
const rangerAttributes = [
    CiaModifierBuilder.create(attribute_minecraft.a_generic_movement_speed, operation.MULTIPLY_BASE, 0.025),
]

const archerAttributesPerLevel = [
    CiaModifierBuilder.create(attribute_projectile_damage.a_generic, operation.ADDITION, 1),
    CiaModifierBuilder.create(attribute_projectile_damage.a_generic, operation.MULTIPLY_BASE, 0.02),
]

const rangerAttributesPerLevel = [
    CiaModifierBuilder.create(attribute_projectile_damage.a_generic, operation.ADDITION, 1.25),
    CiaModifierBuilder.create(attribute_projectile_damage.a_generic, operation.MULTIPLY_BASE, 0.015),
]

const archerHelmetVariant: ArmorVariant = {
    id: "archer_helmet",
    type: "armor",
    slot: "head",
    displayName: "Archer Helmet",
    recipe: ["material", "material", "material", "material", "minecraft:bow", "material", "", "", ""],
    durabilityMultiplier: 1.25,
    armorMultiplier: 0.75,
    toughnessMultiplier: 0.75,
    knockbackResistanceMultiplier: 0.75,
    modelType: "normal",
    pmmoSkill: "archery",
    additionalAttributes: archerAttributes,
    additionalAttributesPerLevel: [...rangerAttributesPerLevel, ...createHealthPerLevelAttributes('helmet', 'light')]
}

const archerChestplateVariant: ArmorVariant = {
    id: "archer_chestplate",
    type: "armor",
    slot: "chest",
    displayName: "Archer Chestplate",
    recipe: ["material", "minecraft:bow", "material", "material", "material", "material", "material", "material", "material"],
    durabilityMultiplier: 1.25,
    armorMultiplier: 0.75,
    toughnessMultiplier: 0.75,
    knockbackResistanceMultiplier: 0.75,
    modelType: "normal",
    pmmoSkill: "archery",
    additionalAttributes: archerAttributes,
    additionalAttributesPerLevel: [...rangerAttributesPerLevel, ...createHealthPerLevelAttributes('chestplate', 'light')]
}

const archerLeggingsVariant: ArmorVariant = {
    id: "archer_leggings",
    type: "armor",
    slot: "legs",
    displayName: "Archer Leggings",
    recipe: ["material", "material", "material", "material", "minecraft:bow", "material", "material", "", "material"],
    durabilityMultiplier: 1.25,
    armorMultiplier: 0.75,
    toughnessMultiplier: 0.75,
    knockbackResistanceMultiplier: 0.75,
    modelType: "normal",
    pmmoSkill: "archery",
    additionalAttributes: archerAttributes,
    additionalAttributesPerLevel: [...rangerAttributesPerLevel, ...createHealthPerLevelAttributes('leggings', 'light')]
}

const archerBootsVariant: ArmorVariant = {
    id: "archer_boots",
    type: "armor",
    slot: "feet",
    displayName: "Archer Boots",
    recipe: ["", "", "", "material", "minecraft:bow", "material", "material", "", "material"],
    durabilityMultiplier: 1.25,
    armorMultiplier: 0.75,
    toughnessMultiplier: 0.75,
    knockbackResistanceMultiplier: 0.75,
    modelType: "normal",
    pmmoSkill: "archery",
    additionalAttributes: archerAttributes,
    additionalAttributesPerLevel: [...rangerAttributesPerLevel, ...createHealthPerLevelAttributes('boots', 'light')]
}

const rangerHelmetVariant: ArmorVariant = {
    id: "ranger_helmet",
    type: "armor",
    slot: "head",
    displayName: "Ranger Helmet",
    recipe: ["material", "material", "material", "material", "minecraft:crossbow", "material", "", "", ""],
    durabilityMultiplier: 1.15,
    armorMultiplier: 0.85,
    toughnessMultiplier: 0.85,
    knockbackResistanceMultiplier: 0.75,
    modelType: "normal",
    pmmoSkill: "archery",
    additionalAttributes: rangerAttributes,
    additionalAttributesPerLevel: [...rangerAttributesPerLevel, ...createHealthPerLevelAttributes('helmet', 'medium')]
}

const rangerChestplateVariant: ArmorVariant = {
    id: "ranger_chestplate",
    type: "armor",
    slot: "chest",
    displayName: "Ranger Chestplate",
    recipe: ["material", "minecraft:crossbow", "material", "material", "material", "material", "material", "material", "material"],
    durabilityMultiplier: 1.15,
    armorMultiplier: 0.85,
    toughnessMultiplier: 0.85,
    knockbackResistanceMultiplier: 0.75,
    modelType: "normal",
    pmmoSkill: "archery",
    additionalAttributes: rangerAttributes,
    additionalAttributesPerLevel: [...rangerAttributesPerLevel, ...createHealthPerLevelAttributes('chestplate', 'medium')]
}

const rangerLeggingsVariant: ArmorVariant = {
    id: "ranger_leggings",
    type: "armor",
    slot: "legs",
    displayName: "Ranger Leggings",
    recipe: ["material", "material", "material", "material", "minecraft:crossbow", "material", "material", "", "material"],
    durabilityMultiplier: 1.15,
    armorMultiplier: 0.85,
    toughnessMultiplier: 0.85,
    knockbackResistanceMultiplier: 0.75,
    modelType: "normal",
    pmmoSkill: "archery",
    additionalAttributes: rangerAttributes,
    additionalAttributesPerLevel: [...rangerAttributesPerLevel, ...createHealthPerLevelAttributes('leggings', 'medium')]
}

const rangerBootsVariant: ArmorVariant = {
    id: "ranger_boots",
    type: "armor",
    slot: "feet",
    displayName: "Ranger Boots",
    recipe: ["", "", "", "material", "minecraft:crossbow", "material", "material", "", "material"],
    durabilityMultiplier: 1.15,
    armorMultiplier: 0.85,
    toughnessMultiplier: 0.85,
    knockbackResistanceMultiplier: 0.75,
    modelType: "normal",
    pmmoSkill: "archery",
    additionalAttributes: rangerAttributes,
    additionalAttributesPerLevel: [...rangerAttributesPerLevel, ...createHealthPerLevelAttributes('boots', 'medium')]
}

const archerVariants = [archerHelmetVariant, archerChestplateVariant, archerLeggingsVariant, archerBootsVariant];
const rangerVariants = [rangerHelmetVariant, rangerChestplateVariant, rangerLeggingsVariant, rangerBootsVariant];

export const archerCustomArmory = new GeckoArmorArmoryEntry(archerVariants)
    .withArmorId("archer")
    .withGeoPaths([
        path.join(archerGeoPath, "archer_armor.geo.json"),
    ])
    .withModelPaths([
        path.join(archerModelPath, "archer_helmet.json"),
        path.join(archerModelPath, "archer_chestplate.json"),
        path.join(archerModelPath, "archer_leggings.json"),
        path.join(archerModelPath, "archer_boots.json"),
    ])
    .withTextures({
        "archer_helmet": [path.join(archerItemTexturePath, "archer_helmet.png")],
        "archer_chestplate": [path.join(archerItemTexturePath, "archer_chestplate.png")],
        "archer_leggings": [path.join(archerItemTexturePath, "archer_leggings.png")],
        "archer_boots": [path.join(archerItemTexturePath, "archer_boots.png")],
    })
    .withAdditionalTextures([
        {
            path: path.join(archerArmorTexturePath, "archer_armor.png"),
            resultFileName: "{material}_archer_armor.png"
        }
        ])
    .withMaterialChromaKeyOperations([
        ChromaCreator.create("#36583a", "#000000", 0.1, "linear"),
    ]);

export const rangerCustomArmory = new GeckoArmorArmoryEntry(rangerVariants)
    .withArmorId("ranger")
    .withGeoPaths([
        path.join(archerGeoPath, "ranger_armor.geo.json"),
    ])
    .withModelPaths([
        path.join(archerModelPath, "ranger_helmet.json"),
        path.join(archerModelPath, "ranger_chestplate.json"),
        path.join(archerModelPath, "ranger_leggings.json"),
        path.join(archerModelPath, "ranger_boots.json"),
    ])
    .withTextures({
        "ranger_helmet": [path.join(archerItemTexturePath, "ranger_helmet.png")],
        "ranger_chestplate": [path.join(archerItemTexturePath, "ranger_chestplate.png")],
        "ranger_leggings": [path.join(archerItemTexturePath, "ranger_leggings.png")],
        "ranger_boots": [path.join(archerItemTexturePath, "ranger_boots.png")],
    })
    .withAdditionalTextures([
        {
            path: path.join(archerArmorTexturePath, "ranger_armor.png"),
            resultFileName: "{material}_ranger_armor.png"
        }
        ])
    .withMaterialChromaKeyOperations([
        ChromaCreator.create("#ac0d00", "#000000", 0.05, "linear"),
    ]);

