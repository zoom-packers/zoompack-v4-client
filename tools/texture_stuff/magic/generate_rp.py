import os
import shutil

model_path = 'model.json'
textures_folder_path = 'textures/'
output_folder = 'generated_rp'
namespace = 'zoomers_magic'

ROLES = ['archevoker', 'cryomancer', 'cultist', 'electromancer', 'plagued', 'priest', 'pyromancer', 'shadowwalker']

def create_folder(path):
    os.makedirs(path, exist_ok=True)

def copy_tree_with_skip(src, dst):
    os.makedirs(dst, exist_ok=True)
    
    for item in os.listdir(src):
        src_item = os.path.join(src, item)
        dst_item = os.path.join(dst, item)

        if os.path.exists(dst_item):
            print(f"Skipping {dst_item} as it already exists.")
            continue

        if os.path.isdir(src_item):
            copy_tree_with_skip(src_item, dst_item)
        else:
            shutil.copy2(src_item, dst_item)


# This scripts generates a resourcepack for zoomers magic offhand items

with open(model_path, 'r') as fp:
    model_text_raw = fp.read()

    namespace_folder = f'{output_folder}/assets/{namespace}'
    models_path = f'{namespace_folder}/models/item'
    texture_paths = f'{namespace_folder}/textures/item'

    create_folder(models_path)
    create_folder(texture_paths)

    copy_tree_with_skip(textures_folder_path, texture_paths)

    for tier in range(1,9):
        for role in ROLES:
            new_model_path = f'{models_path}/{role}_offhand_tier_{str(tier)}.json'
            with open(new_model_path, 'w+') as model_fp:
                model_fp.write(model_text_raw.replace('TEXTURE_TEXT_REPLACE', role))