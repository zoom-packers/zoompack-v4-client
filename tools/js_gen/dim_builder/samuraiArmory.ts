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

const samuraiAttributes: CiaModifier[] = [
    {
        attribute: "minecraft:generic.armor",
        operation: operation.MULTIPLY_BASE,
        value: 0.05,
    }
];

const tankAttributes: CiaModifier[] = [
    {
        attribute: "minecraft:generic.movement_speed",
        operation: operation.MULTIPLY_BASE,
        value: -0.05,
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

const rogueAttributes: CiaModifier[] = [
    {
        attribute: "minecraft:generic.movement_speed",
        operation: operation.MULTIPLY_BASE,
        value: 0.1,
    },
    {
        attribute: "minecraft:generic.armor",
        operation: operation.MULTIPLY_BASE,
        value: -0.05,
    },
    {
        attribute: "minecraft:generic.armor_toughness",
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
    pmmoSkill: "swordsmanship",
    additionalAttributes: samuraiAttributes,
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
    pmmoSkill: "swordsmanship",
    additionalAttributes: samuraiAttributes,
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
    pmmoSkill: "swordsmanship",
    additionalAttributes: samuraiAttributes,
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
    pmmoSkill: "swordsmanship",
    additionalAttributes: samuraiAttributes,
    additionalAttributesPerLevel: createHealthPerLevelAttributes('boots', 'medium')
}


const tankHelmetVariant: ArmorVariant = {
    id: "tank_helmet",
    type: "armor",
    slot: "head",
    displayName: "Tank Helmet",
    recipe: ["material", "material", "material", "material", "compressium:obsidian_1", "material", "", "", ""],
    durabilityMultiplier: 1.2,
    armorMultiplier: 1,
    toughnessMultiplier: 1,
    knockbackResistanceMultiplier: 1,
    modelType: "normal",
    additionalAttributes: tankAttributes,
    additionalAttributesPerLevel: createHealthPerLevelAttributes('helmet', 'heavy')
}

const tankChestplateVariant: ArmorVariant = {
    id: "tank_chestplate",
    type: "armor",
    slot: "chest",
    displayName: "Tank Chestplate",
    recipe: ["material", "compressium:obsidian_1", "material", "material", "material", "material", "material", "material", "material"],
    durabilityMultiplier: 1.2,
    armorMultiplier: 1,
    toughnessMultiplier: 1,
    knockbackResistanceMultiplier: 1,
    modelType: "normal",
    additionalAttributes: tankAttributes,
    additionalAttributesPerLevel: createHealthPerLevelAttributes('chestplate', 'heavy')
}

const tankLeggingsVariant: ArmorVariant = {
    id: "tank_leggings",
    type: "armor",
    slot: "legs",
    displayName: "Tank Leggings",
    recipe: ["material", "material", "material", "material", "compressium:obsidian_1", "material", "material", "", "material"],
    durabilityMultiplier: 1.2,
    armorMultiplier: 1,
    toughnessMultiplier: 1,
    knockbackResistanceMultiplier: 1,
    modelType: "normal",
    additionalAttributes: tankAttributes,
    additionalAttributesPerLevel: createHealthPerLevelAttributes('leggings', 'heavy')
}

const tankBootsVariant: ArmorVariant = {
    id: "tank_boots",
    type: "armor",
    slot: "feet",
    displayName: "Tank Boots",
    recipe: ["", "compressium:obsidian_1", "", "material", "", "material", "material", "", "material"],
    durabilityMultiplier: 1.2,
    armorMultiplier: 1,
    toughnessMultiplier: 1,
    knockbackResistanceMultiplier: 1,
    modelType: "normal",
    additionalAttributes: tankAttributes,
    additionalAttributesPerLevel: createHealthPerLevelAttributes('boots', 'heavy')
}

const rogueHelmetVariant: ArmorVariant = {
    id: "rogue_helmet",
    type: "armor",
    slot: "head",
    displayName: "Rogue Helmet",
    recipe: ["material", "material", "material", "material", "compressium:redstone_1", "material", "", "", ""],
    durabilityMultiplier: 1.05,
    armorMultiplier: 1,
    toughnessMultiplier: 1,
    knockbackResistanceMultiplier: 1,
    modelType: "normal",
    additionalAttributes: rogueAttributes,
    pmmoSkill: "combat",
    additionalAttributesPerLevel: createHealthPerLevelAttributes('helmet', 'light')
}

const rogueChestplateVariant: ArmorVariant = {
    id: "rogue_chestplate",
    type: "armor",
    slot: "chest",
    displayName: "Rogue Chestplate",
    recipe: ["material", "compressium:redstone_1", "material", "material", "material", "material", "material", "material", "material"],
    durabilityMultiplier: 1.05,
    armorMultiplier: 1,
    toughnessMultiplier: 1,
    knockbackResistanceMultiplier: 1,
    modelType: "normal",
    additionalAttributes: rogueAttributes,
    pmmoSkill: "combat",
    additionalAttributesPerLevel: createHealthPerLevelAttributes('chestplate', 'light')
}

const rogueLeggingsVariant: ArmorVariant = {
    id: "rogue_leggings",
    type: "armor",
    slot: "legs",
    displayName: "Rogue Leggings",
    recipe: ["material", "material", "material", "material", "compressium:redstone_1", "material", "material", "", "material"],
    durabilityMultiplier: 1.05,
    armorMultiplier: 1,
    toughnessMultiplier: 1,
    knockbackResistanceMultiplier: 1,
    modelType: "normal",
    additionalAttributes: rogueAttributes,
    pmmoSkill: "combat",
    additionalAttributesPerLevel: createHealthPerLevelAttributes('leggings', 'light')
}

const rogueBootsVariant: ArmorVariant = {
    id: "rogue_boots",
    type: "armor",
    slot: "feet",
    displayName: "Rogue Boots",
    recipe: ["", "compressium:redstone_1", "", "material", "", "material", "material", "", "material"],
    durabilityMultiplier: 1.05,
    armorMultiplier: 1,
    toughnessMultiplier: 1,
    knockbackResistanceMultiplier: 1,
    modelType: "normal",
    additionalAttributes: rogueAttributes,
    pmmoSkill: "combat",
    additionalAttributesPerLevel: createHealthPerLevelAttributes('boots', 'light')
}


const samuraiArmors = [samuraiHelmetVariant, samuraiChestplateVariant, samuraiLeggingsVariant, samuraiBootsVariant];
const tankArmors = [tankHelmetVariant, tankChestplateVariant, tankLeggingsVariant, tankBootsVariant];
const rogueArmors = [rogueHelmetVariant, rogueChestplateVariant, rogueLeggingsVariant, rogueBootsVariant];

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

export const tankCustomArmory = new GeckoArmorArmoryEntry(tankArmors)
    .withArmorId("tank")
    .withGeoPaths([path.join(samuraiGeoPath, "tank_armor.geo.json")])
    .withModelPaths([
        path.join(samuraiModelPath, "tank_helmet.json"),
        path.join(samuraiModelPath, "tank_chestplate.json"),
        path.join(samuraiModelPath, "tank_leggings.json"),
        path.join(samuraiModelPath, "tank_boots.json")
    ])
    .withTextures({
        "tank_helmet": [path.join(samuraiItemTexturePath, "tank_helmet.png")],
        "tank_chestplate": [path.join(samuraiItemTexturePath, "tank_chestplate.png")],
        "tank_leggings": [path.join(samuraiItemTexturePath, "tank_leggings.png")],
        "tank_boots": [path.join(samuraiItemTexturePath, "tank_boots.png")]
    })
    .withAdditionalTextures(
        [
            {
                path: path.join(samuraiArmorTexturePath, "tank_armor.png"),
                resultFileName: "{material}_tank_armor.png"
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

export const rogueCustomArmory = new GeckoArmorArmoryEntry(rogueArmors)
    .withArmorId("rogue")
    .withGeoPaths([path.join(samuraiGeoPath, "rogue_armor.geo.json")])
    .withModelPaths([
        path.join(samuraiModelPath, "rogue_helmet.json"),
        path.join(samuraiModelPath, "rogue_chestplate.json"),
        path.join(samuraiModelPath, "rogue_leggings.json"),
        path.join(samuraiModelPath, "rogue_boots.json")
    ])
    .withTextures({
        "rogue_helmet": [path.join(samuraiItemTexturePath, "rogue_helmet.png")],
        "rogue_chestplate": [path.join(samuraiItemTexturePath, "rogue_chestplate.png")],
        "rogue_leggings": [path.join(samuraiItemTexturePath, "rogue_leggings.png")],
        "rogue_boots": [path.join(samuraiItemTexturePath, "rogue_boots.png")]
    })
    .withAdditionalTextures(
        [
            {
                path: path.join(samuraiArmorTexturePath, "rogue_armor.png"),
                resultFileName: "{material}_rogue_armor.png"
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
