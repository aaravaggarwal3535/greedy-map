import React from "react";
import { motion } from "framer-motion";
import { Layout } from "../components/Layout";
import SocialLinks from '@/components/SocialLinks';

const Community = () => {
  return (
    <Layout>
      {/* Hero section with modern gradient and animated background elements */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-800 text-white min-h-[75vh] flex items-center">
        {/* Abstract background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute right-[-10%] top-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-bl from-blue-500/20 to-transparent"></div>
          <div className="absolute left-[-5%] bottom-[-5%] w-[30%] h-[30%] rounded-full bg-gradient-to-tr from-violet-500/20 to-transparent"></div>
          
          {/* Animated floating circles */}
          <motion.div 
            className="absolute right-[10%] top-[30%] w-6 h-6 rounded-full bg-blue-400/30"
            animate={{ 
              y: [0, -15, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div 
            className="absolute left-[15%] top-[25%] w-4 h-4 rounded-full bg-purple-400/30"
            animate={{ 
              y: [0, 20, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div 
            className="absolute left-[30%] bottom-[20%] w-8 h-8 rounded-full bg-indigo-400/20"
            animate={{ 
              y: [0, -25, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0zNiAxOGMxLjIgMCAyLjEuOSAyLjEgMi4xdjE5LjhjMCAxLjItLjkgMi4xLTIuMSAyLjFIMjRjLTEuMiAwLTIuMS0uOS0yLjEtMi4xVjIwLjFjMC0xLjIuOS0yLjEgMi4xLTIuMWgxMnpNNjAgMzBjMCAxNi41LTEzLjUgMzAtMzAgMzBTMCA0Ni41IDAgMzAgMTMuNSAwIDMwIDBzMzAgMTMuNSAzMCAzMHoiLz48L2c+PC9zdmc+')]"
            style={{ opacity: 0.03 }}
          ></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
              Connect with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">GreedyMap</span>
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100/90 mb-12 leading-relaxed max-w-3xl mx-auto">
              Follow us on social media to get the latest updates and connect with our community
            </p>
            
            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center"
            >
              <SocialLinks className="scale-150" />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg 
            className="fill-white" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
            style={{ width: '100%', height: '60px' }}
          >
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
        </div>
      </div>
    </Layout>
  );
};

export default Community;
