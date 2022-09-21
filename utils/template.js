const image_url = [
  "https://images.pexels.com/photos/36704/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/7249183/pexels-photo-7249183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/8164742/pexels-photo-8164742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/7249185/pexels-photo-7249185.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/10206732/pexels-photo-10206732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/6873647/pexels-photo-6873647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/10336570/pexels-photo-10336570.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/8522573/pexels-photo-8522573.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/7300900/pexels-photo-7300900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/7654916/pexels-photo-7654916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

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
