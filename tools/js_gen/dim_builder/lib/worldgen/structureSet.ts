import {SelfWritingJson} from "../selfWritingJson";

import {Structure} from "./structure";
import {STRUCTURE_SET_JSON_REGISTRY} from "../vfs/vfs";

export class StructureSet extends SelfWritingJson {
    static outputPath = "data/<internalNamespace>/worldgen/structure_set/<internalName>.json";
    placement = {
        type: "minecraft:random_spread",
        salt: Math.round(Math.random() * 1000000),
        separation: 4, // Minimum distance between structures, in chunks
        spacing: 16, // Average distance between structures, in chunks
    };
    structures = [];

    constructor(name: string = "", namespace: string = "") {
        super(namespace, name, StructureSet.outputPath);
    }

    withDensity(minChunks: number, maxChunks: number) {
        this.placement.separation = minChunks;
        this.placement.spacing = maxChunks;
        return this;
    }

    withStructure(structure: string | Structure, weight: number = 1) {
        this.structures.push({
            structure: structure instanceof Structure ? `${structure.internalNamespace}:${structure.internalName}` : structure,
            weight: weight,
        });
        return this;
    }

    withStructures(structures: { structure: string | Structure, weight: number }[]) {
        structures.forEach(structure => this.withStructure(structure.structure, structure.weight));
        return this;
    }
}
