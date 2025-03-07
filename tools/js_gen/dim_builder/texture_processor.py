import json
import threading

from working_texture import WorkingTexture
from PIL import Image

def process_texture(task):
    print(f"Processing task: {task}")  # Debugging statement
    textures = []
    for texture_info in task['work']:
        print(f"Texture info: {texture_info}")  # Debugging statement
        texture = WorkingTexture().with_path(texture_info['path'])
        for operation in texture_info:
            if 'tint' in operation and texture_info['tint']['r'] != 0 or texture_info['tint']['g'] != 0 or texture_info['tint']['b'] != 0:
                texture.with_tint(texture_info['tint'])
            if 'brightness' in operation:
                texture.with_brightness(texture_info['brightness'])
            if 'chromaKeyOperations' in operation:
                texture.with_chroma_keys(texture_info['chromaKeyOperations'])
        textures.append(texture.process())
    
    combined_texture = combine_textures(textures)
    combined_texture.save(task['path'], format='PNG')

def combine_textures(textures):
    base_image = None
    for img in textures:
        if base_image is None:
            base_image = img
        else:
            base_image = Image.alpha_composite(base_image, img)
    return base_image

def main(json_file):
    with open(json_file, 'r') as file:
        tasks = json.load(file)

    threads = []
    for task in tasks:
        thread = threading.Thread(target=process_texture, args=(task,))
        threads.append(thread)
        thread.start()

    for thread in threads:
        thread.join()

    # for task in tasks:
    #     process_texture(task)

if __name__ == "__main__":
    import sys
    if len(sys.argv) != 2:
        main("tex_gen.json")
    else:
        main(sys.argv[1])
