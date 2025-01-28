import json

CIAT_FILE_PATH = 'config\custom_item_attributes.json5'
server_scripts_path = f'kubejs/server_scripts'

def is_axe_by_id(item_id):
    return '_axe' in item_id or '_battleaxe' in item_id

def generate_server_js_tags_file(file_path, items, tag):
    with open(file_path, 'w+', encoding='utf-8') as file:
        file.write("ServerEvents.tags('item', event => {\n")
        
        for item in items:
            file.write(f"""\t\tevent.add('{tag}', '{item}');\n""")
        
        file.write("});\n")

def include_item_ids_from_CIA(cia_path):
    cia_item_ids = []

    with open(cia_path, 'r') as f:
        cia_data = json.loads(f.read())
        for cia_entry in cia_data.get('items'):
            item_id = cia_entry.get('item')

            overrides_main_hand = cia_entry.get('overrides_main_hand')

            len_overrides_main_hand = len(overrides_main_hand)

            if len_overrides_main_hand:
                cia_item_ids.append(item_id)

    return set(cia_item_ids)

generate_server_js_tags_file(f'{server_scripts_path}/axes_tags.js', [item_id for item_id in include_item_ids_from_CIA(CIAT_FILE_PATH) if is_axe_by_id(item_id)], 'medievalorigins:axes')