const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const banners = require("../assest/banners.js");
const errors = require("../assest/errors.js");
const color = require("../assest/color.js");
const emojis = require("../assest/emojis");
const moment = require("moment");
const wait = require("util").promisify(setTimeout);
const cooldown = new Set();
require("moment-duration-format");

module.exports = async (client, config) => {

  let guild = client.guilds.cache.get(config.guildID);
  let Logo = guild.iconURL({ dynamic: true });

  client.on("interactionCreate", async (interaction) => {
    if (interaction.isButton()) {
      switch (interaction.customId) {
        case "#silent_accept":
          {
            const perms = [`${config.devRole}`, `${config.devRoleTest}`]
            let staff = guild.members.cache.get(interaction.user.id);
            if (staff.roles.cache.hasAny(...perms)) {

              const ID = interaction.message.embeds[0].footer.text;
              const ap_user = await interaction.guild.members.fetch(ID);

              let promote = new MessageActionRow().addComponents([
                new MessageButton()
                  .setStyle("SECONDARY")
                  .setDisabled(false)
                  .setCustomId("#ap_promote")
                  .setLabel(`Promote ${ap_user.user.username}`)
                  .setEmoji(emojis.promote),
                new MessageButton()
                  .setStyle("SECONDARY")
                  .setDisabled(false)
                  .setCustomId("#ap_apologize")
                  .setLabel(`Apologize`)
                  .setEmoji(emojis.apologize),
                new MessageButton()
                  .setStyle("SECONDARY")
                  .setDisabled(false)
                  .setCustomId("#ap_reply")
                  .setLabel(` `)
                  .setEmoji(emojis.dm),
              ]);

              let embed = new MessageEmbed(interaction.message.embeds[0])
                .setTitle(`${emojis.alert} Accepted by ${interaction.user.username}`)
                .setColor(color.gray)
                .setImage(banners.silentAcceptbanner)
                .setThumbnail(banners.acceptIcon)
                .setTimestamp();

              interaction.message.edit({
                embeds: [embed],
                components: [promote],
              });

              console.log(
                `\x1b[33m 〢`,
                `\x1b[30m${moment(Date.now()).format("lll")}`,
                `\x1b[34m ${ap_user.user.username}`,
                `\x1b[32m ACCEPTED BY ${interaction.user.username}`
              );
              //// Send message to accepted member ///
              await interaction
                .reply({
                  embeds: [
                    {
                      title: `${emojis.check} Acceptance Alert`,
                      description: `${emojis.threadMarkmid} You accepted ${ap_user} in **${interaction.guild.name}** silently\n${emojis.threadMark} His thread will be automatically archived in \`\`20 Seconds\`\``,
                      color: color.gray,
                    },
                  ],
                  //this is the important part
                  ephemeral: true,
                }).catch(() => console.log('Error Line 85'));
              //// Send message to log channel after accepting member ///
              const log = interaction.guild.channels.cache.get(config.log);
              await log.send({
                embeds: [
                  {
                    title: `${emojis.log} Accept Log`,
                    description: `${emojis.check} ${ap_user.user} have been accepted silently by ${interaction.user}`,
                    color: color.gray,
                    timestamp: new Date(),
                    footer: {
                      text: 'Accepted in',
                      icon_url: banners.parfaitIcon,
                    },
                  },
                ],
                //this is the important part
                ephemeral: false,
              });
              //// Interactions roles ///
              await ap_user.roles.add(config.SunTest).catch(() => console.log('Error Line 2298'));
              console.log(
                `\x1b[33m 🛠`,
                `\x1b[30m ${moment(Date.now()).format("lll")}`,
                `\x1b[33m SunTest role ADDED`
              );

              await ap_user.roles.add(config.SquadSUN).catch(() => console.log('Error Line 2305'));
              console.log(
                `\x1b[33m 🛠`,
                `\x1b[30m ${moment(Date.now()).format("lll")}`,
                `\x1b[33m SquadSUN role ADDED`
              );

              await ap_user.roles.remove(config.waitRole).catch(() => console.log('Error Line 2312'));
              console.log(
                `\x1b[36m 🛠`,
                `\x1b[30m ${moment(Date.now()).format("lll")}`,
                `\x1b[33m Waitlist role REMOVED`
              );

              let applyChannel = interaction.guild.channels.cache.get(config.applyChannel);
              if (!applyChannel) return;

              const user = ap_user.user;
              const userName = user.username;

              const threadName = applyChannel.threads.cache.find(
                (x) => x.name === `${"🧤︱" + userName + " Tryout"}`
              );
              /// Rename The Thread ///
              await threadName.setName("🧤︱" + `${userName}` + " Accepted");
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
                .catch(() => console.log('Error Line 2350'));
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
