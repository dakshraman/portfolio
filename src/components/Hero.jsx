'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: '40px', paddingTop: '120px', borderBottom: 'none' }}>
      
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: 'auto' }}
      >
        <p className="font-mono" style={{ textTransform: 'uppercase', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '0.85rem', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
          <span style={{ display: 'inline-block', width: '8px', height: '8px', background: 'var(--accent)', borderRadius: '50%' }}></span>
          Available for new opportunities
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        style={{ marginBottom: '4rem' }}
      >
        <h1 className="text-huge" style={{ fontWeight: 500 }}>
          RAMAN DAKSH
          <br />
          <span className="font-serif" style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--text-secondary)' }}>
            Software Engineer
          </span>
        </h1>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'space-between', alignItems: 'flex-end' }}
      >
        <p style={{ maxWidth: '650px', fontSize: '1.4rem', lineHeight: 1.5, fontWeight: 400, color: 'var(--text-secondary)' }}>
          Making complex digital products for companies that move forward. 
          Combining reliable <span className="font-serif" style={{ fontStyle: 'italic', fontSize: '1.7rem', color: 'var(--text-primary)' }}>backend functionality</span> with high-quality cross-platform architecture.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href="#projects" className="btn-brutal">
            Selected Work
          </a>
          <a href="#contact" className="btn-outline">
            Contact Me
          </a>
        </div>
      </motion.div>
    </section>
  );
}
