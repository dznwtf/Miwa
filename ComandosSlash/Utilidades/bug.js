const config = require(`${process.cwd()}/structures/botconfig/config.json`);
const {
  Client,
  CommandInteraction,
  MessageEmbed
} = require('discord.js');

module.exports = {
    name: "bug",
    usage: '',
    description: "[🔎 Utilidades] Reporte um Bug aos Desenvolvedores",
    category: "Utilidades",
    cooldown: 0,
    userPermissions: "",
    botPermissions: "",
    ownerOnly: false,
    toggleOff: false,
    options: [
        {
            name: 'bug',
            description: 'Bug a ser Relatado',
            type: 'STRING',
            required: true,
        }
    ],

    run: async(client, interaction) =>{
        const bug = interaction.options.getString('bug')
        const developerGuild = interaction.client.guilds.cache.get(config.botlogs.errorLogsChannel)
        const bugReportChannel = client.channels.cache.get(config.botlogs.bugChannel)
    
        const embed = new MessageEmbed()
          .setAuthor({ name: 'Relatório de bug recebido', iconURL: interaction.member.user.displayAvatarURL() })
          .setTitle(`Por \`${interaction.member.user.tag}\` em \`${interaction.guild.name}\``)
          .setDescription(bug)
          .setFooter({ text: 'Miwa', iconURL: interaction.client.user.displayAvatarURL() })
          .setColor('a5d7ff')
    
        bugReportChannel?.send({ embeds: [embed] })
    
        interaction.reply({
            embeds: [new MessageEmbed()
                .setColor('a5d7ff')
                .setTimestamp()
                .setTitle(`Seu Relátorio de Bug Foi Enviado Aos Desenvolvedores `)], ephemeral: true})

  }} 
            