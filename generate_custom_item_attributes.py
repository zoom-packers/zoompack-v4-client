import json
config_path = 'config\custom_item_attributes.json5'
base_config = {
  "items": [
  ]
}

def fill_config_item_gaps(item_config):
    new_item_config = item_config.copy()

    if 'overrides_main_hand' not in new_item_config:
        new_item_config['overrides_main_hand'] = []

    if 'overrides_off_hand' not in new_item_config:
        new_item_config['overrides_off_hand'] = []

    if 'overrides_head' not in new_item_config:
        new_item_config['overrides_head'] = []

    if 'overrides_chest' not in new_item_config:
        new_item_config['overrides_chest'] = []

    if 'overrides_legs' not in new_item_config:
        new_item_config['overrides_legs'] = []

    if 'overrides_feet' not in new_item_config:
        new_item_config['overrides_feet'] = []

    if 'unbreakable' not in new_item_config:
        new_item_config['unbreakable'] = False

    return new_item_config.copy()

def new_item_config(mod_id, item_id, item_type, mod_map):
    overrides = []
    for attr, modification in mod_map.items():
        overrides.append({
            "attribute": attr,
            "value": modification[0],
            "operation": modification[1]
        })

    if item_type == 'sword':
        new_item_config = {
            "item": f"{mod_id}:{item_id}",
            "overrides_main_hand": overrides,
        }
        base_config.get("items", []).append(fill_config_item_gaps(new_item_config))

    if item_type == 'helmet':
        new_item_config = {
            "item": f"{mod_id}:{item_id}",
            "overrides_head": overrides,
        }
        base_config.get("items", []).append(fill_config_item_gaps(new_item_config))

    if item_type == 'chestplate':
        new_item_config = {
            "item": f"{mod_id}:{item_id}",
            "overrides_chest": overrides,
        }
        base_config.get("items", []).append(fill_config_item_gaps(new_item_config))

    if item_type == 'leggings':
        new_item_config = {
            "item": f"{mod_id}:{item_id}",
            "overrides_legs": overrides,
        }
        base_config.get("items", []).append(fill_config_item_gaps(new_item_config))

    if item_type == 'boots':
        new_item_config = {
            "item": f"{mod_id}:{item_id}",
            "overrides_feet": overrides,
        }
        base_config.get("items", []).append(fill_config_item_gaps(new_item_config))


def new_armor_set_config(mod_id, material_prefix, armor_list, armor_toughness, knockback_resistance, hp_bonus=[0,0,0,0]):
    armor_map = {
        'helmet' : armor_list[0],
        'chestplate' : armor_list[1],
        'leggings' : armor_list[2],
        'boots' : armor_list[3]
    }
    hp_map = {
        'helmet' : hp_bonus[0],
        'chestplate' : hp_bonus[1],
        'leggings' : hp_bonus[2],
        'boots' : hp_bonus[3]        
    }
    for piece in ['helmet', 'chestplate', 'leggings', 'boots']:
        if hp_map[piece] != 0:
            new_item_config(mod_id,f'{material_prefix}_{piece}', piece, {
                "minecraft:generic.armor" : (armor_map[piece],'ADDITION'),
                "minecraft:generic.armor_toughness" : (armor_toughness,'ADDITION'),
                "minecraft:generic.knockback_resistance" : (knockback_resistance,'ADDITION'),
                "minecraft:generic.max_health" : (hp_map[piece],'ADDITION')
            })
        else:
            new_item_config(mod_id,f'{material_prefix}_{piece}', piece, {
                "minecraft:generic.armor" : (armor_map[piece],'ADDITION'),
                "minecraft:generic.armor_toughness" : (armor_toughness,'ADDITION'),
                "minecraft:generic.knockback_resistance" : (knockback_resistance,'ADDITION'),
            })


def new_sword_config(mod_id, material_prefix, damage):
    new_item_config(mod_id,f"{material_prefix}_sword",'sword',{
        "minecraft:generic.attack_damage" : (damage,'ADDITION'),
    })

new_sword_config("betterend","thallasium", 100)
new_sword_config("betterend","terminite", 125)
new_sword_config("betterend","aeternium", 155)


new_armor_set_config("betterend", "thallasium", [18,28,23,18], 10, 0.45)
new_armor_set_config("betterend", "terminite", [25,38,31,25], 10, 0.45)
new_armor_set_config("betterend", "aeternium", [31,46,40,31], 7.5, 0.3)
new_armor_set_config("betterend", "crystalite", [40,59,49,40], 10.8, 0.45)

with open(config_path, 'w+') as f:
    f.write(json.dumps(base_config, indent=4))