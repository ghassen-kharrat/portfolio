import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

/**
 * Shared animated background component for all sections
 * Includes stars animation and gradient effects
 */
const AnimatedSectionBackground = ({ opacity = 0.5, color = "secondary" }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      style={{ opacity }}
    >
      {/* Animated stars */}
      <div className="stars pointer-events-none">
        {[...Array(80)].map((_, i) => (
          <div 
            key={i}
            className={`absolute rounded-full bg-${color}/30 pointer-events-none`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDuration: `${Math.random() * 50 + 20}s`,
              animationDelay: `${Math.random() * 50}s`,
            }}
          />
        ))}
      </div>
      
      {/* Parallax background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className={`absolute w-72 h-72 rounded-full bg-${color}/10 filter blur-3xl pointer-events-none`}
          style={{ 
            top: '30%', 
            left: '20%',
            transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
            transition: 'transform 0.2s ease-out'
          }}
        />
        <motion.div 
          className={`absolute w-96 h-96 rounded-full bg-${color}/10 filter blur-3xl pointer-events-none`}
          style={{ 
            bottom: '20%', 
            right: '15%',
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
            transition: 'transform 0.2s ease-out'
          }}
        />
      </div>
    </div>
  );
};

export default AnimatedSectionBackground; 