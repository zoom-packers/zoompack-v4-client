// let stunPowerMultiplyer = 0.01;
// let stunBaseRange = 10;

// function stunRange(base, spell_power, evocation_spell_power){
//     return base+1+1*spell_power*evocation_spell_power;
// }

// StartupEvents.registry('irons_spellbooks:spells', event => {
//     event.create('irons_spellbooks:stun')
//         .setCastTime(20)
//         .setCooldownSeconds(400)
//         .setManaCostPerLevel(10)
//         .setCastType('long')
//         .setSchool('irons_spellbooks:evocation')
//         .setMinRarity('common')
//         .setMaxLevel(20)
//         .setStartSound('irons_spellbooks:cast.generic.evocation')
//         .setFinishSound('minecraft:entity.generic.splash')
//         .setAllowLooting(true)
//         .needsLearning(false)
//         .canBeCraftedBy(player => false)
//         .onCast(ctx => {
//             let /** @type {Internal.ServerPlayer} */ player = ctx.entity;
//             let spell_power = player.getAttribute('irons_spellbooks:spell_power').getValue();
//             let evocation_spell_power = player.getAttribute('irons_spellbooks:evocation_spell_power').getValue();

//             let ray = player.rayTrace(stunRange(stunBaseRange, spell_power, evocation_spell_power));
//             if (ray.entity) {
//                 ray.entity.potionEffects.add("aquamirae:abyss_blindness", 40 + spell_power * evocation_spell_power * ctx.spellLevel*stunPowerMultiplyer*20, 1, false, true);
//             }
//             else {
//                 ISSUtils.serverSideCancelCast(player);
//                 return;
//             }
//         })
//         .setUniqueInfo((spellLevel, caster) => {
//             let evocation_spell_power = caster.getAttribute('irons_spellbooks:evocation_spell_power').getValue();
//             let spell_power = caster.getAttribute('irons_spellbooks:spell_power').getValue();
//             return [
//                 Component.green(`Effect Duration: ${Math.floor(2+spell_power * evocation_spell_power * spellLevel*stunPowerMultiplyer)} s`),
//                 Component.green(`Range: ${Math.floor(stunRange(stunBaseRange, spell_power, evocation_spell_power))} m`),
//             ]
//         })
//         .checkPreCastConditions(ctx => {
//             let player = ctx.entity;
//             let spell_power = player.getAttribute('irons_spellbooks:spell_power').getValue();
//             let evocation_spell_power = player.getAttribute('irons_spellbooks:evocation_spell_power').getValue();
//             return ISSUtils.preCastTargetHelper(ctx.level, ctx.entity, ctx.playerMagicData, ctx.spell, stunRange(stunBaseRange, spell_power, evocation_spell_power), 0.35);
//         })
// })