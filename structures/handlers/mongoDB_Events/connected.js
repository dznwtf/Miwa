module.exports = {
  name: "connected",

  async execute(client) {
    client.logger(`Conectada Na MongoDB Database!`.bold.brightGreen)
  }
}

