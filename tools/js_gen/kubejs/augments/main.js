const fs = require("fs");
const {operation} = require("../cia_util");


const outputDir = "../../../..";
const scriptPath = `${outputDir}/kubejs/startup_scripts/augments.js`;
const curiosDataPath = `${outputDir}/kubejs/data/curios/tags/items/augment.json`;

const template =`
StartupEvents.registry("item", e => {
{content}
});
`
const contentTemplate = `global.createAugument(e, {id}, {displayName}, {texture}, {attributes})`


const setIds = [
    "pyromancer",
    "cryomancer",
    "electromancer",
    "archevoker",
    "cultist",
    "shadowwalker",
    "priest",
    "plagued",
    "cooldown",
    "barbarian",
    "berserker",
    "crusader",
    "archer",
    "treasure_hunter",
    "explorer",
    "healer",
    "tank"
];
const mageAttributeValues = [0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18];
const attributeValues = {
    pyromancer: mageAttributeValues,
    cryomancer: mageAttributeValues,
    electromancer: mageAttributeValues,
    archevoker: mageAttributeValues,
    cultist: mageAttributeValues,
    shadowwalker: mageAttributeValues,
    priest: mageAttributeValues,
    plagued: mageAttributeValues,
    cooldown: [0.03, 0.06, 0.09, 0.12, 0.15, 0.18, 0.21, 0.24, 0.27],
    barbarian: [0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18],
    berserker: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09],
    crusader: [0.005, 0.01, 0.015, 0.02, 0.025, 0.03, 0.035, 0.04, 0.045],
    archer: [0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18],
    treasure_hunter: [0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18],
    explorer: [0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18],
    healer: [0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18],
    tank: [0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18],
};
const lastMageSetIndex = 7;
function getSpellPowerByName(setName) {
    switch (setName) {
        case "pyromancer":
            return "fire_spell_power";
        case "cryomancer":
            return "ice_spell_power";
        case "electromancer":
            return "lightning_spell_power";
        case "archevoker":
            return "evocation_spell_power";
        case "cultist":
            return "blood_spell_power";
        case "shadowwalker":
            return "ender_spell_power";
        case "priest":
            return "holy_spell_power";
        case "plagued":
            return "nature_spell_power";
    }
}

function getNonMageAttribute(setName) {
    switch (setName) {
        case "cooldown":
            return "irons_spellbooks:cooldown_reduction";
        case "barbarian":
            return "minecraft:generic.attack_damage";
        case "berserker":
            return "attributeslib:armor_pierce";
        case "crusader":
            return "minecraft:generic.attack_speed";
        case "archer":
            return "projectile_damage:generic";
        case "explorer":
            return "minecraft:generic.movement_speed";
        case "treasure_hunter":
            return "minecraft:generic.luck";
        case "healer":
            return "pufferfish_attributes:player.healing";
        case "tank":
            return "minecraft:generic.armor_toughness";
    }
}

function escape(value) {
    return value.replace(/"/g, '\\"');
}

const tiers = 9;
const content = [];
const ids = [];
for (let tierIndex = 0; tierIndex < tiers; tierIndex++) {
    for (let setIdIndex = 0; setIdIndex < setIds.length; setIdIndex++) {
        const setId = setIds[setIdIndex];
        const id = `"zoomers_magic:augment_${setId}_${tierIndex + 1}"`;
        const formattedSetId = setId.charAt(0).toUpperCase() + setId.slice(1).replace("_", " ");
        const displayName = `"Augment: ${formattedSetId} - Tier ${tierIndex + 1}"`;
        const texture = `"zoomers_magic:item/augment_${setId}"`;
        const isMageSet = setIdIndex <= lastMageSetIndex;
        const attributes = [
            {
                attribute: isMageSet ? `irons_spellbooks:${getSpellPowerByName(setId)}` : getNonMageAttribute(setId),
                uuid: id,
                operation: operation.MULTIPLY_BASE.toLowerCase(),
                value: attributeValues[setId][tierIndex],
            },
        ]
        content.push(contentTemplate
            .replace("{id}", id)
            .replace("{displayName}", displayName)
            .replace("{texture}", texture)
            .replace("{attributes}", JSON.stringify(attributes))
        );
        ids.push(id.replace(/"/g, ""));
    }
}

const script = template.replace("{content}", content.join("\n"));
fs.writeFileSync(scriptPath, script);

const curiosData = {
    replace: false,
    values: ids,
};
fs.writeFileSync(curiosDataPath, JSON.stringify(curiosData, null, 4));
