import json


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
        if 'renderTarget' in data['dialogue']:
            quest_entry['dialogue']['renderTarget'] = data['dialogue']['renderTarget']
        if i < len(quest_keys) - 1:
            quest_entry['next'] = quest_keys[i+1]
        quests_dict[key] = quest_entry
    return f"const QUESTS = {json.dumps(quests_dict, separators=(',',':'), indent=4)}"

DEFAULT_ITEM = 'kubejs:quest'
DEFAULT_ROOT = "minecraft:adventure/root"
QUESTS = {
    '20enemies_everbright': {
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
    'travel_to_everbright': {
        'title': 'TUTORIAL - Travel to the Everbright',
        'description': 'Light the portal in the Gatekeep, but make sure it is for Everbright',
        'xp': 20,
        'type': 'adv_unlock',
        'match': {
            'mode': 'exact',
            'match' : 'aaaa_zp4adv:enter_everbright'
        },
        'count': 1,
        'dialogue': {
            'speaker': 'Elder Librarian',
            'message': 'Entered Everbright. New adventures begin!',
            'renderType': 'rectangle',
            'renderTarget': 'zoompack_images:textures/elder_librarian/overworld.png'
        }
    },
    # Arcane essence towards the end of overworld
}


def get_adv_sub_name(structure_id):
    return structure_id+'_trigger'

def get_adv_sub_path(structure_id):
    return structure_id.replace(':','_')+'_trigger'

def get_adv_structure_text(structure_id):
    info = structure_id.replace(':',' ').replace('_',' ').title()
    return f'Locate {info}'

current_root = DEFAULT_ROOT
for quest_key in QUESTS:
    quest_data = QUESTS[quest_key]
    path = f'../kubejs/data/aaaa_zp4adv/advancements/{quest_key}.json'
    icon = DEFAULT_ITEM
    if 'item' in quest_data:
        icon = quest_data['item']

    sub_advs = []
    
    if quest_data['type'] == 'locate_structure':
        
        if quest_data['match']['mode'] == 'exact':
            structure_id = quest_data['match']['match_id']
            text = get_adv_structure_text(structure_id)

            path_to_save_adv = path.replace(f'{quest_key}.json', get_adv_sub_path(structure_id)+'.json')
            adv_id_to_hook = 'aaaa_zp4adv:' + path_to_save_adv.split('/')[-1].replace('.json','')

            sub_advs.append((get_enter_structure_advancement(DEFAULT_ROOT, DEFAULT_ITEM, text, text, quest_data['match']['match_id'])), path_to_save_adv )
            
            
            quest_data['match']['match_id'] = get_adv_sub_name(structure_id)
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
    
    write_json_data(path, adv_data)
    current_root = f"aaaa_zp4adv:{quest_key}"

# Generate and write JS QUESTS
js_path = '../kubejs/server_scripts/quests.js'
with open(js_path, 'r') as f:
    js_content = f.read()

start_marker = '//QUEST_DATA_START\n'
end_marker = '\n//QUEST_DATA_END'
start_idx = js_content.find(start_marker) + len(start_marker)
end_idx = js_content.find(end_marker, start_idx)
new_content = js_content[:start_idx] + generate_js_quests(QUESTS) + js_content[end_idx:]
with open(js_path, 'w') as f:
    f.write(new_content)