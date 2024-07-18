const archiver = requireGlobal('archiver');
const fs = require('fs');


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

const config = require('./pack_builder_config.json');
const output = fs.createWriteStream(__dirname + '/' + config.exportZipName);
const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
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
    const isDir = fs.lstatSync(include).isDirectory();
    const last = include.split("/").pop();
    if (isDir) {
        archive.directory(include, "overrides/" + last);
    } else {
        archive.file(include, {name: "overrides/" + last});
    }
    console.log("Packing " + include);
}
console.log("Writing to disk...");
archive.finalize().then(() => {
    console.log("Done");
});
