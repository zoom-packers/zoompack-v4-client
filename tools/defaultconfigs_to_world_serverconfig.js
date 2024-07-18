const util = require('./sync_util')

async function start() {
    const defaultconfigsFolder = '../defaultconfigs'
    const worldsFolder = '../saves'
    console.log("We will now copy DEFAULTCONFIGS TO WORLD")
    let selectedWorldFolder = await util.askUserAboutSaveFolder(worldsFolder);
    if (selectedWorldFolder === null) {
        return null;
    }
    selectedWorldFolder = worldsFolder + '/' + selectedWorldFolder;
    const serverConfigFolder = selectedWorldFolder + '/' + 'serverconfig'
    util.copyFolderContents(defaultconfigsFolder, serverConfigFolder, false);
    console.log("Successfully copied to server config")
}

start();
