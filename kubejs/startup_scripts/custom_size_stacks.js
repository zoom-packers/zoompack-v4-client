ItemEvents.modification((event) => {

    // Set to 64 stack size
    ['minecraft:potion'].forEach(item_modification_target=>{
        event.modify(item_modification_target, item => {
            item.maxStackSize = 64;
        });
    })
    
});