const Discord = require("discord.js");

module.exports = {
    name: "trabalhar",
    description: "[💸 Economia] Aqui você pode trabalhar !",
    type: 'CHAT_INPUT',
    run: async (client, interaction) => {
     
     let userdb = await client.userdb.findOne({
         userID: interaction.user.id
     })
      
     if(!userdb || !userdb.economia.trabalho.trampo){
         return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`<a:red_exclamacao:871399565637591061> | Calma Lá...`)
    .setColor("a5d7ff")
    .setDescription(`**Ei**, Você ainda não tem um emprego, digite /empregos para ver a lista de empregos e escolher algum.`)
], ephemeral: true})
     }
      
    if(Date.now() < userdb.cooldowns.work){
      const calc = userdb.cooldowns.work - Date.now()
      
         return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`<:daily:975944791957319681> | Espere mais um pouco...`)
    .setColor("a5d7ff")
    .setDescription(`Ainda falta ${ms(calc).hours}h ${ms(calc).minutes}m ${ms(calc).seconds}s para você trabalhar novamente.`)
], ephemeral: true})
     }  
      
    let frase,
        emprego;
          
    switch (userdb.economia.trabalho .trampo){
      
  case "lixeiro":
    emprego = "Lixeiro"
    frase = ["coletou 20 sacos de lixo", "dirigiu o caminhão de lixo por 2 horas"]
  break;
  
  case "pizza":
    emprego = "Entregador De Pizza"
    frase = ["entregou 12 pizzas", "fez um ótimo atendimento"]
  break;
  
  case "frentista":
    emprego = "Frentista"
    frase = ["abasteceu 28 carros", "trocou o óleo de 8 caminhões"]
  break;
  
  case "caminhoneiro":
    emprego = "Caminhoneiro"
    frase = ["dirigiu por mais de 13 horas", "fez 4 entregas em 1 dia"]
  break;
  
  case "sedex":
    emprego = "Entregador Do Sedex"
    frase = ["realizou 20 entregas", "realizou 4 entregas rápidas antes do prazo"]
  break;
  
  case "pescador":
    emprego = "Pescador"
    frase = ["pescou 20 sardinhas", "pescou um peixe lendário no laguinho do tio dzn"]
  break;
  
  case "ti":
    emprego = "Chefe De TI"
    frase = ["arrumou 7 computadores infectados com malwares", "desenvolveu um software para sua empresa"]
  break;
  }
      
      const mxmn = userdb.economia.trabalho.maxmoney / 2
      
      const dinheiro = Math.floor(Math.random() * mxmn) + mxmn

     await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "economia.money": userdb.economia.money + dinheiro,
         "cooldowns.work": Date.now() + userdb.economia.trabalho.cooldown
     }
     })
     
    frase = frase[Math.floor(Math.random() * frase.length)]
     
    interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`<:empregos:975948152156880918> | Trabalho feito ! `)
    .setColor("a5d7ff")
    .setDescription(`**Parabéns !** Você ${frase}\n\n> **Trabalho:** ${emprego}\n> **Recebeu:** \`R$${dinheiro}\` `)
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