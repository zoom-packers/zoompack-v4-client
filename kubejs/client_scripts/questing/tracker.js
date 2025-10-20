const $TrackedAdvancementsManager = Java.loadClass('de.markusbordihn.advancementstracker.client.advancements.TrackedAdvancementsManager');
const $AdvancementsManager = Java.loadClass('de.markusbordihn.advancementstracker.client.advancements.AdvancementsManager');
let TrackedAdvancementsManager = $TrackedAdvancementsManager;
let AdvancementsManager = $AdvancementsManager;

function untrackAdvancement(advancement){
    TrackedAdvancementsManager.untrackAdvancement(advancement);
}

function trackAdvancement(advancement){
    TrackedAdvancementsManager.trackAdvancement(advancement);
}

// ID is strictly namespace:adv_name
function getAdvancementById(id){
    let adv = AdvancementsManager.getAdvancement(id);
    if (adv == null) {
        return null;
    }
    return adv;
}

function trackAdvancementById(id){
    let searchedAdvancement = getAdvancementById(id);
    if(searchedAdvancement){
        trackAdvancement(searchedAdvancement);
        return true;
    }
    return false
}

function untrackAdvancementById(id){
    let searchedAdvancement = getAdvancementById(id);
    if(searchedAdvancement){
        untrackAdvancement(searchedAdvancement.getAdvancement().getId());
        return true;
    }
    return false
}

function isAdvancementTrackedByID(id){
    let advancements = TrackedAdvancementsManager.getTrackedAdvancements();
    for(const advancement of advancements){
        if(advancement.advancement.getId() == id){
            return true;
        }
    }
    return false;
}

NetworkEvents.dataReceived('advancements:track_id', event => {
    const {entity, data, level, player} = event;
    let advToTrackId = data.advancement_id;
    trackAdvancementById(advToTrackId);
});

NetworkEvents.dataReceived('advancements:track_ids', event => {
    const {entity, data, level, player} = event;
    let advToTrackIds = JSON.parse(data.getString('advancement_ids'));
    for(const advToTrackId of advToTrackIds){
        trackAdvancementById(advToTrackId);
    }
    
});

NetworkEvents.dataReceived('advancements:untrack_id', event => {
    const {entity, data, level, player} = event;
    let advToTrackId = data.advancement_id;
    untrackAdvancementById(advToTrackId);
});

NetworkEvents.dataReceived('advancements:untrack_ids', event => {
    const {entity, data, level, player} = event;
    let advToTrackIds = JSON.parse(data.getString('advancement_ids'));
    for(const advToTrackId of advToTrackIds){
        untrackAdvancementById(advToTrackId);
    }
});

NetworkEvents.dataReceived('advancements:track_untrack_ids', event => {
    const {entity, data, level, player} = event;
    let trackingData = JSON.parse(data.getString('trackingData'));
    let toTrack = trackingData.toTrack;
    let toUntrack = trackingData.toUntrack;

    for(const advancementId of toUntrack){
        if(!toTrack.includes(advancementId)){
            untrackAdvancementById(advancementId);
        }
    }

    for(const advancementId of toTrack){
        trackAdvancementById(advancementId);
    }
});