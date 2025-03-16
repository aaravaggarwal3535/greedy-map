import React, { useState, useEffect, useRef } from 'react';
import { Layout } from '@/components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Globe,
  Code,
  Gamepad,
  Brain,
  Link as LinkIcon,
  Shield,
  Database,
  Smartphone,
  CloudCog,
  Search,
  X,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

const Roadmap = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategory, setExpandedCategory] = useState(null);
  const searchInputRef = useRef(null);
  const categoryRefs = useRef({});
  const location = useLocation();

  const roadmapCategories = [
    { 
      id: "webdev", 
      name: "Web Development", 
      icon: <Globe className="h-6 w-6" />,
      description: "Learn frontend, backend, and everything in between to build modern web applications.",
      color: "bg-gradient-to-br from-blue-500 to-purple-500" 
    },
    { 
      id: "gamedev", 
      name: "Game Development", 
      icon: <Gamepad className="h-6 w-6" />,
      description: "Develop games using popular engines and understand core game mechanics.",
      color: "bg-gradient-to-br from-red-500 to-orange-500" 
    },
    { 
      id: "aiml", 
      name: "AI & ML", 
      icon: <Brain className="h-6 w-6" />,
      description: "Build intelligent systems with machine learning and artificial intelligence.",
      color: "bg-gradient-to-br from-green-500 to-teal-500" 
    },
    { 
      id: "blockchain", 
      name: "Blockchain", 
      icon: <LinkIcon className="h-6 w-6" />,
      description: "Develop decentralized applications and understand blockchain technology.",
      color: "bg-gradient-to-br from-yellow-500 to-amber-500" 
    },
    { 
      id: "cybersecurity", 
      name: "Cybersecurity", 
      icon: <Shield className="h-6 w-6" />,
      description: "Learn to secure systems and protect against digital threats.",
      color: "bg-gradient-to-br from-purple-500 to-pink-500" 
    },
    { 
      id: "backend", 
      name: "Backend", 
      icon: <Database className="h-6 w-6" />,
      description: "Build robust server-side applications and APIs.",
      color: "bg-gradient-to-br from-cyan-500 to-blue-500" 
    },
    { 
      id: "mobile", 
      name: "Mobile Dev", 
      icon: <Smartphone className="h-6 w-6" />,
      description: "Create native and cross-platform mobile applications.",
      color: "bg-gradient-to-br from-indigo-500 to-violet-500" 
    },
    { 
      id: "devops", 
      name: "DevOps", 
      icon: <CloudCog className="h-6 w-6" />,
      description: "Streamline development operations and deployment processes.",
      color: "bg-gradient-to-br from-emerald-500 to-green-500" 
    },
  ];

  // Filter roadmaps based on search term
  const filteredRoadmaps = roadmapCategories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    // Handle hash for direct linking to a category
    const hash = location.hash.replace('#', '');
    if (hash) {
      const foundCategory = roadmapCategories.find(category => category.id === hash);
      if (foundCategory) {
        setExpandedCategory(foundCategory.id);
        // Scroll to category after a short delay to ensure render
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 200);
      }
    }
  }, [location]);

  // Function to clear search
  const clearSearch = () => {
    setSearchTerm("");
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Function to toggle category expansion
  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    
    // Smooth scroll to the expanded category
    if (expandedCategory !== categoryId) {
      setTimeout(() => {
        categoryRefs.current[categoryId]?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Developer Roadmaps
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Step-by-step guides and paths to learn different technologies. Find the roadmap that fits your career goals.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-12 relative">
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search roadmaps..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 px-4 pl-12 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg transition bg-white"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />

              {/* Clear button */}
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="text-xl" />
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {filteredRoadmaps.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
              <Search className="text-4xl text-gray-400" />
            </div>
            <p className="text-xl text-gray-600">
              No roadmaps found matching "{searchTerm}"
            </p>
            <button
              onClick={clearSearch}
              className="mt-4 text-blue-500 hover:text-blue-700 font-medium"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredRoadmaps.map((category, index) => (
              <motion.div
                id={category.id}
                key={category.id}
                ref={el => categoryRefs.current[category.id] = el}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 ${
                  expandedCategory === category.id ? "col-span-full" : ""
                }`}
              >
                <div
                  onClick={() => toggleCategory(category.id)}
                  className={`cursor-pointer ${
                    expandedCategory !== category.id 
                      ? category.color + " text-white" 
                      : "bg-white"
                  } transition-all duration-300`}
                >
                  <div className="flex items-center p-6">
                    <div className="flex-shrink-0 w-12 h-12 mr-4 bg-white/20 rounded-lg flex items-center justify-center">
                      {category.icon}
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-xl font-semibold">
                        {category.name}
                      </h2>
                      {expandedCategory !== category.id && (
                        <p className="text-white/80 text-sm line-clamp-1">
                          {category.description}
                        </p>
                      )}
                    </div>
                    <motion.div
                      animate={{
                        rotate: expandedCategory === category.id ? 180 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 ml-2"
                    >
                      <ChevronDown className="text-xl" />
                    </motion.div>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedCategory === category.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-200 bg-white px-6 pt-4 pb-6"
                    >
                      {category.id === "webdev" && <WebDevRoadmap />}
                      {category.id === "gamedev" && <GameDevRoadmap />}
                      {category.id === "aiml" && <AIMLRoadmap />}
                      {category.id === "blockchain" && <BlockchainRoadmap />}
                      {category.id === "cybersecurity" && <CybersecurityRoadmap />}
                      {category.id === "backend" && <BackendRoadmap />}
                      {category.id === "mobile" && <MobileDevRoadmap />}
                      {category.id === "devops" && <DevOpsRoadmap />}
                      
                      <div className="mt-8 flex justify-center">
                        <Button 
                          onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white rounded-3xl px-6"
                        >
                          Back to Top
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-20 mb-6 text-center border-t border-gray-200 pt-16"
        >
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">Ready to learn specific technologies?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Now that you have a roadmap, explore our library of learning resources for specific technologies and tools.
          </p>
          <Button
            asChild
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-3xl px-8 py-2 h-11 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <Link to="/learning">Explore Learning Resources</Link>
          </Button>
        </motion.div>
      </div>
    </Layout>
  );
};

// Component for roadmap sections
const RoadmapSection = ({ title, description, items, level = "beginner" }) => {
  const levelColors = {
    beginner: "border-green-500",
    intermediate: "border-yellow-500",
    advanced: "border-red-500",
    expert: "border-purple-500"
  };
  
  return (
    <div className={`border-l-4 ${levelColors[level]} pl-4 py-3 mb-6`}>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-gray-50 p-3 rounded border border-gray-200 hover:shadow-md transition-shadow"
          >
            <p className="font-medium">{item.name}</p>
            <p className="text-xs text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Individual roadmap components
const WebDevRoadmap = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Web Development Roadmap</h2>
      
      <RoadmapSection 
        title="Fundamentals" 
        description="The core building blocks for web development"
        level="beginner"
        items={[
          { name: "HTML", description: "Structure of web pages" },
          { name: "CSS", description: "Styling and layout" },
          { name: "JavaScript", description: "Client-side programming" },
          { name: "HTTP/HTTPS", description: "Web communication protocols" },
          { name: "Browser DevTools", description: "Tools for debugging web applications" },
          { name: "Git", description: "Version control for your code" }
        ]}
      />
      
      <RoadmapSection 
        title="Frontend Development" 
        description="Creating user interfaces and experiences"
        level="intermediate"
        items={[
          { name: "React", description: "Popular UI component library" },
          { name: "Angular", description: "Full-featured frontend framework" },
          { name: "Vue.js", description: "Progressive JavaScript framework" },
          { name: "TypeScript", description: "Typed superset of JavaScript" },
          { name: "CSS Frameworks", description: "Bootstrap, Tailwind CSS" },
          { name: "State Management", description: "Redux, Context API, Zustand" },
          { name: "Web Accessibility", description: "Making web apps usable by everyone" },
          { name: "Responsive Design", description: "Adapting to different screen sizes" }
        ]}
      />
      
      <RoadmapSection 
        title="Backend Development" 
        description="Server-side programming and data management"
        level="intermediate"
        items={[
          { name: "Node.js", description: "JavaScript runtime for server-side code" },
          { name: "Express.js", description: "Web framework for Node.js" },
          { name: "Databases", description: "SQL (MySQL, PostgreSQL) and NoSQL (MongoDB)" },
          { name: "REST APIs", description: "Standard for web API design" },
          { name: "Authentication", description: "User identification and security" },
          { name: "Server Hosting", description: "Deployment platforms like AWS, Heroku" }
        ]}
      />
      
      <RoadmapSection 
        title="Advanced Concepts" 
        description="Taking your web development skills to the next level"
        level="advanced"
        items={[
          { name: "GraphQL", description: "More flexible alternative to REST" },
          { name: "Web Security", description: "Protecting against common vulnerabilities" },
          { name: "Performance Optimization", description: "Making websites faster" },
          { name: "PWAs", description: "Progressive Web Applications" },
          { name: "Microservices", description: "Building scalable application architecture" },
          { name: "Serverless", description: "FaaS and cloud functions" }
        ]}
      />
      
      <RoadmapSection 
        title="Tooling & DevOps" 
        description="Tools to improve development workflow"
        level="advanced"
        items={[
          { name: "Webpack/Vite", description: "Module bundlers and build tools" },
          { name: "Docker", description: "Containerization for applications" },
          { name: "CI/CD", description: "Automated testing and deployment" },
          { name: "Monitoring", description: "Error tracking and performance monitoring" },
          { name: "Testing", description: "Unit, integration, and E2E testing" }
        ]}
      />
    </div>
  );
};

const GameDevRoadmap = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Game Development Roadmap</h2>
      
      <RoadmapSection 
        title="Foundations" 
        description="Essential knowledge for game development"
        level="beginner"
        items={[
          { name: "Programming Basics", description: "Variables, logic, functions, OOP" },
          { name: "Mathematics", description: "Linear algebra, geometry, physics" },
          { name: "Game Design", description: "Mechanics, dynamics, aesthetics" },
          { name: "Game Engines", description: "Understanding how engines work" },
          { name: "Version Control", description: "Git for game projects" },
          { name: "Art & Asset Creation", description: "Basic principles" }
        ]}
      />
      
      <RoadmapSection 
        title="Game Engines" 
        description="Tools for building games"
        level="intermediate"
        items={[
          { name: "Unity", description: "C#-based multiplatform engine" },
          { name: "Unreal Engine", description: "C++ and visual scripting" },
          { name: "Godot", description: "Open-source engine" },
          { name: "Game Maker", description: "Beginner-friendly 2D engine" },
          { name: "Custom Engine", description: "Building from scratch" }
        ]}
      />
      
      <RoadmapSection 
        title="Programming Languages" 
        description="Languages commonly used in game development"
        level="intermediate"
        items={[
          { name: "C#", description: "Used with Unity" },
          { name: "C++", description: "Used with Unreal and custom engines" },
          { name: "Python", description: "Useful for tools and prototyping" },
          { name: "JavaScript", description: "Web and mobile games" },
          { name: "GDScript", description: "Godot's scripting language" }
        ]}
      />
      
      <RoadmapSection 
        title="Game Systems" 
        description="Core systems that make up a game"
        level="advanced"
        items={[
          { name: "Physics", description: "Collision detection, rigidbodies" },
          { name: "Graphics", description: "Shaders, rendering, lighting" },
          { name: "AI", description: "Pathfinding, behavior trees, state machines" },
          { name: "Audio", description: "Sound effects, music, mixing" },
          { name: "Networking", description: "Multiplayer, client-server architecture" },
          { name: "UI Systems", description: "Menus, HUD, feedback" }
        ]}
      />
      
      <RoadmapSection 
        title="Specializations" 
        description="Areas to focus on once you have the basics"
        level="expert"
        items={[
          { name: "3D Modeling", description: "Creating game assets" },
          { name: "Animation", description: "Character and environment animation" },
          { name: "VFX", description: "Visual effects for games" },
          { name: "Level Design", description: "Creating engaging game spaces" },
          { name: "Game Economy", description: "Balancing, progression systems" },
          { name: "Tool Development", description: "Creating custom tools for teams" }
        ]}
      />
    </div>
  );
};

const AIMLRoadmap = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">AI & Machine Learning Roadmap</h2>
      
      <RoadmapSection 
        title="Prerequisites" 
        description="Fundamental knowledge required"
        level="beginner"
        items={[
          { name: "Mathematics", description: "Linear algebra, calculus, statistics, probability" },
          { name: "Programming", description: "Python is the standard for AI/ML" },
          { name: "Data Structures", description: "Arrays, lists, dictionaries, trees, graphs" },
          { name: "Algorithms", description: "Sorting, searching, complexity analysis" },
          { name: "Development Environment", description: "Jupyter, Git, VS Code" }
        ]}
      />
      
      <RoadmapSection 
        title="Data Science Fundamentals" 
        description="Working with and understanding data"
        level="intermediate"
        items={[
          { name: "NumPy", description: "Numerical computing with arrays" },
          { name: "Pandas", description: "Data manipulation and analysis" },
          { name: "Data Visualization", description: "Matplotlib, Seaborn, Plotly" },
          { name: "Data Cleaning", description: "Handling missing values and outliers" },
          { name: "Exploratory Data Analysis", description: "Understanding data patterns" },
          { name: "Feature Engineering", description: "Creating meaningful features" }
        ]}
      />
      
      <RoadmapSection 
        title="Machine Learning" 
        description="Core ML concepts and algorithms"
        level="intermediate"
        items={[
          { name: "Supervised Learning", description: "Regression, classification" },
          { name: "Unsupervised Learning", description: "Clustering, dimensionality reduction" },
          { name: "Model Evaluation", description: "Metrics, validation techniques" },
          { name: "Ensemble Methods", description: "Random forests, boosting" },
          { name: "ML Libraries", description: "Scikit-learn, XGBoost" },
          { name: "ML Workflow", description: "Pipeline creation and management" }
        ]}
      />
      
      <RoadmapSection 
        title="Deep Learning" 
        description="Neural networks and advanced techniques"
        level="advanced"
        items={[
          { name: "Neural Networks", description: "Architecture and backpropagation" },
          { name: "Deep Learning Frameworks", description: "TensorFlow, PyTorch" },
          { name: "CNNs", description: "Convolutional Neural Networks for images" },
          { name: "RNNs", description: "Recurrent Neural Networks for sequences" },
          { name: "Transformers", description: "Attention-based models" },
          { name: "Transfer Learning", description: "Using pre-trained models" }
        ]}
      />
      
      <RoadmapSection 
        title="Specialized Areas" 
        description="Advanced AI domains"
        level="expert"
        items={[
          { name: "NLP", description: "Natural Language Processing" },
          { name: "Computer Vision", description: "Image and video analysis" },
          { name: "Reinforcement Learning", description: "Training agents through rewards" },
          { name: "Generative AI", description: "Creating new content (GANs, diffusion)" },
          { name: "MLOps", description: "Deploying and managing ML systems" },
          { name: "Ethics in AI", description: "Bias, fairness, and responsible AI" }
        ]}
      />
    </div>
  );
};

const BlockchainRoadmap = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Blockchain Development Roadmap</h2>
      
      <RoadmapSection 
        title="Fundamentals" 
        description="Core blockchain concepts"
        level="beginner"
        items={[
          { name: "Blockchain Basics", description: "Distributed ledgers, consensus" },
          { name: "Cryptography", description: "Hash functions, public/private keys" },
          { name: "Bitcoin", description: "First blockchain implementation" },
          { name: "Ethereum", description: "Smart contract platform" },
          { name: "Web3", description: "Decentralized web applications" },
          { name: "Wallets", description: "Key management and transactions" }
        ]}
      />
      
      <RoadmapSection 
        title="Smart Contract Development" 
        description="Building on-chain programs"
        level="intermediate"
        items={[
          { name: "Solidity", description: "Primary Ethereum smart contract language" },
          { name: "Hardhat/Truffle", description: "Development frameworks" },
          { name: "ERC Standards", description: "Token standards (ERC20, ERC721)" },
          { name: "Web3.js/ethers.js", description: "JavaScript libraries for interaction" },
          { name: "Testing", description: "Unit tests and simulation" },
          { name: "Gas Optimization", description: "Efficient contract design" }
        ]}
      />
      
      <RoadmapSection 
        title="dApp Development" 
        description="Building decentralized applications"
        level="intermediate"
        items={[
          { name: "Frontend Integration", description: "Connecting UI to blockchain" },
          { name: "Backend for dApps", description: "Managing off-chain components" },
          { name: "IPFS", description: "Decentralized storage" },
          { name: "The Graph", description: "Indexing blockchain data" },
          { name: "Authentication", description: "Web3 login and signatures" },
          { name: "Oracles", description: "Connecting to off-chain data" }
        ]}
      />
      
      <RoadmapSection 
        title="Advanced Concepts" 
        description="Specialized blockchain knowledge"
        level="advanced"
        items={[
          { name: "Layer 2 Solutions", description: "Scaling blockchain applications" },
          { name: "DeFi Protocols", description: "Decentralized finance" },
          { name: "DAO Development", description: "Decentralized autonomous organizations" },
          { name: "NFT Systems", description: "Non-fungible token applications" },
          { name: "Cross-chain", description: "Interoperability between blockchains" },
          { name: "Security", description: "Audit techniques and best practices" }
        ]}
      />
      
      <RoadmapSection 
        title="Alternative Blockchains" 
        description="Beyond Ethereum"
        level="advanced"
        items={[
          { name: "Solana", description: "High-performance blockchain" },
          { name: "Polkadot", description: "Multi-chain framework" },
          { name: "Near Protocol", description: "Developer-friendly platform" },
          { name: "Cosmos", description: "Interoperable blockchain ecosystem" },
          { name: "Avalanche", description: "High-throughput smart contracts" }
        ]}
      />
    </div>
  );
};

const CybersecurityRoadmap = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Cybersecurity Roadmap</h2>
      
      <RoadmapSection 
        title="Fundamentals" 
        description="Core security concepts and knowledge"
        level="beginner"
        items={[
          { name: "Networking", description: "TCP/IP, DNS, routing, firewalls" },
          { name: "Operating Systems", description: "Linux, Windows administration" },
          { name: "Programming Basics", description: "Python, Bash scripting" },
          { name: "Security Fundamentals", description: "CIA triad, security models" },
          { name: "Cryptography", description: "Encryption, hashing, PKI" },
          { name: "Web Security", description: "HTTP, cookies, same-origin policy" }
        ]}
      />
      
      <RoadmapSection 
        title="Security Assessment" 
        description="Identifying and analyzing vulnerabilities"
        level="intermediate"
        items={[
          { name: "Vulnerability Scanning", description: "Nessus, OpenVAS" },
          { name: "Web App Security", description: "OWASP Top 10, XSS, CSRF, SQLi" },
          { name: "Network Security", description: "Wireshark, packet analysis" },
          { name: "Penetration Testing", description: "Methodology and tools" },
          { name: "Social Engineering", description: "Human exploitation techniques" },
          { name: "Security Tools", description: "Metasploit, Burp Suite, Kali Linux" }
        ]}
      />
      
      <RoadmapSection 
        title="Defense Techniques" 
        description="Protecting systems and data"
        level="intermediate"
        items={[
          { name: "Access Controls", description: "Authentication, authorization" },
          { name: "Security Monitoring", description: "SIEM, logging, threat hunting" },
          { name: "Incident Response", description: "Handling security breaches" },
          { name: "Hardening", description: "Securing systems and applications" },
          { name: "Security Architecture", description: "Designing secure systems" },
          { name: "Malware Analysis", description: "Identifying malicious software" }
        ]}
      />
      
      <RoadmapSection 
        title="Cloud Security" 
        description="Securing cloud environments"
        level="advanced"
        items={[
          { name: "AWS Security", description: "IAM, Security Groups, GuardDuty" },
          { name: "Azure Security", description: "Azure AD, Security Center" },
          { name: "Container Security", description: "Docker, Kubernetes security" },
          { name: "DevSecOps", description: "Security in CI/CD pipelines" },
          { name: "Infrastructure as Code Security", description: "Secure Terraform, CloudFormation" },
          { name: "Serverless Security", description: "Securing Lambda, Functions" }
        ]}
      />
      
      <RoadmapSection 
        title="Specialized Areas" 
        description="Advanced security domains"
        level="expert"
        items={[
          { name: "Threat Intelligence", description: "Analyzing and using threat data" },
          { name: "Digital Forensics", description: "Evidence collection and analysis" },
          { name: "Reverse Engineering", description: "Analyzing software behavior" },
          { name: "Security Compliance", description: "GDPR, HIPAA, PCI DSS, ISO 27001" },
          { name: "Offensive Security", description: "Advanced penetration testing" },
          { name: "Zero Trust", description: "Modern security architecture" }
        ]}
      />
    </div>
  );
};

const BackendRoadmap = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Backend Development Roadmap</h2>
      
      <RoadmapSection 
        title="Programming Fundamentals" 
        description="Core programming skills for backend"
        level="beginner"
        items={[
          { name: "Languages", description: "JavaScript/Node.js, Python, Java, C#, Go" },
          { name: "Version Control", description: "Git, GitHub, GitLab" },
          { name: "Data Structures", description: "Arrays, linked lists, stacks, queues" },
          { name: "Algorithms", description: "Sorting, searching, time/space complexity" },
          { name: "OOP", description: "Classes, inheritance, polymorphism" },
          { name: "Terminal/CLI", description: "Bash basics, navigation, commands" }
        ]}
      />
      
      <RoadmapSection 
        title="Web Servers & APIs" 
        description="Creating backend services"
        level="intermediate"
        items={[
          { name: "RESTful APIs", description: "Design principles and best practices" },
          { name: "Web Frameworks", description: "Express, Django, Spring, ASP.NET" },
          { name: "API Documentation", description: "Swagger/OpenAPI, API Blueprint" },
          { name: "GraphQL", description: "Schema definition, resolvers, queries" },
          { name: "Authentication", description: "JWT, OAuth, sessions, cookies" },
          { name: "Middleware", description: "Request processing, validation, logging" }
        ]}
      />
      
      <RoadmapSection 
        title="Databases" 
        description="Data storage and management"
        level="intermediate"
        items={[
          { name: "SQL", description: "Queries, joins, indexes" },
          { name: "Relational DBs", description: "PostgreSQL, MySQL, SQLite" },
          { name: "NoSQL DBs", description: "MongoDB, Cassandra, Redis" },
          { name: "ORM/ODM", description: "Sequelize, Mongoose, Hibernate" },
          { name: "Schema Design", description: "Normalization, relationships" },
          { name: "Data Migration", description: "Versioning database changes" }
        ]}
      />
      
      <RoadmapSection 
        title="DevOps & Deployment" 
        description="Deploying and managing backends"
        level="advanced"
        items={[
          { name: "CI/CD", description: "Automated testing and deployment" },
          { name: "Containers", description: "Docker, container orchestration" },
          { name: "Cloud Services", description: "AWS, Azure, Google Cloud" },
          { name: "Serverless", description: "Lambda, Cloud Functions" },
          { name: "Monitoring", description: "Logging, metrics, alerting" },
          { name: "Security", description: "OWASP, vulnerability scanning" }
        ]}
      />
      
      <RoadmapSection 
        title="Advanced Concepts" 
        description="Scaling and improving backend systems"
        level="expert"
        items={[
          { name: "Microservices", description: "Service design and communication" },
          { name: "Message Queues", description: "RabbitMQ, Kafka, SQS" },
          { name: "Caching", description: "Redis, CDN, in-memory caching" },
          { name: "Performance", description: "Profiling, optimization" },
          { name: "Horizontal Scaling", description: "Load balancing, sharding" },
          { name: "Data Engineering", description: "ETL, data pipelines" }
        ]}
      />
    </div>
  );
};

const MobileDevRoadmap = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Mobile Development Roadmap</h2>
      
      <RoadmapSection 
        title="Fundamentals" 
        description="Core skills for mobile development"
        level="beginner"
        items={[
          { name: "Programming Basics", description: "OOP, data structures, algorithms" },
          { name: "UI/UX Fundamentals", description: "Mobile design principles" },
          { name: "Version Control", description: "Git, GitHub/GitLab" },
          { name: "Mobile App Architecture", description: "MVC, MVVM patterns" },
          { name: "API Integration", description: "RESTful APIs, GraphQL" },
          { name: "Responsive Design", description: "Adapting to different screen sizes" }
        ]}
      />
      
      <RoadmapSection 
        title="Native Android" 
        description="Building Android apps"
        level="intermediate"
        items={[
          { name: "Kotlin/Java", description: "Primary Android languages" },
          { name: "Android Studio", description: "Official Android IDE" },
          { name: "Android SDK", description: "Core Android components" },
          { name: "Jetpack", description: "Libraries, tools for Android apps" },
          { name: "Jetpack Compose", description: "Modern UI toolkit for Android" },
          { name: "Material Design", description: "Google's design system" }
        ]}
      />
      
      <RoadmapSection 
        title="Native iOS" 
        description="Building iOS apps"
        level="intermediate"
        items={[
          { name: "Swift/Objective-C", description: "Primary iOS languages" },
          { name: "Xcode", description: "Official Apple IDE" },
          { name: "UIKit", description: "Traditional UI framework" },
          { name: "SwiftUI", description: "Modern declarative UI framework" },
          { name: "Core Data", description: "Data persistence framework" },
          { name: "App Store Guidelines", description: "Apple's requirements" }
        ]}
      />
      
      <RoadmapSection 
        title="Cross-Platform" 
        description="Building for multiple platforms"
        level="intermediate"
        items={[
          { name: "React Native", description: "JavaScript-based framework" },
          { name: "Flutter", description: "Dart-based UI toolkit" },
          { name: "Xamarin", description: "C#-based platform" },
          { name: "Ionic", description: "Web technologies for mobile" },
          { name: "State Management", description: "Redux, MobX, Provider" },
          { name: "Native Modules", description: "Bridging to native code" }
        ]}
      />
      
      <RoadmapSection 
        title="Advanced Concepts" 
        description="Taking mobile apps to the next level"
        level="advanced"
        items={[
          { name: "Offline First", description: "Local storage, sync strategies" },
          { name: "Testing", description: "Unit, integration, E2E testing" },
          { name: "CI/CD", description: "Automated build and distribution" },
          { name: "Analytics", description: "User behavior tracking" },
          { name: "Push Notifications", description: "Engaging users" },
          { name: "App Performance", description: "Optimization techniques" }
        ]}
      />
      
      <RoadmapSection 
        title="Emerging Technologies" 
        description="Cutting-edge mobile development"
        level="expert"
        items={[
          { name: "AR/VR", description: "ARKit, ARCore, Unity AR" },
          { name: "ML on Mobile", description: "CoreML, TensorFlow Lite" },
          { name: "IoT Integration", description: "Connecting to smart devices" },
          { name: "Wearables", description: "watchOS, Wear OS" },
          { name: "Super Apps", description: "Mini programs and ecosystems" }
        ]}
      />
    </div>
  );
};

const DevOpsRoadmap = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">DevOps Roadmap</h2>
      
      <RoadmapSection 
        title="Fundamentals" 
        description="Foundation skills for DevOps"
        level="beginner"
        items={[
          { name: "Operating Systems", description: "Linux administration, shell scripting" },
          { name: "Networking", description: "DNS, TCP/IP, HTTP, proxies" },
          { name: "Programming", description: "Python, Go, Shell scripting" },
          { name: "Version Control", description: "Git, GitHub, GitLab" },
          { name: "Cloud Concepts", description: "IaaS, PaaS, SaaS" },
          { name: "Security Basics", description: "Authentication, authorization, encryption" }
        ]}
      />
      
      <RoadmapSection 
        title="CI/CD" 
        description="Continuous Integration and Deployment"
        level="intermediate"
        items={[
          { name: "CI/CD Pipelines", description: "Building automated workflows" },
          { name: "Jenkins", description: "Popular automation server" },
          { name: "GitHub Actions", description: "Workflow automation in GitHub" },
          { name: "GitLab CI", description: "Built-in CI/CD for GitLab" },
          { name: "CircleCI/Travis CI", description: "Cloud-based CI services" },
          { name: "Artifact Management", description: "JFrog, Nexus, Docker Registry" }
        ]}
      />
      
      <RoadmapSection 
        title="Containers & Orchestration" 
        description="Managing containerized applications"
        level="intermediate"
        items={[
          { name: "Docker", description: "Container platform" },
          { name: "Kubernetes", description: "Container orchestration" },
          { name: "Helm", description: "Package manager for Kubernetes" },
          { name: "Service Mesh", description: "Istio, Linkerd" },
          { name: "Container Security", description: "Scanning, hardening" },
          { name: "Container Networking", description: "Overlay networks, CNI" }
        ]}
      />
      
      <RoadmapSection 
        title="Infrastructure as Code" 
        description="Managing infrastructure programmatically"
        level="advanced"
        items={[
          { name: "Terraform", description: "Infrastructure provisioning" },
          { name: "Ansible", description: "Configuration management" },
          { name: "CloudFormation", description: "AWS infrastructure as code" },
          { name: "Pulumi", description: "Programming languages for IaC" },
          { name: "ARM Templates", description: "Azure infrastructure as code" },
          { name: "GitOps", description: "Git-based infrastructure management" }
        ]}
      />
      
      <RoadmapSection 
        title="Monitoring & Observability" 
        description="Gaining insights into systems"
        level="advanced"
        items={[
          { name: "Prometheus", description: "Metrics collection and alerting" },
          { name: "Grafana", description: "Metrics visualization" },
          { name: "ELK Stack", description: "Logging and analysis" },
          { name: "Jaeger/Zipkin", description: "Distributed tracing" },
          { name: "Alerting", description: "PagerDuty, OpsGenie" },
          { name: "SLIs, SLOs, SLAs", description: "Service level measurements" }
        ]}
      />
      
      <RoadmapSection 
        title="Cloud Platforms & Services" 
        description="Working with major cloud providers"
        level="expert"
        items={[
          { name: "AWS", description: "EC2, S3, RDS, Lambda, etc." },
          { name: "Azure", description: "VMs, Storage, Databases, Functions" },
          { name: "Google Cloud", description: "Compute Engine, GKE, BigQuery" },
          { name: "Cloud Security", description: "IAM, security groups, VPCs" },
          { name: "Cost Optimization", description: "Budgeting, right-sizing" },
          { name: "Multi-Cloud", description: "Strategies and management" }
        ]}
      />
    </div>
  );
};

export default Roadmap;
