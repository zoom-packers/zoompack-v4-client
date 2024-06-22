// API: KubeJS
// KubeJS: 1.0.0
// MC: 1.20.1

let modId = "undergarden";
let materialIds = ["cloggrum", "froststeel", "utherium", "forgotten"]
let durabilities = [4000, 2500, 3500, 4500]
let attackDamages = [80, 60, 100, 120]
let armorTotals = [60, 70, 80, 0]
let armorToughnessesTotals = [26, 28, 30, 0]
let armorDistributions = [
    [11, 16, 22, 11],
    [13, 20, 25, 12],
    [15, 22, 28, 15],
    [0, 0, 0, 0]
]
let armorToughnessDistributions = armorToughnessesTotals.map(x => x / 4);


ItemEvents.modification( (event) => {
    global.modifyModItems(event, modId, materialIds, durabilities, attackDamages, armorTotals, armorToughnessesTotals, armorDistributions, armorToughnessDistributions);
});

