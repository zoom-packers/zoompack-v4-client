// API: KubeJS
// KubeJS: 1.0.0
// MC: 1.20.1

// Nether intervals
// Damage: 20-50
// Armor: 33 - 55
// Toughness: 20 - 24
// Durability: 2000 - 3000
// Materials: Netherite, Milenium, Coxium

ItemEvents.toolTierRegistry(event => {
    // We already have netherite, so create the other two tiers for tools & armors
    global.createToolTier(event, 'milenium', 2500, 8, 31, 4, 40, '#zoomers:milenium');
    global.createToolTier(event, 'coxium', 3000, 10, 46, 5, 50, '#zoomers:coxium');
});

ItemEvents.armorTierRegistry(event => {
    global.createArmorTier(event, "milenium", 150, [7,10,15,8], 40, 6, 0.2, "#zoomers:milenium");
    global.createArmorTier(event, "coxium", 180, [10,15,20,10], 50, 8, 0.3, "#zoomers:coxium");
});

StartupEvents.registry("item", event => {
    event.create("milenium_ingot")
        .displayName("Milenium Ingot")
        .texture("kubejs:item/milenium_ingot");
    event.create("coxium_ingot")
        .displayName("Coxium Ingot")
        .texture("kubejs:item/coxium_ingot");

    event.create("raw_milenium")
        .displayName("Raw Milenium")
        .texture("kubejs:item/raw_milenium");
    event.create("raw_coxium")
        .displayName("Raw Coxium")
        .texture("kubejs:item/raw_coxium");
});

StartupEvents.registry("block", e => {
    e.create("milenium_ore")
        .displayName("Milenium Ore")
        .hardness(3)
        .resistance(3)
        .material("stone")
        .textureAll("kubejs:block/milenium_ore");

    e.create("coxium_ore")
        .displayName("Coxium Ore")
        .hardness(3)
        .resistance(3)
        .material("stone")
        .textureAll("kubejs:block/coxium_ore");
});

// ItemEvents.armorTierRegistry(event => {
//     global.createArmorTier(event, "milenium", 150, [7,10,15,8], 40, 6, 0.2, "#zoomers:milenium");
//     global.createArmorTier(event, "coxium", 180, [10,15,20,10], 50, 8, 0.3, "#zoomers:coxium");
// });

ItemEvents.modification( (event) => {


    // Netherite modifications
    event.modify("minecraft:netherite_sword", item => {
        item.attackDamage = 20;
        item.maxDamage = 2000;
    });

    event.modify("minecraft:netherite_axe", item => {
        // item.attackDamage = 30;
        item.maxDamage = 2000;
    });

    event.modify("minecraft:netherite_helmet", item => {
        item.armorProtection = 12;
        item.armorToughness = 5;
        item.armorKnockbackResistance = 0.2;
        item.maxDamage = 1875;
    });

    event.modify("minecraft:netherite_chestplate", item => {
        item.armorProtection = 16;
        item.armorToughness = 5;
        item.armorKnockbackResistance = 0.2;
        item.maxDamage = 2000;
    });

    event.modify("minecraft:netherite_leggings", item => {
        item.armorProtection = 14;
        item.armorToughness = 5;
        item.armorKnockbackResistance = 0.2;
        item.maxDamage = 1900;
    });

    event.modify("minecraft:netherite_boots", item => {
        item.armorProtection = 11;
        item.armorToughness = 5;
        item.armorKnockbackResistance = 0.2;
        item.maxDamage = 1850;
    });

    // Other mods netherite items - those possible

    // Create
    event.modify("create:netherite_diving_helmet", item => {
        item.armorProtection = 6;
        item.maxDamage = 800;
    });
    event.modify("create:netherite_backtank", item => {
        item.armorProtection = 8;
        item.maxDamage = 1200;
    });
    event.modify("create:netherite_diving_boots", item => {
        item.armorProtection = 5.5;
        item.maxDamage = 900;
    });

});


StartupEvents.registry("item", e => {
    global.createAllToolsForTier(e, "milenium", global.getMaterialTexturesObject("kubejs", "milenium"));
    global.createAllToolsForTier(e, "coxium", global.getMaterialTexturesObject("kubejs", "coxium"));
});
