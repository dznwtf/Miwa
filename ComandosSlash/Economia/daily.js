const Discord = require("discord.js");

module.exports = {
    name: "daily",
    description: "[💸 Economia] Pegue o seu daily",
    type: 'CHAT_INPUT',
    run: async (client, interaction) => {
     
     let userdb = await client.userdb.findOne({
         userID: interaction.user.id
     })
      
     if(!userdb){
         const newuser = new client.userdb({ userID: interaction.user.id })
         await newuser.save();
         
         userdb = await client.userdb.findOne({ userID: interaction.user.id })
     }
      
    if(Date.now() < userdb.cooldowns.daily){
      const calc = userdb.cooldowns.daily - Date.now()
      
         return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`<a:red_exclamacao:974042663336685618> | Calma ae Parceiro(a)...`)
    .setColor("a5d7ff")
    .setDescription(`Ainda falta ${ms(calc).hours}h ${ms(calc).minutes}m ${ms(calc).seconds}s para você pegar o daily novamente.`)
], ephemeral: true})
     }  
      
      const dinheiro = Math.floor(Math.random() * 5000) + 5000

     await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "economia.money": userdb.economia.money + dinheiro,
         "cooldowns.daily": Date.now() + 86400000
     }
     })
     
    interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`<:daily:975944791957319681> | Daily Diário! `)
    .setColor("a5d7ff")
    .setDescription(`${interaction.user}, você pegou seu daily diário e ganhou \`R$${dinheiro}\``)
]})
    }
};

function ms(ms) {
  const seconds = ~~(ms/1000)
  const minutes = ~~(seconds/60)
  const hours = ~~(minutes/60)
  const days = ~~(hours/24)

  return { days, hours: hours%24, minutes: minutes%60, seconds: seconds%60 }
}