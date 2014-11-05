function Bot(name, color, prefix, italics) {
    this.name = name;
    this.color = color || "red";
    this.italics = italics || false;
    this.prefix = prefix || (this.italics ? "+" : "±");
}

var botproto = Bot.prototype;

botproto.markup = function (message) {
    if (nightclub) {
        message = "<font color=white>" + message + "</font>";
    }

    return "<font color='" + this.color + "'><timestamp/>" + this.prefix + "<b>" + (this.italics ? "<i>" : "") + this.name + ":" + (this.italics ? "</i>" : "") + "</b></font> " + message;
};

botproto.sendAll = function (message, channel) {
    if (message === "") {
        sys.sendAll("", channel);
        return;
    }

    var markup = this.markup(message);
    if (channel === undefined) {
        sys.sendHtmlAll(markup);
    } else {
        sys.sendHtmlAll(markup, channel);
    }
};

botproto.sendAllSemuted = function (message, channel) {
    if (message === "") {
        Utils.sendHtmlSemuted("", channel);
        return;
    }

    var markup = this.markup(message);
    if (channel === undefined) {
        Utils.sendHtmlSemuted(markup);
    } else {
        Utils.sendHtmlSemuted(markup, channel);
    }
};

botproto.sendMainAll = function (message, channel) {
    this.sendAll(message, channel);

    if (channel !== 0) {
        this.sendAll(message, 0);
    }
};

botproto.sendMainAllSemuted = function (message, channel) {
    this.sendAllSemuted(message, channel);

    if (channel !== 0) {
        this.sendAllSemuted(message, 0);
    }
};

botproto.sendMessage = function (player, message, channel) {
    if (message === "") {
        sys.sendMessage(player, "", channel);
        return;
    }

    var markup = this.markup(message);
    if (channel === undefined || !sys.isInChannel(player, channel)) {
        sys.sendHtmlMessage(player, markup);
    } else {
        sys.sendHtmlMessage(player, markup, channel);
    }
};

botproto.sendMainMessage = function (player, message, channel) {
    if (sys.isInChannel(player, channel)) {
        this.sendMessage(player, message, channel);
    }

    if (channel !== 0 && sys.isInChannel(player, 0)) {
        this.sendMessage(player, message, 0);
    }
};

botproto.line = function (src, channel) {
    if (channel !== undefined) {
        sys.sendMessage(src, "", channel);
    } else {
        sys.sendMessage(src, "");
    }
};

botproto.lineAll = function (channel) {
    if (channel !== undefined) {
        sys.sendAll("", channel);
    } else {
        sys.sendAll("");
    }
};

Bot.border = "<font color=navy size=4><b>»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»</b></font>";

global.Bot = Bot;
module.exports = Bot;
module.reload = function () {
    // These are all meant to be globals.
    bot      = new Bot("Bot", "#0a4aff");
    watchbot = new Bot("Watch", "#00aa7f");

    // Then there are also lesser used bots, as static properties on Bot
    Bot.kick = new Bot("Kick", "#d6000f");
    Bot.mute = new Bot("Mute", "#5b1eff");
    Bot.unmute = new Bot("Unmute", "#089107");
    Bot.reason = new Bot("Reason", "#000ff4");

    Bot.flood = new Bot("FloodBot", "#39ab5a");
    Bot.caps = new Bot("CAPSBot", "#31945e");

    Bot.topic = new Bot("Channel Topic", "#cc0000");
    Bot.setby = new Bot("Set By", "#ffaf1e");

    Bot.guard = new Bot("Guard", "#a80000");

    Bot.rtd = new Bot("RTD", "#1c4eaa");
    Bot.hlr = new Bot("Highlander", "#4f2a2a");
    return true;
};
