// API: KubeJS
// KubeJS: 1.0.0
// MC: 1.20.1

ItemEvents.modification( (event) => {

    // Swords
    // Minecraft wooden sword has 4 attack damage
    event.modify("aether:skyroot_sword", item => {
        item.attackDamage = 5;
    });
    event.modify("aether:holystone_sword", item => {
        item.attackDamage = 6;
    });
    event.modify("aether:zanite_sword", item => {
        item.attackDamage = 10;
    });
    event.modify("aether:gravitite_sword", item => {
        item.attackDamage = 15;
    });
    event.modify("aether:candy_cane_sword", item => {
        item.attackDamage = 10;
    });
    event.modify("aether:holy_sword", item => {
        item.attackDamage = 15;
    });
    event.modify("aether:lightning_sword", item => {
        item.attackDamage = 15;
    });
    event.modify("aether:flaming_sword", item => {
        item.attackDamage = 15;
    });
    event.modify("aether:valkyrie_lance", item => {
        item.attackDamage = 15;
    });

    // Axes
    // Axes are 1.5x stronger than swords
    // event.modify("aether:skyroot_axe", item => {
    //     item.attackDamage = 7.5;
    // });
    // event.modify("aether:holystone_axe", item => {
    //     item.attackDamage = 9;
    // });
    // event.modify("aether:zanite_axe", item => {
    //     item.attackDamage = 15;
    // });
    // event.modify("aether:gravitite_axe", item => {
    //     item.attackDamage = 22.5;
    // });
    // event.modify("aether:valkyrie_axe", item => {
    //     item.attackDamage = 22.5;
    // });

    // Armors
    // Helmets
    // Minecraft iron helmet has 2 armor
    event.modify("aether:zanite_helmet", item => {
        item.armorProtection = 3;
    });
    event.modify("aether:neptune_helmet", item => {
        item.armorProtection = 3;
        item.armorToughness = 2;
    });
    event.modify("aether:gravitite_helmet", item => {
        item.armorProtection = 4;
        item.armorToughness = 3;
    });
    event.modify("aether:phoenix_helmet", item => {
        item.armorProtection = 4;
        item.armorToughness = 3;
    });
    event.modify("aether:valkyrie_helmet", item => {
        item.armorProtection = 4;
        item.armorToughness = 3;
    });
    event.modify("aether:obsidian_helmet", item => {
        item.armorProtection = 4;
        item.armorToughness = 4;
    });

    // Chestplates
    // Minecraft iron chestplate has 6 armor
    event.modify("aether:zanite_chestplate", item => {
        item.armorProtection = 7;
        item.armorKnockbackResistance = 1;
    });
    event.modify("aether:neptune_chestplate", item => {
        item.armorProtection = 7;
        item.armorToughness = 2;
        item.armorKnockbackResistance = 1;
    });
    event.modify("aether:gravitite_chestplate", item => {
        item.armorProtection = 10;
        item.armorToughness = 3;
        item.armorKnockbackResistance = 1;
    });
    event.modify("aether:phoenix_chestplate", item => {
        item.armorProtection = 10;
        item.armorToughness = 3;
        item.armorKnockbackResistance = 2;
    });
    event.modify("aether:valkyrie_chestplate", item => {
        item.armorProtection = 10;
        item.armorToughness = 3;
        item.armorKnockbackResistance = 2;
    });
    event.modify("aether:obsidian_chestplate", item => {
        item.armorProtection = 10;
        item.armorToughness = 4;
        item.armorKnockbackResistance = 3;
    });

    // Leggings
    // Minecraft iron leggings have 5 armor
    event.modify("aether:zanite_leggings", item => {
        item.armorProtection = 6;
    });
    event.modify("aether:neptune_leggings", item => {
        item.armorProtection = 6;
        item.armorToughness = 2;
    });
    event.modify("aether:gravitite_leggings", item => {
        item.armorProtection = 8;
        item.armorToughness = 3;
    });
    event.modify("aether:phoenix_leggings", item => {
        item.armorProtection = 8;
        item.armorToughness = 3;
    });
    event.modify("aether:valkyrie_leggings", item => {
        item.armorProtection = 8;
        item.armorToughness = 3;
    });
    event.modify("aether:obsidian_leggings", item => {
        item.armorProtection = 8;
        item.armorToughness = 4;
    });

    // Boots
    // Minecraft iron boots have 2 armor
    event.modify("aether:zanite_boots", item => {
        item.armorProtection = 3;
    });
    event.modify("aether:neptune_boots", item => {
        item.armorProtection = 3;
        item.armorToughness = 2;
    });
    event.modify("aether:gravitite_boots", item => {
        item.armorProtection = 4;
        item.armorToughness = 3;
    });
    event.modify("aether:phoenix_boots", item => {
        item.armorProtection = 4;
        item.armorToughness = 3;
    });
    event.modify("aether:valkyrie_boots", item => {
        item.armorProtection = 4;
        item.armorToughness = 3;
    });
    event.modify("aether:obsidian_boots", item => {
        item.armorProtection = 4;
        item.armorToughness = 4;
    });
    event.modify("aether:sentry_boots", item => {
        item.armorProtection = 3;
    });

    // Extra Fine tuning
    // Obsidian Armor
    event.modify("aether:obsidian_helmet", item => {
        item.armorProtection = 3.5; // -0.5 armor
        item.armorToughness = 4.5; // +0.5 toughness
    });
    event.modify("aether:obsidian_chestplate", item => {
        item.armorProtection = 9.5; // -0.5 armor
        item.armorToughness = 4.5; // +0.5 toughness
    });
    event.modify("aether:obsidian_leggings", item => {
        item.armorProtection = 7.5; // -0.5 armor
        item.armorToughness = 4.5; // +0.5 toughness
    });
    event.modify("aether:obsidian_boots", item => {
        item.armorProtection = 3.5; // -0.5 armor
        item.armorToughness = 4.5; // +0.5 toughness
    });

    // Valkyrie Armor
    event.modify("aether:valkyrie_helmet", item => {
        item.armorProtection = 4.5; // +0.5 armor
        item.armorToughness = 2.75; // -0.25 toughness
    });
    event.modify("aether:valkyrie_chestplate", item => {
        item.armorProtection = 10.5; // +0.5 armor
        item.armorToughness = 2.75; // -0.25 toughness
    });
    event.modify("aether:valkyrie_leggings", item => {
        item.armorProtection = 8.5; // +0.5 armor
        item.armorToughness = 2.75; // -0.25 toughness
    });
    event.modify("aether:valkyrie_boots", item => {
        item.armorProtection = 4.5; // +0.5 armor
        item.armorToughness = 2.75; // -0.25 toughness
    });

    // Phoenix Armor
    event.modify("aether:phoenix_helmet", item => {
        item.armorProtection = 3.5; // -0.5 armor
        item.armorToughness = 3.5; // +0.5 toughness
    });
    event.modify("aether:phoenix_chestplate", item => {
        item.armorProtection = 9.5; // -0.5 armor
        item.armorToughness = 3.5; // +0.5 toughness
    });
    event.modify("aether:phoenix_leggings", item => {
        item.armorProtection = 7.5; // -0.5 armor
        item.armorToughness = 3.5; // +0.5 toughness
    });
    event.modify("aether:phoenix_boots", item => {
        item.armorProtection = 3.5; // -0.5 armor
        item.armorToughness = 3.5; // +0.5 toughness
    });

});
