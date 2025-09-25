import {ResourceLocation} from "../../lib/types";

export type BulkStructureReplacements = {
    bulkReplacements: BulkStructureReplacementsMain;
    specificReplacements: BulkStructureReplacementsSpecificReplacement[];
}

export type BulkStructureReplacementsMain = {
    blocks: Record<ResourceLocation, ResourceLocation>,
    entities: Record<ResourceLocation, ResourceLocation>,
    lootTables: Record<ResourceLocation, ResourceLocation>,
    biomes: ResourceLocation[],
}

export type BulkStructureReplacementsSpecificReplacement = {
    structureId: ResourceLocation,
    blocks: Record<ResourceLocation, ResourceLocation>,
    entities: Record<ResourceLocation, ResourceLocation>,
    lootTables: Record<ResourceLocation, ResourceLocation>,
    biomes: ResourceLocation[]
}
