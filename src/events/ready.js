const { Client, ActivityType } = require("discord.js");
const { codeBlock } = require("@discordjs/builders");
const settings = require("../config");
const moment = require("moment");

//// Application Sun ///

module.exports = async (client, settings) => {
  let membersCount = client.guilds.cache
    .map((guild) => guild.memberCount)
    .reduce((a, b) => a + b, 0);
  const statusArray = [
    {
      type: "PLAYING",
      content: `in Library World`,
      status: "idle",
    },
    {
      type: "PLAYING",
      content: `with ${membersCount} Members`,
      status: "idle",
    },
  ];
  async function pickPresence() {
    const option = Math.floor(Math.random() * statusArray.length);
    try {
      await client.user.setPresence({
        activities: [
          {
            name: statusArray[option].content,
            type: statusArray[option].type,
            url: statusArray[option].url,
          },
        ],
        status: statusArray[option].status,
      });
    } catch (error) {
      console.error(error);
    }
  }
  setInterval(pickPresence, 20000);
  console.log(
    `\x1b[31m 〢`,
    `\x1b[30m ${moment(Date.now()).format("LT")}`,
    `\x1b[31m Parfait Activity`,
    `\x1b[32m UPDATED`
  );
  client.channels.cache
    .get(`${settings.Dev_Log}`)
    .send(
      codeBlock(
        "ini",
        `〢 ${moment(Date.now()).format("LT")} [ Parfait Activity UPDATED ]`
      )
    );
};
