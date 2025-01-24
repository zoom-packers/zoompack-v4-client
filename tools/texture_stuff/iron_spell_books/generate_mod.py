from PIL import Image
import shutil
import json
import os

layers_path = 'layers'

def create_directory(dir_path):
    os.makedirs(dir_path, exist_ok=True)

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

def create_spellbook_event(item_id, display_name, spell_slots, magic_attr, magic_percentage, cdr_percentage, max_mana):
    return f"""
    event.create("{item_id}", "irons_spells_js:spellbook")
        	.setMaxSpellSlots({spell_slots})
        	.addDefaultAttribute("{magic_attr}", "", {magic_percentage}, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:cooldown_reduction", "", {cdr_percentage}, "multiply_total")
        	.addDefaultAttribute("irons_spellbooks:max_mana", "", {max_mana}, "addition")
            .displayName("{display_name}");
"""

def generate_startup_js_file(file_path, item_events):
    with open(file_path, 'w+', encoding='utf-8') as file:
        file.write("StartupEvents.registry('item', event => {\n")
        
        for item_id, display_name, spell_slots, magic_attr, magic_percentage, cdr_percentage, max_mana in item_events:
            file.write(create_spellbook_event(item_id, display_name, spell_slots, magic_attr, magic_percentage, cdr_percentage, max_mana))
        
        file.write("});\n")

def copy_and_replace(source_folder: str, destination_folder: str, replacement: str):
    if not os.path.exists(destination_folder):
        os.makedirs(destination_folder)

    for filename in os.listdir(source_folder):
        source_path = os.path.join(source_folder, filename)

        if os.path.isfile(source_path):
            new_filename = filename.replace("tier_magic_type", replacement)
            destination_path = os.path.join(destination_folder, new_filename)

            with open(source_path, "r", encoding="utf-8") as file:
                content = file.read().replace("tier_magic_type", replacement)

            with open(destination_path, "w", encoding="utf-8") as file:
                file.write(content)

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

magic_types = {'blood':{'attr':'irons_spellbooks:blood_spell_power'}, 'ender':{'attr':'irons_spellbooks:ender_spell_power'}, 'evocation':{'attr':'irons_spellbooks:evocation_spell_power'}, 'fire':{'attr':'irons_spellbooks:fire_spell_power'}, 'holy':{'attr':'irons_spellbooks:holy_spell_power'}, 'ice':{'attr':'irons_spellbooks:ice_spell_power'}, 'lightning':{'attr':'irons_spellbooks:lightning_spell_power'}, 'nature':{'attr':'irons_spellbooks:nature_spell_power'}}
tiers = {'improved':{
    'attr':0.05,
    'cdr':0.05,
    'mana':100,
    'slots':8
},
'specialized':{
    'attr':0.1,
    'cdr':0.1,
    'mana':200,
    'slots':10
}, 
'enchanted':{
    'attr':0.05,
    'cdr':0.05,
    'mana':100,
    'slots':8
},
'merlin':{
    'attr':0.15,
    'cdr':0.15,
    'mana':300,
    'slots':12
},
'ancient':{
    'attr':0.2,
    'cdr':0.2,
    'mana':400,
    'slots':14
},
'legendary':{
    'attr':0.3,
    'cdr':0.3,
    'mana':600,
    'slots':15
}
}


base_generated_dir = 'generated'
kjs_folder_dir = f'{base_generated_dir}/kubejs'
kjs_startup_scripts_dir = f'{kjs_folder_dir}/startup_scripts'

assets_dir = f'{kjs_folder_dir}/assets'
assets_mod_dir = f'{assets_dir}/irons_spellbooks'
models_assets_mod_dir = f'{assets_mod_dir}/models'
item_models_assets_mod_dir = f'{models_assets_mod_dir}/item'
textures_assets_mod_dir = f'{assets_mod_dir}/textures'
item_textures_assets_mod_dir = f'{textures_assets_mod_dir}/item' #for gui
texture_item_textures_assets_mod_dir = f'{item_textures_assets_mod_dir}/spell_book_models' #for textures

models_to_copy_folder = 'models'

create_directory(base_generated_dir)
create_directory(kjs_folder_dir)
create_directory(kjs_startup_scripts_dir)
create_directory(assets_dir)
create_directory(assets_mod_dir)
create_directory(models_assets_mod_dir)
create_directory(item_models_assets_mod_dir)
create_directory(textures_assets_mod_dir)
create_directory(item_textures_assets_mod_dir)
create_directory(texture_item_textures_assets_mod_dir)

item_events = []

for magic_type in magic_types:
    for tier in tiers:
        combine_images([f'{layers_path}/{magic_type}_spell_book_gui.png',f'{layers_path}/{tier}_tier_gui.png'],f'{item_textures_assets_mod_dir}/{tier}_{magic_type}_spell_book_gui.png')
        combine_images([f'{layers_path}/{magic_type}_spell_book.png',f'{layers_path}/{tier}_tier.png'],f'{texture_item_textures_assets_mod_dir}/{tier}_{magic_type}_spell_book.png')
        copy_and_replace(models_to_copy_folder, item_models_assets_mod_dir, f'{tier}_{magic_type}')

        item_id = f'irons_spellbooks:{tier}_{magic_type}_spellbook'
        display_name = f'{tier} {magic_type} spellbook'

        item_events.append((item_id, display_name.capitalize(), tiers.get(tier).get('slots'), magic_types.get(magic_type).get('attr'), tiers.get(tier).get('attr'), tiers.get(tier).get('cdr'), tiers.get(tier).get('mana')))

generate_startup_js_file(f'{kjs_startup_scripts_dir}/zoomers_spellbooks.js', item_events)



destination_folder = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..'))
copy_tree(base_generated_dir, destination_folder)

print("ZOOM >>> Generated files generated and synced with client")

# Comment for testing
shutil.rmtree(base_generated_dir)

print("ZOOM >>> Cleanup finished")