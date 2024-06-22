// API: KubeJS
// KubeJS: 1.0.0
// MC: 1.20.1

ItemEvents.modification( (event) => {
    // Blue Skies
    event.modify("blue_skies:bluebright_sword", item => {
        item.attackDamage = 5;
    });
    event.modify("blue_skies:starlit_sword", item => {
        item.attackDamage = 5;
    });
    event.modify("blue_skies:frostbright_sword", item => {
        item.attackDamage = 5;
    });
    event.modify("blue_skies:lunar_sword", item => {
        item.attackDamage = 5;
    });
    event.modify("blue_skies:dusk_sword", item => {
        item.attackDamage = 5;
    });
    event.modify("blue_skies:maple_sword", item => {
        item.attackDamage = 5;
    });
    event.modify("blue_skies:comet_sword", item => {
        item.attackDamage = 6;
    });
    event.modify("blue_skies:turquoise_stone_sword", item => {
        item.attackDamage = 6.5;
    });
    event.modify("blue_skies:lunar_stone_sword", item => {
        item.attackDamage = 6.5;
    });
    event.modify("blue_skies:pyrope_sword", item => {
        item.attackDamage = 8;
    });
    event.modify("blue_skies:aquite_sword", item => {
        item.attackDamage = 100;
        item.attackSpeed = 2;
        item.rarity = "RARE"
    });
    event.modify("blue_skies:diopside_sword", item => {
        item.attackDamage = 12.5;
    });
    event.modify("blue_skies:chaoite_sword", item => {
        item.attackDamage = 11;
    });
    event.modify("blue_skies:horizonite_sword", item => {
        item.attackDamage = 10;
    });
    event.modify("blue_skies:different_sword", item => {
        item.attackDamage = 15;
    });

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
