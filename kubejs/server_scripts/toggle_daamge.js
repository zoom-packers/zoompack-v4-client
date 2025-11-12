const DMG_TOGGLE_PD_FIELD = 'DamageToggle';

function getDamageTogglePD(player, pd_field) {
    let pd_field_value = player.persistentData.getInt(pd_field);
    if (pd_field_value !== undefined) {
        return pd_field_value;
    }
    else {
        player.persistentData.putInt(pd_field, 1);  // Default: ENABLED (1)
        return 1;
    }
}

function setDamageTogglePD(player, pd_field, value) {
    player.persistentData.putInt(pd_field, value);
}

EntityEvents.hurt(event => {
    const { entity, source } = event;
    let playerSource = null;

    if (source?.player) {
        playerSource = source.player;
    }

    // If player has damage toggle DISABLED (0), cancel their damage
    if (playerSource && getDamageTogglePD(playerSource, DMG_TOGGLE_PD_FIELD) === 0) {
        event.cancel();
        return;
    }
});

ServerEvents.commandRegistry((event) => {
    const { commands: Commands, arguments: Arguments } = event;
    event.register(
        Commands.literal("toggle_damage").executes((c) => {
            const player = c.source.player;
            const currentToggle = getDamageTogglePD(player, DMG_TOGGLE_PD_FIELD);
            const newToggle = currentToggle === 1 ? 0 : 1;  // Flip 1<->0
            
            setDamageTogglePD(player, DMG_TOGGLE_PD_FIELD, newToggle);
            
            const status = newToggle === 1 ? "§aENABLED" : "§cDISABLED";
            player.tell(`§eDamage toggle: §l${status}§r§e!`);
            
            return 1;
        })
    );
});