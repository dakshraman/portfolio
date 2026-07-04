'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { projects } from '@/data/portfolio';

const categoryColors = {
  'learning platform': '#5E6AD2',
  'healthcare': '#EF4444',
  'social': '#A855F7',
  'messaging': '#06B6D4',
  'weather': '#F59E0B',
  'ai/ml': '#8B5CF6',
  'security': '#10B981',
  'browser': '#6366F1',
  'dating': '#EC4899',
  'open source': '#5E6AD2',
  'default': '#5E6AD2',
};

const getCategoryColor = (category) => {
  const key = Object.keys(categoryColors).find(k => category.toLowerCase().includes(k));
  return categoryColors[key] || categoryColors.default;
};

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
    devtool: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="6" y="8" width="36" height="28" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 20L12 24L16 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M32 20L36 24L32 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M26 16L22 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <path d="M18 38H30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M24 36V38" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    social: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="32" cy="16" r="6" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="24" cy="32" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M20 20L22 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        <path d="M28 20L26 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
    messaging: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="6" y="8" width="36" height="26" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 38L10 34H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 18H34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
        <path d="M14 23H28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
        <circle cx="36" cy="12" r="3" fill="currentColor" opacity="0.3" />
      </svg>
    ),
    weather: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="20" cy="18" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M20 6V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M20 26V30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 18H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M28 18H32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M30 28C30 24 33 22 36 22C39.5 22 42 24.5 42 28C42 31.5 39.5 34 36 34H14C10 34 7 31 7 27.5C7 24.5 9 22 12 22C12.5 22 13 22 13.5 22.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
    ),
    ai: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M24 8V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M24 34V40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 24H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M34 24H40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M13 13L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        <path d="M31 31L35 35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
    assistant: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="10" y="12" width="28" height="24" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="19" cy="22" r="3" fill="currentColor" opacity="0.3" />
        <circle cx="29" cy="22" r="3" fill="currentColor" opacity="0.3" />
        <path d="M18 30C18 30 20 32 24 32C28 32 30 30 30 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M24 8V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="24" cy="6" r="2" fill="currentColor" opacity="0.3" />
      </svg>
    ),
    package: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M24 4L42 14V34L24 44L6 34V14L24 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M24 44V24" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 14L24 24L42 14" stroke="currentColor" strokeWidth="1.5" />
        <path d="M15 9L33 19" stroke="currentColor" strokeWidth="1" opacity="0.3" />
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
  const color = getCategoryColor(project.category);

  const handleMouseMove = useCallback((e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (y - 0.5) * -8, y: (x - 0.5) * 8 });
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setIsHovered(false); }}
      data-cursor="pointer"
      className="card"
      aria-label={`${project.category} project: ${project.description.slice(0, 60)}...`}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease, transform 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: mousePos.y - 120,
          left: mousePos.x - 120,
          width: '240px',
          height: '240px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`,
          pointerEvents: 'none',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1, marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '0.7rem', color: 'var(--fg-dim)', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            color: isHovered ? color : 'var(--fg-dim)', 
            transition: 'all 0.4s ease', 
            transform: isHovered ? 'scale(1.05)' : 'scale(1)' 
          }}
        >
          <ProjectIcon icon={project.icon} />
        </div>
      </div>
      
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <h3 
          style={{ 
            fontSize: '1.25rem', 
            marginBottom: '0.75rem', 
            color: isHovered ? color : 'var(--fg)', 
            fontFamily: 'var(--font-heading)', 
            fontWeight: 700,
            transition: 'color 0.3s ease'
          }}
        >
          {project.title}
        </h3>
        <p style={{ color: 'var(--fg-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.75rem', flexGrow: 1 }}>
          {project.description}
        </p>
        
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: 'auto' }}>
          {project.tags.map((tag, i) => (
            <span key={i} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </article>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('visible');
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="section projects-section" aria-label="Projects">
      <div style={{ marginBottom: '4rem' }}>
        <p className="section-label">[01] Projects</p>
        <h2 className="text-heading">Selected work</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '16px' }}>
        {projects.map((project, i) => (
          <ProjectCard key={i} project={project} index={i} />
        ))}
      </div>
      <style jsx>{`
        .projects-section > * {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .projects-section.visible > * {
          opacity: 1;
          transform: translateY(0);
        }
        .projects-section > *:nth-child(1) { transition-delay: 0s; }
        .projects-section > *:nth-child(2) { transition-delay: 0.1s; }
        .projects-section .card {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .projects-section.visible .card {
          opacity: 1;
          transform: translateY(0);
        }
        .projects-section.visible .card:nth-child(1) { transition-delay: 0.1s; }
        .projects-section.visible .card:nth-child(2) { transition-delay: 0.2s; }
        .projects-section.visible .card:nth-child(3) { transition-delay: 0.3s; }
        .projects-section.visible .card:nth-child(4) { transition-delay: 0.4s; }
        .projects-section.visible .card:nth-child(5) { transition-delay: 0.5s; }
        .projects-section.visible .card:nth-child(6) { transition-delay: 0.6s; }
      `}</style>
    </section>
  );
}
