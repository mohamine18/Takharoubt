const path = require("node:path");
const express = require("express");
const bodyParser = require("body-parser");

const webhookRouter = require("./routes/webhook");
const homeRouter = require("./routes/home");
const { pageNotFound, globalErrorhandler } = require("./controllers/error");

const app = express();

const cronJob = require("./utils/cron");
const bot = require("./controllers/viber");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: true }));
const bodyParserJson = bodyParser.json();
app.use(bodyParserJson);
app.use(express.static(path.join(__dirname, "public")));

app.use("/", homeRouter);
app.use("/webhook", webhookRouter);
app.use("/viber/webhook", bodyParserJson, bot.middleware());

app.use("*", pageNotFound);
app.use(globalErrorhandler);

cronJob();

module.exports = app;
