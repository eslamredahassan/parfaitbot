const { MessageActionRow, Modal, TextInputComponent } = require("discord.js");
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
        case "#ap_questions":
          {
            console.log(
              `\x1b[31m 〢`,
              `\x1b[30m ${moment(Date.now()).format("lll")}`,
              `\x1b[34m${interaction.user.username} USED`,
              `\x1b[35m Reply Button`
            );
            //// Modal application code ///
            let questions_modal = new Modal()
              .setTitle(`Complete the application`)
              .setCustomId(`questions_modal`);

            const available = new TextInputComponent()
              .setCustomId("available")
              .setLabel(`When you are available for a tryout by our Staff?`.substring(0, 45))
              .setMinLength(1)
              .setMaxLength(35)
              .setRequired(true)
              .setPlaceholder(`Write here the time you will be available`)
              .setStyle(1);

            const clan = new TextInputComponent()
              .setCustomId("clan")
              .setLabel(`Have you joined any clan before?`.substring(0, 45))
              .setMinLength(1)
              .setMaxLength(35)
              .setRequired(true)
              .setPlaceholder(`Answer with Yes or No`)
              .setStyle(1);

            const from = new TextInputComponent()
              .setCustomId("from")
              .setLabel(`Where are you from?`.substring(0, 45))
              .setMinLength(1)
              .setMaxLength(35)
              .setRequired(true)
              .setPlaceholder(`Ex: France`)
              .setStyle(1);

            const when = new TextInputComponent()
              .setCustomId("when")
              .setLabel(`When did you start playing Smash Legends?`.substring(0, 45))
              .setMinLength(1)
              .setMaxLength(35)
              .setRequired(true)
              .setPlaceholder(`Ex: one month ago`)
              .setStyle(1);

            const rank = new TextInputComponent()
              .setCustomId("rank")
              .setLabel(`What is the highest rank you have obtained?`.substring(0, 45))
              .setMinLength(1)
              .setMaxLength(35)
              .setRequired(true)
              .setPlaceholder(`Ex: Diamond`)
              .setStyle(1);

            let row_available = new MessageActionRow().addComponents(available);
            let row_clan = new MessageActionRow().addComponents(clan);
            let row_from = new MessageActionRow().addComponents(from);
            let row_when = new MessageActionRow().addComponents(when);
            let row_rank = new MessageActionRow().addComponents(rank);
            questions_modal.addComponents(row_available, row_clan, row_from, row_when, row_rank);

            await interaction.showModal(questions_modal);
          }
        default:
          break;
      }
    }
    //// Send application results in review room ////
    if (interaction.customId === 'questions_modal') {
      let available = interaction.fields.getTextInputValue("available");
      let clan = interaction.fields.getTextInputValue("clan");
      let from = interaction.fields.getTextInputValue("from");
      let when = interaction.fields.getTextInputValue("when");
      let rank = interaction.fields.getTextInputValue("rank");

      /// Embed of data in review room ///

      

            let applyChannel = interaction.guild.channels.cache.get(config.applyChannel);
            if (!applyChannel) return;

            const user = interaction.user;
            const userName = user.username;

            const threads = applyChannel.threads.cache.find(
              (x) => x.name === "🧤︱" + userName + " Tryout"
              );

      await interaction.reply({
        embeds: [
          {
            title: `${emojis.app} ${interaction.user.username}'s application'`,
            description: '',
            color: color.gray,
            thumbnail: { url: interaction.user.displayAvatarURL() },
            fields: [
              {
                name: `when you're available for a tryout by our Staff?`,
                value: available,
                inline: false
              },
              {
                name: 'Have you joined any clan before?',
                value: clan,
                inline: false
              },
              {
                name: 'Where are you from?',
                value: from,
                inline: false
              },
              {
                name: 'When did you start playing Smash Legends?',
                value: when,
                inline: false
              },
              {
                name: 'What is the highest rank you have obtained?',
                value: rank,
                inline: false
              },
            ],
            //image: { url: `${banners.appSentbanner}` },
            timestamp: new Date(),
            footer: {
              text: interaction.user.username,
              icon_url: banners.parfaitIcon,
            },
          },
        ],
        components: [],
      });
    }
  });
};
