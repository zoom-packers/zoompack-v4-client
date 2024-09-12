PlayerEvents.inventoryChanged(e => {
    let itemStack = e.getItem();
    let enchantmentTags = itemStack.getEnchantmentTags();
    for (let i = 0; i < enchantmentTags.size(); i++) {
        let enchantmentTag = enchantmentTags.get(i);
        let id = enchantmentTag.getString("id");
        if (id === "minecraft:mending") {
            enchantmentTags.remove(i);
            i--;
        }
        if (id === "apotheosis:life_mending") {
            enchantmentTags.remove(i);
            i--;
        }
    }
    itemStack.getOrCreateTag().put("Enchantments", enchantmentTags);
})
