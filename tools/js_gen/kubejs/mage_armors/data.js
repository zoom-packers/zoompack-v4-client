const {item_irons_spellbooks} = require("../../typedefs/item_typedefs");

const helmets = [
    item_irons_spellbooks.i_pyromancer_helmet,
    item_irons_spellbooks.i_cryomancer_helmet,
    item_irons_spellbooks.i_electromancer_helmet,
    item_irons_spellbooks.i_archevoker_helmet,
    item_irons_spellbooks.i_cultist_helmet,
    item_irons_spellbooks.i_shadowwalker_helmet,
    item_irons_spellbooks.i_priest_helmet,
    item_irons_spellbooks.i_plagued_helmet,
];

const chestplates = [
    item_irons_spellbooks.i_pyromancer_chestplate,
    item_irons_spellbooks.i_cryomancer_chestplate,
    item_irons_spellbooks.i_electromancer_chestplate,
    item_irons_spellbooks.i_archevoker_chestplate,
    item_irons_spellbooks.i_cultist_chestplate,
    item_irons_spellbooks.i_shadowwalker_chestplate,
    item_irons_spellbooks.i_priest_chestplate,
    item_irons_spellbooks.i_plagued_chestplate,
];

const leggings = [
    item_irons_spellbooks.i_pyromancer_leggings,
    item_irons_spellbooks.i_cryomancer_leggings,
    item_irons_spellbooks.i_electromancer_leggings,
    item_irons_spellbooks.i_archevoker_leggings,
    item_irons_spellbooks.i_cultist_leggings,
    item_irons_spellbooks.i_shadowwalker_leggings,
    item_irons_spellbooks.i_priest_leggings,
    item_irons_spellbooks.i_plagued_leggings,
];

const boots = [
    item_irons_spellbooks.i_pyromancer_boots,
    item_irons_spellbooks.i_cryomancer_boots,
    item_irons_spellbooks.i_electromancer_boots,
    item_irons_spellbooks.i_archevoker_boots,
    item_irons_spellbooks.i_cultist_boots,
    item_irons_spellbooks.i_shadowwalker_boots,
    item_irons_spellbooks.i_priest_boots,
    item_irons_spellbooks.i_plagued_boots,
];



function getHelmetName(helmetId) {
    switch (helmetId) {
        case item_irons_spellbooks.i_pyromancer_helmet:
            return "Pyromancer Hat";
        case item_irons_spellbooks.i_electromancer_helmet:
            return "Electromancer Hat";
        case item_irons_spellbooks.i_archevoker_helmet:
            return "Archevoker Hat";
        case item_irons_spellbooks.i_cultist_helmet:
            return "Cultist Hood";
        case item_irons_spellbooks.i_cryomancer_helmet:
            return "Cryomancer Hood";
        case item_irons_spellbooks.i_shadowwalker_helmet:
            return "Shadowwalker Mask";
        case item_irons_spellbooks.i_priest_helmet:
            return "Priest Mask";
        case item_irons_spellbooks.i_plagued_helmet:
            return "Plagued Mask";
    }
}

function getChestplateName(chestplateId) {
    switch (chestplateId) {
        case item_irons_spellbooks.i_pyromancer_chestplate:
            return "Pyromancer Robe";
        case item_irons_spellbooks.i_electromancer_chestplate:
            return "Electromancer Robe";
        case item_irons_spellbooks.i_archevoker_chestplate:
            return "Archevoker Coat";
        case item_irons_spellbooks.i_cultist_chestplate:
            return "Cultist Armor";
        case item_irons_spellbooks.i_cryomancer_chestplate:
            return "Cryomancer Coat";
        case item_irons_spellbooks.i_shadowwalker_chestplate:
            return "Shadowwalker Armor";
        case item_irons_spellbooks.i_priest_chestplate:
            return "Priest Robes";
        case item_irons_spellbooks.i_plagued_chestplate:
            return "Plagued Coat";
    }
}

function getLeggingsName(leggingsId) {
    switch (leggingsId) {
        case item_irons_spellbooks.i_pyromancer_leggings:
            return "Pyromancer Leggings";
        case item_irons_spellbooks.i_electromancer_leggings:
            return "Electromancer Leggings";
        case item_irons_spellbooks.i_archevoker_leggings:
            return "Archevoker Leggings";
        case item_irons_spellbooks.i_cultist_leggings:
            return "Cultist Leggings";
        case item_irons_spellbooks.i_cryomancer_leggings:
            return "Cryomancer Leggings";
        case item_irons_spellbooks.i_shadowwalker_leggings:
            return "Shadowwalker Leggings";
        case item_irons_spellbooks.i_priest_leggings:
            return "Priest Leggings";
        case item_irons_spellbooks.i_plagued_leggings:
            return "Plagued Leggings";
    }
}

function getBootsName(bootsId) {
    switch (bootsId) {
        case item_irons_spellbooks.i_pyromancer_boots:
            return "Pyromancer Boots";
        case item_irons_spellbooks.i_electromancer_boots:
            return "Electromancer Boots";
        case item_irons_spellbooks.i_archevoker_boots:
            return "Archevoker Boots";
        case item_irons_spellbooks.i_cultist_boots:
            return "Cultist Boots";
        case item_irons_spellbooks.i_cryomancer_boots:
            return "Cryomancer Boots";
        case item_irons_spellbooks.i_shadowwalker_boots:
            return "Shadowwalker Boots";
        case item_irons_spellbooks.i_priest_boots:
            return "Priest Boots";
        case item_irons_spellbooks.i_plagued_boots:
            return "Plagued Boots";
    }
}

function getItemJson(modId, setId, armorPart) {
    const json = {
        parent: `item/generated`,
        textures: {
            layer0: `${modId}:item/${setId}_${armorPart}`
        }
    }
    return json;
}

function getArmorJson(modId, setId, armorPart) {
    const json = {
        parent: `item/armor/${armorPart}`,
        textures: {
            layer0: `${modId}:models/armor/${setId}_${armorPart}`
        },
        overrides: [
            {
                predicate: {
                    custom_model_data: 1
                },
                model: `${modId}:${setId}_${armorPart}`
            }
        ]
    }
    return json;
}

module.exports = {
    helmets,
    chestplates,
    leggings,
    boots,
    getHelmetName,
    getChestplateName,
    getLeggingsName,
    getBootsName,
    getItemJson,
    getArmorJson
}
