import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  blogId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  }
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
