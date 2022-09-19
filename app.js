const path = require("node:path");
const express = require("express");
const bodyParser = require("body-parser");

const webhookRouter = require("./routes/webhook");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/webhook", webhookRouter);

module.exports = app;
