import path from "path";
import {rootPath} from "./utils";
import fs from "fs";
import StreamZip from "node-stream-zip";
import crypto from "crypto";

const modIndex = new Map<string, ModData>();
let modIndexScanned = false;
let cacheFolderCreated = false;

async function scanModFolder() {
    const jarsPath = path.join(rootPath(), "mods");
    const jarFiles = fs.readdirSync(jarsPath).filter(file => file.endsWith(".jar"));
    const jarPaths = jarFiles.map(file => path.join(jarsPath, file));

    for (const jarPath of jarPaths) {
        console.debug(`Scanning ${jarPath}`);
        if (jarPath.includes("addon-structures")){
            debugger;
        }
        const zip = new StreamZip.async({file: jarPath});
        const metaPath = "META-INF/mods.toml";
        const fabricModJsonPath = "fabric.mod.json"
        const entries = await zip.entries();
        const entryNames = Object.keys(entries);
        try {
            if (entryNames.includes(metaPath)) {
                const buff = await zip.entryData(metaPath);
                await zip.close();
                if (buff) {
                    const data = buff.toString("utf-8");
                    const lines = data.split("\n");
                    let modId: string | undefined;
                    let version: string | undefined;
                    for (const line of lines) {
                        if (line.trimStart().startsWith("modId")) {
                            modId = line.split("=")[1].trim().replace(/"/g, "").split("#")[0].trim().split(",")[0].trim().split(" ")[0].trim();
                            break;
                        }
                    }
                    for (const line of lines) {
                        if (line.trimStart().startsWith("version")) {
                            version = line.split("=")[1].trim().replace(/"/g, "").split("#")[0].trim().split(",")[0].trim().split(" ")[0].trim();
                            break;
                        }
                    }
                    if (!modId) {
                        for (let i = 0; i < lines.length; i++) {
                            // Ninjdai please use the fucking standards for mods.toml
                            if (lines[i].trimStart().startsWith("mods = [")) {
                                var nextLine = lines[i + 1].trim()
                                var nextLineSanitized = nextLine.substring(0, nextLine.length - 1);
                                if (nextLineSanitized.startsWith("{ modId = 'letsdoaddon_compat', "))
                                {
                                    modId = "letsdoaddon_compat";
                                } else {
                                    console.error("Some other mod is throwing a fuzz")
                                }
                                break;
                            }
                        }
                    }
                    if (modId === "'letsdoaddonstructures'") {
                        modId = "letsdoaddon-structures";
                    }
                    if (modId) {
                        modIndex.set(modId, {modId, filePath: jarPath, forge: true});
                    } else {
                        console.error(`Could not find modId for jar ${jarPath}`);
                    }
                }
            } else if (entryNames.includes(fabricModJsonPath)) {
                const buff = await zip.entryData(fabricModJsonPath);
                await zip.close();
                if (buff) {
                    const data = buff.toString("utf-8");
                    const sanitizedData = data.replace(/\s/g, "");
                    const json = JSON.parse(sanitizedData);
                    modIndex.set(json.id, {modId: json.id, filePath: jarPath, forge: false})
                }
            } else {
                console.error(`Could not find any information for jar ${jarPath}`);
            }
        } catch (e) {
            console.error(`Error while reading ${jarPath}:`, e);
        }
    }

    modIndexScanned = true;
}

async function createCacheFolder() {
    const cachePath = path.join(rootPath(), ".cache");
    if (!fs.existsSync(cachePath)) {
        fs.mkdirSync(cachePath);
    }

    // Create a folder for extracted jars
    const extractedJarsPath = path.join(cachePath, "extracted_jars");
    if (!fs.existsSync(extractedJarsPath)) {
        fs.mkdirSync(extractedJarsPath);
    }

    cacheFolderCreated = true;
}

async function createCacheFile() {
    const cachePath = path.join(rootPath(), ".cache", "modIndex.json");
    if (!fs.existsSync(cachePath)) {
        fs.writeFileSync(cachePath, JSON.stringify(Array.from(modIndex.entries())));
    }
}

function getModCachePath(modId: string): string {
    return path.join(rootPath(), ".cache", "extracted_jars", modId);
}

function getFileHash(filePath: string): string {
    const fileBuffer = fs.readFileSync(filePath);
    const hashSum = crypto.createHash('sha256');
    hashSum.update(fileBuffer);
    return hashSum.digest('hex');
}

async function isModCached(modId: string, jarPath: string): Promise<boolean> {
    const modCachePath = getModCachePath(modId);
    const hashFilePath = path.join(modCachePath, '.hash');

    if (!fs.existsSync(modCachePath) || !fs.existsSync(hashFilePath)) {
        return false;
    }

    const cachedHash = fs.readFileSync(hashFilePath, 'utf8');
    const currentHash = getFileHash(jarPath);

    return cachedHash === currentHash;
}

async function extractJarToCache(modId: string, jarPath: string): Promise<void> {
    if (!cacheFolderCreated) {
        await createCacheFolder();
    }

    const modCachePath = getModCachePath(modId);

    // Clear existing cache for this mod if it exists
    if (fs.existsSync(modCachePath)) {
        fs.rmSync(modCachePath, { recursive: true, force: true });
    }

    // Create mod cache directory
    fs.mkdirSync(modCachePath, { recursive: true });

    // Extract jar to cache
    const zip = new StreamZip.async({ file: jarPath });
    const count = await zip.extract(null, modCachePath);
    await zip.close();

    // Save hash for version checking
    const hash = getFileHash(jarPath);
    fs.writeFileSync(path.join(modCachePath, '.hash'), hash);

    console.log(`Extracted ${count} entries from ${modId} jar to cache`);
}

async function initializeJarUtil(): Promise<void> {
    if (!modIndexScanned) {
        await scanModFolder();
    }
    if (!cacheFolderCreated) {
        await createCacheFolder();
    }
}

export async function getModData(modId: string): Promise<ModData | undefined> {
    await initializeJarUtil()
    return modIndex.get(modId);
}

export async function loadTextFromMod(modId: string, pathInJar: string): Promise<string> {
    const buffer = await loadBufferFromMod(modId, pathInJar);
    if (buffer) {
        return buffer.toString("utf-8");
    }
    throw new Error(`Could not load text from mod ${modId} at path ${pathInJar}`);
}

export async function loadBufferFromMod(modId: string, pathInJar: string): Promise<Buffer> {
    if (pathInJar.startsWith(".")) {
        pathInJar = pathInJar.substring(1);
    }
    if (pathInJar.startsWith("/")) {
        pathInJar = pathInJar.substring(1);
    }
    if (pathInJar.startsWith("\\")) {
        pathInJar = pathInJar.substring(1);
    }

    const modData = await getModData(modId);
    if (!modData) {
        throw new Error(`Could not find mod data for ${modId}`);
    }

    // Ensure cache folder exists
    if (!cacheFolderCreated) {
        await createCacheFolder();
    }

    // Check if mod is cached and up-to-date
    const isCached = await isModCached(modId, modData.filePath);

    // If not cached or outdated, extract jar to cache
    if (!isCached) {
        await extractJarToCache(modId, modData.filePath);
    }

    // Format the path for file system access
    const zipFormattedPath = pathInJar.replace(/\\/g, "/");

    // Get the path to the cached file
    const cachedFilePath = path.join(getModCachePath(modId), zipFormattedPath);

    // Check if the file exists in the cache
    if (fs.existsSync(cachedFilePath)) {
        return fs.readFileSync(cachedFilePath);
    } else {
        // If file doesn't exist in cache, it might not exist in the jar either
        // Let's verify by checking the jar directly
        const zip = new StreamZip.async({file: modData.filePath});
        const entries = await zip.entries();
        const entryNames = Object.keys(entries);

        if (!entryNames.includes(zipFormattedPath)) {
            await zip.close();
            throw new Error(`Could not find ${zipFormattedPath} in mod ${modId}`);
        }

        // If we're here, the file exists in the jar but not in the cache
        // This shouldn't happen if extraction worked correctly, but let's handle it
        const data = await zip.entryData(zipFormattedPath);
        await zip.close();

        if (data) {
            // Save the file to cache for future use
            const dirPath = path.dirname(cachedFilePath);
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
            }
            fs.writeFileSync(cachedFilePath, data);

            return data;
        }
    }

    throw new Error(`Could not load buffer from mod ${modId} at path ${pathInJar}`);
}

export type ModData = {
    modId: string;
    version?: string;
    filePath: string;
    forge?: boolean | undefined;
}
