import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Define a Schema for Project Details
const ProjectSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  longDescription: String,
  technologies: [String],
  difficulty: String,
  timeEstimate: String,
  githubUrl: String,
  demoUrl: String,
  learningOutcomes: [String],
  category: String, // Category field for organizing projects
  codeSnippets: [{
    language: String,
    code: String
  }],
  resources: [{
    title: String,
    url: String
  }],
  author: {
    name: String,
    github: String
  }
});

const Project = mongoose.model('Project', ProjectSchema);

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Server error, could not fetch projects' });
  }
});

// Get a specific project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findOne({ 
      id: req.params.id 
    });
    
    if (!project) {
      // If no project is found in the database, create a mock response
      return res.json({
        id: req.params.id,
        title: req.params.id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        description: "This is a sample project description.",
        longDescription: "This project demonstrates advanced concepts and real-world implementation techniques. It includes comprehensive documentation, testing practices, and deployment strategies that align with industry standards.",
        technologies: ["React", "Node.js", "MongoDB"],
        difficulty: "Intermediate",
        timeEstimate: "2-3 weeks",
        githubUrl: `https://github.com/example/${req.params.id}`,
        demoUrl: `https://demo-${req.params.id}.netlify.app`,
        learningOutcomes: [
          "Building responsive UIs", 
          "Working with REST APIs", 
          "State management",
          "Creating reusable components"
        ],
        codeSnippets: [
          {
            language: "javascript",
            code: "const fetchData = async () => {\n  const response = await fetch('/api/data');\n  const data = await response.json();\n  return data;\n}"
          }
        ],
        resources: [
          {
            title: "Official Documentation",
            url: "https://docs.example.com"
          },
          {
            title: "Tutorial",
            url: "https://tutorial.example.com"
          }
        ],
        author: {
          name: "John Doe",
          github: "https://github.com/johndoe"
        }
      });
    }
    
    res.json(project);
  } catch (error) {
    console.error('Error fetching project details:', error);
    res.status(500).json({ message: 'Server error, could not fetch project details' });
  }
});

// Get projects by category
router.get('/category/:category', async (req, res) => {
  try {
    const projects = await Project.find({ category: req.params.category });
    
    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: 'No projects found for this category' });
    }
    
    // Group projects by difficulty
    const groupedProjects = projects.reduce((acc, project) => {
      if (!acc[project.difficulty]) {
        acc[project.difficulty] = [];
      }
      acc[project.difficulty].push(project);
      return acc;
    }, {});
    
    res.json({
      category: req.params.category,
      projects: groupedProjects
    });
  } catch (error) {
    console.error('Error fetching projects by category:', error);
    res.status(500).json({ message: 'Server error, could not fetch projects' });
  }
});

// Create a new project (for admin use)
router.post('/', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(400).json({ message: 'Invalid project data' });
  }
});

export default router;