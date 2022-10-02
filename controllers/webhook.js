const catchAsync = require("../utils/catchAsync");
const { text } = require("../utils/text");
const { callSendAPI, senderAction } = require("../utils/callSendApi");
const {
  genericTemplate,
  buttonTemplate,
  textTemplate,
} = require("../utils/template");

const Division = require("../models/division");

exports.getWebhook = (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];
  if (mode && token) {
    if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
};

exports.postWebhook = (req, res) => {
  const body = req.body;
  if (body.object === "page") {
    body.entry.forEach((entry) => {
      // GET the body of the Webhook Event
      const webhookEvent = entry.messaging[0];
      // GET the sender PSID
      const senderPsid = webhookEvent.sender.id;
      // CHECK if the event is a message or a post-back and pass the event to the appropriate handler function
      if (webhookEvent.message) {
        senderAction(senderPsid, "mark_seen");
        handleMessage(senderPsid, webhookEvent.message);
      } else if (webhookEvent.postback) {
        senderAction(senderPsid, "mark_seen");
        handlePostBack(senderPsid, webhookEvent.postback);
      }
    });
    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
};

// Handle messages events
const handleMessage = catchAsync(async (senderPsid, receivedMessage) => {
  //Check if the message contain a text
  const receivedWord = receivedMessage.text;
  console.log(
    /^(takharoubt)-(hizb|juz|manzil)-([a-zA-Z0-9]){5}/.test(receivedWord)
  );
  switch (receivedWord.toLowerCase()) {
    case "hello":
      greetings(senderPsid);
      break;
    case "help":
      await callSendAPI(senderPsid, textTemplate(text.help));
      await callSendAPI(senderPsid, textTemplate(text.how));
      break;
    case receivedWord.match(/^(takharoubt)-(hizb|juz|manzil)-([a-zA-Z0-9]){5}/)
      ?.input:
      const exists = await Division.findOne({
        code: receivedWord,
        active: true,
      });
      if (exists) {
        joinRoom(senderPsid, receivedWord);
      } else {
        await callSendAPI(senderPsid, textTemplate(text.roomNotFound));
      }
      break;
    default:
      await callSendAPI(senderPsid, textTemplate(text.default));
  }
});
// handle post-back events
const handlePostBack = catchAsync(async (senderPsid, receivedPostBack) => {
  // Get the payload for the post-back
  let payload = receivedPostBack.payload;

  // Set the response based on the post-back payload
  switch (payload) {
    case "get_started":
      greetings(senderPsid);
      break;
    case "joinRoom":
      await callSendAPI(senderPsid, textTemplate(text.enterRoomCode));
      break;
    // case "joinMosque":
    //   // await callSendAPI(senderPsid, textTemplate(text.));
    //   break;
    default:
      break;
  }
  // Send the message to acknowledge the post-back
});

const greetings = catchAsync(async (senderPsid) => {
  buttons = [
    {
      type: "web_url",
      title: text.createRoom,
      url: `${process.env.WEBSITE_URL}/create-a-room?psid=${senderPsid}&platform=facebook`,
      webview_height_ratio: "full",
      webview_share_button: "hide",
      messenger_extensions: true,
      fallback_url: `${process.env.WEBSITE_URL}/redirect`,
    },
    {
      type: "postback",
      title: text.joinRoom,
      payload: "joinRoom",
    },
    // {
    //   type: "postback",
    //   title: text.joinMosque,
    //   payload: "joinMosque",
    // },
  ];
  await callSendAPI(senderPsid, textTemplate(text.marhaba));
  await callSendAPI(senderPsid, textTemplate(text.menu));
  await callSendAPI(
    senderPsid,
    genericTemplate(buttons, text.menuTitle, text.menuSubtitle)
  );
});

const joinRoom = catchAsync(async (senderPsid, roomCode) => {
  buttons = [
    {
      type: "web_url",
      title: text.buttonJoinRoom,
      url: `${process.env.WEBSITE_URL}/select-division/${roomCode}?psid=${senderPsid}&roomCode=${roomCode}&platform=facebook`,
      webview_height_ratio: "full",
      webview_share_button: "hide",
      messenger_extensions: true,
      fallback_url: `${process.env.WEBSITE_URL}/redirect`,
    },
  ];
  await callSendAPI(senderPsid, buttonTemplate(buttons, text.roomLink));
});
