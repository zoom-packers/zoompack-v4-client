const {paxiDatapacksPath} = require("../../utils/path_util");
const {ensureDirSync} = require("../../../sync_util");
const rootDatapackPath = paxiDatapacksPath()
const datapackPath = rootDatapackPath + "/pmmo_xp_edits/data/"

const blueSkiesOres = require("./blue_skies.js").ores;
const aetherOres = require("./aether.js").ores;
const betterNetherOres = require("./betternether.js").ores;
const undergardenOres = require("./undergarden.js").ores;
const endOres = require("./end.js").ores;
const callOfYucatanOres = require("./call_of_yucatan.js").ores;
const callFromTheDepthOres = require("./callfromthedepth.js").ores;
const abyssOres = require("./theabyss.js").ores;

function createDatapack(ores, path) {
    const fs = require("fs");
    let folderName = path
    ensureDirSync(folderName)
    folderName += "/pmmo"
    ensureDirSync(folderName)
    folderName += "/blocks"
    ensureDirSync(folderName)
    const keys = Object.keys(ores);
    const values = Object.values(ores);
    for (let i = 0; i < keys.length; i++) {
        const file = folderName + "/" + keys[i] + ".json";
        const data = JSON.stringify(values[i], null, 4);
        fs.writeFileSync(file, data);
    }
}

createDatapack(blueSkiesOres, datapackPath + "blue_skies");
createDatapack(aetherOres, datapackPath + "aether");
createDatapack(betterNetherOres, datapackPath + "betternether");
createDatapack(undergardenOres, datapackPath + "undergarden");
createDatapack(betterEndOres, datapackPath + "betterend");
createDatapack(callOfYucatanOres, datapackPath + "call_of_yucatan");
createDatapack(callFromTheDepthOres, datapackPath + "call_from_the_depth");
createDatapack(abyssOres, datapackPath + "the_abyss");
