'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section 
      aria-label="Introduction" 
      style={{ 
        minHeight: '90vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Ambient background effect replacing the flashy 3D sphere */}
      <div 
        className="animate-pulse-glow"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60vw',
          height: '60vw',
          maxHeight: '800px',
          maxWidth: '800px',
          background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 60%)',
          opacity: 0.05,
          borderRadius: '50%',
          zIndex: 0,
          pointerEvents: 'none'
        }}
        aria-hidden="true"
      />

      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '800px' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="stagger-children visible"
        >
          <span className="text-accent" style={{ fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'block' }}>
            Raman Daksh
          </span>
          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', marginBottom: '2rem', lineHeight: '1' }}>
            Senior Software <br /> <span style={{ fontStyle: 'italic', color: 'var(--color-muted)' }}>Engineer.</span>
          </h1>
          <p className="text-muted" style={{ fontSize: '1.25rem', maxWidth: '600px', marginBottom: '3rem', lineHeight: '1.6' }}>
            Specializing in Laravel and Flutter to build scalable, cross-platform digital products. Focused on delivering robust backend architectures and high-performance mobile experiences.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#projects" className="btn-pill-solid" aria-label="View my projects">
              View Projects
            </a>
            <a href="#contact" className="btn-pill-outline" aria-label="Contact me">
              Get in Touch
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
