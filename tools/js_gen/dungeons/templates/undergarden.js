const dims = require("../../libs/dimension_typedefs");
const items = require("../../libs/item_typedefs");
const blocks = require("../../libs/block_typedefs");
const entities = require("../../libs/entity_typedefs");
const biomes = require("../../libs/biome_typedefs");
const loot_tables = require("../../libs/loot_table_typedefs");
const dimension_undergarden = dims.dimension_undergarden;
const block_undergarden = blocks.block_undergarden;
const entity_undergarden = entities.entity_undergarden;
const biome_undergarden = biomes.biome_undergarden;
const loot_table_undergarden = loot_tables.loot_table_undergarden;
const loot_table_apotheosis = loot_tables.loot_table_apotheosis;
const block_minecraft = blocks.block_minecraft;

/** @type {DimensionalGenerationDefinition} */
const template = {
    dimensionName: dimension_undergarden.d_undergarden,
    simpleName: dimension_undergarden.d_undergarden.split(":")[1],
    biomeNames: Object.values(biome_undergarden),
    themes: [
        {
            id: 0,
            cobblestone: block_undergarden.b_shiverstone,
            stoneBricks: block_undergarden.b_shiverstone_bricks,
            crackedStoneBricks: block_undergarden.b_cracked_shiverstone_bricks,
            mossyStoneBricks: block_undergarden.b_cracked_tremblecrust_bricks,
            cobblestoneStairs: block_undergarden.b_shiverstone_stairs,
            stoneBrickStairs: block_undergarden.b_shiverstone_brick_stairs,
            cobblestoneSlab: block_undergarden.b_shiverstone_slab,
            stoneBrickSlab: block_undergarden.b_shiverstone_brick_slab,
            cobblestoneWall: block_undergarden.b_shiverstone_wall,
            stoneBrickWall: block_undergarden.b_shiverstone_brick_wall,
            ironBars: block_undergarden.b_cloggrum_bars,
            water: block_minecraft.b_water,
        },
        {
            id: 1,
            cobblestone: block_undergarden.b_tremblecrust,
            stoneBricks: block_undergarden.b_tremblecrust_bricks,
            crackedStoneBricks: block_undergarden.b_cracked_tremblecrust_bricks,
            mossyStoneBricks: block_undergarden.b_cracked_depthrock_bricks,
            cobblestoneStairs: block_undergarden.b_tremblecrust_stairs,
            stoneBrickStairs: block_undergarden.b_tremblecrust_brick_stairs,
            cobblestoneSlab: block_undergarden.b_tremblecrust_slab,
            stoneBrickSlab: block_undergarden.b_tremblecrust_brick_slab,
            cobblestoneWall: block_undergarden.b_tremblecrust_wall,
            stoneBrickWall: block_undergarden.b_tremblecrust_brick_wall,
            ironBars: block_undergarden.b_cloggrum_bars,
            water: block_minecraft.b_lava,
        }
    ],
    biomeThemeMappings: Object.values(biome_undergarden).reduce((acc, biome) => {
        acc[biome] = biome.split(":")[1].charCodeAt(0) % 2
        return acc;
    }, {}),
    chestLootTables: [
        {
            pools: [
                {
                    rolls: 1,
                    entries: [
                        {
                            type: "loot_table",
                            name: loot_table_undergarden.l_chests_catacombs
                        }
                    ]
                }
            ]
        },
        {
            pools: [
                {
                    rolls: 2,
                    entries: [
                        {
                            type: "loot_table",
                            name: loot_table_undergarden.l_chests_catacombs,
                            weight: 1
                        }
                    ]
                }
            ]
        },
        {
            pools: [
                {
                    rolls: 3,
                    entries: [
                        {
                            type: "group",
                            children: [
                                {
                                    type: "loot_table",
                                    name: loot_table_undergarden.l_chests_catacombs,
                                    weight: 2
                                },
                                {
                                    type: "loot_table",
                                    name: loot_table_apotheosis.l_chests_chest_valuable,
                                    weight: 1
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            pools: [
                {
                    rolls: 5,
                    entries: [
                        {
                            type: "group",
                            children: [
                                {
                                    type: "loot_table",
                                    name: loot_table_undergarden.l_chests_catacombs,
                                    weight: 2
                                },
                                {
                                    type: "loot_table",
                                    name: loot_table_apotheosis.l_chests_chest_valuable,
                                    weight: 2
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            pools: [
                {
                    rolls: 7,
                    entries: [
                        {
                            type: "group",
                            children: [
                                {
                                    type: "loot_table",
                                    name: loot_table_undergarden.l_chests_catacombs,
                                    weight: 2
                                },
                                {
                                    type: "loot_table",
                                    name: loot_table_apotheosis.l_chests_chest_valuable,
                                    weight: 1
                                }
                            ]
                        }
                    ]
                }
            ]
        },
    ],
    treasureTables: [[],[],[],[],[]],
    monsterPopulations: [
        {
            common: [
                {
                    entity: entity_undergarden.e_dweller,
                    weight: 1
                },
                {
                    entity: entity_undergarden.e_mog,
                    weight: 1
                },
                {
                    entity: entity_undergarden.e_gloomper,
                    weight: 1
                }
            ],
            rare : [
                {
                    entity: entity_undergarden.e_rotling,
                    weight: 1
                },
            ]
        },
        {
            common: [
                {
                    entity: entity_undergarden.e_rotling,
                    weight: 1
                },
                {
                    entity: entity_undergarden.e_rotwalker,
                    weight: 1
                }
            ],
            rare : [
                {
                    entity: entity_undergarden.e_rotbeast,
                    weight: 1
                },
            ]
        },
        {
            common: [
                {
                    entity: entity_undergarden.e_rotwalker,
                    weight: 1
                },
            ],
            rare : [
                {
                    entity: entity_undergarden.e_rotbeast,
                    weight: 1
                },
                {
                    entity: entity_undergarden.e_nargoyle,
                    weight: 1
                },
                {
                    entity: entity_undergarden.e_forgotten,
                    weight: 1
                }
            ]
        },
        {
            common: [
                {
                    entity: entity_undergarden.e_rotwalker,
                    weight: 1
                },
                {
                    entity: entity_undergarden.e_sploogie,
                    weight: 1
                },
                {
                    entity: entity_undergarden.e_nargoyle,
                    weight: 1
                },
                {
                    entity: entity_undergarden.e_forgotten,
                    weight: 1
                }
            ],
            rare : [
                {
                    entity: entity_undergarden.e_rotbeast,
                    weight: 1
                },
                {
                    entity: entity_undergarden.e_forgotten_guardian,
                    weight: 1
                }
            ]
        },
        {
            common: [
                {
                    entity: entity_undergarden.e_forgotten,
                    weight: 3
                },
                {
                    entity: entity_undergarden.e_rotbeast,
                    weight: 1
                },
                {
                    entity: entity_undergarden.e_nargoyle,
                    weight: 2
                },
                {
                    entity: entity_undergarden.e_forgotten_guardian,
                    weight: 1
                }
            ],
            rare : [
                {
                    entity: entity_undergarden.e_rotbeast,
                    weight: 1
                },
                {
                    entity: entity_undergarden.e_forgotten_guardian,
                    weight: 2
                }
            ]
        }
    ]
}

module.exports = {
    template
}
