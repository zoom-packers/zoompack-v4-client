const $CompoundTag = Java.loadClass('net.minecraft.nbt.CompoundTag')

// TODO: add progression announcement with text on screen
const ACTIVE_QUEST_PD_FIELD = 'ACTIVE_QUEST';
const ACTIVE_QUEST_PROGRESS_PD_FIELD = 'ACTIVE_QUEST_PROGRESS';
const FIRST_QUEST = '20logs';
const LAST_QUEST = '10enemies';
const QUESTS = {
    '20logs': {
        'type': 'brake_block',
        'match': {
            'mode': 'endswith',
            'match_id': '_log'
        },
        'unlock': 'aaaa_zp4adv:root',
        'count': 5,
        'dialogue': {
            'speaker': 'Daluku',
            'message': 'Very nice! now up to the next quest pesant!',
            'renderType': 'rectangle',
            'renderTarget': 'medievalorigins:textures/item/high_elf.png'
        },
        'next': '10enemies'
    },
    '10enemies': {
        'type': 'kill',
        'match': {
            'mode': 'preset_entity_check',
            'match': 'hostile'
        },
        'dialogue': {
            'speaker': 'Daluku',
            'message': 'Looks like you ended the game',
            'renderType': 'rectangle',
            'renderTarget': 'medievalorigins:textures/item/troll.png'
        },
        'unlock': 'aaaa_zp4adv:10enemies',
        'count': 3
    }
}

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

function setPlayerQuestProgress(player, progress){
    setPlayerQPDInt(player, ACTIVE_QUEST_PROGRESS_PD_FIELD, progress);
}

function getPlayerQuestProgress(player){
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
            sendPlayerQuestToTrack(player, QUESTS[activeQuest].unlock)
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

function questEvent(event) {
    const { server } = event;
    let player = null;

    if (event.player) {
        player = event.player;
    }
    else {
        if (event.source) {
            player = event.source.player;
        }
    }

    let activeQuest = getPlayerQuest(player);
    let activeQuestProgress = getPlayerProgression(player);

    if (activeQuest && activeQuestProgress >= 0) {
        if (!doesQuestExist(activeQuest)) {
            setPlayerQuest(FIRST_QUEST);
            activeQuest = FIRST_QUEST;
            activeQuestProgress = 0;
        }

        let questData = QUESTS[activeQuest];
        let eventMatch = false;

        if (questData.count > activeQuestProgress) {
            if (questData.type == 'brake_block') {
                const { block } = event;
                if (questData.hasOwnProperty('match')) {
                    if (questData.match.mode == 'endswith') {
                        if (block.id.endsWith(questData.match.match_id)) {
                            eventMatch = true;
                        }
                    }
                }
            }

            if (questData.type == 'kill') {
                const { entity } = event;
                if (questData.hasOwnProperty('match')) {
                    if (questData.match.mode == 'preset_entity_check') {
                        if (isEntityHostile(entity) && entity.getType() != 'minecraft:player') {
                            eventMatch = true;
                        }
                    }
                }
            }

            if (eventMatch && activeQuestProgress >= 0) {
                activeQuestProgress = increasePlayerQuestProgress(player);

                // TODO: better text on screen
                // sendPlayerQuestToTrack(player, questData.unlock);
            }

            // player.tell(`${activeQuestProgress}/${questData.count}`)

            if (activeQuestProgress >= questData.count) {
                grantServerPlayerAdvancement(server, player, questData.unlock);

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


EntityEvents.death(event => { questEvent(event) });
BlockEvents.broken(event => { questEvent(event) });

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

    if (advancementId.includes('aaaa_zp4adv')) {
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
    let advIdsToUntrack = [];
    let advIdsToTrack = [QUESTS[LAST_QUEST].unlock];

    for (const quest of Object.keys(QUESTS)) {
        let questData = QUESTS[quest];
        revokeServerPlayerAdvancement(server, player, questData.unlock);
        advIdsToUntrack.push(questData.unlock);
    }


    sendPlayerQuestTrackData(player, advIdsToTrack, advIdsToUntrack);
    setPlayerQuest(player, LAST_QUEST);

    // setPlayerQuest(player, FIRST_QUEST);
    // sendPlayerQuestToTrack(player, QUESTS[FIRST_QUEST].unlock)
});

// ItemEvents.rightClicked('minecraft:diamond', event => {
//     let tag = new $CompoundTag();
//     // let dialogueData = {
//     //     speaker: "Unknown Voice",
//     //     message: "I’m drifting... somewhere out here. Systems failing. You need to survive. Find a way... rebuild...",
//     //     renderType: 'item',
//     //     renderTarget : 'minecraft:diamond'
//     // };
//     let dialogueData = {
//         speaker: "IonutuBoy",
//         message: "La Multi Ani Renato",
//         renderType: 'rectangle',
//         renderTarget : 'medievalorigins:textures/item/high_elf.png'
//     };
//     // let dialogueData = {
//     //     speaker: "Unknown Voice",
//     //     message: "I’m drifting... somewhere out here. Systems failing. You need to survive. Find a way... rebuild...",
//     //     renderType: 'atlas_texture',
//     //     renderTarget : 'minecraft:block/lava_flow'
//     // };
//     tag.putString('dialogueData', JSON.stringify(dialogueData));
//     event.player.sendData('textTask', tag);
// });