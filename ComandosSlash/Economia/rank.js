const Discord = require("discord.js");

module.exports = {
    name: "rank",
    description: "[💸 Economia] Veja o Rank dos mais ricos",
    type: 'CHAT_INPUT',
    run: async (client, interaction) => {
     
     let userdb = await client.userdb.find({})
      userdb.sort((a,b) => (b.economia.money + b.economia.banco) - (a.economia.money + a.economia.banco))
      
      userdb = userdb.slice(0,10)
      let zz = userdb.map(a => a.userID)
let macaco = []
var money = []
let gostoso = userdb.map((user, i) => abreviar(user.economia.money + user.economia.banco)) 
for (let i = 0; i < zz.length; i++) {

   let zf = await client.users.fetch(zz[i])
  
   macaco.push(zf.tag)

}
     
      
     interaction.reply({embeds: [new Discord.MessageEmbed()
     .setTitle(`<:mundo:975963321146687509> | Rank dos mais ricos da Miwa !`)
     .setColor("a5d7ff")
     .setDescription(`> ${gostoso.map((a, i) => `[**${i+1}**] - **${macaco[i]}** | (<:dinheiro:975939369460441108> **${gostoso[i]}**)`).join('\n> ')}`)
          ]})

    }
}

 function abreviar(number, precision=2) {
  return number.toLocaleString('en-US', { notation: 'compact', maximumFractionDigits: precision })
 }