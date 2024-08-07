const fs = require('fs');
const {operation} = require("../utils/cia_util");
const {
    getOperationValueString,
    itemModifierTemplate,
    itemAttributeModifierPowerTemplate,
    attributeModifierBonus,
    itemModifierPath,
    writeJson,
    itemPowerPath,
    andCondition,
    scoreboardCondition,
    conditionOriginItemType,
    conditionItemDoesNotHavePower,
    multipleChoices,
    choice,
    modifyItem, powerTemplate, powerPath, itemFoodEntityActionPowerTemplate, applyEffectAction, conditionFood
} = require("./origins_util");

let modifiers = [
    {id: "add10", mode: operation.LOWERCASE.ADDITION, value: 10, weight: 100},
    {id: "add20", mode: operation.LOWERCASE.ADDITION, value: 20, weight: 50},
    {id: "add30", mode: operation.LOWERCASE.ADDITION, value: 30, weight: 25},
    {id: "add40", mode: operation.LOWERCASE.ADDITION, value: 40, weight: 12.5},
    {id: "add50", mode: operation.LOWERCASE.ADDITION, value: 50, weight: 6.25},
    {id: "add60", mode: operation.LOWERCASE.ADDITION, value: 60, weight: 3.125},
    {id: "add70", mode: operation.LOWERCASE.ADDITION, value: 70, weight: 1.5625},
    {id: "add80", mode: operation.LOWERCASE.ADDITION, value: 80, weight: 0.78125},
    {id: "add90", mode: operation.LOWERCASE.ADDITION, value: 90, weight: 0.390625},
    {id: "add100", mode: operation.LOWERCASE.ADDITION, value: 100, weight: 0.1953125},
]

let levelCaps = [0, 20, 40, 60, 80]
let levelModifiers = [
    ["add10", "add20", "add30", "add60", "add70"],
    ["add20", "add30", "add40", "add70", "add80"],
    ["add30", "add40", "add50", "add80", "add90"],
    ["add40", "add50", "add50", "add80", "add90"],
    ["add40", "add50", "add90", "add90", "add100"],
]

let itemTypes = ["food", "food"]
let powerNames = ["nourishing_mainhand", "nourishing_offhand"]
let slots = ["mainhand", "offhand"]
let powerAttributes = ["farmersdelight:nourishment", "farmersdelight:nourishment"]
let attributeDisplayName = ["seconds of Nourishment", "seconds of Nourishment"]
let attributeDescriptions = [
    "This food has been plated by a cook.",
    "This food has been plated by a cook."
]

const itemTypesLength = itemTypes.length
for (let i = 0; i < itemTypesLength; i++) {
    const power = powerAttributes[i]
    const slot = slots[i]
    const name = powerNames[i].split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    for (let j = 0; j < modifiers.length; j++) {
        const value = modifiers[j].value;
        const mode = modifiers[j].mode;
        const valueLabel = getOperationValueString(value, modifiers[j].mode);
        const description = `${valueLabel} ${attributeDisplayName[i]}. ${attributeDescriptions[i]}`;

        const itemModifier = itemModifierTemplate(powerNames[i] + j, slot)
        const itemPower = itemFoodEntityActionPowerTemplate(name, description, applyEffectAction(power, value, 0));

        let item_modifier_file_path = itemModifierPath("cook", powerNames[i] + j)
        writeJson(itemModifier, item_modifier_file_path);
        let item_power_file_path = itemPowerPath(powerNames[i] + j)
        writeJson(itemPower, item_power_file_path);
    }
}


function getPowerTemplate(powerName, itemType, powerIndex, level, next_level, allModifiers, possibleModifiers) {
    return {
        type: "origins_classes:modify_craft_result",
        condition: andCondition(scoreboardCondition("pmmo_cooking", level, next_level)),
        item_condition: andCondition(
            allModifiers.map(x => conditionItemDoesNotHavePower(x)).concat([
                conditionFood()
            ])
        ),
        item_action: multipleChoices(
            levelModifiers[powerIndex].map((mapEntry, index) => {
                const levelModifier = modifiers.find(modifier => modifier.id === mapEntry)
                const itemModifier = possibleModifiers[index];
                return choice(levelModifier.weight, modifyItem("cook", itemModifier))
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
writeJson(template, powerPath("better_crafted_food"));
