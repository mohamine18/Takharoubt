const { image_url } = require("./imageUrl");
// const buttons = [
//   {
//     type: "postback",
//     title: "",
//     payload: "",
//   },
//   {
//     type: "phone_number",
//     title: "",
//     payload: "",
//   },
//   {
//     type: "web_url",
//     title: "Visit Messenger",
//     url: "https://www.messenger.com",
//   },
//   {
//     type: "account_link",
//     url: "<YOUR_LOGIN_URL>",
//   },
//   {
//     type: "account_unlink",
//   },
// ];

exports.genericTemplate = (buttons, title, subtitle) => {
  return {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: title,
            subtitle: subtitle,
            image_url: image_url[Math.floor(Math.random() * 10) + 1],
            buttons: buttons,
          },
        ],
      },
    },
  };
};

exports.buttonTemplate = (buttons, text) => {
  return {
    attachment: {
      type: "template",
      payload: {
        template_type: "button",
        text: text,
        buttons: buttons,
      },
    },
  };
};

exports.textTemplate = (text) => {
  return { text };
};
