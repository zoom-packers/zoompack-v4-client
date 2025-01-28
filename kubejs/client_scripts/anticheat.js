function getModList() {
    let modList = Platform.getMods();
    let result = [];
    modList.forEach((k,v) => {
        result.push({
            id: v.getId() ?? "",
            name: v.getName() ?? "",
            description: ""
        });
    });
    return result;
}

function getResourcePackList() {
    let minecraftClass = Java.loadClass('net.minecraft.client.Minecraft');
    let resourcePackList = minecraftClass.getInstance().getResourcePackRepository().getSelectedPacks();

    let results = [];

    resourcePackList.forEach(rp=>{
        results.push({
            id: rp.getId() ?? "",
            name: rp.getTitle() ?? "",
            description: rp.getDescription() ?? ""
        });
    })

    return results;
}

function batchObjects(objectList) {
    const batchSize = 100;
    const batches = [];
    let currentBatch = [];

    objectList.forEach((element, index) => {
        currentBatch.push(element);

        if (currentBatch.length >= batchSize || index === objectList.length - 1) {
            batches.push(currentBatch);
            currentBatch = [];
        }
    });

    return batches;
}

NetworkEvents.dataReceived('anticheat:check_mods', function (event) {
    let mods = batchObjects(getModList());
    mods.forEach(batch => {
        event.getEntity().sendData('anticheat:response_mods', {
            mods: batch
        });
    });;
})

NetworkEvents.dataReceived('anticheat:check_rps', function (event) {
    let rps = batchObjects(getResourcePackList());
    rps.forEach(batch => {
        event.getEntity().sendData('anticheat:response_rps', {
            resourcePacks: batch
        });
    });;
})