import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';

/**
 * Animated theme switcher with smooth transitions
 * Supports dark/light modes and saves preference to localStorage
 */
const ThemeSwitch = () => {
  // Check for saved theme preference or default to dark
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first, then system preference
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true; // Default to dark theme
  });
  
  // Toggle between dark and light themes
  const toggleTheme = () => {
    setIsDark(prevState => !prevState);
  };
  
  // Update DOM and localStorage when theme changes
  useEffect(() => {
    // Update document classes for theme
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.body.style.backgroundColor = 'var(--color-primary)';
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = 'var(--color-primary)';
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);
  
  // Initial theme setup
  useEffect(() => {
    // Add transition for smooth color changes
    document.documentElement.style.transition = 'background-color 0.5s ease, color 0.5s ease';
    document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
    
    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setIsDark(e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return (
    <motion.button
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="fixed right-5 top-5 z-50 p-3 rounded-full bg-tertiary backdrop-blur-md border border-light-gray cursor-pointer"
      style={{ backgroundColor: 'rgba(var(--color-tertiary-rgb), 0.5)', borderColor: 'rgba(var(--color-light-gray-rgb), 0.1)' }}
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ y: 10, opacity: 0, rotate: 90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -10, opacity: 0, rotate: -90 }}
            transition={{ duration: 0.2 }}
          >
            <FiMoon className="text-yellow-300 text-xl" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ y: -10, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 10, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <FiSun className="text-yellow-400 text-xl" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Decorative glow effect */}
      <div 
        className="absolute inset-0 rounded-full blur-md -z-10 opacity-60"
        style={{ 
          backgroundColor: isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(234, 179, 8, 0.2)'
        }}
      />
    </motion.button>
  );
};

export default ThemeSwitch; 