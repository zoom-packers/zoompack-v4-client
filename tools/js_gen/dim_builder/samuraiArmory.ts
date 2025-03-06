import path from "path";
import {ArmorVariant} from "./lib/material/ArmoryTypes";
import {GeckoArmorArmoryEntry} from "./lib/material/geckoArmorArmoryEntry";
import {CiaModifier, operation} from "./lib/cia/util";
import {createHealthPerLevelAttributes} from "./lib/armory/polymorphArmoryVariants";

const samuraiAssetsPath = path.join("mc", "assets", "_custom");
const samuraiGeoPath = path.join(samuraiAssetsPath, "geo");
const samuraiModelPath = path.join(samuraiAssetsPath, "models", "armor");
const samuraiItemTexturePath = path.join(samuraiAssetsPath, "textures");
const samuraiArmorTexturePath = path.join(samuraiAssetsPath, "textures", "armor");

const lightAttributes: CiaModifier[] = [
    {
        attribute: "minecraft:generic.movement_speed",
        operation: operation.MULTIPLY_BASE,
        value: 0.05,
    },
    {
        attribute: "minecraft:generic.armor",
        operation: operation.MULTIPLY_BASE,
        value: -0.05,
    }
];

const samuraiHelmetVariant: ArmorVariant = {
    id: "samurai_helmet",
    type: "armor",
    slot: "head",
    displayName: "Samurai Helmet",
    recipe: ["material", "material", "material", "material", "minecraft:emerald_block", "material", "", "", ""],
    durabilityMultiplier: 1.05,
    armorMultiplier: 1,
    toughnessMultiplier: 1,
    knockbackResistanceMultiplier: 1,
    modelType: "normal",
    additionalAttributes: lightAttributes,
    additionalAttributesPerLevel: createHealthPerLevelAttributes('helmet', 'medium')
}

const samuraiChestplateVariant: ArmorVariant = {
    id: "samurai_chestplate",
    type: "armor",
    slot: "chest",
    displayName: "Samurai Chestplate",
    recipe: ["material", "minecraft:emerald_block", "material", "material", "material", "material", "material", "material", "material"],
    durabilityMultiplier: 1.1,
    armorMultiplier: 1,
    toughnessMultiplier: 1,
    knockbackResistanceMultiplier: 1,
    modelType: "normal",
    additionalAttributes: lightAttributes,
    additionalAttributesPerLevel: createHealthPerLevelAttributes('chestplate', 'medium')
}

const samuraiLeggingsVariant: ArmorVariant = {
    id: "samurai_leggings",
    type: "armor",
    slot: "legs",
    displayName: "Samurai Leggings",
    recipe: ["material", "material", "material", "material", "minecraft:emerald_block", "material", "material", "", "material"],
    durabilityMultiplier: 1.1,
    armorMultiplier: 1,
    toughnessMultiplier: 1,
    knockbackResistanceMultiplier: 1,
    modelType: "normal",
    additionalAttributes: lightAttributes,
    additionalAttributesPerLevel: createHealthPerLevelAttributes('leggings', 'medium')
}

const samuraiBootsVariant: ArmorVariant = {
    id: "samurai_boots",
    type: "armor",
    slot: "feet",
    displayName: "Samurai Boots",
    recipe: ["", "minecraft:emerald_block", "", "material", "", "material", "material", "", "material"],
    durabilityMultiplier: 1.1,
    armorMultiplier: 1,
    toughnessMultiplier: 1,
    knockbackResistanceMultiplier: 1,
    modelType: "normal",
    additionalAttributes: lightAttributes,
    additionalAttributesPerLevel: createHealthPerLevelAttributes('boots', 'medium')
}

const samuraiArmors = [samuraiHelmetVariant, samuraiChestplateVariant, samuraiLeggingsVariant, samuraiBootsVariant];

export const samuraiCustomArmory = new GeckoArmorArmoryEntry(samuraiArmors)
    .withArmorId("samurai")
    .withGeoPaths([path.join(samuraiGeoPath, "samurai_armor.geo.json")])
    .withModelPaths([
        path.join(samuraiModelPath, "samurai_helmet.json"),
        path.join(samuraiModelPath, "samurai_chestplate.json"),
        path.join(samuraiModelPath, "samurai_leggings.json"),
        path.join(samuraiModelPath, "samurai_boots.json")
    ])
    .withTextures({
        "samurai_helmet": [path.join(samuraiItemTexturePath, "samurai_helmet.png")],
        "samurai_chestplate": [path.join(samuraiItemTexturePath, "samurai_chestplate.png")],
        "samurai_leggings": [path.join(samuraiItemTexturePath, "samurai_leggings.png")],
        "samurai_boots": [path.join(samuraiItemTexturePath, "samurai_boots.png")]
    })
    .withAdditionalTextures(
        [
            {
                path: path.join(samuraiArmorTexturePath, "samurai_armor.png"),
                resultFileName: "{material}_samurai_armor.png"
            }
        ]
    )
    .withMaterialChromaKeyOperations([
        {
            colorToReplace: "#19ff19",
            tolerance: 0.1,
            function: "linear",
            replaceWith: "#000000"
        },
        ])
