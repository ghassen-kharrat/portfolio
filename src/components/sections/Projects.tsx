import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FiFolder, FiGithub, FiExternalLink, FiChevronLeft, FiChevronRight, FiX, FiMaximize2 } from 'react-icons/fi';
import ProjectShowcase from '../3d/ProjectShowcase';
import ParticleBackground from '../ParticleBackground';
import AnimatedSectionBackground from '../AnimatedSectionBackground';
import SectionTitle from '../SectionTitle';

const Projects = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showGuide, setShowGuide] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  const featuredProjects = [
    {
      title: 'JCI Kairouan Platform',
      description: 'A comprehensive full-stack web application developed for JCI (Junior Chamber International) Kairouan chapter, featuring user authentication, social networking, real-time chat, and AI-powered chatbot assistance.',
      longDescription: 'A modern web platform that serves as the digital hub for JCI Kairouan. The application includes robust user authentication and profile management, social media features for posts and comments, real-time chat functionality (both private and public), an AI-powered chatbot assistant, comprehensive admin dashboard, and multilingual support (English and French). Built with scalability and user experience in mind.',
      image: '/assets/jcilogo.png',
      demoVideo: '/assets/jci-demo.mp4',
      additionalImages: [
        '/assets/jci-dashboard.png',
        '/assets/jci-chat.png',
        '/assets/jci-profile.png'
      ],
      tech: ['React', 'Node.js', 'MySQL', 'Socket.io', 'Material UI', 'Google Generative AI'],
      highlights: [
        'Implemented real-time chat system using Socket.io with both private and public channels',
        'Integrated Google Generative AI (Gemini) for intelligent chatbot assistance',
        'Built a comprehensive admin dashboard with Chart.js for data visualization',
        'Developed multilingual support system with dynamic content management'
      ],
      technicalDetails: {
        backend: [
          'Node.js & Express for server framework',
          'MySQL & Sequelize for database and ORM',
          'Socket.io for real-time communication',
          'JWT for authentication',
          'Google Generative AI (Gemini) for chatbot'
        ],
        frontend: [
          'React with Vite for build tooling',
          'Material UI for component library',
          'React Router for navigation',
          'Zustand for state management',
          'Chart.js & Recharts for data visualization'
        ],
        deployment: [
          'Docker containerization',
          'CI/CD with GitHub Actions',
          'AWS hosting infrastructure'
        ]
      },
      links: {
        github: 'https://github.com/ghassen-kharrat/jci-platform',
        external: 'https://jci-kairouan.example.com',
      },
    },
    {
      title: 'Fallah SMART – Agricultural App',
      description: 'A comprehensive smart farming application designed to streamline agricultural operations and improve productivity. The app integrates stock management with low-stock alerts, AI-based plant scanning for disease detection, and financial tracking tools.',
      longDescription: 'Fallah SMART is a mobile platform that brings smart technology to farming operations. It includes an intuitive stock management system with automated alerts when supplies run low, AI-powered image recognition to identify plant diseases and suggest treatments, and comprehensive financial tracking tools to monitor expenses, revenues, and profitability.',
      image: '/assets/fallehlogo.png',
      isVideo: false,
      tech: ['React Native', 'Node.js', 'TensorFlow', 'MongoDB', 'Express'],
      highlights: [
        'Implemented real-time notifications for stock management',
        'Integrated TensorFlow for image recognition and plant disease detection',
        'Built a BI module generating performance insights and personalized advice',
        'Created a responsive UI for both tablet and mobile devices'
      ],
      links: {
        github: 'https://github.com/ghassen-kharrat/fallah-smart',
        external: 'https://fallah-smart.example.com',
      },
    },
    {
      title: 'Game Zone – Gaming Platform',
      description: 'An interactive gaming platform featuring 2D/3D games, user authentication, and live chat functionality. The platform includes a comprehensive scoring system and real-time multiplayer capabilities.',
      longDescription: 'Game Zone is a web-based gaming platform that offers a variety of 2D and 3D games. The platform includes user authentication to track progress and achievements, a sophisticated scoring system that spans across different games, and real-time chat functionality implemented with Socket.io for player communication and community building.',
      image: '/assets/gamelogo.png',
      tech: ['React', 'Three.js', 'Socket.io', 'Express', 'MongoDB'],
      highlights: [
        'Developed multiple game prototypes using Three.js for 3D rendering',
        'Implemented a unified scoring and achievement system',
        'Created real-time chat rooms using Socket.io',
        'Built user authentication with JWT and role-based access'
      ],
      links: {
        github: 'https://github.com/ghassen-kharrat/game-zone',
        external: 'https://game-zone.example.com',
      },
    },
    {
      title: 'Dish Dash – Food Delivery App',
      description: 'A full-featured food delivery application with real-time order tracking and secure payment processing. The app connects customers with restaurants and delivery personnel through an intuitive interface.',
      longDescription: 'Dish Dash is a comprehensive food delivery solution connecting customers, restaurants, and delivery personnel. The application features real-time order tracking, allowing users to follow their orders from preparation to delivery. The platform integrates Stripe for secure payment processing and includes a review and rating system for restaurants and delivery personnel.',
      image: '/assets/disshlogo.png',
      tech: ['Next.js', 'GraphQL', 'Stripe', 'MongoDB', 'Tailwind CSS'],
      highlights: [
        'Implemented real-time order tracking with WebSockets',
        'Integrated Stripe payment gateway for secure transactions',
        'Developed a restaurant dashboard for order management',
        'Created an algorithm for efficient delivery routing'
      ],
      links: {
        github: 'https://github.com/ghassen-kharrat/dish-dash',
        external: 'https://dish-dash.example.com',
      },
    },
  ];

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev === featuredProjects.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? featuredProjects.length - 1 : prev - 1));
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Updated slide variants for 3D stack effect
  const slideVariants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 90 : -90,
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      zIndex: 0,
    }),
    center: {
      rotateY: 0,
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 1,
      transition: {
        duration: 0.8,
        type: "spring",
        bounce: 0.2
      }
    },
    exit: (direction: number) => ({
      rotateY: direction < 0 ? 90 : -90,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      zIndex: 0,
      transition: {
        duration: 0.8,
        type: "spring",
        bounce: 0.2
      }
    }),
  };
  
  // Add tilt effect to project cards
  useEffect(() => {
    const handleTiltEffect = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.tilt-card');
      
      cards.forEach(card => {
        const cardElement = card as HTMLElement;
        const rect = cardElement.getBoundingClientRect();
        
        // Check if mouse is over this card
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          const mouseX = e.clientX - centerX;
          const mouseY = e.clientY - centerY;
          
          // Calculate rotation based on mouse position (max 10 degrees)
          const rotateX = mouseY / centerY * -10;
          const rotateY = mouseX / centerX * 10;
          
          // Apply rotation
          cardElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        } else {
          // Reset rotation when mouse is not over this card
          cardElement.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        }
      });
    };
    
    document.addEventListener('mousemove', handleTiltEffect);
    
    return () => {
      document.removeEventListener('mousemove', handleTiltEffect);
    };
  }, []);

  // Modal Component
  const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 z-50 overflow-y-auto"
        onClick={onClose}
        style={{ willChange: 'opacity' }}
      >
        <div
          className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center"
          onClick={e => e.stopPropagation()}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-primary rounded-lg max-w-5xl w-full relative"
            style={{ 
              transformOrigin: 'center',
              willChange: 'transform, opacity',
              transform: 'none',
              maxHeight: '85vh'
            }}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 bg-primary/70 hover:bg-secondary text-secondary hover:text-primary p-2 rounded-full transition-colors duration-300 text-3xl z-10 shadow-lg backdrop-blur-sm"
              aria-label="Close modal"
            >
              <FiX />
            </button>

            <div className="p-6 md:p-8 overflow-y-auto max-h-[85vh] overscroll-contain" style={{ transform: 'none' }}>
              <h2 className="text-3xl font-bold text-lightest-gray mb-4">{project.title}</h2>
              
              {/* Media Section */}
              <div className="mb-8">
                {project.demoVideo ? (
                  <video
                    src={project.demoVideo}
                    controls
                    className="w-full max-h-[400px] object-contain rounded-lg mb-4"
                  />
                ) : (
                  <div className="flex justify-center">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="max-w-full max-h-[300px] object-contain rounded-lg mb-4"
                    />
                  </div>
                )}
                
                {project.additionalImages && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {project.additionalImages.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`${project.title} screenshot ${index + 1}`}
                        className="rounded-lg w-full h-40 object-cover"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Project Description */}
              <div className="prose prose-invert max-w-none mb-8">
                <h3 className="text-xl font-semibold text-secondary mb-4">Project Overview</h3>
                <p className="text-light-gray mb-6">{project.longDescription}</p>

                <h3 className="text-xl font-semibold text-secondary mb-4">Key Features</h3>
                <ul className="space-y-2 mb-6">
                  {project.highlights.map((highlight, index) => (
                    <li key={index} className="text-light-gray flex items-start">
                      <span className="text-secondary mr-2 flex-shrink-0">▹</span>
                      {highlight}
                    </li>
                  ))}
                </ul>

                <h3 className="text-xl font-semibold text-secondary mb-4">Technical Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {project.technicalDetails && Object.entries(project.technicalDetails).map(([category, details]) => (
                    <div key={category}>
                      <h4 className="text-lg font-medium text-lightest-gray mb-2 capitalize">{category}</h4>
                      <ul className="space-y-1">
                        {details.map((detail, index) => (
                          <li key={index} className="text-light-gray text-sm">
                            • {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex gap-4">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-secondary/20 hover:bg-secondary/40 rounded-lg text-white transition-colors duration-300"
                  >
                    <FiGithub /> View Source
                  </a>
                )}
                {project.links.external && (
                  <a
                    href={project.links.external}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-secondary/20 hover:bg-secondary/40 rounded-lg text-white transition-colors duration-300"
                  >
                    <FiExternalLink /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-20 px-6 md:px-12 bg-primary relative min-h-screen overflow-hidden"
    >
      <AnimatedSectionBackground opacity={0.3} color="secondary" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionTitle 
          title="Featured Projects" 
          subtitle="04. What I've Built"
          align="left"
          highlightColor="secondary"
        />
        
        {/* Card Stack */}
        <div className="relative h-[600px] md:h-[700px] mb-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[800px] aspect-[16/10]">
            {featuredProjects.map((project, index) => {
              const offset = (index - currentSlide + featuredProjects.length) % featuredProjects.length;
              const isActive = index === currentSlide;

              return (
                <motion.div
                  key={project.title}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'left center',
                    cursor: isActive ? 'grab' : 'auto',
                  }}
                  initial={false}
                  animate={{
                    rotateY: isActive ? 0 : -5,
                    rotateZ: isActive ? 0 : offset * 2,
                    y: offset * -4,
                    scale: 1 - (offset * 0.05),
                    zIndex: featuredProjects.length - offset,
                    opacity: isActive ? 1 : 0.6 - (offset * 0.15),
                  }}
                  whileHover={isActive ? {
                    rotateZ: -2,
                    y: -10,
                    transition: { duration: 0.2 }
                  } : {}}
                  drag={isActive ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  onDragEnd={(e, { offset, velocity }) => {
                    if (offset.x > 100) prevSlide();
                    else if (offset.x < -100) nextSlide();
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    mass: 1,
                  }}
                  className="will-change-transform"
                >
                  <div className={`w-full h-full rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] border-2 ${isActive ? 'bg-[#0f172a] border-secondary' : 'bg-[#0f172a] border-secondary/50'}`}>
                    {/* Project Media */}
                    <div className="h-[60%] relative overflow-hidden bg-gradient-to-br from-[#0f172a] to-black">
                      {/* Remove the dark overlay for better visibility */}
                      {project.isVideo ? (
                        <video
                          src={project.image}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className={`w-full h-full object-cover ${isActive ? 'opacity-100' : 'opacity-40'}`}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center p-8">
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            className={`w-full h-full ${
                              // Special handling for each project's logo
                              project.title.includes('JCI') ? 'object-contain' :
                              project.title.includes('Fallah') ? 'object-contain max-h-[80%]' :
                              project.title.includes('Game') ? 'object-contain' :
                              project.title.includes('Dish') ? 'object-contain' :
                              'object-cover'
                            } transition-all duration-300 ${isActive ? 'opacity-100 scale-105' : 'opacity-40 scale-95'}`}
                          />
                        </div>
                      )}
                      {/* Subtle gradient overlay for active cards only */}
                      {!isActive && (
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-[#0f172a]" />
                      )}
                    </div>

                    {/* Project Info */}
                    <div className="h-[40%] p-8 relative bg-[#0f172a]">
                      <div className="absolute -top-12 right-4">
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="bg-secondary text-white p-3 rounded-full transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-secondary/50"
                        >
                          <FiMaximize2 className="text-xl" />
                        </button>
                      </div>

                      <div className="flex flex-col h-full">
                        <p className="text-secondary font-mono tracking-wider uppercase text-sm mb-2">Featured Project</p>
                        <h3 className="text-3xl font-bold text-white mb-4">{project.title}</h3>
                        
                        <p className="text-white mb-6 line-clamp-2">{project.description}</p>
                        
                        <div className="mt-auto">
                          <div className="flex flex-wrap gap-3 mb-4">
                            {project.tech.slice(0, 4).map((tech) => (
                              <span 
                                key={tech} 
                                className="px-3 py-1 bg-secondary text-white text-sm rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          <div className="flex gap-4 text-white">
                            {project.links.github && (
                              <a 
                                href={project.links.github}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:text-secondary transition-colors duration-300"
                              >
                                <FiGithub className="text-xl" />
                              </a>
                            )}
                            {project.links.external && (
                              <a 
                                href={project.links.external}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:text-secondary transition-colors duration-300"
                              >
                                <FiExternalLink className="text-xl" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Instructions */}
          <div className="absolute bottom-[-3rem] left-1/2 transform -translate-x-1/2 flex items-center gap-4 text-white/70 font-mono text-sm">
            <span className="flex items-center gap-2">
              <FiChevronLeft /> Drag cards or use arrow keys <FiChevronRight />
            </span>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;