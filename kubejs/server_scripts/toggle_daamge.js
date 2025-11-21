const DMG_TOGGLE_PD_FIELD = 'DamageTogglePD';

function getDamageTogglePD(player, pd_field) {
    let value = player.persistentData.getInt(pd_field);
    if (value === 0 || value === 1) return value;
    player.persistentData.putInt(pd_field, 1);
    return 1;
}

function setDamageTogglePD(player, pd_field, value) {
    player.persistentData.putInt(pd_field, value);
}

EntityEvents.hurt(event => {
    const { entity, source } = event;
    if (!source?.player) return;
    const player = source.player;
    if (getDamageTogglePD(player, DMG_TOGGLE_PD_FIELD) === 1) {
        event.cancel();
    }
});

ServerEvents.commandRegistry(event => {
    const { commands: Commands } = event;
    event.register(
        Commands.literal('toggle_damage')
            .executes(c => {
                const player = c.source.player;
                if (!player) return 0;
                const current = getDamageTogglePD(player, DMG_TOGGLE_PD_FIELD);
                const newState = current === 0 ? 1 : 0;
                setDamageTogglePD(player, DMG_TOGGLE_PD_FIELD, newState);
                const status = newState === 0 ? '§aENABLED' : '§cDISABLED';
                player.tell(`§eDamage dealing: §l${status}§r§e!`);
                return 1;
            })
    );
});
