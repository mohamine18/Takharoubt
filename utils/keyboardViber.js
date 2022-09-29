const { text } = require("./text");

exports.keyboardJson = (senderPsid) => {
  return {
    Type: "keyboard",
    min_api_version: 4,
    InputFieldState: "minimized",
    Buttons: [
      {
        Columns: 6,
        Rows: 1,
        BgColor: "#009000",
        Silent: true,
        ActionType: "open-url",
        OpenURLType: "internal",
        InternalBrowser: {
          Mode: "fullscreen",
          CustomTitle: text.createRoom,
        },
        ActionBody: `${process.env.WEBSITE_URL}/create-a-room?psid=${senderPsid}&platform=viber`,
        Text: `<font color="#ffffff"><b>${text.createRoom}</b></font>`,
        TextVAlign: "middle",
        TextHAlign: "center",
        TextSize: "medium",
      },
      {
        Columns: 6,
        Rows: 1,
        BgColor: "#009000",
        ActionType: "reply",
        ActionBody: "joinRoom",
        Text: `<font color="#ffffff"><b>${text.joinRoom}</b></font>`,
        TextVAlign: "middle",
        TextHAlign: "center",
        TextSize: "medium",
      },
    ],
  };
};
