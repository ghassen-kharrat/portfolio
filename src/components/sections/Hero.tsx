import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowDown, FiArrowRight, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import Typewriter from '../Typewriter';
import AnimatedSectionBackground from '../AnimatedSectionBackground';
import { useTranslation } from '../../context/TranslationContext';

// Add NodeJS type declaration
declare global {
  namespace NodeJS {
    interface Timeout {}
  }
}

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = "Full Stack Developer";
  const typingSpeed = 100;
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  const { translate } = useTranslation();
  
  // Parallax scroll effect with layoutEffect set to false to avoid hydration warnings
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
    layoutEffect: false  // Add this to fix the hydration warning
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    let timer: ReturnType<typeof setTimeout>;

    const typeText = () => {
      if (currentIndex < fullText.length) {
        setTypedText(prev => prev + fullText.charAt(currentIndex));
        currentIndex++;
        timer = setTimeout(typeText, typingSpeed);
      }
    };

    timer = setTimeout(typeText, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };
  
  const socialVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        delay: 1.2 + (i * 0.1),
      },
    }),
  };

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center py-20 px-6 overflow-hidden"
    >
      {/* Replace custom background with shared component */}
      <AnimatedSectionBackground opacity={0.5} color="secondary" />
      
      <motion.div 
        className="container relative z-10 mx-auto max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          variants={itemVariants}
          className="mb-5 text-secondary font-mono"
        >
          <span className="relative inline-block overflow-hidden">
            <motion.span 
              className="inline-block"
              initial={{ y: 40 }}
              animate={{ y: 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 100, 
                delay: 0.1 
              }}
            >
              Hi, my name is
            </motion.span>
          </span>
        </motion.div>
        
        <motion.h1 
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 text-lightest-gray text-3d"
          style={{
            textShadow: '0 5px 15px rgba(100, 255, 218, 0.1)'
          }}
        >
          Ghassen Kharrat.
        </motion.h1>
        
        <motion.h2 
          variants={itemVariants} 
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-light-gray"
        >
          <Typewriter 
            text="Bridging Innovation and Impact: Full Stack Developer and Project Management Expert"
            delay={50}
            startDelay={800}
          />
        </motion.h2>
        
        <motion.p 
          variants={itemVariants}
          className="text-light-gray max-w-xl mb-12 text-lg"
        >
         "I’m Ghassen Kharrat, a versatile professional with a passion for creating impactful solutions through technology and strategic project coordination. With a proven track record in full-stack web and mobile development and extensive experience in managing international projects, training, and communication. I thrive on challenges and am dedicated to delivering high-quality results that drive success. My goal is to leverage my skills and expertise to contribute to innovative projects that make a difference in the world."
        </motion.p>
        
        <motion.div variants={itemVariants}>
          <motion.a 
            href="#contact"
            className="inline-block px-7 py-4 text-secondary font-mono border border-secondary rounded transition-colors duration-300 tilt-card btn-primary mr-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              console.log("Get In Touch button clicked");
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Get In Touch
          </motion.a>
          
          <motion.a 
            href="/Full stack Developer.pdf"
            className="inline-block px-7 py-4 text-white bg-secondary font-mono rounded transition-colors duration-300 tilt-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            target="_blank"
            rel="noopener noreferrer"
            download
            onClick={(e) => {
              console.log("Download CV button clicked");
            }}
          >
            {translate('downloadCV')}
          </motion.a>
        </motion.div>
        
        {/* Social Links with 3D hover effects */}
        <div className="fixed left-10 bottom-0 hidden md:block">
          <div className="flex flex-col items-center">
            <div className="flex flex-col gap-6 mb-8">
              {[
                { icon: <FiGithub />, href: "https://github.com/ghassen-kharrat", label: "GitHub" },
                { icon: <FiLinkedin />, href: "https://linkedin.com/in/ghassen-kharrat", label: "LinkedIn" },
                { icon: <FiTwitter />, href: "https://twitter.com/ghassen-kharrat", label: "Twitter" }
              ].map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light-gray hover:text-secondary transform-gpu preserve-3d"
                  custom={i}
                  variants={socialVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ 
                    scale: 1.2, 
                    rotateY: 20,
                    z: 20,
                    textShadow: "0 0 8px rgba(100, 255, 218, 0.5)"
                  }}
                  aria-label={social.label}
                >
                  <span className="text-xl">{social.icon}</span>
                </motion.a>
              ))}
            </div>
            <motion.div 
              className="h-24 w-px bg-light-gray"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 0.4 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            />
          </div>
        </div>
        
        {/* Email Link */}
        <div className="fixed right-10 bottom-0 hidden md:block">
          <div className="flex flex-col items-center">
            <motion.a
              href="mailto:kharrat.ghassen@gmail.com"
              className="text-light-gray hover:text-secondary transform-gpu preserve-3d font-mono tracking-widest text-sm"
              style={{ writingMode: 'vertical-rl' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              whileHover={{ 
                scale: 1.1, 
                rotateX: 10,
                textShadow: "0 0 8px rgba(100, 255, 218, 0.5)"
              }}
            >
              kharrat.ghassen@gmail.com
            </motion.a>
            <motion.div 
              className="h-24 w-px bg-light-gray mt-8"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 0.4 }}
              transition={{ delay: 1.8, duration: 0.5 }}
            />
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        {/* <span className="text-light-gray text-sm mb-2">Scroll Down</span> */}
        <FiArrowDown className="text-secondary animate-bounce" />
      </motion.div>
    </section>
  );
};

export default Hero; 