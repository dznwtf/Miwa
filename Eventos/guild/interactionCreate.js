const client = require("../../index");
const Discord = require("discord.js")
const config = require(`${process.cwd()}/structures/botconfig/config.json`);
const {
	Client,
	CommandInteraction,
	MessageEmbed
} = require("discord.js");
client.on("interactionCreate", async (interaction) => {
  
  
  if (interaction.isCommand()) {

    const cmd = client.slashCommands.get(interaction.commandName);
    const command = client.slashCommands.get(interaction.commandName);

    if (!cmd) return interaction.reply(`Ocorreu algum erro amigo.`);
    
    interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

    const userdb = await client.userdb.findOne({ userID: interaction.user.id }) || { blacklist:{ esta: false} }
    
    if(userdb.blacklist.esta){ 
  const calc = ms(Date.now() - userdb.blacklist.desde)
    
  return interaction.reply({embeds: [new Discord.MessageEmbed()
    .setTitle(`👀 Calma ae amigo...`)
    .setColor("a5d7ff")
    .setDescription(`> Você não pode usar meus comandos, pois está listado na blacklist.
*__Pelo motivo:__* \`${userdb.blacklist.motivo}\`
*__Ah:__* \`${calc.days} dias, ${calc.hours} horas e ${calc.minutes} minutos.\``)
], ephemeral: true})
        }
        
      cmd.run(client, interaction)
    
      const commandLogsChannel = client.channels.cache.get(config.botlogs.commandLogsChannel);
      if (!commandLogsChannel) return;
  commandLogsChannel.send({
      embeds: [new MessageEmbed()
          .setColor("a5d7ff")
          .setAuthor({name:`${interaction.guild.name}`})
          .setTitle(`<:tools:976152669423042580> | Comando em Slash`)
          .addField("**<:seta:974421767584092210> Autor**", `\`\`\`${interaction.user.tag}\`\`\``)
          .addField("**<:seta:974421767584092210> Nome do Comando**", `\`\`\`${command.name}\`\`\``)
.addField("**<:seta:974421767584092210> Servidor**", `\`\`\`${interaction.guild.name}\`\`\``)
.addField("**<:seta:974421767584092210> ID Do Servidor**", `\`\`\`${interaction.guild.id}\`\`\``)
      ]
  });
}
}


  

);

function ms(ms) {
  const seconds = ~~(ms/1000)
  const minutes = ~~(seconds/60)
  const hours = ~~(minutes/60)
  const days = ~~(hours/24)

  return { days, hours: hours%24, minutes: minutes%60, seconds: seconds%60 }
}