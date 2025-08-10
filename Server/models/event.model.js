// models/eventModel.js
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  registerStatus: { type: Boolean, default: false },
  name: { type: String, },
  email: { type: String, },
});

module.exports = mongoose.model("Event", eventSchema);
