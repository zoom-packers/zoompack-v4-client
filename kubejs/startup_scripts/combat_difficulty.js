
/** @function onUse
 * @param {Internal.ItemStack} itemStack
 * @param {Internal.Level} level
 * @param {Internal.ServerPlayer} player
 * */

StartupEvents.registry("item", e => {
    var difficulties = ['easy', 'normal', 'hard', 'brutal', 'nightmare', 'uninstall']

    difficulties.forEach(difficulty => {
        global.createItem(e, `kubejs:difficulty_changer_${difficulty}`, `Difficulty Changer - §l§4${difficulty.toUpperCase()}§r§r`)
            .rarity("epic")
            .tooltip(`§7Using this item will change your combat difficulty to§r §l§4${difficulty.toUpperCase()}§r§r`)
            .tooltip(`§e§oBe careful when using this item, as in order to change your difficulty again, you will need to use another Difficulty Changer§r§r`)
            .tooltip(`§o§eTip:§r §7Difficulty Changers can be purchased at the §nObservatory shops§r§r§r`)
            .texture('origins:item/orb_of_origin');
    })
});
