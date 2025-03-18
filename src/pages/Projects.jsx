import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FiSearch, FiX, FiGithub, FiExternalLink } from 'react-icons/fi';
import { SiReact, SiNextdotjs, SiTailwindcss, SiTypescript, SiNodedotjs, SiMongodb, SiFirebase, SiStripe } from "react-icons/si";
import { 
  SiPython, 
  SiTensorflow, 
  SiDocker, 
  SiPostgresql, 
  SiRedis, 
  SiSocketdotio, 
  SiFastapi, 
  SiThreedotjs, 
  SiWeb3Dotjs, 
  SiChartdotjs, 
  SiEclipsemosquitto 
} from "react-icons/si";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const projectsData = [
  // Full Stack 
  {
    id: 'netflix-clone',
    title: 'Netflix Clone',
    description: 'Full-stack streaming platform with user authentication, payment integration, and real-time video streaming.',
    technologies: ['React', 'Next.js', 'Node.js', 'MongoDB', 'Stripe'],
    category: 'Full Stack',
    difficulty: 'PRO',
    demo: 'https://netflix-clone-demo.vercel.app',
    github: 'https://github.com/theodorusclarence/netflix-clone',
    docs: 'https://netflix-clone-docs.vercel.app',
    article: 'https://blog.theodorusclarence.com/netflix-clone',
    image: '/projects/netflix.jpg',
    featured: true
  },
  {
    id: 'twitter-clone',
    title: 'Twitter Clone',
    description: 'Social media platform with real-time updates, user interactions, and media sharing.',
    technologies: ['React', 'Firebase', 'Tailwind CSS', 'NextAuth.js'],
    category: 'Full Stack',
    difficulty: 'Intermediate',
    demo: 'https://twitter-clone-demo.vercel.app',
    github: 'https://github.com/ccrsxx/twitter-clone',
    docs: 'https://twitter-clone.docs.com',
    article: 'https://blog.twitter-clone.com',
    image: '/projects/twitter.jpg',
    featured: false
  },

  // Frontend Projects
  {
    id: 'portfolio-3d',
    title: '3D Portfolio Website',
    description: 'Interactive 3D portfolio with ThreeJS animations and modern design.',
    technologies: ['React', 'Three.js', 'Tailwind CSS', 'Framer Motion'],
    category: 'Frontend',
    difficulty: 'Intermediate',
    demo: 'https://3d-portfolio.demo.com',
    github: 'https://github.com/adrianhajdin/3d_portfolio',
    docs: 'https://threejs.org/docs/',
    article: 'https://blog.3d-portfolio.com',
    image: '/projects/3d-portfolio.jpg',
    featured: true
  },

  // AI/ML Projects
  {
    id: 'ai-image-generator',
    title: 'AI Image Generator',
    description: 'DALL-E powered image generation with prompt engineering and gallery features.',
    technologies: ['React', 'OpenAI API', 'Node.js', 'MongoDB'],
    category: 'AI/ML',
    difficulty: 'PRO',
    demo: 'https://ai-image-gen.demo.com',
    github: 'https://github.com/openai/dall-e',
    docs: 'https://platform.openai.com/docs',
    article: 'https://blog.openai.com/dall-e',
    image: '/projects/ai-image.jpg',
    featured: true
  },
  {
    id: 'sentiment-analyzer',
    title: 'Social Media Sentiment Analyzer',
    description: 'Real-time sentiment analysis of social media posts using NLP and machine learning.',
    technologies: ['Python', 'TensorFlow', 'FastAPI', 'React'],
    category: 'AI/ML',
    difficulty: 'PRO',
    demo: 'https://sentiment-analyzer.demo.com',
    github: 'https://github.com/sentiment-analyzer',
    docs: 'https://docs.sentiment-analyzer.com',
    article: 'https://blog.sentiment-analyzer.com',
    image: '/projects/sentiment.jpg',
    featured: true
  },
  {
    id: 'object-detection',
    title: 'Real-time Object Detection',
    description: 'Computer vision application for real-time object detection using YOLO.',
    technologies: ['Python', 'TensorFlow', 'OpenCV', 'Flask'],
    category: 'AI/ML',
    difficulty: 'Intermediate',
    demo: 'https://object-detect.demo.com',
    github: 'https://github.com/object-detection',
    docs: 'https://docs.object-detect.com',
    article: 'https://blog.object-detect.com',
    image: '/projects/object-detection.jpg',
    featured: false
  },

  // Mobile Projects
  {
    id: 'food-delivery',
    title: 'Food Delivery App',
    description: 'Mobile food delivery platform with real-time order tracking and payment integration.',
    technologies: ['React Native', 'Redux', 'Node.js', 'MongoDB'],
    category: 'Mobile',
    difficulty: 'Intermediate',
    demo: 'https://food-delivery.demo.com',
    github: 'https://github.com/food-delivery/app',
    docs: 'https://food-delivery.docs.com',
    article: 'https://blog.food-delivery.com',
    image: '/projects/food-delivery.jpg',
    featured: false
  },

  // IoT Projects
  {
    id: 'smart-home',
    title: 'Smart Home Hub',
    description: 'IoT platform for home automation with real-time monitoring and control.',
    technologies: ['Node.js', 'MQTT', 'React', 'MongoDB'],
    category: 'IoT',
    difficulty: 'PRO',
    demo: 'https://smart-home.demo.com',
    github: 'https://github.com/smart-home',
    docs: 'https://docs.smart-home.com',
    article: 'https://blog.smart-home.com',
    image: '/projects/smart-home.jpg',
    featured: true
  },
  {
    id: 'plant-monitor',
    title: 'Smart Plant Monitor',
    description: 'IoT device for monitoring plant health with mobile app integration.',
    technologies: ['Arduino', 'MQTT', 'React Native', 'Firebase'],
    category: 'IoT',
    difficulty: 'Intermediate',
    demo: 'https://plant-monitor.demo.com',
    github: 'https://github.com/plant-monitor',
    docs: 'https://docs.plant-monitor.com',
    article: 'https://blog.plant-monitor.com',
    image: '/projects/plant-monitor.jpg',
    featured: false
  },

  // Blockchain Projects
  {
    id: 'defi-exchange',
    title: 'DeFi Exchange Platform',
    description: 'Decentralized exchange with liquidity pools and yield farming.',
    technologies: ['Solidity', 'Web3.js', 'React', 'Hardhat'],
    category: 'Blockchain',
    difficulty: 'PRO',
    demo: 'https://defi-exchange.demo.com',
    github: 'https://github.com/defi-exchange',
    docs: 'https://docs.defi-exchange.com',
    article: 'https://blog.defi-exchange.com',
    image: '/projects/defi.jpg',
    featured: true
  },
  {
    id: 'nft-marketplace',
    title: 'NFT Marketplace',
    description: 'Platform for minting, buying, and selling NFTs with wallet integration.',
    technologies: ['Solidity', 'IPFS', 'Next.js', 'Ethereum'],
    category: 'Blockchain',
    difficulty: 'Intermediate',
    demo: 'https://nft-market.demo.com',
    github: 'https://github.com/nft-marketplace',
    docs: 'https://docs.nft-market.com',
    article: 'https://blog.nft-market.com',
    image: '/projects/nft.jpg',
    featured: false
  },

  // DevOps Projects
  {
    id: 'ci-cd-pipeline',
    title: 'CI/CD Pipeline Builder',
    description: 'Automated pipeline builder for various cloud platforms with monitoring.',
    technologies: ['Docker', 'Kubernetes', 'Jenkins', 'Terraform'],
    category: 'DevOps',
    difficulty: 'PRO',
    demo: 'https://pipeline.demo.com',
    github: 'https://github.com/pipeline-builder',
    docs: 'https://docs.pipeline.com',
    article: 'https://blog.pipeline.com',
    image: '/projects/pipeline.jpg',
    featured: true
  },
  {
    id: 'monitoring-dashboard',
    title: 'DevOps Monitoring Dashboard',
    description: 'Real-time system monitoring and alerting platform.',
    technologies: ['Grafana', 'Prometheus', 'Node.js', 'Docker'],
    category: 'DevOps',
    difficulty: 'Intermediate',
    demo: 'https://monitor.demo.com',
    github: 'https://github.com/monitoring-dash',
    docs: 'https://docs.monitor.com',
    article: 'https://blog.monitor.com',
    image: '/projects/monitoring.jpg',
    featured: false
  },

  // Backend Projects
  {
    id: 'microservices-platform',
    title: 'E-commerce Microservices',
    description: 'Scalable e-commerce backend with microservices architecture.',
    technologies: ['Node.js', 'Docker', 'Redis', 'PostgreSQL'],
    category: 'Backend',
    difficulty: 'PRO',
    demo: 'https://micro.demo.com',
    github: 'https://github.com/micro-ecommerce',
    docs: 'https://docs.micro.com',
    article: 'https://blog.micro.com',
    image: '/projects/microservices.jpg',
    featured: true
  },
  {
    id: 'realtime-chat',
    title: 'Real-time Chat API',
    description: 'Scalable chat backend with WebSocket support and message persistence.',
    technologies: ['Node.js', 'Socket.io', 'Redis', 'MongoDB'],
    category: 'Backend',
    difficulty: 'Intermediate',
    demo: 'https://chat-api.demo.com',
    github: 'https://github.com/chat-api',
    docs: 'https://docs.chat-api.com',
    article: 'https://blog.chat-api.com',
    image: '/projects/chat.jpg',
    featured: false
  }
];

// Update difficulty colors to blue theme
const difficultyColors = {
  'Beginner': 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  'Intermediate': 'bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
  'PRO': 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
};

const categories = [
  'All', 
  'Full Stack', 
  'Frontend', 
  'Backend', 
  'AI/ML', 
  'Mobile', 
  'DevOps', 
  'Blockchain', 
  'IoT'
];

const techIcons = {
  'React': <SiReact className="text-[#61DAFB]" />,
  'Next.js': <SiNextdotjs className="text-black dark:text-white" />,
  'Tailwind CSS': <SiTailwindcss className="text-[#06B6D4]" />,
  'TypeScript': <SiTypescript className="text-[#3178C6]" />,
  'Node.js': <SiNodedotjs className="text-[#339933]" />,
  'MongoDB': <SiMongodb className="text-[#47A248]" />,
  'Firebase': <SiFirebase className="text-[#FFCA28]" />,
  'Stripe': <SiStripe className="text-[#008CDD]" />,
  'Python': <SiPython className="text-[#3776AB]" />,
  'TensorFlow': <SiTensorflow className="text-[#FF6F00]" />,
  'Docker': <SiDocker className="text-[#2496ED]" />,
  'PostgreSQL': <SiPostgresql className="text-[#336791]" />,
  'Redis': <SiRedis className="text-[#DC382D]" />,
  'WebSocket': <SiSocketdotio className="text-[#010101]" />,
  'FastAPI': <SiFastapi className="text-[#009688]" />,
  'Three.js': <SiThreedotjs className="text-[#000000]" />,
  'Web3.js': <SiWeb3Dotjs className="text-[#F16822]" />,
  'Chart.js': <SiChartdotjs className="text-[#FF6384]" />,
  'React Native': <SiReact className="text-[#61DAFB]" />,
  'Socket.io': <SiSocketdotio className="text-[#010101]" />,
  'MQTT': <SiEclipsemosquitto className="text-[#3C5280]" />
};

const difficulties = ['All', 'Beginner', 'Intermediate', 'PRO'];

// Update ProjectStats with blue gradient colors
const ProjectStats = ({ project }) => (
  <div className="flex items-center gap-4 text-sm text-gray-500 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 p-3 rounded-lg backdrop-blur-sm">
    <div className="flex items-center">
      <FiGithub className="mr-1 text-blue-500" />
      <span>Stars: 1.2k</span>
    </div>
    <Separator orientation="vertical" className="h-4" />
    <div className="flex items-center">
      <FiExternalLink className="mr-1 text-blue-500" />
      <span>Views: 3.4k</span>
    </div>
    <Separator orientation="vertical" className="h-4" />
    <div className="flex items-center">
      <span className="text-xs px-2 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full">
        Active
      </span>
    </div>
  </div>
);

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(projectsData);

  const handleSearch = (value) => {
    setSearchTerm(value);
    filterProjects(value, selectedCategory, selectedDifficulty);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    filterProjects(searchTerm, category, selectedDifficulty);
  };

  const filterProjects = (search, category, difficulty) => {
    let filtered = projectsData;

    // Filter by search term
    if (search) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // Filter by category
    if (category !== 'All') {
      filtered = filtered.filter(project => project.category === category);
    }

    // Filter by difficulty
    if (difficulty !== 'All') {
      filtered = filtered.filter(project => project.difficulty === difficulty);
    }

    setFilteredProjects(filtered);
  };

  return (
    <Layout>
      <motion.section
        className="py-12 md:py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section - Updated with blue gradient */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-500 bg-[length:400%_400%] animate-gradient mb-16 py-20 rounded-3xl shadow-2xl">
          <div className="absolute inset-0 bg-grid-white/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-600/50 to-transparent" />
          
          {/* Content */}
          <motion.div
            className="container px-4 md:px-6 text-center text-white relative z-10"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
              Featured Projects
            </h1>
            <p className="mx-auto max-w-[700px] text-lg md:text-xl text-gray-200 mb-12">
              Explore our collection of innovative projects built with modern technologies
            </p>

            {/* Search Section - Updated with blue tone */}
            <div className="w-full max-w-2xl mx-auto backdrop-blur-md bg-white/20 p-3 rounded-2xl shadow-xl border border-white/20">
              <div className="relative flex items-center w-full">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/80" />
                <input
                  type="search"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-white/10 py-3 pl-12 pr-4 text-white placeholder-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                />
                {searchTerm && (
                  <button
                    onClick={() => handleSearch('')}
                    className="absolute right-4 p-1 text-white/70 hover:text-white transition-colors duration-200"
                  >
                    <FiX className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters Section - Updated with white and blue theme */}
        <div className="container px-4 md:px-6 mb-12 bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm">
          <div className="flex flex-col gap-6 mb-8">
            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => handleCategorySelect(category)}
                  className={`rounded-full px-6 py-2 transition-all duration-300 ${
                    selectedCategory === category 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-blue-500/25'
                      : 'hover:border-blue-500 hover:text-blue-500 border-blue-200 dark:border-blue-800 dark:hover:border-blue-600'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
            
            {/* Difficulty filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {difficulties.map((difficulty) => (
                <Button
                  key={difficulty}
                  onClick={() => {
                    setSelectedDifficulty(difficulty);
                    filterProjects(searchTerm, selectedCategory, difficulty);
                  }}
                  className={`rounded-full px-6 py-2 transition-all duration-300 ${
                    selectedDifficulty === difficulty
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : `${difficulty !== 'All' ? difficultyColors[difficulty] : ''} hover:shadow-md`
                  }`}
                >
                  {difficulty}
                </Button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full group hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 bg-white dark:bg-gray-800/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                  <CardHeader className="relative">
                    <div className="absolute -right-2 -top-2 z-10">
                      {project.featured && (
                        <span className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-medium rounded-full shadow-lg">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {project.title}
                      </CardTitle>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[project.difficulty]}`}>
                        {project.difficulty}
                      </span>
                    </div>
                    <CardDescription className="text-blue-600/75 dark:text-blue-400">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ProjectStats project={project} />
                    <div className="flex flex-wrap gap-2 my-4">
                      {project.technologies.map((tech) => (
                        <Badge 
                          key={tech} 
                          variant="secondary" 
                          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 transition-all duration-300 hover:scale-105"
                        >
                          {techIcons[tech]}
                          <span>{tech}</span>
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      asChild 
                      variant="outline" 
                      size="sm"
                      className="hover:border-blue-500 hover:text-blue-500 border-blue-200 dark:border-blue-800 transition-colors duration-300"
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <FiGithub className="mr-2" /> Code
                      </a>
                    </Button>
                    <Button 
                      asChild 
                      size="sm"
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 transition-opacity duration-300"
                    >
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <FiExternalLink className="mr-2" /> Live Demo
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action - Updated with white and blue theme */}
        <motion.div
          className="mt-20 mb-6 text-center border-t border-gray-200 dark:border-gray-800 pt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-10 rounded-3xl shadow-sm">
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              Want to build your own projects?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Check out our learning resources and start building amazing projects today.
            </p>
            <Button
              asChild
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full px-8 py-6 h-12 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
            >
              <Link to="/learning">Explore Learning Resources</Link>
            </Button>
          </div>
        </motion.div>
      </motion.section>
    </Layout>
  );
};

export default Projects;
