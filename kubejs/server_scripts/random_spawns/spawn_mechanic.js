const DIM_TARGETS = {
    'callfromthedepth_:depth': {
        overwrites:{
            'callfromthedepth_:riper' : ['callfromthedepth_:marbleextruder'],
            'callfromthedepth_:rotwalker' : ['callfromthedepth_:marbleextruder'],
            'callfromthedepth_:roteater' : ['callfromthedepth_:marbleextruder'],
            'callfromthedepth_:seeker' : ['callfromthedepth_:marbleextruder']
        },
        chance: 0.08
    }
}

function rollDicesForSpawn() {
    return Math.round(Math.random() * 100) / 100;
}

function randomFromList(list) {
    if (!list || list.length === 0) return null;
    const index = Math.floor(Math.random() * list.length);
    return list[index];
}

EntityEvents.spawned(event=>{
    const {entity,server} = event;
    let dimension = entity.level.dimension.toString();
    if(DIM_TARGETS[dimension]){
        if(DIM_TARGETS[dimension].chance>=rollDicesForSpawn()){
            let entityType = entity.getType();
            if(DIM_TARGETS[dimension].overwrites[entityType]){
                let whatToSpawnExtra = randomFromList(DIM_TARGETS[dimension].overwrites[entityType]);
                server.runCommandSilent(`execute in ${dimension} run summon ${whatToSpawnExtra} ${entity.x} ${entity.y} ${entity.z}`);
            }
        }
    }
});