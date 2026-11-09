'use client';

import Link from 'next/link';
import { ArrowUpRight, Clock, Calendar } from 'lucide-react';
import { blogs } from '@/data/portfolio';

export default function Blog() {
  const featuredBlogs = blogs.slice(0, 4);

  return (
    <section id="blog" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-orange-500 mb-2">
              Engineering Notes & Thoughts
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--fg-page)]">
              Latest technical writing.
            </h2>
          </div>
          <p className="text-sm text-[var(--muted-fg)] max-w-md">
            Architectural patterns, benchmark studies, and practical guides on Laravel, Flutter, real-time systems, and software security.
          </p>
        </div>

        {/* Blog Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredBlogs.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="bento-card p-6 sm:p-8 flex flex-col justify-between group hover:-translate-y-1 block"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3 text-xs font-mono text-[var(--muted-fg)]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {article.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime}
                    </span>
                  </div>

                  <div className="w-7 h-7 rounded-full border border-[var(--subtle-border)] flex items-center justify-center text-[var(--muted-fg)] group-hover:text-orange-500 group-hover:border-orange-500/50 transition-colors">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[var(--fg-page)] mb-3 group-hover:text-orange-500 transition-colors">
                  {article.title}
                </h3>

                <p className="text-sm text-[var(--muted-fg)] leading-relaxed mb-6">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--subtle-border)] flex flex-wrap gap-1.5">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[var(--muted-bg)] text-[var(--muted-fg)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
