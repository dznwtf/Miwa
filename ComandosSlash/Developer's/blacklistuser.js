const Discord = require("discord.js")

module.exports = {
    name: "blacklist",
    description: "Colocar ou remover alguém da blacklist",
    type: "CHAT_INPUT",
    options: [
      
      {
        name: "ação",
        description: "Você deseja adicona-lo ou remove-lo na database?",
        type: 3,
        required: true,
        choices: [
          {
            name: "Adicionar",
            value: "add"
          },
          {
            name: "Remover",
            value: "remove"
          }
        ]
      },
      {
        name: "user",
        description: "Marque o usuário que deseja adicionar na database.",
        type: 6,
        required: false
      },
      {
        name: "userid",
        description: "Id do usuário que deseja adicionar na database.",
        type: 3,
        required: false
      },
      {
        name: "motivo",
        description: "Motivo do banimento",
        type: 3,
        required: false,
      }
    ],
    run: async (client, interaction) => {
    const id = interaction.options.getString("userid"),
    action = interaction.options.getString("ação"),
    motivo = interaction.options.getString("motivo") || "Sem motivo específicado.";
    
    const user = id ? await client.users.fetch(id).catch(e =>{}) : interaction.options.getUser("user")

    if(!["971840597876957264"].includes(interaction.user.id)) return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`👀 Calma ae amigo...`)
    .setColor("a5d7ff")
    .setDescription(`Você não faz parte da staff, portanto não pode usar este comando.`)
], ephemeral: true})
  
    if(!user) return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`👀 Calma ae amigo...`)
    .setColor("a5d7ff")
    .setDescription(`Não se esqueça de marcar alguém, ou indentificar a id do usuário.`)
], ephemeral: true})

    if(user.id == interaction.user.id) return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`👀 Calma ae amigo...`)
    .setColor("a5d7ff")
    .setDescription(`Por favor, não tente se colocar na blacklist.`)
], ephemeral: true})
  
       let userdb = await client.userdb.findOne({
    userID: user.id,
  });         
      if (!userdb) {
    const newSettings = new client.userdb({
      userID: user.id,
    });
    await newSettings.save()
    userdb = await client.userdb.findOne({ userID: user.id });
      }
      
if(action == "add"){
  if(userdb.blacklist.esta) return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`👀 Calma ae amigo...`)
    .setColor("a5d7ff")
    .setDescription(`O usuário \`${user.tag}\` já está listado na blacklist.`)
    .setFooter({ text: user.tag, iconURL: user.displayAvatarURL()})
], ephemeral: true})

 await client.userdb.updateOne({
   userID: user.id
       }, { $set:{
    "blacklist.esta": true,
    "blacklist.desde": Date.now(),
    "blacklist.motivo": motivo
       }
       })
  
return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`Ta na mão chefe!!`)
    .setColor("a5d7ff")
    .setDescription(`O usuário \`${user.tag}\` foi adicionado na blacklist.`)
    .setFooter({ text: user.tag, iconURL: user.displayAvatarURL()})
]})
}

if(action == "remove"){
 if(!userdb.blacklist.esta) return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`👀 Calma ae amigo...`)
    .setColor("a5d7ff")
    .setDescription(`O usuário \`${user.tag}\` ainda não está na database.`)
    .setFooter({ text: user.tag, iconURL: user.displayAvatarURL()})
], ephemeral: true})

 userdb.blacklist.esta = false; userdb.save();
  
return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`Ta na mão chefe!!`)
    .setColor("a5d7ff")
    .setDescription(`O usuário \`${user.tag}\` foi removido da blacklist.`)
    .setFooter({ text: user.tag, iconURL: user.displayAvatarURL()})
]})
}

    }
}