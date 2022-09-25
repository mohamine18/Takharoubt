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
  const psid = "5477668622316338";
  // const psid = req.body.psid;
  const divisionCount = await Division.find({ psid: psid, active: true });
  if (divisionCount.length === 5) {
    await callSendAPI(psid, textTemplate(text.limit));
    await callSendAPI(
      psid,
      textTemplate(text.limitExplanation + divisionCount.length)
    );
  } else {
    const newDivision = new Division({
      psid,
      method: req.body.method,
      period: req.body.period,
      comment: req.body.comment,
    });
    const div = await newDivision.save();
    await callSendAPI(psid, textTemplate(text.Received));
    await callSendAPI(psid, textTemplate(div.code));
    await callSendAPI(psid, textTemplate(text.shareCode));
  }

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

exports.divisionPage = (req, res) => {
  console.log(req.params.divisionId);
  res.render("divisionPage");
};
