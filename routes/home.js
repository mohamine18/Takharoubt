const express = require("express");

const homeController = require("../controllers/home");

const router = express.Router();

router.route("/").get(homeController.home);

router
  .route("/create-a-room")
  .get(homeController.createRoom)
  .post(homeController.getFormData);

router.route("/close-page").post(homeController.closingPage);

router.route("/redirect").get(homeController.redirectPage);

router.route("/select-division/:divisionId").get(homeController.divisionPage);

module.exports = router;
