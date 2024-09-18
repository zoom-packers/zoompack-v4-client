import {ExistingOre} from "../../lib/material/existingOre";
import {VARIANTS} from "../../lib/material/oreFeatureConfiguration";
import {Material} from "../../lib/material/material";
import {
    item_aether,
    item_betternether,
    item_blue_skies,
    item_call_of_yucutan,
    item_callfromthedepth_,
    item_enderitemod,
    item_minecraft,
    item_phantasm,
    item_theabyss,
    item_undergarden
} from "../../../typedefs/item_typedefs";
import {PickaxeLevelModification} from "../../lib/pickaxeLevelModification";
import {HarvestLevel} from "../../lib/ht_tweaker/harvestLevel";

export const tier_levels_blue_skies_start = 4;
export const tier_levels_aether_start = 9;
export const tier_levels_nether_start = 12;
export const tier_levels_undergarden_start = 14;
export const tier_levels_end_start = 18;
export const tier_levels_call_from_the_depths_start = 20;
export const tier_levels_the_abyss_start = 21;

export const existingOres = [
    // Minecraft Ores
    new ExistingOre("minecraft", "coal").withMiningLevel(0).withVariants([VARIANTS.STONE, VARIANTS.DEEPSLATE]),
    new ExistingOre("undergarden", "coal").withMiningLevel(0).withVariants([VARIANTS.DEPTHROCK, VARIANTS.SHIVERSTONE]),
    new ExistingOre("meadow", "coal").withMiningLevel(0).withVariants([VARIANTS.ALPINE]),

    new ExistingOre("minecraft", "copper").withMiningLevel(1).withVariants([VARIANTS.STONE, VARIANTS.DEEPSLATE]),
    new ExistingOre("meadow", "copper").withMiningLevel(1).withVariants([VARIANTS.ALPINE]),

    new ExistingOre("minecraft", "iron").withMiningLevel(1).withVariants([VARIANTS.STONE, VARIANTS.DEEPSLATE]),
    new ExistingOre("undergarden", "iron").withMiningLevel(1).withVariants([VARIANTS.DEPTHROCK, VARIANTS.SHIVERSTONE]),
    new ExistingOre("theabyss", "iron_variant").withMiningLevel(1).withVariants([VARIANTS.BLOCK]),
    new ExistingOre("meadow", "iron").withMiningLevel(1).withVariants([VARIANTS.ALPINE]),

    new ExistingOre("minecraft", "gold").withMiningLevel(2).withVariants([VARIANTS.STONE, VARIANTS.DEEPSLATE, VARIANTS.NETHER]),
    new ExistingOre("undergarden", "gold").withMiningLevel(2).withVariants([VARIANTS.DEPTHROCK]),
    new ExistingOre("theabyss", "gold_variant").withMiningLevel(2).withVariants([VARIANTS.BLOCK]),
    new ExistingOre("meadow", "gold").withMiningLevel(2).withVariants([VARIANTS.ALPINE]),

    new ExistingOre("minecraft", "redstone").withMiningLevel(2).withVariants([VARIANTS.STONE, VARIANTS.DEEPSLATE]),
    new ExistingOre("betternether", "redstone").withMiningLevel(2).withVariants([VARIANTS.NETHER]),
    new ExistingOre("meadow", "redstone").withMiningLevel(2).withVariants([VARIANTS.ALPINE]),

    new ExistingOre("minecraft", "lapis").withMiningLevel(2).withVariants([VARIANTS.STONE, VARIANTS.DEEPSLATE]),
    new ExistingOre("betternether", "lapis").withMiningLevel(2).withVariants([VARIANTS.NETHER]),
    new ExistingOre("meadow", "lapis").withMiningLevel(2).withVariants([VARIANTS.ALPINE]),

    new ExistingOre("minecraft", "diamond").withMiningLevel(2).withVariants([VARIANTS.STONE, VARIANTS.DEEPSLATE]),
    new ExistingOre("undergarden", "diamond").withMiningLevel(2).withVariants([VARIANTS.DEPTHROCK, VARIANTS.SHIVERSTONE]),
    new ExistingOre("theabyss", "diamond_variant").withMiningLevel(2).withVariants([VARIANTS.BLOCK]),
    new ExistingOre("meadow", "diamond").withMiningLevel(2).withVariants([VARIANTS.ALPINE]),

    new ExistingOre("minecraft", "emerald").withMiningLevel(2).withVariants([VARIANTS.STONE, VARIANTS.DEEPSLATE]),
    new ExistingOre("blue_skies", "emerald").withMiningLevel(2).withVariants([VARIANTS.EVERBRIGHT, VARIANTS.EVERDAWN]),
    new ExistingOre("theabyss", "emerald_variant").withMiningLevel(2).withVariants([VARIANTS.BLOCK]),
    new ExistingOre("meadow", "emerald").withMiningLevel(2).withVariants([VARIANTS.ALPINE]),

    // Blue Skies Ores
    // Moonstone, Pyrope, Aquite, Diopside, Charoite, Falsite, Ventium, Horizonite
    new ExistingOre("blue_skies", "moonstone").withMiningLevel(tier_levels_blue_skies_start + 1).withVariants([VARIANTS.EVERBRIGHT, VARIANTS.EVERDAWN]),
    new ExistingOre("blue_skies", "pyrope").withMiningLevel(tier_levels_blue_skies_start + 1).withVariants([VARIANTS.EVERBRIGHT, VARIANTS.EVERDAWN]),
    new ExistingOre("blue_skies", "aquite").withMiningLevel(tier_levels_blue_skies_start + 1).withVariants([VARIANTS.EVERBRIGHT, VARIANTS.EVERDAWN]),
    new ExistingOre("blue_skies", "diopside").withMiningLevel(tier_levels_blue_skies_start + 2).withVariants([VARIANTS.EVERBRIGHT, VARIANTS.EVERDAWN]),
    new ExistingOre("blue_skies", "charoite").withMiningLevel(tier_levels_blue_skies_start + 2).withVariants([VARIANTS.EVERBRIGHT, VARIANTS.EVERDAWN]),
    new ExistingOre("blue_skies", "falsite").withMiningLevel(tier_levels_blue_skies_start + 3).withVariants([VARIANTS.STONE]),
    new ExistingOre("blue_skies", "ventium").withMiningLevel(tier_levels_blue_skies_start + 3).withVariants([VARIANTS.STONE]),
    new ExistingOre("blue_skies", "horizonite").withMiningLevel(tier_levels_blue_skies_start + 3).withVariants([VARIANTS.STONE]),

    // The Aether Ores
    // Ambrosium, Gravitite, Zanite
    new ExistingOre("aether", "ambrosium").withMiningLevel(tier_levels_aether_start).withVariants([VARIANTS.STONE]),
    new ExistingOre("aether", "zanite").withMiningLevel(tier_levels_aether_start + 1).withVariants([VARIANTS.STONE]),
    new ExistingOre("aether", "gravitite").withMiningLevel(tier_levels_aether_start + 2).withVariants([VARIANTS.STONE]),

    // The Nether Ores
    // Quartz, Cincinnasite, Nether Ruby, Ancient Debris
    new ExistingOre("minecraft", "quartz").withMiningLevel(tier_levels_nether_start).withVariants([VARIANTS.NETHER]),
    new ExistingOre("betternether", "cincinnasite").withMiningLevel(tier_levels_nether_start).withVariants([VARIANTS.STONE]),
    new ExistingOre("betternether", "nether_ruby").withMiningLevel(tier_levels_nether_start + 1).withVariants([VARIANTS.STONE]),
    new ExistingOre("minecraft", "ancient_debris").withMiningLevel(tier_levels_nether_start + 2).withVariants([VARIANTS.BLOCK]),

    // Undergarden Ores
    // Cloggrum, Froststeel, Utherium, Regalium
    new ExistingOre("undergarden", "cloggrum").withMiningLevel(tier_levels_undergarden_start).withVariants([VARIANTS.DEPTHROCK, VARIANTS.SHIVERSTONE]),
    new ExistingOre("undergarden", "froststeel").withMiningLevel(tier_levels_undergarden_start + 1).withVariants([VARIANTS.SHIVERSTONE]),
    new ExistingOre("undergarden", "utherium").withMiningLevel(tier_levels_undergarden_start + 2).withVariants([VARIANTS.DEPTHROCK, VARIANTS.SHIVERSTONE, VARIANTS.TREMBLECRUST]),
    new ExistingOre("undergarden", "regalium").withMiningLevel(tier_levels_undergarden_start + 3).withVariants([VARIANTS.DEPTHROCK, VARIANTS.SHIVERSTONE]),
    new ExistingOre("call_of_yucutan", "jade").withMiningLevel(tier_levels_undergarden_start + 2).withVariants([VARIANTS.STONE, VARIANTS.DEEPSLATE]),

    // End Ores
    // Crystal, Malachite, Irradium, Bismuth, Enderite Ore, Cracked Enderite Ore
    new ExistingOre("phantasm", "crystal_block").withMiningLevel(tier_levels_end_start).withVariants([VARIANTS.BLOCK]),
    new ExistingOre("phantasm", "void_crystal_block").withMiningLevel(tier_levels_end_start).withVariants([VARIANTS.BLOCK]),
    new ExistingOre("enderitemod", "enderite_block").withMiningLevel(tier_levels_end_start + 1).withVariants([VARIANTS.BLOCK]),
    new ExistingOre("enderitemod", "enderite_respawn_anchor").withMiningLevel(tier_levels_end_start + 1).withVariants([VARIANTS.BLOCK]),
    new ExistingOre("enderitemod", "enderite").withMiningLevel(tier_levels_end_start + 1).withVariants([VARIANTS.STONE]),
    new ExistingOre("enderitemod", "cracked_enderite").withMiningLevel(tier_levels_end_start + 1).withVariants([VARIANTS.STONE]),

    // Call from the Depths Ores
    // Immemorial Debris
    new ExistingOre("callfromthedepth_", "immemorial_debris").withMiningLevel(tier_levels_call_from_the_depths_start).withVariants([VARIANTS.BLOCK]),

    // The Abyss Ores
    // Loran Ore Fusion Ore, Aberythe Ore, Incorythe, Ignisithe Ore, Glacerythe, Garnite
    new ExistingOre("theabyss", "loran").withMiningLevel(tier_levels_the_abyss_start).withVariants([VARIANTS.STONE]),
    new ExistingOre("theabyss", "fusion").withMiningLevel(tier_levels_the_abyss_start).withVariants([VARIANTS.STONE]),
    new ExistingOre("theabyss", "incorythe").withMiningLevel(tier_levels_the_abyss_start).withVariants([VARIANTS.STONE]),
    new ExistingOre("theabyss", "aberythe").withMiningLevel(tier_levels_the_abyss_start).withVariants([VARIANTS.STONE]),
    new ExistingOre("theabyss", "ignisithe").withMiningLevel(tier_levels_the_abyss_start + 1).withVariants([VARIANTS.STONE]),
    new ExistingOre("theabyss", "glacerythe").withMiningLevel(tier_levels_the_abyss_start + 2).withVariants([VARIANTS.STONE]),
    new ExistingOre("theabyss", "garnite").withMiningLevel(tier_levels_the_abyss_start + 3).withVariants([VARIANTS.STONE]),
];

function buildMaterial(existingOre: ExistingOre) {
    const material = new Material()
        .withNamespace("zoomers_ore_compat")
        .withName(existingOre.internalName)
        .withExistingOre(existingOre);
    return material;
}


export const existingMaterials = existingOres.map(buildMaterial);

export const pickaxeLevelModifications = [
    new PickaxeLevelModification(item_blue_skies.i_bluebright_pickaxe, tier_levels_blue_skies_start),
    new PickaxeLevelModification(item_blue_skies.i_starlit_pickaxe, tier_levels_blue_skies_start),
    new PickaxeLevelModification(item_blue_skies.i_frostbright_pickaxe, tier_levels_blue_skies_start),
    new PickaxeLevelModification(item_blue_skies.i_lunar_pickaxe, tier_levels_blue_skies_start),
    new PickaxeLevelModification(item_blue_skies.i_dusk_pickaxe, tier_levels_blue_skies_start),
    new PickaxeLevelModification(item_blue_skies.i_maple_pickaxe, tier_levels_blue_skies_start),
    new PickaxeLevelModification(item_blue_skies.i_comet_pickaxe, tier_levels_blue_skies_start),
    new PickaxeLevelModification(item_blue_skies.i_turquoise_stone_pickaxe, tier_levels_blue_skies_start + 1),
    new PickaxeLevelModification(item_blue_skies.i_lunar_stone_pickaxe, tier_levels_blue_skies_start + 1),
    new PickaxeLevelModification(item_blue_skies.i_pyrope_pickaxe, tier_levels_blue_skies_start + 2),
    new PickaxeLevelModification(item_blue_skies.i_aquite_pickaxe, tier_levels_blue_skies_start + 2),
    new PickaxeLevelModification(item_blue_skies.i_diopside_pickaxe, tier_levels_blue_skies_start + 2),
    new PickaxeLevelModification(item_blue_skies.i_charoite_pickaxe, tier_levels_blue_skies_start + 3),
    new PickaxeLevelModification(item_blue_skies.i_horizonite_pickaxe, tier_levels_blue_skies_start + 3),

    new PickaxeLevelModification(item_aether.i_skyroot_pickaxe, tier_levels_aether_start),
    new PickaxeLevelModification(item_aether.i_holystone_pickaxe, tier_levels_aether_start + 1),
    new PickaxeLevelModification(item_aether.i_zanite_pickaxe, tier_levels_aether_start + 2),
    new PickaxeLevelModification(item_aether.i_gravitite_pickaxe, tier_levels_aether_start + 2),
    new PickaxeLevelModification(item_aether.i_valkyrie_pickaxe, tier_levels_aether_start + 2),

    new PickaxeLevelModification(item_betternether.i_cincinnasite_pickaxe, tier_levels_nether_start),
    new PickaxeLevelModification(item_betternether.i_cincinnasite_pickaxe_diamond, tier_levels_nether_start),
    new PickaxeLevelModification(item_betternether.i_nether_ruby_pickaxe, tier_levels_nether_start + 1),
    new PickaxeLevelModification(item_betternether.i_flaming_ruby_pickaxe, tier_levels_nether_start + 1),
    new PickaxeLevelModification(item_minecraft.i_netherite_pickaxe, tier_levels_nether_start + 2),

    new PickaxeLevelModification(item_undergarden.i_cloggrum_pickaxe, tier_levels_undergarden_start),
    new PickaxeLevelModification(item_undergarden.i_froststeel_pickaxe, tier_levels_undergarden_start + 1),
    new PickaxeLevelModification(item_undergarden.i_utherium_pickaxe, tier_levels_undergarden_start + 2),
    new PickaxeLevelModification(item_undergarden.i_forgotten_pickaxe, tier_levels_undergarden_start + 3),
    new PickaxeLevelModification(item_call_of_yucutan.i_jade_pickaxe, tier_levels_undergarden_start + 2),

    new PickaxeLevelModification(item_phantasm.i_crystalline_pickaxe, tier_levels_end_start),
    new PickaxeLevelModification(item_enderitemod.i_enderite_pickaxe, tier_levels_end_start + 1),

    new PickaxeLevelModification(item_callfromthedepth_.i_immemorialpickaxe, tier_levels_call_from_the_depths_start),

    new PickaxeLevelModification(item_theabyss.i_bone_pickaxe, tier_levels_the_abyss_start),
    new PickaxeLevelModification(item_theabyss.i_fusion_pickaxe, tier_levels_the_abyss_start),
    new PickaxeLevelModification(item_theabyss.i_aberythe_pickaxe, tier_levels_the_abyss_start + 1),
    new PickaxeLevelModification(item_theabyss.i_incorythe_pickaxe, tier_levels_the_abyss_start + 2),
    new PickaxeLevelModification(item_theabyss.i_phantom_pickaxe, tier_levels_the_abyss_start + 3),
    new PickaxeLevelModification(item_theabyss.i_garnite_pickaxe, tier_levels_the_abyss_start + 4),
    new PickaxeLevelModification(item_theabyss.i_unorithe_pick_axe, tier_levels_the_abyss_start + 5),
]

export const pickaxeLevels = [
    new HarvestLevel("blue_skies_wood", tier_levels_blue_skies_start, "#a3a3a3", undefined, "Blue Skies Wood"),
    new HarvestLevel("blue_skies_stone", tier_levels_blue_skies_start + 1, "#a3a3a3", undefined, "Blue Skies Stone"),
    new HarvestLevel("blue_skies_pyrope", tier_levels_blue_skies_start + 2, "#a3a3a3", undefined, "Blue Skies Pyrope"),
    new HarvestLevel("blue_skies_charoite", tier_levels_blue_skies_start + 3, "#a3a3a3", undefined, "Blue Skies Charoite"),

    new HarvestLevel("aether_skyroot", tier_levels_aether_start, "#a3a3a3", undefined, "Aether Skyroot"),
    new HarvestLevel("aether_holystone", tier_levels_aether_start + 1, "#a3a3a3", undefined, "Aether Holystone"),
    new HarvestLevel("aether_zanite", tier_levels_aether_start + 2, "#a3a3a3", undefined, "Aether Zanite"),

    new HarvestLevel("nether_cincinnasite", tier_levels_nether_start, "#a3a3a3", undefined, "Nether Cincinnasite"),
    new HarvestLevel("nether_ruby", tier_levels_nether_start + 1, "#a3a3a3", undefined, "Nether Ruby"),
    new HarvestLevel("nether_netherite", tier_levels_nether_start + 2, "#a3a3a3", undefined, "Netherite"),

    new HarvestLevel("undergarden_cloggrum", tier_levels_undergarden_start, "#a3a3a3", undefined, "Undergarden Cloggrum"),
    new HarvestLevel("undergarden_froststeel", tier_levels_undergarden_start + 1, "#a3a3a3", undefined, "Undergarden Froststeel"),
    new HarvestLevel("undergarden_utherium", tier_levels_undergarden_start + 2, "#a3a3a3", undefined, "Undergarden Utherium"),
    new HarvestLevel("undergarden_forgotten", tier_levels_undergarden_start + 3, "#a3a3a3", undefined, "Undergarden Forgotten"),

    new HarvestLevel("end_crystal", tier_levels_end_start, "#a3a3a3", undefined, "End Crystal"),
    new HarvestLevel("end_enderite", tier_levels_end_start + 1, "#a3a3a3", undefined, "Enderite"),

    new HarvestLevel("depth_immemorial", tier_levels_call_from_the_depths_start, "#a3a3a3", undefined, "Immemorial Debris"),

    new HarvestLevel("abyss_fusion", tier_levels_the_abyss_start, "#a3a3a3", undefined, "Abyss Fusion"),
    new HarvestLevel("abyss_aberythe", tier_levels_the_abyss_start + 1, "#a3a3a3", undefined, "Abyss Aberythe"),
    new HarvestLevel("abyss_incorythe", tier_levels_the_abyss_start + 2, "#a3a3a3", undefined, "Abyss Incorythe"),
    new HarvestLevel("abyss_phantom", tier_levels_the_abyss_start + 3, "#a3a3a3", undefined, "Abyss Phantom"),
    new HarvestLevel("abyss_garnite", tier_levels_the_abyss_start + 4, "#a3a3a3", undefined, "Abyss Garnite"),
    new HarvestLevel("abyss_unorithe", tier_levels_the_abyss_start + 5, "#a3a3a3", undefined, "Abyss Unorithe"),
]
