'use client';

import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { GithubIcon } from './Icons';
import { highlights } from '@/data/portfolio';

export default function Highlights() {
  return (
    <section id="highlights" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-orange-500 mb-2">
              Featured Flagships
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--fg-page)]">
              Engineered for real-world impact.
            </h2>
          </div>
          <p className="text-sm text-[var(--muted-fg)] max-w-md">
            Flagship products designed, engineered, and deployed end-to-end — spanning high-concurrency Laravel APIs, iOS/Android Flutter builds, and developer tooling.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="bento-card p-6 sm:p-7 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Card Top: Category & External Link */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: item.accent || '#f97316' }}
                    />
                    <span className="text-xs font-mono uppercase tracking-wider text-[var(--muted-fg)]">
                      {item.tags[0]}
                    </span>
                  </div>

                  {item.github && (
                    <a
                      href={item.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full border border-[var(--subtle-border)] flex items-center justify-center text-[var(--muted-fg)] hover:text-orange-500 hover:border-orange-500/50 transition-colors"
                      aria-label={`Visit ${item.title}`}
                    >
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-[var(--fg-page)] mb-3 group-hover:text-orange-500 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--muted-fg)] leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Tags & Action */}
              <div className="pt-4 border-t border-[var(--subtle-border)]">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[var(--muted-bg)] text-[var(--muted-fg)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-xs">
                  {item.github && (
                    <a
                      href={item.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-[var(--fg-page)] hover:text-orange-500 transition-colors"
                    >
                      <span>Live Site</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {item.backend && (
                    <a
                      href={item.backend}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[var(--muted-fg)] hover:text-[var(--fg-page)] transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Backend Repo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
