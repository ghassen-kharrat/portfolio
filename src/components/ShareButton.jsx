import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShare2, FiTwitter, FiLinkedin, FiFacebook, FiMail, FiLink, FiX } from 'react-icons/fi';
import { useTranslation } from '../context/TranslationContext';

const ShareButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const menuRef = useRef(null);
  const { translate } = useTranslation();
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Reset copy success message after 2 seconds
  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [copySuccess]);
  
  // Share URL and title to use for sharing
  const shareUrl = window.location.href;
  const shareTitle = document.title || 'Ghassen Kharrat | Full Stack Developer';
  
  // Handle different share methods
  const handleShare = (platform) => {
    // Track sharing in analytics if available
    if (window.portfolioAnalytics) {
      window.portfolioAnalytics.trackEvent('share_portfolio', { platform });
    }
    
    let shareLink = '';
    
    switch (platform) {
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'email':
        shareLink = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`Check out this portfolio: ${shareUrl}`)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl).then(() => {
          setCopySuccess(true);
        }).catch(err => {
          console.error('Failed to copy: ', err);
        });
        return;
      default:
        return;
    }
    
    // Open share URL in a new window
    window.open(shareLink, '_blank', 'width=600,height=400');
    
    // Close the menu after sharing
    setIsOpen(false);
  };
  
  // Animation variants
  const menuVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.2,
        staggerChildren: 0.05,
        delayChildren: 0.05
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 10,
      transition: { duration: 0.15 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="fixed right-5 bottom-20 z-50" ref={menuRef}>
      <motion.button
        className="bg-tertiary text-lightest-gray p-3 rounded-full shadow-lg hover:bg-tertiary/80 focus:outline-none focus:ring-2 focus:ring-secondary"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={translate('share.portfolio')}
        title={translate('share.portfolio')}
      >
        <FiShare2 className="text-xl" />
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 right-0 bg-tertiary rounded-lg shadow-xl p-3 min-w-[200px]"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-700">
              <h3 className="text-lightest-gray font-medium">
                {translate('share.title')}
              </h3>
              <motion.button
                onClick={() => setIsOpen(false)}
                className="text-light-gray hover:text-secondary p-1 rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiX />
              </motion.button>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <motion.button
                variants={itemVariants}
                className="flex flex-col items-center justify-center p-2 rounded hover:bg-secondary/20 text-light-gray hover:text-secondary transition-colors"
                onClick={() => handleShare('twitter')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiTwitter className="text-xl mb-1" />
                <span className="text-xs">Twitter</span>
              </motion.button>
              
              <motion.button
                variants={itemVariants}
                className="flex flex-col items-center justify-center p-2 rounded hover:bg-secondary/20 text-light-gray hover:text-secondary transition-colors"
                onClick={() => handleShare('linkedin')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiLinkedin className="text-xl mb-1" />
                <span className="text-xs">LinkedIn</span>
              </motion.button>
              
              <motion.button
                variants={itemVariants}
                className="flex flex-col items-center justify-center p-2 rounded hover:bg-secondary/20 text-light-gray hover:text-secondary transition-colors"
                onClick={() => handleShare('facebook')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiFacebook className="text-xl mb-1" />
                <span className="text-xs">Facebook</span>
              </motion.button>
              
              <motion.button
                variants={itemVariants}
                className="flex flex-col items-center justify-center p-2 rounded hover:bg-secondary/20 text-light-gray hover:text-secondary transition-colors"
                onClick={() => handleShare('email')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiMail className="text-xl mb-1" />
                <span className="text-xs">Email</span>
              </motion.button>
            </div>
            
            <motion.div 
              variants={itemVariants}
              className="mt-2 pt-2 border-t border-gray-700"
            >
              <button
                className="w-full flex items-center justify-center space-x-2 p-2 rounded hover:bg-secondary/20 text-light-gray hover:text-secondary transition-colors"
                onClick={() => handleShare('copy')}
              >
                <FiLink />
                <span>
                  {copySuccess ? translate('share.copied') : translate('share.copyLink')}
                </span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShareButton; 