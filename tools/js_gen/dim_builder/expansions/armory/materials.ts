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
import {samuraiCustomArmory, samuraiLightCustomArmory, samuraiMasterCustomArmory} from "../../samuraiArmory";
import {
    tier_levels_aether_start,
    tier_levels_blue_skies_start, tier_levels_call_from_the_depths_start, tier_levels_end_start,
    tier_levels_nether_start, tier_levels_the_abyss_start,
    tier_levels_undergarden_start
} from "./ores";

const materials = [
    {
        item: item_minecraft.i_flint,
        tier: 1,
        type: "crafting",
        name: "flint",
        base_damage: 4,
        durability: 100,
        armor: 7.5,
        armorToughness: 0,
        knockbackResistance: 0,
        pmmoLevel: 3,
        materialColor: "#232020",
        skip: ["armor"]
    },
    {
        item: item_minecraft.i_iron_ingot,
        tier: 2,
        type: "crafting",
        "name": "iron",
        base_damage: 7,
        durability: 250,
        armor: 15,
        armorToughness: 0,
        knockbackResistance: 0,
        pmmoLevel: 9,
        materialColor: "#e9e9e9",
        skip: ["armor", "tools"]
    },
    {
        item: item_minecraft.i_gold_ingot,
        tier: 1,
        type: "crafting",
        name: "gold",
        base_damage: 6,
        durability: 50,
        armor: 11,
        armorToughness: 0,
        knockbackResistance: 0,
        pmmoLevel: 12,
        materialColor: "#ffdd2a",
        skip: ["armor", "tools"]
    },
    {
        item: item_minecraft.i_diamond,
        tier: 3,
        type: "crafting",
        name: "diamond",
        base_damage: 8,
        durability: 500,
        armor: 20,
        armorToughness: 2,
        knockbackResistance: 0,
        pmmoLevel: 18,
        materialColor: "#00FFFF",
        skip: ["armor", "tools"]
    },
    {
        item: item_aquaculture.i_neptunium_ingot,
        tier: 3,
        type: "crafting",
        name: "neptunium",
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
        item: item_blue_skies.i_pyrope_gem,
        tier: tier_levels_blue_skies_start + 2,
        type: "crafting",
        name: "pyrope",
        base_damage: 8,
        durability: 1600,
        armor: 22,
        armorToughness: 2,
        knockbackResistance: 0.02,
        pmmoLevel: 21,
        materialColor: "#e61542",
        skip: ["armor", "tools"]
    },
    {
        item: item_blue_skies.i_aquite,
        tier: tier_levels_blue_skies_start + 2,
        type: "crafting",
        name: "aquite",
        base_damage: 8.5,
        durability: 1700,
        armor: 24,
        armorToughness: 2,
        knockbackResistance: 0.02,
        pmmoLevel: 23,
        materialColor: "#61cbf2",
        skip: ["armor", "tools"]
    },
    {
        item: item_blue_skies.i_diopside_gem,
        tier: tier_levels_blue_skies_start + 2,
        type: "crafting",
        name: "diopside",
        base_damage: 8.7,
        durability: 1800,
        armor: 24,
        armorToughness: 2.5,
        knockbackResistance: 0.022,
        pmmoLevel: 25,
        materialColor: "#35bf35",
        skip: ["armor", "tools"]
    },
    {
        item: item_blue_skies.i_charoite,
        tier: tier_levels_blue_skies_start + 3,
        type: "crafting",
        name: "charoite",
        base_damage: 9,
        durability: 1900,
        armor: 25,
        armorToughness: 2.5,
        knockbackResistance: 0.023,
        pmmoLevel: 29,
        materialColor: "#9e74c6",
        skip: ["armor", "tools"]
    },
    {
        item: item_blue_skies.i_horizonite_ingot,
        tier: tier_levels_blue_skies_start + 3,
        type: "crafting",
        name: "horizonite",
        base_damage: 10.5,
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
        item: item_aether.i_zanite_gemstone,
        tier: tier_levels_aether_start + 2,
        type: "crafting",
        name: "zanite",
        base_damage: 11,
        durability: 2211,
        armor: 28,
        armorToughness: 2.5,
        knockbackResistance: 0.025,
        pmmoLevel: 35,
        materialColor: "#7539cc",
        skip: ["armor", "tools"]
    },
    {
        item: item_aether.i_enchanted_gravitite,
        tier: tier_levels_aether_start + 2,
        type: "crafting",
        name: "enchanted_gravitite",
        base_damage: 12,
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
        item: item_betternether.i_cincinnasite_ingot,
        tier: tier_levels_nether_start,
        type: "crafting",
        name: "cincinnasite",
        base_damage: 17,
        durability: 2700,
        armor: 45,
        armorToughness: 5,
        knockbackResistance: 0.036,
        pmmoLevel: 52,
        materialColor: "#fcb945",
        skip: ["armor", "tools"]
    },
    {
        item: item_minecraft.i_diamond,
        tier: tier_levels_nether_start,
        type: "smithing",
        name: "cincinnasite_diamond",
        smithing: item_betternether.i_cincinnasite_diamond_upgrade_smithing_template,
        base: "cincinnasite",
        base_damage: 18,
        durability: 2800,
        armor: 51,
        armorToughness: 6,
        knockbackResistance: 0.045,
        pmmoLevel: 54,
        materialColor: "#965f01",
        skip: ["armor", "tools"]
    },
    {
        item: item_betternether.i_nether_ruby,
        tier: tier_levels_nether_start + 1,
        type: "crafting",
        name: "nether_ruby",
        base_damage: 21,
        durability: 2950,
        armor: 55,
        armorToughness: 7,
        knockbackResistance: 0.033,
        pmmoLevel: 56,
        materialColor: "#cc1425",
        skip: ["armor", "tools"]
    },
    {
        item: item_minecraft.i_sculk_catalyst,
        tier: tier_levels_nether_start + 1,
        type: "smithing",
        name: "flaming_ruby",
        smithing: item_betternether.i_flaming_ruby_upgrade_smithing_template,
        base: "nether_ruby",
        base_damage: 25,
        durability: 3025,
        armor: 59,
        armorToughness: 7,
        knockbackResistance: 0.038,
        pmmoLevel: 57,
        materialColor: "#cc144b",
        skip: ["armor", "tools"]
    },
    {
        item: item_minecraft.i_netherite_ingot,
        tier: tier_levels_nether_start + 2,
        type: "smithing",
        name: "netherite",
        smithing: item_minecraft.i_netherite_upgrade_smithing_template,
        base: "diamond",
        base_damage: 31,
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
        item: item_undergarden.i_cloggrum_ingot,
        tier: tier_levels_undergarden_start,
        type: "crafting",
        name: "cloggrum",
        base_damage: 61,
        durability: 3300,
        armor: 63,
        armorToughness: 9,
        knockbackResistance: 0.045,
        pmmoLevel: 61,
        materialColor: "#947f67",
        skip: ["armor", "tools"]
    },
    {
        item: item_undergarden.i_froststeel_ingot,
        tier: tier_levels_undergarden_start + 1,
        type: "crafting",
        name: "froststeel",
        base_damage: 71,
        durability: 3500,
        armor: 66,
        armorToughness: 9,
        knockbackResistance: 0.05,
        pmmoLevel: 63,
        materialColor: "#82a3c3",
        skip: ["armor", "tools"]
    },
    {
        item: item_undergarden.i_utherium_crystal,
        tier: tier_levels_undergarden_start + 2,
        type: "crafting",
        name: "utherium",
        base_damage: 81,
        durability: 3700,
        armor: 83,
        armorToughness: 10,
        knockbackResistance: 0.055,
        pmmoLevel: 65,
        materialColor: "#c1424b",
        skip: ["armor", "tools"]
    },
    {
        item: item_undergarden.i_forgotten_ingot,
        tier: tier_levels_undergarden_start + 3,
        type: "smithing",
        name: "forgotten",
        smithing: item_undergarden.i_forgotten_upgrade_smithing_template,
        base: "utherium",
        base_damage: 91,
        durability: 4100,
        armor: 95,
        armorToughness: 10,
        knockbackResistance: 0.055,
        pmmoLevel: 67,
        materialColor: "#56e0b1",
        skip: ["armor", "tools"]
    },
    {
        item: item_call_of_yucutan.i_jade,
        tier: tier_levels_undergarden_start + 2,
        type: "crafting",
        name: "jade",
        base_damage: 86,
        durability: 4000,
        armor: 85,
        armorToughness: 10,
        knockbackResistance: 0.058,
        pmmoLevel: 68,
        materialColor: "#3eab7e",
        skip: ["tools", "armor"]
    },

    // End
    {
        item: item_phantasm.i_crystal_block,
        tier: tier_levels_end_start,
        type: "crafting",
        name: "crystalline",
        base_damage: 108,
        durability: 4600,
        armor: 105,
        armorToughness: 10,
        knockbackResistance: 0.06,
        pmmoLevel: 73,
        materialColor: "#ecd0ee",
        skip: ["tools"]
    },
    {
        item: item_ender_dragon_loot_.i_dragon_scale,
        tier: tier_levels_end_start + 1,
        type: "smithing",
        name: "dragon",
        smithing: item_ender_dragon_loot_.i_dragon_upgrade_template,
        base: "netherite",
        base_damage: 133,
        durability: 4800,
        armor: 120,
        armorToughness: 11,
        knockbackResistance: 0.07,
        pmmoLevel: 75,
        materialColor: "#1a1a1a",
        skip: ["armor", "tools"]
    },
    {
        item: item_enderitemod.i_enderite_ingot,
        tier: tier_levels_end_start + 1,
        type: "smithing",
        name: "enderite",
        smithing: item_enderitemod.i_enderite_upgrade_smithing_template,
        base: "netherite",
        base_damage: 192,
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
        item: item_callfromthedepth_.i_immemorialingot,
        tier: tier_levels_call_from_the_depths_start,
        type: "crafting",
        name: "immemorial",
        base_damage: 206,
        durability: 5700,
        armor: 200,
        armorToughness: 13,
        knockbackResistance: 0.1,
        pmmoLevel: 84,
        materialColor: "#629592",
        skip: ["tools", "armor"]
    },
    {
        item: item_callfromthedepth_.i_soulingot,
        tier: tier_levels_call_from_the_depths_start + 1,
        type: "smithing",
        name: "soul",
        smithing: item_callfromthedepth_.i_immemorialupgradesmithingtemplate,
        base: "immemorial",
        base_damage: 226,
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
        item: item_theabyss.i_fixed_bone,
        tier: tier_levels_the_abyss_start,
        type: "crafting",
        name: "fixed_bone",
        base_damage: 245,
        durability: 6100,
        armor: 299,
        armorToughness: 13.5,
        knockbackResistance: 0.12,
        pmmoLevel: 90,
        materialColor: "#c6c6c6",
        skip: ["armor", "tools"]
    },
    {
        item: item_theabyss.i_fusion_ingot,
        tier: tier_levels_the_abyss_start,
        type: "crafting",
        name: "fusion",
        base_damage: 229,
        durability: 6250,
        armor: 223,
        armorToughness: 14,
        knockbackResistance: 0.11,
        pmmoLevel: 91,
        materialColor: "#29383e",
        skip: ["armor", "tools"]
    },
    {
        item: item_theabyss.i_aberythe_gem,
        tier: tier_levels_the_abyss_start + 1,
        type: "crafting",
        name: "aberythe",
        base_damage: 238,
        durability: 6500,
        armor: 341,
        armorToughness: 15,
        knockbackResistance: 0.115,
        pmmoLevel: 92,
        materialColor: "#8930c6",
        skip: ["armor", "tools"]
    },
    {
        item: item_theabyss.i_ignisithe_gem,
        tier: tier_levels_the_abyss_start + 2,
        type: "crafting",
        name: "ignisithe",
        base_damage: 268,
        durability: 6750,
        armor: 420,
        armorToughness: 14,
        knockbackResistance: 0.125,
        pmmoLevel: 93,
        materialColor: "#4df7d5",
        skip: ["armor", "tools"]
    },
    {
        item: item_theabyss.i_fixed_bone,
        tier: 4,
        type: "crafting",
        name: "knight",
        base_damage: 278,
        durability: 6875,
        armor: 376,
        armorToughness: 14.5,
        knockbackResistance: 0.13,
        pmmoLevel: 94,
        materialColor: "#80f7dd",
        skip: ["armor", "tools"]
    },
    {
        item: item_theabyss.i_glacerythe_gem,
        tier: tier_levels_the_abyss_start + 3,
        type: "crafting",
        name: "glacerythe",
        base_damage: 291,
        durability: 7000,
        armor: 459,
        armorToughness: 14.5,
        knockbackResistance: 0.135,
        pmmoLevel: 94,
        materialColor: "#366973",
        skip: ["armor", "tools"]
    },
    {
        item: item_theabyss.i_garnite_ingot,
        tier: tier_levels_the_abyss_start + 4,
        type: "crafting",
        name: "garnite",
        base_damage: 308,
        durability: 7250,
        armor: 502,
        armorToughness: 15,
        knockbackResistance: 0.135,
        pmmoLevel: 95,
        materialColor: "#54c890",
        skip: ["armor", "tools"]
    },
    {
        item: item_theabyss.i_phantom_ingot,
        tier: tier_levels_the_abyss_start + 3,
        type: "crafting",
        name: "phantom",
        base_damage: 330,
        durability: 7500,
        armor: 543,
        armorToughness: 16,
        knockbackResistance: 0.14,
        pmmoLevel: 96,
        materialColor: "#289b6e",
        skip: ["armor", "tools"]
    },
    {
        item: item_theabyss.i_unorithe_ingot,
        tier: tier_levels_the_abyss_start + 4,
        type: "crafting",
        name: "unorithe",
        base_damage: 361,
        durability: 7750,
        armor: 586,
        armorToughness: 17,
        knockbackResistance: 0.145,
        pmmoLevel: 97,
        materialColor: "#00eeca",
        skip: ["armor", "tools"]
    },
    {
        item: item_theabyss.i_incorythe_gem,
        tier: tier_levels_the_abyss_start + 2,
        type: "crafting",
        name: "incorythe",
        base_damage: 406,
        durability: 8000,
        armor: 645,
        armorToughness: 18,
        knockbackResistance: 0.15,
        pmmoLevel: 98,
        materialColor: "#559e9b",
        skip: ["armor", "tools"]
    },
]


function convertMaterial(name: string, color: string, level: number, pmmoLevel: number, craftingMaterial: string,
                         toolSpeed: number, baseDamage: number, durability: number, armor: number,
                         armorToughness: number, knockbackResistance: number,
                         skip: string[] = [], smithingMaterial: string|undefined = undefined) {
    const material = new Material()
        .withName(name)
        .withColor(color)
        .withLevel(level)
        .withArmory(new Armory()
            .full()
            .withCustomArmoryEntry(samuraiLightCustomArmory)
            .withCustomArmoryEntry(samuraiCustomArmory)
            .withCustomArmoryEntry(samuraiMasterCustomArmory)
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
        armory.withSmithing(smithingMaterial)
    }
    return material
}

export const armoryMaterials = materials.map(material => {
    if (material.skip && material.skip.includes("sword")) {
        return
    }
    return convertMaterial(material.name, material.materialColor, material.tier, material.pmmoLevel,
        material.item, material.tier * 4, material.base_damage, material.durability, material.armor,
        material.armorToughness, material.knockbackResistance, material.skip,
        material.type === "smithing" ? material.base : undefined)
}).filter(material => material !== undefined);
