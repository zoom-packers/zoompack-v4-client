import {StructureDefinition} from "./lib/worldgen/structureDefinition";

async function main() {
    const structure = await new StructureDefinition("pillager_outpost", "kjs-test")
        .fromTemplate("./mc/data/worldgen/structure_set/pillager_outposts.json")
    const palette = structure.createBlockReplacementMap();
    console.log(`Palette for structure ${structure.internalName}:`)
    console.log(palette)
    const entities = structure.createEntityReplacementMap();
    console.log(`Entities for structure ${structure.internalName}:`)
    console.log(entities)
}

main();
