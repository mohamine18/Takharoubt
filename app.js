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

// used variables in routes because of viber Error type
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/viber/webhook", bot.middleware());
app.use(
  "/",
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json(),
  homeRouter
);
app.use(
  "/webhook",
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json(),
  webhookRouter
);

app.use("*", pageNotFound);
app.use(globalErrorhandler);

cronJob();

module.exports = app;
