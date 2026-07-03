'use client';

export default function Contact() {
  return (
    <section id="contact" style={{ textAlign: 'center', padding: '120px 24px' }}>
      <h2 style={{ marginBottom: '1rem' }}>Have an idea?</h2>
      <a 
        href="mailto:ramandaksh6161@gmail.com" 
        className="font-serif"
        style={{ 
          display: 'block', 
          fontSize: 'clamp(2rem, 8vw, 6rem)', 
          fontStyle: 'italic', 
          color: 'var(--text-primary)', 
          textDecoration: 'none',
          marginBottom: '4rem'
        }}
      >
        Let's work together
      </a>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap', borderTop: '2px solid var(--border-color)', paddingTop: '4rem' }}>
        <div style={{ textAlign: 'left' }}>
          <span className="font-mono" style={{ display: 'block', fontSize: '0.875rem', textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--text-secondary)' }}>Email</span>
          <a href="mailto:ramandaksh6161@gmail.com" style={{ fontSize: '1.5rem', color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>ramandaksh6161@gmail.com</a>
        </div>
        <div style={{ textAlign: 'left' }}>
          <span className="font-mono" style={{ display: 'block', fontSize: '0.875rem', textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--text-secondary)' }}>Location</span>
          <span style={{ fontSize: '1.5rem', color: 'var(--text-primary)', fontWeight: 500 }}>Uttarakhand, India</span>
        </div>
        <div style={{ textAlign: 'left' }}>
          <span className="font-mono" style={{ display: 'block', fontSize: '0.875rem', textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--text-secondary)' }}>Socials</span>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="https://github.com/dakshraman" target="_blank" rel="noreferrer" style={{ fontSize: '1.5rem', color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>Github</a>
            <span style={{ fontSize: '1.5rem' }}>/</span>
            <a href="https://linkedin.com/in/dakshraman" target="_blank" rel="noreferrer" style={{ fontSize: '1.5rem', color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>LinkedIn</a>
          </div>
        </div>
      </div>
    </section>
  );
}
