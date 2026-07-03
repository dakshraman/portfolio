'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" style={{ marginBottom: '6rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="editorial-card"
        style={{ padding: '4rem 2rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
      >
        <h2 id="contact-heading" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
          Let's <span style={{ fontStyle: 'italic', color: 'var(--color-muted)' }}>Connect</span>
        </h2>
        <p className="text-muted" style={{ marginBottom: '3rem', fontSize: '1.125rem' }}>
          Available for technical leadership roles and full-stack development consulting. Let's discuss how I can bring value to your next project.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', marginBottom: '3rem' }}>
          <a href="mailto:ramandaksh6161@gmail.com" className="text-muted" style={{ display: 'flex', alignItems: 'center', gap: '1rem', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-foreground)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-muted)'}>
            <Mail size={20} aria-hidden="true" />
            <span>ramandaksh6161@gmail.com</span>
          </a>
          <a href="tel:+918958224019" className="text-muted" style={{ display: 'flex', alignItems: 'center', gap: '1rem', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-foreground)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-muted)'}>
            <Phone size={20} aria-hidden="true" />
            <span>+91 8958224019</span>
          </a>
          <div className="text-muted" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <MapPin size={20} aria-hidden="true" />
            <span>Rudrapur, Uttarakhand, India</span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <a 
            href="https://github.com/dakshraman" 
            target="_blank" 
            rel="noreferrer" 
            aria-label="GitHub Profile"
            className="text-muted"
            style={{ transition: 'color 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-foreground)'} 
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-muted)'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          </a>
          <a 
            href="https://linkedin.com/in/dakshraman" 
            target="_blank" 
            rel="noreferrer" 
            aria-label="LinkedIn Profile"
            className="text-muted"
            style={{ transition: 'color 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-foreground)'} 
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-muted)'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
