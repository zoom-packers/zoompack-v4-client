function tpPlayer(server, dimension, player_name, x, y, z){
    server.runCommandSilent(`execute in ${dimension} run tp ${player_name} ${x} ${y} ${z}`);
}

function playerBlockSpellMessage(server, player_name){
    const title_config = `/title ${player_name} times 20 40 20`;
    const message = `/title ${player_name} title {"text":"Something is preventing you from using this spell!","italic":true,"color":"red"}`;
    server.runCommandSilent(title_config);
    server.runCommandSilent(message);
}

PlayerEvents.spellOnCast(event => {
    let spellId = event.getSpellId();
    if (spellId == "irons_spellbooks:recall") {

        const {player} = event;
        let player_name = player.name.string;
        let server = event.server;

        if(player.respawnPosition) {
            const {SpawnDimension} = player.nbt || 'minecraft:overworld';
            const {x, y, z} = player.respawnPosition;
            tpPlayer(server, SpawnDimension, player_name,x,y,z);
        }
        else {
            const {level} = event;
            const {x, y, z} = level.getSharedSpawnPos();
            tpPlayer(server, 'minecraft:overworld', player_name,x,y,z);
        }

        event.cancel();
    };
})

PlayerEvents.spellPreCast(event => {
    let spellId = event.getSpellId();
    let server = event.server;
    const {player} = event;
    let player_name = player.name.string;
    let bannedSpells = ['irons_spellbooks:frost_step', 'irons_spellbooks:teleport', 'irons_spellbooks:blood_step', 'irons_spellbooks:teleport', 'irons_spellbooks:cloud_of_regeneration', 'irons_spellbooks:thunderstorm', 'irons_spellbooks:black_hole', 'irons_spellbooks:spectral_hammer']

    if(bannedSpells.includes(spellId)){
        playerBlockSpellMessage(server, player_name)
        event.cancel();
    }
});
