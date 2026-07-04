'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { blogs } from '@/data/portfolio';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

export default function Blog() {
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

  const featured = blogs.find((b) => b.featured);
  const rest = blogs.filter((b) => !b.featured);

  return (
    <section ref={sectionRef} id="blog" className="section blog-section" aria-label="Blog posts">
      <div style={{ marginBottom: '3.5rem' }}>
        <p className="section-label">[05] Blog</p>
        <h2 className="text-heading">Writings</h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {featured && (
          <article className="card" aria-label={`Featured post: ${featured.title}`}>
          <Link
            href={`/blog/${featured.slug}`}
            data-cursor="pointer"
            style={{
              display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem',
              textDecoration: 'none', color: 'var(--fg)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.1em',
                  color: 'var(--accent)', background: 'var(--accent-glow)',
                  border: '1px solid var(--accent-glow-strong)', borderRadius: 'var(--radius-full)',
                  padding: '3px 10px', fontFamily: 'var(--font-heading)', fontWeight: 700,
                }}>Featured</span>
                <time dateTime={featured.date} style={{ fontSize: '0.65rem', color: 'var(--fg-dim)', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
                  {formatDate(featured.date)} · {featured.readTime}
                </time>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, lineHeight: 1.3, fontFamily: 'var(--font-heading)' }}>{featured.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--fg-muted)', lineHeight: 1.7, maxWidth: '600px' }}>
                {featured.excerpt}
              </p>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                {featured.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon icon="mdi:arrow-top-right" width={24} height={24} style={{ color: 'var(--accent)', opacity: 0.6 }} />
            </div>
          </Link>
          </article>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap: '16px' }}>
          {rest.map((post) => (
            <article key={post.slug} className="card" aria-label={`Blog post: ${post.title}`}>
            <Link
              href={`/blog/${post.slug}`}
              data-cursor="pointer"
              style={{
                display: 'flex', flexDirection: 'column', gap: '0.75rem',
                textDecoration: 'none', color: 'var(--fg)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <time dateTime={post.date} style={{ fontSize: '0.65rem', color: 'var(--fg-dim)', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
                  {formatDate(post.date)} · {post.readTime}
                </time>
                <Icon icon="mdi:arrow-top-right" width={16} height={16} style={{ color: 'var(--fg-dim)' }} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.35, fontFamily: 'var(--font-heading)' }}>{post.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--fg-muted)', lineHeight: 1.65, flexGrow: 1 }}>
                {post.excerpt}
              </p>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {post.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
              </div>
            </Link>
            </article>
          ))}
        </div>
      </div>
      <style jsx>{`
        .blog-section > * {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .blog-section.visible > * {
          opacity: 1;
          transform: translateY(0);
        }
        .blog-section > *:nth-child(1) { transition-delay: 0s; }
        .blog-section > *:nth-child(2) { transition-delay: 0.1s; }
      `}</style>
    </section>
  );
}
