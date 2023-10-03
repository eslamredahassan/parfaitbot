const { Client, MessageActionRow, MessageButton, MessageEmbed, Modal, TextInputComponent, MessageSelectMenu } = require("discord.js");
const config = require("../config");
const messages = require("../assest/messages.js");
const responses = require("../assest/responses.js");
const interface = require("../assest/interface.js");
const fieldsText = require("../assest/fieldsText.js");
const members = require("../assest/members.js");
const banners = require("../assest/banners.js");
const errors = require("../assest/errors.js");
const color = require("../assest/color.js");
const emojis = require("../assest/emojis");
const moment = require("moment");
const wait = require("util").promisify(setTimeout);
const cooldown = new Set();
require("moment-duration-format");

module.exports = async (Client, config) => {

  let guild = Client.guilds.cache.get(config.guildID);
  let Logo = guild.iconURL({ dynamic: true });

  Client.on("interactionCreate", async (interaction) => {
    if (interaction.isButton()) {
      switch (interaction.customId) {
        case "#ap_apologize":
          {
            let admin = guild.members.cache.get(interaction.user.id);
            if (admin.roles.cache.has(config.devRole)) {

              const getIdFromFooter = interaction.message.embeds[0].footer.text;
              const ap_user = await interaction.guild.members.fetch(getIdFromFooter);

              let embed = new MessageEmbed(interaction.message.embeds[0])
                .setTitle(`${emojis.alert} Apologized by ${interaction.user.username}`)
                .setColor(`${color.gray}`)
                .setImage(`${banners.apologizeBanner}`)
                .setThumbnail(`${banners.apologizeIcon}`);

              await interaction.message.edit({
                embeds: [embed],
                components: [],
              }).then((msg) => msg.unpin());

              console.log(
                `\x1b[33m 〢`,
                `\x1b[30m${moment(Date.now()).format("lll")}`,
                `\x1b[34m ${ap_user.user.username}`,
                `\x1b[32m APOLOGIZED BY ${interaction.user.username}`
              );
              //// Send message to accepted member ///
              await ap_user.send({
                embeds: [
                  new MessageEmbed()
                    .setColor(`${color.gray}`)
                    .setTitle(`${emojis.sad_parfait} We Apologize`)
                    .setImage(`${banners.dmApologizeBanner}`)
                    .setDescription(`${messages.apologize}`),
                ],
              });
              //// Send message after accepting member ///
              await interaction
                .reply({
                  embeds: [
                    {
                      title: `${emojis.check} Apologize Alert`,
                      description: `${emojis.threadMarkmid} You apologized to ${ap_user} for not being in **${interaction.guild.name}**\n${emojis.threadMark} Removed his application from pin list`,
                      color: `${color.gray}`,
                    },
                  ],
                  //this is the important part
                  ephemeral: true,
                })
                .catch(() => console.log('Error Line 2496'));
              //// Interactions roles ///
              await ap_user.roles.remove(config.SunTest).catch(() => console.log('Error Line 2498'));
              console.log(
                `\x1b[33m 🛠`,
                `\x1b[30m ${moment(Date.now()).format("lll")}`,
                `\x1b[33m SunTest role REMOVED`
              );
              await ap_user.roles.remove(config.SquadSUN).catch(() => console.log('Error Line 2504'));
              console.log(
                `\x1b[33m 🛠`,
                `\x1b[30m ${moment(Date.now()).format("lll")}`,
                `\x1b[33m SquadSUN role REMOVED`
              );
            } else {
              await interaction
                .reply({
                  embeds: [
                    {
                      title: `${emojis.alert} Permission denied`,
                      description: `${errors.permsError}`,
                      color: `${color.gray}`,
                    },
                  ],
                  //this is the important part
                  ephemeral: true,
                })
                .catch(() => console.log('Error Line 2523'));
              console.log(
                `\x1b[31m 🛠`,
                `\x1b[30m ${moment(Date.now()).format("lll")}`,
                `\x1b[33m Permission denied`
              );
            }
          }
          break;
        default:
      }
    }
  });
};
