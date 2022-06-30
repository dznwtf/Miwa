// Commands Module
const config = require(`${process.cwd()}/structures/botconfig/config.json`);
const {
  Client,
  Message,
  MessageEmbed
} = require('discord.js');

module.exports = {
  name: '',
  aliases: [],
  usage: '',
  description: '',
  cooldown: 0,
  userPermissions: "",
  botPermissions: "",
  ownerOnly: false,
  toggleOff: false,

  /**
   * @param {Client} client 
   * @param {Message} message
   * @param {String[]} args
   */

  async execute(client, message, args, ee) {
    try {
      // Start Coding
    } catch (err) {
      console.log(err)
    }
  }
}
// Commands Module End

// ---------------------------------------------------

// Slash Commands Module
const config = require(`${process.cwd()}/structures/botconfig/config.json`);
const {
  Client,
  CommandInteraction,
  MessageEmbed
} = require('discord.js');

module.exports = {
  name: '',
  usage: '',
  description: '',
  cooldown: 0,
  userPermissions: "",
  botPermissions: "",
  ownerOnly: false,
  toggleOff: false,

  /**
   * @param {Client} client 
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */

  async execute(client, interaction, args, ee) {
    try {
      // Start Coding
    } catch (err) {
      console.log(err)
    }
  }
}
// Slash Commands Module End

