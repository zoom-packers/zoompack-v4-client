//priority: 851
const $CompoundTag = Java.loadClass('net.minecraft.nbt.CompoundTag')

// TODO: add progression announcement with text on screen
const ACTIVE_QUEST_PD_FIELD = 'ACTIVE_QUEST';
const ACTIVE_QUEST_PROGRESS_PD_FIELD = 'ACTIVE_QUEST_PROGRESS';
const ADV_NAMESPACE = "aaaa_zp4adv";
const TWO_DOTS = ":";
const ADV_PREFIX = `${ADV_NAMESPACE}${TWO_DOTS}`;

//QUEST_DATA_START
const QUESTS = {
    "locate_ancient_city":{
        "type":"adv_unlock",
        "match":{
            "mode":"exact",
            "match_id":"aaaa_zp4adv:minecraft_ancient_city_trigger"
        },
        "reward":[
            10,
            0,
            0,
            0,
            0
        ],
        "unlock":"aaaa_zp4adv:locate_ancient_city",
        "count":1,
        "dialogue":{
            "speaker":"Elder Librarian",
            "message":"Fantastic, now make some noise to wake up the fallen.",
            "renderType":"rectangle",
            "renderTarget":"zoompack_images:textures/elder_librarian/overworld.png"
        },
        "next":"defeat_the_warden"
    },
    "defeat_the_warden":{
        "type":"kill",
        "match":{
            "mode":"exact",
            "match":"minecraft:warden"
        },
        "reward":[
            10,
            0,
            0,
            0,
            0
        ],
        "unlock":"aaaa_zp4adv:defeat_the_warden",
        "count":1,
        "dialogue":{
            "speaker":"Elder Librarian",
            "message":"Astonishing! Check the loot bag, you can get an arc from him that can turn you invisible! Remember, you could get a better one from the enemy",
            "renderType":"rectangle",
            "renderTarget":"zoompack_images:textures/elder_librarian/overworld.png"
        },
        "next":"get_depth_key"
    },
    "get_depth_key":{
        "type":"obtain_item",
        "match":{
            "mode":"exact",
            "match_id":"callfromthedepth_:depth"
        },
        "reward":[
            10,
            0,
            0,
            0,
            0
        ],
        "unlock":"aaaa_zp4adv:get_depth_key",
        "count":1,
        "dialogue":{
            "speaker":"Elder Librarian",
            "message":"Great! Now See that massive rectangle? That`s the portal!",
            "renderType":"rectangle",
            "renderTarget":"zoompack_images:textures/elder_librarian/overworld.png"
        },
        "next":"travel_to_depth"
    },
    "travel_to_depth":{
        "type":"adv_unlock",
        "match":{
            "mode":"exact",
            "match_id":"aaaa_zp4adv:callfromthedepth__depth_trigger"
        },
        "reward":[
            10,
            0,
            0,
            0,
            0
        ],
        "unlock":"aaaa_zp4adv:travel_to_depth",
        "count":1,
        "dialogue":{
            "speaker":"Elder Librarian",
            "message":"Welcome to the Depth. This realm is anything but friendly. You might need new gear to see better around.",
            "renderType":"rectangle",
            "renderTarget":"zoompack_images:textures/elder_librarian/depth.png"
        },
        "delayNext":200,
        "next":"50enemies_depth"
    },
    "50enemies_depth":{
        "type":"kill",
        "match":{
            "mode":"preset_entity_check",
            "match":"hostile",
            "dimension_match":"callfromthedepth_:depth"
        },
        "reward":[
            10,
            0,
            0,
            0,
            0
        ],
        "unlock":"aaaa_zp4adv:50enemies_depth",
        "count":50,
        "dialogue":{
            "speaker":"Elder Librarian",
            "message":"Great job! Now it`s time to loot around. What did we gathered?",
            "renderType":"rectangle",
            "renderTarget":"zoompack_images:textures/elder_librarian/depth.png"
        },
        "next":"get_agony_soul"
    },
    "get_agony_soul":{
        "type":"obtain_item",
        "match":{
            "mode":"exact",
            "match_id":"callfromthedepth_:soulinagony"
        },
        "reward":[
            10,
            0,
            0,
            0,
            0
        ],
        "unlock":"aaaa_zp4adv:get_agony_soul",
        "count":1,
        "dialogue":{
            "speaker":"Elder Librarian",
            "message":"Perfect! Now use it on the Stone of Sacrificial to revive the Agony Soul",
            "renderType":"rectangle",
            "renderTarget":"zoompack_images:textures/elder_librarian/depth.png"
        },
        "next":"defeat_agony_soul"
    },
    "defeat_agony_soul":{
        "type":"kill",
        "match":{
            "mode":"exact",
            "match":"callfromthedepth_:agonysoul"
        },
        "reward":[
            10,
            0,
            0,
            0,
            0
        ],
        "unlock":"aaaa_zp4adv:defeat_agony_soul",
        "count":1,
        "dialogue":{
            "speaker":"Elder Librarian",
            "message":"Good job! Use the lotted gear to become stronger!",
            "renderType":"rectangle",
            "renderTarget":"zoompack_images:textures/elder_librarian/depth.png"
        },
        "next":"83combatlvl"
    },
    "83combatlvl":{
        "type":"reach_level",
        "match":{
            "mode":"check_level",
            "skill":"combat"
        },
        "reward":[
            10,
            0,
            0,
            0,
            0
        ],
        "unlock":"aaaa_zp4adv:83combatlvl",
        "count":83,
        "dialogue":{
            "speaker":"Elder Librarian",
            "message":"Your combat skills are improving. Keep it up!",
            "renderType":"rectangle",
            "renderTarget":"zoompack_images:textures/elder_librarian/depth.png"
        },
        "next":"locate_marble_forge"
    },
    "locate_marble_forge":{
        "type":"adv_unlock",
        "match":{
            "mode":"exact",
            "match_id":"aaaa_zp4adv:callfromthedepth__marblesoulforge_trigger"
        },
        "reward":[
            10,
            0,
            0,
            0,
            0
        ],
        "unlock":"aaaa_zp4adv:locate_marble_forge",
        "count":1,
        "dialogue":{
            "speaker":"Elder Librarian",
            "message":"Good job! Now we can need to get the Weeping Soul to ressurect the Injured Marble Guard",
            "renderType":"rectangle",
            "renderTarget":"zoompack_images:textures/elder_librarian/depth.png"
        },
        "next":"get_weeping_soul"
    },
    "get_weeping_soul":{
        "type":"obtain_item",
        "match":{
            "mode":"exact",
            "match_id":"callfromthedepth_:weepingsoul"
        },
        "reward":[
            10,
            0,
            0,
            0,
            0
        ],
        "unlock":"aaaa_zp4adv:get_weeping_soul",
        "count":1,
        "dialogue":{
            "speaker":"Elder Librarian",
            "message":"Perfect! Now use it on the Stone of Sacrificial to revive the Injured Marble Guardian",
            "renderType":"rectangle",
            "renderTarget":"zoompack_images:textures/elder_librarian/depth.png"
        },
        "next":"defeat_injured_marble_guardian"
    },
    "defeat_injured_marble_guardian":{
        "type":"kill",
        "match":{
            "mode":"exact",
            "match":"callfromthedepth_:injuredmarbleguard"
        },
        "reward":[
            10,
            0,
            0,
            0,
            0
        ],
        "unlock":"aaaa_zp4adv:defeat_injured_marble_guardian",
        "count":1,
        "dialogue":{
            "speaker":"Elder Librarian",
            "message":"Good job! Use the lotted gear to become stronger!",
            "renderType":"rectangle",
            "renderTarget":"zoompack_images:textures/elder_librarian/depth.png"
        },
        "next":"86combatlvl"
    },
    "86combatlvl":{
        "type":"reach_level",
        "match":{
            "mode":"check_level",
            "skill":"combat"
        },
        "reward":[
            10,
            0,
            0,
            0,
            0
        ],
        "unlock":"aaaa_zp4adv:86combatlvl",
        "count":86,
        "dialogue":{
            "speaker":"Elder Librarian",
            "message":"Your combat skills are improving. Keep it up!",
            "renderType":"rectangle",
            "renderTarget":"zoompack_images:textures/elder_librarian/depth.png"
        },
        "next":"locate_deep_darkest_altar"
    },
    "locate_deep_darkest_altar":{
        "type":"adv_unlock",
        "match":{
            "mode":"exact",
            "match_id":"aaaa_zp4adv:callfromthedepth__deepdarkestaltar_trigger"
        },
        "reward":[
            10,
            0,
            0,
            0,
            0
        ],
        "unlock":"aaaa_zp4adv:locate_deep_darkest_altar",
        "count":1,
        "dialogue":{
            "speaker":"Elder Librarian",
            "message":"Good job! Now we can need to get the Deadblind Soul to ressurect the Deep Darkest Spawn.",
            "renderType":"rectangle",
            "renderTarget":"zoompack_images:textures/elder_librarian/depth.png"
        },
        "next":"get_deadblind_soul"
    },
    "get_deadblind_soul":{
        "type":"obtain_item",
        "match":{
            "mode":"exact",
            "match_id":"callfromthedepth_:deadblindsoul"
        },
        "reward":[
            10,
            0,
            0,
            0,
            0
        ],
        "unlock":"aaaa_zp4adv:get_deadblind_soul",
        "count":1,
        "dialogue":{
            "speaker":"Elder Librarian",
            "message":"Perfect! Now use it on the Stone of Sacrificial to revive the Deep Darkest Spawn",
            "renderType":"rectangle",
            "renderTarget":"zoompack_images:textures/elder_librarian/depth.png"
        },
        "next":"defeat_depp_darkest_spawn"
    },
    "defeat_depp_darkest_spawn":{
        "type":"kill",
        "match":{
            "mode":"exact",
            "match":"callfromthedepth_:deepdarkestspwansecondphase"
        },
        "reward":[
            10,
            0,
            0,
            0,
            0
        ],
        "unlock":"aaaa_zp4adv:defeat_depp_darkest_spawn",
        "count":1,
        "dialogue":{
            "speaker":"Elder Librarian",
            "message":"Good job! Use the lotted gear to become stronger!",
            "renderType":"rectangle",
            "renderTarget":"zoompack_images:textures/elder_librarian/depth.png"
        },
        "next":"100enemies_depth"
    },
    "100enemies_depth":{
        "type":"kill",
        "match":{
            "mode":"preset_entity_check",
            "match":"hostile",
            "dimension_match":"callfromthedepth_:depth"
        },
        "reward":[
            10,
            0,
            0,
            0,
            0
        ],
        "unlock":"aaaa_zp4adv:100enemies_depth",
        "count":100,
        "dialogue":{
            "speaker":"Elder Librarian",
            "message":"Great job! Now it`s time to loot around. What did we gathered?",
            "renderType":"rectangle",
            "renderTarget":"zoompack_images:textures/elder_librarian/depth.png"
        },
        "next":"90combatlvl"
    },
    "90combatlvl":{
        "type":"reach_level",
        "match":{
            "mode":"check_level",
            "skill":"combat"
        },
        "reward":[
            10,
            0,
            0,
            0,
            0
        ],
        "unlock":"aaaa_zp4adv:90combatlvl",
        "count":90,
        "dialogue":{
            "speaker":"Elder Librarian",
            "message":"Your combat skills are improving. Keep it up!",
            "renderType":"rectangle",
            "renderTarget":"zoompack_images:textures/elder_librarian/depth.png"
        },
        "next":"travel_depth_to_overworld"
    },
    "travel_depth_to_overworld":{
        "type":"adv_unlock",
        "match":{
            "mode":"exact",
            "match_id":"aaaa_zp4adv:minecraft_overworld_trigger"
        },
        "reward":[
            10,
            0,
            0,
            0,
            0
        ],
        "unlock":"aaaa_zp4adv:travel_depth_to_overworld",
        "count":1,
        "dialogue":{
            "speaker":"Elder Librarian",
            "message":"Welcome back home, but adventure continues. There is one more obscure place to visit.",
            "renderType":"rectangle",
            "renderTarget":"zoompack_images:textures/elder_librarian/overworld.png"
        },
        "delayNext":200
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

const lastQuestUpdate = {};
const PROGRESS_DELAY = 1.5;
const PROGRESS_DELAY_TIME = PROGRESS_DELAY*1000;

function playerQuestProgress(server, player, current, maxQuestProgress) {
    const now = Date.now();
    const playerName = player.name.string;

    const lastTime = lastQuestUpdate[playerName] || 0;
    

    if (now - lastTime < PROGRESS_DELAY_TIME) return;

    lastQuestUpdate[playerName] = now;

    server.runCommandSilent(
        `/immersivemessages sendcustom ${playerName} {anchor:"CENTER_CENTER", background:1, y:50} ${PROGRESS_DELAY} Quest Progress: ${current}/${maxQuestProgress}`
    );
}

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

    if (!player) {
        return 0;
    }

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

            if (eventType == PLAYER_EVENTS_ADVANCEMENT) {
                const { advancement } = event;
                let advancementId = advancement.getId().toString();

                if (questData.type == 'adv_unlock') {
                    if (questData.hasOwnProperty('match')) {
                        if (questData.match.mode == 'exact') {
                            if (questData.match.match_id == advancementId) {
                                eventMatch = true;
                            }
                        }


                        if (questData.match.mode == 'any') {
                            if (questData.match.hasOwnProperty('match_ids')) {
                                if (questData.match.match_ids.includes(advancementId)) {
                                    eventMatch = true;
                                }
                            }
                        }

                        if (questData.match.hasOwnProperty('revoke')) {
                            if (questData.match.revoke) {
                                revokeServerPlayerAdvancement(server, player, advancementId);
                            }
                        }
                    }
                }
            }

            if (eventType == PLAYER_EVENTS_INVENTORY_CHANGED) {
                let item = event.getItem();
                let item_id = item.item.getId();

                if (questData.type == 'obtain_item') {
                    if (questData.hasOwnProperty('match')) {
                        if (questData.match.mode == 'exact') {
                            if (item_id == questData.match.match_id) {
                                if (questData.count > 1) {
                                    setPlayerQuestProgress(player, item.getCount());
                                    eventMatch = true;
                                }
                                else {
                                    eventMatch = true;
                                }
                            }
                        }
                        
                        if (questData.match.mode == 'endswith') {
                            if(item_id.endsWith(questData.match.match_id)){
                                eventMatch = true;
                            }
                        }
                        
                        if (questData.match.mode == 'startswith') {
                            if(item_id.startsWith(questData.match.match_id)){
                                eventMatch = true;
                            }
                        }

                        if (questData.match.mode == 'nbt_data_includes') {
                            let compoundToMatch = questData.match.match_id;
                            let itemItem = event.getItem();
                            let compoundDataMatch = itemItem.nbt.getCompound(compoundToMatch);
                            let keysLen = Object.keys(compoundDataMatch).length;

                            if (compoundDataMatch && compoundDataMatch != {} && keysLen > 0) {
                                if (questData.match.hasOwnProperty('sub_match')) {
                                    let sub_match_id = questData.match.sub_match.match_id;
                                    let sub_match_data = compoundDataMatch[sub_match_id];

                                    if (questData.match.sub_match.match == 'item_id_match') {
                                        if (item_id == sub_match_id) {
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
                        if (questData.match.mode == 'startswith') {
                            if (block.id.startsWith(questData.match.match_id)) {
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
                        if (questData.match.mode == 'any') {
                            for(const match_id of questData.match.match_ids){
                                if(match_id == block.id){
                                    eventMatch = true;
                                    break;
                                }
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

                    if (entity.getType() != 'minecraft:player') {
                        let dimensionOk = true;

                        if (questData.hasOwnProperty('match')) {
                            if (questData.match.hasOwnProperty('dimension_match')) {
                                dimensionOk = entity.level.dimension.toString() == questData.match.dimension_match;
                            }

                            if (questData.match.mode == 'preset_entity_check') {


                                if (questData.match.match == 'hostile' && dimensionOk) {
                                    if (isEntityHostile(entity)) {
                                        eventMatch = true;
                                    }
                                }

                                if (questData.match.match == 'passive' && dimensionOk) {
                                    if (!isEntityHostile(entity)) {
                                        eventMatch = true;
                                    }
                                }

                                if (questData.match.match == 'boss' && dimensionOk) {
                                    if (isEMobBoss(entity)) {
                                        eventMatch = true;
                                    }
                                }


                            }

                            if (questData.match.mode == 'exact') {
                                if(questData.match.hasOwnProperty('match')){
                                    if(questData.match.match == entity.getType()){
                                        eventMatch = true;
                                    }
                                }
                            }
                        }

                    }
                }
            }

            // if (eventType == PLAYER_EVENTS_ADVANCEMENT) {
            //     if (questData.type == 'obtain_item') {
            //         const { advancement } = event;
            //         let advancementId = advancement.getId().toString();

            //         if (advancementId == questData.unlock) {
            //             advancementUnlocked = true;
            //             eventMatch = true;
            //         }

            //         // if match
            //     }

            // }

            if (increment) {
                if (eventMatch && activeQuestProgress >= 0) {
                    activeQuestProgress = increasePlayerQuestProgress(player);
                    if(activeQuestProgress<questData.count){
                        playerQuestProgress(server, player, activeQuestProgress, questData.count)
                    }
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

//INSTA_REVOKE_DATA_START
const INSTA_REVOKE_ADVS_PY = ["aaaa_zp4adv:minecraft_ancient_city_trigger", "aaaa_zp4adv:callfromthedepth__depth_trigger", "aaaa_zp4adv:callfromthedepth__marblesoulforge_trigger", "aaaa_zp4adv:callfromthedepth__deepdarkestaltar_trigger", "aaaa_zp4adv:minecraft_overworld_trigger"]
//INSTA_REVOKE_DATA_END

// const INSTA_REVOKE_ADVS = ['aaaa_zp4adv:win_raid_loop'].concat(INSTA_REVOKE_ADVS_PY);
const INSTA_REVOKE_ADVS = [].concat(INSTA_REVOKE_ADVS_PY);


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
    questEvent(event, PLAYER_EVENTS_ADVANCEMENT);

    if (advancementId.includes(ADV_NAMESPACE)) {
        if (INSTA_REVOKE_ADVS.includes(advancementId)) {
            revokeServerPlayerAdvancement(server, player, advancementId);
        }
        else {

            let questData = matchQuestDataByAdvId(advancementId);
            if (questData) {
                if (questData.next) {
                    grantQuestReward(questData.reward, player, server);
                    if (questData.hasOwnProperty('delayNext')) {
                        server.scheduleInTicks(questData.delayNext, callback => {
                            sendPlayerQuestToTrack(player, QUESTS[questData.next].unlock);
                        });
                    }
                    else {
                        sendPlayerQuestToTrack(player, QUESTS[questData.next].unlock);
                    }


                }
                if (questData.hasOwnProperty('dialogue')) {
                    sendDialogueToPlayer(player, questData.dialogue.speaker, questData.dialogue.message, questData.dialogue.renderType, questData.dialogue.renderTarget);
                }
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