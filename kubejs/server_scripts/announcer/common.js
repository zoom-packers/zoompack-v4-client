function playDingSoundToAllPlayers(server) {
    server.runCommandSilent(`/execute at @a run playsound minecraft:block.note_block.pling hostile @p`);
}

function announce_players(server, delta, text) {
    let in_time = convert_ticks_to_human_readable_time(delta);
    if(DING_TIMERS.includes(delta)){
        playDingSoundToAllPlayers(server);
    }
    server.runCommandSilent(`/tellraw @a "${text}`);
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


// ServerEvents.tick((event) => {
//     announcerTimer++;
//     for (let i = 0; i < ANNOUNCE_TIMERS.length; i++) {
//         if (announcerTimer === cleaningTime - ANNOUNCE_TIMERS[i]) {
//             announce_players(event.server, cleaningTime - announcerTimer);
//             break;
//         }
//     }
// });
