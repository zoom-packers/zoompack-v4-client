import json
import os

def remove_json_files_except_root(folder_path):
    if not os.path.isdir(folder_path):
        print(f"Error: The path '{folder_path}' is not a valid directory.")
        return
    
    removed_count = 0
    for filename in os.listdir(folder_path):
        if filename.endswith('.json') and filename != 'root.json':
            file_path = os.path.join(folder_path, filename)
            if os.path.isfile(file_path):
                os.remove(file_path)
                print(f"Removed: {file_path}")
                removed_count += 1
    
    if removed_count == 0:
        print("No .json files (except root.json) found to remove.")

def get_trigger_adv(root, icon, title, description, trigger):
    return {
        "parent": root,
        "criteria": {
            "trigger_criteria": {
            "conditions": {},
                "trigger": trigger
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
            "trigger_criteria"
            ]
        ],
        "rewards": {
            "experience": 100
        },
        "sends_telemetry_event": False,
        "repeatable": True
    }

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
            'reward': data.get('reward', [0,0,0,0,0]),
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
}

QUEST_FOLDER = 'quests'
QUEST_FILES = ['overworld', 'everbright', 'everdawn', 'aether', 'nether', 'undergarden', 'end', 'depth', 'abyss']
# QUEST_FILES = ['depth']
# QUEST_FILES = ['overworld']

for quest_file_name in QUEST_FILES:
    with open(f'{QUEST_FOLDER}/{quest_file_name}.json','r') as f:
        data = json.loads(f.read())
        for key in data:
            if key in QUESTS:
                print(f"WARNING! Quest '{key}' is DUPLICATE")
            QUESTS[key] = data[key]

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

def get_adv_trigger_text(trigger):
    info = trigger.replace(':',' ').replace('_',' ').title()
    return f'Triggered to {info}'

remove_json_files_except_root("../kubejs/data/aaaa_zp4adv/advancements/")

INSTA_REVOKE_ADV = []

current_root = DEFAULT_ROOT
for quest_key in QUESTS:
    quest_data = QUESTS[quest_key]
    path = f'../kubejs/data/aaaa_zp4adv/advancements/{quest_key}.json'
    icon = DEFAULT_ITEM
    if 'item' in quest_data:
        icon = quest_data['item']

    sub_advs = []
    
    if quest_data['type'] == 'trigger':
        if quest_data['match']['mode'] == 'exact':
            trigger = quest_data['match']['match']
            text = get_adv_trigger_text(trigger)

            path_to_save_adv = path.replace(f'{quest_key}.json', get_adv_sub_path_dimension(trigger)+'.json')
            adv_id_to_hook = 'aaaa_zp4adv:' + path_to_save_adv.split('/')[-1].replace('.json','')
        
            sub_advs.append((get_trigger_adv(DEFAULT_ROOT, DEFAULT_ITEM, text, text, trigger), path_to_save_adv ))

            quest_data['type'] = 'adv_unlock'
            quest_data['match']['match_id'] = adv_id_to_hook


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
