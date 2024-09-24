let backpackLimiterCuriosAPI = Java.loadClass("top.theillusivec4.curios.api.CuriosApi");
let backpackLimiterMaxBackpacks = 2;
let backpackLimiterMagicUUID = "00000000-0000-0000-0000-000000000032";

let backpackLimiterIds = [
    "sophisticatedbackpacks:backpack",
    "sophisticatedbackpacks:copper_backpack",
    "sophisticatedbackpacks:iron_backpack",
    "sophisticatedbackpacks:gold_backpack",
    "sophisticatedbackpacks:diamond_backpack",
    "sophisticatedbackpacks:emerald_backpack",
    "sophisticatedbackpacks:netherite_backpack",
]

let backpackLimiterPlayerTicks = {}
let backpackLimiterPreviousBackpackCount = {}
PlayerEvents.tick(event => {
    let player = event.player
    let server = event.server
    let playerUUID = player.uuid
    if (!backpackLimiterPlayerTicks[playerUUID]) {
        backpackLimiterPlayerTicks[playerUUID] = 0
        backpackLimiterPreviousBackpackCount[playerUUID] = 0
    }
    backpackLimiterPlayerTicks[playerUUID]++
    if (backpackLimiterPlayerTicks[playerUUID] % 20 !== 0) {
        return;
    }

    let inventory = player.inventory.items;
    let armors = player.inventory.armor;
    let backSlotDefinition = backpackLimiterCuriosAPI.getCuriosInventory(player).resolve().get().getCurios().back;
    let stacks = backSlotDefinition.getStacks();
    let slots = backSlotDefinition.getSlots();
    let backSlots = [];
    for (let i = 0; i < slots; i++) {
        backSlots.push(stacks.getStackInSlot(i));
    }

    let backpackCount = 0;
    for (let i = 0; i < inventory.size(); i++) {
        let itemStack = inventory.get(i);
        if (backpackLimiterCheckForBackpack(itemStack)) {
            backpackCount++;
        }
    }
    for (let i = 0; i < armors.size(); i++) {
        let itemStack = armors.get(i);
        if (backpackLimiterCheckForBackpack(itemStack)) {
            backpackCount++;
        }
    }
    for (let i = 0; i < backSlots.length; i++) {
        let itemStack = backSlots[i];
        if (backpackLimiterCheckForBackpack(itemStack)) {
            backpackCount++;
        }
    }

    if (backpackCount > backpackLimiterMaxBackpacks) {
        player.sendSystemMessage("§4You are carrying too many backpacks! " +
            "The limit is " + backpackLimiterMaxBackpacks + " backpacks at a time." +
            "§r §2Drop some backpacks to unburden yourself.§r " +
            "§3Don't forget to check your Curios slots too.§r");
    }

    if (backpackCount > backpackLimiterMaxBackpacks && backpackLimiterPreviousBackpackCount[playerUUID] <= backpackLimiterMaxBackpacks) {
        //Apply slowness effect
        server.runCommandSilent(`/attribute ${player.getName().getString()} minecraft:generic.movement_speed modifier add ${backpackLimiterMagicUUID} "Backpack Penalty" -100 add`);
    }
    if (backpackCount <= backpackLimiterMaxBackpacks && backpackLimiterPreviousBackpackCount[playerUUID] > backpackLimiterMaxBackpacks) {
        //Remove slowness effect
        server.runCommandSilent(`/attribute ${player.getName().getString()} minecraft:generic.movement_speed modifier remove ${backpackLimiterMagicUUID}`);
        player.sendSystemMessage("§3You are no longer carrying too many backpacks.§r " +
            "§2You can now move at full speed.§r");
    }
    backpackLimiterPreviousBackpackCount[playerUUID] = backpackCount;
});

function backpackLimiterCheckForBackpack(itemStack) {
    if (itemStack.isEmpty()) {
        return false;
    }
    if (backpackLimiterIds.includes(itemStack.getId())) {
        return true;
    }
    return false;
}
