export class Debug {
    private static TIMED_ACTIONS: {action: string, time: number}[] = [];

    static logAction(action: string, ...args: any[]): void {
        console.log(`Action: ${action}`, ...args);
    }

    static timeAction(action: string, millis: number): void {
        this.TIMED_ACTIONS.push({action, time: millis});
        console.log(`Action: ${action} took ${millis}ms`);
    }

    static printActionStatistics(): void {
        const sums: {[key: string]: number} = {};

        this.TIMED_ACTIONS.forEach(({action, time}) => {
            if (!sums[action]) {
                sums[action] = 0;
            }
            sums[action] += time;
        });

        const orderedActions = Object.keys(sums).sort((a, b) => sums[a] - sums[b]);

        console.log("Action Statistics:");
        for (const action of orderedActions) {
            console.log(`  ${action}: ${sums[action]}ms`);
        }
    }
}
