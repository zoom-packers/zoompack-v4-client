let TESTER_MAP = {
    'qxZap' : 2,
    'Pandaismyname1' : 2,
    'MihaiAleXD' : 6,
    'Skydrake' : 5,
    'Rp__YT' : 5,
    'TommyTonny' : 5,
    'GeniusM' : 7,
    'LikeInReal' : 2,
    'Shtratulation' : 1
};

// Emi: 2 points (ISS-01, ISS-03)
// Mihai: 6 points (ISS-02, ISS-06, ISS-30, ISS-31, ISS-33, ISS-34)
// Milea: 2 points (ISS-04, ISS-11)
// Marius: 5 points (ISS-05, ISS-09, ISS-10, ISS-19, ISS-20)
// RP: 5 points (ISS-07, ISS-08, ISS-24, ISS-26)
// Tommy: 5 points (ISS-11, ISS-12, ISS-13, ISS-14, ISS-27)
// Paul: 7 points (ISS-15, ISS-16, ISS-17, ISS-18, ISS-25, ISS-28, ISS-32)
// Edi: 2 points (ISS-21, ISS-22)
// Decebal: 1 point (ISS-23) >>not added yet
// Madalin: 1 point (ISS-29)
// 24/09/2024
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