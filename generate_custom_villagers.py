import json
import copy

import os

def create_folder(path):
    os.makedirs(path, exist_ok=True)

base_villager_trade_data = {
  "removeOtherTrades": True,
  "trades": []
}
# 100 for testing only
base_villager_trade_data['maxTrades'] = 100
# banker_config['maxTrades'] = 3


banker_config = copy.deepcopy(base_villager_trade_data)
banker_config['profession'] = "spacecatcustomprofessions:banker"

gemist_config = copy.deepcopy(base_villager_trade_data)
gemist_config['profession'] = "spacecatcustomprofessions:gemist"

animalist_config = copy.deepcopy(base_villager_trade_data)
animalist_config['profession'] = "spacecatcustomprofessions:animalist"

custom_villagers_trades_data = {
  'banker' : banker_config,
  'gemist' : gemist_config,
  'animalist' : animalist_config
}

def new_custom_villager_trade(villager, request, offer, trade_xp, max_uses, trade_lvl,price_multiplier = 0, demand=0, additional_request = None, potion_offer_effects = None, potion_color = 16004148, loot_table = None, item_title=None, item_lore=None, rarity=-1, item_title_color=None, item_lore_color=None, egg_mob=None, mob_hp_percentage_boost=1, mob_armor_boost=0, mob_damage_boost=0, mob_speed_pertange_boost=0):
    trade_data = {
      "request": {
        "itemKey": request[0],
        "amount": request[1]
      },
      "offer": {
        "itemKey": offer[0],
        "amount": offer[1]
      },
      "tradeExp": trade_xp,
      "maxUses": max_uses,
      "priceMultiplier": price_multiplier,
      "demand": demand,
      "tradeLevel": trade_lvl
    }

    if potion_offer_effects:
        trade_data['offer']['effects'] = potion_offer_effects
        trade_data['offer']['advancedNBTData'] = """{CustomPotionColor:""" + str(potion_color) + """}"""

    if loot_table:
        trade_data['offer']['advancedNBTData'] = '{LootTable:"' + loot_table + '"}'
    
    if egg_mob:
        trade_data['offer']['advancedNBTData'] = """{EntityTag:{id:\"""" + egg_mob + """\", Tame:1b,ActiveEffects:[{Id:6,Duration:20,Amplifier:255,ShowParticles:0b}],Attributes:[],AttributeModifiers:[{AttributeName:"generic.armor",Name:"generic.armor",Amount:""" + str(mob_armor_boost) + """,Operation:0,UUID:[I;1,2,3,4]},{AttributeName:"generic.attack_damage",Name:"generic.attack_damage",Amount:""" + str(mob_damage_boost) + """,Operation:0,UUID:[I;2,3,4,5]},{AttributeName:"generic.movement_speed",Name:"generic.movement_speed",Amount:""" + str(mob_speed_pertange_boost/10) + """,Operation:2,UUID:[I;3,4,5,6]},{AttributeName:"generic.max_health",Name:"generic.max_health",Amount:""" + str(mob_hp_percentage_boost/10) + """,Operation:2,UUID:[I;4,5,6,7]}]}}"""
    
    if trade_data['offer'].get('advancedNBTData') and item_title and item_lore:
        lore_color = ""
        title_color = ""
        if item_lore_color:
            lore_color = f',"color":"{item_lore_color}"'
        if item_title_color:
            title_color = f',"color":"{item_title_color}"'

        trade_data['offer']['advancedNBTData'] =  trade_data['offer']['advancedNBTData'][:-1] + """,display:{Lore:['[\"\",{\"text\":\"""" + item_lore +"""\",\"italic\":false""" + lore_color + """}]'],Name:'[\"\",{\"text\":\"""" + item_title + """\",\"italic\":false"""+ title_color + """}]'}}"""

    if trade_data['offer'].get('advancedNBTData') and rarity >= 0:
        trade_data['offer']['advancedNBTData'] =  trade_data['offer']['advancedNBTData'][:-1] + f',Rarity:{rarity}' + '}' 

    if additional_request:
        trade_data['additionalRequest'] = {
            "itemKey": additional_request[0],
            "amount": additional_request[1]
        }
    
    custom_villagers_trades_data[villager]['trades'].append(trade_data)

def new_default_trade(villager, request, offer, trade_xp, trade_lvl, additional_request = None, potion_offer_effects = None, potion_color = 16004148, loot_table = None, item_title=None, item_lore=None, rarity=-1, item_title_color=None, item_lore_color=None):
    new_custom_villager_trade(villager, request,offer, trade_xp, 9999999, trade_lvl, additional_request=additional_request, potion_offer_effects=potion_offer_effects, potion_color=potion_color, loot_table=loot_table, item_title=item_title, item_lore=item_lore, rarity=rarity, item_title_color=item_title_color, item_lore_color=item_lore_color)

def new_animalist_trade(villager, request, offer, trade_xp, trade_lvl, additional_request = None, potion_offer_effects = None, potion_color = 16004148, loot_table = None, item_title=None, item_lore=None, rarity=-1, item_title_color=None, item_lore_color=None, egg_mob=None, mob_hp_percentage_boost=1, mob_armor_boost=0, mob_damage_boost=0, mob_speed_pertange_boost=0):
    new_custom_villager_trade(villager, request,offer, trade_xp, 9999999, trade_lvl, additional_request=additional_request, potion_offer_effects=potion_offer_effects, potion_color=potion_color, loot_table=loot_table, item_title=item_title, item_lore=item_lore, rarity=rarity, item_title_color=item_title_color, item_lore_color=item_lore_color, egg_mob=egg_mob, mob_hp_percentage_boost=mob_hp_percentage_boost, mob_armor_boost=mob_armor_boost, mob_damage_boost=mob_damage_boost, mob_speed_pertange_boost=mob_speed_pertange_boost)


def get_trade_effects(effect_key, duration, level, visivble=False):
    return [{
            "effectKey": effect_key,
            "duration": duration,
            "level": level,
            "isVisible": visivble
        }]

def save_villager_config(villager):
  with open(f'config\custom trades\\{villager}.json', 'w+') as f:
      f.write(json.dumps(custom_villagers_trades_data[villager], indent=4))

todos = """
ideas for trades:
- coin 4 potions for regen/mana/max hp
- coins 4 resources (dimensions dependent)
- sell rare stuff
"""

# Banker Basic trades
#buy
new_default_trade('banker', ('dotcoinmod:bronze_coin', 5), ('minecraft:ender_pearl', 1), 1, 1)
new_default_trade('banker', ('dotcoinmod:bronze_coin', 10), ('trials:trial_key', 1), 1, 1)
new_default_trade('banker', ('dotcoinmod:bronze_coin', 30), ('minecraft:emerald', 1), 1, 1)
new_default_trade('banker', ('dotcoinmod:bronze_coin', 30), ('blue_skies:blinding_key', 1), 2, 2)
new_default_trade('banker', ('dotcoinmod:bronze_coin', 30), ('trials:trial_key_ominous', 1), 1, 1)
new_default_trade('banker', ('dotcoinmod:bronze_coin', 48), ('minecraft:iron_ingot', 1), 1, 1)
new_default_trade('banker', ('dotcoinmod:bronze_coin', 60), ('blue_skies:nature_key', 1), 2, 2)
new_default_trade('banker', ('dotcoinmod:silver_coin', 1), ('blue_skies:poison_key', 1), 2, 2, additional_request=('dotcoinmod:bronze_coin', 26))
new_default_trade('banker', ('dotcoinmod:silver_coin', 1), ('trials:ominous_bottle', 1), 1, 1)
new_default_trade('banker', ('dotcoinmod:silver_coin', 2), ('minecraft:diamond', 1), 1, 1)
#sell
new_default_trade('banker', ('dotcoinmod:silver_coin', 2), ('aether:victory_medal', 1), 1, 1)

new_default_trade('banker', ('minecraft:heart_of_the_sea', 1), ('dotcoinmod:bronze_coin', 20), 1, 1)
new_default_trade('banker', ('apotheosis:gem', 1), ('dotcoinmod:bronze_coin', 20), 1, 1)
new_default_trade('banker', ('irons_spellbooks:scroll', 1), ('dotcoinmod:bronze_coin', 20), 1, 1)


#Dimensional Lootbags 
new_default_trade('banker', ('dotcoinmod:gold_coin', 1), ('blue_skies:loot_bag_summoner', 1), 1, 1, 
                  loot_table="zoompack_economy:dimensional_lootbags/overworld_lootbag", 
                  item_title = "Overworld Lootbag", item_lore="Right-Click to open the lootbag", rarity=0, 
                  item_title_color="white", item_lore_color="purple")

new_default_trade('banker', ('dotcoinmod:gold_coin', 2), ('blue_skies:loot_bag_summoner', 1), 1, 1, 
                  loot_table="zoompack_economy:dimensional_lootbags/blueskies_lootbag", 
                  item_title = "Blue Skies Lootbag", item_lore="Right-Click to open the lootbag", rarity=0, 
                  item_title_color="blue", item_lore_color="purple")

new_default_trade('banker', ('dotcoinmod:gold_coin', 4), ('blue_skies:loot_bag_alchemist', 1), 2, 2, 
                  loot_table="zoompack_economy:dimensional_lootbags/aether_lootbag", 
                  item_title = "Aether Lootbag", item_lore="Right-Click to open the lootbag", rarity=1, 
                  item_title_color="gold", item_lore_color="purple")

new_default_trade('banker', ('dotcoinmod:gold_coin', 8), ('blue_skies:loot_bag_alchemist', 1), 3, 3, 
                  loot_table="zoompack_economy:dimensional_lootbags/nether_lootbag", 
                  item_title = "Nether Lootbag", item_lore="Right-Click to open the lootbag", rarity=1, 
                  item_title_color="red", item_lore_color="purple")

new_default_trade('banker', ('dotcoinmod:gold_coin', 16), ('blue_skies:loot_bag_starlit_crusher', 1), 4, 4, 
                  loot_table="zoompack_economy:dimensional_lootbags/undergarden_lootbag", 
                  item_title = "Undergarden Lootbag", item_lore="Right-Click to open the lootbag", rarity=1, 
                  item_title_color="green", item_lore_color="purple")

new_default_trade('banker', ('dotcoinmod:gold_coin', 32), ('blue_skies:loot_bag_starlit_crusher', 1), 4, 4, 
                  loot_table="zoompack_economy:dimensional_lootbags/end_lootbag", 
                  item_title = "End Lootbag", item_lore="Right-Click to open the lootbag", rarity=2, 
                  item_title_color="purple", item_lore_color="purple")

new_default_trade('banker', ('dotcoinmod:gold_coin', 64), ('blue_skies:loot_bag_arachnarch', 1), 5, 5, 
                  loot_table="zoompack_economy:dimensional_lootbags/abyss_lootbag", 
                  item_title = "Abyss Lootbag", item_lore="Right-Click to open the lootbag", rarity=2, 
                  item_title_color="aqua", item_lore_color="purple")

# Banker Potions >> pricing needed
new_default_trade('banker', ('dotcoinmod:bronze_coin', 32), ('minecraft:potion', 1), 1, 1, additional_request=None, 
                  potion_offer_effects=get_trade_effects('minecraft:instant_health', '0', 0), potion_color=15395118, 
                  item_title = "Bronze Vial of Vitality", item_lore="Drink this to replanish instantly 2 HP", 
                  item_title_color="dark_red", item_lore_color="purple")

new_default_trade('banker', ('dotcoinmod:bronze_coin', 32), ('minecraft:potion', 1), 1, 1, additional_request=None, 
                  potion_offer_effects=get_trade_effects('minecraft:instant_health', '0', 1), potion_color=15383342, 
                  item_title = "Scarlet Elixir of Mending", item_lore="Drink this to replanish instantly 4 HP", 
                  item_title_color="red", item_lore_color="purple")

new_default_trade('banker', ('dotcoinmod:bronze_coin', 32), ('minecraft:potion', 1), 2, 2, additional_request=None, 
                  potion_offer_effects=get_trade_effects('minecraft:instant_health', '0', 2), potion_color=15374638, 
                  item_title = "Golden Draught of Healing", item_lore="Drink this to replanish instantly 8 HP", 
                  item_title_color="yellow", item_lore_color="purple")

new_default_trade('banker', ('dotcoinmod:bronze_coin', 32), ('minecraft:potion', 1), 2, 2, additional_request=None, 
                  potion_offer_effects=get_trade_effects('minecraft:instant_health', '0', 3), potion_color=15377454, 
                  item_title = "Sunlight Serum of Recovery", item_lore="Drink this to replanish instantly 16 HP", 
                  item_title_color="yellow", item_lore_color="purple")

new_default_trade('banker', ('dotcoinmod:bronze_coin', 32), ('minecraft:potion', 1), 3, 3, additional_request=None, 
                  potion_offer_effects=get_trade_effects('minecraft:instant_health', '0', 4), potion_color=15363118, 
                  item_title = "Gilded Flask of Restoration", item_lore="Drink this to replanish instantly 32 HP", 
                  item_title_color="gold", item_lore_color="purple", rarity=0)

new_default_trade('banker', ('dotcoinmod:bronze_coin', 32), ('minecraft:potion', 1), 3, 3, additional_request=None, 
                  potion_offer_effects=get_trade_effects('minecraft:instant_health', '0', 5), potion_color=15351598, 
                  item_title = "Emerald Tonic of Revival", item_lore="Drink this to replanish instantly 64 HP", 
                  item_title_color="green", item_lore_color="purple", rarity=0)

new_default_trade('banker', ('dotcoinmod:bronze_coin', 32), ('minecraft:potion', 1), 4, 4, additional_request=None, 
                  potion_offer_effects=get_trade_effects('minecraft:instant_health', '0', 6), potion_color=15347358, 
                  item_title = "Sapphire Brew of Renewal", item_lore="Drink this to replanish instantly 128 HP", 
                  item_title_color="blue", item_lore_color="purple", rarity=1)

new_default_trade('banker', ('dotcoinmod:bronze_coin', 32), ('minecraft:potion', 1), 4, 4, additional_request=None, 
                  potion_offer_effects=get_trade_effects('minecraft:instant_health', '0', 7), potion_color=15347434, 
                  item_title = "Rare Health Potion", item_lore="Drink this to replanish instantly 256 HP", 
                  item_title_color="purple", item_lore_color="purple", rarity=1)

new_default_trade('banker', ('dotcoinmod:bronze_coin', 32), ('minecraft:potion', 1), 5, 5, additional_request=None, 
                  potion_offer_effects=get_trade_effects('minecraft:instant_health', '1', 8), potion_color=15347434, 
                  item_title = "Ancient Health Potion", item_lore="Drink this to replanish instantly 512 HP", 
                  item_title_color="purple", item_lore_color="purple", rarity=2)

new_default_trade('banker', ('dotcoinmod:bronze_coin', 32), ('minecraft:potion', 1), 5, 5, additional_request=None, 
                  potion_offer_effects=get_trade_effects('minecraft:instant_health', '1', 9), potion_color=3036906, 
                  item_title = "Amethyst Potion of Fortitude", item_lore="Drink this to replanish all of your missig health", 
                  item_title_color="purple", item_lore_color="purple", rarity=2)

save_villager_config('banker')


# Gemist
# Lvl 1
new_default_trade('gemist', ('dotcoinmod:gold_coin', 1), ('blue_skies:loot_bag_starlit_crusher', 1), 1, 1, loot_table="zoompack_economy:apotheosis_materials", item_title = "Apotheosis Materials Lootbag", item_lore="Right-Click to open the lootbag", rarity=0, item_title_color="light_purple", item_lore_color="purple")
new_default_trade('gemist', ('dotcoinmod:gold_coin', 1), ('blue_skies:loot_bag', 1), 1, 1, loot_table="zoompack_economy:gems/tier_1", item_title = "Cracked Gem Lootbag", item_lore="Right-Click to open the lootbag", rarity=0, item_title_color="gray", item_lore_color="purple")
new_default_trade('gemist', ('dotcoinmod:gold_coin', 1), ('blue_skies:loot_bag', 1), 1, 1, loot_table="zoompack_economy:gems/tier_2", item_title = "Chipped Gem Lootbag", item_lore="Right-Click to open the lootbag", rarity=0, item_title_color="green", item_lore_color="purple")
# Lvl 2
new_default_trade('gemist', ('dotcoinmod:gold_coin', 1), ('blue_skies:loot_bag_summoner', 1), 2, 2, loot_table="zoompack_economy:gems/tier_3", item_title = "Flawed Gem Lootbag", item_lore="Right-Click to open the lootbag", rarity=0, item_title_color="gold", item_lore_color="purple")
# Lvl 3
new_default_trade('gemist', ('dotcoinmod:gold_coin', 1), ('blue_skies:loot_bag_summoner', 1), 3, 3, loot_table="zoompack_economy:gems/tier_4", item_title = "Gem Lootbag", item_lore="Right-Click to open the lootbag", rarity=0, item_title_color="dark_green", item_lore_color="purple")
new_default_trade('gemist', ('dotcoinmod:gold_coin', 1), ('blue_skies:loot_bag_alchemist', 1), 3, 3, loot_table="zoompack_economy:gems/tier_5", item_title = "Flawless Gem Lootbag", item_lore="Right-Click to open the lootbag", rarity=1, item_title_color="light_purple", item_lore_color="purple")
# Lvl 4
new_default_trade('gemist', ('dotcoinmod:gold_coin', 1), ('blue_skies:loot_bag_alchemist', 1), 4, 4, loot_table="zoompack_economy:gems/tier_6", item_title = "Smecher Gem Lootbag", item_lore="Right-Click to open the lootbag", rarity=1, item_title_color="blue", item_lore_color="purple")
new_default_trade('gemist', ('dotcoinmod:gold_coin', 1), ('blue_skies:loot_bag_starlit_crusher', 1), 4, 4, loot_table="zoompack_economy:gems/tier_7", item_title = "Pizdos Gem Lootbag", item_lore="Right-Click to open the lootbag", rarity=1, item_title_color="red", item_lore_color="purple")
# Lvl 5
new_default_trade('gemist', ('dotcoinmod:gold_coin', 1), ('blue_skies:loot_bag_starlit_crusher', 1), 5, 5, loot_table="zoompack_economy:gems/tier_8", item_title = "Barosan Gem Lootbag", item_lore="Right-Click to open the lootbag", rarity=1, item_title_color="aqua", item_lore_color="purple")
new_default_trade('gemist', ('dotcoinmod:gold_coin', 1), ('blue_skies:loot_bag_arachnarch', 1), 5, 5, loot_table="zoompack_economy:gems/tier_9", item_title = "Obscen Gem Lootbag", item_lore="Right-Click to open the lootbag", rarity=2, item_title_color="yellow", item_lore_color="purple")
save_villager_config('gemist')

# Animalist
new_animalist_trade('animalist', ('dotcoinmod:bronze_coin', 5), ('minecraft:creeper_spawn_egg', 1), 1, 1, 
                    egg_mob='mythicmounts:acencia',
                    mob_hp_percentage_boost=10,
                    mob_speed_pertange_boost=5,
                    mob_armor_boost=5,
                    mob_damage_boost=5)
new_default_trade('animalist', ('dotcoinmod:bronze_coin', 5), ('minecraft:ender_pearl', 1), 1, 1)
save_villager_config('animalist')



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
        'egg_id': 'minecraft:horse_spawn_egg'
    },
    'minecraft:donkey': {
        'hp': 30.0,
        'speed': 0.225,
        'jump': 0.7,
        'armor': 0,
        'dmg': 0,
        'egg_id': 'minecraft:donkey_spawn_egg'
    },
    'minecraft:mule': {
        'hp': 30.0,
        'speed': 0.225,
        'jump': 0.7,
        'armor': 0,
        'dmg': 0,
        'egg_id': 'minecraft:mule_spawn_egg'
    },
    'minecraft:llama': {
        'hp': 15.0,
        'speed': 0.22,
        'jump': 0.35,
        'armor': 0,
        'dmg': 0,
        'egg_id': 'minecraft:llama_spawn_egg'
    },
    'minecraft:pig': {
        'hp': 10.0,
        'speed': 0.25,
        'jump': 0.5,
        'armor': 0,
        'dmg': 0,
        'egg_id': 'minecraft:pig_spawn_egg'
    },
    'minecraft:strider': {
        'hp': 20.0,
        'speed': 0.4,
        'jump': 0,
        'armor': 0,
        'dmg': 0,
        'egg_id': 'minecraft:strider_spawn_egg'
    },
    'minecraft:camel': {
        'hp': 32.0,
        'speed': 0.09,
        'jump': 0.5,
        'armor': 0,
        'dmg': 0,
        'egg_id': 'minecraft:camel_spawn_egg'
    },
    'minecraft:skeleton_horse': {
        'hp': 30.0,
        'speed': 0.3375,
        'jump': 1.0,
        'armor': 0,
        'dmg': 0,
        'egg_id': 'minecraft:skeleton_horse_spawn_egg'
    },
    'minecraft:zombie_horse': {
        'hp': 30.0,
        'speed': 0.3375,
        'jump': 1.0,
        'armor': 0,
        'dmg': 0,
        'egg_id': 'minecraft:zombie_horse_spawn_egg'
    },
    'minecraft:ravager': {
        'hp': 100.0,
        'speed': 0.3,
        'jump': 0,
        'armor': 0,
        'dmg': 0,
        'egg_id': 'minecraft:ravager_spawn_egg'
    }
}

level_modifiers = {
    '1' : {
        'hp' : 0,
        'speed' : 0,
        "jump": 0,
        'armor' : 0,
        'dmg' : 0
    },
    '2' : {
        'hp' : 10,
        'speed' : 5,
        'jump' : 5,
        'armor' : 5,
        'dmg' : 5,
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
        mob_data = mobs[mob_id]
        ENTRY_BASE = """{
          "type": "minecraft:item",
          "name": \"""" + mob_data.get('egg_id') +"""\",
          "functions": [
            {
              "function": "minecraft:set_nbt",
              "tag": "{EntityTag:{id:MOB_ID_REPLACE,Tame:1b,ActiveEffects:[{Id:6,Duration:1,Amplifier:255,ShowParticles:0b}],Attributes:[ATTRIBUTES_LIST_REPLACE]}}"
            }
          ]
        }"""

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




# write trades to json file
# with open('config\custom trades\\banker.json', 'w+') as f:
#     f.write(json.dumps(banker_config, indent=4))