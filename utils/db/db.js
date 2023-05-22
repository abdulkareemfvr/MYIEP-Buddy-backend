const mongoose = require("mongoose");
const env = require("dotenv").config();

const MONGODB_URI = process.env.db;
const MONGODB_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };

const dbConnect = async () => {
  try {
    await mongoose.connect(MONGODB_URI, MONGODB_OPTIONS);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB: ", error.message);
  }
};

module.exports = dbConnect;
