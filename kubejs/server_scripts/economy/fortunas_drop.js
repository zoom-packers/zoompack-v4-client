//priority: 876

let DEFAULT_FORTUNAS_DROP_CHANCE = 0.035;

EntityEvents.death(event => {
    let entity = event.getEntity();
    if (!isEntityAllowed(entity)) return;
    var killingEntity = event.getSource().getPlayer();
    if (!killingEntity) return;
    if (killingEntity.getType() !== 'minecraft:player') return;
    var difficultyMultiplier = getPlayerDifficultyMultiplierForEconomy(killingEntity);
    let randomChance = Math.random();
    if (randomChance > DEFAULT_FORTUNAS_DROP_CHANCE * difficultyMultiplier) return;
    let dimension = event.getLevel().getDimension().toString();
    let loot = null
    switch (dimension) {
        case "minecraft:overworld":
            loot = global.overworldFortunasDrop();
            break;
        case "blue_skies:everbright":
            loot = global.everbrightFortunasDrop();
            break;
        case "blue_skies:everdawn":
            loot = global.everdawnFortunasDrop();
            break;
        case "aether:the_aether":
            loot = global.aetherFortunasDrop();
            break;
        case "minecraft:the_nether":
            loot = global.netherFortunasDrop();
            break;
        case "undergarden:undergarden":
            loot = global.undergardenFortunasDrop();
            break;
        case "minecraft:the_end":
            loot = global.endFortunasDrop();
            break;
        case "callfromthedepth_:depth":
            loot = global.deepFortunasDrop();
            break;
        case "theabyss:the_abyss":
            loot = global.abyssFortunasDrop();
            break;
        default:
            loot = global.overworldFortunasDrop();
            break;
    }
    if (!loot) return;
    global.lootlib_summonItem(loot, entity);
})

function isEntityHostile(entity){
    return entity.getAttribute('minecraft:generic.attack_damage')!= null;
}


function isEntityInBannedRewards(entity_id){
    let banned_entity_ids = [
        'minecraft:player',
        'minecraft:armor_stand',
        'dummmmmmy:target_dummy',
        "medievalorigins:summon_skeleton",
        "medievalorigins:summon_wither_skeleton",
        "medievalorigins:summon_zombie"
    ]

    return banned_entity_ids.includes(entity_id)
}

function entityHasBannedTags(entity){
    let banned_entity_tags = [
        'necroskelwall'
    ]

    let entityTags = entity.getTags().toString();
    let banned = false;

    banned_entity_tags.forEach(banned_tag =>{
        if(entityTags.includes(banned_tag)){
            banned = true;
        }
    })

    return banned;
}

function isEntityAllowed(entity){
    return !isEntityInBannedRewards(entity.getType()) && isEntityHostile(entity) && !entityHasBannedTags(entity);
}
