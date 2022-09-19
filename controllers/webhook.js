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
  console.log("1- body of request: ", body);
  if (body.object === "page") {
    body.entry.forEach((entry) => {
      // GET the body of the Webhook Event
      const webhookEvent = entry.messaging[0];
      console.log("2- Webhook Event: ", webhookEvent);

      // GET the sender PSID
      const senderPsid = webhookEvent.sender.id;
      console.log("3- Sender PSID: ", senderPsid);

      // CHECK if the event is a message or a post-back and pass the event to the appropriate handler function
      if (webhookEvent.message) {
        // handleMessage(senderPsid, webhookEvent.message);
        console.log("4- Message: ", webhookEvent.message);
      } else if (webhookEvent.postBack) {
        // handlePostBack(senderPsid, webhookEvent.postBack);
        console.log("5- Post back: ", webhookEvent.postBack);
      }
    });
    // Returns a '200 OK' response to all requests
    res.status(200).send("EVENT_RECEIVED");
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
};

const handleMessage = (senderPsid, receivedMessage) => {};
const handlePostBack = (senderPsid, receivedPostBack) => {};
