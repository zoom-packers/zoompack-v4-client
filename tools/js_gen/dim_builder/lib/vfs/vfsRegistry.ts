import {getModIndexKeys, initializeJarUtil} from "../jar_util";
import {FileGetter, ResourceLocation} from "./vfs";
import {MinecraftRegistryLoader, ModRegistryLoader} from "./registryLoader";

const scanLocations = {
    LootTableLocation: "data/$datapack/loot_tables",
    StructureNbtLocation: "data/$datapack/structures",
    StructureJsonLocation: "data/$datapack/worldgen/structure",
    StructureSetJsonLocation: "data/$datapack/worldgen/structure_set",
    TemplatePoolJsonLocation: "data/$datapack/worldgen/structure_set",
}

class VfsRegistry {
    private scanLocation: string;
    private entries: Record<ResourceLocation, FileGetter> = {};
    private loaded: boolean = false;

    constructor(scanLocation: string) {
        this.scanLocation = scanLocation;
    }

    public async load() {
        if (this.loaded) {
            return;
        }

        // Minecraft Registry
        const mcLoader = new MinecraftRegistryLoader(this.scanLocation);
        const mcEntries = await mcLoader.load();
        this.mergeIntoEntries(mcEntries);

        // Mod Registry
        await initializeJarUtil();
        const mods = getModIndexKeys();
        for (const mod of mods) {
            const modLoader = new ModRegistryLoader(this.scanLocation, mod);
            await modLoader.pre();
            const modEntries = await modLoader.load();
            this.mergeIntoEntries(modEntries);
        }

        this.loaded = true;
    }

    private mergeIntoEntries(newEntries: Record<ResourceLocation, FileGetter>) {
        const keys = Object.keys(newEntries);
        for (const key of keys) {
            this.entries[key] = newEntries[key];
        }
    }


    public get(key: ResourceLocation) {
        return this.entries[key];
    }

    public set(key: ResourceLocation, value: any) {
        this.entries[key] = value;
    }

    public keys() {
        return Object.keys(this.entries);
    }
}


export class LootTableRegistry extends VfsRegistry {
    constructor() {
        super(scanLocations["LootTableLocation"]);
    }
}

export class StructureNbtRegistry extends VfsRegistry {
    constructor() {
        super(scanLocations["StructureNbtLocation"]);
    }
}

export class StructureJsonRegistry extends VfsRegistry {
    constructor() {
        super(scanLocations["StructureJsonLocation"]);
    }
}

export class StructureSetJsonRegistry extends VfsRegistry {
    constructor() {
        super(scanLocations["StructureSetJsonLocation"]);
    }
}

export class TemplatePoolJsonRegistry extends VfsRegistry {
    constructor() {
        super(scanLocations["TemplatePoolJsonLocation"]);
    }
}
