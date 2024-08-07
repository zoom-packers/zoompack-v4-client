const {paxiDatapacksPath} = require("../utils/path_util");
const {operation} = require("../utils/cia_util");
const fs = require('fs');

function datapackPath() {
    return paxiDatapacksPath() + "/origins_classes_edits/data/origins-classes";
}

function powersPath() {
    return `${datapackPath()}/powers`
}

function powerPath(powerName) {
    return `${powersPath()}/${powerName}.json`;
}

function itemPowerPath(powerName) {
    return `${powersPath()}/items/${powerName}.json`;
}

function originsPath() {
    return `${datapackPath()}/origins`;
}

function originPath(originName) {
    return `${originsPath()}/${originName}.json`;
}

function itemModifiersPath() {
    return `${datapackPath()}/item_modifiers`;
}

function itemModifierPath(className, item) {
    return `${itemModifiersPath()}/${className}/${item}.json`;
}

function writeJson(jsonObject, path) {
    let json = JSON.stringify(jsonObject, null, 4);
    fs.writeFileSync(path, json);
}

function powerTemplate() {
    return {
        type: "origins:multiple",
        loading_priority: 111,
    }
}

function scoreboardCondition(objective, minLevel, maxLevel) {
    return [
        {
            type: "origins:scoreboard",
            objective,
            comparison: ">=",
            compare_to: minLevel
        },
        {
            type: "origins:scoreboard",
            objective,
            comparison: "<",
            compare_to: maxLevel
        }
    ];
}

function attributeModifierBonus(attribute, value, operation, description) {
    return {
        name: description,
        attribute,
        value,
        operation,
    }
}

function andCondition(conditions) {
    return {
        type: "origins:and",
        conditions: [...conditions]
    }
}

function itemAttributeModifierPowerTemplate(name, description, modifier) {
    return {
        type: "apoli:attribute",
        name,
        description,
        modifier
    }
}

function itemFoodEntityActionPowerTemplate(name, description, action) {
    return {
        type: "origins:modify_food",
        name,
        description,
        entity_action: action
    }
}

function applyEffectAction(effectId, duration, amplifier) {
    return {
        type: "origins:apply_effect",
        effect: {
            effect: effectId,
            duration: duration * 20, // 20 ticks per second
            amplifier
        }
    }

}

function itemModifierTemplate(powerId, slot) {
    const result = [
        {
            function: "apoli:add_power",
            power: `origins-classes:items/${powerId}`
        }
    ]
    if (slot !== undefined && slot !== null) {
        result[0].slot = slot;
    }
    return result;
}

function getOperationSign(op) {
    switch (op) {
        case operation.ADDITION:
            return "";
        case operation.MULTIPLY_BASE:
            return "x";
        case operation.MULTIPLY_TOTAL:
            return "X";
        case operation.LOWERCASE.ADDITION:
            return "";
        case operation.LOWERCASE.MULTIPLY_BASE:
            return "x";
        case operation.LOWERCASE.MULTIPLY_TOTAL:
            return "X";
    }
}

function getOperationValueString(value, op) {
    return `+${value}${getOperationSign(op)}`
}

function conditionItemHasPower(powerId) {
    return {
        type: "origins_classes:has_power",
        power: `origins-classes:items/${powerId}`,
    }
}

function conditionItemDoesNotHavePower(powerId) {
    return {
        type: "origins_classes:has_power",
        power: `origins-classes:items/${powerId}`,
        inverted: true,
    }
}

function conditionOriginItemType(classId) {
    return {
        type: `origins_classes:${classId}`
    }
}

function conditionBlockIsCrop() {
    return {
        type: "origins_classes:harvestable_crops"
    }
}

function conditionBlockIsOre() {
    return {
        type: "origins:in_tag",
        tag: "forge:ores"
    }
}

function conditionFood() {
    return {
        type: "origins:food"
    }
}

function multipleChoices(choices) {
    return {
        type: "origins:choice",
        actions: [...choices]
    }
}

function choice(weight, element) {
    return {
        element,
        weight,
    }
}

function modifyItem(className, powerId) {
    return {
        type: "apoli:modify",
        modifier: `origins-classes:${className}/${powerId}`
    }
}

module.exports = {
    writeJson,
    datapackPath,
    powersPath,
    powerPath,
    itemPowerPath,
    originsPath,
    originPath,
    itemModifiersPath,
    itemModifierPath,
    powerTemplate,
    scoreboardCondition,
    attributeModifierBonus,
    andCondition,
    itemAttributeModifierPowerTemplate,
    itemFoodEntityActionPowerTemplate,
    itemModifierTemplate,
    applyEffectAction,
    getOperationValueString,
    conditionItemHasPower,
    conditionItemDoesNotHavePower,
    conditionOriginItemType,
    conditionFood,
    conditionBlockIsCrop,
    conditionBlockIsOre,
    multipleChoices,
    choice,
    modifyItem,
}
