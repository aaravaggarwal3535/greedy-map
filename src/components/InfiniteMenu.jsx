import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const InfiniteMenu = ({ items }) => {
  const scrollRef = useRef(null);
  
  // Clone items to create infinite scrolling illusion
  const extendedItems = [...items, ...items, ...items];
  
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    let animationId;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;
    
    const scroll = () => {
      scrollPosition += scrollSpeed;
      
      // Reset scroll position when reaching the second set of items
      if (scrollPosition >= scrollContainer.clientWidth) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(scroll);
    };
    
    scroll();
    
    // Pause animation on hover
    const handleMouseEnter = () => cancelAnimationFrame(animationId);
    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(scroll);
    };
    
    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <div className="w-full h-full flex flex-col">
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide py-8 gap-6"
        style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {extendedItems.map((item, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0 w-[350px] h-[400px] relative group"
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative h-full flex flex-col bg-[#0c0c22] backdrop-blur-sm rounded-xl border border-blue-900/50 overflow-hidden">
              <div className="h-1/2 bg-black/20 flex items-center justify-center p-6">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-contain max-h-[120px]"
                />
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-blue-200/80 mb-4 text-sm line-clamp-3">{item.description}</p>
                <div className="mt-auto">
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium group"
                  >
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default InfiniteMenu;
