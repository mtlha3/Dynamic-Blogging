import Blog from "../models/Blog.js";

const generateBlogId = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let blogId = '';
  for (let i = 0; i < 5; i++) {
    blogId += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return blogId;
};

export const addBlog = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    if (!title || !description || !date) {
      return res.status(400).json({ message: "Title, description, and date are required." });
    }

    const blogId = generateBlogId();

    const newBlog = new Blog({
      blogId,
      title,
      description,
      date,
      userId: req.user.userId,
      userName: req.user.name
    });

    await newBlog.save();

    res.status(201).json({ message: "Blog added successfully", blog: newBlog });
  } catch (err) {
    console.error("Error adding blog:", err);
    res.status(500).json({ message: "Failed to add blog" });
  }
};

//==============
export const getUserBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ userId: req.user.userId }).sort({ date: -1 });
    res.status(200).json({ blogs });
  } catch (err) {
    console.error("Error fetching user blogs:", err);
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
};
//===========
export const deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findOne({ blogId });

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.userId !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized to delete this blog" });
    }

    await Blog.deleteOne({ blogId });
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error("Delete blog error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
//=====
export const updateBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { title, description, date } = req.body;

    const blog = await Blog.findOne({ blogId });

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.userId !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized to edit this blog" });
    }

    blog.title = title;
    blog.description = description;
    blog.date = date;

    await blog.save();

    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (err) {
    console.error("Edit blog error:", err);
    res.status(500).json({ message: "Failed to update blog" });
  }
};
//=============
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 }); // Newest first
    res.status(200).json({ blogs });
  } catch (err) {
    console.error("Error fetching all blogs:", err);
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
};
