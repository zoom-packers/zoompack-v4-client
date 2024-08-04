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

module.exports = {
    requireGlobal
}
