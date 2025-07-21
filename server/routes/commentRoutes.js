import express from "express";
import { addComment, getCommentsByBlog } from "../controllers/commmentController.js";
import { verifyToken } from "../middleware/middleware.js";

const router = express.Router();

router.post("/add", verifyToken, addComment); 
router.get("/:blogId", getCommentsByBlog);

export default router;
