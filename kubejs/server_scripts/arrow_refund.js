EntityEvents.death(event => {
    let damageSource = event.getSource();
    let server = event.getServer();
    let killedByWeapon = damageSource.getWeapon().present;
    if (!killedByWeapon) return;
    let weapon = damageSource.getWeapon().get();
    let weaponClassName = weapon.getItem().getClass().getName().toLowerCase();
    let projectileClasses = ["bowitem", "crossbowitem"];
    let causeIsProjectile = false;
    for (let projectileClass of projectileClasses) {
        if (weaponClassName.includes(projectileClass)) {
            causeIsProjectile = true;
            break;
        }
    }
    if (!causeIsProjectile) return;
    let dimension = event.getEntity().level.dimension.toString();
    let position = event.getEntity().position();
    let x = position.x();
    let y = position.y();
    let z = position.z();
    let arrowCount = Math.random() < 0.5 ? 1 : 2;
    server.runCommandSilent(`execute in ${dimension} run summon minecraft:item ${x} ${y} ${z} {Item:{id:"minecraft:arrow",Count:${arrowCount}}`)
})
