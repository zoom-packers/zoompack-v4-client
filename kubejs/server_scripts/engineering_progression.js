let techProgLearningBench = "kubejs:engineering_table"
let techProgPmmoSkillName = "engineering"

function calculateRewards(previousRequirements) {
    let rewards = [];
    for (const req of previousRequirements) {
        let rewardAmount = Math.floor(req.amount / 8);
        if (rewardAmount > 0) {
            rewards.push({ item: req.item, amount: rewardAmount });
        }
    }
    return rewards;
}

let techProgMilestones = [
    {
        id: "the_beginning",
        name: "The Beginning",
        description: "Start your engineering journey",
        requirements: [
            {
                item: "minecraft:redstone",
                amount: 32
            }
        ],
        rewards: [
            {
                item: "minecraft:chest",
                amount: 4
            }
        ],
        pmmoLevelSet: 2,
    },
    {
        id: "the_signal_source",
        name: "The Signal Source",
        description: "Control the signal by using its source",
        requirements: [
            {
                item: "minecraft:redstone_block",
                amount: 5
            }
        ],
        rewards: [
            {
                item: "minecraft:redstone",
                amount: 8
            }
        ],
        pmmoLevelSet: 3,
    },
    {
        id: "slightly_conductive_metal",
        name: "Slightly Conductive Metal",
        description: "Metals can be used to craft all sorts of things. Including machines.",
        requirements: [
            {
                item: "minecraft:iron_ingot",
                amount: 16
            }
        ],
        rewards: [
            {
                item: "minecraft:redstone_block",
                amount: 1
            }
        ],
        pmmoLevelSet: 4,
    },
    {
        id: "the_path_to_casing",
        name: "The Path To Casing",
        description: "All the machines must be put inside a casing.",
        requirements: [
            {
                item: "create:andesite_alloy",
                amount: 16
            }
        ],
        rewards: [
            {
                item: "minecraft:iron_ingot",
                amount: 2
            }
        ],
        pmmoLevelSet: 5,
    },
    {
        id: "with_your_own_hand",
        name: "With Your Own Hand",
        description: "You can use your arms muscle to spin the shafts. Or let the wind work your sails.",
        requirements: [
            {
                item: "create:shaft",
                amount: 32
            },
            {
                item: "create:analog_lever",
                amount: 16
            }
        ],
        rewards: [
            {
                item: "create:andesite_alloy",
                amount: 2
            }
        ],
        pmmoLevelSet: 6,
    },
    {
        id: "mechanical_power",
        name: "Mechanical Power",
        description: "Harness the power of mechanical energy along with item junction.",
        requirements: [
            {
                item: "create:andesite_casing",
                amount: 64
            },
            {
                item: "create:gearbox",
                amount: 16
            },
            {
                item: "create:white_sail",
                amount: 8
            }
        ],
        rewards: [
            {
                item: "create:shaft",
                amount: 4
            },
            {
                item: "create:analog_lever",
                amount: 2
            }
        ],
        pmmoLevelSet: 7,
    },
    {
        id: "bigger_and_better",
        name: "Bigger And Better",
        description: "Does bigger always mean better? When it comes to wheels, yeah.",
        requirements: [
            {
                item: "create:cogwheel",
                amount: 16
            },
            {
                item: "create:large_cogwheel",
                amount: 16
            },
            {
                item: "create:gearbox",
                amount: 32
            }
        ],
        rewards: [
            {
                item: "create:andesite_casing",
                amount: 8
            },
            {
                item: "create:gearbox",
                amount: 2
            },
            {
                item: "create:white_sail",
                amount: 4
            }
        ],
        pmmoLevelSet: 8,
    },
    {
        id: "the_prime_resources",
        name: "The Prime Resources",
        description: "The Wheels can move when applied force",
        requirements: [
            {
                item: "create:zinc_ingot",
                amount: 8
            },
            {
                item: "minecraft:copper_ingot",
                amount: 8
            },
            {
                item: "create:clutch",
                amount: 8
            },
            {
                item: "create:white_sail",
                amount: 32
            }
        ],
        rewards: [
            {
                item: "create:cogwheel",
                amount: 4
            },
            {
                item: "create:large_cogwheel",
                amount: 4
            },
            {
                item: "create:gearbox",
                amount: 4
            }
        ],
        pmmoLevelSet: 9,
    },
    {
        id: "check_your_pipes",
        name: "Check your pipes",
        description: "Move lava, water, milk, or you know what? The whole ocean!",
        requirements: [
            {
                item: "create:basin",
                amount: 16
            },
            {
                item: "create:belt_connector",
                amount: 64
            },
            {
                item: "create:andesite_funnel",
                amount: 16
            },
            {
                item: "create:andesite_tunnel",
                amount: 16
            },
            {
                item: "create:millstone",
                amount: 8
            }
        ],
        rewards: [
            {
                item: "create:zinc_ingot",
                amount: 2
            },
            {
                item: "minecraft:copper_ingot",
                amount: 2
            },
            {
                item: "create:clutch",
                amount: 2
            },
            {
                item: "create:white_sail",
                amount: 8
            }
        ],
        pmmoLevelSet: 10,
    },
    {
        id: "smart_contraptions",
        name: "Smart Contraptions",
        description: "Build smart contraptions that can elevate your mechanization builds.",
        requirements: [
            {
                item: "create:fluid_pipe",
                amount: 32
            },
            {
                item: "create:nozzle",
                amount: 32
            },
            {
                item: "create:mechanical_pump",
                amount: 32
            },
            {
                item: "create:copper_casing",
                amount: 64
            },
            {
                item: "create:encased_fan",
                amount: 16
            }
        ],
        rewards: [
            {
                item: "create:basin",
                amount: 4
            },
            {
                item: "create:belt_connector",
                amount: 8
            },
            {
                item: "create:andesite_funnel",
                amount: 4
            },
            {
                item: "create:andesite_tunnel",
                amount: 4
            },
            {
                item: "create:millstone",
                amount: 2
            }
        ],
        pmmoLevelSet: 11,
    },
    {
        id: "item_storage",
        name: "Item Storage",
        description: "Ever wanted to store a lot of items? Well, there are ways to store thousands in a small place.",
        requirements: [
            {
                item: "create:iron_sheet",
                amount: 64
            },
            {
                item: "create:golden_sheet",
                amount: 64
            },
            {
                item: "create:copper_sheet",
                amount: 64
            }
        ],
        rewards: [
            {
                item: "create:fluid_pipe",
                amount: 8
            },
            {
                item: "create:nozzle",
                amount: 8
            },
            {
                item: "create:mechanical_pump",
                amount: 8
            },
            {
                item: "create:copper_casing",
                amount: 16
            },
            {
                item: "create:encased_fan",
                amount: 4
            }
        ],
        pmmoLevelSet: 12,
    },
    {
        id: "automation",
        name: "Automation",
        description: "Special mechanical driven gear awaits your usage",
        requirements: [
            {
                item: "create:belt_connector",
                amount: 64
            },
            {
                item: "create:mechanical_press",
                amount: 16
            },
            {
                item: "create:mechanical_mixer",
                amount: 16
            }
        ],
        rewards: [
            {
                item: "create:iron_sheet",
                amount: 16
            },
            {
                item: "create:golden_sheet",
                amount: 16
            },
            {
                item: "create:copper_sheet",
                amount: 16
            }
        ],
        pmmoLevelSet: 15,
    },
    {
        id: "brass_age",
        name: "Brass Age",
        description: "Advance further into the world of cogwheels and evolve with the new alloy: brass",
        requirements: [
            {
                item: "create:mechanical_saw",
                amount: 16
            },
            {
                item: "createaddition:rolling_mill",
                amount: 16
            },
            {
                item: "create:fluid_valve",
                amount: 16
            },
            {
                item: "create:chute",
                amount: 32
            }
        ],
        rewards: [
            {
                item: "create:belt_connector",
                amount: 16
            },
            {
                item: "create:mechanical_press",
                amount: 4
            },
            {
                item: "create:mechanical_mixer",
                amount: 4
            }
        ],
        pmmoLevelSet: 16,
    },
    {
        id: "iron_age",
        name: "Iron Age",
        description: "Time to iron some things out",
        requirements: [
            {
                item: "minecraft:iron_ingot",
                amount: 64
            },
            {
                item: "create:iron_sheet",
                amount: 64
            },
            {
                item: "create:item_vault",
                amount: 16
            }
        ],
        rewards: [
            {
                item: "create:mechanical_saw",
                amount: 4
            },
            {
                item: "createaddition:rolling_mill",
                amount: 4
            },
            {
                item: "create:fluid_valve",
                amount: 4
            },
            {
                item: "create:chute",
                amount: 8
            }
        ],
        pmmoLevelSet: 17,
    },
    {
        id: "crushing_age",
        name: "Crushing Age",
        description: "It's time to evolve and look at brass like iron. It's time to fully use the ores and squeeze everything from it.",
        requirements: [
            {
                item: "create:mechanical_crafter",
                amount: 32
            },
            {
                item: "create:sequenced_gearshift",
                amount: 32
            },
            {
                item: "create:redstone_link",
                amount: 32
            }
        ],
        rewards: [
            {
                item: "minecraft:iron_ingot",
                amount: 16
            },
            {
                item: "create:iron_sheet",
                amount: 16
            },
            {
                item: "create:item_vault",
                amount: 4
            }
        ],
        pmmoLevelSet: 18,
    },
    {
        id: "mechanical_extension",
        name: "Mechanical Extension",
        description: "Brass is the new iron. Iron is the new coal. Coal is the new dirt. Dirt is dirt... duuh",
        requirements: [
            {
                item: "create:iron_sheet",
                amount: 32
            },
            {
                item: "createaddition:zinc_sheet",
                amount: 24
            },
            {
                item: "create:brass_casing",
                amount: 16
            },
            {
                item: "create:brass_hand",
                amount: 8
            },
        ],
        rewards: [
            {
                item: "create:mechanical_crafter",
                amount: 8
            },
            {
                item: "create:sequenced_gearshift",
                amount: 8
            },
            {
                item: "create:redstone_link",
                amount: 8
            }
        ],
        pmmoLevelSet: 20,
    },
    {
        id: "railway_path",
        name: "Railway Path",
        description: "Railway time, explore the world in a train. Live in the train or even achieve multi-dimensional travel with them.",
        requirements: [
            {
                item: "create:railway_casing",
                amount: 16
            },
            {
                item: "create:flywheel",
                amount: 16
            }
        ],
        rewards: [
            {
                item: "create:iron_sheet",
                amount: 8
            },
            {
                item: "createaddition:zinc_sheet",
                amount: 6
            },
            {
                item: "create:brass_casing",
                amount: 4
            },
            {
                item: "create:brass_hand",
                amount: 2
            },
        ],
        pmmoLevelSet: 22,
    },
    {
        id: "big_machines",
        name: "Big Machines",
        description: "You'll need a bigger workshop. But also rail complexity...",
        requirements: [
            {
                item: "create:brass_sheet",
                amount: 32
            },
            {
                item: "create:brass_casing",
                amount: 32
            }
        ],
        rewards: [
            {
                item: "create:railway_casing",
                amount: 4
            },
            {
                item: "create:flywheel",
                amount: 4
            }
        ],
        pmmoLevelSet: 23,
    },
    {
        id: "all_the_mechanic",
        name: "All The Mechanic",
        description: "Combine electricity with mechanical gears. You will enjoy the result.",
        requirements: [
            {
                item: "create:mechanical_crafter",
                amount: 24
            },
            {
                item: "create:electron_tube",
                amount: 24
            }
        ],
        rewards: [
            {
                item: "create:brass_sheet",
                amount: 8
            },
            {
                item: "create:brass_casing",
                amount: 8
            }
        ],
        pmmoLevelSet: 24,
    },
    {
        id: "train_controls",
        name: "Train Controls",
        description: "It's time for you to go through the next steps of creating a train. Customize it.",
        requirements: [
            {
                item: "create:controls",
                amount: 16
            },
            {
                item: "create:train_door",
                amount: 32
            },
            {
                item: "create:train_trapdoor",
                amount: 32
            },
        ],
        rewards: [
            {
                item: "create:mechanical_crafter",
                amount: 6
            },
            {
                item: "create:electron_tube",
                amount: 6
            }
        ],
        pmmoLevelSet: 25,
    },
    {
        id: "steam_power",
        name: "Steam Power",
        description: "Is it me or is it getting hot in here?",
        requirements: [
            {
                item: "create:brass_sheet",
                amount: 32
            },
            {
                item: "create:mechanical_crafter",
                amount: 16,
            },
            {
                item: "create:steam_engine",
                amount: 8
            },
        ],
        rewards: [
            {
                item: "create:controls",
                amount: 4
            },
            {
                item: "create:train_door",
                amount: 8
            },
            {
                item: "create:train_trapdoor",
                amount: 8
            },
        ],
        pmmoLevelSet: 26,
    },
    {
        id: "brass_power",
        name: "Brass Power",
        description: "So many things could be done with brass it's almost a shame piglins don't trade it. Or do they?",
        requirements: [
            {
                item: "create:brass_sheet",
                amount: 32
            },
            {
                item: "create:mechanical_crafter",
                amount: 16,
            },
            {
                item: "create:steam_engine",
                amount: 8
            }
        ],
        rewards: [
            {
                item: "create:brass_sheet",
                amount: 8
            },
            {
                item: "create:mechanical_crafter",
                amount: 4
            },
            {
                item: "create:steam_engine",
                amount: 2
            }
        ],
        pmmoLevelSet: 27,
    },
    {
        id: "encased_flowers",
        name: "Encased Flowers",
        description: "There is an old piglin say 'Brass, Gass or ^#$@'. Sorry",
        requirements: [
            {
                item: "create:brass_sheet",
                amount: 32
            },
            {
                item: "create:mechanical_crafter",
                amount: 16,
            },
            {
                item: "create:steam_engine",
                amount: 8
            },
        ],
        rewards: [
            {
                item: "create:brass_sheet",
                amount: 8
            },
            {
                item: "create:mechanical_crafter",
                amount: 4
            },
            {
                item: "create:steam_engine",
                amount: 2
            },
        ],
        pmmoLevelSet: 28,
    },
    {
        id: "fast_gear_rotation",
        name: "Fast Gear Rotation",
        description: "Have you ever tried to build a rotation speed controller? you should...",
        requirements: [
            {
                item: "create:brass_sheet",
                amount: 32
            },
            {
                item: "create:mechanical_crafter",
                amount: 16,
            },
            {
                item: "create:steam_engine",
                amount: 8
            },
        ],
        rewards: [
            {
                item: "create:brass_sheet",
                amount: 8
            },
            {
                item: "create:mechanical_crafter",
                amount: 4
            },
            {
                item: "create:steam_engine",
                amount: 2
            },
        ],
        pmmoLevelSet: 29,
    },
    {
        id: "water_pump",
        name: "Water Pump",
        description: "It must be really complex to create a mechanism to power a mechanism...",
        requirements: [
            {
                item: "create:mechanical_pump",
                amount: 48,
            }
        ],
        rewards: [
            {
                item: "create:brass_sheet",
                amount: 8
            },
            {
                item: "create:mechanical_crafter",
                amount: 4
            },
            {
                item: "create:steam_engine",
                amount: 2
            },
        ],
        pmmoLevelSet: 30,
    },
    {
        id: "electricity",
        name: "Electricity",
        description: "Dan, stop probing the power outlets",
        requirements: [
            {
                item: "createaddition:copper_spool",
                amount: 32
            }
        ],
        rewards: [
            {
                item: "create:mechanical_pump",
                amount: 12,
            }
        ],
        pmmoLevelSet: 31,
    },
    {
        id: "electricity_tier_ii",
        name: "Electricity Tier II",
        description: "Dan, you gotta stop using trifazic setup",
        requirements: [
            {
                item: "createaddition:capacitor",
                amount: 16
            }
        ],
        rewards: [
            {
                item: "createaddition:copper_spool",
                amount: 8
            }
        ],
        pmmoLevelSet: 32,
    },
    {
        id: "broken_power_outlet",
        name: "Broken Power Outlet",
        description: "Dan, I still don't get it why you play with the copper wires.",
        requirements: [
            {
                item: "createaddition:large_connector",
                amount: 16
            }
        ],
        rewards: [
            {
                item: "createaddition:capacitor",
                amount: 4
            }
        ],
        pmmoLevelSet: 33,
    },
    {
        id: "lost_electricity",
        name: "Lost Electricity",
        description: "Dan, you can sell the copper to Nitro",
        requirements: [
            {
                item: "createaddition:electric_motor",
                amount: 4
            }
        ],
        rewards: [
            {
                item: "createaddition:large_connector",
                amount: 4
            }
        ],
        pmmoLevelSet: 34,
    },
    {
        id: "copper_conduction",
        name: "Copper Conduction",
        description: "Dan, did you steal anything from Nitro?",
        requirements: [
            {
                item: "createaddition:alternator",
                amount: 4
            }
        ],
        rewards: [
            {
                item: "createaddition:electric_motor",
                amount: 1
            }
        ],
        pmmoLevelSet: 35,
    },
    {
        id: "steam_enthusiast",
        name: "Steam Enthusiast",
        description: "You've built a boiler, but your steam-powered dreams are still a bit… leaky.",
        requirements: [
            {
                item: "refinedstorage:quartz_enriched_iron",
                amount: 64
            }
        ],
        rewards: [
            {
                item: "createaddition:alternator",
                amount: 1
            }
        ],
        pmmoLevelSet: 36,
    },
    {
        id: "gearhead",
        name: "Gearhead",
        description: "You see gears spinning, and you hear music. Wait, why is everything moving on its own?!",
        requirements: [
            {
                item: "refinedstorage:improved_processor",
                amount: 32
            }
        ],
        rewards: [
            {
                item: "refinedstorage:quartz_enriched_iron",
                amount: 16
            }
        ],
        pmmoLevelSet: 37,
    },
    {
        id: "conveyor_whisperer",
        name: "The Conveyor Whisperer",
        description: "Belts. Everywhere. You might have taken the factory aesthetic a bit too seriously.",
        requirements: [
            {
                item: "refinedstorage:silicon",
                amount: 42
            }
        ],
        rewards: [
            {
                item: "refinedstorage:improved_processor",
                amount: 8
            }
        ],
        pmmoLevelSet: 38,
    },
    {
        id: "overworked_engineer",
        name:  "Overworked Engineer",
        description: "You haven't seen the sun in days. Your only light source? Blaze burners.",
        requirements: [
            {
                item: "refinedstorage:construction_core",
                amount: 8
            }
        ],
        rewards: [
            {
                item: "refinedstorage:silicon",
                amount: 10
            }
        ],
        pmmoLevelSet: 39,
    },
    {
        id: "industrial_overlord",
        name: "Industrial Overlord",
        description: "Your factory is so efficient, villagers have started worshiping you as their automation god.",
        requirements: [
            {
                item: "refinedstorage:destruction_core",
                amount: 4
            }
        ],
        rewards: [
            {
                item: "refinedstorage:construction_core",
                amount: 2
            }
        ],
        pmmoLevelSet: 40,
    }
]

let lockedBlocksPmmoLevels = {
    // Create
    "trials:crafter": 2,

    "create:hand_crank": 3,
    "create:mysterious_cuckoo_clock": 3,
    "create:cuckoo_clock": 3,
    "create:piston_extension_pole": 3,

    "create:schematic_table": 4,

    "create:andesite_casing": 5,
    "create:depot": 5,
    "create:speedometer": 5,
    "create:stressometer": 5,
    "create:cart_assembler": 5,
    "create:sticker": 5,
    "create:analog_lever": 5,
    "create:powered_latch": 5,
    "create:powered_toggle_latch": 5,
    "create:andesite_door": 5,

    "create:shaft": 6,
    "create:turntable": 6,
    "create:gantry_shaft": 6,
    "create:gantry_carriage": 6,
    "copycats:copycat_shaft": 6,
    "create:clutch": 6,
    "create:windmill_bearing": 6,
    "create:white_sail": 6,
    "create:sail_frame": 6,
    "create:gearbox": 6,
    "create:vertical_gearbox": 6,
    "create:mechanical_piston": 6,
    "create:sticky_mechanical_piston": 6,

    "create:cogwheel": 7,
    "create:large_cogwheel": 7,
    "copycats:copycat_cogwheel": 7,
    "copycats:copycat_large_cogwheel": 7,
    "extendedgears:half_shaft_cogwheel": 7,
    "extendedgears:large_half_shaft_cogwheel": 7,
    "extendedgears:shaftless_cogwheel": 7,
    "extendedgears:large_shaftless_cogwheel": 7,

    "create:water_wheel": 8,
    "create:gearshift": 8,
    "create:encased_chain_drive": 8,
    "create:large_water_wheel": 8,
    "create:millstone": 8,
    "create:schematicannon":8,

    "create:basin":9,
    "create:mechanical_bearing": 9,
    "create:belt_connector": 9,
    "create:andesite_funnel": 9,
    "create:andesite_tunnel": 9,

    "create:encased_fan": 10,
    "create:nozzle": 10,
    "create:mechanical_press": 10,
    "create:steam_whistle": 10,
    "create:fluid_pipe": 10,
    "copycats:copycat_fluid_pipe": 10,
    "create:mechanical_pump": 10,
    "create:copper_valve_handle": 10,
    "create:white_valve_handle": 10,
    "create:orange_valve_handle": 10,
    "create:magenta_valve_handle": 10,
    "create:light_blue_valve_handle": 10,
    "create:yellow_valve_handle": 10,
    "create:lime_valve_handle": 10,
    "create:pink_valve_handle": 10,
    "create:gray_valve_handle": 10,
    "create:light_gray_valve_handle": 10,
    "create:cyan_valve_handle": 10,
    "create:purple_valve_handle": 10,
    "create:blue_valve_handle": 10,
    "create:brown_valve_handle": 10,
    "create:green_valve_handle": 10,
    "create:red_valve_handle": 10,
    "create:black_valve_handle": 10,
    "create:copper_casing": 10,
    "create:copper_door": 10,
    "create:fluid_tank": 10,
    "create:hose_pulley": 10,
    "create:item_drain": 10,
    "create:spout": 10,
    
    "create:redstone_contact": 11,
    "create:rope_pulley": 11,
    "create:contraption_controls": 11,

    "create:item_vault": 12,

    "createlowheated:basic_burner": 15,
    "create:mechanical_mixer": 15,
    "createaddition:rolling_mill": 15,
    "createaddition:barbed_wire": 15,
    "create:mechanical_drill": 15,
    "create:mechanical_saw": 15,
    "create:mechanical_harvester": 15,
    "create:mechanical_plough": 15,
    "create:mechanical_roller": 15,
    "create:adjustable_chain_gearshift": 15,
    "create:chute": 15,
    "create:fluid_valve": 15,
    "create:portable_fluid_interface": 15,
    "create:portable_storage_interface": 15,

    "create:brass_casing": 16,
    "create:brass_door": 16,
    "create:weighted_ejector": 16,
    "create:smart_fluid_pipe": 16,
    "create:clockwork_bearing": 16,
    "create:elevator_pulley": 16,
    "create:brass_funnel": 16,
    "create:brass_tunnel": 16,
    "create:content_observer": 16,
    "create:stockpile_switch": 16,
    "create:display_link": 16,
    "create:display_board": 16,
    "create:nixie_tube": 16,
    "create:placard": 16,
    "create:pulse_repeater": 16,
    "create:pulse_extender": 16,
    "create:pelicular_bell": 16,
    "create:haunted_bell": 16,

    "create:mechanical_crafter": 17,
    "create:mechanical_arm": 17,
    "create:sequenced_gearshift": 17,
    "create:rotation_speed_controller": 17,
    "create:redstone_link": 17,
    "create:linked_controller": 17,

    "create:crushing_wheel": 18,
    "create:smart_chute": 18,

    "create:railway_casing": 20,
    "create:flywheel": 20,
    "create:deployer": 20,

    /* 2 track stations? */

    "railways:semaphore": 22,
    "railways:track_coupler": 22,
    "create:track_station": 22,
    "create:track_signal": 22,
    "create:track_observer": 22,

    "create:controls": 25,
    "create:train_door": 25,
    "create:train_trapdoor": 25,
    "railways:track_switch_andesite": 25,
    "railways:track_switch_brass": 25,    

    "create:blaze_burner": 30,
    "create:empty_blaze_burner": 30,
    "create:steam_engine": 30,

    "createaddition:connector": 35,
    "createaddition:small_light_connector": 35,
    "createaddition:large_connector": 35,
    "createaddition:redstone_relay": 35,
    "createaddition:tesla_coil": 35,
    "createaddition:modular_accumulator": 35,
    "createaddition:portable_energy_interface": 35,
    "createaddition:electric_motor": 35,
    "createaddition:alternator": 35,

    // Refined Storage
    "refinedstorage:controller": 40,
    "refinedstorage:grid": 40,
    "refinedstorage:crafting_grid": 40,
    "refinedstorage:fluid_grid": 40,
    "refinedstorage:pattern_grid": 40,
    "refinedstorage:crafter_manager": 40,
    "refinedstorage:crafting_monitor": 40,


    /* Shit don't exist (1-64k fluid blocks) */

    "refinedstorage:1k_storage_block": 40,
    "refinedstorage:4k_storage_block": 40,
    "refinedstorage:16k_storage_block": 40,
    "refinedstorage:64k_storage_block": 40,
    "refinedstorage:64k_fluid_storage_block": 40,
    "refinedstorage:256k_fluid_storage_block": 40,
    "refinedstorage:1024k_fluid_storage_block": 40,
    "refinedstorage:4096k_fluid_storage_block": 40,
    

    "refinedstorage:disk_drive": 40,
    "refinedstorage:importer": 40,
    "refinedstorage:cable": 40,
    "refinedstorage:exporter": 40,
    "refinedstorage:external_storage": 40
}

function giveToPlayerPlayer(player_name, item, count, server){
    server.runCommandSilent(`/give ${player_name} ${item} ${count}`);
}

BlockEvents.rightClicked(event => {
    let player = event.player;
    let block = event.block;
    let server = event.server;
    // Logic: Check if the player is right clicking the learning bench
    // If this is true, we get the player's persistent data and we check their current milestone id
    // Next up we check if they have the required items for the next milestone in their whole inventory
    // If they don't, we send a message to the player telling them they don't have the required items
    // If they do, we remove the required items from their inventory and set their current milestone to the next milestone
    // Once we do that, we send a message to the player telling them they've completed the milestone
    // We need to also set their PMMO level according to the milestone

    let blockId = block.id;
    if (blockId !== techProgLearningBench) {
        return;
    }


    let playerData = player.persistentData;
    let currentMilestone = techProgGetCurrentMilestone(playerData);


    let mainHandItem = player.getMainHandItem()
    let mainHandItemId = Item.getId(mainHandItem);
    if (mainHandItemId === null || mainHandItemId === "" || mainHandItemId === "minecraft:air") {
        if (currentMilestone === techProgMilestones[0]) {
            techProgSendWelcomeMessage(player);
        }
        if (currentMilestone !== null) {
            techProgSendCurrentMilestone(player, currentMilestone);
        }
    }

    if (currentMilestone === null) {
        player.sendSystemMessage("You've completed all the milestones");
        return;
    }

    let hasRequiredItems = techProgPlayerHasMilestoneItems(currentMilestone, player);

    if (!hasRequiredItems) {
        player.sendSystemMessage("You don't have the required items to complete this milestone");
        return;
    }

    techProgAdvanceToNextMilestone(server, player, currentMilestone, playerData);
});

function techProgAdvanceToNextMilestone(server, player, currentMilestone, playerData) {
    let pmmoApiUtils = Java.loadClass('harmonised.pmmo.api.APIUtils');
    PmmoAPIUtils.setLevel(techProgPmmoSkillName, player, currentMilestone.pmmoLevelSet);

    techProgRemoveMilestoneItems(currentMilestone, player);

    // Grant rewards to player
    for (const reward of currentMilestone.rewards) {
        giveToPlayerPlayer(player.name.string, reward.item, reward.amount, server);
    }

    playerData.putString("techProgLastCompletedMilestone", currentMilestone.id);
    player.sendSystemMessage("You've completed the milestone: " + currentMilestone.name);
}

function techProgPlayerHasMilestoneItems(milestone, player) {
    let requirementsCount = {};
    let playerInventory = player.inventory.items;
    for (const inventoryItemStack of playerInventory) {
        let inventoryItem = inventoryItemStack.item;
        let inventoryItemId = Item.getId(inventoryItem);
        for (const milestoneElement of milestone.requirements) {
            let item = milestoneElement.item;
            if (inventoryItemId === item) {
                if (requirementsCount[item] === undefined) {
                    requirementsCount[item] = 0;
                }
                requirementsCount[item] += inventoryItemStack.count;
            }
        }
    }

    let hasRequiredItems = true;
    for (const requirement of milestone.requirements) {
        let item = requirement.item;
        let amount = requirement.amount;
        if (requirementsCount[item] === undefined) {
            hasRequiredItems = false;
            player.sendSystemMessage("§cYou are missing §r§4" + amount + "x " + item + "§r");
        } else if (requirementsCount[item] < amount) {
            hasRequiredItems = false;
            let diff = amount - requirementsCount[item];
            player.sendSystemMessage("§cYou are missing §r§4" + diff + "x " + item + "§r");
        }
    }

    return hasRequiredItems;
}

function techProgRemoveMilestoneItems(milestone, player) {
    let requirementsCount = {};
    for (const requirement of milestone.requirements) {
        requirementsCount[requirement.item] = requirement.amount;
    }

    let playerInventory = player.inventory.items;
    for (const playerInventoryItemStack of playerInventory) {
        let playerInventoryItem = playerInventoryItemStack.item;
        let playerInventoryItemId = Item.getId(playerInventoryItem);
        if (requirementsCount[playerInventoryItemId] > 0) {
            let amountToRemove = requirementsCount[playerInventoryItemId];
            let inventoryItemStackCount = playerInventoryItemStack.count;
            if (amountToRemove >= inventoryItemStackCount) {
                playerInventoryItemStack.setCount(0);
                requirementsCount[playerInventoryItemId] -= inventoryItemStackCount;
            } else {
                playerInventoryItemStack.setCount(inventoryItemStackCount - amountToRemove);
                requirementsCount[playerInventoryItemId] = 0;
            }
        }
    }
}


function techProgGetCurrentMilestone(playerData) {
    let lastCompletedMilestone = playerData.getString("techProgLastCompletedMilestone");
    let currentMilestone = null;
    if (lastCompletedMilestone === null || lastCompletedMilestone === "") {
        return techProgMilestones[0];
    } else {
        let lastCompletedMilestoneIndex = techProgMilestones.findIndex(milestone => milestone.id === lastCompletedMilestone);
        if (lastCompletedMilestoneIndex === techProgMilestones.length - 1) {
            return null;
        } else {
            return techProgMilestones[lastCompletedMilestoneIndex + 1];
        }
    }
}

function techProgSendCurrentMilestone(player, currentMilestone) {
    player.sendSystemMessage("==============================================================");
    player.sendSystemMessage("Your §ecurrent milestone§r is: §a" + currentMilestone.name + "§r - §3" + currentMilestone.description + "§r");
    player.sendSystemMessage("");
    player.sendSystemMessage("Requirements: ");
    for (const requirement of currentMilestone.requirements) {
        let item = requirement.item;
        let amount = requirement.amount;
        player.sendSystemMessage("§d" + amount + "x §4" + item + "§r");
    }
    player.sendSystemMessage("");
    player.sendSystemMessage("Rewards: ");
    for (const reward of currentMilestone.rewards) {
        player.sendSystemMessage("§d" + reward.amount + "x §a" + reward.item + "§r");
    }
    player.sendSystemMessage("");
    player.sendSystemMessage("Completing this milestone will set your Engineering level to §b" + currentMilestone.pmmoLevelSet + "§r");
    player.sendSystemMessage("==============================================================");
}

function techProgSendWelcomeMessage(player) {
    player.sendSystemMessage("§eWelcome to the Engineering progression system. §r" +
        "In order to progress, you need to complete milestones. Each milestone grants you 5 levels in the Engineering skill.");
    player.sendSystemMessage("To §a complete a milestone§r, you need to §3right click the lectern with a piece of redstone in your hand§r. ");
    player.sendSystemMessage("You can §acheck your current milestone§r by §3right clicking the lectern with an empty hand§r. ");
    player.sendSystemMessage("Good luck!");
}
// TODO: add commands at some point to set to player's milestone