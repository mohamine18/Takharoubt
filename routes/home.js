const express = require("express");

const homeController = require("../controllers/home");

const router = express.Router();

router.route("/").get(homeController.home);

router
  .route("/create-a-room")
  .get(homeController.createRoom)
  .post(homeController.getFormData);

module.exports = router;
