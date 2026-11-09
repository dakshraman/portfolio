'use client';

import { Terminal, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { aboutText } from '@/data/portfolio';

const categorizedSkills = {
  'Backend & Architecture': ['Laravel', 'PHP', 'Python', 'REST APIs', 'System Architecture', 'SQL', 'Database Design'],
  'Mobile & Apps': ['Flutter', 'Dart', 'Android', 'iOS', 'Firebase'],
  'Frontend & Tooling': ['React.js', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Vue.js'],
  'Cloud, DevOps & Systems': ['Docker', 'Linux', 'CI/CD Pipelines', 'Cyber Security', 'Nginx', 'Git'],
};

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-orange-500 mb-2">
              Background & Philosophy
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--fg-page)]">
              Engineering with purpose.
            </h2>
          </div>
          <p className="text-sm text-[var(--muted-fg)] max-w-md">
            Bridging high-level product strategy with low-level implementation details. Built to scale, not just to demo.
          </p>
        </div>

        {/* Bento Grid: Bio + Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Personal Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bento-card p-6 sm:p-8">
              <h3 className="text-xl font-bold text-[var(--fg-page)] mb-4">
                Code that scales with your ambition.
              </h3>
              <div className="space-y-4 text-sm sm:text-base text-[var(--muted-fg)] leading-relaxed font-light">
                {aboutText.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {/* Guiding Principles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-[var(--subtle-border)]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[var(--fg-page)] uppercase tracking-wider font-mono">
                      Pragmatic Architecture
                    </h4>
                    <p className="text-xs text-[var(--muted-fg)] mt-1">
                      No over-engineering. Choosing the right pattern for current reality and future growth.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[var(--fg-page)] uppercase tracking-wider font-mono">
                      Clear Ownership
                    </h4>
                    <p className="text-xs text-[var(--muted-fg)] mt-1">
                      Proactive communication, transparent daily standups, and reliable delivery timelines.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Categorized Tech Arsenal */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bento-card p-6 sm:p-7">
              <div className="flex items-center gap-2 mb-5">
                <Terminal className="w-4 h-4 text-orange-500" />
                <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-[var(--fg-page)]">
                  Technical Arsenal
                </h3>
              </div>

              <div className="space-y-5">
                {Object.entries(categorizedSkills).map(([category, items]) => (
                  <div key={category}>
                    <div className="text-xs font-mono text-[var(--muted-fg)] mb-2">
                      {category}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs font-medium px-2.5 py-1 rounded-md bg-[var(--muted-bg)] text-[var(--fg-page)] border border-[var(--subtle-border)] hover:border-orange-500/40 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
