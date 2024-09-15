const fs = require('fs');
const path = require('path');
const {rootPath, kubejsDataPath, kubejsAssetsPath} = require("../tools/js_gen/utils/path_util");
const {ensureDirSync} = require("../tools/sync_util");

async function traverseDirectoryAndZipDatapacksAndResourcePacks(archiver, archive, archiveRootPath, currentDirectory, datapack, resourcepack, kubeJsDataPath, kubeJsAssetsPath) {
    const isDirectory = fs.lstatSync(currentDirectory).isDirectory();
    if (isDirectory) {
        const files = fs.readdirSync(currentDirectory);
        for (const file of files) {
            const fullPath = path.join(currentDirectory, file);
            const stats = fs.lstatSync(fullPath);
            if (stats.isDirectory()) {
                if (fullPath === datapack || fullPath === resourcepack) {
                    const files = fs.readdirSync(fullPath);
                    for (const file of files) {
                        const datapackPath = path.join(fullPath, file);
                        const isDirectory = fs.lstatSync(datapackPath).isDirectory();
                        if (isDirectory) {
                            const zipPath = await createZip(archiver, datapackPath, datapackPath === datapack ? "datapack" : "resourcepack");
                            archive.file(zipPath, {name: `${archiveRootPath}${datapackPath.replace("..\\", "")}.zip`});
                        } else {
                            archive.file(datapackPath, {name: `${archiveRootPath}${datapackPath.replace("..\\", "")}`});
                        }
                    }
                } else if (fullPath === kubeJsDataPath) {
                    const zipPath = await createKubeJSPack(archiver, fullPath, "datapack");
                    archive.file(zipPath, {name: `${archiveRootPath}config/paxi/datapacks/kubejs_datapack_autobundled.zip`});
                } else if (fullPath === kubeJsAssetsPath) {
                    const zipPath = await createKubeJSPack(archiver, fullPath, "resourcepack");
                    archive.file(zipPath, {name: `${archiveRootPath}config/paxi/resourcepacks/kubejs_resourcepack_autobundled.zip`});
                } else {
                    await traverseDirectoryAndZipDatapacksAndResourcePacks(archiver, archive, archiveRootPath, fullPath, datapack, resourcepack, kubeJsDataPath, kubeJsAssetsPath);
                }
            } else {
                archive.file(fullPath, {name: `${archiveRootPath}${fullPath.replace("..\\", "")}`})
            }
        }
    } else {
        archive.file(currentDirectory, {name: `${archiveRootPath}${currentDirectory.replace("..\\", "")}`});
    }
}

async function createZip(archiver, directory, type) {
    const archive = archiver('zip', {
        zlib: { level: 0 }
    });
    const outputPath = rootPath() + "/build/temp";
    ensureDirSync(outputPath);
    const archiveName = directory.split("\\").pop() + ".zip";
    const output = fs.createWriteStream(`${outputPath}/${archiveName}`);
    archive.pipe(output);
    const directoryContents = fs.readdirSync(directory);
    for (const file of directoryContents) {
        const filePath = path.join(directory, file);
        const stats = fs.lstatSync(filePath);
        if (stats.isDirectory()) {
            archive.directory(filePath, file);
        } else {
            archive.file(filePath, {name: file});
        }
    }
    await archive.finalize();
    let finished = false;
    output.on('close', function() {
        finished = true;
    });
    await new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            if (finished) {
                clearInterval(interval);
                resolve();
            }
        }, 10);
    });
    console.log(`Created zip at ${outputPath}/${archiveName} for ${type}`);
    return `${outputPath}/${archiveName}`;
}


async function createKubeJSPack(archiver, dataPath, type) {
    const outputPath = rootPath() + "/build/temp";
    ensureDirSync(outputPath);
    const filePath = path.join(outputPath, `kubejs_${type}_autobundled.zip`);
    const output = fs.createWriteStream(filePath);
    const archive = archiver('zip', {
        zlib: { level: 0 }
    });

    const mcMeta = {
        pack: {
            pack_format: 15,
            description: "KubeJS Bundled"
        }
    }
    const json = JSON.stringify(mcMeta, null, 4);

    archive.pipe(output);
    archive.directory(dataPath, type === "datapack" ? "data" : "assets");
    archive.append(json, {name: "pack.mcmeta"});
    await archive.finalize();
    let finished = false;
    output.on('close', function() {
        finished = true;
    });
    await new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            if (finished) {
                clearInterval(interval);
                resolve();
            }
        }, 10);
    });
    console.log(`Created kubejs datapack at ${filePath}`);
    return filePath;
}

module.exports = {
    traverseDirectoryAndZipDatapacksAndResourcePacks,
    createZip,
    createKubeJSPack
}
