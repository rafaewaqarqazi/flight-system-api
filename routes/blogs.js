const express = require("express");
const router = express.Router();
const {
  createBlog,
  updateBlog,
  removeBlog,
  getAllBlogs,
  getBlogById
} = require("../controllers/blogs");
const upload = require("../upload");
const { requireSignin } = require("../controllers/auth");

router.post("/create/:type", requireSignin, upload.array("files"), createBlog);

router.get("/all", getAllBlogs);
router.get("/blog/:blogId", getBlogById);
router.put("/update/:type", requireSignin, upload.array("files"), updateBlog);
router.delete("/remove/:blogId", requireSignin, removeBlog);
module.exports = router;
