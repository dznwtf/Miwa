const { MessageButton, MessageActionRow } = require('discord.js');
const load = require('lodash');
const {
  Client,
  Message,
  MessageEmbed
} = require('discord.js');
const glob = require('glob');
module.exports = {
    name: 'serverlist',
    usage: '',
    description: '[ DEVELOPER ] ',
    category: "Owwww",
    cooldown: 0,
    userPermissions: "",
    botPermissions: "",
    ownerOnly: true,
    toggleOff: false,

    run: async (client, interaction, args) => {
        if (interaction.user.id !== "971840597876957264")  return interaction.reply(`somente meus criadores podem utilizar esse comando`)

    const serverlist = client.guilds.cache.map(
      (guild, i) => `\`[ • ]\` | ${guild.name} | \`[ ${guild.id} ]\` | \`[${guild.memberCount}]\``,
    );
    const mapping = load.chunk(serverlist, 10);
    const pages = mapping.map((s) => s.join('\n'));
    let page = 0;

    const embed2 = new MessageEmbed()
      .setColor(client.embedColor)
      .setDescription(pages[page])

      .setFooter({
        text: `Página ${page + 1}/${pages.length}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setTitle(`${interaction.client.user.username} ServerList`);

    const but1 = new MessageButton()
      .setCustomId('queue_cmd_but_1')
      .setEmoji('⏭️')
      .setStyle('PRIMARY');

    const but2 = new MessageButton()
      .setCustomId('queue_cmd_but_2')
      .setEmoji('⏮️')
      .setStyle('PRIMARY');

    const but3 = new MessageButton()
      .setCustomId('queue_cmd_but_3')
      .setEmoji('⏹️')
      .setStyle('DANGER');

    const row1 = new MessageActionRow().addComponents([but2, but3, but1]);

    const msg = await interaction.channel.send({
      embeds: [embed2],
      components: [row1],
    });

    const collector = interaction.channel.createMessageComponentCollector({
      filter: (b) => {
        if (b.user.id === interaction.user.id) return true;
        else {
          b.reply({
            ephemeral: true,
            content: `Apenas **${interaction.user.tag}** Pode Usar Esse Comando`,
          });
          return false;
        }
      },
      time: 60000 * 5,
      idle: 30e3,
    });

    collector.on('collect', async (button) => {
      if (button.customId === 'queue_cmd_but_1') {
        await button.deferUpdate().catch(() => {});
        page = page + 1 < pages.length ? ++page : 0;

        const embed3 = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(pages[page])

          .setFooter({
            text: `Página ${page + 1}/${pages.length}`,
            iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
          })
          .setTitle(`${interaction.client.user.username} ServerList`);

        await msg.edit({
          embeds: [embed3],
          components: [row1],
        });
      } else if (button.customId === 'queue_cmd_but_2') {
        await button.deferUpdate().catch(() => {});
        page = page > 0 ? --page : pages.length - 1;

        const embed4 = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(pages[page])

          .setFooter({
            text: `Página ${page + 1}/${pages.length}`,
            iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
          })
          .setTitle(`${interaction.client.user.username} ServerList`);

        await msg
          .edit({
            embeds: [embed4],
            components: [row1],
          })
          .catch(() => {});
      } else if (button.customId === 'queue_cmd_but_3') {
        await button.deferUpdate().catch(() => {});
        collector.stop();
      } else return;
    });

    collector.on('end', async () => {
      await msg.edit({
        components: [],
      });
    });
  },
};