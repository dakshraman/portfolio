'use client';

const experiences = [
  {
    role: 'Software Engineer',
    company: 'InsideSoftwares',
    period: '2025 – Present',
    location: 'Remote',
    description: 'Developing scalable applications and ensuring optimal performance across the software development lifecycle.'
  },
  {
    role: 'Full Stack Laravel Developer',
    company: 'AK Software Solutions',
    period: '2025 – 2025',
    location: 'Dehradun, India',
    description: 'Leading end-to-end web development utilizing the Laravel ecosystem. Architecting robust backend services.'
  },
  {
    role: 'API Developer (Laravel/Flutter)',
    company: 'Pearl Organisation',
    period: '2024 – 2025',
    location: 'Dehradun, India',
    description: 'Developed scalable RESTful APIs in PHP/Laravel powering complex Flutter mobile applications.'
  },
  {
    role: 'Reputation Manager',
    company: 'Zenvista Meditech',
    period: '2022 – 2022',
    location: 'Rudrapur, India',
    description: 'Orchestrated digital presence and online reputation strategies, leveraging data analytics.'
  }
];

export default function Experience() {
  return (
    <section id="experience">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
        <h2>Experience</h2>
        <span className="font-pixel" style={{ color: 'var(--accent)', fontSize: '2rem' }}>[02]</span>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {experiences.map((exp, index) => (
          <div 
            key={index} 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 2fr 1fr', 
              gap: '2rem',
              padding: '3rem 0',
              borderTop: '1px solid var(--border-color)',
              transition: 'opacity 0.3s ease'
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 500, marginBottom: '0.5rem' }}>{exp.company}</h3>
              <p className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{exp.location}</p>
            </div>
            <div>
              <h4 className="font-serif" style={{ fontSize: '2.2rem', fontStyle: 'italic', fontWeight: 400, marginBottom: '1rem' }}>{exp.role}</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '500px' }}>
                {exp.description}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className="font-mono" style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
                {exp.period}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
