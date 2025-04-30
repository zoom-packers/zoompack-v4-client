
ServerEvents.recipes(event => {
    for (const crystalName of ['frost', 'aurel', 'crimson', 'ender', 'warped', 'hollow', 'abyss']) {
        event.shapeless(
            Item.of(`1x theabyss:${crystalName}_crystal_shard`, 2),
            [
                `theabyss:${crystalName}_crystal_ore`,
                'theabyss:loran_energy'
            ]
        )
    }
    event.shapeless(
        Item.of(`1x theabyss:caverna_crystal`, 2),
        [
            `theabyss:caverna_crystal_ore`,
            'theabyss:loran_energy'
        ]
    ) 
})    