import express from "express";
import { addBlog, getUserBlogs, deleteBlog, updateBlog, getAllBlogs } from "../controllers/blogController.js";
import { verifyToken } from "../middleware/middleware.js";

const router = express.Router();

router.post("/add", verifyToken, addBlog);
router.get("/my", verifyToken, getUserBlogs);
router.delete("/delete/:blogId", verifyToken, deleteBlog);
router.put("/edit/:blogId", verifyToken, updateBlog);
router.get("/all", getAllBlogs); 

export default router;
