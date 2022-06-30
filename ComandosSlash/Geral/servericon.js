
const {
  Client,
  CommandInteraction,
  MessageEmbed
} = require("discord.js");

module.exports = {
  name: "servericon",
  usage: '',
  description: "[🏠 Geral] Pegue o Icon do Servidor",
  category: "Geral",
  cooldown: 5,
  userPermissions: "",
  botPermissions: "",
  ownerOnly: false,
  toggleOff: false,
 
    /**
   * @param {Client} client 
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */

     run: async(client, interaction) =>{

    const guild = interaction.guild
    if(!guild.iconURL()) return await interaction.channel.send({embeds: [{description: "O servidor não possui um icon", color: "a5d7ff"}]}).then(() => {
      setTimeout(() => {
          interaction.deleteReply()
      }, 9000)})
        const embed = new MessageEmbed()
     .setTitle(`Avatar do Servidor - ${interaction.guild.name}`)
     .setImage(guild.iconURL({ dynamic: true, size:2048}))
      .setFooter({ text: 'Miwa', iconURL: interaction.client.user.displayAvatarURL() })
  
      await interaction.reply({ embeds: [embed] }).then(() => {
        setTimeout(() => {
            interaction.deleteReply()
        }, 20000)})

    }
}
     