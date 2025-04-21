import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiType, FiMaximize, FiMinimize, FiSun, FiMoon, FiX, FiSettings } from 'react-icons/fi';

/**
 * Accessibility panel with options for:
 * - Font size adjustment
 * - High contrast mode
 * - Reduced motion
 * - Focus mode
 */
const Accessibility = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    fontSize: 'normal',
    contrast: 'normal',
    reducedMotion: false,
    focusMode: false
  });
  
  // Load saved settings
  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibility');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);
  
  // Apply settings to the DOM
  useEffect(() => {
    // Apply font size
    document.documentElement.classList.remove('text-sm', 'text-base', 'text-lg', 'text-xl');
    if (settings.fontSize === 'small') {
      document.documentElement.classList.add('text-sm');
    } else if (settings.fontSize === 'large') {
      document.documentElement.classList.add('text-lg');
    } else if (settings.fontSize === 'xlarge') {
      document.documentElement.classList.add('text-xl');
    }
    
    // Apply contrast
    document.documentElement.classList.remove('high-contrast', 'ultra-contrast');
    if (settings.contrast === 'high') {
      document.documentElement.classList.add('high-contrast');
    } else if (settings.contrast === 'ultra') {
      document.documentElement.classList.add('ultra-contrast');
    }
    
    // Apply reduced motion
    if (settings.reducedMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
    
    // Apply focus mode
    if (settings.focusMode) {
      document.documentElement.classList.add('focus-mode');
    } else {
      document.documentElement.classList.remove('focus-mode');
    }
    
    // Save settings to localStorage
    localStorage.setItem('accessibility', JSON.stringify(settings));
  }, [settings]);
  
  // Update a specific setting
  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // Get font size text
  const getFontSizeText = () => {
    switch(settings.fontSize) {
      case 'small': return 'Small';
      case 'large': return 'Large';
      case 'xlarge': return 'Extra Large';
      default: return 'Normal';
    }
  };
  
  // Get contrast text
  const getContrastText = () => {
    switch(settings.contrast) {
      case 'high': return 'High';
      case 'ultra': return 'Ultra';
      default: return 'Normal';
    }
  };
  
  return (
    <>
      {/* Accessibility button */}
      <motion.button
        className="fixed left-16 bottom-5 z-40 p-2 rounded-full bg-tertiary/50 backdrop-blur-md border border-light-gray/10 text-light-gray hover:text-secondary transition-colors"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Accessibility options"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.7 }}
      >
        <FiSettings className="text-xl" />
      </motion.button>
      
      {/* Accessibility panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-y-0 left-0 z-[100] bg-tertiary/95 backdrop-blur-lg p-5 border-r border-light-gray/10 w-80 shadow-2xl"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-lightest-gray">Accessibility</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-primary/20 text-light-gray hover:text-secondary transition-colors"
                aria-label="Close accessibility panel"
              >
                <FiX />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Font Size Control */}
              <div className="bg-primary/20 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <FiType className="mr-2 text-secondary" />
                  <span className="text-lightest-gray font-medium">Text Size</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      const sizes = ['small', 'normal', 'large', 'xlarge'];
                      const currentIndex = sizes.indexOf(settings.fontSize);
                      const newIndex = Math.max(0, currentIndex - 1);
                      updateSetting('fontSize', sizes[newIndex]);
                    }}
                    className="p-2 rounded bg-primary/30 text-light-gray hover:text-secondary disabled:opacity-50"
                    disabled={settings.fontSize === 'small'}
                    aria-label="Decrease text size"
                  >
                    <FiMinimize />
                  </button>
                  
                  <span className="text-light-gray px-3">{getFontSizeText()}</span>
                  
                  <button
                    onClick={() => {
                      const sizes = ['small', 'normal', 'large', 'xlarge'];
                      const currentIndex = sizes.indexOf(settings.fontSize);
                      const newIndex = Math.min(sizes.length - 1, currentIndex + 1);
                      updateSetting('fontSize', sizes[newIndex]);
                    }}
                    className="p-2 rounded bg-primary/30 text-light-gray hover:text-secondary disabled:opacity-50"
                    disabled={settings.fontSize === 'xlarge'}
                    aria-label="Increase text size"
                  >
                    <FiMaximize />
                  </button>
                </div>
              </div>
              
              {/* Contrast Control */}
              <div className="bg-primary/20 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <FiSun className="mr-2 text-secondary" />
                  <span className="text-lightest-gray font-medium">Contrast</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      const modes = ['normal', 'high', 'ultra'];
                      const currentIndex = modes.indexOf(settings.contrast);
                      const newIndex = Math.max(0, currentIndex - 1);
                      updateSetting('contrast', modes[newIndex]);
                    }}
                    className="p-2 rounded bg-primary/30 text-light-gray hover:text-secondary disabled:opacity-50"
                    disabled={settings.contrast === 'normal'}
                    aria-label="Decrease contrast"
                  >
                    <FiMinimize />
                  </button>
                  
                  <span className="text-light-gray px-3">{getContrastText()}</span>
                  
                  <button
                    onClick={() => {
                      const modes = ['normal', 'high', 'ultra'];
                      const currentIndex = modes.indexOf(settings.contrast);
                      const newIndex = Math.min(modes.length - 1, currentIndex + 1);
                      updateSetting('contrast', modes[newIndex]);
                    }}
                    className="p-2 rounded bg-primary/30 text-light-gray hover:text-secondary disabled:opacity-50"
                    disabled={settings.contrast === 'ultra'}
                    aria-label="Increase contrast"
                  >
                    <FiMaximize />
                  </button>
                </div>
              </div>
              
              {/* Toggle switches */}
              <div className="space-y-4">
                {/* Reduced Motion */}
                <div 
                  className="flex items-center justify-between bg-primary/20 p-4 rounded-lg cursor-pointer"
                  onClick={() => updateSetting('reducedMotion', !settings.reducedMotion)}
                >
                  <div className="flex items-center">
                    <FiMoon className="mr-2 text-secondary" />
                    <span className="text-lightest-gray font-medium">Reduced Motion</span>
                  </div>
                  
                  <div className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${settings.reducedMotion ? 'bg-secondary' : 'bg-primary/50'}`}>
                    <div 
                      className={`absolute w-5 h-5 rounded-full bg-lightest-gray transform transition-transform duration-300 ${settings.reducedMotion ? 'translate-x-6' : 'translate-x-1'}`}
                      style={{ top: '2px' }}
                    />
                  </div>
                </div>
                
                {/* Focus Mode */}
                <div 
                  className="flex items-center justify-between bg-primary/20 p-4 rounded-lg cursor-pointer"
                  onClick={() => updateSetting('focusMode', !settings.focusMode)}
                >
                  <div className="flex items-center">
                    <FiMaximize className="mr-2 text-secondary" />
                    <span className="text-lightest-gray font-medium">Focus Mode</span>
                  </div>
                  
                  <div className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${settings.focusMode ? 'bg-secondary' : 'bg-primary/50'}`}>
                    <div 
                      className={`absolute w-5 h-5 rounded-full bg-lightest-gray transform transition-transform duration-300 ${settings.focusMode ? 'translate-x-6' : 'translate-x-1'}`}
                      style={{ top: '2px' }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Reset button */}
              <button
                onClick={() => {
                  setSettings({
                    fontSize: 'normal',
                    contrast: 'normal',
                    reducedMotion: false,
                    focusMode: false
                  });
                }}
                className="w-full py-2 px-4 rounded bg-tertiary text-lightest-gray hover:bg-tertiary/80 transition-colors"
              >
                Reset to Defaults
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Accessibility; 