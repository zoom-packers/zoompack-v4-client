ServerEvents.recipes(event => {
    // TBA
    event.remove({ output: 'minecraft:diamond', input: "minecraft:coal_block" })
    event.remove({ output: 'minecolonies:supplychestdeployer' })
    event.remove({ output: 'minecolonies:supplycampdeployer' })
    event.remove({ output: 'slotmachinemod:slot_machine' })
    event.remove({ output: 'minecraft:diamond_block', input: "minecraft:emerald_block" })
    event.remove({ output: 'sophisticatedbackpacks:inception_upgrade' })
})
