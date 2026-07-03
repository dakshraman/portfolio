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
    tags: ['Laravel', 'Backend Architecture']
  },
  {
    title: 'Enterprise School ERP',
    description: 'Built a highly customizable institutional management system handling secure online payments, dynamic payroll, and academic messaging at scale.',
    tags: ['Full Stack', 'ERP Systems']
  }
];

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 id="projects-heading" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>
          Selected <span style={{ fontStyle: 'italic', color: 'var(--color-muted)' }}>Work</span>
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="editorial-card-3d"
            >
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{project.title}</h3>
              <p className="text-muted" style={{ marginBottom: '2rem', flexGrow: 1 }}>
                {project.description}
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: 'auto' }}>
                {project.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    style={{ 
                      fontSize: '0.75rem', 
                      padding: '4px 12px', 
                      border: '1px solid var(--color-border)', 
                      borderRadius: '9999px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      fontWeight: 500
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
