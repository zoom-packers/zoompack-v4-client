StartupEvents.registry('item', e => {
    e.create("kubejs:golden_experience_cutter")
            .maxStackSize(1)
            .displayName('Golden Experience Cutter')
            .tooltip("")
            .tooltip("Use it to convert 10 experience into orbes");
    e.create("kubejs:diamond_experience_cutter")
            .maxStackSize(1)
            .displayName('Diamond Experience Cutter')
            .tooltip("")
            .tooltip("Use it to convert 100 experience into orbes");
    e.create("kubejs:horizonite_experience_cutter")
            .maxStackSize(1)
            .displayName('Horizonite Experience Cutter')
            .tooltip("")
            .tooltip("Use it to convert 1.000 experience into orbes");
    e.create("kubejs:netherite_experience_cutter")
            .maxStackSize(1)
            .displayName('Netherite Experience Cutter')
            .tooltip("")
            .tooltip("Use it to convert 10.000 experience into orbes");
    e.create("kubejs:immemorial_experience_cutter")
            .maxStackSize(1)
            .displayName('Immemorial Experience Cutter')
            .tooltip("")
            .tooltip("Use it to convert 100.000 experience into orbes");
    e.create("kubejs:fusion_experience_cutter")
            .maxStackSize(1)
            .displayName('Fusion Experience Cutter')
            .tooltip("")
            .tooltip("Use it to convert 1.000.000 experience into orbes");

    e.create("kubejs:golden_experience_orbe")
            .maxStackSize(64)
            .displayName('Golden Experience Orbe')
            .tooltip("")
            .tooltip("Consume it to gain §a10XP");
    e.create("kubejs:diamond_experience_orbe")
            .maxStackSize(64)
            .displayName('Diamond Experience Orbe')
            .tooltip("")
            .tooltip("Consume it to gain §a100XP");
    e.create("kubejs:horizonite_experience_orbe")
            .maxStackSize(64)
            .displayName('Horizonite Experience Orbe')
            .tooltip("")
            .tooltip("Consume it to gain §a1.000XP");
    e.create("kubejs:netherite_experience_orbe")
            .maxStackSize(64)
            .displayName('Netherite Experience Orbe')
            .tooltip("")
            .tooltip("Consume it to gain §a10.000XP");
    e.create("kubejs:immemorial_experience_orbe")
            .maxStackSize(64)
            .displayName('Immemorial Experience Orbe')
            .tooltip("")
            .tooltip("Consume it to gain §a100.000XP");
    e.create("kubejs:fusion_experience_orbe")
            .maxStackSize(64)
            .displayName('Fusion Experience Orbe')
            .tooltip("")
            .tooltip("Consume it to gain §a1.000.000XP");
})