const express = require("express");
const router = express.Router();
const tellerController = require("../controllers/TellerController");

router.get("/", tellerController.findAllTeller); // ,namaKontroler.namaFunction

router.post("/", tellerController.createTeller);

module.exports = router;
