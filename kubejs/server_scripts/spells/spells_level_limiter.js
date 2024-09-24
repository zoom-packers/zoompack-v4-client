let PmmoAPIUtils = Java.loadClass('harmonised.pmmo.api.APIUtils');
let PmmoReqType = Java.loadClass('harmonised.pmmo.api.enums.ReqType');
let pmmoLevelsPerSpellLevel = 5;

PlayerEvents.spellPreCast(event => {
    let player = event.player;
    let spellLevel = event.spellLevel - 1;
    let pmmoMagicLevel = PmmoAPIUtils.getLevel("magic", player);
    let targetPmmoMagicLevel = spellLevel * pmmoLevelsPerSpellLevel;
    if (targetPmmoMagicLevel > pmmoMagicLevel) {
        player.sendSystemMessage("§4You need to be level§r §b§l" + targetPmmoMagicLevel + " in magic§r§r §4to cast this spell.§r");
        event.cancel();
    }
})
