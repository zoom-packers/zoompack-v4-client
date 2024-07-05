// API: KubeJS
// KubeJS: 1.0.0
// MC: 1.20.1

ItemEvents.modification( (event) => {

    // Swords
    event.modify("aquaculture:neptunium_sword", item => {
        item.attackDamage = 10;
    });

    // event.modify("aquaculture:neptunium_axe", item => {
    //     item.attackDamage = 12;
    // });

    // Armor
    event.modify("aquaculture:neptunium_helmet", item => {
        item.armorProtection = 4;
        item.armorToughness = 3;
    });
    event.modify("aquaculture:neptunium_chestplate", item => {
        item.armorProtection = 8;
        item.armorToughness = 3;
    });
    event.modify("aquaculture:neptunium_leggings", item => {
        item.armorProtection = 6;
        item.armorToughness = 3;
    });
    event.modify("aquaculture:neptunium_boots", item => {
        item.armorProtection = 4;
        item.armorToughness = 3;
    });

});
