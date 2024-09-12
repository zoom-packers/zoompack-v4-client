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

function buildServerPackage() {
    const modList = getModList();
    const resourcePackList = getResourcePackList();
    return {
        mods: modList,
        resourcePacks: resourcePackList
    };
}

NetworkEvents.dataReceived('anticheat:check', function (event) {
    const serverPackage = buildServerPackage();
    event.getEntity().sendData('anticheat:response', serverPackage);
});
