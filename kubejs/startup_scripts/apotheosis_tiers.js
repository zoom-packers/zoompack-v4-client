//priority: 500

function createRarityMaterial(e, name, displayName, texture) {
    return e.create(name)
        .displayName(displayName)
        .texture(texture)
}

StartupEvents.registry("item", e => {
    createRarityMaterial(e, "apoth_extra_tier_0", "Milea's Sweat", "kubejs:item/apoth_extra_tier_0")
    createRarityMaterial(e, "apoth_extra_tier_1", "Calin's Torment", "kubejs:item/apoth_extra_tier_1")
    createRarityMaterial(e, "apoth_extra_tier_2", "Marius's Tears", "kubejs:item/apoth_extra_tier_2")
    createRarityMaterial(e, "apoth_extra_tier_3", "Emi's Blood", "kubejs:item/apoth_extra_tier_3")
})
