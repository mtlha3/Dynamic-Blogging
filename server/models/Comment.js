import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    commentText: {
      type: String,
      required: true,
    },
    blogId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true, 
    },
    userName: {
      type: String,
      required: true, 
    },
  },
  {
    timestamps: true, 
  }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
