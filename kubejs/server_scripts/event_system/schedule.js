const randUUID = "85883543-c4a3-406e-ba46-9cb463a56225"

const combatEvent = new Event()
    .withName("Combat Training")
    .withDescription("Extra damage & XP gain.")
    .allWeekdays("19:00", "24:00")
    .withAttributeModifier("minecraft:generic.attack_damage", "multiply_total", 0.25, randUUID)
    .withEffect("zoompack_overrides_forge:combat_xp_multiplier", 0)
    .withEffect("zoompack_overrides_forge:swordsmanship_xp_multiplier", 0)
    .withEffect("zoompack_overrides_forge:archery_xp_multiplier", 0)
    .withEffect("zoompack_overrides_forge:magic_xp_multiplier", 0);

const weekendCombatEvent = new Event()
    .withName("Weekend Combat Training")
    .withDescription("Even more damage & XP Gain. Gather your friends and buckle up!")
    .allWeekends("19:00", "24:00")
    .withAttributeModifier("minecraft:generic.attack_damage", "multiply_total", 0.35, randUUID)
    .withEffect("zoompack_overrides_forge:combat_xp_multiplier", 1)
    .withEffect("zoompack_overrides_forge:swordsmanship_xp_multiplier", 1)
    .withEffect("zoompack_overrides_forge:archery_xp_multiplier", 1)
    .withEffect("zoompack_overrides_forge:magic_xp_multiplier", 1);

const fishingFriday = new Event()
    .withName("Fishing Friday")
    .withDescription("Extra fishing luck & XP gain for a limited time.")
    .allWeek("Friday", "00:00", "24:00")
    .withEffect("zoompack_overrides_forge:fishing_xp_multiplier", 0)
    .withAttributeModifier("zoompack_overrides_forge:fisherman_luck", "addition", 0.5, randUUID);

const miningMonday = new Event()
    .withName("Mining Monday")
    .withDescription("Extra fortune & XP gain for a limited time.")
    .addInterval("Monday", "00:00", "24:00")
    .withEffect("zoompack_overrides_forge:mining_xp_multiplier", 0)
    .withAttributeModifier("puffish_attributes:player.fortune", "addition", 0.5, randUUID);

const farmingFrenzy = new Event()
    .withName("Farming Frenzy")
    .withDescription("Extra harvests & XP gain.")
    .allWeekdays("12:00", "24:00")
    .withEffect("zoompack_overrides_forge:farming_xp_multiplier", 0)
    .withAttributeModifier("additional_attributes:harvest", "addition", 0.5, randUUID);

var schedule = [
    combatEvent,
    weekendCombatEvent,
    fishingFriday,
    miningMonday,
    farmingFrenzy
]
