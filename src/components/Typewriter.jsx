import { useState, useEffect } from 'react';

const Typewriter = ({ text, delay = 70, startDelay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let timer;
    
    if (currentIndex === 0 && !isTyping) {
      // Initial delay before starting to type
      timer = setTimeout(() => {
        setIsTyping(true);
      }, startDelay);
    } else if (isTyping && currentIndex < text.length) {
      // Type next character
      timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
    }
    
    return () => clearTimeout(timer);
  }, [currentIndex, delay, isTyping, startDelay, text]);

  return (
    <div className="inline-flex items-center">
      <span>{displayedText}</span>
      <span 
        className={`ml-1 h-7 w-1 bg-secondary inline-block ${
          currentIndex === text.length ? 'animate-blink' : 'opacity-100'
        }`}
      ></span>
    </div>
  );
};

export default Typewriter;
