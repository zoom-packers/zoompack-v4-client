let TESTER_MAP = {
    'qxZap' : 1
};
// TODO: change points for each for release

let TESTER_REWARDS_TAG = 'TESTER_REWARDED_AUTO_FEATURES';

function playerHasTag(tags, searched_tag){
    let found = false;
    tags.forEach(tag => {
        if(tag.toString() === searched_tag){
            found = true;
        }
    });

    return found;
}

function performFirstJoinTesterGrantPoints(server, player_name, points){
    server.runCommandSilent(`/puffish_skills category unlock ${player_name} puffish_skills:secret_tester`);
    server.runCommandSilent(`/puffish_skills points set ${player_name} puffish_skills:secret_tester ${points}`);
    server.runCommandSilent(`/tag ${player_name} add ${TESTER_REWARDS_TAG}`);
}

PlayerEvents.loggedIn(event => {
    let player = event.player;
    if(player!=null){
        let tags = event.player.tags;
        let player_name = player.name.string;
        if(player_name in TESTER_MAP){
            if(!playerHasTag(tags, TESTER_REWARDS_TAG)){
                event.server.scheduleInTicks(40, callback => {
                    performFirstJoinTesterGrantPoints(event.server, player_name, TESTER_MAP[player_name]);
                });
            }
        }   
    }
});