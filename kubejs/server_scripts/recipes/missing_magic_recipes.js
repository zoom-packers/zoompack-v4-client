
ServerEvents.recipes(event => {

    event.shaped('1x irons_spellbooks:common_ink',
        [   " L ",
            " S ",
            " A "],
        {
            "L": "minecraft:lapis_lazuli",
            "S": "minecraft:ink_sac",
            "A": "minecraft:glass_bottle"
        });

    event.shaped('3x irons_spellbooks:arcane_essence',
        [   " L ",
            " S ",
            " A "],
        {
            "L": "minecraft:lapis_lazuli",
            "S": "minecraft:sugar",
            "A": "minecraft:amethyst_shard"
        });

    event.shaped('1x irons_spellbooks:frozen_bone',
        [   " L ",
            " S ",
            " L "],
        {
            "L": "minecraft:bone",
            "S": "minecraft:snowball"
        });

    event.shaped('1x irons_spellbooks:blank_rune',
        [   " L ",
            " S ",
            " L "],
        {
            "L": "minecraft:cobbled_deepslate_slab",
            "S": "minecraft:diamond_block"
        });

    
    event.smoking('irons_spellbooks:cinder_essence', 'irons_spellbooks:arcane_essence').xp(0.55)

})
