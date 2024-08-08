const fs = require('fs');
const {
    andCondition,
    scoreboardCondition,
    attributeModifierBonus,
    conditionBlockIsCrop,
    powerTemplate,
    writeJson,
    powerPath
} = require("./origins_util");
const {operation} = require("../utils/cia_util");

let modifiers = [
    0.05,
    0.1,
    0.15,
    0.2,
    0.25,
]

let levelCaps = [0, 20, 40, 60, 80]


function getPowerTemplate(powerIndex, level, next_level) {
    return {
        type: "origins_classes:modify_block_loot",
        condition: andCondition(scoreboardCondition("pmmo_combat", level, next_level)),
        modifier: attributeModifierBonus(undefined, modifiers[powerIndex], operation.LOWERCASE.MULTIPLY_BASE, "Warrior attack damage bonus"),
        block_condition: conditionBlockIsCrop()
    }
}

const template = powerTemplate();
for (let i = 0; i < modifiers.length; i++) {
    let next_level = i < levelCaps.length - 1 ? levelCaps[i + 1] : 1000;
    template[`more_attack_damage${i}`] = getPowerTemplate(i, levelCaps[i], next_level);
}

writeJson(template, powerPath("more_attack_damage"));
