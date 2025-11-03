

function onDepthRightclickCorrputedSorrowKey(event, blockId, itemId, mobId) {
    const { player, hand, item, level, block } = event

    if (hand != 'MAIN_HAND') return
    if (item.id != itemId) return
    if (!block || block.id != blockId) return

    if (Math.abs(block.x) <= 1500 && Math.abs(block.z) < 1500) {
        event.server.scheduleInTicks(240, callback => {
            event.server.runCommandSilent(`execute in ${event.getEntity().level.dimension.toString()} run summon ${mobId} ${block.x + 20.5} ${block.y + 1} ${block.z + 0.5}`);
        });
    }
}


BlockEvents.rightClicked(event => {
    onDepthRightclickCorrputedSorrowKey(event, 'callfromthedepth_:corruptedstone', 'callfromthedepth_:sorrowkey', 'callfromthedepth_:injured_ancient_guard');
});