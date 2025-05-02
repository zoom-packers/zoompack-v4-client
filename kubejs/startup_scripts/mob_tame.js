let tameableMobs = [
    "ias_spellbooks:summoned_ragno",
]

let LivingEntity = Java.loadClass("net.minecraft.world.entity.LivingEntity")
let Difficulty = Java.loadClass("net.minecraft.world.Difficulty")
let Player = Java.loadClass("net.minecraft.world.entity.player.Player")
let Vec2 = Java.loadClass("net.minecraft.world.phys.Vec2")
let FlyingMob = Java.loadClass("net.minecraft.world.entity.FlyingMob")
let WaterAnimal = Java.loadClass("net.minecraft.world.entity.animal.WaterAnimal")
let WallClimberNavigation = Java.loadClass("net.minecraft.world.entity.ai.navigation.WallClimberNavigation")
let isClient = Platform.isClientEnvironment()
let Minecraft = isClient ? Java.loadClass("net.minecraft.client.Minecraft") : null

EntityJSEvents.modifyEntity(event => {
    tameableMobs.forEach(id => {
        event.modify(id, modifyBuilder => {
            modifyBuilder
                .canAttack(/**@param {Internal.ContextUtils$LivingEntityContext}context */  context => {
                    return false;
                })
        })
    })
})