const ViberBot = require("viber-bot").Bot;
const BotEvents = require("viber-bot").Events;
const TextMessage = require("viber-bot").Message.Text;
const KeyboardMessage = require("viber-bot").Message.Keyboard;
const UrlMessage = require("viber-bot").Message.Url;

const { text } = require("../utils/text");
const { keyboardJson } = require("../utils/keyboardViber");

const bot = new ViberBot({
  authToken: process.env.VIBER_AUTH_TOKEN,
  name: "Takharoubt",
  avatar: "https://mvslim.com/wp-content/uploads/2021/03/quran-1.jpeg",
});

function say(response, message) {
  setTimeout(() => {
    response.send(new TextMessage(message));
    response.send(new KeyboardMessage(keyboardJson(response.userProfile.id)));
  }, 1500);
}

bot.onSubscribe((response) => {
  // keyboard(response);
  say(response, text.marhaba);
  say(response, text.menu);
});

bot.onConversationStarted((userProfile, isSubscribed, context, onFinish) => {
  onFinish(new TextMessage(text.marhaba, keyboardJson(userProfile.id)));
});

bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
  // keyboard(response);
  // This sample bot can answer only text messages, let's make sure the user is aware of that.
  if (!(message instanceof TextMessage)) {
    say(response, `Sorry. I can only understand text messages.`);
  }
});

bot.onTextMessage(/./, (message, response) => {
  const receivedWord = message.text;
  console.log(receivedWord.match(/^[h](ttps|ttp)/)?.input);
  switch (receivedWord.toLowerCase()) {
    case "hello":
      say(response, text.marhaba);
      say(response, text.menu);
      break;
    case "joinroom":
      say(response, text.enterRoomCode);
      break;
    case "help":
      say(response, text.help);
      say(response, text.how);
      break;
    case receivedWord.match(/^[h](ttps|ttp)/)?.input:
      break;
    default:
      say(response, text.default);
      break;
  }
});

module.exports = bot;
