import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';

/**
 * Button that appears when scrolling down the page and allows smooth scrolling back to top
 */
const ScrollToTop = ({ showOffset = 300 }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Show/hide button based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > showOffset) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [showOffset]);
  
  // Scroll to top with smooth behavior
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-5 right-5 z-50 p-3 rounded-full bg-tertiary/70 backdrop-blur-md border border-light-gray/10 shadow-lg text-secondary hover:bg-tertiary transition-colors duration-300"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: '0 0 15px rgba(100, 255, 218, 0.5)' 
          }}
          whileTap={{ scale: 0.9 }}
        >
          <FiArrowUp className="text-xl" />
          
          {/* Subtle animated pulse effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-secondary/20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop"
            }}
            style={{ zIndex: -1 }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop; 