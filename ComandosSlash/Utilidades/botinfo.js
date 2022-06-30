
const { Client, CommandInteraction, MessageEmbed, Message } = require('discord.js');
const { addAbortSignal } = require('snekfetch');
var { MessageButton, MessageActionRow } = require(`discord.js`);

module.exports = {
  name: "botinfo",
  usage: '',
  description: "[🔎 Utilidades] Veja as informações sobre o Bot",
  category: "Utilidades",

  run: async(client, interaction) =>{

    let totalSeconds = (interaction.client.uptime / 1000)
    const days = Math.floor(totalSeconds / 86400)
    totalSeconds %= 86400
    const hours = Math.floor(totalSeconds / 3600)
    totalSeconds %= 3600
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = Math.floor(totalSeconds % 60)
    const uptime = `${days} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos.`

    const embed = new MessageEmbed()
       .setColor('a5d7ff')
      .setTitle(`<:robot:976152042949181490>  | Informações Sobre Mim`)
      .setThumbnail(interaction.client.user.displayAvatarURL())
      .addField('<:tools:976152669423042580> Servidores', interaction.client.guilds.cache.size.toString(), true)
      .addField('<:relogio:975956891538698310> Uptime', uptime, true)
      .addField('<:coroa:976145410169122866> Criadores', `dzn#0001 e ax#0005`)
      .addField('<:ram:976152776079994980> Memória RAM', `Memória Usada: ${Math.floor(process.memoryUsage().heapUsed / 1024 / 1024 * 100)}MB | Maior Memória Atingida: ${Math.floor(process.memoryUsage().heapTotal / 1024 / 1024 * 100)}MB`)
      .setFooter({ text: 'Miwa', iconURL: interaction.client.user.displayAvatarURL() })

    await interaction.reply({ embeds: [embed] }).then(() => {
      setTimeout(() => {
          interaction.deleteReply()
      }, 25000)})
  }
}