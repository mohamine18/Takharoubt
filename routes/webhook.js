const express = require("express");

const webhookController = require("../controllers/webhook");

const router = express.Router();

router
  .route("/")
  .get(webhookController.getWebhook)
  .post(webhookController.postWebhook);

module.exports = router;
