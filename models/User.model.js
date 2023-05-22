const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
    minlength: [8, "Password must be at least 8 characters long"],
  },
  roll: {
    type: String,
    required: [true, "Roll is required"],
    trim: true,
    enum: ["user", "admin"],
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
