'use client';

import { useState } from 'react';
import { faqItems } from '@/data/portfolio';
import { Icon } from '@iconify/react';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div style={{ marginBottom: '2.5rem' }}>
        <p className="section-label">FAQ</p>
        <h2 className="text-heading">Frequently asked questions</h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {faqItems.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="card"
              style={{
                padding: '1.25rem 1.5rem',
                cursor: 'pointer',
                border: '2px solid var(--border-thick)',
                boxShadow: '3px 3px 0px rgba(237, 237, 239, 0.08)',
              }}
              onClick={() => toggle(i)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggle(i); }}
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${i}`}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--fg)' }}>
                  {item.question}
                </h3>
                <Icon
                  icon="mdi:chevron-down"
                  width={18}
                  height={18}
                  style={{
                    color: 'var(--accent)',
                    flexShrink: 0,
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </div>
              <div
                id={`faq-answer-${i}`}
                style={{
                  overflow: 'hidden',
                  maxHeight: isOpen ? '300px' : '0px',
                  opacity: isOpen ? 1 : 0,
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <p style={{ fontSize: '0.85rem', color: 'var(--fg-muted)', lineHeight: 1.7, paddingTop: '0.75rem' }}>
                  {item.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
