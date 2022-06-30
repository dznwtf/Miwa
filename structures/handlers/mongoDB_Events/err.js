module.exports = {
  name: "err",

  async execute(client, error) {
    client.logger(String(error).red.dim);
  }
}
