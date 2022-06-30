
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
var { MessageButton, MessageActionRow } = require(`discord.js`);
const Discord = require("discord.js");

module.exports = {
    name: 'avatar',
    description: '/ Pegue o Avatar de um Usuário',
    type: "CHAT_INPUT",
    options: [

      {

        name: 'avatar',
        description: '[🏠 Geral] puxa o avatar do usuário/servidor',
        type: 'SUB_COMMAND_GROUP'

      }, {
                  name: "server",
                  description: "[🏠 Geral] pegue o avatar do servidor",
                  type: 'SUB_COMMAND'
                  
                },
                {
                 name: 'sec',
                 description: "[🏠 Geral] pegue o avatar secundário do usuário",
                 type: 'SUB_COMMAND',
                 options: [{

                  name: 'membro',
                  description: 'mencione ou coloque o ID do usuário',
                  type: 'USER',
                  required: false


                 }] 

                },
                {
                  name: "user",
                  description: "pegue o avatar de um usuário",
                  type: 'SUB_COMMAND',
                  options: [{

                    name: 'usuário',
                    description: 'mencione ou coloque o ID do usuário',
                    type: 'USER',
                    required: false

                  }]
                }
      ],
      run: async(client, interaction) =>{

        if (interaction.options.getSubcommand() === 'server')  {
            let g1g = interaction.guild.iconURL({
              dynamic: true,
      
              size: 2048,
      
              format: "png"
            });
      
            if (g1g === null) g1g = "https://cdn.discordapp.com/embed/avatars/1.png";
      
            let embed = new Discord.MessageEmbed()
           
            .setTitle(`Avatar do servidor ${interaction.guild.name}`)
            .setImage(
           g1g
            )
            .setColor('a5d7ff')
            .setFooter({text:
              `Requisitado por: ${interaction.user.username}`,
              iconURL: interaction.user.displayAvatarURL()
            })
            .setTimestamp();
       var ba = new MessageButton()
       .setStyle(`LINK`)
       .setLabel(`Download`)
       .setEmoji(`📸`)
       .setURL(g1g)
               var rowa = new MessageActionRow().addComponents([ba]);
           
            await interaction.reply({embeds: [embed], components: [rowa]}).then(() => {
              setTimeout(() => {
                  interaction.deleteReply()
              }, 20000)})
          } else if(interaction.options.getSubcommand() === "user") {
       
          let user;
      
       user = await interaction.options.getUser("usuário")
      
          if (!user) user = interaction.user;
            
          let gg = user.displayAvatarURL({
            dynamic: true,
      
            size: 2048,
      
            format: "png"
          });
      
          if (gg === null) gg = "https://cdn.discordapp.com/embed/avatars/1.png";
      
          let g1g = user.displayAvatarURL({
            dynamic: true,
      
            size: 2048,
      
            format: "png"
          });
      
          if (g1g === null) g1g = "https://cdn.discordapp.com/embed/avatars/1.png";
      
            
            let IDS_OWNERS = ["971840597876957264", "480397841177772064"];
                var embeda = new Discord.MessageEmbed()
            .setAuthor({name: "Miwa Creator",
              iconURL: "https://cdn.discordapp.com/emojis/931388425565790228.gif"
        })
            .setTitle(`Avatar de ${user.username}`)
            .setImage(
              gg
            )
            .setColor("a5d7ff")
            .setFooter({ text:
              `Requisitado por: ${interaction.user.username}`,
              iconURL: interaction.user.displayAvatarURL()
            })
            .setTimestamp();
            let a = new MessageButton()
            .setStyle(`LINK`)
            .setLabel(`Download`)
            .setEmoji(`📸`)
            .setURL(gg)
        
            const row2 = new MessageActionRow()
			.addComponents(
			a
			);
    
          if (IDS_OWNERS.includes(user.id))
            return await interaction.reply({ components: [row2], embeds: [embeda]}).then(() => {
              setTimeout(() => {
                  interaction.deleteReply()
              }, 20000)})
            
       var embed = new Discord.MessageEmbed()
            .setTitle(`Avatar de ${user.username}`)
            .setImage(
              gg
            )
            .setColor(`a5d7ff`)
            .setFooter(
              { text: `Requisitado por: ${interaction.user.username}`,
              iconURL: interaction.user.displayAvatarURL({dynamic: true})}
            )
            .setTimestamp();
            const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
            .setStyle(`LINK`)
            .setLabel(`Download`)
            .setEmoji("📸")
            .setURL(gg)
			);
    
        
          await interaction.reply({ components: [row], embeds: [embed] }).then(() => {
            setTimeout(() => {
                interaction.deleteReply()
            }, 20000)})
            }  else if(interaction.options.getSubcommand() === "sec") {



let user;
      
user = await interaction.options.getUser("membro")
try {
   if (!user) user = interaction.user;
  const abc = await interaction.guild.members.fetch(user.id, {force: true})

   var gg = await client.guilds.cache.get(interaction.guild.id).members.fetch(user.id)
   if(gg === undefined) { gg = "sem avatar"} else {gg = abc.avatarURL({dynamic: true, format: 'png', size: 2048})}

   if(gg == null) return interaction.reply(`• O usuário **${user.username}** não possui um avatar no servidor.`).then(() => {
    setTimeout(() => {
        interaction.deleteReply()
    }, 9000)})
     
     let IDS_OWNERS = ["480397841177772064", "971840597876957264"];
         var embeda = new Discord.MessageEmbed()
     .setAuthor({name: "Losk Creator",
       iconURL: "https://cdn.discordapp.com/emojis/931388425565790228.gif"
 })
     .setTitle(`Avatar secundário de ${abc.user.username}`)
     .setImage(
       gg
     )
     .setreply("a5d7ff")
     .setFooter({ text:
       `Requisitado por: ${interaction.user.username}`,
       iconURL: interaction.user.displayAvatarURL()
     })
     .setTimestamp();
     let a = new MessageButton()
     .setStyle(`LINK`)
     .setLabel(`Download`)
     .setEmoji(`📸`)
     .setURL(gg)
 
     const row2 = new MessageActionRow()
.addComponents(
a
);

   if (IDS_OWNERS.includes(user.id))
     return await interaction.reply({ components: [row2], embeds: [embeda]}).then(() => {
      setTimeout(() => {
          interaction.deleteReply()
      }, 20000)})
     
var embed = new Discord.MessageEmbed()
     .setTitle(`Avatar secundário de ${abc.user.username}`)
     .setImage(
       gg
     )
     .setColor('a5d7ff')
     .setFooter(
       { name: `Requisitado por: ${interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL()}
     )
     .setTimestamp();
     const row = new MessageActionRow()
.addComponents(
 new MessageButton()
     .setStyle(`LINK`)
     .setLabel(`Download`)
     .setEmoji("📸")
     .setURL(gg)
);

 
   await interaction.reply({ components: [row], embeds: [embed] }).then(() => {
    setTimeout(() => {
        interaction.deleteReply()
    }, 20000)})
} catch {

interaction.reply({content: ` • não achei esse usuário no servidor`}).then(() => {
  setTimeout(() => {
      interaction.deleteReply()
  }, 9000)})

}


           //  console.log(a.displayAvatarURL({dynamic: true, format: 'png', size: 2048}))


            }
        }
        
    }