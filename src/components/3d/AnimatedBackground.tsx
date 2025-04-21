import { useEffect, useState } from 'react';

const AnimatedBackground = () => {
  const [stars, setStars] = useState<Array<{
    top: string;
    left: string;
    size: string;
    duration: string;
    delay: string;
  }>>([]);

  useEffect(() => {
    // Generate random stars
    const starCount = 150;
    const newStars = [];
    
    for (let i = 0; i < starCount; i++) {
      newStars.push({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 3 + 1}px`,
        duration: `${Math.random() * 50 + 20}s`,
        delay: `${Math.random() * 10}s`,
      });
    }
    
    setStars(newStars);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 bg-primary">
      <div className="absolute inset-0 opacity-20">
        {/* CSS-based animation */}
        <div className="stars">
          {stars.map((star, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-secondary animate-twinkle"
              style={{
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
                animationDuration: star.duration,
                animationDelay: star.delay,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Gradient backgrounds */}
      <div className="absolute top-1/3 -left-20 w-72 h-72 bg-secondary/5 rounded-full filter blur-3xl animate-float"></div>
      <div className="absolute bottom-1/3 -right-20 w-72 h-72 bg-secondary/5 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
    </div>
  );
};

export default AnimatedBackground; 