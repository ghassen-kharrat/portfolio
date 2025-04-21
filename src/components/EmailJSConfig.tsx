import { useEffect } from 'react';
import emailjs from 'emailjs-com';

// Replace with your actual EmailJS user ID
const EMAILJS_USER_ID = "XifgOz3FcoOSsHFvG";

const EmailJSConfig = () => {
  useEffect(() => {
    // Initialize EmailJS with your user ID
    emailjs.init(EMAILJS_USER_ID);
    
    console.log("EmailJS initialized");
  }, []);

  return null; // This component doesn't render anything
};

export default EmailJSConfig; 