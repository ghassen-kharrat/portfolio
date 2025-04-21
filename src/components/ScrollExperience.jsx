import { useEffect, useRef } from 'react';

const ScrollExperience = () => {
  const progressBarRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  
  useEffect(() => {
    const progressBar = progressBarRef.current;
    const scrollIndicator = scrollIndicatorRef.current;
    
    if (!progressBar || !scrollIndicator) return;
    
    // Function to update progress bar based on scroll position
    const updateProgress = () => {
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight;
      const scrolled = window.scrollY;
      
      const percentScrolled = (scrolled / (fullHeight - windowHeight)) * 100;
      progressBar.style.width = `${percentScrolled}%`;
      
      // Hide scroll indicator after user has scrolled a bit
      if (scrolled > windowHeight * 0.3) {
        scrollIndicator.style.opacity = '0';
      } else {
        scrollIndicator.style.opacity = '1';
      }
      
      // Apply parallax effects to sections
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        const distance = section.getBoundingClientRect().top;
        const sectionHeight = section.offsetHeight;
        
        // Only apply effects to sections in or near the viewport
        if (distance < windowHeight + sectionHeight && distance > -sectionHeight) {
          // Find elements to animate
          const titles = section.querySelectorAll('h1, h2, h3');
          const images = section.querySelectorAll('img');
          const paragraphs = section.querySelectorAll('p');
          
          // Calculate parallax values
          const parallaxTitle = distance * 0.15;
          const parallaxImage = distance * 0.05;
          const parallaxText = distance * 0.1;
          
          // Apply transformations
          titles.forEach(title => {
            title.style.transform = `translateY(${parallaxTitle}px)`;
          });
          
          images.forEach(image => {
            image.style.transform = `translateY(${parallaxImage}px)`;
          });
          
          paragraphs.forEach(paragraph => {
            paragraph.style.transform = `translateY(${parallaxText}px)`;
          });
        }
      });
    };
    
    // Add scroll and resize event listeners
    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
    
    // Initialize on mount
    updateProgress();
    
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);
  
  return (
    <>
      {/* Progress bar at the top of the page */}
      <div className="fixed top-0 left-0 w-full h-1 bg-primary/20 z-50">
        <div 
          ref={progressBarRef}
          className="h-full bg-secondary transition-all duration-200 ease-out"
          style={{ width: '0%' }}
        ></div>
      </div>
      
      {/* Scroll indicator at the bottom of the screen */}
      <div 
        ref={scrollIndicatorRef}
        className="fixed bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center transition-opacity duration-700 z-50"
      >
        <span className="text-light-gray text-sm mb-2">Scroll To Explore</span>
        <div className="w-8 h-12 border-2 border-light-gray/50 rounded-full flex justify-center p-2">
          <div className="w-1 h-2 bg-secondary rounded-full animate-scroll-down"></div>
        </div>
      </div>
    </>
  );
};

export default ScrollExperience; 