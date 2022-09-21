const request = require("request");

exports.callSendAPI = (senderPsid, response) => {
  // Construct the message body
  let requestBody = {
    recipient: {
      id: senderPsid,
    },
    message: response,
  };
  //send a typing indicator
  senderAction(senderPsid, "typing_on");
  // Send the HTTP request to the Messenger Platform
  return new Promise((resolve) => {
    setTimeout(() => {
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
            resolve("Message sent!");
          } else {
            console.error("Unable to send message:" + err);
          }
        }
      );
    }, 2000);
  });
};

exports.senderAction = (senderPsid, indicator) => {
  // three indicator 'mark_seen ' 'typing_on', 'typing_off'
  const requestBody = {
    recipient: {
      id: senderPsid,
    },
    sender_action: indicator,
  };
  request(
    {
      uri: "https://graph.facebook.com/v15.0/me/messages",
      qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
      method: "POST",
      json: requestBody,
    },
    (err, _res, _body) => {
      if (!err) {
        console.log("Sender Action Message sent!");
      } else {
        console.error("Unable to send Sender Action message:" + err);
      }
    }
  );
};
