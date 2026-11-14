'use client';

import { Icon } from '@iconify/react';
import { Terminal, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { aboutText } from '@/data/portfolio';

const track1 = [
  { name: 'Laravel', icon: 'logos:laravel', category: 'Backend', color: '#FF2D20' },
  { name: 'Flutter', icon: 'logos:flutter', category: 'Mobile', color: '#02569B' },
  { name: 'PHP', icon: 'logos:php', category: 'Backend', color: '#777BB4' },
  { name: 'Python', icon: 'logos:python', category: 'Backend', color: '#3776AB' },
  { name: 'REST APIs', icon: 'tabler:api', category: 'Backend', color: '#0071E3' },
  { name: 'MySQL', icon: 'logos:mysql-icon', category: 'Database', color: '#4479A1' },
  { name: 'PostgreSQL', icon: 'logos:postgresql', category: 'Database', color: '#4169E1' },
  { name: 'Redis', icon: 'logos:redis', category: 'Cache & Queue', color: '#DC382D' },
  { name: 'React', icon: 'logos:react', category: 'Frontend', color: '#61DAFB' },
  { name: 'Next.js', icon: 'logos:nextjs-icon', category: 'Frontend', color: '#000000' },
  { name: 'Dart', icon: 'logos:dart', category: 'Mobile', color: '#0175C2' },
  { name: 'Firebase', icon: 'logos:firebase', category: 'Cloud', color: '#FFCA28' },
];

const track2 = [
  { name: 'Docker', icon: 'logos:docker-icon', category: 'DevOps', color: '#2496ED' },
  { name: 'Linux', icon: 'logos:linux-tux', category: 'Systems', color: '#FCC624' },
  { name: 'Nginx', icon: 'logos:nginx', category: 'Web Server', color: '#009639' },
  { name: 'Git', icon: 'logos:git-icon', category: 'VCS', color: '#F05032' },
  { name: 'TypeScript', icon: 'logos:typescript-icon', category: 'Frontend', color: '#3178C6' },
  { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon', category: 'Styling', color: '#06B6D4' },
  { name: 'Vue.js', icon: 'logos:vue', category: 'Frontend', color: '#4FC08D' },
  { name: 'CI/CD Pipelines', icon: 'logos:github-actions', category: 'DevOps', color: '#2088FF' },
  { name: 'Cyber Security', icon: 'carbon:security', category: 'Hardening', color: '#EE1111' },
  { name: 'Android', icon: 'logos:android-icon', category: 'Mobile', color: '#3DDC84' },
  { name: 'iOS', icon: 'logos:apple', category: 'Mobile', color: '#8E8E93' },
  { name: 'System Architecture', icon: 'carbon:flow-modeler', category: 'Architecture', color: '#0071E3' },
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="section-label">
              Background &amp; Philosophy
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--fg-page)]">
              Engineering with purpose.
            </h2>
          </div>
          <p className="text-sm text-[var(--muted-fg)] max-w-md">
            Bridging high-level product strategy with low-level implementation details. Built to scale, not just to demo.
          </p>
        </div>

        {/* Narrative & Principles Bento Card */}
        <div className="bento-card p-6 sm:p-9 mb-14">
          <h3 className="text-xl sm:text-2xl font-bold text-[var(--fg-page)] mb-4">
            Code that scales with your ambition.
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm sm:text-base text-[var(--muted-fg)] leading-relaxed font-normal mb-8">
            {aboutText.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {/* Guiding Principles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-6 border-t border-[var(--subtle-border)]">
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[var(--fg-page)] uppercase tracking-wider font-mono">
                  Pragmatic Architecture
                </h4>
                <p className="text-xs text-[var(--muted-fg)] mt-1 leading-relaxed">
                  No over-engineering. Choosing proven patterns for current reality and future growth.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[var(--fg-page)] uppercase tracking-wider font-mono">
                  Clear Ownership
                </h4>
                <p className="text-xs text-[var(--muted-fg)] mt-1 leading-relaxed">
                  Proactive communication, transparent daily standups, and reliable delivery timelines.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Arsenal: Continuous Moving Strips (No Enclosing Card) */}
        <div>
          <div className="flex items-center justify-between mb-5 px-1">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[var(--accent)]" />
              <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-[var(--fg-page)]">
                Technical Arsenal · Core Stack &amp; Tooling
              </h3>
            </div>
            <span className="text-[11px] font-mono text-[var(--muted-fg)] hidden sm:inline">
              Hover to pause &amp; inspect
            </span>
          </div>

          <div className="marquee-container marquee-mask space-y-3.5 overflow-hidden py-2">
            {/* Strip 1: Scrolling Left */}
            <div className="animate-marquee-left gap-3.5">
              {[...track1, ...track1].map((tech, idx) => (
                <div
                  key={`track1-${tech.name}-${idx}`}
                  className="group shrink-0 px-4 py-2.5 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--accent)] flex items-center gap-3 shadow-xs hover:shadow-md transition-all cursor-pointer hover:scale-105"
                >
                  <Icon icon={tech.icon} className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-xs font-semibold text-[var(--fg-page)] tracking-tight">
                    {tech.name}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--muted-bg)] text-[var(--muted-fg)] border border-[var(--subtle-border)]">
                    {tech.category}
                  </span>
                </div>
              ))}
            </div>

            {/* Strip 2: Scrolling Right */}
            <div className="animate-marquee-right gap-3.5">
              {[...track2, ...track2].map((tech, idx) => (
                <div
                  key={`track2-${tech.name}-${idx}`}
                  className="group shrink-0 px-4 py-2.5 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--accent)] flex items-center gap-3 shadow-xs hover:shadow-md transition-all cursor-pointer hover:scale-105"
                >
                  <Icon icon={tech.icon} className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-xs font-semibold text-[var(--fg-page)] tracking-tight">
                    {tech.name}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--muted-bg)] text-[var(--muted-fg)] border border-[var(--subtle-border)]">
                    {tech.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
