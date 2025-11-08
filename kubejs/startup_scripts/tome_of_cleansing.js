StartupEvents.registry('item', event => {
    event.create('tome_of_cleansing')
        .displayName('Tome of Cleansing')
        .maxStackSize(64);
});


let $ArmorItem = Java.loadClass("net.minecraft.world.item.ArmorItem");

ForgeEvents.onEvent('net.minecraftforge.event.AnvilUpdateEvent', event => {
    const left = event.getLeft();
    const right = event.getRight();
    
    if (!left || left.isEmpty() || !right || right.isEmpty()) return;
    
    const leftItem = Item.of(left);
    const rightItem = Item.of(right);
    
    if (!(leftItem.item instanceof $ArmorItem)) return;
    
    const leftNBT = leftItem.nbt || {};
    if (!leftNBT.Trim) return;
    
    if (rightItem.id !== 'kubejs:tome_of_cleansing') return;
    
    const material = leftNBT.Trim.material;
    if (!material) return;
    
    let output = leftItem.copy();
    let outNBT = output.nbt || {}; 

    delete outNBT.Trim;
    outNBT.TrimRecycle = material;
    output.nbt = outNBT;
    
    event.setOutput(output);
    event.setCost(1);
    event.setMaterialCost(1);
});
