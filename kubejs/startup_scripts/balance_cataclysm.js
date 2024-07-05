// API: KubeJS
// KubeJS: 1.0.0
// MC: 1.20.1

ItemEvents.modification( (event) => {

    // Swords
    // event.modify("cataclysm:coral_spear", item => {
    //     item.attackDamage = 200;
    // });
    // event.modify("cataclysm:coral_bardiche", item => {
    //     item.attackDamage = 200;
    // });
    event.modify("cataclysm:athame", item => {
        item.attackDamage = 200;
    });
    // event.modify("cataclysm:the_incinerator", item => {
    //     item.attackDamage = 250;
    // });
    // event.modify("cataclysm:meat_shredder", item => {
    //     item.attackDamage = 200;
    // });
    // event.modify("cataclysm:void_forge", item => {
    //     item.attackDamage = 220;
    // });
    // event.modify("cataclysm:infernal_forge", item => {
    //     item.attackDamage = 200;
    // });

    // Armor
    event.modify("cataclysm:ignitium_helmet", item => {
        item.armorProtection = 20;
        item.armorToughness = 10;
    });
    event.modify("cataclysm:ignitium_chestplate", item => {
        item.armorProtection = 30;
        item.armorToughness = 10;
    });
    event.modify("cataclysm:ignitium_leggings", item => {
        item.armorProtection = 25;
        item.armorToughness = 10;
    });
    event.modify("cataclysm:ignitium_boots", item => {
        item.armorProtection = 20;
        item.armorToughness = 10;
    });
    event.modify("cataclysm:monstrous_helm", item => {
        item.armorProtection = 10;
        item.armorToughness = 5;
    });
    event.modify("cataclysm:ignitium_elytra_chestplate", item => {
        item.armorProtection = 30;
        item.armorToughness = 10;
    });


});
