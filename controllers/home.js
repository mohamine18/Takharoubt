const { text } = require("../utils/text");
const { callSendAPI, senderAction } = require("../utils/callSendApi");
const {
  genericTemplate,
  buttonTemplate,
  textTemplate,
} = require("../utils/template");

exports.home = (req, res) => {
  res.render("home");
};

exports.createRoom = (req, res) => {
  res.render("createRoom");
};

exports.getFormData = (req, res) => {
  console.log(req.body);
  res.redirect("/create-a-room");
};

exports.closingPage = async (req, res) => {
  console.log(req.body);
  if (req.body.psid !== 0) {
    await callSendAPI(req.body.psid, textTemplate(text.close));
  }
  res.status(200).json({ message: "success" });
};

exports.redirectPage = (req, res) => {
  res.render("redirectPage");
};
