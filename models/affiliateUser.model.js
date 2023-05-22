const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const affiliateUserSchema = new Schema({
  paymentEmail: {
    type: String,
    unique: [true, "This email is already registered"],
    required: [true, "Please enter your payment email"],
    trim: true,
  },
  number: {
    type: String,
    required: [true, "Please enter your phone number"],
    trim: true,
  },

  address: {
    type: String,
    required: [true, "Please enter your address"],
    trim: true,
  },

  email: {
    type: String,
    required: [true, "Please enter your email"],
    lowercase: true,
    trim: true,
  },
});

const AffiliateUser = mongoose.model("affiliateUser", affiliateUserSchema);

module.exports = AffiliateUser;
