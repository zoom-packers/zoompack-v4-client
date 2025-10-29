const MAGIC_XP_CDR_BOOST_LOOP = 80;
const CDR_UUID = "3a476c50-e4e2-4052-acf9-390634dd7d25";
const CDR_ATTR_ID = "irons_spellbooks:cooldown_reduction";
const CDR_OPERATION = "multiply_base";
const CDR_PER_LEVEL = 0.01;
let MagicPmmoAPIUtils = Java.loadClass('harmonised.pmmo.api.APIUtils');

function calculateCDRMultiplier(magicLevel) {
    magicLevel = Math.max(0, Math.min(90, magicLevel));
    let value = Math.max(0, 1.0 - (magicLevel * CDR_PER_LEVEL));
    return value;
}

function grantPlayersCDR(event) {
    let server = event.getServer();
    event.server.players.forEach(player => {
        let player_name = player.getName().getString();
        let playerMagicLevel = pmmoApiUtils.getLevel("magic", player);
        let cdrMultiplier = calculateCDRMultiplier(playerMagicLevel);

        server.runCommandSilent(`/attribute ${player_name} ${CDR_ATTR_ID} modifier remove ${CDR_UUID}`);
        server.runCommandSilent(`/attribute ${player_name} ${CDR_ATTR_ID} modifier add ${CDR_UUID} "Cooldown Reduction Dynamic Balancing" ${cdrMultiplier} ${CDR_OPERATION}`);
    });
}

function loopPlayersMagicDynamicCDR(event) {
    grantPlayersCDR(event);
    event.server.scheduleInTicks(MAGIC_XP_CDR_BOOST_LOOP, callback => {
        loopPlayersMagicDynamicCDR(event);
    });
}

ServerEvents.loaded(event => {
    loopPlayersMagicDynamicCDR(event);
})