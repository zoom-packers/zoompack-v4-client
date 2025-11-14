StartupEvents.registry('item', event => {
    event.create('tome_of_disenhancement')
        .displayName('Tome of Disenhancement')
        .tooltip("")
        .tooltip("Use it in an anvil to extract enhancements Spell Enhancements from rings, necklaces, or gloves.")
        .maxStackSize(64);
});


ForgeEvents.onEvent('net.minecraftforge.event.AnvilUpdateEvent', event => {
    const { left, right } = event;

    if (!left || left.isEmpty() || !right || right.isEmpty()) return;

    const leftItem = Item.of(left);
    const rightItem = Item.of(right);

    const isRing = leftItem.id.includes('_ring');
    const isNecklace = leftItem.id.includes('_necklace');
    const isGloves = leftItem.id.includes('_gloves');
    if (!(isRing || isNecklace || isGloves)) return;

    const modId = leftItem.id.split(':')[0];
    if (!ALLOWED_MODS_FOR_CURI_ENH.includes(modId)) return;

    if (rightItem.id !== 'kubejs:tome_of_disenhancement') return;

    const nbt = leftItem.nbt;
    if (!nbt || !nbt.ISBEnhance) return;

    const spellId = nbt.ISBEnhance;
    if (!spellId || spellId === '') return;

    const output = leftItem.copy();
    const outNBT = output.nbt || {};
    delete outNBT.ISBEnhance;
    outNBT.ISBEnhanceRecycle = spellId;
    output.nbt = outNBT;

    event.setCost(1);
    event.setMaterialCost(1);

    // Only proceed if player has enough tomes
    if (rightItem.count >= 1) {
        event.setOutput(output);
    }
});