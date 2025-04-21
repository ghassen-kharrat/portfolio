import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiMail, FiPhone, FiLinkedin, FiGithub, FiSend, FiMessageCircle, FiUser, FiInfo, FiMapPin } from 'react-icons/fi';
import AnimatedSectionBackground from '../AnimatedSectionBackground';
import SectionTitle from '../SectionTitle';
import { useNotification } from '../../context/NotificationContext';
import emailjs from 'emailjs-com';

// Your EmailJS service ID, template ID, and user ID
const EMAILJS_SERVICE_ID = "service_qd0pu8q"; // Gmail service ID
const EMAILJS_TEMPLATE_ID = "template_48po5ux"; // Contact Us template ID
const EMAILJS_USER_ID = "XifgOz3FcoOSsHFvG"; // Your public key

const Contact = () => {
  const { showSuccess, showError } = useNotification();
  const formRef = useRef<HTMLFormElement>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const formSectionRef = useRef(null);
  const isInView = useInView(formSectionRef, { once: false, amount: 0.3 });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null
  });

  // Reset animation when section comes into view
  useEffect(() => {
    if (isInView) {
      // Any additional animation triggers can go here
    }
  }, [isInView]);

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email before submitting
    if (!validateEmail(formData.email)) {
      showError("Please enter a valid email address.");
      return;
    }
    
    setFormStatus({ isSubmitting: true, isSubmitted: false, error: null });
    
    // Prepare the template parameters for EmailJS
    const templateParams = {
      name: formData.name,
      email: formData.email,
      title: formData.subject,
      message: formData.message,
      reply_to: formData.email,
    };

    console.log("Sending email with parameters:", templateParams);
    console.log("Using service ID:", EMAILJS_SERVICE_ID);
    console.log("Using template ID:", EMAILJS_TEMPLATE_ID);

    // Send the email using EmailJS
    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_USER_ID
    )
    .then((response) => {
      console.log("Email sent successfully! Response:", response);
      setFormStatus({ isSubmitting: false, isSubmitted: true, error: null });
      
      // Show success notification
      showSuccess("Your message has been sent successfully! I'll get back to you soon.");
      
      // Reset form data
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status after delay
      setTimeout(() => {
        setFormStatus({ isSubmitting: false, isSubmitted: false, error: null });
      }, 5000);
    })
    .catch((error) => {
      console.error("Failed to send email. Error details:", error);
      setFormStatus({ isSubmitting: false, isSubmitted: false, error: error.message });
      showError("Failed to send your message. Please try again later.");
    });
  };

  // Animation variants
  const formFieldVariants = {
    unfocused: { scale: 1, y: 0 },
    focused: { scale: 1.02, y: -5 }
  };
  
  const formContainerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const formItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <section id="contact" className="py-20 px-6 md:px-12 bg-primary" ref={formSectionRef}>
      <AnimatedSectionBackground opacity={0.3} color="secondary" />
      <div className="max-w-6xl mx-auto">
        <SectionTitle 
          title="Get In Touch" 
          subtitle="05. Contact Me"
          align="left"
          highlightColor="secondary"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-lightest-gray mb-6">Contact Information</h3>
            <p className="text-light-gray mb-8">
              I'm currently open to new opportunities and collaborations. Feel free to reach out through 
              any of the contact methods below or use the form to send me a message directly.
            </p>

            <div className="space-y-6">
              <motion.div 
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="bg-tertiary p-3 rounded-lg transform-gpu hover:scale-110 transition-transform duration-300">
                  <FiMail className="text-secondary text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-lightest-gray">Email</h4>
                  <a 
                    href="mailto:kharrat.ghassen@gmail.com" 
                    className="text-light-gray hover:text-secondary transition-colors duration-300"
                  >
                    kharrat.ghassen@gmail.com
                  </a>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-tertiary p-3 rounded-lg transform-gpu hover:scale-110 transition-transform duration-300">
                  <FiPhone className="text-secondary text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-lightest-gray">Phone</h4>
                  <a 
                    href="tel:+21655461811" 
                    className="text-light-gray hover:text-secondary transition-colors duration-300"
                  >
                    +216 55461811
                  </a>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="bg-tertiary p-3 rounded-lg transform-gpu hover:scale-110 transition-transform duration-300">
                  <FiMapPin className="text-secondary text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-lightest-gray">Location</h4>
                  <p className="text-light-gray">
                    Tunisia
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="bg-tertiary p-3 rounded-lg transform-gpu hover:scale-110 transition-transform duration-300">
                  <FiLinkedin className="text-secondary text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-lightest-gray">LinkedIn</h4>
                  <a 
                    href="https://linkedin.com/in/kharrat-ghassen-63242461" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-light-gray hover:text-secondary transition-colors duration-300"
                  >
                    kharrat-ghassen-63242461
                  </a>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="bg-tertiary p-3 rounded-lg transform-gpu hover:scale-110 transition-transform duration-300">
                  <FiGithub className="text-secondary text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-lightest-gray">GitHub</h4>
                  <a 
                    href="https://github.com/ghassen-kharrat" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-light-gray hover:text-secondary transition-colors duration-300"
                  >
                    github.com/ghassen-kharrat
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div 
            className="lg:col-span-3 bg-tertiary/30 p-8 rounded-lg border border-light-gray/10 backdrop-blur-sm"
            variants={formContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h3 
              className="text-2xl font-bold text-lightest-gray mb-6"
              variants={formItemVariants}
            >
              Send Me a Message
            </motion.h3>
            
            <AnimatePresence mode="wait">
              {formStatus.isSubmitted ? (
                <motion.div 
                  className="bg-secondary/10 border border-secondary text-lightest-gray p-6 rounded-lg flex items-start space-x-3"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiInfo className="text-secondary text-xl flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-secondary">Message Sent!</h4>
                    <p className="mt-2">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                    <motion.button 
                      className="mt-4 text-secondary border border-secondary px-4 py-2 rounded text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFormStatus({ isSubmitting: false, isSubmitted: false, error: null })}
                    >
                      Send Another Message
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.form 
                  ref={formRef}
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                  variants={formContainerVariants}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div variants={formItemVariants}>
                      <motion.div
                        variants={formFieldVariants}
                        animate={focusedField === 'name' ? 'focused' : 'unfocused'}
                      >
                        <label htmlFor="name" className="block text-light-gray mb-2">
                          <FiUser className="inline mr-2" />
                          Your Name
                        </label>
                        <input 
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => handleFocus('name')}
                          onBlur={handleBlur}
                          required
                          className="w-full bg-primary border border-light-gray/20 text-lightest-gray px-4 py-3 rounded focus:outline-none focus:border-secondary transition-colors duration-300"
                          placeholder="John Doe"
                        />
                      </motion.div>
                    </motion.div>
                    
                    <motion.div variants={formItemVariants}>
                      <motion.div
                        variants={formFieldVariants}
                        animate={focusedField === 'email' ? 'focused' : 'unfocused'}
                      >
                        <label htmlFor="email" className="block text-light-gray mb-2">
                          <FiMail className="inline mr-2" />
                          Your Email
                        </label>
                        <input 
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => handleFocus('email')}
                          onBlur={handleBlur}
                          required
                          className="w-full bg-primary border border-light-gray/20 text-lightest-gray px-4 py-3 rounded focus:outline-none focus:border-secondary transition-colors duration-300"
                          placeholder="example@email.com"
                        />
                      </motion.div>
                    </motion.div>
                  </div>
                  
                  <motion.div variants={formItemVariants}>
                    <motion.div
                      variants={formFieldVariants}
                      animate={focusedField === 'subject' ? 'focused' : 'unfocused'}
                    >
                      <label htmlFor="subject" className="block text-light-gray mb-2">
                        <FiInfo className="inline mr-2" />
                        Subject
                      </label>
                      <input 
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => handleFocus('subject')}
                        onBlur={handleBlur}
                        required
                        className="w-full bg-primary border border-light-gray/20 text-lightest-gray px-4 py-3 rounded focus:outline-none focus:border-secondary transition-colors duration-300"
                        placeholder="Project Inquiry"
                      />
                    </motion.div>
                  </motion.div>
                  
                  <motion.div variants={formItemVariants}>
                    <motion.div
                      variants={formFieldVariants}
                      animate={focusedField === 'message' ? 'focused' : 'unfocused'}
                    >
                      <label htmlFor="message" className="block text-light-gray mb-2">
                        <FiMessageCircle className="inline mr-2" />
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => handleFocus('message')}
                        onBlur={handleBlur}
                        required
                        rows={5}
                        className="w-full bg-primary border border-light-gray/20 text-lightest-gray px-4 py-3 rounded focus:outline-none focus:border-secondary transition-colors duration-300"
                        placeholder="Hello, I'd like to discuss a project..."
                      ></textarea>
                    </motion.div>
                  </motion.div>
                  
                  <motion.div variants={formItemVariants}>
                    <motion.button 
                      type="submit"
                      disabled={formStatus.isSubmitting}
                      className="relative overflow-hidden btn-primary flex items-center space-x-2 group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.span
                        className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                        initial={false}
                        animate={{ scale: formStatus.isSubmitting ? 1.5 : 1 }}
                      />
                      
                      {formStatus.isSubmitting ? (
                        <>
                          <span className="animate-spin inline-block w-4 h-4 border-2 border-secondary border-t-transparent rounded-full"></span>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <FiSend className="transform-gpu group-hover:translate-x-1 transition-transform duration-300" />
                          <span>Send Message</span>
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 