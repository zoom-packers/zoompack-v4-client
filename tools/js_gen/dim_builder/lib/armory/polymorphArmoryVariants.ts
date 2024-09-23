import {
    ArmorVariant, BaseVariant,
    BowVariant,
    CrossbowVariant,
    ShieldVariant,
    SwordVariant,
    ToolVariant
} from "../material/ArmoryTypes";
import {operation} from "../cia/util";

export class PolymorphArmoryVariants {

    //#region SWORDS

    private static readonly CLAWS_VARIANT: SwordVariant = {
        id: "claws",
        type: "sword",
        displayName: "Claws",
        recipe: ["", "", "", "", "material", "material", "", "", ""],
        durabilityMultiplier: 1.3,
        damageMultiplier: 0.7,
        speedFlatAddition: 0.5,
        reachFlatAddition: -0.1,
        modelType: "claws",
        additionalAttributes: [
            {
                attribute: "attributeslib:dodge_chance",
                value: 0.1,
                operation: operation.LOWERCASE_ADDITION
            }
        ]
    };

    private static readonly DAGGER_VARIANT: SwordVariant = {
        id: "dagger",
        type: "sword",
        displayName: "Dagger",
        recipe: ["", "", "", "", "material", "", "#forge:rods/wooden", "", ""],
        durabilityMultiplier: 1.5,
        damageMultiplier: 0.7,
        speedFlatAddition: 0.5,
        reachFlatAddition: -0.2,
        modelType: "normal",
        additionalAttributes: [
            {
                attribute: "attributeslib:dodge_chance",
                value: 0.1,
                operation: operation.LOWERCASE_ADDITION
            }
        ]
    }
    private static readonly SHORTSWORD_VARIANT: SwordVariant = {
        id: "shortsword",
        type: "sword",
        displayName: "Shortsword",
        recipe: ["", "", "", "", "material", "", "", "#forge:rods/wooden", ""],
        durabilityMultiplier: 1.2,
        damageMultiplier: 0.8,
        speedFlatAddition: 0.2,
        reachFlatAddition: -0.1,
        modelType: "normal",
        additionalAttributes: []
    }
    private static readonly LONGSWORD_VARIANT: SwordVariant = {
        id: "heavysword",
        type: "sword",
        displayName: "Heavysword",
        recipe: ["", "material", "material", "", "material", "", "#forge:rods/wooden", "", ""],
        durabilityMultiplier: 0.8,
        damageMultiplier: 1.2,
        speedFlatAddition: 0,
        reachFlatAddition: 0,
        modelType: "long",
        additionalAttributes: []
    }
    private static readonly CUTLASS_VARIANT: SwordVariant = {
        id: "cutlass",
        type: "sword",
        displayName: "Cutlass",
        recipe: ["", "material", "", "material", "", "", "#forge:rods/wooden", "", ""],
        durabilityMultiplier: 1.2,
        damageMultiplier: 1.1,
        speedFlatAddition: -0.1,
        reachFlatAddition: 0,
        modelType: "normal",
        additionalAttributes: []
    }
    private static readonly MACE_VARIANT: SwordVariant = {
        id: "mace",
        type: "sword",
        displayName: "Mace",
        recipe: ["", "material", "material", "", "#forge:rods/wooden", "material", "#forge:rods/wooden", "", ""],
        durabilityMultiplier: 1.2,
        damageMultiplier: 1.15,
        speedFlatAddition: -0.15,
        reachFlatAddition: 0,
        modelType: "normal",
        additionalAttributes: []
    }
    private static readonly HEAVY_MACE_VARIANT: SwordVariant = {
        id: "heavymace",
        type: "sword",
        displayName: "Heavy Mace",
        recipe: ["", "material", "material", "", "material", "material", "", "#forge:rods/wooden", ""],
        durabilityMultiplier: 0.8,
        damageMultiplier: 1.3,
        speedFlatAddition: -0.3,
        reachFlatAddition: 0.3,
        modelType: "long",
        additionalAttributes: []
    }
    private static readonly WARHAMMER_VARIANT: SwordVariant = {
        id: "warhammer",
        type: "sword",
        displayName: "Warhammer",
        recipe: ["material", "material", "material", "", "#forge:rods/wooden", "material", "#forge:rods/wooden", "", ""],
        durabilityMultiplier: 0.7,
        damageMultiplier: 1.5,
        speedFlatAddition: -0.35,
        reachFlatAddition: 0.3,
        modelType: "long",
        additionalAttributes: []
    }
    private static readonly BATTLEAXE_VARIANT: SwordVariant = {
        id: "battleaxe",
        type: "sword",
        displayName: "Battleaxe",
        recipe: ["material", "material", "material", "material", "#forge:rods/wooden", "material", "", "#forge:rods/wooden", ""],
        durabilityMultiplier: 0.8,
        damageMultiplier: 1.35,
        speedFlatAddition: -0.25,
        reachFlatAddition: 0.3,
        modelType: "long",
        additionalAttributes: []
    }
    private static readonly SPEAR_VARIANT: SwordVariant = {
        id: "spear",
        type: "sword",
        displayName: "Spear",
        recipe: ["", "", "material", "", "#forge:rods/wooden", "", "#forge:rods/wooden", "", ""],
        durabilityMultiplier: 1.2,
        damageMultiplier: 0.9,
        speedFlatAddition: -0.15,
        reachFlatAddition: 0.7,
        modelType: "spear",
        additionalAttributes: []
    }
    private static readonly HALBERD_VARIANT: SwordVariant = {
        id: "halberd",
        type: "sword",
        displayName: "Halberd",
        recipe: ["", "", "material", "", "#forge:rods/wooden", "material", "#forge:rods/wooden", "", ""],
        durabilityMultiplier: 0.85,
        damageMultiplier: 1.15,
        speedFlatAddition: -0.3,
        reachFlatAddition: 0.7,
        modelType: "spear",
        additionalAttributes: []
    }

    private static readonly SCYTHE_VARIANT: SwordVariant = {
        id: "scythe",
        type: "sword",
        displayName: "Scythe",
        recipe: ["material","material","","#forge:rods/wooden","material","","#forge:rods/wooden","",""],
        durabilityMultiplier: 0.8,
        damageMultiplier: 1.3,
        speedFlatAddition: -0.4,
        reachFlatAddition: 0.7,
        modelType: "long",
        additionalAttributes: []
    }

    public static readonly SWORDS: SwordVariant[] = [
        PolymorphArmoryVariants.CLAWS_VARIANT,
        PolymorphArmoryVariants.DAGGER_VARIANT,
        PolymorphArmoryVariants.SHORTSWORD_VARIANT,
        PolymorphArmoryVariants.LONGSWORD_VARIANT,
        PolymorphArmoryVariants.CUTLASS_VARIANT,
        PolymorphArmoryVariants.MACE_VARIANT,
        PolymorphArmoryVariants.HEAVY_MACE_VARIANT,
        PolymorphArmoryVariants.WARHAMMER_VARIANT,
        PolymorphArmoryVariants.BATTLEAXE_VARIANT,
        PolymorphArmoryVariants.SPEAR_VARIANT,
        PolymorphArmoryVariants.HALBERD_VARIANT,
        PolymorphArmoryVariants.SCYTHE_VARIANT
    ];
    //#endregion

    //#region SHIELDS
    private static readonly BUCKLER_VARIANT: ShieldVariant = {
        id: "buckler",
        type: "shield",
        displayName: "Buckler",
        recipe: ["", "#minecraft:planks", "", "#minecraft:planks", "material", "#minecraft:planks", "", "#minecraft:planks", ""],
        durabilityMultiplier: 0.9,
        armorMultiplier: 0.3,
        speedMultiplier: 0,
        modelType: "buckler_shield",
        additionalAttributes: []
    }
    private static readonly HEATER_VARIANT: ShieldVariant = {
        id: "heater",
        type: "shield",
        displayName: "Heater Shield",
        recipe: ["#minecraft:planks", "material", "#minecraft:planks", "#minecraft:planks", "material", "#minecraft:planks", "", "#minecraft:planks", ""],
        durabilityMultiplier: 1.2,
        armorMultiplier: 0.4,
        speedMultiplier: -0.1,
        modelType: "heater_shield",
        additionalAttributes: []
    }
    private static readonly TOWER_VARIANT: ShieldVariant = {
        id: "tower",
        type: "shield",
        displayName: "Tower Shield",
        recipe: ["#minecraft:planks", "material", "#minecraft:planks", "#minecraft:planks", "material", "#minecraft:planks", "#minecraft:planks", "material", "#minecraft:planks"],
        durabilityMultiplier: 1.5,
        armorMultiplier: 0.5,
        speedMultiplier: -0.2,
        modelType: "tower_shield",
        additionalAttributes: []
    }

    public static readonly SHIELDS: ShieldVariant[] = [
        PolymorphArmoryVariants.BUCKLER_VARIANT,
        PolymorphArmoryVariants.HEATER_VARIANT,
        PolymorphArmoryVariants.TOWER_VARIANT
    ];
    //#endregion

    //#region BOWS
    private static readonly SHORTBOW_VARIANT: BowVariant = {
        id: "shortbow",
        type: "bow",
        displayName: "Shortbow",
        recipe: ["", "material", "#c:string", "material", "", "#c:string", "", "material", "#c:string"],
        durabilityMultiplier: 1.2,
        damageMultiplier: 0.8,
        speedMultiplier: 0.2,
        modelType: "shortbow",
        additionalAttributes: []
    }
    private static readonly BOW_VARIANT: BowVariant = {
        id: "bow",
        type: "bow",
        displayName: "Bow",
        recipe: ["", "material", "#c:string", "material", "#c:string", "", "material", "#c:string", ""],
        durabilityMultiplier: 1,
        damageMultiplier: 1,
        speedMultiplier: 0,
        modelType: "bow",
        additionalAttributes: []
    }
    private static readonly LONGBOW_VARIANT: BowVariant = {
        id: "longbow",
        type: "bow",
        displayName: "Longbow",
        recipe: ["", "material", "#c:string", "", "material", "#c:string", "material", "#c:string", ""],
        durabilityMultiplier: 0.8,
        damageMultiplier: 1.2,
        speedMultiplier: -0.3,
        modelType: "longbow",
        additionalAttributes: []
    }

    public static readonly BOWS: BowVariant[] = [
        PolymorphArmoryVariants.SHORTBOW_VARIANT,
        PolymorphArmoryVariants.BOW_VARIANT,
        PolymorphArmoryVariants.LONGBOW_VARIANT
    ];
    //#endregion

    //#region Crossbows
    private static readonly CROSSBOW_VARIANT: CrossbowVariant = {
        id: "crossbow",
        type: "crossbow",
        displayName: "Crossbow",
        recipe: ["material", "material", "material", "#c:string", "minecraft:tripwire_hook", "#c:string", "", "#forge:rods/wooden", ""],
        durabilityMultiplier: 0.75,
        damageMultiplier: 1.5,
        speedMultiplier: -0.2,
        modelType: "crossbow",
        additionalAttributes: []
    }
    private static readonly ARBALEST_VARIANT: CrossbowVariant = {
        id: "arbalest",
        type: "crossbow",
        displayName: "Arbalest",
        recipe: ["material", "material", "material", "#c:string", "minecraft:tripwire_hook", "#c:string", "material", "#forge:rods/wooden", ""],
        durabilityMultiplier: 1.2,
        damageMultiplier: 0.4,
        speedMultiplier: -0.2,
        modelType: "crossbow",
        additionalAttributes: []
    }

    public static readonly CROSSBOWS: CrossbowVariant[] = [
        PolymorphArmoryVariants.CROSSBOW_VARIANT,
        // PolymorphArmoryVariants.ARBALEST_VARIANT
    ];
    //#endregion

    //#region TOOLS
    private static readonly PICKAXE_VARIANT: ToolVariant = {
        id: "pickaxe",
        type: "tool",
        toolType: "pickaxe",
        displayName: "Pickaxe",
        recipe: ["material", "material", "material", "", "#forge:rods/wooden", "", "", "#forge:rods/wooden", ""],
        durabilityMultiplier: 1,
        speedMultiplier: 1,
        damageMultiplier: 0,
        modelType: "normal",
        additionalAttributes: []
    }
    private static readonly AXE_VARIANT: ToolVariant = {
        id: "axe",
        type: "tool",
        toolType: "axe",
        displayName: "Axe",
        recipe: ["material", "material", "", "material", "#forge:rods/wooden", "", "", "#forge:rods/wooden", ""],
        durabilityMultiplier: 1,
        speedMultiplier: 1,
        damageMultiplier: 1,
        modelType: "normal",
        additionalAttributes: []
    }
    private static readonly SHOVEL_VARIANT: ToolVariant = {
        id: "shovel",
        type: "tool",
        toolType: "shovel",
        displayName: "Shovel",
        recipe: ["material", "", "material", "", "#forge:rods/wooden", "", "", "#forge:rods/wooden", ""],
        durabilityMultiplier: 1,
        speedMultiplier: 1,
        damageMultiplier: 0,
        modelType: "normal",
        additionalAttributes: []
    }
    private static readonly HOE_VARIANT: ToolVariant = {
        id: "hoe",
        type: "tool",
        toolType: "hoe",
        displayName: "Hoe",
        recipe: ["material", "material", "", "", "#forge:rods/wooden", "", "", "#forge:rods/wooden", ""],
        durabilityMultiplier: 1,
        speedMultiplier: 1,
        damageMultiplier: 0,
        modelType: "normal",
        additionalAttributes: []
    }

    public static readonly TOOLS: ToolVariant[] = [
        PolymorphArmoryVariants.PICKAXE_VARIANT,
        PolymorphArmoryVariants.AXE_VARIANT,
        PolymorphArmoryVariants.SHOVEL_VARIANT,
        PolymorphArmoryVariants.HOE_VARIANT
    ];
    //#endregion

    //#region ARMOR
    private static readonly HELMET_VARIANT: ArmorVariant = {
        id: "helmet",
        type: "armor",
        slot: "head",
        displayName: "Helmet",
        recipe: ["material", "material", "material", "material", "", "material", "", "", ""],
        durabilityMultiplier: 1,
        armorMultiplier: 1,
        toughnessMultiplier: 1,
        knockbackResistanceMultiplier: 1,
        modelType: "normal",
        additionalAttributes: []
    }
    private static readonly CHESTPLATE_VARIANT: ArmorVariant = {
        id: "chestplate",
        type: "armor",
        slot: "chest",
        displayName: "Chestplate",
        recipe: ["material", "", "material", "material", "material", "material", "material", "material", "material"],
        durabilityMultiplier: 1,
        armorMultiplier: 1,
        toughnessMultiplier: 1,
        knockbackResistanceMultiplier: 1,
        modelType: "normal",
        additionalAttributes: []
    }
    private static readonly LEGGINGS_VARIANT: ArmorVariant = {
        id: "leggings",
        type: "armor",
        slot: "legs",
        displayName: "Leggings",
        recipe: ["material", "material", "material", "material", "", "material", "material", "", "material"],
        durabilityMultiplier: 1,
        armorMultiplier: 1,
        toughnessMultiplier: 1,
        knockbackResistanceMultiplier: 1,
        modelType: "normal",
        additionalAttributes: []
    }
    private static readonly BOOTS_VARIANT: ArmorVariant = {
        id: "boots",
        type: "armor",
        slot: "feet",
        displayName: "Boots",
        recipe: ["material", "", "material", "material", "", "material", "", "", ""],
        durabilityMultiplier: 1,
        armorMultiplier: 1,
        toughnessMultiplier: 1,
        knockbackResistanceMultiplier: 1,
        modelType: "normal",
        additionalAttributes: []
    }

    public static readonly ARMORS: ArmorVariant[] = [
        PolymorphArmoryVariants.HELMET_VARIANT,
        PolymorphArmoryVariants.CHESTPLATE_VARIANT,
        PolymorphArmoryVariants.LEGGINGS_VARIANT,
        PolymorphArmoryVariants.BOOTS_VARIANT
    ];
    //#endregion

    public static readonly ARCHERY: (BowVariant | CrossbowVariant)[] = [
        ...PolymorphArmoryVariants.BOWS,
        ...PolymorphArmoryVariants.CROSSBOWS
    ];

    public static readonly ALL: BaseVariant[] = [
        ...PolymorphArmoryVariants.SWORDS,
        ...PolymorphArmoryVariants.SHIELDS,
        ...PolymorphArmoryVariants.BOWS,
        ...PolymorphArmoryVariants.CROSSBOWS,
        ...PolymorphArmoryVariants.TOOLS,
        ...PolymorphArmoryVariants.ARMORS
    ];
}
