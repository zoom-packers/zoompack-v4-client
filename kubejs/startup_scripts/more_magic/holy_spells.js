let ghostpowerMultiplayer = 0.003;
StartupEvents.registry('irons_spellbooks:spells', event => {
    event.create('irons_spellbooks:ghost')
        .setCastTime(80)
        .setCooldownSeconds(360)
        .setManaCostPerLevel(100)
        .setCastType('long')
        .setSchool('irons_spellbooks:holy')
        .setMinRarity('common')
        .setMaxLevel(20)
        .setStartSound('irons_spellbooks:cast.generic.holy')
        .setFinishSound('minecraft:entity.generic.splash')
        .setAllowLooting(true)
        .needsLearning(false)
        .canBeCraftedBy(player => false)
        .onCast(ctx => {
            let /** @type {Internal.ServerPlayer} */ player = ctx.entity;
            let spell_power = player.getAttribute('irons_spellbooks:spell_power').getValue();
            let holy_spell_power = player.getAttribute('irons_spellbooks:holy_spell_power').getValue();
            player.potionEffects.add("theabyss:ghost", spell_power * holy_spell_power * ctx.spellLevel * 20 * ghostpowerMultiplayer + 60, 1, false, true)
        })
        .setUniqueInfo((spellLevel, caster) => {
            try{
                let holy_spell_power = caster.getAttribute('irons_spellbooks:holy_spell_power').getValue();
                let spell_power = caster.getAttribute('irons_spellbooks:spell_power').getValue();
                return [
                    Component.green(`Effect Duration: ${Math.floor(3 + spell_power * holy_spell_power * spellLevel * ghostpowerMultiplayer)} s`),
                ]
            }
            catch(error){
                return [
                    Component.green(`Effect Duration: ${Math.floor(3 + 1 * 1 * spellLevel * ghostpowerMultiplayer)} s`),
                ]
            }
            
        })
})
