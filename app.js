const path = require("node:path");
const express = require("express");
const bodyParser = require("body-parser");

const webhookRouter = require("./routes/webhook");
const homeRouter = require("./routes/home");

const app = express();

const cronJob = require("./utils/cron");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", homeRouter);
app.use("/webhook", webhookRouter);

cronJob();

module.exports = app;
