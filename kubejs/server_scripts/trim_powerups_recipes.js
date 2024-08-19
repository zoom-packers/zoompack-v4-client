ServerEvents.recipes(event => {

    event.shaped(
        Item.of('kubejs:tier_1_health_boost_power_up', 1),
            [
                'FEF',
                'SCS',
                'TET'
            ],
            {
                F: 'minecraft:diamond_block',
                S: 'minecraft:iron_block',
                T: 'minecraft:emerald_block',
                C: '#trim_templates',
                E: 'candlelight:hearth',
            }
        )

    event.shaped(
        Item.of('kubejs:tier_2_health_boost_power_up', 1),
            [
                'FEF',
                'SCS',
                'TET'
            ],
            {
                F: 'blue_skies:pyrope_block',
                S: 'blue_skies:aquite_block',
                T: 'blue_skies:diopside_block',
                C: 'kubejs:tier_1_health_boost_power_up',
                E: 'candlelight:hearth',
            }
        )
});
