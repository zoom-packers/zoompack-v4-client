ItemEvents.modification((event) => {

    // Set to 64 stack size
    ['minecraft:potion', 'blue_skies:loot_bag', 'loot_bag_summoner', 'loot_bag_alchemist', 'loot_bag_starlit_crusher', 'loot_bag_arachnarch'].forEach(item_modification_target=>{
        event.modify(item_modification_target, item => {
            item.maxStackSize = 64;
        });
    })
    
});