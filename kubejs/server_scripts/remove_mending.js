PlayerEvents.inventoryChanged(e => {
    let itemStack = e.getItem();
    let enchantmentTags = itemStack.getEnchantmentTags();
    let removedMending = false;
    for (let i = 0; i < enchantmentTags.size(); i++) {
        let enchantmentTag = enchantmentTags.get(i);
        let id = enchantmentTag.getString("id");
        if (id === "minecraft:mending") {
            enchantmentTags.remove(i);
            removedMending = true;
            i--;
        }
        if (id === "apotheosis:life_mending") {
            enchantmentTags.remove(i);
            removedMending = true;
            i--;
        }
    }
    if (removedMending) {
        itemStack.getOrCreateTag().put("Enchantments", enchantmentTags);
    }
})
