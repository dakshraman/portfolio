'use client';

import { Star, ShieldCheck } from 'lucide-react';
import { testimonials } from '@/data/portfolio';

const projectTags = [
  'E-Learning Mobile Platform (Flutter + Laravel)',
  'Telehealth Booking & WebRTC App',
  'CommerceHub High-Throughput API',
  'Automated School ERP Infrastructure',
];

export default function Testimonials() {
  return (
    <section className="py-20 md:py-32 relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="section-label">
              Client Endorsements
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--fg-page)] leading-tight">
              Trusted by engineering leads &amp; founders.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[var(--muted-fg)] max-w-md leading-relaxed font-normal">
            Direct feedback from CTOs, product managers, and founders on production software shipped end-to-end.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((item, idx) => (
            <div
              key={item.name}
              className="bento-card p-7 sm:p-8 flex flex-col justify-between group hover:-translate-y-1 relative"
            >
              <div>
                {/* Header: Rating & Verified Project Tag */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>

                  <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Verified Production Client
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[var(--fg-page)] leading-relaxed mb-6 font-normal">
                  &ldquo;{item.quote}&rdquo;
                </p>

                <div className="text-[11px] font-mono text-[var(--muted-fg)] mb-4">
                  <span className="text-[var(--accent)] font-semibold">Project:</span> {projectTags[idx % projectTags.length]}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[var(--subtle-border)]">
                <div className="w-10 h-10 rounded-full bg-[var(--muted-bg)] text-[var(--fg-page)] font-bold text-xs font-mono flex items-center justify-center border border-[var(--subtle-border)] shadow-xs">
                  {item.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[var(--fg-page)]">
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
