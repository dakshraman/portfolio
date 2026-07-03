'use client';

import { motion } from 'framer-motion';

const skills = [
  'Laravel', 'Flutter', 'React.js', 'Python', 'Dart', 'PHP', 'Firebase',
  'Java', 'C++', 'SQL', 'Linux', 'Cyber Security', 'Shopify', 'WordPress',
  'System Architecture', 'API Design'
];

export default function Skills() {
  return (
    <section id="skills">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        <h2>Technical Arsenal</h2>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.05, backgroundColor: 'rgba(139, 92, 246, 0.2)', borderColor: 'var(--accent-purple)' }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              className="glass-card"
              style={{ padding: '16px 24px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'default' }}
            >
              <span style={{ fontWeight: 500, color: 'white' }}>{skill}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
