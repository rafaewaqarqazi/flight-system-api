const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const flightsSchema = new mongoose.Schema({
  type: String,
  details: {
    country: String,
    packages: [{}]
  }
});

module.exports = mongoose.model("deals", flightsSchema);
