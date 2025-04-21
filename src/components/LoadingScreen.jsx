import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Loading screen shown before the portfolio is fully loaded
 * Features animated logo and progress indicator
 */
const LoadingScreen = ({ finishLoading }) => {
  const [progress, setProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  
  // Text to be typed
  const loadingText = "Loading experience...";
  const [typedText, setTypedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  
  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 150);
    
    // Typing effect
    const typingInterval = setInterval(() => {
      if (textIndex < loadingText.length) {
        setTypedText(prev => prev + loadingText.charAt(textIndex));
        setTextIndex(prev => prev + 1);
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    
    // Cleanup and trigger finish
    return () => {
      clearInterval(interval);
      clearInterval(typingInterval);
    };
  }, [textIndex]);
  
  // When progress reaches 100%, hide loader after a short delay
  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        setShowLoader(false);
        setTimeout(finishLoading, 1000); // Allow exit animation to complete
      }, 800);
      
      return () => clearTimeout(timeout);
    }
  }, [progress, finishLoading]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    },
    exit: { 
      y: -20, 
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };
  
  const logoPathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        duration: 2,
        ease: "easeInOut"
      }
    },
    exit: { 
      pathLength: 0, 
      opacity: 0,
      transition: { 
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };
  
  return (
    <AnimatePresence mode="wait">
      {showLoader && (
        <motion.div
          className="fixed inset-0 bg-primary z-[9999] flex flex-col items-center justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Logo SVG with path animation */}
          <motion.div 
            className="w-40 h-40 mb-8"
            variants={itemVariants}
          >
            <svg width="160" height="160" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path
                d="M50 10 L90 90 L50 70 L10 90 Z"
                strokeWidth="2"
                stroke="#64ffda"
                fill="none"
                variants={logoPathVariants}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <motion.path
                d="M50 10 L50 70"
                strokeWidth="2"
                stroke="#64ffda"
                fill="none"
                variants={logoPathVariants}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
          
          {/* Progress text with typing effect */}
          <motion.div
            className="mb-4 font-mono text-secondary text-sm"
            variants={itemVariants}
          >
            {typedText}
            <span className="animate-blink">|</span>
          </motion.div>
          
          {/* Progress bar */}
          <motion.div
            className="w-48 h-1 bg-tertiary/30 rounded-full overflow-hidden"
            variants={itemVariants}
          >
            <motion.div 
              className="h-full bg-secondary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut" }}
            />
          </motion.div>
          
          {/* Progress percentage */}
          <motion.div
            className="mt-2 font-mono text-xs text-light-gray"
            variants={itemVariants}
          >
            {Math.round(progress)}%
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen; 