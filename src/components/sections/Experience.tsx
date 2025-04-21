import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSectionBackground from '../AnimatedSectionBackground';
import SectionTitle from '../SectionTitle';

const Experience = () => {
  const [activeTab, setActiveTab] = useState(0);

  const experiences = [
    {
      title: 'Full Stack Web Developer',
      company: 'Freelance/Projects',
      date: '2024–Present',
      description: [
        'Developed 5+ responsive web and mobile applications including Fallah SMART,JCI Kairouan Website, Game Zone, Dish Dash.',
        'Implemented real-time tracking, AI-based analytics, and secure payment systems using React, Node.js, and Stripe.',
        'Collaborated with Agile teams to deliver user-focused solutions, achieving 95% client satisfaction rate.',
        'Reduced application load time by 40% through optimized code and efficient state management.',
      ],
    },
    {
      title: 'Chargé Événementiel',
      company: 'REKLAMA',
      date: '2021–2023',
      description: [
        'Planned and executed 15+ successful events, managing budgets up to 50,000 TND and coordinating with 20+ vendors.',
        'Created and distributed 100+ communication materials, increasing brand visibility by 60%.',
        'Reduced event costs by 25% through strategic vendor negotiations and resource optimization.',
        'Achieved 90% attendee satisfaction rate across all organized events.',
      ],
    },
    
    {
      title: 'Formateur et Facilitateur',
      company: 'Various NGOs & Training Centers',
      date: '2016–2024',
      description: [
        'Delivered 100+ training sessions to 2,000+ participants on leadership, soft skills, and project management.',
        'Designed and implemented andragogic content for diverse adult learners, achieving 95% participant satisfaction.',
        'Developed 20+ training modules that were adopted as standard curriculum across multiple organizations.',
        'Facilitated workshops that resulted in 80% of participants reporting improved skills and confidence.',
      ],
    },
    {
      title: 'Coordinateur de Projets',
      company: 'EU/USAID-Funded Initiatives',
      date: '2019–2024',
      description: [
        'Coordinated 5+ high-impact projects including VISA, Ready, and Youth\'s Future, managing budgets over $1M.',
        'Built partnerships with 10+ international stakeholders including UNFTK and Search For Common Ground.',
        'Ensured 100% project delivery within budget and timeline constraints.',
        'Facilitated knowledge transfer to 500+ beneficiaries across various initiatives.',
      ],
    },
    {
      title: 'Manager',
      company: 'CFCA',
      date: '2014–2020',
      description: [
        'Oversaw operations and finances for an organization serving 250+ clients through CNFCPP partnerships.',
        'Managed training programs that graduated 1,000+ participants with 90% employment rate.',
        'Reduced operational costs by 30% through process optimization and resource management.',
        'Developed and implemented 10+ new training programs that increased client satisfaction by 40%.',
      ],
    },
    {
      title: 'Leadership Roles',
      company: 'JCI Tunisia',
      date: '2019–2023',
      description: [
        'Served as Vice President, President, and Advisor, leading a team of 50+ members.',
        'Drove training programs that benefited 1,000+ young professionals.',
        'Led community initiatives like Marathon Tout Court Tout Vaccine, engaging 5,000+ participants.',
        'Increased chapter membership by 40% through strategic recruitment and engagement programs.',
      ],
    },
    {
      title: 'Expert',
      company: 'Visa Project, UNFTK',
      date: '2024',
      description: [
        'Provided specialized consultation for a project impacting 1,000+ beneficiaries.',
        'Developed and implemented solutions that improved project efficiency by 35%.',
        'Facilitated knowledge transfer to 50+ local stakeholders.',
        'Achieved 100% project milestones within the first quarter of implementation.',
      ],
    },
    {
      title: 'Financial Manager',
      company: 'AVEP Project, Autrement',
      date: '2023',
      description: [
        'Managed a 130000 TND budget with 100% financial compliance and reporting accuracy.',
        'Optimized resource allocation, reducing operational costs by 25%.',
        'Implemented new financial tracking systems that improved reporting efficiency by 40%.',
        'Ensured timely delivery of financial reports with zero discrepancies.',
      ],
    },
    {
      title: 'Expert',
      company: 'Ready Project, ADL Kairouan',
      date: '2022',
      description: [
        'Provided expertise that contributed to 100% project milestone achievement.',
        'Developed training materials used by 200+ participants.',
        'Facilitated workshops that improved local capacity by 60%.',
        'Established monitoring systems that increased project transparency by 80%.',
      ],
    },
    {
      title: 'Action Director',
      company: 'JCI Kairouan',
      date: '2021',
      description: [
        'Directed 10+ community projects benefiting 2,000+ local residents.',
        'Led a team of 30+ volunteers, achieving 100% project completion rate.',
        'Increased community engagement by 50% through innovative outreach programs.',
        'Secured $50,000 in funding for local development initiatives.',
      ],
    },
    {
      title: 'Facilitator',
      company: 'Tamkeen For Development (T4D) Project',
      date: '2021',
      description: [
        'Facilitated 50+ workshops and training sessions for 1,000+ participants.',
        'Achieved 95% participant satisfaction rate across all sessions.',
        'Developed 10+ training modules that were adopted as standard curriculum.',
        'Improved stakeholder communication efficiency by 60%.',
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 px-6 md:px-12 bg-primary relative min-h-screen">
      <AnimatedSectionBackground opacity={0.15} color="secondary" />
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionTitle 
          title="Experience" 
          subtitle="03. Where I've Worked"
          align="left"
          highlightColor="secondary"
        />

        <div className="flex flex-col md:flex-row gap-8">
          {/* Tab buttons */}
          <div className="mb-6 md:mb-0 md:w-40 flex md:flex-col overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-l border-light-gray/20">
            {experiences.map((exp, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-3 text-sm whitespace-nowrap md:whitespace-normal text-left transition-all duration-300 ${
                  activeTab === index
                    ? 'text-secondary border-secondary border-b-2 md:border-b-0 md:border-l-2 bg-tertiary/50'
                    : 'text-light-gray hover:text-secondary hover:bg-tertiary/30'
                }`}
              >
                {exp.company.split(',')[0]}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex-1">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: activeTab === index ? 1 : 0,
                  display: activeTab === index ? 'block' : 'none',
                }}
                transition={{ duration: 0.3 }}
                className="bg-tertiary/30 backdrop-blur-sm p-6 rounded-lg border border-gray-700/30"
              >
                <h3 className="text-xl font-bold text-lightest-gray">
                  {exp.title} <span className="text-secondary">@ {exp.company}</span>
                </h3>
                <p className="text-light-gray/70 mb-4 font-mono text-sm">{exp.date}</p>
                <ul className="space-y-2">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-light-gray flex">
                      <span className="text-secondary mr-2 flex-shrink-0">▹</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience; 