import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCommand, FiArrowUp, FiArrowDown, FiHome, FiUser, FiBriefcase, FiCode, FiMail } from 'react-icons/fi';
import { useNotification } from '../context/NotificationContext';

/**
 * Enables keyboard navigation and shortcuts throughout the site
 * Shows a help modal when pressing "?" key
 */
const KeyboardNavigation = () => {
  const [showHelp, setShowHelp] = useState(false);
  const [lastPressed, setLastPressed] = useState(null);
  const { showInfo } = useNotification();
  
  // All keyboard shortcuts
  const shortcuts = [
    { key: 'h', label: 'Home', icon: <FiHome />, action: () => scrollToSection('hero') },
    { key: 'a', label: 'About', icon: <FiUser />, action: () => scrollToSection('about') },
    { key: 'e', label: 'Experience', icon: <FiBriefcase />, action: () => scrollToSection('experience') },
    { key: 's', label: 'Skills', icon: <FiCode />, action: () => scrollToSection('skills') },
    { key: 'p', label: 'Projects', icon: <FiCode />, action: () => scrollToSection('projects') },
    { key: 'c', label: 'Contact', icon: <FiMail />, action: () => scrollToSection('contact') },
    { key: 'ArrowUp', label: 'Scroll Up', icon: <FiArrowUp />, action: () => smoothScroll('up') },
    { key: 'ArrowDown', label: 'Scroll Down', icon: <FiArrowDown />, action: () => smoothScroll('down') },
    { key: 't', label: 'Top', icon: <FiArrowUp />, action: () => scrollToTop() },
    { key: '?', label: 'Show Help', icon: <FiCommand />, action: () => setShowHelp(true) },
  ];
  
  // Function to scroll to a specific section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      showInfo(`Navigated to ${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)} section`);
    }
  };
  
  // Function to smoothly scroll up or down
  const smoothScroll = (direction) => {
    const currentPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    if (direction === 'up') {
      window.scrollTo({
        top: Math.max(0, currentPosition - windowHeight / 2),
        behavior: 'smooth'
      });
    } else {
      window.scrollTo({
        top: currentPosition + windowHeight / 2,
        behavior: 'smooth'
      });
    }
  };
  
  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Skip if user is typing in an input field
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        return;
      }
      
      // Find the shortcut that matches the key
      const shortcut = shortcuts.find(s => s.key === e.key);
      if (shortcut) {
        e.preventDefault();
        shortcut.action();
        setLastPressed(shortcut.key);
        
        // Reset last pressed after animation completes
        setTimeout(() => setLastPressed(null), 300);
      }
    };
    
    // Close modal on escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showHelp) {
        setShowHelp(false);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showHelp]);
  
  return (
    <>
      {/* Key press indicator */}
      <AnimatePresence>
        {lastPressed && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 bg-tertiary/80 backdrop-blur-md p-3 rounded-lg border border-light-gray/10 shadow-lg"
          >
            <div className="flex items-center space-x-2">
              <div className="bg-secondary/20 text-secondary p-2 rounded text-sm font-mono">
                {lastPressed}
              </div>
              <span className="text-light-gray">
                {shortcuts.find(s => s.key === lastPressed)?.label}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Help modal */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-4"
            onClick={() => setShowHelp(false)}
          >
            <motion.div 
              className="bg-tertiary/90 backdrop-blur-lg rounded-xl p-6 max-w-lg w-full shadow-2xl border border-secondary/30"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-lightest-gray">Keyboard Shortcuts</h2>
                <button 
                  onClick={() => setShowHelp(false)}
                  className="text-light-gray hover:text-secondary transition-colors"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {shortcuts.map((shortcut) => (
                  <motion.div
                    key={shortcut.key}
                    className="flex items-center p-2 bg-primary/30 rounded-lg"
                    whileHover={{ 
                      backgroundColor: 'rgba(100, 255, 218, 0.1)',
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className="p-2 mr-3 rounded-md bg-primary/50 text-secondary">
                      {shortcut.icon}
                    </div>
                    <div>
                      <div className="text-lightest-gray font-medium">
                        {shortcut.label}
                      </div>
                      <div className="text-light-gray text-xs">
                        Press <kbd className="px-2 py-1 bg-tertiary rounded text-secondary font-mono">{shortcut.key}</kbd>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 text-sm text-light-gray italic text-center">
                Press <kbd className="px-2 py-1 bg-tertiary rounded text-secondary font-mono">?</kbd> anytime to see this help
              </div>
              
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => setShowHelp(false)}
                  className="btn-primary mt-4"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Small keyboard icon hint */}
      <motion.button
        className="fixed left-5 bottom-5 z-40 p-2 rounded-full bg-tertiary/50 backdrop-blur-md border border-light-gray/10 text-light-gray hover:text-secondary transition-colors"
        onClick={() => setShowHelp(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Keyboard shortcuts"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
      >
        <FiCommand />
      </motion.button>
    </>
  );
};

export default KeyboardNavigation; 