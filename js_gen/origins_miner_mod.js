const fs = require('fs');

let miner_modifiers = [
    0.5,
    1.0,
    1.5,
    2.0,
    2.5,
]

let miner_level_caps = [ 0, 20, 40, 60, 80]

let output_root_path = "../config/paxi/datapacks/origins_classes_edits/data/origins-classes";
let output_powers_path = output_root_path + "/powers/more_stone_break_speed.json";


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
          "objective": "pmmo_mining",
          "comparison": ">=",
          "compare_to": {level}
        },
        {
          "type": "origins:scoreboard",
          "objective": "pmmo_mining",
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
      "type": "origins:in_tag",
      "tag": "forge:ores"
    }
  }
`

let finalText = "";
for (let i = 0; i < miner_modifiers.length; i++) {
    let power = power_template.replace("{power_id}", "miner_stone_break_speed" + i);
    let next_level = i < miner_level_caps.length - 1 ? miner_level_caps[i + 1] : 1000;
    power = power.replace("{level}", miner_level_caps[i]);
    power = power.replace("{next_level}", next_level);
    power = power.replace("{value}", miner_modifiers[i]);
    power = power.replace("{level}", " " + miner_level_caps[i]);
    finalText += power;
    finalText += ",\n";
}

finalText = finalText.slice(0, -2);
finalText = power_final_template.replace("{powers}", finalText);
fs.writeFileSync(output_powers_path, finalText)
