function getModList() {
    const modList = Platform.getMods();
    const result = [];
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
    const minecraftClass = Java.loadClass('net.minecraft.client.Minecraft');
    const resourcePackList = minecraftClass.getInstance().getResourcePackRepository().getSelectedPacks();
    return resourcePackList.map(resourcePack => {
        return {
            id: resourcePack.getId() ?? "",
            name: resourcePack.getTitle() ?? "",
            description: resourcePack.getDescription() ?? ""
        }
    });
}

function buildServerPackages() {
    const modList = getModList();
    const resourcePackList = getResourcePackList();
    const batchCount = 100;
    const modBatches = [];
    const resourcePackBatches = [];
    for (let i = 0; i < modList.length; i += batchCount) {
        modBatches.push(modList.slice(i, i + batchCount));
    }
    for (let i = 0; i < resourcePackList.length; i += batchCount) {
        resourcePackBatches.push(resourcePackList.slice(i, i + batchCount));
    }
    return {
        modBatches: modBatches,
        resourcePackBatches: resourcePackBatches
    };
}

NetworkEvents.dataReceived('anticheat:check', function (event) {
    const batches = buildServerPackages();
    const minBatches = Math.min(batches.modBatches.length, batches.resourcePackBatches.length);
    const maxBatches = Math.max(batches.modBatches.length, batches.resourcePackBatches.length);
    const mostBatches = batches.modBatches.length > batches.resourcePackBatches.length ? 'mods' : 'resource packs';
    for (let i = 0; i < minBatches; i++) {
        const serverPackage = {
            mods: batches.modBatches[i],
            resourcePacks: batches.resourcePackBatches[i]
        };
        event.getEntity().sendData('anticheat:response', serverPackage);
    }
    if (mostBatches === 'mods') {
        for (let i = minBatches; i < maxBatches; i++) {
            const serverPackage = {
                mods: batches.modBatches[i],
                resourcePacks: []
            };
            event.getEntity().sendData('anticheat:response', serverPackage);
        }
    } else {
        for (let i = minBatches; i < maxBatches; i++) {
            const serverPackage = {
                mods: [],
                resourcePacks: batches.resourcePackBatches[i]
            };
            event.getEntity().sendData('anticheat:response', serverPackage);
        }
    }
});
