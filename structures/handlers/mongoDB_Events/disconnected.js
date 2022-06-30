module.exports = {
  name: "disconnected",

  async execute(client) {
    client.logger(`Desconectado da Moongose as ${new Date()}`.brightRed)
  }
}

