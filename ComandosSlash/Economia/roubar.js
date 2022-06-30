const Discord = require("discord.js");

module.exports = {
    name: "roubar",
    description: "[💸 Economia Roube alguém",
    type: 'CHAT_INPUT',
    options: [
        {
         name: "user",
         description: "usuário que você quer roubar.",
         type: 6,
         required: true
        },
        ],
    run: async (client, interaction) => {
        
     const user = interaction.options.getUser("user")
     
     let userdb = await client.userdb.findOne({
         userID: interaction.user.id
     })
          
     if(!userdb){
         const newuser = new client.userdb({ userID: interaction.user.id })
         await newuser.save();
         
         userdb = await client.userdb.findOne({ userID: interaction.user.id })
     }
     
    let userdb2 = await client.userdb.findOne({
         userID: user.id
     })

if(Date.now() < userdb.cooldowns.roubar){
      
      const calc = userdb.cooldowns.roubar - Date.now()
      
         return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`<a:red_exclamacao:974042663336685618> | Calma ae amigo...`)
    .setColor("a5d7ff")
    .setDescription(`Ainda falta ${ms(calc).hours}h ${ms(calc).minutes}m ${ms(calc).seconds}s para você poder roubar alguém novamente.`)
], ephemeral: true})
     }  
      
  if(interaction.user.id == user.id) return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`<a:red_exclamacao:974042663336685618>  |  Isso não pode...`)
    .setColor("a5d7ff")
    .setDescription(`**Calma!** Você não pode se roubar.`)
], ephemeral: true})
      
  if(!userdb2 || userdb2.economia.money <= 0) return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`<a:red_exclamacao:974042663336685618>  | Espera ai...`)
    .setColor("a5d7ff")
    .setDescription(`**Calma!** ${user} não tem dinheiro em mãos.`)
], ephemeral: true})

   const porcentagem = ~~(Math.random() * 100)
      
   if(porcentagem >= 50){

   const money = Math.ceil(userdb2.economia.money / 100 * 35)

  await client.userdb.updateOne({
         userID: user.id
     }, { $set: {
         "economia.money": userdb2.economia.money - money
     }
     })

  await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "economia.money": userdb.economia.money + money,
         "cooldowns.roubar": Date.now() + 72e5
     }
     })

   interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`<:arma:977024883940794400> | Dinheiro roubado !`)
    .setColor("a5d7ff")
    .setDescription(`**Parabens !**, você acaba de roubar R$${money} do(a) ${user} 💸.`)
]})
     
   } else {

     const quantia = Math.ceil(userdb.economia.money / 100 * 5)
 
    await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "economia.money": userdb.economia.money - quantia,
         "cooldowns.roubar": Date.now() + 72e5
     }
     })

     interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`<:roubo:977024408768114759> | O Roubo deu ruim !`)
    .setColor("a5d7ff")
    .setDescription(`Você foi preso e teve que pagar R$${quantia} de fiança para ser liberado.`)
]})
   }

    }
};

function ms(ms) {
  const seconds = ~~(ms/1000)
  const minutes = ~~(seconds/60)
  const hours = ~~(minutes/60)
  const days = ~~(hours/24)

  return { days, hours: hours%24, minutes: minutes%60, seconds: seconds%60 }
}