import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { FaXTwitter } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
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
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <footer className="bg-white border-t border-gray-100 py-10 md:py-12 z-30">
      <div className="container px-4 md:px-6">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
        >
          {/* Logo and Description */}
          <motion.div variants={itemVariants} className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative h-9 w-9 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300">
                <div className="font-bold text-white text-xl">G</div>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">Greedy-Map</span>
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              Discover the technology stacks powering your favorite companies and products. A community-driven platform for developers.
            </p>
            <div className="flex space-x-4 pt-2">
              <motion.a 
                href="#"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="text-gray-500 hover:text-blue-600"
              >
                <Github size={18} />
              </motion.a>
              <motion.a 
                href="#"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="text-gray-500 hover:text-blue-400"
              >
                <FaXTwitter size={18} />
              </motion.a>
              <motion.a 
                href="#"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="text-gray-500 hover:text-indigo-500"
              >
                <FaDiscord size={18} />
              </motion.a>
            </div>
          </motion.div>
          
          {/* Resources */}
          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-semibold mb-5 uppercase tracking-wider text-gray-900">Resources</h4>
            <motion.ul 
              className="space-y-3 text-sm"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
            >
              <motion.li variants={itemVariants}>
                <Link to="/platforms" className="text-gray-600 hover:text-blue-600 hover:translate-x-1 inline-flex items-center transition-all duration-200">
                  <span>Platforms</span>
                  <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"></span>
                </Link>
              </motion.li>
              <motion.li variants={itemVariants}>
                <Link to="/learning" className="text-gray-600 hover:text-blue-600 hover:translate-x-1 inline-flex items-center transition-all duration-200">
                  <span>Learning</span>
                </Link>
              </motion.li>
              <motion.li variants={itemVariants}>
                <Link to="/community" className="text-gray-600 hover:text-blue-600 hover:translate-x-1 inline-flex items-center transition-all duration-200">
                  <span>Community</span>
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
          
          {/* Social Handles */}
          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-semibold mb-5 uppercase tracking-wider text-gray-900">Connect</h4>
            <motion.ul 
              className="space-y-3 text-sm"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
            >
              <motion.li variants={itemVariants}>
                <a href="#" className="text-gray-600 hover:text-indigo-600 hover:translate-x-1 inline-flex items-center gap-2 transition-all duration-200">
                  <FaDiscord size={14} />
                  <span>Discord Server</span>
                </a>
              </motion.li>
              <motion.li variants={itemVariants}>
                <a href="#" className="text-gray-600 hover:text-gray-900 hover:translate-x-1 inline-flex items-center gap-2 transition-all duration-200">
                  <Github size={14} />
                  <span>GitHub</span>
                </a>
              </motion.li>
              <motion.li variants={itemVariants}>
                <a href="#" className="text-gray-600 hover:text-blue-400 hover:translate-x-1 inline-flex items-center gap-2 transition-all duration-200">
                  <FaXTwitter size={14} />
                  <span>Twitter</span>
                </a>
              </motion.li>
              <motion.li variants={itemVariants}>
                <a href="#" className="text-gray-600 hover:text-green-600 hover:translate-x-1 inline-flex items-center gap-2 transition-all duration-200">
                  <ExternalLink size={14} />
                  <span>Contributors</span>
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
          
          {/* Company */}
          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-semibold mb-5 uppercase tracking-wider text-gray-900">Company</h4>
            <motion.ul 
              className="space-y-3 text-sm"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
            >
              <motion.li variants={itemVariants}>
                <Link to="/about" className="text-gray-600 hover:text-blue-600 hover:translate-x-1 inline-flex items-center transition-all duration-200">
                  <span>About Us</span>
                </Link>
              </motion.li>
              <motion.li variants={itemVariants}>
                <Link to="/contact" className="text-gray-600 hover:text-blue-600 hover:translate-x-1 inline-flex items-center transition-all duration-200">
                  <span>Contact</span>
                </Link>
              </motion.li>
              <motion.li variants={itemVariants}>
                <Link to="/privacy" className="text-gray-600 hover:text-blue-600 hover:translate-x-1 inline-flex items-center transition-all duration-200">
                  <span>Privacy Policy</span>
                </Link>
              </motion.li>
              <motion.li variants={itemVariants}>
                <Link to="/terms" className="text-gray-600 hover:text-blue-600 hover:translate-x-1 inline-flex items-center transition-all duration-200">
                  <span>Terms of Service</span>
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        </motion.div>
        
        {/* Divider with subtle gradient */}
        <div className="mt-12 mb-6">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        </div>
        
        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center"
        >
          <p>© {currentYear} Greedy-Map. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Made with ❤️ by Greedy Map Team</p>
        </motion.div>
      </div>
    </footer>
  );
};
