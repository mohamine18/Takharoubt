const text = require("./text");

exports.keyboardJson = (senderPsid) => {
  return {
    keyboard: {
      DefaultHeight: false,
      BgColor: "#FFFFFF",
      Buttons: [
        {
          Columns: 6,
          Rows: 1,
          BgColor: "#2db9b9",
          ActionType: "open-url",
          ActionBody: `${process.env.WEBSITE_URL}/create-a-room?psid=${senderPsid}&platform=viber`,
          OpenURLType: "internal",
          InternalBrowser: {
            Mode: "fullscreen",
            CustomTitle: text.createRoom,
          },
          Text: text.createRoom,
          TextVAlign: "middle",
          TextHAlign: "center",
          TextSize: "regular",
        },
      ],
    },
  };
};
