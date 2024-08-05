ItemEvents.modification((event) => {


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

    // Better Nether 
    // cincinnasite
    global.setMaterialDurabilityTools(event, "betternether", "cincinnasite", 2700);
    global.setMaterialDurabilityArmor(event, "betternether", "cincinnasite", [850, 1232, 1147, 1020]);
    event.modify("betternether:cincinnasite_sword", item => {
        item.attackDamage = 16;
    });

    // cincinnasite diamond
    event.modify("betternether:cincinnasite_sword_diamond", item => {
        item.attackDamage = 18;
        item.maxDamage = 2800;
    });

    event.modify("betternether:cincinnasite_axe_diamond", item => {
        item.maxDamage = 2800;
    });

    event.modify("betternether:cincinnasite_pickaxe_diamond", item => {
        // item.attackDamage = 30;
        item.maxDamage = 2800;
    });

    event.modify("betternether:cincinnasite_shovel_diamond", item => {
        // item.attackDamage = 30;
        item.maxDamage = 2800;
    });

    event.modify("betternether:cincinnasite_hoe_diamond", item => {
        // item.attackDamage = 30;
        item.maxDamage = 2800;
    });

    // Ruby
    global.setMaterialDurabilityTools(event, "betternether", "nether_ruby", 2950);
    global.setMaterialDurabilityArmor(event, "betternether", "nether_ruby", [1350, 1957, 1822, 1620]);
    event.modify("betternether:nether_ruby_sword", item => {
        item.attackDamage = 21;
    });

    // Flaming Ruby
    global.setMaterialDurabilityTools(event, "betternether", "flaming_ruby", 3025);
    global.setMaterialDurabilityArmor(event, "betternether", "flaming_ruby", [1750, 2537, 2362, 2100]);
    event.modify("betternether:flaming_ruby_sword", item => {
        item.attackDamage = 25;
    });


    // Netherite modifications
    event.modify("minecraft:netherite_sword", item => {
        // item.attackDamage = 30;
        item.maxDamage = 3100;
    });

    event.modify("minecraft:netherite_axe", item => {
        // item.attackDamage = 30;
        item.maxDamage = 3100;
    });

    event.modify("minecraft:netherite_pickaxe", item => {
        // item.attackDamage = 30;
        item.maxDamage = 3100;
    });

    event.modify("minecraft:netherite_shovel", item => {
        // item.attackDamage = 30;
        item.maxDamage = 3100;
    });

    event.modify("minecraft:netherite_hoe", item => {
        // item.attackDamage = 30;
        item.maxDamage = 3100;
    });

    event.modify("minecraft:netherite_helmet", item => {
        item.armorProtection = 12;
        item.armorToughness = 8;
        item.armorKnockbackResistance = 0.3;
        item.maxDamage = 2000;
    });

    event.modify("minecraft:netherite_chestplate", item => {
        item.armorProtection = 22;
        item.armorToughness = 8;
        item.armorKnockbackResistance = 0.3;
        item.maxDamage = 2900;
    });

    event.modify("minecraft:netherite_leggings", item => {
        item.armorProtection = 17;
        item.armorToughness = 8;
        item.armorKnockbackResistance = 0.3;
        item.maxDamage = 2700;
    });

    event.modify("minecraft:netherite_boots", item => {
        item.armorProtection = 12;
        item.armorToughness = 8;
        item.armorKnockbackResistance = 0.3;
        item.maxDamage = 2400;
    });

});


ItemEvents.toolTierRegistry(event => {
    global.createToolTier(event, 'cincinnasite_diamond', 3000, 10, 46, 5, 50, 'minecraft:diamond');
});

ItemEvents.armorTierRegistry(event => {
    global.createArmorTier(event, "cincinnasite_diamond", 95, [10, 14, 17, 10], 50, 6, 0.2, "minecraft:diamond");
});

StartupEvents.registry("item", e => {
    global.creatArmorForTier(e, "cincinnasite_diamond", global.getMaterialTexturesObject("kubejs", "cincinnasite_diamond"), "Cincinnasite Diamond");
});
