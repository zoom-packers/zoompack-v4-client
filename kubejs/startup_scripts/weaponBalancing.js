// API: KubeJS
// KubeJS: 1.0.0
// MC: 1.20.1

ItemEvents.modification( (event) => {
    // Aether
    event.modify("aether:skyroot_sword", item => {
        item.attackDamage = 8;
    });
    event.modify("aether:holystone_sword", item => {
        item.attackDamage = 9;
    });
    event.modify("aether:zanite_sword", item => {
        item.attackDamage = 15;
    });
    event.modify("aether:gravitite_sword", item => {
        item.attackDamage = 20;
    });
    event.modify("aether:candy_cane_sword", item => {
        item.attackDamage = 8;
    });
    event.modify("aether:holy_sword", item => {
        item.attackDamage = 20;
    });
    event.modify("aether:lightning_sword", item => {
        item.attackDamage = 20;
    });
    event.modify("aether:flaming_sword", item => {
        item.attackDamage = 20;
    });

    // Nether
    event.modify("minecraft:netherite_sword", item => {
        item.attackDamage = 22;
        // Original attack damage is 8
    });
});
