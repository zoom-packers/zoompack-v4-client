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
    return resourcePackList.map(resourcePack => {
        return {
            id: resourcePack.getId() ?? "",
            name: resourcePack.getTitle() ?? "",
            description: resourcePack.getDescription() ?? ""
        }
    });
}

function buildServerPackages() {
    let modList = getModList();
    let resourcePackList = getResourcePackList();
    let batchCount = 100;
    let modBatches = [];
    let resourcePackBatches = [];
    for (let i = 0; i < modList.length; i += batchCount) {
        let maxIndex = Math.min(i + batchCount, modList.length);
        modBatches.push(modList.slice(i, maxIndex));
    }
    resourcePackBatches = [resourcePackList];
    return {
        modBatches: modBatches,
        resourcePackBatches: resourcePackBatches
    };
}

NetworkEvents.dataReceived('anticheat:check', function (event) {
    let batches = buildServerPackages();
    let minBatches = Math.min(batches.modBatches.length, batches.resourcePackBatches.length);
    let maxBatches = Math.max(batches.modBatches.length, batches.resourcePackBatches.length);
    let mostBatches = batches.modBatches.length > batches.resourcePackBatches.length ? 'mods' : 'resource packs';
    for (let i = 0; i < minBatches; i++) {
        let serverPackage = {
            mods: batches.modBatches[i],
            resourcePacks: batches.resourcePackBatches[i]
        };
        event.getEntity().sendData('anticheat:response', serverPackage);
    }
    if (mostBatches === 'mods') {
        for (let i = minBatches; i < maxBatches; i++) {
            let serverPackage = {
                mods: batches.modBatches[i],
                resourcePacks: []
            };
            event.getEntity().sendData('anticheat:response', serverPackage);
        }
    } else {
        for (let i = minBatches; i < maxBatches; i++) {
            let serverPackage = {
                mods: [],
                resourcePacks: batches.resourcePackBatches[i]
            };
            event.getEntity().sendData('anticheat:response', serverPackage);
        }
    }
});
