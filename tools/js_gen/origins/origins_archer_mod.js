const fs = require('fs');
const {paxiDatapacksPath} = require("../utils/path_util");
const {powerTemplate, scoreboardCondition, attributeModifierBonus, andCondition, powerPath} = require("./origins_util");
const {attribute_projectile_damage} = require("../typedefs/attribute_typedefs");
const {operation} = require("../utils/cia_util");

let archer_modifiers = [
    0.05,
    0.1,
    0.15,
    0.2,
    0.25,
]

let archer_level_caps = [0, 20, 40, 60, 80]
const output_powers_path = powerPath("bow_damage_boost");

function getPowerTemplate(level, next_level, value) {
    return {
        type: "origins:conditioned_attribute",
        condition: andCondition(scoreboardCondition("pmmo_archery", level, next_level)),
        modifier: attributeModifierBonus(attribute_projectile_damage.a_generic,
            value,
            operation.LOWERCASE.MULTIPLY_TOTAL,
            `Archer attack damage bonus ${level}`)
    }
}

const template = powerTemplate();
for (let i = 0; i < archer_modifiers.length; i++) {
    let next_level = i < archer_level_caps.length - 1 ? archer_level_caps[i + 1] : 1000;
    let powerName = `bow_damage_boost_${i}`;
    template[powerName] = getPowerTemplate(archer_level_caps[i], next_level, archer_modifiers[i]);
}

let json = JSON.stringify(template, null, 4);
fs.writeFileSync(output_powers_path, json)
