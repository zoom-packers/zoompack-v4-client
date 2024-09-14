LootJS.modifiers((event) => {
    let ores = [];
    
    var silky;
    var rawOre;
    for (let ore of ores) {
        silky = LootEntry.of(ore.blockId).when((c) =>
            c.matchMainHand(ItemFilter.hasEnchantment("minecraft:silk_touch"))
        );
        rawOre = LootEntry.of(ore.noSilkTouchDropId)
            .applyOreBonus("minecraft:fortune")
            .when((c) => c.matchMainHand(ItemFilter.hasEnchantment("minecraft:fortune") && !ItemFilter.hasEnchantment("minecraft:silk_touch")));
        event.addBlockLootModifier(ore.blockId)
            .removeLoot(ore.blockId)
            .addAlternativesLoot(silky, rawOre, ore.noSilkTouchDropId);
        console.info(`LootJS: Added loot modifier for ${ore.blockId} and ${ore.noSilkTouchDropId}`);
    }
});
