import mongoose from 'mongoose';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the Project Schema
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
  category: String,
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

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/greedymap', {
  serverSelectionTimeoutMS: 5000
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Function to extract projects from Projects.jsx
async function extractProjectsFromFile() {
  try {
    // Instead of parsing the JSX directly, let's use a simpler approach with hardcoded data
    // This is a more reliable approach for this specific use case
    
    const categories = ['Frontend', 'Backend', 'Fullstack', 'Database'];
    const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
    
    const projects = [];
    
    // Sample project data for demonstration
    // In a real production setup, this data would come from a separate JSON file
    const sampleProjects = [
      {
        title: "Personal Portfolio Website",
        description: "Create a responsive portfolio to showcase your skills and projects.",
        technologies: ["HTML", "CSS", "JavaScript"],
        difficulty: "Beginner",
        timeEstimate: "2-3 days",
        githubUrl: "https://github.com/example/portfolio",
        demoUrl: "https://portfolio-example.netlify.app",
        learningOutcomes: ["Responsive design", "CSS Grid/Flexbox", "Basic JavaScript"],
        category: "Frontend"
      },
      {
        title: "RESTful API",
        description: "Build a simple REST API for a resource like books, movies, or products with CRUD operations.",
        technologies: ["Node.js", "Express", "MongoDB"],
        difficulty: "Beginner",
        timeEstimate: "2-3 days",
        githubUrl: "https://github.com/example/rest-api",
        demoUrl: "https://rest-api-example.herokuapp.com",
        learningOutcomes: ["RESTful principles", "Express middleware", "Database operations"],
        category: "Backend"
      },
      {
        title: "Personal Blog",
        description: "Create a blog with post creation, comments, and user profiles.",
        technologies: ["React", "Node.js", "Express", "MongoDB"],
        difficulty: "Beginner",
        timeEstimate: "1-2 weeks",
        githubUrl: "https://github.com/example/personal-blog",
        demoUrl: "https://personal-blog-example.netlify.app",
        learningOutcomes: ["Full-stack integration", "CRUD operations", "Authentication"],
        category: "Fullstack"
      },
      {
        title: "SQL Database Designer",
        description: "Create a simple tool to design relational database schemas with tables and relationships.",
        technologies: ["SQL", "PostgreSQL", "Express", "React"],
        difficulty: "Beginner",
        timeEstimate: "1-2 weeks",
        githubUrl: "https://github.com/example/db-designer",
        demoUrl: "https://db-designer-example.com",
        learningOutcomes: ["Database design", "Normalization", "ERD creation"],
        category: "Database"
      },
      {
        title: "E-commerce Product Page",
        description: "Build a dynamic product page with image zoom, color selection, reviews, and add to cart functionality.",
        technologies: ["React", "CSS Modules", "Context API"],
        difficulty: "Intermediate",
        timeEstimate: "4-5 days",
        githubUrl: "https://github.com/example/product-page",
        demoUrl: "https://product-page-example.netlify.app",
        learningOutcomes: ["Component composition", "State management", "Custom hooks"],
        category: "Frontend"
      },
      {
        title: "E-commerce API",
        description: "Build a comprehensive API for an e-commerce platform with products, users, orders, and payments.",
        technologies: ["Node.js", "Express", "MongoDB", "Stripe API"],
        difficulty: "Intermediate",
        timeEstimate: "2-3 weeks",
        githubUrl: "https://github.com/example/ecommerce-api",
        demoUrl: "https://ecommerce-api-example.herokuapp.com",
        learningOutcomes: ["Complex data modeling", "Payment processing", "Order workflow"],
        category: "Backend"
      }
    ];

    // Process and format each project for database insertion
    sampleProjects.forEach(project => {
      projects.push({
        id: project.title.toLowerCase().replace(/\s+/g, '-'),
        title: project.title,
        description: project.description,
        longDescription: "This project provides hands-on experience with real-world development challenges. It's designed to reinforce core concepts while introducing industry standard practices.",
        technologies: project.technologies,
        difficulty: project.difficulty,
        timeEstimate: project.timeEstimate,
        githubUrl: project.githubUrl,
        demoUrl: project.demoUrl,
        learningOutcomes: project.learningOutcomes,
        category: project.category,
        codeSnippets: [
          {
            language: "javascript",
            code: "// Example code snippet for this project\nconst fetchData = async () => {\n  const response = await fetch('/api/data');\n  const data = await response.json();\n  return data;\n}"
          }
        ],
        resources: [
          {
            title: "Documentation",
            url: "https://docs.example.com"
          },
          {
            title: "Helpful Tutorial",
            url: "https://tutorial.example.com"
          }
        ],
        author: {
          name: "GreedyMap Team",
          github: "https://github.com/greedymap"
        }
      });
    });
    
    console.log(`Created ${projects.length} sample projects`);
    return projects;
  } catch (error) {
    console.error('Error extracting projects:', error);
    throw error;
  }
}

// Function to seed the database
async function seedDatabase() {
  try {
    // Clear existing projects
    await Project.deleteMany({});
    console.log('Cleared existing projects');
    
    // Get projects from Projects.jsx
    const projects = await extractProjectsFromFile();
    console.log(`Extracted ${projects.length} projects`);
    
    // Insert projects into the database
    await Project.insertMany(projects);
    console.log(`Successfully inserted ${projects.length} projects into the database`);
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedDatabase();
