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

DEFAULT_ITEM = 'apotheosis:gem'
DEFAULT_ROOT = "minecraft:adventure/root"
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
            'speaker': 'Daluku',
            'message': 'Great work. Get some tools for yourself and start slaying some enemies.',
            'renderType': 'rectangle',
            'renderTarget': 'medievalorigins:textures/item/high_elf.png'
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
            'speaker': 'Daluku',
            'message': 'Looks like you are getting stronger! Remember you are a gatherer, so butcher some animals',
            'renderType': 'rectangle',
            'renderTarget': 'medievalorigins:textures/item/troll.png'
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
            'speaker': 'Daluku',
            'message': 'Good, now you won\'t starve. Continue!',
            'renderType': 'rectangle',
            'renderTarget': 'medievalorigins:textures/item/high_elf.png'
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
            'speaker': 'Daluku',
            'message': 'Your combat skills are improving. Keep it up!',
            'renderType': 'rectangle',
            'renderTarget': 'medievalorigins:textures/item/high_elf.png'
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
            'speaker': 'Daluku',
            'message': 'A shiny gem! You can use it to enhance your weaponry on a Smithing Table. Type /gems to find more.',
            'renderType': 'rectangle',
            'renderTarget': 'medievalorigins:textures/item/high_elf.png'
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
            'speaker': 'Daluku',
            'message': 'Crushed it! You can use the dust to craft tables for gems and affixes. Press U while hovering over it.',
            'renderType': 'rectangle',
            'renderTarget': 'medievalorigins:textures/item/high_elf.png'
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
            'speaker': 'Daluku',
            'message': 'Salvaging table placed. Time to recycle! Extract affix materials or even ingots.',
            'renderType': 'rectangle',
            'renderTarget': 'medievalorigins:textures/item/high_elf.png'
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
            'speaker': 'Daluku',
            'message': 'Reforging ready. Enhance your gear! ',
            'renderType': 'rectangle',
            'renderTarget': 'medievalorigins:textures/item/high_elf.png'
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
            'speaker': 'Daluku',
            'message': 'Great! These are all over the world. There are many variations, make sure to equip them to match your playstyle.',
            'renderType': 'rectangle',
            'renderTarget': 'medievalorigins:textures/item/high_elf.png'
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
            'speaker': 'Daluku',
            'message': 'Fortuna`s anvil is set. Good luck!',
            'renderType': 'rectangle',
            'renderTarget': 'medievalorigins:textures/item/high_elf.png'
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
            'speaker': 'Daluku',
            'message': 'Amazing! Now let`s put your new gear to work to see how it behaves! Hunt down something!',
            'renderType': 'rectangle',
            'renderTarget': 'medievalorigins:textures/item/high_elf.png'
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
            'speaker': 'Daluku',
            'message': 'Great work! Now use that to capture a tamed mount.',
            'renderType': 'rectangle',
            'renderTarget': 'medievalorigins:textures/item/high_elf.png'
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
            'speaker': 'Daluku',
            'message': 'Amazing! Now you can toggle your mount with the key V. Take care of it!',
            'renderType': 'rectangle',
            'renderTarget': 'medievalorigins:textures/item/high_elf.png'
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
            'speaker': 'Daluku',
            'message': '50 enemies down! You\'re a warrior now.',
            'renderType': 'rectangle',
            'renderTarget': 'medievalorigins:textures/item/high_elf.png'
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
            'speaker': 'Daluku',
            'message': 'Raid victory! The village is safe. Press K and go to Villager Hero to see if you can claim more terrain.',
            'renderType': 'rectangle',
            'renderTarget': 'medievalorigins:textures/item/high_elf.png'
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
            'speaker': 'Daluku',
            'message': 'Bosses defeated! Impressive strength. It is time to move towards other lands.',
            'renderType': 'rectangle',
            'renderTarget': 'medievalorigins:textures/item/high_elf.png'
        }
    },
    
    'locate_gatekeeper': {
        'title': 'TUTORIAL - Find the Gate Keeper',
        'description': 'Small hut with a special trader. The Gate Keeper holds the portal towards the next dimension.',
        'xp': 20,
        'type': 'adv_unlock',
        'match': {
            'mode': 'any',
            'match_ids': ['aaaa_zp4adv:find_gatekeeper_m_loop', 'aaaa_zp4adv:find_gatekeeper_s_loop', 'aaaa_zp4adv:find_gatekeeper_p_loop']
        },
        'count': 1,
        'dialogue': {
            'speaker': 'Daluku',
            'message': 'Found the Gate Keeper hourse! Trade with him to get a Zeal Lighter',
            'renderType': 'rectangle',
            'renderTarget': 'medievalorigins:textures/item/high_elf.png'
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
            'speaker': 'Daluku',
            'message': 'Zeal lighter acquired. Light the way towards the Blue Skies!',
            'renderType': 'rectangle',
            'renderTarget': 'medievalorigins:textures/item/high_elf.png'
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
            'speaker': 'Daluku',
            'message': 'Level 20 reached for combat! Now you are ready for the Everbright',
            'renderType': 'rectangle',
            'renderTarget': 'medievalorigins:textures/item/high_elf.png'
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
            'speaker': 'Daluku',
            'message': 'Entered Everbright. New adventures begin!',
            'renderType': 'rectangle',
            'renderTarget': 'medievalorigins:textures/item/high_elf.png'
        }
    },
    # Arcane essence towards the end of overworld
}


current_root = DEFAULT_ROOT
for quest_key in QUESTS:
    quest_data = QUESTS[quest_key]
    path = f'../kubejs/data/aaaa_zp4adv/advancements/{quest_key}.json'
    icon = DEFAULT_ITEM
    if 'item' in quest_data:
        icon = quest_data['item']
    
    adv_data = get_impossible_advancement(current_root, icon, quest_data['title'], quest_data['description'], quest_data['xp'])

    # if quest_data['type'] == 'obtain_item':
    #     if quest_data['match']['mode'] == 'exact':
    #         count = quest_data['count']
    #         if count>1:
    #             adv_data = get_inventory_changed_advancement(current_root, icon, quest_data['title'], quest_data['description'], quest_data['xp'], quest_data['match']['match_id'], count)
    #         else:
    #             adv_data = get_inventory_changed_advancement(current_root, icon, quest_data['title'], quest_data['description'], quest_data['xp'], quest_data['match']['match_id'])

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