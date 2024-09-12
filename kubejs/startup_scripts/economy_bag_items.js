StartupEvents.registry('item', e => {
    e.create("zoomers_economy:gatekeeper_bag")
            .maxStackSize(64)
            .texture('blue_skies:item/misc/loot_bag')
            .displayName('§2§lGatekeeper Map Bag')
            .tooltip("§9There is a big chance that there is a working map inside")
            .tooltip('Only one way to find out');
})