import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPrinter } from 'react-icons/fi';
import { useTranslation } from '../context/TranslationContext';

const PrintButton = () => {
  const [isPrinting, setIsPrinting] = useState(false);
  const { translate } = useTranslation();

  // Handle print action
  const handlePrint = () => {
    // Track print attempt in analytics if available
    if (window.portfolioAnalytics) {
      window.portfolioAnalytics.trackEvent('print_portfolio');
    }
    
    setIsPrinting(true);
    
    // Add print-specific styles
    const style = document.createElement('style');
    style.id = 'print-styles';
    style.innerHTML = `
      @media print {
        /* Hide elements not needed for print */
        nav, footer, .scroll-dots, .scroll-to-top, .theme-switch, 
        .language-switcher, .accessibility-controls, button:not(.skill-item),
        .audio-controls, .cursor, .page-progress, .enhanced-background,
        .noise-layer, .skip-to-content, .animated-background {
          display: none !important;
        }
        
        /* Reset page styles for print */
        body, html {
          background-color: white !important;
          color: black !important;
          font-size: 12pt !important;
          line-height: 1.5 !important;
          width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          overflow: visible !important;
        }
        
        /* Ensure all sections are visible and properly formatted */
        section {
          break-inside: avoid;
          page-break-inside: avoid;
          opacity: 1 !important;
          transform: none !important;
          height: auto !important;
          min-height: auto !important;
          max-width: 100% !important;
          padding: 1.5cm 1cm !important;
          margin: 0 !important;
          background: none !important;
          position: relative !important;
          display: block !important;
        }
        
        /* Add section titles for print clarity */
        section::before {
          content: attr(data-print-title);
          display: block;
          font-size: 18pt;
          font-weight: bold;
          margin-bottom: 1cm;
          text-align: center;
          border-bottom: 1pt solid #333;
          padding-bottom: 0.5cm;
        }
        
        /* Format text for better printing */
        h1, h2, h3, h4, h5, h6 {
          color: black !important;
          page-break-after: avoid;
        }
        
        h1 { font-size: 24pt !important; }
        h2 { font-size: 18pt !important; }
        h3 { font-size: 14pt !important; }
        
        p, li, td, th, a {
          color: black !important;
          font-size: 12pt !important;
        }
        
        a {
          text-decoration: underline !important;
        }
        
        /* Format project cards for print */
        .project-card {
          break-inside: avoid;
          page-break-inside: avoid;
          display: block !important;
          border: 1pt solid #ccc !important;
          padding: 1cm !important;
          margin-bottom: 1cm !important;
          box-shadow: none !important;
          transform: none !important;
        }
        
        /* Add contact info header for print */
        @page {
          margin: 2cm;
          @top-center {
            content: "Ghassen Kharrat - Full Stack Developer";
            font-size: 10pt;
          }
          @bottom-center {
            content: "Page " counter(page);
            font-size: 10pt;
          }
        }
        
        /* Ensure images print properly */
        img {
          max-width: 100% !important;
          page-break-inside: avoid;
        }
        
        /* Add print-specific contact information */
        #contact-print-info {
          display: block !important;
          border-top: 1pt solid #333;
          margin-top: 1cm;
          padding-top: 1cm;
          text-align: center;
        }
      }
    `;
    document.head.appendChild(style);
    
    // Create a container for print-specific contact information
    const contactInfo = document.createElement('div');
    contactInfo.id = 'contact-print-info';
    contactInfo.innerHTML = `
      <p><strong>Ghassen Kharrat</strong> | Full Stack Developer</p>
      <p>Email: contact@ghassenkharrat.com | Phone: +216 123 456 789</p>
      <p>Website: www.ghassenkharrat.com | GitHub: github.com/ghassenkharrat</p>
      <p><small>This portfolio was printed on ${new Date().toLocaleDateString()}</small></p>
    `;
    document.body.appendChild(contactInfo);
    
    // Add data-print-title attribute to all sections for print headings
    document.querySelectorAll('section').forEach(section => {
      const sectionId = section.id;
      switch(sectionId) {
        case 'hero':
          section.setAttribute('data-print-title', 'Ghassen Kharrat - Full Stack Developer');
          break;
        case 'about':
          section.setAttribute('data-print-title', translate('about.title'));
          break;
        case 'projects':
          section.setAttribute('data-print-title', translate('projects.title'));
          break;
        case 'skills':
          section.setAttribute('data-print-title', translate('skills.title'));
          break;
        case 'contact':
          section.setAttribute('data-print-title', translate('contact.title'));
          break;
        default:
          section.setAttribute('data-print-title', sectionId.charAt(0).toUpperCase() + sectionId.slice(1));
      }
    });
    
    // Print the document
    setTimeout(() => {
      window.print();
      
      // Clean up after printing
      setTimeout(() => {
        document.head.removeChild(style);
        document.body.removeChild(contactInfo);
        setIsPrinting(false);
      }, 1000);
    }, 500);
  };

  return (
    <div className="fixed bottom-5 left-5 z-50">
      <motion.button
        className="flex items-center space-x-2 bg-tertiary text-lightest-gray px-3 py-2 rounded-md shadow-lg hover:bg-tertiary/80 focus:outline-none focus:ring-2 focus:ring-secondary"
        onClick={handlePrint}
        disabled={isPrinting}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={isPrinting ? { opacity: 0.7 } : { opacity: 1 }}
        aria-label={translate('print.portfolio')}
        title={translate('print.portfolio')}
      >
        <FiPrinter className="mr-2" />
        <span>{isPrinting ? translate('print.preparing') : translate('print.portfolio')}</span>
      </motion.button>
    </div>
  );
};

export default PrintButton; 