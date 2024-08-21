import json
import os

# SCRIPT REQUIRED TO BE RAN ON MASTER ASWELL

pmmo_generic_path = 'pmmo/items'
pmmo_edits_path = 'config/paxi/datapacks/pmmo_level_limiter/data'
TRIM_TAGS_FILE_PATH = 'kubejs/data/minecraft/tags/items/trimmable_armor.json'

BANNED_WORDS = ['offhand']


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
        mod_items = os.listdir(f'{pmmo_edits_path}/{mod_id}/{pmmo_generic_path}')
        for mod_item in mod_items:
            mod_item_id = mod_item.replace('.json','')
            mod_item_path = f'{pmmo_edits_path}/{mod_id}/{pmmo_generic_path}/{mod_item}'
            item_id = f'{mod_id}:{mod_item_id}'

            if is_config_path_armor(mod_item_path) and is_item_id_allowed(mod_item_id):
                ARMOR_ITEM_IDS.append(item_id)

new_trimmed_items = update_trim_tag_file(TRIM_TAGS_FILE_PATH, ARMOR_ITEM_IDS)
print(f'ZOOM >>> {new_trimmed_items} New items are now trimmable')
