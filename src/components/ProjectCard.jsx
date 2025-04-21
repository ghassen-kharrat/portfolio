import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useInView } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

/**
 * Enhanced project card with 3D tilt effect, animations, and hover interactions
 */
const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [cursorEntered, setCursorEntered] = useState(false);
  const inView = useInView(cardRef, { once: true, amount: 0.2 });
  
  // Mouse position for tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring physics for smooth movement
  const rotateX = useSpring(
    useTransform(mouseY, [0, 300], [12, -12]), 
    { stiffness: 300, damping: 30, mass: 0.5 }
  );
  
  const rotateY = useSpring(
    useTransform(mouseX, [0, 300], [-12, 12]), 
    { stiffness: 300, damping: 30, mass: 0.5 }
  );
  
  const scaleCard = useSpring(hovering ? 1.02 : 1, 
    { stiffness: 300, damping: 30 }
  );
  
  // Layers with different movement intensity for parallax effect
  const moveImage = useTransform(
    [rotateX, rotateY],
    ([latestRotateX, latestRotateY]) => `perspective(1200px) rotateX(${latestRotateX * 0.5}deg) rotateY(${latestRotateY * 0.5}deg)`
  );
  
  const moveContent = useTransform(
    [rotateX, rotateY],
    ([latestRotateX, latestRotateY]) => `perspective(1200px) rotateX(${latestRotateX * 0.7}deg) rotateY(${latestRotateY * 0.7}deg) translateZ(40px)`
  );
  
  const moveTags = useTransform(
    [rotateX, rotateY],
    ([latestRotateX, latestRotateY]) => `perspective(1200px) rotateX(${latestRotateX * 0.8}deg) rotateY(${latestRotateY * 0.8}deg) translateZ(60px)`
  );
  
  const moveButtons = useTransform(
    [rotateX, rotateY],
    ([latestRotateX, latestRotateY]) => `perspective(1200px) rotateX(${latestRotateX * 0.9}deg) rotateY(${latestRotateY * 0.9}deg) translateZ(80px)`
  );
  
  // Colors and shadows based on hover state
  const glowOpacity = useTransform(
    [rotateX, rotateY],
    ([latestRotateX, latestRotateY]) => {
      const distance = Math.sqrt(latestRotateX ** 2 + latestRotateY ** 2);
      return Math.min(distance / 15, 0.25);
    }
  );
  
  function handleMouseMove(e) {
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Get mouse position relative to card center
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  }
  
  function handleMouseEnter() {
    setHovering(true);
    setCursorEntered(true);
  }
  
  function handleMouseLeave() {
    setHovering(false);
    setCursorEntered(false);
    // Reset mouse position to center (no tilt)
    mouseX.set(0);
    mouseY.set(0);
  }
  
  // Card animation variants
  const cardVariants = {
    hidden: { 
      y: 50, 
      opacity: 0,
      scale: 0.9
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1,
        delay: index * 0.1 + 0.1
      }
    }
  };
  
  return (
    <motion.div
      ref={cardRef}
      className="group relative bg-tertiary/40 rounded-lg p-6 overflow-hidden transform-gpu backface-hidden border border-light-gray/10 h-full"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        scale: scaleCard
      }}
    >
      {/* Background glow effect */}
      <motion.div 
        className="absolute inset-0 bg-secondary rounded-lg opacity-0 blur-2xl pointer-events-none"
        style={{
          opacity: glowOpacity,
          transform: moveImage,
          zIndex: 0
        }}
      />
      
      {/* Featured Project Badge */}
      {project.featured && (
        <motion.div 
          className="absolute top-0 right-0 bg-secondary text-primary text-xs font-bold py-1 px-2 rounded-bl-lg transform-gpu backface-hidden"
          style={{ transform: moveContent }}
        >
          Featured
        </motion.div>
      )}
      
      {/* Project image with hover zoom */}
      <motion.div 
        className="w-full h-40 overflow-hidden rounded mb-4 transform-gpu backface-hidden"
        style={{ transform: moveImage }}
      >
        <motion.img
          src={project.image || "https://via.placeholder.com/400x200"}
          alt={project.title}
          className="w-full h-full object-cover object-center"
          animate={{ scale: hovering ? 1.05 : 1 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
      
      {/* Project title and description */}
      <motion.div
        className="transform-gpu backface-hidden"
        style={{ transform: moveContent }}
      >
        <h3 className="text-xl font-bold mb-2 text-lightest-gray group-hover:text-secondary transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="text-light-gray text-sm mb-4 line-clamp-3">
          {project.description}
        </p>
      </motion.div>
      
      {/* Technologies */}
      <motion.div 
        className="mt-auto mb-4 flex flex-wrap gap-2 transform-gpu backface-hidden"
        style={{ transform: moveTags }}
      >
        {project.technologies?.map((tech, techIndex) => (
          <span 
            key={techIndex}
            className="text-xs bg-tertiary/70 text-light-gray px-2 py-1 rounded"
          >
            {tech}
          </span>
        ))}
      </motion.div>
      
      {/* Links */}
      <motion.div 
        className="flex items-center space-x-4 mt-auto transform-gpu backface-hidden"
        style={{ transform: moveButtons }}
      >
        {project.github && (
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic text-light-gray hover:text-secondary transition-colors duration-300"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiGithub className="text-xl" />
          </motion.a>
        )}
        
        {project.externalLink && (
          <motion.a
            href={project.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic text-light-gray hover:text-secondary transition-colors duration-300"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiExternalLink className="text-xl" />
          </motion.a>
        )}
      </motion.div>
      
      {/* Interactive click layer */}
      <div 
        className={`absolute inset-0 bg-secondary/5 opacity-0 rounded-lg transition-opacity duration-300 pointer-events-none ${hovering ? 'opacity-100' : ''}`}
      />
    </motion.div>
  );
};

export default ProjectCard; 