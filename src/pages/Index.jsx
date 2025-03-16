import React, { useState, useEffect, useRef } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ChevronRight, Search, Code, Database, BarChart, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import '@/styles/hexagon-background.css';

const Index = () => {
  const [mousePosition, setMousePosition] = useState({ x: -400, y: -400 });
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const hexagonContainerRef = useRef(null);
  const contentRef = useRef(null);

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

  // Handle mouse movement for cursor effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (hexagonContainerRef.current) {
        const { left, top } = hexagonContainerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - left,
          y: e.clientY - top
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

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

  return (
    <Layout>
      <div className="relative">
        {/* Video Background - Positioned to be behind the navbar */}
        <div className="fixed inset-0 w-full h-full z-0">
          <div className="absolute inset-0 bg-black/30 z-0"></div>
          <video 
            className="w-full h-full object-cover"
            autoPlay 
            loop 
            muted 
            playsInline
            poster="/poster-image.jpg"
          >
            <source src="/back.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        {/* Content wrapper with hexagon background */}
        <div ref={contentRef} className="relative main-content">
          {/* Fixed position hexagon background covers main content only */}
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
          <section className="relative pt-16 py-20 md:py-32 overflow-hidden">
            <div className="container px-4 md:px-6 relative z-20">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                <div className="space-y-4 backdrop-blur-sm bg-white/40 p-8 rounded-2xl shadow-lg">
                  <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-800">
                    Community-Driven Tech Knowledge
                  </div>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                    The Developer's Guide to Modern Tech Stacks
                  </h1>
                  <p className="text-lg text-gray-800 max-w-[600px]">
                    Discover in-depth, up-to-date information about frameworks, websites, and App's.
                    Powered by the community.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link to="/platforms">
                      <Button size="lg" className="gap-2 rounded-3xl bg-blue-600 hover:bg-blue-700">
                        Explore Technologies <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link to="/community">
                      <Button size="lg" variant="outline" className="gap-2 rounded-3xl bg-white/70 hover:bg-white border-blue-300">
                        Join Community <Users className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="animate-float mt-8 md:mt-0 glass-card p-2 rounded-lg shadow-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 to-purple-50/80 backdrop-blur-sm"></div>
                  <div className="relative h-[300px] sm:h-[400px] rounded-md overflow-hidden">
                    <div className="flex items-center gap-2 bg-white/90 border-b p-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <div className="text-xs text-gray-500">Technology Explorer</div>
                    </div>
                    <div className="p-6 bg-white/80 h-full overflow-auto font-mono text-sm text-gray-800">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-blue-600">{">"}</span>
                        <span className="text-gray-800">tech.search("React")</span>
                      </div>
                      <div className="ml-4 mb-4">
                        <p className="mb-1"><span className="text-purple-600">name:</span> "React"</p>
                        <p className="mb-1"><span className="text-purple-600">category:</span> "Frontend Framework"</p>
                        <p className="mb-1"><span className="text-purple-600">lastUpdate:</span> "2023-07-15"</p>
                        <p className="mb-1"><span className="text-purple-600">stars:</span> 215431</p>
                        <p className="mb-1"><span className="text-purple-600">contributors:</span> 1842</p>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-blue-600">{">"}</span>
                        <span className="text-gray-800">tech.compare(["React", "Vue", "Angular"])</span>
                      </div>
                      <div className="ml-4">
                        <p className="text-green-600">Generating comparison chart...</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-12 md:py-24 relative z-10">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center mb-8 backdrop-blur-sm bg-white p-6 rounded-xl">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
                  <p className="mx-auto max-w-[700px] text-gray-700 md:text-lg">
                    Our platform is designed to help developers make informed decisions and stay updated.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div
                  className="flex flex-col items-start space-y-3 rounded-lg border p-6 shadow-sm glass-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-blue-300 cursor-pointer bg-white/80 backdrop-blur-sm"
                >
                  <div className="rounded-full bg-blue-100 p-3 transition-all duration-300 group-hover:bg-blue-200">
                    <Code className="h-6 w-6 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-bold">Framework Directory</h3>
                  <p className="text-gray-600">
                    Comprehensive information about popular frameworks, with detailed documentation, benchmarks, and community ratings.
                  </p>
                </div>
                <div
                  className="flex flex-col items-start space-y-3 rounded-lg border p-6 shadow-sm glass-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-yellow-300 cursor-pointer bg-white/80 backdrop-blur-sm"
                >
                  <div className="rounded-full bg-yellow-100 p-3 transition-all duration-300 group-hover:bg-yellow-200">
                    <Users className="h-6 w-6 text-yellow-700" />
                  </div>
                  <h3 className="text-xl font-bold">Community Reviews</h3>
                  <p className="text-gray-600">
                    Honest feedback from developers who have actually used these technologies in production environments.
                  </p>
                </div>
                <div
                  className="flex flex-col items-start space-y-3 rounded-lg border p-6 shadow-sm glass-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-blue-300 cursor-pointer bg-white/80 backdrop-blur-sm"
                >
                  <div className="rounded-full bg-blue-100 p-3 transition-all duration-300 group-hover:bg-blue-200">
                    <ChevronRight className="h-6 w-6 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-bold">Learning Paths</h3>
                  <p className="text-gray-600">
                    Curated learning resources to help you master new technologies, from beginner to advanced levels.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-12 md:py-24 relative z-10">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center backdrop-blur-sm bg-white p-8 rounded-2xl shadow-lg">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Dive Deeper?</h2>
                  <p className="mx-auto max-w-[700px] text-gray-800 md:text-lg">
                    Join our community of developers to contribute, learn, and stay updated on the latest in tech.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/signup">
                    <Button size="lg" className="gap-2 rounded-3xl bg-blue-600 hover:bg-blue-700">
                      Create Account <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/community">
                    <Button size="lg" variant="outline" className="gap-2 rounded-3xl bg-white/70 hover:bg-white border-blue-300">
                      Explore Our Community<ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          
          {/* This div acts as a spacer/marker for the end of the hexagon background */}
          <div className="hexagon-end-marker"></div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
