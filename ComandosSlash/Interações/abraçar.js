
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
    name: 'abraçar',
    description: '[🎉 Interações] Dê um abraço em um usuário!',
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'membro',
            description: 'Mencione um usuário para abraçar.',
            type: "USER",
            required: true,
        }
    ],
    run: async (client, interaction, args) => {

        let user = interaction.options.getUser('membro')

        let lista1 = [
            'https://imgur.com/RgfGLNk.gif',
            'https://i.imgur.com/r9aU2xv.gif',
            'https://i.imgur.com/wOmoeF8.gif',
            'https://i.imgur.com/nrdYNtL.gif',
            'https://imgur.com/82xVqUg.gif'
        ];

        let lista2 = [
            'https://imgur.com/c3WzMZu.gif',
            'https://imgur.com/BPLqSJC.gif',
            'https://imgur.com/ntqYLGl.gif',
            'https://imgur.com/v47M1S4.gif',
            'https://imgur.com/6qYOUQF.gif'
        ];

        let random1 = lista1[Math.floor(Math.random() * lista1.length)];
        let random2 = lista2[Math.floor(Math.random() * lista2.length)];

        let embed = new MessageEmbed()
            .setDescription(`** ${interaction.user} abraçou ${user}.**`)
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
            .setDescription(`**${user} Retribuiu o abraço de ${interaction.user}.**`)
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
