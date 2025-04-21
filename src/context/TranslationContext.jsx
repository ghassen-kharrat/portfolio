import React, { createContext, useState, useContext, useEffect } from 'react';

// Initial translations for English (default language)
const TRANSLATIONS = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',
    
    // Hero section
    'hero.greeting': 'Hello, I am',
    'hero.role': 'Full Stack Developer',
    'hero.description': 'I build exceptional digital experiences that blend creativity with technical expertise.',
    'hero.cta': 'View My Work',
    
    // About section
    'about.title': 'About Me',
    'about.subtitle': 'My journey & experience',
    'about.p1': 'I am a passionate full-stack developer with a focus on creating intuitive and dynamic user experiences.',
    'about.p2': 'With a background in computer science and years of experience in web development, I enjoy solving complex problems and bringing creative ideas to life.',
    'about.p3': 'When I\'m not coding, you can find me exploring new technologies, contributing to open source projects, or enjoying outdoor activities.',
    
    // Projects section
    'projects.title': 'Projects',
    'projects.subtitle': 'Some things I\'ve built',
    'projects.viewAll': 'View All Projects',
    'projects.viewLive': 'Live Demo',
    'projects.viewCode': 'Source Code',
    
    // Skills section
    'skills.title': 'Skills',
    'skills.subtitle': 'What I bring to the table',
    'skills.frontend': 'Frontend Development',
    'skills.backend': 'Backend Development',
    'skills.tools': 'Tools & Technologies',
    
    // Contact section
    'contact.title': 'Contact',
    'contact.subtitle': 'Get in touch',
    'contact.formName': 'Name',
    'contact.formEmail': 'Email',
    'contact.formMessage': 'Message',
    'contact.formSubmit': 'Send Message',
    'contact.formSuccess': 'Message sent successfully!',
    'contact.formError': 'There was an error sending your message. Please try again.',
    
    // Footer
    'footer.copyright': 'All rights reserved',
    'footer.builtWith': 'Built with',
    
    // Accessibility
    'a11y.skipToContent': 'Skip to content',
    'a11y.darkMode': 'Dark Mode',
    'a11y.lightMode': 'Light Mode',
    'a11y.openMenu': 'Open Menu',
    'a11y.closeMenu': 'Close Menu',
    
    // Misc
    'loading': 'Loading...',
    'readMore': 'Read More',
    'readLess': 'Read Less',
    'scrollToTop': 'Scroll to top',
    'downloadCV': 'Download CV',
    
    // Print feature
    'print.portfolio': 'Print Portfolio',
    'print.preparing': 'Preparing...',
    'print.ready': 'Ready to print',
    
    // Share feature
    'share.portfolio': 'Share Portfolio',
    'share.title': 'Share via',
    'share.copyLink': 'Copy Link',
    'share.copied': 'Link Copied!',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À Propos',
    'nav.projects': 'Projets',
    'nav.skills': 'Compétences',
    'nav.contact': 'Contact',
    
    // Hero section
    'hero.greeting': 'Bonjour, je suis',
    'hero.role': 'Développeur Full Stack',
    'hero.description': 'Je construis des expériences numériques exceptionnelles qui associent créativité et expertise technique.',
    'hero.cta': 'Voir mon travail',
    
    // About section
    'about.title': 'À Propos',
    'about.subtitle': 'Mon parcours et expérience',
    'about.p1': 'Je suis un développeur full-stack passionné, axé sur la création d\'expériences utilisateur intuitives et dynamiques.',
    'about.p2': 'Avec une formation en informatique et des années d\'expérience en développement web, j\'aime résoudre des problèmes complexes et donner vie à des idées créatives.',
    'about.p3': 'Quand je ne code pas, vous pouvez me trouver en train d\'explorer de nouvelles technologies, de contribuer à des projets open source ou de profiter d\'activités de plein air.',
    
    // Projects section
    'projects.title': 'Projets',
    'projects.subtitle': 'Ce que j\'ai construit',
    'projects.viewAll': 'Voir tous les projets',
    'projects.viewLive': 'Démo en direct',
    'projects.viewCode': 'Code source',
    
    // Skills section
    'skills.title': 'Compétences',
    'skills.subtitle': 'Ce que j\'apporte',
    'skills.frontend': 'Développement Frontend',
    'skills.backend': 'Développement Backend',
    'skills.tools': 'Outils et Technologies',
    
    // Contact section
    'contact.title': 'Contact',
    'contact.subtitle': 'Entrez en contact',
    'contact.formName': 'Nom',
    'contact.formEmail': 'Email',
    'contact.formMessage': 'Message',
    'contact.formSubmit': 'Envoyer le message',
    'contact.formSuccess': 'Message envoyé avec succès !',
    'contact.formError': 'Une erreur s\'est produite lors de l\'envoi de votre message. Veuillez réessayer.',
    
    // Footer
    'footer.copyright': 'Tous droits réservés',
    'footer.builtWith': 'Construit avec',
    
    // Accessibility
    'a11y.skipToContent': 'Passer au contenu',
    'a11y.darkMode': 'Mode sombre',
    'a11y.lightMode': 'Mode clair',
    'a11y.openMenu': 'Ouvrir le menu',
    'a11y.closeMenu': 'Fermer le menu',
    
    // Misc
    'loading': 'Chargement...',
    'readMore': 'Lire plus',
    'readLess': 'Lire moins',
    'scrollToTop': 'Remonter en haut',
    'downloadCV': 'Télécharger CV',
    
    // Print feature
    'print.portfolio': 'Imprimer Portfolio',
    'print.preparing': 'Préparation...',
    'print.ready': 'Prêt à imprimer',
    
    // Share feature
    'share.portfolio': 'Partager Portfolio',
    'share.title': 'Partager via',
    'share.copyLink': 'Copier le lien',
    'share.copied': 'Lien copié!',
  },
  // Add more languages as needed
};

// Create the context
const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('portfolioLanguage') || 'en';
  });

  // Update language when changed in localStorage (by LanguageSwitcher)
  useEffect(() => {
    const handleStorageChange = () => {
      const storedLang = localStorage.getItem('portfolioLanguage');
      if (storedLang && storedLang !== language) {
        setLanguage(storedLang);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [language]);

  // Initialize or update document lang attribute
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Get translation function
  const translate = (key, placeholders = {}) => {
    // Get translations for current language, fallback to English if not found
    const translations = TRANSLATIONS[language] || TRANSLATIONS.en;
    
    // Get the translation string
    let translatedText = translations[key] || TRANSLATIONS.en[key] || key;
    
    // Replace placeholders if any
    Object.entries(placeholders).forEach(([placeholder, value]) => {
      translatedText = translatedText.replace(`{${placeholder}}`, value);
    });
    
    return translatedText;
  };

  // Check if the current language is RTL (right-to-left)
  const isRTL = language === 'ar';

  // Update document direction based on language
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    
    // Add/remove RTL class for specific RTL styling
    if (isRTL) {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }, [isRTL]);

  return (
    <TranslationContext.Provider value={{ language, setLanguage, translate, isRTL }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Custom hook to use the translation context
export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

export default TranslationContext; 