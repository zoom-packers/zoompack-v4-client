const fs = require('fs');

let farmer_modifiers = [
    0.5,
    1.0,
    2.0,
    3.0,
    5.0,
]

let farmer_level_caps = [ 0, 20, 40, 60, 80]

let output_root_path = "../../config/paxi/datapacks/origins_classes_edits/data/origins-classes";
let output_powers_path = output_root_path + "/powers/more_crop_drops.json";


let power_final_template = `
{
  "type": "origins:multiple",
  "loading_priority": 111,
  {powers}
}
`

let power_template = `
"{power_id}": {
    "type": "origins_classes:modify_block_loot",
    "condition": {
        "type": "origins:and",
        "conditions": [
        {
          "type": "origins:scoreboard",
          "objective": "pmmo_farming",
          "comparison": ">=",
          "compare_to": {level}
        },
        {
          "type": "origins:scoreboard",
          "objective": "pmmo_farming",
          "comparison": "<",
          "compare_to": {next_level}
        }
        ],
    },
    "modifier": {
        "name": "Farmer Crop Loot Bonus",
        "value": {value},
        "operation": "multiply_base"
      },
    "block_condition": {
      "type": "origins_classes:harvestable_crops"
    }
  }
`

let finalText = "";
for (let i = 0; i < farmer_modifiers.length; i++) {
    let power = power_template.replace("{power_id}", "farmer_crop_loot_" + i);
    let next_level = i < farmer_level_caps.length - 1 ? farmer_level_caps[i + 1] : 1000;
    power = power.replace("{level}", farmer_level_caps[i]);
    power = power.replace("{next_level}", next_level);
    power = power.replace("{value}", farmer_modifiers[i]);
    finalText += power;
    finalText += ",\n";
}

finalText = finalText.slice(0, -2);
finalText = power_final_template.replace("{powers}", finalText);
fs.writeFileSync(output_powers_path, finalText)
