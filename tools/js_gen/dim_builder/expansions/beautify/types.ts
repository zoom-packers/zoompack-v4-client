
export type BulkStructureReplacements = {
    bulkReplacements: BulkStructureReplacementsMain;
    specificReplacements: BulkStructureReplacementsSpecificReplacement[];
}

export type BulkStructureReplacementsMain = {
    blocks: {}
    entities: {},
    lootTables: {},
}

export type BulkStructureReplacementsSpecificReplacement = {
    structureId: string
    blocks: {},
    entities: {},
    lootTables: {},
}
