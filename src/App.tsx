import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import LoadingScreen from './components/LoadingScreen';
import PageProgressBar from './components/PageProgressBar';
import Layout from './components/layout/Layout';
import AudioAmbience from './components/AudioAmbience';
import KeyboardNavigation from './components/KeyboardNavigation';
import { NotificationProvider } from './context/NotificationContext';
import { TranslationProvider } from './context/TranslationContext';
import AnimatedBackground from './components/AnimatedBackground';
import TiltFix from './components/TiltFix';
import EmailJSConfig from './components/EmailJSConfig';
import './index.css';

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else if (savedTheme === 'dark' || !savedTheme) {
      // Default to dark if no preference is saved
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      
      // If no preference was saved, check system preference
      if (!savedTheme && window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else if (!savedTheme) {
        localStorage.setItem('theme', 'dark');
      }
    }
  }, []);

  useEffect(() => {
    // Simulating assets loading
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
      // Fix for initial body class
      document.body.classList.add('loaded');
      
      // Check if we can apply custom cursor
      const hasPointerSupport = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      if (hasPointerSupport && window.innerWidth >= 768) {
        document.body.classList.add('has-custom-cursor');
      }
    }, 2000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  return (
    <NotificationProvider>
      <TranslationProvider>
        <EmailJSConfig />
        {loading ? (
          <LoadingScreen progress={100} />
        ) : (
          <>
            <AnimatedBackground />
            <TiltFix />
            <KeyboardNavigation />
            <PageProgressBar />
            <AudioAmbience />
            
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={
                  <Layout>
                    <Home />
                  </Layout>
                } />
                <Route path="/about" element={
                  <Layout>
                    <About />
                  </Layout>
                } />
                <Route path="/projects" element={
                  <Layout>
                    <Projects />
                  </Layout>
                } />
                <Route path="/contact" element={
                  <Layout>
                    <Contact />
                  </Layout>
                } />
              </Routes>
            </AnimatePresence>
          </>
        )}
      </TranslationProvider>
    </NotificationProvider>
  );
}

export default App; 