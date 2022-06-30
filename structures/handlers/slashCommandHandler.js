const config = require("../botconfig/config.json");
const {
  Client
} = require("discord.js");
const {
  Perms
} = require("../validator/permissions");
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
    let amount = 0;
    const slashCommandsArray = [];

    (await PG(`${process.cwd()}/slashCommands/*/*.js`)).map(async (file) => {
      const command = require(file);

      if (!command.name) return await client.logger(`SlashCommand Error: Missing Name | Directory: ${file.split("/")[7] + `/` + file.split("/")[8]}`.brightRed);
      if (!command.context && !command.description) return await client.logger(`SlashCommand Error: Missing Description | Directory: ${file.split("/")[7] + `/` + file.split("/")[8]}`.brightRed);
      if (command.userPermissions) {
        if (!Perms.includes(command.userPermissions)) return await client.logger(`SlashCommand Error: Invalid Permission | Directory: ${file.split("/")[7] + `/` + file.split("/")[8]}`.brightRed);
      }
      if (command.botPermissions) {
        if (!Perms.includes(command.botPermissions)) return await client.logger(`SlashCommand Error: Invalid Permission | Directory: ${file.split("/")[7] + `/` + file.split("/")[8]}`.brightRed);
      }
      client.slashCommands.set(command.name, command);
      if (["MESSAGE", "USER"].includes(command.type)) delete command.description;
      slashCommandsArray.push(command)
      amount++
    });
    await client.logger(`${amount} Comandos em Slash Carregados`.brightGreen);

    client.on("ready", async () => {
      if (config.SlashCommandsGlobal) {
    
        await client.application.commands.set(slashCommandsArray);

      } else {
        if (!config.SlashCommand_Server_id) return client.logger(`Você precisa fornecer o SlashCommand_Server_id no config.json para carregar os comandos de barra!`.brightRed)
    
        await client.guilds.cache.get(config.SlashCommand_Server_id).commands.set(slashCommandsArray);
        
      }

    });
  } catch (e) {
    console.log(e.message);
  }
}
