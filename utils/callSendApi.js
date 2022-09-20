const request = require("request");

exports.callSendAPI = (senderPsid, response) => {
  // Construct the message body
  let requestBody = {
    recipient: {
      id: senderPsid,
    },
    message: response,
  };
  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: "https://graph.facebook.com/v15.0/me/messages",
      qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
      method: "POST",
      json: requestBody,
    },
    (err, _res, _body) => {
      if (!err) {
        console.log("Message sent!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
};
