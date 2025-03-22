import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Gallery image data with sizes
const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1541845157-a6d2d100c931",
    alt: "Programming Interface",
    size: "normal",
    category: "Development"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1588282322673-c31965a75c3e",
    alt: "Modern Technology",
    size: "normal",
    category: "Tech"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1588117472013-59bb13edafec",
    alt: "AI Processing",
    size: "tall",
    category: "AI"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1587588354456-ae376af71a25",
    alt: "Data Visualization",
    size: "wide",
    category: "Analytics"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1558980663-3685c1d673c4",
    alt: "Cloud Computing",
    size: "normal",
    category: "Cloud"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1588499756884-d72584d84df5",
    alt: "Security Systems",
    size: "tall",
    category: "Security"
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1588492885706-b8917f06df77",
    alt: "Neural Networks",
    size: "big",
    category: "Machine Learning"
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1588247866001-68fa8c438dd7",
    alt: "Mobile Development",
    size: "normal",
    category: "Mobile"
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1586521995568-39abaa0c2311",
    alt: "DevOps Pipeline",
    size: "wide",
    category: "DevOps"
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1572914857229-37bf6ee8101c",
    alt: "Blockchain Technology",
    size: "big",
    category: "Blockchain"
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1588453862014-cd1a9ad06a12",
    alt: "IOT Devices",
    size: "tall",
    category: "IoT"
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1588414734732-660b07304ddb",
    alt: "Virtual Reality",
    size: "normal",
    category: "VR/AR"
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1588224575346-501f5880ef29",
    alt: "Cybersecurity",
    size: "normal",
    category: "Security"
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1574798834926-b39501d8eda2",
    alt: "Quantum Computing",
    size: "normal",
    category: "Quantum"
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1547234935-80c7145ec969",
    alt: "Cryptocurrency",
    size: "normal",
    category: "Finance"
  }
];

const MasonryGallery = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    if (imagesLoaded === galleryImages.length) {
      setAllLoaded(true);
    }
  }, [imagesLoaded]);
  
  const handleImageLoad = () => {
    setImagesLoaded(prev => prev + 1);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="masonry-container relative">
      {!allLoaded && (
        <div className="loading-overlay absolute inset-0 bg-[#050816]/80 backdrop-blur-sm flex items-center justify-center z-20">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-blue-400">Loading gallery...</p>
          </div>
        </div>
      )}
      
      <motion.div
        className="masonry-grid"
        variants={containerVariants}
        initial="hidden"
        animate={allLoaded ? "visible" : "hidden"}
      >
        {galleryImages.map((image) => (
          <motion.div
            key={image.id}
            className={`masonry-item ${image.size}`}
            variants={itemVariants}
            onMouseEnter={() => setHoveredItem(image.id)}
            onMouseLeave={() => setHoveredItem(null)}
            whileHover={{ 
              scale: 1.03,
              zIndex: 5,
              transition: { duration: 0.3 }
            }}
          >
            <div className="relative group overflow-hidden rounded-xl">
              {/* Gradient border effect on hover */}
              <motion.div 
                className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity z-0"
                animate={hoveredItem === image.id ? { scale: [1, 1.05, 1], opacity: [0, 1, 0.8] } : {}}
                transition={{ duration: 1.5, repeat: hoveredItem === image.id ? Infinity : 0 }}
              />
              
              {/* Image */}
              <div className="relative z-10 rounded-lg overflow-hidden">
                <img 
                  src={`${image.src}?auto=format&fit=crop&w=800&q=80`}
                  alt={image.alt}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  onLoad={handleImageLoad}
                  loading="lazy"
                />
                
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-blue-900/20 to-[#050816]/80 opacity-90 group-hover:opacity-40 transition-opacity duration-300"></div>
                
                {/* Text content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <h3 className="text-white font-bold text-lg md:text-xl drop-shadow-md">
                    {image.alt}
                  </h3>
                  <motion.p 
                    className="text-blue-100/90 text-sm transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                  >
                    {image.category}
                  </motion.p>
                </div>
                
                {/* Category tag */}
                <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-blue-600/70 backdrop-blur-sm text-xs text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {image.category}
                </div>
                
                {/* Shine effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 duration-700 transition-opacity"
                  style={{
                    background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.2) 50%, transparent 70%)',
                    backgroundSize: '200% 200%',
                    animation: 'shine 1.5s infinite'
                  }}
                ></div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default MasonryGallery;