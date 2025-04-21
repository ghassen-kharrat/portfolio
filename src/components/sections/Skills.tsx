import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiCode, 
  FiServer, 
  FiDatabase, 
  FiTool, 
  FiUsers, 
  FiMessageSquare, 
  FiGlobe,
  FiGitBranch,
  FiCloud,
  FiMonitor,
  FiMessageCircle,
  FiBook,
  FiGlobe as FiLanguage
} from 'react-icons/fi';
import { 
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiGraphql,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiPrisma,
  SiDocker,
  SiAmazonaws,
  SiFirebase,
  SiGithubactions,
  SiJest,
  SiMocha,
  SiPostman
} from 'react-icons/si';
import AnimatedSectionBackground from '../AnimatedSectionBackground';
import SectionTitle from '../SectionTitle';

const Skills = () => {
  // Skills data
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <FiCode className="text-2xl text-secondary" />,
      skills: [
        { name: "React.js", icon: <SiReact className="text-2xl text-[#61DAFB]" /> },
        { name: "Next.js", icon: <SiNextdotjs className="text-2xl text-white" /> },
        { name: "Vue.js", icon: <SiVuedotjs className="text-2xl text-[#4FC08D]" /> },
        { name: "HTML", icon: <SiHtml5 className="text-2xl text-[#E34F26]" /> },
        { name: "CSS", icon: <SiCss3 className="text-2xl text-[#1572B6]" /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="text-2xl text-[#06B6D4]" /> },
        { name: "JavaScript", icon: <SiJavascript className="text-2xl text-[#F7DF1E]" /> },
        { name: "TypeScript", icon: <SiTypescript className="text-2xl text-[#3178C6]" /> }
      ]
    },
    {
      title: "Backend Development",
      icon: <FiServer className="text-2xl text-secondary" />,
      skills: [
        { name: "Node.js", icon: <SiNodedotjs className="text-2xl text-[#339933]" /> },
        { name: "Express.js", icon: <SiExpress className="text-2xl text-white" /> },
        { name: "Nest.js", icon: <SiNestjs className="text-2xl text-[#E0234E]" /> },
        { name: "REST APIs", icon: <FiGitBranch className="text-2xl text-secondary" /> },
        { name: "GraphQL", icon: <SiGraphql className="text-2xl text-[#E10098]" /> }
      ]
    },
    {
      title: "Databases",
      icon: <FiDatabase className="text-2xl text-secondary" />,
      skills: [
        { name: "MySQL", icon: <SiMysql className="text-2xl text-[#4479A1]" /> },
        { name: "PostgreSQL", icon: <SiPostgresql className="text-2xl text-[#4169E1]" /> },
        { name: "MongoDB", icon: <SiMongodb className="text-2xl text-[#47A248]" /> },
        { name: "Prisma", icon: <SiPrisma className="text-2xl text-[#2D3748]" /> }
      ]
    },
    {
      title: "DevOps & Tools",
      icon: <FiTool className="text-2xl text-secondary" />,
      skills: [
        { name: "Docker", icon: <SiDocker className="text-2xl text-[#2496ED]" /> },
        { name: "AWS", icon: <SiAmazonaws className="text-2xl text-[#232F3E]" /> },
        { name: "Firebase", icon: <SiFirebase className="text-2xl text-[#FFCA28]" /> },
        { name: "GitHub Actions", icon: <SiGithubactions className="text-2xl text-[#2088FF]" /> },
        { name: "WebSockets", icon: <FiCloud className="text-2xl text-secondary" /> }
      ]
    },
    {
      title: "Testing",
      icon: <FiMonitor className="text-2xl text-secondary" />,
      skills: [
        { name: "Jest", icon: <SiJest className="text-2xl text-[#C21325]" /> },
        { name: "Mocha", icon: <SiMocha className="text-2xl text-[#8D6748]" /> },
        { name: "Postman", icon: <SiPostman className="text-2xl text-[#FF6C37]" /> }
      ]
    },
    {
      title: "Professional Skills",
      icon: <FiUsers className="text-2xl text-secondary" />,
      skills: [
        { name: "Project Management", icon: <FiTool className="text-2xl text-secondary" /> },
        { name: "Training & Facilitation", icon: <FiBook className="text-2xl text-secondary" /> },
        { name: "Communication", icon: <FiMessageCircle className="text-2xl text-secondary" /> },
        { name: "Event Planning", icon: <FiUsers className="text-2xl text-secondary" /> }
      ]
    },
    {
      title: "Soft Skills",
      icon: <FiMessageSquare className="text-2xl text-secondary" />,
      skills: [
        { name: "Problem-Solving", icon: <FiTool className="text-2xl text-secondary" /> },
        { name: "Team Leadership", icon: <FiUsers className="text-2xl text-secondary" /> },
        { name: "Adaptability", icon: <FiCloud className="text-2xl text-secondary" /> },
        { name: "Cross-Cultural Collaboration", icon: <FiGlobe className="text-2xl text-secondary" /> }
      ]
    },
    {
      title: "Languages",
      icon: <FiLanguage className="text-2xl text-secondary" />,
      skills: [
        { name: "Arabic (Native)", icon: <FiLanguage className="text-2xl text-secondary" /> },
        { name: "English (Fluent)", icon: <FiLanguage className="text-2xl text-secondary" /> },
        { name: "French (Fluent)", icon: <FiLanguage className="text-2xl text-secondary" /> }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 px-6 md:px-12 bg-primary relative min-h-screen">
      <AnimatedSectionBackground opacity={0.25} color="secondary" />
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionTitle 
          title="Skills" 
          subtitle="02. What I Do Best"
          align="left"
          highlightColor="secondary"
        />

        <div className="space-y-16">
          {skillCategories.map((category, catIndex) => (
            <motion.div 
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                {category.icon}
                <h3 className="text-2xl font-bold text-lightest-gray">{category.title}</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.skills.map((skill, index) => (
                  <motion.div 
                    key={skill.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 + 0.2 }}
                    whileHover={{ scale: 1.03 }}
                    className="bg-tertiary/30 backdrop-blur-sm p-4 rounded-lg border border-gray-700/30 hover:border-secondary/30 transition-colors duration-300"
                  >
                    <div className="flex items-center gap-3">
                      {skill.icon}
                      <p className="text-lightest-gray font-medium">{skill.name}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills; 