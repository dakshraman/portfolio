'use client';

import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Sewa Foundation Platform',
    description: 'Engineered a comprehensive e-learning ecosystem for iOS and Android, featuring live streaming infrastructure and on-demand lecture delivery.',
    tags: ['Flutter', 'iOS', 'Android']
  },
  {
    title: 'Apnademand E-commerce',
    description: 'Architected robust REST APIs facilitating real-time synchronization between a high-traffic web storefront and its companion mobile application.',
    tags: ['API Design', 'Laravel']
  },
  {
    title: 'Medzzi Telehealth App',
    description: 'Developed secure backend architecture for a healthcare platform managing complex doctor-patient appointment scheduling, both online and offline.',
    tags: ['Laravel', 'Backend']
  },
  {
    title: 'Enterprise School ERP',
    description: 'Built a highly customizable institutional management system handling secure online payments, dynamic payroll, and academic messaging at scale.',
    tags: ['Full Stack', 'ERP']
  }
];

export default function Projects() {
  return (
    <section id="projects">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        <h2>Selected Work</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="glass-card"
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>{project.title}</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', flexGrow: 1, lineHeight: 1.6 }}>
                {project.description}
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {project.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    style={{ 
                      fontSize: '0.75rem', 
                      padding: '6px 12px', 
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '9999px',
                      color: 'var(--accent-blue)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      fontWeight: 600
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
