let bloodfedPowerMultiplyer = 0.2;

StartupEvents.registry('irons_spellbooks:spells', event => {
    event.create('irons_spellbooks:bloodfed')
        .setCastTime(60)
        .setCooldownSeconds(30)
        .setManaCostPerLevel(10)
        .setCastType('continuous')
        .setSchool('irons_spellbooks:blood')
        .setMinRarity('epic')
        .setMaxLevel(20)
        .setStartSound('irons_spellbooks:cast.generic.blood')
        .setFinishSound('item.honey_bottle.drink')
        .onCast(ctx => global.bloodfed(ctx))
        .onClientCast(ctx => { })
        .onPreCast(ctx => { })
        .onPreClientCast(ctx => { })
        .setAllowLooting(true)
        .needsLearning(false)
        .canBeCraftedBy(player => false)
        .setUniqueInfo((spellLevel, caster) => {
            let blood_spell_power = caster.getAttribute('irons_spellbooks:blood_spell_power').getValue();
            let spell_power = caster.getAttribute('irons_spellbooks:spell_power').getValue();
            return [
                Component.green(`Health: ${Math.floor(spellLevel * blood_spell_power * spell_power * bloodfedPowerMultiplyer)}`),
                Component.green(`Hunger Usage: ${Math.ceil(spellLevel / 4)}`)
            ]
        })
})

global.bloodfed = (ctx) => {
    let player = ctx.entity;
    let spell_power = player.getAttribute('irons_spellbooks:spell_power').getValue();
    let blood_spell_power = player.getAttribute('irons_spellbooks:blood_spell_power').getValue();
    let heal_amount = Math.floor(ctx.getSpellLevel() * blood_spell_power * spell_power * bloodfedPowerMultiplyer)

    if (player.getFoodData().getFoodLevel() < 2){
        ISSUtils.serverSideCancelCast(player);
    }
    else if (player.maxHealth>player.health){
        player.heal(heal_amount);
        player.getFoodData().setFoodLevel(player.getFoodData().getFoodLevel() - Math.ceil(ctx.getSpellLevel() / 4));
    }
    else{
        ISSUtils.serverSideCancelCast(player);
    }
    
}