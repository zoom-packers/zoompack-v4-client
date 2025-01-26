//priority: 500

function createRarityMaterial(e, name, displayName) {
    return e.create(name)
        .displayName(displayName)
}

StartupEvents.registry("item", e => {
    createRarityMaterial(e, "zoomers_extended_apotheosis:radiant_material", "Spectral Dust")
    createRarityMaterial(e, "zoomers_extended_apotheosis:celestial_material", "Ethereal Essence")
    createRarityMaterial(e, "zoomers_extended_apotheosis:angelic_material", "Astral Breath")
    createRarityMaterial(e, "zoomers_extended_apotheosis:godly_material", "God Eye")
})
