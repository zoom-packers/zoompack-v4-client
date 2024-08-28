
function AnnouncementSchedule() {
    this.announcements = [];
}

AnnouncementSchedule.prototype = {
    addAnnouncement: function (announcement) {
        this.announcements.push(announcement);
        return this;
    },

    addAnnouncements: function (announcements) {
        this.announcements = this.announcements.concat(announcements);
        return this;
    }
}

function Announcement() {
    this.expectedTickToAnnounce = 0;
    this.eventTick = 0;
    this.hasDing = false;
    this.dingSound = "minecraft:block.note_block.pling"
    this.text = "";
}

Announcement.prototype = {
    withText: function (text) {
        this.text = text;
        return this;
    },

    withDing: function () {
        this.hasDing = true
        return this;
    },

    withCustomSound: function (sound) {
        this.dingSound = sound;
        return this;
    },

    announce: function (server) {
        server.runCommandSilent(`/tellraw @a "${text}`);
        if (this.hasDing) {
            server.runCommandSilent(`/execute at @a run playsound ${this.dingSound} hostile @p`);
        }
    }
}
