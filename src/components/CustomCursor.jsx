import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Custom cursor component with magnetic effect for buttons and links
 * Enhanced with visual feedback for interactions
 */
const CustomCursor = () => {
  const cursorDotRef = useRef(null);
  const cursorBorderRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if device supports hover (desktop device)
    const hasHoverSupport = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasHoverSupport) {
      setIsVisible(false);
      document.body.classList.remove('has-custom-cursor');
      return;
    }

    document.body.classList.add('has-custom-cursor');
    
    const cursor = cursorDotRef.current;
    const cursorBorder = cursorBorderRef.current;
    
    const onMouseMove = (e) => {
      const posX = e.clientX;
      const posY = e.clientY;
      
      // Main dot follows immediately
      cursor.style.left = `${posX}px`;
      cursor.style.top = `${posY}px`;
      
      // Border follows with slight delay
      cursorBorder.animate({
        left: `${posX}px`,
        top: `${posY}px`
      }, { duration: 100, fill: 'forwards' });
    };
    
    const handleMouseDown = () => {
      setIsActive(true);
      cursor.style.transform = 'scale(0.5)';
      cursorBorder.style.transform = 'scale(1.5)';
    };
    
    const handleMouseUp = () => {
      setIsActive(false);
      cursor.style.transform = 'scale(1)';
      cursorBorder.style.transform = 'scale(1)';
    };
    
    // Find all buttons, links, inputs, and elements with [data-cursor] attribute
    function updateCursorForInteractiveElements() {
      const interactiveElements = document.querySelectorAll(
        'button, a, input[type="button"], input[type="submit"], [data-cursor], .interactive, [role="button"]'
      );

      interactiveElements.forEach(el => {
        // Add event listeners for hover effect
        el.addEventListener('mouseenter', () => {
          setIsActive(true);
          cursor.style.transform = 'scale(0.5)';
          cursorBorder.style.transform = 'scale(1.5)';
          
          // Add more prominent visual feedback
          cursor.style.backgroundColor = 'rgba(255, 255, 255, 1)';
          cursorBorder.style.borderColor = 'rgba(255, 255, 255, 0.8)';
          
          // Check for magnetic effect attribute
          if (el.hasAttribute('data-magnetic')) {
            el.addEventListener('mousemove', magneticEffect);
          }
        });
        
        el.addEventListener('mouseleave', () => {
          setIsActive(false);
          cursor.style.transform = 'scale(1)';
          cursorBorder.style.transform = 'scale(1)';
          
          // Reset styles
          cursor.style.backgroundColor = '';
          cursorBorder.style.borderColor = '';
          
          if (el.hasAttribute('data-magnetic')) {
            el.removeEventListener('mousemove', magneticEffect);
            el.style.transform = '';
          }
        });
      });
    }
    
    // Magnetic effect for elements
    const magneticEffect = (e) => {
      const el = e.currentTarget;
      const { left, top, width, height } = el.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const deltaX = Math.floor((e.clientX - centerX) / 6);
      const deltaY = Math.floor((e.clientY - centerY) / 6);
      
      el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    };
    
    // Initial setup and mutation observer for dynamic content
    updateCursorForInteractiveElements();
    
    // Create a MutationObserver to watch for DOM changes
    const observer = new MutationObserver((mutations) => {
      updateCursorForInteractiveElements();
    });
    
    // Start observing the document with the configured parameters
    observer.observe(document.body, { childList: true, subtree: true });
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Text selection cursor style
    document.addEventListener('selectstart', () => {
      cursor.style.display = 'none';
      cursorBorder.style.display = 'none';
    });
    
    document.addEventListener('selectionchange', () => {
      if (document.getSelection().toString().length === 0) {
        cursor.style.display = 'block';
        cursorBorder.style.display = 'block';
      }
    });
    
    // Fix for cursor disappearing when hovering over iframes or scrollbars
    document.addEventListener('mouseleave', () => {
      cursor.style.display = 'none';
      cursorBorder.style.display = 'none';
    });
    
    document.addEventListener('mouseenter', () => {
      cursor.style.display = 'block';
      cursorBorder.style.display = 'block';
    });
    
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('selectstart', () => {});
      document.removeEventListener('selectionchange', () => {});
      document.removeEventListener('mouseleave', () => {});
      document.removeEventListener('mouseenter', () => {});
      document.body.classList.remove('has-custom-cursor');
      observer.disconnect();
    };
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <div className="custom-cursor">
      <div
        ref={cursorDotRef}
        className={`cursor-dot fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2 transition-transform ${isActive ? 'active' : ''}`}
      />
      <div
        ref={cursorBorderRef}
        className={`cursor-border fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998] border border-white border-opacity-50 transform -translate-x-1/2 -translate-y-1/2 transition-transform ${isActive ? 'active' : ''}`}
      />
    </div>
  );
};

export default CustomCursor; 