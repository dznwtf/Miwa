const Discord = require('discord.js')


module.exports = {
    name: 'blacklistsv',
    description: '[ DEVELOPER ] ',
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'servidor',
            description: 'Escreva o id do servidor',
            type: 'STRING',
            required: true,
        }
    ],
    run: async (client, interaction, args) => {

      let user = interaction.user;
      
      let id = interaction.options.getString('servidor')

    if(interaction.user.id !== '971840597876957264') return interaction.reply(({embeds: [{description:'somente meus criadores podem utilizar esse comando', ephemeral: true, color: "RED"}]}))

client.guilds.cache.get(`${id}`).leave()

interaction.reply({ content: 'Pronto, Fui Removida do Servidor', ephemeral: true})
    }
}