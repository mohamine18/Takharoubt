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
  response.send(
    new TextMessage(message, keyboardJson(response.userProfile.id))
  );
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
  console.log(message);
  if (message.text === "مرحبا") {
    say(response, text.default);
    say(response, text.menu);
    return;
  }
  if (message.text === "إنضمام إلى ختمة جماعية") {
    say(response, text.enterRoomCode);
    return;
  }
  if (message.text === "مساعدة") {
    say(response, text.help);
    say(response, text.menu);
  }
});

module.exports = bot;
