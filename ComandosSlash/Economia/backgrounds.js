const backgrounds = [{img: "https://i.imgur.com/UnZVfA9.jpg", valor: 3000, name: "Blue tree's"}, 
{img: "https://media.discordapp.net/attachments/971878927691825173/981603931656450188/unknown.png", valor: 3000, name: "Girl Aeon"},
{img: "https://media.discordapp.net/attachments/971878927691825173/981602679325360158/unknown.png", valor: 6000, name: "Chill"},
{img: "https://i.imgur.com/5AN01zl.jpg", valor: 10000, name: "Ping bird's"},
{img: "https://media.discordapp.net/attachments/971878927691825173/981602856182374410/unknown.png", valor: 10000, name: "Inazuma"},
{img: "https://i.imgur.com/s1g3g5e.jpg", valor: 15000, name: "Chinatown"},
{img: "https://media.discordapp.net/attachments/971878927691825173/981603288023695380/unknown.png", valor: 15000, name: "Ningguang"},
{img: "https://media.discordapp.net/attachments/971878927691825173/981613705873719296/unknown.png", valor: 16000, name: "Blue Moon"},
{img: "https://media.discordapp.net/attachments/971878927691825173/981609136758325308/unknown.png?width=679&height=424", valor: 16000, name: "Blade"},
]

const Discord = require("discord.js")

module.exports = {
    name: "backgrounds",
    description: "[💸 Economia] Comprar e gerenciar backgrounds.",
    type: 'CHAT_INPUT',
    run: async (client, interaction) => {

    const userdb = async() => await client.userdb.findOne({
         userID: interaction.user.id
     })
      
let index = 0
  
    const butao = async() =>{ 
      const bt = new Discord.MessageActionRow()
	.addComponents(
		new Discord.MessageButton()
		.setCustomId(`-`)
		.setLabel('<- Voltar')
		.setStyle('SECONDARY')
    .setDisabled(index <= 0 ? true : false),
			);
      
    if((await userdb())?.economia.backgrounds.indexOf(backgrounds[index].img) == -1){ 
      bt.addComponents(
      new Discord.MessageButton()
		.setCustomId(`buy`)
		.setLabel('Comprar')
		.setStyle('SECONDARY')
    )
    } else {
      if((await userdb()).economia.background == backgrounds[index].img){
    bt.addComponents(
      new Discord.MessageButton()
		.setCustomId(`deseq`)
		.setLabel('Desequipar')
		.setStyle('SECONDARY')
    )
      } else {
     bt.addComponents(
      new Discord.MessageButton()
		.setCustomId(`eq`)
		.setLabel('Equipar')
		.setStyle('SECONDARY')
    )
      }
    }
    bt.addComponents(
      new Discord.MessageButton()
		.setCustomId(`+`)
		.setLabel('Próximo ->')
		.setStyle('SECONDARY')
    .setDisabled(index >= (backgrounds.length - 1) ? true : false),
    )
      return bt
      }

  const embed = () => new Discord.MessageEmbed()
.setAuthor({ name: `${backgrounds[index].name}`, iconURL: backgrounds[index].img})
    .setColor("a5d7ff")
.setDescription(`${backgrounds[index].name} ele custa R$${backgrounds[index].valor} `)
    .setImage(backgrounds[index].img)
    .setFooter({ text: `Background: ${index + 1}/${backgrounds.length}`, iconURL: interaction.user.displayAvatarURL() })
      
   interaction.reply({embeds: [embed()], components: [await butao()], fetchReply: true}).then(msg =>{
    
    const collector = msg.createMessageComponentCollector({ idle: 1000 * 60 * 10 });

collector.on('collect', async i => {
  
  if(i.user.id != interaction.user.id) return i.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`👨 Calma ae...`)
    .setColor("a5d7ff")
    .setDescription(`Só quem solicitou os backgrounds pode usá-lo`)
], ephemeral: true})

   if(i.customId == "+"){
     index++
     interaction.editReply({embeds: [embed()], components: [await butao()]})
   }
  
   if(i.customId == "-"){
     index--
     interaction.editReply({embeds: [embed()], components: [await butao()]})
   }

   if(i.customId == "buy"){
     
  if((await userdb()).economia.money < backgrounds[index].valor) return i.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`👨 Calma ae...`)
    .setColor("a5d7ff")
    .setDescription(`Você não tem dinheiro suficiente para comprar esse background`)
], ephemeral: true})


    interaction.editReply({embeds: [new Discord.MessageEmbed()
    .setAuthor({ name: `${backgrounds[index].name}`, iconURL: backgrounds[index].img})
    .setColor("a5d7ff")
    .setDescription(`Quer mesmo comprar o background **${backgrounds[index].name}** por **R$${backgrounds[index].valor}**?`)
    .setImage(backgrounds[index].img)
], components: [new Discord.MessageActionRow()
	.addComponents(
		new Discord.MessageButton()
		.setCustomId(`sim`)
		.setLabel('Sim')
		.setStyle('SECONDARY'),
    new Discord.MessageButton()
		.setCustomId(`nao`)
		.setLabel('Não')
		.setStyle('SECONDARY')
			)]})
     
   }

   if(i.customId == "eq"){
    await client.userdb.updateOne({
           userID: interaction.user.id
       }, { $set:{
          "economia.background": backgrounds[index].img
       }
       })
    interaction.editReply({components: [await butao()]})
    }   
  
   if(i.customId == "deseq"){
    await client.userdb.updateOne({
           userID: interaction.user.id
       }, { $set:{
          "economia.background": "https://i.imgur.com/vFqyhnK.png"
       }
       })
    interaction.editReply({components: [await butao()]})
    }   

    if(i.customId == "sim"){
  if((await userdb()).economia.money < backgrounds[index].valor){ 
    interaction.editReply({embeds: [embed()], components: [await butao()]})
    
    return i.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`👨 Calma ae...`)
    .setColor("a5d7ff")
    .setDescription(`Você não tem dinheiro suficiente para comprar esse background`)
], ephemeral: true})
    }

        let backs = (await userdb()).economia.backgrounds
  backs.push(backgrounds[index].img)
     
  await client.userdb.updateOne({
           userID: interaction.user.id
       }, { $set:{
          "economia.backgrounds": backs,
          "economia.money": (await userdb()).economia.money - backgrounds[index].valor
       }
       })
     i.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`Valeu chefe!!`)
    .setColor("a5d7ff")
    .setDescription(`Background comprado com sucesso`)
], ephemeral: true})
     interaction.editReply({embeds: [embed()], components: [await butao()]})
    }

    if(i.customId == "nao"){
   interaction.editReply({embeds: [embed()], components: [await butao()]})
}
  
})
   })
      
    }
}