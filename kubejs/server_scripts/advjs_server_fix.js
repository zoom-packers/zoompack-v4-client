AdvJSEvents.advancement(event => {
    event.remove("irons_spellbooks:grant_patchouli");
    // Add party here too [Better Togather]
});

const ACTIVE_QUEST_PD_FIELD = 'ACTIVE_QUEST';

const QUESTS = {
    '5logs' : {
        'type' : 'brake_block',
        'match' : {
            'mode' : 'endswith',
            'match_id' : '_log'
        },
        'unlock' : 'aaaa_zp4adv:root',
        'count' : 20
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

function getPlayerQuest(player){
    return getPlayerQPDString(player, ACTIVE_QUEST_PD_FIELD)
}

function sendPlayerQuestToTrack(player, advancementId){
    let tag = new $CompoundTag;
	tag.putString('advancement_id', advancementId)
	player.sendData('advancements:track_id', tag)
}

function sendPlayerQuestToUntrack(player, advancementId){
    let tag = new $CompoundTag;
	tag.putString('advancement_id', advancementId)
	player.sendData('advancements:untrack_id', tag)
}

BlockEvents.broken(event => {
    const { block, player } = event;
    
    
    //check if player is active listening on a quest // use persistent data
    // Check if quest listened to is blockevent.broken type

    // if(block.id.endsWith("_log")){
    //     player.tell(block.id);
    // }

})
