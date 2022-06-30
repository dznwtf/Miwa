const Discord = require("discord.js")
const moment = require('moment')
moment.locale('pt-BR')
const config = require(`${process.cwd()}/structures/botconfig/config.json`);
const {
  Client,
  CommandInteraction,
  MessageEmbed
} = require("discord.js");

module.exports = {
    name: "serverinfo",
    usage: '',
    description: "[🔎 Utilidades] Veja as informações sobre o Servidor",
    category: "Utilidades",
    cooldown: 5,
    userPermissions: "",
    botPermissions: "",
    ownerOnly: false,
    toggleOff: false,
  
    run: async(client, interaction) =>{

        let server = interaction.guild;

        function nivel() {
            let quantia = server.premiumSubscriptionCount
            if (quantia < 2) {
                return 'Nível 1'
            } else if (quantia > 2 && quantia < 6) {
                return 'Nível 2'
            } else {
                return 'Nível 3'
            }
        }
        
        const retorno = new Discord.MessageEmbed()
        .setColor("a5d7ff")
        .setTitle(server.name)
        .setThumbnail(server.iconURL({ dynamic: true}))
        .addField('**<:coroa:976145410169122866> Dono:**', `<@${interaction.guild.ownerId}> (\`${interaction.guild.ownerId}\`)`, true)
        .addField('**<:join:976926801106456627> Entrei em:**', `\`${moment(server.joinedAt).format('LLL')}\`\n**(${moment(server.joinedAt).fromNow()})**`, true)
        .addField('**<:date:976148256486723604> Criado em:**', `\`${moment(server.createdAt).format('LLL')}\`\n**(${moment(server.createdAt).startOf('day').fromNow()})**`, true)
        .addField('**<:computer:976146720901709844> ID do servidor:**', `\`${server.id}\``, true)
        .addField('**<:rocket:976146932185571358> Boost:**', `\`${server.premiumSubscriptionCount} Impulsos\`\n**(${nivel()})**`, true)
        .addField('**<:members:975963574193233922> Membros:**', `\`${server.memberCount} Membros\``, true)
        .setFooter({ text: 'Saylor', iconURL: interaction.member.displayAvatarURL({ dynamic: true, size: 1024 }) })
        .setTimestamp(new Date())
        
        interaction.reply({embeds: [retorno]}).then(() => {
            setTimeout(() => {
                interaction.deleteReply()
            }, 25000)})
               }
            }