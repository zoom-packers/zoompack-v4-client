import json

# Erros with cia cuz attr is null? run this!


cia_path = 'config\custom_item_attributes.json5'
cia_config = {}

with open(cia_path, 'r') as f:
    cia_config = json.loads(f.read())

new_items = []

all_items = []

unique_items = {}

for item in cia_config['items']:
    mods_clean = True
    if item.get('item') in all_items:
        continue
    all_items.append(item.get('item'))

    for mod in ['overrides_off_hand', 'overrides_main_hand', 'overrides_head', 'overrides_chest', 'overrides_legs', 'overrides_feet']:
        item_mods = item[mod]

        for item_mod in item_mods:
            if not item_mod.get('attribute'):
                mods_clean = False

    mod_id = item.get('item').split(':')[0]
    item_id = item.get('item').split(':')[1]
    if mod_id == 'zoomers_armory':
        if 'flint_' in item_id:
            mods_clean = False
        
    if mods_clean:
        new_items.append(item)

# print(f"total items: {len(all_items)}")
# print(f"uniq items: {len(list(set(all_items)))}")

new_config = { "items":new_items}

with open(cia_path, 'w+') as f:
    f.write(json.dumps(new_config, indent=4))
