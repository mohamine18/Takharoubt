const moment = require("moment");
const { image_url } = require("../utils/imageUrl");
const Email = require("../utils/mail");
const catchAsync = require("../utils/catchAsync");
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
  res.render("home", { link: process.env.MESSENGER_LINK });
};

exports.createRoom = (req, res) => {
  res.render("createRoom", {
    pageTitle: text.pageTitle,
    imageUrl: image_url[Math.floor(Math.random() * 10) + 1],
    description: text.help,
    url: process.env.WEBSITE_URL,
  });
};

exports.redirectPage = (req, res) => {
  res.render("redirectPage", {
    link: process.env.MESSENGER_LINK,
  });
};

exports.getFormData = catchAsync(async (req, res) => {
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
});

exports.closingPage = catchAsync(async (req, res) => {
  if (req.body.psid !== 0) {
    await callSendAPI(req.body.psid, textTemplate(text.close));
  }
  res.status(200).json({ message: "success" });
});

exports.divisionPage = catchAsync(async (req, res) => {
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
  res.render("divisionPage", { data, active: division.active });
});

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

exports.selectedDivision = catchAsync(async (req, res) => {
  const { psid, index, divisionText, roomCode } = req.body;

  if (psid !== 0) {
    const reader = {
      readersPsid: psid,
      index: index,
    };
    const divisionUpdated = await Division.findOneAndUpdate(
      { code: roomCode },
      { $push: { readers: reader } },
      { new: true }
    );
    divisionUpdated.checkActive();
    await callSendAPI(psid, textTemplate(text.selected));
    await callSendAPI(psid, textTemplate(divisionText));
    if (divisionUpdated.comment !== "") {
      await callSendAPI(psid, textTemplate(text.conditions));
      await callSendAPI(psid, textTemplate(divisionUpdated.comment));
    }
    await callSendAPI(psid, textTemplate(text.timer));
    moment.locale("ar");
    switch (divisionUpdated.period) {
      case "day":
        const dateDay = moment(divisionUpdated.createdAt)
          .add("1", "days")
          .format("dddd, D MMMM YYYY");
        await callSendAPI(psid, textTemplate(dateDay));
        break;
      case "week":
        const dateWeek = moment(divisionUpdated.createdAt)
          .add("7", "days")
          .format("dddd, D MMMM YYYY");
        await callSendAPI(psid, textTemplate(dateWeek));
        break;
      case "month":
        const dateMonth = moment(divisionUpdated.createdAt)
          .add("1", "months")
          .format("dddd, D MMMM YYYY");
        await callSendAPI(psid, textTemplate(dateMonth));
        break;
    }

    await callSendAPI(psid, textTemplate(text.reminder));
    await callSendAPI(psid, textTemplate(text.prayer));
  }
  res.status(200).json({ message: "success" });
});
