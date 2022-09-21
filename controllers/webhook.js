const { text } = require("../utils/text");
const { callSendAPI, senderAction } = require("../utils/callSendApi");
const {
  genericTemplate,
  buttonTemplate,
  textTemplate,
} = require("../utils/template");

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
        0senderAction(senderPsid, "mark_seen");
        handleMessage(senderPsid, webhookEvent.message);
      } else if (webhookEvent.postback) {
        //! senderAction(senderPsid, "mark_seen");
        handlePostBack(senderPsid, webhookEvent.postback);
      }
    });
    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
};

// Handle messages events
const handleMessage = async (senderPsid, receivedMessage) => {
  //Check if the message contain a text
  switch (receivedMessage.text) {
    case "مرحبا":
      buttons = [
        {
          type: "web_url",
          title: text.createRoom,
          url: "https://takharoubt-app-aa6ev.ondigitalocean.app/",
        },
        {
          type: "postback",
          title: text.joinRoom,
          payload: "joinRoom",
        },
        {
          type: "postback",
          title: text.joinMosque,
          payload: "joinMosque",
        },
      ];
      await callSendAPI(senderPsid, textTemplate(text.marhaba));
      await callSendAPI(senderPsid, textTemplate(text.menu));
      await callSendAPI(
        senderPsid,
        genericTemplate(buttons, text.menuTitle, text.menuSubtitle)
      );
      break;
    case "مساعدة":
      await callSendAPI(senderPsid, textTemplate(text.help));
      await callSendAPI(senderPsid, textTemplate(text.how));
      break;
    default:
      await callSendAPI(senderPsid, textTemplate(text.default));
  }
};
// handle post-back events
const handlePostBack = async (senderPsid, receivedPostBack) => {
  let response;

  // Get the payload for the post-back
  let payload = receivedPostBack.payload;

  // Set the response based on the post-back payload
  switch (payload) {
    case joinRoom:
      response = { text: "Thanks!" };
      break;
    case joinMosque:
      response = { text: "Oops, try sending another image." };
      break;
    default:
      break;
  }
  // Send the message to acknowledge the post-back
  await callSendAPI(senderPsid, response);
};
