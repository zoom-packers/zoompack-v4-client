const archiver = requireGlobal('archiver');
const fs = require('fs');
const path = require('path');
const config = require('./config.json');
const variantConfig = require('./config_low.json')
const {traverseDirectoryAndZipDatapacksAndResourcePacks} = require("./archiverUtils");


function requireGlobal(packageName) {
    var childProcess = require('child_process');
    var path = require('path');
    var fs = require('fs');

    var globalNodeModules = childProcess.execSync('npm root -g').toString().trim();
    var packageDir = path.join(globalNodeModules, packageName);
    if (!fs.existsSync(packageDir))
        packageDir = path.join(globalNodeModules, 'npm/node_modules', packageName); //find package required by old npm

    if (!fs.existsSync(packageDir)) {
        installGlobal(packageName);
        packageDir = path.join(globalNodeModules, packageName);

        if (!fs.existsSync(packageDir))
            packageDir = path.join(globalNodeModules, 'npm/node_modules', packageName); //find package required

        if (!fs.existsSync(packageDir))
            throw new Error('Failed to install ' + packageName);
    }

    var packageMeta = JSON.parse(fs.readFileSync(path.join(packageDir, 'package.json')).toString());
    var main = path.join(packageDir, packageMeta.main);

    return require(main);
}

function installGlobal(packageName) {
    var childProcess = require('child_process');
    childProcess.execSync('npm install -g ' + packageName);
}

function createManifestJson() {
    const manifest = require('./manifest.json');
    manifest.files = manifest.files.filter(file => {
        const modId = file.projectID;
        const index = variantConfig.removeMods.findIndex(mod => mod.modId === modId);
        return index === -1;
    });
    for (const modToAdd of variantConfig.addMods) {
        const modId = modToAdd.modId;
        const mod = {
            projectID: modId,
            fileID: modToAdd.fileId,
            required: true
        };
        manifest.files.push(mod);
    }
    fs.writeFileSync('./manifest_low.json', JSON.stringify(manifest, null, 4));
}

function createModlistHtml() {
    let html = fs.readFileSync('./modlist.html', 'utf8');
    for (const mod of variantConfig.removeMods) {
        const modId = mod.modId;
        const regex = new RegExp('<li><a href="https://www.curseforge.com/projects/' + modId + '.*?</li>', 'g');
        html = html.replace(regex, '');
    }
    for (const mod of variantConfig.addMods) {
        const modId = mod.modId;
        const modName = mod.modName;
        const regex = new RegExp('<ul>');
        const replacement = '<ul><li><a href="https://www.curseforge.com/projects/' + modId + '">' + modName + '</a></li>\n';
        html = html.replace(regex, replacement);
    }
    fs.writeFileSync('./modlist_low.html', html);
}

async function main() {
    createManifestJson();
    createModlistHtml();
    config.exportZipName = variantConfig.exportZipName;
    const output = fs.createWriteStream(__dirname + '/' + config.exportZipName);
    const archive = archiver('zip', {
        zlib: {level: 9} // Sets the compression level.
    });

    archive.pipe(output);
    console.log("Packing...");
    archive.directory("./overrides", "overrides");
    console.log("Packing overrides");
    archive.file("./manifest_low.json", {name: "manifest.json"});
    archive.file("./modlist_low.html", {name: "modlist.html"});
    console.log("Packing manifest and modlist");

    const includes = config.includes;
    for (const include of includes) {
        if (variantConfig.removeFolders.includes(include)) {
            console.log("Skipping " + include);
            continue;
        }
        await traverseDirectoryAndZipDatapacksAndResourcePacks(archiver, archive, "overrides/", path.join(include),
            path.join(config.datapackPath),
            path.join(config.resourcepackPath),
            path.join(config.kubejsDataPath),
            path.join(config.kubejsAssetsPath));
        console.log("Packing " + include);
    }
    console.log("Writing to disk...");
    await archive.finalize();
    console.log("Cleaning up...");
    fs.rmSync("../build", {recursive: true});
    fs.rmSync("./manifest_low.json");
    fs.rmSync("./modlist_low.html");
    console.log("Done!");
}

main();
