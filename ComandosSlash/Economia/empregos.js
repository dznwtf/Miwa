const Discord = require("discord.js")
module.exports = {
  name: "empregos",
  description: "[💸 Economia] Aqui voce pode arrumar um emprego",
  type: "CHAT_INPUT",
  run: async(client, interaction) =>{
   
   let userdb = await client.userdb.findOne({
         userID: interaction.user.id
     })
      
     if(!userdb){
         const newuser = new client.userdb({ userID: interaction.user.id })
         await newuser.save();
         
         userdb = await client.userdb.findOne({ userID: interaction.user.id })
     }
   
  const embed = new Discord.MessageEmbed()
    .setTitle('<:empregos:975948152156880918> | Escolha um trabalho de sua preferência')
    .setColor("a5d7ff")
    .setDescription('Selecione um emprego, para ver informações e pega-lo\nCada Emprego tem um tempo de espera e quantia de salarios diferentes, quanto maior o salário, maior será tempo de espera para mudar de profissão e também de coletar o salário.')
  
const row = new Discord.MessageActionRow()
	.addComponents(
	new Discord.MessageSelectMenu()
    .setCustomId('menu')
	.setPlaceholder('selecione algum emprego')
	.addOptions([
		{
			label: 'Lixeiro',
            emoji: '975949135180099645',
			value: 'lixeiro',
		},
		{
	    	label: 'Entregador De Pizza',
            emoji: '975951514587791400',
		    value: 'pizza',
		},
		{
			label: 'Frentista',
            emoji: '975949802984595556',
			value: 'frentista',
		},
		{
			label: 'Caminhoneiro',
            emoji: '975949412780085348',
			value: 'caminhao',
		},
		{
			label: 'Sedex',
            emoji: '975950068517584906',
			value: 'sedex',
		},
		 {
			label: 'Pescador',
            emoji: '975950258817359872',
			value: 'peixe',
		},
		{
			label: 'TI',
            emoji: '975950568117899335',
			value: 'ti',
		}
	]),
			);

interaction.reply({embeds: [embed], components: [row], fetchReply: true}).then(msg => {

  const collector = msg.createMessageComponentCollector({ idle: 1000 * 60 * 10 });

collector.on('collect', async i => {

  if(i.user.id != interaction.user.id) return i.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`<a:red_exclamacao:871399565637591061> | Calma ae...`)
    .setColor("a5d7ff")
    .setDescription(`Só quem solicitou o menu pode usá-lo.`)
], ephemeral: true})

   i.deferUpdate()

  if(i.componentType == 'BUTTON') {

   if(Date.now() < userdb.cooldowns.trabalho){ 
    const calc = userdb.cooldowns.trabalho - Date.now()
    return interaction.followUp({embeds: [new Discord.MessageEmbed()
    .setTitle(`<a:red_exclamacao:871399565637591061> | Calma...`)
    .setColor("a5d7ff")
    .setDescription(`**Espera um pouco ! ** Você só pode trocar de emprego 1 vez por semana.
> *Ainda falta **__${ms(calc).days}d ${ms(calc).hours}h ${ms(calc).minutes}m__** para você poder trocar novamente.*`)
], ephemeral: true})
   }
  const button = i.customId.split("_")[1]
  
  if(button == userdb.economia.trabalho .trampo) return interaction.followUp({embeds: [new Discord.MessageEmbed()
    .setTitle(`<a:red_exclamacao:871399565637591061> | Ei Parceiro(a)...`)
    .setColor("a5d7ff")
    .setDescription(` Você já está com este emprego.`)
], ephemeral: true})
  
  let trabalho,
      cooldown,
      maxmoney;
  
  switch (button) {
      
  case "lixeiro":
    trabalho = "lixeiro"
    cooldown = 1000 * 60 * 45
    maxmoney = 1000
  break;
  
  case "pizza":
    trabalho = "pizza"
    cooldown = 1000 * 60 * 90
    maxmoney = 1500
  break;
  
  case "frentista":
    trabalho = "frentista"
    cooldown = 1000 * 60 * 180
    maxmoney = 2500
  break;
  
  case "cominhao":
    trabalho = "caminhoneiro"
    cooldown = 1000 * 60 * 300
    maxmoney = 3500
  break;
  
  case "sedex":
    trabalho = "sedex"
    cooldown = 1000 * 60 * 420
    maxmoney = 6000
  break;
  
  case "pescador":
    trabalho = "pescador"
    cooldown = 1000 * 60 * 540
    maxmoney = 8500
  break;
  
  case "ti":
    trabalho = "ti"
    cooldown = 1000 * 60 * 600
    maxmoney = 10000
  break;
  }
  
  interaction.editReply({embeds: [new Discord.MessageEmbed()
    .setTitle(`<:sim:975955821013905409> | Você entrou em um novo emprego!`)
    .setColor("a5d7ff")
    .setDescription(`**Certo!** Agora você é uma pessoa Decente.`)
], components: []})
  
  await client.userdb.updateOne({
      userID: interaction.user.id
  },{ $set: {
          "cooldowns.trabalho": Date.now() + 604800000,
          "economia.trabalho":{
            maxmoney: maxmoney,
            trampo: trabalho,
            cooldown: cooldown
          }
      }
    }
  )
  }
   
  if(i.componentType == 'SELECT_MENU')  {
  const select = i.values[0]

    if(select == 'lixeiro'){
        
      interaction.editReply({embeds: [msgembed("<:lixeiro:975949135180099645>", "Lixeiro", "45m", 1)], components: [row, button("lixeiro")]})
      
    }
    
        if(select == 'pizza'){

      interaction.editReply({embeds: [msgembed("<:motoboy:975951514587791400>", "Entregador De Pizza", "1h", 1.5)], components: [row, button("pizza")]})
    }
    
    if(select == 'frentista'){
      
      interaction.editReply({embeds: [msgembed("<:frentista2:975949802984595556>", "Frentista", "3h", 2.5)], components: [row, button("frentista")]})
   
    }
    
    if(select == 'caminhao'){
        
      interaction.editReply({embeds: [msgembed("<:caminhonheiro:975949412780085348>", "Caminhoneiro", "5h", 3.5)], components: [row, button("cominhao")]})
   
    }
    
    if(select == 'sedex'){
        
      interaction.editReply({embeds: [msgembed("<:sedex:975950068517584906>", "Entregador Do Sedex", "7h", 6)], components: [row, button("sedex")]})
    }
    
    if(select == 'peixe'){
        
      interaction.editReply({embeds: [msgembed("<:peixe:975950258817359872>", "Pescador", "9h", 8.5)], components: [row, button("pescador")]})
      
    }
    
    if(select == 'ti'){
        
      interaction.editReply({embeds: [msgembed("<:TI:975950568117899335>", "Chefe De TI", "10h", 10)], components: [row, button("ti")]})
      
    }
    
  }//if menus
  
})//collector
  
})//.then
    
  }
}

function msgembed(emoji, emprego, cooldown, ganhos){
    return new Discord.MessageEmbed()
    .setTitle(`${emoji} | Emprego de ${emprego}.`)
    .setColor("a5d7ff")
    .setDescription(`> <:relogio:975956891538698310> Tempo de espera no comando de trabalho: **${cooldown}**\n > <:dinheiro:975936688029306890>  Salário máximo: R$ **${ganhos}k**`)
}

function button(String){
    return new Discord.MessageActionRow()
	.addComponents(
		new Discord.MessageButton()
		.setCustomId(`aceitar_${String}`)
		.setLabel('Pegar O Emprego')
		.setStyle('SECONDARY'),
			);
}

function ms(ms) {
  const seconds = ~~(ms/1000)
  const minutes = ~~(seconds/60)
  const hours = ~~(minutes/60)
  const days = ~~(hours/24)

  return { days, hours: hours%24, minutes: minutes%60, seconds: seconds%60 }
}