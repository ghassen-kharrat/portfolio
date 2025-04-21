import { FiGithub, FiLinkedin, FiMail, FiFileText } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary py-8 border-t border-light-gray/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-light-gray text-sm">
              Designed & Built by Ghassen Kharrat
            </p>
            <p className="text-light-gray/60 text-xs mt-1">
              © {currentYear} All Rights Reserved
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="https://github.com/ghassen-kharrat" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-light-gray hover:text-secondary transition-colors duration-300 text-xl"
              aria-label="GitHub"
            >
              <FiGithub />
            </a>
            <a 
              href="https://linkedin.com/in/kharrat-ghassen-63242461" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-light-gray hover:text-secondary transition-colors duration-300 text-xl"
              aria-label="LinkedIn"
            >
              <FiLinkedin />
            </a>
            <a 
              href="mailto:kharrat.ghassen@gmail.com" 
              className="text-light-gray hover:text-secondary transition-colors duration-300 text-xl"
              aria-label="Email"
            >
              <FiMail />
            </a>
            <a 
              href="/Full stack Developer.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              download
              className="text-light-gray hover:text-secondary transition-colors duration-300 text-xl"
              aria-label="Download CV"
            >
              <FiFileText />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 