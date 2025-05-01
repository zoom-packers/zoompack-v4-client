let $ArmorItem = Java.loadClass("net.minecraft.world.item.ArmorItem");

ForgeEvents.onEvent("net.minecraftforge.event.AnvilUpdateEvent", (event) => {
    const { left, right } = event;

    if (left.item instanceof $ArmorItem && right == "totem_of_undying") {
        event.setCost(1);
        event.setOutput(left.copy().enchant("kubejs:undying", 1));
    }
});

StartupEvents.registry("enchantment", (event) => {
    event.create("undying").armor();
});