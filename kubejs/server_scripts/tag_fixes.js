ServerEvents.tags('item', event => {
    event.remove('forge:coffee_beans', 'farmersrespite:coffee_beans')
    event.remove('forge:coffees', 'farmersdelight:coffee')
    event.removeAll('farmersrespite:tea_leaves')
    event.removeAll('fabric:mineable/needs_tool_level_0')
    event.removeAll('fabric:mineable/needs_tool_level_1')
    event.removeAll('fabric:mineable/needs_tool_level_2')
    event.removeAll('fabric:mineable/needs_tool_level_3')
    event.removeAll('fabric:mineable/needs_tool_level_4')

    event.remove('quark:vertical_slabs', 'outer_end:azure_vertical_slab')
    event.remove('enlightened_end:cerulean_stalk_blocks', 'enlightened_end:cerulean_stalk_block')
});
