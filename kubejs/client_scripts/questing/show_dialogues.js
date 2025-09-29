PlayerEvents.tick(event => {
    const player = event.player;
    if (player.getPersistentData().contains("DialogueSpeaker")) {
        let dialogueData = player.getPersistentData().get("DialogueSpeaker");
        printDialogueOverlay(player, dialogueData.speaker, dialogueData.message, dialogueData.renderType, dialogueData.renderTarget);
    } else {
        event.player.paint({'*': {remove: true}});
    }
});

NetworkEvents.dataReceived('dialogue:chat', event => {
    const {entity, data, level, player} = event;
    let dialogueData = JSON.parse(data.getString('dialogueData'));
    console.log(dialogueData);
    BeginDialogue(player, dialogueData.speaker, dialogueData.message, dialogueData.renderType, dialogueData.renderTarget);
});

function BeginDialogue(player, speaker, message, renderType, renderTarget) {
    if (player.persistentData.contains('DialogueSpeaker')) {
        player.persistentData.remove('DialogueAnimation');
        player.persistentData.remove('DialogueSpeaker');
        return;
    }
    player.persistentData.put('DialogueSpeaker', {speaker: speaker, message: message, renderType:renderType, renderTarget:renderTarget});
    player.persistentData.put('DialogueAnimation', [0, -100, 0, 0]);
}