const CHAIN_LIGHTNING_MAX_RANGE = 20;

const STOMP_MAX_STEPS = 20;

const FIRE_BALL_MAX_RANGE = 16.0;
const FIRE_BALL_MULTIPLIER = 0.04;
const FIRE_BOMB_MAX_RANGE = 16.0;
const FIRE_BOMB_MULTIPLIER = 0.05;

const BLOOD_NEEDLE_DAMAGE_MULTIPLIER = 40.0;

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

    if (type === "irons_spellbooks:fireball"){
        let current_range = entity.nbt.getFloat('ExplosionRadius');
        let new_range = current_range*FIRE_BALL_MULTIPLIER;
        if (new_range>FIRE_BALL_MAX_RANGE){
            entity.mergeNbt({'ExplosionRadius':FIRE_BALL_MAX_RANGE});
        }
        else{
            entity.mergeNbt({'ExplosionRadius':new_range});
        }
    }

    
    if (type === "irons_spellbooks:magma_ball"){
        let current_range = entity.nbt.getFloat('ExplosionRadius');
        let new_range = current_range*FIRE_BOMB_MULTIPLIER;
        if (new_range>FIRE_BOMB_MAX_RANGE){
            entity.mergeNbt({'ExplosionRadius':FIRE_BOMB_MAX_RANGE});
        }
        else{
            entity.mergeNbt({'ExplosionRadius':new_range});
        }
    }

    if (type === "irons_spellbooks:blood_needle"){
        entity.mergeNbt({'Damage':entity.nbt.getFloat('Damage')*BLOOD_NEEDLE_DAMAGE_MULTIPLIER});
    }
}
