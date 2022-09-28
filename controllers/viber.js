const ViberBot = require("viber-bot").Bot;
const BotEvents = require("viber-bot").Events;
const TextMessage = require("viber-bot").Message.Text;

const bot = new ViberBot({
  authToken: process.env.VIBER_AUTH_TOKEN,
  name: "Takharoubt",
  avatar: "https://mvslim.com/wp-content/uploads/2021/03/quran-1.jpeg",
});

bot.onSubscribe((response) => {
  say(
    response,
    `Hi there ${response.userProfile.name}. I am ${bot.name}! Feel free to ask me if a web site is down for everyone or just you. Just send me a name of a website and I'll do the rest!`
  );
});

module.exports = bot;
