const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const flightsSchema = new mongoose.Schema({
  bookedBy: { type: ObjectId, ref: "Users" },
  bookingStatus: String,
  details: {}
});

module.exports = mongoose.model("flights", flightsSchema);
