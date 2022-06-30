const Discord = require('discord.js')
const Canvas = require('canvas')

const { registerFont } = require('canvas')
registerFont('././Font.otf', { family: 'Uniform' })

module.exports = {
    name: "perfil",
    description: "[💸 Economia] Veja seu perfil ou de outro usuário",
    type: 'CHAT_INPUT',
    options: [
        {
         name: "user",
         description: "O usuário que deseja ver a atm.",
         type: 6,
         required: false
        },
        ],
        run: async (client, interaction) => {
           
        
                const user = interaction.options.getUser("user") || interaction.user
            
                const userdb = await client.userdb.findOne({
                     userID: user.id
                 }) || { economia: { marry: { casado: false }, banco: 0, money: 0, sobremim: "Use /sobremim para alterar este texto."}}
               
                interaction.reply({content: "Carregando perfil..."} )
                
               
                const canvas = Canvas.createCanvas(800, 530)
                const ctx = canvas.getContext("2d")
            
                const background = await Canvas.loadImage(userdb.economia.background)
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
            
                const layout = await Canvas.loadImage("https://i.imgur.com/2a1eiQf.png")
                ctx.drawImage(layout, 0, 0, canvas.width, canvas.height)
            
            ctx.font = '35px Uniform';
            ctx.fillStyle = '#F8F8F8';
            ctx.fillText(`${user.username}`, 352 - user.username.length * 7, 326)
            
            ctx.font = '20px Uniform';
            ctx.fillStyle = '#F8F8F8';      
            ctx.fillText(`${userdb.economia.sobremim.slice(0,64)}\n${userdb.economia.sobremim.slice(64,128)}\n${userdb.economia.sobremim.slice(128,192)}`, 36, 480)
                  
            ctx.font = '32px Uniform';
            ctx.fillStyle = '#F8F8F8';
            ctx.fillText(`Saldo: ${abreviar(userdb.economia.banco + userdb.economia.money)}`, 250, 393)
            
            ctx.save()
                  
            if(userdb.economia.marry.casado){
                const img = await Canvas.loadImage("https://i.imgur.com/CNtXRUc.png")
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
            
                const marryUser = await client.users.fetch(userdb.economia.marry.com)
            
            ctx.font = '20px Uniform';
              ctx.fillStyle = '#F8F8F8';
            ctx.fillText(`${marryUser.username}`, 675 - marryUser.username.length * 7.4, 346)
              
                const avatarUser = marryUser.avatarURL({ dynamic: true, format: "png", size: 1024 });
            
            ctx.beginPath();
                  ctx.arc(671, 287, 33, 0, Math.PI * 2, true);
                  ctx.closePath();
                  ctx.clip();
              
                const marryAvatar = await Canvas.loadImage(`${avatarUser}`)
               ctx.drawImage(marryAvatar, 631, 247, 82, 82)
            
            }
            
            ctx.restore()
                  
            ctx.beginPath();
                  ctx.arc(128, 297, 92, 0, Math.PI * 2, true);
                  ctx.closePath();
                  ctx.clip();
            
            const avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });
            
                const userAvatar = await Canvas.loadImage(`${avatar}`)
                ctx.drawImage(userAvatar, 31, 198, 192, 192)
                  
                    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'perfil.png')
                 interaction.editReply({content: null, files: [attachment] })        
            
            }
            }
            
            function abreviar(number, precision=2) {
              return number.toLocaleString('en-US', { notation: 'compact', maximumFractionDigits: precision })
            }