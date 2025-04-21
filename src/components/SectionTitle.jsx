import React from 'react';
import { motion } from 'framer-motion';

/**
 * Animated section title component with character-by-character animation
 * and decorative design elements
 */
const SectionTitle = ({ title, subtitle, align = 'left', highlightColor = 'secondary' }) => {
  // Staggered animation for characters
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };
  
  const characterVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      rotateX: 90 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100
      }
    }
  };
  
  // Line decoration animation
  const lineVariants = {
    hidden: { width: 0 },
    visible: { 
      width: "100%",
      transition: { 
        duration: 0.8,
        ease: "easeOut",
        delay: 0.4
      }
    }
  };
  
  // Dot decoration animation
  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut",
        delay: 1
      }
    }
  };
  
  const alignmentClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto"
  };
  
  return (
    <div className={`relative mb-12 ${alignmentClasses[align]} max-w-xl`}>
      {/* Subtitle */}
      {subtitle && (
        <motion.p
          className="text-light-gray text-sm font-medium mb-2 tracking-wider uppercase"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {subtitle}
        </motion.p>
      )}
      
      {/* Main title with character animation */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-2 relative z-10"
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {Array.from(title).map((char, index) => (
          <motion.span
            key={index}
            variants={characterVariants}
            className={char === ' ' ? 'inline-block' : ''}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.h2>
      
      {/* Decorative line */}
      <div className="relative h-[2px] w-full mt-4 max-w-xs flex items-center">
        <motion.div
          className={`h-full bg-${highlightColor}`}
          variants={lineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
        
        {/* Decorative dots */}
        <motion.div 
          className={`absolute right-0 w-3 h-3 rounded-full bg-${highlightColor}`}
          variants={dotVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
        
        <motion.div 
          className={`absolute right-5 w-1.5 h-1.5 rounded-full bg-${highlightColor}`}
          variants={dotVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 1.1 }}
        />
      </div>
      
      {/* Background decoration */}
      <motion.div
        className={`absolute -top-6 -left-6 text-${highlightColor} opacity-5 text-8xl font-extrabold z-0`}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.05, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {title.split(' ')[0]}
      </motion.div>
    </div>
  );
};

export default SectionTitle; 