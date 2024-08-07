import json
config_path = 'config\custom_item_attributes.json5'
base_config = {
  "items": [
  ]
}

def remove_duplicate_modifiers():
    used_item_ids = []
    unique_config = {
        "items": [
        ]
    }

    for item in base_config.get('items'):
        item_name = item.get('item')
        if item_name not in used_item_ids:
            used_item_ids.append(item_name)
            unique_config.get('items', []).append(item)
    
    return unique_config

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

def alter_config(new_item_config):
    items = base_config.get("items", [])

    for index in range(0, len(items)):
        item = items[index]
        item_name = item.get('item')
        if item_name == new_item_config.get('item'):
            items.pop(index)
            items.append(fill_config_item_gaps(new_item_config))
            return
    
    base_config.get("items", []).append(fill_config_item_gaps(new_item_config))

def new_item_config(mod_id, item_id, item_type, mod_map):
    overrides = []
    for attr, modification in mod_map.items():
        overrides.append({
            "attribute": attr,
            "value": modification[0],
            "operation": modification[1]
        })

    if item_type in ['sword', 'bow']:
        new_item_config = {
            "item": f"{mod_id}:{item_id}",
            "overrides_main_hand": overrides,
        }
        alter_config(new_item_config)

    if item_type == 'helmet':
        new_item_config = {
            "item": f"{mod_id}:{item_id}",
            "overrides_head": overrides,
        }
        alter_config(new_item_config)

    if item_type == 'chestplate':
        new_item_config = {
            "item": f"{mod_id}:{item_id}",
            "overrides_chest": overrides,
        }
        alter_config(new_item_config)

    if item_type == 'leggings':
        new_item_config = {
            "item": f"{mod_id}:{item_id}",
            "overrides_legs": overrides,
        }
        alter_config(new_item_config)

    if item_type == 'boots':
        new_item_config = {
            "item": f"{mod_id}:{item_id}",
            "overrides_feet": overrides,
        }
        alter_config(new_item_config)

    if item_type == 'offhand':
        new_item_config = {
            "item": f"{mod_id}:{item_id}",
            "overrides_off_hand": overrides,
        }
        base_config.get("items", []).append(fill_config_item_gaps(new_item_config))


def new_armor_set_config(mod_id, material_prefix, armor_list, armor_toughness, knockback_resistance, hp_bonus=[0,0,0,0], speed_bonus =[0,0,0,0], full_id=False, actual_piece=None):
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
    speed_map = {
        'helmet' : speed_bonus[0],
        'chestplate' : speed_bonus[1],
        'leggings' : speed_bonus[2],
        'boots' : speed_bonus[3]        
    }

    pieces = ['helmet', 'chestplate', 'leggings', 'boots']
    if full_id:
        pieces = [actual_piece]
    
    for piece in pieces:
        attr_config = {
                "minecraft:generic.armor" : (armor_map[piece],'ADDITION'),
                "minecraft:generic.armor_toughness" : (armor_toughness,'ADDITION'),
                "minecraft:generic.knockback_resistance" : (knockback_resistance,'ADDITION')
            }
        
        if hp_map[piece] != 0:
            attr_config["minecraft:generic.max_health"] = (hp_map[piece],'ADDITION')

        if speed_map[piece] != 0:
            attr_config["minecraft:generic.movement_speed"] = (speed_map[piece],'MULTIPLY_TOTAL')

        if full_id:
            new_item_config(mod_id, material_prefix, piece, attr_config)
        else:
            new_item_config(mod_id,f'{material_prefix}_{piece}', piece, attr_config)

def new_armor_piece_config(mod_id, full_item_id, armor, armor_toughness, knockback_resistance, hp_bonus=0, speed_bonus= 0, actual_piece = 'helmet'):
    armor_arg = [armor, 0, 0, 0]
    if actual_piece == 'chestplate':
        armor_arg = [0, armor, 0, 0]
    if actual_piece == 'leggings':
        armor_arg = [0, 0, armor, 0]
    if actual_piece == 'boots':
        armor_arg = [0, 0, 0, armor]
    new_armor_set_config(mod_id, full_item_id, armor_list=armor_arg, armor_toughness=armor_toughness, knockback_resistance=knockback_resistance, hp_bonus=[hp_bonus, 0, 0, 0], speed_bonus=[speed_bonus, 0, 0, 0], full_id=True, actual_piece=actual_piece)

def new_bow_config(mod_id, material_prefix, damage, full_id=False):
    attr_config = {
        "projectile_damage:generic" : (damage,'ADDITION'),
    }    
    new_item_config(mod_id,f"{material_prefix}_bow" if not full_id else material_prefix,'bow',attr_config)

def new_sword_config(mod_id, material_prefix, damage, full_id=False, attack_speed = 0.0):
    attr_config = {
        "minecraft:generic.attack_damage" : (damage,'ADDITION'),
    }
    if attack_speed!=0:
        attr_config['minecraft:generic.attack_speed'] = (attack_speed,'ADDITION')

    new_item_config(mod_id,f"{material_prefix}_sword" if not full_id else material_prefix,'sword',attr_config)

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

# Non destructive shit
with open(config_path, 'r') as f:
    try:
        base_config = json.loads(f.read())
    except Exception:
        pass


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

# betternether:cincinnasite_axe
# Nether 
new_armor_set_config("betternether", "cincinnasite", [7,8,7,6], 4, 0.125)
new_armor_set_config("betternether", "nether_ruby", [8,12,10,7], 5.6, 0.05)
new_armor_set_config("betternether", "flaming_ruby", [8,13,10,8], 4.4, 0.0)
new_sword_config("minecraft","netherite", 30)
new_sword_config("nethersdelight","netherite_machete", 30, full_id=True)

# Undergarden
new_armor_set_config("call_of_yucutan", "warrior", [11,15,11,11], 5, 0.3)
new_armor_set_config("call_of_yucutan", "huracan",[11,15,11,11], 5, 0.3)
new_armor_set_config("call_of_yucutan", "monkey", [11,15,11,11], 5, 0.3)

new_armor_set_config("undergarden", "froststeel", [11,15,11,11], 5, 0.3, speed_bonus=[0.05, 0.05, 0.05, 0.05])
new_sword_config("undergarden","forgotten_battleaxe", 259, full_id=True)
new_sword_config("undergarden","cloggrum_battleaxe", 171, full_id=True)
new_sword_config("mokels_boss_mantyd","mantyd_scythe", 85, full_id=True)
new_sword_config("call_of_yucutan","sentient_vine", 81, full_id=True)
new_sword_config("call_of_yucutan","jade", 80)
new_armor_set_config("call_of_yucutan", "jades", [14.5,19.5,16.5,14.5], 8.5, 0.375)
new_armor_set_config("mokels_boss_mantyd", "mantydhelmet", [14,0,0,0], 8, 0.325)


# end related content
new_sword_config("endlessbiomes","void_touched_blade", 95, full_id=True)
new_sword_config("outer_end","sinker_dagger", 95, full_id=True)
new_sword_config("betterend","thallasium", 100)
new_sword_config("betterend","terminite", 125)
new_sword_config("betterend","aeternium", 155)

new_armor_piece_config("endlessbiomes", "void_touched_leggings_leggings", 17, 9, 0.4, actual_piece="leggings")
new_armor_piece_config("endlessbiomes", "void_touched_boots_boots", 15, 9, 0.4, actual_piece="boots")
new_armor_set_config("endlessbiomes", "anklor_shell_armour", [15,21,17,15], 9, 0.35)
new_armor_set_config("outer_end", "rose_crystal", [15,21,17,15], 8, 0.3)
new_armor_set_config("outer_end", "cobalt_crystal", [15,21,17,15], 8, 0.3)
new_armor_set_config("outer_end", "mint_crystal", [15,21,17,15], 8, 0.3)

new_armor_set_config("betterend", "thallasium", [18,28,23,18], 10, 0.45)
new_armor_set_config("betterend", "terminite", [25,38,31,25], 10, 0.45)
new_armor_set_config("betterend", "aeternium", [31,46,40,31], 7.5, 0.3)
new_armor_set_config("betterend", "crystalite", [40,59,49,40], 10.8, 0.45)


# deeper and darker
new_sword_config("callfromthedepth_","immemorialsword", 170, full_id=True)
new_armor_set_config("callfromthedepth_", "depth_armor", [50,70,60,50], 7.5, 0.45)
new_sword_config("callfromthedepth_","soul_blade", 190, full_id=True, attack_speed=0.4)

# The abyss
new_armor_set_config("theabyss", "fusion_armor", [60,85,70,60], 10.5, 0.6)
new_sword_config("theabyss","fusion", 220)

new_armor_set_config("theabyss", "aberythe_armor", [70,100,80,70], 11.5, 0.6)
new_sword_config("theabyss","aberythe", 230)

new_armor_set_config("theabyss", "bone_armor", [80,110,90,80], 11.5, 0.6)
new_sword_config("theabyss","bone_sword_item", 240, full_id=True)

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



# Mixed config generator
# TBA
def new_bow(mod_id, item_id, damage, durability):
    new_bow_config(mod_id, item_id, damage, full_id=True)
    new_kjs_config_durability(mod_id, item_id, durability)

def new_offhand(mod_id, item_id, attributes):
    attr_config = {}
    for attr, modification in attributes.items():
        attr_config[attr] = modification
    new_item_config(mod_id,f"{item_id}",'offhand',attr_config)

def new_tools(mod_id, material, durability, sword_dmg, full_id = False, attack_speed = 0):
    new_kjs_config_durability_tools(mod_id, material, durability)
    new_sword_config(mod_id, material, sword_dmg, full_id, attack_speed)

# ///////////////////////////////////

# blue skies

new_kjs_config_durability_material("blue_skies", "pyrope", 1600, get_durability_list_from_helmet(390))
new_kjs_config_durability_material("blue_skies", "aquite", 1700, get_durability_list_from_helmet(410))
new_kjs_config_durability_material("blue_skies", "diopside", 1800, get_durability_list_from_helmet(430))
new_kjs_config_durability_material("blue_skies", "charoite", 1900, get_durability_list_from_helmet(450))
new_kjs_config_durability_material("blue_skies", "horizonite", 2000, get_durability_list_from_helmet(475))

# netherite
new_kjs_config_durability("nethersdelight","netherite_machete", 3100)

# undergarden
new_kjs_config_durability_tools("call_of_yucutan", "jade", 4000)
new_kjs_config_durability_armor_set("call_of_yucutan", "jades", get_durability_list_from_helmet(2925))
new_kjs_config_durability("call_of_yucutan","sentient_vine", 4000)
new_kjs_config_durability("mokels_boss_mantyd","mantyd_scythe", 4300)
new_kjs_config_durability_armor_set("mokels_boss_mantyd", "mantydhelmet", get_durability_list_from_helmet(2950))


# ende related
new_kjs_config_durability("endlessbiomes", "void_touched_blade", 4400)
new_kjs_config_durability("outer_end", "sinker_dagger", 4400)
new_kjs_config_durability_armor_set("endlessbiomes", "void_touched_boots",  get_durability_list_from_helmet(2950))
new_kjs_config_durability_armor_set("endlessbiomes", "void_touched_leggings",  get_durability_list_from_helmet(2950))
new_kjs_config_durability_armor_set("endlessbiomes", "anklor_shell_armour", get_durability_list_from_helmet(2950))
new_kjs_config_durability_armor_set("outer_end", "rose_crystal", get_durability_list_from_helmet(2950))
new_kjs_config_durability_armor_set("outer_end", "cobalt_crystal", get_durability_list_from_helmet(2950))
new_kjs_config_durability_armor_set("outer_end", "mint_crystal", get_durability_list_from_helmet(2950))

new_kjs_config_durability_material("betterend", "thallasium", 4500, get_durability_list_from_helmet(3000))
new_kjs_config_durability_material("betterend", "terminite", 4950, get_durability_list_from_helmet(3200))
new_kjs_config_durability_material("betterend", "aeternium", 5250, get_durability_list_from_helmet(3400))
new_kjs_config_durability_armor_set("betterend", "crystalite",  get_durability_list_from_helmet(3890))

# deeper
new_kjs_config_durability_armor_set("callfromthedepth_", "depth_armor", get_durability_list_from_helmet(4100))
for piece in ['sword', 'axe', 'pickaxe', 'shovel', 'hoe']:
    new_kjs_config_durability("callfromthedepth_", f"immemorial{piece}", 5700)
new_kjs_config_durability("callfromthedepth_", "soul_blade", 5900)

# Abyss

new_kjs_config_durability_armor_set("theabyss", "fusion_armor",  get_durability_list_from_helmet(4400))
new_kjs_config_durability_tools("theabyss", "fusion", 6100)

new_kjs_config_durability_armor_set("theabyss", "aberythe_armor",  get_durability_list_from_helmet(4500))
new_kjs_config_durability_tools("theabyss", "aberythe", 6250)

new_kjs_config_durability_armor_set("theabyss", "bone_armor",  get_durability_list_from_helmet(4650))
new_kjs_config_durability_tools("theabyss", "bone", 6500)
new_kjs_config_durability("theabyss", "bone_sword_item", 6500)

new_kjs_config_durability_armor_set("theabyss", "ignisithe_armor", get_durability_list_from_helmet(4890))
new_kjs_config_durability("theabyss", "ignisithe_sword", 6750)
new_kjs_config_durability("theabyss", "bricked_knight_sword", 6750)

new_kjs_config_durability_armor_set("theabyss", "glacerythe_armor",  get_durability_list_from_helmet(5100))
new_kjs_config_durability_tools("theabyss", "knight", 7000)

new_kjs_config_durability_armor_set("theabyss", "garnite_armor", get_durability_list_from_helmet(5200))
new_kjs_config_durability_tools("theabyss", "garnite", 7250)

new_kjs_config_durability_armor_set("theabyss", "phantom_armor", get_durability_list_from_helmet(5350))
new_kjs_config_durability_tools("theabyss", "phantom", 7500)

new_kjs_config_durability_armor_set("theabyss", "unorithe_armor", get_durability_list_from_helmet(5600))
new_kjs_config_durability_tools("theabyss", "unorithe", 7750)
new_kjs_config_durability("theabyss", "unorithe_pick_axe", 7750)

new_kjs_config_durability_armor_set("theabyss", "incorythe_armor", get_durability_list_from_helmet(6200))
new_kjs_config_durability_tools("theabyss", "incorythe", 8000)
new_kjs_config_durability("theabyss", "incorythe_sword_mkii", 8000)

new_kjs_config_durability("theabyss", "abyss_sword", 8300)


# Bows
# /////////////////////////


new_bow('magistuarmory', 'longbow', 7, 400)
# Blue Skies
new_bow('zoomer_bows', 'pyrope_bow', 8, 420)
new_bow('zoomer_bows', 'aquite_bow', 8.5, 430)
new_bow('zoomer_bows', 'diopside_bow', 9, 440)
new_bow('zoomer_bows', 'charoite_bow', 10, 450)
new_bow('zoomer_bows', 'horizonite_bow', 11, 460)

# Aether
new_bow('zoomer_bows', 'zanite_bow', 12, 470)
new_bow('zoomer_bows', 'gravitite_bow', 13, 480)
new_bow('zoomer_bows', 'valkyrie_bow', 14, 490)
new_bow('aether', 'phoenix_bow', 15, 500)

# Nether
new_bow('zoomer_bows', 'cincinnasite_bow', 20, 600)
new_bow('zoomer_bows', 'cincinnasite_diamond_bow', 22, 700)
new_bow('zoomer_bows', 'nether_ruby_bow', 24, 800)
new_bow('zoomer_bows', 'fire_ruby_bow', 26, 900)
new_bow('zoomer_bows', 'netherite_bow', 28, 1000)

# Undergarden
new_bow('zoomer_bows', 'cloggrum_bow', 64, 1250)
new_bow('zoomer_bows', 'froststeel_bow', 74, 1500)
new_bow('zoomer_bows', 'utherium_bow', 85, 1750)
new_bow('zoomer_bows', 'forgotten_bow', 96, 2000)

# End
new_bow('zoomer_bows', 'thallasium_bow', 111, 2300)
new_bow('zoomer_bows', 'terminite_bow', 139, 2600)
new_bow('zoomer_bows', 'aeternium_bow', 172, 2900)

# Deeper and Darker
new_bow('callfromthedepth_', 'soulbow', 220, 3200)

# Abyss
new_bow('zoomer_bows', 'fusion_bow', 272, 3500)
new_bow('zoomer_bows', 'aberythe_bow', 282, 4000)
new_bow('zoomer_bows', 'bone_bow', 323, 4500)
new_bow('zoomer_bows', 'ignisithe_bow', 354, 5000)
new_bow('zoomer_bows', 'garnite_bow', 366, 5500)
new_bow('zoomer_bows', 'phantom_bow', 392, 6000)
new_bow('zoomer_bows', 'unorithe_bow', 476, 6500)
new_bow('zoomer_bows', 'incorythe_bow', 531, 7000)

new_offhand('zoomers_magic', "pyromancer_offhand", {
    "irons_spellbooks:fire_spell_power": (0.5,'MULTIPLY_BASE'),
})


# Saving + removing duplicates
# ////////////////////////////////////////////////////////////////////
clean_config = remove_duplicate_modifiers()
with open(config_path, 'w+') as f:
    f.write(json.dumps(clean_config, indent=4))

# Saving
# ////////////////////////////////////////////////////////////////////
with open('kubejs\startup_scripts\general_durability.js', 'w+') as f:
    f.write(js_base_str.replace('{--}',''))
