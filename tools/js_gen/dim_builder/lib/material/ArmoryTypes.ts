import {CiaModifier} from "../cia/util";
import {CraftingRecipe} from "../kjs/kubeJsRecipes";

export type TextureGenDetails = {
    textureName: string,
    chromaKeyOperations: ChromaKeyOperation[]
}

export type BaseVariant = {
    id: string,
    displayName: string,
    type: string,
    recipe: string[],
    durabilityMultiplier: number,
    modelType: string,
    additionalAttributes?: CiaModifier[],
    additionalAttributesPerLevel?: CiaModifier[] | undefined,
    pmmoSkill?: string;
    textureGenDetails?: TextureGenDetails
}

export type CurioVariant = BaseVariant & {
    slot: string;
}

export type SwordVariant = BaseVariant & {
    damageMultiplier: number,
    speedMultiplier: number,
    reachMultiplier: number
}

export type ShieldVariant = BaseVariant & {
    armorMultiplier: number,
    speedMultiplier: number,
}

export type BowVariant = BaseVariant & {
    damageMultiplier: number,
    speedMultiplier: number
}

export type CrossbowVariant = BowVariant

export type ToolVariant = BaseVariant & {
    toolType: string,
    damageMultiplier: number,
    speedMultiplier: number
}

export type ArmorVariant = BaseVariant & {
    slot: "head" | "chest" | "legs" | "feet",
    armorMultiplier: number,
    toughnessMultiplier: number,
    knockbackResistanceMultiplier: number
}

export type GlovesVariant = BaseVariant & {
    damagePerLevel: number,
}

export type AnyVariant = SwordVariant | ShieldVariant | BowVariant | CrossbowVariant | ToolVariant | ArmorVariant;


export type ChromaKeyOperation = {
    colorToReplace: string,
    replaceWith: string,
    tolerance: number,
    function: "linear" | "squared" | "cubic",
    brightness?: number
}

export class ChromaCreator {
    static create(colorToReplace: string, replaceWith: string, tolerance: number, fun: "linear" | "squared" | "cubic", brightness = 0): ChromaKeyOperation {
        return {colorToReplace, replaceWith, tolerance, function: fun, brightness};
    }
}


export class ArmoryTypes {

    static weaponTypes = [
        {
            name: "dagger",
            recipe: ["", "", "", "", "material", "", "#forge:rods/wooden", "", ""],
            durabilityMultiplier: 0.9,
            damageMultiplier: 0.7,
            speedMultiplier: 0.5,
            reachMultiplier: -0.2,
            textureGenType: "normal"
        },
        {
            name: "shortsword",
            recipe: ["", "", "", "", "material", "", "", "#forge:rods/wooden", ""],
            durabilityMultiplier: 1,
            damageMultiplier: 0.8,
            speedMultiplier: 0.2,
            reachMultiplier: -0.1,
            textureGenType: "normal"
        },
        {
            name: "heavysword",
            recipe: ["", "material", "material", "", "material", "", "#forge:rods/wooden", "", ""],
            durabilityMultiplier: 1.5,
            damageMultiplier: 1.2,
            speedMultiplier: -0.2,
            reachMultiplier: 0.3,
            textureGenType: "long"
        },
        {
            name: "cutlass",
            recipe: ["", "material", "", "material", "", "", "#forge:rods/wooden", "", ""],
            durabilityMultiplier: 1.2,
            damageMultiplier: 1.1,
            speedMultiplier: -0.1,
            reachMultiplier: 0,
            textureGenType: "normal"
        },
        {
            name: "mace",
            recipe: ["", "material", "material", "", "#forge:rods/wooden", "material", "#forge:rods/wooden", "", ""],
            durabilityMultiplier: 1.2,
            damageMultiplier: 1.15,
            speedMultiplier: -0.15,
            reachMultiplier: 0,
            textureGenType: "normal"
        },
        {
            name: "heavymace",
            recipe: ["", "material", "material", "", "material", "material", "", "#forge:rods/wooden", ""],
            durabilityMultiplier: 1.5,
            damageMultiplier: 1.3,
            speedMultiplier: -0.3,
            reachMultiplier: 0.3,
            textureGenType: "long"
        },
        {
            name: "warhammer",
            recipe: ["material", "material", "material", "", "#forge:rods/wooden", "material", "#forge:rods/wooden", "", ""],
            durabilityMultiplier: 1.8,
            damageMultiplier: 1.5,
            speedMultiplier: -0.4,
            reachMultiplier: 0.3,
            textureGenType: "long"
        },
        {
            name: "spear",
            recipe: ["", "", "material", "", "#forge:rods/wooden", "", "#forge:rods/wooden", "", ""],
            durabilityMultiplier: 1,
            damageMultiplier: 0.9,
            speedMultiplier: -0.15,
            reachMultiplier: 0.7,
            textureGenType: "spear"
        },
        {
            name: "halberd",
            recipe: ["", "", "material", "", "#forge:rods/wooden", "material", "#forge:rods/wooden", "", ""],
            durabilityMultiplier: 1.2,
            damageMultiplier: 1.1,
            speedMultiplier: -0.3,
            reachMultiplier: 0.5,
            textureGenType: "spear"
        },
        // Planned : Karambit, Scythe, Wolverie's Claws
    ]

    static shieldTypes = [
        {
            name: "buckler",
            recipe: ["", "#minecraft:planks", "", "#minecraft:planks", "material", "#minecraft:planks", "", "#minecraft:planks", ""],
            durabilityMultiplier: 0.9,
            armorMultiplier: 0.3,
            speedMultiplier: 0,
            textureGenType: "buckler_shield"
        },
        {
            name: "heater",
            recipe: ["#minecraft:planks", "material", "#minecraft:planks", "#minecraft:planks", "material", "#minecraft:planks", "", "#minecraft:planks", ""],
            durabilityMultiplier: 1.2,
            armorMultiplier: 0.4,
            speedMultiplier: -0.1,
            textureGenType: "heater_shield"
        },
        {
            name: "tower",
            recipe: ["#minecraft:planks", "material", "#minecraft:planks", "#minecraft:planks", "material", "#minecraft:planks", "#minecraft:planks", "material", "#minecraft:planks"],
            durabilityMultiplier: 1.5,
            armorMultiplier: 0.5,
            speedMultiplier: -0.2,
            textureGenType: "tower_shield"
        },
    ]

    static bowTypes = [
        // {
        //     name: "shortbow",
        //     recipe: ["material", "#forge:rods/wooden", "", "material", "", "#forge:rods/wooden", "", "material", ""],
        //     durabilityMultiplier: 1,
        //     damageMultiplier: 0.8,
        //     speedMultiplier: 0.2,
        //     textureGenType: "normal"
        // },
        {
            name: "bow",
            recipe: ["", "material", "#c:string", "material", "", "#c:string", "", "material", "#c:string"],
            durabilityMultiplier: 1,
            damageMultiplier: 1,
            speedMultiplier: 0,
            textureGenType: "normal"
        },
        // {
        //     name: "longbow",
        //     recipe: ["material", "#forge:rods/wooden", "", "material", "#forge:rods/wooden", "", "material", "#forge:rods/wooden", ""],
        //     durabilityMultiplier: 1.2,
        //     damageMultiplier: 1.1,
        //     speedMultiplier: -0.1,
        //     textureGenType: "long"
        // }
    ]

    static crossbowTypes = [
        {
            name: "crossbow",
            recipe: ["material", "material", "material", "#c:string", "minecraft:tripwire_hook", "#c:string", "", "#forge:rods/wooden", ""],
            durabilityMultiplier: 1.5,
            damageMultiplier: 1.2,
            speedMultiplier: 0,
            textureGenType: "normal"
        },
        // {name: "arbalest", recipe: ["material","material","material","material","#forge:rods/wooden","material","material","material",""], durabilityMultiplier: 1.8, damageMultiplier: 1.5, speedMultiplier: -0.4, textureGenType: "long"},
    ]

    static toolTypes = [
        {
            name: "sword",
            recipe: ["", "material", "", "", "#forge:rods/wooden", "", "", "#forge:rods/wooden", ""],
            durabilityMultiplier: 1,
            damageMultiplier: 1,
            speedMultiplier: 0,
            textureGenType: "normal"
        },
        {
            name: "pickaxe",
            recipe: ["material", "material", "material", "", "#forge:rods/wooden", "", "", "#forge:rods/wooden", ""],
            durabilityMultiplier: 1,
            damageMultiplier: 1,
            speedMultiplier: 0,
            textureGenType: "normal"
        },
        {
            name: "axe",
            recipe: ["material", "material", "", "material", "#forge:rods/wooden", "", "", "#forge:rods/wooden", ""],
            durabilityMultiplier: 1,
            damageMultiplier: 1,
            speedMultiplier: 0,
            textureGenType: "normal"
        },
        {
            name: "shovel",
            recipe: ["", "material", "", "", "#forge:rods/wooden", "", "", "#forge:rods/wooden", ""],
            durabilityMultiplier: 1,
            damageMultiplier: 1,
            speedMultiplier: 0,
            textureGenType: "normal"
        },
        {
            name: "hoe",
            recipe: ["material", "material", "", "", "#forge:rods/wooden", "", "", "#forge:rods/wooden", ""],
            durabilityMultiplier: 1,
            damageMultiplier: 1,
            speedMultiplier: 0,
            textureGenType: "normal"
        },
        // Good for future reference
        // {
        //     name: "hammer",
        //     recipe: ["material", "material", "material", "material", "#forge:rods/wooden", "material", "", "#forge:rods/wooden", ""],
        //     durabilityMultiplier: 1.5,
        //     damageMultiplier: 1.2,
        //     speedMultiplier: -0.2,
        //     textureGenType: "long"
        // },
        // {
        //     name: "excavator",
        //     recipe: ["", "material", "material", "", "#forge:rods/wooden", "material", "material", "#forge:rods/wooden", ""],
        //     durabilityMultiplier: 1.5,
        //     damageMultiplier: 1.2,
        //     speedMultiplier: -0.2,
        //     textureGenType: "long"
        // },
        // {
        //     name: "saw",
        //     recipe: ["", "material", "material", "", "material", "", "#forge:rods/wooden", "", ""],
        //     durabilityMultiplier: 1.2,
        //     damageMultiplier: 1.1,
        //     speedMultiplier: -0.1,
        //     textureGenType: "normal"
        // }
    ]

    static armorTypes = [
        {
            name: "helmet",
            recipe: ["material", "material", "material", "material", "", "material", "", "", ""],
            durabilityMultiplier: 1,
            armorMultiplier: 0.2,
            speedMultiplier: 0,
            textureGenType: "normal"
        },
        {
            name: "chestplate",
            recipe: ["material", "", "material", "material", "material", "material", "material", "material", "material"],
            durabilityMultiplier: 1,
            armorMultiplier: 0.4,
            speedMultiplier: 0,
            textureGenType: "normal"
        },
        {
            name: "leggings",
            recipe: ["material", "material", "material", "material", "", "material", "material", "", "material"],
            durabilityMultiplier: 1,
            armorMultiplier: 0.3,
            speedMultiplier: 0,
            textureGenType: "normal"
        },
        {
            name: "boots",
            recipe: ["", "", "", "material", "", "material", "material", "", "material"],
            durabilityMultiplier: 1,
            armorMultiplier: 0.1,
            speedMultiplier: 0,
            textureGenType: "normal"
        },
        // Good for future reference
        // {
        //     name: "gloves",
        //     recipe: ["", "material", "", "", "material", "", "", "", ""],
        //     durabilityMultiplier: 1,
        //     armorMultiplier: 0.05,
        //     speedMultiplier: 0,
        //     textureGenType: "normal"
        // }
    ]


    static mergedTypes = [...ArmoryTypes.weaponTypes, ...ArmoryTypes.shieldTypes, ...ArmoryTypes.bowTypes, ...ArmoryTypes.crossbowTypes, ...ArmoryTypes.toolTypes, ...ArmoryTypes.armorTypes];
    static mergedArcheryTypes = [...ArmoryTypes.bowTypes, ...ArmoryTypes.crossbowTypes];
}
