import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    length: 5,
  },
  username: {
    type: String,
    unique: true,
    sparse: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
