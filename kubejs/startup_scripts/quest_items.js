StartupEvents.registry('item', event => {
    event.create('kubejs:quest')
        .maxStackSize(1)
        .displayName('Quest')
    event.create('kubejs:quest_book')
        .maxStackSize(1)
        .displayName('Quest Book')
})