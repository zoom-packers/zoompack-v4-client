let SECOND = 20;
let MINUTE = 60;
let HOUR = 60;
let CLEAR_LAG_TEXT_PREFIX = '§l§c[Clear Lag]§r§e';
let TIME_TEXT_PREFIX = '§a';

let cleaningTime = SECOND*MINUTE*30;
// let cleaningTime = SECOND*15;
let timer = 0;

let ANNOUNCE_TIMERS = [
    SECOND*MINUTE*20, SECOND*MINUTE*10, SECOND*MINUTE*5,
    SECOND*MINUTE*4, SECOND*MINUTE*3, SECOND*MINUTE*2,
    SECOND*MINUTE*1, 
    SECOND*30, SECOND*20, SECOND*10,
    SECOND*5, SECOND*4, SECOND*3, SECOND*2, SECOND*1
];

let DING_TIMERS = [SECOND*30, SECOND*10, SECOND*5, SECOND*4, SECOND*3, SECOND*2, SECOND*1]

function clearLag(server) {
    server.runCommandSilent('/kill @e[type=item]');
    server.runCommandSilent(`/execute at @a run playsound undergarden:item.slingshot.shoot hostile @p`);
}

function convert_ticks_to_human_readable_time(tick_amount) {
    let total_seconds = tick_amount / SECOND;
    let minutes = Math.floor(total_seconds / 60);
    let seconds = total_seconds % 60;
    if(minutes>0){
        return `${TIME_TEXT_PREFIX}${minutes}m ${seconds}s`;
    }
    else{
        return `${TIME_TEXT_PREFIX}${seconds}s`;
    }
}

function announce_next(server){
    let next_in = convert_ticks_to_human_readable_time(cleaningTime);
    server.runCommandSilent(`/tellraw @a "${CLEAR_LAG_TEXT_PREFIX} §2Items on the ground cleared!"`);
    server.runCommandSilent(`/tellraw @a "${CLEAR_LAG_TEXT_PREFIX} §2Next cleanup in ${next_in}"`);
}

function playDingSoundToAllPlayers(server) {
    server.runCommandSilent(`/execute at @a run playsound minecraft:block.note_block.pling hostile @p`);
}

function announce_players(server, delta) {
    let in_time = convert_ticks_to_human_readable_time(delta);
    if(DING_TIMERS.includes(delta)){
        playDingSoundToAllPlayers(server);
    }
    server.runCommandSilent(`/tellraw @a "${CLEAR_LAG_TEXT_PREFIX} Items on the ground will be cleared in ${in_time}"`);
}

ServerEvents.tick((event) => {
    timer++;
    if (timer > cleaningTime) {
        clearLag(event.server);
        timer = 0;
        announce_next(event.server);
    } else {
        for (let i = 0; i < ANNOUNCE_TIMERS.length; i++) {
            if (timer === cleaningTime - ANNOUNCE_TIMERS[i]) {
                announce_players(event.server, cleaningTime - timer);
                break;
            }
        }
    }
});
