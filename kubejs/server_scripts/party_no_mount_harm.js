let oPartyAPI = Java.loadClass("io.sedu.mc.parties.api.helper.PartyAPI");

EntityEvents.hurt(event => { 
    const { entity, source } = event;
    let playerSource = null;
    let owner = null;
    let ownerName = null;
    let playerUUID = null;

    if (source?.player) {
        playerSource = source.player;
        playerUUID = UUID.fromString(playerSource.uuid);
    }

    if (entity?.owner) {
        owner = entity.owner;
        ownerName = owner.name.string;
    }

    if (playerSource) {
        let passengers = entity.passengers;
        let partyMembers = oPartyAPI.getOnlineMembersWithoutSelf(playerUUID);

        let hasPartyMemberPassenger = false;
        passengers.forEach(passenger => {
            partyMembers.forEach(member => {
                if (passenger.name.string === member.name.string) {
                    hasPartyMemberPassenger = true;
                }
            });
        });

        let isOwnerInParty = false;
        if (ownerName) {
            partyMembers.forEach(member => {
                if (ownerName === member.name.string) {
                    isOwnerInParty = true;
                }
            });
        }

        if (hasPartyMemberPassenger || isOwnerInParty) {
            event.cancel();
        }
    }
});