let pmmoApiUtils = Java.loadClass('harmonised.pmmo.api.APIUtils');

const ORIGIN_PMMO_HELPER_TICK_INTERVAL = 20;
const LAST_PLAYER_CLASS = 'lastPlayerClass';
const LAST_PLAYER_PROFESSION = 'lastPlayerProfession';

const ORIGINS_PMMO_CONFIG = {
    professions: {
        'origins-classes:miner': {
            levels: [
                { skill: 'mining', level: 6 }
            ],
            itemPD: 'MINER_SET_GIVEN',
            items: [{
                item: "create_sa:copper_pickaxe",
                amount: 1
            }]
        },
        'origins-classes:apicultor': {
            levels: [],
            itemPD: 'APICULTOR_SET_GIVEN',
            items: [{
                item: "minecraft:bundle",
                amount: 1,
                tag: "{Items:[{Count:1b,id:\"minecraft:shears\"},{Count:1b,id:\"easy_mob_farm:insect_net\"},{Count:8b,id:\"minecraft:dandelion\"},{Count:8b,id:\"minecraft:oxeye_daisy\"},{Count:8b,id:\"minecraft:poppy\"},{Count:8b,id:\"minecraft:honeycomb\"},{Count:4b,id:\"minecraft:beehive\"}]}"
            }]
        },
        'origins-classes:acolyte': {
            levels: [
                { skill: 'smithing', level: 6 }
            ],
            itemPD: 'ACOLYTE_SET_GIVEN',
            items: [{
                item: "minecraft:bundle",
                amount: 1,
                tag: "{Items:[{Count:1b,id:\"fortunas_anvil:fortunas_anvil\"},{Count:16b,id:\"fortunas_anvil:common_material\"},{Count:4b,id:\"fortunas_anvil:uncommon_material\"},{Count:8b,id:\"fortunas_anvil:common_catalyst\"}]}"
            }]
        },
        'origins-classes:blacksmith': {
            levels: [
                { skill: 'smithing', level: 6 }
            ],
            itemPD: 'BLACKSMITH_SET_GIVEN',
            items: [{
                item: "minecraft:anvil",
                amount: 1
            }]
        },
        'origins-classes:cleric': {
            levels: [
                { skill: 'magic', level: 6 }
            ],
            itemPD: 'CLERIC_SET_GIVEN',
            items: [{
                item: "minecraft:bundle",
                amount: 1,
                "tag": "{Items:[{Count:4b,id:\"aquaculture:jellyfish\",tag:{}},{Count:6b,id:\"minecraft:blaze_powder\",tag:{}},{Count:1b,id:\"minecraft:brewing_stand\"},{Count:4b,id:\"minecraft:fermented_spider_eye\",tag:{}},{Count:4b,id:\"minecraft:glistering_melon_slice\",tag:{}},{Count:4b,id:\"minecraft:sugar\",tag:{}},{Count:8b,id:\"minecraft:redstone\"},{Count:16b,id:\"minecraft:glass_bottle\",tag:{}},{Count:8b,id:\"minecraft:soul_sand\"},{Count:8b,id:\"minecraft:nether_wart\"},{Count:1b,id:\"minecraft:cauldron\"}]}"
            }]
        },
        'origins-classes:cook': {
            levels: [
                { skill: 'cooking', level: 6 }
            ],
            itemPD: 'COOK_SET_GIVEN',
            items: [{
                item: "minecraft:bundle",
                amount: 1,
                "tag": "{Items:[{Count:23b,id:\"minecraft:charcoal\"},{Count:8b,id:\"minecraft:rabbit\",tag:{}},{Count:8b,id:\"minecraft:chicken\",tag:{}},{Count:8b,id:\"minecraft:mutton\",tag:{}},{Count:8b,id:\"minecraft:porkchop\",tag:{}},{Count:8b,id:\"minecraft:beef\",tag:{}},{Count:1b,id:\"minecraft:smoker\"}]}"
            }]
        },
        'origins-classes:farmer': {
            levels: [
                { skill: 'farming', level: 6 }
            ],
            itemPD: 'FARMER_SET_GIVEN',
            items: [{
                item: "minecraft:bundle",
                amount: 1,
                "tag": "{Items:[{Count:18b,id:\"minecraft:bone_meal\",tag:{}},{Count:3b,id:\"vinery:white_grape_seeds\",tag:{}},{Count:3b,id:\"vinery:red_grape_seeds\",tag:{}},{Count:3b,id:\"croptopia:tea_seed\",tag:{}},{Count:3b,id:\"croptopia:chile_pepper_seed\",tag:{}},{Count:3b,id:\"croptopia:bellpepper_seed\",tag:{}},{Count:3b,id:\"croptopia:onion_seed\",tag:{}},{Count:3b,id:\"croptopia:cabbage_seed\",tag:{}},{Count:3b,id:\"croptopia:tomato_seed\",tag:{}},{Count:3b,id:\"croptopia:soybean_seed\",tag:{}},{Count:2b,id:\"supplementaries:flax_seeds\"},{Count:9b,id:\"minecraft:wheat_seeds\"},{Count:8b,id:\"minecraft:sugar_cane\"}]}"
            },
            {
                item: "create_sa:copper_hoe",
                amount: 1
            }]
        },
        'origins-classes:lumberjack': {
            levels: [
                { skill: 'woodcutting', level: 6 }
            ],
            itemPD: 'LUMBERJACK_SET_GIVEN',
            items: [{
                item: "create_sa:copper_axe",
                amount: 1
            }]
        },
        'origins-classes:merchant': {
            levels: [
                { skill: 'charisma', level: 6 }
            ],
            itemPD: 'MERCHANT_SET_GIVEN',
            items: [{
                item: "minecraft:bundle",
                amount: 1,
                "tag": "{Items:[{Count:32b,id:\"minecraft:emerald\",tag:{}}]}"
            }]
        },
        'origins-classes:rancher': {
            levels: [
                { skill: 'taming', level: 6 }
            ],
            itemPD: 'MERCHANT_SET_GIVEN',
            items: [{
                item: "minecraft:lead",
                amount: 4
            }]
        },
        'origins-classes:nitwit': {
            levels: [],
            itemPD: 'NITWIT_SET_GIVEN',
            items: []
        },
    },
    classes: {
        'origins-classes:warrior': {
            levels: [
                { skill: 'swordsmanship', level: 6 },
                { skill: 'combat', level: 6 },
                { skill: 'endurance', level: 6 }
            ],
            itemPD: 'WARRIOR_SET_GIVEN',
            items: [
                {
                    item: "create_sa:copper_sword",
                    amount: 1
                },
                {
                    item: "minecraft:shield",
                    amount: 1
                },
                {
                    item: "create_sa:copper_helmet",
                    amount: 1
                },
                {
                    item: "create_sa:copper_chestplate",
                    amount: 1
                },
                {
                    item: "create_sa:copper_leggings",
                    amount: 1
                },
                {
                    item: "create_sa:copper_boots",
                    amount: 1
                }
            ]
        },
        'origins-classes:all_rounder': {
            levels: [
                { skill: 'swordsmanship', level: 6 },
                { skill: 'archery', level: 6 },
                { skill: 'magic', level: 6 },
                { skill: 'combat', level: 6 },
                { skill: 'endurance', level: 6 }
            ],
            itemPD: 'ALL_ROUNDER_SET_GIVEN',
            items: [
                {
                    item: "create_sa:copper_sword",
                    amount: 1
                },
                {
                    item: "minecraft:shield",
                    amount: 1
                },
                {
                    item: "minecraft:bow",
                    amount: 1
                },
                {
                    item: "minecraft:arrow",
                    amount: 64
                },
                {
                    item: "irons_spellbooks:copper_spell_book",
                    amount: 1,
                    "tag": "{ISB_Spells:{data:[{id:\"irons_spellbooks:blood_needles\",index:0,level:1,locked:0b}],maxSpells:3,mustEquip:1b,spellWheel:1b}}"
                },
                {
                    item: "immersive_armors:wooden_helmet",
                    amount: 1
                },
                {
                    item: "immersive_armors:wooden_chestplate",
                    amount: 1
                },
                {
                    item: "immersive_armors:wooden_leggings",
                    amount: 1
                },
                {
                    item: "immersive_armors:wooden_boots",
                    amount: 1
                }
            ]
        },
        'origins-classes:archer': {
            levels: [
                { skill: 'archery', level: 6 },
                { skill: 'combat', level: 3 },
                { skill: 'endurance', level: 3 }
            ],
            itemPD: 'ARCHER_SET_GIVEN',
            items: [
                {
                    item: "minecraft:bow",
                    amount: 1
                },
                {
                    item: "minecraft:arrow",
                    amount: 64
                },
                {
                    item: "minecraft:arrow",
                    amount: 64
                },
                {
                    item: "immersive_armors:wooden_helmet",
                    amount: 1
                },
                {
                    item: "immersive_armors:wooden_chestplate",
                    amount: 1
                },
                {
                    item: "immersive_armors:wooden_leggings",
                    amount: 1
                },
                {
                    item: "immersive_armors:wooden_boots",
                    amount: 1
                }
            ]
        },
        'origins-classes:mage': {
            levels: [
                { skill: 'magic', level: 6 },
                { skill: 'combat', level: 3 },
                { skill: 'endurance', level: 3 }
            ],
            itemPD: 'MAGE_SET_GIVEN',
            items: [
                {
                    item: "zoomers_armory:copper_woodwind_staff",
                    amount: 1
                },
                {
                    item: "irons_spellbooks:copper_spell_book",
                    amount: 1,
                    tag: "{ISB_Spells:{data:[{id:\"irons_spellbooks:blood_needles\",index:0,level:1,locked:0b},{id:\"irons_spellbooks:dragon_breath\",index:1,level:1,locked:0b},{id:\"irons_spellbooks:firecracker\",index:2,level:1,locked:0b},{id:\"irons_spellbooks:firebolt\",index:3,level:1,locked:0b},{id:\"irons_spellbooks:wisp\",index:4,level:1,locked:0b},{id:\"irons_spellbooks:cone_of_cold\",index:5,level:1,locked:0b},{id:\"irons_spellbooks:electrocute\",index:6,level:1,locked:0b},{id:\"irons_spellbooks:poison_arrow\",index:7,level:1,locked:0b}],maxSpells:8,mustEquip:1b,spellWheel:1b}}"
                },
                {
                    item: "irons_spellbooks:wandering_magician_helmet",
                    amount: 1
                },
                {
                    item: "irons_spellbooks:wandering_magician_chestplate",
                    amount: 1
                },
                {
                    item: "irons_spellbooks:wandering_magician_leggings",
                    amount: 1
                },
                {
                    item: "irons_spellbooks:wandering_magician_boots",
                    amount: 1
                }
            ]
        },
        'origins-classes:rogue': {
            levels: [
                { skill: 'swordsmanship', level: 6 },
                { skill: 'combat', level: 3 },
                { skill: 'endurance', level: 3 }
            ],
            itemPD: 'ROGUE_SET_GIVEN',
            items: [{
                item: "zoomers_armory:copper_dagger",
                amount: 1
            },
            {
                item: "zoomers_armory:copper_dagger",
                amount: 1
            },
            {
                item: "minecraft:leather_helmet",
                amount: 1
            },
            {
                item: "minecraft:leather_chestplate",
                amount: 1
            },
            {
                item: "minecraft:leather_leggings",
                amount: 1
            },
            {
                item: "minecraft:leather_boots",
                amount: 1
            }]
        },
        'origins-classes:tank': {
            levels: [
                { skill: 'swordsmanship', level: 9 },
                { skill: 'combat', level: 9 },
                { skill: 'endurance', level: 9 }
            ],
            itemPD: 'TANK_SET_GIVEN',
            items: [{
                item: "create_sa:copper_sword",
                amount: 1
            },
            {
                item: "minecraft:shield",
                amount: 1
            },
            {
                item: "minecraft:iron_helmet",
                amount: 1
            },
            {
                item: "minecraft:iron_chestplate",
                amount: 1
            },
            {
                item: "minecraft:iron_leggings",
                amount: 1
            },
            {
                item: "minecraft:iron_boots",
                amount: 1
            }]
        },
    }
}

function getPlayerSetPDitem(player, pd_field) {
    let pd_field_value = player.persistentData.getInt(pd_field);
    if (pd_field_value) {
        return pd_field_value;
    }
    else {
        player.persistentData.putInt(pd_field, 0);
        return 0;
    }
}

function setPlayerSetPDitem(player, pd_field, value) {
    player.persistentData.putInt(pd_field, value);
}

function getPlayerPDString(player, pd_field) {
    let pd_field_value = player.persistentData.getString(pd_field);
    if (pd_field_value) {
        return pd_field_value;
    }
    else {
        return undefined;
    }
}

function setPlayerPDString(player, pd_field, pd_field_value) {
    player.persistentData.putString(pd_field, pd_field_value);
}

function getPlayerSkill(player, skill) {
    return PmmoAPIUtils.getLevel(skill, player);
}

function setPlayerSkill(player, skill, level) {
    let player_skill_level = getPlayerSkill(player, skill)
    if (level > player_skill_level) {
        PmmoAPIUtils.setLevel(skill, player, level);
    }
}

function forceSetPlayerSkill(player, skill, level) {
    PmmoAPIUtils.setLevel(skill, player, level);

}

function givePlayerStartGearAndLevelsForClass(player, playerClass) {
    let classData = ORIGINS_PMMO_CONFIG.classes[playerClass];
    if (classData) {
        classData.levels.forEach(levelData => {
            setPlayerSkill(player, levelData.skill, levelData.level);
        })
        if (!getPlayerSetPDitem(player, classData.itemPD)) {
            classData.items.forEach(itemData => {
                player.give(Item.of(itemData.item, itemData.amount ?? 1, itemData.tag ?? {}));
            })
            setPlayerSetPDitem(player, classData.itemPD, 1);
        }
    }
}

function givePlayerStartGearAndLevelsForProfession(player, playerProfession) {
    let professionData = ORIGINS_PMMO_CONFIG.professions[playerProfession];
    if (professionData) {
        professionData.levels.forEach(levelData => {
            setPlayerSkill(player, levelData.skill, levelData.level);
        })
        if (!getPlayerSetPDitem(player, professionData.itemPD)) {
            professionData.items.forEach(itemData => {
                player.give(Item.of(itemData.item, itemData.amount ?? 1, itemData.tag ?? {}));
            })
            setPlayerSetPDitem(player, professionData.itemPD, 1);
        }
    }
}

function deleteOldOriginReward(player, oldOriginType, typeOfOrigin) {
    let configData = undefined;
    if (typeOfOrigin == 'profession') {
        configData = ORIGINS_PMMO_CONFIG.professions[oldOriginType];
    }
    if (typeOfOrigin == 'class') {
        configData = ORIGINS_PMMO_CONFIG.classes[oldOriginType];
    }
    if (!configData) return;
    setPlayerSetPDitem(player, configData.itemPD, 0);
}

function pmmoLoopPlayers(event) {
    event.server.scheduleInTicks(ORIGIN_PMMO_HELPER_TICK_INTERVAL, callback => {
        event.server.players.forEach(player => {
            if (player) {
                let playerData = player.nbt.ForgeCaps;

                let lastPlayerClass = getPlayerPDString(player, LAST_PLAYER_CLASS);
                let lastPlayerProfession = getPlayerPDString(player, LAST_PLAYER_PROFESSION);

                // let playerRace = playerData["origins:origins"].Origins["origins:origin"];
                let playerClass = playerData["origins:origins"].Origins["origins-classes:playstyle"];
                let playerProfession = playerData["origins:origins"].Origins["origins-classes:class"];

                if (lastPlayerClass != playerClass) {
                    givePlayerStartGearAndLevelsForClass(player, playerClass);
                    setPlayerPDString(player, LAST_PLAYER_CLASS, playerClass);
                    if (lastPlayerClass) {
                        deleteOldOriginReward(player, lastPlayerClass, 'class');
                    }

                }

                if (lastPlayerProfession != playerProfession) {
                    givePlayerStartGearAndLevelsForProfession(player, playerProfession);
                    setPlayerPDString(player, LAST_PLAYER_PROFESSION, playerProfession);
                    if (lastPlayerProfession) {
                        deleteOldOriginReward(player, lastPlayerProfession, 'profession');
                    }

                }

            }
        });

        pmmoLoopPlayers(event);
    });
}

ServerEvents.loaded(event => {
    pmmoLoopPlayers(event);
})
