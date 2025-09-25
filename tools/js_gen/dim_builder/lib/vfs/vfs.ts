import {
    LootTableRegistry, StructureJsonRegistry, StructureNbtRegistry, StructureSetJsonRegistry,
    TemplatePoolJsonRegistry
} from "./vfsRegistry";

export type FileGetter = () => string | Buffer;


export const LOOT_TABLE_REGISTRY = new LootTableRegistry();
export const STRUCTURE_NBT_REGISTRY = new StructureNbtRegistry();
export const STRUCTURE_JSON_REGISTRY = new StructureJsonRegistry();
export const STRUCTURE_SET_JSON_REGISTRY = new StructureSetJsonRegistry();
export const TEMPLATE_POOL_REGISTRY = new TemplatePoolJsonRegistry();
