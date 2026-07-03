'use client';

export default function Contact() {
  return (
    <section id="contact" style={{ textAlign: 'center', padding: '150px 24px', borderBottom: 'none' }}>
      <p className="font-mono" style={{ fontSize: '1rem', color: 'var(--accent)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        [04] What's next?
      </p>
      <h2 style={{ marginBottom: '1rem', fontSize: 'clamp(3rem, 6vw, 5rem)' }}>Have an idea?</h2>
      <a 
        href="mailto:ramandaksh6161@gmail.com" 
        className="font-serif"
        style={{ 
          display: 'inline-block', 
          fontSize: 'clamp(3rem, 8vw, 7rem)', 
          fontStyle: 'italic', 
          color: 'var(--text-primary)', 
          textDecoration: 'none',
          marginBottom: '6rem',
          transition: 'color 0.3s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent)'}
        onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
      >
        Let's work together
      </a>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap', borderTop: '1px solid var(--border-color)', paddingTop: '4rem' }}>
        <div style={{ textAlign: 'left' }}>
          <span className="font-mono" style={{ display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--text-secondary)' }}>Email</span>
          <a href="mailto:ramandaksh6161@gmail.com" style={{ fontSize: '1.2rem', color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>ramandaksh6161@gmail.com</a>
        </div>
        <div style={{ textAlign: 'left' }}>
          <span className="font-mono" style={{ display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--text-secondary)' }}>Location</span>
          <span style={{ fontSize: '1.2rem', color: 'var(--text-primary)', fontWeight: 500 }}>Uttarakhand, India</span>
        </div>
        <div style={{ textAlign: 'left' }}>
          <span className="font-mono" style={{ display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--text-secondary)' }}>Socials</span>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="https://github.com/dakshraman" target="_blank" rel="noreferrer" style={{ fontSize: '1.2rem', color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>Github</a>
            <span style={{ fontSize: '1.2rem', color: 'var(--border-color)' }}>/</span>
            <a href="https://linkedin.com/in/dakshraman" target="_blank" rel="noreferrer" style={{ fontSize: '1.2rem', color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>LinkedIn</a>
          </div>
        </div>
      </div>
    </section>
  );
}
