import { useEffect } from 'react';

const SmoothScroll = () => {
  useEffect(() => {
    // Handle internal anchor links
    const handleAnchorClick = (e) => {
      const href = e.currentTarget.getAttribute('href');
      
      // Check if the link is an anchor link
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
          });
          
          // Update URL without page reload
          window.history.pushState(null, '', href);
        }
      }
    };

    // Handle "back to top" functionality
    const handleScrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };
    
    // Add event listeners to internal anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', handleAnchorClick);
    });
    
    // Find any "back to top" buttons
    const backToTopButtons = document.querySelectorAll('.scroll-to-top');
    backToTopButtons.forEach(button => {
      button.addEventListener('click', handleScrollToTop);
    });

    // Handle hash changes from browser navigation
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const targetElement = document.getElementById(hash.substring(1));
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop,
              behavior: 'smooth'
            });
          }
        }, 100);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Check for hash in URL on mount
    if (window.location.hash) {
      handleHashChange();
    }

    // Cleanup
    return () => {
      anchorLinks.forEach(link => {
        link.removeEventListener('click', handleAnchorClick);
      });
      
      backToTopButtons.forEach(button => {
        button.removeEventListener('click', handleScrollToTop);
      });
      
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return null;
};

export default SmoothScroll;