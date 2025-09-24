import {cachePath, paxiDatapacksPath, rootPath, serverDatapacksPath} from "./utils";
import fs from "fs";
import path from "path";
import StreamZip from "node-stream-zip";

function searchForDatapacks(pathToScan: string) {
    const result: {path: string, type: 'zip' | 'folder'}[] = [];
    const children = fs.readdirSync(pathToScan);
    children.forEach((file) => {
        const fullPath = path.join(pathToScan, file);
        const isDirectory = fs.statSync(fullPath).isDirectory();
        if (isDirectory) {
            result.push({path: fullPath, type: 'folder'});
        } else {
            result.push({path: fullPath, type: 'zip'});
        }
    })

    return result;
}

export function findPaxiDatapacks() {
    const pathToScan = paxiDatapacksPath();
    return searchForDatapacks(pathToScan);
}

export function findServerDatapacks() {
    const pathToScan = serverDatapacksPath();
    return searchForDatapacks(pathToScan);
}

export function isZipDatapackCached(filePath: string) {
    const lastIndexOfSlash = filePath.lastIndexOf("\\");
    if (lastIndexOfSlash === -1) {
        throw new Error()
    }
    const fileName = filePath.substring(lastIndexOfSlash + 1);
    const cacheFolder = path.join(cachePath(), 'extracted_dp')
    ensureCacheFolder(cacheFolder);

    return fs.existsSync(path.join(cacheFolder, fileName.replace('.zip', '')));
}

export function getDatapackCachePath(datapackPath: string) {
    const lastIndexOfSlash = datapackPath.lastIndexOf("\\");
    const fileName = datapackPath.substring(lastIndexOfSlash + 1);
    const cacheFolder = path.join(cachePath(), 'extracted_dp');
    return path.join(cacheFolder, fileName.replace('.zip', ''));
}

export async function cacheDatapackZip(filePath: string) {
    const lastIndexOfSlash = filePath.lastIndexOf("\\");
    const fileName = filePath.substring(lastIndexOfSlash + 1);
    const cacheFolder = path.join(cachePath(), 'extracted_dp');

    if (isZipDatapackCached(filePath)) {
        return path.join(cacheFolder, fileName.replace('.zip', ''));
    }

    const resultFolder = path.join(cacheFolder, fileName.replace('.zip', ''));
    ensureCacheFolder(cacheFolder);
    ensureCacheFolder(resultFolder);
    const zip = new StreamZip.async({ file: filePath });
    const count = await zip.extract(null, resultFolder);
    await zip.close();
}

function ensureCacheFolder(cacheFolder: string) {
    if (!fs.existsSync(cacheFolder)) {
        fs.mkdirSync(cacheFolder);
    }
}
