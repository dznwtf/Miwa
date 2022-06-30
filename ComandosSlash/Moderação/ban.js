
const Discord = require("discord.js");

module.exports = {
    name: "ban",
    description: "[🛠️ Moderação] Dê um banimento em algum membro do servidor",
    type: 1,
    options: [
        {
            name: "membro",
            type: 6,
            description: "Seleciona o membro que deseja banir.",
            required: true

        },
        {
            name: "motivo",
            type: 3,
            description: "Seleciona o motivo do banimento desse usuario.",
            required: false

        },
    ],

    run: async (client, interaction) => {

     const usuario = interaction.options.getUser("membro");

     const member = interaction.guild.members.cache.get(usuario.id)

     let rr = interaction.options.getString("motivo"); 
     
     if (rr == null) rr = 'Você não inseriu um motivo.';

     if(usuario.id == interaction.user.id) return interaction.reply({embeds: [new Discord.MessageEmbed()
        .setColor("#a5d7ff")
        .setDescription(`Opa! ${interaction.user}, Você não pode se banir!`)
        .setFooter({ text: `${interaction.member.user.tag}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true, size: 1024 }) })
        .setTimestamp(new Date())
    ], ephemeral: true})

     if(usuario.id == interaction.guild.me.id) return interaction.reply({embeds: [new Discord.MessageEmbed()
        .setColor("#a5d7ff")
        .setDescription(`Opa! ${interaction.user}, Você não pode me banir!`)
        .setFooter({ text: `${interaction.member.user.tag}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true, size: 1024 }) })
        .setTimestamp(new Date())
    ], ephemeral: true})

     if(usuario.id == interaction.guild.ownerId) return interaction.reply({embeds: [new Discord.MessageEmbed()
        .setColor("#a5d7ff")
        .setDescription(`Opa! ${interaction.user}, Você não pode banir o dono do server!`)
        .setFooter({ text: `${interaction.member.user.tag}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true, size: 1024 }) })
        .setTimestamp(new Date())
    ], ephemeral: true})

        if (!interaction.member.permissions.has("BAN_MEMBERS")) {
            return interaction.reply({embeds: [new Discord.MessageEmbed()
                .setColor("#a5d7ff")
                .setDescription(`Opa! ${interaction.user}, Você não possui permissão para esse comando!`)
                .setFooter({ text: `${interaction.member.user.tag}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true, size: 1024 }) })
                .setTimestamp(new Date())
            ], ephemeral: true})

        } else if (!interaction.guild.me.permissions.has("BAN_MEMBERS")) {
            return interaction.reply({embeds: [new Discord.MessageEmbed()
                .setColor("#a5d7ff")
                .setDescription(`Opa! ${interaction.user}, Eu não tenho permissões de Banir Membros!`)
                .setFooter({ text: `${interaction.member.user.tag}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true, size: 1024 }) })
                .setTimestamp(new Date())
            ], ephemeral: true})

        } else if (interaction.guild.me.roles.highest.position <= member.roles.highest.position) {

            return interaction.reply({embeds: [new Discord.MessageEmbed()
                .setColor("#a5d7ff")
                .setDescription(`Opa! ${interaction.user}, O membro mencionado tem um cargo maior ou igual o meu!`)
                .setFooter({ text: `${interaction.member.user.tag}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true, size: 1024 }) })
                .setTimestamp(new Date())
            ], ephemeral: true})

        } else {

            if (!usuario) {
                return interaction.reply({embeds: [new Discord.MessageEmbed()
                    .setColor("#a5d7ff")
                    .setDescription(`<:warn:976158231875440710> | Esse usuario não está no servidor!`)
                    .setFooter({ text: `${interaction.member.user.tag}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true, size: 1024 }) })
                    .setTimestamp(new Date())
                ], ephemeral: true})

            } else {

 let userdb = await client.userdb.findOne({
    userID: interaction.user.id
})
 
if(!userdb) userdb = await new client.userdb({ userID: interaction.user.id }).save();

 await client.userdb.updateOne({
    userID: interaction.user.id
}, { $set: {
    "economia.banimentos": userdb.economia.banimentos + 1,
}})


     let banidos = await client.userdb.findOne({
         userID: interaction.user.id
     }) || { economia: { banimentos: 0}}

     const { banimentos } = banidos.economia;

    let punição = new Discord.MessageEmbed()
                    .setThumbnail(interaction.user.displayAvatarURL({ format: "png" }))
                    .setFooter({ text: `${interaction.user.username} Já baniu ${banimentos} usuários`, iconURL: interaction.user.displayAvatarURL()})
                    .setTimestamp(new Date())
                    .setDescription(`**<:warn:976158231875440710> | Sistema de Punições - ${interaction.client.user.username}**`)
                    .setColor("a5d7ff")
                    .addFields(
                        {
                            name: `<:warn:976158231875440710> | Usuário banido:`,
                            value: `⠀<:members:975963574193233922> | **Tag:** \`${usuario.tag}\`\n⠀<:discord:976144538974453802> | **ID:** \`${usuario.id}\``,
                            inline: false
                        },
                        {
                            name: `<:tools:976152669423042580> | Autor do banimento:`,
                            value: `⠀<:hammer:976158568770306078> **Tag:** \`${interaction.user.tag}\`\n⠀<:discord:976144538974453802> | **ID:** \`${interaction.user.id}\``,
                            inline: false
                        },
                        {
                            name: `<:motivo:976158898031570985> | Motivo:`,
                            value: `⠀⠀${rr}`,
                            inline: false
                        },
                    );

                try {
                    interaction.guild.members.ban(usuario, { days: 7, reason: rr });
                    interaction.reply({ embeds: [punição] }).then(() => {
                        setTimeout(() => {
                            interaction.deleteReply()
                        }, 60000)
                    })
                } catch (e) {
                    console.error(e)
                }
            }
        }
    },
};