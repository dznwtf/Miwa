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
    name: 'namorada',
    description: '[🎉 Interações] Veja minha namorada !',
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'user',
            description: 'Sua web namorada',
            type: "USER",
            required: true,
        }
    ],
    run: async (client, interaction, args) => {
      await interaction.deferReply()

        const user = interaction.options.getUser("user");

        var avatar;
        if (!user) {
            avatar = "https://cdn.discordapp.com/attachments/784852925989126215/862127934332338176/unknown.png";
        } else {
            avatar = user.displayAvatarURL({ dynamic: true, format: 'png' });
        }

        const background = await Canvas.loadImage("https://media.discordapp.net/attachments/971878927691825173/976683371767926794/unknown.png?width=445&height=454");
        const avatarImg = await Canvas.loadImage(avatar);
        const canvas = Canvas.createCanvas(500, 510);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(avatarImg, 20, 170, 200, 200);

        const attachment = new MessageAttachment(canvas.toBuffer(), 'minha_namorada.png');
        await interaction.editReply({ files: [attachment] });
    }
}
