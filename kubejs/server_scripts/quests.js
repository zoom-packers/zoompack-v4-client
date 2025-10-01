const $CompoundTag = Java.loadClass('net.minecraft.nbt.CompoundTag')

// TODO: add progression announcement with text on screen
const ACTIVE_QUEST_PD_FIELD = 'ACTIVE_QUEST';
const ACTIVE_QUEST_PROGRESS_PD_FIELD = 'ACTIVE_QUEST_PROGRESS';
const ADV_NAMESPACE = "aaaa_zp4adv";
const TWO_DOTS = ":";
const ADV_PREFIX = `${ADV_NAMESPACE}${TWO_DOTS}`;

//QUEST_DATA_START
const QUESTS = {
    "20logs":{
        "type":"break_block",
        "match":{
            "mode":"endswith",
            "match_id":"_log"
        },
        "unlock":"aaaa_zp4adv:20logs",
        "count":20,
        "dialogue":{
            "speaker":"Daluku",
            "message":"Great work. Get some tools for yourself and start slaying some enemies.",
            "renderType":"rectangle",
            "renderTarget":"medievalorigins:textures/item/high_elf.png"
        },
        "next":"10enemies"
    },
    "10enemies":{
        "type":"kill",
        "match":{
            "mode":"preset_entity_check",
            "match":"hostile"
        },
        "unlock":"aaaa_zp4adv:10enemies",
        "count":10,
        "dialogue":{
            "speaker":"Daluku",
            "message":"Looks like you are getting stronger! Remember you are a gatherer, so butcher some animals",
            "renderType":"rectangle",
            "renderTarget":"medievalorigins:textures/item/troll.png"
        },
        "next":"10farmanimals"
    },
    "10farmanimals":{
        "type":"kill",
        "match":{
            "mode":"preset_entity_check",
            "match":"passive"
        },
        "unlock":"aaaa_zp4adv:10farmanimals",
        "count":10,
        "dialogue":{
            "speaker":"Daluku",
            "message":"Good, now you won't starve. Continue!",
            "renderType":"rectangle",
            "renderTarget":"medievalorigins:textures/item/high_elf.png"
        },
        "next":"10combatlvl"
    },
    "10combatlvl":{
        "type":"reach_level",
        "match":{
            "mode":"check_level",
            "skill":"combat"
        },
        "unlock":"aaaa_zp4adv:10combatlvl",
        "count":10,
        "dialogue":{
            "speaker":"Daluku",
            "message":"Your combat skills are improving. Keep it up!",
            "renderType":"rectangle",
            "renderTarget":"medievalorigins:textures/item/high_elf.png"
        },
        "next":"loot_gem"
    },
    "loot_gem":{
        "type":"obtain_item",
        "match":{
            "mode":"exact",
            "match_id":"apotheosis:gem"
        },
        "unlock":"aaaa_zp4adv:loot_gem",
        "count":1,
        "dialogue":{
            "speaker":"Daluku",
            "message":"A shiny gem! You can use it to enhance your weaponry on a Smithing Table. Type /gems to find more.",
            "renderType":"rectangle",
            "renderTarget":"medievalorigins:textures/item/high_elf.png"
        },
        "next":"crush_gem"
    },
    "crush_gem":{
        "type":"obtain_item",
        "match":{
            "mode":"exact",
            "match_id":"apotheosis:gem_dust"
        },
        "unlock":"aaaa_zp4adv:crush_gem",
        "count":1,
        "dialogue":{
            "speaker":"Daluku",
            "message":"Crushed it! You can use the dust to craft tables for gems and affixes. Press U while hovering over it.",
            "renderType":"rectangle",
            "renderTarget":"medievalorigins:textures/item/high_elf.png"
        },
        "next":"place_salvaging_table"
    },
    "place_salvaging_table":{
        "type":"place_block",
        "match":{
            "mode":"exact",
            "match_id":"apotheosis:salvaging_table"
        },
        "unlock":"aaaa_zp4adv:place_salvaging_table",
        "count":1,
        "dialogue":{
            "speaker":"Daluku",
            "message":"Salvaging table placed. Time to recycle! Extract affix materials or even ingots.",
            "renderType":"rectangle",
            "renderTarget":"medievalorigins:textures/item/high_elf.png"
        },
        "next":"place_simple_reforging_table"
    },
    "place_simple_reforging_table":{
        "type":"place_block",
        "match":{
            "mode":"exact",
            "match_id":"apotheosis:simple_reforging_table"
        },
        "unlock":"aaaa_zp4adv:place_simple_reforging_table",
        "count":1,
        "dialogue":{
            "speaker":"Daluku",
            "message":"Reforging ready. Enhance your gear! ",
            "renderType":"rectangle",
            "renderTarget":"medievalorigins:textures/item/high_elf.png"
        },
        "next":"place_fortunas_anvil"
    },
    "place_fortunas_anvil":{
        "type":"place_block",
        "match":{
            "mode":"exact",
            "match_id":"fortunas_anvil:fortunas_anvil"
        },
        "unlock":"aaaa_zp4adv:place_fortunas_anvil",
        "count":1,
        "dialogue":{
            "speaker":"Daluku",
            "message":"Fortuna's anvil is set. Good luck!",
            "renderType":"rectangle",
            "renderTarget":"medievalorigins:textures/item/high_elf.png"
        },
        "next":"use_fortunas_anvil"
    },
    "use_fortunas_anvil":{
        "type":"obtain_item",
        "match":{
            "mode":"nbt_data_includes",
            "match_id":"ZUpgradeData",
            "sub_match":{
                "match":"nbt_data_ge_count",
                "match_id":"level"
            }
        },
        "unlock":"aaaa_zp4adv:use_fortunas_anvil",
        "count":1,
        "dialogue":{
            "speaker":"Daluku",
            "message":"Amazing! Now let`s put your new gear to work to see how it behaves! Hunt down something!",
            "renderType":"rectangle",
            "renderTarget":"medievalorigins:textures/item/high_elf.png"
        },
        "next":"craft_bauble_mount"
    },
    "craft_bauble_mount":{
        "type":"obtain_item",
        "match":{
            "mode":"exact",
            "match_id":"baublemounts:mount_bauble"
        },
        "unlock":"aaaa_zp4adv:craft_bauble_mount",
        "count":1,
        "dialogue":{
            "speaker":"Daluku",
            "message":"Great work! Now use that to capture a tamed mount.",
            "renderType":"rectangle",
            "renderTarget":"medievalorigins:textures/item/high_elf.png"
        },
        "next":"use_bauble_mount"
    },
    "use_bauble_mount":{
        "type":"obtain_item",
        "match":{
            "mode":"nbt_data_includes",
            "match_id":"Mount",
            "sub_match":{
                "match":"item_id_match",
                "match_id":"baublemounts:mount_bauble"
            }
        },
        "unlock":"aaaa_zp4adv:use_bauble_mount",
        "count":1,
        "dialogue":{
            "speaker":"Daluku",
            "message":"Amazing! Now you can toggle your mount with the key V. Take care of it!",
            "renderType":"rectangle",
            "renderTarget":"medievalorigins:textures/item/high_elf.png"
        },
        "next":"50enemies"
    },
    "50enemies":{
        "type":"kill",
        "match":{
            "mode":"preset_entity_check",
            "match":"hostile"
        },
        "unlock":"aaaa_zp4adv:50enemies",
        "count":50,
        "dialogue":{
            "speaker":"Daluku",
            "message":"50 enemies down! You're a warrior now.",
            "renderType":"rectangle",
            "renderTarget":"medievalorigins:textures/item/high_elf.png"
        },
        "next":"win_raid"
    },
    "win_raid":{
        "type":"raid_win",
        "match":{},
        "unlock":"aaaa_zp4adv:win_raid",
        "count":1,
        "dialogue":{
            "speaker":"Daluku",
            "message":"Raid victory! The village is safe.",
            "renderType":"rectangle",
            "renderTarget":"medievalorigins:textures/item/high_elf.png"
        },
        "next":"kill_cornelia"
    },
    "kill_cornelia":{
        "type":"kill",
        "match":{
            "mode":"preset_entity_check",
            "match":"boss"
        },
        "unlock":"aaaa_zp4adv:kill_cornelia",
        "count":4,
        "dialogue":{
            "speaker":"Daluku",
            "message":"Bosses defeated! Impressive strength.",
            "renderType":"rectangle",
            "renderTarget":"medievalorigins:textures/item/high_elf.png"
        },
        "next":"locate_gatekeeper"
    },
    "locate_gatekeeper":{
        "type":"locate",
        "match":{
            "mode":"entity",
            "match_id":"gatekeeper"
        },
        "unlock":"aaaa_zp4adv:locate_gatekeeper",
        "count":1,
        "dialogue":{
            "speaker":"Daluku",
            "message":"Found the Gate Keeper. Secrets await!",
            "renderType":"rectangle",
            "renderTarget":"medievalorigins:textures/item/high_elf.png"
        },
        "next":"get_zeal_lighter"
    },
    "get_zeal_lighter":{
        "type":"obtain_item",
        "match":{
            "mode":"exact",
            "match_id":"zeal_lighter"
        },
        "unlock":"aaaa_zp4adv:get_zeal_lighter",
        "count":1,
        "dialogue":{
            "speaker":"Daluku",
            "message":"Zeal lighter acquired. Light the way!",
            "renderType":"rectangle",
            "renderTarget":"medievalorigins:textures/item/high_elf.png"
        },
        "next":"20combatlvl"
    },
    "20combatlvl":{
        "type":"reach_level",
        "match":{
            "mode":"check_level",
            "skill":"combat"
        },
        "unlock":"aaaa_zp4adv:20combatlvl",
        "count":20,
        "dialogue":{
            "speaker":"Daluku",
            "message":"Level 20 reached. You're advancing quickly!",
            "renderType":"rectangle",
            "renderTarget":"medievalorigins:textures/item/high_elf.png"
        },
        "next":"travel_to_everbright"
    },
    "travel_to_everbright":{
        "type":"changed_dimension",
        "match":{
            "mode":"to",
            "dimension":"everbright"
        },
        "unlock":"aaaa_zp4adv:travel_to_everbright",
        "count":1,
        "dialogue":{
            "speaker":"Daluku",
            "message":"Entered Everbright. New adventures begin!",
            "renderType":"rectangle",
            "renderTarget":"medievalorigins:textures/item/high_elf.png"
        }
    }
}
//QUEST_DATA_END


const questList = Object.keys(QUESTS).map(key => ADV_PREFIX + key);

function getQuestIndex(questKey) {
    const index = questList.indexOf(questKey);
    return index === -1 ? -1 : index;
}

function getFirstKey(obj) {
    return Object.keys(obj)[0];
}

function getLastKey(obj) {
    const keys = Object.keys(obj);
    return keys[keys.length - 1];
}

const FIRST_QUEST = getFirstKey(QUESTS);
const LAST_QUEST = getLastKey(QUESTS);

// Add listen type and playe to check with if

function getPlayerQPDString(player, pd_field) {
    let pd_field_value = player.persistentData.getString(pd_field);
    if (pd_field_value) {
        return pd_field_value;
    }
    else {
        return undefined;
    }
}

function setPlayerQPDString(player, pd_field, pd_field_value) {
    player.persistentData.putString(pd_field, pd_field_value);
}

function getPlayerQPDInt(player, pd_field) {
    let pd_field_value = player.persistentData.getInt(pd_field);
    if (pd_field_value) {
        return pd_field_value;
    }
    else {
        return 0;
    }
}

function sendDialogueToPlayer(player, speaker, message, renderType, renderTarget) {
    let tag = new $CompoundTag();

    let dialogueData = {
        speaker: speaker,
        message: message,
        renderType: renderType,
        renderTarget: renderTarget
    };

    tag.putString('dialogueData', JSON.stringify(dialogueData));
    player.sendData('dialogue:chat', tag);
}

function setPlayerQPDInt(player, pd_field, pd_field_value) {
    player.persistentData.putInt(pd_field, pd_field_value);
}

function increasePlayerQuestProgress(player) {
    let newProgress = getPlayerQPDInt(player, ACTIVE_QUEST_PROGRESS_PD_FIELD) + 1;
    setPlayerQPDInt(player, ACTIVE_QUEST_PROGRESS_PD_FIELD, newProgress);
    return newProgress;
}

function setPlayerQuestProgress(player, progress) {
    setPlayerQPDInt(player, ACTIVE_QUEST_PROGRESS_PD_FIELD, progress);
}

function getPlayerQuestProgress(player) {
    return getPlayerQPDInt(player, ACTIVE_QUEST_PROGRESS_PD_FIELD);
}

function getPlayerProgression(player) {
    return getPlayerQPDInt(player, ACTIVE_QUEST_PROGRESS_PD_FIELD);
}

function getPlayerQuest(player) {
    return getPlayerQPDString(player, ACTIVE_QUEST_PD_FIELD);
}

function setPlayerQuest(player, quest) {
    setPlayerQPDString(player, ACTIVE_QUEST_PD_FIELD, quest);
    setPlayerQPDInt(player, ACTIVE_QUEST_PROGRESS_PD_FIELD, 0);
}

function sendPlayerQuestToTrack(player, advancementId) {
    let tag = new $CompoundTag;
    tag.putString('advancement_id', advancementId);
    player.sendData('advancements:track_id', tag);
}

function sendPlayerQuestsToTrack(player, advancementIds) {
    let tag = new $CompoundTag;
    tag.putString('advancement_ids', JSON.stringify(advancementIds));
    player.sendData('advancements:track_ids', tag);
}

function sendPlayerQuestToUntrack(player, advancementId) {
    let tag = new $CompoundTag;
    tag.putString('advancement_id', advancementId);
    player.sendData('advancements:untrack_id', tag);
}

function sendPlayerQuestsToUntrack(player, advancementIds) {
    let tag = new $CompoundTag;
    tag.putString('advancement_ids', JSON.stringify(advancementIds));
    player.sendData('advancements:untrack_ids', tag);
}

function sendPlayerQuestTrackData(player, toTrack, toUntrack) {
    let tag = new $CompoundTag();

    let trackingData = {
        toTrack: toTrack,
        toUntrack: toUntrack
    };

    tag.putString('trackingData', JSON.stringify(trackingData));
    player.sendData('advancements:track_untrack_ids', tag);
}


function doesQuestExist(questId) {
    return QUESTS.hasOwnProperty(questId);
}

function grantServerPlayerAdvancement(server, player, advancement_id) {
    server.runCommandSilent(`advancement grant ${player.getName().getString()} only ${advancement_id}`)
}

function revokeServerPlayerAdvancement(server, player, advancement_id) {
    server.runCommandSilent(`advancement revoke ${player.getName().getString()} only ${advancement_id}`)
}

PlayerEvents.loggedIn(event => {
    const { player, server } = event;

    grantServerPlayerAdvancement(server, player, 'minecraft:adventure/root');

    let activeQuest = getPlayerQuest(player);
    let activeQuestProgress = getPlayerProgression(player);

    if (activeQuest == undefined) {
        setPlayerQuest(player, FIRST_QUEST);
        sendPlayerQuestToTrack(player, QUESTS[FIRST_QUEST].unlock)
    }
    else {
        if (activeQuestProgress >= 0) {
            server.scheduleInTicks(100, () => {
                sendPlayerQuestToTrack(player, QUESTS[activeQuest].unlock)
            });
        }
    }

});

function fixWrongPlayerData(player, activeQuest) {
    if (!doesQuestExist(activeQuest) || activeQuest == undefined) {
        setPlayerQuest(player, FIRST_QUEST);
        return true;
    }
    return false;
}

//EVENT_TYPES
const ENTITY_EVENTS_DEATH = 0;
const ENTITY_EVENTS_HURT = 1;
const BLOCK_EVENTS_BROKEN = 2;
const BLOCK_EVENTS_PLACED = 3;
const PLAYER_EVENTS_INVENTORY_CHANGED = 4;
const PLAYER_EVENTS_ADVANCEMENT = 5;
const ITEM_EVENTS_PICKED_UP = 6;

function questEvent(event, eventType) {
    const { server } = event;
    let player = null;
    let eventEntity = null;

    if (event.player) {
        player = event.player;
    }
    else {
        if (event.source) {
            player = event.source.player;
        }
    }

    if (event.entity) {
        eventEntity = event.entity;
    }

    if (eventType == ENTITY_EVENTS_HURT) {
        if (event.source.getType() !== 'player') {
            return 0;
        }
        // player.tell("se duce in pl?")
        // if (event.entity.type != 'minecraft:player') {
        //     player.tell("da!")
        //     return 0;
        // }
    }


    // TODO: might be worth to cache these ones

    let activeQuest = getPlayerQuest(player);
    let activeQuestProgress = getPlayerProgression(player);

    // player.tell(activeQuest);
    // player.tell(activeQuestProgress);

    if (activeQuest && activeQuestProgress >= 0) {
        if (!doesQuestExist(activeQuest)) {
            setPlayerQuest(FIRST_QUEST);
            activeQuest = FIRST_QUEST;
            activeQuestProgress = 0;
        }

        let questData = QUESTS[activeQuest];
        let eventMatch = false;
        let advancementUnlocked = false;
        let increment = true;

        // player.tell(activeQuest);
        // player.tell(activeQuestProgress);

        if (
            activeQuestProgress >= 0 &&
            activeQuestProgress < questData.count &&
            (activeQuest !== LAST_QUEST || activeQuestProgress < questData.count)
        ) {

            // player.tell(eventType)

            if (eventType == PLAYER_EVENTS_INVENTORY_CHANGED) {
                let item = event.getItem();
                let item_id = item.item.getId();

                if (questData.type == 'obtain_item') {
                    if (questData.hasOwnProperty('match')) {
                        if (questData.match.mode == 'exact') {
                            if (item_id == questData.match.match_id) {
                                eventMatch = true;
                            }
                        }

                        if (questData.match.mode == 'nbt_data_includes') {
                            let compoundToMatch = questData.match.match_id;
                            let itemItem = event.getItem();
                            let compoundDataMatch = itemItem.nbt.getCompound(compoundToMatch);
                            let keysLen = Object.keys(compoundDataMatch).length;

                            if (compoundDataMatch && compoundDataMatch != {} && keysLen>0) {
                                if (questData.match.hasOwnProperty('sub_match')) {
                                    let sub_match_id = questData.match.sub_match.match_id;
                                    let sub_match_data = compoundDataMatch[sub_match_id];
                                    
                                    if(questData.match.sub_match.match == 'item_id_match'){
                                        if(item_id == sub_match_id){
                                            eventMatch = true;
                                        }
                                    }

                                    if (sub_match_data) {
                                        if (questData.match.sub_match.match == 'nbt_data_ge_count') {
                                            if (sub_match_data >= questData.count) {
                                                eventMatch = true;
                                            }
                                        }
                                    }
                                }
                                else {
                                    eventMatch = true;
                                }


                            }
                        }
                    }
                }
                // let itemItem = event.getItem();
                // let item_id = item.getId();
                // let isbSpells = item.nbt.getCompound('ZUpgradeData');

            }

            if (eventType == BLOCK_EVENTS_BROKEN) {
                if (questData.type == 'break_block') {
                    const { block } = event;
                    if (questData.hasOwnProperty('match')) {
                        if (questData.match.mode == 'endswith') {
                            if (block.id.endsWith(questData.match.match_id)) {
                                eventMatch = true;
                            }
                        }
                    }
                }
            }

            if (eventType == BLOCK_EVENTS_PLACED) {
                if (questData.type == 'place_block') {
                    const { block } = event;
                    if (questData.hasOwnProperty('match')) {
                        if (questData.match.mode == 'exact') {
                            if (block.id == questData.match.match_id) {
                                eventMatch = true;
                            }
                        }
                    }
                }
            }


            if (eventType == ENTITY_EVENTS_HURT) {
                if (questData.type == 'reach_level') {
                    if (questData.hasOwnProperty('match')) {
                        let skillToGet = questData.match.skill;
                        let playerSkillLevel = getPlayerSkill(player, skillToGet);
                        activeQuestProgress = playerSkillLevel;
                        setPlayerQuestProgress(player, playerSkillLevel);
                        eventMatch = true;
                        increment = false;
                    }
                }
            }


            if (eventType == ENTITY_EVENTS_DEATH) {
                // player.tell(activeQuestProgress);

                if (questData.type == 'kill') {
                    const { entity } = event;

                    if (questData.hasOwnProperty('match')) {
                        if (questData.match.mode == 'preset_entity_check') {
                            if (entity.getType() != 'minecraft:player') {

                                if (questData.match.match == 'hostile') {
                                    if (isEntityHostile(entity)) {
                                        eventMatch = true;
                                    }
                                }

                                if (questData.match.match == 'passive') {
                                    if (!isEntityHostile(entity)) {
                                        eventMatch = true;
                                    }
                                }

                                if (questData.match.match == 'boss') {
                                    if (isEMobBoss(entity)) {
                                        eventMatch = true;
                                    }
                                }
                            }

                        }
                    }
                }
            }

            if (eventType == PLAYER_EVENTS_ADVANCEMENT) {
                if (questData.type == 'obtain_item') {
                    const { advancement } = event;
                    let advancementId = advancement.getId().toString();

                    if (advancementId == questData.unlock) {
                        advancementUnlocked = true;
                        eventMatch = true;
                    }

                    // if match
                }

            }

            if (increment) {
                if (eventMatch && activeQuestProgress >= 0) {
                    activeQuestProgress = increasePlayerQuestProgress(player);

                    // TODO: better text on screen
                    // sendPlayerQuestToTrack(player, questData.unlock);
                }
            }


            // player.tell(`${activeQuestProgress}/${questData.count}`)

            if (activeQuestProgress >= questData.count) {
                if (!advancementUnlocked) {
                    grantServerPlayerAdvancement(server, player, questData.unlock);
                }

                if (questData.hasOwnProperty('next')) {
                    setPlayerQuest(player, questData.next);
                }
            }
        }
    }
    else {
        if (activeQuestProgress != -1) {
            fixWrongPlayerData(player, activeQuest);
        }
    }
}


EntityEvents.death(event => { questEvent(event, ENTITY_EVENTS_DEATH) });
EntityEvents.hurt(event => { questEvent(event, ENTITY_EVENTS_HURT) });
BlockEvents.broken(event => { questEvent(event, BLOCK_EVENTS_BROKEN) });
BlockEvents.placed(event => { questEvent(event, BLOCK_EVENTS_PLACED) });
PlayerEvents.inventoryChanged(event => { questEvent(event, PLAYER_EVENTS_INVENTORY_CHANGED) });
ItemEvents.pickedUp(event => { questEvent(event, ITEM_EVENTS_PICKED_UP) })


function matchQuestDataByAdvId(advancement_id) {
    for (const quest of Object.keys(QUESTS)) {
        let questData = QUESTS[quest];
        if (questData.unlock == advancement_id) {
            return questData;
        }
    }
    return null;
}

PlayerEvents.advancement(event => {
    const { player, advancement, server } = event;
    let advancementId = advancement.getId().toString();

    // let questIndex = getQuestIndex(advancementId);
    // if (questIndex >= 0) {
    //     let activeQuest = getPlayerQuest(player);
    //     if (questIndex > questList[getQuestIndex(`${ADV_PREFIX}${activeQuest}`)]) {
    //         event.cancel();
    //         return 0;
    //     }
    // }
    // questEvent(event, PLAYER_EVENTS_ADVANCEMENT)

    if (advancementId.includes(ADV_NAMESPACE)) {
        let questData = matchQuestDataByAdvId(advancementId);
        if (questData) {
            if (questData.next) {
                sendPlayerQuestToTrack(player, QUESTS[questData.next].unlock);
            }
            if (questData.hasOwnProperty('dialogue')) {
                sendDialogueToPlayer(player, questData.dialogue.speaker, questData.dialogue.message, questData.dialogue.renderType, questData.dialogue.renderTarget);
            }
        }
    }
});


// TODO: this is just for debug
ItemEvents.rightClicked('minecraft:stick', event => {
    const { player, server } = event;

    // let activeQuest = getPlayerQuest(player);
    // let activeQuestProgress = getPlayerProgression(player);
    // player.tell(activeQuest);
    // player.tell(activeQuestProgress);

    // sendPlayerQuestToTrack(player, QUESTS[activeQuest].unlock)


    // setPlayerQuestProgress(player, 9);
    // player.tell(FIRST_QUEST);

    let advIdsToUntrack = [];
    let advIdsToTrack = [QUESTS[FIRST_QUEST].unlock];

    for (const quest of Object.keys(QUESTS)) {
        let questData = QUESTS[quest];
        revokeServerPlayerAdvancement(server, player, questData.unlock);
        advIdsToUntrack.push(questData.unlock);
    }


    sendPlayerQuestTrackData(player, advIdsToTrack, advIdsToUntrack);
    setPlayerQuest(player, FIRST_QUEST);

    // setPlayerQuest(player, FIRST_QUEST);
    // sendPlayerQuestToTrack(player, QUESTS[FIRST_QUEST].unlock)
});

ItemEvents.rightClicked('minecraft:diamond', event => {
    const { player } = event;
    let tag = new $CompoundTag();
    let dialogueData = {
        'speaker': 'Daluku',
        'message': '50 enemies down! You\'re a warrior now.',
        'renderType': 'rectangle',
        'renderTarget': 'medievalorigins:textures/item/high_elf.png'
    };
    // let dialogueData = {
    //     speaker: "IonutuBoy",
    //     message: "La Multi Ani Renato, fututencur sa te astup de idiot bagamias pula in tine",
    //     renderType: 'item',
    //     renderTarget : 'minecraft:player_head'
    //     // renderTarget : 'minecraft:diamond_sword'
    // };
    // let dialogueData = {
    //     speaker: "Unknown Voice",
    //     message: "I’m drifting... somewhere out here. Systems failing. You need to survive. Find a way... rebuild...",
    //     renderType: 'atlas_texture',
    //     renderTarget : 'minecraft:block/lava_flow'
    // };
    tag.putString('dialogueData', JSON.stringify(dialogueData));
    player.sendData('dialogue:chat', tag);
});