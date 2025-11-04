PlayerEvents.tick(event => {
    const player = event.player;
    if(isNaN(player.getAbsorptionAmount())){
        player.setAbsorptionAmount(0);
    }
});
