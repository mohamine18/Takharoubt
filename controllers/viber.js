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

function keyboard(response) {
  response.send(
    new KeyboardMessage({
      Type: "keyboard",
      Buttons: [
        {
          Columns: 6,
          Rows: 1,
          BgColor: "#009000",
          Silent: true,
          ActionType: "open-url",
          OpenURLType: "internal",
          InternalBrowser: {
            Mode: "fullscreen",
            CustomTitle: text.createRoom,
          },
          ActionBody: `${process.env.WEBSITE_URL}/create-a-room?psid=${response.userProfile.id}&platform=viber`,
          Text: `<font color="#ffffff">${text.createRoom}</font>`,
          TextVAlign: "middle",
          TextHAlign: "center",
          TextSize: "medium",
        },
        {
          Columns: 6,
          Rows: 1,
          BgColor: "#009000",
          ActionType: "reply",
          ActionBody: `${text.enterRoomCode}`,
          Text: `<font color="#ffffff">${text.joinRoom}</font>`,
          TextVAlign: "middle",
          TextHAlign: "center",
          TextSize: "medium",
        },
      ],
    })
  );
}

bot.onSubscribe((response) => {
  keyboard(response);
  say(
    response,
    `Hi there ${response.userProfile.name}. I am ${bot.name}! this is id ${response.userProfile.id}`
  );
});

bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
  keyboard(response);
  // This sample bot can answer only text messages, let's make sure the user is aware of that.
  if (!(message instanceof TextMessage)) {
    say(response, `Sorry. I can only understand text messages.`);
  }
});

bot.onTextMessage(/./, (message, response) => {
  keyboard(response);
  console.log(message);
  say(response, `${text.default}`);
});

module.exports = bot;
