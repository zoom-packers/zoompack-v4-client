const fs = require('fs');

let rancher_modifiers = [
    0.5,
    1.0,
    2.0,
    3.0,
    5.0,
]

let rancher_level_caps = [ 0, 20, 40, 60, 80]

let output_root_path = "../config/paxi/datapacks/origins_classes_edits/data/origins-classes";
let output_powers_path = output_root_path + "/powers/twin_breeding.json";


let power_final_template = `
{
  "type": "origins:multiple",
  "loading_priority": 111,
  {powers}
}
`

let power_template = `
"{power_id}": {
    "type": "origins_classes:modify_breeding",
    "condition": {
        "type": "origins:and",
        "conditions": [
        {
          "type": "origins:scoreboard",
          "objective": "pmmo_ranching",
          "comparison": ">=",
          "compare_to": {level}
        },
        {
          "type": "origins:scoreboard",
          "objective": "pmmo_ranching",
          "comparison": "<",
          "compare_to": {next_level}
        }
        ],
    },
    "modifier": {
        "name": "Rancher Breeding Bonus",
        "value": {value},
        "operation": "multiply_base"
    }
  }
`

let finalText = "";
for (let i = 0; i < rancher_modifiers.length; i++) {
    let power = power_template.replace("{power_id}", "ranching_twin_breeding" + i);
    let next_level = i < rancher_level_caps.length - 1 ? rancher_level_caps[i + 1] : 1000;
    power = power.replace("{level}", rancher_level_caps[i]);
    power = power.replace("{next_level}", next_level);
    power = power.replace("{value}", rancher_modifiers[i]);
    finalText += power;
    finalText += ",\n";
}

finalText = finalText.slice(0, -2);
finalText = power_final_template.replace("{powers}", finalText);
fs.writeFileSync(output_powers_path, finalText)
