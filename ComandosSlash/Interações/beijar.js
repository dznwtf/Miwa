
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
    name: 'beijar',
    description: '[🎉 Interações] Beije uma pessoa.',
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'usuário',
            description: 'Mencione um usuário para beijar.',
            type: "USER",
            required: true,
        }
    ],
    run: async (client, interaction, args) => {

        let user = interaction.options.getUser('usuário')

        var lista1 = [
            'https://imgur.com/II1bakc.gif',
            'https://imgur.com/MzAjNdv.gif',
            'https://imgur.com/eKcWCgS.gif',
            'https://imgur.com/3aX4Qq2.gif',
            'https://imgur.com/uobBW9K.gif'
        ];

        var lista2 = [
            'https://imgur.com/3jzT5g6.gif',
            'https://imgur.com/VrETTlv.gif',
            'https://imgur.com/FozOXkB.gif',
            'https://imgur.com/7GhTplD.gif',
            'https://imgur.com/B6UKulT.gif'
        ];

        var random1 = lista1[Math.floor(Math.random() * lista1.length)];
        var random2 = lista2[Math.floor(Math.random() * lista2.length)];

        let embed = new MessageEmbed()
            .setDescription(`** ${interaction.user} beijou ${user}.**`)
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
            .setDescription(`**${user} Retribuiu o beijo de ${interaction.user}.**`)
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
