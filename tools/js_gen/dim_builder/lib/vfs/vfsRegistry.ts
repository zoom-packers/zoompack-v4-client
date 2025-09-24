import {getModIndexKeys, initializeJarUtil} from "../jar_util";
import {FileGetter, ResourceLocation, STRUCTURE_SET_JSON_REGISTRY} from "./vfs";
import {
    DatapackRegistryLoader,
    DatapackZipRegistryLoader,
    MinecraftRegistryLoader,
    ModRegistryLoader,
    RegistryLoader
} from "./registryLoader";
import {findPaxiDatapacks, findServerDatapacks} from "../dp_util";
import {StructureSet} from "../worldgen/structureSet";

const scanLocations = {
    LootTableLocation: "data/$datapack/loot_tables",
    StructureNbtLocation: "data/$datapack/structures",
    StructureJsonLocation: "data/$datapack/worldgen/structure",
    StructureSetJsonLocation: "data/$datapack/worldgen/structure_set",
    TemplatePoolJsonLocation: "data/$datapack/worldgen/template_pool",
}

export class VfsRegistry {
    private scanLocation: string;
    private entries: Record<ResourceLocation, FileGetter> = {};
    private loaded: boolean = false;

    constructor(scanLocation: string) {
        this.scanLocation = scanLocation;
    }

    private async load() {
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

        // Datapacks
        const paxiDatapacks = findPaxiDatapacks();
        for (const entry of paxiDatapacks) {
            let datapackLoader: RegistryLoader = entry.type === 'zip' ?
                new DatapackZipRegistryLoader(this.scanLocation, entry.path) :
                new DatapackRegistryLoader(this.scanLocation, entry.path);
            await datapackLoader.pre();
            const datapackEntries = await datapackLoader.load();
            this.mergeIntoEntries(datapackEntries);
        }

        const serverDatapacks = findServerDatapacks();
        for (const entry of serverDatapacks) {
            let datapackLoader: RegistryLoader = entry.type === 'zip' ?
                new DatapackZipRegistryLoader(this.scanLocation, entry.path) :
                new DatapackRegistryLoader(this.scanLocation, entry.path);
            await datapackLoader.pre();
            const datapackEntries = await datapackLoader.load();
            this.mergeIntoEntries(datapackEntries);
        }

        this.loaded = true;
    }

    private mergeIntoEntries(newEntries: Record<ResourceLocation, FileGetter>) {
        const keys = Object.keys(newEntries);
        for (const key of keys) {
            this.entries[key] = newEntries[key];
        }
    }


    public async get(key: ResourceLocation) {
        if (!this.loaded) await this.load();
        const result = this.entries[key];
        if (!result) {
        }
        return result;
    }

    public async set(key: ResourceLocation, value: any) {
        if (!this.loaded) await this.load();
        this.entries[key] = value;
    }

    public async keys() {
        if (!this.loaded) await this.load();
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
