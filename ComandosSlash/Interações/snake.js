const { Snake } = require('discord-gamecord')

module.exports = {
    name: "snake", 
    description: '[🎉 Interações] Jogue o jogo da cobrinha',
    type: 'CHAT_INPUT',
  
    run: async (client, interaction) => {
new Snake({
  message: interaction,
  slash_command: true,
  embed: {
    title: 'Snake',
    color: '#5865F2',
    OverTitle: 'Você perdeu',
  },
  snake: { head: '🟢', body: '🟩', tail: '🟢', over: '💀' },
  emojis: {
    board: '⬛', 
    food: '🍎',
    up: '⬆️', 
    right: '➡️',
    down: '⬇️',
    left: '⬅️',
  },
  foods: ['🍎', '🍇', '🍊'],
  stopButton: 'Parar',
  othersMessage: 'Você não pode usar os botões de outra pessoa!',
}).startGame();
 }
}; 