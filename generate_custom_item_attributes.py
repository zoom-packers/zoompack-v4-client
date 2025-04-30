import os
import json

#KJS
js_base_str = """
ItemEvents.modification((event) => {
    {--}
});
"""

js_cosmetics_base_str = js_base_str

def new_kjs_cosmetic(mod_id, item_id):
    global js_cosmetics_base_str
    new_js = """event.modify(\"""" + mod_id + ':' + item_id + """\", item => {
        item.armorProtection = -1;
        item.armorToughness = 0;
        item.maxDamage = 696;
    });
    {--}"""
    js_cosmetics_base_str = js_cosmetics_base_str.replace('{--}', new_js)

config_path = 'config\custom_item_attributes.json5'
BANNED_MODS = ["betterend"]
# These are mods that were removed so items in this mod shall be skipped at running

base_config = {
  "items": [
  ]
}

def item_is_not_banned(item_name):
    if ':' not in item_name:
        return True
    
    mod_id = item_name.split(':')[0]
    return mod_id not in BANNED_MODS

def remove_duplicate_modifiers():
    used_item_ids = []
    unique_config = {
        "items": [
        ]
    }

    for item in base_config.get('items'):
        item_name = item.get('item')
        if item_name not in used_item_ids and item_is_not_banned(item_name):
            used_item_ids.append(item_name)
            unique_config.get('items', []).append(item)
    
    return unique_config

def fill_config_item_gaps(item_config, cosmetic=False):
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

    new_item_config['unbreakable'] = cosmetic

    return new_item_config.copy()

def alter_config(new_item_config, cosmetic=False):
    items = base_config.get("items", [])

    for index in range(0, len(items)):
        item = items[index]
        item_name = item.get('item')
        if item_name == new_item_config.get('item'):
            items.pop(index)
            items.append(fill_config_item_gaps(new_item_config, cosmetic=cosmetic))
            return
    
    base_config.get("items", []).append(fill_config_item_gaps(new_item_config, cosmetic=cosmetic))

def new_item_config(mod_id, item_id, item_type, mod_map, cosmetic=False):
    overrides = []
    
    if isinstance(mod_map, dict):
        for attr, modification in mod_map.items():
            if modification[0] == 0 or modification[0] == 0.0:
                continue
            overrides.append({
                "attribute": attr,
                "value": modification[0],
                "operation": modification[1]
            })
    elif isinstance(mod_map, list):
        for attr_id, amount, operation in mod_map:
            if amount == 0 or amount == 0.0:
                continue 
            overrides.append({
                "attribute": attr_id,
                "value": amount,
                "operation": operation
            })

    new_item_config = {"item": f"{mod_id}:{item_id}"}
    
    if item_type in ['sword', 'bow', 'axe']:
        new_item_config["overrides_main_hand"] = overrides
    elif item_type == 'helmet':
        new_item_config["overrides_head"] = overrides
    elif item_type == 'chestplate':
        new_item_config["overrides_chest"] = overrides
    elif item_type == 'leggings':
        new_item_config["overrides_legs"] = overrides
    elif item_type == 'boots':
        new_item_config["overrides_feet"] = overrides
    elif item_type == 'offhand':
        new_item_config["overrides_off_hand"] = overrides

    if cosmetic:
        new_item_config['unbreakable'] = True

    filled_config = fill_config_item_gaps(new_item_config, cosmetic=cosmetic)
    base_config.setdefault("items", []).append(filled_config)

    alter_config(new_item_config, cosmetic=cosmetic)

class PolymorphArmoryVariants:
    PIERCE_MULTIPLIER = 3
    ARMOR_HP_FLAT_ADDITION = 2
    ARMOR_HP_MULTIPLIER = 0.23
    ARMOR_HELMET_FRACTION = 0.175
    ARMOR_CHESTPLATE_FRACTION = 0.4
    ARMOR_LEGGINGS_FRACTION = 0.3
    ARMOR_BOOTS_FRACTION = 0.125

def create_health_per_level_attributes(piece, tier):
    if piece == 'helmet':
        piece_multiplier = PolymorphArmoryVariants.ARMOR_HELMET_FRACTION
    elif piece == 'chestplate':
        piece_multiplier = PolymorphArmoryVariants.ARMOR_CHESTPLATE_FRACTION
    elif piece == 'leggings':
        piece_multiplier = PolymorphArmoryVariants.ARMOR_LEGGINGS_FRACTION
    else:
        piece_multiplier = PolymorphArmoryVariants.ARMOR_BOOTS_FRACTION

    return [
        ('minecraft:generic.max_health', PolymorphArmoryVariants.ARMOR_HP_FLAT_ADDITION * piece_multiplier * tier, 'ADDITION'),
        ('minecraft:generic.max_health', PolymorphArmoryVariants.ARMOR_HP_MULTIPLIER * piece_multiplier * tier, 'MULTIPLY_BASE')
    ]

def new_armor_set_config(
        mod_id, material_prefix, armor_list, armor_toughness, knockback_resistance, 
        hp_bonus=[0, 0, 0, 0], speed_bonus=[0, 0, 0, 0], full_id=False, 
        actual_piece=None, cosmetic=False, hp_tier=None):
    
    armor_map = {
        'helmet': armor_list[0],
        'chestplate': armor_list[1],
        'leggings': armor_list[2],
        'boots': armor_list[3]
    }
    hp_map = {
        'helmet': hp_bonus[0],
        'chestplate': hp_bonus[1],
        'leggings': hp_bonus[2],
        'boots': hp_bonus[3]
    }
    speed_map = {
        'helmet': speed_bonus[0],
        'chestplate': speed_bonus[1],
        'leggings': speed_bonus[2],
        'boots': speed_bonus[3]
    }

    pieces = ['helmet', 'chestplate', 'leggings', 'boots']
    if full_id:
        pieces = [actual_piece]

    for piece in pieces:
        attr_config = [
            ("minecraft:generic.armor", armor_map[piece], 'ADDITION'),
            ("minecraft:generic.armor_toughness", armor_toughness, 'ADDITION'),
            ("minecraft:generic.knockback_resistance", knockback_resistance, 'ADDITION')
        ]
        
        if hp_tier:
            hp_modifiers = create_health_per_level_attributes(piece, hp_tier)
            attr_config.extend(hp_modifiers)
        else:
            if hp_map[piece] != 0:
                attr_config.append(("minecraft:generic.max_health", hp_map[piece], 'ADDITION'))

        if speed_map[piece] != 0:
            attr_config.append(("minecraft:generic.movement_speed", speed_map[piece], 'MULTIPLY_TOTAL'))

        if cosmetic:
            attr_config = [
                ("minecraft:generic.attack_damage", -1, 'MULTIPLY_BASE'),
                ("minecraft:generic.attack_speed", -1, 'MULTIPLY_BASE'),
                ("minecraft:generic.luck", -1, 'MULTIPLY_BASE'),
                ("minecraft:generic.knockback_resistance", -1, 'MULTIPLY_BASE'),
                ("minecraft:generic.movement_speed", -0.15, 'MULTIPLY_BASE'),
                ("minecraft:generic.max_health", -0.15, 'MULTIPLY_BASE')
            ]

        item = f'{material_prefix}_{piece}'
        if full_id:
            item = material_prefix

        new_item_config(mod_id, item, piece, attr_config, cosmetic=cosmetic)

def new_armor_piece_config(mod_id, full_item_id, armor, armor_toughness, knockback_resistance, hp_bonus=0, speed_bonus= 0, actual_piece = 'helmet', cosmetic=False):
    armor_arg = [armor, 0, 0, 0]
    if actual_piece == 'chestplate':
        armor_arg = [0, armor, 0, 0]
    if actual_piece == 'leggings':
        armor_arg = [0, 0, armor, 0]
    if actual_piece == 'boots':
        armor_arg = [0, 0, 0, armor]
    new_armor_set_config(mod_id, full_item_id, armor_list=armor_arg, armor_toughness=armor_toughness, knockback_resistance=knockback_resistance, hp_bonus=[hp_bonus, 0, 0, 0], speed_bonus=[speed_bonus, 0, 0, 0], full_id=True, actual_piece=actual_piece, cosmetic=cosmetic)

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

def new_axe_config(mod_id, material_prefix, damage, full_id=False, attack_speed = 0.0):
    # Axes are set based on DPS, however they require a third more materials, hence damage is *1.15
    attr_config = {
        "minecraft:generic.attack_damage" : (damage*1.15,'ADDITION'),
    }
    if attack_speed!=0:
        attr_config['minecraft:generic.attack_speed'] = (attack_speed,'ADDITION')

    new_item_config(mod_id,f"{material_prefix}_axe" if not full_id else material_prefix,'axe',attr_config)

def create_directory(path):
    os.makedirs(path, exist_ok=True)

def pmmo_config_lvl_armor(mod_id, item_id, level):
    create_directory(f"config/paxi/datapacks/pmmo_level_limiter/data/{mod_id}/pmmo/items")
    pmmo_json = {
        "requirements": {
            "WEAR": {
                "endurance": level
            }
        },
        "override": True
    }
    with open(f"config/paxi/datapacks/pmmo_level_limiter/data/{mod_id}/pmmo/items/{item_id}.json", 'w+') as f:
        f.write(json.dumps(pmmo_json, indent=4))

def pmmo_config_cosmetic(mod_id, item_id, level=696):
    pmmo_config_lvl_armor(mod_id, item_id, level)

def kjs_pmmo_cosmetic(mod_id, item_id):
    new_kjs_cosmetic(mod_id, item_id)
    pmmo_config_cosmetic(mod_id, item_id)

def new_cosmetic_armor_config(mod_id, item_id, piece):
    new_armor_piece_config(mod_id, full_item_id=item_id, actual_piece=piece, cosmetic=True, armor=0, armor_toughness=0, knockback_resistance=0)
    kjs_pmmo_cosmetic(mod_id, item_id)

# Non destructive shit
with open(config_path, 'r') as f:
    try:
        base_config = json.loads(f.read())
    except Exception:
        pass

# Cosmetics

# fantasy_armor
for piece in ['helmet', 'chestplate', 'leggings', 'boots']:
    for armor_prefix in ['eclipse_soldier', 'dragonslayer', 'hero', 'golden_horns', 'thief', 'wandering_wizard', 'chess_board_knight', 'dark_lord', 'sunset_wings', 'fog_guard', 'dark_cover', 'spark_of_dawn', 'golden_execution', 'forgotten_trace', 'redeemer', 'gilded_hunt', 'lady_maria', 'crucible_knight', 'ronin', 'evening_ghost', 'malenia', 'old_knight', 'silver_knight', 'dead_gladiator', 'flesh_of_the_feaster', 'wind_worshipper', 'twinned']:
        new_cosmetic_armor_config('fantasy_armor', f'{armor_prefix}_{piece}', piece)

# Armor of the ages
armor_of_the_ages_map = {
    'head':'helmet',
    'chest':'chestplate',
    'legs':'leggings',
    'feet':'boots'
}
for piece_id in armor_of_the_ages_map:
    actual_piece = armor_of_the_ages_map[piece_id]
    for armor_prefix in ['anubis', 'centurion', 'holy', 'iron_plate', 'japanese_light', 'o_yoroi', 'pharaoh', 'quetzalcoatl', 'raijin', 'exalted_aurum']:
        new_cosmetic_armor_config('armoroftheages', f'{armor_prefix}_armor_{piece_id}', actual_piece)

# Nether armory
for piece in ['helmet', 'chestplate', 'leggings', 'boots']:
    for armor_prefix in ['infernal_gladiator', 'warped_fungus', 'crimson_fungus', 'obsidian']:
        new_cosmetic_armor_config('nether_armory', f'{armor_prefix}_armor_{piece}', piece)


# AXES!
# OW
new_axe_config("minecraft", "wooden", -0.6, attack_speed=0.2) #6.4
new_axe_config("minecraft", "golden", -0.6) #6.4
new_axe_config("minecraft", "iron", 0.6, attack_speed=0.1) #9.6
new_axe_config("kobolds", "kobold_iron", 2.8) #10.8
new_axe_config("minecraft", "diamond", 1.2) # 11.2
new_axe_config("aquaculture", "neptunium", 8.1) # 17.6
# BS
new_axe_config("blue_skies", "pyrope", 1.1) # 9.6
new_axe_config("blue_skies", "aquite", 3.8, attack_speed=0.1) # 12.8
new_axe_config("blue_skies", "diopside", 2.4, attack_speed=0.5) # 14.4
new_axe_config("blue_skies", "charoite", 7.0) # 16
new_axe_config("blue_skies", "horizonite", 7.8) # 16.8
# ET
new_axe_config("aether", "zanite", 8.6) # 16.8
new_axe_config("aether", "gravitite", 10.2) # 19.2
new_axe_config("aether", "valkyrie", 11.4, attack_speed=0.3) # 22.4

# NT
new_axe_config("betternether", "cincinnasite", 17.7, attack_speed=-0.1) #27.2
new_axe_config("betternether", "cincinnasite_axe_diamond", 20.7, full_id=True, attack_speed=-0.3) #30.4
new_axe_config("betternether", "nether_ruby", 26.1, attack_speed=-0.2) #35.2
new_axe_config("betternether", "flaming_ruby", 29.6, attack_speed=-0.4) #41.6
new_axe_config("minecraft", "netherite", 50.8) # 60.8

# UG
new_axe_config("undergarden", "cloggrum", 88.6, attack_speed=0.1) # 97.6
new_axe_config("undergarden", "froststeel", 104.6) # 113.6
new_axe_config("undergarden", "utherium", 120.1) # 129.6
new_axe_config("undergarden", "forgotten", 136.6) # 145.6
new_axe_config("call_of_yucutan", "jade", 131.3) # 140.8

# END
new_axe_config("phantasm", "crystalline", 136.6) # 145.6
new_axe_config("ender_dragon_loot_", "dragon", 170.2, attack_speed=-0.2) # 179.2
new_axe_config("enderitemod", "enderite", 227.4) # 238.4

# DEPTH
new_axe_config("callfromthedepth_","immemorialaxe", 276, full_id=True) #288

# Abyss
new_axe_config("theabyss","bone", 384.5, attack_speed=-0.2) #392
new_axe_config("theabyss","fusion", 355.4, attack_speed=-0.4) #366.4
new_axe_config("theabyss","aberythe", 370.8, attack_speed=-0.2) #380.8
new_axe_config("theabyss","knight", 455.6, attack_speed=-0.5) #473.6
new_axe_config("theabyss","garnite", 483.1, attack_speed=-0.4) #493.6
new_axe_config("theabyss","phantom", 518, attack_speed=-0.7) #528
new_axe_config("theabyss","unorithe", 564.6, attack_speed=-0.5) #577.6
new_axe_config("theabyss","incorythe", 628, attack_speed=-0.7) #644

# Custom item attributes config generator
# ////////////////////////////////////////////////////////////////////

# Special section
# Item.of('irons_spellbooks:gold_crown', '{Damage:0}')
new_item_config("irons_spellbooks", "gold_crown", 'helmet', [
                ("irons_spellbooks:cooldown_reduction", -0.5, 'MULTIPLY_BASE'),
                ('irons_spellbooks:max_mana', -9800, 'ADDITION'),
                ('irons_spellbooks:spell_power', -0.8, 'MULTIPLY_BASE')
            ], cosmetic=False)


# OW
new_armor_set_config("minecraft", "iron", [0,0,0,0], 0.0, 0.0, hp_tier=2)
new_sword_config("kobolds", "kobold_iron", 1)
new_armor_set_config("create_sa", "brass", [0,0,0,0], 0.0, -0.09, hp_tier=2)
new_armor_set_config("create_sa", "brass_jetpack", [0,0,0,0], 0.0, -0.09, hp_tier=2)
new_armor_set_config("create_sa", "brass_exoskeleton", [0,0,0,0], 0.0, -0.09, hp_tier=2)
new_armor_set_config("aquamirae", "three_bolt", [0,0,0,0], 0.0, -0.09, hp_tier=3)
new_armor_set_config("aquamirae", "three_bolt_suit", [0,0,0,0], 0.0, -0.09, full_id=True, actual_piece="chestplate", hp_tier=3)
new_armor_set_config("meadow", "fur", [0,0,0,0], 0.0, -0.09, hp_tier=1)
new_armor_set_config("immersive_armors", "heavy", [0,0,0,0], 0.0, -0.45, hp_tier=3)
new_armor_set_config("minecraft", "diamond", [0,0,0,0], 0.0, 0.0, hp_tier=3)
new_armor_set_config("aquaculture", "neptunium", [0,0,0,0], 0, 0.01, hp_tier=3)

# blue skies
new_armor_set_config("blue_skies", "pyrope", [1.5,3.5,2.5,2.5], 2, 0.02, hp_tier=6)
new_sword_config("blue_skies","pyrope", 0.5, attack_speed=-0.4) #7.5

new_armor_set_config("blue_skies", "aquite", [2,3,2,2], 2, 0.021, hp_tier=6)
new_sword_config("blue_skies","aquite", 2) #8

new_armor_set_config("blue_skies", "diopside", [2,2.25,2,2], -2, 0.022, hp_tier=6)
new_sword_config("blue_skies","diopside", 0, attack_speed=0.4) #9

new_armor_set_config("blue_skies", "charoite", [1,1.5,1.25,1.5], 0.5, 0.023, hp_tier=7)
new_sword_config("blue_skies","charoite", 3) #10

new_armor_set_config("blue_skies", "horizonite", [2.5,4.5,3.5,3.5], 2.5, 0.24, hp_tier=7)
new_sword_config("blue_skies","horizonite", 4.5) #10.5

# Aether
new_armor_set_config("aether", "zanite", [0,0,0,0], 0, 0.025, hp_tier=11)
new_armor_set_config("aether", "neptune", [0,0,0,0], 0, 0.026, hp_tier=11)
new_armor_set_config("aether", "gravitite", [0,0,0,0], 0, -0.023, hp_tier=11)
new_armor_set_config("aether", "valkyrie", [0,0,0,0], 0, -0.022, hp_tier=11)
new_armor_set_config("aether", "phoenix", [0,0,0,0], 0, -0.071, hp_tier=11)
new_sword_config('lost_aether_content', 'phoenix', 5.5, attack_speed=0.3)
new_armor_set_config("aether", "obsidian", [0,0,0,0], 0, -0.12, hp_tier=11)
new_sword_config("aether", "valkyrie_lance", 0, full_id=True, attack_speed=0.3)

# Nether 
new_armor_set_config("betternether", "cincinnasite", [7,8,7,6], 4, -0.005, hp_tier=12)
new_armor_set_config("kubejs", "cincinnasite_diamond", [0,0,0,0], 0.0, 0.0, hp_tier=13)
new_armor_set_config("betternether", "nether_ruby", [8,12,10,7], 5.6, -0.167, hp_tier=13)
new_armor_set_config("betternether", "flaming_ruby", [8,13,10,8], 4.4, -0.262, hp_tier=13)
new_sword_config("betternether","cincinnasite", 0, attack_speed=-0.2)
new_sword_config("betternether","cincinnasite_sword_diamond", 0, full_id=True, attack_speed=-0.3)
new_sword_config("betternether","nether_ruby", 0, attack_speed=-0.2)
new_sword_config("betternether","flaming_ruby", 0, attack_speed=-0.4)
new_sword_config("minecraft","netherite", 30)
new_sword_config("nethersdelight","netherite_machete", 30, full_id=True)
new_armor_set_config("create", "netherite_diving", [0,0,0,0], 0.0, -0.06, hp_tier=14)
new_armor_set_config("minecraft", "netherite", [0,0,0,0], 0.0, 0.0, hp_tier=14)

new_armor_set_config("aquamirae", "abyssal", [0,0,13,10], 5, -0.06, hp_tier=14)
new_armor_set_config("aquamirae", "abyssal_brigantine", [0,18,0,0], 5, -0.06, full_id=True, actual_piece="chestplate", hp_tier=14)
new_armor_set_config("aquamirae", "abyssal_heaume", [6,0,0,0], 5, -0.06, full_id=True, actual_piece="helmet", hp_tier=14)
new_armor_set_config("aquamirae", "abyssal_tiara", [10,0,0,0], 8, 0.04, full_id=True, actual_piece="helmet", hp_tier=14)

new_sword_config("aquamirae","divider", 30, full_id=True, attack_speed=0.2)
new_sword_config("aquamirae","whisper_of_the_abyss", 30, full_id=True)

# Undergarden
new_armor_set_config("call_of_yucutan", "warrior", [11,15,11,11], 5, 0.058, hp_tier=16)
new_armor_set_config("call_of_yucutan", "huracan",[11,15,11,11], 5, 0.058, hp_tier=16)
new_armor_set_config("call_of_yucutan", "monkey", [11,15,11,11], 5, 0.058, hp_tier=16)

new_armor_set_config("undergarden", "cloggrum", [0,0,0,0], 0, 0.0, hp_tier=14)
new_armor_set_config("undergarden", "froststeel", [11,15,11,11], 5, 0.0, speed_bonus=[0.05, 0.05, 0.05, 0.05], hp_tier=15)
new_armor_set_config("undergarden", "utherium", [0,0,0,0], 0, 0.0, hp_tier=16)
new_armor_set_config("undergarden", "forgotten", [0,0,0,0], 0, 0.0, hp_tier=17)
new_sword_config("undergarden","forgotten_battleaxe", 259, full_id=True)
new_sword_config("undergarden","cloggrum_battleaxe", 171, full_id=True)
new_sword_config("mokels_boss_mantyd","mantyd_scythe", 85, full_id=True)
new_sword_config("call_of_yucutan","sentient_vine", 81, full_id=True)
new_sword_config("call_of_yucutan","jade", 80, attack_speed=-0.1)
new_armor_set_config("call_of_yucutan", "jades", [14.5,19.5,16.5,14.5], 8.5, 0.008, hp_tier=16)
new_armor_set_config("mokels_boss_mantyd", "mantydhelmet", [14,0,0,0], 8, -0.042, hp_tier=16)


# end related content
new_sword_config("endlessbiomes","void_touched_blade", 95, full_id=True, attack_speed=-0.4)
new_sword_config("outer_end","sinker_dagger", 95, full_id=True)

new_sword_config("phantasm","crystalline", 85)
new_sword_config("ender_dragon_loot_","dragon", 100, attack_speed=0.4)
new_sword_config("enderitemod","enderite", 140)

new_armor_piece_config("endlessbiomes", "void_touched_leggings_leggings", 17, 9, -0.34, actual_piece="leggings")
new_armor_piece_config("endlessbiomes", "void_touched_boots_boots", 15, 9, 0.06, actual_piece="boots")
new_armor_set_config("endlessbiomes", "anklor_shell_armour", [15,21,17,15], 9, 0.01, hp_tier=18)
new_armor_set_config("outer_end", "rose_crystal", [15,21,17,15], 8, -0.04, hp_tier=18)
new_armor_set_config("outer_end", "cobalt_crystal", [15,21,17,15], 8, -0.04, hp_tier=18)
new_armor_set_config("outer_end", "mint_crystal", [15,21,17,15], 8, -0.04, hp_tier=18)

new_armor_set_config("ender_dragon_loot_", "dragon_armor", [18,28,23,18], 6.5, -0.13, hp_tier=19)
new_armor_set_config("enderitemod", "enderite", [40,59,49,40], 8, -0.01, hp_tier=19)

# call from the depths
new_sword_config("callfromthedepth_","immemorialsword", 170, full_id=True)
new_armor_set_config("callfromthedepth_", "depth_armor", [50,70,60,50], 7.5, -0.1, hp_tier=20)
new_sword_config("callfromthedepth_","soul_blade", 185, full_id=True, attack_speed=0.3)

# The abyss
new_armor_set_config("theabyss", "fusion_armor", [60,85,70,60], 10.5, -0.09, hp_tier=21)
new_sword_config("theabyss","fusion", 220, attack_speed=-0.2)

new_armor_set_config("theabyss", "aberythe_armor", [70,100,80,70], 11.5, 0.015, hp_tier=22)
new_sword_config("theabyss","aberythe", 230, attack_speed=-0.2)

new_armor_set_config("theabyss", "bone_armor", [80,110,90,80], 11.5, 0.02, hp_tier=21)
new_sword_config("theabyss","bone_sword_item", 210, full_id=True, attack_speed=-0.4)

new_armor_set_config("theabyss", "ignisithe_armor", [90,120,100,90], 10.5, 0.025, hp_tier=23)
new_sword_config("theabyss","ignisithe", 260, attack_speed=-0.4)
new_sword_config("theabyss","bricked_knight", 276, attack_speed=-0.1)

new_armor_set_config("theabyss", "glacerythe_armor", [100,130,110,100], 10.5, -0.17, hp_tier=24)
new_sword_config("theabyss","knight", 280)

new_armor_set_config("theabyss", "garnite_armor", [110,140,120,110], 11.5, -0.265, hp_tier=25)
new_sword_config("theabyss","garnite", 300, attack_speed=-0.2)

new_armor_set_config("theabyss", "phantom_armor", [120,150,130,120], 12, -0.06, hp_tier=24)
new_sword_config("theabyss","phantom", 320, attack_speed=-0.2)

new_armor_set_config("theabyss", "unorithe_armor", [130,160,140,130], 14, -0.255, hp_tier=25)
new_sword_config("theabyss","unorithe", 350, attack_speed=-0.4)

new_armor_set_config("theabyss", "incorythe_armor", [150,170,150,150], 13, -0.15, hp_tier=23)
new_sword_config("theabyss","incorythe", 390, attack_speed=-0.4)
new_sword_config("theabyss","incorythe_sword_mkii", 420, full_id=True, attack_speed=-0.6)

new_sword_config("theabyss","abyss_sword", 420, full_id=True, attack_speed=-0.4)


# Kube JS config generator
def tiered_durability(durability, tier):
    if tier == -1:
        return durability
    
    perTierMultiplier = 0.125
    generalDurabilityMultiplier = 1.331945

    return int((1 + perTierMultiplier * tier)**2 * generalDurabilityMultiplier * durability)

def new_kjs_config_durability(mod_id, item_id, durability, tier=-1):
    global js_base_str
    new_js = """event.modify(\"""" + mod_id + ':' + item_id + """\", item => {
        item.maxDamage = """ + str(tiered_durability(durability, tier)) + """;
    });
    {--}"""
    js_base_str = js_base_str.replace('{--}', new_js)

def multiple_kjs_config_durabilities(mod_id, items, durability, tier=-1):
    for item in items:
        new_kjs_config_durability(mod_id, item, durability, tier=tier)

def new_kjs_config_durability_armor_set(mod_id, material, durability_list, tier=-1):
    armor_durabilities = {
        'helmet':durability_list[0],
        'chestplate':durability_list[1],
        'leggings':durability_list[2],
        'boots':durability_list[3],
    }
    for piece in ['helmet', 'chestplate', 'leggings', 'boots']:
        new_kjs_config_durability(mod_id, f'{material}_{piece}', armor_durabilities[piece], tier=tier)

def new_kjs_config_durability_tools(mod_id, material, durability, tier=-1):
    for piece in ['sword', 'axe', 'pickaxe', 'shovel', 'hoe']:
        new_kjs_config_durability(mod_id, f'{material}_{piece}', durability, tier=tier)

def new_kjs_config_durability_material(mod_id, material, durability_tools, durability_armor_list, tier=-1, tier_to='TA'):
    if 'T' in tier_to:
        new_kjs_config_durability_tools(mod_id, material, durability_tools, tier=tier)
    if 'A' in tier_to:
        new_kjs_config_durability_armor_set(mod_id, material, durability_armor_list, tier=tier)



# Mixed config generator
# TBA
def new_bow(mod_id, item_id, damage, durability, tier=-1):
    new_bow_config(mod_id, item_id, damage, full_id=True)
    new_kjs_config_durability(mod_id, item_id, durability, tier=tier)

def new_offhand(mod_id, item_id, attributes):
    attr_config = {}
    for attr, modification in attributes.items():
        attr_config[attr] = modification
    new_item_config(mod_id,f"{item_id}",'offhand',attr_config)

def new_tools(mod_id, material, durability, sword_dmg, full_id = False, attack_speed = 0, tier=-1):
    new_kjs_config_durability_tools(mod_id, material, durability, tier=tier)
    new_sword_config(mod_id, material, sword_dmg, full_id, attack_speed)

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

# ///////////////////////////////////

# blue skies

new_kjs_config_durability_material("blue_skies", "pyrope", 1600, get_durability_list_from_helmet(390), tier=6, tier_to='A')
new_kjs_config_durability_material("blue_skies", "aquite", 1700, get_durability_list_from_helmet(410), tier=6, tier_to='A')
new_kjs_config_durability_material("blue_skies", "diopside", 1800, get_durability_list_from_helmet(430), tier=6, tier_to='A')
new_kjs_config_durability_material("blue_skies", "charoite", 1900, get_durability_list_from_helmet(450), tier=7, tier_to='A')
new_kjs_config_durability_material("blue_skies", "horizonite", 2000, get_durability_list_from_helmet(475), tier=7, tier_to='A')


#aether
new_kjs_config_durability_armor_set("aether", "zanite", get_durability_list_from_helmet(500), tier=11)
new_kjs_config_durability_armor_set("aether", "neptune", get_durability_list_from_helmet(550), tier=11)
new_kjs_config_durability_armor_set("aether", "gravitite", get_durability_list_from_helmet(600), tier=11)
new_kjs_config_durability_armor_set("aether", "valkyrie", get_durability_list_from_helmet(645), tier=11)
new_kjs_config_durability_armor_set("aether", "phoenix", get_durability_list_from_helmet(675), tier=11)
new_kjs_config_durability_armor_set("aether", "obsidian", get_durability_list_from_helmet(700), tier=11)

new_kjs_config_durability_tools('lost_aether_content', 'phoenix', 2640)
multiple_kjs_config_durabilities("aetherdelight", [
    "holystone_knife_sword",
    "holystone_knife_axe",
    "holystone_knife_pickaxe",
    "holystone_knife_shovel",
    "holystone_knife_hoe"
], 500)

multiple_kjs_config_durabilities("aetherdelight", [
    "zanite_knife_sword",
    "zanite_knife_axe",
    "zanite_knife_pickaxe",
    "zanite_knife_shovel",
    "zanite_knife_hoe"
], 1000)

multiple_kjs_config_durabilities("aetherdelight", [
    "gravitite_knife_sword",
    "gravitite_knife_axe",
    "gravitite_knife_pickaxe",
    "gravitite_knife_shovel",
    "gravitite_knife_hoe"
], 2000)

# netherite
new_kjs_config_durability_armor_set("betternether", "cincinnasite", get_durability_list_from_helmet(850), tier=12)
new_kjs_config_durability_armor_set("kubejs", "cincinnasite_diamond", get_durability_list_from_helmet(950), tier=12)
new_kjs_config_durability_armor_set("betternether", "nether_ruby", get_durability_list_from_helmet(1350), tier=13)
new_kjs_config_durability_armor_set("betternether", "flaming_ruby", get_durability_list_from_helmet(1350), tier=13)
new_kjs_config_durability_armor_set("minecraft", "netherite", get_durability_list_from_helmet(2000), tier=14)

new_kjs_config_durability("nethersdelight","netherite_machete", 3100)

# undergarden
new_kjs_config_durability_armor_set("undergarden", "cloggrum", get_durability_list_from_helmet(2300), tier=14)
new_kjs_config_durability_armor_set("undergarden", "froststeel", get_durability_list_from_helmet(2630), tier=15)
new_kjs_config_durability_armor_set("undergarden", "utherium", get_durability_list_from_helmet(2890), tier=16)


new_kjs_config_durability_tools("call_of_yucutan", "jade", 4000)
new_kjs_config_durability_armor_set("call_of_yucutan", "jades", get_durability_list_from_helmet(2925), tier=16)
new_kjs_config_durability("call_of_yucutan","sentient_vine", 4000, tier=16)
new_kjs_config_durability("mokels_boss_mantyd","mantyd_scythe", 4300, tier=16)
new_kjs_config_durability_armor_set("mokels_boss_mantyd", "mantydhelmet", get_durability_list_from_helmet(2950), tier=16)


# ende related
new_kjs_config_durability("endlessbiomes", "void_touched_blade", 4400)
new_kjs_config_durability("outer_end", "sinker_dagger", 4400)
new_kjs_config_durability_armor_set("endlessbiomes", "void_touched_boots",  get_durability_list_from_helmet(2950), tier=18)
new_kjs_config_durability_armor_set("endlessbiomes", "void_touched_leggings",  get_durability_list_from_helmet(2950), tier=18)
new_kjs_config_durability_armor_set("endlessbiomes", "anklor_shell_armour", get_durability_list_from_helmet(2950), tier=18)
new_kjs_config_durability_armor_set("outer_end", "rose_crystal", get_durability_list_from_helmet(2950), tier=18)
new_kjs_config_durability_armor_set("outer_end", "cobalt_crystal", get_durability_list_from_helmet(2950), tier=18)
new_kjs_config_durability_armor_set("outer_end", "mint_crystal", get_durability_list_from_helmet(2950), tier=18)

new_kjs_config_durability_tools("phantasm", "crystalline", 4600)
new_kjs_config_durability_tools("ender_dragon_loot_", "dragon", 4800)
new_kjs_config_durability("ender_dragon_loot_", "dragon_picaxe", 4800)
new_kjs_config_durability_armor_set("ender_dragon_loot_", "dragon_armor", get_durability_list_from_helmet(3000), tier=19)
new_kjs_config_durability_material("enderitemod", "enderite", 5500, get_durability_list_from_helmet(3890), tier=19, tier_to='A')

# deeper
new_kjs_config_durability_armor_set("callfromthedepth_", "depth_armor", get_durability_list_from_helmet(4100), tier=20)
for piece in ['sword', 'axe', 'pickaxe', 'shovel', 'hoe']:
    new_kjs_config_durability("callfromthedepth_", f"immemorial{piece}", 5700)
new_kjs_config_durability("callfromthedepth_", "soul_blade", 5900)

# Abyss

new_kjs_config_durability_armor_set("theabyss", "fusion_armor",  get_durability_list_from_helmet(4400), tier=21)
new_kjs_config_durability_tools("theabyss", "fusion", 6100)

new_kjs_config_durability_armor_set("theabyss", "aberythe_armor",  get_durability_list_from_helmet(4500), tier=22)
new_kjs_config_durability_tools("theabyss", "aberythe", 6250)

new_kjs_config_durability_armor_set("theabyss", "bone_armor",  get_durability_list_from_helmet(4650), tier=22)
new_kjs_config_durability_tools("theabyss", "bone", 6500)
new_kjs_config_durability("theabyss", "bone_sword_item", 6500)

new_kjs_config_durability_armor_set("theabyss", "ignisithe_armor", get_durability_list_from_helmet(4890), tier=23)
new_kjs_config_durability("theabyss", "ignisithe_sword", 6750)
new_kjs_config_durability("theabyss", "bricked_knight_sword", 6750)

new_kjs_config_durability_armor_set("theabyss", "glacerythe_armor",  get_durability_list_from_helmet(5100), tier=24)
new_kjs_config_durability_tools("theabyss", "knight", 7000)

new_kjs_config_durability_armor_set("theabyss", "garnite_armor", get_durability_list_from_helmet(5200), tier=25)
new_kjs_config_durability_tools("theabyss", "garnite", 7250)

new_kjs_config_durability_armor_set("theabyss", "phantom_armor", get_durability_list_from_helmet(5350), tier=24)
new_kjs_config_durability_tools("theabyss", "phantom", 7500)

new_kjs_config_durability_armor_set("theabyss", "unorithe_armor", get_durability_list_from_helmet(5600), tier=25)
new_kjs_config_durability_tools("theabyss", "unorithe", 7750)
new_kjs_config_durability("theabyss", "unorithe_pick_axe", 7750)

new_kjs_config_durability_armor_set("theabyss", "incorythe_armor", get_durability_list_from_helmet(6200), tier=23)
new_kjs_config_durability_tools("theabyss", "incorythe", 8000)
new_kjs_config_durability("theabyss", "incorythe_sword_mkii", 8000)

new_kjs_config_durability("theabyss", "abyss_sword", 8300)

# Bows
# /////////////////////////

new_bow('minecraft', 'bow', -3, 300)
new_bow('minecraft', 'crossbow', -3, 300)

new_bow('zoomer_bows', 'iron_bow', 5, 350)
new_bow('zoomer_bows', 'diamond_bow', 6, 400)
new_bow('aquaculture', 'neptunium_bow', 7, 420)
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

with open('kubejs\startup_scripts\\balance_cosmetics.js', 'w+') as f:
    f.write(js_cosmetics_base_str.replace('{--}',''))
