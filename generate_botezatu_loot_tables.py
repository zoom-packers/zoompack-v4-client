import os
import json

def create_folder(path):
    os.makedirs(path, exist_ok=True)

# Loot Table Generation for mounts
loot_table_location = 'config/paxi/datapacks/economy/data/zoompack_economy/loot_tables'
botezatu_folder_location = f'{loot_table_location}/botezatu'
create_folder(botezatu_folder_location)

pieces_classic = ['helmet', 'chestplate', 'leggings', 'boots']
pieces_wrong = ['head', 'chest', 'legs', 'feet']

loot_tiers = ['common', 'uncommon', 'rare', 'legendary']

mods = [{
    'mod_id' : 'fantasy_armor',
    'pieces' : pieces_classic,
    'prefixes' : {
        'eclipse_soldier' : {
            'common' : 1,
            'uncommon' : 1,
            'rare' : 1,
            'legendary' : 1
        },
        'dragonslayer' : {
            'common' : 1,
            'uncommon' : 1,
            'rare' : 1,
            'legendary' : 1
        },
        'hero' : {
            'common' : 1,
            'uncommon' : 1,
            'rare' : 1,
            'legendary' : 1
        },
        'golden_horns' : {
            'common' : 1,
            'uncommon' : 1,
            'rare' : 1,
            'legendary' : 1
        },
        'thief' : {
            'common' : 1,
            'uncommon' : 1,
            'rare' : 1,
            'legendary' : 1
        },
        'wandering_wizard' : {
            'common' : 1,
            'uncommon' : 1,
            'rare' : 1,
            'legendary' : 1
        },
        'chess_board_knight' : {
            'common' : 1,
            'uncommon' : 1,
            'rare' : 1,
            'legendary' : 1
        },
        'dark_lord' : {
            'common' : 1,
            'uncommon' : 1,
            'rare' : 1,
            'legendary' : 1
        },
        'sunset_wings': {
            'common' : 1,
            'uncommon' : 1,
            'rare' : 1,
            'legendary' : 1
        },
    },
    'prefix_suffix_bridge' : '_'
},
{
    'mod_id' : 'armoroftheages',
    'pieces' : pieces_wrong,
    'prefixes' : {
        'anubis' : {
            'common' : 1,
            'uncommon' : 1,
            'rare' : 1,
            'legendary' : 1
        },
        'centurion' : {
            'common' : 1,
            'uncommon' : 1,
            'rare' : 1,
            'legendary' : 1
        },
        'holy' : {
            'common' : 1,
            'uncommon' : 1,
            'rare' : 1,
            'legendary' : 1
        },
        'iron_plate' : {
            'common' : 1,
            'uncommon' : 1,
            'rare' : 1,
            'legendary' : 1
        },
        'japanese_light' : {
            'common' : 1,
            'uncommon' : 1,
            'rare' : 1,
            'legendary' : 1
        },
        'o_yoroi' : {
            'common' : 1,
            'uncommon' : 1,
            'rare' : 1,
            'legendary' : 1
        },
        'pharaoh' : {
            'common' : 1,
            'uncommon' : 1,
            'rare' : 1,
            'legendary' : 1
        },
        'quetzalcoatl' : {
            'common' : 1,
            'uncommon' : 1,
            'rare' : 1,
            'legendary' : 1
        },
        'raijin': {
            'common' : 1,
            'uncommon' : 1,
            'rare' : 1,
            'legendary' : 1
        },
    },
    'prefix_suffix_bridge' : '_armor_'
},
{
    'mod_id' : 'nether_armory',
    'pieces' : pieces_classic,
    'prefixes' : {
        'infernal_gladiator' : {
            'common' : 1,
            'uncommon' : 1,
            'rare' : 1,
            'legendary' : 1
        },
        'warped_fungus' : {
            'common' : 1,
            'uncommon' : 1,
            'rare' : 1,
            'legendary' : 1
        },
        'crimson_fungus' : {
            'common' : 1,
            'uncommon' : 1,
            'rare' : 1,
            'legendary' : 1
        },
        'obsidian': {
            'common' : 1,
            'uncommon' : 1,
            'rare' : 1,
            'legendary' : 1
        },
    },
    'prefix_suffix_bridge' : '_armor_'
}]

for loot_table_tier in loot_tiers:
    file_to_use = f'{botezatu_folder_location}/cosmetics_{loot_table_tier}.json'

    loot_table = {
        "type": "minecraft:loot_table",
        "pools": [
            {
                "rolls": 1,
                "entries": [
                ]
            }
        ]
    }

    for mod in mods:
        for piece in mod['pieces']:
            for armor_prefix in mod['prefixes']:

                prefix_suffix_bridge = mod['prefix_suffix_bridge']
                mod_id = mod['mod_id']

                item_id = f'{mod_id}:{armor_prefix}{prefix_suffix_bridge}{piece}'
                item_weight = mod['prefixes'][armor_prefix][loot_table_tier]

                if item_weight>0:
                    loot_table['pools'][0]['entries'].append({
                        'type' : 'minecraft:item',
                        'name' : item_id,
                        'weight' : item_weight,
                        'functions' : [
                            {
                                'function' : "minecraft:set_nbt",
                                "tag": """{affix_data:{affixes:{"apotheosis:armor/attribute/ironforged":0.0f}}}"""
                            }
                        ]
                    })

    with open(file_to_use, 'w+') as f:
        f.write(json.dumps(loot_table, indent=4))
