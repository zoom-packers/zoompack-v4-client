const fs = require('fs');

let warrior_modifiers = [
    0.2,
    0.4,
    0.6,
    0.8,
    1.0,
]

let warrior_level_caps = [ 0, 20, 40, 60, 80]

let output_root_path = "../../config/paxi/datapacks/origins_classes_edits/data/origins-classes";
let output_powers_path = output_root_path + "/powers/more_attack_damage.json";


let power_final_template = `
{
  "type": "origins:multiple",
  "loading_priority": 111,
  {powers}
}
`

let power_template = `
"{power_id}": {
    "type": "origins:conditioned_attribute",
    "condition": {
        "type": "origins:and",
        "conditions": [
        {
          "type": "origins:scoreboard",
          "objective": "pmmo_combat",
          "comparison": ">=",
          "compare_to": {level}
        },
        {
          "type": "origins:scoreboard",
          "objective": "pmmo_combat",
          "comparison": "<",
          "compare_to": {next_level}
        }
        ],
    },
    "modifier": {
        "name": "Warrior attack damage bonus {level}",
        "attribute": "minecraft:generic.attack_damage",
        "value": {value},
        "operation": "multiply_total",
    }
  }
`

let finalText = "";
for (let i = 0; i < warrior_modifiers.length; i++) {
    let power = power_template.replace("{power_id}", "more_attack_damage" + i);
    let next_level = i < warrior_level_caps.length - 1 ? warrior_level_caps[i + 1] : 1000;
    power = power.replace("{level}", warrior_level_caps[i]);
    power = power.replace("{next_level}", next_level);
    power = power.replace("{value}", warrior_modifiers[i]);
    power = power.replace("{level}", warrior_level_caps[i]);
    finalText += power;
    finalText += ",\n";
}

finalText = finalText.slice(0, -2);
finalText = power_final_template.replace("{powers}", finalText);
fs.writeFileSync(output_powers_path, finalText)
