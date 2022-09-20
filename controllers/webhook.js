const { callSendAPI } = require("../utils/callSendApi");
const { genericTemplate } = require("../templates/generic");

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
        handleMessage(senderPsid, webhookEvent.message);
      } else if (webhookEvent.postback) {
        handlePostBack(senderPsid, webhookEvent.postback);
      }
    });
    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
};

// Handle messages events
const handleMessage = (senderPsid, receivedMessage) => {
  let response;
  //Check if the message contain a text
  if (receivedMessage.text) {
    response = {
      text: `You sent the message: '${receivedMessage.text}'. Now send me an attachment!`,
    };
  } else if (receivedMessage.attachments) {
    // Get the URL of the message attachment
    // let attachmentUrl = receivedMessage.attachments[0].payload.url;
    listOfButtons = [
      {
        type: "postback",
        title: "Yes!",
        payload: "yes",
      },
      {
        type: "postback",
        title: "No!",
        payload: "no",
      },
    ];
    response = genericTemplate(listOfButtons);
  }
  // Send the response message
  callSendAPI(senderPsid, response);
};
// handle post-back events
const handlePostBack = (senderPsid, receivedPostBack) => {
  let response;

  // Get the payload for the post-back
  let payload = receivedPostBack.payload;

  // Set the response based on the post-back payload
  if (payload === "yes") {
    response = { text: "Thanks!" };
  } else if (payload === "no") {
    response = { text: "Oops, try sending another image." };
  }
  // Send the message to acknowledge the post-back
  callSendAPI(senderPsid, response);
};
// Sends response messages via the Send API
