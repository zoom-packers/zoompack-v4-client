const archiver = requireGlobal('archiver');
const fs = require('fs');
const path = require('path');
const config = require('./config.json');
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
async function main() {
    const output = fs.createWriteStream(__dirname + '/' + config.exportZipName);
    const archive = archiver('zip', {
        zlib: {level: 9} // Sets the compression level.
    });

    archive.pipe(output);
    console.log("Packing...");
    archive.directory("./overrides", "overrides");
    console.log("Packing overrides");
    archive.file("./manifest.json", {name: "manifest.json"});
    archive.file("./modlist.html", {name: "modlist.html"});
    console.log("Packing manifest and modlist");

    const includes = config.includes;
    for (const include of includes) {
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
    console.log("Done!");
}

main();
