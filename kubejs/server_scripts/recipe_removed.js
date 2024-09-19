ServerEvents.recipes(event => {
    // TBA
    event.remove({ output: 'minecraft:diamond' })
    event.remove({ output: 'minecraft:diamond_block', input: "minecraft:emerald_block" })
})
