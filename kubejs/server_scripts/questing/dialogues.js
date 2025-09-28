const $CompoundTag = Java.loadClass('net.minecraft.nbt.CompoundTag')

ItemEvents.rightClicked('minecraft:stick', event => {
    // let tag = new $CompoundTag();
    // let dialogueData = {
    //     speaker: "Unknown Voice",
    //     message: "I’m drifting... somewhere out here. Systems failing. You need to survive. Find a way... rebuild...",
    //     renderType: 'item',
    //     renderTarget : 'minecraft:diamond'
    // };
    // let dialogueData = {
    //     speaker: "IonutuBoy",
    //     message: "La Multi Ani Renato",
    //     renderType: 'rectangle',
    //     renderTarget : 'medievalorigins:textures/item/high_elf.png'
    // };
    // let dialogueData = {
    //     speaker: "Unknown Voice",
    //     message: "I’m drifting... somewhere out here. Systems failing. You need to survive. Find a way... rebuild...",
    //     renderType: 'atlas_texture',
    //     renderTarget : 'minecraft:block/lava_flow'
    // };
    // tag.putString('dialogueData', JSON.stringify(dialogueData));
    // event.player.sendData('dialogue:chat', tag);
});