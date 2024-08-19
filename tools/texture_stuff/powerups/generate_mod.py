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

def generate_js_file(file_path, item_events):
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write("StartupEvents.registry('item', event => {\n")
        
        for item_id, display_name, tooltip in item_events:
            file.write(create_item_event(item_id, display_name, tooltip))
        
        file.write("});\n")

def create_directory(dir_path):
    os.makedirs(dir_path, exist_ok=True)

def which_upgrade_label(tier):
    if tier<3:
        return 1
    if tier<5:
        return 2
    if tier<7:
        return 3
    return 4

def get_title_color(tier):
    return f'{get_title_color_final(tier)}§l'

def get_title_color_final(tier):
    if tier<3:
        return ''
    if tier<5:
        return '§a'
    if tier<7:
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

attr_map = {
    'armor': {
        'attr_text': 'Armor',
        'attribute': 'minecraft:generic.armor',
        'operation': 'ADDITION',
        'tier_m': {
            1: 0.5,
            2: 1,
            3: 2,
            4: 3,
            5: 4,
            6: 5,
            7: 6,
            8: 7,
            9: 8,
            10: 9
        }
    },
    'armor_toughness': {
        'attr_text': 'Armor Toughness',
        'attribute': 'minecraft:generic.armor_toughness',
        'operation': 'ADDITION',
        'tier_m': {
            1: 0.2,
            2: 0.4,
            3: 0.6,
            4: 0.8,
            5: 1.0,
            6: 1.2,
            7: 1.4,
            8: 1.6,
            9: 1.8,
            10: 2.0
        }
    },
    'armor_pierce': {
        'attr_text': 'Armor Pierce',
        'attribute': 'attributeslib:armor_pierce',
        'operation': 'ADDITION',
        'tier_m': {
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
            6: 6,
            7: 7,
            8: 8,
            9: 9,
            10: 10
        }
    },
    'armor_shred': {
        'attr_text': 'Armor Shred',
        'attribute': 'attributeslib:armor_shred',
        'operation': 'ADDITION',
        'tier_m': {
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
            6: 6,
            7: 7,
            8: 8,
            9: 9,
            10: 10
        }
    },
    'cooldown_reduction': {
        'attr_text': 'Cooldown Reduction',
        'attribute': 'irons_spellbooks:cooldown_reduction',
        'operation': 'ADDITION',
        'tier_m': {
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
            6: 6,
            7: 7,
            8: 8,
            9: 9,
            10: 10
        }
    },
    'crit_chance': {
        'attr_text': 'Critical Chance',
        'attribute': 'attributeslib:crit_chance',
        'operation': 'ADDITION',
        'tier_m': {
            1: 0.5,
            2: 1,
            3: 1.5,
            4: 2,
            5: 2.5,
            6: 3,
            7: 3.5,
            8: 4,
            9: 4.5,
            10: 5
        }
    },
    'crit_damage': {
        'attr_text': 'Critical Damage',
        'attribute': 'attributeslib:crit_damage',
        'operation': 'ADDITION',
        'tier_m': {
            1: 2,
            2: 4,
            3: 6,
            4: 8,
            5: 10,
            6: 12,
            7: 14,
            8: 16,
            9: 18,
            10: 20
        }
    },
    'health_boost': {
        'attr_text': 'Health Boost',
        'attribute': 'minecraft:generic.max_health',
        'operation': 'ADDITION',
        'tier_m': {
            1: 10,
            2: 20,
            3: 30,
            4: 40,
            5: 50,
            6: 60,
            7: 70,
            8: 80,
            9: 90,
            10: 100
        }
    },
    'knockback_resistance': {
        'attr_text': 'Knockback Resistance',
        'attribute': 'minecraft:generic.knockback_resistance',
        'operation': 'ADDITION',
        'tier_m': {
            1: 0.5,
            2: 1,
            3: 1.5,
            4: 2,
            5: 2.5,
            6: 3,
            7: 3.5,
            8: 4,
            9: 4.5,
            10: 5
        }
    },
    'lung_capacity': {
        'attr_text': 'Lung Capacity',
        'attribute': 'additionalentityattributes:lung_capacity',
        'operation': 'ADDITION',
        'tier_m': {
            1: 10,
            2: 20,
            3: 30,
            4: 40,
            5: 50,
            6: 60,
            7: 70,
            8: 80,
            9: 90,
            10: 100
        }
    },
    'mana_boost': {
        'attr_text': 'Mana Boost',
        'attribute': 'irons_spellbooks:max_mana',
        'operation': 'ADDITION',
        'tier_m': {
            1: 10,
            2: 20,
            3: 30,
            4: 40,
            5: 50,
            6: 60,
            7: 70,
            8: 80,
            9: 90,
            10: 100
        }
    },
    'mana_regen': {
        'attr_text': 'Mana Regeneration',
        'attribute': 'irons_spellbooks:mana_regen',
        'operation': 'ADDITION',
        'tier_m': {
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
            6: 6,
            7: 7,
            8: 8,
            9: 9,
            10: 10
        }
    },
    'movement_speed': {
        'attr_text': 'Movement Speed',
        'attribute': 'minecraft:generic.movement_speed',
        'operation': 'ADDITION',
        'tier_m': {
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
            6: 6,
            7: 7,
            8: 8,
            9: 9,
            10: 10
        }
    },
    'spell_power': {
        'attr_text': 'Spell Power',
        'attribute': 'irons_spellbooks:spell_power',
        'operation': 'ADDITION',
        'tier_m': {
            1: 5,
            2: 10,
            3: 15,
            4: 20,
            5: 25,
            6: 30,
            7: 35,
            8: 40,
            9: 45,
            10: 50
        }
    },
    'stamina': {
        'attr_text': 'Stamina',
        'attribute': 'puffish_attributes:player.stamina',
        'operation': 'ADDITION',
        'tier_m': {
            1: 10,
            2: 20,
            3: 30,
            4: 40,
            5: 50,
            6: 60,
            7: 70,
            8: 80,
            9: 90,
            10: 100
        }
    },
    'swim_speed': {
        'attr_text': 'Swim Speed',
        'attribute': 'additionalentityattributes:water_speed',
        'operation': 'ADDITION',
        'tier_m': {
            1: 0.1,
            2: 0.2,
            3: 0.3,
            4: 0.4,
            5: 0.5,
            6: 0.6,
            7: 0.7,
            8: 0.8,
            9: 0.9,
            10: 1.0
        }
    }
}


layers_path = 'layers'
generated_mod_folder = 'trim_mod_data'
generated_folder = f'{generated_mod_folder}/kubejs'
config_folder = f'{generated_mod_folder}/config'
trim_config_file = f'{config_folder}/functionalarmortrim.json'
texture_path = f'{generated_folder}/assets/kubejs/textures/item'
model_path = f'{generated_folder}/assets/kubejs/models/item'
startup_scripts_path = f'{generated_folder}/startup_scripts'

create_directory(texture_path)
create_directory(model_path)
create_directory(startup_scripts_path)
create_directory(config_folder)

print("ZOOM >>> Folder structure generated")

BASE_ITEM_MODEL_JSON = {
	"parent": "item/generated",
    "textures": {
        "layer0": None
    }
}

BASE_TRIM_CONFIG = {}

file_path = f'{startup_scripts_path}/trim_powerups.js'
item_events = []

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

        item_model_path = f'{model_path}/{item_model_name}'

        with open(item_model_path, 'w+') as f:
            f.write(json.dumps(BASE_ITEM_MODEL_JSON, indent=4))
        
        attr_text = attr_map[attr]['attr_text']
        attr_value = attr_map.get(attr).get('tier_m').get(tier)
        item_events.append((item_base_name, f'{title_color}Tier {tier_str} {attr_text} Power Up', f'+{str(attr_value)} {attr_text}'))

        BASE_TRIM_CONFIG[item_base_name] = [{
            'attribute': attr_map[attr]['attribute'],
            'operation' : attr_map[attr]['operation'],
            'amount' : attr_value
        }]

generate_js_file(file_path, item_events)

print("ZOOM >>> Resourcepack and KubeJS item registry generated")

with open(trim_config_file, 'w+') as f:
    f.write(json.dumps(BASE_TRIM_CONFIG, indent=4))

print("ZOOM >>> Trim config generated")

destination_folder = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..'))
copy_tree(generated_mod_folder, destination_folder)

print("ZOOM >>> Generated files generated and synced with client")