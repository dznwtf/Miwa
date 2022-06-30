const Discord = require("discord.js");
const Canvas = require('canvas')

const { registerFont } = require('canvas')
registerFont('././Font.otf', { family: 'Uniform' })

module.exports = {
    name: "double",
    description: "[💸 Economia] Aposte no double",
    type: 'CHAT_INPUT',
    options: [
        {
         name: "quantia",
         description: "digite o quanto você quer apostar",
         type: 10,
         required: true
        },
        ],
    run: async (client, interaction) => {
        
     let quantia = interaction.options.getNumber("quantia")
     
     let userdb = async() => await client.userdb.findOne({
         userID: interaction.user.id
     })
 
     if(!(await userdb()) || quantia <= 0 || (await userdb()).economia.money < quantia) return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`Hmmmm | calma lá`)
    .setColor("a5d7ff")
    .setDescription(`Você deve especificar um valor que você tenha na mão, acima de 0.`)], ephemeral: true})
      
      let recentes = [],
          gamemode = "normal",
          quadrante,
          iniciar = false;
    
    const butao = async() =>{
      
            const b = new Discord.MessageActionRow()
	.addComponents(
		new Discord.MessageButton()
		.setCustomId(`normal`)
		.setLabel(`         Normal         `)
		.setStyle('SECONDARY')
    .setDisabled(gamemode == "normal" ? true : false),
		new Discord.MessageButton()
		.setCustomId(`auto`)
		.setLabel(`         Auto         `)
		.setStyle('SECONDARY')
    .setDisabled(gamemode == "normal" ? false : true)
			); 

      const bt = new Discord.MessageActionRow()
	.addComponents(
		new Discord.MessageButton()
		.setCustomId(`nada`)
		.setLabel(`Apostado: ${abreviar(quantia)}`)
		.setStyle('SECONDARY')
    .setDisabled(true),
		new Discord.MessageButton()
		.setCustomId(`1/2`)
		.setLabel(`½`)
		.setStyle('SECONDARY')
    .setDisabled(~~(quantia / 2) < 1 ? true : false),
    new Discord.MessageButton()
		.setCustomId(`2x`)
		.setLabel('2x')
		.setStyle('SECONDARY')
    .setDisabled((quantia * 2) > (await userdb()).economia.money ? true : false),
			);

     const bt2 = new Discord.MessageActionRow()
	.addComponents(
		new Discord.MessageButton()
		.setCustomId(`🟥`)
		.setLabel(`🟥 - 2x`)
		.setStyle('SECONDARY')
    .setDisabled(quadrante == "🟥" ? true : false),
		new Discord.MessageButton()
		.setCustomId(`⬜`)
		.setLabel(`⬜ - 14x`)
		.setStyle('SECONDARY')
    .setDisabled(quadrante == "⬜" ? true : false),
    new Discord.MessageButton()
		.setCustomId(`⬛`)
		.setLabel('⬛ - 2x')
		.setStyle('SECONDARY')
    .setDisabled(quadrante == "⬛" ? true : false),
			);

      const bt3 = new Discord.MessageActionRow()
	.addComponents(
		new Discord.MessageButton()
		.setCustomId(`apostar`)
		.setLabel(`                      Apostar rodada                    `)
		.setStyle('DANGER')
    .setDisabled(quadrante && !iniciar ? false : true)
			);

     const bt4 = new Discord.MessageActionRow()
	.addComponents(
		new Discord.MessageButton()
		.setCustomId(`parar`)
		.setLabel(`                            Parar jogo                          `)
		.setStyle('SECONDARY')
			);
      
      return [b, bt, bt2, bt3, bt4]
    }

     interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`Double!!!!`)
     .setColor("a5d7ff")
     .setDescription(`> Quantidade apostada: \`${quantia}\``)
     .setImage("https://i.imgur.com/tL68b6f.png")
          ], components: await butao(), fetchReply: true}).then(msg =>{
setTimeout(async()=>{
   interaction.editReply({embeds: [new Discord.MessageEmbed()
    .setTitle(`Double!!!!`)
     .setColor("a5d7ff")
     .setDescription(`> Quantidade apostada: \`${quantia}\``)
     .setImage("https://i.imgur.com/8eJ7ufv.gif")
          ], components: await butao()}).catch(e =>{})
}, 9000)
       
    const collector = msg.createMessageComponentCollector({ idle: 1000 * 60 * 15 });

collector.on('collect', async i => {
  
  if(i.user.id != interaction.user.id) return i.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`👨 | Calma ae...`)
    .setColor("a5d7ff")
    .setDescription(`Só quem solicitou o jogo pode usar o menu.`)
], ephemeral: true})

   if(i.customId == "normal") gamemode = "normal"
   if(i.customId == "auto"){
    gamemode = "auto"
    iniciar = true
}
   if(i.customId == "1/2") quantia = ~~(quantia / 2)
   if(i.customId == "2x") quantia = quantia * 2
  
   if(i.customId == "🟥") quadrante = "🟥"
   if(i.customId == "⬜") quadrante = "⬜"
   if(i.customId == "⬛") quadrante = "⬛"

  if(i.customId == "apostar") iniciar = true

  if(i.customId == "parar"){
  interaction.deleteReply({}).catch(e =>{})
    return parar()
}
  interaction.editReply({components: await butao()})
})

  collector.on('end', ()=>{
  interaction.deleteReply({}).catch(e =>{})
  parar()
})
     })

const jogo = setInterval(async() =>{
  interaction.editReply({embeds: [new Discord.MessageEmbed()
    .setTitle(`Rodando o Double !!!!`)
     .setColor("a5d7ff")
     .setDescription(`> Quantidade apostada: \`${quantia}\`
Rodando...
Histórico: ${recentes.slice((recentes.length - 10) < 0 ? 0 : (recentes.length - 10)).join(" ")}`)
.setImage("https://i.imgur.com/0IWnk2i.gif")
], components: await butao()}).catch(e => parar())

  const number = ~~(Math.random() * 39) + 1
  let quadro;
  if(number == 37 || number == 17 || number == 24){
    quadro = "⬜"
  } else if(number % 2 == 0){
    quadro = "🟥"
  } else {
    quadro = "⬛"
  }
  recentes.push(quadro)

  const canvas = Canvas.createCanvas(650, 500)
    const ctx = canvas.getContext("2d")

    const background = await Canvas.loadImage(quadro == "⬜" ? "https://i.imgur.com/kFrJ0Lk.png" : quadro == "🟥" ? "https://i.imgur.com/YAMp62i.png" : "https://i.imgur.com/BGUPpgB.png")
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

if(quadro != "⬜"){
  ctx.font = '60px Uniform';
  ctx.fillStyle = '#F8F8F8';
  ctx.fillText(`${number - 1 < 0 ? 40 : number - 1}`, 139 - `${number}`.length * 9, 273)
  ctx.fillText(`${number}`, 314 - `${number}`.length * 9, 273)
  ctx.fillText(`${number + 1 > 40 ? 1 : number + 1}`, 479 - `${number}`.length * 9, 273)
}
  
  if(iniciar){
ctx.font = '30px Uniform';
ctx.fillStyle = '#F8F8F8';
ctx.fillText(`Você ${quadro == quadrante ? "ganhou" : "perdeu"} ${abreviar(quantia)} de dinheiro.`, 115, 97)

    await client.userdb.updateOne({
           userID: interaction.user.id
       }, { $inc:{
    "economia.money": quadro == quadrante ? quadro == "⬜" ? quantia * 13 : quadro == "⬛" ? quantia : quantia : -quantia
       }
       })

 iniciar = false

    if((await userdb()).economia.money < quantia) quantia = (await userdb()).economia.money
  }

    const layout = await Canvas.loadImage("https://i.imgur.com/9yuFSQM.png")
    ctx.drawImage(layout, 0, 0, canvas.width, canvas.height)
  
  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'double.png')
  
  setTimeout(async() =>{
  interaction.editReply({embeds: [new Discord.MessageEmbed()
    .setTitle(`Double Caiuuu!!!!`)
     .setColor("a5d7ff")
     .setImage("attachment://double.png")
     .setDescription(`> Quantidade apostada: \`${quantia}\`
${iniciar ? quadro == quadrante ? "Você... Ganhou!!!" : "Você... Perdeu..." : ""}
Histórico: ${recentes.slice((recentes.length - 10) < 0 ? 0 : (recentes.length - 10)).join(" ")}`)], files: [attachment], components: await butao()}).catch(e => parar()) 
  
  }, 4000)
  
  setTimeout(async() =>{
    
    if((await userdb()).economia.money <= 0){
      interaction.editReply({ content: `${interaction.user} seu dinheiro acabou, então você não pode mais apostar.`, embeds: [], components: [], files:[]})
     return parar()
    }
    
  interaction.editReply({embeds: [new Discord.MessageEmbed()
    .setTitle(`Double!!!!`)
     .setColor("a5d7ff")
     .setDescription(`> Quantidade apostada: \`${quantia}\`
Nova rodada em 15 segundos
Histórico: ${recentes.slice((recentes.length - 10) < 0 ? 0 : (recentes.length - 10)).join(" ")}`)
.setImage("https://i.imgur.com/8eJ7ufv.gif")
          ], files: [], components: await butao()}).catch(e => parar()) },9000)

  if(gamemode == "auto") iniciar = true
                         
}, 24000)

function parar(){
  clearInterval(jogo)
}
                  
    }
};

function abreviar(number, precision=2) {
  return number.toLocaleString('en-US', { notation: 'compact', maximumFractionDigits: precision })
}
