'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '40px', paddingTop: '120px' }}>
      
      <div style={{ marginBottom: 'auto' }}>
        <p className="font-mono" style={{ textTransform: 'uppercase', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ display: 'inline-block', width: '12px', height: '12px', background: 'var(--text-primary)', borderRadius: '50%' }}></span>
          Available for new opportunities
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: '4rem' }}
      >
        <h1 className="text-huge">
          RAMAN DAKSH
          <br />
          <span className="font-serif" style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--text-secondary)' }}>
            Software Engineer
          </span>
        </h1>
      </motion.div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <p style={{ maxWidth: '600px', fontSize: '1.5rem', lineHeight: 1.4, fontWeight: 500 }}>
          Making complex digital products for companies that move forward. 
          Combining reliable <span className="font-serif" style={{ fontStyle: 'italic', fontSize: '1.8rem' }}>backend functionality</span> with high-quality cross-platform architecture.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href="#projects" className="btn-brutal">
            Selected Work
          </a>
        </div>
      </div>
    </section>
  );
}
