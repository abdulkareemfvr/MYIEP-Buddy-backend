const express = require("express");
const { generateText } = require("../../../controllers/ai.controller");
const router = express.Router();

router.route("/").post(generateText);

module.exports = router;
