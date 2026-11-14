'use client';

import { Calendar, MapPin } from 'lucide-react';
import { experiences } from '@/data/portfolio';

export default function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <div className="section-label">
              Career Journey
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--fg-page)]">
              Experience &amp; track record.
            </h2>
          </div>
          <p className="text-sm text-[var(--muted-fg)] max-w-md">
            4+ years partnering with remote engineering teams and scaling distributed software products across healthcare, edtech, and SaaS.
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative border-l border-[var(--subtle-border)] ml-3 md:ml-6 space-y-10">
          {experiences.map((exp) => (
            <div key={`${exp.company}-${exp.period}`} className="relative pl-7 md:pl-10 group">
              {/* Timeline marker */}
              <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[var(--card-border)] group-hover:bg-[var(--accent)] transition-colors ring-4 ring-[var(--bg-page)]" />

              <div className="bento-card p-6 md:p-8 hover:-translate-y-0.5 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-[var(--fg-page)] group-hover:text-[var(--accent)] transition-colors">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-semibold text-[var(--accent)] mt-0.5">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono text-[var(--muted-fg)]">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-[var(--muted-fg)] leading-relaxed mb-5">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-[var(--muted-bg)] text-[var(--fg-page)] border border-[var(--subtle-border)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
