from PIL import Image
import shutil
import json
import os


layers_path = 'layers'



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




magic_types = ['blood', 'ender', 'evocation', 'fire', 'holy', 'ice', 'lightning', 'nature']
tiers = ['specialized', 'enchanted', 'merlin', 'ancient', 'legendary']


combine_images(['layers/ender_spell_book_gui.png','layers/ancient_tier_gui.png'], 'ancient_ender_spell_book_gui.png')

