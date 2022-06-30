const config = require(`${process.cwd()}/structures/botconfig/config.json`);
const { Client, CommandInteraction, MessageEmbed, Message } = require('discord.js');
const { addAbortSignal } = require('snekfetch');
var { MessageButton, MessageActionRow } = require(`discord.js`);

module.exports = {
    name: 'banner',
    description: 'Pegue o Banner de um Usuário',
    category: "[🏠 Geral] Geral",
    options: [
        {
            name: "usuário",
            description: "Escolha um usuário para ver o banner",
            type: "USER"
        }],
   
        run: async(client, interaction) =>{

        const bannerUser = interaction.options.getUser("usuário") || interaction.user;
        const a = await  client.users.fetch(bannerUser.id, {force: true})
		if(!a) return interaction.reply({embeds: [{description: "Usuário não encontrado", color: "RED"}]}).then(() => {
            setTimeout(() => {
                interaction.deleteReply()
            }, 9000)})
		//console.log(a)
        if(!a.banner) return interaction.reply({embeds: [{description: "Esse usuário não tem um banner", color: "RED"}]}).then(() => {
            setTimeout(() => {
                interaction.deleteReply()
            }, 9000)})
        const banner = a.bannerURL({dynamic: true, size: 2048, format: 'png'});
       let IDS_OWNERS = ['971840597876957264', '480397841177772064']
        
       const embeda = new MessageEmbed()
       .setAuthor({
           name: 'Miwa Creator',
           iconURL: "https://cdn.discordapp.com/emojis/931388425565790228.gif"
       })
       .setImage(banner)
       .setColor("a5d7ff")

       let ab = new MessageButton()
       .setStyle(`LINK`)
       .setLabel(`Download`)
       .setEmoji(`📸`)
       .setURL(banner)
 
       let row = new MessageActionRow().addComponents([ab])

       if (IDS_OWNERS.includes(a.id))
        return await interaction.reply({ components: [row], embeds: [embeda]}).then(() => {
            setTimeout(() => {
                interaction.deleteReply()
            }, 20000)})
        
        const embed = new MessageEmbed()
			.setAuthor({name: `Banner de ${a.username}`, iconURL: client.user.displayAvatarURL({dynamic: true})
            })
			.setImage(banner)
			.setColor('a5d7ff');
		interaction.reply({embeds: [embed], components: [row]}).then(() => {
            setTimeout(() => {
                interaction.deleteReply()
            }, 20000)})

    }
}