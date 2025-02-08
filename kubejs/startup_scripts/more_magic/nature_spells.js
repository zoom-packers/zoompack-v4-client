

StartupEvents.registry('irons_spellbooks:spells', event => {
    event.create('irons_spellbooks:water_breathing')
        .setCastTime(40)
        .setCooldownSeconds(400)
        .setManaCostPerLevel(30)
        .setCastType('long')
        .setSchool('irons_spellbooks:nature')
        .setMinRarity('common')
        .setMaxLevel(20)
        .setStartSound('irons_spellbooks:cast.generic.nature')
        .setFinishSound('minecraft:entity.generic.splash')
        .setAllowLooting(true)
        .needsLearning(false)
        .canBeCraftedBy(player => false)
        .onCast(ctx => {
            let /** @type {Internal.ServerPlayer} */ player = ctx.entity;
            let spell_power = player.getAttribute('irons_spellbooks:spell_power').getValue();
            let nature_spell_power = player.getAttribute('irons_spellbooks:nature_spell_power').getValue();
            player.potionEffects.add("minecraft:water_breathing", spell_power * nature_spell_power * ctx.spellLevel * 20, 1, false, true)
        })
        .setUniqueInfo((spellLevel, caster) => {
            let nature_spell_power = caster.getAttribute('irons_spellbooks:nature_spell_power').getValue();
            let spell_power = caster.getAttribute('irons_spellbooks:spell_power').getValue();
            return [
                Component.green(`Effect Duration: ${Math.floor(spell_power * nature_spell_power * spellLevel)} s`),
            ]
        })
})



let inebriationPowerMultiplyer = 0.02;
let inebriationBaseRange = 10;

function ibernationRange(base, spell_power, nature_spell_power){
    return base+1+1*spell_power*nature_spell_power;
}

StartupEvents.registry('irons_spellbooks:spells', event => {
    event.create('irons_spellbooks:inebriation')
        .setCastTime(20)
        .setCooldownSeconds(400)
        .setManaCostPerLevel(10)
        .setCastType('long')
        .setSchool('irons_spellbooks:nature')
        .setMinRarity('common')
        .setMaxLevel(20)
        .setStartSound('irons_spellbooks:cast.generic.nature')
        .setFinishSound('minecraft:entity.generic.splash')
        .setAllowLooting(true)
        .needsLearning(false)
        .canBeCraftedBy(player => false)
        .onCast(ctx => {
            let /** @type {Internal.ServerPlayer} */ player = ctx.entity;
            let spell_power = player.getAttribute('irons_spellbooks:spell_power').getValue();
            let nature_spell_power = player.getAttribute('irons_spellbooks:nature_spell_power').getValue();

            let ray = player.rayTrace(ibernationRange(inebriationBaseRange, spell_power, nature_spell_power));
            if (ray.entity) {
                ray.entity.potionEffects.add("aether:inebriation", 40 + spell_power * nature_spell_power * ctx.spellLevel*inebriationPowerMultiplyer*20, 1, false, true);
            }
            else {
                ISSUtils.serverSideCancelCast(player);
                return;
            }
        })
        .setUniqueInfo((spellLevel, caster) => {
            let nature_spell_power = caster.getAttribute('irons_spellbooks:nature_spell_power').getValue();
            let spell_power = caster.getAttribute('irons_spellbooks:spell_power').getValue();
            return [
                Component.green(`Effect Duration: ${Math.floor(2+spell_power * nature_spell_power * spellLevel*inebriationPowerMultiplyer)} s`),
                Component.green(`Range: ${Math.floor(ibernationRange(inebriationBaseRange, spell_power, nature_spell_power))} m`),
            ]
        })
        .checkPreCastConditions(ctx => {
            let player = ctx.entity;
            let spell_power = player.getAttribute('irons_spellbooks:spell_power').getValue();
            let nature_spell_power = player.getAttribute('irons_spellbooks:nature_spell_power').getValue();
            return ISSUtils.preCastTargetHelper(ctx.level, ctx.entity, ctx.playerMagicData, ctx.spell, ibernationRange(inebriationBaseRange, spell_power, nature_spell_power), 0.35);
        })
})