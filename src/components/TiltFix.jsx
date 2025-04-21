import { useEffect } from 'react';

/**
 * Component to ensure tilt elements are properly clickable
 * This is a global fix that patches the tilt effect behavior
 */
const TiltFix = () => {
  useEffect(() => {
    const processTiltElements = () => {
      // Find all elements with tilt-card class
      const tiltElements = document.querySelectorAll('.tilt-card');
      
      tiltElements.forEach(el => {
        // Ensure the element has position relative and z-index
        el.style.position = 'relative';
        el.style.zIndex = '5';
        
        // For anchor tags inside tilt cards, make sure they're properly clickable
        const anchorTags = el.querySelectorAll('a');
        anchorTags.forEach(a => {
          a.style.position = 'relative';
          a.style.zIndex = '6';
          
          // Make sure anchor takes full space of parent if it's a button
          if (a.classList.contains('btn-primary') || a.classList.contains('btn-secondary')) {
            a.style.display = 'inline-block';
            a.style.width = '100%';
            a.style.height = '100%';
          }
        });
        
        // For buttons inside tilt cards
        const buttons = el.querySelectorAll('button');
        buttons.forEach(btn => {
          btn.style.position = 'relative';
          btn.style.zIndex = '6';
        });
      });
    };
    
    // Process on load and when DOM changes
    processTiltElements();
    
    // Set up observer for dynamic content
    const observer = new MutationObserver((mutations) => {
      processTiltElements();
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Clean up
    return () => {
      observer.disconnect();
    };
  }, []);
  
  // This component doesn't render anything
  return null;
};

export default TiltFix; 