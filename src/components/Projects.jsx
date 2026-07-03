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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
        <h2>Selected Projects</h2>
        <span className="font-pixel" style={{ color: 'var(--accent)', fontSize: '2rem' }}>[01]</span>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        {projects.map((project, index) => (
          <div
            key={index}
            style={{ 
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '24px',
              padding: '3rem 2.5rem',
              display: 'flex', 
              flexDirection: 'column',
              transition: 'all 0.3s ease',
              border: '1px solid var(--border-color)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
              e.currentTarget.style.borderColor = 'var(--border-color)';
            }}
          >
            <h3 className="font-serif" style={{ fontSize: '2.5rem', marginBottom: '1rem', fontStyle: 'italic', fontWeight: 400 }}>{project.title}</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', flexGrow: 1, lineHeight: 1.6, fontSize: '1.1rem' }}>
              {project.description}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {project.tags.map((tag, i) => (
                <span 
                  key={i} 
                  className="font-mono"
                  style={{ 
                    fontSize: '0.8rem', 
                    padding: '6px 12px', 
                    borderRadius: '99px',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'var(--text-primary)'
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
