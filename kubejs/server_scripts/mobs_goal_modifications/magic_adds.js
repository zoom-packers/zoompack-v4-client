EntityJSEvents.addGoalSelectors('minecraft:warden', event => {
    event.arbitraryGoal(1, (e) => {
        return new WizardAttackGoal(e, 1, 80)
            .setSpells(
                [
                    Spell.of('irons_spellbooks:sculk_tentacles'), 
                    Spell.of('irons_spellbooks:sonic_boom'),
                ],
                [Spell.of('irons_spellbooks:stun')],
                [Spell.of('irons_spellbooks:blood_step')],
                []
            )
    })
})

EntityJSEvents.addGoalSelectors('mythicmounts:dragon', event => {
    event.arbitraryGoal(1, (e) => {
        return new WizardAttackGoal(e, 1, 200)
            .setSpells(
                [
                    Spell.of('irons_spellbooks:fire_breath'),
                ],
                [],
                [],
                []
            )
    })
})


