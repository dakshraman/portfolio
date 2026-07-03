'use client';

import { motion } from 'framer-motion';

const experiences = [
  {
    role: 'Software Engineer',
    company: 'InsideSoftwares',
    period: '2025/12 – Present',
    location: 'Remote',
    description: 'Developing scalable applications and ensuring optimal performance across the software development lifecycle.'
  },
  {
    role: 'Full Stack Laravel Developer',
    company: 'AK Software Solutions',
    period: '2025/06 – 2025/12',
    location: 'Dehradun, India',
    description: 'Leading end-to-end web development utilizing the Laravel ecosystem. Architecting robust backend services and ensuring high performance and security for client deliverables.'
  },
  {
    role: 'API Developer (Laravel/Flutter)',
    company: 'Pearl Organisation',
    period: '2024/05 – 2025/05',
    location: 'Dehradun, India',
    description: 'Developed scalable RESTful APIs in PHP/Laravel powering complex Flutter mobile applications. Optimized database queries and ensured seamless synchronization between front-end and back-end architectures.'
  },
  {
    role: 'Reputation Manager',
    company: 'Zenvista Meditech Pvt. Ltd.',
    period: '2022/05 – 2022/10',
    location: 'Rudrapur, India',
    description: 'Orchestrated digital presence and online reputation strategies, leveraging data analytics to improve brand visibility and client trust.'
  }
];

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 id="experience-heading" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>
          Professional <span style={{ fontStyle: 'italic', color: 'var(--color-muted)' }}>Experience</span>
        </h2>
        
        <div style={{ display: 'grid', gap: '2rem' }}>
          {experiences.map((exp, index) => (
            <div key={index} className="editorial-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '1rem' }}>
                <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{exp.role}</h3>
                <span className="text-muted" style={{ fontSize: '0.875rem', fontFamily: 'Inter, sans-serif' }}>
                  {exp.period}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <strong style={{ fontWeight: 600 }}>{exp.company}</strong>
                <span className="text-muted" aria-hidden="true">•</span>
                <span className="text-muted" style={{ fontSize: '0.875rem' }}>{exp.location}</span>
              </div>
              <p className="text-muted" style={{ marginTop: '0.5rem' }}>
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
