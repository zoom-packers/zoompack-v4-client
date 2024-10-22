function teleportPlayer(server, dimension, player_name, x, y, z){
    server.runCommandSilent(`execute in ${dimension} run tp ${player_name} ${x} ${y} ${z}`);
}

const endPortalBlocks = [
    'minecraft:end_portal'
];

function checkPlayerAvoveEndPortalBlock(player, offset){
    let playerPos = player.blockPosition();
    let blockPos = playerPos.offset(0, offset, 0);
    let level = player.level;
    let block = level.getBlockState(blockPos).block;
    let block_id = block.id;

    return endPortalBlocks.includes(block_id);
}

function isPlayerInPortal(player){
    return checkPlayerAvoveEndPortalBlock(player, 0) || checkPlayerAvoveEndPortalBlock(player, -1);
}

ForgeEvents.onEvent("net.minecraftforge.event.entity.EntityTravelToDimensionEvent", event => {
    const { entity, dimension } = event;
    try {

        let dimensionId = entity.level.dimension.toString();
        let targetDimensionId = dimension.location()

        if (dimensionId === "minecraft:the_end" && targetDimensionId === 'minecraft:overworld') {

            console.log(isPlayerInPortal(entity));
            if(isPlayerInPortal(entity)){
                event.setCanceled(true);

                let player_name = entity.name.string;

                teleportPlayer(entity.level.server, 'minecraft:the_nether', player_name, 0, 256, 0);

                let teleportDimension = 'minecraft:overworld';
                let targetCoordsX = 0;
                let targetCoordsY = 0;
                let targetCoordsZ = 0;

                if (entity.respawnPosition) {
                    let respawnPosition = entity.respawnPosition;
                    let entityNbt = entity.nbt;
                    

                    if (entityNbt) {
                        teleportDimension = entityNbt.SpawnDimension;
                    }

                    targetCoordsX = respawnPosition.x
                    targetCoordsY = respawnPosition.y
                    targetCoordsZ = respawnPosition.z

                } else {
                    let sharedSpawnPos = dimension.getSharedSpawnPos();

                    targetCoordsX = sharedSpawnPos.x
                    targetCoordsY = sharedSpawnPos.y
                    targetCoordsZ = sharedSpawnPos.z
                }

                teleportPlayer(entity.level.server, teleportDimension, player_name, targetCoordsX, targetCoordsY, targetCoordsZ);
            }
        }

    } catch (error) {
        console.log(error.toString());
    }
});

