import mongoose from 'mongoose';

const ReplySchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  upvotes: {
    type: Number,
    default: 0
  },
  downvotes: {
    type: Number,
    default: 0
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const PostSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: null
  },
  category: {
    type: String,
    required: true
  },
  upvotes: {
    type: Number,
    default: 0
  },
  downvotes: {
    type: Number,
    default: 0
  },
  replies: [ReplySchema],
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model('Post', PostSchema);

export default Post;