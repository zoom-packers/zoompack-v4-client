let bloodfedPowerMultiplyer = 0.8;

StartupEvents.registry('irons_spellbooks:spells', event => {
    event.create('bloodfed')
        .setCastTime(60)                           // Cast time in ticks
        .setCooldownSeconds(30)                    // Spell cooldown in seconds
        .setManaCostPerLevel(10)                   // How much additional mana is needed per level
        .setCastType('continuous')                 // Cast type can be "continuous", "long", "instant", or "none"
        .setSchool('irons_spellbooks:blood')       // The school type. This is the ID of the school you want to use
        .setMinRarity('epic')                      // The minimum rarity of the spell. Can be "common", "uncommon", "rare", "epic", or "legendary"
        .setMaxLevel(20)                            // The maximum level
        .setStartSound('item.honey_bottle.drink')  // The sound to be played when you start casting the spell. Used for long spells
        .setFinishSound('item.honey_bottle.drink') // Plays when the spell has finished casting
        .onCast(ctx => global.bloodfed(ctx))       // The function to be called when the spell is cast
        .onClientCast(ctx => { })                   // Client-side only cast method. Useful for particles and sounds
        .onPreCast(ctx => { })                      // Called before the spell is cast.
        .onPreClientCast(ctx => { })
        .setAllowLooting(true)                     // Setting this to false will disallow looting the spell from mobs or chests
        .needsLearning(false)                      // Usually this one is used for Eldritch spells
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
    console.log(console.log(Object.keys(player)))
    let spell_power = player.getAttribute('irons_spellbooks:spell_power').getValue();
    let blood_spell_power = player.getAttribute('irons_spellbooks:blood_spell_power').getValue();
    let heal_amount = Math.floor(ctx.getSpellLevel() * blood_spell_power * spell_power * bloodfedPowerMultiplyer) 

    if (player.getFoodData().getFoodLevel() < 2){
        ctx.cancel();
        return;
    }
    else if (player.maxHealth<heal_amount+player.health){
        ctx.cancel();
        return;
    }
    else{
        player.heal(heal_amount);
        player.getFoodData().setFoodLevel(player.getFoodData().getFoodLevel() - Math.ceil(ctx.getSpellLevel() / 4))
    }
    
}