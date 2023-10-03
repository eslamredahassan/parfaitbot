const { MessageActionRow, MessageButton, MessageEmbed, Modal, TextInputComponent } = require("discord.js");

const emojis = require('../assest/emojis');
const banners = require("../assest/banners.js");
const color = require("../assest/color.js");

module.exports = async (client, config) => {

   client.on('messageCreate', async (message) => {
   if(message.guild) return;
     
     const reply = new MessageActionRow().addComponents([
        new MessageButton()
          .setStyle(2)
          .setCustomId("#forward_reply")
          .setLabel(`Reply ${message.author.username}`)
          .setEmoji(emojis.dm),
      ]);
     
    await client.channels.cache.get(config.parfaitInbox).send({
        embeds: [
          new MessageEmbed()
            .setColor(color.gray)
            .setTitle(`${emojis.newMail} **Parfait Inbox**`)
            .setDescription(``)
            //.setThumbnail(banners.newMessageBanner)
            .setImage(banners.newMessageBanner)
            .addFields(
              {
                name: `${emojis.id} Sender`,
                value: `${emojis.threadMark} ${message.author}`,
                inline: true,
              },
              {
                name: `${emojis.time} Sent Since`,
                value: `${emojis.threadMark} <t:${Math.floor(Date.now() / 1000)}:R>`,
                inline: true,
              },
              {
                name: `${emojis.email} Message Content`,
                value: `${emojis.threadMark} ${message.content}`,
                inline: false,
              },
            )
            .setTimestamp()
            .setFooter({
              text: message.author.id,
              iconURL: banners.parfaitIcon,
            }),
        ],
        components: [reply],
      });//log messages
    return;
});
}