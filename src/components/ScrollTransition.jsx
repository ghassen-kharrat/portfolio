import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Component that creates smooth transitions between sections
 * Adds parallax effects and reveal animations on scroll
 */
const ScrollTransition = ({ children }) => {
  const [activeSection, setActiveSection] = useState('');
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
    layoutEffect: false
  });

  // Global scroll progress for dynamic effects
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.98, 1, 1, 0.98]);
  
  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const scrollY = window.scrollY;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          const id = section.getAttribute('id');
          
          if (activeSection !== id) {
            setActiveSection(id);
            
            // Update URL hash without scroll jump
            history.pushState(null, null, `#${id}`);
            
            // Add an active class to the current section for additional effects
            section.classList.add('section-active');
          }
        } else {
          section.classList.remove('section-active');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]);

  // Add a scroll progress indicator
  const scrollProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative">
      {/* Scroll progress indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-secondary z-50 origin-left"
        style={{ scaleX: scrollProgress }}
      />
      
      {/* Smooth transition container */}
      <motion.div
        style={{ opacity, scale }}
        className="transform-gpu w-full"
      >
        {children}
      </motion.div>
      
      {/* Section navigation dots */}
      <nav className="fixed right-10 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <ul className="flex flex-col space-y-6">
          {['home', 'about', 'skills', 'experience', 'projects', 'contact'].map((id) => (
            <li key={id}>
              <a 
                href={`#${id}`}
                className={`w-3 h-3 block rounded-full transition-all duration-300 border border-secondary ${
                  activeSection === id 
                    ? 'bg-secondary scale-125' 
                    : 'bg-transparent hover:bg-secondary/30'
                }`}
                aria-label={`Navigate to ${id} section`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(id).scrollIntoView({ 
                    behavior: 'smooth'
                  });
                }}
              />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ScrollTransition; 