import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const experiences = [
  {
    role: 'Laravel Developer',
    company: 'AK Software Solutions',
    period: '2025/06 – Present',
    location: 'Dehradun',
    description: 'Working as a full stack web developer in Laravel.'
  },
  {
    role: 'Technology Executive',
    company: 'Pearl Organisation',
    period: '2024/05 – 2025/05',
    location: 'Dehradun, India',
    description: 'Worked as an API Developer (PHP Laravel) for Flutter Applications and was responsible for the backend for mobile applications.'
  },
  {
    role: 'Reputation Manager',
    company: 'Zenvista Meditech Pvt. Ltd.',
    period: '2022/05 – 2022/10',
    location: 'Rudrapur, India',
    description: 'Managed online reputation and digital presence.'
  }
];

const Experience = () => {
  return (
    <section id="experience">
      <h2>Experience</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="glass-card"
            style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}
          >
            <div style={{ padding: '12px', background: 'var(--accent-glow)', borderRadius: '50%', color: 'var(--accent)' }}>
              <Briefcase size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{exp.role}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{exp.company}</span>
                <span>{exp.period} | {exp.location}</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{exp.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
