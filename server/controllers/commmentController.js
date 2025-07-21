import Comment from "../models/Comment.js";

export const addComment = async (req, res) => {
  try {
    const { commentText, blogId } = req.body;

    if (!commentText || !blogId) {
      return res.status(400).json({ message: "Comment text and blog ID are required" });
    }

    const newComment = new Comment({
      commentText,
      blogId,
      userId: req.user.userId,
      userName: req.user.name
    });

    await newComment.save();
    res.status(201).json({ message: "Comment added successfully", comment: newComment });

  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Failed to add comment" });
  }
};
//==========


export const getCommentsByBlog = async (req, res) => {
  const { blogId } = req.params;

  try {
    const comments = await Comment.find({ blogId }).sort({ createdAt: -1 });
    res.status(200).json({ comments });
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};
