import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGlobe, FiChevronDown } from 'react-icons/fi';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', flag: '🇹🇳' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
];

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('portfolioLanguage') || 'en';
  });
  const dropdownRef = useRef(null);

  // Set up event listener to close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Apply language change
  useEffect(() => {
    document.documentElement.lang = currentLang;
    localStorage.setItem('portfolioLanguage', currentLang);
    
    // Track language change event if analytics is available
    if (window.portfolioAnalytics) {
      window.portfolioAnalytics.trackEvent('language_change', { language: currentLang });
    }
    
    // This would typically trigger loading translation files
    // loadTranslations(currentLang);
  }, [currentLang]);

  const handleLanguageSelect = (langCode) => {
    setCurrentLang(langCode);
    setIsOpen(false);
  };

  // Get current language object
  const getCurrentLanguage = () => {
    return LANGUAGES.find(lang => lang.code === currentLang) || LANGUAGES[0];
  };

  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95,
      transition: { duration: 0.15 }
    }
  };

  const iconVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 }
  };

  return (
    <div className="fixed top-5 right-20 z-50" ref={dropdownRef}>
      <motion.button
        className="px-3 py-2 rounded-md bg-tertiary text-lightest-gray flex items-center space-x-2 hover:bg-tertiary/80"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-expanded={isOpen}
        aria-label="Select language"
      >
        <span className="text-lg mr-1">{getCurrentLanguage().flag}</span>
        <span className="font-medium">{getCurrentLanguage().code.toUpperCase()}</span>
        <motion.span
          variants={iconVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.2 }}
        >
          <FiChevronDown />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-12 right-0 bg-tertiary rounded-md shadow-lg py-1 min-w-[160px] text-lightest-gray"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {LANGUAGES.map((language) => (
              <button
                key={language.code}
                className={`w-full text-left px-4 py-2 hover:bg-secondary/20 flex items-center space-x-2 ${
                  currentLang === language.code ? 'bg-secondary/10 text-secondary' : ''
                }`}
                onClick={() => handleLanguageSelect(language.code)}
              >
                <span className="text-lg mr-2">{language.flag}</span>
                <span>{language.name}</span>
                {currentLang === language.code && (
                  <motion.span
                    className="ml-auto"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    •
                  </motion.span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher; 