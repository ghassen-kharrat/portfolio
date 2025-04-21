import { useRef } from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Experience from '../components/sections/Experience';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import Contact from '../components/sections/Contact';
import SectionDivider from '../components/SectionDivider';
import ParallaxSection from '../components/ParallaxSection';

const Home = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  
  return (
    <div ref={mainRef} className="relative">
      <Hero />
      
      <SectionDivider variant="wave" />
      <ParallaxSection>
        <About />
      </ParallaxSection>
      
      <SectionDivider variant="curve" />
      <ParallaxSection speed={0}>
        <Experience />
      </ParallaxSection>
      
      <SectionDivider variant="zigzag" />
      <ParallaxSection direction="right" speed={0.15}>
        <Skills />
      </ParallaxSection>
      
      <SectionDivider variant="slant" />
      <ParallaxSection direction="up" speed={0.25}>
        <Projects />
      </ParallaxSection>
      
      <SectionDivider variant="triangle" />
      <ParallaxSection direction="down" speed={0.2}>
        <Contact />
      </ParallaxSection>
    </div>
  );
};

export default Home; 