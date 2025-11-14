let LIMIT_MAP = {
    'theabyss:frost_world': {
        'theabyss:seeker': 20
    }
}

EntityEvents.spawned(event => {
    const { entity, server } = event;
    let dimension = entity.level.dimension.toString();
    let entityType = entity.getType();
    if (LIMIT_MAP[dimension]) {
        if(LIMIT_MAP[dimension][entityType]){
            let level = entity.level;
            let chunkPosition = entity.chunkPosition();
            let entitiesInChunk = level.getEntitiesInChunk(chunkPosition.x, chunkPosition.z);
            let count = 0;
            entitiesInChunk.forEach(chunkEntity => {
                if(chunkEntity.getType()==entityType){
                    count++;
                }
            })
            if (count>=LIMIT_MAP[dimension][entityType]){
                event.cancel();
            }
        }

    }
});