const dims = require("../../libs/dimension_typedefs");
const items = require("../../libs/item_typedefs");
const blocks = require("../../libs/block_typedefs");
const entities = require("../../libs/entity_typedefs");
const biomes = require("../../libs/biome_typedefs");
const {biome_betternether, biome_betterend} = require("../../libs/biome_typedefs");
const {entity_minecraft, entity_betternether, entity_betterend, entity_endermanoverhaul, entity_outer_end,
} = require("../../libs/entity_typedefs");
const loot_tables = require("../../libs/loot_table_typedefs");
const {loot_table_minecraft} = require("../../libs/loot_table_typedefs");


/** @type {DimensionalGenerationDefinition} */
const nether = {
    dimensionName: dims.dimension_minecraft.d_the_nether,
    simpleName: dims.dimension_minecraft.d_the_nether.split(":")[1],
    biomeNames: Object.values(biome_betternether),
    themes: [
        {
            id: 0,
            cobblestone: blocks.block_minecraft.b_netherrack,
            stoneBricks: blocks.block_minecraft.b_nether_bricks,
            crackedStoneBricks: blocks.block_minecraft.b_red_nether_bricks,
            mossyStoneBricks: blocks.block_minecraft.b_nether_bricks,
            cobblestoneStairs: blocks.block_minecraft.b_nether_brick_stairs,
            stoneBrickStairs: blocks.block_minecraft.b_red_nether_brick_stairs,
            cobblestoneSlab: blocks.block_minecraft.b_nether_brick_slab,
            stoneBrickSlab: blocks.block_minecraft.b_red_nether_brick_slab,
            cobblestoneWall: blocks.block_minecraft.b_nether_brick_wall,
            stoneBrickWall: blocks.block_minecraft.b_red_nether_brick_wall,
            ironBars: blocks.block_betternether.b_cincinnasite_bars,
            water: blocks.block_minecraft.b_lava,
        }
    ],
    biomeThemeMappings: Object.values(biome_betternether).reduce((acc, biome) => {
        acc[biome] = 0
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
                            name: loot_tables.loot_table_betternether.l_chests_city_common,
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
                            name: loot_tables.loot_table_betternether.l_chests_city,
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
                            name: loot_tables.loot_table_betternether.l_chests_wither_tower,
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
                            type: "loot_table",
                            name: loot_tables.loot_table_betternether.l_chests_wither_tower,
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
                            name: loot_table_minecraft.l_chests_bastion_bridge,
                        },
                        {
                            type: "loot_table",
                            name: loot_tables.loot_table_minecraft.l_chests_bastion_other,
                        },
                        {
                            type: "loot_table",
                            name: loot_tables.loot_table_minecraft.l_chests_bastion_treasure,
                        },
                        {
                            type: "loot_table",
                            name: loot_tables.loot_table_minecraft.l_chests_bastion_hoglin_stable,
                        }
                    ]
                }
            ]
        }
    ],
    treasureTables: [[],[],[],[],[]],
    monsterPopulations: [
        {
            common: [
                {
                    entity: entity_minecraft.e_piglin,
                    weight: 1
                }
            ],
            rare: [
                {
                    entity: entity_minecraft.e_hoglin,
                    weight: 1
                }
            ]
        },
        {
            common: [
                {
                    entity: entity_minecraft.e_piglin,
                    weight: 1
                },
                {
                    entity: entity_minecraft.e_wither_skeleton,
                    weight: 1
                },
                {
                    entity: entity_minecraft.e_blaze,
                    weight: 1
                }
            ],
            rare: [
                {
                    entity: entity_minecraft.e_hoglin,
                    weight: 1
                },
                {
                    entity: entity_minecraft.e_piglin_brute,
                    weight: 1
                }
            ]
        },
        {
            common: [
                {
                    entity: entity_minecraft.e_piglin,
                    weight: 1
                },
                {
                    entity: entity_minecraft.e_wither_skeleton,
                    weight: 1
                },
                {
                    entity: entity_minecraft.e_blaze,
                    weight: 2
                },
                {
                    entity: entity_minecraft.e_piglin_brute,
                    weight: 2
                }
            ],
            rare: [
                {
                    entity: entity_minecraft.e_hoglin,
                    weight: 1
                },
                {
                    entity: entity_minecraft.e_piglin_brute,
                    weight: 1
                },
                {
                    entity: entity_betternether.e_naga,
                    weight: 1
                }
            ]
        },
        {
            common: [
                {
                    entity: entity_minecraft.e_blaze,
                    weight: 1
                },
                {
                    entity: entity_minecraft.e_piglin_brute,
                    weight: 2
                },
                {
                    entity: entity_betternether.e_naga,
                    weight: 3
                },
            ],
            rare: [
                {
                    entity: entity_minecraft.e_piglin_brute,
                    weight: 1
                },
                {
                    entity: entity_betternether.e_naga,
                    weight: 3
                },
                {
                    entity: entity_betternether.e_hydrogen_jellyfish,
                    weight: 1
                }
            ]
        },
        {
            common: [
                {
                    entity: entity_minecraft.e_blaze,
                    weight: 1
                },
                {
                    entity: entity_minecraft.e_piglin_brute,
                    weight: 2
                },
                {
                    entity: entity_betternether.e_naga,
                    weight: 3
                },
            ],
            rare: [
                {
                    entity: entity_betternether.e_hydrogen_jellyfish,
                    weight: 1
                }
            ]
        }
    ]
}

const end = {
    dimensionName: dims.dimension_minecraft.d_the_end,
    simpleName: dims.dimension_minecraft.d_the_end.split(":")[1],
    biomeNames: Object.values(biome_betterend),
    themes: [
        {
            id: 0,
            cobblestone: blocks.block_minecraft.b_end_stone,
            stoneBricks: blocks.block_minecraft.b_end_stone_bricks,
            crackedStoneBricks: blocks.block_minecraft.b_end_stone_bricks,
            mossyStoneBricks: blocks.block_minecraft.b_end_stone_bricks,
            cobblestoneStairs: blocks.block_minecraft.b_end_stone_brick_cracked_stairs,
            stoneBrickStairs: blocks.block_minecraft.b_end_stone_brick_stairs,
            cobblestoneSlab: blocks.block_minecraft.b_end_stone_brick_cracked_slab,
            stoneBrickSlab: blocks.block_minecraft.b_end_stone_brick_slab,
            cobblestoneWall: blocks.block_minecraft.b_end_stone_brick_cracked_wall,
            stoneBrickWall: blocks.block_minecraft.b_end_stone_brick_wall,
            ironBars: blocks.block_betterend.b_terminite_bars,
            water: blocks.block_outer_end.b_brine,
        }
    ],
    biomeThemeMappings: Object.values(biome_betterend).reduce((acc, biome) => {
        acc[biome] = 0
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
                            name: loot_tables.loot_table_betterend.l_chests_end_village_loot,
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
                            name: loot_tables.loot_table_betterend.l_chests_end_village_loot,
                        }
                    ]
                }
            ]
        },
        {
            pools: [
                {
                    rolls: 1,
                    entries: [
                        {
                            type: "loot_table",
                            name: loot_tables.loot_table_betterend.l_chests_chorus_forest,
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
                            name: loot_tables.loot_table_betterend.l_chests_shadow_forest,
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
                            type: "loot_table",
                            name: loot_table_minecraft.l_chests_end_city_treasure,
                        },
                        {
                            type: "loot_table",
                            name: loot_tables.loot_table_betterend.l_chests_chorus_forest,
                        },
                        {
                            type: "loot_table",
                            name: loot_tables.loot_table_betterend.l_chests_shadow_forest,
                        },
                        {
                            type: "loot_table",
                            name: loot_tables.loot_table_betterend.l_chests_foggy_mushroomland,
                        },
                        {
                            type: "loot_table",
                            name: loot_tables.loot_table_betterend.l_chests_lantern_woods,
                        },
                        {
                            type: "loot_table",
                            name: loot_tables.loot_table_betterend.l_blocks_umbrella_tree_chest,
                        }
                    ]
                }
            ]
        }
    ],
    treasureTables: [[],[],[],[],[]],
    monsterPopulations: [
        {
            common: [
                {
                    entity: entity_minecraft.e_endermite,
                    weight: 1
                },
                {
                    entity: entity_betterend.e_end_slime,
                    weight: 1
                },
            ],
            rare: [
                {
                    entity: entity_betterend.e_shadow_walker,
                    weight: 1
                }
            ]
        },
        {
            common: [
                {
                    entity: entity_minecraft.e_endermite,
                    weight: 1
                },
                {
                    entity: entity_betterend.e_end_slime,
                    weight: 1
                },
                {
                    entity: entity_endermanoverhaul.e_end_enderman,
                    weight: 1
                },
                {
                    entity: entity_minecraft.e_enderman,
                    weight: 1
                }
            ],
            rare: [
                {
                    entity: entity_betterend.e_shadow_walker,
                    weight: 1
                }
            ]
        },
        {
            common: [
                {
                    entity: entity_outer_end.e_sinker,
                    weight: 1
                },
                {
                    entity: entity_betterend.e_shadow_walker,
                    weight: 1
                },
                {
                    entity: entity_minecraft.e_enderman,
                    weight: 1
                },
                {
                    entity: entity_minecraft.e_enderman,
                    weight: 1
                }
            ],
            rare: [
                {
                    entity: entity_outer_end.e_entombed,
                    weight: 1
                }
            ]
        },
        {
            common: [
                {
                    entity: entity_outer_end.e_stalker,
                    weight: 1
                },
                {
                    entity: entity_outer_end.e_himmelite,
                    weight: 1
                },
                {
                    entity: entity_outer_end.e_entombed,
                    weight: 1
                }
            ],
            rare: [
                {
                    entity: entity_outer_end.e_purpur_golem,
                    weight: 1
                }
            ]
        },
        {
            common: [
                {
                    entity: entity_outer_end.e_stalker,
                    weight: 1
                },
                {
                    entity: entity_outer_end.e_himmelite,
                    weight: 1
                },
                {
                    entity: entity_outer_end.e_entombed,
                    weight: 1
                }
            ],
            rare: [
                {
                    entity: entity_outer_end.e_purpur_golem,
                    weight: 1
                }
            ]
        }
    ]
}

module.exports = {
    nether,
    end
}
