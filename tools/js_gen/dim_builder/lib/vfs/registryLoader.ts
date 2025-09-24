import path from "path";
import fs from "fs-extra";
import {FileGetter, ResourceLocation} from "./vfs";
import {cachePath} from "../utils";
import {ensureCacheFolder, extractJarToCache, getModData, isModCached} from "../jar_util";


export interface IRegistryLoader {
    pre() : Promise<void>;
    load() : Promise<Record<ResourceLocation, FileGetter>>
}

export class RegistryLoader implements IRegistryLoader {
    protected scanLocation: string;
    protected dpFolder: string;
    protected rootPath: string

    constructor(scanLocation: string, rootPath: string, dpFolder: string) {
        this.scanLocation = scanLocation;
        this.rootPath = rootPath;
        this.dpFolder = dpFolder;
    }

    async load(): Promise<Record<ResourceLocation, FileGetter>> {
        const result: Record<ResourceLocation, FileGetter> = {};

        let rootPaths: {namespace: string, path: string}[] = [];
        if (this.dpFolder === '') {
            rootPaths.push({namespace: 'minecraft', path: path.join(this.rootPath,
                this.scanLocation.replace('$datapack', this.dpFolder)
                    .replace('//', '/'))});
        } else {
            const fullPath = path.join(this.rootPath, this.scanLocation);
            const indexOf$ = fullPath.indexOf('$datapack');
            const basePath = fullPath.substring(0, indexOf$);
            if (!fs.existsSync(basePath)) {
                return result;
            }
            const dirs = fs.readdirSync(basePath);
            dirs.forEach(dir => {
                rootPaths.push({namespace: dir, path: path.join(basePath, dir, this.scanLocation.substring(15))});
            })
            console.log(basePath);
        }

        rootPaths.forEach(tuple => {
            if (!fs.existsSync(tuple.path)) {
                return;
            }

            this.scanFolderRecursive(tuple.path, (path: string) => {
                const pathDiff = path.substring(tuple.path.length + 1);
                const split = pathDiff.split('.');
                const pathWithoutJson = split[0];
                const extension = split[1];
                const resourceLocation = `${tuple.namespace}:${pathWithoutJson}`;

                if (extension === 'json') {
                    result[resourceLocation] = () => {
                        return fs.readFileSync(path, "utf-8")
                    };
                } else {
                    result[resourceLocation] = () => {
                        return fs.readFileSync(path)
                    };
                }
            })
        })

        return result;
    }

    pre(): Promise<void> {
        return;
    }


    scanFolderRecursive(rootPath: string, action: (path: string) => void) {
        fs.readdirSync(rootPath).forEach((entry) => {
            const fullPath = path.join(rootPath, entry);
            const stats = fs.lstatSync(fullPath);
            if (stats.isDirectory()) {
                this.scanFolderRecursive(fullPath, action);
            } else {
                action(fullPath);
            }
        })
    }
}


export class MinecraftRegistryLoader extends RegistryLoader {

    constructor(scanLocation: string) {
        super(scanLocation, './mc', '');
    }
}

export class ModRegistryLoader extends RegistryLoader {
    modId: string;

    constructor(scanLocation: string, modId: string) {
        super(scanLocation, path.join(cachePath(), 'extracted_jars', modId), modId);
        this.modId = modId;
    }

    override async pre() {
        // Check if mod is cached and up-to-date
        const modData = await getModData(this.modId);
        if (!modData) {
            throw new Error(`Could not find mod data for ${this.modId}`);
        }

        await ensureCacheFolder();

        const isCached = await isModCached(this.modId, modData.filePath);

        // If not cached or outdated, extract jar to cache
        if (!isCached) {
            await extractJarToCache(this.modId, modData.filePath);
        }
    }
}
