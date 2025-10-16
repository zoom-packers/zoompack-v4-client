import json

def get_dimension_change_advancement(root, icon, title, description, dimension_id):
    return {
        "parent": root,
        "criteria": {
            "enter_dimension": {
            "conditions": {
                "to": dimension_id
            },
            "trigger": "minecraft:changed_dimension"
            }
        },
        "display": {
            "announce_to_chat": False,
            "description": {
            "text": description
            },
            "frame": "challenge",
            "hidden": True,
            "icon": {
            "item": icon
            },
            "show_toast": False,
            "title": {
            "text": title
            }
        },
        "requirements": [
            [
            "enter_dimension"
            ]
        ],
        "sends_telemetry_event": False
    }

def get_impossible_advancement(root, icon, title, description, xp_reward):
    return {
        "display": {
            "icon": {
                "item": icon
            },
            "title": title,
            "description": description,
            "frame": "task",
            "show_toast": False,
            "announce_to_chat": True,
            "hidden": False
        },
        "parent": root,
        "criteria": {
            "thecriteria": {
                "trigger": "minecraft:impossible"
            }
        },
        "requirements": [
            [
                "thecriteria"
            ]
        ],
        "rewards": {
            "experience": xp_reward
        },
        "sends_telemetry_event": False
    }

def get_enter_structure_advancement(root, item, title, description, structure_id):
    return {
        "parent": root,
        "criteria": {
            "in_structure": {
            "conditions": {
                "player": [
                {
                    "condition": "minecraft:entity_properties",
                    "entity": "this",
                    "predicate": {
                    "location": {
                        "structure": structure_id
                    }
                    }
                }
                ]
            },
            "trigger": "minecraft:location"
            }
        },
        "display": {
            "announce_to_chat": False,
            "description": {
            "text": description
            },
            "frame": "challenge",
            "hidden": True,
            "icon": {
            "item": item
            },
            "show_toast": False,
            "title": {
            "text": title
            }
        },
        "requirements": [
            [
            "in_structure"
            ]
        ],
        "sends_telemetry_event": False
        }

def get_inventory_changed_advancement(root, icon, title, description, xp_reward, item, count=0):
    advancement = get_impossible_advancement(root, icon, title, description, xp_reward)

    criteria = {
      "trigger": "minecraft:inventory_changed",
      "conditions": {
        "items": [
          {
            "items": [
              item
            ]
          }
        ]
      }
    }

    if count>0:
        criteria['conditions']['items'][0]['count'] = {'min':count}
    
    advancement['criteria']['thecriteria'] = criteria

    return advancement

def write_json_data(path, data):
    with open(path, 'w+') as f:
        f.write(json.dumps(data, indent=4))

def write_json_data(path, data):
    with open(path, 'w+') as f:
        f.write(json.dumps(data, indent=4))


def generate_js_quests(quests_data):
    quest_keys = list(quests_data.keys())
    quests_dict = {}
    for i, key in enumerate(quest_keys):
        data = quests_data[key]
        quest_entry = {
            'type': data['type'],
            'match': data.get('match', {}),
            'unlock': f'aaaa_zp4adv:{key}',
            'count': data['count'],
            'dialogue': {
                'speaker': data['dialogue'].get('speaker', ''),
                'message': data['dialogue'].get('message', ''),
                'renderType': data['dialogue'].get('renderType', '')
            }
        }
        if 'delayNext' in data:
            quest_entry['delayNext'] = data['delayNext']
        if 'renderTarget' in data['dialogue']:
            quest_entry['dialogue']['renderTarget'] = data['dialogue']['renderTarget']
        if i < len(quest_keys) - 1:
            quest_entry['next'] = quest_keys[i+1]
        quests_dict[key] = quest_entry
    return f"const QUESTS = {json.dumps(quests_dict, separators=(',',':'), indent=4)}"

DEFAULT_ITEM = 'kubejs:quest_book'
DEFAULT_ROOT = "aaaa_zp4adv:root"
QUESTS = {
    '20logs': {
        'title': 'TUTORIAL - Get 20 logs',
        'description': 'Everything requires sticks, so gather some wood',
        'xp': 20,
        'type': 'break_block',
        'match': {
            'mode': 'endswith',
            'match_id': '_log'
        },
        'count': 20,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'Great work. Get some tools for yourself and start slaying some enemies.',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/overworld.png'
        }
    },
    '10enemies': {
        'title': 'TUTORIAL - Slay 10 Enemies',
        'description': 'You must get used to combat. So slay some enemies. Fighting gives you Combat XP',
        'xp': 20,
        'type': 'kill',
        'match': {
            'mode': 'preset_entity_check',
            'match': 'hostile'
        },
        'count': 10,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'Looks like you are getting stronger! Remember you are a gatherer, so butcher some animals',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/overworld.png'
        }
    },
    '10farmanimals': {
        'title': 'TUTORIAL - Butcher 10 Farm Animals',
        'description': 'You must get used to gather food. Start with a farm. ',
        'xp': 20,
        'type': 'kill',
        'match': {
            'mode': 'preset_entity_check',
            'match': 'passive'
        },
        'count': 10,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'Good, now you won\'t starve. Continue!',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/overworld.png'
        }
    },
    '10combatlvl': {
        'title': 'TUTORIAL - Reach Combat Lvl 10',
        'description': 'Fight enemies to raise your combat level to at least 10.',
        'xp': 20,
        'type': 'reach_level',
        'match': {
            'mode': 'check_level',
            'skill': 'combat'
        },
        'count': 10,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'Your combat skills are improving. Keep it up!',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/overworld.png'
        }
    },
    'loot_gem': {
        'title': 'TUTORIAL - Loot a Gem',
        'description': 'Pickup a gem from towers across Overworld or from Mobs',
        'xp': 20,
        'type': 'obtain_item',
        'match': {
            'mode': 'exact',
            'match_id': 'apotheosis:gem'
        },
        'count': 1,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'A shiny gem! You can use it to enhance your weaponry on a Smithing Table. Type /gems to find more.',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/overworld.png'
        }
    },
    'crush_gem': {
        'title': 'TUTORIAL - Get some gem dust',
        'description': 'Drop an anvil on gems to crush them into gem dust.',
        'xp': 20,
        'type': 'obtain_item',
        'match': {
            'mode': 'exact',
            'match_id': 'apotheosis:gem_dust'
        },
        'count': 1,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'Crushed it! You can use the dust to craft tables for gems and affixes. Press U while hovering over it.',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/overworld.png'
        }
    },
    'place_salvaging_table': {
        'title': 'TUTORIAL - Get a Salvaging Table',
        'description': 'Place a Salvaging Table. Craft it and use it to get materials.',
        'xp': 20,
        'type': 'place_block',
        'match': {
            'mode': 'exact',
            'match_id': 'apotheosis:salvaging_table'
        },
        'count': 1,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'Salvaging table placed. Time to recycle! Extract affix materials or even ingots.',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/overworld.png'
        }
    },
    'place_simple_reforging_table': {
        'title': 'TUTORIAL - Get a Simple Reforging Table',
        'description': 'Place a Simple Reforging Table on the ground. Use it to upgrade items with affixes. Type /gems to find more.',
        'xp': 20,
        'type': 'place_block',
        'match': {
            'mode': 'exact',
            'match_id': 'apotheosis:simple_reforging_table'
        },
        'count': 1,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'Reforging ready. Enhance your gear! ',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/overworld.png'
        }
    },
    'first_affix_item': {
        'title': 'TUTORIAL - Get an item with Affixes',
        'description': 'Loot or either create an item with Affixes at the Reforging Table',
        'xp': 20,
        'type': 'obtain_item',
        'match': {
            'mode': 'nbt_data_includes',
            'match_id': 'affix_data'
        },
        'count': 1,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'Great! These are all over the world. There are many variations, make sure to equip them to match your playstyle.',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/overworld.png'
        }
    },
    'place_fortunas_anvil': {
        'title': 'TUTORIAL - Get a Fortuna`s Anvil',
        'description': 'Place a Fortuna`s Anvil on the ground. Use it to upgrade your items. Type /fortunas to find out more.',
        'xp': 20,
        'type': 'place_block',
        'match': {
            'mode': 'exact',
            'match_id': 'fortunas_anvil:fortunas_anvil'
        },
        'count': 1,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'Fortuna`s anvil is set. Good luck!',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/overworld.png'
        }
    },
    'use_fortunas_anvil': {
        'title': 'TUTORIAL - Upgrade an item on the Fortuna`s Table',
        'description': '+1 +2 +3 ... For upgrading the gear you need the item, catalyst to boost chance, material to improve gap and protection rune for protection of the item. \nType /fortunas in case you get lost to find out more about the Fortuna`s Table',
        'xp': 20,
        'type': 'obtain_item',
        'match': {
            'mode': 'nbt_data_includes',
            'match_id': 'ZUpgradeData',
            'sub_match':{
                'match' : 'nbt_data_ge_count',
                'match_id' : 'level'
            }
        },
        'count': 1,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'Amazing! Now let`s put your new gear to work to see how it behaves! Hunt down something!',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/overworld.png'
        }
    },
    'craft_bauble_mount': {
        'title': 'TUTORIAL - Get a Bauble Mount',
        'description': 'Get yourself a Bauble for a Mount. Type /mounts to find out more.',
        'xp': 20,
        'type': 'obtain_item',
        'match': {
            'mode': 'exact',
            'match_id': 'baublemounts:mount_bauble'
        },
        'count': 1,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'Great work! Now use that to capture a tamed mount.',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/overworld.png'
        }
    },
    'use_bauble_mount': {
        'title': 'TUTORIAL - Your own personal mount',
        'description': 'Use the Mount Bauble to a tamed mob to make it yours. Type /mounts to find out more.',
        'xp': 20,
        'type': 'obtain_item',
        'match': {
            'mode': 'nbt_data_includes',
            'match_id': 'Mount',
            'sub_match':{
                'match' : 'item_id_match',
                'match_id' : 'baublemounts:mount_bauble'
            }
        },
        'count': 1,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'Amazing! Now you can toggle your mount with the key V. Take care of it!',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/overworld.png'
        }
    },
    '50enemies': {
        'title': 'TUTORIAL - Slay 50 Enemies',
        'description': 'Test your new gear. Let`s see how strong you got.',
        'xp': 20,
        'type': 'kill',
        'match': {
            'mode': 'preset_entity_check',
            'match': 'hostile'
        },
        'count': 50,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': '50 enemies down! You\'re a warrior now.',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/overworld.png'
        }
    },
    'win_raid': {
        'title': 'TUTORIAL - Win a Raid',
        'description': 'Defeat a Raid upon a village. The more raids won, the more terrain you can claim.',
        'xp': 20,
        'type': 'adv_unlock',
        'match': {
            'mode' : 'exact',
            'match' : 'aaaa_zp4adv:win_raid_loop'
        },
        'count': 1,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'Raid victory! The village is safe. Press K and go to Villager Hero to see if you can claim more terrain.',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/overworld.png'
        }
    },
    'kill_bosses': {
        'title': 'TUTORIAL - Kill 4 Bosses',
        'description': 'Check out /dimensions to see how you can find bosses in each dimension.',
        'xp': 20,
        'type': 'kill',
        'match': {
            'mode': 'preset_entity_check',
            'match': 'boss'
        },
        'count': 4,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'Bosses defeated! Impressive strength. It is time to move towards other lands.',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/overworld.png'
        }
    },
    'locate_gatekeeper': {
        'title': 'TUTORIAL - Find the Gate Keeper',
        'description': 'Small hut with a special trader. The Gate Keeper holds the portal towards the next dimension.',
        'xp': 20,
        'type': 'locate_structure',
        'match': {
            'mode': 'any',
            'match_ids': ['blue_skies:gatekeeper_house_mountain', 'blue_skies:gatekeeper_house_plains', 'blue_skies:gatekeeper_house_snowy']
        },
        'count': 1,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'Found the Gate Keeper hourse! Trade with him to get a Zeal Lighter',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/overworld.png'
        }
    },
    'get_zeal_lighter': {
        'title': 'TUTORIAL - Get a Zeal Lighter',
        'description': 'Trade with the Gate Keeper to obtain a zeal lighter. Use it to fire the portal that must lay near by.',
        'xp': 20,
        'type': 'obtain_item',
        'match': {
            'mode': 'exact',
            'match_id': 'blue_skies:zeal_lighter'
        },
        'count': 1,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'Zeal lighter acquired. Light the way towards the Blue Skies!',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/overworld.png'
        }
    },
    '20combatlvl': {
        'title': 'TUTORIAL - Reach Combat Lvl 20',
        'description': 'Everbright is for no weak souls. Fight enemies to raise your combat level to at least 20.',
        'xp': 20,
        'type': 'reach_level',
        'match': {
            'mode': 'check_level',
            'skill': 'combat'
        },
        'count': 20,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'Level 20 reached for combat! Now you are ready for the Everbright',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/overworld.png'
        }
    },  
    '20enemies_everbright': {
        'item': 'kubejs:quest',
        'title': 'EVERBRIGHT - Slay 20 Enemies',
        'description': 'This new place is much more harsh. New possibilities, new enemies. Get acquainted.',
        'xp': 20,
        'type': 'kill',
        'match': {
            'mode': 'preset_entity_check',
            'match': 'hostile',
            'dimension_match' : 'blue_skies:everbright'
        },
        'count': 20,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'Very good! I have heard about some towers around that the inhabitant owns special powers. See if you can find any.',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/everbright.png'
        }
    },
    'travel_to_everbright': {
        'item': 'kubejs:quest',
        'title': 'TUTORIAL - Travel to the Everbright',
        'description': 'Light the portal in the Gatekeep, but make sure it is for Everbright',
        'xp': 20,
        'delayNext' : 200,
        'type': 'travel_dimension',
        'match': {
            'mode': 'exact',
            'match_id' : 'blue_skies:everbright'
        },
        'count': 1,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'Entered Everbright. New adventures begin!',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/overworld.png'
        }
    },  
    'locate_everbright_blinding_dungeon': {
        'item': 'kubejs:quest',
        'title': 'Find a Blinding Dungeon',
        'description': 'I have been informed that the habitant is possessing unique items.',
        'xp': 20,
        'type': 'locate_structure',
        'match': {
            'mode': 'exact',
            'match_id': 'blue_skies:everbright_blinding_dungeon'
        },
        'count': 1,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'This is quite the place. Lurk around for keys to open the gate towards the owner.',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/everbright.png'
        }
    },
    'loot_blinding_key': {
        'item': 'kubejs:quest',
        'title': 'Find a Blinding Dungeon Key',
        'description': 'Search in the tower for a key. You need it to open the gate towards the Summoner',
        'xp': 20,
        'type': 'obtain_item',
        'match': {
            'mode': 'exact',
            'match_id': 'blue_skies:blinding_key' 
        },
        'count': 1,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'Try to get to the Summoner, if one is not enough, you might need more.',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/everbright.png'
        }
    },
    'slay_summoner': {
        'title': 'Slay The Summoner',
        'description': 'The Summoner will use his magic against you. Take care.',
        'xp': 20,
        'type': 'kill',
        'match': {
            'mode': 'exact',
            'match': 'blue_skies:summoner'
        },
        'count': 1,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'Looks like he is dropping over some bags. See if you can find anything new.',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/everbright.png'
        }
    },
    'loot_ethernal_arc': {
        'item': 'kubejs:quest',
        'title': 'Find an Ethernal Arc',
        'description': 'Arcs are powerups for your character. Ethernal Arc is found in the Summoner loot bag.',
        'xp': 20,
        'type': 'obtain_item',
        'match': {
            'mode': 'exact',
            'match_id': 'blue_skies:ethereal_arc' 
        },
        'count': 1,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'These arcs can be used instead of keys to respawn the Summoner and fight it again. Maybe we can find better loot.',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/everbright.png'
        }
    },
    'place_summoning_table': {
        'item': 'kubejs:quest',
        'title': 'Get a Summoning Table',
        'description': 'Summon and slay The Summoner until you find a Summoning Table and put it on the ground.',
        'xp': 20,
        'type': 'place_block',
        'match': {
            'mode': 'exact',
            'match_id': 'blue_skies:summoning_table' 
        },
        'count': 1,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'The table can be used with the Summoning Tome and Soul Fragments to produce magic.',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/everbright.png'
        }
    },
    '25combatlvl': {
        'item': 'kubejs:quest',
        'title': 'Reach Combat Lvl 25',
        'description': 'Fight enemies to raise your combat level to at least 25.',
        'xp': 20,
        'type': 'reach_level',
        'match': {
            'mode': 'check_level',
            'skill': 'combat'
        },
        'count': 25,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'Your combat skills are improving. Keep it up!',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/everbright.png'
        }
    },
    'locate_everbright_nature_dungeon': {
        'item': 'kubejs:quest',
        'title': 'Find a Nature Dungeon',
        'description': 'Nature dungeons are massive mazes multiple stories high. Big and green. That`s how you find them.',
        'xp': 20,
        'type': 'locate_structure',
        'match': {
            'mode': 'exact',
            'match_id': 'blue_skies:nature_dungeon'
        },
        'count': 1,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'What a masterpiece of a maze. Find 4 Nature Keys and get to the top.',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/everbright.png'
        }
    },
    'loot_4_nature_key': {
        'item': 'kubejs:quest',
        'title': 'Find 4 Nature Keys',
        'description': 'Search the maze for keys. You need it to open the gate towards the Alchemist',
        'xp': 20,
        'type': 'obtain_item',
        'match': {
            'mode': 'exact',
            'match_id': 'blue_skies:nature_key' 
        },
        'count': 4,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'Now you are ready to ender the fight. Good luck traveler!',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/everbright.png'
        }
    },
    'slay_starlit_crusher': {
        'item': 'kubejs:quest',
        'title': 'Slay The Starlit Crusher',
        'description': 'The Starlit Crusher is at core a tree evolved, so axes might be more useful.',
        'xp': 20,
        'type': 'kill',
        'match': {
            'mode': 'exact',
            'match': 'blue_skies:starlit_crusher'
        },
        'count': 1,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'Good job. Open the bag to see what goods we get',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/everbright.png'
        }
    },
    'loot_nature_arc': {
        'item': 'kubejs:quest',
        'title': 'Find a Nature Arc',
        'description': 'Nature arcs gives you the possibility to wistand more damage before dying',
        'xp': 20,
        'type': 'obtain_item',
        'match': {
            'mode': 'exact',
            'match_id': 'blue_skies:nature_arc' 
        },
        'count': 1,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'Very good! Equip it to become stronger. Remember, you could get a better one from the enemy',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/everbright.png'
        }
    },
    '28combatlvl': {
        'item': 'kubejs:quest',
        'title': 'Reach Combat Lvl 28',
        'description': 'Fight enemies to raise your combat level to at least 28.',
        'xp': 20,
        'type': 'reach_level',
        'match': {
            'mode': 'check_level',
            'skill': 'combat'
        },
        'count': 28,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'Your combat skills are improving. Keep it up!',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/everbright.png'
        }
    },
    'travel_back_to_overworld': {
        'item': 'kubejs:quest',
        'title': 'Travel back to the Overworld',
        'description': 'Get back home as we need to find the next adventure. Remember: /dimensions',
        'xp': 20,
        'delayNext' : 200,
        'type': 'travel_dimension',
        'match': {
            'mode': 'exact',
            'match_id' : 'minecraft:overworld'
        },
        'count': 1,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'Welcome back home, but adventure continues',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/overworld.png'
        }
    },  
    'travel_to_everdawn': {
        'item': 'kubejs:quest',
        'title': 'Travel to the Everdawn',
        'description': 'Very simmilar to the Everbright portal, this one is found in gatekeer`s houses. Remember: /dimensions',
        'xp': 20,
        'delayNext' : 200,
        'type': 'travel_dimension',
        'match': {
            'mode': 'exact',
            'match_id' : 'blue_skies:everdawn'
        },
        'count': 1,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'A new world with new magic mechanics!',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/everdawn.png'
        }
    },  
    'locate_everdawn_blinding_dungeon': {
        'item': 'kubejs:quest',
        'title': 'Find a Blinding Dungeon',
        'description': 'In the Everdawn there is the brother of the Summoner, The Alchemist. Be aware of the dangers of The Everdawn',
        'xp': 20,
        'type': 'locate_structure',
        'match': {
            'mode': 'exact',
            'match_id': 'blue_skies:everdawn_blinding_dungeon'
        },
        'count': 1,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'Good job! Do you still got the keys from the past day or do you need to get new ones?',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/everdawn.png'
        }
    },
    'loot_4_blinding_keys': {
        'item': 'kubejs:quest',
        'title': 'Find 4 Blinding Dungeon Keys',
        'description': 'Search in the tower for keys. You need it to open the gate towards The Alchemist',
        'xp': 20,
        'type': 'obtain_item',
        'match': {
            'mode': 'exact',
            'match_id': 'blue_skies:blinding_key' 
        },
        'count': 4,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'Good! Now to the Alchemist!',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/everdawn.png'
        }
    },
    'slay_the_alchemist': {
        'item': 'kubejs:quest',
        'title': 'Slay The Alchemist',
        'description': 'I hope you came armed. The Alchemist is not as light as his brother.',
        'xp': 20,
        'type': 'kill',
        'match': {
            'mode': 'exact',
            'match': 'blue_skies:alchemist'
        },
        'count': 1,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'Astonishing! Check the loot bag, you can get an arc from him that can turn you invisible! Remember, you could get a better one from the enemy',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/everdawn.png'
        }
    },
    'loot_dusk_arc': {
        'item': 'kubejs:quest',
        'title': 'Find a Dusk Arc',
        'description': 'Dusk arcs gives you the ability to turn invisible. Very useful when evading enemies.',
        'xp': 20,
        'type': 'obtain_item',
        'match': {
            'mode': 'exact',
            'match_id': 'blue_skies:dusk_arc' 
        },
        'count': 1,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'Very good! Equip it to become one with the shadows! Remember, you could get a better one from the enemy',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/everdawn.png'
        }
    },
    'place_alchemy_table': {
        'item': 'kubejs:quest',
        'title': 'Get an Alchemy Table',
        'description': 'Summon and slay The Alchemist until you find an Alchemy Table and put it on the ground.',
        'xp': 20,
        'type': 'place_block',
        'match': {
            'mode': 'exact',
            'match_id': 'blue_skies:alchemy_table' 
        },
        'count': 1,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'The table can be used to alterate versions of an item. Try turning redstone into glowstone.',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/everdawn.png'
        }
    },
    '32combatlvl': {
        'item': 'kubejs:quest',
        'title': 'Reach Combat Lvl 32',
        'description': 'Fight enemies to raise your combat level to at least 32.',
        'xp': 20,
        'type': 'reach_level',
        'match': {
            'mode': 'check_level',
            'skill': 'combat'
        },
        'count': 32,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'Your combat skills are improving. Keep it up!',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/everdawn.png'
        }
    },
    'locate_everdawn_poison_dungeon': {
        'item': 'kubejs:quest',
        'title': 'Find a Poison Dungeon',
        'description': 'In the Everdawn lays the Arachnarch. A gigantic vonomus spider. I suspect he lives underground.',
        'xp': 20,
        'type': 'locate_structure',
        'match': {
            'mode': 'exact',
            'match_id': 'blue_skies:poison_dungeon'
        },
        'count': 1,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'I strongly belive you need some keys here aswell. However i do not know what kind.',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/everdawn.png'
        }
    },
    'loot_4_poison_keys': {
        'item': 'kubejs:quest',
        'title': 'Find 4 Poison Dungeon Keys',
        'description': 'Search the ',
        'xp': 20,
        'type': 'obtain_item',
        'match': {
            'mode': 'exact',
            'match_id': 'blue_skies:poison_key' 
        },
        'count': 4,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'Fantastic. Let`s search around for a place where we could find him.',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/everdawn.png'
        }
    },
    'slay_the_arachnarch': {
        'item': 'kubejs:quest',
        'title': 'Slay The Arachnarch',
        'description': 'I hope you came armed. The Alchemist is not as light as his brother.',
        'xp': 20,
        'type': 'kill',
        'match': {
            'mode': 'exact',
            'match': 'blue_skies:arachnarch'
        },
        'count': 1,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'Astonishing! Check the loot bag, you can get an arc from it that could prevent the poisoning.',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/everdawn.png'
        }
    },
    'loot_poison_arc': {
        'item': 'kubejs:quest',
        'title': 'Find a Poison Arc',
        'description': 'Poison Arcs prevent you from being poisoned. Very useful against vonomus enemies',
        'xp': 20,
        'type': 'obtain_item',
        'match': {
            'mode': 'exact',
            'match_id': 'blue_skies:poison_arc' 
        },
        'count': 1,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'Very good! Spiders will no longer state an threat. Remember, you could get a better one from the enemy',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/everdawn.png'
        }
    },
    '35combatlvl': {
        'item': 'kubejs:quest',
        'title': 'Reach Combat Lvl 35',
        'description': 'Fight enemies to raise your combat level to at least 35.',
        'xp': 20,
        'type': 'reach_level',
        'match': {
            'mode': 'check_level',
            'skill': 'combat'
        },
        'count': 35,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'Your combat skills are improving. Keep it up!',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/everdawn.png'
        }
    },
}


def get_adv_sub_name(structure_id):
    return structure_id+'_trigger'

def get_adv_sub_path(structure_id):
    return structure_id.replace(':','_')+'_trigger'

def get_adv_structure_text(structure_id):
    info = structure_id.replace(':',' ').replace('_',' ').title()
    return f'Locate {info}'

def get_adv_sub_path_dimension(dimension_id):
    return dimension_id.replace(':','_')+'_trigger'

def get_adv_dimension_text(dimension_id):
    info = dimension_id.replace(':',' ').replace('_',' ').title()
    return f'Travel to {info}'

INSTA_REVOKE_ADV = []

current_root = DEFAULT_ROOT
for quest_key in QUESTS:
    quest_data = QUESTS[quest_key]
    path = f'../kubejs/data/aaaa_zp4adv/advancements/{quest_key}.json'
    icon = DEFAULT_ITEM
    if 'item' in quest_data:
        icon = quest_data['item']

    sub_advs = []

    if quest_data['type'] == 'travel_dimension':
        if quest_data['match']['mode'] == 'exact':
            dimension_id = quest_data['match']['match_id']
            text = get_adv_dimension_text(dimension_id)

            path_to_save_adv = path.replace(f'{quest_key}.json', get_adv_sub_path_dimension(dimension_id)+'.json')
            adv_id_to_hook = 'aaaa_zp4adv:' + path_to_save_adv.split('/')[-1].replace('.json','')

            sub_advs.append((get_dimension_change_advancement(DEFAULT_ROOT, DEFAULT_ITEM, text, text, dimension_id), path_to_save_adv ))
            
            quest_data['type'] = 'adv_unlock'
            quest_data['match']['match_id'] = adv_id_to_hook

    
    if quest_data['type'] == 'locate_structure':
        
        if quest_data['match']['mode'] == 'exact':
            structure_id = quest_data['match']['match_id']
            text = get_adv_structure_text(structure_id)

            path_to_save_adv = path.replace(f'{quest_key}.json', get_adv_sub_path(structure_id)+'.json')
            adv_id_to_hook = 'aaaa_zp4adv:' + path_to_save_adv.split('/')[-1].replace('.json','')

            sub_advs.append((get_enter_structure_advancement(DEFAULT_ROOT, DEFAULT_ITEM, text, text, quest_data['match']['match_id']), path_to_save_adv ))
            
            
            quest_data['match']['match_id'] = adv_id_to_hook
            quest_data['type'] = 'adv_unlock'
        
        if quest_data['match']['mode'] == 'any':
            finals = []
            for structure_id in quest_data['match']['match_ids']:
                text = get_adv_structure_text(structure_id)
                advancement_id = get_adv_sub_name(structure_id)

                path_to_save_adv = path.replace(f'{quest_key}.json', get_adv_sub_path(structure_id)+'.json')
                adv_id_to_hook = 'aaaa_zp4adv:' + path_to_save_adv.split('/')[-1].replace('.json','')

                sub_advs.append((get_enter_structure_advancement(DEFAULT_ROOT, DEFAULT_ITEM, text, text, structure_id), path_to_save_adv))
                finals.append(adv_id_to_hook)

            quest_data['match']['match_ids'] = finals
            quest_data['type'] = 'adv_unlock'

    adv_data = get_impossible_advancement(current_root, icon, quest_data['title'], quest_data['description'], quest_data['xp'])

    for sub_adv in sub_advs:
        write_json_data(sub_adv[1], sub_adv[0])
        INSTA_REVOKE_ADV.append('aaaa_zp4adv:'+sub_adv[1].split('/')[-1].split('.')[0])
    
    write_json_data(path, adv_data)
    current_root = f"aaaa_zp4adv:{quest_key}"

def set_js_script_data(path_of_script, start_marker, end_marker, data):
    with open(path_of_script, 'r') as f:
        js_content = f.read()

    if js_content:
        start_idx = js_content.find(start_marker) + len(start_marker)
        end_idx = js_content.find(end_marker, start_idx)
        new_content = js_content[:start_idx] + data + js_content[end_idx:]
        with open(path_of_script, 'w') as f:
            f.write(new_content)

QUEST_SCRIPT_PATH = '../kubejs/server_scripts/quests.js'

set_js_script_data(QUEST_SCRIPT_PATH, '//QUEST_DATA_START\n', '\n//QUEST_DATA_END', generate_js_quests(QUESTS))
set_js_script_data(QUEST_SCRIPT_PATH, '//INSTA_REVOKE_DATA_START\n', '\n//INSTA_REVOKE_DATA_END', 'const INSTA_REVOKE_ADVS_PY = '+json.dumps(INSTA_REVOKE_ADV))
