const Discord = require("discord.js")
const {
  Client,
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
  MessageButton
} = require('discord.js');
module.exports = {
  name: "help",
  description: "[🏠 Info] Ver a lista de comandos do bot",
  type: "CHAT_INPUT",
  run: async(client, interaction) =>{
   
  
    const embed = new Discord.MessageEmbed()
    .setAuthor({name: "Miwa Ajuda",
  iconURL: "https://cdn.discordapp.com/emojis/931388425565790228.gif"
})
    .setDescription(' **Oie, Eu Me Chamo Miwa, Espero que você goste de mim !** \n\nPara usar um comando, comece digitando `/` seguido pelo comando que você deseja executar.\nVocê também pode usar o preenchimento automático integrado do Discord para comandos.\n\n')
    .addField('<:Members:974005415119552522>  Convite', '[Convidar](https://discord.com/oauth2/authorize?client_id=975579170677596190&scope=bot%20applications.commands&permissions=8)', true)
      .addField('<:info:974005445549260890>  Website', '[Miwa](https://miwa.club)', true)
      .addField('\u200b', '\u200b', true)
      .addField('<:discord:974080939477057626> Suporte', '[Suporte](https://discord.gg/yBCaXquQ8Q)', true)
      .addField('<:BadgeStaff:974081063007682590> Comandos', '[Comandos](https://miwa.club/#commands)', true)
      .addField('\u200b', '\u200b', true)


    const embed2 = new Discord.MessageEmbed()
    .setAuthor({name: 'Miwa - Geral', iconURL: "https://cdn.discordapp.com/emojis/974419236946599998.webp?size=128&quality=lossless"})
    .setDescription("> <:seta:974421767584092210> **Pegar Um Avatar -** `/avatar <@usuário>`\n> <:seta:974421767584092210> **Pegar Um Banner -** `/banner <@usuario>`\n> <:seta:974421767584092210> **Pegar O Banner do Servidor -** `/serverbanner`\n> <:seta:974421767584092210> **Pegar o Icon Do Servidor -** `/servericon`")
    .setColor('#6495ED')

    const embed3 = new Discord.MessageEmbed()
    .setAuthor({name: 'Miwa - Utilidades', iconURL: "https://cdn.discordapp.com/emojis/974419603394543636.webp?size=160&quality=lossless"})
    .setDescription("> <:seta:974421767584092210> **Visite o Site Da Miwa -** `/site`\n> <:seta:974421767584092210> **Reporte Algum Bug -** `/bug`\n> <:seta:974421767584092210> **Convide a Miwa -** `/invite`\n> <:seta:974421767584092210> **Ver a Latência da Miwa -** `/ping`\n> <:seta:974421767584092210> **Dar Uma Sugestão Aos Developers -** `/sugestao`\n> <:seta:974421767584092210> **Comando de serverinfo -** `/serverinfo`\n> <:seta:974421767584092210> **Ver as informações sobre um usuário -** `/userinfo`\n> <:seta:974421767584092210> **Vote Na Miwa -** `/vote`\n> <:seta:974421767584092210> **Veja as informações sobre a Miwa -** `/botinfo`\n> <:seta:974421767584092210> **Veja a Quanto Tempo Estou Acordada -** `/uptime`")
    .setColor('#6495ED')


    const embed4 = new Discord.MessageEmbed()
    .setAuthor({name: 'Miwa - Economia', iconURL: "https://cdn.discordapp.com/attachments/975578783824375850/975936685919600690/unknown.png"})
    .setDescription("> <:seta:974421767584092210> **Veja Seu Saldo Bancário -** `/atm`\n> <:seta:974421767584092210> **Case com Alguém -** `/casar`\n> <:seta:974421767584092210> **Pegue seu Daily Diário -** `/daily`\n> <:seta:974421767584092210> **Deposite seu Dinheiro no Banco -** `/depositar`\n> <:seta:974421767584092210> **Se Divorcie -** `/divorciar`\n> <:seta:974421767584092210> **Selecione um Emprego Para Trabalhar -** `/empregos`\n> <:seta:974421767584092210> **Pague ou Envie Dinheiro a Alguém -**`/pagar`\n> <:seta:974421767584092210> **Veja seu Perfil -** `/perfil`\n> <:seta:974421767584092210> **Veja o Rank Dos Mais Ricos (GLOBAL) -** `/rank`\n> <:seta:974421767584092210> **Saque Dinheiro do Banco -** `/retirar`\n> <:seta:974421767584092210> **Altere seu Sobremim -** `/sobremim`\n> <:seta:974421767584092210> **Quer trabalhar? Use  -** `/trabalhar`\n> <:seta:974421767584092210> **Roube alguém -** `/roubar @usuário`\n> <:seta:974421767584092210> **Faça Gf por dinheiro -** `/gf`\n> <:seta:974421767584092210> **Faça Xcam por dinheiro -** `/xcam`\n> <:seta:974421767584092210> **Compre backgrounds -** `/backgrounds`\n> <:seta:974421767584092210> **Jogue BlackJack (21) -** `/blackjack`\n> <:seta:974421767584092210> **Pegue seu semanal -** `/semanal`")
    .setColor('#6495ED')

    const embed5 = new Discord.MessageEmbed()
    .setAuthor({name: 'Miwa - Moderação', iconURL: "https://cdn.discordapp.com/emojis/974420110037098546.webp?size=160&quality=lossless"})
    .setDescription("> <:seta:974421767584092210> **Adicione Emoji -** `/addemoji`\n> <:seta:974421767584092210> **Ban Algum Usuário -** `/ban`\n> <:seta:974421767584092210> **Castigue Algum Usuário -** `/castigo`\n> <:seta:974421767584092210> **Crie Uma Embed -** `/embed`\n> <:seta:974421767584092210> **Pra Eventos, Utilize O PainelStaff -** `/painelstaff`\n> <:seta:974421767584092210> **Desbana Um Usuário Pelo ID -** `/unban`\n> <:seta:974421767584092210> **Limpe As Mensagens Do Chat -** `/clear`")
    .setColor('#6495ED')

    const embed6 = new Discord.MessageEmbed()
    .setAuthor({name: 'Miwa - Interações', iconURL: "https://cdn.discordapp.com/emojis/974420539856789564.webp?size=160&quality=lossless"})
    .setDescription("> <:seta:974421767584092210> **Dê um beijo em um usuário -** `/beijar`\n> <:seta:974421767584092210> **Dê um abraço em um usuário -** `/abraçar`\n> <:seta:974421767584092210> **Dê um tapa em um usuário -** `/bater`\n> <:seta:974421767584092210> **Jogue Akinator -** `/akinator`\n> <:seta:974421767584092210> **Veja o que o KidBengala Tem a Falar -** `/kidb`\n> <:seta:974421767584092210> **Jogue o jogo da cobrinha -** `/snake`\n> <:seta:974421767584092210> **Veja a sua skin no minecraft -** `/skinmc`\n> <:seta:974421767584092210> **Veja sua porcentagem do amor com alguém -** `/ship`\n> <:seta:974421767584092210> **Coloque alguém no time do vasco -** `/vasco`\n> <:seta:974421767584092210> **Veja minha namorada -** `/namorada`\n> <:seta:974421767584092210> **Quando dizem que nada é perfeito -** `/perfeito` ")
    .setColor('#6495ED')

  
    

    const row = new Discord.MessageActionRow()
    .addComponents(
      new MessageSelectMenu()
      .setCustomId('1')
      .setPlaceholder('Meus Comandos')
      .addOptions([
        {
          label: 'Menu Inicial',
          description: 'Volte ao Menu inicial',
          emoji: '974419478798565436',
          value: '1',

        },

        {
          label: 'Geral',
          description: 'Comandos Gerais',
          emoji: '974419236946599998',
          value: '2',
        }, 
        {
        label: 'Utilidades',
        description: 'Comandos Úteis',
        emoji: '974419603394543636',
        value: '3',
        },
        {
          label: 'Economia ',
          description: 'Comandos de Economia',
          emoji: '975936688029306890',
          value: '4',

        },
        {
          label: 'Moderação',
          description: 'Comandos de Moderação',
          emoji: '974420110037098546',
          value: '5',
        },
        {
          label: 'Interações',
          description: 'Comandos de Interações',
          emoji: '974420539856789564',
          value: '6',
        }
     
      ])
    )
    interaction.reply({ embeds: [embed], fetchReply: true, components: [row]})
.then(msg=>{
			const filtro = (interaction) => 
            interaction.isSelectMenu()
      
          const coletor = msg.createMessageComponentCollector({
            filtro
          });
      coletor.on('collect', async(collected)=>{
          if(collected.user.id !== interaction.user.id) return collected.reply({content: `Caso queira usar o menu utilize o comando **/help**.`, ephemeral: true})
				 let ticket = collected.values[0]
            collected.deferUpdate()

						if(ticket === '1'/*id que vc colocou*/){
							 msg.edit({embeds: [embed]})
              
              
						}
						if(ticket === '2'/*id quevc colocou*/){
							msg.edit({embeds: [embed2]})
						}
        if(ticket === '3'){
          msg.edit({embeds: [embed3]})
        }
        if(ticket === '4'){
          msg.edit({embeds: [embed4]})
        }
        if(ticket === '5'){
          msg.edit({embeds: [embed5]})
        }
        if(ticket === '6'){
          msg.edit({embeds: [embed6]})
        }
        
			})
		}) 
		
			
}
            }