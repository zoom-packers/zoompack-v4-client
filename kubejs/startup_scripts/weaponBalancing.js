// API: KubeJS
// KubeJS: 1.0.0
// MC: 1.20.1

ItemEvents.modification( (event) => {
    // Aether
    

    // Nether
    event.modify("minecraft:netherite_sword", item => {
        item.attackDamage = 22;
        // Original attack damage is 8
    });
});
