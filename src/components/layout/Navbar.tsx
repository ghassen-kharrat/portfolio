import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', url: '#home' },
    { name: 'About', url: '#about' },
    { name: 'Skills', url: '#skills' },
    { name: 'Experience', url: '#experience' },
    { name: 'Projects', url: '#projects' },
    { name: 'Contact', url: '#contact' },
  ];

  return (
    <header 
      className={`fixed w-full top-0 z-50 px-6 md:px-12 py-4 transition-all duration-300 ${
        scrolled ? 'bg-primary/90 backdrop-blur shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto flex justify-between items-center">
        <a 
          href="#home" 
          className="text-2xl font-bold text-secondary font-mono"
        >
          GK
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8">
          {navLinks.map((link, index) => (
            <motion.li 
              key={link.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <a 
                href={link.url} 
                className="nav-link"
                onClick={(e) => {
                  console.log(`Clicked on ${link.name} link`);
                  // If it's a hash link, handle smooth scrolling manually
                  if (link.url.startsWith('#')) {
                    e.preventDefault();
                    const element = document.getElementById(link.url.substring(1));
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
              >
                {link.name}
              </a>
            </motion.li>
          ))}
          <motion.li
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: navLinks.length * 0.1 }}
          >
            <a 
              href="/Full stack Developer.pdf" 
              className="btn-primary"
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              Resume
            </a>
          </motion.li>
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-secondary text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-primary/95 md:hidden pt-24 px-8"
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.3 }}
        >
          <ul className="flex flex-col items-center space-y-6">
            {navLinks.map((link, index) => (
              <motion.li 
                key={link.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="w-full text-center"
              >
                <a 
                  href={link.url} 
                  className="text-xl nav-link block py-2"
                  onClick={(e) => {
                    console.log(`Clicked on ${link.name} link`);
                    // If it's a hash link, handle smooth scrolling manually
                    if (link.url.startsWith('#')) {
                      e.preventDefault();
                      const element = document.getElementById(link.url.substring(1));
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                    // Close mobile menu if open
                    setIsOpen(false);
                  }}
                >
                  {link.name}
                </a>
              </motion.li>
            ))}
            <motion.li
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: navLinks.length * 0.1 }}
              className="w-full text-center mt-4"
            >
              <a 
                href="/Full stack Developer.pdf" 
                className="btn-primary inline-block mt-4"
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                Resume
              </a>
            </motion.li>
          </ul>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar; 