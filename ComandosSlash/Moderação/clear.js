const Discord = require('discord.js')
const { MessageEmbed, CommandInteraction } = require("discord.js");
const config = require(`${process.cwd()}/structures/botconfig/config.json`);
module.exports = {
    name: 'clear',
    description: '[🛠️ Moderação] Limpe As Mensagens De Um Chat.',
    category: "Moderação",
    cooldown: 5,
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'quantidade',
            description: 'Número de mensagens para serem apagadas 1-99',
            type: 'NUMBER',
            required: true,
        }
    ],
    run: async(client, interaction) =>{

        let numero = interaction.options.getNumber('quantidade')

        if  (!interaction.member.permissions.has("MANAGE_MESSAGES")) {
           
            return interaction.reply(`${interaction.user} **Voce não possui permissão para esse comando.**`);
        } else
         if (!interaction.guild.me.permissions.has("MANAGE_MESSAGES")) {
            return interaction.reply(`${interaction.user} **Eu não tenho permissões de limpar mensagens.**`);
            
        
         } else
        if (parseInt(numero) > 99 || parseInt(numero) <= 0) {
            return interaction.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setDescription(`> **Digite uma quantidade de** \`1 - 99\`**.**`)
                    .setColor('a5d7ff')
                ], ephemeral: true
            })
        } 
        else {

        interaction.channel.bulkDelete(parseInt(numero))

        let embed = new Discord.MessageEmbed()
            .setDescription(`> <:recycle:976154592297517136> Limpeza concluida`)
            .setTimestamp()
            .setFooter({ text: `Limpado por: ${interaction.member.user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) }) //utilizar npm i discord.js@latest
            .setColor('a5d7ff')

        interaction.reply({ embeds: [embed] }).then(() => {
            setTimeout(() => {
                interaction.deleteReply()
            }, 5000)
        })

    }

    }
}