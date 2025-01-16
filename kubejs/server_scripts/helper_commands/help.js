function ftb_book_command(book_id){
    return `ftbquests open_book ${book_id}`;
}

let COMMANDS_CUSTOM_MAP = {
    'DailyRewards' : 'DailyRewards claim',
    'dailyrewards' : 'DailyRewards claim',
    'daily_rewards' : 'DailyRewards claim',
    'daily' : 'DailyRewards claim',
    'help' : ftb_book_command('526A8BDBC17120FA'),
    'gems' : ftb_book_command('2194CCE71EC3873A'),
    'mounts' : ftb_book_command('11C225FDA56117C0'),
    'enchanting' : ftb_book_command('176CB0E9A7D2E553'),
    'levels' : ftb_book_command('659C3D1B12F38293'),
    'leveling' : ftb_book_command('659C3D1B12F38293'),
    'events': ftb_book_command('0436F4A75269D46E'),
    'economy': ftb_book_command('06E7A591A771D66B'),
    'trims': ftb_book_command('68225318CD594DA4'),
    'powerups': ftb_book_command('68225318CD594DA4'),
    'talents': ftb_book_command('0A307DF8271A9780'),
    'dimensions': ftb_book_command('625C95F55A1B894E'),
    'magic': ftb_book_command('4DC536C0184DFD68'),
    'weapons': ftb_book_command('02EBA84B4ABC57D0'),
    'origins': ftb_book_command('59D44C51887D8237'),
    'cooking': ftb_book_command('364A2B07F68C2EA0'),
    'enchants': ftb_book_command('0342720BBBACC053'),
    'rules': ftb_book_command('0290D572AA16B1C4'),
    'skin': ftb_book_command('34DD9E65C1995FA2'),
    'skins': ftb_book_command('34DD9E65C1995FA2'),
    'voice': ftb_book_command('69676D40420966BA'),
    'parties' : ftb_book_command('1CBC2D540815A7B1'),
    'engineering' : ftb_book_command('1AA0F65AD529C944')
}

ServerEvents.commandRegistry(event => {
    let {commands: Commands, arguments: Arguments} = event;
    Object.entries(COMMANDS_CUSTOM_MAP).forEach(([commandName, command]) => {
        event.register(
            Commands.literal(commandName)
                .executes(ctx => {
                    ctx.source.server.runCommandSilent(`execute as ${ctx.source.player.name.string} run ${command}`);
                    return 1;
                })
        );        
    });

    event.register(
        Commands.literal('discord')
            .executes(ctx => {
                ctx.source.server.runCommandSilent(`/tellraw ${ctx.source.player.name.string} {"text":"Click here to join our discord: ","extra":[{"text":"https://zoomers.tech/discord","color":"aqua","underlined":true,"clickEvent":{"action":"open_url","value":"https://zoomers.tech/discord"}}]}`);
                return 1;
            })
    );
});
