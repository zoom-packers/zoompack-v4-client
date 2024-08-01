const dims = require("../../libs/dimension_typedefs");
const items = require("../../libs/item_typedefs");
const blocks = require("../../libs/block_typedefs");
const entities = require("../../libs/entity_typedefs");
const biomes = require("../../libs/biome_typedefs");
const loot_tables = require("../../libs/loot_table_typedefs");
const {dimension_aether} = require("../../libs/dimension_typedefs");
const {block_aether, block_minecraft, block_create} = require("../../libs/block_typedefs");

/** @type {DimensionalGenerationDefinition} */
const aether = {
    dimensionName: dimension_aether.d_the_aether,
    simpleName: dimension_aether.d_the_aether.split(":")[1],
    biomeNames: Object.values(biomes.biome_aether),
    themes: [
        {
            id: 0,
            cobblestone: block_aether.b_icestone,
            stoneBricks: block_aether.b_holystone_bricks,
            crackedStoneBricks: block_aether.b_holystone_bricks,
            mossyStoneBricks: block_aether.b_holystone_bricks,
            cobblestoneStairs: block_aether.b_icestone_stairs,
            stoneBrickStairs: block_aether.b_holystone_brick_stairs,
            cobblestoneSlab: block_aether.b_icestone_slab,
            stoneBrickSlab: block_aether.b_holystone_brick_slab,
            cobblestoneWall: block_aether.b_icestone_wall,
            stoneBrickWall: block_aether.b_holystone_brick_wall,
            ironBars: block_create.b_brass_bars,
            water: block_minecraft.b_water,
        }
    ],
    biomeThemeMappings: Object.values(biomes.biome_aether).reduce((acc, biome) => {
        acc[biome] = 0
        return acc;
    }, {}),
    chestLootTables: [[],[],[],[],[]],
    treasureTables: [[],[],[],[],[]],
    monsterPopulations: [
        {
            common: [
                {
                    entity: entities.entity_aether.e_blue_swet,
                    weight: 1
                },
                {
                    entity: entities.entity_aether.e_golden_swet,
                    weight: 1
                }
            ],
            rare: [
                {
                    entity: entities.entity_aether.e_aechor_plant,
                    weight: 1
                }
            ]
        },
        {
            common: [
                {
                    entity: entities.entity_aether.e_blue_swet,
                    weight: 1
                },
                {
                    entity: entities.entity_aether.e_golden_swet,
                    weight: 1
                },
                {
                    entity: entities.entity_aether.e_aechor_plant,
                    weight: 1
                }
            ],
            rare: [
                {
                    entity: entities.entity_aether.e_zephyr,
                    weight: 1
                }
            ]
        },
        {
            common: [
                {
                    entity: entities.entity_aether.e_blue_swet,
                    weight: 1
                },
                {
                    entity: entities.entity_aether.e_golden_swet,
                    weight: 1
                },
                {
                    entity: entities.entity_aether.e_aechor_plant,
                    weight: 2
                },
                {
                    entity: entities.entity_aether.e_zephyr,
                    weight: 2
                }
            ],
            rare: [
                {
                    entity: entities.entity_aether.e_sentry,
                    weight: 1
                },
                {
                    entity: entities.entity_aether.e_mimic,
                    weight: 1
                },
                {
                    entity: entities.entity_aether.e_fire_minion,
                    weight: 1
                }
            ]
        },
        {
            common: [
                {
                    entity: entities.entity_aether.e_aechor_plant,
                    weight: 3
                },
                {
                    entity: entities.entity_aether.e_zephyr,
                    weight: 3
                },
                {
                    entity: entities.entity_aether.e_sentry,
                    weight: 1
                },
                {
                    entity: entities.entity_aether.e_mimic,
                    weight: 1
                },
                {
                    entity: entities.entity_aether.e_fire_minion,
                    weight: 1
                }
            ],
            rare: [
                {
                    entity: entities.entity_aether.e_sentry,
                    weight: 1
                },
                {
                    entity: entities.entity_aether.e_mimic,
                    weight: 1
                },
                {
                    entity: entities.entity_aether.e_fire_minion,
                    weight: 1
                }
            ]
        },
        {
            common: [
                {
                    entity: entities.entity_aether.e_sentry,
                    weight: 1
                },
                {
                    entity: entities.entity_aether.e_mimic,
                    weight: 1
                },
                {
                    entity: entities.entity_aether.e_fire_minion,
                    weight: 1
                }
            ],
            rare: [
                {
                    entity: entities.entity_aether.e_sentry,
                    weight: 1
                },
                {
                    entity: entities.entity_aether.e_mimic,
                    weight: 1
                },
                {
                    entity: entities.entity_aether.e_fire_minion,
                    weight: 1
                }
            ]
        }
    ]
}


module.exports = {
    aether
}
