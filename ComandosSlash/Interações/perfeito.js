const Canvas = require('canvas')
const {
    Client,
    Message,
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
    MessageButton,
    MessageAttachment
  } = require('discord.js');
  const {CommandInteraction} = require('discord.js');
const { Discord } = require('discord.js')
module.exports = {
    name: 'perfeito',
    description: '[🎉 Interações] Quando dizem que nada é perfeito...',
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'user',
            description: 'Usuário para aparecer na imagem',
            type: "USER",
            required: true,
        }
    ],
    run: async (client, interaction, args) => {
      await interaction.deferReply()
      
        const user = interaction.options.getUser("user");
        const canvas = Canvas.createCanvas(467, 400);
        const ctx = canvas.getContext("2d");

        let avatar;
        if (!user) {
            avatar = this.client.user.displayAvatarURL({ format: "png", size: 1024 });
        } else {
            avatar = user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })
        }

        const background = await Canvas.loadImage('https://media.discordapp.net/attachments/971878927691825173/976684709436358686/unknown.png');
        ctx.drawImage(background, 0, 0, 467, 400);

        const userAvatar = await Canvas.loadImage(avatar);
        ctx.drawImage(userAvatar, 400 - 177, 30 + 20, 400 - 178, 400 - 179)

        const attachment = new MessageAttachment(canvas.toBuffer(), 'pf.png');

        await interaction.editReply({ files: [attachment] });
    }
}