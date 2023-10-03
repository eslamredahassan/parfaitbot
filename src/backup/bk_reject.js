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
        case "#ap_reject":
          {
            let admin = guild.members.cache.get(interaction.user.id);
            if (admin.roles.cache.has(config.devRole)) {

              let embed = new MessageEmbed(interaction.message.embeds[0])
                .setTitle(`${emojis.alert} Rejected by ${interaction.user.username}`)
                .setColor(`${color.gray}`)
                .setImage(`${banners.rejectBanner}`)
                .setThumbnail(`${banners.rejectIcon}`);
              /// Edit Review Embed ///
              interaction.message.edit({
                embeds: [embed],
                components: [],
              }).then((msg) => msg.unpin());

              //// Send message to rejected member ///
              const getIdFromFooter = interaction.message.embeds[0].footer.text;
              const ap_user = await interaction.guild.members.fetch(getIdFromFooter);

              /// Console Action ///
              console.log(
                `\x1b[33m 〢`,
                `\x1b[30m${moment(Date.now()).format("lll")}`,
                `\x1b[34m ${ap_user.user.username}`,
                `\x1b[32m REJECTED BY ${interaction.user.username}`
              );

              await ap_user.send({
                embeds: [
                  new MessageEmbed()
                    .setColor(`${color.gray}`)
                    .setTitle(`${emojis.sad_parfait} Sorry mate`)
                    .setImage("https://i.imgur.com/qAbnky8.png")
                    .setDescription(`${messages.reject}`),
                ],
              });
              //// Send reply message after rejecting member ///
              await interaction
                .reply({
                  embeds: [
                    {
                      title: `${emojis.cross} Rejection Alert`,
                      description: `${emojis.threadMarkmid} You rejected ${ap_user.user} from joining **${interaction.guild.name}**\n${emojis.threadMarkmid} Removed his application from pin list\n${emojis.threadMark} His thread will be automatically archived in \`\`20 Seconds\`\``,
                      color: `${color.gray}`,
                    },
                  ],
                  //this is the important part
                  ephemeral: true,
                })
                .catch(() => console.log('Error 2582'));
              await ap_user.roles.remove(config.waitRole).catch(() => console.log('Error 2583'));
              console.log(
                `\x1b[31m 🛠`,
                `\x1b[30m ${moment(Date.now()).format("lll")}`,
                `\x1b[33m Sun wannabe role REMOVED`
              );


              let applyChannel = interaction.guild.channels.cache.get(config.applyChannel);
              if (!applyChannel) return;

              const user = ap_user.user;
              const userName = user.username;

              const threadName = applyChannel.threads.cache.find(
                (x) => x.name === `${"🧤︱" + userName + " Tryout"}`
              );
              /// Rename The Thread ///
              await threadName.setName("🧤︱" + `${userName}` + " Rejected");
              /// Lock the thread ///
              await wait(10000); // ** cooldown 10 seconds ** \\
              await threadName.setLocked(true);
              /// Archive the thread ///
              await wait(20000); // ** cooldown 10 seconds ** \\
              await threadName.setArchived(true);

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
                .catch(() => console.log('Error Line 2622'));

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
