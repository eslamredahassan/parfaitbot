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
              `\x1b[35m Report Button`
            );
            //// Modal application code ///
            let ap_report_modal = new Modal()
              .setTitle(`📝 Application Report`)
              .setCustomId(`ap_report_modal`);

            const tryout = new TextInputComponent()
              .setCustomId("ap_tryout")
              .setLabel(`Tell us when you are available for a tryout`.substring(0, 45))
              .setMinLength(3)
              .setMaxLength(65)
              .setRequired(true)
              .setPlaceholder(`Rate from 1 to 10`)
              .setStyle(1);

            const usual = new TextInputComponent()
              .setCustomId("ap_usual")
              .setLabel(`What are your usual days of play and hours?`.substring(0, 45))
              .setMinLength(3)
              .setMaxLength(65)
              .setRequired(true)
              .setPlaceholder(`Rate from 1 to 10`)
              .setStyle(1);

            const clan = new TextInputComponent()
              .setCustomId("ap_clan")
              .setLabel(`Have you joined any clan before?`.substring(0, 45))
              .setMinLength(2)
              .setMaxLength(65)
              .setRequired(true)
              .setPlaceholder(`Rate from 1 to 10`)
              .setStyle(1);

            const from = new TextInputComponent()
              .setCustomId("ap_from")
              .setLabel(`Where are you from?`.substring(0, 45))
              .setMinLength(2)
              .setMaxLength(65)
              .setRequired(true)
              .setPlaceholder(`Type your notes here`)
              .setStyle(1);

            const start = new TextInputComponent()
              .setCustomId("ap_start")
              .setLabel(`When did you start playing Smash Legends?`.substring(0, 45))
              .setMinLength(2)
              .setMaxLength(65)
              .setRequired(true)
              .setPlaceholder(`Put all tryout replay codes here`)
              .setStyle(2);

            let row_tryout = new MessageActionRow().addComponents(tryout);
            let row_usual = new MessageActionRow().addComponents(usual);
            let row_clan = new MessageActionRow().addComponents(clan);
            let row_from = new MessageActionRow().addComponents(from);
            let row_start = new MessageActionRow().addComponents(start);
            ap_report_modal.addComponents(row_tryout, row_usual, row_clan, row_from, row_start);

            return await interaction.showModal(ap_report_modal);
          }
        default:
      }
    }
    //// Send application results in review room ////
    if (interaction.customId === 'ap_report_modal') {
      let tryout = interaction.fields.getTextInputValue("ap_tryout");
      let usual = interaction.fields.getTextInputValue("ap_usual");
      let clan = interaction.fields.getTextInputValue("ap_clan");
      let from = interaction.fields.getTextInputValue("ap_from");
      let start = interaction.fields.getTextInputValue("ap_start");

      let applyChannel = interaction.guild.channels.cache.get(config.applyChannel);
      if (!applyChannel) return;

      const user = interaction.user;
      const userName = user.username;

      const threads = applyChannel.threads.cache.find(
        (x) => x.name === "🧤︱" + userName + " Tryout"
      );

      /// Embed of data in review room ///

      await threads.send({
        embeds: [
          new MessageEmbed()
            .setColor(`${color.gray}`)
            .setTitle(`${emojis.app} ${interaction.user.username}'s Tryout Rate`)
            .setAuthor({
              name: `${interaction.user.username}`,
              iconURL: interaction.user.displayAvatarURL(),
            })
            .setDescription(` `)
            ///.setThumbnail(`https://i.imgur.com/Wfs7AQj.png`)
            //.setImage(`${banners.appResultBanner}`)
            .addFields([
              {
                name: `${emojis.id} Tell us when you are available for a tryout`,
                value: `${emojis.threadMark} ${tryout}`,
                inline: false,
              },
              {
                name: `${emojis.age} What are your usual days of play and hours?`,
                value: `${emojis.threadMark} ${usual}`,
                inline: false,
              },
              {
                name: `${emojis.favorites} Have you joined any clan before?`,
                value: `${emojis.threadMark} ${clan}`,
                inline: false,
              },
              {
                name: `${emojis.favorites} Where are you from?`,
                value: `${emojis.threadMark} ${from}`,
                inline: false,
              },
              {
                name: `${emojis.favorites} When did you start playing Smash Legends?`,
                value: `${emojis.threadMark} ${start}`,
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
        components: []
      })
    }
  });
};
