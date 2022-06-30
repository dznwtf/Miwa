const config = require(`${process.cwd()}/structures/botconfig/config.json`);
const {
    Client,
    CommandInteraction,
    MessageEmbed
} = require("discord.js");
const {
    Color,
    isColor
} = require("coloras");

module.exports = {
    name: "embed",
    usage: '',
    description: "[🛠️ Moderação] Crie uma Embed Dentro do Seu Servidor.",
    category: "Moderação",
    userPermissions: "ADMINISTRATOR",
    botPermissions: "ADMINISTRATOR",
    ownerOnly: false,
    toggleOff: false,
    options: [{
            name: 'titulo',
            type: 'STRING',
            description: "Escolha um Titulo.",
            required: true,
        },
        {
            name: 'url',
            type: 'STRING',
            description: "Escolha uma url para o titulo.",
            required: false,
        },
        {
            name: 'descrição',
            type: 'STRING',
            description: "Escolha uma descrição para a Embed.",
            required: false,
        },
        {
            name: 'imagem',
            type: 'STRING',
            description: "Escolha uma imagem.",
            required: false,
        },
        {
            name: 'thumbnail',
            type: 'STRING',
            description: "Escolha uma thumbnail.",
            required: false,
        },
        {
            name: 'cor',
            type: 'STRING',
            description: "Escolha uma Cor em (RGB, HEX, HSL, HSV, CMYK) Exemplo (#a5d7ff).",
            required: false,
        },
        {
            name: 'footer',
            type: 'STRING',
            description: "Escolha um footer.",
            required: false,
        },
        {
            name: "autor",
            type: "USER",
            required: false,
            description: 'Escolha um autor.'
        },
        {
            name: "canal",
            type: "CHANNEL",
            required: false,
            description: 'Escolha um Canal Para Enviar.'
        }
    ],

    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async(client, interaction) =>{
        if  (!interaction.member.permissions.has("ADMINISTRATOR")) {
           
            return interaction.reply(`${interaction.user} **Voce não possui permissão para esse comando.**`);
        } else if (!interaction.guild.me.permissions.has("ADMINISTRATOR")) {
            return interaction.reply(`${interaction.user} **Eu não tenho permissões de administrador.**`);
        } 

        try {
            const ch = interaction.options.getChannel('canal') || interaction.channel;
            const channelstype = interaction.guild.channels.cache.get(ch.id)
            if (!channelstype) return interaction.reply({
                content: `Você Deve Escolher um Canal Válido.`
            })
            if (channelstype.type !== 'GUILD_TEXT') return interaction.reply({
                content: `Você Deve Escolher um Texto Válido para o Canal.`
            })

            const author = interaction.options.getUser('autor');

            const title = interaction.options.getString('titulo');
            const description = interaction.options.getString('descrição');
            const couleurr = interaction.options.getString('cor');
            const url = interaction.options.getString('url');
            const image = interaction.options.getString('imagem');
            const thumbnail = interaction.options.getString('thumbnail');
            const footer = interaction.options.getString('footer');

            const resultat = new MessageEmbed()
                .setTitle(title)

            if (description) resultat.setDescription(description)

            if (couleurr) {
                if (!isColor(couleurr).color) return interaction.reply({
                    content: `Você deve inserir uma cor válida. A cor pode ser em: RGB, HEX, HSL, HSV, CMYK.`
                });
                const color = new Color(couleurr);
                resultat.setColor(color.toHex())
            }

            if (url) {
                if (url.includes('https://') || url.includes('http://')) {
                    resultat.setURL(url)
                } else {
                    return interaction.reply({
                        content: `<a:red_exclamacao:973229072006123520> O link não é válido.`
                    })
                }
            }

            if (image) {
                if (image.includes('https://') || image.includes('http://')) {
                    resultat.setImage(image)
                } else {
                    return interaction.reply({
                        content: `<a:red_exclamacao:973229072006123520> O link para a imagenão é válida.`
                    })
                }
            }

            if (thumbnail) {
                if (thumbnail.includes('https://') || thumbnail.includes('http://')) {
                    resultat.setThumbnail(thumbnail)
                } else {
                    return interaction.reply({
                        content: `<a:red_exclamacao:973229072006123520> O link para a thumbnail não é válida.`
                    })
                }
            }

            if (author) {
                resultat.setAuthor(author.tag, author.displayAvatarURL({
                    dynamic: true
                }))
            }

            if (footer) {
                resultat.setFooter(footer)
            }

            channelstype.send({
                embeds: [resultat]
            })
            interaction.reply({
                content: `A Embed foi enviada para o canal ${channelstype}`
            })

        } catch (err) {

            return interaction.reply(`${bot.error} Um Erro Ocorreu. \nError: ${err} \n [Contate o Suporte](https://discord.gg/QcVvf5WSfs)`)
        }

    },
};