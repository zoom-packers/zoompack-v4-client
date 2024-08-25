let PATCHULI_BOOK_ITEM_ID = 'patchouli:guide_book';
let PERFORMED_FIRST_JOIN_TAG = 'PERFORMED_FIRST_JOIN';

function playerHasTag(tags, searched_tag){
    let found = false;
    tags.forEach(tag => {
        if(tag.toString() === searched_tag){
            found = true;
        }
    });

    return found;
}

function performFirstJoinPlayerRemoveBook(server, player_name){
    server.runCommandSilent(`/clear ${player_name} ${PATCHULI_BOOK_ITEM_ID}`);
    server.runCommandSilent(`/tag ${player_name} add ${PERFORMED_FIRST_JOIN_TAG}`);
}

PlayerEvents.loggedIn(event => {
    let player = event.player;
    if(player!=null){
        let tags = event.player.tags;
        if(!playerHasTag(tags, PERFORMED_FIRST_JOIN_TAG)){
            let player_name = player.name.string;
            event.server.scheduleInTicks(40, callback => {
                performFirstJoinPlayerRemoveBook(event.server, player_name);
            });
        }
    }
});