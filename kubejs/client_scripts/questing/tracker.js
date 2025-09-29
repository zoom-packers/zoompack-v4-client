const $TrackedAdvancementsManager = Java.loadClass('de.markusbordihn.advancementstracker.client.advancements.TrackedAdvancementsManager');
const $AdvancementsManager = Java.loadClass('de.markusbordihn.advancementstracker.client.advancements.AdvancementsManager');
let TrackedAdvancementsManager = $TrackedAdvancementsManager;
let AdvancementsManager = $AdvancementsManager;
// https://nekoyue.github.io/ForgeJavaDocs-NG/javadoc/1.20.6-neoforge/net/minecraft/advancements/Advancement.html

// [28Sep2025 15:08:03.337] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: getAdvancement
// [28Sep2025 15:08:03.337] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: getClass
// [28Sep2025 15:08:03.337] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: updateAdvancementProgress
// [28Sep2025 15:08:03.337] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: thenComparingDouble
// [28Sep2025 15:08:03.337] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: idString
// [28Sep2025 15:08:03.337] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: getProgress
// [28Sep2025 15:08:03.337] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: descriptionString
// [28Sep2025 15:08:03.337] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: getTitle
// [28Sep2025 15:08:03.337] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: hasRewards
// [28Sep2025 15:08:03.337] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: titleWidth
// [28Sep2025 15:08:03.337] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: id
// [28Sep2025 15:08:03.337] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: getDescriptionString
// [28Sep2025 15:08:03.337] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: advancement
// [28Sep2025 15:08:03.337] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: background
// [28Sep2025 15:08:03.337] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: hasRecipesReward
// [28Sep2025 15:08:03.337] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: getDescriptionColor
// [28Sep2025 15:08:03.337] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: compare
// [28Sep2025 15:08:03.337] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: wait
// [28Sep2025 15:08:03.337] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: thenComparingInt
// [28Sep2025 15:08:03.338] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: sortName
// [28Sep2025 15:08:03.338] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: rewardsExperience
// [28Sep2025 15:08:03.338] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: notifyAll
// [28Sep2025 15:08:03.338] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: icon
// [28Sep2025 15:08:03.338] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: description
// [28Sep2025 15:08:03.338] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: getId
// [28Sep2025 15:08:03.338] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: tracked
// [28Sep2025 15:08:03.338] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: getRewardsRecipes
// [28Sep2025 15:08:03.338] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: title
// [28Sep2025 15:08:03.338] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: getDescription
// [28Sep2025 15:08:03.338] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: notify
// [28Sep2025 15:08:03.338] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: getTitleWidth
// [28Sep2025 15:08:03.338] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: thenComparing
// [28Sep2025 15:08:03.338] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: titleColor
// [28Sep2025 15:08:03.338] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: hashCode
// [28Sep2025 15:08:03.338] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: hasLootReward
// [28Sep2025 15:08:03.338] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: titleString
// [28Sep2025 15:08:03.338] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: getRewardsLoot
// [28Sep2025 15:08:03.338] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: getSortName
// [28Sep2025 15:08:03.338] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: getIdString
// [28Sep2025 15:08:03.338] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: class
// [28Sep2025 15:08:03.338] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: getTitleColor
// [28Sep2025 15:08:03.338] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: rewardsRecipes
// [28Sep2025 15:08:03.338] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: getRewardsExperience
// [28Sep2025 15:08:03.338] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: hasExperienceReward
// [28Sep2025 15:08:03.338] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: descriptionColor
// [28Sep2025 15:08:03.338] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: getIcon
// [28Sep2025 15:08:03.338] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: isTracked
// [28Sep2025 15:08:03.338] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: thenComparingLong
// [28Sep2025 15:08:03.338] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: getTitleString
// [28Sep2025 15:08:03.338] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: equals
// [28Sep2025 15:08:03.338] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: progress
// [28Sep2025 15:08:03.338] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: toString
// [28Sep2025 15:08:03.338] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: rewardsLoot
// [28Sep2025 15:08:03.338] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: getBackground
// [28Sep2025 15:08:03.338] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: hasRewardsData
// [28Sep2025 15:08:03.338] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#18: reversed


// advancement.advancement
// [28Sep2025 15:09:51.694] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#75: getClass
// [28Sep2025 15:09:51.694] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#75: parent
// [28Sep2025 15:09:51.694] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#75: wait
// [28Sep2025 15:09:51.694] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#75: chatComponent
// [28Sep2025 15:09:51.694] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#75: criteria
// [28Sep2025 15:09:51.694] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#75: getMaxCriteraRequired
// [28Sep2025 15:09:51.694] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#75: notifyAll
// [28Sep2025 15:09:51.694] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#75: getRewards
// [28Sep2025 15:09:51.694] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#75: getId
// [28Sep2025 15:09:51.694] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#75: notify
// [28Sep2025 15:09:51.694] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#75: children
// [28Sep2025 15:09:51.694] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#75: hashCode
// [28Sep2025 15:09:51.694] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#75: root
// [28Sep2025 15:09:51.694] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#75: id
// [28Sep2025 15:09:51.694] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#75: getRoot
// [28Sep2025 15:09:51.694] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#75: deconstruct
// [28Sep2025 15:09:51.694] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#75: class
// [28Sep2025 15:09:51.694] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#75: getCriteria
// [28Sep2025 15:09:51.694] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#75: getParent
// [28Sep2025 15:09:51.694] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#75: requirements
// [28Sep2025 15:09:51.694] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#75: getRequirements
// [28Sep2025 15:09:51.694] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#75: maxCriteraRequired
// [28Sep2025 15:09:51.694] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#75: display
// [28Sep2025 15:09:51.694] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#75: getChatComponent
// [28Sep2025 15:09:51.694] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#75: getChildren
// [28Sep2025 15:09:51.694] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#75: equals
// [28Sep2025 15:09:51.694] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#75: toString
// [28Sep2025 15:09:51.694] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#75: sendsTelemetryEvent
// [28Sep2025 15:09:51.694] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#75: addChild
// [28Sep2025 15:09:51.694] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#75: getDisplay
// [28Sep2025 15:09:51.694] [Render thread/INFO] [KubeJS Client/]: questing/tracker.js#75: rewards

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
        // console.log("No advancement found for id: " + id);
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