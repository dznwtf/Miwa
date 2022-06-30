module.exports = {

    name: "kidb", 
    description: '[🎉 Interações] Veja o que o kid bengala vai falar com você',
    type: 'CHAT_INPUT',
  
    run: async (client, interaction) => {
  
      
  
      let respostas = [
  
        "Olá Gabriel",
  
        "Olá casada",
  
        "Soube que não está fazendo a tarefa, vou ter que mostrar minha palmatória, olha ela é bem grande haha !",
  
        "Sinto cheiro de cu fresco !",
  
        "Pelo naipedo bacana seu cu já levou cana haha",
  
        "Sua mamãe está bem ?",
  
        "E sua namorada esta parecendo mais cheia..",
  
        "Saudades da sua mãe..",
  
        "Sinto cheiro de cu virgem..",
  
        "Hibica? Prepara o cu que lá vai pica ",
  
      ];
  
      let resposta = respostas[Math.floor(Math.random() * respostas.length)];
        interaction.reply({content: `Epa! ${interaction.user} o Kid Bengala ta aqui! 👀`, ephemeral: true})
  
      try {
  
        interaction.channel
  
          .createWebhook("Kid Bengala", { avatar:"https://media.discordapp.net/attachments/958512729860210798/966452290129129562/images.jpeg",
  
          })
  
          .then((web) => {
  
            web.send(`${interaction.user} ${resposta}`).then(() => {
  
              web.delete();
  
            });
  
          });
  
      } catch (e) {
  
        console.log(e);
  
        interaction.reply(`⛔ Eu estou sem a permissão de criar webhooks.`);
  
      }
  
    },
  
  };   