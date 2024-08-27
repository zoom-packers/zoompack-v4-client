ServerEvents.commandRegistry(event => {
    const {commands: Commands, arguments: Arguments} = event;
    event.register(
        Commands.literal('events')
            .then(Commands.literal('calendar')
                .executes(ctx => {
                        const scheduleTexts = schedule.map(x => x.printCalendarEntry());
                        const finalText = "§aCalendar:\n__________________________§r\n" + scheduleTexts.join('§a__________________________§r\n') + "§a__________________________§r";
                        console.log(finalText);
                        ctx.source.player.tell(finalText);
                        return 1;
                    }
                )
            )
            .then(Commands.literal('active')
                .executes(ctx => {
                        const activeTexts = activeEvents.map(x => x.printCalendarEntry());
                        const finalText = "§aActive Events:\n__________________________§r\n" + activeTexts.join('§a__________________________§r\n') + "§a__________________________§r";
                        console.log(finalText);
                        ctx.source.player.tell(finalText);
                        return 1;
                    }
                )
            )
    );
});
