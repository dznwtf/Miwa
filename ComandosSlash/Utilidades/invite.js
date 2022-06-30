const Discord = require('discord.js')
const {
    Client,
    Message,
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
    MessageButton
  } = require('discord.js');
  const {CommandInteraction} = require('discord.js');
  
  module.exports = {
    name: "invite",
    usage: '',
    description: "[🔎 Utilidades] Convide a Miwa Para o Seu Servidor",
    category: "Utilidades",
    cooldown: 5,
    userPermissions: "",
    botPermissions: "",
    ownerOnly: false,
    toggleOff: false,
  
    run: async(client, interaction) =>{

    const yt = new MessageEmbed()
    .setColor('a5d7ff')
    .setAuthor({ name: 'Convide a Miwa Para o Seu Servidor', iconURL: interaction.member.user.displayAvatarURL() })
      .setDescription('Oiee, eu me chamo Miwa, espero que goste de mim !')
      .setFooter({text:'Miwa', iconURL: interaction.client.user.displayAvatarURL() })
      .setTimestamp()

    const buttons = new MessageActionRow().addComponents(
      new MessageButton()

        .setStyle('LINK') // Não muda isso
        .setEmoji('976152669423042580') // Coloque algum emoji
        .setLabel('Me Adicione') //Coloque um nome para o botão
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=applications.commands%20bot`) // Coloca algum link
    )

    await  interaction.channel.send({ embeds: [yt], components: [buttons] })
  }
}
