import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomCursor from '../CustomCursor';
import ScrollController from '../ScrollController';
import ThemeSwitch from '../ThemeSwitch';
import ScrollToTop from '../ScrollToTop';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

// Interfaces
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [hasCustomCursor, setHasCustomCursor] = useState(false);
  const location = useLocation();
  
  // Check if mobile or desktop with proper cursor support
  useEffect(() => {
    const handleResize = () => {
      const mobileCheck = window.innerWidth < 768;
      setIsMobile(mobileCheck);
      
      // Only enable custom cursor on desktop with pointer support
      const hasPointerSupport = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      setHasCustomCursor(!mobileCheck && hasPointerSupport);
      
      // Add/remove has-custom-cursor class based on device type
      if (!mobileCheck && hasPointerSupport) {
        document.body.classList.add('has-custom-cursor');
      } else {
        document.body.classList.remove('has-custom-cursor');
      }
    };
    
    // Initial check
    handleResize();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Apply page transitions
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    in: {
      opacity: 1,
      y: 0,
    },
    out: {
      opacity: 0,
      y: -20,
    },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

  return (
    <>
      {/* Only render CustomCursor if on desktop */}
      {hasCustomCursor && <CustomCursor />}
      
      {/* Scroll controller for all devices */}
      <ScrollController />
      
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="min-h-screen flex flex-col bg-primary overflow-hidden"
      >
        <Navbar />
        
        <main id="main-content" className="flex-grow">
          {children}
        </main>
        
        <Footer />
      </motion.div>
      
      {/* Extra UI elements */}
      <ScrollToTop />
      <ThemeSwitch />
    </>
  );
};

export default Layout; 