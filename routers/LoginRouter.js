const express = require("express");
const router = express.Router();
const { doLogin } = require("../middlewares/auth");

router.post("/", doLogin);

module.exports = router;
