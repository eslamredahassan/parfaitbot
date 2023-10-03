const { Client } = require("discord.js");
Client.setMaxListeners(0);
const { codeBlock } = require("@discordjs/builders");
const config = require("./src/config");
const ready = require("./src/events/ready");
const antiCrash = require("./src/events/antiCrash");
const slashCommands = require("./src/events/slashCommands");
const alive = require("./src/events/alive");
const logo = require("./src/assest/logo");
const moment = require("moment");
const discord = require("discord.js");
const fs = require('fs')

const client = new Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "DIRECT_MESSAGES", "MESSAGE_CONTENT", "DIRECT_MESSAGES"],
  partials: ["CHANNEL"],
});

client.on("ready", async () => {
  alive(client, config);
  antiCrash(client, config);
  ready(client, config);
  slashCommands(client, config);  

  // ------ Slash Command ------- //
    const setup_open = require(`./src/interface/setup_open`)(client, config);
    const setup_close = require(`./src/interface/setup_close`)(client, config);
    const maintenance = require(`./src/interface/maintenance`)(client, config);
  // -------------------------------------//
  
  // ------ Application Interactions ------- //
    const application = require(`./src/commands/application`)(client, config);
    const apply = require(`./src/commands/apply`)(client, config);
    const accept = require(`./src/commands/accept`)(client, config);
    const silent_accept = require(`./src/commands/silent_accept`)(client, config);
    const promote = require(`./src/commands/promote`)(client, config);
    const reject = require(`./src/commands/reject`)(client, config);
    const silent_reject = require(`./src/commands/silent_reject`)(client, config);
    const aplogize = require(`./src/commands/apologize`)(client, config);
    const freeze = require(`./src/commands/freeze`)(client, config);
    const requirements = require(`./src/commands/requirements`)(client, config);
    const answer_yes = require(`./src/commands/answer_yes`)(client, config);
    const answer_no = require(`./src/commands/answer_no`)(client, config);
    const reply = require(`./src/commands/reply`)(client, config);
  // -------------------------------------//

  // ------------ Select Menu ------------ //
    const about_menu = require(`./src/select menu/about_menu`)(client, config);
    const faq_menu = require(`./src/select menu/faq_menu`)(client, config);
  // -------------------------------------//
  
  // ------------ Interactions ------------ //
    const questions = require(`./src/interaction/questions`)(client, config);
    const smart_questions = require(`./src/interaction/smart_questions`)(client, config);
    const report = require(`./src/interaction/report`)(client, config);
  // -------------------------------------//

  
    const prefix_quetions = require(`./src/parfait/prefix_quetions`)(client, config);
    const forward = require(`./src/parfait/forward`)(client, config);
    const forward_reply = require(`./src/parfait/forward_reply`)(client, config);
    //const auto_react = require(`./src/parfait/auto_react`)(client, config);
    //const sun_ai = require(`./src/parfait/sun_ai`)(client, config);
    //const mentions = require(`./src/parfait/mentions`)(client, config);
    //const chat = require(`./src/parfait/chat`)(client, config);
  
  console.log(
    `\x1b[31m 〢`,
    `\x1b[30m ${moment(Date.now()).format("LT")}`,
    `\x1b[31m ${client.user.tag}`,
    `\x1b[32m ONLINE`
  );
  client.channels.cache
    .get(`${config.Dev_Log}`)
    .send(
      codeBlock(
        "ini",
        `〢 ${moment(Date.now()).format("LT")} [ ${client.user.tag} Online ]`
      )
    );
  console.log(
    `\x1b[31m 〢`,
    `\x1b[30m ${moment(Date.now()).format("LT")}`,
    `\x1b[31m SUN™&Co Smash Legends`,
    `\x1b[32m CHECKED`
  );
  client.channels.cache
    .get(`${config.Dev_Log}`)
    .send(
      codeBlock(
        "ini",
        `〢 ${moment(Date.now()).format("LT")} [ Parfait • IEgyGamerI ᴰᵉᵛ Checked ]`
      )
    );

});

client.login(config.token).catch(() => console.log('Invalid Token'));
