const DIFFICULTY_CHANGER_FULL_PREFIX = 'kubejs:difficulty_changer_';

ItemEvents.rightClicked(event => {
    const { player, server, level } = event;
    let player_name = player.name.string;
    let mainHandItemID = player.mainHandItem.item.getId();

    if (mainHandItemID.includes(DIFFICULTY_CHANGER_FULL_PREFIX)) {
        let difficulty = mainHandItemID.replace(DIFFICULTY_CHANGER_FULL_PREFIX, '');

        let playerData = player.nbt.ForgeCaps;
        let playerDifficulty = playerData["origins:origins"].Origins["origins-classes:difficulty"];
        let playerDifficultyPretty = playerDifficulty.split('/')[1];


        if (playerDifficultyPretty == difficulty) {
            player.sendSystemMessage(`§e§lCan't change difficulty!\n§r§bYour difficulty is already §l§4${difficulty} §r!`)
        }
        else {
            level.runCommandSilent(`origin set ${player_name} origins-classes:difficulty origins-classes:difficulty/${difficulty}`);
            player.sendSystemMessage(`§eCongratualtions! Your combat difficulty has been changed to §l§4${difficulty}§r§r! Please check your difficulty by pressing the §l§3<INSERT>§r§r key to show your origins.§r`)

            let remainingCount = player.mainHandItem.count - 1;
            player.mainHandItem.count = remainingCount;
        }
    }
});