let fs = require("fs")
let folders = fs.readdirSync(".");
folders = folders.filter((folder) => { return fs.lstatSync(folder).isDirectory() })

for (let folder of folders) {
    if (folder === "mythicmounts") continue
    if (folder === "immersive_aircraft") continue
    if (folder === "man_of_many_planes") continue
    folder += "/pmmo"
    let subfolders = fs.readdirSync(folder);
    subfolders = subfolders.filter((subfolder) => { return fs.lstatSync(`${folder}/${subfolder}`).isDirectory() })
    for (const subfolder of subfolders) {
        if (subfolder === "items") continue
        let subFolderPath = `${folder}/${subfolder}`
        // remove the subfolder with all its contents
        fs.rmdirSync(subFolderPath, { recursive: true })
    }
}
