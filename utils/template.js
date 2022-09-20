const image_url =
  "https://images.pexels.com/photos/36704/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

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
            image_url: image_url,
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
