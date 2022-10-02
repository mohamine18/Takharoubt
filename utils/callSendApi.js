const request = require("request");

const callSendAPI = (senderPsid, response) => {
  // Construct the message body
  let requestBody = {
    recipient: {
      id: senderPsid,
    },
    message: response,
  };
  //send a typing indicator

  senderAction(senderPsid, "typing_on");
  return new Promise((resolve) => {
    setTimeout(() => {
      request(
        {
          uri: process.env.FACEBOOK_URI,
          qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
          method: "POST",
          json: requestBody,
        },
        (err, _res, _body) => {
          if (!err) {
            senderAction(senderPsid, "typing_off");
            resolve("success");
          } else {
            console.error("Unable to send message:" + err);
          }
        }
      );
    }, 10);
  });
};

const senderAction = (senderPsid, indicator) => {
  // three indicator 'mark_seen ' 'typing_on', 'typing_off'
  const requestBody = {
    recipient: {
      id: senderPsid,
    },
    sender_action: indicator,
  };
  request(
    {
      uri: process.env.FACEBOOK_URI,
      qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
      method: "POST",
      json: requestBody,
    },
    (err, _res, _body) => {
      if (!err) {
        // if no error code
      } else {
        console.error("Unable to send Sender Action message:" + err);
      }
    }
  );
};

module.exports = {
  callSendAPI,
  senderAction,
};
