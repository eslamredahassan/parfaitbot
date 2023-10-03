const { client } = require("discord.js");
const config = require("../config");
const r = require("../assest/responses.js");
const prefix = '.'

module.exports = async (client, config) => {
  client.on('messageCreate', (message) => {
    if (message.content === prefix + 'complete my appliction') {


      let questions = {
        q1: "Please send a screenshot from your in-game profile here",
        q2: `Tell us when you are available for a tryout by our <@&${config.staffSun}>`,
        q3: "What are your usual days of play and hours?",
        q4: "Have you joined any clan before?",
        q5: "Where are you from?",
        q6: "When did you start playing Smash Legends?",
        q7: "Have you read the requirements?",
      }

      const filter = m => m.user.id === message.user.id
      message.channel.send({ content: `${questions.q1}` }).then(async msg => {
        await msg.channel.awaitMessages({ message: filter, time: 60000, max: 1 }).then(collected => {
          const msg1 = collected.first().content
          message.channel.send({ content: `${questions.q2}` }).then(async msg => {
            await msg.channel.awaitMessages({ message: filter, time: 60000, max: 1 }).then(collected => {
              const msg2 = collected.first().content
              message.channel.send({ content: `${questions.q3}` }).then(async msg => {
                await msg.channel.awaitMessages({ message: filter, time: 60000, max: 1 }).then(collected => {
                  const msg3 = collected.first().content
                  message.channel.send({ content: `${questions.q4}` }).then(async msg => {
                    await msg.channel.awaitMessages({ message: filter, time: 60000, max: 1 }).then(collected => {
                      const msg4 = collected.first().content
                      message.channel.send({ content: `${questions.q5}` }).then(async msg => {
                        await msg.channel.awaitMessages({ message: filter, time: 60000, max: 1 }).then(collected => {
                          const msg5 = collected.first().content
                          message.channel.send({ content: `${questions.q6}` }).then(async msg => {
                            await msg.channel.awaitMessages({ message: filter, time: 60000, max: 1 }).then(collected => {
                              const msg6 = collected.first().content
                              message.channel.send({ content: `${questions.q7}` }).then(async msg => {
                                await msg.channel.awaitMessages({ message: filter, time: 60000, max: 1 }).then(collected => {
                                  const msg7 = collected.first().content
                                  return message.channel.send({ content: `${questions.q1}\nAns: ${msg1}\n${questions.q2}\nAns: ${msg2}` })
                                })
                              })
                            })
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        })
      });
    }
  });
}