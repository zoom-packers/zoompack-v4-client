let economy_dimension_xp_multipliers = {
    "minecraft:overworld": 1,
    "blue_skies:everbright": 1.2,
    "blue_skies:everdawn": 1.5,
    "aether:the_aether": 2,
    "minecraft:the_nether": 4,
    "undergarden:undergarden": 8,
    "minecraft:the_end": 16,
    "callfromthedepth_:depth": 32,
    "theabyss:the_abyss": 64,
}

let mining_xp_dimension_multipliers = {
    "minecraft:overworld": 1,
    "blue_skies:everbright": 1.2,
    "blue_skies:everdawn": 1.5,
    "aether:the_aether": 2.4,
    "minecraft:the_nether": 4,
    "undergarden:undergarden": 8,
    "minecraft:the_end": 16,
    "callfromthedepth_:depth": 32,
    "theabyss:the_abyss": 64,
}

PlayerEvents.tick( event => {
    if (event.getServer().tickCount % 600 !== 487) return;
    let server = event.getServer();
    let player = event.getPlayer();
    let player_name = player.getName().getString();
    let dimension = player.level.dimension.toString();
    if (economy_dimension_xp_multipliers[dimension] === undefined) return;
    let modifier = {
        attribute: "attributeslib:experience_gained",
        uuid: "85883543-c4a3-406e-ba46-9a1b6f917548",
        operation: "multiply_base"
    }
    let mining_modifier = {
        attribute: "zoompack_overrides_forge:mining_xp_multiplier",
        uuid: "85883543-c4a3-406e-ba46-9a1b6f917548",
        operation: "add"
    }
    let final_modifier_amount = economy_dimension_xp_multipliers[dimension] - 1;
    if (economy_dimension_xp_multipliers[dimension] !== undefined) {
        server.runCommandSilent(`/attribute ${player_name} ${modifier.attribute} modifier remove ${modifier.uuid}`);
        server.runCommandSilent(`/attribute ${player_name} ${modifier.attribute} modifier add ${modifier.uuid} "Dimensional Boost Modifier" ${final_modifier_amount} ${modifier.operation}`);
    }
    if (mining_xp_dimension_multipliers[dimension] !== undefined) {
        server.runCommandSilent(`/attribute ${player_name} ${mining_modifier.attribute} modifier remove ${mining_modifier.uuid}`);
        server.runCommandSilent(`/attribute ${player_name} ${mining_modifier.attribute} modifier add ${mining_modifier.uuid} "Dimensional Mining Boost Modifier" ${mining_xp_dimension_multipliers[dimension]} ${mining_modifier.operation}`);
    }
})
