//TODO: use instance of
const ALLOWED_MODS_FOR_CURI_ENH = ['irons_spellbooks','zoomers_armory'];

ForgeEvents.onEvent('net.minecraftforge.event.AnvilUpdateEvent', event => {
    const { left, right } = event;
    
    if (!left || left.isEmpty() || !right || right.isEmpty()) return;

    const leftItem = Item.of(left);
    const rightItem = Item.of(right);

    let isRing = leftItem.id.includes('_ring');
    let isNecklace = leftItem.id.includes('_necklace');
    let isGloves = leftItem.id.includes('_gloves');

    if(!(isRing || isNecklace || !isGloves)) return;

    let leftItemmodId = leftItem.id.split(':')[0];
    if(!ALLOWED_MODS_FOR_CURI_ENH.includes(leftItemmodId)) return;

    if (rightItem.id !== 'irons_spellbooks:scroll') return;

    let scrollNBT = rightItem.nbt;

    let ISB_Spells = scrollNBT.ISB_Spells;
    if(!ISB_Spells) return;

    let data = ISB_Spells.data;
    if(!data) return;
    if(data.length===0) return;

    let spellData = data[0];
    if(!spellData) return;

    let spellId = spellData.id;
    if(!spellId) return;
    
    const output = leftItem.copy();
    const outNBT = output.nbt || {};
    outNBT.ISBEnhance = spellId;
    output.nbt = outNBT;

    event.setOutput(output);
    event.setCost(1);
    event.setMaterialCost(1);
});