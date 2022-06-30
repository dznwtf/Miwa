const client = require("../../index");
const Discord = require("discord.js")
const config = require(`${process.cwd()}/structures/botconfig/config.json`);
const {
  MessageEmbed
} = require('discord.js');


client.on("guildCreate", async (guild) => {
    try {
        if (!guild || guild.available === false) return
        let theowner = "NO OWNER DATA! ID: ";
        await guild.fetchOwner().then(({ user }) => {
          theowner = user;
        }).catch(() => {})
  
        const channel = client.channels.cache.get(config.botlogs.inviteLogs);
        if (!channel) return;
        
        const embed = new MessageEmbed()
        .setTitle(`Fui Adicionada Em Um Servidor`)
        .addField(`Informações`,
        `>>> **Nome Do Servidor:** \`${guild.name}\`
**ID Do Servidor:** \`${guild.id}\`
**Nome Do Dono:** \`${theowner ? `${theowner.tag}` : `${theowner}`}\`
**Id Do Dono:** \`${theowner ? `${theowner.id}` : `${guild.ownerId}`}\`
**Membros:** \`${guild.memberCount}\``)
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .setColor("a5d7ff")
        .setFooter({text:`Estou Agora Em ${client.guilds.cache.size} Servidores!`})
        .setTimestamp();
        channel.send({embeds: [embed]}).catch(() => {})
      } catch (e) {
          console.log(e)
      }
});
