let economy_dimension_xp_multipliers = {
    "minecraft:overworld": 1,
    "blue_skies:everbright": 1.5,
    "blue_skies:everdawn": 2.2,
    "aether:the_aether": 4.5,
    "minecraft:nether": 8,
    "undergarden:undergarden": 15,
    "minecraft:the_end": 25,
    "callfromthedepth_:depth": 50,
    "theabyss:the_abyss": 80,
}

PlayerEvents.tick( event => {
    if (event.getServer().tickCount % 20 !== 2) return;
    let server = event.getServer();
    let player = event.getPlayer();
    let player_name = player.getName().getString();
    let dimension = player.level.dimension.toString();
    if (economy_dimension_xp_multipliers[dimension] === undefined) return;
    let modifier = {
        attribute: "attributeslib:experience_gained",
        uuid: "85883543-c4a3-406e-ba46-9c146fa16248",
        operation: "multiply_base"
    }
    let final_modifier_amount = economy_dimension_xp_multipliers[dimension] - 1;
    if (economy_dimension_xp_multipliers[dimension] !== undefined) {
        server.runCommandSilent(`/attribute ${player_name} ${modifier.attribute} modifier remove ${modifier.uuid}`);
        server.runCommandSilent(`/attribute ${player_name} ${modifier.attribute} modifier add ${modifier.uuid} "Dimensional Boost Modifier" ${final_modifier_amount} ${modifier.operation}`);
    }
})
