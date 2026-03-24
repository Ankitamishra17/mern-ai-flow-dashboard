const mongoose = require("mongoose");

const promptSchema = new mongoose.Schema({
  prompt: String,
  response: String,
});

module.exports = mongoose.model("Prompt", promptSchema);