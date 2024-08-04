let fs = require("fs");
let folders = fs.readdirSync(".");
folders = folders.filter(folder => fs.statSync(folder).isDirectory());
folders = folders.map(x => x + "/attribute")

function roundToDecimal(value, decimal) {
    let pow = Math.pow(10, decimal);
    return Math.round((value + Number.EPSILON) * pow) / pow;
}

for (const folder of folders) {
    let files = fs.readdirSync(folder);
    files = files.filter(file => file.endsWith(".json"));
    for (const file of files) {
        let data = fs.readFileSync(folder + "/" + file);
        let json = JSON.parse(data);
        if (json.values === undefined) {
            continue;
        }
        if (json.attribute === "minecraft:generic.movement_speed") {
            if (json.values.common !== undefined) {
                json.values.common = {
                    min: 0.02,
                    steps: 1,
                    step: 0.02,
                }
            }
            if (json.values.uncommon !== undefined) {
                json.values.uncommon = {
                    min: 0.02,
                    steps: 2,
                    step: 0.02,
                }
            }
            if (json.values.rare !== undefined) {
                json.values.rare = {
                    min: 0.02,
                    steps: 4,
                    step: 0.03,
                }
            }
            if (json.values.epic !== undefined) {
                json.values.epic = {
                    min: 0.02,
                    steps: 7,
                    step: 0.03,
                }
            }
            if (json.values.mythic !== undefined) {
                json.values.mythic = {
                    min: 0.02,
                    steps: 12,
                    step: 0.03,
                }
            }
        }
        if (json.attribute === "minecraft:generic.attack_speed") {
            if (json.values.common !== undefined) {
                json.values.common = {
                    min: 0.02,
                    steps: 1,
                    step: 0.01,
                }
            }
            if (json.values.uncommon !== undefined) {
                json.values.uncommon = {
                    min: 0.02,
                    steps: 2,
                    step: 0.01,
                }
            }
            if (json.values.rare !== undefined) {
                json.values.rare = {
                    min: 0.02,
                    steps: 4,
                    step: 0.02,
                }
            }
            if (json.values.epic !== undefined) {
                json.values.epic = {
                    min: 0.02,
                    steps: 7,
                    step: 0.02,
                }
            }
            if (json.values.mythic !== undefined) {
                json.values.mythic = {
                    min: 0.02,
                    steps: 12,
                    step: 0.02,
                }
            }
        }
        json.values.custom_0 = {
            min: roundToDecimal(json.values.mythic.min * 1, 2),
            steps: roundToDecimal(json.values.mythic.steps * 1.25, 2),
            step: roundToDecimal(json.values.mythic.step * 1.05, 2),
        }
        json.values.custom_1 = {
            min: roundToDecimal(json.values.custom_0.min * 1, 2),
            steps: roundToDecimal(json.values.custom_0.steps * 1.25, 2),
            step: roundToDecimal(json.values.custom_0.step * 1.05, 2),
        }
        json.values.custom_2 = {
            min: roundToDecimal(json.values.custom_1.min * 1, 2),
            steps: roundToDecimal(json.values.custom_1.steps * 1.25, 2),
            step: roundToDecimal(json.values.custom_1.step * 1.05,2),
        }
        json.values.custom_3 = {
            min: roundToDecimal(json.values.custom_2.min * 1, 2),
            steps: roundToDecimal(json.values.custom_2.steps * 1.25, 2),
            step: roundToDecimal(json.values.custom_2.step * 1.05, 2),
        }
        json.values.ancient = {
            min: roundToDecimal(json.values.custom_3.min * 1, 2),
            steps: roundToDecimal(json.values.custom_3.steps * 1.25, 2),
            step: roundToDecimal(json.values.custom_3.step * 1.05, 2),
        }

        fs.writeFileSync(folder + "/" + file, JSON.stringify(json, null, 2));
    }
}

console.log(folders);
