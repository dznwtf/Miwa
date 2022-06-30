const config = require('../botconfig/config.json');
const ee = require('../botconfig/embed.json');
const {
  Client,
  Collection,
  Intents,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  MessageSelectMenu,
} = require("discord.js");
const ms = require("ms")
const moment = require("moment")
const fs = require('fs')

module.exports.databasing = databasing;
module.exports.embedDatabasing = embedDatabasing;
module.exports.onCoolDown = onCoolDown;
module.exports.escapeRegex = escapeRegex;

function databasing(client, guildid) {
    if (!client || client == undefined || !client.user || client.user == undefined) return;
    try {
      if (guildid) {
        client.settings.ensure(guildid, {
          prefix: config.env.PREFIX || process.env.PREFIX,
          botchannel: "",
          levelupChannel: ""
        });
      }
      return;
    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
    }
  }
  
  function embedDatabasing(client, guildid) {
    if (!client || client == undefined || !client.user || client.user == undefined) return;
    try {
      if (guildid) {
        client.embedSettings.ensure(guildid, {
          embed: {
            "color": ee.color,
            "mediancolor": ee.mediancolor,
            "wrongcolor": ee.wrongcolor,
            "footertext": client.guilds.cache.get(guildid) ? client.guilds.cache.get(guildid).name : ee.footertext,
            "footericon": client.guilds.cache.get(guildid) ? client.guilds.cache.get(guildid).iconURL({
              dynamic: true
            }) : ee.footericon,
          }
        });
      }
      return;
    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
    }
  }

function onCoolDown(message, command) {
  if (!message || !message.client) throw "No Message with a valid DiscordClient granted as First Parameter";
  if (!command || !command.name) throw "No Command with a valid Name granted as Second Parameter";
  const client = message.client;
  if (!client.cooldowns.has(command.name)) {
    client.cooldowns.set(command.name, new Collection());
  }
  const now = Date.now();
  const timestamps = client.cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown) * 1000;
  if (timestamps.has(message.member.id)) {
    const expirationTime = timestamps.get(message.member.id) + cooldownAmount;
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return timeLeft
    } else {
      timestamps.set(message.member.id, now);
      setTimeout(() => timestamps.delete(message.member.id), cooldownAmount);
      return false;
    }
  } else {
    timestamps.set(message.member.id, now);
    setTimeout(() => timestamps.delete(message.member.id), cooldownAmount);
    return false;
  }
}

function escapeRegex(str) {
  try {
    return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
  } catch (e) {
    console.log(String(e.stack).grey.bgRed)
  }
}

