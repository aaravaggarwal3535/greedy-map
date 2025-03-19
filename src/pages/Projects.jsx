import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FiCode, FiDatabase, FiLayers, FiSmartphone, FiCloud, FiServer, FiGithub, FiExternalLink, FiBookmark, FiSearch, FiFilter } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { toast } from 'sonner'; // Add this import for toast notifications

const difficultyColors = {
  Beginner: 'bg-green-100 text-green-800 border-green-200',
  Intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Advanced: 'bg-red-100 text-red-800 border-red-200'
};

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [projectData, setProjectData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Project data organized by category
  const projectCategories = {
    "Frontend": {
      icon: <FiCode className="h-5 w-5" />,
      description: "User interface projects focusing on HTML, CSS, JavaScript and modern frontend frameworks",
      projects: {
        "Beginner": [
          {
            title: "Personal Portfolio Website",
            description: "Create a responsive portfolio to showcase your skills and projects.",
            technologies: ["HTML", "CSS", "JavaScript"],
            difficulty: "Beginner",
            timeEstimate: "2-3 days",
            githubUrl: "https://github.com/example/portfolio-template",
            demoUrl: "https://portfolio-example.netlify.app",
            learningOutcomes: ["Responsive design", "CSS Grid/Flexbox", "Basic JavaScript"]
          },
          {
            title: "Interactive To-Do List",
            description: "Build a simple task manager with the ability to add, edit, delete, and mark tasks as complete.",
            technologies: ["HTML", "CSS", "JavaScript"],
            difficulty: "Beginner",
            timeEstimate: "1-2 days",
            githubUrl: "https://github.com/example/todo-app",
            demoUrl: "https://todo-app-example.netlify.app",
            learningOutcomes: ["DOM manipulation", "Event handling", "Local Storage"]
          },
          {
            title: "Weather App",
            description: "Create an application that displays weather information based on location using a weather API.",
            technologies: ["HTML", "CSS", "JavaScript", "Weather API"],
            difficulty: "Beginner",
            timeEstimate: "2-3 days",
            githubUrl: "https://github.com/example/weather-app",
            demoUrl: "https://weather-app-example.netlify.app",
            learningOutcomes: ["API integration", "Async/Await", "Error handling"]
          },
          {
            title: "Recipe Finder",
            description: "Develop a website that allows users to search for recipes based on ingredients or meal types.",
            technologies: ["HTML", "CSS", "JavaScript", "Recipe API"],
            difficulty: "Beginner",
            timeEstimate: "2-3 days",
            githubUrl: "https://github.com/example/recipe-finder",
            demoUrl: "https://recipe-finder-example.netlify.app",
            learningOutcomes: ["API integration", "Search functionality", "Responsive design"]
          },
          {
            title: "Quiz Application",
            description: "Build an interactive quiz that presents questions, tracks scores, and provides feedback.",
            technologies: ["HTML", "CSS", "JavaScript"],
            difficulty: "Beginner",
            timeEstimate: "2-3 days",
            githubUrl: "https://github.com/example/quiz-app",
            demoUrl: "https://quiz-app-example.netlify.app",
            learningOutcomes: ["State management", "Timers", "Form handling"]
          },
          {
            title: "Responsive Landing Page",
            description: "Create a modern landing page for a fictional product or service with responsive design.",
            technologies: ["HTML", "CSS", "JavaScript"],
            difficulty: "Beginner",
            timeEstimate: "1-2 days",
            githubUrl: "https://github.com/example/landing-page",
            demoUrl: "https://landing-page-example.netlify.app",
            learningOutcomes: ["Responsive design", "CSS animations", "Layout techniques"]
          },
          {
            title: "Digital Clock",
            description: "Build a digital clock with time format options and theme customization.",
            technologies: ["HTML", "CSS", "JavaScript"],
            difficulty: "Beginner",
            timeEstimate: "1 day",
            githubUrl: "https://github.com/example/digital-clock",
            demoUrl: "https://digital-clock-example.netlify.app",
            learningOutcomes: ["Date/Time manipulation", "Interval functions", "Theme switching"]
          },
          {
            title: "Form Validator",
            description: "Create a form with client-side validation for various input types.",
            technologies: ["HTML", "CSS", "JavaScript"],
            difficulty: "Beginner",
            timeEstimate: "1-2 days",
            githubUrl: "https://github.com/example/form-validator",
            demoUrl: "https://form-validator-example.netlify.app",
            learningOutcomes: ["Form validation", "Regular expressions", "User feedback"]
          },
          {
            title: "Image Gallery",
            description: "Build a responsive image gallery with filtering and lightbox functionality.",
            technologies: ["HTML", "CSS", "JavaScript"],
            difficulty: "Beginner",
            timeEstimate: "2 days",
            githubUrl: "https://github.com/example/image-gallery",
            demoUrl: "https://image-gallery-example.netlify.app",
            learningOutcomes: ["Grid layout", "Modal windows", "Filtering"]
          },
          {
            title: "Calculator",
            description: "Create a fully functional calculator with basic and scientific operations.",
            technologies: ["HTML", "CSS", "JavaScript"],
            difficulty: "Beginner",
            timeEstimate: "2 days",
            githubUrl: "https://github.com/example/calculator",
            demoUrl: "https://calculator-example.netlify.app",
            learningOutcomes: ["Event delegation", "Math operations", "UI design"]
          }
        ],
        "Intermediate": [
          {
            title: "E-commerce Product Page",
            description: "Build a dynamic product page with image zoom, color selection, reviews, and add to cart functionality.",
            technologies: ["React", "CSS Modules", "Context API"],
            difficulty: "Intermediate",
            timeEstimate: "4-5 days",
            githubUrl: "https://github.com/example/product-page",
            demoUrl: "https://product-page-example.netlify.app",
            learningOutcomes: ["Component composition", "State management", "Custom hooks"]
          },
          {
            title: "Movie Database App",
            description: "Create an application that displays information about movies and allows users to search, filter, and save favorites.",
            technologies: ["React", "TMDB API", "Styled Components"],
            difficulty: "Intermediate",
            timeEstimate: "5-7 days",
            githubUrl: "https://github.com/example/movie-app",
            demoUrl: "https://movie-app-example.netlify.app",
            learningOutcomes: ["API integration", "Search/filter", "Local storage"]
          },
          {
            title: "Social Media Dashboard",
            description: "Build a dashboard that displays analytics and activity from various social media platforms.",
            technologies: ["React", "Chart.js", "Tailwind CSS"],
            difficulty: "Intermediate",
            timeEstimate: "5-7 days",
            githubUrl: "https://github.com/example/social-dashboard",
            demoUrl: "https://social-dashboard-example.netlify.app",
            learningOutcomes: ["Data visualization", "Responsive dashboards", "Theme toggling"]
          },
          {
            title: "Kanban Board",
            description: "Create a drag-and-drop Kanban board for task management with customizable columns.",
            technologies: ["React", "react-beautiful-dnd", "Styled Components"],
            difficulty: "Intermediate",
            timeEstimate: "6-8 days",
            githubUrl: "https://github.com/example/kanban-board",
            demoUrl: "https://kanban-board-example.netlify.app",
            learningOutcomes: ["Drag and drop", "Complex state management", "Performance optimization"]
          },
          {
            title: "Music Player",
            description: "Develop a music player with playlist management, audio visualization, and playback controls.",
            technologies: ["React", "Web Audio API", "Redux"],
            difficulty: "Intermediate",
            timeEstimate: "7-9 days",
            githubUrl: "https://github.com/example/music-player",
            demoUrl: "https://music-player-example.netlify.app",
            learningOutcomes: ["Audio manipulation", "Complex state management", "Custom controls"]
          },
          {
            title: "Markdown Editor",
            description: "Build a real-time markdown editor with preview panel, syntax highlighting, and save functionality.",
            technologies: ["React", "Remark.js", "CodeMirror"],
            difficulty: "Intermediate",
            timeEstimate: "4-6 days",
            githubUrl: "https://github.com/example/markdown-editor",
            demoUrl: "https://markdown-editor-example.netlify.app",
            learningOutcomes: ["Text processing", "Multiple panes", "Local storage"]
          },
          {
            title: "Job Board",
            description: "Create a job listing website with search, filter, and application tracking features.",
            technologies: ["React", "React Router", "Firebase"],
            difficulty: "Intermediate",
            timeEstimate: "7-10 days",
            githubUrl: "https://github.com/example/job-board",
            demoUrl: "https://job-board-example.netlify.app",
            learningOutcomes: ["Routing", "Search/filter", "Authentication"]
          },
          {
            title: "Budget Tracker",
            description: "Build a personal finance app with expense tracking, budgeting, and visualization of spending habits.",
            technologies: ["React", "Chart.js", "IndexedDB"],
            difficulty: "Intermediate",
            timeEstimate: "6-8 days",
            githubUrl: "https://github.com/example/budget-tracker",
            demoUrl: "https://budget-tracker-example.netlify.app",
            learningOutcomes: ["Data visualization", "Form validation", "Offline storage"]
          },
          {
            title: "Multi-step Form",
            description: "Develop a complex multi-step form with validation, progress tracking, and form state persistence.",
            technologies: ["React", "Formik", "Yup"],
            difficulty: "Intermediate",
            timeEstimate: "4-6 days",
            githubUrl: "https://github.com/example/multi-step-form",
            demoUrl: "https://multi-step-form-example.netlify.app",
            learningOutcomes: ["Form state management", "Validation", "UX design"]
          },
          {
            title: "Real-time Chat UI",
            description: "Create a responsive chat interface with message threading, reactions, and file attachment previews.",
            technologies: ["React", "WebSockets", "Framer Motion"],
            difficulty: "Intermediate",
            timeEstimate: "7-9 days",
            githubUrl: "https://github.com/example/chat-ui",
            demoUrl: "https://chat-ui-example.netlify.app",
            learningOutcomes: ["Real-time communication", "Complex UI components", "Animation"]
          }
        ],
        "Advanced": [
          {
            title: "E-commerce Platform",
            description: "Build a full-featured e-commerce frontend with product listings, cart, checkout, user accounts, and order history.",
            technologies: ["Next.js", "Redux Toolkit", "Stripe", "Tailwind CSS"],
            difficulty: "Advanced",
            timeEstimate: "3-4 weeks",
            githubUrl: "https://github.com/example/ecommerce-platform",
            demoUrl: "https://ecommerce-example.vercel.app",
            learningOutcomes: ["SSR/SSG", "Complex state management", "Payment integration", "Performance optimization"]
          },
          {
            title: "Collaborative Whiteboard",
            description: "Create a multi-user whiteboard application with real-time collaboration, drawing tools, and export capabilities.",
            technologies: ["React", "Canvas API", "Socket.io", "Redux"],
            difficulty: "Advanced",
            timeEstimate: "3-4 weeks",
            githubUrl: "https://github.com/example/collaborative-whiteboard",
            demoUrl: "https://whiteboard-example.netlify.app",
            learningOutcomes: ["Canvas manipulation", "Real-time data", "Collaborative features"]
          },
          {
            title: "Video Conferencing UI",
            description: "Build a Zoom-like interface with room joining, video grid, screen sharing, and chat functionality.",
            technologies: ["React", "WebRTC", "Socket.io", "Styled Components"],
            difficulty: "Advanced",
            timeEstimate: "3-4 weeks",
            githubUrl: "https://github.com/example/video-conference",
            demoUrl: "https://video-conf-example.netlify.app",
            learningOutcomes: ["WebRTC", "Media handling", "Real-time communication"]
          },
          {
            title: "3D Product Configurator",
            description: "Develop a 3D product customization tool with color, texture, and component options.",
            technologies: ["React", "Three.js", "React Three Fiber", "Zustand"],
            difficulty: "Advanced",
            timeEstimate: "3-4 weeks",
            githubUrl: "https://github.com/example/3d-configurator",
            demoUrl: "https://3d-configurator-example.netlify.app",
            learningOutcomes: ["3D rendering", "User interaction with 3D", "State management"]
          },
          {
            title: "Code Editor",
            description: "Build a browser-based code editor with syntax highlighting, autocompletion, and execution capabilities.",
            technologies: ["React", "Monaco Editor", "Web Workers", "IndexedDB"],
            difficulty: "Advanced",
            timeEstimate: "3-4 weeks",
            githubUrl: "https://github.com/example/code-editor",
            demoUrl: "https://code-editor-example.netlify.app",
            learningOutcomes: ["Editor integration", "Code execution", "Performance optimization"]
          },
          {
            title: "Data Visualization Dashboard",
            description: "Create an interactive analytics dashboard with multiple chart types, filtering, and real-time updates.",
            technologies: ["React", "D3.js", "WebSockets", "Tailwind CSS"],
            difficulty: "Advanced",
            timeEstimate: "3-4 weeks",
            githubUrl: "https://github.com/example/data-visualization",
            demoUrl: "https://data-viz-example.netlify.app",
            learningOutcomes: ["Advanced data visualization", "Performance optimization", "Real-time updates"]
          },
          {
            title: "AI-powered Image Editor",
            description: "Develop a photo editor with AI-based features like object removal, style transfer, and automatic enhancement.",
            technologies: ["React", "TensorFlow.js", "Canvas API", "WebAssembly"],
            difficulty: "Advanced",
            timeEstimate: "4-5 weeks",
            githubUrl: "https://github.com/example/ai-image-editor",
            demoUrl: "https://ai-image-editor-example.netlify.app",
            learningOutcomes: ["ML model integration", "Image processing", "Performance optimization"]
          },
          {
            title: "Spreadsheet Application",
            description: "Build a web-based spreadsheet with formula support, data visualization, and collaborative editing.",
            technologies: ["React", "Redux", "Web Workers", "IndexedDB"],
            difficulty: "Advanced",
            timeEstimate: "4-5 weeks",
            githubUrl: "https://github.com/example/spreadsheet-app",
            demoUrl: "https://spreadsheet-app-example.netlify.app",
            learningOutcomes: ["Complex data structures", "Formula parsing", "Cell references"]
          },
          {
            title: "Interactive Map Application",
            description: "Create a map-based application with custom layers, routing, place search, and user-generated content.",
            technologies: ["React", "MapboxGL", "GeoJSON", "Turf.js"],
            difficulty: "Advanced",
            timeEstimate: "3-4 weeks",
            githubUrl: "https://github.com/example/map-application",
            demoUrl: "https://map-app-example.netlify.app",
            learningOutcomes: ["Geospatial data", "Map interactions", "Performance optimization"]
          },
          {
            title: "Progressive Web App",
            description: "Build a fully featured PWA with offline support, push notifications, and device feature access.",
            technologies: ["React", "Workbox", "IndexedDB", "Service Workers"],
            difficulty: "Advanced",
            timeEstimate: "3-4 weeks",
            githubUrl: "https://github.com/example/pwa-example",
            demoUrl: "https://pwa-example.netlify.app",
            learningOutcomes: ["Service workers", "Offline strategies", "Push notifications"]
          }
        ]
      }
    },
    "Backend": {
      icon: <FiServer className="h-5 w-5" />,
      description: "Server-side projects focusing on APIs, databases, authentication and business logic",
      projects: {
        "Beginner": [
          {
            title: "RESTful API",
            description: "Build a simple REST API for a resource like books, movies, or products with CRUD operations.",
            technologies: ["Node.js", "Express", "MongoDB"],
            difficulty: "Beginner",
            timeEstimate: "2-3 days",
            githubUrl: "https://github.com/example/rest-api",
            demoUrl: "https://rest-api-example.herokuapp.com",
            learningOutcomes: ["RESTful principles", "Express middleware", "Database operations"]
          },
          {
            title: "Authentication System",
            description: "Create a user authentication system with registration, login, and password recovery.",
            technologies: ["Node.js", "Express", "JWT", "MongoDB"],
            difficulty: "Beginner",
            timeEstimate: "3-4 days",
            githubUrl: "https://github.com/example/auth-system",
            demoUrl: "https://auth-system-example.herokuapp.com",
            learningOutcomes: ["JWT implementation", "Password hashing", "Email sending"]
          },
          {
            title: "URL Shortener",
            description: "Build a URL shortening service with click tracking and custom short URLs.",
            technologies: ["Node.js", "Express", "MongoDB"],
            difficulty: "Beginner",
            timeEstimate: "2-3 days",
            githubUrl: "https://github.com/example/url-shortener",
            demoUrl: "https://url-shortener-example.herokuapp.com",
            learningOutcomes: ["URL redirection", "Basic analytics", "URL validation"]
          },
          {
            title: "File Upload Service",
            description: "Create a service that allows users to upload, manage, and share files.",
            technologies: ["Node.js", "Express", "Multer", "MongoDB"],
            difficulty: "Beginner",
            timeEstimate: "3-4 days",
            githubUrl: "https://github.com/example/file-upload",
            demoUrl: "https://file-upload-example.herokuapp.com",
            learningOutcomes: ["File handling", "MIME types", "Storage management"]
          },
          {
            title: "Task Scheduler",
            description: "Build a system that executes recurring tasks at specified intervals.",
            technologies: ["Node.js", "Express", "Node-cron", "MongoDB"],
            difficulty: "Beginner",
            timeEstimate: "2-3 days",
            githubUrl: "https://github.com/example/task-scheduler",
            demoUrl: "https://task-scheduler-example.herokuapp.com",
            learningOutcomes: ["Cron scheduling", "Background processes", "Job management"]
          },
          {
            title: "WebScraper API",
            description: "Create an API that extracts data from websites and returns structured information.",
            technologies: ["Node.js", "Express", "Cheerio", "Axios"],
            difficulty: "Beginner",
            timeEstimate: "2-3 days",
            githubUrl: "https://github.com/example/web-scraper",
            demoUrl: "https://web-scraper-example.herokuapp.com",
            learningOutcomes: ["Web scraping", "HTML parsing", "Error handling"]
          },
          {
            title: "Simple Blog API",
            description: "Build an API for a blog with posts, comments, and user profiles.",
            technologies: ["Node.js", "Express", "MongoDB"],
            difficulty: "Beginner",
            timeEstimate: "3-4 days",
            githubUrl: "https://github.com/example/blog-api",
            demoUrl: "https://blog-api-example.herokuapp.com",
            learningOutcomes: ["API modeling", "Relationships", "Query parameters"]
          },
          {
            title: "Weather Data API",
            description: "Create a proxy API that fetches data from weather services and adds caching and formatting.",
            technologies: ["Node.js", "Express", "Redis", "Axios"],
            difficulty: "Beginner",
            timeEstimate: "2-3 days",
            githubUrl: "https://github.com/example/weather-api",
            demoUrl: "https://weather-api-example.herokuapp.com",
            learningOutcomes: ["API integration", "Caching", "Rate limiting"]
          },
          {
            title: "Contact Form Processor",
            description: "Build a service that receives form submissions, validates them, and sends notifications.",
            technologies: ["Node.js", "Express", "Nodemailer"],
            difficulty: "Beginner",
            timeEstimate: "1-2 days",
            githubUrl: "https://github.com/example/contact-form",
            demoUrl: "https://contact-form-example.herokuapp.com",
            learningOutcomes: ["Form processing", "Email sending", "Validation"]
          },
          {
            title: "API Rate Limiter",
            description: "Create a system to implement rate limiting for API requests.",
            technologies: ["Node.js", "Express", "Redis"],
            difficulty: "Beginner",
            timeEstimate: "2 days",
            githubUrl: "https://github.com/example/rate-limiter",
            demoUrl: "https://rate-limiter-example.herokuapp.com",
            learningOutcomes: ["Rate limiting", "Middleware", "Redis implementation"]
          }
        ],
        "Intermediate": [
          {
            title: "E-commerce API",
            description: "Build a comprehensive API for an e-commerce platform with products, users, orders, and payments.",
            technologies: ["Node.js", "Express", "MongoDB", "Stripe API"],
            difficulty: "Intermediate",
            timeEstimate: "2-3 weeks",
            githubUrl: "https://github.com/example/ecommerce-api",
            demoUrl: "https://ecommerce-api-example.herokuapp.com",
            learningOutcomes: ["Complex data modeling", "Payment processing", "Order workflow"]
          },
          {
            title: "Real-time Chat Server",
            description: "Create a chat server with private messaging, group chats, and read receipts.",
            technologies: ["Node.js", "Socket.io", "MongoDB", "Redis"],
            difficulty: "Intermediate",
            timeEstimate: "1-2 weeks",
            githubUrl: "https://github.com/example/chat-server",
            demoUrl: "https://chat-server-example.herokuapp.com",
            learningOutcomes: ["WebSocket communication", "Real-time events", "Presence detection"]
          },
          {
            title: "Social Media API",
            description: "Build an API for a social platform with posts, comments, likes, follows, and news feeds.",
            technologies: ["Node.js", "Express", "MongoDB", "Redis"],
            difficulty: "Intermediate",
            timeEstimate: "2-3 weeks",
            githubUrl: "https://github.com/example/social-media-api",
            demoUrl: "https://social-media-api-example.herokuapp.com",
            learningOutcomes: ["Activity feeds", "Social graph", "Performance optimization"]
          },
          {
            title: "Content Management System API",
            description: "Create a headless CMS API with content types, fields, media management, and versioning.",
            technologies: ["Node.js", "Express", "MongoDB", "AWS S3"],
            difficulty: "Intermediate",
            timeEstimate: "2-3 weeks",
            githubUrl: "https://github.com/example/cms-api",
            demoUrl: "https://cms-api-example.herokuapp.com",
            learningOutcomes: ["Content modeling", "Media handling", "API versioning"]
          },
          {
            title: "Job Queue System",
            description: "Build a background processing system with prioritization, retries, and monitoring.",
            technologies: ["Node.js", "Express", "Redis", "Bull"],
            difficulty: "Intermediate",
            timeEstimate: "1-2 weeks",
            githubUrl: "https://github.com/example/job-queue",
            demoUrl: "https://job-queue-example.herokuapp.com",
            learningOutcomes: ["Distributed queues", "Concurrency management", "Error handling"]
          },
          {
            title: "API Gateway",
            description: "Create a service that acts as a unified entry point for multiple microservices.",
            technologies: ["Node.js", "Express", "Redis", "Nginx"],
            difficulty: "Intermediate",
            timeEstimate: "1-2 weeks",
            githubUrl: "https://github.com/example/api-gateway",
            demoUrl: "https://api-gateway-example.herokuapp.com",
            learningOutcomes: ["API composition", "Request routing", "Rate limiting"]
          },
          {
            title: "OAuth Provider",
            description: "Build an OAuth 2.0 authorization server that other applications can use for authentication.",
            technologies: ["Node.js", "Express", "MongoDB", "OAuth 2.0"],
            difficulty: "Intermediate",
            timeEstimate: "1-2 weeks",
            githubUrl: "https://github.com/example/oauth-provider",
            demoUrl: "https://oauth-provider-example.herokuapp.com",
            learningOutcomes: ["OAuth flows", "Token management", "Client registration"]
          },
          {
            title: "Notification Service",
            description: "Create a service that manages email, SMS, push, and in-app notifications.",
            technologies: ["Node.js", "Express", "MongoDB", "Redis", "AWS SNS"],
            difficulty: "Intermediate",
            timeEstimate: "1-2 weeks",
            githubUrl: "https://github.com/example/notification-service",
            demoUrl: "https://notification-service-example.herokuapp.com",
            learningOutcomes: ["Message queuing", "Template management", "Delivery tracking"]
          },
          {
            title: "Geo-Spatial API",
            description: "Build an API that handles location-based queries, geocoding, and distance calculations.",
            technologies: ["Node.js", "Express", "MongoDB", "PostGIS"],
            difficulty: "Intermediate",
            timeEstimate: "1-2 weeks",
            githubUrl: "https://github.com/example/geo-api",
            demoUrl: "https://geo-api-example.herokuapp.com",
            learningOutcomes: ["Geospatial indexes", "Proximity searches", "Geocoding"]
          },
          {
            title: "User Analytics Service",
            description: "Create a service that tracks user behavior, generates reports, and provides insights.",
            technologies: ["Node.js", "Express", "MongoDB", "Redis", "Kafka"],
            difficulty: "Intermediate",
            timeEstimate: "2-3 weeks",
            githubUrl: "https://github.com/example/analytics-service",
            demoUrl: "https://analytics-service-example.herokuapp.com",
            learningOutcomes: ["Event tracking", "Aggregation pipelines", "Report generation"]
          }
        ],
        "Advanced": [
          {
            title: "Microservice Architecture",
            description: "Build a system of multiple microservices with service discovery, load balancing, and fault tolerance.",
            technologies: ["Node.js", "Express", "Docker", "Kubernetes", "MongoDB"],
            difficulty: "Advanced",
            timeEstimate: "4-6 weeks",
            githubUrl: "https://github.com/example/microservices",
            demoUrl: "https://microservices-example.com",
            learningOutcomes: ["Service design", "Container orchestration", "Distributed systems"]
          },
          {
            title: "Real-time Analytics Engine",
            description: "Create a system that processes streams of events for real-time analytics and dashboards.",
            technologies: ["Node.js", "Kafka", "Redis", "ClickHouse", "WebSockets"],
            difficulty: "Advanced",
            timeEstimate: "4-6 weeks",
            githubUrl: "https://github.com/example/realtime-analytics",
            demoUrl: "https://realtime-analytics-example.com",
            learningOutcomes: ["Stream processing", "OLAP databases", "Real-time aggregations"]
          },
          {
            title: "Distributed Search Engine",
            description: "Build a search service with indexing, faceted search, and relevance scoring.",
            technologies: ["Node.js", "Elasticsearch", "Redis", "RabbitMQ"],
            difficulty: "Advanced",
            timeEstimate: "4-6 weeks",
            githubUrl: "https://github.com/example/search-engine",
            demoUrl: "https://search-engine-example.com",
            learningOutcomes: ["Search indexing", "Relevance tuning", "Distributed systems"]
          },
          {
            title: "Blockchain API",
            description: "Create an API that interacts with blockchain networks for transactions and smart contracts.",
            technologies: ["Node.js", "Express", "Web3.js", "MongoDB"],
            difficulty: "Advanced",
            timeEstimate: "4-6 weeks",
            githubUrl: "https://github.com/example/blockchain-api",
            demoUrl: "https://blockchain-api-example.com",
            learningOutcomes: ["Blockchain integration", "Transaction handling", "Smart contracts"]
          },
          {
            title: "Machine Learning API",
            description: "Build an API that serves machine learning models for prediction and classification tasks.",
            technologies: ["Node.js", "Express", "TensorFlow.js", "MongoDB"],
            difficulty: "Advanced",
            timeEstimate: "4-6 weeks",
            githubUrl: "https://github.com/example/ml-api",
            demoUrl: "https://ml-api-example.com",
            learningOutcomes: ["Model serving", "Batch prediction", "Model versioning"]
          },
          {
            title: "Serverless Platform",
            description: "Create a platform that allows users to deploy and run serverless functions.",
            technologies: ["Node.js", "Docker", "Kubernetes", "AWS Lambda"],
            difficulty: "Advanced",
            timeEstimate: "4-6 weeks",
            githubUrl: "https://github.com/example/serverless-platform",
            demoUrl: "https://serverless-platform-example.com",
            learningOutcomes: ["Container orchestration", "Code execution", "API Gateway integration"]
          },
          {
            title: "Distributed Database",
            description: "Build a distributed database system with sharding, replication, and eventual consistency.",
            technologies: ["Node.js", "C++", "RocksDB", "Protocol Buffers"],
            difficulty: "Advanced",
            timeEstimate: "5-7 weeks",
            githubUrl: "https://github.com/example/distributed-db",
            demoUrl: "https://distributed-db-example.com",
            learningOutcomes: ["Distributed systems", "Consensus algorithms", "Data sharding"]
          },
          {
            title: "Cybersecurity Tool",
            description: "Develop a security analysis tool that scans for vulnerabilities in web applications.",
            technologies: ["Node.js", "Python", "Docker", "Graph Algorithms"],
            difficulty: "Advanced",
            timeEstimate: "4-5 weeks",
            githubUrl: "https://github.com/example/security-tool",
            demoUrl: "https://security-tool-example.com",
            learningOutcomes: ["Vulnerability detection", "Static analysis", "Secure coding practices"]
          },
          {
            title: "Message Broker",
            description: "Create a message broker service with topics, queues, and delivery guarantees.",
            technologies: ["Node.js", "Rust", "Protocol Buffers", "Redis"],
            difficulty: "Advanced",
            timeEstimate: "4-6 weeks",
            githubUrl: "https://github.com/example/message-broker",
            demoUrl: "https://message-broker-example.com",
            learningOutcomes: ["Asynchronous messaging", "Pub/sub patterns", "High throughput systems"]
          },
          {
            title: "Continuous Integration Service",
            description: "Build a CI/CD platform that automates build, test, and deployment processes.",
            technologies: ["Node.js", "Docker", "Kubernetes", "Git"],
            difficulty: "Advanced",
            timeEstimate: "5-7 weeks",
            githubUrl: "https://github.com/example/ci-cd-service",
            demoUrl: "https://ci-cd-service-example.com",
            learningOutcomes: ["Build pipelines", "Test automation", "Deployment strategies"]
          }
        ]
      }
    },
    "Fullstack": {
      icon: <FiLayers className="h-5 w-5" />,
      description: "End-to-end projects incorporating both frontend and backend technologies",
      projects: {
        "Beginner": [
          {
            title: "Personal Blog",
            description: "Create a blog with post creation, comments, and user profiles.",
            technologies: ["React", "Node.js", "Express", "MongoDB"],
            difficulty: "Beginner",
            timeEstimate: "1-2 weeks",
            githubUrl: "https://github.com/example/personal-blog",
            demoUrl: "https://personal-blog-example.netlify.app",
            learningOutcomes: ["Full-stack integration", "CRUD operations", "Authentication"]
          },
          {
            title: "Task Management App",
            description: "Build a task manager with user accounts, task categories, and due dates.",
            technologies: ["React", "Node.js", "Express", "MongoDB"],
            difficulty: "Beginner",
            timeEstimate: "1-2 weeks",
            githubUrl: "https://github.com/example/task-manager",
            demoUrl: "https://task-manager-example.netlify.app",
            learningOutcomes: ["State management", "RESTful API", "Data persistence"]
          },
          {
            title: "Expense Tracker",
            description: "Create an application for tracking personal expenses with categories and reports.",
            technologies: ["React", "Node.js", "Express", "MongoDB"],
            difficulty: "Beginner",
            timeEstimate: "1-2 weeks",
            githubUrl: "https://github.com/example/expense-tracker",
            demoUrl: "https://expense-tracker-example.netlify.app",
            learningOutcomes: ["Data visualization", "CRUD operations", "User authentication"]
          },
          {
            title: "Note Taking App",
            description: "Build a simple note-taking application with rich text formatting and organization.",
            technologies: ["React", "Node.js", "Express", "MongoDB"],
            difficulty: "Beginner",
            timeEstimate: "1-2 weeks",
            githubUrl: "https://github.com/example/note-app",
            demoUrl: "https://note-app-example.netlify.app",
            learningOutcomes: ["Text editors", "Data persistence", "User experience"]
          },
          {
            title: "Recipe Book",
            description: "Create a recipe collection application with search, favorites, and user contributions.",
            technologies: ["React", "Node.js", "Express", "MongoDB"],
            difficulty: "Beginner",
            timeEstimate: "1-2 weeks",
            githubUrl: "https://github.com/example/recipe-book",
            demoUrl: "https://recipe-book-example.netlify.app",
            learningOutcomes: ["Search functionality", "Image handling", "User permissions"]
          },
          {
            title: "Event Calendar",
            description: "Build a calendar application for planning and organizing events.",
            technologies: ["React", "Node.js", "Express", "MongoDB"],
            difficulty: "Beginner",
            timeEstimate: "1-2 weeks",
            githubUrl: "https://github.com/example/event-calendar",
            demoUrl: "https://event-calendar-example.netlify.app",
            learningOutcomes: ["Date manipulation", "Recurring events", "Calendar UI"]
          },
          {
            title: "Link Sharing App",
            description: "Create a platform for users to share and discover interesting links and resources.",
            technologies: ["React", "Node.js", "Express", "MongoDB"],
            difficulty: "Beginner",
            timeEstimate: "1-2 weeks",
            githubUrl: "https://github.com/example/link-sharing",
            demoUrl: "https://link-sharing-example.netlify.app",
            learningOutcomes: ["Voting mechanisms", "URL validation", "Social features"]
          },
          {
            title: "Personal Library",
            description: "Build an application to track books you've read, want to read, and are currently reading.",
            technologies: ["React", "Node.js", "Express", "MongoDB"],
            difficulty: "Beginner",
            timeEstimate: "1-2 weeks",
            githubUrl: "https://github.com/example/personal-library",
            demoUrl: "https://personal-library-example.netlify.app",
            learningOutcomes: ["External API integration", "User collections", "Filtering"]
          },
          {
            title: "Workout Tracker",
            description: "Create an application to track fitness routines and exercise progress.",
            technologies: ["React", "Node.js", "Express", "MongoDB"],
            difficulty: "Beginner",
            timeEstimate: "1-2 weeks",
            githubUrl: "https://github.com/example/workout-tracker",
            demoUrl: "https://workout-tracker-example.netlify.app",
            learningOutcomes: ["Form handling", "Progress visualization", "Data relationships"]
          },
          {
            title: "Discussion Forum",
            description: "Build a simple forum with topics, replies, and user profiles.",
            technologies: ["React", "Node.js", "Express", "MongoDB"],
            difficulty: "Beginner",
            timeEstimate: "1-2 weeks",
            githubUrl: "https://github.com/example/discussion-forum",
            demoUrl: "https://discussion-forum-example.netlify.app",
            learningOutcomes: ["Nested comments", "User roles", "Content moderation"]
          }
        ],
        "Intermediate": [
          {
            title: "E-commerce Store",
            description: "Build a complete online store with product listings, shopping cart, and checkout.",
            technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
            difficulty: "Intermediate",
            timeEstimate: "3-4 weeks",
            githubUrl: "https://github.com/example/ecommerce-store",
            demoUrl: "https://ecommerce-store-example.netlify.app",
            learningOutcomes: ["Payment processing", "Shopping cart logic", "Order management"]
          },
          {
            title: "Social Media Platform",
            description: "Create a social network with profiles, posts, comments, likes, and follows.",
            technologies: ["React", "Node.js", "Express", "MongoDB", "Socket.io"],
            difficulty: "Intermediate",
            timeEstimate: "3-4 weeks",
            githubUrl: "https://github.com/example/social-platform",
            demoUrl: "https://social-platform-example.netlify.app",
            learningOutcomes: ["Activity feeds", "Notifications", "Friend/Follow systems"]
          },
          {
            title: "Project Management Tool",
            description: "Build a tool for team collaboration with tasks, projects, and team management.",
            technologies: ["React", "Node.js", "Express", "MongoDB", "Socket.io"],
            difficulty: "Intermediate",
            timeEstimate: "3-4 weeks",
            githubUrl: "https://github.com/example/project-management",
            demoUrl: "https://project-management-example.netlify.app",
            learningOutcomes: ["Team collaboration", "Drag-and-drop UI", "Role-based permissions"]
          },
          {
            title: "Learning Management System",
            description: "Create a platform for online courses with lessons, quizzes, and progress tracking.",
            technologies: ["React", "Node.js", "Express", "MongoDB", "AWS S3"],
            difficulty: "Intermediate",
            timeEstimate: "3-4 weeks",
            githubUrl: "https://github.com/example/lms-platform",
            demoUrl: "https://lms-platform-example.netlify.app",
            learningOutcomes: ["Content management", "Quiz systems", "Progress tracking"]
          },
          {
            title: "Job Board Platform",
            description: "Build a job listing site with company profiles, job posts, and applications.",
            technologies: ["React", "Node.js", "Express", "MongoDB", "Redis"],
            difficulty: "Intermediate",
            timeEstimate: "3-4 weeks",
            githubUrl: "https://github.com/example/job-board-platform",
            demoUrl: "https://job-board-platform-example.netlify.app",
            learningOutcomes: ["Search/filter", "Application flow", "User types"]
          },
          {
            title: "Real Estate Marketplace",
            description: "Create a platform for listing, searching, and managing real estate properties.",
            technologies: ["React", "Node.js", "Express", "MongoDB", "Google Maps API"],
            difficulty: "Intermediate",
            timeEstimate: "3-4 weeks",
            githubUrl: "https://github.com/example/real-estate",
            demoUrl: "https://real-estate-example.netlify.app",
            learningOutcomes: ["Map integration", "Advanced filtering", "Image galleries"]
          },
          {
            title: "Booking System",
            description: "Build a reservation system for appointments, venues, or services.",
            technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
            difficulty: "Intermediate",
            timeEstimate: "3-4 weeks",
            githubUrl: "https://github.com/example/booking-system",
            demoUrl: "https://booking-system-example.netlify.app",
            learningOutcomes: ["Calendar UI", "Availability management", "Payment integration"]
          },
          {
            title: "Recipe Sharing Community",
            description: "Create a platform for cooking enthusiasts to share, discover, and save recipes.",
            technologies: ["React", "Node.js", "Express", "MongoDB", "Cloudinary"],
            difficulty: "Intermediate",
            timeEstimate: "3-4 weeks",
            githubUrl: "https://github.com/example/recipe-community",
            demoUrl: "https://recipe-community-example.netlify.app",
            learningOutcomes: ["Content creation", "Image optimization", "Social features"]
          },
          {
            title: "Fitness Tracking Platform",
            description: "Build an application for tracking workouts, nutrition, and fitness goals.",
            technologies: ["React", "Node.js", "Express", "MongoDB", "Chart.js"],
            difficulty: "Intermediate",
            timeEstimate: "3-4 weeks",
            githubUrl: "https://github.com/example/fitness-platform",
            demoUrl: "https://fitness-platform-example.netlify.app",
            learningOutcomes: ["Progress visualization", "Goal setting", "Health calculations"]
          },
          {
            title: "Crowdfunding Platform",
            description: "Create a platform for fundraising campaigns with donations and rewards.",
            technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
            difficulty: "Intermediate",
            timeEstimate: "3-4 weeks",
            githubUrl: "https://github.com/example/crowdfunding",
            demoUrl: "https://crowdfunding-example.netlify.app",
            learningOutcomes: ["Payment processing", "Campaign management", "Progress tracking"]
          }
        ],
        "Advanced": [
          {
            title: "Software-as-a-Service (SaaS) Platform",
            description: "Build a full-featured SaaS application with subscription plans, teams, and admin dashboard.",
            technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe", "Redis"],
            difficulty: "Advanced",
            timeEstimate: "2-3 months",
            githubUrl: "https://github.com/example/saas-platform",
            demoUrl: "https://saas-platform-example.netlify.app",
            learningOutcomes: ["Subscription billing", "Multi-tenancy", "Feature gating"]
          },
          {
            title: "Real-time Collaboration Tool",
            description: "Create a platform for real-time document editing, chat, and project management.",
            technologies: ["React", "Node.js", "WebSockets", "MongoDB", "Redis", "OT/CRDT"],
            difficulty: "Advanced",
            timeEstimate: "2-3 months",
            githubUrl: "https://github.com/example/collaboration-tool",
            demoUrl: "https://collaboration-tool-example.netlify.app",
            learningOutcomes: ["Conflict resolution", "Real-time sync", "Presence indicators"]
          },
          {
            title: "Video Streaming Platform",
            description: "Build a platform for uploading, processing, and streaming video content.",
            technologies: ["React", "Node.js", "Express", "MongoDB", "FFmpeg", "AWS S3/CloudFront"],
            difficulty: "Advanced",
            timeEstimate: "2-3 months",
            githubUrl: "https://github.com/example/video-platform",
            demoUrl: "https://video-platform-example.netlify.app",
            learningOutcomes: ["Media processing", "Content delivery", "Adaptive streaming"]
          },
          {
            title: "Marketplace Platform",
            description: "Create a multi-vendor marketplace with products, services, reviews, and payments.",
            technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe Connect", "Redis"],
            difficulty: "Advanced",
            timeEstimate: "2-3 months",
            githubUrl: "https://github.com/example/marketplace",
            demoUrl: "https://marketplace-example.netlify.app",
            learningOutcomes: ["Split payments", "Vendor management", "Commission handling"]
          },
          {
            title: "Enterprise Resource Planning (ERP) System",
            description: "Build a business management system with inventory, HR, CRM, and accounting modules.",
            technologies: ["React", "Node.js", "Express", "PostgreSQL", "Redis", "Chart.js"],
            difficulty: "Advanced",
            timeEstimate: "3-4 months",
            githubUrl: "https://github.com/example/erp-system",
            demoUrl: "https://erp-system-example.netlify.app",
            learningOutcomes: ["Complex business logic", "Reporting", "Module integration"]
          },
          {
            title: "Social Gaming Platform",
            description: "Create a platform for multiplayer games with matchmaking, leaderboards, and profiles.",
            technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Redis", "Canvas/WebGL"],
            difficulty: "Advanced",
            timeEstimate: "2-3 months",
            githubUrl: "https://github.com/example/gaming-platform",
            demoUrl: "https://gaming-platform-example.netlify.app",
            learningOutcomes: ["Game state synchronization", "Matchmaking", "Leaderboard systems"]
          },
          {
            title: "IoT Dashboard",
            description: "Build a platform for IoT device management, data visualization, and automation.",
            technologies: ["React", "Node.js", "MQTT", "MongoDB", "InfluxDB", "D3.js"],
            difficulty: "Advanced",
            timeEstimate: "2-3 months",
            githubUrl: "https://github.com/example/iot-dashboard",
            demoUrl: "https://iot-dashboard-example.netlify.app",
            learningOutcomes: ["Time-series data", "Device communication", "Real-time visualization"]
          },
          {
            title: "Customer Relationship Management (CRM) System",
            description: "Create a comprehensive CRM with contacts, deals, automation, and analytics.",
            technologies: ["React", "Node.js", "GraphQL", "MongoDB", "Redis", "Chart.js"],
            difficulty: "Advanced",
            timeEstimate: "2-3 months",
            githubUrl: "https://github.com/example/crm-system",
            demoUrl: "https://crm-system-example.netlify.app",
            learningOutcomes: ["Sales pipeline", "Automation rules", "Business analytics"]
          },
          {
            title: "AI-powered Content Platform",
            description: "Build a platform that uses AI for content generation, analysis, and recommendation.",
            technologies: ["React", "Node.js", "Express", "MongoDB", "TensorFlow.js", "NLP APIs"],
            difficulty: "Advanced",
            timeEstimate: "2-3 months",
            githubUrl: "https://github.com/example/ai-content-platform",
            demoUrl: "https://ai-content-platform-example.netlify.app",
            learningOutcomes: ["AI integration", "Content generation", "Recommendation systems"]
          },
          {
            title: "Decentralized Application (DApp)",
            description: "Create a web3 application that interacts with blockchain smart contracts.",
            technologies: ["React", "Node.js", "Ethers.js", "IPFS", "Solidity", "The Graph"],
            difficulty: "Advanced",
            timeEstimate: "2-3 months",
            githubUrl: "https://github.com/example/dapp",
            demoUrl: "https://dapp-example.netlify.app",
            learningOutcomes: ["Blockchain integration", "Smart contracts", "Decentralized storage"]
          }
        ]
      }
    },
    "Database": {
      icon: <FiDatabase className="h-5 w-5" />,
      description: "Projects focusing on database design, optimization, and data management",
      projects: {
        "Beginner": [
          {
            title: "SQL Database Designer",
            description: "Create a simple tool to design relational database schemas with tables and relationships.",
            technologies: ["SQL", "PostgreSQL", "Express", "React"],
            difficulty: "Beginner",
            timeEstimate: "1-2 weeks",
            githubUrl: "https://github.com/example/db-designer",
            demoUrl: "https://db-designer-example.com",
            learningOutcomes: ["Database design", "Normalization", "ERD creation"]
          },
          {
            title: "Data Import/Export Tool",
            description: "Build a utility for importing and exporting data between different database formats.",
            technologies: ["Node.js", "SQLite", "CSV", "JSON"],
            difficulty: "Beginner",
            timeEstimate: "1 week",
            githubUrl: "https://github.com/example/data-porter",
            demoUrl: "https://data-porter-example.com",
            learningOutcomes: ["File parsing", "Data transformation", "Database operations"]
          },
          {
            title: "Database Version Control",
            description: "Create a simple migration tool for tracking and applying database schema changes.",
            technologies: ["SQL", "Node.js", "Knex.js"],
            difficulty: "Beginner",
            timeEstimate: "1-2 weeks",
            githubUrl: "https://github.com/example/db-migrations",
            demoUrl: "https://db-migrations-example.com",
            learningOutcomes: ["Schema migrations", "Version control", "Database evolution"]
          }
        ]
      }
    }
  };
  
  // Replace the current useEffect with this simplified version
  useEffect(() => {
    // Just use the static project data instead of fetching
    setProjectData(projectCategories);
  }, []);
  
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Frontend': return <FiCode className="h-5 w-5" />;
      case 'Backend': return <FiServer className="h-5 w-5" />;
      case 'Fullstack': return <FiLayers className="h-5 w-5" />;
      case 'Database': return <FiDatabase className="h-5 w-5" />;
      case 'Mobile': return <FiSmartphone className="h-5 w-5" />;
      case 'DevOps': return <FiCloud className="h-5 w-5" />;
      default: return <FiCode className="h-5 w-5" />;
    }
  };
  
  const getCategoryDescription = (category) => {
    switch(category) {
      case 'Frontend': return "User interface projects focusing on HTML, CSS, JavaScript and modern frontend frameworks";
      case 'Backend': return "Server-side projects focusing on APIs, databases, authentication and business logic";
      case 'Fullstack': return "End-to-end projects incorporating both frontend and backend technologies";
      case 'Database': return "Projects focusing on database design, optimization, and data management";
      case 'Mobile': return "Mobile application projects for iOS, Android, and cross-platform frameworks";
      case 'DevOps': return "Projects focusing on deployment, automation, monitoring, and infrastructure";
      default: return "Projects for building development skills";
    }
  };

  // Filter projects based on search term
  const getFilteredProjects = () => {
    const data = Object.keys(projectData).length > 0 ? projectData : projectCategories;
    
    const filtered = {};
    
    Object.entries(data).forEach(([category, categoryData]) => {
      const filteredProjects = {};
      
      Object.entries(categoryData.projects).forEach(([difficulty, projects]) => {
        if (difficultyFilter === 'All' || difficultyFilter === difficulty) {
          const matchingProjects = projects.filter(project => 
            project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
          );
          
          if (matchingProjects.length > 0) {
            filteredProjects[difficulty] = matchingProjects;
          }
        }
      });
      
      if (Object.keys(filteredProjects).length > 0) {
        filtered[category] = {
          ...categoryData,
          projects: filteredProjects
        };
      }
    });
    
    return filtered;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Already filtered by the getFilteredProjects function
  };

  const filteredProjects = getFilteredProjects();
  const hasProjects = Object.keys(filteredProjects).length > 0;

  return (
    <Layout>
      <div className="container px-4 py-8">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Project Ideas</h1>
          <p className="text-lg text-gray-600 mb-6">
            Browse through our collection of project ideas to practice and enhance your development skills.
            From beginner to advanced, find the perfect project to build your portfolio.
          </p>
          
          {/* Search and filters */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
            <form onSubmit={handleSearch} className="flex-1 max-w-md">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search projects by title, description or technology..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </form>
            
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <FiFilter className="h-4 w-4" />
                  <span>Difficulty: {difficultyFilter}</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="bg-red-100 text-red-800 p-4 rounded-lg inline-block">
              <p className="font-medium">Error loading projects</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        ) : !hasProjects ? (
          <div className="text-center py-16">
            <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
              <FiSearch className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">No matching projects found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filters to find more projects.
            </p>
          </div>
        ) : (
          <Tabs defaultValue={Object.keys(filteredProjects)[0]} className="w-full">
            <TabsList className="flex w-full overflow-x-auto justify-start mb-8 pb-2">
              {Object.entries(filteredProjects).map(([category, { icon }]) => (
                <TabsTrigger key={category} value={category} className="flex items-center gap-2">
                  {icon} {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {Object.entries(filteredProjects).map(([category, { description, projects }]) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="mb-8">
                  <p className="text-gray-600">{description}</p>
                </div>
                
                {Object.entries(projects).map(([difficulty, projectList]) => (
                  <div key={difficulty} className="mb-12">
                    <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                      <Badge className={difficultyColors[difficulty]}>
                        {difficulty}
                      </Badge>
                      <span>{difficulty} Projects</span>
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {projectList.map((project, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <Card className="h-full flex flex-col">
                            <CardHeader>
                              <CardTitle className="font-bold">{project.title}</CardTitle>
                              <CardDescription>{project.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                              <div className="mb-4">
                                <p className="text-sm font-medium mb-1">Technologies:</p>
                                <div className="flex flex-wrap gap-1.5">
                                  {project.technologies.map((tech, i) => (
                                    <Badge key={i} variant="outline" className="text-xs">
                                      {tech}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="mb-4">
                                <p className="text-sm font-medium mb-1">Estimated Time:</p>
                                <p className="text-sm">{project.timeEstimate}</p>
                              </div>
                              
                              <div>
                                <p className="text-sm font-medium mb-1">Learning Outcomes:</p>
                                <ul className="list-disc list-inside text-sm space-y-1">
                                  {project.learningOutcomes.map((outcome, i) => (
                                    <li key={i}>{outcome}</li>
                                  ))}
                                </ul>
                              </div>
                            </CardContent>
                            <CardFooter className="flex gap-2 pt-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex-1 gap-1"
                                asChild
                              >
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                  <FiGithub className="h-4 w-4" />
                                  Code
                                </a>
                              </Button>
                              
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex-1 gap-1"
                                asChild
                              >
                                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                  <FiExternalLink className="h-4 w-4" />
                                  Demo
                                </a>
                              </Button>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                className="px-2"
                                onClick={() => {
                                  navigator.clipboard.writeText(project.title);
                                  toast.success('Project name copied to clipboard');
                                }}
                                title="Copy project name"
                              >
                                <FiBookmark className="h-4 w-4" />
                              </Button>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
    </Layout>
  );
  
};

export default Projects;