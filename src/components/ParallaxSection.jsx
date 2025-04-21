import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * ParallaxSection wraps content with parallax scrolling effects
 * Different layers move at different speeds for a depth effect
 */
const ParallaxSection = ({ 
  children, 
  bgColor = "bg-transparent", 
  speed = 0.2,
  direction = "up", // "up", "down", "left", "right"
  className = ""
}) => {
  const ref = useRef(null);
  
  // Get scroll progress relative to this section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Calculate parallax values based on direction
  let xTransform = [0, 0];
  let yTransform = [0, 0];
  
  switch(direction) {
    case "up":
      yTransform = ["0%", `-${speed * 100}%`];
      break;
    case "down":
      yTransform = ["0%", `${speed * 100}%`];
      break;
    case "left":
      xTransform = ["0%", `-${speed * 100}%`];
      break;
    case "right":
      xTransform = ["0%", `${speed * 100}%`];
      break;
    default:
      yTransform = ["0%", `-${speed * 100}%`];
  }
  
  // Transform values based on scroll
  const x = useTransform(scrollYProgress, [0, 1], xTransform);
  const y = useTransform(scrollYProgress, [0, 1], yTransform);
  
  // Scale and opacity for fade effect
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.3, 1, 1, 0.8]);
  
  return (
    <motion.div 
      ref={ref}
      className={`relative overflow-hidden ${bgColor} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background parallax layer */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ 
          x: useTransform(scrollYProgress, [0, 1], [0, speed * 50]),
          y: useTransform(scrollYProgress, [0, 1], [0, speed * -100]) 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 z-0" />
      </motion.div>
      
      {/* Content with parallax effect */}
      <motion.div 
        className="relative z-10 h-full w-full"
        style={{ x, y, scale, opacity }}
      >
        {children}
      </motion.div>
      
      {/* Perspective depth effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 pointer-events-none z-20" />
    </motion.div>
  );
};

export default ParallaxSection; 