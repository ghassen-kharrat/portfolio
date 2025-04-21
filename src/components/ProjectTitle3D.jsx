import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ProjectTitle3D = ({ title, onScreen = true }) => {
  const titleRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  // Handle mouse movement for 3D effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (titleRef.current && isHovered) {
        const { left, top, width, height } = titleRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        
        setMousePosition({ x, y });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered]);
  
  // Animation variants
  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.04,
      },
    },
  };
  
  const letterVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };
  
  // Generate 3D layers
  const generateLayers = (count, color, isMain = false) => {
    const layers = [];
    const depthFactor = isMain ? 1 : 0.4;
    
    for (let i = 0; i < count; i++) {
      const zIndex = isMain ? count - i : i;
      const offset = i * 2 * depthFactor;
      const opacity = isMain ? 1 : 1 - (i / (count + 1)); 
      
      layers.push(
        <div 
          key={`layer-${i}`}
          className={`absolute left-0 top-0 ${isMain ? 'font-bold' : 'font-normal'}`}
          style={{
            transform: `translateZ(${-offset}px)`,
            zIndex,
            opacity,
            color,
            textShadow: isMain ? '0 1px 1px rgba(0,0,0,0.1)' : 'none',
          }}
        >
          {title}
        </div>
      );
    }
    
    return layers;
  };

  return (
    <motion.div
      ref={titleRef}
      className="relative inline-block perspective-1000 text-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial="hidden"
      animate={onScreen ? "visible" : "hidden"}
      variants={titleVariants}
    >
      <div className="mb-2 text-secondary font-mono">
        <motion.span variants={letterVariants}>0</motion.span>
        <motion.span variants={letterVariants}>4</motion.span>
        <motion.span variants={letterVariants}>.</motion.span>
      </div>
      
      <h2 
        className="relative text-4xl md:text-5xl font-bold text-lightest-gray preserve-3d tracking-wide"
        style={{
          transform: isHovered
            ? `rotateY(${mousePosition.x * 20}deg) rotateX(${-mousePosition.y * 15}deg)`
            : 'rotateY(0deg) rotateX(0deg)',
          transition: isHovered ? 'none' : 'transform 0.5s ease-out',
        }}
      >
        {/* Background layers */}
        {generateLayers(3, '#64ffda', false)}
        
        {/* Main text layer */}
        {generateLayers(1, '#ccd6f6', true)}
        
        {/* Character-by-character animation */}
        <div className="opacity-0">
          {title.split('').map((char, i) => (
            <motion.span key={i} variants={letterVariants}>
              {char}
            </motion.span>
          ))}
        </div>
      </h2>
    </motion.div>
  );
};

export default ProjectTitle3D; 