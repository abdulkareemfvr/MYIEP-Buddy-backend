const express = require("express");
const {
  subscriptionPayment,
  getAllUser,
} = require("../../../controllers/payment.controller");
const router = express.Router();

router.route("/").get(getAllUser); //.post(subscriptionPayment);

module.exports = router;
