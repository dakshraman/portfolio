'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const ProjectIcon = ({ icon }) => {
  const icons = {
    learning: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="4" y="8" width="40" height="28" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M20 18L30 24L20 30V18Z" fill="currentColor" opacity="0.2" />
        <path d="M20 18L30 24L20 30V18Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M16 38H32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M24 36V38" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="36" cy="14" r="4" fill="currentColor" opacity="0.15" />
        <circle cx="36" cy="14" r="4" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
    commerce: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M8 12L12 8H36L40 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="8" y="12" width="32" height="28" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M18 24C18 21.2386 20.2386 19 23 19H25C27.7614 19 30 21.2386 30 24V28H18V24Z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="21" cy="33" r="2" fill="currentColor" opacity="0.3" />
        <circle cx="29" cy="33" r="2" fill="currentColor" opacity="0.3" />
        <path d="M22 14V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M28 14V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    health: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="6" width="32" height="36" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M24 16V32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 24H32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <path d="M14 10H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        <path d="M14 14H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      </svg>
    ),
    enterprise: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="12" width="14" height="28" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="26" y="8" width="14" height="32" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 18H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        <path d="M12 22H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
        <path d="M30 14H36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        <path d="M30 18H34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
        <path d="M30 22H36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        <circle cx="15" cy="32" r="2" fill="currentColor" opacity="0.3" />
        <circle cx="33" cy="34" r="2" fill="currentColor" opacity="0.3" />
        <path d="M22 26H26" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.3" />
      </svg>
    ),
  };
  return icons[icon] || icons.learning;
};

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (y - 0.5) * -10, y: (x - 0.5) * 10 });
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <div
      ref={cardRef}
      className="project-card"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setIsHovered(false); }}
      data-cursor="pointer"
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative',
        borderRadius: '20px',
        padding: '1px',
        background: 'transparent',
      }}
    >
      {/* Animated gradient border */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '20px',
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(34, 197, 94, 0.5), rgba(34, 197, 94, 0.05) 50%, rgba(51, 65, 85, 0.2))`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.5s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Card inner */}
      <div
        style={{
          position: 'relative',
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '19px',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          height: '100%',
          overflow: 'hidden',
          border: '1px solid rgba(51, 65, 85, 0.3)',
        }}
      >
        {/* Hover glow */}
        <div
          style={{
            position: 'absolute',
            top: mousePos.y - 120,
            left: mousePos.x - 120,
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.4s ease',
            filter: 'blur(25px)',
          }}
        />

        {/* Header row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--fg-dim)' }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <div
            style={{
              color: 'var(--accent)',
              opacity: 0.6,
              transition: 'all 0.4s ease',
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              filter: isHovered ? 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.3))' : 'none',
            }}
          >
            <ProjectIcon icon={project.icon} />
          </div>
        </div>

        {/* Category pill */}
        <span
          className="font-mono"
          style={{
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--accent)',
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.15)',
            borderRadius: 'var(--radius-full)',
            padding: '4px 12px',
            alignSelf: 'flex-start',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {project.category}
        </span>

        {/* Description only - no title */}
        <p
          style={{
            color: 'var(--fg)',
            lineHeight: 1.75,
            fontSize: '0.95rem',
            flexGrow: 1,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div
          style={{
            display: 'flex',
            gap: '6px',
            flexWrap: 'wrap',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {project.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      );

      const cards = gridRef.current?.querySelectorAll('.project-card');
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 60, rotateX: -10 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.9, stagger: 0.15, ease: 'expo.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 80%' } }
        );
      }
    }, sectionRef);

    // Fallback
    const fallback = setTimeout(() => {
      if (headingRef.current) headingRef.current.style.opacity = '1';
      const cards = gridRef.current?.querySelectorAll('.project-card');
      cards?.forEach((c) => { c.style.opacity = '1'; c.style.transform = 'none'; });
    }, 4000);

    return () => { ctx.revert(); clearTimeout(fallback); };
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="section">
      <div style={{ marginBottom: '4rem' }}>
        <p className="section-label">[01] Projects</p>
        <h2 ref={headingRef} className="text-heading">Selected work</h2>
      </div>

      <div
        ref={gridRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: '16px',
        }}
      >
        {projects.map((project, i) => (
          <ProjectCard key={i} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
