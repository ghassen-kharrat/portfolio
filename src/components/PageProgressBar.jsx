import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * PageProgressBar component shows a progress indicator at the top of the page
 * that grows as the user scrolls down.
 */
const PageProgressBar = ({ height = 3, color = 'secondary', shadow = true }) => {
  // Get scroll progress
  const { scrollYProgress } = useScroll();
  
  // Make it springy for more natural feel
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 z-50 bg-${color} origin-left`}
      style={{ 
        scaleX,
        height: `${height}px`,
        boxShadow: shadow ? `0 0 10px var(--color-${color})` : 'none'
      }}
    />
  );
};

export default PageProgressBar; 