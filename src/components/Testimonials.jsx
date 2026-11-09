'use client';

import { Quote } from 'lucide-react';
import { testimonials } from '@/data/portfolio';

export default function Testimonials() {
  return (
    <section className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-orange-500 mb-2">
              Client Feedback
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--fg-page)]">
              Trusted by engineering leads & founders.
            </h2>
          </div>
          <p className="text-sm text-[var(--muted-fg)] max-w-md">
            Direct endorsements from founders, CTOs, and product managers across production software deployments.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="bento-card p-6 sm:p-8 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <Quote className="w-6 h-6 text-orange-500/50 mb-4" />
                <p className="text-sm sm:text-base text-[var(--fg-page)] leading-relaxed italic mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[var(--subtle-border)]">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 text-orange-500 font-bold text-xs flex items-center justify-center border border-orange-500/20">
                  {item.avatar}
                </div>
                <div>
                  <div className="text-sm font-bold text-[var(--fg-page)]">
                    {item.name}
                  </div>
                  <div className="text-xs text-[var(--muted-fg)] font-mono">
                    {item.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
