//priority: 851
const $CompoundTag = Java.loadClass('net.minecraft.nbt.CompoundTag')

// TODO: add progression announcement with text on screen
const ACTIVE_QUEST_PD_FIELD = 'ACTIVE_QUEST';
const ACTIVE_QUEST_PROGRESS_PD_FIELD = 'ACTIVE_QUEST_PROGRESS';
const ADV_NAMESPACE = "aaaa_zp4adv";
const TWO_DOTS = ":";
const ADV_PREFIX = `${ADV_NAMESPACE}${TWO_DOTS}`;

//QUEST_DATA_START
const QUESTS = {
    "10logs": {
        "type": "break_block",
        "match": {
            "mode": "endswith",
            "match_id": "_log"
        },
        "reward": [
            10,
            0,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:10logs",
        "count": 10,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Great work. Get some tools for yourself and start slaying some enemies.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "next": "place_crafting_table"
    },
    "place_crafting_table": {
        "type": "place_block",
        "match": {
            "mode": "exact",
            "match_id": "minecraft:crafting_table"
        },
        "reward": [
            20,
            0,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:place_crafting_table",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Right in your inventory you can press R to see the recipies of items while hovering over them. Use U to see the usages.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "next": "10enemies"
    },
    "10enemies": {
        "type": "kill",
        "match": {
            "mode": "preset_entity_check",
            "match": "hostile"
        },
        "reward": [
            20,
            0,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:10enemies",
        "count": 10,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Looks like you are getting stronger! Each type of skill gives you access to items/gear and character stats.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "next": "10farmanimals"
    },
    "10farmanimals": {
        "type": "kill",
        "match": {
            "mode": "preset_entity_check",
            "match": "passive"
        },
        "reward": [
            20,
            0,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:10farmanimals",
        "count": 10,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Good, now you won`t starve. Continue!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "next": "10combatlvl"
    },
    "10combatlvl": {
        "type": "reach_level",
        "match": {
            "mode": "check_level",
            "skill": "combat"
        },
        "reward": [
            50,
            0,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:10combatlvl",
        "count": 10,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Your combat skills are improving. Keep it up!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "next": "get_recipe_book"
    },
    "get_recipe_book": {
        "type": "obtain_item",
        "match": {
            "mode": "exact",
            "match_id": "cookingforblockheads:recipe_book"
        },
        "reward": [
            32,
            0,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:get_recipe_book",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Great job! Let`s see what recipes will we be able to craft better food!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "next": "place_fridge"
    },
    "place_fridge": {
        "type": "place_block",
        "match": {
            "mode": "exact",
            "match_id": "cookingforblockheads:fridge"
        },
        "reward": [
            20,
            0,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:place_fridge",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Very good! No longer we shall face hunger!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "next": "place_oven"
    },
    "place_oven": {
        "type": "place_block",
        "match": {
            "mode": "exact",
            "match_id": "cookingforblockheads:oven"
        },
        "reward": [
            20,
            0,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:place_oven",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Very good! No longer we shall face hunger!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "next": "loot_gem"
    },
    "loot_gem": {
        "type": "obtain_item",
        "match": {
            "mode": "exact",
            "match_id": "apotheosis:gem"
        },
        "reward": [
            32,
            0,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:loot_gem",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "A shiny gem! You can use it to enhance your weaponry on a Smithing Table. Type /gems to find more.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "next": "crush_gem"
    },
    "crush_gem": {
        "type": "obtain_item",
        "match": {
            "mode": "exact",
            "match_id": "apotheosis:gem_dust"
        },
        "reward": [
            32,
            0,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:crush_gem",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Crushed it! You can use the dust to craft tables for gems and affixes. Press U while hovering over it.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "next": "place_salvaging_table"
    },
    "place_salvaging_table": {
        "type": "place_block",
        "match": {
            "mode": "exact",
            "match_id": "apotheosis:salvaging_table"
        },
        "reward": [
            20,
            0,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:place_salvaging_table",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Salvaging table placed. Time to recycle! Extract affix materials or even ingots.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "next": "place_simple_reforging_table"
    },
    "place_simple_reforging_table": {
        "type": "place_block",
        "match": {
            "mode": "exact",
            "match_id": "apotheosis:simple_reforging_table"
        },
        "reward": [
            20,
            0,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:place_simple_reforging_table",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Reforging ready. Enhance your gear! ",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "next": "first_affix_item"
    },
    "first_affix_item": {
        "type": "obtain_item",
        "match": {
            "mode": "nbt_data_includes",
            "match_id": "affix_data"
        },
        "reward": [
            32,
            0,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:first_affix_item",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Great! These are all over the world. There are many variations, make sure to equip them to match your playstyle.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "next": "place_fortunas_anvil"
    },
    "place_fortunas_anvil": {
        "type": "place_block",
        "match": {
            "mode": "exact",
            "match_id": "fortunas_anvil:fortunas_anvil"
        },
        "reward": [
            20,
            0,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:place_fortunas_anvil",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Fortuna`s anvil is set. Good luck!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "next": "use_fortunas_anvil"
    },
    "use_fortunas_anvil": {
        "type": "obtain_item",
        "match": {
            "mode": "nbt_data_includes",
            "match_id": "ZUpgradeData",
            "sub_match": {
                "match": "nbt_data_ge_count",
                "match_id": "level"
            }
        },
        "reward": [
            32,
            0,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:use_fortunas_anvil",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Amazing! Now let`s put your new gear to work to see how it behaves! Hunt down something!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "next": "craft_experience_cutter"
    },
    "craft_experience_cutter": {
        "type": "obtain_item",
        "match": {
            "mode": "endswith",
            "match_id": "_experience_cutter"
        },
        "reward": [
            32,
            0,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:craft_experience_cutter",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Amazing. Now you can use it to store your experience in a safe spot.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "next": "get_first_backpack"
    },
    "get_first_backpack": {
        "type": "obtain_item",
        "match": {
            "mode": "exact",
            "match_id": "sophisticatedbackpacks:backpack"
        },
        "reward": [
            32,
            0,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:get_first_backpack",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Great. Now you can carry as much as you want. You can upgrade them aswell, tho with a price.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "next": "craft_bauble_mount"
    },
    "craft_bauble_mount": {
        "type": "obtain_item",
        "match": {
            "mode": "exact",
            "match_id": "baublemounts:mount_bauble"
        },
        "reward": [
            32,
            0,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:craft_bauble_mount",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Great work! Now use that to capture a tamed mount.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "next": "use_bauble_mount"
    },
    "use_bauble_mount": {
        "type": "obtain_item",
        "match": {
            "mode": "nbt_data_includes",
            "match_id": "Mount",
            "sub_match": {
                "match": "item_id_match",
                "match_id": "baublemounts:mount_bauble"
            }
        },
        "reward": [
            32,
            0,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:use_bauble_mount",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Amazing! Now you can toggle your mount with the key V. Take care of it!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "next": "place_waystone"
    },
    "place_waystone": {
        "type": "place_block",
        "match": {
            "mode": "any",
            "match_ids": [
                "waystones:waystone",
                "waystones:mossy_waystone",
                "waystones:sandy_waystone"
            ]
        },
        "reward": [
            20,
            0,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:place_waystone",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Very good! Interact with it. Maybe you can teleport somewhere.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "next": "place_engineering_table"
    },
    "place_engineering_table": {
        "type": "place_block",
        "match": {
            "mode": "exact",
            "match_id": "kubejs:engineering_table"
        },
        "reward": [
            20,
            0,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:place_engineering_table",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Very good! Interact with it. Maybe the path of an engineer is the right one for you.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "next": "get_tier_1_power_up"
    },
    "get_tier_1_power_up": {
        "type": "obtain_item",
        "match": {
            "mode": "startswith",
            "match_id": "kubejs:tier_1"
        },
        "reward": [
            32,
            0,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:get_tier_1_power_up",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Nice. You can use that with Trimming Templates to enhance your armors.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "next": "50enemies"
    },
    "50enemies": {
        "type": "kill",
        "match": {
            "mode": "preset_entity_check",
            "match": "hostile"
        },
        "reward": [
            36,
            1,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:50enemies",
        "count": 50,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "50 enemies down! You`re a warrior now.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "next": "win_raid"
    },
    "win_raid": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match": "minecraft:hero_of_the_village",
            "match_id": "aaaa_zp4adv:minecraft_hero_of_the_village_trigger"
        },
        "reward": [
            0,
            12,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:win_raid",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Raid victory! The village is safe. Press K and go to Villager Hero to see if you can claim more terrain.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "next": "get_copper_backpack"
    },
    "get_copper_backpack": {
        "type": "obtain_item",
        "match": {
            "mode": "exact",
            "match_id": "sophisticatedbackpacks:copper_backpack"
        },
        "reward": [
            32,
            0,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:get_copper_backpack",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Great! Did you knew you can upgrade with a music box and play songs as you travel?",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "next": "kill_bosses"
    },
    "kill_bosses": {
        "type": "kill",
        "match": {
            "mode": "preset_entity_check",
            "match": "boss"
        },
        "reward": [
            8,
            0,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:kill_bosses",
        "count": 4,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Bosses defeated! Impressive strength. It is time to move towards other lands.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "next": "locate_bank"
    },
    "locate_bank": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:zoompack_economy_bank_trigger"
        },
        "reward": [
            0,
            1,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:locate_bank",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Amazing! Let`s see what trades can you get. Trade more for more trades!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "next": "locate_gatekeeper"
    },
    "locate_gatekeeper": {
        "type": "adv_unlock",
        "match": {
            "mode": "any",
            "match_ids": [
                "aaaa_zp4adv:blue_skies_gatekeeper_house_mountain_trigger",
                "aaaa_zp4adv:blue_skies_gatekeeper_house_plains_trigger",
                "aaaa_zp4adv:blue_skies_gatekeeper_house_snowy_trigger"
            ]
        },
        "reward": [
            0,
            1,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:locate_gatekeeper",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Found the Gate Keeper hourse! Trade with him to get a Zeal Lighter",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "next": "get_zeal_lighter"
    },
    "get_zeal_lighter": {
        "type": "obtain_item",
        "match": {
            "mode": "exact",
            "match_id": "blue_skies:zeal_lighter"
        },
        "reward": [
            32,
            0,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:get_zeal_lighter",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Zeal lighter acquired. Light the way towards the Blue Skies!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "next": "20combatlvl"
    },
    "20combatlvl": {
        "type": "reach_level",
        "match": {
            "mode": "check_level",
            "skill": "combat"
        },
        "reward": [
            36,
            1,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:20combatlvl",
        "count": 20,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Level 20 reached for combat! Now you are ready for the Everbright",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "next": "travel_to_everbright"
    },
    "travel_to_everbright": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:blue_skies_everbright_trigger"
        },
        "reward": [
            62,
            2,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:travel_to_everbright",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Entered Everbright. New adventures begin!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "delayNext": 200,
        "next": "20enemies_everbright"
    },
    "20enemies_everbright": {
        "type": "kill",
        "match": {
            "mode": "preset_entity_check",
            "match": "hostile",
            "dimension_match": "blue_skies:everbright"
        },
        "reward": [
            16,
            1,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:20enemies_everbright",
        "count": 20,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Very good! I have heard about some towers around that the inhabitant owns special powers. See if you can find any.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/everbright.png"
        },
        "next": "locate_everbright_blinding_dungeon"
    },
    "locate_everbright_blinding_dungeon": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:blue_skies_everbright_blinding_dungeon_trigger"
        },
        "reward": [
            20,
            1,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:locate_everbright_blinding_dungeon",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "This is quite the place. Lurk around for keys to open the gate towards the owner.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/everbright.png"
        },
        "next": "loot_blinding_key"
    },
    "loot_blinding_key": {
        "type": "obtain_item",
        "match": {
            "mode": "exact",
            "match_id": "blue_skies:blinding_key"
        },
        "reward": [
            0,
            1,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:loot_blinding_key",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Try to get to the Summoner, if one is not enough, you might need more.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/everbright.png"
        },
        "next": "slay_summoner"
    },
    "slay_summoner": {
        "type": "kill",
        "match": {
            "mode": "exact",
            "match": "blue_skies:summoner"
        },
        "reward": [
            16,
            6,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:slay_summoner",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Looks like he is dropping over some bags. See if you can find anything new.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/everbright.png"
        },
        "next": "loot_ethernal_arc"
    },
    "loot_ethernal_arc": {
        "type": "obtain_item",
        "match": {
            "mode": "exact",
            "match_id": "blue_skies:ethereal_arc"
        },
        "reward": [
            0,
            1,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:loot_ethernal_arc",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "These arcs can be used instead of keys to respawn the Summoner and fight it again. Maybe we can find better loot.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/everbright.png"
        },
        "next": "place_summoning_table"
    },
    "place_summoning_table": {
        "type": "place_block",
        "match": {
            "mode": "exact",
            "match_id": "blue_skies:summoning_table"
        },
        "reward": [
            0,
            1,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:place_summoning_table",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "The table can be used with the Summoning Tome and Soul Fragments to produce magic.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/everbright.png"
        },
        "next": "get_diopside_backpack"
    },
    "get_diopside_backpack": {
        "type": "obtain_item",
        "match": {
            "mode": "exact",
            "match_id": "sophisticatedbackpacks:iron_backpack"
        },
        "reward": [
            0,
            1,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:get_diopside_backpack",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Great! Did you knew you can upgrade your backpack to feed you while you fight?",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/everbright.png"
        },
        "next": "25combatlvl"
    },
    "25combatlvl": {
        "type": "reach_level",
        "match": {
            "mode": "check_level",
            "skill": "combat"
        },
        "reward": [
            61,
            1,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:25combatlvl",
        "count": 25,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Your combat skills are improving. Keep it up!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/everbright.png"
        },
        "next": "get_tier_2_power_up"
    },
    "get_tier_2_power_up": {
        "type": "obtain_item",
        "match": {
            "mode": "startswith",
            "match_id": "kubejs:tier_2"
        },
        "reward": [
            0,
            1,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:get_tier_2_power_up",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Great! Apply those to your armor to become stronger!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/everbright.png"
        },
        "next": "locate_everbright_nature_dungeon"
    },
    "locate_everbright_nature_dungeon": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:blue_skies_nature_dungeon_trigger"
        },
        "reward": [
            20,
            1,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:locate_everbright_nature_dungeon",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "What a masterpiece of a maze. Find 4 Nature Keys and get to the top.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/everbright.png"
        },
        "next": "loot_4_nature_key"
    },
    "loot_4_nature_key": {
        "type": "obtain_item",
        "match": {
            "mode": "exact",
            "match_id": "blue_skies:nature_key"
        },
        "reward": [
            0,
            4,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:loot_4_nature_key",
        "count": 4,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Now you are ready to ender the fight. Good luck traveler!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/everbright.png"
        },
        "next": "slay_starlit_crusher"
    },
    "slay_starlit_crusher": {
        "type": "kill",
        "match": {
            "mode": "exact",
            "match": "blue_skies:starlit_crusher"
        },
        "reward": [
            16,
            6,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:slay_starlit_crusher",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Good job. Open the bag to see what goods we get",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/everbright.png"
        },
        "next": "loot_nature_arc"
    },
    "loot_nature_arc": {
        "type": "obtain_item",
        "match": {
            "mode": "exact",
            "match_id": "blue_skies:nature_arc"
        },
        "reward": [
            0,
            1,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:loot_nature_arc",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Very good! Equip it to become stronger. Remember, you could get a better one from the enemy",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/everbright.png"
        },
        "next": "28combatlvl"
    },
    "28combatlvl": {
        "type": "reach_level",
        "match": {
            "mode": "check_level",
            "skill": "combat"
        },
        "reward": [
            12,
            2,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:28combatlvl",
        "count": 28,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Your combat skills are improving. Keep it up!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/everbright.png"
        },
        "next": "travel_back_to_overworld"
    },
    "travel_back_to_overworld": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:minecraft_overworld_trigger"
        },
        "reward": [
            62,
            2,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:travel_back_to_overworld",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Welcome back home, but adventure continues",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "delayNext": 200,
        "next": "travel_to_everdawn"
    },
    "travel_to_everdawn": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:blue_skies_everdawn_trigger"
        },
        "reward": [
            60,
            5,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:travel_to_everdawn",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "A new world with new magic mechanics!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/everdawn.png"
        },
        "delayNext": 200,
        "next": "20enemies_everdawn"
    },
    "20enemies_everdawn": {
        "type": "kill",
        "match": {
            "mode": "preset_entity_check",
            "match": "hostile",
            "dimension_match": "blue_skies:everdawn"
        },
        "reward": [
            32,
            2,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:20enemies_everdawn",
        "count": 20,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Very good! I have heard about some towers around that the inhabitant owns special powers. See if you can find any.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/everdawn.png"
        },
        "next": "locate_everdawn_blinding_dungeon"
    },
    "locate_everdawn_blinding_dungeon": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:blue_skies_everdawn_blinding_dungeon_trigger"
        },
        "reward": [
            40,
            1,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:locate_everdawn_blinding_dungeon",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Good job! Do you still got the keys from the past day or do you need to get new ones?",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/everdawn.png"
        },
        "next": "loot_4_blinding_keys"
    },
    "loot_4_blinding_keys": {
        "type": "obtain_item",
        "match": {
            "mode": "exact",
            "match_id": "blue_skies:blinding_key"
        },
        "reward": [
            0,
            8,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:loot_4_blinding_keys",
        "count": 4,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Good! Now to the Alchemist!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/everdawn.png"
        },
        "next": "slay_the_alchemist"
    },
    "slay_the_alchemist": {
        "type": "kill",
        "match": {
            "mode": "exact",
            "match": "blue_skies:alchemist"
        },
        "reward": [
            32,
            12,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:slay_the_alchemist",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Astonishing! Check the loot bag, you can get an arc from him that can turn you invisible! Remember, you could get a better one from the enemy",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/everdawn.png"
        },
        "next": "loot_dusk_arc"
    },
    "loot_dusk_arc": {
        "type": "obtain_item",
        "match": {
            "mode": "exact",
            "match_id": "blue_skies:dusk_arc"
        },
        "reward": [
            0,
            2,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:loot_dusk_arc",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Very good! Equip it to become one with the shadows! Remember, you could get a better one from the enemy",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/everdawn.png"
        },
        "next": "place_alchemy_table"
    },
    "place_alchemy_table": {
        "type": "place_block",
        "match": {
            "mode": "exact",
            "match_id": "blue_skies:alchemy_table"
        },
        "reward": [
            48,
            1,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:place_alchemy_table",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "The table can be used to alterate versions of an item. Try turning redstone into glowstone.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/everdawn.png"
        },
        "next": "32combatlvl"
    },
    "32combatlvl": {
        "type": "reach_level",
        "match": {
            "mode": "check_level",
            "skill": "combat"
        },
        "reward": [
            32,
            2,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:32combatlvl",
        "count": 32,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Your combat skills are improving. Keep it up!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/everdawn.png"
        },
        "next": "get_tier_3_power_up"
    },
    "get_tier_3_power_up": {
        "type": "obtain_item",
        "match": {
            "mode": "startswith",
            "match_id": "kubejs:tier_3"
        },
        "reward": [
            0,
            2,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:get_tier_3_power_up",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Great! Apply those to your armor to become stronger!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/everdawn.png"
        },
        "next": "locate_everdawn_poison_dungeon"
    },
    "locate_everdawn_poison_dungeon": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:blue_skies_poison_dungeon_trigger"
        },
        "reward": [
            40,
            1,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:locate_everdawn_poison_dungeon",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "I strongly belive you need some keys here aswell. However i do not know what kind.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/everdawn.png"
        },
        "next": "loot_4_poison_keys"
    },
    "loot_4_poison_keys": {
        "type": "obtain_item",
        "match": {
            "mode": "exact",
            "match_id": "blue_skies:poison_key"
        },
        "reward": [
            0,
            8,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:loot_4_poison_keys",
        "count": 4,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Fantastic. Let`s search around for a place where we could find him.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/everdawn.png"
        },
        "next": "slay_the_arachnarch"
    },
    "slay_the_arachnarch": {
        "type": "kill",
        "match": {
            "mode": "exact",
            "match": "blue_skies:arachnarch"
        },
        "reward": [
            32,
            12,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:slay_the_arachnarch",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Astonishing! Check the loot bag, you can get an arc from it that could prevent the poisoning.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/everdawn.png"
        },
        "next": "loot_poison_arc"
    },
    "loot_poison_arc": {
        "type": "obtain_item",
        "match": {
            "mode": "exact",
            "match_id": "blue_skies:poison_arc"
        },
        "reward": [
            0,
            2,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:loot_poison_arc",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Very good! Spiders will no longer state an threat. Remember, you could get a better one from the enemy",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/everdawn.png"
        },
        "next": "35combatlvl"
    },
    "35combatlvl": {
        "type": "reach_level",
        "match": {
            "mode": "check_level",
            "skill": "combat"
        },
        "reward": [
            47,
            2,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:35combatlvl",
        "count": 35,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Your combat skills are improving. Keep it up!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/everdawn.png"
        },
        "next": "travel_back2_to_overworld"
    },
    "travel_back2_to_overworld": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:minecraft_overworld_trigger"
        },
        "reward": [
            60,
            5,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:travel_back2_to_overworld",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Welcome back home, but adventure continues",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "delayNext": 200,
        "next": "travel_to_aether"
    },
    "travel_to_aether": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:aether_the_aether_trigger"
        },
        "reward": [
            56,
            11,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:travel_to_aether",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "The Aether is a friendly looking skylands with some very manacing creatures. Since is above the overworld you can jump back home anytime.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/aether.png"
        },
        "delayNext": 200,
        "next": "30enemies_aether"
    },
    "30enemies_aether": {
        "type": "kill",
        "match": {
            "mode": "preset_entity_check",
            "match": "hostile",
            "dimension_match": "aether:the_aether"
        },
        "reward": [
            0,
            5,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:30enemies_aether",
        "count": 20,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Very good, now that you got used to the enemies around, it is time for you to search for stronger challanges.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/everbright.png"
        },
        "next": "place_aether_altar"
    },
    "place_aether_altar": {
        "type": "place_block",
        "match": {
            "mode": "exact",
            "match_id": "aether:altar"
        },
        "reward": [
            0,
            2,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:place_aether_altar",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "The altar repairs items, however there are surely more mystical items in this realm.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/aether.png"
        },
        "next": "locate_aether_bronze_dungeon"
    },
    "locate_aether_bronze_dungeon": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:aether_bronze_dungeon_trigger"
        },
        "reward": [
            0,
            2,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:locate_aether_bronze_dungeon",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Good. Your enemy lies in one of these chambers. Make sure you have a pickaxe around!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/aether.png"
        },
        "next": "slay_slider"
    },
    "slay_slider": {
        "type": "kill",
        "match": {
            "mode": "exact",
            "match": "aether:slider"
        },
        "reward": [
            0,
            25,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:slay_slider",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Every key opens something. Look around!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/aether.png"
        },
        "next": "40combatlvl"
    },
    "40combatlvl": {
        "type": "reach_level",
        "match": {
            "mode": "check_level",
            "skill": "combat"
        },
        "reward": [
            8,
            3,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:40combatlvl",
        "count": 40,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Your combat skills are improving. Keep it up!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/aether.png"
        },
        "next": "locate_aether_silver_dungeon"
    },
    "locate_aether_silver_dungeon": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:aether_silver_dungeon_trigger"
        },
        "reward": [
            0,
            2,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:locate_aether_silver_dungeon",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "The Silver Dungeon is home of the Valkyrie Queen, but she may be harmed in fight only with specific requirments.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/aether.png"
        },
        "next": "slay_10_valkyries"
    },
    "slay_10_valkyries": {
        "type": "kill",
        "match": {
            "mode": "exact",
            "match": "aether:valkyrie"
        },
        "reward": [
            0,
            58,
            3,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:slay_10_valkyries",
        "count": 10,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Good. Let`s hope you got enough to trade a fight with the Queen.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/aether.png"
        },
        "next": "slay_valkyrie_queen"
    },
    "slay_valkyrie_queen": {
        "type": "kill",
        "match": {
            "mode": "exact",
            "match": "aether:valkyrie_queen"
        },
        "reward": [
            0,
            25,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:slay_valkyrie_queen",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Every key opens something. Look around!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/aether.png"
        },
        "next": "get_aether_backpack"
    },
    "get_aether_backpack": {
        "type": "obtain_item",
        "match": {
            "mode": "exact",
            "match_id": "sophisticatedbackpacks:gold_backpack"
        },
        "reward": [
            0,
            4,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:get_aether_backpack",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Great! Did you knew you can upgrade your backpack to magnetize items towards you?",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/everbright.png"
        },
        "next": "45combatlvl"
    },
    "45combatlvl": {
        "type": "reach_level",
        "match": {
            "mode": "check_level",
            "skill": "combat"
        },
        "reward": [
            33,
            3,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:45combatlvl",
        "count": 45,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Your combat skills are improving. Keep it up!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/aether.png"
        },
        "next": "locate_aether_gold_dungeon"
    },
    "locate_aether_gold_dungeon": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:aether_gold_dungeon_trigger"
        },
        "reward": [
            0,
            2,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:locate_aether_gold_dungeon",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Incredible, a creature that harnessed the power of lava fully. Let`s hope you can face the fire.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/aether.png"
        },
        "next": "slay_sun_spirit"
    },
    "slay_sun_spirit": {
        "type": "kill",
        "match": {
            "mode": "exact",
            "match": "aether:sun_spirit"
        },
        "reward": [
            0,
            25,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:slay_sun_spirit",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Impressive fight! Now don`t forget that every key opens something, so look around!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/aether.png"
        },
        "next": "48combatlvl"
    },
    "48combatlvl": {
        "type": "reach_level",
        "match": {
            "mode": "check_level",
            "skill": "combat"
        },
        "reward": [
            48,
            3,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:48combatlvl",
        "count": 48,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Your combat skills are improving. Keep it up!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/aether.png"
        },
        "next": "get_tier_4_power_up"
    },
    "get_tier_4_power_up": {
        "type": "obtain_item",
        "match": {
            "mode": "startswith",
            "match_id": "kubejs:tier_4"
        },
        "reward": [
            0,
            4,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:get_tier_4_power_up",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Great! Apply those to your armor to become stronger!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/aether.png"
        },
        "next": "locate_aether_platinum_dungeon"
    },
    "locate_aether_platinum_dungeon": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:lost_aether_content_platinum_dungeon_trigger"
        },
        "reward": [
            0,
            2,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:locate_aether_platinum_dungeon",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Incredible construction. I wonder what loot could we get out of it.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/aether.png"
        },
        "next": "slay_aerwhale_king"
    },
    "slay_aerwhale_king": {
        "type": "kill",
        "match": {
            "mode": "exact",
            "match": "lost_aether_content:aerwhale_king"
        },
        "reward": [
            0,
            25,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:slay_aerwhale_king",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Incredible! Surely not everyone could face that king. It`s time to grow stronger",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/aether.png"
        },
        "next": "50combatlvl"
    },
    "50combatlvl": {
        "type": "reach_level",
        "match": {
            "mode": "check_level",
            "skill": "combat"
        },
        "reward": [
            58,
            3,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:50combatlvl",
        "count": 50,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Your combat skills are improving. Keep it up!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/aether.png"
        },
        "next": "travel_aether_to_overworld"
    },
    "travel_aether_to_overworld": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:minecraft_overworld_trigger"
        },
        "reward": [
            56,
            11,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:travel_aether_to_overworld",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Welcome back home, but adventure continues. The following dimension we shall visit is The Nether",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "delayNext": 200,
        "next": "travel_to_the_nether"
    },
    "travel_to_the_nether": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:minecraft_the_nether_trigger"
        },
        "reward": [
            48,
            23,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:travel_to_the_nether",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Welcome to hell! Hard to roam around and constant fear of fire.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/nether.png"
        },
        "delayNext": 200,
        "next": "locate_nether_fortress"
    },
    "locate_nether_fortress": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:betterfortresses_fortress_trigger"
        },
        "reward": [
            0,
            3,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:locate_nether_fortress",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Very good! Now let`s do some cleaning around.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/nether.png"
        },
        "next": "50enemies_nether"
    },
    "50enemies_nether": {
        "type": "kill",
        "match": {
            "mode": "preset_entity_check",
            "match": "hostile",
            "dimension_match": "minecraft:the_nether"
        },
        "reward": [
            0,
            25,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:50enemies_nether",
        "count": 50,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Very good! Theats still persists, but we have a now an improved calm.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/nether.png"
        },
        "next": "locate_bastion_remnant"
    },
    "locate_bastion_remnant": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:minecraft_bastion_remnant_trigger"
        },
        "reward": [
            0,
            3,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:locate_bastion_remnant",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Amazing. See if you can find any good trades.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/nether.png"
        },
        "next": "locate_nether_city"
    },
    "locate_nether_city": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:betternether_nether_city_trigger"
        },
        "reward": [
            0,
            3,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:locate_nether_city",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Good. Take care out there. It`s not as friendly as it is shiny!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/nether.png"
        },
        "next": "get_forged_backpack"
    },
    "get_forged_backpack": {
        "type": "obtain_item",
        "match": {
            "mode": "exact",
            "match_id": "sophisticatedbackpacks:diamond_backpack"
        },
        "reward": [
            0,
            8,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:get_forged_backpack",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Great! Did you knew you can upgrade your backpack to compact items for you?",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/nether.png"
        },
        "next": "locate_gauntlet_arena"
    },
    "locate_gauntlet_arena": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:bosses_of_mass_destruction_gauntlet_arena_trigger"
        },
        "reward": [
            0,
            3,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:locate_gauntlet_arena",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Creepy and warm place. Let`s hope you grabbed a pickaxe.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/nether.png"
        },
        "next": "slay_nether_gauntlet"
    },
    "slay_nether_gauntlet": {
        "type": "kill",
        "match": {
            "mode": "exact",
            "match": "bosses_of_mass_destruction:gauntlet"
        },
        "reward": [
            0,
            50,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:slay_nether_gauntlet",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Good job! You have now freed the area of the menace.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/nether.png"
        },
        "next": "get_blazing_eye"
    },
    "get_blazing_eye": {
        "type": "obtain_item",
        "match": {
            "mode": "exact",
            "match_id": "bosses_of_mass_destruction:blazing_eye"
        },
        "reward": [
            0,
            8,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:get_blazing_eye",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Very good! You can use this eye to fly around harnessing it`s magic power",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/nether.png"
        },
        "next": "place_table_of_elevation"
    },
    "place_table_of_elevation": {
        "type": "place_block",
        "match": {
            "mode": "exact",
            "match_id": "bosses_of_mass_destruction:levitation_block"
        },
        "reward": [
            0,
            4,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:place_table_of_elevation",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Good Job! Now you can fly around home magically!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/nether.png"
        },
        "next": "55combatlvl"
    },
    "55combatlvl": {
        "type": "reach_level",
        "match": {
            "mode": "check_level",
            "skill": "combat"
        },
        "reward": [
            19,
            4,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:55combatlvl",
        "count": 55,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Your combat skills are improving. Keep it up!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/nether.png"
        },
        "next": "get_tier_5_power_up"
    },
    "get_tier_5_power_up": {
        "type": "obtain_item",
        "match": {
            "mode": "startswith",
            "match_id": "kubejs:tier_5"
        },
        "reward": [
            0,
            8,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:get_tier_5_power_up",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Great! Apply those to your armor to become stronger!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/nether.png"
        },
        "next": "slay_the_wither"
    },
    "slay_the_wither": {
        "type": "kill",
        "match": {
            "mode": "exact",
            "match": "minecraft:wither"
        },
        "reward": [
            0,
            50,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:slay_the_wither",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Impressive work! It`s eye is a must for traveling to The End Dimension.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/nether.png"
        },
        "next": "place_augmenting_table"
    },
    "place_augmenting_table": {
        "type": "place_block",
        "match": {
            "mode": "exact",
            "match_id": "apotheosis:augmenting_table"
        },
        "reward": [
            0,
            4,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:place_augmenting_table",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Amazing! Make use of it if you want stronger gear!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/nether.png"
        },
        "next": "60combatlvl"
    },
    "60combatlvl": {
        "type": "reach_level",
        "match": {
            "mode": "check_level",
            "skill": "combat"
        },
        "reward": [
            44,
            4,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:60combatlvl",
        "count": 60,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Your combat skills are improving. Keep it up!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/nether.png"
        },
        "next": "travel_nether_to_overworld"
    },
    "travel_nether_to_overworld": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:minecraft_overworld_trigger"
        },
        "reward": [
            48,
            23,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:travel_nether_to_overworld",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Welcome back home, but adventure continues. It`s time to go upwards, towards The Undergarden",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "delayNext": 200,
        "next": "loot_or_craft_catalyst"
    },
    "loot_or_craft_catalyst": {
        "type": "obtain_item",
        "match": {
            "mode": "exact",
            "match_id": "undergarden:catalyst"
        },
        "reward": [
            0,
            16,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:loot_or_craft_catalyst",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Great! Now use it to lit the portal!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/undergarden.png"
        },
        "next": "travel_to_the_undergarden"
    },
    "travel_to_the_undergarden": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:undergarden_undergarden_trigger"
        },
        "reward": [
            32,
            47,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:travel_to_the_undergarden",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Welcome to hell! Hard to roam around and constant fear of fire.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/undergarden.png"
        },
        "delayNext": 200,
        "next": "locate_catacombs"
    },
    "locate_catacombs": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:undergarden_catacombs_trigger"
        },
        "reward": [
            0,
            4,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:locate_catacombs",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Amazing. Now let`s take care of the enemies. Search around for chests too!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/undergarden.png"
        },
        "next": "80enemies_undergarden"
    },
    "80enemies_undergarden": {
        "type": "kill",
        "match": {
            "mode": "preset_entity_check",
            "match": "hostile",
            "dimension_match": "undergarden:undergarden"
        },
        "reward": [
            0,
            16,
            1,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:80enemies_undergarden",
        "count": 80,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Very good! Remember that Forgotten Guardians are not as easy to slash.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/undergarden.png"
        },
        "next": "locate_kinoras_garden"
    },
    "locate_kinoras_garden": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:mokels_boss_mantyd_kinoras_garden_trigger"
        },
        "reward": [
            0,
            4,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:locate_kinoras_garden",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Great finding! Now it`s time to release the realm of her threat!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/undergarden.png"
        },
        "next": "slay_kinora"
    },
    "slay_kinora": {
        "type": "kill",
        "match": {
            "mode": "exact",
            "match": "mokels_boss_mantyd:boss_mantyd"
        },
        "reward": [
            0,
            36,
            1,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:slay_kinora",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Good job! The realm is vast and there are more threats around.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/undergarden.png"
        },
        "next": "locate_deadly_crypt"
    },
    "locate_deadly_crypt": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:call_of_yucutan_deadly_crypt_trigger"
        },
        "reward": [
            0,
            4,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:locate_deadly_crypt",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Amazing spotting. Now take care down there as the crypt is filled with puzzles.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/undergarden.png"
        },
        "next": "slay_ah_puch"
    },
    "slay_ah_puch": {
        "type": "kill",
        "match": {
            "mode": "exact",
            "match": "call_of_yucutan:ah_puch"
        },
        "reward": [
            0,
            36,
            1,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:slay_ah_puch",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "I could not belive it even if predicted. Amazing Job! But threats still lay on these warm underlands.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/undergarden.png"
        },
        "next": "65combatlvl"
    },
    "65combatlvl": {
        "type": "reach_level",
        "match": {
            "mode": "check_level",
            "skill": "combat"
        },
        "reward": [
            5,
            5,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:65combatlvl",
        "count": 65,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Your combat skills are improving. Keep it up!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/undergarden.png"
        },
        "next": "get_tier_6_power_up"
    },
    "get_tier_6_power_up": {
        "type": "obtain_item",
        "match": {
            "mode": "startswith",
            "match_id": "kubejs:tier_6"
        },
        "reward": [
            0,
            16,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:get_tier_6_power_up",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Great! Apply those to your armor to become stronger!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/undergarden.png"
        },
        "next": "locate_overgrown_temple"
    },
    "locate_overgrown_temple": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:call_of_yucutan_overgrown_temple_trigger"
        },
        "reward": [
            0,
            4,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:locate_overgrown_temple",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Great! You found it. Our next enemy is located inside, but the puzzles tricked many into losing their lives.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/undergarden.png"
        },
        "next": "slay_kukulkan"
    },
    "slay_kukulkan": {
        "type": "kill",
        "match": {
            "mode": "exact",
            "match": "call_of_yucutan:kukulkan"
        },
        "reward": [
            0,
            36,
            1,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:slay_kukulkan",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Good Work! You now freed the realm of it`s threats.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/undergarden.png"
        },
        "next": "70combatlvl"
    },
    "70combatlvl": {
        "type": "reach_level",
        "match": {
            "mode": "check_level",
            "skill": "combat"
        },
        "reward": [
            30,
            5,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:70combatlvl",
        "count": 70,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Your combat skills are improving. Keep it up!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/undergarden.png"
        },
        "next": "travel_unbergarden_to_overworld"
    },
    "travel_unbergarden_to_overworld": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:minecraft_overworld_trigger"
        },
        "reward": [
            32,
            47,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:travel_unbergarden_to_overworld",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Welcome back home, but adventure continues. We need to now go higher than The Aether!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "delayNext": 200,
        "next": "locate_end_stronghold"
    },
    "locate_end_stronghold": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:betterstrongholds_stronghold_trigger"
        },
        "reward": [
            0,
            16,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:locate_end_stronghold",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Great! Let`s hope you gathered enough eyes to open the portal.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "next": "travel_to_the_end"
    },
    "travel_to_the_end": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:minecraft_the_end_trigger"
        },
        "reward": [
            0,
            31,
            1,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:travel_to_the_end",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Welcome to the high sky! Make sure not to tip over the edges of these islands as there is just abyss downwards.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/end.png"
        },
        "delayNext": 200,
        "next": "defeat_ender_dragon"
    },
    "defeat_ender_dragon": {
        "type": "kill",
        "match": {
            "mode": "exact",
            "match": "minecraft:ender_dragon"
        },
        "reward": [
            0,
            22,
            2,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:defeat_ender_dragon",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "What a fight! The End is still very vast and the dragon, tho the biggest not it`s final threat.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/end.png"
        },
        "next": "locate_end_tower"
    },
    "locate_end_tower": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:outer_end_end_tower_trigger"
        },
        "reward": [
            0,
            16,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:locate_end_tower",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Amazing. Let`s clear the place so we can properly loot.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/end.png"
        },
        "next": "25enemies_end"
    },
    "25enemies_end": {
        "type": "kill",
        "match": {
            "mode": "preset_entity_check",
            "match": "hostile",
            "dimension_match": "minecraft:the_end"
        },
        "reward": [
            32,
            37,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:25enemies_end",
        "count": 25,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Great job! Now it`s time to loot what these chests have to offer",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/end.png"
        },
        "next": "locate_end_catacombs"
    },
    "locate_end_catacombs": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:outer_end_catacombs_trigger"
        },
        "reward": [
            0,
            16,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:locate_end_catacombs",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Amazing. Let`s clear the place so we can properly loot.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/end.png"
        },
        "next": "50enemies_2end"
    },
    "50enemies_2end": {
        "type": "kill",
        "match": {
            "mode": "preset_entity_check",
            "match": "hostile",
            "dimension_match": "minecraft:the_end"
        },
        "reward": [
            0,
            11,
            1,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:50enemies_2end",
        "count": 50,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Great job! Now it`s time to loot what these chests have to offer",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/end.png"
        },
        "next": "locate_end_city"
    },
    "locate_end_city": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:minecraft_end_city_trigger"
        },
        "reward": [
            0,
            16,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:locate_end_city",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "What a structure! Let`s hope for an Elytra!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/end.png"
        },
        "next": "get_dragon_head"
    },
    "get_dragon_head": {
        "type": "obtain_item",
        "match": {
            "mode": "exact",
            "match_id": "minecraft:dragon_head"
        },
        "reward": [
            0,
            32,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:get_dragon_head",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Great! Just think about the recipes we could fill with this.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/end.png"
        },
        "next": "get_draconic_backpack"
    },
    "get_draconic_backpack": {
        "type": "obtain_item",
        "match": {
            "mode": "exact",
            "match_id": "sophisticatedbackpacks:netherite_backpack"
        },
        "reward": [
            0,
            32,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:get_draconic_backpack",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Great! This is the best Backpack of the world. Did you knew you can upgrade your backpack to have workbenches?",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/end.png"
        },
        "next": "75combatlvl"
    },
    "75combatlvl": {
        "type": "reach_level",
        "match": {
            "mode": "check_level",
            "skill": "combat"
        },
        "reward": [
            55,
            5,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:75combatlvl",
        "count": 75,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Your combat skills are improving. Keep it up!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/end.png"
        },
        "next": "get_tier_7_power_up"
    },
    "get_tier_7_power_up": {
        "type": "obtain_item",
        "match": {
            "mode": "startswith",
            "match_id": "kubejs:tier_7"
        },
        "reward": [
            0,
            32,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:get_tier_7_power_up",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Great! Apply those to your armor to become stronger!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/undergarden.png"
        },
        "next": "locate_obsidilith_arena"
    },
    "locate_obsidilith_arena": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:bosses_of_mass_destruction_obsidilith_arena_trigger"
        },
        "reward": [
            0,
            16,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:locate_obsidilith_arena",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Perfect! Now time to face the evil. Did you brought a pickaxe? Tho i think we need an Ender Eye..",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/end.png"
        },
        "next": "defeat_obsidilith"
    },
    "defeat_obsidilith": {
        "type": "kill",
        "match": {
            "mode": "exact",
            "match": "bosses_of_mass_destruction:obsidilith"
        },
        "reward": [
            0,
            22,
            2,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:defeat_obsidilith",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Impressive results. Now grow stronger as we have new realms to free.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/end.png"
        },
        "next": "80combatlvl"
    },
    "80combatlvl": {
        "type": "reach_level",
        "match": {
            "mode": "check_level",
            "skill": "combat"
        },
        "reward": [
            16,
            6,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:80combatlvl",
        "count": 80,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Your combat skills are improving. Keep it up!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/end.png"
        },
        "next": "travel_end_to_overworld"
    },
    "travel_end_to_overworld": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:minecraft_overworld_trigger"
        },
        "reward": [
            0,
            31,
            1,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:travel_end_to_overworld",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Welcome back home, but adventure continues. The following dimension we shall visit is The Nether",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "delayNext": 200,
        "next": "locate_ancient_city"
    },
    "locate_ancient_city": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:minecraft_ancient_city_trigger"
        },
        "reward": [
            0,
            32,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:locate_ancient_city",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Fantastic, now make some noise to wake up the fallen.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "next": "defeat_the_warden"
    },
    "defeat_the_warden": {
        "type": "kill",
        "match": {
            "mode": "exact",
            "match": "minecraft:warden"
        },
        "reward": [
            0,
            8,
            3,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:defeat_the_warden",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Astonishing! Check the loot bag, you can get an arc from him that can turn you invisible! Remember, you could get a better one from the enemy",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "next": "get_depth_key"
    },
    "get_depth_key": {
        "type": "obtain_item",
        "match": {
            "mode": "exact",
            "match_id": "callfromthedepth_:depth"
        },
        "reward": [
            0,
            0,
            1,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:get_depth_key",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Great! Now See that massive rectangle? That`s the portal!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "next": "travel_to_depth"
    },
    "travel_to_depth": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:callfromthedepth__depth_trigger"
        },
        "reward": [
            0,
            62,
            2,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:travel_to_depth",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Welcome to the Depth. This realm is anything but friendly. You might need new gear to see better around.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/depth.png"
        },
        "delayNext": 200,
        "next": "50enemies_depth"
    },
    "50enemies_depth": {
        "type": "kill",
        "match": {
            "mode": "preset_entity_check",
            "match": "hostile",
            "dimension_match": "callfromthedepth_:depth"
        },
        "reward": [
            0,
            36,
            1,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:50enemies_depth",
        "count": 50,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Great job! Now it`s time to loot around. What did we gathered?",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/depth.png"
        },
        "next": "get_agony_soul"
    },
    "get_agony_soul": {
        "type": "obtain_item",
        "match": {
            "mode": "exact",
            "match_id": "callfromthedepth_:soulinagony"
        },
        "reward": [
            0,
            0,
            1,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:get_agony_soul",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Perfect! Now use it on the Stone of Sacrificial to revive the Agony Soul",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/depth.png"
        },
        "next": "defeat_agony_soul"
    },
    "defeat_agony_soul": {
        "type": "kill",
        "match": {
            "mode": "exact",
            "match": "callfromthedepth_:agonysoul"
        },
        "reward": [
            0,
            8,
            3,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:defeat_agony_soul",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Good job! Use the lotted gear to become stronger!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/depth.png"
        },
        "next": "get_tier_8_power_up"
    },
    "get_tier_8_power_up": {
        "type": "obtain_item",
        "match": {
            "mode": "startswith",
            "match_id": "kubejs:tier_8"
        },
        "reward": [
            0,
            0,
            1,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:get_tier_8_power_up",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Great! Apply those to your armor to become stronger!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/undergarden.png"
        },
        "next": "83combatlvl"
    },
    "83combatlvl": {
        "type": "reach_level",
        "match": {
            "mode": "check_level",
            "skill": "combat"
        },
        "reward": [
            31,
            6,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:83combatlvl",
        "count": 83,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Your combat skills are improving. Keep it up!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/depth.png"
        },
        "next": "locate_marble_forge"
    },
    "locate_marble_forge": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:callfromthedepth__marblesoulforge_trigger"
        },
        "reward": [
            0,
            32,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:locate_marble_forge",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Good job! Now we can need to get the Weeping Soul to ressurect the Injured Marble Guard",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/depth.png"
        },
        "next": "get_weeping_soul"
    },
    "get_weeping_soul": {
        "type": "obtain_item",
        "match": {
            "mode": "exact",
            "match_id": "callfromthedepth_:weepingsoul"
        },
        "reward": [
            0,
            0,
            1,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:get_weeping_soul",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Perfect! Now use it on the Stone of Sacrificial to revive the Injured Marble Guardian",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/depth.png"
        },
        "next": "defeat_injured_marble_guardian"
    },
    "defeat_injured_marble_guardian": {
        "type": "kill",
        "match": {
            "mode": "exact",
            "match": "callfromthedepth_:injuredmarbleguard"
        },
        "reward": [
            0,
            8,
            3,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:defeat_injured_marble_guardian",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Good job! Use the lotted gear to become stronger!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/depth.png"
        },
        "next": "86combatlvl"
    },
    "86combatlvl": {
        "type": "reach_level",
        "match": {
            "mode": "check_level",
            "skill": "combat"
        },
        "reward": [
            46,
            6,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:86combatlvl",
        "count": 86,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Your combat skills are improving. Keep it up!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/depth.png"
        },
        "next": "locate_deep_darkest_altar"
    },
    "locate_deep_darkest_altar": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:callfromthedepth__deepdarkestaltar_trigger"
        },
        "reward": [
            0,
            32,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:locate_deep_darkest_altar",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Good job! Now we can need to get the Deadblind Soul to ressurect the Deep Darkest Spawn.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/depth.png"
        },
        "next": "get_deadblind_soul"
    },
    "get_deadblind_soul": {
        "type": "obtain_item",
        "match": {
            "mode": "exact",
            "match_id": "callfromthedepth_:deadblindsoul"
        },
        "reward": [
            0,
            0,
            1,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:get_deadblind_soul",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Perfect! Now use it on the Stone of Sacrificial to revive the Deep Darkest Spawn",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/depth.png"
        },
        "next": "defeat_depp_darkest_spawn"
    },
    "defeat_depp_darkest_spawn": {
        "type": "kill",
        "match": {
            "mode": "exact",
            "match": "callfromthedepth_:deepdarkestspwansecondphase"
        },
        "reward": [
            0,
            8,
            3,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:defeat_depp_darkest_spawn",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Good job! Use the lotted gear to become stronger!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/depth.png"
        },
        "next": "100enemies_depth"
    },
    "100enemies_depth": {
        "type": "kill",
        "match": {
            "mode": "preset_entity_check",
            "match": "hostile",
            "dimension_match": "callfromthedepth_:depth"
        },
        "reward": [
            0,
            8,
            3,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:100enemies_depth",
        "count": 100,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Great job! Now it`s time to loot around. What did we gathered?",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/depth.png"
        },
        "next": "90combatlvl"
    },
    "90combatlvl": {
        "type": "reach_level",
        "match": {
            "mode": "check_level",
            "skill": "combat"
        },
        "reward": [
            2,
            7,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:90combatlvl",
        "count": 90,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Your combat skills are improving. Keep it up!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/depth.png"
        },
        "next": "travel_depth_to_overworld"
    },
    "travel_depth_to_overworld": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:minecraft_overworld_trigger"
        },
        "reward": [
            0,
            62,
            2,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:travel_depth_to_overworld",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Welcome back home, but adventure continues. There is one more obscure place to visit.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "delayNext": 200,
        "next": "obtain_loran"
    },
    "obtain_loran": {
        "type": "obtain_item",
        "match": {
            "mode": "exact",
            "match_id": "theabyss:loran"
        },
        "reward": [
            0,
            32,
            1,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:obtain_loran",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Great job! Now it`s tiem to get your hands on some Unsable Obsidian.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "next": "obtain_unstable_obsidian"
    },
    "obtain_unstable_obsidian": {
        "type": "obtain_item",
        "match": {
            "mode": "exact",
            "match_id": "theabyss:unstable_obsidian"
        },
        "reward": [
            0,
            32,
            1,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:obtain_unstable_obsidian",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Great! Now you can make a portal out of it, so craft some more to get the first leap towards The Abyss",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "next": "obtain_abyss_portal_activator"
    },
    "obtain_abyss_portal_activator": {
        "type": "obtain_item",
        "match": {
            "mode": "exact",
            "match_id": "theabyss:the_abyss"
        },
        "reward": [
            0,
            32,
            1,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:obtain_abyss_portal_activator",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Great job! Now use with on the Unstable Obisidian to travel further.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/overworld.png"
        },
        "next": "travel_to_abyss"
    },
    "travel_to_abyss": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:theabyss_the_abyss_trigger"
        },
        "reward": [
            0,
            60,
            5,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:travel_to_abyss",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Welcome to the high sky! Make sure not to tip over the edges of these islands as there is just abyss downwards.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/abyss.png"
        },
        "delayNext": 200,
        "next": "locate_abyss_arena_magician"
    },
    "locate_abyss_arena_magician": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:abyss_arena_arena_magician_trigger"
        },
        "reward": [
            0,
            48,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:locate_abyss_arena_magician",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "You`ve found the Magician`s domain. Prepare for battle.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/abyss.png"
        },
        "next": "obtain_magician_crystal"
    },
    "obtain_magician_crystal": {
        "type": "obtain_item",
        "match": {
            "mode": "exact",
            "match_id": "theabyss:magician_crystal"
        },
        "reward": [
            0,
            32,
            1,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:obtain_magician_crystal",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Perfect! Now let`s use it to summon the enemy",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/abyss.png"
        },
        "next": "defeat_abyss_arena_magician"
    },
    "defeat_abyss_arena_magician": {
        "type": "kill",
        "match": {
            "mode": "exact",
            "match": "theabyss:magician"
        },
        "reward": [
            0,
            44,
            4,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:defeat_abyss_arena_magician",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Well done defeating the Magician! Now claim the Magic Core.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/abyss.png"
        },
        "next": "obtain_magic_core"
    },
    "obtain_magic_core": {
        "type": "obtain_item",
        "match": {
            "mode": "exact",
            "match_id": "theabyss:magic_core"
        },
        "reward": [
            0,
            32,
            1,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:obtain_magic_core",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "The Magic Core is in your possession. One step closer to the Eye of Abyss.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/abyss.png"
        },
        "next": "92combatlvl"
    },
    "92combatlvl": {
        "type": "reach_level",
        "match": {
            "mode": "check_level",
            "skill": "combat"
        },
        "reward": [
            12,
            7,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:92combatlvl",
        "count": 92,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Your combat skills are improving. Keep it up!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/abyss.png"
        },
        "next": "locate_abyss_arena_elder"
    },
    "locate_abyss_arena_elder": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:abyss_arena_arena_elder_trigger"
        },
        "reward": [
            0,
            48,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:locate_abyss_arena_elder",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "You`ve located the Elder`s arena. Brace yourself for the fight.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/abyss.png"
        },
        "next": "obtain_elder_crystal"
    },
    "obtain_elder_crystal": {
        "type": "obtain_item",
        "match": {
            "mode": "exact",
            "match_id": "theabyss:elder_crystal"
        },
        "reward": [
            0,
            32,
            1,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:obtain_elder_crystal",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Perfect! Now let`s use it to summon the enemy",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/abyss.png"
        },
        "next": "defeat_abyss_arena_elder"
    },
    "defeat_abyss_arena_elder": {
        "type": "kill",
        "match": {
            "mode": "exact",
            "match": "theabyss:elder"
        },
        "reward": [
            0,
            44,
            4,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:defeat_abyss_arena_elder",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Impressive victory over the Elder! Secure the Elder Eye.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/abyss.png"
        },
        "next": "obtain_elder_eye"
    },
    "obtain_elder_eye": {
        "type": "obtain_item",
        "match": {
            "mode": "exact",
            "match_id": "theabyss:elder_eye"
        },
        "reward": [
            0,
            32,
            1,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:obtain_elder_eye",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "The Elder Eye is yours. Continue gathering the artifacts.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/abyss.png"
        },
        "next": "place_arcane_workbench"
    },
    "place_arcane_workbench": {
        "type": "place_block",
        "match": {
            "mode": "exact",
            "match_id": "theabyss:arcane_workbench"
        },
        "reward": [
            0,
            0,
            1,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:place_arcane_workbench",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Amazing! It`s time to explore the vastness of recipies we could to with Somnium",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/abyss.png"
        },
        "next": "get_tier_9_power_up"
    },
    "get_tier_9_power_up": {
        "type": "obtain_item",
        "match": {
            "mode": "startswith",
            "match_id": "kubejs:tier_9"
        },
        "reward": [
            0,
            32,
            1,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:get_tier_9_power_up",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Great! Apply those to your armor to become stronger!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/undergarden.png"
        },
        "next": "94combatlvl"
    },
    "94combatlvl": {
        "type": "reach_level",
        "match": {
            "mode": "check_level",
            "skill": "combat"
        },
        "reward": [
            22,
            7,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:94combatlvl",
        "count": 94,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Your combat skills are improving. Keep it up!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/abyss.png"
        },
        "next": "locate_abyss_arena_abyssaur"
    },
    "locate_abyss_arena_abyssaur": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:abyss_arena_arena_abyssaur_trigger"
        },
        "reward": [
            0,
            48,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:locate_abyss_arena_abyssaur",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "The Abyssaur`s colosseum is found. Prepare for a dizzying battle.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/abyss.png"
        },
        "next": "obtain_abyssaur_crystal"
    },
    "obtain_abyssaur_crystal": {
        "type": "obtain_item",
        "match": {
            "mode": "exact",
            "match_id": "theabyss:abyssaur_crystal"
        },
        "reward": [
            0,
            32,
            1,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:obtain_abyssaur_crystal",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Perfect! Now let`s use it to summon the enemy",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/abyss.png"
        },
        "next": "defeat_abyss_arena_abyssaur"
    },
    "defeat_abyss_arena_abyssaur": {
        "type": "kill",
        "match": {
            "mode": "exact",
            "match": "theabyss:abyssaur"
        },
        "reward": [
            0,
            44,
            4,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:defeat_abyss_arena_abyssaur",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Great triumph over the Abyssaur! Claim the Prehistoric Claw.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/abyss.png"
        },
        "next": "obtain_prehistoric_claw"
    },
    "obtain_prehistoric_claw": {
        "type": "obtain_item",
        "match": {
            "mode": "exact",
            "match_id": "theabyss:prehistoric_claw"
        },
        "reward": [
            0,
            32,
            1,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:obtain_prehistoric_claw",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "The Prehistoric Claw is secured. You`re making progress.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/abyss.png"
        },
        "next": "96combatlvl"
    },
    "96combatlvl": {
        "type": "reach_level",
        "match": {
            "mode": "check_level",
            "skill": "combat"
        },
        "reward": [
            32,
            7,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:96combatlvl",
        "count": 96,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Your combat skills are improving. Keep it up!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/abyss.png"
        },
        "next": "locate_abyss_arena_roka"
    },
    "locate_abyss_arena_roka": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:abyss_arena_arena_roka_trigger"
        },
        "reward": [
            0,
            48,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:locate_abyss_arena_roka",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "X marks the Roka`s location. Get ready to face the bull.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/abyss.png"
        },
        "next": "obtain_roka_crystal"
    },
    "obtain_roka_crystal": {
        "type": "obtain_item",
        "match": {
            "mode": "exact",
            "match_id": "theabyss:roka_crystal"
        },
        "reward": [
            0,
            32,
            1,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:obtain_roka_crystal",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Perfect! Now let`s use it to summon the enemy",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/abyss.png"
        },
        "next": "defeat_abyss_arena_roka"
    },
    "defeat_abyss_arena_roka": {
        "type": "kill",
        "match": {
            "mode": "exact",
            "match": "theabyss:the_roka"
        },
        "reward": [
            0,
            44,
            4,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:defeat_abyss_arena_roka",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Remarkable defeat of the Roka! Obtain the Roka Horn.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/abyss.png"
        },
        "next": "obtain_roka_horn"
    },
    "obtain_roka_horn": {
        "type": "obtain_item",
        "match": {
            "mode": "exact",
            "match_id": "theabyss:roka_horn"
        },
        "reward": [
            0,
            32,
            1,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:obtain_roka_horn",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "The Roka Horn is yours. Almost all pieces are gathered.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/abyss.png"
        },
        "next": "98combatlvl"
    },
    "98combatlvl": {
        "type": "reach_level",
        "match": {
            "mode": "check_level",
            "skill": "combat"
        },
        "reward": [
            42,
            7,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:98combatlvl",
        "count": 98,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Your combat skills are improving. Keep it up!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/abyss.png"
        },
        "next": "locate_abyss_arena_crystal_golem"
    },
    "locate_abyss_arena_crystal_golem": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:abyss_arena_arena_crystal_golem_trigger"
        },
        "reward": [
            0,
            48,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:locate_abyss_arena_crystal_golem",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "The glass sphere is located. Face the Crystal Golem with caution.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/abyss.png"
        },
        "next": "obtain_crystal_golem_crystal"
    },
    "obtain_crystal_golem_crystal": {
        "type": "obtain_item",
        "match": {
            "mode": "exact",
            "match_id": "theabyss:crystal_golem_crystal"
        },
        "reward": [
            0,
            32,
            1,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:obtain_crystal_golem_crystal",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Perfect! Now let`s use it to summon the enemy",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/abyss.png"
        },
        "next": "defeat_abyss_arena_crystal_golem"
    },
    "defeat_abyss_arena_crystal_golem": {
        "type": "kill",
        "match": {
            "mode": "exact",
            "match": "theabyss:crystal_golem"
        },
        "reward": [
            0,
            44,
            4,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:defeat_abyss_arena_crystal_golem",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Astounding victory! Now collect the Crystal Hand.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/abyss.png"
        },
        "next": "obtain_crystal_hand"
    },
    "obtain_crystal_hand": {
        "type": "obtain_item",
        "match": {
            "mode": "exact",
            "match_id": "theabyss:crystal_hand"
        },
        "reward": [
            0,
            32,
            1,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:obtain_crystal_hand",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "The Crystal Hand is obtained. All artifacts are ready for crafting.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/abyss.png"
        },
        "next": "obtain_eye_of_abyss"
    },
    "obtain_eye_of_abyss": {
        "type": "obtain_item",
        "match": {
            "mode": "exact",
            "match_id": "theabyss:eye_of_abyss"
        },
        "reward": [
            0,
            32,
            1,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:obtain_eye_of_abyss",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Incredible! The Eye of Abyss is complete. Its power will guide you further.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/abyss.png"
        },
        "next": "get_tier_10_power_up"
    },
    "get_tier_10_power_up": {
        "type": "obtain_item",
        "match": {
            "mode": "startswith",
            "match_id": "kubejs:tier_10"
        },
        "reward": [
            0,
            32,
            1,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:get_tier_10_power_up",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Great! Apply those to your armor to become stronger!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/undergarden.png"
        },
        "next": "100combatlvl"
    },
    "100combatlvl": {
        "type": "reach_level",
        "match": {
            "mode": "check_level",
            "skill": "combat"
        },
        "reward": [
            52,
            7,
            0,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:100combatlvl",
        "count": 100,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Your combat skills are improving. Keep it up!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/abyss.png"
        },
        "next": "defeat_nightblade_boss"
    },
    "defeat_nightblade_boss": {
        "type": "kill",
        "match": {
            "mode": "exact",
            "match": "theabyss:nightblade_boss"
        },
        "reward": [
            0,
            44,
            4,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:defeat_nightblade_boss",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Incredible! The Nightblade Boss has fallen. The Abyss grows silent.",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/abyss.png"
        },
        "next": "travel_abyss_to_frost_world"
    },
    "travel_abyss_to_frost_world": {
        "type": "adv_unlock",
        "match": {
            "mode": "exact",
            "match_id": "aaaa_zp4adv:theabyss_frost_world_trigger"
        },
        "reward": [
            0,
            56,
            11,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:travel_abyss_to_frost_world",
        "count": 1,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Amazing! You made it to the last realm. There is nothing here but means to fight! Take care!",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/frost.png"
        },
        "delayNext": 200,
        "next": "100enemies_frost_world"
    },
    "100enemies_frost_world": {
        "type": "kill",
        "match": {
            "mode": "preset_entity_check",
            "match": "hostile",
            "dimension_match": "theabyss:frost_world"
        },
        "reward": [
            0,
            2,
            7,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:100enemies_frost_world",
        "count": 100,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Amazing! There is no effort without a worth reward",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/frost.png"
        },
        "next": "500enemies_frost_world"
    },
    "500enemies_frost_world": {
        "type": "kill",
        "match": {
            "mode": "preset_entity_check",
            "match": "hostile",
            "dimension_match": "theabyss:frost_world"
        },
        "reward": [
            0,
            10,
            35,
            0,
            0
        ],
        "unlock": "aaaa_zp4adv:500enemies_frost_world",
        "count": 500,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Amazing! There is no effort without a worth reward",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/frost.png"
        },
        "next": "1000enemies_frost_world"
    },
    "1000enemies_frost_world": {
        "type": "kill",
        "match": {
            "mode": "preset_entity_check",
            "match": "hostile",
            "dimension_match": "theabyss:frost_world"
        },
        "reward": [
            0,
            20,
            6,
            1,
            0
        ],
        "unlock": "aaaa_zp4adv:1000enemies_frost_world",
        "count": 1000,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Amazing! There is no effort without a worth reward",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/frost.png"
        },
        "next": "10000enemies_frost_world"
    },
    "10000enemies_frost_world": {
        "type": "kill",
        "match": {
            "mode": "preset_entity_check",
            "match": "hostile",
            "dimension_match": "theabyss:frost_world"
        },
        "reward": [
            0,
            8,
            63,
            10,
            0
        ],
        "unlock": "aaaa_zp4adv:10000enemies_frost_world",
        "count": 10000,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Amazing! There is no effort without a worth reward",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/frost.png"
        },
        "next": "20000enemies_frost_world"
    },
    "20000enemies_frost_world": {
        "type": "kill",
        "match": {
            "mode": "preset_entity_check",
            "match": "hostile",
            "dimension_match": "theabyss:frost_world"
        },
        "reward": [
            0,
            16,
            62,
            21,
            0
        ],
        "unlock": "aaaa_zp4adv:20000enemies_frost_world",
        "count": 20000,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Amazing! There is no effort without a worth reward",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/frost.png"
        },
        "next": "50000enemies_frost_world"
    },
    "50000enemies_frost_world": {
        "type": "kill",
        "match": {
            "mode": "preset_entity_check",
            "match": "hostile",
            "dimension_match": "theabyss:frost_world"
        },
        "reward": [
            0,
            40,
            59,
            54,
            0
        ],
        "unlock": "aaaa_zp4adv:50000enemies_frost_world",
        "count": 50000,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Amazing! There is no effort without a worth reward",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/frost.png"
        },
        "next": "100000enemies_frost_world"
    },
    "100000enemies_frost_world": {
        "type": "kill",
        "match": {
            "mode": "preset_entity_check",
            "match": "hostile",
            "dimension_match": "theabyss:frost_world"
        },
        "reward": [
            0,
            16,
            55,
            45,
            1
        ],
        "unlock": "aaaa_zp4adv:100000enemies_frost_world",
        "count": 100000,
        "dialogue": {
            "speaker": "Elder Librarian",
            "message": "Amazing! There is no effort without a worth reward",
            "renderType": "rectangle",
            "renderTarget": "zoompack_images:textures/elder_librarian/frost.png"
        }
    }
}
//QUEST_DATA_END


const questList = Object.keys(QUESTS).map(key => ADV_PREFIX + key);

function getQuestIndex(questKey) {
    const index = questList.indexOf(questKey);
    return index === -1 ? -1 : index;
}

function getFirstKey(obj) {
    return Object.keys(obj)[0];
}

function getLastKey(obj) {
    const keys = Object.keys(obj);
    return keys[keys.length - 1];
}

const FIRST_QUEST = getFirstKey(QUESTS);
const LAST_QUEST = getLastKey(QUESTS);

const lastQuestUpdate = {};
const PROGRESS_DELAY = 1.5;
const PROGRESS_DELAY_TIME = PROGRESS_DELAY * 1000;

function playerQuestProgress(server, player, current, maxQuestProgress) {
    const now = Date.now();
    const playerName = player.name.string;

    const lastTime = lastQuestUpdate[playerName] || 0;


    if (now - lastTime < PROGRESS_DELAY_TIME) return;

    lastQuestUpdate[playerName] = now;

    server.runCommandSilent(
        `/immersivemessages sendcustom ${playerName} {anchor:"CENTER_CENTER", background:1, y:50} ${PROGRESS_DELAY} Quest Progress: ${current}/${maxQuestProgress}`
    );
}

function getPlayerQPDString(player, pd_field) {
    let pd_field_value = player.persistentData.getString(pd_field);
    if (pd_field_value) {
        return pd_field_value;
    }
    else {
        return undefined;
    }
}

function setPlayerQPDString(player, pd_field, pd_field_value) {
    player.persistentData.putString(pd_field, pd_field_value);
}

function getPlayerQPDInt(player, pd_field) {
    let pd_field_value = player.persistentData.getInt(pd_field);
    if (pd_field_value) {
        return pd_field_value;
    }
    else {
        return 0;
    }
}

function sendDialogueToPlayer(player, speaker, message, renderType, renderTarget) {
    let tag = new $CompoundTag();

    let dialogueData = {
        speaker: speaker,
        message: message,
        renderType: renderType,
        renderTarget: renderTarget
    };

    tag.putString('dialogueData', JSON.stringify(dialogueData));
    player.sendData('dialogue:chat', tag);
}

function setPlayerQPDInt(player, pd_field, pd_field_value) {
    player.persistentData.putInt(pd_field, pd_field_value);
}

function increasePlayerQuestProgress(player) {
    let newProgress = getPlayerQPDInt(player, ACTIVE_QUEST_PROGRESS_PD_FIELD) + 1;
    setPlayerQPDInt(player, ACTIVE_QUEST_PROGRESS_PD_FIELD, newProgress);
    return newProgress;
}

function setPlayerQuestProgress(player, progress) {
    setPlayerQPDInt(player, ACTIVE_QUEST_PROGRESS_PD_FIELD, progress);
}

function getPlayerQuestProgress(player) {
    return getPlayerQPDInt(player, ACTIVE_QUEST_PROGRESS_PD_FIELD);
}

function getPlayerProgression(player) {
    return getPlayerQPDInt(player, ACTIVE_QUEST_PROGRESS_PD_FIELD);
}

function getPlayerQuest(player) {
    return getPlayerQPDString(player, ACTIVE_QUEST_PD_FIELD);
}

function setPlayerQuest(player, quest) {
    setPlayerQPDString(player, ACTIVE_QUEST_PD_FIELD, quest);
    setPlayerQPDInt(player, ACTIVE_QUEST_PROGRESS_PD_FIELD, 0);
}

function sendPlayerQuestToTrack(player, advancementId) {
    let tag = new $CompoundTag;
    tag.putString('advancement_id', advancementId);
    player.sendData('advancements:track_id', tag);
}

function sendPlayerQuestsToTrack(player, advancementIds) {
    let tag = new $CompoundTag;
    tag.putString('advancement_ids', JSON.stringify(advancementIds));
    player.sendData('advancements:track_ids', tag);
}

function sendPlayerQuestToUntrack(player, advancementId) {
    let tag = new $CompoundTag;
    tag.putString('advancement_id', advancementId);
    player.sendData('advancements:untrack_id', tag);
}

function sendPlayerQuestsToUntrack(player, advancementIds) {
    let tag = new $CompoundTag;
    tag.putString('advancement_ids', JSON.stringify(advancementIds));
    player.sendData('advancements:untrack_ids', tag);
}

function sendPlayerQuestTrackData(player, toTrack, toUntrack) {
    let tag = new $CompoundTag();

    let trackingData = {
        toTrack: toTrack,
        toUntrack: toUntrack
    };

    tag.putString('trackingData', JSON.stringify(trackingData));
    player.sendData('advancements:track_untrack_ids', tag);
}


function doesQuestExist(questId) {
    return QUESTS.hasOwnProperty(questId);
}

function grantServerPlayerAdvancement(server, player, advancement_id) {
    server.runCommandSilent(`advancement grant ${player.getName().getString()} only ${advancement_id}`)
}

function revokeServerPlayerAdvancement(server, player, advancement_id) {
    server.runCommandSilent(`advancement revoke ${player.getName().getString()} only ${advancement_id}`)
}


function fixWrongPlayerData(player, activeQuest) {
    if (!doesQuestExist(activeQuest) || activeQuest == undefined) {
        setPlayerQuest(player, FIRST_QUEST);
        return true;
    }
    return false;
}

//EVENT_TYPES
const ENTITY_EVENTS_DEATH = 0;
const ENTITY_EVENTS_HURT = 1;
const BLOCK_EVENTS_BROKEN = 2;
const BLOCK_EVENTS_PLACED = 3;
const PLAYER_EVENTS_INVENTORY_CHANGED = 4;
const PLAYER_EVENTS_ADVANCEMENT = 5;
const ITEM_EVENTS_PICKED_UP = 6;

function questEvent(event, eventType) {
    const { server } = event;
    let player = null;
    let eventEntity = null;

    if (event.player) {
        player = event.player;
    }
    else {
        if (event.source) {
            player = event.source.player;
        }
    }

    if (event.entity) {
        eventEntity = event.entity;
    }

    if (eventType == ENTITY_EVENTS_HURT) {
        if (event.source.getType() !== 'player') {
            return 0;
        }
        // player.tell("se duce in pl?")
        // if (event.entity.type != 'minecraft:player') {
        //     player.tell("da!")
        //     return 0;
        // }
    }


    // TODO: might be worth to cache these ones

    if (!player) {
        return 0;
    }

    let activeQuest = getPlayerQuest(player);
    let activeQuestProgress = getPlayerProgression(player);

    // player.tell(activeQuest);
    // player.tell(activeQuestProgress);

    if (activeQuest && activeQuestProgress >= 0) {
        if (!doesQuestExist(activeQuest)) {
            setPlayerQuest(FIRST_QUEST);
            activeQuest = FIRST_QUEST;
            activeQuestProgress = 0;
        }

        let questData = QUESTS[activeQuest];
        let eventMatch = false;
        let advancementUnlocked = false;
        let increment = true;

        // player.tell(activeQuest);
        // player.tell(activeQuestProgress);

        if (
            activeQuestProgress >= 0 &&
            activeQuestProgress < questData.count &&
            (activeQuest !== LAST_QUEST || activeQuestProgress < questData.count)
        ) {

            if (eventType == PLAYER_EVENTS_ADVANCEMENT) {
                const { advancement } = event;
                let advancementId = advancement.getId().toString();

                if (questData.type == 'adv_unlock') {
                    if (questData.hasOwnProperty('match')) {
                        if (questData.match.mode == 'exact') {
                            if (questData.match.match_id == advancementId) {
                                eventMatch = true;
                            }
                        }


                        if (questData.match.mode == 'any') {
                            if (questData.match.hasOwnProperty('match_ids')) {
                                if (questData.match.match_ids.includes(advancementId)) {
                                    eventMatch = true;
                                }
                            }
                        }

                        if (questData.match.hasOwnProperty('revoke')) {
                            if (questData.match.revoke) {
                                revokeServerPlayerAdvancement(server, player, advancementId);
                            }
                        }
                    }
                }
            }

            if (eventType == PLAYER_EVENTS_INVENTORY_CHANGED) {
                let item = event.getItem();
                let item_id = item.item.getId();

                if (questData.type == 'obtain_item') {
                    if (questData.hasOwnProperty('match')) {
                        if (questData.match.mode == 'exact') {
                            if (item_id == questData.match.match_id) {
                                if (questData.count > 1) {
                                    setPlayerQuestProgress(player, item.getCount());
                                    eventMatch = true;
                                }
                                else {
                                    eventMatch = true;
                                }
                            }
                        }

                        if (questData.match.mode == 'endswith') {
                            if (item_id.endsWith(questData.match.match_id)) {
                                eventMatch = true;
                            }
                        }

                        if (questData.match.mode == 'startswith') {
                            if (item_id.startsWith(questData.match.match_id)) {
                                eventMatch = true;
                            }
                        }

                        if (questData.match.mode == 'nbt_data_includes') {
                            let compoundToMatch = questData.match.match_id;
                            let itemItem = event.getItem();
                            let compoundDataMatch = itemItem.nbt.getCompound(compoundToMatch);
                            let keysLen = Object.keys(compoundDataMatch).length;

                            if (compoundDataMatch && compoundDataMatch != {} && keysLen > 0) {
                                if (questData.match.hasOwnProperty('sub_match')) {
                                    let sub_match_id = questData.match.sub_match.match_id;
                                    let sub_match_data = compoundDataMatch[sub_match_id];

                                    if (questData.match.sub_match.match == 'item_id_match') {
                                        if (item_id == sub_match_id) {
                                            eventMatch = true;
                                        }
                                    }

                                    if (sub_match_data) {
                                        if (questData.match.sub_match.match == 'nbt_data_ge_count') {
                                            if (sub_match_data >= questData.count) {
                                                eventMatch = true;
                                            }
                                        }
                                    }
                                }
                                else {
                                    eventMatch = true;
                                }


                            }
                        }
                    }
                }
                // let itemItem = event.getItem();
                // let item_id = item.getId();
                // let isbSpells = item.nbt.getCompound('ZUpgradeData');

            }

            if (eventType == BLOCK_EVENTS_BROKEN) {
                if (questData.type == 'break_block') {
                    const { block } = event;
                    if (questData.hasOwnProperty('match')) {
                        if (questData.match.mode == 'endswith') {
                            if (block.id.endsWith(questData.match.match_id)) {
                                eventMatch = true;
                            }
                        }
                        if (questData.match.mode == 'startswith') {
                            if (block.id.startsWith(questData.match.match_id)) {
                                eventMatch = true;
                            }
                        }
                    }
                }
            }

            if (eventType == BLOCK_EVENTS_PLACED) {
                if (questData.type == 'place_block') {
                    const { block } = event;
                    if (questData.hasOwnProperty('match')) {
                        if (questData.match.mode == 'exact') {
                            if (block.id == questData.match.match_id) {
                                eventMatch = true;
                            }
                        }
                        if (questData.match.mode == 'any') {
                            for (const match_id of questData.match.match_ids) {
                                if (match_id == block.id) {
                                    eventMatch = true;
                                    break;
                                }
                            }
                        }
                    }
                }
            }


            if (eventType == ENTITY_EVENTS_HURT) {
                if (questData.type == 'reach_level') {
                    if (questData.hasOwnProperty('match')) {
                        let skillToGet = questData.match.skill;
                        let playerSkillLevel = getPlayerSkill(player, skillToGet);
                        activeQuestProgress = playerSkillLevel;
                        setPlayerQuestProgress(player, playerSkillLevel);
                        eventMatch = true;
                        increment = false;
                    }
                }
            }


            if (eventType == ENTITY_EVENTS_DEATH) {
                // player.tell(activeQuestProgress);

                if (questData.type == 'kill') {
                    const { entity } = event;

                    if (entity.getType() != 'minecraft:player') {
                        let dimensionOk = true;

                        if (questData.hasOwnProperty('match')) {
                            if (questData.match.hasOwnProperty('dimension_match')) {
                                dimensionOk = entity.level.dimension.toString() == questData.match.dimension_match;
                            }

                            if (questData.match.mode == 'preset_entity_check') {


                                if (questData.match.match == 'hostile' && dimensionOk) {
                                    if (isEntityHostile(entity)) {
                                        eventMatch = true;
                                    }
                                }

                                if (questData.match.match == 'passive' && dimensionOk) {
                                    if (!isEntityHostile(entity)) {
                                        eventMatch = true;
                                    }
                                }

                                if (questData.match.match == 'boss' && dimensionOk) {
                                    if (isEMobBoss(entity)) {
                                        eventMatch = true;
                                    }
                                }


                            }

                            if (questData.match.mode == 'exact') {
                                if (questData.match.hasOwnProperty('match')) {
                                    if (questData.match.match == entity.getType()) {
                                        eventMatch = true;
                                    }
                                }
                            }
                        }

                    }
                }
            }

            // if (eventType == PLAYER_EVENTS_ADVANCEMENT) {
            //     if (questData.type == 'obtain_item') {
            //         const { advancement } = event;
            //         let advancementId = advancement.getId().toString();

            //         if (advancementId == questData.unlock) {
            //             advancementUnlocked = true;
            //             eventMatch = true;
            //         }

            //         // if match
            //     }

            // }

            if (increment) {
                if (eventMatch && activeQuestProgress >= 0) {
                    activeQuestProgress = increasePlayerQuestProgress(player);
                    if (activeQuestProgress < questData.count) {
                        playerQuestProgress(server, player, activeQuestProgress, questData.count)
                    }
                }
            }


            // player.tell(`${activeQuestProgress}/${questData.count}`)

            if (activeQuestProgress >= questData.count) {
                if (!advancementUnlocked) {
                    grantServerPlayerAdvancement(server, player, questData.unlock);
                }

                if (questData.hasOwnProperty('next')) {
                    setPlayerQuest(player, questData.next);
                }
            }
        }
    }
    else {
        if (activeQuestProgress != -1) {
            fixWrongPlayerData(player, activeQuest);
        }
    }
}


EntityEvents.death(event => { questEvent(event, ENTITY_EVENTS_DEATH) });
EntityEvents.hurt(event => { questEvent(event, ENTITY_EVENTS_HURT) });
BlockEvents.broken(event => { questEvent(event, BLOCK_EVENTS_BROKEN) });
BlockEvents.placed(event => { questEvent(event, BLOCK_EVENTS_PLACED) });
PlayerEvents.inventoryChanged(event => { questEvent(event, PLAYER_EVENTS_INVENTORY_CHANGED) });
ItemEvents.pickedUp(event => { questEvent(event, ITEM_EVENTS_PICKED_UP) })


function matchQuestDataByAdvId(advancement_id) {
    for (const quest of Object.keys(QUESTS)) {
        let questData = QUESTS[quest];
        if (questData.unlock == advancement_id) {
            return questData;
        }
    }
    return null;
}

//INSTA_REVOKE_DATA_START
const INSTA_REVOKE_ADVS_PY = ["aaaa_zp4adv:minecraft_hero_of_the_village_trigger", "aaaa_zp4adv:zoompack_economy_bank_trigger", "aaaa_zp4adv:blue_skies_gatekeeper_house_mountain_trigger", "aaaa_zp4adv:blue_skies_gatekeeper_house_plains_trigger", "aaaa_zp4adv:blue_skies_gatekeeper_house_snowy_trigger", "aaaa_zp4adv:blue_skies_everbright_trigger", "aaaa_zp4adv:blue_skies_everbright_blinding_dungeon_trigger", "aaaa_zp4adv:blue_skies_nature_dungeon_trigger", "aaaa_zp4adv:minecraft_overworld_trigger", "aaaa_zp4adv:blue_skies_everdawn_trigger", "aaaa_zp4adv:blue_skies_everdawn_blinding_dungeon_trigger", "aaaa_zp4adv:blue_skies_poison_dungeon_trigger", "aaaa_zp4adv:minecraft_overworld_trigger", "aaaa_zp4adv:aether_the_aether_trigger", "aaaa_zp4adv:aether_bronze_dungeon_trigger", "aaaa_zp4adv:aether_silver_dungeon_trigger", "aaaa_zp4adv:aether_gold_dungeon_trigger", "aaaa_zp4adv:lost_aether_content_platinum_dungeon_trigger", "aaaa_zp4adv:minecraft_overworld_trigger", "aaaa_zp4adv:minecraft_the_nether_trigger", "aaaa_zp4adv:betterfortresses_fortress_trigger", "aaaa_zp4adv:minecraft_bastion_remnant_trigger", "aaaa_zp4adv:betternether_nether_city_trigger", "aaaa_zp4adv:bosses_of_mass_destruction_gauntlet_arena_trigger", "aaaa_zp4adv:minecraft_overworld_trigger", "aaaa_zp4adv:undergarden_undergarden_trigger", "aaaa_zp4adv:undergarden_catacombs_trigger", "aaaa_zp4adv:mokels_boss_mantyd_kinoras_garden_trigger", "aaaa_zp4adv:call_of_yucutan_deadly_crypt_trigger", "aaaa_zp4adv:call_of_yucutan_overgrown_temple_trigger", "aaaa_zp4adv:minecraft_overworld_trigger", "aaaa_zp4adv:betterstrongholds_stronghold_trigger", "aaaa_zp4adv:minecraft_the_end_trigger", "aaaa_zp4adv:outer_end_end_tower_trigger", "aaaa_zp4adv:outer_end_catacombs_trigger", "aaaa_zp4adv:minecraft_end_city_trigger", "aaaa_zp4adv:bosses_of_mass_destruction_obsidilith_arena_trigger", "aaaa_zp4adv:minecraft_overworld_trigger", "aaaa_zp4adv:minecraft_ancient_city_trigger", "aaaa_zp4adv:callfromthedepth__depth_trigger", "aaaa_zp4adv:callfromthedepth__marblesoulforge_trigger", "aaaa_zp4adv:callfromthedepth__deepdarkestaltar_trigger", "aaaa_zp4adv:minecraft_overworld_trigger", "aaaa_zp4adv:theabyss_the_abyss_trigger", "aaaa_zp4adv:abyss_arena_arena_magician_trigger", "aaaa_zp4adv:abyss_arena_arena_elder_trigger", "aaaa_zp4adv:abyss_arena_arena_abyssaur_trigger", "aaaa_zp4adv:abyss_arena_arena_roka_trigger", "aaaa_zp4adv:abyss_arena_arena_crystal_golem_trigger", "aaaa_zp4adv:theabyss_frost_world_trigger"]
//INSTA_REVOKE_DATA_END

// const INSTA_REVOKE_ADVS = ['aaaa_zp4adv:win_raid_loop'].concat(INSTA_REVOKE_ADVS_PY);
const INSTA_REVOKE_ADVS = [].concat(INSTA_REVOKE_ADVS_PY);


PlayerEvents.advancement(event => {
    const { player, advancement, server } = event;
    let advancementId = advancement.getId().toString();

    // let questIndex = getQuestIndex(advancementId);
    // if (questIndex >= 0) {
    //     let activeQuest = getPlayerQuest(player);
    //     if (questIndex > questList[getQuestIndex(`${ADV_PREFIX}${activeQuest}`)]) {
    //         event.cancel();
    //         return 0;
    //     }
    // }
    questEvent(event, PLAYER_EVENTS_ADVANCEMENT);

    if (advancementId.includes(ADV_NAMESPACE)) {
        if (INSTA_REVOKE_ADVS.includes(advancementId)) {
            revokeServerPlayerAdvancement(server, player, advancementId);
        }
        else {

            let questData = matchQuestDataByAdvId(advancementId);
            if (questData) {
                if (questData.next) {
                    grantQuestReward(questData.reward, player, server);
                    if (questData.hasOwnProperty('delayNext')) {
                        server.scheduleInTicks(questData.delayNext, callback => {
                            sendPlayerQuestToTrack(player, QUESTS[questData.next].unlock);
                        });
                    }
                    else {
                        sendPlayerQuestToTrack(player, QUESTS[questData.next].unlock);
                    }


                }
                if (questData.hasOwnProperty('dialogue')) {
                    sendDialogueToPlayer(player, questData.dialogue.speaker, questData.dialogue.message, questData.dialogue.renderType, questData.dialogue.renderTarget);
                }
            }
        }

    }
});















global.playerTracker = {};

function getPlayerLocationData(player) {
    return {
        x: player.getX(),
        y: player.getY(),
        z: player.getZ()
    };
}

PlayerEvents.loggedIn(event => {
    const { player, server } = event;
    const uuid = player.uuid;
    if (!global.playerTracker) global.playerTracker = {};
    global.playerTracker[uuid] = {
        lastLocation: getPlayerLocationData(player),
        isTracked: true
    };

    grantServerPlayerAdvancement(server, player, 'aaaa_zp4adv:root');

    let activeQuest = getPlayerQuest(player);
    let activeQuestProgress = getPlayerProgression(player);

    if (activeQuest == undefined) {
        setPlayerQuest(player, FIRST_QUEST);
        sendPlayerQuestToTrack(player, QUESTS[FIRST_QUEST].unlock)
    }
    else {
        if (activeQuestProgress >= 0) {
            server.scheduleInTicks(100, () => {
                sendPlayerQuestToTrack(player, QUESTS[activeQuest].unlock)
            });
        }
    }

});

PlayerEvents.loggedOut(event => {
    const { player, server } = event;
    const uuid = player.uuid;
    if (global.playerTracker && global.playerTracker[uuid]) {
        delete global.playerTracker[uuid];
    }
});

function trackPlayers(event) {
    event.server.scheduleInTicks(40, callback => {
        event.server.players.forEach(player => {
            const uuid = player.uuid;
            if (!global.playerTracker) global.playerTracker = {};
            if (!global.playerTracker[uuid]) {
                global.playerTracker[uuid] = {
                    lastLocation: getPlayerLocationData(player),
                    isTracked: true
                };
                return;
            }

            const lastLoc = global.playerTracker[uuid].lastLocation;
            const currLoc = getPlayerLocationData(player);

            const moved = Math.abs(currLoc.x - lastLoc.x) >= 2 || Math.abs(currLoc.z - lastLoc.z) >= 2;

            global.playerTracker[uuid].lastLocation = currLoc;

            if (moved && global.playerTracker[uuid].isTracked) {
                grantServerPlayerAdvancement(event.server, player, 'aaaa_zp4adv:root');
                global.playerTracker[uuid].isTracked = false;

                let activeQuest = getPlayerQuest(player);
                let activeQuestProgress = getPlayerProgression(player);

                if (activeQuest == undefined) {
                    setPlayerQuest(player, FIRST_QUEST);
                    sendPlayerQuestToTrack(player, QUESTS[FIRST_QUEST].unlock);
                } else {
                    if (activeQuestProgress >= 0) {
                        sendPlayerQuestToTrack(player, QUESTS[activeQuest].unlock);
                    }
                }
            }
        });

        trackPlayers(event);
    });
}

ServerEvents.loaded(event => {
    trackPlayers(event);
});













// // // TODO: this is just for debug
// ItemEvents.rightClicked('minecraft:stick', event => {
//     const { player, server } = event;

//     // let activeQuest = getPlayerQuest(player);
//     // let activeQuestProgress = getPlayerProgression(player);
//     // player.tell(activeQuest);
//     // player.tell(activeQuestProgress);

//     // sendPlayerQuestToTrack(player, QUESTS[activeQuest].unlock)


//     // setPlayerQuestProgress(player, 9);
//     // player.tell(FIRST_QUEST);

//     let advIdsToUntrack = [];
//     let advIdsToTrack = [QUESTS[FIRST_QUEST].unlock];

//     for (const quest of Object.keys(QUESTS)) {
//         let questData = QUESTS[quest];
//         revokeServerPlayerAdvancement(server, player, questData.unlock);
//         advIdsToUntrack.push(questData.unlock);
//     }


//     sendPlayerQuestTrackData(player, advIdsToTrack, advIdsToUntrack);
//     setPlayerQuest(player, FIRST_QUEST);

//     // setPlayerQuest(player, FIRST_QUEST);
//     // sendPlayerQuestToTrack(player, QUESTS[FIRST_QUEST].unlock)
// });
