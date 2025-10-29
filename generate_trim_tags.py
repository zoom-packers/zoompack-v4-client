import json
import os

# SCRIPT REQUIRED TO BE RAN ON MASTER ASWELL

pmmo_generic_path = 'pmmo/items'
pmmo_edits_path = 'config/paxi/datapacks/pmmo_level_limiter/data'
TRIM_TAGS_FILE_PATH = 'kubejs/data/minecraft/tags/items/trimmable_armor.json'
CIAT_FILE_PATH = 'config\custom_item_attributes.json5'
server_scripts_path = f'kubejs/server_scripts'

BANNED_WORDS = ['offhand']

def generate_server_js_tags_file(file_path, items, tag):
    with open(file_path, 'w+', encoding='utf-8') as file:
        file.write("ServerEvents.tags('item', event => {\n")
        
        for item in items:
            file.write(f"""\t\tevent.add('{tag}', '{item}');\n""")
        
        file.write("});\n")

def include_item_ids_from_CIA(cia_path, gathered_armor_trim_ids):
    cia_item_ids = []

    with open(cia_path, 'r') as f:
        cia_data = json.loads(f.read())
        for cia_entry in cia_data.get('items'):
            item_id = cia_entry.get('item')

            overrides_off_hand = cia_entry.get('overrides_off_hand')
            overrides_main_hand = cia_entry.get('overrides_main_hand')

            len_overrides_off_hand = len(overrides_off_hand)
            len_overrides_main_hand = len(overrides_main_hand)

            if len_overrides_off_hand == 0  and len_overrides_main_hand == 0 and item_id not in gathered_armor_trim_ids:
                cia_item_ids.append(item_id)

    return list(set(gathered_armor_trim_ids) | set(cia_item_ids))

def update_trim_tag_file(file_path, new_item_ids):
    count_new_trimmable_items = 0
    current_items_trimmable = []
    previous_trim_data = {}

    with open(file_path,'r') as f:
        trim_file_data = json.loads(f.read())
        current_items_trimmable = trim_file_data.get('values', [])

    for new_item_id in new_item_ids:
        if new_item_id not in current_items_trimmable:
            count_new_trimmable_items+=1
            current_items_trimmable.append(new_item_id)
    
    previous_trim_data['replace'] = False
    previous_trim_data['values'] = current_items_trimmable

    with open(file_path,'w+') as f:
        f.write(json.dumps(previous_trim_data, indent=4))

    return count_new_trimmable_items

def is_config_path_armor(item_config_path):
    with open(item_config_path, 'r') as f:
        config_content = json.loads(f.read())
        requirements = config_content.get('requirements', {})
        no_req = len(requirements)
        has_wear = 'WEAR' in requirements

        return no_req == 1 and has_wear

def is_item_id_allowed(item_id):
    for word in BANNED_WORDS:
        if word in item_id:
            return False
    return True

ARMOR_ITEM_IDS = []

mod_ids = os.listdir(pmmo_edits_path)
for mod_id in mod_ids:
    if '.js' not in mod_id:
        try:
            mod_items = os.listdir(f'{pmmo_edits_path}/{mod_id}/{pmmo_generic_path}')
            for mod_item in mod_items:
                mod_item_id = mod_item.replace('.json','')
                mod_item_path = f'{pmmo_edits_path}/{mod_id}/{pmmo_generic_path}/{mod_item}'
                item_id = f'{mod_id}:{mod_item_id}'

                if is_config_path_armor(mod_item_path) and is_item_id_allowed(mod_item_id):
                    ARMOR_ITEM_IDS.append(item_id)
        except FileNotFoundError:
            pass

ARMOR_ITEM_IDS = include_item_ids_from_CIA(CIAT_FILE_PATH, ARMOR_ITEM_IDS)

# This script grabs data from pmmo edits and cia and generates trimmable tags for armors (pmmo only wear in config + cia overrides not on mainhand or offhand)

generate_server_js_tags_file(f'{server_scripts_path}/tags/trimmable_generated_tags.js', sorted(ARMOR_ITEM_IDS), f'minecraft:trimmable_armor')
print('ZOOM >>> Trimmable Armor Tags Generated')
