function ftb_book_command(book_id){
    return `ftbquests open_book ${book_id}`;
}

let COMMANDS_CUSTOM_MAP = {
    'DailyRewards' : 'DailyRewards claim',
    'dailyrewards' : 'DailyRewards claim',
    'daily_rewards' : 'DailyRewards claim',
    'daily' : 'DailyRewards claim',
    'help' : ftb_book_command('39A979E3A6CE5B99'),
    'gems' : ftb_book_command('37AB552495798316'),
    'mounts' : ftb_book_command('1F7911B301774426'),
    'enchanting' : ftb_book_command('0FDCC38C52EC2B0A'),
    'levels' : ftb_book_command('301C03DAB5AE0E67'),
    'leveling' : ftb_book_command('301C03DAB5AE0E67'),
    'events': ftb_book_command('2D72E4DD3F561D0B'),
    'economy': ftb_book_command('547C6F5B2EC94450'),
    'trims': ftb_book_command('089EF30AFF6A1D46'),
    'powerups': ftb_book_command('089EF30AFF6A1D46'),
    'talents': ftb_book_command('70CF500D7065E04A'),
    'dimensions': ftb_book_command('5C849DD6772F7444')
}

ServerEvents.commandRegistry(event => {
    const {commands: Commands, arguments: Arguments} = event;
    Object.entries(COMMANDS_CUSTOM_MAP).forEach(([commandName, command]) => {
        event.register(
            Commands.literal(commandName)
                .executes(ctx => {
                    ctx.source.server.runCommandSilent(`execute as ${ctx.source.player.name.string} run ${command}`);
                    return 1;
                })
        );
    });
});
