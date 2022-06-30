const Discord = require("discord.js");

module.exports = {
    name: "pagar",
    description: "[💸 Economia] Pague ou envie dinheiro para algum usuário.",
    type: 'CHAT_INPUT',
    options: [
        {
         name: "usuário",
         description: "usuário que você quer mandar o dinheiro",
         type: 6,
         required: true
        },
        {
         name: "quantia",
         description: "A quantia que você quer enviar",
         type: 10,
         required: true
        }
        ],
    run: async (client, interaction) => {
        
     const user = interaction.options.getUser("usuário")
     
     const quantia = ~~interaction.options.getNumber("quantia")
     
     if(user.id == interaction.user.id){
     return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`<a:red_exclamacao:871399565637591061> | Calma lá parça...`)
    .setColor("a5d7ff")
    .setDescription("Você não pode transferir dinheiro para si mesmo.")
], ephemeral: true})
 }
     
     const userdb = await client.userdb.findOne({
         userID: interaction.user.id
     })
     
     if(!userdb || userdb.economia.money == 0){
     return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`<a:red_exclamacao:871399565637591061> | Então amigo...`)
    .setColor("a5d7ff")
    .setDescription("Você atualmente não tem dinheiro nenhum em mãos. Caso tiver dinheiro no banco, retire-o de lá antes de tentar fazer a transferência.")
], ephemeral: true})
 }
 
      if(userdb.economia.money < quantia){
     return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`<a:red_exclamacao:871399565637591061> | Então amigo...`)
    .setColor("a5d7ff")
    .setDescription("Você atualmente não tem todo esse dinheiro em mãos. Caso tenha dinheiro no banco, retire-o de lá antes de tentar fazer a transferência.")
], ephemeral: true})
 }
 
      if(quantia < 1){
    return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`<a:red_exclamacao:871399565637591061> | Calma ae...`)
    .setColor("a5d7ff")
    .setDescription(`Você deve especificar uma quantia válida acima de 0 para tranferir para outro usuário.`)
], ephemeral: true})
}
 
     let userdb2 = await client.userdb.findOne({
         userID: user.id
     })
      
     if(!userdb2){
         const newuser = new client.userdb({ userID: user.id })
         await newuser.save();
         
         userdb2 = await client.userdb.findOne({ userID: user.id })
     }

interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`:smiling_imp: | Bolsonaro liberou o auxilio ?!`)
    .setColor("a5d7ff")
    .setDescription(`**Hey** ${user},  ${interaction.user} Quer tranferir \`R$${quantia}\` para você.
> *Para concluir a transação os 2 usuários devem clicar na reação.*`)
], fetchReply: true}).then(msg =>{
    
    msg.react("💸")
    
    const filter = (reaction, usuário) => {
	return reaction.emoji.name === '💸' && ([interaction.user.id, user.id]).includes(usuário.id)
};

const collector = msg.createReactionCollector({ filter: filter, time: 1000 * 60 * 10 });

collector.on('collect', (reaction) => {
    
    const users = reaction.users.cache.map(a => a.id)
    
	if(users.includes(interaction.user.id) && users.includes(user.id)){
	    
	    collector.stop()
	    
	if(userdb.economia.money < quantia){
	   
	    return interaction.channel.send({embeds: [new Discord.MessageEmbed()
    .setTitle(`<:broken:975942760215486545> | Pelo Visto o Bolsonaro Recuperou o Dinheiro...`)
    .setColor("a5d7ff")
    .setDescription(`Infelizmente ${interaction.user} não tem mais essa quantia para pagar...`)
]})
	}
	    
	    userdb.economia.money = userdb.economia.money - quantia; userdb.save();
	    
	    userdb2.economia.money = userdb2.economia.money + quantia; userdb2.save();
	
	interaction.channel.send({embeds: [new Discord.MessageEmbed()
    .setTitle(`<:moneyt:975946051259363330> | Transação Realizada !`)
    .setColor("a5d7ff")
    .setDescription(` > ${interaction.user} Pagou \`R$${quantia}\` Para ${user} `)
]})

	}
});

})

    }
}
