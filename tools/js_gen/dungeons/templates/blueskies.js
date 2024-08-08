const dims = require("../../typedefs/dimension_typedefs");
const items = require("../../typedefs/item_typedefs");
const blocks = require("../../typedefs/block_typedefs");
const entities = require("../../typedefs/entity_typedefs");
const biomes = require("../../typedefs/biome_typedefs");
const loot_tables = require("../../typedefs/loot_table_typedefs");
const {dimension_blue_skies} = require("../../typedefs/dimension_typedefs");
const {biome_blue_skies} = require("../../typedefs/biome_typedefs");
const {block_blue_skies, block_minecraft} = require("../../typedefs/block_typedefs");
const {loot_table_blue_skies} = require("../../typedefs/loot_table_typedefs");
const {entity_blue_skies, entity_minecraft} = require("../../typedefs/entity_typedefs");


/** @type {DimensionalGenerationDefinition} */
const everbright = {
    dimensionName: dimension_blue_skies.d_everbright,
    simpleName: dimension_blue_skies.d_everbright.split(":")[1],
    biomeNames: Object.values(biome_blue_skies),
    themes: [
        {
            id: 0,
            cobblestone: block_blue_skies.b_turquoise_cobblestone,
            stoneBricks: block_blue_skies.b_turquoise_stonebrick,
            crackedStoneBricks: block_blue_skies.b_cracked_turquoise_stonebrick,
            mossyStoneBricks: block_blue_skies.b_mossy_turquoise_stonebrick,
            cobblestoneStairs: block_blue_skies.b_turquoise_cobblestone_stairs,
            stoneBrickStairs: block_blue_skies.b_turquoise_stonebrick_stairs,
            cobblestoneSlab: block_blue_skies.b_turquoise_cobblestone_slab,
            stoneBrickSlab: block_blue_skies.b_turquoise_stonebrick_slab,
            cobblestoneWall: block_blue_skies.b_turquoise_cobblestone_wall,
            stoneBrickWall: block_blue_skies.b_turquoise_stonebrick_wall,
            ironBars: block_minecraft.b_iron_bars,
            water: block_minecraft.b_water,
        }
    ],
    biomeThemeMappings: Object.values(biome_blue_skies).reduce((acc, biome) => {
        acc[biome] = 0;
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
                            name: loot_table_blue_skies.l_chests_village_brightlands,
                            weight: 1
                        },
                        {
                            type: "loot_table",
                            name: loot_table_blue_skies.l_chests_village_profession_everbright_farm,
                            weight: 1
                        },
                        {
                            type: "loot_table",
                            name: loot_table_blue_skies.l_chests_village_profession_everbright_mason,
                            weight: 1
                        },
                        {
                            type: "loot_table",
                            name: loot_table_blue_skies.l_chests_village_profession_everbright_shepherd,
                            weight: 1
                        },
                        {
                            type: "loot_table",
                            name: loot_table_blue_skies.l_chests_village_profession_everbright_toolsmith,
                            weight: 1
                        },
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
                            name: loot_table_blue_skies.l_chests_bunker_common,
                            weight: 3
                        },
                        {
                            type: "loot_table",
                            name: loot_table_blue_skies.l_chests_blinding_dungeon_prison_chest_everbright,
                            weight: 1
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
                            name: loot_table_blue_skies.l_chests_bunker_rare,
                            weight: 2
                        },
                        {
                            type: "loot_table",
                            name: loot_table_blue_skies.l_chests_blinding_dungeon_prison_chest_everbright,
                            weight: 1
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
                            name: loot_table_blue_skies.l_chests_cave_spawner_chest_everbright,
                            weight: 1
                        },
                        {
                            type: "loot_table",
                            name: loot_table_blue_skies.l_chests_cave_spawner_chest_everdawn,
                            weight: 1
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
                            name: loot_table_blue_skies.l_chests_blinding_dungeon_study_chest,
                            weight: 1
                        },
                        {
                            type: "loot_table",
                            name: loot_table_blue_skies.l_chests_nature_dungeon_chest,
                            weight: 1
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
                    entity: entity_blue_skies.e_shrumpty,
                    weight: 3
                },
                {
                    entity: entity_blue_skies.e_armored_frost_spirit,
                    weight: 1
                },
            ],
            rare: [
                {
                    entity: entity_blue_skies.e_infested_swarmer,
                    weight: 1
                }
            ]
        },
        {
            common: [
                {
                    entity: entity_blue_skies.e_shrumpty,
                    weight: 2
                },
                {
                    entity: entity_blue_skies.e_armored_frost_spirit,
                    weight: 2
                },
                {
                    entity: entity_minecraft.e_vindicator,
                    weight: 1
                }
            ],
            rare: [
                {
                    entity: entity_blue_skies.e_diophyde_prowler,
                    weight: 1
                },
                {
                    entity: entity_blue_skies.e_infested_swarmer,
                    weight: 2
                },
            ]
        },
        {
            common: [
                {
                    entity: entity_blue_skies.e_shrumpty,
                    weight: 1
                },
                {
                    entity: entity_blue_skies.e_armored_frost_spirit,
                    weight: 3
                },
            ],
            rare: [
                {
                    entity: entity_blue_skies.e_diophyde_prowler,
                    weight: 2
                },
                {
                    entity: entity_blue_skies.e_stonelet,
                    weight: 1
                }
            ]
        },
        {
            common: [
                {
                    entity: entity_blue_skies.e_shrumpty,
                    weight: 1
                },
                {
                    entity: entity_blue_skies.e_armored_frost_spirit,
                    weight: 1
                },
                {
                    entity: entity_minecraft.e_vindicator,
                    weight: 1
                },
                {
                    entity: entity_blue_skies.e_diophyde_prowler,
                    weight: 2
                },
                {
                    entity: entity_blue_skies.e_infested_swarmer,
                    weight: 2
                },
            ],
            rare: [
                {
                    entity: entity_blue_skies.e_diophyde_prowler,
                    weight: 2
                },
                {
                    entity: entity_blue_skies.e_stonelet,
                    weight: 1
                }
            ]
        },
        {
            common: [
                {
                    entity: entity_blue_skies.e_shrumpty,
                    weight: 1
                },
                {
                    entity: entity_blue_skies.e_armored_frost_spirit,
                    weight: 1
                },
                {
                    entity: entity_minecraft.e_vindicator,
                    weight: 1
                },
                {
                    entity: entity_blue_skies.e_diophyde_prowler,
                    weight: 3
                },
                {
                    entity: entity_blue_skies.e_infested_swarmer,
                    weight: 3
                },
                {
                    entity: entity_blue_skies.e_diophyde_prowler,
                    weight: 3
                },
                {
                    entity: entity_blue_skies.e_stonelet,
                    weight: 2
                }
            ],
            rare: [
                {
                    entity: entity_blue_skies.e_diophyde_prowler,
                    weight: 2
                },
                {
                    entity: entity_blue_skies.e_stonelet,
                    weight: 1
                }
            ]
        }
    ],
}

/** @type {DimensionalGenerationDefinition} */
const everdawn = {
    dimensionName: dimension_blue_skies.d_everdawn,
    simpleName: dimension_blue_skies.d_everdawn.split(":")[1],
    biomeNames: Object.values(biome_blue_skies),
    themes: [
        {
            id: 0,
            cobblestone: block_blue_skies.b_lunar_cobblestone,
            stoneBricks: block_blue_skies.b_lunar_stonebrick,
            crackedStoneBricks: block_blue_skies.b_cracked_lunar_stonebrick,
            mossyStoneBricks: block_blue_skies.b_mossy_lunar_stonebrick,
            cobblestoneStairs: block_blue_skies.b_lunar_cobblestone_stairs,
            stoneBrickStairs: block_blue_skies.b_lunar_stonebrick_stairs,
            cobblestoneSlab: block_blue_skies.b_lunar_cobblestone_slab,
            stoneBrickSlab: block_blue_skies.b_lunar_stonebrick_slab,
            cobblestoneWall: block_blue_skies.b_lunar_cobblestone_wall,
            stoneBrickWall: block_blue_skies.b_lunar_stonebrick_wall,
            ironBars: block_minecraft.b_iron_bars,
            water: block_minecraft.b_water,
        }
    ],
    biomeThemeMappings: Object.values(biome_blue_skies).reduce((acc, biome) => {
        acc[biome] = 0;
        return acc;
    }, {}),
    chestLootTables: [
        {
            pools: [
                {
                    rolls: 2,
                    entries: [
                        {
                            type: "loot_table",
                            name: loot_table_blue_skies.l_chests_village_brightlands,
                            weight: 1
                        },
                        {
                            type: "loot_table",
                            name: loot_table_blue_skies.l_chests_village_profession_everdawn_farm,
                            weight: 1
                        },
                        {
                            type: "loot_table",
                            name: loot_table_blue_skies.l_chests_village_profession_everdawn_mason,
                            weight: 1
                        },
                        {
                            type: "loot_table",
                            name: loot_table_blue_skies.l_chests_village_profession_everdawn_shepherd,
                            weight: 1
                        },
                        {
                            type: "loot_table",
                            name: loot_table_blue_skies.l_chests_village_profession_everdawn_toolsmith,
                            weight: 1
                        },
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
                            name: loot_table_blue_skies.l_chests_bunker_common,
                            weight: 3
                        },
                        {
                            type: "loot_table",
                            name: loot_table_blue_skies.l_chests_blinding_dungeon_prison_chest_everdawn,
                            weight: 1
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
                            name: loot_table_blue_skies.l_chests_bunker_rare,
                            weight: 2
                        },
                        {
                            type: "loot_table",
                            name: loot_table_blue_skies.l_chests_blinding_dungeon_prison_chest_everdawn,
                            weight: 1
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
                            name: loot_table_blue_skies.l_chests_cave_spawner_chest_everdawn,
                            weight: 1
                        },
                        {
                            type: "loot_table",
                            name: loot_table_blue_skies.l_chests_cave_spawner_chest_everbright,
                            weight: 1
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
                            name: loot_table_blue_skies.l_chests_blinding_dungeon_study_chest,
                            weight: 1
                        },
                        {
                            type: "loot_table",
                            name: loot_table_blue_skies.l_chests_nature_dungeon_chest,
                            weight: 1
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
                    entity: entity_minecraft.e_spider,
                    weight: 3
                },
                {
                    entity: entity_blue_skies.e_armored_frost_spirit,
                    weight: 1
                },
            ],
            rare: [
                {
                    entity: entity_blue_skies.e_infested_swarmer,
                    weight: 1
                }
            ]
        },
        {
            common: [
                {
                    entity: entity_minecraft.e_spider,
                    weight: 2
                },
                {
                    entity: entity_minecraft.e_witch,
                    weight: 2
                },
                {
                    entity: entity_minecraft.e_vindicator,
                    weight: 1
                }
            ],
            rare: [
                {
                    entity: entity_blue_skies.e_venom_spider,
                    weight: 1
                },
                {
                    entity: entity_blue_skies.e_infested_swarmer,
                    weight: 2
                },
            ]
        },
        {
            common: [
                {
                    entity: entity_minecraft.e_spider,
                    weight: 1
                },
                {
                    entity: entity_minecraft.e_witch,
                    weight: 3
                },
            ],
            rare: [
                {
                    entity: entity_blue_skies.e_venom_spider,
                    weight: 2
                },
                {
                    entity: entity_blue_skies.e_stonelet,
                    weight: 1
                }
            ]
        },
        {
            common: [
                {
                    entity: entity_minecraft.e_spider,
                    weight: 1
                },
                {
                    entity: entity_minecraft.e_witch,
                    weight: 1
                },
                {
                    entity: entity_minecraft.e_witch,
                    weight: 1
                },
                {
                    entity: entity_minecraft.e_vindicator,
                    weight: 1
                },
                {
                    entity: entity_blue_skies.e_venom_spider,
                    weight: 2
                },
                {
                    entity: entity_blue_skies.e_infested_swarmer,
                    weight: 2
                },
            ],
            rare: [
                {
                    entity: entity_blue_skies.e_venom_spider,
                    weight: 2
                },
                {
                    entity: entity_blue_skies.e_stonelet,
                    weight: 1
                }
            ]
        },
        {
            common: [
                {
                    entity: entity_minecraft.e_spider,
                    weight: 1
                },
                {
                    entity: entity_minecraft.e_witch,
                    weight: 1
                },
                {
                    entity: entity_minecraft.e_witch,
                    weight: 1
                },
                {
                    entity: entity_minecraft.e_vindicator,
                    weight: 1
                },
                {
                    entity: entity_blue_skies.e_venom_spider,
                    weight: 3
                },
                {
                    entity: entity_blue_skies.e_infested_swarmer,
                    weight: 3
                },
                {
                    entity: entity_blue_skies.e_venom_spider,
                    weight: 3
                },
                {
                    entity: entity_blue_skies.e_stonelet,
                    weight: 2
                }
            ],
            rare: [
                {
                    entity: entity_blue_skies.e_venom_spider,
                    weight: 2
                },
                {
                    entity: entity_blue_skies.e_stonelet,
                    weight: 1
                }
            ]
        }
    ]
}

module.exports = {
    everbright,
    everdawn
}
