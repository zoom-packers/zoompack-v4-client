const fs = require('fs');

let blacksmith_modifiers = [
    {id: "add10", "mode": "add", "value": 1, "base_weight": 100},
    {id: "add20", "mode": "add", "value": 2, "base_weight": 50},
    {id: "add30", "mode": "add", "value": 3, "base_weight": 25},
    {id: "add40", "mode": "add", "value": 4, "base_weight": 12.5},
    {id: "add50", "mode": "add", "value": 5, "base_weight": 6.25},

    {id: "mul10", "mode": "mul", "value": 0.1, "base_weight": 50},
    {id: "mul20", "mode": "mul", "value": 0.2, "base_weight": 25},
    {id: "mul30", "mode": "mul", "value": 0.3, "base_weight": 12.5},
    {id: "mul40", "mode": "mul", "value": 0.4, "base_weight": 6.25},
    {id: "mul50", "mode": "mul", "value": 0.5, "base_weight": 3.125},
]

let blacksmith_level_caps = [ 0, 20, 40, 60, 80]
let blacksmith_level_modifiers = [
    [ "add10", "add20", "add30", "mul10", "mul20"],
    [ "add20", "add30", "add40", "mul20", "mul30"],
    [ "add30", "add40", "add50", "mul30", "mul40"],
    [ "add40", "add50", "add50", "mul30", "mul40"],
    [ "add40", "add50", "mul40", "mul40", "mul50"],
]

let output_root_path = "../../config/paxi/datapacks/origins_classes_edits/data/origins-classes";
let output_item_modifiers_path = output_root_path + "/item_modifiers/blacksmith";
let output_item_powers_path = output_root_path + "/powers/items";
let output_powers_path = output_root_path + "/powers/quality_equipment.json";

let blacksmith_item_modifiers = [ "chestplate", "helmet", "leggings", "shoes", "melee", "range", "shield" ]
let blacksmith_powers_items = ["tough_chestplate", "tough_helmet", "tough_leggings", "tough_shoes", "sharp_blade", "strong_string", "steady_shield"]
let blacksmith_powers_attributes = ["minecraft:generic.armor", "minecraft:generic.armor", "minecraft:generic.armor", "minecraft:generic.armor", "minecraft:generic.attack_damage", "minecraft:generic.attack_damage", "minecraft:generic.armor"]
let blacksmith_powers_descriptions = ["Armor", "Armor", "Armor", "Armor", "Attack Damage", "Attack Damage", "Armor"]
let blacksmith_power_slots = ["chest", "head", "legs", "feet", "mainhand", "mainhand", "offhand"]
let blacksmith_descriptions = [
    "This chestplate has been forged by a licensed blacksmith. Please subscribe to their OnlyFans.",
    "This helmet has been forged by a licensed blacksmith. Please subscribe to their Fansly.",
    "These leggings have been forged by a licensed blacksmith. Please subscribe to their Patreon filled with gay porn.",
    "These shoes have been forged by a licensed blacksmith. Please subscribe to their Feet pic filled instagram.",
    "This blade has been forged by a licensed blacksmith. Please subscribe to their Youtube 360p channel.",
    "This string has been forged by a licensed blacksmith. Please subscribe to their Millennial TikTok.",
    "This shield has been forged by a licensed blacksmith. Please subscribe to their Boomer Facebook."
]
let blacksmith_final_description = "+{value} {attribute}. {description}"

let item_modifier_template = `
[
  {
    "function": "apoli:add_power",
    "power": "origins-classes:items/{power}",
    "slot": "{slot}"
  }
]
`

let item_power_template = `
{
  "type": "apoli:attribute",
  "name": "{name}",
  "description": "{description}",
  "modifier": {
    "name": "{name}",
    "attribute": "{attribute}",
    "value": {value},
    "operation": "{mode}"
  }
}
`

let itemTypesLength = blacksmith_item_modifiers.length
for (let i = 0; i < itemTypesLength; i++) {
    let item = blacksmith_item_modifiers[i]
    let power = blacksmith_powers_attributes[i]
    let slot = blacksmith_power_slots[i]
    let name = blacksmith_powers_items[i].split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    let description = blacksmith_descriptions[i]
    for (let j = 0; j < blacksmith_modifiers.length; j++) {
        let item_modifier_file_content = item_modifier_template.replace("{power}", blacksmith_powers_items[i] + j).replace( "{slot}", slot)
        var value = blacksmith_modifiers[j].value;
        var mode = blacksmith_modifiers[j].mode === "add" ? "addition" : "multiply_base";
        let valueLabel = mode === "addition" ? value : Math.round((value - 1) * 100) + "%";
        var finalDescription = blacksmith_final_description.replace("{value}", valueLabel).replace("{attribute}", blacksmith_powers_descriptions[i]).replace("{description}", description).replace("{mod}", mode === "addition" ? "" : "x")
        let item_power_file_content = item_power_template.replace("{name}", name).replace("{description}", finalDescription).replace("{attribute}", power).replace("{value}", value).replace( "{mode}", mode)

        let item_modifier_file_path = output_item_modifiers_path + "/" + item + j + ".json"
        let item_power_file_path = output_item_powers_path + "/" + blacksmith_powers_items[i] + j + ".json"

        fs.writeFileSync(item_modifier_file_path, item_modifier_file_content)
        fs.writeFileSync(item_power_file_path, item_power_file_content)
    }
}

let power_final_template = `
{
  "type": "origins:multiple",
  "loading_priority": 111,
  {powers}
}
`

let power_template = `
"{power_id}": {
    "type": "origins_classes:modify_craft_result",
    "condition": {
        "type": "origins:and",
        "conditions": [
        {
          "type": "origins:scoreboard",
          "objective": "pmmo_smithing",
          "comparison": ">=",
          "compare_to": {level}
        },
        {
          "type": "origins:scoreboard",
          "objective": "pmmo_smithing",
          "comparison": "<",
          "compare_to": {next_level}
        }
        ],
    },
    "item_condition": {
      "type": "origins:and",
      "conditions": [
        {
          "type": "origins_classes:{class}"
        },
        {additional_conditions}
      ]
    },
    "item_action": {
      "type": "origins:choice",
      "actions": [
        {choices}
      ]
    }
  }
`

let power_additional_condition_template = `
{      
    "type": "origins_classes:has_power",
    "power": "origins-classes:items/{condition}",
     "inverted": true
}
`

let power_choice_template = `
{
  "element": {
    "type": "apoli:modify",
    "modifier": "origins-classes:blacksmith/{power_id}"
  },
  "weight": {weight}
}
`

var finalText = "";
for (let i = 0; i < itemTypesLength; i++) {
    let item = blacksmith_item_modifiers[i];
    let class_name = item;
    let conditionNames = blacksmith_modifiers.map((x, index) => blacksmith_powers_items[i] + index);
    let conditions = conditionNames.map(x => power_additional_condition_template.replace("{condition}", x));
    conditions = conditions.join(",\n        ");
    let powers = "";
    for (let j = 0; j < blacksmith_level_caps.length; j++) {
        let power_id = item + j;
        let level = blacksmith_level_caps[j];
        let modifierIds = blacksmith_level_modifiers[j];
        let choices = "";
        for (let k = 0; k < modifierIds.length; k++) {
            let modifierId = modifierIds[k];
            var modifierIndex = blacksmith_modifiers.findIndex(x => x.id === modifierId);
            let weight = blacksmith_modifiers.find(x => x.id === modifierId).base_weight;
            let choice = power_choice_template.replace("{power_id}", item + modifierIndex).replace("{weight}", weight);
            choices += choice + ",\n        ";
        }
        choices = choices.slice(0, -9);
        let next_level = j < blacksmith_level_caps.length - 1 ? blacksmith_level_caps[j + 1] : 1000;

        let power = power_template.replace("{power_id}", power_id).replace("{level}", level).replace("{next_level}", next_level).replace("{class}", class_name).replace("{additional_conditions}", conditions).replace("{choices}", choices);
        powers += power + ",\n";
    }
    powers = powers.slice(0, -2);
    finalText += powers;
    finalText += ",\n";
}

finalText = finalText.slice(0, -2);
finalText = power_final_template.replace("{powers}", finalText);
fs.writeFileSync(output_powers_path, finalText)
