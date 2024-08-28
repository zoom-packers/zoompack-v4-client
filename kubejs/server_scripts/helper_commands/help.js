const COMMANDS_FTBQ_BOOKS_MAP = {
    'help' : '39A979E3A6CE5B99',
    'gems' : '37AB552495798316',
    'mounts' : '1F7911B301774426',
    'enchanting' : '0FDCC38C52EC2B0A',
    'levels' : '301C03DAB5AE0E67',
    'leveling' : '301C03DAB5AE0E67',
    'events': '2D72E4DD3F561D0B'
}

ServerEvents.commandRegistry(event => {
    const {commands: Commands, arguments: Arguments} = event;
    Object.entries(COMMANDS_FTBQ_BOOKS_MAP).forEach(([commandName, bookId]) => {
        event.register(
            Commands.literal(commandName)
                .executes(ctx => {
                    const playerName = ctx.source.player.name.string;
                    const command = `ftbquests open_book ${bookId}`;
                    ctx.source.server.runCommandSilent(`execute as ${playerName} run ${command}`);
                    return 1;
                })
        );
    });
});
