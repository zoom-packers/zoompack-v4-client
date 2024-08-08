const fs = require('fs');
const {
    powerTemplate, writeJson, powerPath,
    andCondition,
    scoreboardCondition,
    attributeModifierBonus,
    conditionBlockIsCrop, conditionBlockIsOre
} = require("./origins_util");
const {operation} = require("../utils/cia_util");

let modifiers = [
    0.5,
    1.0,
    1.5,
    2.0,
    2.5,
]

let levelCaps = [0, 20, 40, 60, 80]

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

function getPowerTemplate(powerIndex, level, next_level) {
    return {
        type: "origins_classes:modify_block_loot",
        condition: andCondition(scoreboardCondition("pmmo_mining", level, next_level)),
        modifier: attributeModifierBonus(undefined, modifiers[powerIndex], operation.LOWERCASE.MULTIPLY_BASE, "Miner Ore Loot Bonus"),
        block_condition: conditionBlockIsOre()
    }
}

const template = powerTemplate();
for (let i = 0; i < modifiers.length; i++) {
    let next_level = i < levelCaps.length - 1 ? levelCaps[i + 1] : 1000;
    template[`miner_stone_break_speed${i}`] = getPowerTemplate(i, levelCaps[i], next_level);
}

writeJson(template, powerPath("more_stone_break_speed"));
