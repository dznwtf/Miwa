const { MessageEmbed } = require('discord.js');

module.exports = {
name: 'skinmc',
description: '[🎉 Interações] Jogue o jogo da cobrinha',
type: 'CHAT_INPUT',
options: [
    {
        name: 'nick',
        description: 'Nick do minecraft que deseja ver a skin',
        type: 'STRING',
        required: true,
    }
],

run: async (client, interaction, args) => {
    
    
   const user = interaction.options.getString("nick") || interaction.author
   const mensagem = interaction.options.getString("nick")
   
        if (!user) return interaction.reply("Adicione o nick do player que você deseja ver.")
      
     
    var url = `https://minotar.net/armor/body/${mensagem}/100.png`
      let embed = new MessageEmbed()
      .setAuthor(`Skin do Minecraft | ${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`${interaction.user}, a skin \`\`${mensagem}\`\` está logo abaixo.`)
        .setImage(url)
        .setColor(`#a5d7ff`)
      interaction.reply({embeds: [embed] });
}
} 