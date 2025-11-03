import logging
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
    with open(path, 'w+', encoding="utf-8") as f:
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

COINS = ['Bronze','Silver','Gold','Emerald','Diamond']
COIN_CHAR = '🪙'
RESET = "§f§o"
COLORS = {
    'Bronze' : '§4',
    'Silver' : '§7',
    'Gold': '§6', 
    'Emerald': '§a',
    'Diamond': '§b'
}

DEFAULT_ITEM = 'kubejs:quest_book'
DEFAULT_ROOT = "aaaa_zp4adv:root"
QUESTS = {
}

QUEST_FOLDER = 'quests'
QUEST_FILES = ['overworld', 'everbright', 'everdawn', 'aether', 'nether', 'undergarden', 'end', 'depth', 'abyss', 'frost']

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

class QuestModifier:
    def __init__(self, folder):
        self.folder = folder
        self.quest_files = ['overworld', 'everbright', 'everdawn', 'aether', 'nether', 'undergarden', 'end', 'depth', 'abyss', 'frost']
        self.base_mappings = {
            "locate_structure": {"xp": None, "money": None},
            "kill": {"xp": None, "money": None},
            "obtain_item": {"xp": None, "money": None},
            "reach_level": {"xp": 10, "money": [5, 0, 0, 0, 0]},
            "place_block": {"xp": 20, "money": [10, 0, 0, 0, 0]},
            "trigger": {"xp": 200, "money": [0, 12, 0, 0, 0]},
            "travel_dimension": {"xp": 22, "money": [31, 1, 0, 0, 0]},  # base
            "break_block": {"xp": 1, "money": [1, 0, 0, 0, 0]}
        }

        # simplified: per-file only custom xp/money
        self.file_mappings = {
            "overworld.json": {
                "locate_structure": {"xp": 50, "money": [0, 1, 0, 0, 0]},
                "kill": {"xp": 5, "money": [2, 0, 0, 0, 0]},
                "obtain_item": {"xp": 50, "money": [32, 0, 0, 0, 0]},
                "place_block": {"xp": 18, "money": [20, 0, 0, 0, 0]},
            },
            "everbright.json": {
                "locate_structure": {"xp": 80, "money": [20, 1, 0, 0, 0]},
                "kill": {"xp": 10, "money": [4, 0, 0, 0, 0]},
                "obtain_item": {"xp": 100, "money": [0, 1, 0, 0, 0]},
                "place_block": {"xp": 30, "money": [0, 1, 0, 0, 0]},
            },
            "everdawn.json": {
                "locate_structure": {"xp": 100, "money": [40, 1, 0, 0, 0]},
                "kill": {"xp": 20, "money": [8, 0, 0, 0, 0]},
                "obtain_item": {"xp": 200, "money": [0, 2, 0, 0, 0]},
                "place_block": {"xp": 40, "money": [48, 1, 0, 0, 0]},
            },
            "aether.json": {
                "locate_structure": {"xp": 120, "money": [0, 2, 0, 0, 0]},
                "kill": {"xp": 40, "money": [16, 0, 0, 0, 0]},
                "obtain_item": {"xp": 400, "money": [0, 4, 0, 0, 0]},
                "place_block": {"xp": 50, "money": [0, 2, 0, 0, 0]},
            },
            "nether.json": {
                "locate_structure": {"xp": 160, "money": [0, 3, 0, 0, 0]},
                "kill": {"xp": 50, "money": [32, 0, 0, 0, 0]},
                "obtain_item": {"xp": 800, "money": [0, 8, 0, 0, 0]},
                "place_block": {"xp": 100, "money": [0, 4, 0, 0, 0]},
            },
            "undergarden.json": {
                "locate_structure": {"xp": 240, "money": [0, 4, 0, 0, 0]},
                "kill": {"xp": 55, "money": [0, 1, 0, 0, 0]},
                "obtain_item": {"xp": 1600, "money": [0, 16, 0, 0, 0]},
                "place_block": {"xp": 200, "money": [0, 8, 0, 0, 0]},
            },
            "end.json": {
                "locate_structure": {"xp": 480, "money": [0, 16, 0, 0, 0]},
                "kill": {"xp": 60, "money": [32, 1, 0, 0, 0]},
                "obtain_item": {"xp": 2000, "money": [0, 32, 0, 0, 0]},
                "place_block": {"xp": 400, "money": [0, 16, 0, 0, 0]},
            },
            "depth.json": {
                "locate_structure": {"xp": 800, "money": [0, 32, 0, 0, 0]},
                "kill": {"xp": 70, "money": [0, 2, 0, 0, 0]},
                "obtain_item": {"xp": 3000, "money": [0, 0, 1, 0, 0]},
                "place_block": {"xp": 800, "money": [0, 32, 0, 0, 0]},
            },
            "abyss.json": {
                "locate_structure": {"xp": 1200, "money": [0, 48, 0, 0, 0]},
                "kill": {"xp": 80, "money": [0, 3, 0, 0, 0]},
                "obtain_item": {"xp": 4000, "money": [0, 32, 1, 0, 0]},
                "place_block": {"xp": 1000, "money": [0, 0, 1, 0, 0]},
            },
            "frost.json": {
                "locate_structure": {"xp": 1600, "money": [0, 32, 1, 0, 0]},
                "kill": {"xp": 100, "money": [32, 4, 0, 0, 0]},
                "obtain_item": {"xp": 5000, "money": [0, 0, 2, 0, 0]},
                "place_block": {"xp": 1000, "money": [0, 0, 1, 0, 0]},
            }
        }

        logging.basicConfig(
            filename="quest_errors.log",
            level=logging.WARNING,
            format="%(asctime)s - %(levelname)s - %(message)s"
        )

    def convert_money(self, reward):
        """Normalize simple primary rewards into proper wallet denominations (base-64)."""
        if len(reward) == 5 and reward[1:5] == [0, 0, 0, 0]:
            total = reward[0]
            result = [0, 0, 0, 0, 0]
            for i in range(5):
                result[i] = total % 64
                total //= 64
            return result
        return reward

    def format_money(self, reward):
        result = reward[:]
        for i in range(len(result) - 1):
            if result[i] > 64:
                carry = result[i] // 64
                result[i] = result[i] % 64
                result[i + 1] += carry
        if result[-1] > 64:
            result[-1] = result[-1] % 64
        return result

    def get_travel_multiplier(self, index):
        """Dynamically double travel_dimension rewards per file index."""
        return 2 ** index  # overworld=1x, everbright=2x, everdawn=4x, etc.

    def process_files(self):
        if not os.path.exists(self.folder):
            print(f"Error: The folder '{self.folder}' does not exist.")
            return

        for i, name in enumerate(self.quest_files):
            filename = f"{name}.json"
            file_path = os.path.join(self.folder, filename)
            if not os.path.exists(file_path):
                logging.warning(f"File '{filename}' not found. Skipping.")
                print(f"Warning: File '{filename}' not found. Skipping.")
                continue

            try:
                with open(file_path, "r") as file:
                    data = json.load(file)

                modified = False
                multiplier = self.get_travel_multiplier(i)

                for quest_id, quest in data.items():
                    quest_type = quest.get("type")
                    count = int(quest.get("count", 1))

                    if not quest_type:
                        logging.warning(f"No 'type' in quest '{quest_id}' of file '{filename}'.")
                        continue

                    mapping = self.file_mappings.get(filename, {}).get(quest_type, self.base_mappings.get(quest_type))
                    if not mapping:
                        logging.warning(f"Unknown quest type '{quest_type}' in {filename}.")
                        continue

                    base_xp = mapping["xp"]
                    base_money = mapping["money"]

                    # Dynamic travel_dimension scaling
                    if quest_type == "travel_dimension":
                        base_xp = self.base_mappings["travel_dimension"]["xp"] * multiplier
                        base_money = [x * multiplier for x in self.base_mappings["travel_dimension"]["money"]]

                    # Base XP and money per count
                    xp = base_xp * count
                    money = [x * count for x in base_money]

                    if quest_type == "break_block":
                        money = self.base_mappings["break_block"]["money"]
                        money[0]*=quest['count']

                    # Special case: kill + match.mode == 'exact'
                    if quest_type == "kill" and isinstance(quest.get("match"), dict):
                        if quest["match"].get("mode") == "exact":
                            xp *= 100
                            # Convert list to a total, scale, then reconvert
                            total = money[0] + money[1]*64 + money[2]*4096 + money[3]*262144 + money[4]*16777216
                            total *= 100
                            money = [total, 0, 0, 0, 0]  # flatten to primary, then convert & format later

                    # Apply conversion and formatting
                    money = self.convert_money(money)
                    money = self.format_money(money)

                    quest["xp"] = xp
                    quest["reward"] = money
                    modified = True

                if modified:
                    with open(file_path, "w") as file:
                        json.dump(data, file, indent=2)

            except Exception as e:
                logging.error(f"Error processing {filename}: {e}")
                print(f"Error processing {filename}: {e}")


if __name__ == "__main__":
    modifier = QuestModifier("quests")
    modifier.process_files()

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

        rewards = quest_data['reward']
        new_description = quest_data['description']

        new_description+="\n\nREWARDS:"

        for coin_id in range(0,len(COINS)):
            if rewards[coin_id]>0:
                new_description+=f"\n{RESET}- {rewards[coin_id]} {COLORS[COINS[coin_id]]}{COIN_CHAR}"

        quest_data['description'] = new_description

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
