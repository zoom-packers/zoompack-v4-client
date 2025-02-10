const coldDamageUUID = '0df3d0e0-d571-4c7e-adc0-235493798751';

StartupEvents.registry('mob_effect', event => {
    event.create('irons_spellbooks:frost_power')
        .color(0x0000FF)
        .beneficial()
        .modifyAttribute('attributeslib:cold_damage', coldDamageUUID, 5, "addition")
})

StartupEvents.registry('irons_spellbooks:spells', event => {
    event.create('irons_spellbooks:ice_power')
        .setCastTime(40)
        .setCooldownSeconds(400)
        .setManaCostPerLevel(50)
        .setCastType('long')
        .setSchool('irons_spellbooks:ice')
        .setMinRarity('common')
        .setMaxLevel(20)
        .setStartSound('irons_spellbooks:cast.generic.ice')
        .setFinishSound('minecraft:entity.generic.splash')
        .setAllowLooting(true)
        .needsLearning(false)
        .canBeCraftedBy(player => false)
        .onCast(ctx => {
            let /** @type {Internal.ServerPlayer} */ player = ctx.entity;
            let spell_power = player.getAttribute('irons_spellbooks:spell_power').getValue();
            let ice_spell_power = player.getAttribute('irons_spellbooks:ice_spell_power').getValue();
            player.potionEffects.add("irons_spellbooks:frost_power", spell_power * ice_spell_power * ctx.spellLevel * 20, 1+spell_power * ice_spell_power, false, true)
        })
        .setUniqueInfo((spellLevel, caster) => {
            let ice_spell_power = caster.getAttribute('irons_spellbooks:ice_spell_power').getValue();
            let spell_power = caster.getAttribute('irons_spellbooks:spell_power').getValue();
            return [
                Component.green(`Effect Duration: ${Math.floor(spell_power * ice_spell_power * spellLevel)} s`),
            ]
        })
})