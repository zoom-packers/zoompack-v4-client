let processor = require("./processor")
const {deleteAllItemsNotGenerated} = require("./processor");

function modifyFullSets() {
    processor.modifySetRequirements("immersive_armors", "wooden", 1, "armor");
    processor.modifySetRequirements("immersive_armors", "bone", 2, "armor");
    processor.modifySetRequirements("minecraft", "leather", 3, "armor");
    processor.modifySetRequirements("minecraft", "turtle", 3, ["helmet"]);
    processor.modifySetRequirements("minecraft", "stone", 3, "tools");
    processor.modifySetRequirements("immersive_armors", "wither", 2, "armor");
    processor.modifySetRequirements("minecraft", "chainmail", 5, "armor");
    processor.modifySetRequirements("everythingcopper", "copper", 6);
    processor.modifySingleItem("create", "copper_backtank", "chestplate", 5);
    processor.modifySetRequirements("create", "copper_diving", 5, ["helmet", "boots"]);
    processor.modifySetRequirements("blue_skies", "pyrope", 6);
    processor.modifySetRequirements("immersive_armors", "warrior", 7, "armor");
    processor.modifySingleItem("mutantmonsters", "mutant_skeleton_skull", "helmet", 5);
    processor.modifySetRequirements("mutantmonsters", "mutant_skeleton", 8, ["chestplate", "leggings", "boots"]);
    processor.modifySetRequirements("minecraft", "iron", 9);
    processor.modifySetRequirements("blue_skies", "aquite", 9);
    processor.modifySetRequirements("irons_spellbooks", "wandering_magician", 10, "armor");
    processor.modifySetRequirements("immersive_armors", "slime", 10, "armor");
    processor.modifySetRequirements("immersive_armors", "robe", 10, "armor");
    processor.modifySetRequirements("kobolds", "kobold_iron", 11, "tools");
    processor.modifySetRequirements("minecraft", "gold", 12, undefined, "golden_{item}");
    processor.modifySetRequirements("irons_spellbooks", "pumpkin", 12, "armor");
    processor.modifySetRequirements("blue_skies", "diopside", 12);
    processor.modifySetRequirements("immersive_armors", "divine", 13, "armor");
    processor.modifySetRequirements("immersive_armors", "steampunk", 13, "armor");
    processor.modifySetRequirements("immersive_armors", "heavy", 14, "armor");
    processor.modifySetRequirements("minecraft", "diamond", 18);
    processor.modifySingleItem("minecraft", "trident", "sword", 20);
    processor.modifySingleItem("aquamirae", "abyssal_heaume", "helmet", 19);
    processor.modifySingleItem("aquamirae", "abyssal_brigantine", "chestplate", 19);
    processor.modifySetRequirements("aquamirae", "abyssal", 19, ["leggings", "boots"])
    processor.modifySetRequirements("blue_skies", "charoite", 20);
    processor.modifySetRequirements("immersive_armors", "prismarine", 20, "armor");
    processor.modifySetRequirements("aquamirae", "terrible", 21, "armor")
    processor.modifySingleItem("aquamirae", "three_bolt_suit", "chestplate", 21)
    processor.modifySetRequirements("aquamirae", "three_bolt", 21 ["helmet", "leggings", "boots"])
    processor.modifySetRequirements("irons_spellbooks", "pyromancer", 22, "armor");
    processor.modifySetRequirements("irons_spellbooks", "electromancer", 22, "armor");
    processor.modifySetRequirements("irons_spellbooks", "archevoker", 22, "armor");
    processor.modifySetRequirements("irons_spellbooks", "cultist", 22, "armor");
    processor.modifySetRequirements("irons_spellbooks", "cryomancer", 22, "armor");
    processor.modifySetRequirements("irons_spellbooks", "shadowwalker", 22, "armor");
    processor.modifySetRequirements("irons_spellbooks", "priest", 22, "armor");
    processor.modifySetRequirements("irons_spellbooks", "plagued", 22, "armor");
    processor.modifySetRequirements("aquaculture", "neptunium", 23);
    processor.modifySingleItem("aquaculture", "neptunium_bow", "bow", 97);
    processor.modifySetRequirements("blue_skies", "horizonite", 25);
    processor.modifySetRequirements("aether", "zanite", 30);
    processor.modifySetRequirements("aether", "neptune", 32, "armor");
    processor.modifySetRequirements("aether", "gravitite", 35);
    processor.modifySetRequirements("aether", "valkyrie", 37, ["helmet", "chestplate", "leggings", "boots", "axe", "pickaxe", "shovel", "hoe"]);
    processor.modifySingleItem("aether", "valkyrie_lance", "sword", 37);
    processor.modifySetRequirements("aether", "phoenix", 39, "armor");
    processor.modifySetRequirements("aether", "obsidian", 40, "armor");
    processor.modifySingleItem("aether", "mimicarmor_helmet", "helmet", 40);
    processor.modifySingleItem("cataclysm", "monstrous_helm", "helmet", 40);
    processor.modifySetRequirements("betternether", "cincinnasite", 42);
    processor.modifySetRequirements("betternether", "cincinnasite", 44, "tools", "{set_name}_{item}_diamond");
    processor.modifySetRequirements("kubejs", "cincinnasite_diamond", 44, "armor");
    processor.modifySetRequirements("betternether", "nether_ruby", 47);
    processor.modifySetRequirements("betternether", "flaming_ruby", 50);
    processor.modifySetRequirements("minecraft", "netherite", 53);
    processor.modifySingleItem("create", "netherite_backtank", "chestplate", 5);
    processor.modifySetRequirements("create", "netherite_diving", 53, ["helmet", "boots"]);
    processor.modifySetRequirements("undergarden", "cloggrum", 55);
    processor.modifySetRequirements("undergarden", "froststeel", 59);
    processor.modifySetRequirements("undergarden", "utherium", 62);
    processor.modifySetRequirements("undergarden", "forgotten", 64, "tools");
    processor.modifySingleItem("undergarden", "forgotten_battleaxe", "sword", 64);
    processor.modifySetRequirements("betterend", "thallasium", 66);
    processor.modifySetRequirements("betterend", "terminite", 69);
    processor.modifySetRequirements("betterend", "aeternium", 73);
    processor.modifySetRequirements("betterend", "crystalite", 77, "armor");
    processor.modifySetRequirements("deeperdarker", "warden", 80);
    processor.modifySetRequirements("theabyss", "bone_armor", 90, "armor");
    processor.modifySetRequirements("theabyss", "fusion_armor", 90, "armor");
    processor.modifySetRequirements("theabyss", "fusion", 90, "tools");
    processor.modifySetRequirements("theabyss", "aberythe_armor", 91, "armor");
    processor.modifySetRequirements("theabyss", "aberythe", 91, "tools");
    processor.modifySetRequirements("theabyss", "bone", 92, ["axe", "pickaxe", "shovel", "hoe"]);
    processor.modifySetRequirements("theabyss", "bone", 92, ["sword"], "{set_name}_{item}_item");
    processor.modifySetRequirements("theabyss", "ignisithe_armor", 93, "armor");
    processor.modifySetRequirements("theabyss", "ignisithe", 93, ["sword"]);
    processor.modifySetRequirements("theabyss", "ignisithe", 93, ["sword"], "bricked_knight_sword");
    processor.modifySetRequirements("theabyss", "glacerythe_armor", 94, "armor");
    processor.modifySetRequirements("theabyss", "knight", 94, ["axe", "pickaxe", "shovel", "hoe"]);
    processor.modifySetRequirements("theabyss", "garnite_armor", 95, "armor");
    processor.modifySetRequirements("theabyss", "garnite", 95, "tools");
    processor.modifySetRequirements("theabyss", "phantom_armor", 96, "armor");
    processor.modifySetRequirements("theabyss", "phantom", 96, "tools");
    processor.modifySetRequirements("theabyss", "unorithe_armor", 97, "armor");
    processor.modifySetRequirements("theabyss", "unorithe", 97, ["sword", "axe", "shovel", "hoe"]);
    processor.modifySingleItem("theabyss", "unorithe_pick_axe", "pickaxe", 97);
    processor.modifySetRequirements("theabyss", "incorythe_armor", 98, "armor");
    processor.modifySetRequirements("theabyss", "incorythe", 98, "tools");
    processor.modifySetRequirements("theabyss", "incorythe", 99, ["sword"], "{set_name}_{item}_mkii");
    processor.modifySetRequirements("theabyss", "abyss", 100, ["sword"]);
    processor.modifySetRequirements("cataclysm", "ignitium", 100, "armor");
    processor.modifySetRequirements("cataclysm_weaponery", "ignitium", 100, "tools");
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
}

function modifySophisticatedStorage() {
    let levels = [2, 5, 10, 15, 20, 25];
    modifyStorageBlocksByType("{tier}_barrel", "crafting", levels);
    modifyStorageBlocksByType("limited_{tier}_barrel_1", "crafting", levels);
    modifyStorageBlocksByType("limited_{tier}_barrel_2", "crafting", levels);
    modifyStorageBlocksByType("limited_{tier}_barrel_3", "crafting", levels);
    modifyStorageBlocksByType("limited_{tier}_barrel_4", "crafting", levels);
    modifyStorageBlocksByType("{tier}_chest", "crafting", levels);
    modifyStorageBlocksByType("{tier}_shulker_box", "crafting", levels + 20);

    processor.modifyPlaceBlockRequirements("sophisticatedstorage", "controller", "crafting", 10);
    processor.modifyPlaceBlockRequirements("sophisticatedstorage", "storage_link", "crafting", 15);
    processor.modifyPlaceBlockRequirements("sophisticatedstorage", "storage_io", "crafting", 20);
    processor.modifyPlaceBlockRequirements("sophisticatedstorage", "storage_input", "crafting", 25);
    processor.modifyPlaceBlockRequirements("sophisticatedstorage", "storage_output", "crafting", 30);
}

function modifyRefinedStorage() {
    processor.modifyPlaceBlockRequirements("refinedstorage", "controller", "crafting", 30);
    processor.modifyPlaceBlockRequirements("refinedstorage", "grid", "crafting", 30);
    processor.modifyPlaceBlockRequirements("refinedstorage", "crafting_grid", "crafting", 30);
    processor.modifyPlaceBlockRequirements("refinedstorage", "fluid_grid", "crafting", 30);
    processor.modifyPlaceBlockRequirements("refinedstorage", "pattern_grid", "crafting", 30);
    processor.modifyPlaceBlockRequirements("refinedstorage", "crafter_manager", "crafting", 30);
    processor.modifyPlaceBlockRequirements("refinedstorage", "crafting_monitor", "crafting", 30);

    processor.modifyPlaceBlockRequirements("refinedstorage", "1k_storage_block", "crafting", 30);
    processor.modifyPlaceBlockRequirements("refinedstorage", "4k_storage_block", "crafting", 40);
    processor.modifyPlaceBlockRequirements("refinedstorage", "16k_storage_block", "crafting", 50);
    processor.modifyPlaceBlockRequirements("refinedstorage", "64k_storage_block", "crafting", 60);

    processor.modifyPlaceBlockRequirements("refinedstorage", "1k_fluid_storage_block", "crafting", 30);
    processor.modifyPlaceBlockRequirements("refinedstorage", "4k_fluid_storage_block", "crafting", 40);
    processor.modifyPlaceBlockRequirements("refinedstorage", "16k_fluid_storage_block", "crafting", 50);
    processor.modifyPlaceBlockRequirements("refinedstorage", "64k_fluid_storage_block", "crafting", 60);

    processor.modifyPlaceBlockRequirements("refinedstorage", "disk_drive", "crafting", 60);
    processor.modifyPlaceBlockRequirements("refinedstorage", "importer", "crafting", 70);
    processor.modifyPlaceBlockRequirements("refinedstorage", "cable", "crafting", 70);
    processor.modifyPlaceBlockRequirements("refinedstorage", "exporter", "crafting", 70);
    processor.modifyPlaceBlockRequirements("refinedstorage", "external_storage", "crafting", 70);
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
    processor.modifySingleItemForMount("immersive_aircraft", "gyrodyne", "agility", 30)
    processor.modifyEntityMountable("immersive_aircraft", "gyrodyne", "agility", 30)
}

modifyFullSets()
modifyMiscItems()
modifyMounts()
modifySophisticatedBackpacks()
modifySophisticatedStorage()
modifyRefinedStorage()


