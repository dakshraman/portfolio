'use client';

import Link from 'next/link';
import { ArrowUpRight, Check, Server, Smartphone, Cpu, Cloud, Database, Wrench } from 'lucide-react';
import { services } from '@/data/portfolio';

const serviceIcons = {
  laravel: Server,
  flutter: Smartphone,
  api: Cpu,
  devops: Cloud,
  architecture: Database,
  consulting: Wrench,
};

export default function Services() {
  // 2 Primary Flagship Pillars
  const primaryServices = services.filter((s) => s.slug === 'laravel-development' || s.slug === 'flutter-app-development');
  
  // 4 Specialized Engineering Disciplines
  const specializedServices = services.filter(
    (s) => s.slug === 'api-design-development' || s.slug === 'devops' || s.slug === 'system-architecture' || s.slug === 'it-consulting'
  );

  return (
    <section id="services" className="py-20 md:py-32 relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="section-label">
              Capabilities &amp; Offerings
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--fg-page)] leading-tight">
              Specialized engineering disciplines.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[var(--muted-fg)] max-w-md leading-relaxed font-normal">
            Whether launching a high-growth startup MVP or hardening production infrastructure, I deliver targeted, end-to-end technical execution without agency middlemen.
          </p>
        </div>

        {/* 2-Tier Balanced Bento Hierarchy */}
        <div className="space-y-6">
          {/* Tier 1: Two Core Flagship Pillars */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {primaryServices.map((service) => {
              const Icon = serviceIcons[service.icon] || Server;
              return (
                <div
                  key={service.slug}
                  className="lg:col-span-6 bento-card p-7 sm:p-8 flex flex-col justify-between group hover:-translate-y-1 relative"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center border border-[var(--accent)]/20 shadow-xs group-hover:bg-[var(--accent)] group-hover:text-white transition-all">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[var(--accent)]">
                          Core Pillar
                        </span>
                      </div>

                      <Link
                        href={`/services/${service.slug}`}
                        className="w-8 h-8 rounded-full border border-[var(--subtle-border)] flex items-center justify-center text-[var(--muted-fg)] hover:text-[var(--accent)] hover:border-[var(--card-hover-border)] transition-colors"
                        aria-label={`Learn more about ${service.title}`}
                      >
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-[var(--fg-page)] mb-3 group-hover:text-[var(--accent)] transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-sm text-[var(--muted-fg)] leading-relaxed mb-6 font-normal">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-5 border-t border-[var(--subtle-border)]">
                    <div className="text-xs font-mono uppercase tracking-wider text-[var(--muted-fg)] mb-3 font-semibold">
                      Standard Inclusions
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.features.map((feat) => (
                        <div key={feat} className="flex items-center gap-2 text-xs text-[var(--fg-page)]">
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tier 2: Four Specialized Disciplines (Balanced 4-col / 2x2 grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specializedServices.map((service) => {
              const Icon = serviceIcons[service.icon] || Cpu;
              return (
                <div
                  key={service.slug}
                  className="bento-card p-6 flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-9 h-9 rounded-xl bg-[var(--muted-bg)] text-[var(--fg-page)] flex items-center justify-center border border-[var(--subtle-border)] group-hover:border-[var(--accent)] transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>

                      <Link
                        href={`/services/${service.slug}`}
                        className="w-7 h-7 rounded-full border border-[var(--subtle-border)] flex items-center justify-center text-[var(--muted-fg)] hover:text-[var(--accent)] transition-colors"
                        aria-label={`Learn more about ${service.title}`}
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <h4 className="text-base font-bold text-[var(--fg-page)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                      {service.title}
                    </h4>

                    <p className="text-xs text-[var(--muted-fg)] leading-relaxed mb-5 font-normal">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--subtle-border)]">
                    <ul className="space-y-1.5">
                      {service.features.slice(0, 3).map((feat) => (
                        <li key={feat} className="flex items-center gap-2 text-[11px] text-[var(--muted-fg)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                          <span className="truncate">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
