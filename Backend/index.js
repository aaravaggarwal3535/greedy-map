import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import User from './models/User.js';
import Post from './models/Post.js';
import projectsRouter from './routes/projects.js'; // Import the new router

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

// Add the projects route
app.use('/api/projects', projectsRouter);

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

// This is commented out because it's handled in projectsRouter
/*
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findOne({ 
      id: req.params.id 
    });
    
    if (!project) {
      // Mock data response when project not found
      return res.json({
        id: req.params.id,
        title: req.params.id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        // More mock data...
      });
    }
    
    res.json(project);
  } catch (error) {
    console.error('Error fetching project details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
*/

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});