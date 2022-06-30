const Discord = require("discord.js");

module.exports = {
    name: "retirar",
    description: "[💸 Economia] Retire seu dinheiro do banco",
    type: 'CHAT_INPUT',
    options: [
        {
         name: "quantia",
         description: "digite uma quantia para retirar, ou digite [tudo]",
         type: 3,
         required: true
        },
        ],
    run: async (client, interaction) => {
        
     let quantia = interaction.options.getString("quantia")
     
if(quantia < 1 || isNaN(quantia) && quantia.toLowerCase() != "tudo"){
    return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`<a:red_exclamacao:974042663336685618> | Calma lá...`)
    .setColor("a5d7ff")
    .setDescription(`Você deve especificar uma quantia válida acima de 0 para retirar, ou digitar \`tudo\` para retirar tudo que você tem no banco.`)
], ephemeral: true})
}

  let userdb = await client.userdb.findOne({
         userID: interaction.user.id
     })
 
 const usermoney = userdb.economia.banco
 
 if(!userdb || usermoney == 0){
     return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`😢| Então amigo...`)
    .setColor("a5d7ff")
    .setDescription("Você atualmente não tem dinheiro na sua conta do banco para retirar.")
], ephemeral: true})
 }
 
  let dinero;
 
 if(quantia.toLowerCase() == "tudo"){
     
     dinero = usermoney
     
 } else {
 
 quantia = ~~quantia

 if(usermoney < quantia)
   return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`<a:red_exclamacao:974042663336685618> | Pera aí ...`)
    .setColor("a5d7ff")
    .setDescription(`Você não tem essa quantia para retirar no momento, no seu banco você possui apenas ${usermoney} .`)
], ephemeral: true})

  dinero = quantia

}

  await client.userdb.updateOne({
      userID: interaction.user.id
  },{ $set: {
          "economia.money": userdb.economia.money + dinero,
          "economia.banco": usermoney - dinero
      }
    })

  interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`<:moneyt:975946051259363330> | Saque Feito !`)
    .setColor("a5d7ff")
    .setDescription(`Você acaba de retirar  \`R$${dinero}\` do seu banco !`)
]})

    }
};
