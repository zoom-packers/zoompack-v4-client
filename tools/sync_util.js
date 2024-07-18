const fs = require('fs');
const { execSync } = require('child_process');

function copyFolderContents(src, dest, checkDestSourceControl) {
    ensureDirSync(dest);
    fs.readdirSync(src).forEach(file => {
        const srcPath = src + '/' + file;
        const destPath = dest + '/' + file;
        if (fs.lstatSync(srcPath).isDirectory()) {
            ensureDirSync(destPath);
            copyFolderContents(srcPath, destPath, checkSourceControl);
        } else {
            if (checkDestSourceControl && !isFileSourceControlled(destPath)) {
                console.log(`Skipping ${destPath} because it is not source controlled`);
                return;
            }
            fs.copyFileSync(srcPath, destPath);
        }
    });
}

function isFileSourceControlled(file) {
    // check if this file is tracked by git
    try {
        const result = execSync(`git ls-files --error-unmatch ${file}`, {stdio: 'ignore'});
        return true;
    } catch (e) {
        return false;
    }
}


function ensureDirSync(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}

async function askUserAboutSaveFolder(savesFolder) {
    const saves = fs.readdirSync(savesFolder);
    saves.filter(file => fs.lstatSync(savesFolder).isDirectory());
    const readline = require('node:readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    console.log("Here are the saves in the saves folder:");
    console.log("0. Cancel");
    saves.forEach((save, index) => {
        console.log(`${index + 1}. ${save}`);
    });
    let result = await new Promise((resolve, reject) => {
        rl.question('Which save would you like to use? ', (answer) => {
            resolve(answer);
            rl.close();
        });
    });
    const resultNumber = parseInt(result);
    if (resultNumber === 0) {
        return null;
    }
    if (isNaN(resultNumber) || resultNumber < 0 || resultNumber > saves.length) {
        console.log("Invalid input. Please try again.");
    }
    return saves[resultNumber - 1];
}

module.exports = {
    copyFolderContents,
    ensureDirSync,
    askUserAboutSaveFolder
}
