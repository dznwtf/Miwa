const Discord = require("discord.js");

module.exports = {
    name: "atm",
    description: "[💸 Economia] Veja o seu Saldo",
    type: 'CHAT_INPUT',
    options: [
        {
         name: "usuário",
         description: "Usuário que você deseja ver o saldo.",
         type: 6,
         required: false
        },
        ],
    run: async (client, interaction) => {
        
     const user = interaction.options.getUser("usuário") || interaction.user
     
     const userdb = await client.userdb.findOne({
         userID: user.id
     }) || { economia: { banco: 0, money: 0}}
      
     interaction.reply({embeds: [new Discord.MessageEmbed()
     .setAuthor({ name: `${user.id == interaction.user.id ? `Seu Saldo.` : `Saldo de ${user.username}`}`, iconURL: user.avatarURL() })
     .setColor("a5d7ff")
     .setDescription(` > <:dinheiro:975939369460441108>  **Em Mãos:** R$${userdb.economia.money}\n > <:banco:975939070117171260> **Banco:** R$${userdb.economia.banco}\n > <:carteira:975939299876945930> **Total:** R$${userdb.economia.money + userdb.economia.banco}`)
     
          ]})

    }
};
