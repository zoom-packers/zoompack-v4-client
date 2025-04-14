let pmmoApiUtils = Java.loadClass('harmonised.pmmo.api.APIUtils');
const ORIGIN_PMMO_HELPER_TICK_INTERVAL = 80;

const ORIGINS_PMMO_CONFIG = {
    professions: {
        'origins-classes:miner': {
            levels: [
                { skill: 'mining', level: 6 }
            ],
            itemPD:'MINER_SET_GIVEN',
            items: []
        },
        'origins-classes:apicultor': {
            levels: [],
            itemPD:'APICULTOR_SET_GIVEN',
            items: []
        },
        'origins-classes:blacksmith': {
            levels: [
                { skill: 'smithing', level: 6 }
            ],
            itemPD:'BLACKSMITH_SET_GIVEN',
            items: []
        },
        'origins-classes:cleric': {
            levels: [
                { skill: 'magic', level: 6 }
            ],
            itemPD:'CLERIC_SET_GIVEN',
            items: []
        },
        'origins-classes:cook': {
            levels: [
                { skill: 'cooking', level: 6 }
            ],
            itemPD:'COOK_SET_GIVEN',
            items: []
        },
        'origins-classes:farmer': {
            levels: [
                { skill: 'farming', level: 6 }
            ],
            itemPD:'FARMER_SET_GIVEN',
            items: []
        },
        'origins-classes:lumberjack': {
            levels: [
                { skill: 'woodcutting', level: 6 }
            ],
            itemPD:'LUMBERJACK_SET_GIVEN',
            items: []
        },
        'origins-classes:merchant': {
            levels: [
                { skill: 'charisma', level: 6 }
            ],
            itemPD:'MERCHANT_SET_GIVEN',
            items: []
        },
        'origins-classes:nitwit': {
            levels: [],
            itemPD:'NITWIT_SET_GIVEN',
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
            itemPD:'WARRIOR_SET_GIVEN',
            items: [
                {
                    item: "create_sa:copper_sword",
                    amount: 1,
                    tag: "{}"
                },
                {
                    item: "minecraft:shield",
                    amount: 1,
                    tag: "{}"
                },
                {
                    item: "create_sa:copper_helmet",
                    amount: 1,
                    tag: "{}"
                },
                {
                    item: "create_sa:copper_chestplate",
                    amount: 1,
                    tag: "{}"
                },
                {
                    item: "create_sa:copper_leggings",
                    amount: 1,
                    tag: "{}"
                },
                {
                    item: "create_sa:copper_boots",
                    amount: 1,
                    tag: "{}"
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
            itemPD:'ALL_ROUNDER_SET_GIVEN',
            items: []
        },
        'origins-classes:archer': {
            levels: [
                { skill: 'archery', level: 6 },
                { skill: 'combat', level: 3 },
                { skill: 'endurance', level: 3 }
            ],
            itemPD:'ARCHER_SET_GIVEN',
            items: []
        },
        'origins-classes:mage': {
            levels: [
                { skill: 'magic', level: 6 },
                { skill: 'combat', level: 3 },
                { skill: 'endurance', level: 3 }
            ],
            itemPD:'MAGE_SET_GIVEN',
            items: [
                {
                    item: "irons_spellbooks:copper_spell_book",
                    amount: 1,
                    tag: "{ISB_Spells:{data:[{id:\"irons_spellbooks:blood_needles\",index:0,level:1,locked:0b},{id:\"irons_spellbooks:dragon_breath\",index:1,level:1,locked:0b},{id:\"irons_spellbooks:firecracker\",index:2,level:1,locked:0b},{id:\"irons_spellbooks:firebolt\",index:3,level:1,locked:0b},{id:\"irons_spellbooks:wisp\",index:4,level:1,locked:0b},{id:\"irons_spellbooks:cone_of_cold\",index:5,level:1,locked:0b},{id:\"irons_spellbooks:electrocute\",index:6,level:1,locked:0b},{id:\"irons_spellbooks:poison_arrow\",index:7,level:1,locked:0b}],maxSpells:8,mustEquip:1b,spellWheel:1b}}"
                },
                {
                    item: "irons_spellbooks:wandering_magician_helmet",
                    amount: 1,
                    tag: "{}"
                },
                {
                    item: "irons_spellbooks:wandering_magician_chestplate",
                    amount: 1,
                    tag: "{}"
                },
                {
                    item: "irons_spellbooks:wandering_magician_leggings",
                    amount: 1,
                    tag: "{}"
                },
                {
                    item: "irons_spellbooks:wandering_magician_boots",
                    amount: 1,
                    tag: "{}"
                }
            ]
        },
        'origins-classes:rogue': {
            levels: [
                { skill: 'swordsmanship', level: 6 },
                { skill: 'combat', level: 3 },
                { skill: 'endurance', level: 3 }
            ],
            itemPD:'ROGUE_SET_GIVEN',
            items: []
        },
        'origins-classes:tank': {
            levels: [
                { skill: 'swordsmanship', level: 9 },
                { skill: 'combat', level: 9 },
                { skill: 'endurance', level: 9 }
            ],
            itemPD:'TANK_SET_GIVEN',
            items: []
        },
    }
}

function getPlayerSetPD(player, pd_field){
    let pd_field_value = player.persistentData.getInt(pd_field);
    if(pd_field_value){
        return pd_field_value;
    }
    else{
        player.persistentData.putInt(pd_field,0);
        return 0;
    }
}

function setPlayerSetPD(player, pd_field, value){
    player.persistentData.putInt(pd_field, value);
}


function playerHasTheTag(tags, searched_tag) {
    let found = false;
    tags.forEach(tag => {
        if (tag.toString() === searched_tag) {
            found = true;
        }
    });

    return found;
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




BlockEvents.rightClicked(event => {
    let player = event.player;
    // player.give(Item.of('irons_spellbooks:copper_spell_book', 1, "{ISB_Spells:{data:[{id:\"irons_spellbooks:blood_needles\",index:0,level:1,locked:0b},{id:\"irons_spellbooks:dragon_breath\",index:1,level:1,locked:0b},{id:\"irons_spellbooks:firecracker\",index:2,level:1,locked:0b},{id:\"irons_spellbooks:firebolt\",index:3,level:1,locked:0b},{id:\"irons_spellbooks:wisp\",index:4,level:1,locked:0b},{id:\"irons_spellbooks:cone_of_cold\",index:5,level:1,locked:0b},{id:\"irons_spellbooks:electrocute\",index:6,level:1,locked:0b},{id:\"irons_spellbooks:poison_arrow\",index:7,level:1,locked:0b}],maxSpells:8,mustEquip:1b,spellWheel:1b}}"))
    // setPlayerSkill(player, 'combat', getPlayerSkill(player, 'combat')+1);
    // player.tell(getPlayerSkill(player, 'endurance'));
})


function pmmoLoopPlayers(event) {
    event.server.scheduleInTicks(ORIGIN_PMMO_HELPER_TICK_INTERVAL, callback => {
        event.server.players.forEach(player => {
            if (player) {
                let playerData = player.nbt.ForgeCaps;

                // let playerRace = playerData["origins:origins"].Origins["origins:origin"];
                let playerClass = playerData["origins:origins"].Origins["origins-classes:playstyle"];
                let playerProfession = playerData["origins:origins"].Origins["origins-classes:class"];

                let classData = ORIGINS_PMMO_CONFIG.classes[playerClass];
                if (classData) {
                    classData.levels.forEach(levelData => {
                        setPlayerSkill(player, levelData.skill, levelData.level);
                    })
                    if(!getPlayerSetPD(player, classData.itemPD)){
                        classData.items.forEach(itemData => {
                            player.give(Item.of(itemData.item, itemData.amount, itemData.tag));
                        })
                        setPlayerSkill(player, levelData.skill, levelData.level);
                    }
                }

                let professionData = ORIGINS_PMMO_CONFIG.professions[playerProfession];
                if (classData) {
                    professionData.levels.forEach(levelData => {
                        setPlayerSkill(player, levelData.skill, levelData.level)
                    })
                }
            }
        });

        pmmoLoopPlayers(event);
    });
}

ServerEvents.loaded(event => {
    pmmoLoopPlayers(event);
})