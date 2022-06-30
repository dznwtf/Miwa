
const {
  Client,
  CommandInteraction,
  MessageEmbed
} = require("discord.js");

module.exports = {
  name: "serverbanner",
  usage: '',
  description: "[🏠 Geral] Pegue o Banner do Servidor",
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
    if(!guild.bannerURL()) return await interaction.channel.send({embeds: [{description: "O servidor não possui um banner", color: "a5d7ff"}]}).then(() => {
      setTimeout(() => {
          interaction.deleteReply()
      }, 9000)})
        const embed = new MessageEmbed()
     .setTitle(`Banner do Servidor - ${interaction.guild.name}`)
     .setImage(guild.bannerURL({ dynamic: true, size:2048}))
     .setFooter({ text: 'Miwa', iconURL: interaction.client.user.displayAvatarURL() })
  
      await interaction.reply({ embeds: [embed] }).then(() => {
        setTimeout(() => {
            interaction.deleteReply()
        }, 20000)})

    }
}
     