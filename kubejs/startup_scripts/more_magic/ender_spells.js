// let perforationPowerMultiplyer = 0.2;
// let perforationBaseRange = 10;

// function perforationRange(base, spell_power, ender_spell_power){
//     return base+1+1*spell_power*ender_spell_power;
// }

// function perforationStrengthSpell(spellLever){
//     if(spellLever<5){
//         return 1
//     }
//     if(spellLever<10){
//         return 2
//     }
//     if(spellLever>10){
//         return 3
//     }
//     if(spellLever>15){
//         return 4
//     }
// }

// StartupEvents.registry('irons_spellbooks:spells', event => {
//     event.create('irons_spellbooks:perforation')
//         .setCastTime(20)
//         .setCooldownSeconds(400)
//         .setManaCostPerLevel(10)
//         .setCastType('long')
//         .setSchool('irons_spellbooks:ender')
//         .setMinRarity('common')
//         .setMaxLevel(20)
//         .setStartSound('irons_spellbooks:cast.generic.ender')
//         .setFinishSound('minecraft:entity.generic.splash')
//         .setAllowLooting(true)
//         .needsLearning(false)
//         .canBeCraftedBy(player => false)
//         .onCast(ctx => {
//             let /** @type {Internal.ServerPlayer} */ player = ctx.entity;
//             let spell_power = player.getAttribute('irons_spellbooks:spell_power').getValue();
//             let ender_spell_power = player.getAttribute('irons_spellbooks:ender_spell_power').getValue();

//             let ray = player.rayTrace(perforationRange(perforationBaseRange, spell_power, ender_spell_power));
//             if (ray.entity) {
//                 ray.entity.potionEffects.add("aquamirae:armor_decrease", 40 + spell_power * ender_spell_power * ctx.spellLevel*perforationPowerMultiplyer*20, perforationStrengthSpell(ctx.spellLevel), false, true);
//             }
//             else {
//                 ISSUtils.serverSideCancelCast(player);
//                 return;
//             }
//         })
//         .setUniqueInfo((spellLevel, caster) => {
//             let ender_spell_power = caster.getAttribute('irons_spellbooks:ender_spell_power').getValue();
//             let spell_power = caster.getAttribute('irons_spellbooks:spell_power').getValue();
//             return [
//                 Component.green(`Effect Duration: ${Math.floor(2+spell_power * ender_spell_power * spellLevel*perforationPowerMultiplyer)} s`),
//                 Component.green(`Range: ${Math.floor(perforationRange(perforationBaseRange, spell_power, ender_spell_power))} m`),
//                 Component.green(`Strength: ${Math.floor(perforationStrengthSpell(spellLevel))}`),
//             ]
//         })
//         .checkPreCastConditions(ctx => {
//             let player = ctx.entity;
//             let spell_power = player.getAttribute('irons_spellbooks:spell_power').getValue();
//             let ender_spell_power = player.getAttribute('irons_spellbooks:ender_spell_power').getValue();
//             return ISSUtils.preCastTargetHelper(ctx.level, ctx.entity, ctx.playerMagicData, ctx.spell, perforationRange(perforationBaseRange, spell_power, ender_spell_power), 0.35);
//         })
// })