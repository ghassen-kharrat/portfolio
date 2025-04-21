import { motion } from 'framer-motion';

/**
 * Component to add visually appealing dividers between sections
 * Uses SVG paths for custom shapes and animations on scroll
 */
const SectionDivider = ({ variant = 'wave', color = 'secondary', opacity = 0.1 }) => {
  // Different divider path shapes
  const dividerPaths = {
    wave: "M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,224C672,213,768,171,864,149.3C960,128,1056,128,1152,122.7C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
    slant: "M0,0L1440,160L1440,320L0,320Z",
    triangle: "M1440,320L0,320L720,0Z",
    curve: "M0,224L60,229.3C120,235,240,245,360,224C480,203,600,149,720,149.3C840,149,960,203,1080,202.7C1200,203,1320,149,1380,122.7L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z",
    zigzag: "M0,64L80,90.7C160,117,320,171,480,192C640,213,800,203,960,176C1120,149,1280,107,1360,85.3L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z",
  };

  // Animation variants
  const svgVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut" 
      }
    }
  };
  
  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: { 
      pathLength: 1,
      transition: { 
        duration: 1.5,
        ease: "easeInOut" 
      }
    }
  };

  return (
    <div className="relative w-full overflow-hidden z-10" style={{ height: '150px' }}>
      <motion.div
        className="absolute bottom-0 left-0 w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full"
          preserveAspectRatio="none"
        >
          <motion.path
            variants={pathVariants}
            d={dividerPaths[variant]}
            className={`fill-${color}/[${opacity}] stroke-${color}/20`}
            strokeWidth="3"
          ></motion.path>
        </svg>

        {/* Small decorative elements */}
        <motion.div 
          className="absolute top-1/2 left-1/4 w-3 h-3 rounded-full bg-secondary"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.8 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />
        
        <motion.div 
          className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full bg-secondary"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-4 h-4 rounded-full bg-secondary"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.5 }}
        />
      </motion.div>
    </div>
  );
};

export default SectionDivider; 