import {Material} from "./lib/material/material";
import {Armory} from "./lib/material/armory";
import {ExpansionPack} from "./lib/expansionPack";
import {
    item_aether,
    item_aquaculture,
    item_betternether,
    item_blue_skies,
    item_call_of_yucutan,
    item_callfromthedepth_,
    item_ender_dragon_loot_,
    item_enderitemod,
    item_enlightened_end,
    item_minecraft,
    item_phantasm, item_theabyss,
    item_undergarden
} from "../typedefs/item_typedefs";
import {operation} from "./lib/cia/util";

const materials = [
    {item: item_minecraft.i_flint, tier: 1, type: "crafting", name: "flint", base_damage: 4, durability: 100, armor: 0.5, pmmoLevel: 3, materialColor: "#232323", skip: ["armor"]},
    {item: item_minecraft.i_iron_ingot, tier: 2, type: "crafting", "name": "iron", base_damage: 7, durability: 250, armor: 1, pmmoLevel: 9, materialColor: "#C0C0C0", skip: ["armor", "tools"]},
    {item: item_minecraft.i_gold_ingot, tier: 1, type: "crafting", name: "gold", base_damage: 6, durability: 50, armor: 1.5, pmmoLevel: 12, materialColor: "#FFD700", skip: ["armor", "tools"]},
    {item: item_minecraft.i_diamond, tier: 3, type: "crafting", name: "diamond", base_damage: 8, durability: 500, armor: 2, pmmoLevel: 18, materialColor: "#00FFFF", skip: ["armor", "tools"]},
    {item: item_aquaculture.i_neptunium_ingot, tier: 3, type: "crafting", name: "neptunium", base_damage: 8.5, durability: 1000, armor: 2, pmmoLevel: 19, materialColor: "#2cb28e", skip: ["bow"]},

    // Blue skies
    {item: item_blue_skies.i_pyrope_gem, tier: 4, type: "crafting", name: "pyrope", base_damage: 8, durability: 1600, armor: 2.5, pmmoLevel: 21, materialColor: "#e61542", skip: ["armor", "tools"]},
    {item: item_blue_skies.i_aquite, tier: 4, type: "crafting", name: "aquite", base_damage: 8.5, durability: 1700, armor: 2.75, pmmoLevel: 23, materialColor: "#5aeaea", skip: ["armor", "tools"]},
    {item: item_blue_skies.i_diopside_gem, tier: 5, type: "crafting", name: "diopside", base_damage: 8.7, durability: 1800, armor: 3, pmmoLevel: 25, materialColor: "#35bf35", skip: ["armor", "tools"]},
    {item: item_blue_skies.i_charoite, tier: 5, type: "crafting", name: "charoite", base_damage: 9, durability: 1900, armor: 3.5, pmmoLevel: 29, materialColor: "#bf35af", skip: ["armor", "tools"]},
    {item: item_blue_skies.i_horizonite_ingot, tier: 6, type: "crafting", name: "horizonite", base_damage: 10.5, durability: 2000, armor: 4.5, pmmoLevel: 32, materialColor: "#FFA500", skip: ["armor", "tools"]},

    // Aether
    {item: item_aether.i_zanite_gemstone, tier: 6, type: "crafting", name: "zanite", base_damage: 11, durability: 2211, armor: 5, pmmoLevel: 35, materialColor: "#75108a", skip: ["armor", "tools"]},
    {item: item_aether.i_enchanted_gravitite, tier: 7, type: "crafting", name: "enchanted_gravitite", base_damage: 12, durability: 2431, armor: 6, pmmoLevel: 39, materialColor: "#8a1053", skip: ["armor", "tools"]},

    // Nether
    {item: item_betternether.i_cincinnasite_ingot, tier: 7, type: "crafting", name: "cincinnasite", base_damage: 17, durability: 2700, armor: 11, pmmoLevel: 52, materialColor: "#c28721", skip: ["armor", "tools"]},
    {item: item_minecraft.i_diamond, tier: 8, type: "smithing", name: "cincinnasite_diamond", smithing: item_betternether.i_cincinnasite_diamond_upgrade_smithing_template, "base": "cincinnasite", base_damage: 18, durability: 2800, armor: 12, pmmoLevel: 54, materialColor: "#764e1e", skip: ["armor", "tools"]},
    {item: item_betternether.i_nether_ruby, tier: 9, type: "crafting", name: "nether_ruby", base_damage: 21, durability: 2950, armor: 15, pmmoLevel: 56, materialColor: "#FF0000", skip: ["armor", "tools"]},
    {item: item_minecraft.i_sculk_catalyst, tier: 9, type: "smithing", name: "flaming_ruby", smithing: item_betternether.i_flaming_ruby_upgrade_smithing_template, "base": "nether_ruby", base_damage: 25, durability: 3025, armor: 19, pmmoLevel: 57, materialColor: "#e50e6a", skip: ["armor", "tools"]},
    {item: item_minecraft.i_netherite_ingot, tier: 10, type: "smithing", name: "netherite", smithing: item_minecraft.i_netherite_upgrade_smithing_template, base: "diamond", base_damage: 31, durability: 3100, armor: 15, pmmoLevel: 58, materialColor: "#282224", skip: ["armor", "tools"]},

    // Undergarden
    {item: item_undergarden.i_cloggrum_ingot, tier: 10, type: "crafting", name: "cloggrum", base_damage: 61, durability: 3300, armor: 55, pmmoLevel: 61, materialColor: "#b1a17b", skip: ["armor", "tools"]},
    {item: item_undergarden.i_froststeel_ingot, tier: 11, type: "crafting", name: "froststeel", base_damage: 71, durability: 3500, armor: 65, pmmoLevel: 63, materialColor: "#3786aa", skip: ["armor", "tools"]},
    {item: item_undergarden.i_utherium_crystal, tier: 11, type: "crafting", name: "utherium", base_damage: 81, durability: 3700, armor: 75, pmmoLevel: 65, materialColor: "#831414", skip: ["armor", "tools"]},
    {item: item_undergarden.i_forgotten_ingot, tier: 12, type: "smithing", name: "forgotten", smithing: item_undergarden.i_forgotten_upgrade_smithing_template, "base": "utherium", base_damage: 91, durability: 4100, armor: 85, pmmoLevel: 67, materialColor: "#29ae63", skip: ["armor", "tools"]},
    {item: item_call_of_yucutan.i_jade, tier: 11, type: "crafting", name: "jade", base_damage: 86, durability: 4000, armor: 80, pmmoLevel: 69, materialColor: "#2f7d5c", skip: ["armor", "tools"]},

    // End
    {item: item_phantasm.i_crystal_block, tier: 12, type: "crafting", name: "crystalline", base_damage: 108, durability: 4600, armor: 100, pmmoLevel: 73, materialColor: "#50437a"},
    {item: item_ender_dragon_loot_.i_dragon_scale, tier: 13, type: "smithing", name: "dragon", smithing: item_ender_dragon_loot_.i_dragon_upgrade_template, "base": "netherite", base_damage: 133, durability: 4800, armor: 127, pmmoLevel: 75, materialColor: "#343434", skip: ["armor", "tools"]},
    {item: item_enlightened_end.i_adamantite_ingot, tier: 13, type: "smithing", name: "adamantite", smithing: item_enlightened_end.i_adamantite_smithing_template, "base": "diamond", base_damage: 163, durability: 5200, armor: 157, pmmoLevel: 77, materialColor: "#4a7dfd", skip: ["armor", "tools"]},
    {item: item_enderitemod.i_enderite_ingot, tier: 14, type: "smithing", name: "enderite", smithing: item_enderitemod.i_enderite_upgrade_smithing_template, "base": "netherite", base_damage: 192, durability: 5500, armor: 186, pmmoLevel: 79, materialColor: "#1b564d", skip: ["armor", "tools"]},

    // Call from the depth
    {item: item_callfromthedepth_.i_immemorialingot, tier: 14, type: "crafting", name: "immemorial", base_damage: 206, durability: 5700, armor: 200, pmmoLevel: 84, materialColor: "#629592", skip: ["armor", "tools"]},
    {item: item_callfromthedepth_.i_soulingot, tier: 15, type: "smithing", name: "soul", smithing: item_callfromthedepth_.i_immemorialupgradesmithingtemplate, "base": "depth", base_damage: 226, durability: 6000, armor: 220, pmmoLevel: 88, materialColor: "#5474b4", skip: ["armor", "tools", "bow"]},

    // Abyss
    {item: item_theabyss.i_fixed_bone, tier: 15, type: "crafting", name: "fixed_bone", base_damage: 245, durability: 6100, armor: 239, pmmoLevel: 90, materialColor: "#c6c6c6", skip: ["armor", "tools"]},
    {item: item_theabyss.i_fusion_ingot, tier: 15, type: "crafting", name: "fusion", base_damage: 229, durability: 6250, armor: 223, pmmoLevel: 91, materialColor: "#39ebc7", skip: ["armor", "tools"]},
    {item: item_theabyss.i_aberythe_gem, tier: 15, type: "crafting", name: "aberythe", base_damage: 238, durability: 6500, armor: 232, pmmoLevel: 92, materialColor: "#451e63", skip: ["armor", "tools"]},
    {item: item_theabyss.i_ignisithe_gem, tier: 16, type: "crafting", name: "ignisithe", base_damage: 268, durability: 6750, armor: 262, pmmoLevel: 93, materialColor: "#33c0a4", skip: ["armor", "tools"]},
    {item: item_theabyss.i_fixed_bone, tier: 16, type: "crafting", name: "knight", base_damage: 278, durability: 6875, armor: 272, pmmoLevel: 94, materialColor: "#969190", skip: ["armor", "tools"]},
    {item: item_theabyss.i_glacerythe_gem, tier: 16, type: "crafting", name: "glacerythe", base_damage: 291, durability: 7000, armor: 285, pmmoLevel: 94, materialColor: "#2b9d86", skip: ["armor", "tools"]},
    {item: item_theabyss.i_garnite_ingot, tier: 16, type: "crafting", name: "garnite", base_damage: 308, durability: 7250, armor: 302, pmmoLevel: 95, materialColor: "#268251", skip: ["armor", "tools"]},
    {item: item_theabyss.i_phantom_ingot, tier: 17, type: "crafting", name: "phantom", base_damage: 330, durability: 7500, armor: 324, pmmoLevel: 96, materialColor: "#0f5226", skip: ["armor", "tools"]},
    {item: item_theabyss.i_unorithe_ingot, tier: 17, type: "crafting", name: "unorithe", base_damage: 361, durability: 7750, armor: 355, pmmoLevel: 97, materialColor: "#092a23", skip: ["armor", "tools"]},
    {item: item_theabyss.i_incorythe_gem, tier: 17, type: "crafting", name: "incorythe", base_damage: 406, durability: 8000, armor: 400, pmmoLevel: 98, materialColor: "#72d5ca", skip: ["armor", "tools"]},

    // Meme
    // {item: item_minecraft.i_amethyst_block, type: "crafting", name: "obliterator", base_damage: 9999999, durability: 1, pmmoLevel: 0, materialColor: "#ffffff", only: ["crossbow"], memeOverrides:
    //         [{
    //             attribute: "attributeslib:draw_speed",
    //             operation: operation.MULTIPLY_BASE,
    //             value: -0.9994444444 // Roughly 1 hour to draw
    //         }]},
]

function convertMaterial(name: string, color: string, level: number, pmmoLevel: number, craftingMaterial: string, toolSpeed: number, baseDamage: number, durability: number, armor: number, armorToughness: number, knockbackResistance: number, skip: string[] = [], smithingMaterial: string|undefined = undefined) {
    const material = new Material()
        .withName(name)
        .withColor(color)
        .withLevel(level)
        .withArmory(new Armory()
            // TODO: Add Skips
            .full()
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

const materialsToBuild = materials.map(material => {
    if (material.skip && material.skip.includes("sword")) {
        return
    }
    return convertMaterial(material.name, material.materialColor, material.tier, material.pmmoLevel, material.item, material.tier * 4, material.base_damage, material.durability, material.armor, 0, 0, material.skip)
}).filter(material => material !== undefined);

const expansionPack = new ExpansionPack()
.withNamespace("zoomers_armory")
.withName("Zoomers Armory")
.withMaterials(materialsToBuild)

async function build() {
    await expansionPack.build()
    expansionPack.validate();
    await expansionPack.writeSelf();
}

build()
