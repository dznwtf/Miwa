
const {
  Client,
  CommandInteraction,
  MessageEmbed
} = require("discord.js");

module.exports = {
  name: "ping",
  usage: '',
  description: "[🔎 Utilidades] Veja a Latência da Miwa",
  category: "Utilidades",


  /**
   * @param {Client} client 
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */

   run: async(client, interaction) =>{
    try {
      interaction.reply({
        embeds: [new MessageEmbed()
          .setColor('a5d7ff')
          .setDescription(`🤖 **Ping do Bot:** \`${Date.now() - interaction.createdTimestamp}ms\`\n\n⌛ **Latência da API:** \`${Math.round(client.ws.ping)}ms\``, true)
        ]
      }).then(() => {
        setTimeout(() => {
            interaction.deleteReply()
        }, 25000)})
    } catch (err) {
      console.log(err)
    }
  }
}

/**
 * @INFO
 * Bot Coded by Zedro#2742 | https://discord.gg/milanio
 * @INFO
 * Work for Milanio Development | https://discord.gg/milanio
 * @INFO
 * Please Mention Us Milanio Development, When Using This Code!
 * @INFO
 */