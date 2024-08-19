from PIL import Image
import json
import os

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

layers_path = 'layers'
tiers = [1,2,3,4,5,6,7,8,9,10]
attrs = ['armor_pierce', 'armor_shred','armor_toughness', 'armor','cooldown_reduction', 'crit_chance', 'crit_damage', 'health_boost', 'knockback_resistance', 'lung_capacity', 'mana_boost', 'mana_regen', 'movement_speed', 'spell_power', 'stamina', 'swim_speed']

texture_path = 'assets/kubejs/textures/item'
model_path = 'assets/kubejs/models/item'

create_directory(texture_path)
create_directory(model_path)

BASE_ITEM_MODEL_JSON = {
	"parent": "item/generated",
    "textures": {
        "layer0": None
    }
}


for tier in tiers:
    for attr in attrs:
        upgrade_tier = str(which_upgrade_label(tier))
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

        # full config to be generated here, along with kjs




