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
        case "#ap_report":
          {
            console.log(
              `\x1b[31m 〢`,
              `\x1b[30m ${moment(Date.now()).format("lll")}`,
              `\x1b[34m${interaction.user.username} USED`,
              `\x1b[35m Apply Button`
            );
            //// Modal application code ///
            let report_modal = new Modal()
              .setTitle(`📝 Application Report`)
              .setCustomId(`report_modal`);

            const dom_rate = new TextInputComponent()
              .setCustomId("ap_domrate")
              .setLabel(`Dominion Rate`.substring(0, 45))
              .setMinLength(1)
              .setMaxLength(5)
              .setRequired(true)
              .setPlaceholder(`Rate from 1 to 10`)
              .setStyle("SHORT");

            const ttd_rate = new TextInputComponent()
              .setCustomId("ap_ttdrate")
              .setLabel(`Team Touchdown rate`.substring(0, 45))
              .setMinLength(1)
              .setMaxLength(5)
              .setRequired(true)
              .setPlaceholder(`Rate from 1 to 10`)
              .setStyle("SHORT");

            const dtd_rate = new TextInputComponent()
              .setCustomId("ap_dtdrate")
              .setLabel(`Duo Touchdown raye`.substring(0, 45))
              .setMinLength(1)
              .setMaxLength(5)
              .setRequired(true)
              .setPlaceholder(`Rate from 1 to 10`)
              .setStyle("SHORT");

            const note = new TextInputComponent()
              .setCustomId("ap_note")
              .setLabel(`Staff Note`.substring(0, 45))
              .setMinLength(20)
              .setMaxLength(100)
              .setRequired(false)
              .setPlaceholder(`Type your notes here`)
              .setStyle("PARAGRAPH");

            const replay_codes = new TextInputComponent()
              .setCustomId("ap_replaycodes")
              .setLabel(`Tryout replay codes`.substring(0, 45))
              .setMinLength(5)
              .setMaxLength(100)
              .setRequired(false)
              .setPlaceholder(`Put all tryout replay codes here`)
              .setStyle("PARAGRAPH");

            let row_domrate = new MessageActionRow().addComponents(dom_rate);
            let row_ttdrate = new MessageActionRow().addComponents(ttd_rate);
            let row_dtdrate = new MessageActionRow().addComponents(dtd_rate);
            let row_note = new MessageActionRow().addComponents(note);
            let row_replaycodes = new MessageActionRow().addComponents(replay_codes);
            report_modal.addComponents(row_domrate, row_ttdrate, row_dtdrate, row_note, row_replaycodes);

            return await interaction.showModal(report_modal);
          }
        default:
      }
    }
    //// Send application results in review room ////
    if (interaction.customId === 'report_modal') {
      let dome_rate = interaction.fields.getTextInputValue("ap_domrate");
      let ttd_rate = interaction.fields.getTextInputValue("ap_ttdrate");
      let dtd_rate = interaction.fields.getTextInputValue("ap_dtdrate");
      let note = interaction.fields.getTextInputValue("ap_note");
      let replay_codes = interaction.fields.getTextInputValue("ap_replaycodes");
      if (isNaN(dome_rate)) {
        return interaction.reply({
          embeds: [{
              title: `${emojis.cross} Incorrect Age  Format`,
              description: `${emojis.whiteDot} Your age must be a number, please resend the application`,
              color: `${color.gray}`,
            }],
          ephemeral: true,
        });
      }
      let finishChannel = interaction.guild.channels.cache.get(config.finishChannel);
      if (!finishChannel) return;
      
      /// Embed of data in review room ///
      const footerID = interaction.message.embeds[0].footer.text;
      const user = await interaction.guild.members.fetch(footerID);
      
        await finishChannel.send({
          embeds: [
            new MessageEmbed()
              .setColor(`${color.gray}`)
              .setTitle(`${emojis.app} ${user.user.username}'s Tryout Rate`)
              .setAuthor({
                name: `${user.user.username}`,
                iconURL: user.user.displayAvatarURL(),
              })
              .setDescription(` `)
              ///.setThumbnail(`https://i.imgur.com/Wfs7AQj.png`)
              //.setImage(`${banners.appResultBanner}`)
              .addFields([
                {
                  name: `${emojis.id} Dominion rate`,
                  value: `${emojis.threadMark} ${dome_rate}/10`,
                  inline: true,
                },
                {
                  name: `${emojis.age} Team Touchdown rate`,
                  value: `${emojis.threadMark} ${ttd_rate}/10`,
                  inline: true,
                },
                {
                  name: `${emojis.competition} Duo Touchdown rate`,
                  value: `${emojis.threadMark} ${dtd_rate}/10`,
                  inline: true,
                },
                {
                  name: `${emojis.favorites} Staff Note`,
                  value: `${emojis.threadMark} ${note}` || "No Note",
                  inline: false,
                },
                {
                  name: `${emojis.favorites} Replay Codes`,
                  value: `${emojis.threadMark} ${replay_codes}` || "No Replay Codes",
                  inline: false,
                },
              ])
              .setFooter({
                ///text: `This is for Staff members only, no one else can see it`,
                text: `${interaction.user.id}`,
                iconURL: `${banners.parfaitIcon}`,
              }),
          ],
          components: [],
        });
        return await interaction.reply({
          content: `Your report has been sent`,
          ephemeral: true,
        })
    }
  });
};
