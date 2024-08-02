import os

def create_folder(path):
    os.makedirs(path, exist_ok=True)

# Loot Table Generation for mounts
loot_table_location = 'config/paxi/datapacks/economy/data/zoompack_economy/loot_tables'
mounts_folder_location = f'{loot_table_location}/mounts'
create_folder(mounts_folder_location)

mobs = {
    'minecraft:horse': {
        'hp': 30.0,
        'speed': 0.3375,
        'jump': 1.0,
        'armor': 0,
        'dmg': 0,
        'egg_id': 'minecraft:horse_spawn_egg',
        'name': 'Horse',
        'weight': 10
    },
    'minecraft:donkey': {
        'hp': 30.0,
        'speed': 0.225,
        'jump': 0.7,
        'armor': 0,
        'dmg': 0,
        'egg_id': 'minecraft:donkey_spawn_egg',
        'name': 'Donkey',
        'weight': 10
    },
    'minecraft:mule': {
        'hp': 30.0,
        'speed': 0.225,
        'jump': 0.7,
        'armor': 0,
        'dmg': 0,
        'egg_id': 'minecraft:mule_spawn_egg',
        'name': 'Mule',
        'weight': 10
    },
    'minecraft:llama': {
        'hp': 15.0,
        'speed': 0.22,
        'jump': 0.35,
        'armor': 0,
        'dmg': 0,
        'egg_id': 'minecraft:llama_spawn_egg',
        'name': 'Llama',
        'weight': 12
    },
    'minecraft:strider': {
        'hp': 20.0,
        'speed': 0.4,
        'jump': 0,
        'armor': 0,
        'dmg': 0,
        'egg_id': 'minecraft:strider_spawn_egg',
        'name': 'Strider',
        'weight': 10
    },
    'minecraft:camel': {
        'hp': 32.0,
        'speed': 0.09,
        'jump': 0.5,
        'armor': 0,
        'dmg': 0,
        'egg_id': 'minecraft:camel_spawn_egg',
        'name': 'Camel',
        'weight': 8
    },
    'minecraft:skeleton_horse': {
        'hp': 40.0,
        'speed': 0.5,
        'jump': 1.5,
        'armor': 5,
        'dmg': 0,
        'egg_id': 'minecraft:skeleton_horse_spawn_egg',
        'name': 'Skeleton Horse',
        'weight': 2
    },
    'minecraft:zombie_horse': {
        'hp': 40.0,
        'speed': 0.5,
        'jump': 1.5,
        'armor': 5,
        'dmg': 0,
        'egg_id': 'minecraft:zombie_horse_spawn_egg',
        'name': 'Zombie Horse',
        'weight': 2
    },
    'minecraft:ravager': {
        'hp': 100.0,
        'speed': 0.3,
        'jump': 0,
        'armor': 5,
        'dmg': 10,
        'egg_id': 'minecraft:ravager_spawn_egg',
        'name': 'Ravager',
        'weight': 1
    },
    'mythicmounts:firebird': {
        # rare
        'hp': 20.0,
        'speed': 0.3,
        'jump': 1,
        'armor': 0,
        'dmg': 3,
        'egg_id': 'mythicmounts:firebird_spawn_egg',
        'name': 'Zar-ptak',
        'weight': 2
    },
    'mythicmounts:acencia': {
        # uncommon
        'hp': 28.0,
        'speed': 0.3,
        'jump': 1.5,
        'armor': 0,
        'dmg': 10,
        'egg_id': 'mythicmounts:acencia_spawn_egg',
        'name': 'Acencia',
        'weight': 4
    },
    'mythicmounts:archelon': {
        # uncommon
        'hp': 60.0,
        'speed': 0.3375,
        'jump': 1.5,
        'armor': 0,
        'dmg': 6,
        'egg_id': 'mythicmounts:archelon_spawn_egg',
        'name': 'Archelon',
        'weight': 4
    },
    'mythicmounts:colelytra': {
        # uncommon
        'hp': 14.0,
        'speed': 0.3375,
        'jump': 1.5,
        'armor': 0,
        'dmg': 2,
        'egg_id': 'mythicmounts:colelytra_spawn_egg',
        'name': 'Colelytra',
        'weight': 4
    },
    'mythicmounts:courierbird': {
        # common
        'hp': 20.0,
        'speed': 0.3375,
        'jump': 1.5,
        'armor': 0,
        'dmg': 4,
        'egg_id': 'mythicmounts:courierbird_spawn_egg',
        'name': 'Courier Bird',
        'weight': 8
    },
    'mythicmounts:direwolf': {
        # uncommon
        'hp': 30.0,
        'speed': 0.4,
        'jump': 1.3,
        'armor': 0,
        'dmg': 7,
        'egg_id': 'mythicmounts:direwolf_spawn_egg',
        'name': 'Direwolf',
        'weight': 4
    },
    'mythicmounts:dragon': {
        # rare
        'hp': 40.0,
        'speed': 0.4,
        'jump': 1.8,
        'armor': 0,
        'dmg': 10,
        'egg_id': 'mythicmounts:dragon_spawn_egg',
        'name': 'Dragon',
        'weight': 2
    },
    'mythicmounts:griffon': {
        # uncommon
        'hp': 35.0,
        'speed': 0.3,
        'jump': 1.4,
        'armor': 0,
        'dmg': 7,
        'egg_id': 'mythicmounts:griffon_spawn_egg',
        'name': 'Griffon',
        'weight': 4
    },
    'mythicmounts:geckotoalizard': {
        # uncommon
        'hp': 35.0,
        'speed': 0.5,
        'jump': 1.8,
        'armor': 0,
        'dmg': 4,
        'egg_id': 'mythicmounts:geckotoalizard_spawn_egg',
        'name': 'Geckotoa',
        'weight': 4
    },
    'mythicmounts:moth': {
        # common
        'hp': 10.0,
        'speed': 0.3,
        'jump': 1.8,
        'armor': 0,
        'dmg': 2,
        'egg_id': 'mythicmounts:moth_spawn_egg',
        'name': 'Giant Moth',
        'weight': 8
    },
    'mythicmounts:netherbat': {
        # uncommon
        'hp': 25.0,
        'speed': 0.2,
        'jump': 1.4,
        'armor': 0,
        'dmg': 4,
        'egg_id': 'mythicmounts:netherbat_spawn_egg',
        'name': 'Nether Bat',
        'weight': 4
    },
    'mythicmounts:nightmare': {
        # common
        'hp': 35.0,
        'speed': 0.5,
        'jump': 1.7,
        'armor': 0,
        'dmg': 5,
        'egg_id': 'mythicmounts:nightmare_spawn_egg',
        'name': 'Nightmare',
        'weight': 8
    },
    'mythicmounts:nudibranch': {
        # common
        'hp': 25.0,
        'speed': 0.5,
        'jump': 1.5,
        'armor': 0,
        'dmg': 3,
        'egg_id': 'mythicmounts:nudibranch_spawn_egg',
        'name': 'Giant Nudibranch',
        'weight': 8
    },
    'mythicmounts:ridinglizard': {
        # common
        'hp': 20.0,
        'speed': 0.4,
        'jump': 1.8,
        'armor': 0,
        'dmg': 4,
        'egg_id': 'mythicmounts:ridinglizard_spawn_egg',
        'name': 'Giant Lizard',
        'weight': 8
    }
}

level_modifiers = {
    '1' : {
        'prefix': 'Crippled',
        'prefix_color': 'white',
        'hp' : 0,
        'speed' : 0,
        "jump": 0,
        'armor' : 0,
        'dmg' : 0
    },
    '2' : {
        'prefix' : 'Worn',
        'prefix_color': 'yellow',
        'hp' : 10,
        'speed' : 5,
        'jump' : 5,
        'armor' : 5,
        'dmg' : 5,
    },
    '3' : {
        'prefix' : 'Rustic',
        'prefix_color': 'gold',
        'hp' : 30,
        'speed' : 10,
        'jump' : 10,
        'armor' : 10,
        'dmg' : 10,
    },
    '4' : {
        'prefix' : 'Ordinary',
        'prefix_color': 'dark_aqua',
        'hp' : 100,
        'speed' : 15,
        'jump' : 15,
        'armor' : 15,
        'dmg' : 15,
    },
    '5' : {
        'prefix' : 'Trained',
        'prefix_color': 'dark_red',
        'hp' : 200,
        'speed' : 20,
        'jump' : 20,
        'armor' : 15,
        'dmg' : 15,
    },
    '6' : {
        'prefix' : 'Hardened',
        'prefix_color': 'red',
        'hp' : 400,
        'speed' : 25,
        'jump' : 25,
        'armor' : 30,
        'dmg' : 30,
    },
    '7' : {
        'prefix' : 'Sturdy',
        'prefix_color': 'light_purple',
        'hp' : 1000,
        'speed' : 30,
        'jump' : 30,
        'armor' : 80,
        'dmg' : 80,
    },
    '8' : {
        'prefix' : 'Swift',
        'prefix_color': 'green',
        'hp' : 2500,
        'speed' : 35,
        'jump' : 35,
        'armor' : 150,
        'dmg' : 150,
    },
    '9' : {
        'prefix' : 'Majestic',
        'prefix_color': 'dark_purple',
        'hp' : 6000,
        'speed' : 40,
        'jump' : 40,
        'armor' : 250,
        'dmg' : 250,
    }
}

for level_modifier, level_modifier_data in level_modifiers.items():
    BASE_LOOT_TABLE = """{
  "pools": [
    {
      "rolls": 1,
      "entries": [
        ENTRIES_LIST_REPLACE
      ]
    }
  ]
}"""
    ENTRIES = []

    for mob_id, mob_data in mobs.items():
        ENTRY_BASE = """{
          "type": "minecraft:item",
          "name": \"""" + mob_data.get('egg_id') +"""\",
          "weight": """ + str(mob_data.get('weight')) + """,
          "functions": [
            {
              "function": "minecraft:set_nbt",
              "tag": "{EntityTag:{id:MOB_ID_REPLACE,Tame:1b,ActiveEffects:[{Id:6,Duration:20,Amplifier:8,ShowParticles:0b}],Attributes:[ATTRIBUTES_LIST_REPLACE]}}"
            },
            {
              "function": "minecraft:set_name",
              "name": {"text": "EGG_ITEM_REPLACE", "color": "EGG_ITEM_COLOR_REPLACE", "bold": true, "italic":false}
            },
            {
              "function": "minecraft:set_lore",
              "lore": [
                {"text": "Use this egg to summon your own", "color": "purple", "italic":false},
                {"text": "Tier MOB_TIER_REPLACE : MOB_NAME_REPLACE", "color": "purple", "italic":false},
                {"text": "MOB_RARITY_REPLACE", "color": "yellow", "bold":true, "italic":false}
              ]
            }
          ]
        }"""

        ENTRY_BASE = ENTRY_BASE.replace('EGG_ITEM_REPLACE',f"{level_modifier_data.get('prefix')} {mob_data.get('name')} Mount").replace('EGG_ITEM_COLOR_REPLACE', level_modifier_data.get('prefix_color'))
        ENTRY_BASE = ENTRY_BASE.replace('MOB_TIER_REPLACE', level_modifier).replace('MOB_NAME_REPLACE', mob_data.get('name'))
        
        weight = mob_data.get('weight')
        mob_rarity = 'Uncommon'
        for rarity_weight_set in [('Very Common', 12), ('Common', 10), ('Common', 8), ('Uncommon', 4), ('Rare', 2), ('Mythic', 2), ('Epic', 1)]:
            rarity_text = rarity_weight_set[0]
            rarity_count = rarity_weight_set[1]
            if rarity_count == weight:
                mob_rarity = rarity_text

        ENTRY_BASE = ENTRY_BASE.replace('MOB_RARITY_REPLACE', mob_rarity)

        mob_attributes_list_to_be_written = []

        for mob_attr, mob_attr_value in mob_data.items():
            if mob_attr == 'hp':
                new_mob_attr_value = mob_attr_value*(1+level_modifier_data.get('hp')/100)
                new_attribute_to_be_written = """{Name:\"generic.max_health\",Base:""".replace(':"',':\\"').replace('",','\\",') + str("{:.4f}".format(new_mob_attr_value)) + 'f}'
                mob_attributes_list_to_be_written.append(new_attribute_to_be_written)
            if mob_attr == 'speed':
                new_mob_attr_value = mob_attr_value*(1+level_modifier_data.get('speed')/100)
                new_attribute_to_be_written = """{Name:\"generic.movement_speed\",Base:""".replace(':"',':\\"').replace('",','\\",') + str("{:.4f}".format(new_mob_attr_value)) + 'f}'
                mob_attributes_list_to_be_written.append(new_attribute_to_be_written)
            if mob_attr == 'jump':
                new_mob_attr_value = mob_attr_value*(1+level_modifier_data.get('jump')/100)
                new_attribute_to_be_written = """{Name:\"horse.jump_strength\",Base:""".replace(':"',':\\"').replace('",','\\",') + str("{:.4f}".format(new_mob_attr_value)) + 'f}'
                mob_attributes_list_to_be_written.append(new_attribute_to_be_written)
            if mob_attr == 'dmg':
                new_mob_attr_value = mob_attr_value + level_modifier_data.get('dmg')
                new_attribute_to_be_written = """{Name:\"generic.attack_damage\",Base:""".replace(':"',':\\"').replace('",','\\",') + str(new_mob_attr_value) + 'f}'
                mob_attributes_list_to_be_written.append(new_attribute_to_be_written)
            if mob_attr == 'armor':
                new_mob_attr_value = mob_attr_value + level_modifier_data.get('armor')
                new_attribute_to_be_written = """{Name:\"generic.armor\",Base:""".replace(':"',':\\"').replace('",','\\",') + str(new_mob_attr_value) + 'f}'
                mob_attributes_list_to_be_written.append(new_attribute_to_be_written)

        ENTRY_BASE = ENTRY_BASE.replace('MOB_ID_REPLACE', f'\\"{mob_id}\\"').replace('ATTRIBUTES_LIST_REPLACE', ','.join(mob_attributes_list_to_be_written))
        ENTRIES.append(ENTRY_BASE)
 
    with open(f'{loot_table_location}/mounts/tier_{level_modifier}.json', 'w+') as fp:
        fp.write(BASE_LOOT_TABLE.replace('ENTRIES_LIST_REPLACE', ','.join(ENTRIES)))
