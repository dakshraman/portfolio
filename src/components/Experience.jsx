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
    <section id="experience">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        <h2>Experience</h2>
        
        <div style={{ position: 'relative', paddingLeft: '32px' }}>
          {/* Timeline Line */}
          <div style={{ position: 'absolute', left: '11px', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(to bottom, var(--accent-blue), var(--accent-purple), transparent)' }} />
          
          <div style={{ display: 'grid', gap: '2rem' }}>
            {experiences.map((exp, index) => (
              <motion.div 
                key={index} 
                className="glass-card" 
                style={{ position: 'relative' }}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, type: 'spring' }}
              >
                {/* Timeline Dot */}
                <div style={{ position: 'absolute', left: '-36px', top: '40px', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--bg-primary)', border: '2px solid var(--accent-blue)', boxShadow: '0 0 10px var(--accent-blue)' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'white' }}>{exp.role}</h3>
                  <span style={{ fontSize: '0.875rem', color: 'var(--accent-purple)', fontWeight: 600, padding: '4px 12px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '20px' }}>
                    {exp.period}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1rem' }}>
                  <strong style={{ fontWeight: 500, color: '#e2e8f0' }}>{exp.company}</strong>
                  <span style={{ color: 'var(--text-secondary)' }}>•</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{exp.location}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
