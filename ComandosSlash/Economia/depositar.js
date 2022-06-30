const Discord = require("discord.js");

module.exports = {
    name: "depositar",
    description: "[💸 Economia] Deposite seu dinheiro no banco",
    type: 'CHAT_INPUT',
    options: [
        {
         name: "quantia",
         description: "Digite uma quantia para depositar, ou digite [tudo]",
         type: 3,
         required: true
        },
        ],
    run: async (client, interaction) => {
        
     let quantia = interaction.options.getString("quantia")
     
if(quantia < 1 || isNaN(quantia) && quantia.toLowerCase() != "tudo"){
    return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`<a:red_exclamacao:974042663336685618> | Calma ae...`)
    .setColor("a5d7ff")
    .setDescription(`Você deve especificar uma quantia válida acima de 0 para depositar, ou digitar \`tudo\` para depositar tudo que você tem na carteira.`)
], ephemeral: true})
}

  let userdb = await client.userdb.findOne({
         userID: interaction.user.id
     })
 
 if(!userdb || userdb.economia.money == 0){
     return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`😢 Então amigo...`)
    .setColor("a5d7ff")
    .setDescription("Você não possui dinheiro nenhum em conta. Use `/daily` para pegar sua recompensa diária, ou pegue um emprego em `/empregos` e use `/trabalhar` para trabalhar.")
], ephemeral: true})
 }
 
  const usermoney = userdb.economia.money
 
  let dinero;
 
 if(quantia.toLowerCase() == "tudo"){
     
     dinero = usermoney
     
 } else {
 
 quantia = ~~quantia

 if(usermoney < quantia)
   return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`😢 Então amigo...`)
    .setColor("a5d7ff")
    .setDescription(`Você não tem toda essa quantia para depositar no momento, atualmente você só tem ${usermoney}.`)
], ephemeral: true})

  dinero = quantia

}

  await client.userdb.updateOne({
      userID: interaction.user.id
  },{ $set: {
          "economia.money": usermoney - dinero,
          "economia.banco": userdb.economia.banco + dinero
      }
    })

  interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`<:moneyt:975946051259363330> | Depósito Concluido !`)
    .setColor("a5d7ff")
    .setDescription(`${interaction.user}, você acaba de depositar \`R$${dinero}\` no seu banco ! `)
]})

    }
};
