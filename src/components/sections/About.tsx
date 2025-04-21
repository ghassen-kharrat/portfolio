import { motion, useInView } from 'framer-motion';
import { FiCode, FiDatabase, FiServer, FiSmartphone, FiUser, FiAward, FiBookOpen } from 'react-icons/fi';
import AnimatedSectionBackground from '../AnimatedSectionBackground';
import SectionTitle from '../SectionTitle';

const About = () => {
  const personalInfo = [
    { label: 'Name', value: 'Ghassen Kharrat' },
    { label: 'Age', value: '35' },
    { label: 'Location', value: 'Tunisia' },
    { label: 'Email', value: 'kharrat.ghassen@gmail.com' },
    { label: 'Phone', value: '+216 55461811' },
    { label: 'Available', value: 'Freelance & Full-time' },
  ];

  const education = [
    {
      degree: "Master's in Financial Engineering",
      institution: "ISMAI, Kairouan",
      year: "2013",
      description: "Specialized in financial modeling and investment analysis."
    },
    {
      degree: "Bachelor's in Finance",
      institution: "IHEC, Sousse",
      year: "2011",
      description: "Focused on financial management and business economics."
    }
  ];

  const certifications = [
    {
      name: "Full Stack  Developper",
      issuer: "ReBootKamp Tunisie",
      year: "2024-2025"
    },
   
    {
      name: "Train Of Trainer",
      issuer: "Business Management Group",
      year: "2019"
    }
  ];

  return (
    <section id="about" className="py-20 px-6 md:px-12 bg-primary">
      <AnimatedSectionBackground opacity={0.2} color="secondary" />
      <div className="max-w-6xl mx-auto">
        <SectionTitle 
          title="About Me" 
          subtitle="01. Who I Am"
          align="left"
          highlightColor="secondary"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 order-2 lg:order-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <FiUser className="text-2xl text-secondary" />
              <h3 className="text-2xl font-bold text-lightest-gray">Overview</h3>
            </div>

            <div className="mb-8">             
              <p className="text-light-gray mb-6">
              With a Master’s in Financial Engineering and a robust career spanning web and mobile development, project management, and training, I bring a unique blend of technical expertise and leadership to every endeavor. My journey includes building smart agricultural apps, coordinating EU-funded projects, and empowering communities through education and events.
              </p>
           
            </div>
            <div className="flex items-center gap-3 mb-6">
              <FiUser className="text-2xl text-secondary" />
              <h3 className="text-2xl font-bold text-lightest-gray">Key Strengths</h3>
            </div>

            <div className="mb-8">             
              <p className="text-light-gray mb-6">
              Technical Proficiency: Skilled in React, Node.js, and database management for scalable web solutions.



Leadership: Directed teams and projects for organizations like JCI Tunisia and UNFTK, managing budgets, logistics, and stakeholders.



Cross-Cultural Communication: Fluent in English, French, and Arabic, with experience in international settings.              </p>
           
            </div>
            <div className="flex items-center gap-3 mb-6">
              <FiUser className="text-2xl text-secondary" />
              <h3 className="text-2xl font-bold text-lightest-gray">Personal Touch</h3>
            </div>

            <div className="mb-8">             
              <p className="text-light-gray mb-6">
              "Outside work, I enjoy exploring new tech trends, mentoring young professionals, and engaging in cultural exchanges."              </p>
           
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {personalInfo.map((info, index) => (
                <div key={index} className="flex">
                  <span className="text-secondary font-medium min-w-[120px]">{info.label}:</span>
                  <span className="text-light-gray">{info.value}</span>
                </div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8"
            >
              <a 
                href="/resume.txt" 
                className="btn-primary inline-flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download CV
              </a>
            </motion.div>
          </motion.div>
          
          {/* Education & Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <FiAward className="text-2xl text-secondary" />
              <h3 className="text-2xl font-bold text-lightest-gray">Education</h3>
            </div>
            
            <div className="space-y-6 mb-12">
              {education.map((edu, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                  className="bg-tertiary/50 p-4 rounded-lg relative border-l-2 border-secondary"
                >
                  <div className="absolute -left-1.5 top-5 w-3 h-3 rounded-full bg-secondary"></div>
                  <span className="text-secondary font-mono text-sm">{edu.year}</span>
                  <h4 className="text-lightest-gray font-bold">{edu.degree}</h4>
                  <p className="text-light-gray text-sm">{edu.institution}</p>
                  <p className="text-light-gray/70 text-sm mt-2">{edu.description}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="flex items-center gap-3 mb-6">
              <FiBookOpen className="text-2xl text-secondary" />
              <h3 className="text-2xl font-bold text-lightest-gray">Certifications</h3>
            </div>
            
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
                  className="flex justify-between items-center border-b border-light-gray/10 pb-3"
                >
                  <div>
                    <h4 className="text-lightest-gray font-medium">{cert.name}</h4>
                    <p className="text-light-gray text-sm">{cert.issuer}</p>
                  </div>
                  <span className="text-secondary font-mono text-sm">{cert.year}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 