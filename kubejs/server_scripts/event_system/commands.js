//priority: 998
ServerEvents.commandRegistry(event => {
    let {commands: Commands, arguments: Arguments} = event;
    event.register(
        Commands.literal('events')
            .then(Commands.literal('calendar')
                .executes(ctx => {
                        let scheduleTexts = schedule.map(x => x.printCalendarEntry());
                        let finalText = "\n\n§aCalendar:\n====================================§r\n" + scheduleTexts.join('§a====================================§r\n') + "§a====================================§r";
                        ctx.source.player.tell(finalText);
                        return 1;
                    }
                )
            )
            .then(Commands.literal('active')
                .executes(ctx => {
                        let activeTexts = activeEvents.map(x => x.printCalendarEntry());
                        let finalText = "\n\n§aActive Events:\n====================================§r\n" + activeTexts.join('§a====================================§r\n') + "§a====================================§r";
                        ctx.source.player.tell(finalText);
                        return 1;
                    }
                )
            )
            .then(Commands.literal('today')
                .executes(ctx => {
                        let now = new Date();
                        let day = now.getDay();
                        let dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day];
                        let eventsToday = schedule.filter(e => e.intervals.some(i => i.day === dayName));
                        let eventTexts = eventsToday.map(x => x.printCalendarEntry());
                        let finalText = `\n\n§aEvents for today:\n====================================§r\n` + eventTexts.join('§a====================================§r\n') + "§a====================================§r";
                        ctx.source.player.tell(finalText);
                        return 1;
                    }
                )
            )
            .then(Commands.literal('setTimezoneOffset')
                .requires(src => src.hasPermission(2))
                .executes(ctx => {
                        timezoneOffset = Arguments.integer('offset');
                        console.log(`Timezone offset set to ${timezoneOffset}`);
                        ctx.source.player.tell(`Timezone offset set to ${timezoneOffset}`);
                        return 1;
                    })
            )
            .then(Commands.literal('toggleUi')
                .executes(ctx => {
                    let server = ctx.source.server;
                    let player = ctx.source.player;
                    console.log(`Toggling UI for ${player.getName().getString()}`, server);
                    let invisible = server.persistentData.get(`events_ui_invisible_${player.getName().getString()}`);
                    console.log(`Invisible value: ${invisible}`);
                    let invisibleValue = invisible === null ? 0 : invisible === true ? 0 : 1;
                    console.log(`Setting invisible value to ${invisibleValue}`);
                    if (invisibleValue === 1) {
                        server.persistentData.putBoolean(`events_ui_invisible_${player.getName().getString()}`, true);
                    } else {
                        server.persistentData.putBoolean(`events_ui_invisible_${player.getName().getString()}`, false);
                    }
                    drawActiveEvents(server, player);
                    return 1;
                })
            )
    );
});
