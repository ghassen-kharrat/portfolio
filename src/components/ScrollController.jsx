import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * ScrollController handles smooth transitions and animations between sections
 * Features include:
 * - Smooth scrolling navigation
 * - Section progress indicators
 * - Scroll-triggered animations
 */
const ScrollController = () => {
  const [activeSection, setActiveSection] = useState('');
  const [sections, setSections] = useState([]);
  const scrollRef = useRef(null);
  
  // Track scroll progress
  const { scrollYProgress } = useScroll();
  const scrollProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
  useEffect(() => {
    // Find all sections with IDs
    const sectionElements = Array.from(document.querySelectorAll('section[id]'));
    setSections(sectionElements.map(section => ({
      id: section.id,
      element: section,
      top: section.offsetTop,
      height: section.offsetHeight
    })));
    
    // Set up intersection observer for sections with higher threshold
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentSection = entry.target.id;
          
          // Only update if it's a new section to avoid re-renders
          if (activeSection !== currentSection) {
            setActiveSection(currentSection);
            
            // Update URL hash without causing scroll jump
            if (history.pushState) {
              history.pushState(null, null, `#${currentSection}`);
            } else {
              location.hash = `#${currentSection}`;
            }
          }
          
          // Add active class to the current section
          document.querySelectorAll('section').forEach(s => {
            if (s.id === currentSection) {
              s.classList.add('section-active');
            } else {
              s.classList.remove('section-active');
            }
          });
        }
      });
    }, { 
      threshold: 0.35, // Increased threshold for better section detection
      rootMargin: "-10% 0px -10% 0px" // Add margin to improve trigger point
    });
    
    // Observe all sections
    sectionElements.forEach(section => {
      observer.observe(section);
    });
    
    // Fix section heights and overflow issues
    sectionElements.forEach(section => {
      section.style.minHeight = "100vh";
      section.style.overflow = "visible";
      section.style.position = "relative";
    });
    
    // Implement smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // Smooth scroll to target with offset
          const headerOffset = 80; // Adjust based on your header height
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
    
    return () => {
      sectionElements.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, [activeSection]);
  
  // Add debounced scroll handler to fix jittery transitions
  useEffect(() => {
    let scrollTimeout;
    
    const handleScroll = () => {
      document.body.classList.add('is-scrolling');
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        document.body.classList.remove('is-scrolling');
      }, 100);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);
  
  return (
    <>
      {/* Scroll Progress Indicator */}
      <motion.div 
        className="fixed right-5 top-1/2 h-1/3 w-1 bg-gray-200/30 rounded-full -translate-y-1/2 z-50"
        ref={scrollRef}
      >
        <motion.div 
          className="w-full bg-secondary rounded-full absolute top-0"
          style={{ 
            height: scrollProgress,
            maxHeight: '100%'
          }}
        />
      </motion.div>
      
      {/* Section Navigation Dots */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center space-y-4">
        {sections.map(section => (
          <button 
            key={section.id}
            onClick={() => {
              // Apply smooth scrolling with offset
              const headerOffset = 80;
              const targetElement = document.getElementById(section.id);
              if (targetElement) {
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
                });
              }
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === section.id 
                ? 'bg-secondary scale-125' 
                : 'bg-gray-400/50 hover:bg-gray-300'
            }`}
            aria-label={`Scroll to ${section.id} section`}
          />
        ))}
      </div>
      
      {/* Scroll Down Indicator (only visible on first section) */}
      {activeSection === sections[0]?.id && (
        <motion.div 
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="text-xs uppercase tracking-widest mb-2 text-gray-400">Scroll</div>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center pt-2">
            <motion.div 
              className="w-1 h-2 bg-secondary rounded-full"
              animate={{ 
                y: [0, 4, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ScrollController; 