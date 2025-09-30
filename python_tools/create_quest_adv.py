import json


def get_json_data(root, icon, title, description, xp_reward):
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
            "no": {
                "trigger": "minecraft:impossible"
            }
        },
        "requirements": [
            [
                "no"
            ]
        ],
        "rewards": {
            "experience": xp_reward
        },
        "sends_telemetry_event": False
    }


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
        'description': 'Everything requires sticks, so gather some wood.',
        'xp': 20,
        'type': 'break_block',
        'match': {
            'mode': 'endswith',
            'match_id': '_log'
        },
        'count': 20,
        'dialogue': {
            'speaker': 'Daluku',
            'message': 'Very nice! Now up to the next quest peasant!',
            'renderType': 'rectangle',
            'renderTarget': 'medievalorigins:textures/item/high_elf.png'
        }
    },
    '10enemies': {
        'title': 'TUTORIAL - Slay 10 Enemies',
        'description': 'You must get used to combat. So slay some enemies.',
        'xp': 20,
        'type': 'kill',
        'match': {
            'mode': 'preset_entity_check',
            'match': 'hostile'
        },
        'count': 10,
        'dialogue': {
            'speaker': 'Daluku',
            'message': 'Looks like you are getting stronger!',
            'renderType': 'rectangle',
            'renderTarget': 'medievalorigins:textures/item/troll.png'
        }
    },
    '10farmanimals': {
        'title': 'TUTORIAL - Butcher 10 Farm Animals',
        'description': 'You must get used to gather food. Start with a farm.',
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
            'message': 'A shiny gem! Useful for crafting.',
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
            'message': 'Crushed it! Now use that dust wisely.',
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
            'message': 'Salvaging table placed. Time to recycle!',
            'renderType': 'rectangle',
            'renderTarget': 'medievalorigins:textures/item/high_elf.png'
        }
    },
    'place_simple_reforging_table': {
        'title': 'TUTORIAL - Get a Simple Reforging Table',
        'description': 'Place a Simple Reforging Table on the ground. Use it to upgrade items with affixes.',
        'xp': 20,
        'type': 'place_block',
        'match': {
            'mode': 'exact',
            'match_id': 'apotheosis:simple_reforging_table'
        },
        'count': 1,
        'dialogue': {
            'speaker': 'Daluku',
            'message': 'Reforging ready. Enhance your gear!',
            'renderType': 'rectangle',
            'renderTarget': 'medievalorigins:textures/item/high_elf.png'
        }
    },
    'place_fortunas_anvil': {
        'title': 'TUTORIAL - Get a Fortuna`s Anvil',
        'description': 'Place a Fortuna`s Anvil on the ground. Use it to upgrade your items.',
        'xp': 20,
        'type': 'place_block',
        'match': {
            'mode': 'exact',
            'match_id': 'apotheosis:fortunas_anvil'
        },
        'count': 1,
        'dialogue': {
            'speaker': 'Daluku',
            'message': 'Fortuna\'s anvil is set. Good luck!',
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
        'type': 'raid_win',
        'match': {},
        'count': 1,
        'dialogue': {
            'speaker': 'Daluku',
            'message': 'Raid victory! The village is safe.',
            'renderType': 'rectangle',
            'renderTarget': 'medievalorigins:textures/item/high_elf.png'
        }
    },
    'kill_cornelia': {
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
            'message': 'Bosses defeated! Impressive strength.',
            'renderType': 'rectangle',
            'renderTarget': 'medievalorigins:textures/item/high_elf.png'
        }
    },
    'locate_gatekeeper': {
        'title': 'TUTORIAL - Find the Gate Keeper',
        'description': 'The Gate Keeper holds the portal towards the next dimension.',
        'xp': 20,
        'type': 'locate',
        'match': {
            'mode': 'entity',
            'match_id': 'gatekeeper'
        },
        'count': 1,
        'dialogue': {
            'speaker': 'Daluku',
            'message': 'Found the Gate Keeper. Secrets await!',
            'renderType': 'rectangle',
            'renderTarget': 'medievalorigins:textures/item/high_elf.png'
        }
    },
    'get_zeal_lighter': {
        'title': 'TUTORIAL - Get a Zeal Lighter',
        'description': 'Find the Gate Keeper villager and trade with him to get a zeal lighter',
        'xp': 20,
        'type': 'obtain_item',
        'match': {
            'mode': 'exact',
            'match_id': 'zeal_lighter'
        },
        'count': 1,
        'dialogue': {
            'speaker': 'Daluku',
            'message': 'Zeal lighter acquired. Light the way!',
            'renderType': 'rectangle',
            'renderTarget': 'medievalorigins:textures/item/high_elf.png'
        }
    },
    '20combatlvl': {
        'title': 'TUTORIAL - Reach Combat Lvl 20',
        'description': 'Fight enemies to raise your combat level to at least 20.',
        'xp': 20,
        'type': 'reach_level',
        'match': {
            'mode': 'check_level',
            'skill': 'combat'
        },
        'count': 20,
        'dialogue': {
            'speaker': 'Daluku',
            'message': 'Level 20 reached. You\'re advancing quickly!',
            'renderType': 'rectangle',
            'renderTarget': 'medievalorigins:textures/item/high_elf.png'
        }
    },
    'travel_to_everbright': {
        'title': 'TUTORIAL - Travel to the Everbright',
        'description': 'Light the Everbright portal with a zeal lighter to fire up the portal.',
        'xp': 20,
        'type': 'changed_dimension',
        'match': {
            'mode': 'to',
            'dimension': 'everbright'
        },
        'count': 1,
        'dialogue': {
            'speaker': 'Daluku',
            'message': 'Entered Everbright. New adventures begin!',
            'renderType': 'rectangle',
            'renderTarget': 'medievalorigins:textures/item/high_elf.png'
        }
    }
    # Arcane essence towards the end of overworld
}


current_root = DEFAULT_ROOT
for quest_key in QUESTS:
    quest_data = QUESTS[quest_key]
    path = f'../kubejs/data/aaaa_zp4adv/advancements/{quest_key}.json'
    icon = DEFAULT_ITEM
    if 'item' in quest_data:
        icon = quest_data['item']
    adv_data = get_json_data(current_root, icon, quest_data['title'], quest_data['description'], quest_data['xp'])
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