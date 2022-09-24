const { text } = require("../utils/text");
const { callSendAPI, senderAction } = require("../utils/callSendApi");
const {
  genericTemplate,
  buttonTemplate,
  textTemplate,
} = require("../utils/template");

const Division = require("../models/division");

exports.home = (req, res) => {
  res.render("home");
};

exports.createRoom = (req, res) => {
  res.render("createRoom");
};

exports.getFormData = async (req, res) => {
  console.log("body psid:" + req.body.psid);
  const newDivision = new Division({
    psid: req.body.psid,
    method: req.body.method,
    period: req.body.period,
    comment: req.body.comment,
  });
  const div = await newDivision.save();
  console.log(div);
  await callSendAPI(req.body.psid, textTemplate(text.Received));
  await callSendAPI(req.body.psid, textTemplate(div.code));
  await callSendAPI(req.body.psid, textTemplate(text.shareCode));
  res.status(200).json({ message: "success" });
};

exports.closingPage = async (req, res) => {
  if (req.body.psid !== 0) {
    await callSendAPI(req.body.psid, textTemplate(text.close));
  }
  res.status(200).json({ message: "success" });
};

exports.redirectPage = (req, res) => {
  res.render("redirectPage");
};
