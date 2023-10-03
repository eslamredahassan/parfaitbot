const { client, MessageActionRow, MessageButton, MessageEmbed, Modal, TextInputComponent, MessageSelectMenu } = require("discord.js");
const config = require("../config");
const r = require("../assest/responses.js");

module.exports = async (client, config) => {
  client.on('messageCreate', (message) => {
  if (message.author.bot) return;
    prefix = '.'

  const unprefixedCommands = ['hi', 'goodnight', 'goodnight parfait', 'morning'];
  const isUnprefixedCommand = unprefixedCommands.includes(message.content.toLowerCase());

  if (!isUnprefixedCommand && !message.content.startsWith(prefix)) return;

  let args;
  let command;

  if (isUnprefixedCommand) {
    // don't remove the prefix from the message
    // although it will be an array with the command only
    // not sure how you want to use it :)
    args = message.content.split(/ +/);
    // the command is the message content itself
    // this way both "!goodnight" and "goodnight" will work
    command = message.content.toLowerCase();
  } else {
    // it's the same as before
    args = message.content.slice(prefix.length).split(/ +/);
    command = args.shift().toLowerCase();
  }

  if (command === 'ping') {
    message.reply('pong');
  } else if (command === 'goodnight parfait' || 'goodnight') {
    message.reply('goodnight');
    } else if (command === 'hi parfait') {
    message.reply('hi :D');
  }
})
}