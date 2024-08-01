StartupEvents.registry("item", e => {
    e.create("zoomers_magic:mage_augment_cooldown")
        .texture("zoomers_magic:item/mage_augment_cooldown")
        .maxStackSize(1)
        .attachCapability(CuriosCapabilityBuilder.CURIOS.itemStack()
            .canEquip((stack, context) => true)
            .canUnequip((stack, context) => true)
            .modifyAttribute('irons_spellbooks:cooldown_reduction', 'r1', 0.2, 'multiply_base')
        )
});
