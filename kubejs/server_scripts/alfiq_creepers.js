function addCreeperBehavior(creeperId) {
    let $AvoidEntityGoal = Java.loadClass("net.minecraft.world.entity.ai.goal.AvoidEntityGoal");
    let $Player = Java.loadClass("net.minecraft.world.entity.player.Player");
    let $PowerContainer = Java.loadClass("io.github.edwinmindcraft.apoli.api.component.IPowerContainer");
    let $OriginsPowerTypes = Java.loadClass("io.github.apace100.origins.power.OriginsPowerTypes");
    let $EntitySelector = Java.loadClass("net.minecraft.world.entity.EntitySelector");
    EntityJSEvents.addGoalSelectors(creeperId, event => {
        event.arbitraryGoal(0, (e) => {
            return new $AvoidEntityGoal(e, $Player, e => $PowerContainer.hasPower(e, $OriginsPowerTypes.SCARE_CREEPERS.get()), 16.0, 1.0, 1.2, e => $EntitySelector.NO_CREATIVE_OR_SPECTATOR.test(e));
        })
    })
}

const creeperIds = [
    "creeperoverhaul:badlands_creeper",
    "creeperoverhaul:bamboo_creeper",
    "creeperoverhaul:beach_creeper",
    "creeperoverhaul:cave_creeper",
    "creeperoverhaul:dark_oak_creeper",
    "creeperoverhaul:desert_creeper",
    "creeperoverhaul:dripstone_creeper",
    "creeperoverhaul:hills_creeper",
    "creeperoverhaul:jungle_creeper",
    "creeperoverhaul:mushroom_creeper",
    "creeperoverhaul:ocean_creeper",
    "creeperoverhaul:savannah_creeper",
    "creeperoverhaul:snowy_creeper",
    "creeperoverhaul:spruce_creeper",
    "creeperoverhaul:swamp_creeper"
    ];

for (const creeperId of creeperIds) {
    addCreeperBehavior(creeperId);
}
