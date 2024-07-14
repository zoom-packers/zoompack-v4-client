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


def new_sword_config(mod_id, material_prefix, damage, full_id=False):
    new_item_config(mod_id,f"{material_prefix}_sword" if not full_id else material_prefix,'sword',{
        "minecraft:generic.attack_damage" : (damage,'ADDITION'),
    })

def get_durability_list_from_helmet(helmet_durability):
    shares = {
        'helm': 0.20,
        'chest': 0.29,
        'leggings': 0.27,
        'boots': 0.24
    }
    total_quantity = helmet_durability / shares['helm']

    quantities = [
        int(helmet_durability),
        int(shares['chest'] * total_quantity),
        int(shares['leggings'] * total_quantity),
        int(shares['boots'] * total_quantity)
    ]

    return quantities

# Custom item attributes config generator
# ////////////////////////////////////////////////////////////////////

# blue skies
new_armor_set_config("blue_skies", "pyrope", [1.5,3.5,2.5,2.5], 2, 0)
new_sword_config("blue_skies","pyrope", 0.5) #7.5

new_armor_set_config("blue_skies", "aquite", [2,3,2,2], 2, 0)
new_sword_config("blue_skies","aquite", 2) #8

new_armor_set_config("blue_skies", "diopside", [2,2.25,2,2], -2, 0)
# new_sword_config("blue_skies","diopside", 0) #9

new_armor_set_config("blue_skies", "charoite", [1,1.5,1.25,1.5], 0.5, 0)
new_sword_config("blue_skies","charoite", 3) #10

new_armor_set_config("blue_skies", "horizonite", [2.5,4.5,3.5,3.5], 2.5, 0)
new_sword_config("blue_skies","horizonite", 4.5) #10.5


# Undergarden
new_armor_set_config("undergarden", "froststeel", [11,15,11,11], 5, 0.3)
new_sword_config("undergarden","forgotten_battleaxe", 259, full_id=True)
new_sword_config("undergarden","cloggrum_battleaxe", 171, full_id=True)

# end related content
new_sword_config("betterend","thallasium", 100)
new_sword_config("betterend","terminite", 125)
new_sword_config("betterend","aeternium", 155)

new_armor_set_config("endlessbiomes", "anklor_shell_armour", [15,21,17,15], 9, 0.35)
new_armor_set_config("outer_end", "rose_crystal", [15,21,17,15], 8, 0.3)
new_armor_set_config("outer_end", "cobalt_crystal", [15,21,17,15], 8, 0.3)
new_armor_set_config("outer_end", "mint_crystal", [15,21,17,15], 8, 0.3)

new_armor_set_config("betterend", "thallasium", [18,28,23,18], 10, 0.45)
new_armor_set_config("betterend", "terminite", [25,38,31,25], 10, 0.45)
new_armor_set_config("betterend", "aeternium", [31,46,40,31], 7.5, 0.3)
new_armor_set_config("betterend", "crystalite", [40,59,49,40], 10.8, 0.45)


# deeper and darker
new_sword_config("deeperdarker","warden", 200)
new_armor_set_config("deeperdarker", "warden", [50,70,60,50], 9, 0.5)


# The abyss
new_armor_set_config("theabyss", "aberythe_armor", [70,100,80,70], 11.5, 0.6)
new_sword_config("theabyss","aberythe", 200)

new_armor_set_config("theabyss", "bone_armor", [80,110,90,80], 11.5, 0.6)
new_sword_config("theabyss","bone_sword_item", 220, full_id=True)

new_armor_set_config("theabyss", "ignisithe_armor", [90,120,100,90], 10.5, 0.625)
new_sword_config("theabyss","ignisithe", 260)
new_sword_config("theabyss","bricked_knight", 276)

new_armor_set_config("theabyss", "glacerythe_armor", [100,130,110,100], 10.5, 0.45)
new_sword_config("theabyss","knight", 280)

new_armor_set_config("theabyss", "garnite_armor", [110,140,120,110], 11.5, 0.375)
new_sword_config("theabyss","garnite", 300)

new_armor_set_config("theabyss", "phantom_armor", [120,150,130,120], 12, 0.6)
new_sword_config("theabyss","phantom", 320)

new_armor_set_config("theabyss", "unorithe_armor", [130,160,140,130], 14, 0.425)
new_sword_config("theabyss","unorithe", 350)

new_armor_set_config("theabyss", "incorythe_armor", [150,170,150,150], 13, 0.55)
new_sword_config("theabyss","incorythe", 390)
new_sword_config("theabyss","incorythe_sword_mkii", 420, full_id=True)

new_sword_config("theabyss","abyss_sword", 420, full_id=True)


# Saving
# ////////////////////////////////////////////////////////////////////
with open(config_path, 'w+') as f:
    f.write(json.dumps(base_config, indent=4))

# Kube JS config generator

js_base_str = """
ItemEvents.modification((event) => {
    {--}
});
"""

def new_kjs_config_durability(mod_id, item_id, durability):
    global js_base_str
    new_js = """event.modify(\"""" + mod_id + ':' + item_id + """\", item => {
        item.maxDamage = """ + str(durability) + """;
    });
    {--}"""
    js_base_str = js_base_str.replace('{--}', new_js)

def new_kjs_config_durability_armor_set(mod_id, material, durability_list):
    armor_durabilities = {
        'helmet':durability_list[0],
        'chestplate':durability_list[1],
        'leggings':durability_list[2],
        'boots':durability_list[3],
    }
    for piece in ['helmet', 'chestplate', 'leggings', 'boots']:
        new_kjs_config_durability(mod_id, f'{material}_{piece}', armor_durabilities[piece])

def new_kjs_config_durability_tools(mod_id, material, durability):
    for piece in ['sword', 'axe', 'pickaxe', 'shovel', 'hoe']:
        new_kjs_config_durability(mod_id, f'{material}_{piece}', durability)

def new_kjs_config_durability_material(mod_id, material, durability_tools, durability_armor_list):
    new_kjs_config_durability_tools(mod_id, material, durability_tools)
    new_kjs_config_durability_armor_set(mod_id, material, durability_armor_list)
# ///////////////////////////////////

# blue skies

new_kjs_config_durability_material("blue_skies", "pyrope", 1600, get_durability_list_from_helmet(390))
new_kjs_config_durability_material("blue_skies", "aquite", 1700, get_durability_list_from_helmet(410))
new_kjs_config_durability_material("blue_skies", "diopside", 1800, get_durability_list_from_helmet(430))
new_kjs_config_durability_material("blue_skies", "charoite", 1900, get_durability_list_from_helmet(450))
new_kjs_config_durability_material("blue_skies", "horizonite", 2000, get_durability_list_from_helmet(475))

# ende related
new_kjs_config_durability_armor_set("endlessbiomes", "anklor_shell_armour", get_durability_list_from_helmet(2950))
new_kjs_config_durability_armor_set("outer_end", "rose_crystal", get_durability_list_from_helmet(2950))
new_kjs_config_durability_armor_set("outer_end", "cobalt_crystal", get_durability_list_from_helmet(2950))
new_kjs_config_durability_armor_set("outer_end", "mint_crystal", get_durability_list_from_helmet(2950))

new_kjs_config_durability_material("betterend", "thallasium", 4500, get_durability_list_from_helmet(3000))
new_kjs_config_durability_material("betterend", "terminite", 4950, get_durability_list_from_helmet(3200))
new_kjs_config_durability_material("betterend", "aeternium", 5250, get_durability_list_from_helmet(3400))
new_kjs_config_durability_armor_set("betterend", "crystalite",  get_durability_list_from_helmet(3890))

# deeper
new_kjs_config_durability_material("deeperdarker", "warden", 6000,  get_durability_list_from_helmet(4300))

# Abyss

new_kjs_config_durability_armor_set("theabyss", "aberythe_armor",  get_durability_list_from_helmet(4500))
new_kjs_config_durability_tools("theabyss", "aberythe", 6250)

new_kjs_config_durability_armor_set("theabyss", "bone_armor",  get_durability_list_from_helmet(4650))
new_kjs_config_durability_tools("theabyss", "bone", 6500)

new_kjs_config_durability_armor_set("theabyss", "ignisithe_armor", get_durability_list_from_helmet(4890))
new_kjs_config_durability("theabyss", "ignisithe_sword", 6750)
new_kjs_config_durability("theabyss", "bricked_knight_sword", 6750)

new_kjs_config_durability_armor_set("theabyss", "glacerythe_armor",  get_durability_list_from_helmet(5100))
new_kjs_config_durability("theabyss", "knight", 6750)

new_kjs_config_durability_armor_set("theabyss", "garnite_armor", get_durability_list_from_helmet(5200))
new_kjs_config_durability_tools("theabyss", "garnite", 7000)

new_kjs_config_durability_armor_set("theabyss", "phantom_armor", get_durability_list_from_helmet(5350))
new_kjs_config_durability_tools("theabyss", "phantom", 7250)

new_kjs_config_durability_armor_set("theabyss", "unorithe_armor", get_durability_list_from_helmet(5600))
new_kjs_config_durability_tools("theabyss", "unorithe", 7500)

new_kjs_config_durability_armor_set("theabyss", "incorythe_armor", get_durability_list_from_helmet(6200))
new_kjs_config_durability_tools("theabyss", "incorythe", 7750)
new_kjs_config_durability("theabyss", "incorythe_sword_mkii", 7750)

new_kjs_config_durability("theabyss", "abyss_sword", 8000)


# Saving
# ////////////////////////////////////////////////////////////////////
with open('kubejs\startup_scripts\general_durability.js', 'w+') as f:
    f.write(js_base_str.replace('{--}',''))