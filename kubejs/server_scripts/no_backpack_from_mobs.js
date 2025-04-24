const BACKPACK_IDS = [
    "sophisticatedbackpacks:backpack",
    "sophisticatedbackpacks:copper_backpack",
    "sophisticatedbackpacks:iron_backpack",
    "sophisticatedbackpacks:gold_backpack",
    "sophisticatedbackpacks:diamond_backpack",
    "sophisticatedbackpacks:emerald_backpack",
    "sophisticatedbackpacks:netherite_backpack",
]

EntityEvents.death(event => {
    const { entity } = event;
    let armorSlot = entity.getArmorSlots()[2];
    if (BACKPACK_IDS.includes(armorSlot.getItem().getId())) {
        entity.armorDropChances[2] = 0;
    }
})