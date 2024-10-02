ServerEvents.recipes((event) => {
    event.remove({ output: 'apotheosis:simple_reforging_table'})
    event.remove({ output: 'apotheosis:reforging_table'})

    event.shaped('apotheosis:simple_reforging_table', [
        ' B ', "CDC", "FEF"], {
        B: 'minecraft:book',
        C: 'apotheosis:common_material',
        D: 'minecraft:smithing_table',
        E: 'minecraft:iron_block',
        F: 'minecraft:cobblestone',
    });

    event.shaped('apotheosis:reforging_table', [
        ' B ', "CDC", "FEF"], {
        B: 'minecraft:amethyst_block',
        C: 'apotheosis:epic_material',
        D: 'apotheosis:simple_reforging_table',
        E: 'minecraft:gold_block',
        F: 'minecraft:stone',
    });

    event.shaped('zoomers_extended_apotheosis:artisanal_reforging_table', [
        ' B ', "CDC", "FEF"], {
        B: 'aether:zanite_block',
        C: 'kubejs:apoth_extra_tier_0',
        D: 'apotheosis:reforging_table',
        E: 'aether:ambrosium_block',
        F: 'aether:holystone',
    });

    event.shaped('zoomers_extended_apotheosis:enhanced_reforging_table', [
        ' B ', "CDC", "FEF"], {
        B: 'betternether:nether_ruby_block',
        C: 'kubejs:apoth_extra_tier_1',
        D: 'zoomers_extended_apotheosis:artisanal_reforging_table',
        E: 'betternether:cincinnasite_forged',
        F: 'minecraft:quartz_block',
    });

    event.shaped('zoomers_extended_apotheosis:ultimate_reforging_table', [
        ' B ', "CDC", "FEF"], {
        B: 'callfromthedepth_:immemorialingot',
        C: 'kubejs:apoth_extra_tier_2',
        D: 'zoomers_extended_apotheosis:enhanced_reforging_table',
        E: 'minecraft:sculk_shrieker',
        F: 'minecraft:sculk',
    });

    event.shaped('zoomers_extended_apotheosis:god_reforging_table', [
        ' B ', "CDC", "FEF"], {
        B: 'theabyss:fusion_ingot',
        C: 'kubejs:apoth_extra_tier_3',
        D: 'zoomers_extended_apotheosis:ultimate_reforging_table',
        E: 'theabyss:somnium_extractor',
        F: 'theabyss:stone',
    });
});
