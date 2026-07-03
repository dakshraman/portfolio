'use client';

import { motion } from 'framer-motion';

const skills = [
  'Laravel', 'Flutter', 'React.js', 'Python', 'Dart', 'PHP', 'Firebase',
  'Java', 'C++', 'SQL', 'Linux', 'Cyber Security', 'Shopify', 'WordPress',
  'System Architecture', 'API Design'
];

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 id="skills-heading" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>
          Technical <span style={{ fontStyle: 'italic', color: 'var(--color-muted)' }}>Expertise</span>
        </h2>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {skills.map((skill, index) => (
            <div
              key={index}
              className="editorial-card"
              style={{ padding: '12px 24px', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <span style={{ fontWeight: 500 }}>{skill}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
