import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, CloudCog, Code, Database, Globe, Server, Search, Instagram } from 'lucide-react';
import { SiNetflix, SiSpotify, SiUber, SiAirbnb, SiSlack, SiStripe } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const platformsData = [
  {
    id: 'ig',
    name: 'Instagram',
    description: 'Photo and video sharing social network with a focus on mobile experience',
    industry: 'Social Media',
    topTechnologies: ['React', 'Python', 'GraphQL'],
    icon: (
      <div className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-[15px] p-2.5 transform transition-all duration-300 group-hover:scale-110 shadow-md">
        <Instagram className="h-9 w-9 text-white" />
      </div>
    ),
    color: 'bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100'
  },
  {
    id: 'netflix',
    name: 'Netflix',
    description: "Streaming service with a vast library of movies, TV shows and original content",
    industry: 'Entertainment',
    topTechnologies: ['React', 'Java', 'Kafka'],
    icon: (
      <div className="bg-gradient-to-r from-[#8E0E00] to-[#1F1C18] rounded-[15px] p-2.5 transform transition-all duration-300 group-hover:scale-110 shadow-md">
        <SiNetflix className="h-9 w-9 text-white" />
      </div>
    ),
    color: 'bg-gradient-to-br from-red-50 to-orange-50 hover:from-red-100 hover:to-orange-100'
  },
  {
    id: 'spotify',
    name: 'Spotify',
    description: 'Music streaming platform with personalized recommendations and playlists',
    industry: 'Music Streaming',
    topTechnologies: ['React', 'Python', 'Java'],
    icon: (
      <div className="bg-gradient-to-r from-[#1DB954] to-[#1ED760] rounded-[15px] p-2.5 transform transition-all duration-300 group-hover:scale-110 shadow-md">
        <SiSpotify className="h-9 w-9 text-white" />
      </div>
    ),
    color: 'bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100'
  },
  {
    id: 'uber',
    name: 'Uber',
    description: 'Ride-hailing platform connecting drivers with passengers in real-time',
    industry: 'Transportation',
    topTechnologies: ['React', 'Go', 'Python'],
    icon: (
      <div className="bg-gradient-to-r from-[#000000] to-[#333333] rounded-[15px] p-2.5 transform transition-all duration-300 group-hover:scale-110 shadow-md">
        <SiUber className="h-9 w-9 text-white"/>
      </div>
    ),
    color: 'bg-gradient-to-br from-slate-50 to-gray-100 hover:from-slate-100 hover:to-gray-200'
  },
  {
    id: 'airbnb',
    name: 'Airbnb',
    description: 'Online marketplace for short and long-term homestays and experiences',
    industry: 'Travel & Accommodation',
    topTechnologies: ['React', 'Ruby on Rails', 'GraphQL'],
    icon: (
      <div className="bg-gradient-to-r from-[#FF5A5F] to-[#FF385C] rounded-[15px] p-2.5 transform transition-all duration-300 group-hover:scale-110 shadow-md">
        <SiAirbnb className="h-9 w-9 text-white" />
      </div>
    ),
    color: 'bg-gradient-to-br from-rose-50 to-red-50 hover:from-rose-100 hover:to-red-100'
  },
  {
    id: 'slack',
    name: 'Slack',
    description: "Business communication platform for teams with channels and direct messaging",
    industry: 'Business Communication',
    topTechnologies: ['React', 'PHP', 'Java'],
    icon: (
      <div className="bg-gradient-to-r from-[#4A154B] to-[#7C2D7C] rounded-[15px] p-2.5 transform transition-all duration-300 group-hover:scale-110 shadow-md">
        <SiSlack className="h-9 w-9 text-white" />
      </div>
    ),
    color: 'bg-gradient-to-br from-purple-50 to-fuchsia-50 hover:from-purple-100 hover:to-fuchsia-100'
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Payment processing platform for online businesses and e-commerce',
    industry: 'Financial Technology',
    topTechnologies: ['React', 'Ruby', 'Go'],
    icon: (
      <div className="bg-gradient-to-r from-[#635BFF] to-[#8C84FF] rounded-[15px] p-2.5 transform transition-all duration-300 group-hover:scale-110 shadow-md">
        <SiStripe className="h-9 w-9 text-white" />
      </div>
    ),
    color: 'bg-gradient-to-br from-indigo-50 to-violet-50 hover:from-indigo-100 hover:to-violet-100'
  },
  {
    id: 'twitter',
    name: 'Twitter',
    description: "Real-time microblogging platform for sharing short messages and media",
    industry: 'Social Media',
    topTechnologies: ['React', 'Scala', 'Java'],
    icon: (
      <div className="bg-gradient-to-r from-[#1D9BF0] to-[#1A8CD8] rounded-[15px] p-2.5 transform transition-all duration-300 group-hover:scale-110 shadow-md">
        <FaXTwitter className="h-9 w-9 text-white" />
      </div>
    ),
    color: 'bg-gradient-to-br from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100'
  },
];

// Mapping of technologies to their categories in the Learning page
const techCategoryMapping = {
  'React': 'Frontend Development',
  'Vue.js': 'Frontend Development',
  'Angular': 'Frontend Development',
  'Redux': 'Frontend Development',
  'TypeScript': 'Frontend Development',
  'Next.js': 'Frontend Development',
  'Webpack': 'Frontend Development',
  
  'Python': 'Backend Development',
  'Java': 'Backend Development',
  'Node.js': 'Backend Development',
  'GraphQL': 'Backend Development',
  'Ruby on Rails': 'Backend Development',
  'Go': 'Backend Development',
  'Django': 'Backend Development',
  'Express.js': 'Backend Development',
  'PHP': 'Backend Development',
  'Spring Boot': 'Backend Development',
  'Fast API': 'Backend Development',
  
  'TensorFlow': 'Artificial Intelligence',
  'PyTorch': 'Artificial Intelligence',
  'Keras': 'Machine Learning',
  'scikit-learn': 'Machine Learning',
  'Apache Spark': 'Machine Learning',
  
  'Docker': 'DevOps & Cloud',
  'Kubernetes': 'DevOps & Cloud',
  'AWS': 'DevOps & Cloud',
  'Terraform': 'DevOps & Cloud',
  'Jenkins': 'DevOps & Cloud',
  'GCP': 'DevOps & Cloud',
  
  'PostgreSQL': 'Databases',
  'MongoDB': 'Databases',
  'Redis': 'Databases',
  'MySQL': 'Databases',
  'Cassandra': 'Databases',
  'Elasticsearch': 'Databases',
  'Kafka': 'Databases',
  
  'Ethereum': 'Blockchain',
  'Solidity': 'Blockchain',
  'Web3.js': 'Blockchain',
  
  'React Native': 'Mobile Development',
  'Swift': 'Mobile Development',
  'Kotlin': 'Mobile Development',
  'Flutter': 'Mobile Development',
  
  'Unity': 'Game Development',
  'Three.js': 'Game Development',
};

const Platforms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPlatforms, setFilteredPlatforms] = useState(platformsData);

  // Handle search functionality
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredPlatforms(platformsData);
    } else {
      const filtered = platformsData.filter(platform => 
        platform.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        platform.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        platform.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        platform.topTechnologies.some(tech => 
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredPlatforms(filtered);
    }
  }, [searchTerm]);

  // Popular tech tags from all platforms
  const allTechnologies = platformsData.flatMap(platform => platform.topTechnologies);
  const technologyCount = {};
  allTechnologies.forEach(tech => {
    technologyCount[tech] = (technologyCount[tech] || 0) + 1;
  });
  
  const popularTags = Object.entries(technologyCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(entry => entry[0]);

  // Handle tag click to filter platforms
  const handleTagClick = (tag) => {
    setSearchTerm(tag);
  };

  return (
    <Layout>
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-12 md:py-16"
      >
        {/* Hero Section with animated gradient */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:400%_400%] animate-gradient mb-16 py-16 rounded-2xl shadow-lg">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="container px-4 md:px-6 text-center text-white relative z-10"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4">
              Discover Tech Stacks
            </h1>
            <p className="mx-auto max-w-[700px] text-lg md:text-xl opacity-90 mb-8">
              Explore the technologies behind the world's most successful platforms
            </p>
            
            {/* Search Section */}
            <div className="w-full max-w-2xl mx-auto backdrop-blur-sm bg-white/20 p-2 rounded-xl shadow-md">
              <div className="relative flex items-center w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-100" />
                <input
                  type="search"
                  placeholder="Search for a platform or technology..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border-0 bg-white/10 py-2.5 pl-10 pr-4 text-white placeholder-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <Button 
                  onClick={() => searchTerm && setSearchTerm('')}
                  className="ml-2 bg-white/90 rounded-3xl text-blue-600 hover:bg-white"
                >
                  {searchTerm ? 'Clear' : 'Search'}
                </Button>
              </div>
            </div>
          </motion.div>
          
          {/* Abstract shapes */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-600/30 blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-purple-600/20 blur-3xl"></div>
        </div>
        
        <div className="container px-4 md:px-6">
          {/* Popular tags */}
          <div className="mb-10">
            <h2 className="text-xl font-medium mb-4 text-gray-700 text-center">Popular Technologies</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {popularTags.map((tag, index) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className={`rounded-full ${
                    searchTerm === tag ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200 text-gray-700'
                  } px-4 py-1.5 text-sm shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer`}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Platform cards */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredPlatforms.length > 0 ? (
              filteredPlatforms.map((platform, index) => (
                <motion.div
                  key={platform.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <Link to={`/techstack/${platform.id}`} className="block h-full">
                    <Card className="overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group h-full flex flex-col">
                      <CardHeader className="pb-2 pt-6 flex flex-col items-center">
                        <div className="flex justify-center mb-4">
                          {platform.icon}
                        </div>
                        <CardTitle className="text-xl font-semibold text-center text-gray-800">{platform.name}</CardTitle>
                        <CardDescription className="text-center text-sm font-medium text-gray-500">{platform.industry}</CardDescription>
                      </CardHeader>
                      <CardContent className="px-6 py-3 flex-grow">
                        <p className="text-center text-sm text-gray-600 mb-4">{platform.description}</p>
                        <div className="flex flex-wrap justify-center gap-2 mt-2">
                          {platform.topTechnologies.map((tech, i) => (
                            <Link 
                              key={i}
                              to={`/learning#${encodeURIComponent(techCategoryMapping[tech] || '')}`}
                              onClick={(e) => e.stopPropagation()}
                              className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                            >
                              {tech}
                            </Link>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-center py-5 px-6 border-t border-gray-100 mt-auto">
                        <Button variant="outline" className="w-full transition-all duration-300 border-gray-300 hover:bg-gray-50 hover:border-gray-400 rounded-3xl">
                          <span className="flex justify-center  items-center space-x-2">
                            <span>View Tech Stack</span>
                            <ArrowRight className="h-3.5 w-3.5 opacity-70" />
                          </span>
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-16"
              >
                <h3 className="text-xl font-medium text-gray-700 mb-2">No platforms found</h3>
                <p className="text-gray-500 rounded-3xl mb-6">Try a different search term</p>
                <Button onClick={() => setSearchTerm('')} variant="outline">Clear Search</Button>
              </motion.div>
            )}
          </motion.div>
          
          {/* Call to action */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-20 mb-6 text-center border-t border-gray-200 pt-16"
          >
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">Want to learn more?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Explore our learning resources to dive deeper into any technology used by these platforms.
            </p>
            <Button 
              asChild 
              className="bg-blue-600 hover:bg-blue-700 text-white   rounded-3xl px-8 py-2 h-11 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <Link to="/learning">Browse Learning Resources</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </Layout>
  );
};

// Add this to your global CSS
const globalCssAdditions = `
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  animation: gradient 15s ease infinite;
}
`;

export default Platforms;