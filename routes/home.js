const express = require("express");

const homeController = require("../controllers/home");

const router = express.Router();

router.route("/").get(homeController.home);

router
  .route("/create-a-room")
  .get(homeController.createRoom)
  .post(homeController.getFormData);

router.route("/redirect").get(homeController.redirectPage);

router.route("/select-division/:divisionId").get(homeController.divisionPage);
router.route("/selected-division").post(homeController.selectedDivision);

router.route("/success-creation").get(homeController.successCreation);

module.exports = router;
