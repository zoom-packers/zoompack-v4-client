BlockEvents.rightClicked(event => {
    if (event.block.id === 'minecraft:spawner') {
        event.cancel();
    }
})
