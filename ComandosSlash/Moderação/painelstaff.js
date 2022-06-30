const Discord = require("discord.js")
const {
    MessageButton,
    MessageActionRow,
    ButtonCollector
} = require("discord.js");

module.exports = {
    name: "painelstaff",
    description: "[🛠️ Moderação] Utilizado Por Staffs Em Evento.",
    category: "Moderação",
    type: 'CHAT_INPUT',
    cooldown: 0,
    userPermissions: "MODERATE_MEMBERS",
    botPermissions: "",
    ownerOnly: false,
    toggleOff: false,
    run: async(client, interaction) =>{

        if (!interaction.guild.me.permissions.has("ADMINISTRATOR")) return interaction.reply(`<a:red_exclamacao:974042663336685618> • ${interaction.user} não possuo permissão de \`ADMINISTRADOR\``)
        if (interaction.user.id !== "971840597876957264" && !interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply(`<a:red_exclamacao:974042663336685618> • ${interaction.user} você não possui permissão de \`ADMINISTRATOR\``)


        const aaa = interaction.member.voice.channel
        if (!aaa) return interaction.reply(`<a:red_exclamacao:974042663336685618> • ${interaction.user} você precisa estar em um canal de voz.`)
        var canal;
        canal = aaa.members.size
        if (canal == 1) canal = "só tem você"
        const butao = new Discord.MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setStyle("SECONDARY")
                    .setLabel(`Mutar todos do canal de voz.`)
                    .setCustomId("mutarallkk")
                    .setEmoji("🔇"),
                new MessageButton()
                    .setStyle("SECONDARY")
                    .setLabel(`Desmutar todos do canal de voz.`)
                    .setCustomId("desmuteallkk")
                    .setEmoji("🔊"),
                new MessageButton()
                    .setStyle("SECONDARY")
                    .setLabel(`Desconectar todos do canal de voz.`)
                    .setCustomId("desconectallkk")
                    .setEmoji("🚪"),
                new MessageButton()
                    .setStyle("SECONDARY")
                    .setLabel(`Ensurdecer todos do canal de voz.`)
                    .setCustomId("ensurdecerkk")
                    .setEmoji("📣")
            )
        const embedconfig = new Discord.MessageEmbed()
            .setAuthor(`Painel Staff | ${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`> Aqui está meu painel staff\n\nVersão: \`0.0.1a\``)
            .addField("Informações do canal:", `Nome: ${aaa}\nQuantidade de usuários na call: \`${canal}\``)
            .setColor("#a5d7ff")
            .setFooter(`Requisitado por: ${interaction.user.username}`, interaction.user.displayAvatarURL({ dynamic: true }))

        const so1 = `<a:red_exclamacao:974042663336685618>   • ${interaction.user}, Só tem você na call.`
        const sn = `<a:red_exclamacao:974042663336685618> • ${interaction.user}, a call está vazia.`
        interaction.reply({ embeds: [embedconfig], fetchReply: true, components: [butao] }).then(async msg => {
            const collector = msg.createMessageComponentCollector({ idle: 1000 * 60 * 10 });


            collector.on('collect', async b => {
                b.deferUpdate()

                if (b.user.id !== interaction.user.id) return interaction.editReply({
                    embeds: [new Discord.MessageEmbed()

                        .setColor("e86875")
                        .setDescription(`Tá bobo é ${interaction.user}?`)
                    ], ephemeral: true
                })

                if (b.customId == "mutarallkk") {


                    const members = aaa.members
                    if (aaa.members.size == 1) return interaction.editReply({ content: so1, embeds: [], components: [] })
                    if (aaa.members.size < 1) return interaction.editReply({ content: sn, embeds: [], components: [] })
                    members.forEach(member => {
                        if (member.id === interaction.user.id) return;
                        member.voice.setMute(true)

                    });

                    const embedmute = new Discord.MessageEmbed()
                        .setAuthor("Painel staff", client.user.displayAvatarURL({ dynamic: true }))
                        .setDescription(`> Todos os usuários do canal ${aaa} foram mutados.`)
                        .setColor("#c219d8")
                        .setFooter(`Requisitado por: ${interaction.user.username}`, interaction.user.displayAvatarURL({ dynamic: true }))

                    interaction.editReply({ embeds: [embedmute], components: [] })


                } else if (b.customId == "desconectallkk") {

                    if (aaa.members.size == 1) return interaction.editReply({ content: so1, embeds: [], components: [] })
                    if (aaa.members.size < 1) return interaction.editReply({ content: sn, embeds: [], components: [] })
                    interaction.guild.channels.cache.get(aaa.id).members.each((member) => {
                        if (member.id === interaction.user.id) return;
                        member.voice.disconnect();
                    });
                    const embeddc = new Discord.MessageEmbed()
                        .setAuthor("Painel Staff | Opções", client.user.displayAvatarURL({ dynamic: true }))
                        .setDescription(`> todos os usuários da call ${aaa} foram desconectados`)
                        .setColor("#a5d7ff")
                        .setFooter(`Requisitado por: ${interaction.user.username}`, interaction.user.displayAvatarURL({ dynamic: true }))

                    interaction.editReply({ embeds: [embeddc], components: [] })


                    let msgkk;
                    let mainMsg = interaction.editReply({ embeds: [embedcanalkk], components: [] });
                    let error = false;
                    await interaction.channel.awaitMessages((m) => m.author.id === interaction.user.id, { max: 1, time: 30000, errors: ["time"], }).then(async (collected) => {
                        msgkk = collected.first()
                        collected.first().delete()
                        let namechannel = await interaction.guilds.channels.cache.find(c => c.id === msgkk.content && c.type === "voice");
                        //    console.log(categoria)
                        if (isNaN(msgkk.content)) return interaction.editReply(`<a:red_exclamacao:974042663336685618>• ${interaction.user}, apenas um ID.`)
                        if (!namechannel) return interaction.editReply(`<a:red_exclamacao:974042663336685618>• ${interaction.user}, esse canal não corresponde a um canal de voz do servidor.`)
                        const alterarnome = new Discord.MessageEmbed()
                            .setAuthor("Painel staff", client.user.displayAvatarURL({ dynamic: true }))
                            .setDescription(`> Todos os usuários movidos para o canal \`${namechannel.name}\``)
                            .setColor("#a5d7ff")
                            .setFooter(`Requisitado por: ${interaction.user.username}`, interaction.user.displayAvatarURL({ dynamic: true }))
                        // const abc = interaction.guilds.channels.cache.get(msg.content)
                        interaction.guilds.channels.cache.get(aaa.id).members.each((member) => {
                            member.voice.setChannel(namechannel.id);

                        });

                        interaction.editReply(alterarnome)
                    })


                } else if (b.customId == "desmuteallkk") {


                    const members = aaa.members
                    if (aaa.members.size == 1) return interaction.editReply({ content: so1, embeds: [], components: [] })
                    if (aaa.members.size < 1) return interaction.editReply({ content: sn, embeds: [], components: [] })
                    members.forEach(member => {
                        member.voice.setMute(false)
                        member.voice.setDeaf(false)

                    });

                    const embedunmute = new Discord.MessageEmbed()
                        .setAuthor("Painel staff", client.user.displayAvatarURL({ dynamic: true }))
                        .setDescription(`> Todos os usuários do canal ${aaa} foram desmutados.`)
                        .setColor("#a5d7ff")
                        .setFooter(`Requisitado por: ${interaction.user.username}`, interaction.user.displayAvatarURL({ dynamic: true }))

                    interaction.editReply(embedunmute)



                } else if (b.customId == "ensurdecerkk") {


                    const members = aaa.members
                    if (aaa.members.size == 1) return interaction.editReply({ content: so1, embeds: [], components: [] })
                    if (aaa.members.size < 1) return interaction.editReply({ content: sn, embeds: [], components: [] })
                    members.forEach(member => {
                        if (member.id === interaction.user.id) return;
                        member.voice.setDeaf(true)
                    });

                    const embedmute = new Discord.MessageEmbed()
                        .setAuthor("Painel staff", client.user.displayAvatarURL({ dynamic: true }))
                        .setDescription(`> Todos os usuários do canal ${aaa} foram ensurdecidos.`)
                        .setColor("#a5d7ff")
                        .setFooter(`Requisitado por: ${interaction.user.username}`, interaction.user.displayAvatarURL({ dynamic: true }))

                    interaction.reply({ embeds: [embedmute], components: [] })


                }
            })
        })
    }
}