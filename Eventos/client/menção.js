const client = require("../../index");
const Discord = require("discord.js")

client.on("messageCreate", message => {

 if (message.content.toLowerCase().includes('971840597876957264')) {
        return message.react('976525579350315078');
        }

    if (message.content.toLowerCase().includes('480397841177772064')) {
            return message.react('976525810603270225');
            }

});