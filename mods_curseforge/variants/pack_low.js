const archiver = requireGlobal('archiver');
const fs = require('fs');
const variantConfig = require('./low.json')


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
    const manifest = require('../manifest.json');
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
    fs.writeFileSync('./manifest.json', JSON.stringify(manifest, null, 4));
}

function createModlistHtml() {
    let html = fs.readFileSync('../modlist.html', 'utf8');
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
    fs.writeFileSync('./modlist.html', html);
}

// MAIN
const config = require('../pack_builder_config.json');
for (let i = 0; i < config.includes.length; i++) {
    config.includes[i] = "../" + config.includes[i];
}
createManifestJson();
createModlistHtml();
const output = fs.createWriteStream(__dirname + '/' + config.exportZipName);
const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
});

archive.pipe(output);
console.log("Packing...");
archive.directory("../overrides", "overrides");
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
