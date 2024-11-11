//priority: 995
EntityEvents.death(event => {
    let entity = event.entity;
        if (entity.getTags().toString().includes('necroskelwall')) {
            event.entity.skipDropExperience();
        }
})