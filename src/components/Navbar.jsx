import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PremiumStatus from '@/components/PremiumStatus';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if the current route matches the link
  const isActive = (path) => location.pathname === path;
  
  // Check if we're on the home page
  const isHomePage = location.pathname === "/";
  
  // Check authentication status
  useEffect(() => {
    const checkAuthStatus = () => {
      const userId = localStorage.getItem('userId');
      const name = localStorage.getItem('userName');
      if (userId) {
        setIsLoggedIn(true);
        setUserName(name || 'User');
      } else {
        setIsLoggedIn(false);
        setUserName('');
      }
    };
    
    // Check on mount and when location changes
    checkAuthStatus();
    
    // Listen for storage events (for multi-tab support)
    window.addEventListener('storage', checkAuthStatus);
    return () => window.removeEventListener('storage', checkAuthStatus);
  }, [location.pathname]);
  
  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUserName('');
    navigate('/');
  };
  
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/roadmap", label: "Roadmap" },
    { path: "/contributor", label: "Contributor" },
    { path: "/skills", label: "Skills" },
    { path: "/community", label: "Community" },
  ];
  
  // Simplified mobile menu animation variants
  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    open: { 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    }
  };

  // Add animation for children items
  const menuItemVariants = {
    closed: { 
      opacity: 0, 
      y: 10,
      transition: { duration: 0.1 }
    },
    open: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  // Add dropdown animation variants
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  // Only make navbar transparent when at top of home page
  const showTransparentNavbar = isHomePage && !isScrolled;

  // Add this effect to handle clicks outside the dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <>
      <header className={`w-full fixed top-0 z-50 transition-all duration-300 ${
          showTransparentNavbar 
            ? 'bg-transparent' 
            : 'border-b border-gray-200 shadow-sm backdrop-blur-md bg-white/90'
        }`}
      >
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
                <div className="font-bold text-white text-xl">G</div>
              </div>
              <span className={`font-bold text-xl ${
                showTransparentNavbar 
                  ? 'text-white'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
              }`}>
                Greedy-Map
              </span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <div key={link.path}>
                <Link 
                  to={link.path}
                  className={`relative text-sm font-medium transition-colors px-2 py-1 flex items-center ${
                    isActive(link.path) 
                      ? showTransparentNavbar ? 'text-white font-semibold' : 'text-blue-700'
                      : showTransparentNavbar ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="activeTab"
                      className={`absolute -bottom-1 left-0 right-0 h-0.5 ${
                        showTransparentNavbar
                          ? 'bg-white'
                          : 'bg-gradient-to-r from-blue-500 to-purple-500'
                      }`}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </div>
            ))}
            <div className="relative inline-block" ref={dropdownRef}>
              <button 
                className={`relative text-sm font-medium transition-colors px-2 py-1 flex items-center gap-1 ${
                  showTransparentNavbar ? 'text-white' : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onMouseEnter={() => setIsDropdownOpen(true)}
              >
                <span className={showTransparentNavbar ? 'text-white' : ''}>Resources</span>
                <ChevronDown 
                  className={`h-4 w-4 transition-transform ${
                    isDropdownOpen ? 'rotate-180' : ''
                  } ${
                    showTransparentNavbar ? 'text-white' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                    className="absolute right-0 mt-2 py-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <Link to="/platforms" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150">
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <div className="font-medium">Platform</div>
                          <div className="text-xs text-gray-500">Explore development platforms</div>
                        </div>
                        <ChevronDown className="h-4 w-4 ml-2 transform -rotate-90" />
                      </div>
                    </Link>
                    <Link to="/learning" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150">
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <div className="font-medium">Learning</div>
                          <div className="text-xs text-gray-500">Educational resources & guides</div>
                        </div>
                        <ChevronDown className="h-4 w-4 ml-2 transform -rotate-90" />
                      </div>
                    </Link>
                    <Link to="/projects" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150">
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <div className="font-medium">Projects</div>
                          <div className="text-xs text-gray-500">Practical project examples</div>
                        </div>
                        <ChevronDown className="h-4 w-4 ml-2 transform -rotate-90" />
                      </div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>
          
          {/* Right side items - Auth */}
          <div className="flex items-center gap-4">
            {/* Conditional rendering based on auth status */}
            <div className="hidden md:flex gap-3">
              {isLoggedIn ? (
                <>
                  <Link to="/Dashboard">
                    <div className={`flex items-center gap-2 py-1 px-3 rounded-full ${
                      showTransparentNavbar
                        ? 'bg-white/20 text-white'
                        : 'bg-blue-50 text-blue-700'
                    }`}>
                      <User className="h-4 w-4" />
                      <span className="text-sm font-medium">{userName}</span>
                    </div>
                  </Link>
                  <Button 
                    variant={showTransparentNavbar ? "secondary" : "outline"}
                    size="sm"
                    className={showTransparentNavbar
                      ? "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm rounded-3xl"
                      : "border-gray-300 text-gray-700 hover:text-blue-600 hover:border-blue-300 rounded-3xl"
                    }
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/signin">
                    <Button 
                      variant={showTransparentNavbar ? "secondary" : "outline"}
                      size="sm"
                      className={showTransparentNavbar
                        ? "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm rounded-3xl"
                        : "border-gray-300 text-gray-700 hover:text-blue-600 hover:border-blue-300 rounded-3xl"
                      }
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button 
                      size="sm"
                      className={showTransparentNavbar
                        ? "bg-white text-blue-700 hover:bg-gray-100 rounded-3xl"
                        : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-3xl shadow-sm"
                      }
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
            
            {/* Mobile menu toggle - improved for touch */}
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                className={`rounded-full p-2 w-12 h-12 ${showTransparentNavbar ? 'text-white hover:bg-white/20' : 'hover:bg-gray-100'}`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <span className="sr-only">{mobileMenuOpen ? "Close menu" : "Open menu"}</span>
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu - improved responsive design */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="fixed inset-0 top-16 z-40 bg-white/95 backdrop-blur-sm border-t border-gray-200 md:hidden overflow-y-auto"
          >
            <div className="container py-4 px-4 flex flex-col gap-3 pb-safe">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <motion.div key={link.path} variants={menuItemVariants}>
                    <Link 
                      to={link.path} 
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex justify-between items-center p-3 rounded-md ${
                        isActive(link.path)
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive(link.path) && (
                        <div className="h-2 w-2 rounded-full bg-blue-600" />
                      )}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Improved Resources dropdown for mobile */}
                <motion.div variants={menuItemVariants}>
                  {/* Changed from div to button for better accessibility */}
                  <button 
                    onClick={() => {
                      // Toggle a local state for mobile resources dropdown
                      const resourcesEl = document.getElementById('mobile-resources-dropdown');
                      if (resourcesEl) {
                        resourcesEl.classList.toggle('hidden');
                      }
                    }}
                    className="w-full flex justify-between items-center p-3 rounded-md hover:bg-gray-50 text-left"
                    aria-expanded="false"
                    aria-controls="mobile-resources-dropdown"
                  >
                    <span>Resources</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  
                  {/* Resources dropdown content */}
                  <div id="mobile-resources-dropdown" className="ml-4 flex flex-col gap-1 hidden">
                    <Link 
                      to="/platforms" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-3 rounded-md text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150"
                    >
                      <div className="flex flex-col">
                        <div className="font-medium">Platform</div>
                        <div className="text-xs text-gray-500">Explore development platforms</div>
                      </div>
                    </Link>
                    
                    <Link 
                      to="/learning" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-3 rounded-md text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150"
                    >
                      <div className="flex flex-col">
                        <div className="font-medium">Learning</div>
                        <div className="text-xs text-gray-500">Educational resources & guides</div>
                      </div>
                    </Link>
                    
                    <Link 
                      to="/projects" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-3 rounded-md text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150"
                    >
                      <div className="flex flex-col">
                        <div className="font-medium">Projects</div>
                        <div className="text-xs text-gray-500">Practical project examples</div>
                      </div>
                    </Link>
                  </div>
                </motion.div>
              </nav>
              
              <div className="border-t border-gray-200 my-2"></div>
              
              {/* Remove Premium Status section for mobile menu */}
              
              <div className={isLoggedIn ? "flex flex-col gap-3 mt-2" : "grid grid-cols-2 gap-3 mt-2"}>
                {isLoggedIn ? (
                  <>
                    <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-md">
                      <User className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-blue-700">{userName}</span>
                    </div>
                    <Button 
                      variant="outline"
                      className="w-full border-gray-300 flex items-center justify-center gap-2"
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/signin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full"
                    >
                      <Button 
                        variant="outline"
                        className="w-full border-gray-300"
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link 
                      to="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full"
                    >
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};