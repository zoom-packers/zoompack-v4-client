const fs = require('fs');
const {
    andCondition, scoreboardCondition, attributeModifierBonus, conditionBlockIsCrop,
    powerTemplate,
    writeJson,
    powerPath
} = require("./origins_util");
const {operation} = require("../utils/cia_util");

let modifiers = [
    0.5,
    1.0,
    2.0,
    3.0,
    5.0,
]

let levelCaps = [0, 20, 40, 60, 80]

let output_root_path = "../../config/paxi/datapacks/origins_classes_edits/data/origins-classes";
let output_powers_path = output_root_path + "/powers/twin_breeding.json";


let power_final_template = `
{
  "type": "origins:multiple",
  "loading_priority": 111,
  {powers}
}
`

function getPowerTemplate(powerIndex, level, next_level) {
    return {
        type: "origins_classes:modify_breeding",
        condition: andCondition(scoreboardCondition("pmmo_ranching", level, next_level)),
        modifier: attributeModifierBonus(undefined, modifiers[powerIndex], operation.LOWERCASE.MULTIPLY_BASE, "Rancher Breeding Bonus"),
    }
}

const template = powerTemplate();
for (let i = 0; i < modifiers.length; i++) {
    let next_level = i < levelCaps.length - 1 ? levelCaps[i + 1] : 1000;
    template[`ranching_twin_breeding${i}`] = getPowerTemplate(i, levelCaps[i], next_level);
}

writeJson(template, powerPath("twin_breeding"));
