import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Github, Linkedin, Twitter, Globe, Mail, ArrowRight, Code, X as Close } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SiNetflix, SiSpotify, SiUber, SiAirbnb, SiSlack, SiStripe } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { Instagram } from "lucide-react";
import * as DialogPrimitive from '@radix-ui/react-dialog';

// Mock data for contributors - enhanced with platform contributions
const mockContributors = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: 'https://i.pravatar.cc/150?img=1',
    role: 'Frontend Developer',
    contributions: 127,
    bio: 'Passionate about React and modern web development. Building accessible and beautiful interfaces.',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com/sarahjohnson',
    linkedin: 'https://linkedin.com/in/sarahjohnson',
    twitter: 'https://twitter.com/sarahjohnson',
    website: 'https://sarahjohnson.dev',
    platformContributions: [
      { 
        platformId: 'netflix', 
        platformName: 'Netflix', 
        techUpdated: ['React', 'Next.js', 'Redux'],
        description: 'Updated frontend tech stack to include modern React patterns and performance optimization techniques.'
      },
      { 
        platformId: 'spotify', 
        platformName: 'Spotify', 
        techUpdated: ['React', 'Styled Components'],
        description: 'Added information about Spotify\'s design system and component library.'
      }
    ]
  },
  {
    id: 2,
    name: 'Alex Chen',
    avatar: 'https://i.pravatar.cc/150?img=11',
    role: 'Full Stack Developer',
    contributions: 95,
    bio: 'Building scalable web applications with modern technologies. Open source enthusiast.',
    skills: ['JavaScript', 'Node.js', 'MongoDB', 'Docker'],
    github: 'https://github.com/alexchen',
    linkedin: 'https://linkedin.com/in/alexchen',
    platformContributions: [
      { 
        platformId: 'airbnb', 
        platformName: 'Airbnb', 
        techUpdated: ['Node.js', 'GraphQL', 'React'],
        description: 'Updated backend architecture details and API design patterns used by Airbnb.'
      },
      { 
        platformId: 'slack', 
        platformName: 'Slack', 
        techUpdated: ['Electron', 'Redux', 'WebSockets'],
        description: 'Added detailed information about how Slack uses WebSockets and Electron for real-time communication.'
      }
    ]
  },
  {
    id: 3,
    name: 'Maya Patel',
    avatar: 'https://i.pravatar.cc/150?img=5',
    role: 'UI/UX Designer',
    contributions: 78,
    bio: 'Creating intuitive and delightful user experiences. Design systems expert.',
    skills: ['Figma', 'UI Design', 'Design Systems', 'User Research'],
    github: 'https://github.com/mayapatel',
    website: 'https://mayapatels.design',
    platformContributions: [
      { 
        platformId: 'ig', 
        platformName: 'Instagram', 
        techUpdated: ['Design System', 'React Native', 'UI Components'],
        description: 'Updated information about Instagram\'s design system and accessibility features.'
      }
    ]
  },
  {
    id: 4,
    name: 'Carlos Rodriguez',
    avatar: 'https://i.pravatar.cc/150?img=12',
    role: 'Backend Engineer',
    contributions: 142,
    bio: 'Performance optimization specialist. Working on distributed systems and cloud architecture.',
    skills: ['Python', 'Django', 'AWS', 'PostgreSQL', 'Redis'],
    github: 'https://github.com/carlosr',
    linkedin: 'https://linkedin.com/in/carlosrodriguez',
    twitter: 'https://twitter.com/carlosr',
    platformContributions: [
      { 
        platformId: 'twitter', 
        platformName: 'Twitter', 
        techUpdated: ['Scala', 'Redis', 'Kafka'],
        description: 'Provided detailed insights on Twitter\'s real-time data processing capabilities.'
      },
      { 
        platformId: 'uber', 
        platformName: 'Uber', 
        techUpdated: ['Go', 'Cassandra', 'Kafka'],
        description: 'Updated information about Uber\'s microservices architecture and data processing pipeline.'
      },
      { 
        platformId: 'airbnb', 
        platformName: 'Airbnb', 
        techUpdated: ['Python', 'Kubernetes', 'ML Infrastructure'],
        description: 'Added details about Airbnb\'s machine learning infrastructure and data pipeline.'
      }
    ]
  },
  {
    id: 5,
    name: 'Aisha Williams',
    avatar: 'https://i.pravatar.cc/150?img=9',
    role: 'DevOps Engineer',
    contributions: 83,
    bio: 'Automating everything. CI/CD pipeline expert and infrastructure enthusiast.',
    skills: ['Kubernetes', 'Terraform', 'GitHub Actions', 'AWS', 'Monitoring'],
    github: 'https://github.com/aishawilliams',
    linkedin: 'https://linkedin.com/in/aishawilliams',
    platformContributions: [
      { 
        platformId: 'netflix', 
        platformName: 'Netflix', 
        techUpdated: ['AWS', 'Kubernetes', 'Spinnaker'],
        description: 'Updated details about Netflix\'s cloud infrastructure and deployment practices.'
      },
      { 
        platformId: 'spotify', 
        platformName: 'Spotify', 
        techUpdated: ['Kubernetes', 'GCP', 'CI/CD'],
        description: 'Added information about Spotify\'s move to Google Cloud Platform and their Kubernetes setup.'
      }
    ]
  },
  {
    id: 6,
    name: 'Jamal Thompson',
    avatar: 'https://i.pravatar.cc/150?img=13',
    role: 'Mobile Developer',
    contributions: 62,
    bio: 'Building cross-platform mobile experiences. React Native specialist.',
    skills: ['React Native', 'JavaScript', 'TypeScript', 'Redux', 'Mobile UX'],
    github: 'https://github.com/jamalthompson',
    website: 'https://jamalthompson.dev',
    platformContributions: [
      { 
        platformId: 'ig', 
        platformName: 'Instagram', 
        techUpdated: ['React Native', 'Mobile Infrastructure', 'Redux'],
        description: 'Updated information about Instagram\'s mobile architecture and performance optimizations.'
      },
      { 
        platformId: 'uber', 
        platformName: 'Uber', 
        techUpdated: ['React Native', 'Mobile Maps', 'Native Modules'],
        description: 'Added details about how Uber integrates maps and location services in their mobile apps.'
      }
    ]
  },
  {
    id: 7,
    name: 'Sophia Kim',
    avatar: 'https://i.pravatar.cc/150?img=8',
    role: 'Data Scientist',
    contributions: 54,
    bio: 'Turning data into actionable insights. ML model optimization and data visualization expert.',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Data Analysis', 'Visualization'],
    github: 'https://github.com/sophiakim',
    linkedin: 'https://linkedin.com/in/sophiakim',
    twitter: 'https://twitter.com/sophiakim',
    platformContributions: [
      { 
        platformId: 'netflix', 
        platformName: 'Netflix', 
        techUpdated: ['PyTorch', 'Recommendation System', 'Data Processing'],
        description: 'Updated information about Netflix\'s recommendation algorithms and ML infrastructure.'
      },
      { 
        platformId: 'spotify', 
        platformName: 'Spotify', 
        techUpdated: ['ML Pipeline', 'Recommendation', 'Data Science'],
        description: 'Added details about Spotify\'s recommendation engine and personalization features.'
      }
    ]
  },
  {
    id: 8,
    name: 'David Martinez',
    avatar: 'https://i.pravatar.cc/150?img=17',
    role: 'Technical Writer',
    contributions: 43,
    bio: 'Documenting complex technical concepts in accessible ways. API documentation specialist.',
    skills: ['Technical Writing', 'Documentation', 'Markdown', 'API Reference'],
    github: 'https://github.com/davidmartinez',
    website: 'https://davidwrites.tech',
    platformContributions: [
      { 
        platformId: 'stripe', 
        platformName: 'Stripe', 
        techUpdated: ['API Documentation', 'Developer Experience'],
        description: 'Updated information about Stripe\'s API design and developer documentation approach.'
      },
      { 
        platformId: 'slack', 
        platformName: 'Slack', 
        techUpdated: ['API Documentation', 'SDK'],
        description: 'Added comprehensive details about Slack\'s API structure and documentation.'
      }
    ]
  }
];

// Map of platform IDs to their icons for the modal
const platformIcons = {
  ig: <div className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-md p-1.5"><Instagram className="h-5 w-5 text-white" /></div>,
  netflix: <div className="bg-gradient-to-r from-[#8E0E00] to-[#1F1C18] rounded-md p-1.5"><SiNetflix className="h-5 w-5 text-white" /></div>,
  spotify: <div className="bg-gradient-to-r from-[#1DB954] to-[#1ED760] rounded-md p-1.5"><SiSpotify className="h-5 w-5 text-white" /></div>,
  uber: <div className="bg-gradient-to-r from-[#000000] to-[#333333] rounded-md p-1.5"><SiUber className="h-5 w-5 text-white" /></div>,
  airbnb: <div className="bg-gradient-to-r from-[#FF5A5F] to-[#FF385C] rounded-md p-1.5"><SiAirbnb className="h-5 w-5 text-white" /></div>,
  slack: <div className="bg-gradient-to-r from-[#4A154B] to-[#7C2D7C] rounded-md p-1.5"><SiSlack className="h-5 w-5 text-white" /></div>,
  stripe: <div className="bg-gradient-to-r from-[#635BFF] to-[#8C84FF] rounded-md p-1.5"><SiStripe className="h-5 w-5 text-white" /></div>,
  twitter: <div className="bg-gradient-to-r from-[#1D9BF0] to-[#1A8CD8] rounded-md p-1.5"><FaXTwitter className="h-5 w-5 text-white" /></div>
};

const Contributor = () => {
  // State for storing contributors and search
  const [contributors, setContributors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedContributor, setSelectedContributor] = useState(null);

  // Simulate fetching data from backend
  useEffect(() => {
    const fetchContributors = async () => {
      // Simulate API delay
      setIsLoading(true);
      try {
        // In a real app, you would fetch from an API
        // const response = await fetch('/api/contributors');
        // const data = await response.json();
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Use mock data
        setContributors(mockContributors);
      } catch (error) {
        console.error('Error fetching contributors:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContributors();
  }, []);

  // Filter contributors based on search term
  const filteredContributors = contributors.filter(contributor =>
    contributor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contributor.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contributor.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (contributor.platformContributions && contributor.platformContributions.some(pc => 
      pc.platformName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pc.techUpdated.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    ))
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  // Open modal with contributor details
  const handleOpenContributorDetails = (contributor) => {
    console.log("Opening details for:", contributor.name);
    setSelectedContributor(contributor);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Our Contributors</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the talented developers, designers, and writers who have contributed to making Greedy Map an amazing resource for the tech community.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mt-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Search contributors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10 py-6 rounded-full w-full border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* No Results State */}
        {!isLoading && filteredContributors.length === 0 && (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <p className="text-xl text-gray-600">No contributors found matching "{searchTerm}"</p>
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 text-blue-500 hover:underline"
            >
              Clear search
            </button>
          </div>
        )}

        {/* Contributors Grid */}
        {!isLoading && filteredContributors.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredContributors.map((contributor) => (
              <motion.div
                key={contributor.id}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100 cursor-pointer"
                onClick={() => handleOpenContributorDetails(contributor)}
                whileHover={{ y: -5 }}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={contributor.avatar}
                      alt={`${contributor.name}'s avatar`}
                      className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-100"
                    />
                    <div>
                      <h3 className="font-bold text-lg">{contributor.name}</h3>
                      <p className="text-sm text-blue-600">{contributor.role}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{contributor.bio}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="font-medium">{contributor.contributions}</span>
                      <span className="ml-1">contributions</span>
                    </div>
                  </div>

                  {/* Platform contributions preview */}
                  {contributor.platformContributions && contributor.platformContributions.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-medium text-gray-500 mb-2">CONTRIBUTED TO</p>
                      <div className="flex flex-wrap gap-2">
                        {contributor.platformContributions.map((pc, idx) => (
                          <div key={idx} className="flex items-center gap-1 bg-gray-50 text-gray-700 px-2 py-1 rounded-full text-xs">
                            {platformIcons[pc.platformId]}
                            <span>{pc.platformName}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-2 mt-3">
                    {contributor.github && (
                      <a
                        href={contributor.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-800"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {contributor.linkedin && (
                      <a
                        href={contributor.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-800"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Linkedin size={18} />
                      </a>
                    )}
                    {contributor.twitter && (
                      <a
                        href={contributor.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-800"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Twitter size={18} />
                      </a>
                    )}
                    {contributor.website && (
                      <a
                        href={contributor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-800"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Globe size={18} />
                      </a>
                    )}
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="ghost"
                      className="text-blue-600 text-xs p-0 h-auto hover:bg-transparent hover:text-blue-800"
                    >
                      <span>View details</span>
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Contributor Details Modal - Troubleshooting version */}
        {selectedContributor && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div 
              className="bg-white rounded-lg p-6 w-full max-w-[600px] max-h-[85vh] overflow-y-auto" 
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <div className="flex justify-end mb-2">
                <button 
                  onClick={() => setSelectedContributor(null)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={selectedContributor.avatar}
                  alt={`${selectedContributor.name}'s avatar`}
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
                />
                <div>
                  <h2 className="text-xl font-bold">{selectedContributor.name}</h2>
                  <p className="text-blue-600">{selectedContributor.role}</p>
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-lg font-medium mb-2">About</h3>
                <p className="text-gray-600 mb-6">{selectedContributor.bio}</p>
                
                {/* Contribution count */}
                <div className="flex items-center mb-6 text-sm bg-blue-50 p-3 rounded-lg">
                  <span className="font-bold text-blue-700 text-lg mr-2">{selectedContributor.contributions}</span>
                  <span className="text-blue-700">total contributions across platforms</span>
                </div>

                {/* Skills */}
                <h3 className="text-lg font-medium mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedContributor.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
                {/* Platform Contributions */}
                {selectedContributor.platformContributions && selectedContributor.platformContributions.length > 0 && (
                  <>
                    <h3 className="text-lg font-medium mb-3">Platform Contributions</h3>
                    <div className="space-y-4">
                      {selectedContributor.platformContributions.map((pc, idx) => (
                        <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            {platformIcons[pc.platformId]}
                            <Link 
                              to={`/techstack/${pc.platformId}`}
                              className="font-medium hover:text-blue-600 flex items-center gap-1"
                              onClick={() => setSelectedContributor(null)}
                            >
                              {pc.platformName}
                              <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                          
                          <p className="text-sm text-gray-700 mb-3">{pc.description}</p>
                          
                          <div className="mb-3">
                            <p className="text-xs uppercase font-semibold text-gray-500 mb-1.5">Technologies Updated</p>
                            <div className="flex flex-wrap gap-1.5">
                              {pc.techUpdated.map((tech, i) => (
                                <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full flex items-center gap-1">
                                  <Code className="h-3 w-3" />
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Contributor;
