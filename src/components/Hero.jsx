'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import { useRef } from 'react';
import { motion } from 'framer-motion';

const AnimatedShape = () => {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.2}>
      <MeshDistortMaterial
        color="#8b5cf6"
        attach="material"
        distort={0.5}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        emissive="#3b82f6"
        emissiveIntensity={0.5}
      />
    </Sphere>
  );
};

export default function Hero() {
  return (
    <section 
      style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        paddingTop: 0,
        paddingBottom: 0,
        position: 'relative' 
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, marginLeft: 'calc(-50vw + 50%)' }}>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[2, 2, 5]} intensity={1.5} />
          <AnimatedShape />
        </Canvas>
      </div>

      <div style={{ position: 'relative', zIndex: 10, width: '100%', pointerEvents: 'none' }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{ 
              display: 'inline-block',
              padding: '8px 16px', 
              background: 'rgba(139, 92, 246, 0.1)', 
              border: '1px solid rgba(139, 92, 246, 0.3)',
              borderRadius: '9999px',
              color: 'var(--accent-purple)',
              fontWeight: 600,
              marginBottom: '2rem'
            }}
          >
            Available for new opportunities
          </motion.div>
          
          <h1 style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', fontWeight: 700, lineHeight: 1, marginBottom: '1rem', letterSpacing: '-0.04em' }}>
            Raman <br /> 
            <span className="text-gradient">Daksh</span>
          </h1>
          
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.5rem', maxWidth: '600px', marginBottom: '3rem' }}>
            Senior Software Engineer. Crafting high-performance digital experiences with Laravel & Flutter.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', pointerEvents: 'auto' }}>
            <a href="#projects" className="btn-primary">
              View Work
            </a>
            <a href="#contact" className="btn-secondary">
              Contact Me
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
