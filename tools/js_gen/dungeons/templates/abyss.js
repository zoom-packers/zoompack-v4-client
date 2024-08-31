const dims = require("../../typedefs/dimension_typedefs");
const items = require("../../typedefs/item_typedefs");
const blocks = require("../../typedefs/block_typedefs");
const entities = require("../../typedefs/entity_typedefs");
const biomes = require("../../typedefs/biome_typedefs");
const {dimension_theabyss} = require("../../typedefs/dimension_typedefs");

/** @type {DimensionalGenerationDefinition} */
const abyss = {
    dimensionName: dimension_theabyss.d_the_abyss,
    simpleName: dimension_theabyss.d_the_abyss.split(":")[1],
    biomeNames: Object.values(biomes.biome_theabyss),
    themes: [
        {
            id: 0,
            cobblestone: blocks.block_theabyss.b_cobble_stone,
            stoneBricks: blocks.block_theabyss.b_frost_brick,
            crackedStoneBricks: blocks.block_theabyss.b_frost_brick_cracked,
            mossyStoneBricks: blocks.block_theabyss.b_frost_brick,
            cobblestoneStairs: blocks.block_theabyss.b_cobble_stone_stairs,
            stoneBrickStairs: blocks.block_theabyss.b_frost_brick_stairs,
            cobblestoneSlab: blocks.block_theabyss.b_cobble_stone_slab,
            stoneBrickSlab: blocks.block_theabyss.b_frost_bricks_slab,
            cobblestoneWall: blocks.block_theabyss.b_cobble_stone_wall,
            stoneBrickWall: blocks.block_theabyss.b_frost_brick_wall,
            ironBars: blocks.block_create.b_andesite_bars,
            water: blocks.block_theabyss.b_infused_lava,
        }
    ],
    biomeThemeMappings: Object.values(biomes.biome_theabyss).reduce((acc, biome) => {
        acc[biome] = 0
        return acc;
    }, {}),
    chestLootTables: [[],[],[],[],[]],
    treasureTables: [[],[],[],[],[]],
    monsterPopulations: [
        
    ]
}
