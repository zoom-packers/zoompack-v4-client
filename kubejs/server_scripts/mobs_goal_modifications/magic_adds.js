EntityJSEvents.addGoalSelectors('minecraft:warden', event => {
    event.arbitraryGoal(1, (e) => {
        return new WizardAttackGoal(e, 1, 80)
            .setSpells(
                [
                    Spell.of('irons_spellbooks:sonic_boom'),
                ],
                [],
                [],
                []
            )
    })
})


