import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    // Helper function to get computed RGB values from CSS variables
    const getRGBColor = (cssVar, alpha = 1) => {
      const root = document.documentElement;
      const rgb = getComputedStyle(root).getPropertyValue(cssVar).trim();
      return `rgba(${rgb}, ${alpha})`;
    };

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Animation function
    const animate = () => {
      time += 0.002;
      
      // Clear canvas with primary color
      ctx.fillStyle = getRGBColor('--color-primary-rgb');
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create gradient animation
      const gradientSize = Math.max(canvas.width, canvas.height);
      const gradient = ctx.createRadialGradient(
        canvas.width / 2 + Math.cos(time) * 100,
        canvas.height / 2 + Math.sin(time) * 100,
        0,
        canvas.width / 2,
        canvas.height / 2,
        gradientSize
      );

      // Add color stops with computed RGB values
      gradient.addColorStop(0, getRGBColor('--color-secondary-rgb', 0.15));
      gradient.addColorStop(0.5, getRGBColor('--color-tertiary-rgb', 0.1));
      gradient.addColorStop(1, getRGBColor('--color-primary-rgb', 0));

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add noise effect with reduced intensity
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 2; // Reduced noise intensity
        data[i] = Math.min(255, data[i] + noise);
        data[i + 1] = Math.min(255, data[i + 1] + noise);
        data[i + 2] = Math.min(255, data[i + 2] + noise);
      }
      
      ctx.putImageData(imageData, 0, 0);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 opacity-70 pointer-events-none"
      style={{ 
        mixBlendMode: 'soft-light',
        filter: 'contrast(1.2) brightness(0.8)'
      }}
    />
  );
};

export default AnimatedBackground; 