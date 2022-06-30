const config = require(`${process.cwd()}/structures/botconfig/config.json`);
const {
  Client,
  CommandInteraction,
  MessageEmbed
} = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "castigo",
    usage: '',
    description: "[🛠️ Moderação] Castigue um Usuário do Servidor",
    category: "Moderação",
    cooldown: 0,
    userPermissions: "MODERATE_MEMBERS",
    botPermissions: "",
    ownerOnly: false,
    toggleOff: false,
    options: [{
            name: "set",
            description: "Seta o Membro de Castigo.",
            type: "SUB_COMMAND",
            options: [{
                name: "usuário",
                description: "O Membro que quer Castigar",
                type: "USER",
                required: true
            }, {
                name: "duração",
                description: "Tempo do Castigo (Exemplo: 2d para 2 dias)",
                type: "STRING",
                required: true
            }, {
                name: "motivo",
                description: "Motivo do Castigo",
                type: "STRING",
                required: true
            }]
        },
        {
            name: "remove",
            description: "Remova o Membro do Castigo.",
            type: "SUB_COMMAND",
            options: [{
                name: "usuário",
                description: "O Usuário Para Remover o Castigo",
                type: "USER",
                required: true
            }, {
                name: "motivo",
                description: "O Motivo Para Remover o Castigo",
                type: "STRING",
                required: true
            }]
        }
    ],

    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

     run: async(client, interaction) =>{
        try {
            switch (interaction.options.getSubcommand()) {
                case "set": {
                    const user = interaction.options.getUser("usuário");
                    const duration = interaction.options.getString("duração");
                    const reason = interaction.options.getString("motivo");
                    const member = interaction.guild.members.cache.get(user.id);

                    if (member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({
                        embeds: [new MessageEmbed()
                            .setColor('#a5d7ff')
                            .setDescription(`<a:red_exclamacao:974042663336685618> Você não pode castigar este usuário, pois o cargo é igual ou superior à sua.`)
                        ]
                    });

                    const timeToMs = ms(duration);
                    if (!timeToMs) return interaction.reply({
                        embeds: [new MessageEmbed()
                            .setColor('#a5d7ff')
                            .setTitle(`<a:red_exclamacao:974042663336685618> Por favor, Diga um Tempo Válido !`)
                        ]
                    });

                    member.timeout(timeToMs, reason);
                    return interaction.reply({
                        embeds: [new MessageEmbed()
                            .setColor('#a5d7ff')
                            .setAuthor(`Membro Castigado com Sucesso`, interaction.user.displayAvatarURL({
                                dynamic: true
                            }))
                            .setDescription(`>>> ${user} Foi Castigado(a) por \`${duration}\`\n**Motivo:** ${reason}`)
                        ]
                    });
                }
                case "remove": {
                    const user = interaction.options.getUser("usuário");
                    const reason2 = interaction.options.getString("motivo");
                    const member2 = interaction.guild.members.cache.get(user.id);

                    if (member2.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({
                        embeds: [new MessageEmbed()
                            .setColor('#a5d7ff')
                            .setDescription(`<a:red_exclamacao:974042663336685618>  Você não pode remover o castigo deste usuário, pois o cargo é igual ou superior à sua.`)
                        ]
                    });

                    member2.timeout(null, reason2);
                    return interaction.reply({
                        embeds: [new MessageEmbed()
                            .setColor('#a5d7ff')
                            .setAuthor(`Castigo Removido com Sucesso`, interaction.user.displayAvatarURL({
                                dynamic: true
                            }))
                            .setDescription(`>>> ${user} Foi Removido(a) do Castigo \n**Motivo:** ${reason2}`)
                        ]
                    });
                }
            }
        } catch (e) {
            console.log(e)
            return interaction.reply({
                embeds: [new MessageEmbed()
                    .setTitle(`⛔ Error`)
                    .setDescription(`${e}`)
                ]
            })
        }
    }
}