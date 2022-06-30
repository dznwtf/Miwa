
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
    name: 'bater',
    description: '[🎉 Interações] Dê um tapa em um usuário.',
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'usuário',
            description: 'Mencione um usuário para dar um tapa.',
            type: "USER",
            required: true,
        }
    ],
    run: async (client, interaction, args) => {

        let user = interaction.options.getUser('usuário')

        var lista1 = [
            'https://imgur.com/HYJHoG7.gif',
            'https://imgur.com/9GxTsgl.gif',
            'https://imgur.com/mT4VjD6.gif',
            'https://imgur.com/mT4VjD6.gif',
            'https://imgur.com/w66ZqGR.gif'
        ];

        var lista2 = [
            'https://imgur.com/oSoudVd.gif',
            'https://imgur.com/T9w8eFV.gif',
            'https://imgur.com/nuDmQu5.gif',
            'https://imgur.com/wlLCjRo.gif',
            'https://imgur.com/sVeYncu.gif'
        ];

        var random1 = lista1[Math.floor(Math.random() * lista1.length)];
        var random2 = lista2[Math.floor(Math.random() * lista2.length)];
        let embed = new MessageEmbed()
        .setDescription(`** ${interaction.user} deu um tapa em ${user}.**`)
        .setImage(`${random1}`)
        .setColor('a5d7ff')

    let button = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('1')
                .setLabel('Retribuir')
                .setStyle('PRIMARY')
                .setDisabled(false)

        )

    let embed1 = new MessageEmbed()
        .setDescription(`**${user} Retribuiu o tapa de ${interaction.user}.**`)
        .setColor('a5d7ff')
        .setImage(`${random2}`);

    interaction.reply({ embeds: [embed], components: [button] }).then(() => {

        const filter = i => i.customId === '1' && i.user.id === user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, max: 1 });

        collector.on('collect', async i => {

            if (i.customId === '1') {
                i.reply({ embeds: [embed1] })
            }
        });
    })

}
} 
