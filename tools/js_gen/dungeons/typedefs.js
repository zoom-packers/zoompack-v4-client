
/**
 * A Dungeon Theme
 * @typedef {Object} DungeonTheme
 * @property {string} id - The id of the theme
 * @property {block} cobblestone - The cobblestone block
 * @property {block} stoneBricks - The stone bricks block
 * @property {block} crackedStoneBricks - The cracked stone bricks block
 * @property {block} mossyStoneBricks - The mossy stone bricks block
 * @property {block} cobblestoneStairs - The cobblestone stairs block
 * @property {block} stoneBrickStairs - The stone brick stairs block
 * @property {block} cobblestoneSlab - The cobblestone slab block
 * @property {block} stoneBrickSlab - The stone brick slab block
 * @property {block} cobblestoneWall - The cobblestone wall block
 * @property {block} stoneBrickWall - The stone brick wall block
 * @property {block} ironBars - The iron bars block
 * @property {block} water - The water block
 */

/**
 * A Dungeon Level Monster Population
 * @typedef {Object} DungeonLevelMonsterPopulation
 * @property {DungeonLevelMonsterPopulationTier} common - The common tier
 * @property {DungeonLevelMonsterPopulationTier} rare - The rare tier
 */

/**
 * A Dungeon Level Monster Population Tier
 * @typedef {Object} DungeonLevelMonsterPopulationTier
 * @property {entity} entity - The entity name
 * @property {number} weight - The spawn weight
 */

/**
 * A Loot Table
 * @typedef {Object} LootTable
 * @property {LootTablePool[]} pools - The pools of the loot table
 */

/**
 * A Pool of loot tables
 * @typedef {Object} LootTablePool
 * @property {number} rolls - The number of rolls
 * @property {LootTableElement[]} entries - The entries
 */

/**
 * An element of a loot table
 * @typedef {Object} LootTableElement
 * @property {"item" | "loot_table" | "group"} type - The type of the element
 * @property {item | loot_table | undefined} name - The name of the element
 * @property {number | undefined} weight - The weight of the element
 * @property {LootTableElement[] | undefined} children - The sub-elements if the element is a group
 */

/**
 * A dimensional generation definition
 * @typedef {Object} DimensionalGenerationDefinition
 * @property {dimension} dimensionName
 * @property {string} simpleName
 * @property {biome[]} biomeNames
 * @property {LootTable[]} chestLootTables
 * @property {LootTable[]} treasureTables
 * @property {DungeonLevelMonsterPopulation[]} monsterPopulations
 * @property {DungeonTheme[]} themes
 * @property {{[key: biome]: number}} biomeThemeMappings
 */
