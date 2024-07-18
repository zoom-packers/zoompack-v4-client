const fs = require('fs');

let cook_modifiers = [
    {id: "add10", "mode": "add", "value": 2, "base_weight": 100},
    {id: "add20", "mode": "add", "value": 4, "base_weight": 50},
    {id: "add30", "mode": "add", "value": 6, "base_weight": 25},
    {id: "add40", "mode": "add", "value": 8, "base_weight": 12.5},
    {id: "add50", "mode": "add", "value": 10, "base_weight": 6.25},

    {id: "mul10", "mode": "mul", "value": 1.1, "base_weight": 50},
    {id: "mul20", "mode": "mul", "value": 1.2, "base_weight": 25},
    {id: "mul30", "mode": "mul", "value": 1.3, "base_weight": 12.5},
    {id: "mul40", "mode": "mul", "value": 1.4, "base_weight": 6.25},
    {id: "mul50", "mode": "mul", "value": 1.5, "base_weight": 3.125},
]

let cook_level_caps = [ 0, 20, 40, 60, 80]
let cook_level_modifiers = [
    [ "add10", "add20", "add30", "mul10", "mul20"],
    [ "add20", "add30", "add40", "mul20", "mul30"],
    [ "add30", "add40", "add50", "mul30", "mul40"],
    [ "add40", "add50", "add50", "mul30", "mul40"],
    [ "add40", "add50", "mul40", "mul40", "mul50"],
]

let output_root_path = "../config/paxi/datapacks/origins_classes_edits/data/origins-classes";
let output_item_modifiers_path = output_root_path + "/item_modifiers/cook";
let output_item_powers_path = output_root_path + "/powers/items";
let output_powers_path = output_root_path + "/powers/better_crafted_food.json";

let cook_item_modifiers = [ "food"]
let cook_powers_items = ["mancare_cu_sloboz",]
let cook_power_slots = ["mainhand"]
let cook_descriptions = [
    "This food has been inseminated by a cook.",
]
let cook_final_description = "+{value} Hunger & Saturation. {description}"

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
  "type": "apoli:modify_food",
  "name": "{name}",
  "description": "{description}",
  "food_modifier": {
    "name": "Increased food points",
    "operation": "{mode}",
    "value": {value}
  },
  "saturation_modifier": {
    "name": "Increased saturation points",
    "operation": "{mode}",
    "value": {value}
  }
}
`

let itemTypesLength = cook_item_modifiers.length
for (let i = 0; i < itemTypesLength; i++) {
    let item = cook_item_modifiers[i]
    let slot = cook_power_slots[i]
    let name = cook_powers_items[i].split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    let description = cook_descriptions[i]
    for (let j = 0; j < cook_modifiers.length; j++) {
        let item_modifier_file_content = item_modifier_template.replace("{power}", cook_powers_items[i] + j).replace( "{slot}", slot)
        let value = cook_modifiers[j].value;
        let mode = cook_modifiers[j].mode === "add" ? "addition" : "multiply_base";
        let valueLabel = mode === "addition" ? value : Math.round((value - 1) * 100) + "%";
        let finalDescription = cook_final_description.replace("{value}", valueLabel).replace("{description}", description).replace("{mod}", mode === "addition" ? "" : "x")
        let item_power_file_content = item_power_template.replace("{name}", name).replace("{description}", finalDescription).replace("{value}", value).replace( "{mode}", mode).replace("{value}", value).replace( "{mode}", mode)

        let item_modifier_file_path = output_item_modifiers_path + "/" + item + j + ".json"
        let item_power_file_path = output_item_powers_path + "/" + cook_powers_items[i] + j + ".json"

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
          "objective": "pmmo_cooking",
          "comparison": ">=",
          "compare_to": {level}
        },
        {
          "type": "origins:scoreboard",
          "objective": "pmmo_cooking",
          "comparison": "<",
          "compare_to": {next_level}
        }
        ],
    },
    "item_condition": {
      "type": "origins:food",
    },
    "item_action": {
      "type": "origins:choice",
      "actions": [
        {choices}
      ]
    }
  }
`

let power_choice_template = `
{
  "element": {
    "type": "apoli:modify",
    "modifier": "origins-classes:cook/{power_id}"
  },
  "weight": {weight}
}
`

let finalText = "";
for (let i = 0; i < itemTypesLength; i++) {
    let item = cook_item_modifiers[i];
    let class_name = item;
    let powers = "";
    for (let j = 0; j < cook_level_caps.length; j++) {
        let power_id = item + j;
        let level = cook_level_caps[j];
        let modifierIds = cook_level_modifiers[j];
        let choices = "";
        for (let k = 0; k < modifierIds.length; k++) {
            let modifierId = modifierIds[k];
            let modifierIndex = cook_modifiers.findIndex(x => x.id === modifierId);
            let weight = cook_modifiers.find(x => x.id === modifierId).base_weight;
            let choice = power_choice_template.replace("{power_id}", item + modifierIndex).replace("{weight}", weight);
            choices += choice + ",\n        ";
        }
        choices = choices.slice(0, -9);
        let next_level = j < cook_level_caps.length - 1 ? cook_level_caps[j + 1] : 1000;

        let power = power_template.replace("{power_id}", power_id).replace("{level}", level).replace("{next_level}", next_level).replace("{class}", class_name).replace("{choices}", choices);
        powers += power + ",\n";
    }
    powers = powers.slice(0, -2);
    finalText += powers;
    finalText += ",\n";
}

finalText = finalText.slice(0, -2);
finalText = power_final_template.replace("{powers}", finalText);
fs.writeFileSync(output_powers_path, finalText)
