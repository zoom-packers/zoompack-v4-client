import os
import json
import random

def create_folder_if_not_exists(folder_path):
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)

REGISTRY_PATH = 'tools\configs\item_registry_dump'
obscure_tooltips_assets_path = "kubejs/assets/obscure_tooltips"
tooltips_path = f'{obscure_tooltips_assets_path}/tooltips'
styles_path = f'{tooltips_path}/styles'
panels_path = f'{tooltips_path}/panels'
icons_path = f'{tooltips_path}/icons'
effects_path = f'{tooltips_path}/effects'
frames_path = f'{tooltips_path}/frames'

create_folder_if_not_exists(obscure_tooltips_assets_path)
create_folder_if_not_exists(tooltips_path)

for path in [tooltips_path, styles_path, panels_path, icons_path, effects_path]:
    create_folder_if_not_exists(path)


def rgb_to_argb(rgb, alpha):
    """Convert RGB color to ARGB format with the given alpha."""
    return f"{alpha:02x}{rgb[0]:02x}{rgb[1]:02x}{rgb[2]:02x}"

def generate_colors(base_colors):
    """Generate ARGB colors with varying alpha values."""
    colors = []
    for color in base_colors:
        alpha = random.randint(0x80, 0xFC)
        argb = rgb_to_argb(color, alpha)
        colors.append(argb)
    return colors

def effect_start_color(color):
    alpha = random.randint(0x20, 0x30)
    return f'{alpha:02x}{color[2:]}'

def effect_end_color(color):
    return '00' + color[2:]

def panel_adjustment_color(color):
    alpha = random.randint(0xf0, 0xfc)
    return f'{alpha:02x}{color[2:]}'

def icon_alpha(color):
    alpha = random.randint(0x10, 0x20)
    return f'{alpha:02x}{color[2:]}'

def generate_json_content(colors):
    """Generate the JSON content as a dictionary based on the provided colors."""
    effects = {
        "priority": 9999,
        "factory": "obscure_tooltips:rim_lighting",
        "start_color": effect_start_color(colors[0]),
        "end_color": effect_end_color(colors[1]),
        "particle_center_color": colors[2],
        "particle_edge_color": colors[3]
    }

    icons = {
        "priority": 9999,
        "factory": "obscure_tooltips:descent_shine",
        "center_color": icon_alpha(colors[1]),
        "start_color": colors[0],
        "end_color": icon_alpha(colors[1]),
        "particle_center_color": colors[2],
        "particle_edge_color": colors[3]
    }

    panels = {
        "priority": 9999,
        "factory": "obscure_tooltips:color_rect",
        "back_top_color": panel_adjustment_color(colors[0]),
        "back_bottom_color": panel_adjustment_color(colors[1]),
        "border_top_color": panel_adjustment_color(colors[2]),
        "border_bottom_color": panel_adjustment_color(colors[3]),
        "slot_color": "30ffffff"
    }

    return {
        "effects.json": effects,
        "icons.json": icons,
        "panels.json": panels
    }

def generate_style_file(file_name, mod_id):
    return {
        "priority": 9999,
        "panel": f"obscure_tooltips:{file_name}",
        "frame": f"obscure_tooltips:{file_name}",
        "icon": f"obscure_tooltips:{file_name}",
        "effects": [
            f"obscure_tooltips:{file_name}"
        ],
        "filter": {
            "mods": [
                mod_id
            ]
        }
    }

def write_json_file(json_content, path):
    with open(path, 'w+') as file:
        json.dump(json_content, file, indent=4)

def new_icons_file_content(texture_file):
    return {
        "factory": "obscure_tooltips:texture",
        "texture": f"obscure_tooltips:textures/tooltips/{texture_file}.png"
    }

def generate_theme_for_mod(mod_id, color_schemes, file_prefix, tint_down):
    modified_colors = []
    for color in color_schemes:
        modified_colors.append( (int(color[0]*tint_down), int(color[1]*tint_down), int(color[2]*tint_down)) )

    colors = generate_colors(modified_colors)
    json_content = generate_json_content(colors)

    effects_content = json_content['effects.json']
    icons_content = json_content['icons.json']
    panels_content = json_content['panels.json']

    write_json_file(effects_content, f'{effects_path}/{file_prefix}.json')
    write_json_file(icons_content, f'{icons_path}/{file_prefix}.json')
    write_json_file(panels_content, f'{panels_path}/{file_prefix}.json')
    write_json_file(new_icons_file_content(file_prefix), f'{frames_path}/{file_prefix}.json')

    style_file_content = generate_style_file(file_prefix, mod_id)
    write_json_file(style_file_content, f'{styles_path}/{file_prefix}_style.json')

def copy_style_for_items(style_to_copy_and_change, new_file, item_list, priority = 9999):
    with open(f'{styles_path}/{style_to_copy_and_change}' ,'r') as file:
        json_content = json.loads(file.read())

        json_content['filter'] = {
            'items' : item_list
        }
        json_content['priority'] = priority

        with open(f'{styles_path}/{new_file}', 'w+') as new_file:
            new_file.write(json.dumps(json_content, indent=4))

# Registry related

def get_item_registry(registry_path):
    with open(registry_path, 'r') as file:
        return [dirty_line.replace("\n",'') for dirty_line in file.readlines()]

item_registry  = get_item_registry(REGISTRY_PATH)


def get_item_list(item_registry, matches, mods_to_skip=[], no_matches=[],  mods_to_include=[]):
    """
        item regsitry should be the list of all the items
        mods to skip are the mods that should not be taken into consideration
        matches = list of rules to apply like each matches in
        no_matches = the opposite of matches
        mods to include are the mods that should only be taken into consideration if not empty
    """
    selected_items = []

    for item in item_registry:
        mod_id = item.split(':')[0]
        if mod_id not in mods_to_skip:
            to_continue = False

            if mods_to_include:
                if mod_id in mods_to_include:
                    to_continue=True
            else:
                to_continue = True
            
            if to_continue:
                for match in matches:
                    if match in item:
                        to_add = True
                        for no_match in no_matches:
                            if no_match in item:
                                to_add = False
                        
                        if to_add:
                            selected_items.append(item)

    return list(set(selected_items))


# generate_theme_for_mod('betternether', [(191, 143, 0),(139, 0, 0),(0, 0, 0),(64, 64, 64)], 'the_nether', 0.5)
# generate_theme_for_mod('theabyss', [(29, 32, 88),(36, 40, 123),(97, 25, 88),(127, 21, 113)], 'the_abyss', 0.7)
# generate_theme_for_mod('blue_skies', [(99, 16, 137),(50, 17, 141),(22, 121, 141),(183, 65, 26)], 'blue_skies', 0.8)

blue_skies_related_items =  get_item_list(item_registry, ['pyrope', 'aquite', 'diopside', 'charoite', 'horizonite'], [], [], ['zoomers_armory'])
copy_style_for_items('blue_skies_style.json', 'blue_skies_style2.json', blue_skies_related_items, priority=9999)





the_nether_related_items = get_item_list(item_registry, ['nether', 'cincinnasite'])
the_nether_related_items2 = get_item_list(item_registry, ['cincinnasite', 'nether_ruby', 'flaming_ruby', 'netherite'], [], [], ['zoomers_armory'])
the_nether_related_items3 = get_item_list(item_registry, ['abyssal', 'whisper_of_the_abyss', 'divider'], [],['amethyst'],['aquamirae'])
copy_style_for_items('the_nether_style.json', 'the_nether_style2.json', the_nether_related_items + the_nether_related_items2 + the_nether_related_items3, priority=9999)


undergarden_related_items =  get_item_list(item_registry, ['cloggrum', 'froststeel', 'utherium', 'forgotten', 'jade'], [], [], ['zoomers_armory'])
copy_style_for_items('undergarden_style.json', 'undergarden_style2.json', undergarden_related_items, priority=9999)


end_related_items = get_item_list(item_registry, ['_end',':end_'], [
      "outer_end",
      "endlessbiomes",
      "phantasm",
      "ender_dragon_loot_",
      "enderitemod",
      'zoomers_armory',
      'iron_spellbooks'
    ])
end_related_items2 =  get_item_list(item_registry, ['dragon', 'enderite'], [], [], ['zoomers_armory'])
copy_style_for_items('the_end_style.json', 'the_end_style2.json', end_related_items + end_related_items2, priority=9998)

depth_related_items =  get_item_list(item_registry, ['soul', 'immemorial'], [], [], ['zoomers_armory'])
copy_style_for_items('depth_style.json', 'depth_style2.json', depth_related_items, priority=9999)



abyss_related_items = get_item_list(item_registry, ['fusion', 'aberythe', 'bone', 'ignisithe', 'glacerythe', 'garnite', 'phantom', 'unorithe', 'incorythe', 'abyss_'],[],[], ['zoomers_armory'])
copy_style_for_items('the_abyss_style.json', 'the_abyss_style2.json', abyss_related_items, priority=9999)



