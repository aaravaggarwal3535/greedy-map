import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import User from './models/User.js';
import Post from './models/Post.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// Improved error handling with fallback
mongoose.connect('mongodb://127.0.0.1:27017/greedymap', {
  serverSelectionTimeoutMS: 5000
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  console.log('Make sure MongoDB is installed and running on your system');
  console.log('API will continue to run but database operations will fail');
});

// MongoDB Connection Events
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

// Enable CORS for all routes
app.use(cors());

// Add middleware to parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile('templates/index.html', { root: __dirname });
});

// Update the signin response to include more user details

app.post("/signin", async (req, res) => {
  console.log(req.body);
  
  // Validate request format
  const { email, password, rememberMe } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ 
      status: 'error', 
      message: 'Email and password are required' 
    });
  }
  
  try {
    // Find user with matching email and password
    const user = await User.findOne({ email, password });
    
    if (!user) {
      return res.status(401).json({ 
        status: 'error', 
        message: 'Invalid email or password' 
      });
    }
    
    // Return success with user details
    return res.json({ 
      status: 'success', 
      message: 'Sign in successful', 
      id: user._id, // Changed from userId to id to match frontend expectations
      fullName: user.fullName, // Include user's name
      email: user.email // Include user's email
    });
  } catch (error) {
    console.error('Sign in error:', error);
    return res.status(500).json({ 
      status: 'error', 
      message: 'An error occurred during sign in' 
    });
  }
});

// Update the signup response to match signin format
app.post("/signup", async (req, res) => {
  console.log(req.body);
  
  // Validate request format
  const { fullName, email, password } = req.body;
  
  if (!fullName || !email || !password) {
    return res.status(400).json({ 
      status: 'error', 
      message: 'Full name, email, and password are required' 
    });
  }
  
  try {
    // Check if user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Email already in use' 
      });
    }
    
    // Create new user
    const newUser = new User({
      fullName,
      email,
      password
    });
    
    // Save user to database
    await newUser.save();
    
    // Return success with user ID
    return res.status(201).json({ 
      status: 'success', 
      message: 'User registered successfully', 
      id: newUser._id, // Changed from userId to id to match frontend expectations
      fullName: newUser.fullName,
      email: newUser.email
    });
  } catch (error) {
    console.error('Sign up error:', error);
    return res.status(500).json({ 
      status: 'error', 
      message: 'An error occurred during registration' 
    });
  }
});

// Add this after your existing middleware and routes

// Get all contributors
app.get('/contributor', async (req, res) => {
  try {
    // Fetch all contributors from MongoDB
    const contributors = await mongoose.connection.collection('contributor').find({}).toArray();
    
    // Send the response
    console.log("contributor data send");
    res.json(contributors);
  } catch (error) {
    console.error('Error fetching contributors:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch contributors' });
  }
});

// Community API endpoints
// Get all posts for a category
app.get('/api/posts/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const posts = await Post.find({ category }).sort({ timestamp: -1 });
    
    // Format the timestamps
    const formattedPosts = posts.map(post => {
      const postObj = post.toObject();
      
      // Format post timestamp
      const postDate = new Date(post.timestamp);
      const now = new Date();
      const diffMs = now - postDate;
      const diffMins = Math.round(diffMs / (1000 * 60));
      
      if (diffMins < 60) {
        postObj.formattedTime = `${diffMins} minutes ago`;
      } else if (diffMins < 1440) {
        postObj.formattedTime = `${Math.floor(diffMins / 60)} hours ago`;
      } else {
        postObj.formattedTime = `${Math.floor(diffMins / 1440)} days ago`;
      }
      
      // Format reply timestamps
      if (postObj.replies && postObj.replies.length > 0) {
        postObj.replies = postObj.replies.map(reply => {
          const replyObj = { ...reply };
          const replyDate = new Date(reply.timestamp);
          const replyDiffMs = now - replyDate;
          const replyDiffMins = Math.round(replyDiffMs / (1000 * 60));
          
          if (replyDiffMins < 60) {
            replyObj.formattedTime = `${replyDiffMins} minutes ago`;
          } else if (replyDiffMins < 1440) {
            replyObj.formattedTime = `${Math.floor(replyDiffMins / 60)} hours ago`;
          } else {
            replyObj.formattedTime = `${Math.floor(replyDiffMins / 1440)} days ago`;
          }
          
          return replyObj;
        });
      }
      
      return postObj;
    });
    
    res.json(formattedPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch posts' });
  }
});

// Create a new post
app.post('/api/posts', async (req, res) => {
  try {
    const { author, role, content, category, image } = req.body;
    
    const newPost = new Post({
      author,
      role,
      content,
      category,
      image,
      upvotes: 0,
      downvotes: 0,
      replies: []
    });
    
    await newPost.save();
    
    // Format the timestamp for immediate display
    const postObj = newPost.toObject();
    postObj.formattedTime = 'Just now';
    
    res.status(201).json(postObj);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ status: 'error', message: 'Failed to create post' });
  }
});

// Add a reply to a post
app.post('/api/posts/:postId/reply', async (req, res) => {
  try {
    const { postId } = req.params;
    const { author, role, content } = req.body;
    
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ status: 'error', message: 'Post not found' });
    }
    
    const newReply = {
      author,
      role,
      content,
      upvotes: 0,
      downvotes: 0,
      timestamp: new Date()
    };
    
    post.replies.unshift(newReply);
    await post.save();
    
    // Format the reply for immediate display
    const replyObj = { ...newReply.toObject(), formattedTime: 'Just now' };
    
    res.status(201).json(replyObj);
  } catch (error) {
    console.error('Error adding reply:', error);
    res.status(500).json({ status: 'error', message: 'Failed to add reply' });
  }
});

// Handle voting
app.put('/api/posts/:postId/vote', async (req, res) => {
  try {
    const { postId } = req.params;
    const { replyId, isUpvote } = req.body;
    
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ status: 'error', message: 'Post not found' });
    }
    
    if (replyId) {
      // Voting on a reply
      const reply = post.replies.id(replyId);
      if (!reply) {
        return res.status(404).json({ status: 'error', message: 'Reply not found' });
      }
      
      if (isUpvote) {
        reply.upvotes += 1;
      } else {
        reply.downvotes += 1;
      }
    } else {
      // Voting on the main post
      if (isUpvote) {
        post.upvotes += 1;
      } else {
        post.downvotes += 1;
      }
    }
    
    await post.save();
    
    res.json({ status: 'success' });
  } catch (error) {
    console.error('Error updating votes:', error);
    res.status(500).json({ status: 'error', message: 'Failed to update votes' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});