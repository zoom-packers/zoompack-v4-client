import path from "path";
import fs from "fs-extra";
import {ensureFolderExists, loadJsonFromPath} from "../../lib/utils";
import {StructureDefinition} from "../../lib/worldgen/structureDefinition";
import {
    biome_aether, biome_betternether,
    biome_blue_skies,
    biome_callfromthedepth_, biome_outer_end,
    biome_theabyss, biome_undergarden
} from "../../../typedefs/biome_typedefs";
import {ExpansionPack} from "../../lib/expansionPack";
import {BulkStructureReplacements, BulkStructureReplacementsSpecificReplacement} from "./types";
import {useLogLevels} from "./log_levels";
import {ReplaceBlockCommand, ReplaceEntityCommand, ReplaceLootTableCommand} from "../../lib/worldgen/nbtStructure";

const beautifyPath = path.join(process.cwd(), 'expansions', 'beautify')
const dataPath = path.join(beautifyPath, 'data')
const rawPath = path.join(dataPath, 'raw')
const dimensionMappingPath = path.join(rawPath, 'dimension_mappings')
const replacementsMappingPath = path.join(rawPath, 'replacements_mappings')

useLogLevels();
global.logLevel = 'warn'

const fileToDimensionMappings = {
    'abyss.txt': 'theabyss:the_abyss',
    'aether.txt': 'aether:the_aether',
    'depth.txt': 'callfromthedepth_:depth',
    'end.txt': 'minecraft:the_end',
    'everbright.txt': 'blue_skies:everbright',
    'everdawn.txt': 'blue_skies:everdawn',
    'nether.txt': 'minecraft:the_nether',
    'undergarden.txt': 'undergarden:undergarden',
}

const biomeMappings = {
    'abyss.txt': Object.values(biome_theabyss),
    'aether.txt': Object.values(biome_aether),
    'depth.txt': Object.values(biome_callfromthedepth_),
    'end.txt': Object.values(biome_outer_end),
    'everbright.txt': Object.values(biome_blue_skies),
    'everdawn.txt': Object.values(biome_blue_skies),
    'nether.txt': Object.values(biome_betternether),
    'undergarden.txt': Object.values(biome_undergarden),
}

let dimensionMappingFiles = fs.readdirSync(dimensionMappingPath).map(x => {
    return {
        filename: x,
        filepath: path.join(dimensionMappingPath, x)
    }
})

// Debug purposes
// dimensionMappingFiles = [dimensionMappingFiles[4]];

// Generate Mappings
var mappings = dimensionMappingFiles.map(file => {
    const content = fs.readFileSync(file.filepath).toString();
    const lines = content.split("\r\n")

    const processedLines = lines.filter((line) => line.length > 0)
        .map(line => {
            let modId, structureId, fullId;
            fullId = line.trim();
            if (line.startsWith("minecraft")) {
                modId = "minecraft";
                structureId = line.substring(10);
                line = `./mc/data/worldgen/structure_set/${structureId}.json`
            } else {
                var lineSplit = line.split(":");
                modId = lineSplit[0];
                structureId = lineSplit[1];
                line = `jar:${modId}:data/${modId}/worldgen/structure_set/${structureId}.json`
            }
            return {
                fullId,
                modId,
                structureId,
                path: line,
            }
        })

    return {
        filename: file.filename,
        filepath: file.filepath,
        structures: processedLines
    };
});

// Validate Mappings
async function loadJsons() {
    for (const mapping of mappings) {
        for (const structure of mapping.structures) {
            console.info(`Scanning JSON from path: ${structure.path}`)
            const json = await loadJsonFromPath(structure.path);
            if (json === null || json === undefined) {
                console.error(`Unable to load structure: ${structure.path}`);
            } else {
                console.info(`Found ${structure.path} structure: ${JSON.stringify(json, null, 2)}`);
            }
        }
    }
}

function loadPalleteMap(dimension: string, structures: StructureDefinition[]) {
    const exportPath = path.join(replacementsMappingPath, dimension + '.json')
    const perStructureMappings = structures.map(structureDef => {
        return {
            structureName: structureDef.internalName,
            nbts: structureDef.nbts.map(nbt => {
                return {
                    entities: nbt.exportEntities(),
                    blocks: nbt.exportPalette(),
                    loot_tables: nbt.exportLootTables()
                }
            })
        }
    });

    const allBlocks = [];
    const allEntities = [];
    const allLootTables = [];
    for (const structureMapping of perStructureMappings) {
        for (const nbt of structureMapping.nbts) {
            for (const block of nbt.blocks) {
                if (allBlocks.indexOf(block) === -1) {
                    allBlocks.push(block);
                }
            }
            for (const entity of nbt.entities) {
                if (allEntities.indexOf(entity) === -1) {
                    allEntities.push(entity);
                }
            }
            for (const lootTable of nbt.loot_tables) {
                if (allLootTables.indexOf(lootTable) === -1) {
                    allLootTables.push(lootTable);
                }
            }
        }
    }
    const allBlocksDict = {};
    const allEntitiesDict = {};
    const allLootTablesDict = {};
    for (const block of allBlocks) {
        allBlocksDict[block] = block;
    }
    for (const entity of allEntities) {
        allEntitiesDict[entity] = entity;
    }
    for (const lootTable of allLootTables) {
        allLootTablesDict[lootTable] = lootTable;
    }
    const specificReplacements: BulkStructureReplacementsSpecificReplacement[] = [];


    if (fs.existsSync(exportPath)) {
        const inputData = fs.readFileSync(exportPath, 'utf8');
        const inputJson: BulkStructureReplacements = JSON.parse(inputData);
        if (!!inputJson) {
            for (const bulkReplacement of Object.keys(inputJson.bulkReplacements.blocks)) {
                // if (!Object.values(block_all).includes(inputJson.bulkReplacements.blocks[bulkReplacement])) {
                //     console.warn(`The mapping for the block ${bulkReplacement} does not exist in ${exportPath}. Actual value: ${inputJson.bulkReplacements.blocks[bulkReplacement]}`);
                // }
                allBlocksDict[bulkReplacement] = inputJson.bulkReplacements.blocks[bulkReplacement];
            }
            for (const bulkReplacement of Object.keys(inputJson.bulkReplacements.entities)) {
                // if (!Object.values(entity_all).includes(inputJson.bulkReplacements.entities[bulkReplacement])) {
                //     console.warn(`The mapping for the entity ${bulkReplacement} does not exist in ${exportPath}. Actual value: ${inputJson.bulkReplacements.entities[bulkReplacement]}`);
                // }
                allEntitiesDict[bulkReplacement] = inputJson.bulkReplacements.entities[bulkReplacement];
            }
            if (inputJson.bulkReplacements.lootTables) {
                for (const bulkReplacement of Object.keys(inputJson.bulkReplacements.lootTables)) {
                    // if (!Object.values(entity_all).includes(inputJson.bulkReplacements.entities[bulkReplacement])) {
                    //     console.warn(`The mapping for the entity ${bulkReplacement} does not exist in ${exportPath}. Actual value: ${inputJson.bulkReplacements.entities[bulkReplacement]}`);
                    // }
                    allLootTablesDict[bulkReplacement] = inputJson.bulkReplacements.lootTables[bulkReplacement];
                }
            }
            for (const specificReplacement of inputJson.specificReplacements) {
                specificReplacements.push(specificReplacement);
            }
        }
    }

    const exportJson: BulkStructureReplacements = {
        bulkReplacements: {
            blocks: allBlocksDict,
            entities: allEntitiesDict,
            lootTables: allLootTablesDict,
        },
        specificReplacements: specificReplacements
    }

    const json = JSON.stringify(exportJson, null,4);
    ensureFolderExists(replacementsMappingPath);
    fs.writeFileSync(exportPath, json, 'utf8');

    return exportJson;
}


// Create basic structures
const modId = "zoompack_beautify";
async function createExpansionPack() {

    for (const mapping of mappings) {
        const dimensionId = fileToDimensionMappings[mapping.filename];
        var dimensionName = mapping.filename.substring(0, mapping.filename.lastIndexOf('.')).trim();
        var prettyDimensionName = dimensionName.substring(0,1).toUpperCase() + dimensionName.substring(1).replace('_', ' ');
        var localModId = `${modId}_${dimensionName}`;
        if (!dimensionId) {
            console.error(`Unable to create structure: ${mapping.filename}`);
            return;
        }

        const structureDefinitions: StructureDefinition[] = [];
        for (const structure of mapping.structures) {
            const definition = await new StructureDefinition(`${structure.structureId}`, localModId)
                .fromTemplate(structure.path);
            definition.removeBiomes()
                .onBiomes(biomeMappings[mapping.filename])
            structureDefinitions.push(definition);
        }
        const palleteMap = loadPalleteMap(dimensionName, structureDefinitions);
        for (const structureDefinition of structureDefinitions) {
            const combinedBlockPallete: {} = JSON.parse(JSON.stringify(palleteMap.bulkReplacements.blocks));
            const combinedEntityPallete: {} = JSON.parse(JSON.stringify(palleteMap.bulkReplacements.entities));
            const combinedLootTables: {} = JSON.parse(JSON.stringify(palleteMap.bulkReplacements.lootTables));
            const overridesIndex = palleteMap.specificReplacements.findIndex(x => x.structureId === structureDefinition.internalName);
            if (overridesIndex >= 0) {
                const overrides = palleteMap.specificReplacements[overridesIndex];
                if (overrides.blocks) {
                    for (const blockOverride of Object.keys(overrides.blocks)) {
                        combinedBlockPallete[blockOverride] = overrides.blocks[blockOverride];
                    }
                }
                if (overrides.entities) {
                    for (const entityOverride of Object.keys(overrides.entities)) {
                        combinedEntityPallete[entityOverride] = overrides.entities[entityOverride];
                    }
                }
                if (overrides.lootTables) {
                    for (const lootTableOverride of Object.keys(overrides.lootTables)) {
                        combinedLootTables[lootTableOverride] = overrides.lootTables[lootTableOverride];
                    }
                }
            }
            const blockCommands: ReplaceBlockCommand[] = Object.keys(combinedBlockPallete).map(x => {
                return {
                    oldBlock: x,
                    newBlock: combinedBlockPallete[x],
                }
            });
            const entityCommands: ReplaceEntityCommand[] = Object.keys(combinedEntityPallete).map(x => {
                return {
                    oldEntity: x,
                    newEntity: combinedEntityPallete[x],
                }
            });
            const lootTableCommands: ReplaceLootTableCommand[] = Object.keys(combinedLootTables).map(x => {
                return {
                    oldLootTable: x,
                    newLootTable: combinedLootTables[x]
                }
            })
            structureDefinition.replaceBlocks(blockCommands)
            structureDefinition.replaceEntities(entityCommands)
            structureDefinition.replaceLootTables(lootTableCommands)
        }


        const expansion = new ExpansionPack()
            .withName("Zoompack Beautified Dimensions - " + prettyDimensionName)
            .withNamespace(localModId)
            .withStructures(structureDefinitions)

        await expansion.build();
        expansion.validate();
        await expansion.writeSelf();
    }
}


async function main() {
    await loadJsons();
    await createExpansionPack();
}

main();

