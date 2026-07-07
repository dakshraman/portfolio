import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { blogs } from '@/data/portfolio';

export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogs.find((b) => b.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
      authors: ['Raman Daksh'],
    },
  };
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

function renderContent(content) {
  const lines = content.split('\n');
  const elements = [];
  let inCodeBlock = false;
  let codeLines = [];
  let codeLang = '';

  lines.forEach((line, i) => {
    if (line.startsWith('```') && !inCodeBlock) {
      inCodeBlock = true;
      codeLang = line.slice(3).trim();
      codeLines = [];
      return;
    }
    if (line.startsWith('```') && inCodeBlock) {
      inCodeBlock = false;
      elements.push(
        <pre key={`code-${i}`} style={{
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(51, 65, 85, 0.3)',
          borderRadius: '12px',
          padding: '1.25rem',
          overflowX: 'auto',
          fontSize: '0.82rem',
          lineHeight: 1.7,
          fontFamily: 'var(--font-mono)',
          color: '#e2e8f0',
          margin: '1.5rem 0',
        }}>
          <code>{codeLines.join('\n')}</code>
        </pre>
      );
      return;
    }
    if (inCodeBlock) {
      codeLines.push(line);
      return;
    }

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} style={{
          fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
          fontWeight: 700,
          fontFamily: 'var(--font-heading)',
          color: 'var(--fg)',
          marginTop: '2.5rem',
          marginBottom: '1rem',
          letterSpacing: '-0.02em',
        }}>
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          fontWeight: 700,
          fontFamily: 'var(--font-heading)',
          color: 'var(--fg)',
          marginTop: '2rem',
          marginBottom: '0.75rem',
        }}>
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith('- ')) {
      elements.push(
        <li key={i} style={{
          fontSize: '0.95rem',
          color: 'var(--fg-muted)',
          lineHeight: 1.8,
          marginLeft: '1rem',
          marginBottom: '0.3rem',
        }}>
          {line.slice(2)}
        </li>
      );
    } else if (line.match(/^\d+\. /)) {
      elements.push(
        <li key={i} style={{
          fontSize: '0.95rem',
          color: 'var(--fg-muted)',
          lineHeight: 1.8,
          marginLeft: '1rem',
          marginBottom: '0.3rem',
          listStyleType: 'decimal',
        }}>
          {line.replace(/^\d+\. /, '')}
        </li>
      );
    } else if (line.startsWith('|')) {
      if (!line.includes('---')) {
        elements.push(
          <p key={i} style={{
            fontSize: '0.85rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--fg-dim)',
            lineHeight: 1.6,
          }}>
            {line}
          </p>
        );
      }
    } else if (line.trim() === '') {
      elements.push(<div key={i} style={{ height: '0.75rem' }} />);
    } else {
      elements.push(
        <p key={i} style={{
          fontSize: '0.95rem',
          color: 'var(--fg-muted)',
          lineHeight: 1.85,
          marginBottom: '0.75rem',
        }}>
          {line}
        </p>
      );
    }
  });

  return elements;
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = blogs.find((b) => b.slug === slug);
  if (!post) notFound();

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: 'Raman Daksh',
      url: 'https://dakshraman.in',
    },
    publisher: {
      '@type': 'Person',
      name: 'Raman Daksh',
      url: 'https://dakshraman.in',
    },
    keywords: post.tags.join(', '),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://dakshraman.in/blog/${post.slug}`,
    },
  };

  return (
    <main style={{
      maxWidth: '760px',
      margin: '0 auto',
      padding: '8rem 1.5rem 4rem',
      backdropFilter: 'blur(50px)',
    }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Link
        href="/#blog"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          fontFamily: 'var(--font-heading)', fontSize: '0.7rem',
          fontWeight: 600,
          color: 'var(--fg-dim)', textDecoration: 'none',
          textTransform: 'uppercase', letterSpacing: '0.05em',
          marginBottom: '2rem', transition: 'color 0.2s',
        }}
      >
        <Icon icon="mdi:arrow-left" width={16} height={16} />
        Back to Blog
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {post.tags.map((tag) => (
          <span key={tag} className="tag" style={{ fontSize: '0.65rem' }}>{tag}</span>
        ))}
      </div>

      <h1 style={{
        fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
        fontWeight: 700,
        fontFamily: 'var(--font-heading)',
        lineHeight: 1.15,
        letterSpacing: '-0.02em',
        marginBottom: '1rem',
      }}>
        {post.title}
      </h1>

      <div style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        marginBottom: '2.5rem', paddingBottom: '2rem',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent-glow-strong), var(--accent-glow))',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600,
          color: 'var(--accent)',
        }}>
          RD
        </div>
        <div>
          <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--fg)', fontFamily: 'var(--font-heading)' }}>Raman Daksh</p>
          <p className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
            {formatDate(post.date)} · {post.readTime}
          </p>
        </div>
      </div>

      <article>
        {renderContent(post.content)}
      </article>

      <div style={{
        marginTop: '3rem',
        paddingTop: '2rem',
        borderTop: '1px solid var(--border)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <Link
          href="/#blog"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            fontFamily: 'var(--font-heading)', fontSize: '0.75rem',
            fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
            color: 'var(--accent)', textDecoration: 'none',
            transition: 'opacity 0.2s',
          }}
        >
          <Icon icon="mdi:arrow-left" width={16} height={16} />
          All Posts
        </Link>
      </div>
    </main>
  );
}
