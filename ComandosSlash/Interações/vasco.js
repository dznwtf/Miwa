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
    name: 'vasco',
    description: '[🎉 Interações] Faça alguém participar do vasco !',
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'user',
            description: 'O Usuário que vai ser do vasco.',
            type: "USER",
            required: true,
        }
    ],
    run: async (client, interaction, args) => {
      await interaction.deferReply()


        const vasco = await Canvas.loadImage("https://cdn.discordapp.com/attachments/944770979060650014/947296868977762314/44e07dcf1a217dca8e8ec73a41dab0143f66f286e153524cd9340d1ca4bd746d_1.png");
        const canvas = Canvas.createCanvas(vasco.width, vasco.height);
        const ctx = canvas.getContext("2d");

        const user = interaction.options.getUser("user") || interaction.user;
        const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: "png", size: 512 }))

        ctx.drawImage(vasco, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(avatar, 50, 75, 200, 200);

        ctx.font = "bold 30px sans-serif";
        ctx.fillStyle = "white";
        ctx.fillText(user.username, 270, 200);
        const attachment = new MessageAttachment(canvas.toBuffer(), 'vasco.png') 
        await interaction.editReply({ files: [attachment]})
        if (user === client.user) {
            interaction.editReply({ content: 'Isso afeta o Vasco?', files: [new MessageAttachment('https://cdn.discordapp.com/attachments/948014291863359520/948231838118334474/y2mate.com_-_HINO_DO_VASCO_DA_GAMA.mp3', 'vasco.mp3')], ephemeral: true });
        }
    }
}