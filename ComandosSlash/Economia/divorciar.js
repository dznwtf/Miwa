const Discord = require("discord.js");

module.exports = {
    name: "divorciar",
    description: "[💸 Economia] Se divorcie de alguém.",
    type: 'CHAT_INPUT',
    run: async (client, interaction) => {
        
     const userdb = await client.userdb.findOne({
         userID: interaction.user.id
     })
          
     if(!userdb || !userdb.economia.marry.casado){
         return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`<a:red_exclamacao:871399565637591061> | Espera Ai `)
    .setColor("a5d7ff")
    .setDescription(`Você ainda não está casado .`)
], ephemeral: true})
     }

    const butao = new Discord.MessageActionRow()
	.addComponents(
		new Discord.MessageButton()
		.setCustomId(`sim`)
		.setLabel('Sim')
		.setStyle('SECONDARY'),
		new Discord.MessageButton()
		.setCustomId(`nao`)
		.setLabel('Não')
		.setStyle('SECONDARY'),
			);

   const casado = await client.users.fetch(userdb.economia.marry.com)

   interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`<:broken:975942760215486545> | Divórcio`)
    .setColor("a5d7ff")
    .setDescription(`${interaction.user}, você tem certeza que deseja se divorciar de ${casado.username}?`)
], components: [butao], fetchReply: true}).then(msg =>{
    
    const collector = msg.createMessageComponentCollector({ idle: 1000 * 60 * 10 });

collector.on('collect', async i => {
  
  if(i.user.id != interaction.user.id) return i.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`<a:red_exclamacao:871399565637591061> | Calma ae...`)
    .setColor("a5d7ff")
    .setDescription(`Só quem solicitou o comando pode usar o botão.`)
], ephemeral: true})

   collector.stop()

   if(i.customId == "sim"){
       
       await client.userdb.updateOne({
           userID: interaction.user.id
       }, { $set:{
          "economia.marry.casado": false,
          "economia.marry.com": 0
       }
       })
       
       await client.userdb.updateOne({
           userID: casado.id
       }, { $set:{
          "economia.marry.casado": false,
          "economia.marry.com": 0
       }
       })
       
       
       interaction.editReply({embeds: [new Discord.MessageEmbed()
    .setTitle(`<:broken:975942760215486545> | Pelo visto o amor acabou...`)
    .setColor("a5d7ff")
    .setDescription(`${interaction.user} se divorciou de ${casado.username}.`)
], components: []})
   }
   
   if(i.customId == "nao"){
      interaction.editReply({embeds: [new Discord.MessageEmbed()
    .setTitle(`<:confuse:975947663847596073>  | Divórcio Cancelado`)
    .setColor("a5d7ff")
    .setDescription(`O Casamento Continua !`)
], components: []})
       
   }
   
})

})

    }
};