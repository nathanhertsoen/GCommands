const { Collector } = require('discord.js');
const Collection = require('discord.js').Collection;
const { Events } = require('discord.js').Constants;

/**
 * Collects buttons on a message.
 * Will automatically stop if the channel (`'channelDelete'`), guild (`'guildDelete'`) or message (`'messageDelete'`) are deleted.
 * @extends {Collector}
 */
class ButtonCollector extends Collector {
  /**
   * @param {Message} message
   * @param {CollectorOptions} options The options to be applied to this collector
   * @emits ButtonCollector#clickButton
   */
  constructor(message, filter, options = {}) {
    super(message.client, filter, options);

    this.message = message;

    /**
     * Users
     * @type {Collection}
     */
    this.users = new Collection();

    /**
     * Total
     * @type {Number}
     */
    this.total = 0;

    this.empty = this.empty.bind(this);
    this._handleChannelDeletion = this._handleChannelDeletion.bind(this);
    this._handleGuildDeletion = this._handleGuildDeletion.bind(this);
    this._handleMessageDeletion = this._handleMessageDeletion.bind(this);


    this.message.client.incrementMaxListeners();
    this.message.client.on('clickButton', this.handleCollect);
    this.message.client.on(Events.MESSAGE_DELETE, this._handleMessageDeletion);
    this.message.client.on(Events.CHANNEL_DELETE, this._handleChannelDeletion);
    this.message.client.on(Events.GUILD_DELETE, this._handleGuildDeletion);

    this.once('end', () => {
      this.message.client.removeListener('clickButton', this.handleCollect);
      this.message.client.removeListener(Events.MESSAGE_DELETE, this._handleMessageDeletion);
      this.message.client.removeListener(Events.CHANNEL_DELETE, this._handleChannelDeletion);
      this.message.client.removeListener(Events.GUILD_DELETE, this._handleGuildDeletion);
      this.message.client.decrementMaxListeners();
    });

    this.on('collect', button => {
      this.total++;
      this.users.set(button.clicker.user.id, button.clicker.user);
    });
  }

  /**
   * Handles a button for possible collection.
   * @param {GInteraction} button
   * @returns {GInteraction}
   * @private
   */
  collect(button) {
    if (this.message.unstable) return ButtonCollector.key(button);
    if (button.message.id !== this.message.id) return null;
    return ButtonCollector.key(button);
  }

  /**
   * @returns {null}
   */
  dispose() {
    return null;
  }

  /**
   * Empties this button collector.
   */
  empty() {
    this.total = 0;
    this.collected.clear();
    this.users.clear();
    this.checkEnd();
  }

  /**
   * The reason this collector has ended with, or null if it hasn't ended yet
   * @type {?string}
   * @readonly
   */
  endReason() {
    if (this.options.max && this.total >= this.options.max) return 'limit';
    if (this.options.maxEmojis && this.collected.size >= this.options.maxEmojis) return 'emojiLimit';
    if (this.options.maxUsers && this.users.size >= this.options.maxUsers) return 'userLimit';
    return null;
  }

  /**
   * Handles checking if the message has been deleted, and if so, stops the collector with the reason 'messageDelete'.
   * @private
   * @param {Guild} message The message that was deleted
   * @returns {void}
   */
  _handleMessageDeletion(message) {
    if (message.id === this.message.id) {
      this.stop('messageDelete');
    }
  }

  /**
   * Handles checking if the channel has been deleted, and if so, stops the collector with the reason 'channelDelete'.
   * @private
   * @param {Guild} channel The channel that was deleted
   * @returns {void}
   */
  _handleChannelDeletion(channel) {
    if (channel.id === this.message.channel.id) {
      this.stop('channelDelete');
    }
  }

  /**
   * Handles checking if the guild has been deleted, and if so, stops the collector with the reason 'guildDelete'.
   * @private
   * @param {Guild} guild The guild that was deleted
   * @returns {void}
   */
  _handleGuildDeletion(guild) {
    if (this.message.guild && guild.id === this.message.guild.id) {
      this.stop('guildDelete');
    }
  }

  /**
   * Gets the collector key for a button.
   * @param {MessageButton} button The button to get the key for
   * @returns {Snowflake|string}
   */
  static key(button) {
    return button.id;
  }
}

module.exports = ButtonCollector;
