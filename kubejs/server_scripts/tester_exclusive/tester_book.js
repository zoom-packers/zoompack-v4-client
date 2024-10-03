let TESTER1_BOOK_ID = '3378D44684A87AD6';

let BOOK_PLAYERS = ['GeniusM', 'MihaiAleXD'];
// 24/09/2024 TBA

function ftb_book_command(book_id) {
    return `ftbquests open_book ${book_id}`;
}

ServerEvents.commandRegistry(event => {
    let { commands: Commands, arguments: Arguments } = event;
    event.register(
        Commands.literal('tester')
            .executes(ctx => {
                if(BOOK_PLAYERS.includes(ctx.source.player.name.string)){
                    let command_to_run = ftb_book_command(TESTER1_BOOK_ID);
                    ctx.source.server.runCommandSilent(`execute as ${ctx.source.player.name.string} run ${command_to_run}`);
                }
                return 1;
            })
    );
});

// TODO: move to server the whole folder, this is excusive to server
