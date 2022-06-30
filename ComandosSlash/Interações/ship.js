
const {
    Client,
    Message,
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
    MessageButton
  } = require('discord.js');
  const {CommandInteraction} = require('discord.js');
const { Discord } = require('discord.js')
module.exports = {
    name: 'ship',
    description: '[🎉 Interações] Calcule quanto você ama alguém !',
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'membro',
            description: 'Mencione um usuário para ver a porcentagem.',
            type: "USER",
            required: true,
        }
    ],
    run: async (client, interaction, args) => {

      const person = interaction.options.getUser('membro')

      const embed1 = new MessageEmbed()
        .setDescription("Por Favor, mencione alguém")
        .setColor("a5d7ff");

      if(!person) return interaction.reply({ embeds: [embed1] });
        
      const embed2 = new MessageEmbed()
        .setDescription("Você não pode shippar com você mesmo.")
        .setColor("a5d7ff");

      if(person === interaction.author) return interaction.reply({ embeds: [embed2] });

      const random = Math.floor((Math.random() * 99) + 1);

      const embed = new MessageEmbed()
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
        .setTitle(`<:cupid:976548687981457540>  | Porcentagem do Amor`)
        .setDescription(`${interaction.user} x ${person}\n**Total de Amor:** \`${random}%\``)
        .setThumbnail("https://i.pinimg.com/originals/3a/bc/ab/3abcabba6a71bebf01be484b55d6b5d4.gif")
        .setTimestamp()
        .setColor("a5d7ff");

      interaction.reply({ embeds: [embed] })

          
    },
};