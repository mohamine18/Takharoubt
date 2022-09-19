const express = require("express");

const webhookController = require("../controllers/webhook");

const router = express.Router();

router.route("/").get(webhookController.getWebhook);

module.exports = router;
