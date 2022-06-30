const {
  Events
} = require("../validator/eventNames");
const {
  promisify
} = require("util");
const {
  glob
} = require("glob");
const PG = promisify(glob);

/**
 * @param {Client} client 
 */

module.exports = async (client) => {
  try {

    (await PG(`${process.cwd()}/events/*/*.js`)).map(async (file) => {
      const event = require(file);
      if (!Events.includes(event.name) || !event.name) {
        await client.logger(`Event Error: ${event.name || "MISSING"} | Directory: ${file.split("/")[6] + `/` + file.split("/")[7]}`.brightRed);
        return;
      }
      if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args));
      } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
      }
    });
    await client.logger(`Events Carragando`.brightGreen);
    await client.logger(`Logando no Bot...`.bold.yellow)

  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
};

