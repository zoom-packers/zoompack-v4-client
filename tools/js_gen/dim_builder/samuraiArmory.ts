import path from "path";
import {ArmorVariant} from "./lib/material/ArmoryTypes";
import {GeckoArmorArmoryEntry} from "./lib/material/geckoArmorArmoryEntry";
import {CiaModifier, operation} from "./lib/cia/util";
import {createHealthPerLevelAttributes} from "./lib/armory/polymorphArmoryVariants";

const samuraiAssetsPath = path.join("mc", "assets", "_mod_samurai", "samurai_dynasty");
const samuraiGeoPath = path.join(samuraiAssetsPath, "geo");
const samuraiModelPath = path.join(samuraiAssetsPath, "models", "item");
const samuraiItemTexturePath = path.join(samuraiAssetsPath, "textures", "item");
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

const mediumAttributes: CiaModifier[] = [
    {
        attribute: "minecraft:generic.movement_speed",
        operation: operation.MULTIPLY_BASE,
        value: -0.05,
    },
    {
        attribute: "minecraft:generic.armor",
        operation: operation.MULTIPLY_BASE,
        value: 0.05,
    },
    {
        attribute: "minecraft:generic.armor_toughness",
        operation: operation.MULTIPLY_BASE,
        value: 0.05,
    }
];

const heavyAttributes: CiaModifier[] = [
    {
        attribute: "minecraft:generic.movement_speed",
        operation: operation.MULTIPLY_BASE,
        value: -0.1,
    },
    {
        attribute: "minecraft:generic.armor",
        operation: operation.MULTIPLY_BASE,
        value: 0.2,
    },
    {
        attribute: "minecraft:generic.armor_toughness",
        operation: operation.MULTIPLY_BASE,
        value: 0.2,
    }
];

const samuraiLightHelmetVariant: ArmorVariant = {
    id: "samurai_light_helmet",
    type: "armor",
    slot: "head",
    displayName: "Samurai Light Helmet",
    recipe: ["material", "material", "material", "material", "compressium:redstone_1", "material", "", "", ""],
    durabilityMultiplier: 1.05,
    armorMultiplier: 1,
    toughnessMultiplier: 1,
    knockbackResistanceMultiplier: 1,
    modelType: "normal",
    additionalAttributes: lightAttributes,
    pmmoSkill: "combat",
    additionalAttributesPerLevel: createHealthPerLevelAttributes('helmet', 'light')
}

const samuraiLightChestplateVariant: ArmorVariant = {
    id: "samurai_light_chestplate",
    type: "armor",
    slot: "chest",
    displayName: "Samurai Light Chestplate",
    recipe: ["material", "compressium:redstone_1", "material", "material", "material", "material", "material", "material", "material"],
    durabilityMultiplier: 1.05,
    armorMultiplier: 1,
    toughnessMultiplier: 1,
    knockbackResistanceMultiplier: 1,
    modelType: "normal",
    additionalAttributes: lightAttributes,
    pmmoSkill: "combat",
    additionalAttributesPerLevel: createHealthPerLevelAttributes('chestplate', 'light')
}

const samuraiLightLeggingsVariant: ArmorVariant = {
    id: "samurai_light_leggings",
    type: "armor",
    slot: "legs",
    displayName: "Samurai Light Leggings",
    recipe: ["material", "material", "material", "material", "compressium:redstone_1", "material", "material", "", "material"],
    durabilityMultiplier: 1.05,
    armorMultiplier: 1,
    toughnessMultiplier: 1,
    knockbackResistanceMultiplier: 1,
    modelType: "normal",
    additionalAttributes: lightAttributes,
    pmmoSkill: "combat",
    additionalAttributesPerLevel: createHealthPerLevelAttributes('leggings', 'light')
}

const samuraiLightBootsVariant: ArmorVariant = {
    id: "samurai_light_boots",
    type: "armor",
    slot: "feet",
    displayName: "Samurai Light Boots",
    recipe: ["", "compressium:redstone_1", "", "material", "", "material", "material", "", "material"],
    durabilityMultiplier: 1.05,
    armorMultiplier: 1,
    toughnessMultiplier: 1,
    knockbackResistanceMultiplier: 1,
    modelType: "normal",
    additionalAttributes: lightAttributes,
    pmmoSkill: "combat",
    additionalAttributesPerLevel: createHealthPerLevelAttributes('boots', 'light')
}

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
    additionalAttributes: mediumAttributes,
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
    additionalAttributes: mediumAttributes,
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
    additionalAttributes: mediumAttributes,
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
    additionalAttributes: mediumAttributes,
    additionalAttributesPerLevel: createHealthPerLevelAttributes('boots', 'medium')
}

const samuraiMasterHelmetVariant: ArmorVariant = {
    id: "samurai_master_helmet",
    type: "armor",
    slot: "head",
    displayName: "Samurai Master Helmet",
    recipe: ["material", "material", "material", "material", "compressium:obsidian_1", "material", "", "", ""],
    durabilityMultiplier: 1.2,
    armorMultiplier: 1,
    toughnessMultiplier: 1,
    knockbackResistanceMultiplier: 1,
    modelType: "normal",
    additionalAttributes: heavyAttributes,
    additionalAttributesPerLevel: createHealthPerLevelAttributes('helmet', 'heavy')
}

const samuraiMasterChestplateVariant: ArmorVariant = {
    id: "samurai_master_chestplate",
    type: "armor",
    slot: "chest",
    displayName: "Samurai Master Chestplate",
    recipe: ["material", "compressium:obsidian_1", "material", "material", "material", "material", "material", "material", "material"],
    durabilityMultiplier: 1.2,
    armorMultiplier: 1,
    toughnessMultiplier: 1,
    knockbackResistanceMultiplier: 1,
    modelType: "normal",
    additionalAttributes: heavyAttributes,
    additionalAttributesPerLevel: createHealthPerLevelAttributes('chestplate', 'heavy')
}

const samuraiMasterLeggingsVariant: ArmorVariant = {
    id: "samurai_master_leggings",
    type: "armor",
    slot: "legs",
    displayName: "Samurai Master Leggings",
    recipe: ["material", "material", "material", "material", "compressium:obsidian_1", "material", "material", "", "material"],
    durabilityMultiplier: 1.2,
    armorMultiplier: 1,
    toughnessMultiplier: 1,
    knockbackResistanceMultiplier: 1,
    modelType: "normal",
    additionalAttributes: heavyAttributes,
    additionalAttributesPerLevel: createHealthPerLevelAttributes('leggings', 'heavy')
}

const samuraiMasterBootsVariant: ArmorVariant = {
    id: "samurai_master_boots",
    type: "armor",
    slot: "feet",
    displayName: "Samurai Master Boots",
    recipe: ["", "compressium:obsidian_1", "", "material", "", "material", "material", "", "material"],
    durabilityMultiplier: 1.2,
    armorMultiplier: 1,
    toughnessMultiplier: 1,
    knockbackResistanceMultiplier: 1,
    modelType: "normal",
    additionalAttributes: heavyAttributes,
    additionalAttributesPerLevel: createHealthPerLevelAttributes('boots', 'heavy')
}

const samuraiLightArmors = [samuraiLightHelmetVariant, samuraiLightChestplateVariant, samuraiLightLeggingsVariant, samuraiLightBootsVariant];
const samuraiArmors = [samuraiHelmetVariant, samuraiChestplateVariant, samuraiLeggingsVariant, samuraiBootsVariant];
const samuraiMasterArmors = [samuraiMasterHelmetVariant, samuraiMasterChestplateVariant, samuraiMasterLeggingsVariant, samuraiMasterBootsVariant];

export const samuraiLightCustomArmory = new GeckoArmorArmoryEntry(samuraiLightArmors)
    .withArmorId("samurai_light")
    .withGeoPaths([path.join(samuraiGeoPath, "samurai_armor_light.geo.json")])
    .withModelPaths([
        path.join(samuraiModelPath, "blue_samurai_helmet_light.json"),
        path.join(samuraiModelPath, "blue_samurai_chestplate_light.json"),
        path.join(samuraiModelPath, "blue_samurai_leggings_light.json"),
        path.join(samuraiModelPath, "blue_samurai_boots_light.json")
    ])
    .withTextures({
        "samurai_light_helmet": [path.join(samuraiItemTexturePath, "blue_samurai_helmet_light.png")],
        "samurai_light_chestplate": [path.join(samuraiItemTexturePath, "blue_samurai_chestplate_light.png")],
        "samurai_light_leggings": [path.join(samuraiItemTexturePath, "blue_samurai_leggings_light.png")],
        "samurai_light_boots": [path.join(samuraiItemTexturePath, "blue_samurai_boots_light.png")]
    })
    .withAdditionalTextures(
        [
            {
                path: path.join(samuraiArmorTexturePath, "blue_samurai_armor_light_textures.png"),
                resultFileName: "{material}_samurai_light_armor.png"
            }
        ]
    )
    .withMaterialChromaKeyOperations([
        {
            colorToReplace: "#bebaae",
            tolerance: 0.2,
            function: "linear",
            replaceWith: "#000000"
        },
        {
        colorToReplace: "#2f335e",
        tolerance: 0.1,
        function: "linear",
        replaceWith: "#000000"
        }
    ])

export const samuraiCustomArmory = new GeckoArmorArmoryEntry(samuraiArmors)
    .withArmorId("samurai")
    .withGeoPaths([path.join(samuraiGeoPath, "samurai_armor.geo.json")])
    .withModelPaths([
        path.join(samuraiModelPath, "blue_samurai_helmet.json"),
        path.join(samuraiModelPath, "blue_samurai_chestplate.json"),
        path.join(samuraiModelPath, "blue_samurai_leggings.json"),
        path.join(samuraiModelPath, "blue_samurai_boots.json")
    ])
    .withTextures({
        "samurai_helmet": [path.join(samuraiItemTexturePath, "blue_samurai_helmet.png")],
        "samurai_chestplate": [path.join(samuraiItemTexturePath, "blue_samurai_chestplate.png")],
        "samurai_leggings": [path.join(samuraiItemTexturePath, "blue_samurai_leggings.png")],
        "samurai_boots": [path.join(samuraiItemTexturePath, "blue_samurai_boots.png")]
    })
    .withAdditionalTextures(
        [
            {
                path: path.join(samuraiArmorTexturePath, "blue_samurai_armor_textures.png"),
                resultFileName: "{material}_samurai_armor.png"
            }
        ]
    )
    .withMaterialChromaKeyOperations([
        {
            colorToReplace: "#bebaae",
            tolerance: 0.2,
            function: "linear",
            replaceWith: "#000000"
        },
        {
        colorToReplace: "#2f335e",
        tolerance: 0.1,
        function: "linear",
        replaceWith: "#000000"
        }
        ])

export const samuraiMasterCustomArmory = new GeckoArmorArmoryEntry(samuraiMasterArmors)
    .withArmorId("samurai_master")
    .withGeoPaths([path.join(samuraiGeoPath, "samurai_armor_master.geo.json")])
    .withModelPaths([
        path.join(samuraiModelPath, "blue_samurai_helmet_master.json"),
        path.join(samuraiModelPath, "blue_samurai_chestplate_master.json"),
        path.join(samuraiModelPath, "blue_samurai_leggings_master.json"),
        path.join(samuraiModelPath, "blue_samurai_boots_master.json")
    ])
    .withTextures({
        "samurai_master_helmet": [path.join(samuraiItemTexturePath, "blue_samurai_helmet_master.png")],
        "samurai_master_chestplate": [path.join(samuraiItemTexturePath, "blue_samurai_chestplate_master.png")],
        "samurai_master_leggings": [path.join(samuraiItemTexturePath, "blue_samurai_leggings_master.png")],
        "samurai_master_boots": [path.join(samuraiItemTexturePath, "blue_samurai_boots_master.png")]
    })
    .withAdditionalTextures(
        [
            {
                path: path.join(samuraiArmorTexturePath, "blue_samurai_armor_master_textures.png"),
                resultFileName: "{material}_samurai_master_armor.png"
            }
        ]
    )
    .withMaterialChromaKeyOperations([
        {
            colorToReplace: "#bebaae",
            tolerance: 0.2,
            function: "linear",
            replaceWith: "#000000"
        },
        {
        colorToReplace: "#2f335e",
        tolerance: 0.1,
        function: "linear",
        replaceWith: "#000000"
    }])
