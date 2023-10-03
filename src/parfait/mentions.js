const { client, MessageActionRow, MessageButton, MessageEmbed, Modal, TextInputComponent, MessageSelectMenu } = require("discord.js");
const config = require("../config");
const r = require("../assest/responses.js");

const mentionResponse = [`${r.wdyw}`, `${r.dnd}`, `${r.lost}`, `${r.hi}`, `${r.ntfc}`]
const mention = mentionResponse[Math.floor(Math.random() * mentionResponse.length)];

module.exports = async (client, config) => {
  client.on("messageCreate", (message) => {
    if (message.mentions.has(client.user)) {
      message.reply(mention);
    }
  });
}