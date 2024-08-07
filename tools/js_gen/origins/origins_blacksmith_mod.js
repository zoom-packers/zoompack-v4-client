const fs = require('fs');
const {
    itemModifierTemplate, itemAttributeModifierPowerTemplate, attributeModifierBonus, getOperationValueString,
    itemPowerPath, itemModifierPath, writeJson, scoreboardCondition, andCondition, conditionItemDoesNotHavePower,
    conditionOriginClass, multipleChoices, choice, modifyItem, conditionOriginItemType, powerTemplate, powerPath
} = require("./origins_util");
const {operation} = require("../utils/cia_util");

let modifiers = [
    {id: "add10", mode: operation.LOWERCASE.ADDITION, value: 1, weight: 100},
    {id: "add20", mode: operation.LOWERCASE.ADDITION, value: 2, weight: 50},
    {id: "add30", mode: operation.LOWERCASE.ADDITION, value: 3, weight: 25},
    {id: "add40", mode: operation.LOWERCASE.ADDITION, value: 4, weight: 12.5},
    {id: "add50", mode: operation.LOWERCASE.ADDITION, value: 5, weight: 6.25},

    {id: "mul10", mode: operation.LOWERCASE.MULTIPLY_BASE, value: 0.1, weight: 50},
    {id: "mul20", mode: operation.LOWERCASE.MULTIPLY_BASE, value: 0.2, weight: 25},
    {id: "mul30", mode: operation.LOWERCASE.MULTIPLY_BASE, value: 0.3, weight: 12.5},
    {id: "mul40", mode: operation.LOWERCASE.MULTIPLY_BASE, value: 0.4, weight: 6.25},
    {id: "mul50", mode: operation.LOWERCASE.MULTIPLY_BASE, value: 0.5, weight: 3.125},
]

let levelCaps = [0, 20, 40, 60, 80]
let levelModifiers = [
    ["add10", "add20", "add30", "mul10", "mul20"],
    ["add20", "add30", "add40", "mul20", "mul30"],
    ["add30", "add40", "add50", "mul30", "mul40"],
    ["add40", "add50", "add50", "mul30", "mul40"],
    ["add40", "add50", "mul40", "mul40", "mul50"],
]

let itemTypes = ["chestplate", "helmet", "leggings", "shoes", "melee", "range", "shield"]
let powerNames = ["tough_chestplate", "tough_helmet", "tough_leggings", "tough_shoes", "sharp_blade", "strong_string", "steady_shield"]
let powerAttributes = ["minecraft:generic.armor", "minecraft:generic.armor", "minecraft:generic.armor", "minecraft:generic.armor", "minecraft:generic.attack_damage", "minecraft:generic.attack_damage", "minecraft:generic.armor"]
let attributeDisplayName = ["Armor", "Armor", "Armor", "Armor", "Attack Damage", "Attack Damage", "Armor"]
let powerSlots = ["chest", "head", "legs", "feet", "mainhand", "mainhand", "offhand"]
let attributeDescriptions = [
    "This chestplate has been forged by a licensed blacksmith.",
    "This helmet has been forged by a licensed blacksmith.",
    "These leggings have been forged by a licensed blacksmith.",
    "These shoes have been forged by a licensed blacksmith.",
    "This blade has been forged by a licensed blacksmith.",
    "This string has been forged by a licensed blacksmith.",
    "This shield has been forged by a licensed blacksmith."
]


const itemTypesLength = itemTypes.length
for (let i = 0; i < itemTypesLength; i++) {
    const power = powerAttributes[i]
    const slot = powerSlots[i]
    const name = powerNames[i].split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    for (let j = 0; j < modifiers.length; j++) {
        const value = modifiers[j].value;
        const mode = modifiers[j].mode;
        const valueLabel = getOperationValueString(value, modifiers[j].mode);
        const description = `${valueLabel} ${attributeDisplayName[i]}. ${attributeDescriptions[i]}`;

        const itemModifier = itemModifierTemplate(powerNames[i] + j, slot)
        const itemPower = itemAttributeModifierPowerTemplate(name, description, attributeModifierBonus(power, value, mode));

        let item_modifier_file_path = itemModifierPath("blacksmith", powerNames[i] + j)
        writeJson(itemModifier, item_modifier_file_path);
        let item_power_file_path = itemPowerPath(powerNames[i] + j)
        writeJson(itemPower, item_power_file_path);
    }
}

function getPowerTemplate(powerName, itemType, powerIndex, level, next_level, allModifiers, possibleModifiers) {
    return {
        type: "origins_classes:modify_craft_result",
        condition: andCondition(scoreboardCondition("pmmo_smithing", level, next_level)),
        item_condition: andCondition(
            allModifiers.map(x => conditionItemDoesNotHavePower(x)).concat([
                conditionOriginItemType(itemType)
            ])
        ),
        item_action: multipleChoices(
            levelModifiers[powerIndex].map((mapEntry, index) => {
                const levelModifier = modifiers.find(modifier => modifier.id === mapEntry)
                const itemModifier = possibleModifiers[index];
                return choice(levelModifier.weight, modifyItem("blacksmith", itemModifier))
            })
        )
    }
}

const template = powerTemplate();
for (let i = 0; i < itemTypesLength; i++) {
    const name = powerNames[i];
    const itemType = itemTypes[i];
    for (let j = 0; j < levelCaps.length; j++) {
        const itemTypeAllModifiers = modifiers.map((x, index) => powerNames[i] + index);
        const itemTypePossibleModifiers = itemTypeAllModifiers.filter(x => x !== name + j);
        const powerId = name + j;
        const level = levelCaps[j];
        const next_level = j < levelCaps.length - 1 ? levelCaps[j + 1] : 1000;
        template[powerId] = getPowerTemplate(powerId, itemType, j, level, next_level, itemTypeAllModifiers, itemTypePossibleModifiers);
    }
}
writeJson(template, powerPath("quality_equipment"));
