const kukulkanATTACK_MAX = 5; // Max hits before checking cheese
const ATTACK_RADIUS = 2; // 2-block movement check

EntityJSEvents.modifyEntity(event => {
    event.modify("call_of_yucutan:kukulkan", modifyBuilder => {

        modifyBuilder
            .onHurtTarget(context => {
                const { entity } = context;
                // Reset tracking when the mob successfully hits a target
                entity.persistentData.attackData = [];
            })

            .onHurt(context => {
                let entity = context.entity;
                let attacker = context.damageSource.player;
                if (!attacker) return;

                // Get attacker's position
                let pos = { x: attacker.getX(), y: attacker.getY(), z: attacker.getZ() };

                // Ensure persistentData is initialized
                if (!entity.persistentData.attackData) {
                    entity.persistentData.attackData = [];
                }

                // Store the new attack position
                entity.persistentData.attackData.push(pos);

                // Keep only the last kukulkanATTACK_MAX hits
                if (entity.persistentData.attackData.length > kukulkanATTACK_MAX) {
                    entity.persistentData.attackData.shift();
                }

                // Check if all attacks happened within the same small area
                if (entity.persistentData.attackData.length >= kukulkanATTACK_MAX) {
                    let firstPos = entity.persistentData.attackData[0];
                    let cheesing = entity.persistentData.attackData.every(hit =>
                        Math.abs(hit.x - firstPos.x) <= ATTACK_RADIUS &&
                        Math.abs(hit.z - firstPos.z) <= ATTACK_RADIUS
                    );

                    if (cheesing) {
                        let healAmount = entity.maxHealth * (Math.random() * (0.10 - 0.05) + 0.05);
                        entity.heal(healAmount);
                        context.entity.initiateCastSpell(SpellRegistry.DEVOUR_SPELL.get(), 20);
                        context.entity.initiateCastSpell(SpellRegistry.EVASION_SPELL.get(), 10);
                    }
                }
            });
    });
});