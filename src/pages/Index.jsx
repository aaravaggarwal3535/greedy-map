import React, { useState, useEffect, useRef } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Code, 
  Globe, 
  Sparkles, 
  Users, 
  Zap, 
  ExternalLink, 
  Star,
  Check,
  BadgeCheck,
  LucideGithub,
  Rocket
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import InfiniteMenu from '@/components/InfiniteMenu';
import MasonryGallery from '@/components/MasonryGallery';
import '@/styles/hexagon-background.css';
// import '@/styles/masonry.css';

const Index = () => {
  const [mousePosition, setMousePosition] = useState({ x: -400, y: -400 });
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [scrollY, setScrollY] = useState(0);
  const [mouseOrigin, setMouseOrigin] = useState({ x: 0, y: 0 });
  
  const hexagonContainerRef = useRef(null);
  const contentRef = useRef(null);
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll();
  const smoothScrollYProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Create rotate values based on mouse position 
  const rotateX = useTransform(mouseY, [-100, 100], [2, -2]);
  const rotateY = useTransform(mouseX, [-100, 100], [-2, 2]);

  // Hero section spotlight effect
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);
  const spotlightBackground = useMotionTemplate`
    radial-gradient(
      circle at ${spotlightX}px ${spotlightY}px,
      rgba(59, 130, 246, 0.15) 0%,
      transparent 50%
    )
  `;

  // Handle window resize for responsive hexagon grid
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle scroll for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle mouse movement for cursor and hero effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Hexagon cursor effect
      if (hexagonContainerRef.current) {
        const { left, top } = hexagonContainerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - left,
          y: e.clientY - top
        });
      }
      
      // Hero section 3D effect
      if (heroRef.current) {
        const { left, top, width, height } = heroRef.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        
        setMouseOrigin({
          x: ((e.clientX - centerX) / (width / 2)) * 10,
          y: ((e.clientY - centerY) / (height / 2)) * 10
        });
        
        mouseX.set((e.clientX - centerX) / 5);
        mouseY.set((e.clientY - centerY) / 5);
        
        // Spotlight effect
        spotlightX.set(e.clientX - left);
        spotlightY.set(e.clientY - top);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY, spotlightX, spotlightY]);

  // Generate hexagon grid
  const generateHexagonGrid = () => {
    const rows = [];
    // Calculate rows based on content height, not document height
    const contentHeight = contentRef.current ? contentRef.current.scrollHeight : window.innerHeight;
    const rowsCount = Math.ceil(contentHeight / 80) + 5;
    const hexagonsPerRow = Math.ceil(dimensions.width / 90) + 2;

    for (let i = 0; i < rowsCount; i++) {
      const hexagons = [];
      for (let j = 0; j < hexagonsPerRow; j++) {
        hexagons.push(<div key={`hex-${i}-${j}`} className="hexagon"></div>);
      }
      rows.push(<div key={`row-${i}`} className="hexagon-row">{hexagons}</div>);
    }
    return rows;
  };

  // Tech cards animation variants
  const techCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  // Technologies data
  const technologies = [
    { name: "React", stars: "215K", contributors: "1.8K", percentage: 83 },
    { name: "Vue", stars: "202K", contributors: "427", percentage: 76 },
    { name: "Angular", stars: "89K", contributors: "1.5K", percentage: 68 },
    { name: "Svelte", stars: "71K", contributors: "591", percentage: 64 },
  ];

  // Enhanced platform items data with modern platform logos
  const platformItems = [
    {
      image: 'https://cdn.worldvectorlogo.com/logos/react-2.svg',
      link: 'https://reactjs.org/',
      title: 'React',
      description: 'A JavaScript library for building user interfaces with a component-based architecture and virtual DOM for efficient rendering.'
    },
    {
      image: 'https://cdn.worldvectorlogo.com/logos/vue-9.svg',
      link: 'https://vuejs.org/',
      title: 'Vue.js',
      description: 'An approachable, performant and versatile framework for building web user interfaces with a progressive adoption model.'
    },
    {
      image: 'https://cdn.worldvectorlogo.com/logos/angular-icon-1.svg',
      link: 'https://angular.io/',
      title: 'Angular',
      description: 'A platform and framework for building single-page client applications using HTML and TypeScript with powerful dependency injection.'
    },
    {
      image: 'https://cdn.worldvectorlogo.com/logos/nextjs-2.svg',
      link: 'https://nextjs.org/',
      title: 'Next.js',
      description: 'The React framework for production - hybrid static & server rendering, TypeScript support, smart bundling, and route pre-fetching.'
    },
    {
      image: 'https://cdn.worldvectorlogo.com/logos/tailwind-css-2.svg',
      link: 'https://tailwindcss.com/',
      title: 'Tailwind CSS',
      description: 'A utility-first CSS framework for rapidly building custom user interfaces with a focus on flexibility and performance.'
    },
    {
      image: 'https://cdn.worldvectorlogo.com/logos/typescript.svg',
      link: 'https://www.typescriptlang.org/',
      title: 'TypeScript',
      description: 'A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.'
    }
  ];

  // Generate masonry grid items with videos
  const generateMasonryItems = () => {
    return [
      { 
        title: "React", 
        description: "Build user interfaces with components",
        height: "h-80", 
        width: "md:col-span-2", 
        color: "from-blue-600 to-cyan-400",
        video: "/videos/react-demo.mp4" // Replace with actual video path
      },
      { 
        title: "Vue.js", 
        description: "Progressive JavaScript framework",
        height: "h-80", 
        width: "md:col-span-2", 
        color: "from-green-500 to-emerald-400",
        video: "/videos/vue-demo.mp4" // Replace with actual video path
      },
      { 
        title: "Next.js", 
        description: "The React framework for production",
        height: "h-80", 
        width: "md:col-span-2", 
        color: "from-slate-800 to-gray-700",
        video: "/videos/nextjs-demo.mp4" // Replace with actual video path
      },
      { 
        title: "Node.js", 
        description: "JavaScript runtime for server-side applications",
        height: "h-80", 
        width: "md:col-span-2", 
        color: "from-green-600 to-lime-500",
        video: "/videos/nodejs-demo.mp4" // Replace with actual video path
      }
    ];
  };

  const [videoItems] = useState(() => {
    const sources = [
      "/videos/demo1.mp4", 
      "/videos/demo2.mp4", 
      "/videos/demo3.mp4",
      "/videos/demo4.mp4"
    ];
    const sizes = [
      { cols: "col-span-1", rows: "row-span-1" },
      { cols: "col-span-2", rows: "row-span-1" },
      { cols: "col-span-1", rows: "row-span-2" },
      { cols: "col-span-2", rows: "row-span-2" }
    ];
    return sources.map(src => {
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      return { src, ...size };
    });
  });

  // Update the Technology Ecosystem section with blue-themed GIFs
  const [videoGrid] = useState(() => {
    // Blue-themed tech GIFs from open source sites
    const videos = [
      {
        id: 1,
        src: "https://cdn.dribbble.com/users/1162077/screenshots/5427805/media/e87a74c9f13581d112d61a0e762aaef2.gif",
        title: "AI & Machine Learning",
        category: "Future Tech"
      },
      {
        id: 2,
        src: "https://cdn.dribbble.com/users/2574702/screenshots/6702374/digital_twin.gif",
        title: "Digital Twins",
        category: "Smart Cities"
      },
      {
        id: 3,
        src: "https://cdn.dribbble.com/users/238042/screenshots/1427475/media/f17032caf022af12b8117bb8f2c9e7c0.gif",
        title: "AR Interfaces",
        category: "Mixed Reality"
      },
      {
        id: 4,
        src: "https://cdn.dribbble.com/users/1450874/screenshots/4047196/media/e663225d917ddcc591b75aa9e759bfc7.gif",
        title: "Wearable Tech",
        category: "IoT Devices"
      },
      {
        id: 5,
        src: "https://cdn.dribbble.com/users/110792/screenshots/3898390/media/c6e170022c54e632ce9e25c7beea4cc8.gif",
        title: "Circuit Design",
        category: "Hardware"
      },
      {
        id: 6,
        src: "https://cdn.dribbble.com/users/2008861/screenshots/15320458/media/31a26274f79ce4bcd1340026c074bc70.gif",
        title: "Data Processing",
        category: "Cloud Computing"
      },
      {
        id: 7,
        src: "https://cdn.dribbble.com/users/108690/screenshots/2832948/media/55c4fff0932d0be2d2a8cd0d89cd3026.gif",
        title: "Smart Watch",
        category: "Wearable Tech"
      }
    ];

    // Assign balanced sizes to each video to avoid layout issues
    // Last item (Smart Watch) will be small and positioned next to Data Processing
    const sizes = [
      { cols: "col-span-1", rows: "row-span-1", height: "h-48" },
      { cols: "col-span-2", rows: "row-span-1", height: "h-48" },
      { cols: "col-span-1", rows: "row-span-2", height: "h-96" },
      { cols: "col-span-2", rows: "row-span-2", height: "h-96" }
    ];

    // Custom size for specific items
    return videos.map((video, index) => {
      // Smart Watch (7th item) should be small and positioned after Data Processing
      if (index === 6) {
        return {
          ...video,
          cols: "col-span-1", // Small width
          rows: "row-span-1",  // Small height
          height: "h-48"
        };
      }
      
      // Otherwise, assign random sizes
      return {
        ...video,
        ...sizes[Math.floor(Math.random() * sizes.length)]
      };
    });
  });

  return (
    <Layout>
      <div className="relative bg-[#050816] text-white overflow-hidden">
        {/* Enhanced Gradient Background with Noise Texture */}
        <div className="fixed inset-0 w-full h-full z-0">
          <div className="absolute inset-0 bg-[#0a0a18] opacity-90 z-0"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-[#081130] via-[#050816] to-[#0e0b31] opacity-90 mix-blend-multiply"></div>
          
          {/* Replacing video with modern animated background */}
          <div className="absolute inset-0 bg-noise-texture opacity-5 mix-blend-overlay"></div>
          
          {/* Animated gradient orbs - more performant than video */}
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-700/20 to-indigo-700/20 blur-[100px] animate-pulse-slow opacity-50 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-700/20 to-pink-700/20 blur-[100px] animate-pulse-slow opacity-30 animate-delay-1000"></div>
          <div className="absolute top-2/3 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-cyan-700/20 to-teal-700/20 blur-[100px] animate-pulse-slow opacity-30 animate-delay-2000"></div>
          
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(25,33,52,0)_0,#050816_100%)]"></div>
          
          {/* Animated grid pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.15]"></div>
        </div>
        
        {/* Animated stars/particles effect - optimized */}
        <div className="fixed inset-0 w-full h-full z-1 pointer-events-none">
          <div className="stars-container">
            {Array(100).fill().map((_, i) => (
              <div 
                key={i} 
                className="star"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 2 + 1}px`,
                  height: `${Math.random() * 2 + 1}px`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${Math.random() * 3 + 2}s`,
                  opacity: Math.random() * 0.7 + 0.3
                }}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Content wrapper */}
        <div ref={contentRef} className="relative main-content">
          <div className="hexagon-background-wrapper">
            <div className="hexagon-container" ref={hexagonContainerRef}>
              {generateHexagonGrid()}
              <div 
                className="cursor-effect"
                style={{ 
                  left: `${mousePosition.x}px`, 
                  top: `${mousePosition.y}px` 
                }}
              />
            </div>
          </div>
          
          {/* Hero Section */}
          <section ref={heroRef} className="min-h-screen flex items-center justify-center relative pt-10 overflow-hidden">
            <motion.div 
              className="absolute inset-0 z-0" 
              style={{ background: spotlightBackground }}
            />
            
            {/* Enhanced floating elements with better performance */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div 
                className="absolute top-[20%] right-[10%] w-24 h-24 rounded-full bg-gradient-to-r from-blue-600/20 to-indigo-600/20 blur-xl"
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.5, 0.8, 0.5],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              />
              <motion.div 
                className="absolute bottom-[25%] left-[15%] w-32 h-32 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-xl"
                animate={{
                  y: [0, 20, 0],
                  opacity: [0.5, 0.9, 0.5],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 10, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </div>
            
            {/* Code icon with parallax */}
            <div 
              className="absolute top-[10%] md:top-[20%] left-[5%] md:left-[10%] pointer-events-none"
              style={{ 
                transform: `translate3d(${-mouseOrigin.x * 0.5}px, ${-mouseOrigin.y * 0.5}px, 0px)`,
                transition: "transform 0.1s ease-out"
              }}
            >
              <div className="text-blue-400/30 text-5xl font-black italic">&lt;/&gt;</div>
            </div>
            
            {/* Hero content */}
            <div className="container px-4 md:px-6 relative z-20">
              <div className="flex flex-col items-center text-center space-y-8 md:space-y-10">
                <motion.div 
                  className="inline-flex items-center px-3 py-1 rounded-full bg-blue-950/50 border border-blue-800/50 text-blue-400 text-sm backdrop-blur-sm"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Sparkles className="h-3.5 w-3.5 mr-2" />
                  <span>Experience the future of tech exploration</span>
                </motion.div>
                
                <motion.div
                  style={{ 
                    rotateX,
                    rotateY,
                    transformPerspective: 1000,
                    transformStyle: "preserve-3d"
                  }}
                  className="perspective-container"
                >
                  <motion.h1 
                    className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tighter max-w-5xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <span className="relative z-10 block mb-2 md:mb-4">
                      <span className="opacity-0 absolute -z-10 blur-2xl text-blue-500/30 select-none" aria-hidden="true" style={{ transform: 'translateY(0.1em)' }}>NextGen Tech</span>
                      <span className="enhanced-gradient-heading">NextGen Tech</span>
                    </span>
                    <span className="relative block">
                      <span className="opacity-0 absolute -z-10 blur-2xl text-blue-500/30 select-none" aria-hidden="true" style={{ transform: 'translateY(0.1em)' }}>Stack Explorer</span>
                      <span className="enhanced-gradient-heading">Stack Explorer</span>
                    </span>
                  </motion.h1>
                </motion.div>
                
                <motion.p 
                  className="text-xl md:text-2xl text-blue-100/80 max-w-[700px] leading-relaxed glow-text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Discover, compare, and master the modern tech stack ecosystem.
                  <span className="block mt-2 text-blue-300/90">Built by developers, for developers.</span>
                </motion.p>
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 mt-6 w-full max-w-md mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Link to="/platforms" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto relative overflow-hidden px-8 py-7 text-lg rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800 border-0 transition-all duration-500 shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_30px_rgba(37,99,235,0.7)] group">
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500/0 via-blue-100/10 to-blue-500/0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700"></div>
                      <span className="mr-2 relative z-10">Explore Tech Stacks</span>
                      <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                  <Link to="/community" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 py-7 text-lg rounded-full border-2 border-blue-500/50 text-blue-300 hover:bg-blue-800/20 hover:border-blue-400 transition-all duration-300 group">
                      <span className="mr-2">Join Community</span>
                      <Users className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
              
              <motion.div 
                className="mt-16 lg:mt-24 relative"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <motion.div 
                  className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur-md opacity-50"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                ></motion.div>
                <div className="relative bg-[#0c0c22]/90 border border-blue-900/50 rounded-xl p-1 backdrop-blur-sm shadow-2xl">
                  <div className="h-[350px] sm:h-[450px] rounded-lg overflow-hidden">
                    <div className="flex items-center gap-2 bg-[#0a0a1b] border-b border-blue-900/50 p-2.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <div className="text-xs text-blue-300 ml-2 font-mono">Technology Explorer</div>
                    </div>
                    <div className="p-6 bg-[#0a0a1b] h-full overflow-auto font-mono text-sm text-blue-300">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-blue-400">{">"}</span>
                        <span className="text-blue-100 typing-animation-1">tech.search("React")</span>
                      </div>
                      <div className="ml-4 mb-6 typing-animation-response-1">
                        <p className="mb-1"><span className="text-indigo-400">name:</span> <span className="text-blue-100">"React"</span></p>
                        <p className="mb-1"><span className="text-indigo-400">category:</span> <span className="text-blue-100">"Frontend Framework"</span></p>
                        <p className="mb-1"><span className="text-indigo-400">lastUpdate:</span> <span className="text-blue-100">"2023-07-15"</span></p>
                        <p className="mb-1"><span className="text-indigo-400">stars:</span> <span className="text-blue-100">215,431</span></p>
                        <p className="mb-1"><span className="text-indigo-400">contributors:</span> <span className="text-blue-100">1,842</span></p>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-blue-400">{">"}</span>
                        <span className="text-blue-100 typing-animation-2">tech.compare(["React", "Vue", "Angular"])</span>
                      </div>
                      <div className="ml-4">
                        <p className="text-green-400 typing-animation-response-2">
                          <span className="animate-pulse inline-block">▌</span> Generating comparison chart...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Technology Ecosystem Section with Proper Masonry Grid */}
          <section className="py-24 md:py-32 relative z-10 overflow-hidden">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center mb-16">
                <motion.div 
                  className="inline-flex items-center px-3 py-1 rounded-full bg-blue-950/50 border border-blue-800/50 text-blue-400 text-sm backdrop-blur-sm mb-4"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                  <BadgeCheck className="h-3.5 w-3.5 mr-2" />
                  <span>Explore the tech landscape</span>
                </motion.div>
                
                <motion.h2 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter enhanced-gradient-heading mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Technology Ecosystem
                </motion.h2>
                
                <motion.p 
                  className="mx-auto max-w-[700px] text-blue-200/80 md:text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Navigate through the most popular frameworks and tools powering modern applications.
                </motion.p>
              </div>
              
              {/* Proper Masonry Grid Implementation */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7 }}
              >
                <MasonryGallery />
              </motion.div>
              
              <motion.div 
                className="flex justify-center mt-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Link to="/learning">
                  <Button className="rounded-full px-8 py-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800 group">
                    <span className="text-lg font-medium mr-2">Explore all technologies</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-24 md:py-32 relative z-10">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center mb-16">
                <motion.div 
                  className="inline-flex items-center px-3 py-1 rounded-full bg-blue-950/50 border border-blue-800/50 text-blue-400 text-sm backdrop-blur-sm mb-4"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                  <Sparkles className="h-3.5 w-3.5 mr-2" />
                  <span>Supercharged features</span>
                </motion.div>
                
                <motion.h2 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter gradient-text-blue"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Everything You Need
                </motion.h2>
                
                <motion.p 
                  className="mx-auto max-w-[700px] text-blue-200/80 md:text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  A complete ecosystem of tools and resources for modern developers.
                </motion.p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Globe className="h-6 w-6" />,
                    title: "Tech Stack Explorer",
                    description: "Comprehensive database of frameworks, libraries, and tools with detailed metrics and real-world performance data.",
                    color: "from-blue-600 to-blue-400",
                    delay: 0
                  },
                  {
                    icon: <Users className="h-6 w-6" />,
                    title: "Community Insights",
                    description: "Get authentic reviews from developers who use these technologies in production environments every day.",
                    color: "from-purple-600 to-blue-400",
                    delay: 0.2
                  },
                  {
                    icon: <Code className="h-6 w-6" />,
                    title: "Learning Pathways",
                    description: "Personalized learning journeys with curated resources from beginner to advanced across all technologies.",
                    color: "from-indigo-600 to-blue-400",
                    delay: 0.4
                  }
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    className="group relative transition-all duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      duration: 0.7, 
                      delay: feature.delay,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-300"></div>
                    <div className="relative flex flex-col h-full bg-[#0c0c22]/90 backdrop-blur-sm p-8 rounded-xl border border-blue-900/50 overflow-hidden">
                      <div className="absolute right-0 top-0 -mr-16 -mt-16 w-32 h-32 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-full blur-xl"></div>
                      
                      <div className={`relative z-10 rounded-full p-3 bg-gradient-to-r ${feature.color} w-14 h-14 flex items-center justify-center mb-6 shadow-lg shadow-blue-900/20`}>
                        {feature.icon}
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-3 relative z-10">{feature.title}</h3>
                      
                      <p className="text-blue-200/70 mb-6 relative z-10">
                        {feature.description}
                      </p>
                      
                      <div className="mt-auto pt-4 relative z-10">
                        <button className="text-blue-400 group-hover:text-blue-300 flex items-center text-sm font-medium">
                          Explore feature <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Statistics Section */}
              <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
                {[
                  { value: "Many", label: "Technologies Tracked" },
                  { value: "Growing", label: "Registered Developers" },
                  { value: "Active", label: "Monthly Visitors" },
                  { value: "Thriving", label: "Community Contributions" }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="relative p-6 rounded-xl backdrop-blur-sm border border-blue-900/30 bg-[#0c0c22]/30 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.1 * i }}
                  >
                    <motion.div
                      className="text-3xl md:text-4xl font-bold gradient-text-blue mb-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.8, delay: 0.3 + (0.1 * i) }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-blue-300/70 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* InfiniteMenu Section */}
          <section className="py-24 md:py-32 relative z-10 overflow-hidden">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center mb-16">
                <motion.div 
                  className="inline-flex items-center px-3 py-1 rounded-full bg-blue-950/50 border border-blue-800/50 text-blue-400 text-sm backdrop-blur-sm mb-4"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                  <BadgeCheck className="h-3.5 w-3.5 mr-2" />
                  <span>Popular frameworks</span>
                </motion.div>
                
                <motion.h2 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter enhanced-gradient-heading"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Leading Tech Platforms
                </motion.h2>
                
                <motion.p 
                  className="mx-auto max-w-[700px] text-blue-200/80 md:text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Discover the most popular development platforms powering modern applications.
                </motion.p>
              </div>
              
              <div className="h-[450px] relative">
                <InfiniteMenu items={platformItems}/>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 md:py-32 relative z-10 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <motion.div 
                className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-blue-600/20 to-transparent"
                style={{ 
                  y: useTransform(smoothScrollYProgress, [0.6, 1], [-50, 0]) 
                }}
              />
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-blue-600/20 to-transparent"
                style={{ 
                  y: useTransform(smoothScrollYProgress, [0.6, 1], [50, 0]) 
                }}
              />
            </div>
            
            <motion.div 
              className="absolute inset-0 bg-grid-pattern opacity-[0.07]"
              style={{ 
                scale: useTransform(smoothScrollYProgress, [0.6, 1], [1.1, 1]) 
              }}
            />
            
            <div className="container px-4 md:px-6 relative z-10">
              <motion.div 
                className="relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-3xl blur-lg opacity-30"></div>
                <div className="relative bg-[#0c0c22]/90 backdrop-blur-md border border-blue-900/50 p-8 md:p-12 rounded-3xl overflow-hidden">
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600 rounded-full blur-3xl opacity-20"></div>
                  <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
                  
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-6 max-w-lg">
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/80 text-blue-400 text-sm backdrop-blur-sm">
                        <Rocket className="h-3.5 w-3.5 mr-2" />
                        <span>Join thousands of developers</span>
                      </div>
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter super-gradient-text">Ready to transform your tech journey?</h2>
                      <p className="text-blue-200/80 text-lg">
                        Join our global community of developers to contribute, learn, and stay at the cutting edge of technology.
                      </p>
                      <div className="flex flex-wrap gap-4 pt-2">
                        <Link to="/signup">
                          <Button size="lg" className="px-8 py-7 text-lg font-medium rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800 border-0 transition-all duration-500 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] group">
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500/0 via-blue-100/10 to-blue-500/0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700"></div>
                            <span className="mr-2 relative z-10">Get started for free</span>
                            <ArrowRight className="ml-2 h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                        <Link to="/projects">
                          <Button size="lg" className="px-8 py-7 text-lg font-medium rounded-full bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 hover:from-green-700 hover:via-emerald-700 hover:to-green-800 border-0 transition-all duration-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] group">
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-500/0 via-green-100/10 to-green-500/0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700"></div>
                            <span className="mr-2 relative z-10">Buy Now</span>
                            <ArrowRight className="ml-2 h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                        <Link to="/community">
                          <Button size="lg" variant="outline" className="px-8 py-7 text-lg font-medium rounded-full border-2 border-blue-500/50 text-blue-300 hover:bg-blue-800/20 hover:border-blue-400 group">
                            <LucideGithub className="mr-2 h-5 w-5" />
                            <span>View on GitHub</span>
                          </Button>
                        </Link>
                      </div>
                    </div>
                    
                    {/* Fixed structure of the right side decoration */}
                    <div className="relative w-full md:w-auto flex items-center justify-center">
                      <div className="relative w-40 h-40 flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-lg opacity-50 animate-pulse-slow"></div>
                        <div className="relative w-32 h-32 bg-[#0c0c22] rounded-full border border-blue-900/50 flex items-center justify-center shadow-xl">
                          <Zap className="h-16 w-16 text-blue-400" />
                        </div>
                        
                        <div className="absolute top-0 left-0 w-full h-full">
                          <div className="w-full h-full animate-slow-spin">
                            {Array(8).fill().map((_, i) => (
                              <div 
                                key={i} 
                                className="absolute w-3 h-3 bg-blue-500 rounded-full"
                                style={{
                                  top: '50%',
                                  left: '50%',
                                  transform: `rotate(${i * 45}deg) translateY(-60px) translateX(-50%)`,
                                  opacity: 0.7,
                                  boxShadow: '0 0 10px 2px rgba(59, 130, 246, 0.5)'
                                }}
                              ></div>
                            ))}
                          </div>circuit design
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
          
          <div className="hexagon-end-marker"></div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;