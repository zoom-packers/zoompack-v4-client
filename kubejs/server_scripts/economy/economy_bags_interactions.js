

ItemEvents.rightClicked(event => {
    let player = event.player;
    let server = event.server;
    let player_name = player.name.string;
    let mainHandItemID = player.mainHandItem.item.getId();

    if(mainHandItemID == 'zoomers_economy:gatekeeper_bag'){
        server.runCommandSilent(`/clear ${player_name} zoomers_economy:gatekeeper_bag 1`);
        server.runCommandSilent(`/loot give ${player_name} loot zoompack_economy:maps/gatekeeper_map`);
        event.cancel();
    }
});