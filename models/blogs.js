const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const blogsSchema = new mongoose.Schema({
  author: { type: ObjectId, ref: "Users" },
  title: String,
  description: String,
  images: [{ filename: String }],
  createdAt: Date
});

module.exports = mongoose.model("blogs", blogsSchema);
