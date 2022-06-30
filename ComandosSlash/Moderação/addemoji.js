const {
  Client,
  CommandInteraction,
  MessageEmbed
} = require("discord.js");

const Discord = require('discord.js');
const { parse } = require('twemoji-parser');

module.exports = {
    name: "addemoji",
    description: "[🛠️ Moderação] Adicione Emojis ao Seu Servidor",
    category: "Moderação",
    cooldown: 5,
    userPermissions: "MANAGE_EMOJIS_AND_STICKERS",
    botPermissions: "",
    ownerOnly: false,
    toggleOff: false,
    options: [
        {
         name: "emoji",
         description: "emoji",
         type: 3,
         required: true
        },
        {
            name: "nome",
            description: "nome do emoji",
            type: 3,
            required: false,
           }
        ],
        run: async(client, interaction) =>{

    if (!interaction.member.permissions.has("MANAGE_EMOJIS_AND_STICKERS")) return  interaction.reply({content: ` • Você precisa ter a permissão de \`Gerenciar emojis\``}).then(() => {
      setTimeout(() => {
          interaction.deleteReply()
      }, 9000)})
  

  if(!interaction.guild.me.permissions.has("MANAGE_EMOJIS_AND_STICKERS")) return  interaction.reply({content: ` • Eu preciso ter a permissão de \`Gerenciar emojis\``}).then(() => {
    setTimeout(() => {
        interaction.deleteReply()
    }, 9000)})
	const emojii = interaction.options.getString('emoji')
    const name = interaction.options.getString('nome')

    const z =  Discord.Util.parseEmoji(emojii)
var emoji;
if(z.id == null) return interaction.reply({embeds: [{description: "Emoji inválido"}]})
if(z.id !== null) emoji = emojii
    if(emoji){


		let customemoji = Discord.Util.parseEmoji(emoji);
var nomeemoji;
if(!name) { nomeemoji = Discord.Util.parseEmoji(emoji).name } else {
if(name) nomeemoji = name.replace(/[^a-z0-9]/gi, "")
if(name.length > 32) return interaction.reply({embeds: [{description: "Nome pro Emoji Muito Longo"}]}).then(() => {
  setTimeout(() => {
      interaction.deleteReply()
  }, 9000)})
}

		if (customemoji.id) {
    if(customemoji.animated){ 
   const config = {NONE:50, TIER_1: 100, TIER_2: 150, TIER_3:250}
   const tcount = config[interaction.guild.premiumTier];
    let emojis = interaction.guild.emojis.cache.filter(emoji => emoji.animated).size 
 
  
    if(emojis >= tcount) return interaction.reply({embeds: [{description: ` • eu não consigo adicionar mais emojis ao seu servidor pois ele atingiu o limite de **${tcount}** emojis.`}]}).then(() => {
      setTimeout(() => {
          interaction.deleteReply()
      }, 9000)})
    const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${customemoji.animated ? 'gif' : 'png'}`;
		
		 interaction.guild.emojis.create(`${Link}`,`${nomeemoji}`).then((emoji) => {
     
			return interaction.reply({embeds: [{description: `${emoji} | Emoji adicionado no servidor.`}]});
    })
    }else{
   const config = {NONE:50, TIER_1: 100, TIER_2: 150, TIER_3:250}
   const tcount = config[interaction.guild.premiumTier];
    let emojis = interaction.guild.emojis.cache.filter(emoji => !emoji.animated).size 

    if(emojis >= tcount) return interaction.reply({embeds: [{description: ` • eu não consigo adicionar mais emojis ao seu servidor pois ele atingiu o limite de **${tcount}** emojis.`}]}).then(() => {
      setTimeout(() => {
          interaction.deleteReply()
      }, 9000)})
    const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${customemoji.animated ? 'gif' : 'png'}`;
		
			 interaction.guild.emojis.create(`${Link}`,`${nomeemoji}`).then((emoji) => {
    

   
			return interaction.reply({content: `${emoji} | Emoji adicionado no servidor.`}).then(() => {
        setTimeout(() => {
            interaction.deleteReply()
        }, 20000)})
     })
    }
			
			
		} else {
			let CheckEmoji = parse(emoji, { assetType: 'png' });
			if (!CheckEmoji[0]) return interaction.reply({content: `${emoji} | Emoji adicionado no servidor.`}).then(() => {
        setTimeout(() => {
            interaction.deleteReply()
        }, 20000)})

			interaction.reply({content: ` • Esse emoji já está no discord.`}).then(() => {
        setTimeout(() => {
            interaction.deleteReply()
        }, 9000)})
		}
  }else if(!emoji && !img){

    

 return interaction.reply({content:` • Não encontrei nenhum link ou imagem para adicionar o emoji`}).then(() => {
  setTimeout(() => {
      interaction.deleteReply()
  }, 9000)})



  }else{


    if(!emoji) return interaction.reply({content:` • Você esqueceu de botar um nome para o emoji.`});


if(img.size > 256000){

  return interaction.reply({content: ` • O arquivo é muito grande, adicione emojis de até **256kb**`});

}


  if(img.name.split('.')[1]=='gif'){ 
  const config = {NONE:50, TIER_1: 100, TIER_2: 150, TIER_3:250}
  const tcount = config[interaction.guild.premiumTier];
  let emojis = interaction.guild.emojis.cache.filter(emoji => emoji.animated).size 

  if(emojis >= tcount) return interaction.reply({content: ` • Eu não consigo adicionar mais emojis ao seu servidor pois ele atingiu o limite de **${tcount}** emojis.`});


interaction.guild.emojis.create(`${img.url}`,`${emoji}`).then((emoji) => {

  const Added = new Discord.interactionEmbed()
  
  
return interaction.reply({content: `${emoji} | Emoji adicionado no servidor.`});
  })
  }else if(img.name.split('.')[1]=='png'||img.name.split('.')[1]=='jpg'||img.name.split('.')[1]=='jpeg'){
  const config = {NONE:50, TIER_1: 100, TIER_2: 150, TIER_3:250}

  const tcount = config[interaction.guild.premiumTier];
  let emojis = interaction.guild.emojis.cache.filter(emoji => !emoji.animated).size 

  if(emojis >= tcount) return interaction.reply({content: ` • Eu não consigo adicionar mais emojis ao seu servidor pois ele atingiu o limite de **${tcount}** emojis.`});
 
interaction.guild.emojis.create(`${img.url}`,`${emoji}`).then((emoji) => {

return interaction.reply({content: `${emoji} | Emoji adicionado com sucesso no servidor.`});
   })
  }else{
  
  return interaction.reply({content: ` • Formato inválido.`});
  }

  }
  }
}