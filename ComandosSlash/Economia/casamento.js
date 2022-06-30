const Discord = require("discord.js");
const moment = require("moment")
moment.locale('pt-BR')

module.exports = {
    name: "casamento",
    description: "[💸 Economia] Veja as informações sobre seu casamento",
    type: 'CHAT_INPUT',
    options: [
        {
         name: "user",
         description: "O Usuário que você deseja ver o status de casamento.",
         type: 6,
         required: false
        },
        ],
    run: async (client, interaction) => {
        
     const user = interaction.options.getUser("user") || interaction.user
      
     const userdb = await client.userdb.findOne({
         userID: user.id
     })

    if(!userdb || !userdb.economia.marry.casado) return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`<a:red_exclamacao:974042663336685618> | Espere um Pouco...`)
    .setColor("a5d7ff")
    .setDescription(`${user} não está casado ainda.`)
], ephemeral: true})
      
      const casado = await client.users.fetch(userdb.economia.marry.com)

      const calc = Date.now() - userdb.economia.marry.des
      
      interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`<:info:976931036334268427> | Informações sobre o casamento de ${user.tag}`)
    .setColor("a5d7ff")
    .setDescription(` <:ring3:977020144108830730> | Casado(a) com: ${casado.tag}

    <:date:976148256486723604> | Casado(a) desde: \`${moment(Number(userdb.economia.marry.des)).format('LL')}\` há \`${ms(calc).days}d ${ms(calc).hours}h ${ms(calc).minutes}m ${ms(calc).seconds}s\`
`)
]}).then(() => {
    setTimeout(() => {
        interaction.deleteReply()
    }, 20000)})
    }
};

function ms(ms) {
  const seconds = ~~(ms/1000)
  const minutes = ~~(seconds/60)
  const hours = ~~(minutes/60)
  const days = ~~(hours/24)

  return { days, hours: hours%24, minutes: minutes%60, seconds: seconds%60 }
}