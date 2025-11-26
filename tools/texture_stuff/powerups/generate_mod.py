from PIL import Image
import shutil
import json
import os

def copy_tree(src, dst):
    try:
        if not os.path.exists(dst):
            os.makedirs(dst)
        
        for item in os.listdir(src):
            s = os.path.join(src, item)
            d = os.path.join(dst, item)
            
            if os.path.isdir(s):
                shutil.copytree(s, d, dirs_exist_ok=True, copy_function=shutil.copy2)
            else:
                shutil.copy2(s, d)
    except Exception as e:
        print(f"An error occurred: {e}")

def create_item_event(item_id, display_name, tooltip):
    return f"""
    event.create('{item_id}')
        .maxStackSize(64)
        .displayName('{display_name}')
        .tooltip("§9Apply on armor piece with a template to gain")
        .tooltip('{tooltip}')
"""

def create_recipe_event(item_id, first, second, third, core, element):
    # FST - first, second, third > this is tier dependent
    # C - core: tier1 is #trim_templates tag then becomes previous powerup tier
    # E - recipe_base_element from attr_map

    return f"""
    event.shaped(
        Item.of('{item_id}', 1),
            [
                'FEF',
                'SCS',
                'TET'
            ],"""+"""
            {
                F: '"""+ first +"""',
                S: '"""+ second +"""',
                T: '"""+ third +"""',
                C: '"""+ core +"""',
                E: '"""+ element +"""',
            }
        )
"""


def create_salvage_recipe(item_id, first, second, third, core, element):
    data = {
        "type": "apotheosis:salvaging",
    "conditions": [
        {
            "type": "apotheosis:module",
            "module": "adventure"
        }
    ],
    "input": {
        "item": item_id
    },
    "outputs": [
        {
            "min_count": 1,
            "max_count": 2,
            "stack": {
                "item": first
            }
        },
        {
            "min_count": 1,
            "max_count": 2,
            "stack": {
                "item": second
            }
        },
        {
            "min_count": 1,
            "max_count": 2,
            "stack": {
                "item": third
            }
        },
        {
            "min_count": 1,
            "max_count": 2,
            "stack": {
                "item": element
            }
        }]
    }
    if "#" not in core:
        data['outputs'].append(
            {
            "min_count": 1,
            "max_count": 2,
            "stack": {
                "item": core
            }
        }
        )
    return data



def generate_startup_js_file(file_path, item_events):
    with open(file_path, 'w+', encoding='utf-8') as file:
        file.write("StartupEvents.registry('item', event => {\n")
        
        for item_id, display_name, tooltip in item_events:
            file.write(create_item_event(item_id, display_name, tooltip))
            
        
        file.write("});\n")

def generate_server_js_file(file_path, item_events):
    with open(file_path, 'w+', encoding='utf-8') as file:
        file.write("ServerEvents.recipes(event => {\n")
        
        for item_id, first, second, third, core, element in item_events:
            file.write(create_recipe_event(item_id, first, second, third, core, element))
            salvage_recipe = create_salvage_recipe(item_id, first, second, third, core, element)
            clean_item_id = item_id.split(":")[1]
            with open(f"../../../kubejs/data/apotheosis/recipes/salvaging/{clean_item_id}.json", 'w+', encoding='utf-8' ) as f:
                f.write(json.dumps(salvage_recipe, indent=4))

        file.write("});\n")

def generate_server_js_tags_file(file_path, items, tag):
    with open(file_path, 'w+', encoding='utf-8') as file:
        file.write("ServerEvents.tags('item', event => {\n")
        
        for item in items:
            file.write(f"""\t\tevent.add('{tag}', '{item}');\n""")
        
        file.write("});\n")

def create_directory(dir_path):
    os.makedirs(dir_path, exist_ok=True)

def which_upgrade_label(tier):
    if tier<4:
        return 1
    if tier<7:
        return 2
    if tier<10:
        return 3
    return 4

def get_title_color(tier):
    return f'{get_title_color_final(tier)}§l'

def get_title_color_final(tier):
    if tier<4:
        return ''
    if tier<7:
        return '§a'
    if tier<10:
        return '§3'
    return '§5'

def combine_images(image_paths, output_path):
    if not image_paths:
        raise ValueError("No image paths provided.")
    images = [Image.open(path).convert("RGBA") for path in image_paths]
    base_size = images[0].size
    for img in images[1:]:
        if img.size != base_size:
            raise ValueError("All images must be the same size.")
    combined_image = Image.new("RGBA", base_size, (0, 0, 0, 0))
    for img in images:
        combined_image = Image.alpha_composite(combined_image, img)
    combined_image.save(output_path, "PNG")

def generate_trim_material_file(file_location, description_color, asset_name, item_name):
    file_content = {
        "asset_name": asset_name,
        "description": {
        "color": description_color,
        "translate": f"trim_material.kubejs.{item_name}"
        },
        "ingredient": f"kubejs:{item_name}",
        "item_model_index": 0.5
    }

    with open(file_location, 'w+') as f:
        f.write(json.dumps(file_content, indent=4))

def generate_trim_lang(file_location, generated_trim_lang):
    en_us_json = {}
    for lang in generated_trim_lang:
        text = generated_trim_lang[lang]
        en_us_json[lang] = text

    with open(file_location, 'w+') as f:
        f.write(json.dumps(en_us_json, indent=4))

tier_recipe_base = {
    1 : {
        'first' : 'minecraft:diamond',
        'second' : 'minecraft:iron_block',
        'third' : 'minecraft:emerald'
    },
    2 : {
        'first' : 'blue_skies:charoite',
        'second' : 'blue_skies:aquite',
        'third' : 'blue_skies:pyrope_block'
    },
    3 : {
        'first' : 'blue_skies:aquite',
        'second' : 'blue_skies:diopside_gem',
        'third' : 'blue_skies:horizonite_ingot'
    },
    4 : {
        'first' : 'aether:ambrosium_block',
        'second' : 'aether:zanite_gemstone',
        'third' : 'aether:enchanted_gravitite',
    },
    5 : {
        'first' : 'betternether:cincinnasite_lantern',
        'second' : 'betternether:nether_ruby',
        'third' : 'minecraft:netherite_ingot',
    },
    6 : {
        'first' : 'undergarden:cloggrum_block',
        'second' : 'undergarden:froststeel_ingot',
        'third' : 'undergarden:forgotten_ingot',
    },
    7 : {
        'first' : 'phantasm:crystal_block',
        'second' : 'enderitemod:enderite_ingot',
        'third' : 'ender_dragon_loot_:dragon_scale',
    },
    8 : {
        'first' : 'callfromthedepth_:fullsoul',
        'second' : 'callfromthedepth_:immemorialingot',
        'third' : 'callfromthedepth_:soulingot',
    },
    9 : {
        'first' : 'theabyss:fusion_ingot',
        'second' : 'theabyss:fixed_bone',
        'third' : 'theabyss:aberythe_gem',
    },
    10 : {
        'first' : 'theabyss:phantom_ingot',
        'second' : 'theabyss:unorithe_ingot',
        'third' : 'theabyss:incorythe_gem',
    }
}

attr_map = {
    'armor': {
        'attr_text': 'Armor',
        'recipe_base_element': 'minecraft:shield',
        'trim_description_color': '#FFFFFF',
        'trim_asset_name' : 'iron',
        'attribute': 'minecraft:generic.armor',
        'operation': 'ADDITION',
        'percentage' : False,
        'tier_m': {
            1: 2,
            2: 4,
            3: 6,
            4: 8,
            5: 12,
            6: 18,
            7: 25,
            8: 32,
            9: 40,
            10: 75
        }
    },
    'armor_toughness': {
        'attr_text': 'Armor Toughness',
        'recipe_base_element': 'supplementaries:hourglass',
        'trim_description_color': '#747373',
        'trim_asset_name' : 'andesite',
        'attribute': 'minecraft:generic.armor_toughness',
        'operation': 'ADDITION',
        'percentage' : False,
        'tier_m': {
            1: 1.25,
            2: 1.5,
            3: 1.75,
            4: 2.0,
            5: 4.0,
            6: 5.0,
            7: 6.0,
            8: 7.0,
            9: 8.0,
            10: 10.0
        }
    },
    'armor_pierce': {
        'attr_text': 'Armor Pierce',
        'recipe_base_element': 'minecraft:heartbreak_pottery_sherd',
        'trim_description_color': '#598FBF',
        'trim_asset_name' : 'lapis',
        'attribute': 'attributeslib:armor_pierce',
        'operation': 'ADDITION',
        'percentage' : False,
        'tier_m': {
            1: 0.125,
            2: 0.25,
            3: 0.375,
            4: 0.5,
            5: 0.625,
            6: 0.75,
            7: 0.825,
            8: 1.0,
            9: 1.25,
            10: 1.5
        }
    },
    'armor_shred': {
        'attr_text': 'Armor Shred',
        'recipe_base_element': 'minecraft:skull_pottery_sherd',
        'trim_description_color': '#FFD966',
        'trim_asset_name' : 'brass',
        'attribute': 'attributeslib:armor_shred',
        'operation': 'ADDITION',
        'percentage' : True,
        'tier_m': {
            1: 0.001,
            2: 0.002,
            3: 0.004,
            4: 0.008,
            5: 0.01,
            6: 0.012,
            7: 0.014,
            8: 0.016,
            9: 0.018,
            10: 0.02
        }
    },
    'cooldown_reduction': {
        'attr_text': 'Cooldown Reduction',
        'recipe_base_element': 'irons_spellbooks:arcane_ingot',
        'trim_description_color': '#B28C18',
        'trim_asset_name' : 'gold',
        'attribute': 'irons_spellbooks:cooldown_reduction',
        'operation': 'ADDITION',
        'percentage' : True,
        'tier_m': {
            1: 0.0375,
            2: 0.04,
            3: 0.0425,
            4: 0.045,
            5: 0.05,
            6: 0.06,
            7: 0.07,
            8: 0.08,
            9: 0.09,
            10: 0.125
        }
    },
    'crit_chance': {
        'attr_text': 'Critical Chance',
        'recipe_base_element': 'aquamirae:ship_graveyard_echo',
        'trim_description_color': '#B6D7A8',
        'trim_asset_name' : 'exp',
        'attribute': 'attributeslib:crit_chance',
        'operation': 'ADDITION',
        'percentage' : True,
        'tier_m': {
            1: 0.01,
            2: 0.0125,
            3: 0.015,
            4: 0.0175,
            5: 0.02,
            6: 0.025,
            7: 0.03,
            8: 0.035,
            9: 0.04,
            10: 0.05
        }
    },
    'crit_damage': {
        'attr_text': 'Critical Damage',
        'recipe_base_element': 'aquamirae:anglers_fang',
        'trim_description_color': '#B6D7A8',
        'trim_asset_name' : 'exp',
        'attribute': 'attributeslib:crit_damage',
        'operation': 'ADDITION',
        'percentage' : True,
        'tier_m': {
            1: 0.01,
            2: 0.0125,
            3: 0.015,
            4: 0.0175,
            5: 0.02,
            6: 0.025,
            7: 0.03,
            8: 0.035,
            9: 0.04,
            10: 0.05
        }
    },
    'health_boost': {
        'attr_text': 'Health Boost',
        'recipe_base_element': 'candlelight:hearth',
        'trim_description_color': '#FF0000',
        'trim_asset_name' : 'redstone',
        'attribute': 'minecraft:generic.max_health',
        'operation': 'ADDITION',
        'percentage' : False,
        'tier_m': {
            1: 4,
            2: 8,
            3: 12,
            4: 16,
            5: 32,
            6: 48,
            7: 60,
            8: 80,
            9: 100,
            10: 120
        }
    },
    'knockback_resistance': {
        'attr_text': 'Knockback Resistance',
        'recipe_base_element': 'create:copper_backtank',
        'trim_description_color': '#000000',
        'trim_asset_name' : 'netherite',
        'attribute': 'minecraft:generic.knockback_resistance',
        'operation': 'ADDITION',
        'percentage' : True,
        'tier_m': {
            1: 0.01,
            2: 0.0125,
            3: 0.015,
            4: 0.0175,
            5: 0.02,
            6: 0.025,
            7: 0.03,
            8: 0.035,
            9: 0.04,
            10: 0.05
        }
    },
    'lung_capacity': {
        'attr_text': 'Lung Capacity',
        'recipe_base_element': 'minecraft:conduit',
        'trim_description_color': '#CDCDCD',
        'trim_asset_name' : 'refined_radiance',
        'attribute': 'additionalentityattributes:lung_capacity',
        'operation': 'ADDITION',
        'percentage' : False,
        'tier_m': {
            1: 20,
            2: 40,
            3: 60,
            4: 80,
            5: 100,
            6: 120,
            7: 140,
            8: 160,
            9: 180,
            10: 240
        }
    },
    'mana_boost': {
        'attr_text': 'Mana Boost',
        'recipe_base_element': 'irons_spellbooks:mana_ring',
        'trim_description_color': '#0B5394',
        'trim_asset_name' : 'lapis',
        'attribute': 'irons_spellbooks:max_mana',
        'operation': 'ADDITION',
        'percentage' : False,
        'tier_m': {
            1: 20,
            2: 25,
            3: 30,
            4: 35,
            5: 40,
            6: 45,
            7: 50,
            8: 65,
            9: 80,
            10: 100
        }
    },
    'mana_regen': {
        'attr_text': 'Mana Regeneration',
        'recipe_base_element': 'irons_spellbooks:mana_upgrade_orb',
        'trim_description_color': '#0B5394',
        'trim_asset_name' : 'lapis',
        'attribute': 'irons_spellbooks:mana_regen',
        'operation': 'ADDITION',
        'percentage' : True,
        'tier_m': {
            1: 0.05,
            2: 0.08,
            3: 0.1,
            4: 0.12,
            5: 0.15,
            6: 0.18,
            7: 0.22,
            8: 0.25,
            9: 0.3,
            10: 0.35
        }
    },
    'movement_speed': {
        'attr_text': 'Movement Speed',
        'recipe_base_element': 'minecraft:dirt_path',
        'trim_description_color': '#F3F6F4',
        'trim_asset_name' : 'quartz',
        'attribute': 'minecraft:generic.movement_speed',
        'operation': 'ADDITION',
        'percentage' : True,
        'tier_m': {
            1: 0.01,
            2: 0.0125,
            3: 0.015,
            4: 0.0175,
            5: 0.02,
            6: 0.025,
            7: 0.03,
            8: 0.035,
            9: 0.04,
            10: 0.05
        }
    },
    'spell_power': {
        'attr_text': 'Spell Power',
        'recipe_base_element': 'irons_spellbooks:magic_cloth',
        'trim_description_color': '#FFD966',
        'trim_asset_name' : 'exp',
        'attribute': 'irons_spellbooks:spell_power',
        'operation': 'ADDITION',
        'percentage' : True,
        'tier_m': {
            1: 0.1,
            2: 0.11,
            3: 0.12,
            4: 0.13,
            5: 0.14,
            6: 0.15,
            7: 0.16,
            8: 0.17,
            9: 0.18,
            10: 0.2
        }
    },
    'stamina': {
        'attr_text': 'Stamina',
        'recipe_base_element': 'create:zinc_block',
        'trim_description_color': '#999999',
        'trim_asset_name' : 'zinc',
        'attribute': 'puffish_attributes:player.stamina',
        'operation': 'ADDITION',
        'percentage' : False,
        'tier_m': {
            1: 0.1,
            2: 0.2,
            3: 0.4,
            4: 0.8,
            5: 1,
            6: 1.2,
            7: 1.4,
            8: 1.6,
            9: 1.5,
            10: 2.0
        }
    },
    'swim_speed': {
        'attr_text': 'Swim Speed',
        'recipe_base_element': 'minecraft:copper_block',
        'trim_description_color': '#B45F06',
        'trim_asset_name' : 'copper',
        'attribute': 'additionalentityattributes:water_speed',
        'operation': 'ADDITION',
        'percentage' : True,
        'tier_m': {
            1: 0.01,
            2: 0.02,
            3: 0.04,
            4: 0.08,
            5: 0.1,
            6: 0.12,
            7: 0.14,
            8: 0.16,
            9: 0.18,
            10: 0.2
        }
    }
}

TIERS_LIST = range(1,11)

layers_path = 'layers'
generated_mod_folder = 'trim_mod_data'
kjs_generated_folder = f'{generated_mod_folder}/kubejs'
config_folder = f'{generated_mod_folder}/config'
trim_config_file = f'{config_folder}/functionalarmortrim.json'

kjs_data_folder =  f'{kjs_generated_folder}/data/kubejs'
trim_material_folder = f'{kjs_data_folder}/trim_material'

texture_path = f'{kjs_generated_folder}/assets/kubejs/textures/item'
model_path = f'{kjs_generated_folder}/assets/kubejs/models/item'
lang_path = f'{kjs_generated_folder}/assets/kubejs/lang'

startup_scripts_path = f'{kjs_generated_folder}/startup_scripts'
server_scripts_path = f'{kjs_generated_folder}/server_scripts'

create_directory(texture_path)
create_directory(model_path)
create_directory(startup_scripts_path)
create_directory(server_scripts_path)
create_directory(config_folder)
create_directory(lang_path)
create_directory(trim_material_folder)

print("ZOOM >>> Folder structure generated")

trims = [
    "minecraft:warden_armor_trim_smithing_template",
    "minecraft:sentry_armor_trim_smithing_template",
    "minecraft:shaper_armor_trim_smithing_template",
    "minecraft:raiser_armor_trim_smithing_template",
    "minecraft:rib_armor_trim_smithing_template",
    "minecraft:coast_armor_trim_smithing_template",
    "minecraft:eye_armor_trim_smithing_template",
    "minecraft:dune_armor_trim_smithing_template",
    "minecraft:spike_armor_trim_smithing_template",
    "minecraft:snout_armor_trim_smithing_template",
    "minecraft:tide_armor_trim_smithing_template",
    "minecraft:vex_armor_trim_smithing_template",
    "minecraft:wayfinder_armor_trim_smithing_template",
    "minecraft:wild_armor_trim_smithing_template",
    "minecraft:silence_armor_trim_smithing_template",
    "kobolds:kobold_template",
    "blue_skies:banished_armor_trim_smithing_template",
    "blue_skies:thwarted_armor_trim_smithing_template",
    "blue_skies:regrowth_armor_trim_smithing_template",
    "blue_skies:toxic_armor_trim_smithing_template"
]

try:
    generate_server_js_tags_file(f'{server_scripts_path}/tags/trim_tags.js', trims, 'forge:trim_templates')
except Exception:
    print("ZOOM >>> Tag creation failed!")

print("ZOOM >>> Trim template tags created")

BASE_ITEM_MODEL_JSON = {
	"parent": "item/generated",
    "textures": {
        "layer0": None
    }
}

BASE_TRIM_CONFIG = {}

startup_script = f'{startup_scripts_path}/trim_powerups.js'
server_script = f'{server_scripts_path}/trim_powerups_recipes.js'
item_events = []
recipe_events = []
generated_item_ids = []
trim_map = {}

for attr in attr_map:
    for tier in attr_map.get(attr).get('tier_m'):
        upgrade_tier = str(which_upgrade_label(tier))
        title_color = get_title_color(tier)
        tier_str = str(tier)

        tier_image_path = f'{layers_path}/{tier_str}.png'
        upgrade_tier_image_path = f'{layers_path}/upgrade_{upgrade_tier}.png'
        attr_image_path = f'{layers_path}/{attr}.png'

        item_base_name = f'tier_{tier_str}_{attr}_power_up'

        item_texture_name = f'{item_base_name}.png'

        item_texture_path = f'{texture_path}/{item_texture_name}'

        combine_images([attr_image_path, tier_image_path, upgrade_tier_image_path], item_texture_path)

        item_model_name = item_texture_name.replace('.png', '.json')
        BASE_ITEM_MODEL_JSON['textures']['layer0'] = f'kubejs:item/{item_base_name}'

        full_item_id = f'kubejs:{item_base_name}'

        item_model_path = f'{model_path}/{item_model_name}'

        with open(item_model_path, 'w+') as f:
            f.write(json.dumps(BASE_ITEM_MODEL_JSON, indent=4))
        
        attr_text = attr_map[attr]['attr_text']
        attr_value = attr_map.get(attr).get('tier_m').get(tier)

        tool_tip_bottom = f'+{str(attr_value)} {attr_text}'
        if attr_map[attr]['percentage']:
            tool_tip_bottom = f'+{str(round(attr_value*100, 2))}% {attr_text}'

        item_events.append((item_base_name, f'{title_color}Tier {tier_str} {attr_text} Power Up', tool_tip_bottom))

        BASE_TRIM_CONFIG[full_item_id] = [{
            'attribute': attr_map[attr]['attribute'],
            'operation' : attr_map[attr]['operation'],
            'amount' : attr_value
        }]

        if tier in tier_recipe_base:
            tier_powerup_recipe_data = tier_recipe_base.get(tier)
            core = "#trim_templates"
            if tier>1:
                core = full_item_id.replace(str(tier), str(tier-1))

            first = tier_powerup_recipe_data.get('first')
            second = tier_powerup_recipe_data.get('second')
            third = tier_powerup_recipe_data.get('third')

            if 'recipe_base_element' in attr_map[attr]:
                recipe_events.append((full_item_id, first, second, third, core, attr_map[attr]['recipe_base_element']))
        
        generated_item_ids.append(full_item_id)

        if 'trim_description_color' in attr_map[attr] and 'trim_asset_name' in attr_map[attr]:
            generate_trim_material_file(f'{trim_material_folder}/{item_base_name}.json', attr_map[attr]['trim_description_color'], attr_map[attr]['trim_asset_name'], item_base_name)

        trim_map[f"trim_material.kubejs.{item_base_name}"] = f"{attr_text} ({tier_str}) Power Up"

generate_startup_js_file(startup_script, item_events)
generate_server_js_file(server_script, recipe_events)

print("ZOOM >>> Resourcepack and KubeJS item registry generated + recipes")

with open(trim_config_file, 'w+') as f:
    f.write(json.dumps(BASE_TRIM_CONFIG, indent=4))

data_mc_tags_items_path = f'{kjs_generated_folder}/data/minecraft/tags/items'
create_directory(data_mc_tags_items_path)

for tier in TIERS_LIST:
    tier_item_ids = []
    tier_str = str(tier)
    for attr in attr_map:
        item_base_name = f'tier_{tier_str}_{attr}_power_up'
        full_item_id = f'kubejs:{item_base_name}'

        tier_item_ids.append(full_item_id)
    
    generate_server_js_tags_file(f'{server_scripts_path}/tier_{tier_str}_tags.js', tier_item_ids, f'forge:tier_{tier_str}_power_ups')

print("ZOOM >>> Individual tiers tags generated")

trim_material_config = {
    "replace": False,
    "values": generated_item_ids
}

with open(f'{data_mc_tags_items_path}/trim_materials.json', 'w+') as f:
    f.write(json.dumps(trim_material_config, indent=4))

generate_trim_lang(f'{lang_path}/en_us.json', trim_map)

print("ZOOM >>> Trim config generated + resourcepack")

destination_folder = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..'))
copy_tree(generated_mod_folder, destination_folder)

print("ZOOM >>> Generated files generated and synced with client")

# Comment for testing
shutil.rmtree(generated_mod_folder)

print("ZOOM >>> Cleanup finished")
