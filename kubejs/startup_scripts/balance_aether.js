// API: KubeJS
// KubeJS: 1.0.0
// MC: 1.20.1

ItemEvents.modification( (event) => {

    // event.modify("aether:phoenix_bow", item => {
    //     item.attackDamage = 15;
    // });

    event.modify("aether:skyroot_sword", item => {
        item.attackDamage = 8;
        item.maxDamage = 2683;
    });
    event.modify("aether:holystone_sword", item => {
        item.attackDamage = 9;
        item.maxDamage = 2683;
    });
    event.modify("aether:candy_cane_sword", item => {
        item.attackDamage = 8;
        item.maxDamage = 2683;
    });
    event.modify("aether:holy_sword", item => {
        item.attackDamage = 15;
        item.maxDamage = 2683;
    });
    event.modify("aether:lightning_sword", item => {
        item.attackDamage = 15;
        item.maxDamage = 2683;
    });
    event.modify("aether:flaming_sword", item => {
        item.attackDamage = 15;
        item.maxDamage = 2683;
    });
    event.modify("aether:vampire_blade", item => {
        item.attackDamage = 15;
        item.maxDamage = 2683;
    });
    event.modify("aether:pig_slayer", item => {
        item.attackDamage = 15;
        item.maxDamage = 2683;
    });
    event.modify("aether:hammer_of_kingbdogz", item => {
        item.attackDamage = 15;
        item.maxDamage = 2683;
    });

    //Zanite Tools
    event.modify("aether:zanite_sword", item => {
        item.attackDamage = 10;
        item.maxDamage = 2211;
    });
    event.modify("aether:zanite_axe", item => {
        item.attackSpeed = -3;
        item.maxDamage = 2211;
    });
    event.modify("aether:zanite_pickaxe", item => {
        // item.attackDamage = 4;
        item.maxDamage = 2211;
    });
    event.modify("aether:zanite_shovel", item => {
        // item.attackDamage = 5.5;
        item.maxDamage = 2211;
    });
    event.modify("aether:zanite_hoe", item => {
        // item.attackDamage = 4;
        item.maxDamage = 2211;
    });

    //Gravitite Tools
    event.modify("aether:gravitite_sword", item => {
        item.attackDamage = 11;
        item.maxDamage = 2431;
    });
    event.modify("aether:gravitite_axe", item => {
        item.maxDamage = 2431;
    });
    event.modify("aether:gravitite_pickaxe", item => {
        item.maxDamage = 2431;
    });
    event.modify("aether:gravitite_shovel", item => {
        item.maxDamage = 2431;
    });
    event.modify("aether:gravitite_hoe", item => {
        item.maxDamage = 2431;
    });


    //Valkyrie Tools
    event.modify("aether:valkyrie_lance", item => {
        item.attackDamage = 13;
        item.maxDamage = 2589;
    });
    event.modify("aether:valkyrie_axe", item => {
        item.maxDamage = 2589;
    });
    event.modify("aether:valkyrie_pickaxe", item => {
        item.maxDamage = 2589;
    });
    event.modify("aether:valkyrie_shovel", item => {
        item.maxDamage = 2589;
    });
    event.modify("aether:valkyrie_hoe", item => {
        item.maxDamage = 2589;
    });

    // Armors
    // Helmets
    // Minecraft iron helmet has 2 armor
    event.modify("aether:zanite_helmet", item => {
        item.armorProtection = 5;
        item.armorToughness = 2.5;
    });
    event.modify("aether:neptune_helmet", item => {
        item.armorProtection = 6;
        item.armorToughness = 2.5;
    });
    event.modify("aether:gravitite_helmet", item => {
        item.armorProtection = 7;
        item.armorToughness = 3;
        item.armorKnockbackResistance = 0.05;
    });
    event.modify("aether:valkyrie_helmet", item => {
        item.armorProtection = 8;
        item.armorToughness = 3;
        item.armorKnockbackResistance = 0.05;
    });
    event.modify("aether:phoenix_helmet", item => {
        item.armorProtection = 9;
        item.armorToughness = 3.5;
        item.armorKnockbackResistance = 0.1;
    });
    event.modify("aether:obsidian_helmet", item => {
        // decommison for the time
        item.armorProtection = 10;
        item.armorToughness = 4;
        item.armorKnockbackResistance = 0.15;
    });

    // Chestplates
    // Minecraft iron chestplate has 6 armor
    event.modify("aether:zanite_chestplate", item => {
        item.armorProtection = 10;
        item.armorToughness = 2.5;
    });
    event.modify("aether:neptune_chestplate", item => {
        item.armorProtection = 11;
        item.armorToughness = 2.5;
    });
    event.modify("aether:gravitite_chestplate", item => {
        item.armorProtection = 12;
        item.armorToughness = 3;
        item.armorKnockbackResistance = 0.05;
    });
    event.modify("aether:valkyrie_chestplate", item => {
        item.armorProtection = 13;
        item.armorToughness = 3.5;
        item.armorKnockbackResistance = 0.05;
    });
    event.modify("aether:phoenix_chestplate", item => {
        item.armorProtection = 14;
        item.armorToughness = 3.5;
        item.armorKnockbackResistance = 0.1;
    });
    event.modify("aether:obsidian_chestplate", item => {
        item.armorProtection = 14;
        item.armorToughness = 4;
        item.armorKnockbackResistance = 0.15;
    });

    // Leggings
    // Minecraft iron leggings have 5 armor
    event.modify("aether:zanite_leggings", item => {
        item.armorProtection = 8;
        item.armorToughness = 2.5;
    });
    event.modify("aether:neptune_leggings", item => {
        item.armorProtection = 9;
        item.armorToughness = 2.5;
    });
    event.modify("aether:gravitite_leggings", item => {
        item.armorProtection = 10;
        item.armorToughness = 3;
        item.armorKnockbackResistance = 0.05;
    });
    event.modify("aether:valkyrie_leggings", item => {
        item.armorProtection = 11;
        item.armorToughness = 3;
        item.armorKnockbackResistance = 0.05;
    });
    event.modify("aether:phoenix_leggings", item => {
        item.armorProtection = 12;
        item.armorToughness = 3.5;
        item.armorKnockbackResistance = 0.1;
    });
    event.modify("aether:obsidian_leggings", item => {
        item.armorProtection = 12;
        item.armorToughness = 4;
        item.armorKnockbackResistance = 0.15;
    });

    // Boots
    // Minecraft iron boots have 2 armor
    event.modify("aether:zanite_boots", item => {
        item.armorProtection = 5;
        item.armorToughness = 2.5;
    });
    event.modify("aether:neptune_boots", item => {
        item.armorProtection = 6;
        item.armorToughness = 2.5;
    });
    event.modify("aether:gravitite_boots", item => {
        item.armorProtection = 7;
        item.armorToughness = 3;
        item.armorKnockbackResistance = 0.05;
    });
    event.modify("aether:valkyrie_boots", item => {
        item.armorProtection = 8;
        item.armorToughness = 3;
        item.armorKnockbackResistance = 0.05;
    });
    event.modify("aether:phoenix_boots", item => {
        item.armorProtection = 9;
        item.armorToughness = 3.5;
        item.armorKnockbackResistance = 0.1;
    });
    event.modify("aether:obsidian_boots", item => {
        item.armorProtection = 9;
        item.armorToughness = 4;
        item.armorKnockbackResistance = 0.15;
    });
    event.modify("aether:sentry_boots", item => {
        item.armorProtection = 8;
        item.armorToughness = 2.5;
        item.maxDamage = 660;
    });
});