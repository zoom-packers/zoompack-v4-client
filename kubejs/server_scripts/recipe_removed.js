ServerEvents.recipes(event => {
    // TBA
    event.remove({ output: 'minecraft:diamond' })
    event.remove({ output: 'slotmachinemod:slot_machine' })
    event.remove({ output: 'minecraft:diamond_block', input: "minecraft:emerald_block" })
    event.remove({ output: 'sophisticatedbackpacks:inception_upgrade' })
})
