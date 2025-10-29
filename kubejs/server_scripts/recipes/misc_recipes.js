ServerEvents.recipes(event => {
    event.shaped(
        Item.of('minecraft:bundle', 1),
        [
            ' B ',
            'ACA',
            'AAA'
        ],
        {
            A: 'minecraft:leather',
            B: 'minecraft:string',
            C: 'minecraft:emerald'
        }
    )
})
