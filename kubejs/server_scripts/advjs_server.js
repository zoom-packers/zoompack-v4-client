AdvJSEvents.advancement(event => {
    event.remove("irons_spellbooks:grant_patchouli");
});

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

PlayerEvents.inventoryChanged(event => {
    let item_id = event.item.getItem().getId();
    let player = event.player;
    if(player!=null){
        if(item_id === PATCHULI_BOOK_ITEM_ID){
            let player_name = player.name.string;
            let tags = event.player.tags;
            if(!playerHasTag(tags, PERFORMED_FIRST_JOIN_TAG)){
                event.server.runCommandSilent(`/clear ${player_name} ${PATCHULI_BOOK_ITEM_ID}`);
                event.server.runCommandSilent(`/tag ${player_name} add ${PERFORMED_FIRST_JOIN_TAG}`);
            }
        }
    }
});
