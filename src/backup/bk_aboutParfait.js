const { client, MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const config = require("../config");
const interface = require("../assest/interface");
const fieldsText = require("../assest/fieldsText");
const responses = require("../assest/responses");
const members = require("../assest/members");
const banners = require("../assest/banners");
const color = require("../assest/color");
const emojis = require("../assest/emojis");
const moment = require("moment");
const wait = require("util").promisify(setTimeout);
const cooldown = new Set();
require("moment-duration-format");

module.exports = async (client, config) => {

  let guild = client.guilds.cache.get(config.guildID);
  let Logo = guild.iconURL({ dynamic: true });

  client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand() || interaction.isButton()) {
      switch (interaction.commandName) {
        case "about":
          {
            const aboutParfait = new MessageActionRow().addComponents([
              new MessageButton()
                .setStyle("LINK")
                .setLabel(`⠀Contact with IEgyGamerI`)
                .setURL(`https://discordapp.com/users/123788535324082178`)
                .setEmoji(emojis.discord),
              new MessageButton()
                .setStyle("LINK")
                .setLabel(`⠀Parfait Status⠀`)
                .setURL(`https://parfait.pikapod.net/status/parfait`)
                .setEmoji(emojis.dev),
            ]);

            await interaction.reply({
              embeds: [
                new MessageEmbed()
                  .setColor(color.gray)
                  .setTitle(`${emojis.alert} About ${client.user.tag}`)
                  .setDescription(interface.aboutMessage)
                  .setThumbnail(Logo)
                  .setImage(banners.aboutBanner)
                  .addFields(
                    {
                      name: `${emojis.developer} Programmed by`,
                      value: fieldsText.programed,
                      inline: true
                    },
                    {
                      name: `${emojis.build} Build`,
                      value: fieldsText.build,
                      inline: true,
                    },
                    {
                      name: `${emojis.version} Version`,
                      value: fieldsText.version,
                      inline: true,
                    },
                    {
                      name: `${emojis.order} Order one for your server`,
                      value: fieldsText.contact,
                      inline: false,
                    },
                  )
                .setFooter({
                ///text: `This is for Staff members only, no one else can see it`,
                text: `Parfait - Advanced Discord Application Bot`,
                iconURL: banners.parfaitIcon,
              }),
              ],
              ephemeral: true,
              components: [aboutParfait],
            });
          }
          break;
      }
    }
  });
};
