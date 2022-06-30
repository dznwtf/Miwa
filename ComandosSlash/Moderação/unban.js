const { MessageEmbed, CommandInteraction } = require("discord.js");
const config = require(`${process.cwd()}/structures/botconfig/config.json`);
const db = require("quick.db")
module.exports = {
    name: "unban",
    description: "[🛠️ Moderação] Desbana um Usuário do Seu Servidor",
    category: "Moderação",
    cooldown: 2,
    userPermissions: "MODERATE_MEMBERS",
    botPermissions: "",
    ownerOnly: false,
    toggleOff: false,
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'usuário',
            description: 'ID do Usuário a ser Desbanido',
            type: 'STRING',
            required: true,
        }
    ],

    run: async(client, interaction) =>{
        if (!interaction.guild) return interaction.reply({ content: "Esse comando deve ser usado somente em um server" }).then(() => {
            setTimeout(() => {
                interaction.deleteReply()
            }, 9000)})
        let user = interaction.options.getString("usuário");
    
    
        
        if(user.id == interaction.user.id) return interaction.reply({content: `Você não pode se desbanir!`}).then(() => {
            setTimeout(() => {
                interaction.deleteReply()
            }, 9000)})
    if(user.id == interaction.guild.me.id) return interaction.reply({content: `Você não pode me desbanir!`}).then(() => {
        setTimeout(() => {
            interaction.deleteReply()
        }, 9000)})
    if(user.id == interaction.guild.ownerId) return  interaction.reply({content: `Você não pode desbanir o dono do server!`}).then(() => {
        setTimeout(() => {
            interaction.deleteReply()
        }, 9000)})
    
    if(!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.reply({content: `Você não tem permissões para isso!`}).then(() => {
        setTimeout(() => {
            interaction.deleteReply()
        }, 9000)})
    if(!interaction.guild.me.permissions.has("BAN_MEMBERS")) return interaction.reply({content: `Eu não tenho permissões para isso!`}).then(() => {
        setTimeout(() => {
            interaction.deleteReply()
        }, 9000)})
    
           const b = await interaction.guild.bans.fetch()
        const member = b.find((x) => x.user.id === user || x.user.tag === user || x.user.username === user)
        
        if(!member) return interaction.reply({embeds: [{description: `Esse usuário não está banido`, COLOR: "a5d7ff"}]}).then(() => {
            setTimeout(() => {
                interaction.deleteReply()
            }, 9000)})
    interaction.reply({embeds: [{description: `${member.user} Foi desbanido !`}]}).then(() => {
        setTimeout(() => {
            interaction.deleteReply()
        }, 12000)})
      await interaction
    .guild.bans.remove(member.user.id)
    
    
    
    
    }
    }