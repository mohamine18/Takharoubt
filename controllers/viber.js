const ViberBot = require("viber-bot").Bot;
const BotEvents = require("viber-bot").Events;
const TextMessage = require("viber-bot").Message.Text;
const KeyboardMessage = require("viber-bot").Message.Keyboard;
const UrlMessage = require("viber-bot").Message.Url;

const text = require("../utils/text");

const bot = new ViberBot({
  authToken: process.env.VIBER_AUTH_TOKEN,
  name: "Takharoubt",
  avatar: "https://mvslim.com/wp-content/uploads/2021/03/quran-1.jpeg",
});

function say(response, message) {
  response.send(new TextMessage(message));
}

bot.onSubscribe((response) => {
  say(
    response,
    `Hi there ${response.userProfile.name}. I am ${bot.name}! this is id ${response.userProfile.id}`
  );
});

bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
  // This sample bot can answer only text messages, let's make sure the user is aware of that.
  if (!(message instanceof TextMessage)) {
    say(response, `Sorry. I can only understand text messages.`);
  }
  response.send(
    new KeyboardMessage({
      Type: "keyboard",
      Buttons: [
        {
          Columns: 6,
          Rows: 1,
          BgColor: "#2db9b9",
          ActionType: "open-url",
          ActionBody: `${process.env.WEBSITE_URL}/create-a-room?psid=${response.userProfile.id}&platform=viber`,
          OpenURLType: "internal",
          InternalBrowser: {
            Mode: "fullscreen",
            CustomTitle: text.createRoom,
          },
          Text: text.createRoom,
          TextVAlign: "middle",
          TextHAlign: "center",
          TextSize: "regular",
        },
      ],
    })
  );
});

bot.onTextMessage(/./, (message, response) => {
  say(
    response,
    `Hi there ${response.userProfile.name}. I am ${bot.name}! this is id ${response.userProfile.id}`
  );
});

module.exports = bot;
