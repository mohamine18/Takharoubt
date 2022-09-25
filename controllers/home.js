const { text } = require("../utils/text");
const { callSendAPI, senderAction } = require("../utils/callSendApi");
const {
  genericTemplate,
  buttonTemplate,
  textTemplate,
} = require("../utils/template");

const { hizb, juz, manzil } = require("../data/data");

const Division = require("../models/division");

exports.home = (req, res) => {
  res.render("home");
};

exports.createRoom = (req, res) => {
  res.render("createRoom");
};

exports.getFormData = async (req, res) => {
  // const psid = "5477668622316338";
  const psid = req.body.psid;
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

exports.divisionPage = async (req, res) => {
  let data;
  const divisionId = req.params.divisionId;
  const division = await Division.findOne({ code: divisionId });

  switch (division.method) {
    case "manzil":
      data = divisions(division, manzil);
      break;
    case "juz":
      data = divisions(division, juz);
      break;
    case "hizb":
      data = divisions(division, hizb);
      break;
    default:
      break;
  }
  res.render("divisionPage", { data });
};

const divisions = (division, data) => {
  const used = division.selectedIndexes;
  const divisions = data.map((element) => {
    const startText =
      element.start.verse === "1" || element.start.verse === undefined
        ? `من بداية سورة ${element.start.titleAr}`
        : `من سورة ${element.start.titleAr} آية ${element.start.verse}`;
    const endText =
      element.end.verse == element.end.count
        ? `الى آخر سورة ${element.end.titleAr}`
        : `الى الآية ${element.end.verse} من سورة ${element.end.titleAr}`;
    const text = `${startText} ${endText}`;
    const disabled = used.includes(element.index) ? "disabled" : "";
    return { index: element.index, text, disabled };
  });
  return divisions;
};

exports.selectedDivision = async (req, res) => {
  const { psid, index, divisionText } = req.body;
  console.log(typeof psid);
  if (psid !== 0) {
    await callSendAPI(psid, textTemplate(text.selected));
    await callSendAPI(psid, textTemplate(divisionText));
  }
  res.status(200).json({ message: "success" });
};
