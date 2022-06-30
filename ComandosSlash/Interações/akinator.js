const akinator = require("discord.js-akinator")

const {
  Client,
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
  MessageButton
} = require('discord.js');
const {CommandInteraction} = require('discord.js');
const { Discord } = require('discord.js')
module.exports = {
  name: "akinator",
  description: "[🎉 Interações] Jogue Akinator No Seu Servidor ",
  category: "Interações",
  cooldown: 2,
  userPermissions: "",
  botPermissions: "",
  ownerOnly: false,
  toggleOff: false,
  type: 'CHAT_INPUT',
  
  run: async (client, interaction, args) => {

    const language = "pt"; 
    const childMode = false; 
    const gameType = "character"; 
    const useButtons = true; 
    const embedColor = "#a5d7ff"; 

    akinator(interaction, {
        language: language, 
        childMode: childMode, 
        gameType: gameType, 
        useButtons: useButtons, 
        embedColor: embedColor 
    })
}
};