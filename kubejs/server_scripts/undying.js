EntityEvents.death((event) => {
    const { source, entity, level } = event;
    if (source.getType() == "genericKill") return;

    if (tryRemoveUndyingEnchantment(entity)) {
        entity.setHealth(1);
        level.broadcastEntityEvent(entity, 35);

        event.cancel();
    }
});

function tryRemoveUndyingEnchantment(entity) {
    for (let item of entity.armorSlots) {
        let enchantmentTags = item.enchantmentTags;

        for (let i = 0; i < enchantmentTags.size(); i++) {
            let enchantment = enchantmentTags.get(i);
            if (enchantment.get("id") == "kubejs:undying") {
                enchantmentTags.remove(i);
                return true;
            }
        }
    }
    return false;
}