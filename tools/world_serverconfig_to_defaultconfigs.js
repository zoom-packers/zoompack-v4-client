const util = require('./sync_util')

async function start() {
    const defaultconfigsFolder = '../defaultconfigs'
    const worldsFolder = '../saves'
    console.log("We will now copy WORLD TO DEFAULTCONFIGS")
    let selectedWorldFolder = await util.askUserAboutSaveFolder(worldsFolder);
    if (selectedWorldFolder === null) {
        return null;
    }
    selectedWorldFolder = worldsFolder + '/' + selectedWorldFolder;
    const serverConfigFolder = selectedWorldFolder + '/' + 'serverconfig'
    if (!fs.existsSync(serverConfigFolder)) {
        console.log("No serverconfig folder found in the selected world");
        return;
    }
    util.copyFolderContents(serverConfigFolder, defaultconfigsFolder, true)
    console.log("Serverconfig copied to defaultconfigs")
}

start();
