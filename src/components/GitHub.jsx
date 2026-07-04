'use client';

import { useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';

const PINNED_REPOS = [
  { name: 'laravel-ai-debugger', desc: 'AI Debugging Assistant for Laravel using CLI tools', lang: 'PHP', stars: 1, forks: 0 },
  { name: 'Messager', desc: 'Cross-platform messaging app with real-time updates', lang: 'Dart', stars: 2, forks: 0 },
  { name: 'Weather_forecast_web_application', desc: 'Weather forecast with interactive maps and alerts', lang: 'JavaScript', stars: 0, forks: 0 },
  { name: 'Virtual-Assistant', desc: 'Voice-controlled virtual assistant with NLP', lang: 'Python', stars: 0, forks: 0 },
  { name: 'AI-Image-Enhancer', desc: 'AI image enhancement using machine learning', lang: 'Python', stars: 0, forks: 0 },
  { name: 'laravel-browser-guard', desc: 'Browser fingerprinting & bot detection for Laravel', lang: 'PHP', stars: 0, forks: 0 },
];

const langColors = {
  PHP: '#777BB4',
  Dart: '#0175C2',
  JavaScript: '#F7DF1E',
  Python: '#3776AB',
  HTML: '#E34F26',
  CSS: '#1572B6',
  Java: '#ED8B00',
  'C++': '#00599C',
};

export default function GitHub() {
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
    <section ref={sectionRef} id="github" className="section github-section" aria-label="GitHub repositories">
      <div style={{ marginBottom: '3.5rem' }}>
        <p className="section-label">[06] Open Source</p>
        <h2 className="text-heading">GitHub</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: '16px' }} role="list">
        {PINNED_REPOS.map((repo) => (
          <article
            key={repo.name}
            className="card"
            aria-label={`${repo.name}: ${repo.desc}`}
            style={{
              display: 'flex', flexDirection: 'column', gap: '0.75rem',
              position: 'relative', overflow: 'hidden',
            }}
          >
            <a
              href={`https://github.com/dakshraman/${repo.name}`}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="pointer"
              style={{
                display: 'flex', flexDirection: 'column', gap: '0.75rem',
                textDecoration: 'none', color: 'var(--fg)',
              }}
            >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon icon="mdi:folder-outline" width={16} height={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--fg)', fontFamily: 'var(--font-heading)' }}>
                  {repo.name}
                </span>
              </div>
              <Icon icon="mdi:open-in-new" width={14} height={14} style={{ color: 'var(--fg-dim)', flexShrink: 0, marginTop: '2px' }} />
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--fg-muted)', lineHeight: 1.6, flexGrow: 1 }}>
              {repo.desc}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: 'auto' }}>
              {repo.lang && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: langColors[repo.lang] || '#999' }} />
                  <span style={{ fontSize: '0.65rem', color: 'var(--fg-dim)', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>{repo.lang}</span>
                </span>
              )}
              {repo.stars > 0 && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Icon icon="mdi:star-outline" width={12} height={12} style={{ color: 'var(--fg-dim)' }} />
                  <span style={{ fontSize: '0.65rem', color: 'var(--fg-dim)', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>{repo.stars}</span>
                </span>
              )}
              {repo.forks > 0 && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Icon icon="mdi:source-fork" width={12} height={12} style={{ color: 'var(--fg-dim)' }} />
                  <span style={{ fontSize: '0.65rem', color: 'var(--fg-dim)', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>{repo.forks}</span>
                </span>
              )}
            </div>
          </a>
        </article>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
        <a
          href="https://github.com/dakshraman"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
          data-cursor="pointer"
          style={{ gap: '8px' }}
        >
          View All Repositories
          <Icon icon="mdi:open-in-new" width={14} height={14} />
        </a>
      </div>
      <style jsx>{`
        .github-section > * {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .github-section.visible > * {
          opacity: 1;
          transform: translateY(0);
        }
        .github-section > *:nth-child(1) { transition-delay: 0s; }
        .github-section > *:nth-child(2) { transition-delay: 0.1s; }
        .github-section > *:nth-child(3) { transition-delay: 0.2s; }
      `}</style>
    </section>
  );
}
