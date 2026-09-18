import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { blogs, siteConfig } from '@/data/portfolio';
import blogContent from '@/data/blog-content';
import ProgressBar from '@/components/ProgressBar';

export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogs.find((b) => b.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: `${post.excerpt} Written by Raman Daksh.`,
    keywords: [...post.tags, 'Freelance Developer', 'Raman Daksh'],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
      authors: ['Raman Daksh'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
    alternates: {
      canonical: `https://dakshraman.in/blog/${post.slug}`,
    },
  };
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

function parseInlineMarkup(text) {
  // Bold
  let parsed = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Italic
  parsed = parsed.replace(/\*(.*?)\*/g, '<em>$1</em>');
  // Inline code
  parsed = parsed.replace(/`(.*?)`/g, '<code style="background:rgba(255,255,255,0.1);padding:0.15rem 0.3rem;border-radius:4px;font-family:var(--font-mono);font-size:0.85em;color:var(--accent)">$1</code>');
  // Links
  parsed = parsed.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:var(--accent);text-decoration:underline;text-underline-offset:4px;">$1</a>');
  return <span dangerouslySetInnerHTML={{ __html: parsed }} />;
}

function renderContent(content, slug) {
  const lines = content.split('\n');
  const elements = [];
  let inCodeBlock = false;
  let codeLines = [];
  let inTable = false;
  let tableRows = [];

  const flushTable = () => {
    if (!inTable) return;
    elements.push(
      <div key={`table-${elements.length}`} style={{ overflowX: 'auto', margin: '2rem 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)' }}>
              {tableRows[0].split('|').filter(c => c.trim()).map((h, i) => (
                <th key={i} style={{ padding: '0.75rem 1rem', color: 'var(--fg)', fontWeight: 600 }}>{h.trim()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.slice(2).map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                {row.split('|').filter(c => c.trim()).map((c, j) => (
                  <td key={j} style={{ padding: '0.75rem 1rem', color: 'var(--fg-muted)' }}>{parseInlineMarkup(c.trim())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    inTable = false;
    tableRows = [];
  };

  lines.forEach((line, i) => {
    // Check table exit
    if (inTable && !line.startsWith('|')) {
      flushTable();
    }

    if (line.startsWith('```') && !inCodeBlock) {
      inCodeBlock = true;
      codeLines = [];
      return;
    }
    if (line.startsWith('```') && inCodeBlock) {
      inCodeBlock = false;
      elements.push(
        <div key={`code-${i}`} style={{ margin: '2rem 0', borderRadius: '12px', overflow: 'hidden', background: '#0f172a', border: '1px solid rgba(51, 65, 85, 0.4)', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)' }}>
          {/* Mac Header */}
          <div style={{ display: 'flex', gap: '6px', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
          </div>
          <pre style={{
            padding: '1.25rem',
            overflowX: 'auto',
            fontSize: '0.85rem',
            lineHeight: 1.7,
            fontFamily: 'var(--font-mono)',
            color: '#e2e8f0',
            margin: 0,
          }}>
            <code>{codeLines.join('\n')}</code>
          </pre>
        </div>
      );
      return;
    }
    if (inCodeBlock) {
      codeLines.push(line);
      return;
    }

    // Table parsing
    if (line.startsWith('|')) {
      inTable = true;
      tableRows.push(line);
      return;
    }

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} style={{
          fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
          fontWeight: 700,
          fontFamily: 'var(--font-heading)',
          color: 'var(--fg)',
          marginTop: '3rem',
          marginBottom: '1.25rem',
          letterSpacing: '-0.02em',
        }}>
          {parseInlineMarkup(line.slice(3))}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} style={{
          fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
          fontWeight: 600,
          fontFamily: 'var(--font-heading)',
          color: 'var(--fg)',
          marginTop: '2.5rem',
          marginBottom: '1rem',
        }}>
          {parseInlineMarkup(line.slice(4))}
        </h3>
      );
    } else if (line.startsWith('- ')) {
      elements.push(
        <li key={i} style={{
          fontSize: '1.05rem',
          color: 'var(--fg-muted)',
          lineHeight: 1.8,
          marginLeft: '1.5rem',
          marginBottom: '0.5rem',
        }}>
          {parseInlineMarkup(line.slice(2))}
        </li>
      );
    } else if (line.match(/^\d+\. /)) {
      elements.push(
        <li key={i} style={{
          fontSize: '1.05rem',
          color: 'var(--fg-muted)',
          lineHeight: 1.8,
          marginLeft: '1.5rem',
          marginBottom: '0.5rem',
          listStyleType: 'decimal',
        }}>
          {parseInlineMarkup(line.replace(/^\d+\. /, ''))}
        </li>
      );
    } else if (line.startsWith('> ')) {
      elements.push(
        <blockquote key={i} style={{
          borderLeft: '4px solid var(--accent)',
          padding: '1rem 1.5rem',
          margin: '2rem 0',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '0 8px 8px 0',
          fontStyle: 'italic',
          color: 'var(--fg)',
          fontSize: '1.1rem',
          lineHeight: 1.7,
        }}>
          {parseInlineMarkup(line.slice(2))}
        </blockquote>
      );
    } else if (line.trim() === '') {
      elements.push(<div key={i} style={{ height: '1rem' }} />);
    } else {
      elements.push(
        <p key={i} style={{
          fontSize: '1.05rem',
          color: 'var(--fg-muted)',
          lineHeight: 1.85,
          marginBottom: '1rem',
        }}>
          {parseInlineMarkup(line)}
        </p>
      );
    }
  });

  flushTable(); // In case file ends with table

  return elements;
}

const relatedCta = {
  'building-scalable-rest-apis-with-laravel': {
    text: 'Need a scalable REST API for your project?',
    link: '/services/api-design-development',
    label: 'Hire a freelance API developer →',
  },
  'flutter-state-management-bloc-vs-provider-2025': {
    text: 'Building a Flutter app?',
    link: '/services/flutter-app-development',
    label: 'Hire a freelance Flutter developer →',
  },
  'laravel-vs-django-2025': {
    text: 'Decided on Laravel for your next project?',
    link: '/services/laravel-development',
    label: 'Hire a freelance Laravel developer →',
  },
  'laravel-performance-optimization-guide': {
    text: 'Need help optimizing your Laravel application?',
    link: '/services/laravel-development',
    label: 'Get Laravel performance consulting →',
  },
  'securing-laravel-apps-beyond-the-basics': {
    text: 'Want to secure your Laravel application?',
    link: '/services/it-consulting',
    label: 'Get IT consulting for your project →',
  },
  'how-to-hire-freelance-laravel-developer': {
    text: 'Looking for a Laravel developer?',
    link: '/services/laravel-development',
    label: 'Hire me for your Laravel project →',
  },
  'firebase-for-laravel-real-time-features': {
    text: 'Need real-time features in your Laravel app?',
    link: '/services/full-stack-development',
    label: 'Hire a full-stack developer →',
  },
  'laravel-reverb-vs-other-websockets': {
    text: 'Building a real-time application?',
    link: '/services/laravel-development',
    label: 'Hire a Laravel developer with Reverb expertise →',
  },
  'cross-platform-deployment-flutter-to-ios-android': {
    text: 'Need help deploying your Flutter app?',
    link: '/services/flutter-app-development',
    label: 'Hire a freelance Flutter developer →',
  },
  'how-i-built-ai-debugging-tool-for-laravel': {
    text: 'Building developer tools or need Laravel expertise?',
    link: '/services/laravel-development',
    label: 'Hire a freelance Laravel developer →',
  },
  'ai-powered-development-tools-2025': {
    text: 'Using AI tools but need an experienced developer to validate the code?',
    link: '/services/full-stack-development',
    label: 'Hire a full-stack developer →',
  },
};

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
    keywords: [...post.tags, 'Freelance Developer', 'Raman Daksh'].join(', '),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://dakshraman.in/blog/${post.slug}`,
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dakshraman.in' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dakshraman.in/#blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://dakshraman.in/blog/${post.slug}` },
    ],
  };

  const cta = relatedCta[slug];

  return (
    <>
      <ProgressBar />
      <main style={{
        maxWidth: '850px',
        margin: '0 auto',
        padding: '8rem 1.5rem 6rem',
      }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        
        {/* Main Content Container - Glassmorphism */}
        <div style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'var(--glass-blur-heavy)',
          WebkitBackdropFilter: 'var(--glass-blur-heavy)',
          border: '1px solid var(--glass-border)',
          borderRadius: '24px',
          padding: 'clamp(2rem, 5vw, 4rem)',
          boxShadow: 'var(--glass-shadow)'
        }}>
          
          <Link
            href="/#blog"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontFamily: 'var(--font-heading)', fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--fg-dim)', textDecoration: 'none',
              textTransform: 'uppercase', letterSpacing: '0.05em',
              marginBottom: '2.5rem', transition: 'color 0.2s',
            }}
          >
            <Icon icon="mdi:arrow-left" width={18} height={18} />
            Back to Articles
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {post.tags.map((tag) => (
              <span key={tag} style={{ 
                fontSize: '0.7rem', 
                background: 'rgba(255,255,255,0.05)', 
                padding: '4px 12px', 
                borderRadius: '100px',
                color: 'var(--accent)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                letterSpacing: '0.03em',
                textTransform: 'uppercase',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>{tag}</span>
            ))}
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 800,
            fontFamily: 'var(--font-heading)',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            marginBottom: '1.5rem',
            background: 'linear-gradient(to right, #fff, #a1a1aa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            {post.title}
          </h1>

          <p style={{
            fontSize: '1.15rem',
            lineHeight: 1.6,
            color: 'var(--fg-dim)',
            marginBottom: '2.5rem',
          }}>
            {post.excerpt}
          </p>

          <div style={{
            display: 'flex', alignItems: 'center', gap: '16px',
            marginBottom: '3rem', paddingBottom: '2.5rem',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent-glow-strong), var(--accent-glow))',
              border: '1px solid rgba(254, 127, 45, 0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800,
              color: '#fff',
            }}>
              RD
            </div>
            <div>
              <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--fg)', fontFamily: 'var(--font-heading)' }}>Raman Daksh</p>
              <p className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>
                {formatDate(post.date)} · {post.readTime}
              </p>
            </div>
          </div>

          <article style={{ color: 'var(--fg-muted)', fontSize: '1.05rem', lineHeight: 1.8 }}>
            {renderContent(blogContent[post.slug] || '', post.slug)}
          </article>

          {cta && (
            <div style={{
              marginTop: '4rem', padding: '2rem',
              background: 'linear-gradient(to right, rgba(254, 127, 45, 0.05), transparent)',
              borderLeft: '4px solid var(--accent)',
              borderRadius: '0 12px 12px 0',
            }}>
              <p style={{ fontSize: '1.1rem', color: 'var(--fg)', fontWeight: 600, marginBottom: '1rem' }}>
                {cta.text}
              </p>
              <Link
                href={cta.link}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  fontFamily: 'var(--font-heading)', fontSize: '0.85rem',
                  fontWeight: 700, color: 'var(--accent)', textDecoration: 'none',
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                }}
              >
                {cta.label}
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
