const emojis = require('../assest/emojis');

module.exports = async (client) => {
  client.on('messageCreate', (message) => {
    command = message.content.toLowerCase();
    if (command === 'parfait') {
      message.react(emojis.s_parfait);
    } else if (command === 'EgyGamer' || 'egy') {
    message.react(emojis.f_parfait);
    }
  });
}