// API: KubeJS
// KubeJS: 1.0.0
// MC: 1.20.1

let modId = "deeperdarker";
let materialIds = ["warden"]
let durabilities = [5000]
let attackDamages = [150]
let armorTotals = [100]
let armorToughnessesTotals = [40]
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

