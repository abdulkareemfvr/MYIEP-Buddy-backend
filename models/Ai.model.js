const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatGPT = new Schema({
  input: {
    type: String,
    required: true,
  },
  output: {
    type: String,
    required: true,
  },
});

const Ai = mongoose.model("Ai", ChatGPT);

module.exports = Ai;
