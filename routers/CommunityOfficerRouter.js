const express = require("express");
const router = express.Router();
const communityOfficerController = require("../controllers/CommunityOfficerController");

router.get("/:id", communityOfficerController.findByIdCO);

router.post("/", communityOfficerController.insertCO);

module.exports = router;
