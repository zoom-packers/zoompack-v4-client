let processor = require("./processor")
const {deleteAllItemsNotGenerated} = require("./processor");

function modifyFullSets() {
    // Overworld
    processor.modifySetRequirements("immersive_armors", "wooden", 1, "armor");
    processor.modifySingleItem("call_of_yucutan", "wooden_tecpatl", "sword", 1);
    processor.modifySingleItem("call_of_yucutan", "wooden_spear", "sword", 1);
    processor.modifySetRequirements("immersive_armors", "bone", 2, "armor");
    processor.modifySetRequirements("minecraft", "leather", 3, "armor");
    processor.modifySetRequirements("minecraft", "turtle", 3, ["helmet"]);
    processor.modifySetRequirements("minecraft", "stone", 3, "tools");
    processor.modifySingleItem("aquaculture", "stone_fillet_knife", "sword", 3);
    processor.modifySingleItem("call_of_yucutan", "silex_tecpatl", "sword", 3);
    processor.modifySingleItem("call_of_yucutan", "flint_tecpatl", "sword", 3);
    processor.modifySingleItem("call_of_yucutan", "flint_spear", "sword", 3);
    processor.modifySingleItem("everythingisedibleeie", "butchers_knife", "sword", 3);
    processor.modifySetRequirements("immersive_armors", "wither", 4, "armor");
    processor.modifySetRequirements("minecraft", "chainmail", 5, "armor");
    processor.modifySingleItem("create", "copper_backtank", "chestplate", 5);
    processor.modifySetRequirements("create_sa", "copper", 6);
    processor.modifySingleItem("aquamirae", "remnants_saber", "sword", 6);
    processor.modifySingleItem("create_sa", "copper_jetpack_chestplate", "chestplate", 6);
    processor.modifySingleItem("create_sa", "copper_exoskeleton_chestplate", "chestplate", 6);
    processor.modifySingleItem("create_sa", "blazing_cleaver", "sword", 6);
    processor.modifySetRequirements("create", "copper_diving", 5, ["helmet", "boots"]);
    processor.modifySetRequirements("immersive_armors", "warrior", 7, "armor");
    processor.modifySingleItem("mutantmonsters", "mutant_skeleton_skull", "helmet", 5);
    processor.modifySetRequirements("mutantmonsters", "mutant_skeleton", 8, ["chestplate", "leggings", "boots"]);
    processor.modifySetRequirements("minecraft", "iron", 9);
    processor.modifySingleItem("nethersdelight", "iron_machete", "sword", 9);
    processor.modifySingleItem("minecolonies", "iron_scimitar", "sword", 9);
    processor.modifySingleItem("endermanoverhaul", "corrupted_blade", "sword", 9);
    processor.modifySingleItem("aquaculture", "iron_fillet_knife", "sword", 9);
    processor.modifySingleItem("aquamirae", "dagger_of_greed", "sword", 9);
    processor.modifySingleItem("aquamirae", "poisoned_blade", "sword", 9);
    processor.modifySingleItem("bakery", "bread_knife", 'sword', 9);
    processor.modifySingleItem("zoomer_bows", "iron_bow", "bow", 9);
    processor.modifySetRequirements("irons_spellbooks", "wandering_magician", 10, "armor");
    processor.modifySetRequirements("immersive_armors", "slime", 10, "armor");
    processor.modifySetRequirements("immersive_armors", "robe", 10, "armor");
    processor.modifySetRequirements("kobolds", "kobold_iron", 11, "tools");
    processor.modifySetRequirements("minecraft", "gold", 12, undefined, "golden_{item}");
    processor.modifySetRequirements("create_sa", "zinc", 12, ["sword"]);
    processor.modifySetRequirements("irons_spellbooks", "pumpkin", 12, "armor");
    processor.modifySetRequirements("immersive_armors", "divine", 13, "armor");
    processor.modifySetRequirements("immersive_armors", "steampunk", 13, "armor");
    processor.modifySetRequirements("immersive_armors", "heavy", 14, "armor");
    processor.modifySingleItem("call_of_yucutan", "obsidian_tecpatl", "sword", 14);
    processor.modifySingleItem("call_of_yucutan", "obsidian_spear", "sword", 14);
    processor.modifySingleItem("minecraft", "trident", "sword", 15);
    processor.modifySetRequirements("immersive_armors", "prismarine", 15, "armor");
    processor.modifySingleItem("aquamirae", "terrible_sword", 'sword', 16);
    processor.modifySetRequirements("aquamirae", "terrible", 16, "armor");

    processor.modifySingleItem("aquamirae", "three_bolt_suit", "chestplate", 16);
    processor.modifySingleItem("aquamirae", "three_bolt_helmet", "helmet" , 16);
    processor.modifySingleItem("aquamirae", "three_bolt_leggings", "leggings" , 16);
    processor.modifySingleItem("aquamirae", "three_bolt_boots", "boots" , 16);

    processor.modifySetRequirements("irons_spellbooks", "pyromancer", 17, "armor");
    processor.modifySetRequirements("irons_spellbooks", "electromancer", 17, "armor");
    processor.modifySetRequirements("irons_spellbooks", "archevoker", 17, "armor");
    processor.modifySetRequirements("irons_spellbooks", "cultist", 17, "armor");
    processor.modifySetRequirements("irons_spellbooks", "cryomancer", 17, "armor");
    processor.modifySetRequirements("irons_spellbooks", "shadowwalker", 17, "armor");
    processor.modifySetRequirements("irons_spellbooks", "priest", 17, "armor");
    processor.modifySetRequirements("irons_spellbooks", "plagued", 17, "armor");
    processor.modifySingleItem("zoomer_bows", "diamond_bow", "bow", 18);
    processor.modifySetRequirements("minecraft", "diamond", 18);
    processor.modifySingleItem("nethersdelight", "diamond_machete", "sword", 18);
    processor.modifySingleItem("aquaculture", "diamond_fillet_knife", "sword", 18);
    processor.modifySingleItem("aquamirae", "fin_cutter", "sword", 6);
    processor.modifySingleItem("call_of_yucutan", "macuahuitl", "sword", 18);
    processor.modifySetRequirements("create_sa", "experience", 18);
    processor.modifySingleItem("minecolonies", "chiefsword", 'sword', 18);
    processor.modifySetRequirements("create_sa", "rose_quartz", 18, ["sword"]);
    processor.modifySetRequirements("create_sa", "brass", 18, ["sword"]);
    processor.modifySingleItem("aquamirae", "sweet_lance", 'sword', 18);
    processor.modifySingleItem("aquamirae", "coral_lance", "sword", 18);
    processor.modifySingleItem("theabyss", "holy_spoon", 'sword', 18);
    processor.modifySingleItem("irons_spellbooks", "spellbreaker", 'sword', 18);
    processor.modifySetRequirements("aquaculture", "neptunium", 19);
    processor.modifySingleItem("aquaculture", "neptunium_fillet_knife", "sword", 19);
    processor.modifySingleItem("aquaculture", "neptunium_bow", "bow", 19);
    modifyOffhandForTier(1, 10)

    // Blue skies - Everbright
    processor.modifySetRequirements("blue_skies", "bluebright", 20);
    processor.modifySetRequirements("blue_skies", "starlit", 20);
    processor.modifySetRequirements("blue_skies", "frostbright", 20);
    processor.modifySetRequirements("blue_skies", "lunar", 20);
    processor.modifySetRequirements("blue_skies", "dusk", 20);
    processor.modifySetRequirements("blue_skies", "maple", 20);
    processor.modifySetRequirements("blue_skies", "comet", 20);
    processor.modifySetRequirements("blue_skies", "turquoise_stone", 20);


    processor.modifySetRequirements("blue_skies", "lunar_stone", 20);
    processor.modifySetRequirements("blue_skies", "infused_arc", 20, ["sword"]);

    processor.modifySetRequirements("blue_skies", "pyrope", 21);
    processor.modifySingleItem("zoomer_bows", "pyrope_bow", "bow", 21);
    modifyOffhandForTier(2, 23)

    processor.modifySetRequirements("blue_skies", "aquite", 23);
    processor.modifySingleItem("zoomer_bows", "aquite_bow", "bow", 23);

    processor.modifySetRequirements("blue_skies", "diopside", 25);
    processor.modifySingleItem("zoomer_bows", "diopside_bow", "bow", 25);

    processor.modifySetRequirements("blue_skies", "charoite", 29);
    processor.modifySingleItem("zoomer_bows", "charoite_bow", "bow", 29);
    // Everdawn
    processor.modifySetRequirements("blue_skies", "horizonite", 32);
    processor.modifySingleItem("zoomer_bows", "horizonite_bow", "bow", 32);
    processor.modifySetRequirements("blue_skies", "different", 33, ["sword"]);

    // Aether
    processor.modifySetRequirements("aether", "candy_cane", 33, ["sword"]);
    processor.modifySetRequirements("aether", "skyroot", 33, ["sword"]);
    processor.modifySetRequirements("aether", "holystone", 33, ["sword"]);
    processor.modifySetRequirements("aether", "zanite", 35);
    processor.modifySingleItem("zoomer_bows", "zanite_bow", "bow", 35);
    modifyOffhandForTier(3, 35)

    processor.modifySetRequirements("aether", "neptune", 37, "armor");
    processor.modifySingleItem("zoomer_bows", "neptune_bow", "bow", 37);

    processor.modifySetRequirements("aether", "gravitite", 39);
    processor.modifySingleItem("zoomer_bows", "gravitite_bow", "bow", 39);
    processor.modifySingleItem("aether", "hammer_of_kingbdogz", "sword", 39);
    processor.modifySingleItem("aether", "pig_slayer", "sword", 39);
    processor.modifySingleItem("aether", "vampire_blade", "sword", 39);

    processor.modifySetRequirements("aether", "holy", 40, ["sword"]);
    processor.modifySetRequirements("aether", "lightning", 40, ["sword"]);
    processor.modifySetRequirements("aether", "flaming", 40, ["sword"]);
    processor.modifySetRequirements("aether", "valkyrie", 41, ["helmet", "chestplate", "leggings", "boots", "axe", "pickaxe", "shovel", "hoe"]);
    processor.modifySingleItem("aether", "valkyrie_lance", "sword", 41);
    processor.modifySingleItem("zoomer_bows", "valkyrie_bow", "bow", 41);

    processor.modifySetRequirements("aether", "phoenix", 45, "armor");
    processor.modifySetRequirements("lost_aether_content", "phoenix", 45);
    processor.modifySingleItem("aether", "phoenix_bow", "bow", 45);

    processor.modifySetRequirements("aether", "obsidian", 49, "armor");
    processor.modifySingleItem("aether", "mimicarmor_helmet", "helmet", 49);

    // Better Nether
    processor.modifySetRequirements("betternether", "cincinnasite", 52);
    processor.modifySetRequirements("betternether", "cincinnasite", 52, "tools", "{set_name}_{item}_diamond");
    processor.modifySingleItem("zoomer_bows", "cincinnasite_bow", "bow", 52);

    processor.modifySetRequirements("kubejs", "cincinnasite_diamond", 54, "armor");
    processor.modifySingleItem("zoomer_bows", "cincinnasite_diamond_bow", "bow", 54);

    processor.modifySetRequirements("betternether", "nether_ruby", 56);
    processor.modifySingleItem("zoomer_bows", "nether_ruby_bow", "bow", 56);
    modifyOffhandForTier(4, 56)

    processor.modifySetRequirements("betternether", "flaming_ruby", 57);
    processor.modifySingleItem("zoomer_bows", "fire_ruby_bow", "bow", 57);

    processor.modifySetRequirements("minecraft", "netherite", 58);
    processor.modifySingleItem("nethersdelight", "netherite_machete", "sword", 58);
    processor.modifySingleItem("zoomer_bows", "netherite_bow", "bow", 58);
    processor.modifySingleItem("create", "netherite_backtank", "chestplate", 58);
    processor.modifySetRequirements("create", "netherite_diving", 58, ["helmet", "boots"]);

    processor.modifySingleItem("aquamirae", "divider", "sword", 59);
    processor.modifySingleItem("aquamirae", "whisper_of_the_abyss", "sword", 59);

    processor.modifySingleItem("aquamirae", "abyssal_heaume", "helmet", 59);
    processor.modifySingleItem("aquamirae", "abyssal_tiara", "helmet", 59);
    processor.modifySingleItem("aquamirae", "abyssal_brigantine", "chestplate", 59);
    processor.modifySetRequirements("aquamirae", "abyssal", 59, ["leggings", "boots"])

    // Undergarden
    processor.modifySetRequirements("undergarden", "cloggrum", 61);
    processor.modifySingleItem("zoomer_bows", "cloggrum_bow", "bow", 61);
    processor.modifySingleItem("undergarden", "cloggrum_battleaxe", "sword", 61);


    processor.modifySetRequirements("call_of_yucutan", "warrior", 62, ["helmet"]);
    processor.modifySetRequirements("call_of_yucutan", "huracan", 62, ["helmet"]);
    processor.modifySetRequirements("call_of_yucutan", "monkey", 62, ["helmet"]);

    processor.modifySetRequirements("undergarden", "froststeel", 63);
    processor.modifySingleItem("zoomer_bows", "froststeel_bow", "bow", 63);
    modifyOffhandForTier(5, 63)

    processor.modifySetRequirements("undergarden", "utherium", 65);
    processor.modifySingleItem("zoomer_bows", "utherium_bow", "bow", 65);

    processor.modifySetRequirements("undergarden", "forgotten", 67, "tools");
    processor.modifySingleItem("zoomer_bows", "forgotten_bow", "bow", 67);
    processor.modifySingleItem("undergarden", "forgotten_battleaxe", "sword", 67);

    processor.modifySetRequirements("call_of_yucutan", "jades", 68, ["helmet", "chestplate", "leggings", "boots"]);
    processor.modifySetRequirements("call_of_yucutan", "jade", 68, ["sword","axe", "pickaxe", "shovel", "hoe"]);
    processor.modifySingleItem("call_of_yucutan", "sentient_vine", "sword", 68);

    processor.modifySetRequirements("mokels_boss_mantyd", "mantydhelmet", 69, ["helmet"]);
    processor.modifySingleItem("mokels_boss_mantyd", "mantyd_scythe", "sword", 69);

    // Better End
    // outer_end:sinker_dagger

    processor.modifySingleItem("outer_end", "sinker_dagger", "sword", 71);
    processor.modifySingleItem("endlessbiomes", "void_touched_blade", "sword", 71);
    processor.modifySingleItem("endlessbiomes", "void_touched_leggings_leggings", "leggings", 71);
    processor.modifySingleItem("endlessbiomes", "void_touched_boots_boots", "boots", 71);
    processor.modifySetRequirements("endlessbiomes", "anklor_shell_armour", 71);
    processor.modifySetRequirements("outer_end", "rose_crystal", 71);
    processor.modifySetRequirements("outer_end", "cobalt_crystal", 71);
    processor.modifySetRequirements("outer_end", "mint_crystal", 71);

    processor.modifySetRequirements("phantasm", "crystalline", 72, ["sword", "axe", "pickaxe", "shovel", "hoe"], "{set_name}_{item}");
    processor.modifySingleItem("ender_dragon_loot_", "dragon_picaxe", "pickaxe", 73);
    processor.modifySetRequirements("ender_dragon_loot_", "dragon", 73, ["sword", "axe", "shovel", "hoe"], "{set_name}_{item}");
    processor.modifySetRequirements("ender_dragon_loot_", "dragon_armor", 73, "armor");
    modifyOffhandForTier(6, 73)

    processor.modifySetRequirements("enderitemod", "enderite", 79);

    // Deeper darker
    processor.modifySetRequirements("callfromthedepth_", "immemorial", 84, ["sword","axe", "pickaxe", "shovel", "hoe"], "{set_name}{item}");
    processor.modifySetRequirements("callfromthedepth_", "depth_armor", 84, "armor");
    processor.modifySingleItem("callfromthedepth_", "soulbow", "bow", 84);
    processor.modifySingleItem("callfromthedepth_", "soul_blade", "sword", 84);
    modifyOffhandForTier(7, 84)

    // The abyss
    processor.modifySetRequirements("theabyss", "bone_armor", 90, "armor");
    processor.modifySingleItem("zoomer_bows", "bone_bow", "bow", 90);
    modifyOffhandForTier(8, 91)

    processor.modifySetRequirements("theabyss", "fusion_armor", 91, "armor");
    processor.modifySetRequirements("theabyss", "fusion", 91, "tools");
    processor.modifySingleItem("zoomer_bows", "fusion_bow", "bow", 91);

    processor.modifySetRequirements("theabyss", "bone", 92, ["axe", "pickaxe", "shovel", "hoe"]);
    processor.modifySetRequirements("theabyss", "bone", 92, ["sword"], "{set_name}_{item}_item");

    processor.modifySetRequirements("theabyss", "aberythe_armor", 92, "armor");
    processor.modifySetRequirements("theabyss", "aberythe", 92, "tools");
    processor.modifySingleItem("zoomer_bows", "aberythe_bow", "bow", 92);

    processor.modifySetRequirements("theabyss", "ignisithe_armor", 93, "armor");
    processor.modifySetRequirements("theabyss", "ignisithe", 93, ["sword"]);
    processor.modifySingleItem("zoomer_bows", "ignisithe_bow", "bow", 93);
    processor.modifySetRequirements("theabyss", "ignisithe", 93, ["sword"], "bricked_knight_sword");

    processor.modifySetRequirements("theabyss", "glacerythe_armor", 94, "armor");
    processor.modifySingleItem("zoomer_bows", "glacerythe_bow", "bow", 94);

    processor.modifySetRequirements("theabyss", "knight", 94, ["axe", "pickaxe", "shovel", "hoe"]);
    processor.modifySingleItem("zoomer_bows", "knight_bow", "bow", 94);

    processor.modifySetRequirements("theabyss", "garnite_armor", 95, "armor");
    processor.modifySetRequirements("theabyss", "garnite", 95, "tools");
    processor.modifySingleItem("zoomer_bows", "garnite_bow", "bow", 95);

    processor.modifySetRequirements("theabyss", "phantom_armor", 96, "armor");
    processor.modifySetRequirements("theabyss", "phantom", 96, "tools");
    processor.modifySingleItem("zoomer_bows", "phantom_bow", "bow", 96);

    processor.modifySetRequirements("theabyss", "unorithe_armor", 97, "armor");
    processor.modifySetRequirements("theabyss", "unorithe", 97, ["sword", "axe", "shovel", "hoe"]);
    processor.modifySingleItem("zoomer_bows", "unorithe_bow", "bow", 97);
    processor.modifySingleItem("theabyss", "unorithe_pick_axe", "pickaxe", 97);

    processor.modifySetRequirements("theabyss", "incorythe_armor", 98, "armor");
    processor.modifySingleItem("zoomer_bows", "incorythe_bow", "bow", 98);
    processor.modifySetRequirements("theabyss", "incorythe", 98, "tools");
    processor.modifySetRequirements("theabyss", "incorythe", 99, ["sword"], "{set_name}_{item}_mkii");

    processor.modifySetRequirements("theabyss", "abyss", 100, ["sword"]);
}

function modifyOffhandForTier(tier, level) {
    processor.modifySingleItem("zoomers_magic", "pyromancer_offhand_tier_" + tier, "offhand", level);
    processor.modifySingleItem("zoomers_magic", "electromancer_offhand_tier_" + tier, "offhand", level);
    processor.modifySingleItem("zoomers_magic", "archevoker_offhand_tier_" + tier, "offhand", level);
    processor.modifySingleItem("zoomers_magic", "cultist_offhand_tier_" + tier, "offhand", level);
    processor.modifySingleItem("zoomers_magic", "cryomancer_offhand_tier_" + tier, "offhand", level);
    processor.modifySingleItem("zoomers_magic", "shadowwalker_offhand_tier_" + tier, "offhand", level);
    processor.modifySingleItem("zoomers_magic", "priest_offhand_tier_" + tier, "offhand", level);
    processor.modifySingleItem("zoomers_magic", "plagued_offhand_tier_" + tier, "offhand", level);
}

function modifyMiscItems() {
    processor.modifySingleItem("alexsmobs", "skelewag_sword", "sword", 0);
    processor.modifySingleItem("alexsmobs", "ghostly_pickaxe", "pickaxe", 0);
    processor.modifySingleItem("alexsmobs", "tendon_whip", "sword", 0);

    processor.modifySingleItem("alexsmobs", "roadrunner_boots", "boots", 3);
    processor.modifySingleItem("alexsmobs", "crocodile_chestplate", "chestplate", 8);
    processor.modifySingleItem("alexsmobs", "centipede_leggings", "leggings", 12);
    processor.modifySingleItem("alexsmobs", "moose_headgear", "leggings", 12);
    processor.modifySingleItem("alexsmobs", "frontier_cap", "helmet", 12);
    processor.modifySingleItem("alexsmobs", "sombrero", "helmet", 12);
    processor.modifySingleItem("alexsmobs", "spiked_turtle_shell", "helmet", 12);
    processor.modifySingleItem("alexsmobs", "emu_leggings", "leggings", 12);
    processor.modifySingleItem("alexsmobs", "fedora", "helmet", 12);
    processor.modifySingleItem("alexsmobs", "tarantula_hawk_elytra", "chestplate", 300);
    processor.modifySingleItem("alexsmobs", "froststalker_helmet", "helmet", 12);
    processor.modifySingleItem("alexsmobs", "rocky_chestplate", "chestplate", 12);
    processor.modifySingleItem("alexsmobs", "flying_fish_boots", "boots", 12);
    processor.modifySingleItem("alexsmobs", "novelty_hat", "helmet", 12);
    processor.modifySingleItem("alexsmobs", "unsettling_kimono", "chestplate", 12);
}

function modifySophisticatedBackpacks() {
    processor.modifyGeneralUseItemRequirements("sophisticatedbackpacks", "backpack", "endurance", 5);
    processor.modifyGeneralUseItemRequirements("sophisticatedbackpacks", "copper_backpack", "endurance", 10);
    processor.modifyGeneralUseItemRequirements("sophisticatedbackpacks", "iron_backpack", "endurance", 20);
    processor.modifyGeneralUseItemRequirements("sophisticatedbackpacks", "gold_backpack", "endurance", 40);
    processor.modifyGeneralUseItemRequirements("sophisticatedbackpacks", "diamond_backpack", "endurance", 60);
    processor.modifyGeneralUseItemRequirements("sophisticatedbackpacks", "netherite_backpack", "endurance", 80);
    processor.modifySingleBlock("sophisticatedbackpacks", "backpack", "endurance", 5);
    processor.modifySingleBlock("sophisticatedbackpacks", "copper_backpack", "endurance", 10);
    processor.modifySingleBlock("sophisticatedbackpacks", "iron_backpack", "endurance", 20);
    processor.modifySingleBlock("sophisticatedbackpacks", "gold_backpack", "endurance", 40);
    processor.modifySingleBlock("sophisticatedbackpacks", "diamond_backpack", "endurance", 60);
    processor.modifySingleBlock("sophisticatedbackpacks", "netherite_backpack", "endurance", 80);
}

function modifySophisticatedStorage() {
    let tiers = ["basic", "copper", "iron", "gold", "diamond", "netherite"];
    let levels = [2, 5, 10, 15, 20, 25];
    modifyStorageBlocksByType("{tier}_barrel", "engineering", levels);
    modifyStorageBlocksByType("limited_{tier}_barrel_1", "engineering", levels);
    modifyStorageBlocksByType("limited_{tier}_barrel_2", "engineering", levels);
    modifyStorageBlocksByType("limited_{tier}_barrel_3", "engineering", levels);
    modifyStorageBlocksByType("limited_{tier}_barrel_4", "engineering", levels);
    modifyStorageBlocksByType("{tier}_chest", "engineering", levels);
    modifyStorageBlocksByType("{tier}_shulker_box", "engineering", levels + 20);

    processor.modifyUseItemRequirements("sophisticatedstorage","basic_tier_upgrade", "engineering", 2)
    
    for (let i = 0; i < tiers.length; i++) {
        for (let j = i + 1; j < tiers.length; j++) {
            let fromTier = tiers[i];
            let toTier = tiers[j];
            let requiredLevel = levels[j];
    
            processor.modifyUseItemRequirements("sophisticatedstorage", `${fromTier}_to_${toTier}_tier_upgrade`, "engineering", requiredLevel);
        }
    }

    processor.modifyPlaceBlockRequirements("sophisticatedstorage", "controller", "engineering", 10);
    processor.modifyPlaceBlockRequirements("sophisticatedstorage", "storage_link", "engineering", 15);
    processor.modifyPlaceBlockRequirements("sophisticatedstorage", "storage_io", "engineering", 20);
    processor.modifyPlaceBlockRequirements("sophisticatedstorage", "storage_input", "engineering", 25);
    processor.modifyPlaceBlockRequirements("sophisticatedstorage", "storage_output", "engineering", 30);
}

function modifyCreate() {
    processor.modifyPlaceBlockRequirements("trials", "crafter", "engineering", 2);

    processor.modifyPlaceBlockRequirements("create", "hand_crank", "engineering", 3);
    processor.modifyPlaceBlockRequirements("create", "mysterious_cuckoo_clock", "engineering", 3);
    processor.modifyPlaceBlockRequirements("create", "cuckoo_clock", "engineering", 3);
    processor.modifyPlaceBlockRequirements("create", "piston_extension_pole", "engineering", 3);

    processor.modifyPlaceBlockRequirements("create", "schematic_table", "engineering", 4);

    processor.modifyPlaceBlockRequirements("create", "andesite_casing", "engineering", 5);
    processor.modifyPlaceBlockRequirements("create", "depot", "engineering", 5);
    processor.modifyPlaceBlockRequirements("create", "speedometer", "engineering", 5);
    processor.modifyPlaceBlockRequirements("create", "stressometer", "engineering", 5);
    processor.modifyPlaceBlockRequirements("create", "cart_assembler", "engineering", 5);
    processor.modifyPlaceBlockRequirements("create", "sticker", "engineering", 5);
    processor.modifyPlaceBlockRequirements("create", "analog_lever", "engineering", 5);
    processor.modifyPlaceBlockRequirements("create", "powered_latch", "engineering", 5);
    processor.modifyPlaceBlockRequirements("create", "powered_toggle_latch", "engineering", 5);
    processor.modifyPlaceBlockRequirements("create", "andesite_door", "engineering", 5);

    processor.modifyPlaceBlockRequirements("create", "shaft", "engineering", 6);
    processor.modifyPlaceBlockRequirements("create", "turntable", "engineering", 6);
    processor.modifyPlaceBlockRequirements("create", "gantry_shaft", "engineering", 6);
    processor.modifyPlaceBlockRequirements("create", "gantry_carriage", "engineering", 6);
    processor.modifyPlaceBlockRequirements("copycats", "copycat_shaft", "engineering", 6);
    processor.modifyPlaceBlockRequirements("create", "clutch", "engineering", 6);
    processor.modifyPlaceBlockRequirements("create", "windmill_bearing", "engineering", 6);
    processor.modifyPlaceBlockRequirements("create", "white_sail", "engineering", 6);
    processor.modifyPlaceBlockRequirements("create", "sail_frame", "engineering", 6);
    processor.modifyPlaceBlockRequirements("create", "gearbox", "engineering", 6);
    processor.modifyPlaceBlockRequirements("create", "vertical_gearbox", "engineering", 6);
    processor.modifyPlaceBlockRequirements("create", "mechanical_piston", "engineering", 6);
    processor.modifyPlaceBlockRequirements("create", "sticky_mechanical_piston", "engineering", 6);

    processor.modifyPlaceBlockRequirements("create", "cogwheel", "engineering", 7);
    processor.modifyPlaceBlockRequirements("create", "large_cogwheel", "engineering", 7);
    processor.modifyPlaceBlockRequirements("copycats", "copycat_cogwheel", "engineering", 7);
    processor.modifyPlaceBlockRequirements("copycats", "copycat_large_cogwheel", "engineering", 7);
    processor.modifyPlaceBlockRequirements("extendedgears", "half_shaft_cogwheel", "engineering", 7);
    processor.modifyPlaceBlockRequirements("extendedgears", "large_half_shaft_cogwheel", "engineering", 7);
    processor.modifyPlaceBlockRequirements("extendedgears", "shaftless_cogwheel", "engineering", 7);
    processor.modifyPlaceBlockRequirements("extendedgears", "large_shaftless_cogwheel", "engineering", 7);

    processor.modifyPlaceBlockRequirements("create", "water_wheel", "engineering", 8);
    processor.modifyPlaceBlockRequirements("create", "gearshift", "engineering", 8);
    processor.modifyPlaceBlockRequirements("create", "millstone", "engineering", 8);
    processor.modifyPlaceBlockRequirements("create", "schematicannon", "engineering", 8);
    processor.modifyPlaceBlockRequirements("create", "encased_chain_drive", "engineering", 8);
    processor.modifyPlaceBlockRequirements("create", "large_water_wheel", "engineering", 8);

    processor.modifyPlaceBlockRequirements("create", "mechanical_bearing", "engineering", 9);
    processor.modifyPlaceBlockRequirements("create", "basin", "engineering", 9);
    processor.modifyPlaceBlockRequirements("create", "belt_connector", "engineering", 9);
    processor.modifyPlaceBlockRequirements("create", "andesite_funnel", "engineering", 9);
    processor.modifyPlaceBlockRequirements("create", "andesite_tunnel", "engineering", 9);

    processor.modifyPlaceBlockRequirements("create", "encased_fan", "engineering", 10);
    processor.modifyPlaceBlockRequirements("create", "nozzle", "engineering", 10);
    processor.modifyPlaceBlockRequirements("create", "mechanical_press", "engineering", 10);
    processor.modifyPlaceBlockRequirements("create", "steam_whistle", "engineering", 10);
    processor.modifyPlaceBlockRequirements("create", "fluid_pipe", "engineering", 10);
    processor.modifyPlaceBlockRequirements("copycats", "copycat_fluid_pipe", "engineering", 10);
    processor.modifyPlaceBlockRequirements("create", "mechanical_pump", "engineering", 10);
    processor.modifyPlaceBlockRequirements("create", "copper_valve_handle", "engineering", 10);
    processor.modifyPlaceBlockRequirements("create", "white_valve_handle", "engineering", 10);
    processor.modifyPlaceBlockRequirements("create", "orange_valve_handle", "engineering", 10);
    processor.modifyPlaceBlockRequirements("create", "magenta_valve_handle", "engineering", 10);
    processor.modifyPlaceBlockRequirements("create", "light_blue_valve_handle", "engineering", 10);
    processor.modifyPlaceBlockRequirements("create", "yellow_valve_handle", "engineering", 10);
    processor.modifyPlaceBlockRequirements("create", "lime_valve_handle", "engineering", 10);
    processor.modifyPlaceBlockRequirements("create", "pink_valve_handle", "engineering", 10);
    processor.modifyPlaceBlockRequirements("create", "gray_valve_handle", "engineering", 10);
    processor.modifyPlaceBlockRequirements("create", "light_gray_valve_handle", "engineering", 10);
    processor.modifyPlaceBlockRequirements("create", "cyan_valve_handle", "engineering", 10);
    processor.modifyPlaceBlockRequirements("create", "purple_valve_handle", "engineering", 10);
    processor.modifyPlaceBlockRequirements("create", "blue_valve_handle", "engineering", 10);
    processor.modifyPlaceBlockRequirements("create", "brown_valve_handle", "engineering", 10);
    processor.modifyPlaceBlockRequirements("create", "green_valve_handle", "engineering", 10);
    processor.modifyPlaceBlockRequirements("create", "red_valve_handle", "engineering", 10);
    processor.modifyPlaceBlockRequirements("create", "black_valve_handle", "engineering", 10);
    processor.modifyPlaceBlockRequirements("create", "copper_casing", "engineering", 10);
    processor.modifyPlaceBlockRequirements("create", "copper_door", "engineering", 10);
    processor.modifyPlaceBlockRequirements("create", "fluid_tank", "engineering", 10);
    processor.modifyPlaceBlockRequirements("create", "hose_pulley", "engineering", 10);
    processor.modifyPlaceBlockRequirements("create", "item_drain", "engineering", 10);
    processor.modifyPlaceBlockRequirements("create", "spout", "engineering", 10);

    processor.modifyPlaceBlockRequirements("create", "rope_pulley", "engineering", 11);
    processor.modifyPlaceBlockRequirements("create", "contraption_controls", "engineering", 11);
    processor.modifyPlaceBlockRequirements("create", "redstone_contact", "engineering", 11);

    processor.modifyPlaceBlockRequirements("create", "item_vault", "engineering", 12);

    processor.modifyPlaceBlockRequirements("createlowheated", "basic_burner", "engineering", 15);
    processor.modifyPlaceBlockRequirements("create", "mechanical_mixer", "engineering", 15);
    processor.modifyPlaceBlockRequirements("createaddition", "rolling_mill", "engineering", 15);
    processor.modifyPlaceBlockRequirements("createaddition", "barbed_wire", "engineering", 15);
    processor.modifyPlaceBlockRequirements("create", "mechanical_drill", "engineering", 15);
    processor.modifyPlaceBlockRequirements("create", "mechanical_saw", "engineering", 15);
    processor.modifyPlaceBlockRequirements("create", "mechanical_harvester", "engineering", 15);
    processor.modifyPlaceBlockRequirements("create", "mechanical_plough", "engineering", 15);
    processor.modifyPlaceBlockRequirements("create", "mechanical_roller", "engineering", 15);
    processor.modifyPlaceBlockRequirements("create", "adjustable_chain_gearshift", "engineering", 15);
    processor.modifyPlaceBlockRequirements("create", "chute", "engineering", 15);
    processor.modifyPlaceBlockRequirements("create", "fluid_valve", "engineering", 15);
    processor.modifyPlaceBlockRequirements("create", "portable_fluid_interface", "engineering", 15);
    processor.modifyPlaceBlockRequirements("create", "portable_storage_interface", "engineering", 15);

    processor.modifyPlaceBlockRequirements("create", "brass_casing", "engineering", 16);
    processor.modifyPlaceBlockRequirements("create", "brass_door", "engineering", 16);
    processor.modifyPlaceBlockRequirements("create", "weighted_ejector", "engineering", 16);
    processor.modifyPlaceBlockRequirements("create", "smart_fluid_pipe", "engineering", 16);
    processor.modifyPlaceBlockRequirements("create", "clockwork_bearing", "engineering", 16);
    processor.modifyPlaceBlockRequirements("create", "elevator_pulley", "engineering", 16);
    processor.modifyPlaceBlockRequirements("create", "brass_funnel", "engineering", 16);
    processor.modifyPlaceBlockRequirements("create", "brass_tunnel", "engineering", 16);
    processor.modifyPlaceBlockRequirements("create", "content_observer", "engineering", 16);
    processor.modifyPlaceBlockRequirements("create", "stockpile_switch", "engineering", 16);
    processor.modifyPlaceBlockRequirements("create", "display_link", "engineering", 16);
    processor.modifyPlaceBlockRequirements("create", "display_board", "engineering", 16);
    processor.modifyPlaceBlockRequirements("create", "nixie_tube", "engineering", 16);
    processor.modifyPlaceBlockRequirements("create", "placard", "engineering", 16);
    processor.modifyPlaceBlockRequirements("create", "pulse_repeater", "engineering", 16);
    processor.modifyPlaceBlockRequirements("create", "pulse_extender", "engineering", 16);
    processor.modifyPlaceBlockRequirements("create", "pelicular_bell", "engineering", 16);
    processor.modifyPlaceBlockRequirements("create", "haunted_bell", "engineering", 16);

    processor.modifyPlaceBlockRequirements("create", "mechanical_crafter", "engineering", 17);
    processor.modifyPlaceBlockRequirements("create", "mechanical_arm", "engineering", 17);
    processor.modifyPlaceBlockRequirements("create", "sequenced_gearshift", "engineering", 17);
    processor.modifyPlaceBlockRequirements("create", "rotation_speed_controller", "engineering", 17);
    processor.modifyPlaceBlockRequirements("create", "redstone_link", "engineering", 17);
    processor.modifyPlaceBlockRequirements("create", "linked_controller", "engineering", 17);
    
    processor.modifyPlaceBlockRequirements("create", "crushing_wheel", "engineering", 18);
    processor.modifyPlaceBlockRequirements("create", "smart_chute", "engineering", 18);

    processor.modifyPlaceBlockRequirements("create", "railway_casing", "engineering", 20);
    processor.modifyPlaceBlockRequirements("create", "flywheel", "engineering", 20);
    processor.modifyPlaceBlockRequirements("create", "deployer", "engineering", 20);

    processor.modifyPlaceBlockRequirements("railways", "semaphore", "engineering", 22);
    processor.modifyPlaceBlockRequirements("railways", "track_coupler", "engineering", 22);
    processor.modifyPlaceBlockRequirements("create", "track_station", "engineering", 22);
    processor.modifyPlaceBlockRequirements("create", "track_signal", "engineering", 22);
    processor.modifyPlaceBlockRequirements("create", "track_observer", "engineering", 22);

    processor.modifyPlaceBlockRequirements("create", "controls", "engineering", 25);
    processor.modifyPlaceBlockRequirements("create", "train_door", "engineering", 25);
    processor.modifyPlaceBlockRequirements("create", "train_trapdoor", "engineering", 25);
    processor.modifyPlaceBlockRequirements("railways", "track_switch_andesite", "engineering", 25);
    processor.modifyPlaceBlockRequirements("railways", "track_switch_brass", "engineering", 25);    

    processor.modifyPlaceBlockRequirements("create", "steam_engine", "engineering", 30);
    processor.modifyPlaceBlockRequirements("create", "blaze_burner", "engineering", 30);
    processor.modifyPlaceBlockRequirements("create", "empty_blaze_burner", "engineering", 30);

    processor.modifyPlaceBlockRequirements("createaddition", "connector", "engineering", 35);
    processor.modifyPlaceBlockRequirements("createaddition", "small_light_connector", "engineering", 35);
    processor.modifyPlaceBlockRequirements("createaddition", "large_connector", "engineering", 35);
    processor.modifyPlaceBlockRequirements("createaddition", "redstone_relay", "engineering", 35);
    processor.modifyPlaceBlockRequirements("createaddition", "tesla_coil", "engineering", 35);
    processor.modifyPlaceBlockRequirements("createaddition", "modular_accumulator", "engineering", 35);
    processor.modifyPlaceBlockRequirements("createaddition", "portable_energy_interface", "engineering", 35);
    processor.modifyPlaceBlockRequirements("createaddition", "electric_motor", "engineering", 35);
    processor.modifyPlaceBlockRequirements("createaddition", "alternator", "engineering", 35);
}

function modifyRefinedStorage() {
    processor.modifyPlaceBlockRequirements("refinedstorage", "controller", "engineering", 40);
    processor.modifyPlaceBlockRequirements("refinedstorage", "grid", "engineering", 40);
    processor.modifyPlaceBlockRequirements("refinedstorage", "crafting_grid", "engineering", 40);
    processor.modifyPlaceBlockRequirements("refinedstorage", "fluid_grid", "engineering", 40);
    processor.modifyPlaceBlockRequirements("refinedstorage", "pattern_grid", "engineering", 40);
    processor.modifyPlaceBlockRequirements("refinedstorage", "crafter_manager", "engineering", 40);
    processor.modifyPlaceBlockRequirements("refinedstorage", "crafting_monitor", "engineering", 40);

    processor.modifyPlaceBlockRequirements("refinedstorage", "1k_storage_block", "engineering", 40);
    processor.modifyPlaceBlockRequirements("refinedstorage", "4k_storage_block", "engineering", 40);
    processor.modifyPlaceBlockRequirements("refinedstorage", "16k_storage_block", "engineering", 40);
    processor.modifyPlaceBlockRequirements("refinedstorage", "64k_storage_block", "engineering", 40);

    processor.modifyPlaceBlockRequirements("refinedstorage", "1k_fluid_storage_block", "engineering", 40);
    processor.modifyPlaceBlockRequirements("refinedstorage", "4k_fluid_storage_block", "engineering", 40);
    processor.modifyPlaceBlockRequirements("refinedstorage", "16k_fluid_storage_block", "engineering", 40);
    processor.modifyPlaceBlockRequirements("refinedstorage", "64k_fluid_storage_block", "engineering", 40);
    processor.modifyPlaceBlockRequirements("refinedstorage", "256k_fluid_storage_block", "engineering", 40);
    processor.modifyPlaceBlockRequirements("refinedstorage", "1024k_fluid_storage_block", "engineering", 40);
    processor.modifyPlaceBlockRequirements("refinedstorage", "4096k_fluid_storage_block", "engineering", 40);

    processor.modifyPlaceBlockRequirements("refinedstorage", "disk_drive", "engineering", 40);
    processor.modifyPlaceBlockRequirements("refinedstorage", "importer", "engineering", 40);
    processor.modifyPlaceBlockRequirements("refinedstorage", "cable", "engineering", 40);
    processor.modifyPlaceBlockRequirements("refinedstorage", "exporter", "engineering", 40);
    processor.modifyPlaceBlockRequirements("refinedstorage", "external_storage", "engineering", 40);
}

function modifyStorageBlocksByType(template, skill, levels) {
    processor.modifyPlaceBlockRequirements("sophisticatedstorage",
        !template.includes("limited") ?
            template.substring(7):
            template.replace("{tier}", "").replace("__","_"), skill, levels[0]);
    processor.modifyPlaceBlockRequirements("sophisticatedstorage", template.replace("{tier}", "copper").replace("__","_"), skill, levels[1]);
    processor.modifyPlaceBlockRequirements("sophisticatedstorage", template.replace("{tier}", "iron").replace("__","_"), skill, levels[2]);
    processor.modifyPlaceBlockRequirements("sophisticatedstorage", template.replace("{tier}", "gold").replace("__","_"), skill, levels[3]);
    processor.modifyPlaceBlockRequirements("sophisticatedstorage", template.replace("{tier}", "diamond").replace("__","_"), skill, levels[4]);
    processor.modifyPlaceBlockRequirements("sophisticatedstorage", template.replace("{tier}", "netherite").replace("__","_"), skill, levels[5]);
}

function modifyMounts() {
    // processor.modifySingleItemForMount("immersive_aircraft", "gyrodyne", "agility", 30)
    // processor.modifyEntityMountable("immersive_aircraft", "gyrodyne", "agility", 30)
}

modifyFullSets()
modifyMiscItems()
modifyMounts()
modifySophisticatedBackpacks()
modifySophisticatedStorage()
modifyCreate();
modifyRefinedStorage()


