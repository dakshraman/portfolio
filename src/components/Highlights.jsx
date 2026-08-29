'use client';

import { useRef, useEffect } from 'react';
import { highlights } from '@/data/portfolio';

function HighlightCard({ item, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = cardRef.current;
    if (!el) return;

    let rafId;
    let targetRotateX = 0, targetRotateY = 0;
    let currentRotateX = 0, currentRotateY = 0;

    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      targetRotateY = ((x - centerX) / centerX) * 4;
      targetRotateX = -((y - centerY) / centerY) * 4;
    };

    const onMouseLeave = () => {
      targetRotateX = 0;
      targetRotateY = 0;
    };

    const animate = () => {
      currentRotateX += (targetRotateX - currentRotateX) * 0.1;
      currentRotateY += (targetRotateY - currentRotateY) * 0.1;
      el.style.transform = `perspective(800px) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`;
      rafId = requestAnimationFrame(animate);
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <a
      ref={cardRef}
      href={item.github}
      target="_blank"
      rel="noopener noreferrer"
      className="highlight-card"
      data-cursor="pointer"
      style={{ '--accent-color': item.accent, animationDelay: `${index * 0.1}s` }}
    >
      <div className="highlight-card-inner">
        {/* Accent bar */}
        <div className="highlight-accent-bar" />

        {/* Header */}
        <div className="highlight-header">
          <div className="highlight-icon-wrap">
            <HighlightIcon type={item.icon} />
          </div>
          <div className="highlight-links">
            {item.backend && (
              <a href={item.backend} target="_blank" rel="noopener noreferrer" className="highlight-repo-link" onClick={(e) => e.stopPropagation()}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 4l6-2 6 2v5c0 3.5-2.5 6-6 7-3.5-1-6-3.5-6-7V4z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Backend
              </a>
            )}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="highlight-arrow">
              <path d="M4 12L12 4M12 4H6M12 4v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Title */}
        <h3 className="highlight-title">{item.title}</h3>

        {/* Description */}
        <p className="highlight-desc">{item.description}</p>

        {/* Tags */}
        <div className="highlight-tags">
          {item.tags.map((tag) => (
            <span key={tag} className="highlight-tag">{tag}</span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .highlight-card {
          display: block;
          position: relative;
          border: 2px solid var(--border);
          border-radius: var(--radius-lg);
          background: var(--bg-elevated);
          text-decoration: none;
          color: inherit;
          overflow: hidden;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          animation: highlightFadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both;
        }
        .highlight-card::before {
          content: '';
          position: absolute;
          top: 6px;
          left: 6px;
          right: -6px;
          bottom: -6px;
          border: 2px solid var(--accent-color);
          border-radius: var(--radius-lg);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: -1;
        }
        .highlight-card:hover {
          border-color: var(--accent-color);
          box-shadow: 6px 6px 0 var(--accent-color);
        }
        .highlight-card:hover::before {
          opacity: 0.3;
        }
        .highlight-card:active {
          transform: translate(2px, 2px) !important;
          box-shadow: 2px 2px 0 var(--accent-color);
        }
        .highlight-card-inner {
          padding: clamp(1.5rem, 3vw, 2rem);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          min-height: 260px;
        }
        .highlight-accent-bar {
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, var(--accent-color), transparent);
          border-radius: 2px;
          margin-bottom: 0.25rem;
        }
        .highlight-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .highlight-icon-wrap {
          width: 40px;
          height: 40px;
          border: 2px solid var(--border);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg);
          color: var(--accent-color);
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        .highlight-card:hover .highlight-icon-wrap {
          border-color: var(--accent-color);
          background: var(--accent-color);
          color: #fff;
        }
        .highlight-links {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .highlight-repo-link {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-family: var(--font-heading);
          font-weight: 600;
          color: var(--fg-muted);
          padding: 4px 8px;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          transition: all 0.3s ease;
        }
        .highlight-repo-link:hover {
          color: var(--accent-color);
          border-color: var(--accent-color);
        }
        .highlight-arrow {
          color: var(--fg-dim);
          transition: color 0.3s ease, transform 0.3s ease;
        }
        .highlight-card:hover .highlight-arrow {
          color: var(--accent-color);
          transform: translate(2px, -2px);
        }
        .highlight-title {
          font-family: var(--font-heading);
          font-size: clamp(1.25rem, 2.5vw, 1.6rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          margin: 0;
          color: var(--fg);
        }
        .highlight-desc {
          font-size: 0.9rem;
          line-height: 1.7;
          color: var(--fg-muted);
          margin: 0;
          flex: 1;
        }
        .highlight-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: auto;
        }
        .highlight-tag {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-family: var(--font-heading);
          font-weight: 600;
          padding: 4px 10px;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--fg-muted);
          background: var(--bg);
          transition: all 0.3s ease;
        }
        .highlight-card:hover .highlight-tag {
          border-color: var(--accent-color);
          color: var(--accent-color);
        }
        @keyframes highlightFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </a>
  );
}

function HighlightIcon({ type }) {
  switch (type) {
    case 'toolkit':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
      );
    case 'local':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      );
    case 'enterprise':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
        </svg>
      );
    default:
      return null;
  }
}

export default function Highlights() {
  return (
    <section className="section" id="highlights" style={{ paddingBottom: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
        <div style={{ width: '10px', height: '10px', border: '2px solid var(--accent)', background: 'var(--accent)', borderRadius: '2px' }} />
        <h2 className="text-display" style={{ margin: 0, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
          Highlights
        </h2>
      </div>

      <div className="highlights-grid">
        {highlights.map((item, i) => (
          <HighlightCard key={item.title} item={item} index={i} />
        ))}
      </div>

      <style jsx>{`
        .highlights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
          gap: clamp(1rem, 2vw, 1.5rem);
        }
      `}</style>
    </section>
  );
}
