const Discord = require("discord.js");

module.exports = {
    name: "xcam",
    description: "[💸 Economia] Faça xcam por dinheiro",
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
      
    if(Date.now() < userdb.cooldowns.xcam){
      const calc = userdb.cooldowns.xcam - Date.now()
      
         return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`<a:red_exclamacao:871399565637591061> | Espera ai ...`)
    .setColor("a5d7ff")
    .setDescription(`Ainda falta ${ms(calc).hours}h ${ms(calc).minutes}m ${ms(calc).seconds}s para você fazer outro xcam 😏`)
], ephemeral: true})
     }  

    const dinheiro = ~~(Math.random() * 1000) + 1000

     await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "economia.money": userdb.economia.money + dinheiro,
         "cooldowns.xcam": Date.now() + 36e5
     }
     })
     
    interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`<:fire:977021502442598481> | Xcam Feito ! `)
    .setColor("a5d7ff")
    .setDescription(`**Parabéns!**, você fez um bom Xcam e recebeu \`R$${dinheiro}\` `)
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