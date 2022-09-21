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

  //! senderAction(senderPsid, "typing_on");

  // Send the HTTP request to the Messenger Platform

  // return new Promise((resolve) => {
  //   setTimeout(() => {

  //   }, 2000);
  // });
  // console.log(requestBody);
  request(
    {
      uri: process.env.FACEBOOK_URI,
      qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
      method: "POST",
      json: requestBody,
    },
    (err, _res, _body) => {
      if (!err) {
        console.log("Message sent!");
        // senderAction(senderPsid, "typing_off");
        // resolve("Message sent!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
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
        console.log(`Sender Action ${indicator} Message sent!`);
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
