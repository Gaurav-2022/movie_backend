const mongoose = require("mongoose");

const screenSchema = new mongoose.Schema({
  screenName: String,
  totalSeats: Number,
  rows: Number,
  columns: Number
});

const theatreSchema = new mongoose.Schema({
  name: String,
  cityId: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
  screens: [screenSchema]
});

module.exports = mongoose.model("Theatre", theatreSchema);
