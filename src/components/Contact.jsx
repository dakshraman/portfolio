'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" style={{ marginBottom: '6rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="glass-card"
        style={{ padding: '4rem 2rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto', position: 'relative', overflow: 'hidden' }}
      >
        <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.1) 0%, transparent 50%)', zIndex: 0, pointerEvents: 'none' }} />
        
        <div style={{ position: 'relative', zIndex: 10 }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
            Ready to <span className="text-gradient">Connect?</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.125rem' }}>
            Available for technical leadership roles and full-stack development consulting. Let's discuss how I can bring value to your next project.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', marginBottom: '3rem' }}>
            <a href="mailto:ramandaksh6161@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'white', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-purple)'} onMouseOut={(e) => e.currentTarget.style.color = 'white'}>
              <Mail size={24} className="text-gradient" />
              <span style={{ fontSize: '1.25rem' }}>ramandaksh6161@gmail.com</span>
            </a>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)' }}>
              <MapPin size={24} className="text-gradient" />
              <span style={{ fontSize: '1.1rem' }}>Uttarakhand, India</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
            <a 
              href="https://github.com/dakshraman" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="GitHub Profile"
              style={{ color: 'white', transition: 'all 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-blue)'} 
              onMouseOut={(e) => e.currentTarget.style.color = 'white'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <a 
              href="https://linkedin.com/in/dakshraman" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="LinkedIn Profile"
              style={{ color: 'white', transition: 'all 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-blue)'} 
              onMouseOut={(e) => e.currentTarget.style.color = 'white'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
