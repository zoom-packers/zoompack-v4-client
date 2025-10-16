function healthMultiplier(level) {
    return Math.pow(1.1, level) + level * 0.5;
}
function armorModifier(level) {
    return Math.pow(1.06, level) + level * 0.25;
}
function armorToughnessModifier(level) {
    return Math.pow(1.035, level) + level * 0.1;
}
function attackModifier(level) {
    return Math.pow(1.075, level) + level * 0.75;
}
function projectileModifier(level) {
    return (Math.pow(1.075, level) + level * 0.75) * 5;
}
let pmmoApiUtils = Java.loadClass('harmonised.pmmo.api.APIUtils');

EntityEvents.spawned(event => {
    var entity = event.getEntity();
    var entityType = entity.getType();
    if (!entityType.startsWith('medievalorigins')) {
        return;
    }
    var server = event.server;
    server.scheduleInTicks(1, (callback) => {
        var summoner = entity.getSummoner();
        if (summoner == null) {
            return;
        }
        var allSummons = server.getEntities().filter(entity => entity.getType().startsWith('medievalorigins'))
        var summonerExistingSummons = allSummons.filter(entity => entity.getSummoner() === summoner);
        if (summonerExistingSummons.length > 10) {
            entity.kill();
            summoner.sendSystemMessage('Your summon §4failed§r. Your horde is too big.')
        }

        var summonerMagicLevel = pmmoApiUtils.getLevel("magic", summoner);
        addModifier(entity, "minecraft:generic.max_health", healthMultiplier(summonerMagicLevel), "addition");
        addModifier(entity, "minecraft:generic.armor", armorModifier(summonerMagicLevel), "addition");
        addModifier(entity, "minecraft:generic.armor_toughness", armorToughnessModifier(summonerMagicLevel), "addition");
        addModifier(entity, "minecraft:generic.attack_damage", attackModifier(summonerMagicLevel), "addition");
        addModifier(entity, "projectile_damage:generic", projectileModifier(summonerMagicLevel), "addition");
        entity.heal(entity.getMaxHealth());
    })
})
