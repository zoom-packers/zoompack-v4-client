const fs = require('fs');
const path = require('path');

function paxiPath() {
    var root = rootPath();
    return path.join(root, 'config', 'paxi');
}

function paxiDatapacksPath() {
    return path.join(paxiPath(), 'datapacks');
}

function paxiResourcepacksPath() {
    return path.join(paxiPath(), 'resourcepacks');
}

function kubejsPath() {
    return path.join(rootPath(), 'kubejs');
}

function kubejsAssetsPath() {
    return path.join(kubejsPath(), 'assets');
}

function kubejsDataPath() {
    return path.join(kubejsPath(), 'data');
}

function kubejsClientScriptsPath() {
    return path.join(kubejsPath(), 'client_scripts');
}

function kubejsServerScriptsPath() {
    return path.join(kubejsPath(), 'server_scripts');
}

function kubejsStartupScriptsPath() {
    return path.join(kubejsPath(), 'startup_scripts');
}

function rootPath() {
    return navigateUpUntilTargetFolder('tools', __dirname);
}

/**
 * Finds the path to the target folder, starting from the current path and navigating up the directory tree.
 * @param targetFolderName {string} The name of the folder to find.
 * @param currentPath {string} The path to start searching from.
 */
function navigateUpUntilTargetFolder(targetFolderName, currentPath) {
    let currentDir = currentPath;
    let targetDir = path.join(currentDir, targetFolderName);
    while (!fs.existsSync(targetDir)) {
        currentDir = path.join(currentDir, '..');
        targetDir = path.join(currentDir, targetFolderName);
    }
    return currentDir;
}

module.exports = {
    paxiPath,
    paxiDatapacksPath,
    paxiResourcepacksPath,
    kubejsPath,
    kubejsAssetsPath,
    kubejsDataPath,
    kubejsClientScriptsPath,
    kubejsServerScriptsPath,
    kubejsStartupScriptsPath,
    rootPath
}
