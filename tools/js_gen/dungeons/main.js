const fs = require('fs');
const undergarden = require('./templates/undergarden');
const blueskies = require('./templates/blueskies');
const aether = require('./templates/aether');
const minecraft = require('./templates/minecraft');

const themeTemplate = fs.readFileSync('./templates/theme.json', 'utf8');
const defaultDungeonConfig = require('./templates/default_dungeon.json');

const rootPath = '../../../config/paxi/datapacks/dungeon_crawl_custom/data/dungeoncrawl';
const dimensionsFilePath = `${rootPath}/dimensions.json`;
const hasStructureFilePath = `${rootPath}/tags/worldgen/biome/has_structure/dungeon.json`;
const dungeonBiomeMappingsFilePath = `${rootPath}/dungeon/biome_mappings/default.json`;
const dungeonTypesFilePath = `${rootPath}/dungeon/types/{dimension}/default.json`;
const lootTablesPath = `${rootPath}/loot_tables/chests/{dimension}`;
const treasureTablesPath = `${rootPath}/treasure/{dimension}`;
const entitiesPath = `${rootPath}/monster/entities/{dimension}`;
const themingMappingsPrimaryPath = `${rootPath}/theming/mappings/primary/{dimension}`;
const themingPrimaryThemesPath = `${rootPath}/theming/primary_themes/{dimension}`;

function generateDungeons() {
    /** @type {DimensionalGenerationDefinition[]} */
    const dungeons = [
        blueskies.everdawn,
        blueskies.everbright,
        aether.aether,
        minecraft.nether,
        undergarden.template,
        minecraft.end
    ];
    dungeons.forEach((dungeon) => {
        writeDungeonConfiguration(dungeon, dungeonTypesFilePath);
        writeLootTables(dungeon, lootTablesPath);
        writeTreasureTables(dungeon, treasureTablesPath);
        writePopulations(dungeon, entitiesPath);
        writeThemes(dungeon, themingPrimaryThemesPath);
        writeThemeMappings(dungeon, themingMappingsPrimaryPath);
    });
    const simplifiedDimensions = dungeons.map((dungeon) => dungeon.simpleName);
    const allBiomes = dungeons.map((dungeon) => dungeon.biomeNames).flat();
    const biomeDimensionMappings = dungeons.map((dungeon) => dungeon.biomeNames.map((biome) => {
        return {biome: biome, dimension: dungeon.simpleName};
    })).flat();
    writeDimensionsJson(simplifiedDimensions, dimensionsFilePath);
    writeHasStructureJson(allBiomes, hasStructureFilePath);
    writeDungeonBiomeMappingsJson(allBiomes, biomeDimensionMappings, dungeonBiomeMappingsFilePath);
}

/**
 * Create the dungeon_biome_mappings.json file
 * @param biomes {string[]} - The biomes
 * @param biomeDimensionMappings {object[]} - The mappings of biomes to dimensions
 * @param path {string} - The path to the dungeon_biome_mappings.json file
 */
function writeDungeonBiomeMappingsJson(biomes, biomeDimensionMappings, path) {
    const result = {
        replace: false,
        default: [{key: "dungeoncrawl:default"}],
        mapping: {}
    }
    biomes.forEach((biome, index) => {
        result.mapping[biome] = [{key: "dungeoncrawl:" + biomeDimensionMappings[index].dimension + "/default"}];
    });
    const json = JSON.stringify(result, null, 4);
    writeFileEnsureDirectory(path, json);
}

/**
 * Create the dimensions.json file
 * @param {string[]} dimensionNames - The names of the dimensions
 * @param {string} dimensionsFilePath - The path to the dimensions.json file
 * @returns {void}
 **/
function writeDimensionsJson(dimensionNames, dimensionsFilePath) {
    const json = JSON.stringify(dimensionNames, null, 4);
    writeFileEnsureDirectory(dimensionsFilePath, json);
}

/**
 * Create the dungeon_biome_mappings.json file
 * @param fullBiomeNames {string[]} - The full names of the biomes
 * @param hasStructureFilePath {string} - The path to the has_structure/dungeon.json file
 */
function writeHasStructureJson(fullBiomeNames, hasStructureFilePath) {
    const result = {
        replace: false,
        values: fullBiomeNames
    }
    const json = JSON.stringify(result, null, 4);
    writeFileEnsureDirectory(hasStructureFilePath, json);
}

/**
 * Create a loot table json file
 * @param lootTable {LootTable} - The loot table
 * @param path {string} - The path to the loot table json file
 */
function writeLootTableJson(lootTable, path) {
    const json = JSON.stringify(lootTable, null, 4);
    writeFileEnsureDirectory(path, json);
}

/**
 * Create a treasure table json file
 * @param dimData {DimensionalGenerationDefinition} - The loot tables
 * @param lootTablesPath {string} - The path to the treasure table json file
 */
function writeLootTables(dimData, lootTablesPath) {
    dimData.chestLootTables.forEach((lootTable, index) => {
        const path = lootTablesPath.replace('{dimension}', dimData.simpleName) + "/stage_" + (index + 1) + ".json";
        writeLootTableJson(lootTable, path);
    });
}

/**
 * Create a treasure table json file
 * @param dimData {DimensionalGenerationDefinition} - The treasure tables
 * @param treasureTablesPath {string} - The path to the treasure table json file
 */
function writeTreasureTables(dimData, treasureTablesPath) {
    dimData.treasureTables.forEach((treasureTable, index) => {
        const path = treasureTablesPath.replace('{dimension}', dimData.simpleName) + "/stage_" + (index + 1) + ".json";
        writeLootTableJson(treasureTable, path);
    });
}

/**
 * Create a monster population json file
 * @param population {DungeonLevelMonsterPopulation} - The monster population
 * @param path {string} - The path to the entity json file
 */
function writePopulationJson(population, path) {
    const json = JSON.stringify(population, null, 4);
    writeFileEnsureDirectory(path, json);
}

/**
 * Creates the entity json files
 * @param dimData {DimensionalGenerationDefinition} - The dungeon data
 * @param entitiesPath {string} - The path to the entity json
 */
function writePopulations(dimData, entitiesPath) {
    dimData.monsterPopulations.forEach((entity, index) => {
        const path = entitiesPath.replace('{dimension}', dimData.simpleName) + "/stage_" + (index + 1) + ".json";
        writePopulationJson(entity, path);
    });
    const levels = dimData.monsterPopulations.length;
    const levelJsonPath = entitiesPath.replace('{dimension}', dimData.simpleName) + "/levels.json";
    const json = JSON.stringify(levels, null, 4);
    writeFileEnsureDirectory(levelJsonPath, json);
}

/**
 * Create a theming json file
 * @param theming {DungeonTheme} - The theming
 * @param path {string} - The path to the theming json file
 */
function writeThemingJson(theming, path) {
    let themeJson = replaceAllOccurrences(themeTemplate, "minecraft:cobblestone", theming.cobblestone);
    themeJson = replaceAllOccurrences(themeJson, "minecraft:stone_bricks", theming.stoneBricks);
    themeJson = replaceAllOccurrences(themeJson, "minecraft:cracked_stone_bricks", theming.crackedStoneBricks);
    themeJson = replaceAllOccurrences(themeJson, "minecraft:mossy_stone_bricks", theming.mossyStoneBricks);
    themeJson = replaceAllOccurrences(themeJson, "minecraft:cobblestone_stairs", theming.cobblestoneStairs);
    themeJson = replaceAllOccurrences(themeJson, "minecraft:stone_brick_stairs", theming.stoneBrickStairs);
    themeJson = replaceAllOccurrences(themeJson, "minecraft:cobblestone_slab", theming.cobblestoneSlab);
    themeJson = replaceAllOccurrences(themeJson, "minecraft:stone_brick_slab", theming.stoneBrickSlab);
    themeJson = replaceAllOccurrences(themeJson, "minecraft:cobblestone_wall", theming.cobblestoneWall);
    themeJson = replaceAllOccurrences(themeJson, "minecraft:stone_brick_wall", theming.stoneBrickWall);
    themeJson = replaceAllOccurrences(themeJson, "minecraft:iron_bars", theming.ironBars);
    themeJson = replaceAllOccurrences(themeJson, "minecraft:water", theming.water);
    writeFileEnsureDirectory(path, themeJson);
}

/**
 * Create the theming mappings json file
 * @param dimData {DimensionalGenerationDefinition} - The dungeon data
 * @param themingPrimaryThemesPath {string} - The path to the themes folder
 */
function writeThemes(dimData, themingPrimaryThemesPath) {
    dimData.themes.forEach((theme, index) => {
        const path = themingPrimaryThemesPath.replace('{dimension}', dimData.simpleName) + "_" + index + ".json";
        writeThemingJson(theme, path);
    });
}

/**
 * Create the theming mappings json file
 * @param dimData {DimensionalGenerationDefinition} - The dungeon data
 * @param themingMappingsPrimaryPath {string} - The path to the theming mappings json file
 */
function writeThemeMappings(dimData, themingMappingsPrimaryPath) {
    const result = {
        default: [{key: "dungeoncrawl:" + dimData.simpleName + "_" + dimData.themes[0].id, weight: 1}],
        mapping: {},
    }
    Object.keys(dimData.biomeThemeMappings).forEach((biome) => {
        result.mapping[biome] = [{key: "dungeoncrawl:" + dimData.simpleName + "_" + dimData.biomeThemeMappings[biome], weight: 1}];
    });
    const json = JSON.stringify(result, null, 4);
    const path = themingMappingsPrimaryPath.replace('{dimension}', dimData.simpleName) + ".json";
    writeFileEnsureDirectory(path, json);
}

/**
 * Create the dungeon configuration json file
 * @param dimData {DimensionalGenerationDefinition}
 * @param dunegonTypesPath {string}
 */
function writeDungeonConfiguration(dimData, dunegonTypesPath) {
    const template = JSON.parse(JSON.stringify(defaultDungeonConfig));
    template.settings.max_layers = dimData.monsterPopulations.length;
    const json = JSON.stringify(template, null, 4);
    const path = dunegonTypesPath.replace('{dimension}', dimData.simpleName);
    writeFileEnsureDirectory(path, json);
}

/**
 * Create the theming mappings json file
 * @param str {string} - The string to search
 * @param search {string} - The string to search for
 * @param replace {string} - The string to replace with
 * @returns {*} - The replaced string
 */
function replaceAllOccurrences(str, search, replace) {
    return str.split(search).join(replace);
}

function writeFileEnsureDirectory(path, data) {
    const pathSplit = path.split('/');
    for (let i = 1; i < pathSplit.length; i++) {
        const dir = pathSplit.slice(0, i).join('/');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    }
    fs.writeFileSync(path, data);
}

generateDungeons();
