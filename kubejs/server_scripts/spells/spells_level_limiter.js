
const CHAIN_LIGHTNING_MAX_RANGE = 20;
const STOMP_MAX_STEPS = 20;

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

EntityEvents.spawned(spellEntity);

function spellEntity(event){
    const entity = event.getEntity();
    const type = entity.getType();
    
    if(type === "irons_spellbooks:chain_lightning"){
        if (entity.range>CHAIN_LIGHTNING_MAX_RANGE){
            entity.range = CHAIN_LIGHTNING_MAX_RANGE;
        }
    }

    if(type === "irons_spellbooks:stomp_aoe"){
        if (entity.nbt.getInt('maxSteps')>STOMP_MAX_STEPS){
            entity.mergeNbt({'maxSteps':STOMP_MAX_STEPS});
        }
    }
}