const express = require("express");
const router = express.Router();
const nasabahController = require("../controllers/NasabahController");

// router.get("/", tellerController.findAllTeller);
router.post("/", nasabahController.createNasabah);
router.get("/", nasabahController.getNasabah);
router.get("/:id", nasabahController.getNasabahById);
router.get("/list/:id", nasabahController.getNasabahByIdCRM);
router.post("/detail/payment", nasabahController.paymentNasabah);
router.post("/detail/loan", nasabahController.loanNasabah);
router.get("/detail/:id", nasabahController.getDetailNasabah);

module.exports = router;
