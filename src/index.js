'use strict';

module.exports = {
    // Root classes
    GCommandsBase: require("./base/GCommandsBase"),
    GCommands: require("./base/GCommands.js"),
    GEventLoader: require("./managers/GEventLoader"),
    GCommandsDispatcher: require("./base/GCommandsDispatcher"),

    // Loaders
    GEventHandling: require("./managers/GEventHandling"),
    GCommandLoader: require("./managers/GCommandLoader"),
    GDatabaseLoader: require("./managers/GDatabaseLoader"),

    // Structures
    GCommandsMessage: require("./structures/GMessage"),
    GNewsChannel: require("./structures/NewsChannel"),
    GTextChannel: require("./structures/TextChannel"),
    GDMChannel: require("./structures/DMChannel"),
    MessageButton: require("./structures/MessageButton"),
    MessageActionRow: require("./structures/MessageActionRow"),
    MessageSelectMenu: require("./structures/MessageSelectMenu"),
    MessageSelectMenuOption: require("./structures/MessageSelectMenuOption"),
    Command: require("./structures/Command"),
    Event: require("./structures/Event"),
    GPayload: require("./structures/GPayload"),
    ButtonCollectorV12: require("./structures/v13/ButtonCollector"),
    ButtonCollectorV13: require("./structures/v12/ButtonCollector"),
    SelectMenuCollectorV12: require("./structures/v13/SelectMenuCollector"),
    SelectMenuCollectorV13: require("./structures/v12/SelectMenuCollector"),

    // Other
    Color: require("./structures/Color"),
    Util: require("./util/util"),
    SlashCommand: {
        SUB_COMMAND: 1,
        SUB_COMMAND_GROUP: 2,
        STRING: 3,
        INTEGER: 4,
        BOOLEAN: 5,
        USER: 6,
        CHANNEL: 7,
        ROLE: 8,
        MENTIONABLE: 9
    },
    ButtonTypes: {
        blurple: "blurple",
        gray: "gray",
        grey: "gray",
        green: "green",
        red: "red",
        url: "url"
    },

    version: require("../package.json").version
}