const DMG_TOGGLE_PD_FIELD = 'DamageToggle';

// Get damage toggle state (1 = enabled, 0 = disabled), default to 1 (ENABLED)
function getDamageTogglePD(player, pd_field) {
    const value = player.persistentData.getInt(pd_field);
    if (value === undefined || value === null) {
        player.persistentData.putInt(pd_field, 1); // Default: damage ON
        return 1;
    }
    return value;
}

// Set damage toggle state
function setDamageTogglePD(player, pd_field, value) {
    player.persistentData.putInt(pd_field, value);
}

// Cancel damage if player has toggle disabled
EntityEvents.hurt(event => {
    const { entity, source } = event;

    if (!source?.player) return; // Only care about player-caused damage

    const player = source.player;
    if (getDamageTogglePD(player, DMG_TOGGLE_PD_FIELD) === 0) {
        event.cancel();
    }
});

// Command to toggle damage dealing
ServerEvents.commandRegistry(event => {
    const { commands: Commands } = event;

    event.register(
        Commands.literal('toggle_damage')
            .executes(c => {
                const player = c.source.player;
                if (!player) return 0;

                const current = getDamageTogglePD(player, DMG_TOGGLE_PD_FIELD);
                const newState = current === 1 ? 0 : 1;

                setDamageTogglePD(player, DMG_TOGGLE_PD_FIELD, newState);

                const status = newState === 1 ? '§aENABLED' : '§cDISABLED';
                player.tell(`§eDamage dealing: §l${status}§r§e!`);

                return 1;
            })
    );
});