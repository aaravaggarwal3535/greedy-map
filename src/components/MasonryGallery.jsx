import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Gallery image data with sizes - using tech-related Unsplash images
const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    alt: "Programming Interface",
    size: "normal",
    category: "Development"
  },
  {
    id: 2,
    src: "https://plus.unsplash.com/premium_photo-1683121713210-97667d2e83c8?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Modern Technology",
    size: "normal",
    category: "Tech"
  },
  {
    id: 3,
    src: "https://plus.unsplash.com/premium_photo-1683120963435-6f9355d4a776?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "AI Processing",
    size: "tall",
    category: "AI"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    alt: "Data Visualization",
    size: "wide",
    category: "Analytics"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8",
    alt: "Cloud Computing",
    size: "normal",
    category: "Cloud"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3",
    alt: "Security Systems",
    size: "tall",
    category: "Security"
  },
  {
    id: 7,
    src: "https://plus.unsplash.com/premium_photo-1676637656210-390da73f4951?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Neural Networks",
    size: "big",
    category: "Machine Learning"
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
    alt: "Mobile Development",
    size: "normal",
    category: "Mobile"
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3",
    alt: "DevOps Pipeline",
    size: "wide",
    category: "DevOps"
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1643000296927-f4f1c8722b7d?q=80&w=2089&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Blockchain Technology",
    size: "big",
    category: "Blockchain"
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    alt: "IOT Devices",
    size: "tall",
    category: "IoT"
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1626379961798-54f819ee896a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Virtual Reality",
    size: "normal",
    category: "VR/AR"
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7",
    alt: "Cybersecurity",
    size: "normal",
    category: "Security"
  },
];

const MasonryGallery = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  
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
      <motion.div
        className="grid gap-2.5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] grid-flow-dense"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {galleryImages.map((image) => (
          <motion.div
            key={image.id}
            className={`flex justify-center items-center ${
              image.size === 'wide' ? 'col-span-2' : 
              image.size === 'tall' ? 'row-span-2' : 
              image.size === 'big' ? 'col-span-2 row-span-2' : ''
            }`}
            variants={itemVariants}
            onMouseEnter={() => setHoveredItem(image.id)}
            onMouseLeave={() => setHoveredItem(null)}
            whileHover={{ 
              scale: 1.03,
              zIndex: 5,
              transition: { duration: 0.3 }
            }}
          >
            <div className="relative w-full h-full group overflow-hidden rounded-xl">
              {/* Gradient border effect on hover */}
              <motion.div 
                className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity z-0"
                animate={hoveredItem === image.id ? { scale: [1, 1.05, 1], opacity: [0, 1, 0.8] } : {}}
                transition={{ duration: 1.5, repeat: hoveredItem === image.id ? Infinity : 0 }}
              />
              
              {/* Image */}
              <div className="relative z-10 w-full h-full rounded-lg overflow-hidden">
                <img 
                  src={`${image.src}?auto=format&fit=crop&w=800&q=80`}
                  alt={image.alt}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
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