//priority: 999
let magicUUID = "85883543-c4a3-406e-ba46-9cb463a56225"

let combatEvent = new Event()
    .withName("Combat Training")
    .withIcon("minecraft:textures/item/iron_sword.png")
    .withDescription("Extra damage & XP gain.")
    .allWeekdays("20:00", "22:00")
    .withAttributeModifier("minecraft:generic.attack_damage", "multiply_total", 0.2, magicUUID)
    .withAttributeModifier("minecraft:generic.health", "multiply_total", 0.2, magicUUID)
    .withAttributeModifier("zoompack_overrides_forge:combat_xp_multiplier", "add", 0.2, magicUUID)
    .withAttributeModifier("zoompack_overrides_forge:swordsmanship_xp_multiplier", "add", 0.2, magicUUID)
    .withAttributeModifier("zoompack_overrides_forge:archery_xp_multiplier", "add", 0.2, magicUUID)
    .withAttributeModifier("zoompack_overrides_forge:magic_xp_multiplier", "add", 0.2, magicUUID)

let weekendCombatEvent = new Event()
    .withName("Weekend Combat Training")
    .withIcon("minecraft:textures/item/diamond_sword.png")
    .withDescription("Even more damage & XP Gain.")
    .allWeekends("13:00", "14:00")
    .allWeekends("21:00", "23:00")
    .withAttributeModifier("minecraft:generic.attack_damage", "multiply_total", 0.35, magicUUID)
    .withAttributeModifier("minecraft:generic.health", "multiply_total", 0.35, magicUUID)
    .withAttributeModifier("zoompack_overrides_forge:combat_xp_multiplier", "add", 0.5, magicUUID)
    .withAttributeModifier("zoompack_overrides_forge:swordsmanship_xp_multiplier", "add", 0.5, magicUUID)
    .withAttributeModifier("zoompack_overrides_forge:archery_xp_multiplier", "add", 0.5, magicUUID)
    .withAttributeModifier("zoompack_overrides_forge:magic_xp_multiplier", "add", 0.5, magicUUID)

let fishingFriday = new Event()
    .withName("Fishing Friday")
    .withIcon("minecraft:textures/item/fishing_rod.png")
    .withDescription("Extra fishing luck & XP gain.")
    .addInterval("Friday", "19:00", "21:00")
    .addInterval("Saturday", "00:00", "02:00")
    .withAttributeModifier("zoompack_overrides_forge:fisherman_luck", "add", 1, magicUUID)
    .withAttributeModifier("zoompack_overrides_forge:fishing_xp_multiplier", "add", 0.5, magicUUID);

let miningMonday = new Event()
    .withName("Mining Monday")
    .withIcon("minecraft:textures/item/iron_pickaxe.png")
    .withDescription("Extra fortune & XP gain.")
    .addInterval("Monday", "12:00", "14:00")
    .addInterval("Monday", "20:00", "22:00")
    .withAttributeModifier("puffish_attributes:player.fortune", "add", 2, magicUUID)
    .withAttributeModifier("zoompack_overrides_forge:mining_xp_multiplier", "add", 0.5, magicUUID);

let farmingFrenzy = new Event()
    .withName("Farming Frenzy")
    .withIcon("minecraft:textures/item/iron_hoe.png")
    .withDescription("Extra harvests & XP gain.")
    .allWeekdays("11:00", "14:00")
    .allWeekdays("21:00", "23:00")
    .withAttributeModifier("additional_attributes:harvest", "add", 0.5, magicUUID)
    .withAttributeModifier("zoompack_overrides_forge:farming_xp_multiplier", "add", 0.5, magicUUID);

let explorationTime = new Event()
    .withName("Stop, Explore Time!")
    .withIcon("minecraft:textures/item/compass_00.png")
    .withDescription("Extra luck & XP gain.")
    .addInterval("Friday","16:00", "18:00")
    .addInterval("Saturday","16:00", "18:00")
    .withAttributeModifier("zoompack_overrides_forge:agility_xp_multiplier", "add", 0.5, magicUUID)
    .withAttributeModifier("zoompack_overrides_forge:swimming_xp_multiplier", "add", 0.5, magicUUID)
    .withAttributeModifier("zoompack_overrides_forge:flying_xp_multiplier", "add", 0.5, magicUUID)
    .withAttributeModifier("minecraft:generic.luck", "add", 2, magicUUID)

// Fun event, but not suitable for a public server.
// let immortality = new Event()
//     .withName("Immortality")
//     .withDescription("You are immortal for a limited time.")
//     .allWeek("00:00", "24:00")
//     .withPlayerDeath((event) => {
//         event.server.runCommandSilent(`/tellraw @a {"text":"§c${event.entity.name.getString()} has died, but they are immortal!","bold":true}`);
//         event.server.runCommandSilent(`/heal ${event.entity.name.getString()}`);
//         console.log(`${event.entity.name} has died, but they are immortal!`);
//         event.cancel();
//     });

// Planned Events:
// Double Loot Drop

var schedule = [
    combatEvent,
    weekendCombatEvent,
    fishingFriday,
    miningMonday,
    farmingFrenzy,
    explorationTime
]
