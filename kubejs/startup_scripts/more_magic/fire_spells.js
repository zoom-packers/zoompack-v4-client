const fireDamageUUID = '0df3d0e0-d571-4c7e-adc0-235493798752';
let fireDamageMultiplier = 0.001;

StartupEvents.registry('mob_effect', event => {
    event.create('irons_spellbooks:fire_power')
        .color(0xFFFF00)
        .beneficial()
        .modifyAttribute('attributeslib:fire_damage', fireDamageUUID, 1, "addition")
})

StartupEvents.registry('irons_spellbooks:spells', event => {
    event.create('irons_spellbooks:fire_power')
        .setCastTime(40)
        .setCooldownSeconds(400)
        .setManaCostPerLevel(100)
        .setCastType('long')
        .setSchool('irons_spellbooks:fire')
        .setMinRarity('common')
        .setMaxLevel(20)
        .setStartSound('irons_spellbooks:cast.generic.fire')
        .setFinishSound('minecraft:entity.generic.splash')
        .setAllowLooting(true)
        .needsLearning(false)
        .canBeCraftedBy(player => false)
        .onCast(ctx => {
            let /** @type {Internal.ServerPlayer} */ player = ctx.entity;
            let spell_power = player.getAttribute('irons_spellbooks:spell_power').getValue();
            let fire_spell_power = player.getAttribute('irons_spellbooks:fire_spell_power').getValue();
            player.potionEffects.add("irons_spellbooks:fire_power", spell_power * fire_spell_power * ctx.spellLevel * 20*fireDamageMultiplier, Math.floor(1+spell_power * fire_spell_power*fireDamageMultiplier), false, true)
        })
        .setUniqueInfo((spellLevel, caster) => {
            try{
                let fire_spell_power = caster.getAttribute('irons_spellbooks:fire_spell_power').getValue();
                let spell_power = caster.getAttribute('irons_spellbooks:spell_power').getValue();
                return [
                    Component.green(`Effect Duration: ${Math.floor(spell_power * fire_spell_power * spellLevel*fireDamageMultiplier)} s`),
                ]
            }
            catch(error){
                return [
                    Component.green(`Effect Duration: ${Math.floor(1 * 1 * spellLevel*fireDamageMultiplier)} s`),
                ]
            }
        })
})