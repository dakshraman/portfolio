'use client';

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
    description: 'Developed secure backend architecture for a healthcare platform managing complex doctor-patient appointment scheduling.',
    tags: ['Laravel', 'Backend']
  },
  {
    title: 'Enterprise School ERP',
    description: 'Built a highly customizable institutional management system handling secure online payments, dynamic payroll, and academic messaging.',
    tags: ['Full Stack', 'ERP']
  }
];

export default function Projects() {
  return (
    <section id="projects">
      <h2>Selected Projects</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2px', background: 'var(--border-color)', border: '2px solid var(--border-color)' }}>
        {projects.map((project, index) => (
          <div
            key={index}
            style={{ 
              background: 'var(--bg-primary)',
              padding: '3rem 2rem',
              display: 'flex', 
              flexDirection: 'column',
              transition: 'background 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#f0f0f0'}
            onMouseOut={(e) => e.currentTarget.style.background = 'var(--bg-primary)'}
          >
            <h3 className="font-serif" style={{ fontSize: '2.5rem', marginBottom: '1rem', fontStyle: 'italic', fontWeight: 400 }}>{project.title}</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', flexGrow: 1, lineHeight: 1.5, fontSize: '1.1rem' }}>
              {project.description}
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {project.tags.map((tag, i) => (
                <span 
                  key={i} 
                  className="font-mono"
                  style={{ 
                    fontSize: '0.75rem', 
                    padding: '4px 8px', 
                    border: '1px solid var(--border-color)',
                    textTransform: 'uppercase',
                    fontWeight: 700
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
