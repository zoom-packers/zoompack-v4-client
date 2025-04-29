import {
    item_aether,
    item_aquaculture,
    item_betternether,
    item_blue_skies,
    item_call_of_yucutan,
    item_callfromthedepth_,
    item_ender_dragon_loot_,
    item_enderitemod,
    item_minecraft,
    item_phantasm, item_theabyss,
    item_undergarden
} from "../../../typedefs/item_typedefs";
import {Material} from "../../lib/material/material";
import {Armory} from "../../lib/material/armory";
import {rogueCustomArmory, samuraiCustomArmory, tankCustomArmory} from "../../samuraiArmory";
import {
    tier_levels_aether_start,
    tier_levels_blue_skies_start, tier_levels_call_from_the_depths_start, tier_levels_end_start,
    tier_levels_nether_start, tier_levels_the_abyss_start,
    tier_levels_undergarden_start
} from "./ores";
import {magicArmorSets} from "../../magic_armors";
import {archerCustomArmory, rangerCustomArmory} from "../../archerArmory";

const materials = [
    {
        name: "copper",
        tier: 1,
        item: item_minecraft.i_copper_ingot,
        type: "crafting",
        base_damage: 6,
        durability: 180,
        armor: 11,
        armorToughness: 0,
        knockbackResistance: 0,
        pmmoLevel: 6,
        materialColor: "#a45726",
        skip: ["armor", "tools"]
    },
    {
        name: "iron",
        tier: 2,
        item: item_minecraft.i_iron_ingot,
        type: "crafting",
        base_damage: 5,
        durability: 250,
        armor: 15,
        armorToughness: 0,
        knockbackResistance: 0,
        pmmoLevel: 9,
        materialColor: "#e9e9e9",
        skip: ["armor", "tools"]
    },
    {
        name: "gold",
        tier: 1,
        item: item_minecraft.i_gold_ingot,
        type: "crafting",
        base_damage: 4,
        durability: 50,
        armor: 11,
        armorToughness: 0,
        knockbackResistance: 0,
        pmmoLevel: 12,
        materialColor: "#ffdd2a",
        brightnessBoost: 1.2,
        skip: ["armor", "tools"]
    },
    {
        name: "diamond",
        tier: 3,
        item: item_minecraft.i_diamond,
        type: "crafting",
        base_damage: 5,
        durability: 500,
        armor: 20,
        armorToughness: 2,
        knockbackResistance: 0,
        pmmoLevel: 18,
        materialColor: "#00FFFF",
        skip: ["armor", "tools"]
    },
    {
        name: "neptunium",
        tier: 3,
        item: item_aquaculture.i_neptunium_ingot,
        type: "crafting",
        base_damage: 8.5,
        durability: 1000,
        armor: 22,
        armorToughness: 3,
        knockbackResistance: 0.01,
        pmmoLevel: 19,
        materialColor: "#57eab2",
        skip: ["bow"]
    },

    // Blue skies
    {
        name: "pyrope",
        tier: tier_levels_blue_skies_start + 2,
        item: item_blue_skies.i_pyrope_gem,
        type: "crafting",
        base_damage: 4,
        durability: 1600,
        armor: 22,
        armorToughness: 2,
        knockbackResistance: 0.02,
        pmmoLevel: 21,
        materialColor: "#e61542",
        skip: ["armor", "tools"]
    },
    {
        name: "aquite",
        tier: tier_levels_blue_skies_start + 2,
        item: item_blue_skies.i_aquite,
        type: "smithing",
        smithing: "zoomers_armory:everbright_smithing_template",
        base: "pyrope",
        base_damage: 5.5,
        durability: 1700,
        armor: 24,
        armorToughness: 2,
        knockbackResistance: 0.02,
        pmmoLevel: 23,
        materialColor: "#61cbf2",
        skip: ["armor", "tools"]
    },
    {
        name: "diopside",
        tier: tier_levels_blue_skies_start + 2,
        item: item_blue_skies.i_diopside_gem,
        type: "smithing",
        smithing: "zoomers_armory:everbright_smithing_template",
        base: "aquite",
        base_damage: 6.25,
        durability: 1800,
        armor: 24,
        armorToughness: 2.5,
        knockbackResistance: 0.022,
        pmmoLevel: 25,
        materialColor: "#35bf35",
        skip: ["armor", "tools"]
    },
    {
        name: "charoite",
        tier: tier_levels_blue_skies_start + 3,
        item: item_blue_skies.i_charoite,
        type: "smithing",
        smithing: "zoomers_armory:everbright_smithing_template",
        base: "diopside",
        base_damage: 6.5,
        durability: 1900,
        armor: 25,
        armorToughness: 2.5,
        knockbackResistance: 0.023,
        pmmoLevel: 29,
        materialColor: "#9e74c6",
        skip: ["armor", "tools"]
    },
    {
        name: "horizonite",
        tier: tier_levels_blue_skies_start + 3,
        item: item_blue_skies.i_horizonite_ingot,
        type: "smithing",
        smithing: "zoomers_armory:everbright_smithing_template",
        base: "charoite",
        base_damage: 6,
        durability: 2000,
        armor: 26,
        armorToughness: 2.5,
        knockbackResistance: 0.025,
        pmmoLevel: 32,
        materialColor: "#fc6d28",
        skip: ["armor", "tools"]
    },

    // Aether
    {
        name: "zanite",
        tier: tier_levels_aether_start + 2,
        item: item_aether.i_zanite_gemstone,
        type: "crafting",
        base_damage: 6.1,
        durability: 2211,
        armor: 28,
        armorToughness: 2.5,
        knockbackResistance: 0.025,
        pmmoLevel: 35,
        materialColor: "#7539cc",
        skip: ["armor", "tools"]
    },
    {
        name: "enchanted_gravitite",
        tier: tier_levels_aether_start + 2,
        item: item_aether.i_enchanted_gravitite,
        type: "smithing",
        smithing: "zoomers_armory:aether_smithing_template",
        base: "zanite",
        base_damage: 6.4,
        durability: 2431,
        armor: 36,
        armorToughness: 3,
        knockbackResistance: 0.027,
        pmmoLevel: 39,
        materialColor: "#be40b4",
        skip: ["armor", "tools"]
    },

    // Nether
    {
        name: "cincinnasite",
        tier: tier_levels_nether_start,
        item: item_betternether.i_cincinnasite_ingot,
        type: "crafting",
        base_damage: 5,
        durability: 2700,
        armor: 45,
        armorToughness: 5,
        knockbackResistance: 0.036,
        pmmoLevel: 52,
        materialColor: "#fcb945",
        skip: ["armor", "tools"]
    },
    {
        name: "cincinnasite_diamond",
        tier: tier_levels_nether_start,
        item: item_minecraft.i_diamond,
        type: "smithing",
        smithing: item_minecraft.i_netherite_upgrade_smithing_template,
        base: "cincinnasite",
        base_damage: 10,
        durability: 2800,
        armor: 51,
        armorToughness: 6,
        knockbackResistance: 0.045,
        pmmoLevel: 54,
        materialColor: "#965f01",
        skip: ["armor", "tools"]
    },
    {
        name: "nether_ruby",
        tier: tier_levels_nether_start + 1,
        item: item_betternether.i_nether_ruby,
        type: "smithing",
        smithing: item_minecraft.i_netherite_upgrade_smithing_template,
        base: "cincinnasite_diamond",
        base_damage: 10,
        durability: 2950,
        armor: 55,
        armorToughness: 7,
        knockbackResistance: 0.033,
        pmmoLevel: 56,
        materialColor: "#ad1423",
        skip: ["armor", "tools"]
    },
    {
        name: "flaming_ruby",
        tier: tier_levels_nether_start + 1,
        item: item_minecraft.i_sculk_catalyst,
        type: "smithing",
        smithing: item_minecraft.i_netherite_upgrade_smithing_template,
        base: "nether_ruby",
        base_damage: 15,
        durability: 3025,
        armor: 59,
        armorToughness: 7,
        knockbackResistance: 0.038,
        pmmoLevel: 57,
        materialColor: "#cc144b",
        skip: ["armor", "tools"]
    },
    {
        name: "netherite",
        tier: tier_levels_nether_start + 2,
        item: item_minecraft.i_netherite_ingot,
        type: "smithing",
        smithing: item_minecraft.i_netherite_upgrade_smithing_template,
        base: "flaming_ruby",
        base_damage: 15,
        durability: 3100,
        armor: 63,
        armorToughness: 8,
        knockbackResistance: 0.04,
        pmmoLevel: 58,
        materialColor: "#282224",
        skip: ["armor", "tools"]
    },

    // Undergarden
    {
        name: "cloggrum",
        tier: tier_levels_undergarden_start,
        item: item_undergarden.i_cloggrum_ingot,
        type: "crafting",
        base_damage: 5,
        durability: 3300,
        armor: 63,
        armorToughness: 9,
        knockbackResistance: 0.045,
        pmmoLevel: 61,
        materialColor: "#947f67",
        skip: ["armor", "tools"]
    },
    {
        name: "froststeel",
        tier: tier_levels_undergarden_start + 1,
        item: item_undergarden.i_froststeel_ingot,
        type: "smithing",
        smithing: item_undergarden.i_forgotten_upgrade_smithing_template,
        base: "cloggrum",
        base_damage: 10,
        durability: 3500,
        armor: 66,
        armorToughness: 9,
        knockbackResistance: 0.05,
        pmmoLevel: 63,
        materialColor: "#82a3c3",
        skip: ["armor", "tools"]
    },
    {
        name: "utherium",
        tier: tier_levels_undergarden_start + 2,
        item: item_undergarden.i_utherium_crystal,
        type: "smithing",
        smithing: item_undergarden.i_forgotten_upgrade_smithing_template,
        base: "froststeel",
        base_damage: 10,
        durability: 3700,
        armor: 83,
        armorToughness: 10,
        knockbackResistance: 0.055,
        pmmoLevel: 65,
        materialColor: "#c1424b",
        skip: ["armor", "tools"]
    },
    {
        name: "jade",
        tier: tier_levels_undergarden_start + 2,
        item: item_call_of_yucutan.i_jade,
        type: "smithing",
        smithing: item_undergarden.i_forgotten_upgrade_smithing_template,
        base: "utherium",
        base_damage: 12,
        durability: 4000,
        armor: 85,
        armorToughness: 10,
        knockbackResistance: 0.058,
        pmmoLevel: 68,
        materialColor: "#3eab7e",
        skip: ["tools", "armor"]
    },
    {
        name: "forgotten",
        tier: tier_levels_undergarden_start + 3,
        item: item_undergarden.i_forgotten_ingot,
        type: "smithing",
        smithing: item_undergarden.i_forgotten_upgrade_smithing_template,
        base: "jade",
        base_damage: 15,
        durability: 4100,
        armor: 95,
        armorToughness: 10,
        knockbackResistance: 0.055,
        pmmoLevel: 67,
        materialColor: "#56e0b1",
        skip: ["armor", "tools"]
    },

    // End
    {
        name: "crystalline",
        tier: tier_levels_end_start,
        item: item_phantasm.i_crystal_block,
        type: "crafting",
        base_damage: 1,
        durability: 4600,
        armor: 105,
        armorToughness: 10,
        knockbackResistance: 0.06,
        pmmoLevel: 73,
        materialColor: "#ecd0ee",
        skip: ["tools"]
    },
    {
        name: "dragon",
        tier: tier_levels_end_start + 1,
        item: item_ender_dragon_loot_.i_dragon_scale,
        type: "smithing",
        smithing: item_enderitemod.i_enderite_upgrade_smithing_template,
        base: "crystalline",
        base_damage: 2,
        durability: 4800,
        armor: 120,
        armorToughness: 11,
        knockbackResistance: 0.07,
        pmmoLevel: 75,
        materialColor: "#1a1a1a",
        skip: ["armor", "tools"]
    },
    {
        name: "enderite",
        tier: tier_levels_end_start + 1,
        item: item_enderitemod.i_enderite_ingot,
        type: "smithing",
        smithing: item_enderitemod.i_enderite_upgrade_smithing_template,
        base: "dragon",
        base_damage: 1,
        durability: 5500,
        armor: 212,
        armorToughness: 12,
        knockbackResistance: 0.09,
        pmmoLevel: 79,
        materialColor: "#1b564d",
        skip: ["armor", "tools"]
    },

    // Call from the depth
    {
        name: "immemorial",
        tier: tier_levels_call_from_the_depths_start,
        item: item_callfromthedepth_.i_immemorialingot,
        type: "crafting",
        base_damage: 1,
        durability: 5700,
        armor: 200,
        armorToughness: 13,
        knockbackResistance: 0.1,
        pmmoLevel: 84,
        materialColor: "#629592",
        skip: ["tools", "armor"]
    },
    {
        name: "soul",
        tier: tier_levels_call_from_the_depths_start + 1,
        item: item_callfromthedepth_.i_soulingot,
        type: "smithing",
        smithing: item_callfromthedepth_.i_immemorialupgradesmithingtemplate,
        base: "immemorial",
        base_damage: 1,
        durability: 6000,
        armor: 260,
        armorToughness: 13,
        knockbackResistance: 0.11,
        pmmoLevel: 88,
        materialColor: "#2ea4ad",
        skip: ["bow", "tools", "armor"]
    },

    // Abyss
    {
        name: "fixed_bone",
        tier: tier_levels_the_abyss_start,
        item: item_theabyss.i_fixed_bone,
        type: "crafting",
        base_damage: -15,
        durability: 6100,
        armor: 299,
        armorToughness: 13.5,
        knockbackResistance: 0.12,
        pmmoLevel: 90,
        materialColor: "#c6c6c6",
        skip: ["armor", "tools"]
    },
    {
        name: "fusion",
        tier: tier_levels_the_abyss_start,
        item: item_theabyss.i_fusion_ingot,
        type: "crafting",
        base_damage: 20,
        durability: 6250,
        armor: 223,
        armorToughness: 14,
        knockbackResistance: 0.11,
        pmmoLevel: 91,
        materialColor: "#29383e",
        skip: ["armor", "tools"]
    },
    {
        name: "aberythe",
        tier: tier_levels_the_abyss_start + 1,
        item: item_theabyss.i_aberythe_gem,
        type: "smithing",
        smithing: "zoomers_armory:abyssal_smithing_template",
        base: "fusion",
        base_damage: 20,
        durability: 6500,
        armor: 341,
        armorToughness: 15,
        knockbackResistance: 0.115,
        pmmoLevel: 92,
        materialColor: "#8930c6",
        skip: ["armor", "tools"]
    },
    {
        name: "ignisithe",
        tier: tier_levels_the_abyss_start + 2,
        item: item_theabyss.i_ignisithe_gem,
        type: "smithing",
        smithing: "zoomers_armory:abyssal_smithing_template",
        base: "aberythe",
        base_damage: 20,
        durability: 6750,
        armor: 420,
        armorToughness: 14,
        knockbackResistance: 0.125,
        pmmoLevel: 93,
        materialColor: "#4df7d5",
        skip: ["armor", "tools"]
    },
    {
        name: "knight",
        tier: tier_levels_the_abyss_start + 2,
        item: item_theabyss.i_fixed_bone,
        type: "smithing",
        smithing: "zoomers_armory:abyssal_smithing_template",
        base: "ignisithe",
        base_damage: 40,
        durability: 6875,
        armor: 376,
        armorToughness: 14.5,
        knockbackResistance: 0.13,
        pmmoLevel: 94,
        materialColor: "#80f7dd",
        skip: ["armor", "tools"]
    },
    {
        name: "glacerythe",
        tier: tier_levels_the_abyss_start + 3,
        item: item_theabyss.i_glacerythe_gem,
        type: "smithing",
        smithing: "zoomers_armory:abyssal_smithing_template",
        base: "knight",
        base_damage: 15,
        durability: 7000,
        armor: 459,
        armorToughness: 14.5,
        knockbackResistance: 0.135,
        pmmoLevel: 94,
        materialColor: "#366973",
        skip: ["armor", "tools"]
    },
    {
        name: "garnite",
        tier: tier_levels_the_abyss_start + 4,
        item: item_theabyss.i_garnite_ingot,
        type: "smithing",
        smithing: "zoomers_armory:abyssal_smithing_template",
        base: "glacerythe",
        base_damage: 30,
        durability: 7250,
        armor: 502,
        armorToughness: 15,
        knockbackResistance: 0.135,
        pmmoLevel: 95,
        materialColor: "#54c890",
        skip: ["armor", "tools"]
    },
    {
        name: "phantom",
        tier: tier_levels_the_abyss_start + 3,
        item: item_theabyss.i_phantom_ingot,
        type: "smithing",
        smithing: "zoomers_armory:abyssal_smithing_template",
        base: "garnite",
        base_damage: 38,
        durability: 7500,
        armor: 543,
        armorToughness: 16,
        knockbackResistance: 0.14,
        pmmoLevel: 96,
        materialColor: "#289b6e",
        skip: ["armor", "tools"]
    },
    {
        name: "unorithe",
        tier: tier_levels_the_abyss_start + 4,
        item: item_theabyss.i_unorithe_ingot,
        type: "smithing",
        smithing: "zoomers_armory:abyssal_smithing_template",
        base: "phantom",
        base_damage: 40,
        durability: 7750,
        armor: 586,
        armorToughness: 17,
        knockbackResistance: 0.145,
        pmmoLevel: 97,
        materialColor: "#00eeca",
        skip: ["armor", "tools"]
    },
    {
        name: "incorythe",
        tier: tier_levels_the_abyss_start + 2,
        item: item_theabyss.i_incorythe_gem,
        type: "smithing",
        smithing: "zoomers_armory:abyssal_smithing_template",
        base: "unorithe",
        base_damage: 24,
        durability: 8000,
        armor: 645,
        armorToughness: 18,
        knockbackResistance: 0.15,
        pmmoLevel: 98,
        materialColor: "#559e9b",
        skip: ["armor", "tools"]
    },
]


function convertMaterial(name: string, color: string, brightnessBoost: number, level: number, pmmoLevel: number, craftingMaterial: string,
                         toolSpeed: number, baseDamage: number, durability: number, armor: number,
                         armorToughness: number, knockbackResistance: number,
                         skip: string[] = [], smithingMaterial: string|undefined = undefined, smithingTemplateId: string|undefined = undefined) {
    const material = new Material()
        .withName(name)
        .withColor(color)
        .withBrightnessBoost(brightnessBoost)
        .withLevel(level)
        .withArmory(new Armory()
            .full()
            .withCustomArmoryEntry(samuraiCustomArmory)
            .withCustomArmoryEntry(rogueCustomArmory)
            .withCustomArmoryEntry(tankCustomArmory)
            .withCustomArmoryEntry(archerCustomArmory)
            .withCustomArmoryEntry(rangerCustomArmory)
            .withCustomArmoryEntries(magicArmorSets)
            .withCraftingMaterial(craftingMaterial)
            .withBaseArmor(armor)
            .withArmorToughness(armorToughness)
            .withKnockbackResistance(knockbackResistance)
            .withBaseDamage(baseDamage)
            .withDurability(durability)
            .withPmmoLevel(pmmoLevel)
            .withToolSpeed(toolSpeed))

    if (skip) {
        if (skip.includes("armor")) {
            skip.push("helmet", "chestplate", "leggings", "boots");
        }
        if (skip.includes("tools")) {
            skip.push("pickaxe", "axe", "shovel", "hoe");
        }
        const armory = material.armory as Armory;
        armory.withoutGearTypes(skip);
    }

    if (smithingMaterial && material.armory instanceof Armory) {
        const armory = material.armory as Armory;
        armory.withSmithing(smithingMaterial, smithingTemplateId);
    }
    return material
}

export const armoryMaterials = materials.map(material => {
    if (material.skip && material.skip.includes("sword")) {
        return
    }
    return convertMaterial(material.name, material.materialColor, material.brightnessBoost ?? 0, material.tier, material.pmmoLevel,
        material.item, material.tier * 4, material.base_damage, material.durability, material.armor,
        material.armorToughness, material.knockbackResistance, material.skip,
        material.type === "smithing" ? material.base : undefined, material.type === "smithing" && !!material.smithing ? material.smithing : undefined)
}).filter(material => material !== undefined);
