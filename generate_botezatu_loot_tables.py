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
        # uncommon
        'eclipse_soldier' : {
            'common' : 1,
            'uncommon' : 1,
            'rare' : 0,
            'legendary' : 0
        },
        # rare
        'dragonslayer' : {
            'common' : 0,
            'uncommon' : 0,
            'rare' : 1,
            'legendary' : 0
        },
        # rare
        'hero' : {
            'common' : 0,
            'uncommon' : 0,
            'rare' : 2,
            'legendary' : 0
        },
        # rare
        'golden_horns' : {
            'common' : 0,
            'uncommon' : 0,
            'rare' : 1,
            'legendary' : 0
        },
        # common
        'thief' : {
            'common' : 10,
            'uncommon' : 1,
            'rare' : 0,
            'legendary' : 0
        },
        # not lootable
        'wandering_wizard' : {
            'common' : 0,
            'uncommon' : 0,
            'rare' : 0,
            'legendary' : 0
        },
        # uncommon
        'chess_board_knight' : {
            'common' : 1,
            'uncommon' : 1,
            'rare' : 0,
            'legendary' : 0
        },
        # legendary
        'dark_lord' : {
            'common' : 0,
            'uncommon' : 0,
            'rare' : 0,
            'legendary' : 4
        },
        # legendary
        'sunset_wings': {
            'common' : 0,
            'uncommon' : 0,
            'rare' : 0,
            'legendary' : 4
        },
    },
    'prefix_suffix_bridge' : '_'
},
{
    'mod_id' : 'armoroftheages',
    'pieces' : pieces_wrong,
    'prefixes' : {
        # not lootable
        'anubis' : {
            'common' : 0,
            'uncommon' : 0,
            'rare' : 0,
            'legendary' : 0
        },
        # common
        'centurion' : {
            'common' : 10,
            'uncommon' : 1,
            'rare' : 0,
            'legendary' : 0
        },
        # not lootable
        'holy' : {
            'common' : 0,
            'uncommon' : 0,
            'rare' : 0,
            'legendary' : 0
        },
        # common
        'iron_plate' : {
            'common' : 10,
            'uncommon' : 1,
            'rare' : 0,
            'legendary' : 0
        },
        # common
        'japanese_light' : {
            'common' : 10,
            'uncommon' : 1,
            'rare' : 0,
            'legendary' : 0
        },
        # common
        'o_yoroi' : {
            'common' : 10,
            'uncommon' : 1,
            'rare' : 0,
            'legendary' : 0
        },
        # rare
        'pharaoh' : {
            'common' : 0,
            'uncommon' : 0,
            'rare' : 4,
            'legendary' : 0
        },
        # legendary
        'quetzalcoatl' : {
            'common' : 0,
            'uncommon' : 0,
            'rare' : 0,
            'legendary' : 1
        },
        # not lootable
        'raijin': {
            'common' : 0,
            'uncommon' : 0,
            'rare' : 0,
            'legendary' : 0
        },
    },
    'prefix_suffix_bridge' : '_armor_'
},
{
    'mod_id' : 'nether_armory',
    'pieces' : pieces_classic,
    'prefixes' : {
        # legendary
        'infernal_gladiator' : {
            'common' : 0,
            'uncommon' : 0,
            'rare' : 0,
            'legendary' : 2
        },
        # uncommon
        'warped_fungus' : {
            'common' : 1,
            'uncommon' : 1,
            'rare' : 0,
            'legendary' : 0
        },
        # uncommon
        'crimson_fungus' : {
            'common' : 1,
            'uncommon' : 1,
            'rare' : 0,
            'legendary' : 0
        },
        # uncommon
        'obsidian': {
            'common' : 1,
            'uncommon' : 1,
            'rare' : 0,
            'legendary' : 0
        },
    },
    'prefix_suffix_bridge' : '_armor_'
}]

rarity_colors = {
    'legendary' : 'gold',
    'rare' : 'dark_purple',
    'uncommon' : 'green',
    'common': 'white'
}

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
                            },
                            {
                                "function": "set_nbt",
                                "tag": "{display:{Lore:['{\"text\":\"This is a cosmetic item granted by Catalin Botezatu\",\"color\":\"dark_green\",\"italic\":false}', '{\"text\":\"Rarity: \",\"color\":\"yellow\",\"bold\":true,\"italic\":false,\"extra\":[{\"text\":\""+ loot_table_tier.upper() +"\",\"color\":\""+ rarity_colors[loot_table_tier] +"\",\"bold\":true,\"italic\":false}]}']},HideFlags:63}"
                            }
                        ]
                    })

    with open(file_to_use, 'w+') as f:
        f.write(json.dumps(loot_table, indent=4))
