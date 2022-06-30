const Discord = require("discord.js");

module.exports = {
    name: "casar",
    description: "[💸 Economia] Case com alguém",
    type: 'CHAT_INPUT',
    options: [
        {
         name: "usuário",
         description: "usuário que você quer casar.",
         type: 6,
         required: true
        },
        ],
    run: async (client, interaction) => {
        
     const user = interaction.options.getUser("usuário")
     
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
      
     if(!userdb2){
         const newuser = new client.userdb({ userID: user.id })
         await newuser.save();
         
         userdb2 = await client.userdb.findOne({ userID: user.id })
     }

     if(interaction.user.id == user.id) return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`<a:red_exclamacao:974042663336685618> | Dá não parceiro(a)...`)
    .setColor("a5d7ff")
    .setDescription(`**Calma!** Você pode se casar com você mesmo(a).`)
], ephemeral: true})

    if(userdb.economia.marry.casado) return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`<a:red_exclamacao:974042663336685618> | Dá não parceiro(a)...`)
    .setColor("a5d7ff")
    .setDescription(`**Calma!** Você já está casado com alguém.`)
], ephemeral: true})

    if(userdb2.economia.marry.casado) return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`<a:red_exclamacao:974042663336685618> | Dá não parceiro(a)...`)
    .setColor("a5d7ff")
    .setDescription(`**Calma!** ${user} já está casado com alguém.`)
], ephemeral: true})

    const butao = new Discord.MessageActionRow()
	.addComponents(
		new Discord.MessageButton()
		.setCustomId(`aceitar`)
		.setLabel('Aceitar')
		.setStyle('SECONDARY'),
		new Discord.MessageButton()
		.setCustomId(`recusar`)
		.setLabel('Recusar')
		.setStyle('SECONDARY'),
			);

   interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`<:ring2:975943603564204072> | Pedido De Casamento `)
    .setColor("a5d7ff")
    .setDescription(` ${user}, ${interaction.user} quer se casar com você, aceita?`)
], components: [butao], fetchReply: true}).then(msg =>{
    
    const collector = msg.createMessageComponentCollector({ idle: 1000 * 60 * 10 });

collector.on('collect', async i => {
  
  if(i.user.id !=user.id) return i.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`<a:red_exclamacao:974042663336685618> | Calma ae...`)
    .setColor("a5d7ff")
    .setDescription(`Só quem recebeu o pedido de casamento pode usar o botão.`)
], ephemeral: true})

   collector.stop()

   if(i.customId == "aceitar"){
       
       await client.userdb.updateOne({
           userID: interaction.user.id
       }, { $set:{
          "economia.marry.casado": true,
          "economia.marry.des": Date.now(),
          "economia.marry.com": user.id
       }
       })
       
       await client.userdb.updateOne({
           userID: user.id
       }, { $set:{
          "economia.marry.casado": true,
          "economia.marry.des": Date.now(),
          "economia.marry.com": interaction.user.id
       }
       })
       
       
       interaction.editReply({embeds: [new Discord.MessageEmbed()
    .setTitle(`<:ring2:975943603564204072> | Pedido De Casamento Aceito`)
    .setColor("a5d7ff")
    .setDescription(`${user} Aceitou o pedido de casamento de ${interaction.user}.`)
], components: []})
   }
   
   if(i.customId == "recusar"){
      interaction.editReply({embeds: [new Discord.MessageEmbed()
    .setTitle(`<:broken:975942760215486545>  | Pedido de Casamento Recusado`)
    .setColor("a5d7ff")
    .setDescription(`${user} recusou o pedido de casamento de ${interaction.user}.`)
], components: []})
       
   }
   
})

})

    }
};