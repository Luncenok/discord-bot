const commandHandler = require('../message-handlers/command');
const issueHandler = require('../message-handlers/issue-handler');
const repoHandler = require('../message-handlers/repo-handler');
const hastebinHandler = require('../message-handlers/hastebin');

module.exports = async (client, message) => {
  if (message.author.bot) return;

  if (commandHandler(client, message)) return;
  if (hastebinHandler(client, message)) return;
  repoHandler(client, message);
  issueHandler(client, message);
};