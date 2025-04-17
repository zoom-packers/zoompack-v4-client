StartupEvents.registry('item', event => {
    event.create('immersive_aircraft:reinforced_pipes')
        .maxStackSize(8)
        .displayName('Reinforced Pipes')

    event.create('immersive_aircraft:dragon_pipes')
        .maxStackSize(8)
        .displayName('Dragon Pipes')

    event.create('immersive_aircraft:dragon_engine')
        .maxStackSize(8)
        .displayName('Dragon Engine')

    event.create('immersive_aircraft:targeting_device')
        .maxStackSize(8)
        .displayName('Targeting Device')

    event.create('immersive_aircraft:flaps')
        .maxStackSize(8)
        .displayName('Flaps')

    event.create('immersive_aircraft:mechanical_suspensions')
        .maxStackSize(8)
        .displayName('Mechanical Suspensions')
})