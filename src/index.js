const fs = require('fs');
const Enmap = require('enmap');
const Discord = require('discord.js');
const config = require('../config.json');

const client = new Discord.Client();

client.config = config;

fs.readdir('./src/events/', (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  files.forEach((file) => {
    const event = require(`./events/${file}`);
    const eventName = file.split('.')[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();

fs.readdir('./src/commands/', (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  files.forEach((file) => {
    if (!file.endsWith('.js')) return;
    const props = require(`./commands/${file}`);
    const commandName = file.split('.')[0];
    console.log(`Wczytywanie komendy ${commandName}`);
    client.commands.set(commandName, props);
  });
});

if (!process.env.DISCORD_TOKEN) {
  throw new Error('Token not provided');
}
client.login(process.env.DISCORD_TOKEN);