import path from "path";
import fs from "fs-extra";
import {loadJsonFromPath} from "../../lib/utils";
import {StructureDefinition} from "../../lib/worldgen/structureDefinition";
import {
    biome_aether,
    biome_blue_skies,
    biome_callfromthedepth_,
    biome_theabyss, biome_undergarden
} from "../../../typedefs/biome_typedefs";
import {ExpansionPack} from "../../lib/expansionPack";

const beautifyPath = path.join(process.cwd(), 'expansions', 'beautify')
const dataPath = path.join(beautifyPath, 'data')
const rawPath = path.join(dataPath, 'raw')
const dimensionMappingPath = path.join(rawPath, 'dimension_mappings')

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
    'end.txt': [],
    'everbright.txt': Object.values(biome_blue_skies),
    'everdawn.txt': Object.values(biome_blue_skies),
    'nether.txt': [],
    'undergarden.txt': Object.values(biome_undergarden),
}

const dimensionMappingFiles = fs.readdirSync(dimensionMappingPath).map(x => {
    return {
        filename: x,
        filepath: path.join(dimensionMappingPath, x)
    }
})

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
loadJsons();

// Create basic structures
const modId = "zoompack_beautify";
async function createExpansionPack() {

    const structureDefinitions: StructureDefinition[] = [];
    for (const mapping of mappings) {
        const dimensionId = fileToDimensionMappings[mapping.filename];
        if (!dimensionId) {
            console.error(`Unable to create structure: ${mapping.filename}`);
            return;
        }

        for (const structure of mapping.structures) {
            const definition = await new StructureDefinition(`${structure.structureId}_${dimensionId}`, modId)
                .fromTemplate(structure.path);
            definition.removeBiomes()
                .onBiomes(biomeMappings[mapping.filename])
            structureDefinitions.push(definition);
        }
    }

    const expansion = new ExpansionPack()
        .withName("Zoompack Beautified Dimensions")
        .withNamespace(modId)
        .withStructures(structureDefinitions)

    await expansion.build();
    expansion.validate();
    await expansion.writeSelf();
}

createExpansionPack();

