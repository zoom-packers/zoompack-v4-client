let fs = require("fs");
let folders = fs.readdirSync(".");
folders = folders.filter(folder => fs.statSync(folder).isDirectory());

function roundToDecimal(value, decimal) {
    let pow = Math.pow(10, decimal);
    return Math.round((value + Number.EPSILON) * pow) / pow;
}

console.log("NEVER TRY USE THIS AGAIN!");

// for (const folder of folders) {
//     let files = fs.readdirSync(folder);
//     files = files.filter(file => file.endsWith(".json"));
//     for (const file of files) {
//         let data = fs.readFileSync(folder + "/" + file);
//         let json = JSON.parse(data);
//         if (json.bonuses === undefined) {
//             continue;
//         }
//         for (const bonus of json.bonuses) {
//             if (bonus.values === undefined) {
//                 continue;
//             }

//             // TODO: all manually from now on as balancing requires a lot of precision.!!!!
//             // if(!file.includes("combatant") || !file.includes("tyrannical")){
//             //     bonus.values.custom_0 = roundToDecimal(bonus.values.mythic * 1.25, 2)
//             //     bonus.values.custom_1 = roundToDecimal(bonus.values.custom_0 * 1.25, 2)
//             //     bonus.values.custom_2 = roundToDecimal(bonus.values.custom_1 * 1.25, 2)
//             //     bonus.values.custom_3 = roundToDecimal(bonus.values.custom_2 * 1.25, 2)
//             //     bonus.values.ancient = roundToDecimal(bonus.values.custom_3 * 1.25, 2)
//             // }
            
//         }


//         fs.writeFileSync(folder + "/" + file, JSON.stringify(json, null, 2));
//     }
// }

// console.log(folders);
