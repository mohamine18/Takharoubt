const ViberBot = require("viber-bot").Bot;
const BotEvents = require("viber-bot").Events;
const TextMessage = require("viber-bot").Message.Text;
const KeyboardMessage = require("viber-bot").Message.Keyboard;
const UrlMessage = require("viber-bot").Message.Url;

const { text } = require("../utils/text");
const { keyboardJson } = require("../utils/keyboardViber");

const Division = require("../models/division");

const bot = new ViberBot({
  authToken: process.env.VIBER_AUTH_TOKEN,
  name: "Takharoubt",
  avatar: "https://mvslim.com/wp-content/uploads/2021/03/quran-1.jpeg",
});

function say(response, message) {
  return new Promise((resolve) => {
    setTimeout(() => {
      response.send(
        new TextMessage(message, keyboardJson(response.userProfile.id))
      );
      resolve("success");
    }, 1500);
  });
}

function sendUrl(response, url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      response.send(new UrlMessage(url, keyboardJson(response.userProfile.id)));
      resolve("success");
    }, 1500);
  });
}

bot.onSubscribe(async (response) => {
  // keyboard(response);
  await say(response, text.marhaba);
  await say(response, text.menu);
});

bot.onConversationStarted((userProfile, isSubscribed, context, onFinish) => {
  onFinish(new TextMessage(text.marhaba, keyboardJson(userProfile.id)));
});

bot.on(BotEvents.MESSAGE_RECEIVED, async (message, response) => {
  // keyboard(response);
  // This sample bot can answer only text messages, let's make sure the user is aware of that.
  if (!(message instanceof TextMessage)) {
    await say(response, `Sorry. I can only understand text messages.`);
  }
});

bot.onTextMessage(/./, async (message, response) => {
  const receivedWord = message.text;
  // console.log(receivedWord.match(/^[h](ttps|ttp)/)?.input);
  switch (receivedWord.toLowerCase()) {
    case "hello":
      await say(response, text.marhaba);
      await say(response, text.menu);
      break;
    case "joinroom":
      await say(response, text.enterRoomCode);
      break;
    case "help":
      await say(response, text.help);
      await say(response, text.how);
      break;
    case receivedWord.toLowerCase().match(/^[h](ttps|ttp)/)?.input:
      break;
    case receivedWord
      .toLowerCase()
      .match(/^(takharoubt)-(hizb|juz|manzil)-([a-zA-Z0-9]){5}/)?.input:
      const exists = await Division.findOne({
        code: receivedWord.trim(),
        active: true,
      });
      console.log("received word: ", receivedWord);
      console.log("exists: ", exists);
      if (exists) {
        say(response, text.buttonJoinRoom);
        sendUrl(
          response,
          `${
            process.env.WEBSITE_URL
          }/select-division/${receivedWord.trim()}?psid=${
            response.userProfile.id
          }&roomCode=${receivedWord.trim()}&platform=viber`
        );
      } else {
        say(response, text.roomNotFound);
      }
      break;
    default:
      await say(response, text.default);
      break;
  }
});

module.exports = bot;
