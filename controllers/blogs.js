const User = require("../models/users");
const Blogs = require("../models/blogs");
const fs = require("fs");
const natural = require("natural");
const { sendEmail } = require("../helpers");
const mongoose = require("mongoose");
require("dotenv").config();

exports.createBlog = async (req, res) => {
  try {
    let images = [];
    req.files.map(file => {
      images = [
        ...images,
        {
          filename: file.filename
        }
      ];
    });
    const body = JSON.parse(req.body.details);
    const newBlog = await Blogs.create({
      ...body,
      createdAt: Date.now(),
      images
    });
    await res.json({
      success: true,
      message: `Blog Created Successfully`,
      blog: newBlog
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Could not create blog", error: err.message });
  }
};
exports.updateBlog = async (req, res) => {
  try {
    const { title, description, images, blogId } = JSON.parse(req.body.details);
    let newImages = images || [];
    req.files.map(file => {
      newImages = [
        ...newImages,
        {
          filename: file.filename
        }
      ];
    });
    const updatedBlog = await Blogs.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(blogId) },
      {
        title,
        description,
        images: newImages
      },
      { new: true }
    );
    await res.json({
      success: true,
      message: `Blog Updated Successfully`,
      blog: updatedBlog
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Could not update blog", error: err.message });
  }
};

exports.removeBlog = async (req, res) => {
  try {
    const result = await Blogs.remove({
      _id: mongoose.Types.ObjectId(req.params.blogId)
    });
    await res.json(result);
  } catch (e) {
    await res
      .status(400)
      .json({ message: "could not delete blog", error: e.message });
  }
};
exports.getAllBlogs = async (req, res) => {
  try {
    const result = await Blogs.find()
      .sort("-createdAt")
      .populate("author");
    await res.json({ blogs: result });
  } catch (e) {
    await res
      .status(400)
      .json({ message: "could not get blogs", error: e.message });
  }
};
exports.getBlogById = async (req, res) => {
  try {
    const result = await Blogs.findById(req.params.blogId).populate("author");
    await res.json(result);
  } catch (e) {
    await res
      .status(400)
      .json({ message: "could not delete blog", error: e.message });
  }
};
