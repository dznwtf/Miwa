const Discord = require("discord.js");
const Canvas = require('canvas')

module.exports = {
    name: "blackjack",
    description: "jogar blackjack",
    type: 'CHAT_INPUT',
    options: [
        {
         name: "quantia",
         description: "quantia para apostar",
         type: 10,
         required: true
        },
        ],
    run: async (client, interaction) => {
        
     let quantia = interaction.options.getNumber("quantia")
     
     let userdb = await client.userdb.findOne({
         userID: interaction.user.id
     })

 if(userdb.economia.money < quantia) return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`Hmmmm calma lá`)
    .setColor("a5d7ff")
    .setDescription(`Você não tem essa quantia que quer apostar.`)], ephemeral: true})

    interaction.reply({content: "Carregando blackjack..."})

      await client.userdb.updateOne({
           userID: interaction.user.id
       }, { $inc:{
    "economia.money": -quantia
       }
       })
      
    const number = () => ~~(Math.random() * 12) + 1

  const cartas = {
    1: "https://i.imgur.com/clZIcP7.png",
    2: "https://i.imgur.com/RqbzBQs.png",
    3: "https://i.imgur.com/3Hj9MDZ.png",
    4: "https://i.imgur.com/0FzSVsD.png",
    5: "https://i.imgur.com/SF0ggFV.png",
    6: "https://i.imgur.com/L6QnzXW.png",
    7: "https://i.imgur.com/cr049mc.png",
    8: "https://i.imgur.com/0v96nYj.png",
    9: "https://i.imgur.com/5b7n4rN.png",
    10: "https://i.imgur.com/Y2s10qP.png",
    11: "https://i.imgur.com/wQHEURD.png",
    12: "https://i.imgur.com/R4aJyEb.png",
    13: "https://i.imgur.com/pvOwCsb.png"
  }
      
   const mesa = [number()],
     baralho = [number(), number()];
      
   let calc = (baralho[0] > 10 ? 10 : baralho[0]) + (baralho[1] > 10 ? 10 : baralho[1]),
     calcmesa = (mesa[0] > 10 ? 10 : mesa[0]);

    const canvas = Canvas.createCanvas(420, 600)
    const ctx = canvas.getContext("2d")

    const placares = async() =>{

const marks = await Canvas.loadImage("https://i.imgur.com/dfSnDfm.png")
    ctx.drawImage(marks, 0, 0, canvas.width, canvas.height)
      
ctx.font = '27px Uniform';
ctx.fillStyle = '#F8F8F8';
ctx.fillText(`${calc}`, 365, 568);
ctx.fillText(`${calcmesa}`, 28, 53);

    }
      
    const background = await Canvas.loadImage("https://i.imgur.com/yH2mwDN.png")
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

  placares()
      
   const carta1 = await Canvas.loadImage(cartas[baralho[0]])
    ctx.drawImage(carta1, 40, 400, 180, 180)

   const carta2 = await Canvas.loadImage(cartas[baralho[1]])
    ctx.drawImage(carta2, 80, 400, 180, 180)

   const cartamesa1 = await Canvas.loadImage(cartas[mesa[0]])
    ctx.drawImage(cartamesa1, 40, 20, 178, 178)

      const attachment = () =>{
    placares()
        return new Discord.MessageAttachment(canvas.toBuffer(), 'blackjack.png')
      }
      
    const venceu = async() =>{
     await client.userdb.updateOne({
           userID: interaction.user.id
       }, { $inc:{
    "economia.money": quantia * 2
       }
       })
      placares()
      const marks = await Canvas.loadImage("https://i.imgur.com/2yd3ygp.png")
    ctx.drawImage(marks, 0, 0, canvas.width, canvas.height)

ctx.font = '40px Uniform';
ctx.fillStyle = '#F8F8F8';
ctx.fillText(`${abreviar(quantia)}`, 155, 375);
      
      interaction.editReply({embeds: [new Discord.MessageEmbed()
    .setTitle(`VOCÊ VENCEU!!!`)
    .setColor("a5d7ff")
    .setDescription(`Carta da mesa: ${mesa.join(" e ").replace(/11/g, "valete").replace(/12/g, "rainha").replace(/13/g, "rei")}
Totalizando: ${calcmesa}
Suas cartas: ${baralho.join(" e ").replace(/11/g, "valete").replace(/12/g, "rainha").replace(/13/g, "rei")} 
Totalizando: ${calc}`)
.setImage("attachment://blackjack.png")
], components: [], files: [attachment()]})
    }

    const perdeu = async() =>{
      placares()
      const marks = await Canvas.loadImage("https://i.imgur.com/A6Io7gx.png")
    ctx.drawImage(marks, 0, 0, canvas.width, canvas.height)

ctx.font = '40px Uniform';
ctx.fillStyle = '#F8F8F8';
ctx.fillText(`${abreviar(quantia)}`, 155, 375);
      
      interaction.editReply({embeds: [new Discord.MessageEmbed()
    .setTitle(`VOCÊ PERDEU...`)
    .setColor("a5d7ff")
    .setDescription(`Carta da mesa: ${mesa.join(" e ").replace(/11/g, "valete").replace(/12/g, "rainha").replace(/13/g, "rei")}
Totalizando: ${calcmesa}
Suas cartas: ${baralho.join(" e ").replace(/11/g, "valete").replace(/12/g, "rainha").replace(/13/g, "rei")} 
Totalizando: ${calc}`)
.setImage("attachment://blackjack.png")
], components: [], files: [attachment()]})
    }
      
    const butao = () =>{
      
      const bt = new Discord.MessageActionRow()
	.addComponents(
		new Discord.MessageButton()
		.setCustomId(`aceitar`)
		.setLabel('hit')
		.setStyle('SECONDARY'),
		new Discord.MessageButton()
		.setCustomId(`recusar`)
		.setLabel('stop')
		.setStyle('SECONDARY'),
			);

     if(baralho.length == 2 && (userdb.economia.money - quantia) >= quantia) bt.addComponents(
		new Discord.MessageButton()
		.setCustomId(`dobrar`)
		.setLabel('dobrar')
		.setStyle('SECONDARY'),
		)
     return bt
   }
      
   interaction.editReply({content: null, embeds: [new Discord.MessageEmbed()
    .setTitle(`Blackjack ♣️♥️♦️♠️`)
    .setColor("a5d7ff")
    .setDescription(`Carta da mesa: ${mesa.join(" e ").replace(/11/g, "valete").replace(/12/g, "rainha").replace(/13/g, "rei")}
Totalizando: ${calcmesa}
Suas cartas: ${baralho.join(" e ").replace(/11/g, "valete").replace(/12/g, "rainha").replace(/13/g, "rei")} 
Totalizando: ${calc}`)
                               .setImage("attachment://blackjack.png")
], components: [butao()], files: [attachment()], fetchReply: true}).then(msg =>{
    
    const collector = msg.createMessageComponentCollector({ idle: 1000 * 60 * 10 , max: 10});

collector.on('collect', async i => {
  
  if(i.user.id != interaction.user.id) return i.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`👨 Calma ae...`)
    .setColor("a5d7ff")
    .setDescription(`Só quem está jogando pode clicar nos botões.`)
], ephemeral: true})

   if(i.customId == "aceitar"){
     
     const numero = number()
     baralho.push(numero)
     calc = calc + (numero > 10 ? 10 : numero)
      placares()
    const newcard = await Canvas.loadImage(cartas[numero])
    ctx.drawImage(newcard, (baralho.length * 40), 400, 180, 180)
     
    if(calc > 21){
      const num = number()
      mesa.push(num)
      calcmesa = calcmesa + (num > 10 ? 10 : num)
      const newcard = await Canvas.loadImage(cartas[num])
    ctx.drawImage(newcard, (mesa.length * 40), 20, 178, 178)
      placares()
     return perdeu ()
    }
     
       interaction.editReply({embeds: [new Discord.MessageEmbed()
    .setTitle(`Blackjack ♣️♥️♦️♠️`)
    .setColor("a5d7ff")
    .setDescription(`Carta da mesa: ${mesa.join(" e ").replace(/11/g, "valete").replace(/12/g, "rainha").replace(/13/g, "rei")}
Totalizando: ${calcmesa}
Suas cartas: ${baralho.join(" e ").replace(/11/g, "valete").replace(/12/g, "rainha").replace(/13/g, "rei")} 
Totalizando: ${calc}`)
.setImage("attachment://blackjack.png")
], components: [butao()], files: [attachment()]})
   }
   if(i.customId == "recusar" || i.customId == "dobrar"){

if(i.customId == "dobrar"){

         await client.userdb.updateOne({
           userID: interaction.user.id
       }, { $inc:{
    "economia.money": -quantia
       }
       })

  quantia = quantia * 2
}
     
  for(let i = 0; i < (baralho.length - 1); i++){
    const num = number()
    mesa.push(num)
    calcmesa = calcmesa + (num > 10 ? 10 : num)
    
    const newcard = await Canvas.loadImage(cartas[num])
    ctx.drawImage(newcard, (mesa.length * 40), 20, 178, 178)
    
    if(calcmesa > 21) return venceu()

    if(calcmesa == calc){
placares()
      const marks = await Canvas.loadImage("https://i.imgur.com/2yd3ygp.png")
    ctx.drawImage(marks, 0, 0, canvas.width, canvas.height)

     await client.userdb.updateOne({
           userID: interaction.user.id
       }, { $inc:{
    "economia.money": quantia
       }
       })
     
     return interaction.editReply({embeds: [new Discord.MessageEmbed()
    .setTitle(`Empate !!!`)
    .setColor("a5d7ff")
    .setDescription(`Carta da mesa: ${mesa.join(" e ").replace(/11/g, "valete").replace(/12/g, "rainha").replace(/13/g, "rei")}
Totalizando: ${calcmesa}
Suas cartas: ${baralho.join(" e ").replace(/11/g, "valete").replace(/12/g, "rainha").replace(/13/g, "rei")} 
Totalizando: ${calc}`)
.setImage("attachment://blackjack.png")
], components: [], files: [attachment()]})

}
      
    if(calcmesa > calc) return perdeu()
    
  }

    venceu()
       
   }
   
})

})

    }
};

function abreviar(number, precision=2) {
  return number.toLocaleString('en-US', { notation: 'compact', maximumFractionDigits: precision })
}