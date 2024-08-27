function Event() {
    this.isActive = false;
    this.name = "";
    this.description = "";
    this.intervals = [];
    this.hours = [];
    this.dimensions = [];
    this.effects = [];
    this.attributeModifiers = [];
    this.onServerTick = (event) => {};
    this.onPlayerTick = (event) => {};
    this.onPlayerJoin = (event) => {};
    this.onPlayerLeave = (event) => {};
    this.onPlayerDeath = (event) => {};
    this.onPlayerRespawn = (event) => {};
}

Event.prototype = {

    withName: function (name) {
        this.name = name;
        return this;
    },

    withDescription: function (description) {
        this.description = description;
        return this;
    },

    addInterval: function (day, start, end) {
        this.intervals.push({day: day, start: start, end: end});
        return this;
    },

    allWeekdays: function (start, end) {
        this.intervals.push({day: "Monday", start: start, end: end});
        this.intervals.push({day: "Tuesday", start: start, end: end});
        this.intervals.push({day: "Wednesday", start: start, end: end});
        this.intervals.push({day: "Thursday", start: start, end: end});
        this.intervals.push({day: "Friday", start: start, end: end});
        return this;
    },

    allWeekends: function (start, end) {
        this.intervals.push({day: "Saturday", start: start, end: end});
        this.intervals.push({day: "Sunday", start: start, end: end});
        return this;
    },

    allWeek: function (start, end) {
        this.allWeekdays(start, end);
        this.allWeekends(start, end);
        return this;
    },

    inDimension: function (dimension) {
        this.dimensions.push(dimension);
        return this;
    },

    allDimensions: function () {
        this.dimensions.push("all");
        return this;
    },

    withAttributeModifier: function (attribute, operation, amount, uuid) {
        this.attributeModifiers.push({attribute: attribute, operation: operation, amount: amount, uuid: uuid});
        return this;
    },

    withEffect: function (effect, power) {
        this.effects.push({effect: effect, power: power});
        return this;
    },

    withServerTick: function (callback) {
        this.onServerTick = callback;
        return this;
    },

    withPlayerTick: function (callback) {
        this.onPlayerTick = callback;
        return this;
    },

    withPlayerJoin: function (callback) {
        this.onPlayerJoin = callback;
        return this;
    },

    withPlayerLeave: function (callback) {
        this.onPlayerLeave = callback;
        return this;
    },

    withPlayerDeath: function (callback) {
        this.onPlayerDeath = callback;
        return this;
    },

    withPlayerRespawn: function (callback) {
        this.onPlayerRespawn = callback;
        return this
    },

    shouldBeActive: function () {
        const now = new Date();
        for (const interval of this.intervals) {
            if (this.getDayIndex(interval.day) === now.getDay()) {
                const start = new Date(`${now.toLocaleDateString()} ${interval.start}`);
                const end = new Date(`${now.toLocaleDateString()} ${interval.end}`);
                if (now >= start && now <= end) {
                    return true;
                }
            }
        }
        return false;
    },

    getDayIndex: function (day) {
        switch (day) {
            case "Sunday":
                return 0;
            case "Monday":
                return 1;
            case "Tuesday":
                return 2;
            case "Wednesday":
                return 3;
            case "Thursday":
                return 4;
            case "Friday":
                return 5;
            case "Saturday":
                return 6;
        }
    },

    printCalendarEntry: function () {
        //Format a minecraft message string to display the event in chat
        let message = `§a${this.name}§r\n`;
        message += `§b${this.description}§r\n`;
        for (const interval of this.intervals) {
            message += `§e${interval.day}§r §f${interval.start}-${interval.end}§r\n`;
        }
        return message;
    }
}
