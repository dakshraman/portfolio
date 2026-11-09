'use client';

import Link from 'next/link';
import { ArrowUpRight, Check, Server, Smartphone, Cpu, Cloud, Database, Layers, Wrench } from 'lucide-react';
import { services } from '@/data/portfolio';

const serviceIcons = {
  laravel: Server,
  flutter: Smartphone,
  api: Cpu,
  devops: Cloud,
  architecture: Database,
  fullstack: Layers,
  consulting: Wrench,
};

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-orange-500 mb-2">
              Capabilities & Offerings
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--fg-page)]">
              Specialized engineering services.
            </h2>
          </div>
          <p className="text-sm text-[var(--muted-fg)] max-w-md">
            Whether launching a venture-backed MVP or scaling existing enterprise infrastructure, I provide targeted, end-to-end technical execution.
          </p>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = serviceIcons[service.icon] || Server;

            return (
              <div
                key={service.slug}
                className="bento-card p-6 sm:p-7 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center border border-orange-500/20 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>

                    <Link
                      href={`/services/${service.slug}`}
                      className="w-8 h-8 rounded-full border border-[var(--subtle-border)] flex items-center justify-center text-[var(--muted-fg)] hover:text-orange-500 hover:border-orange-500/50 transition-colors"
                      aria-label={`Learn more about ${service.title}`}
                    >
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>

                  <h3 className="text-xl font-bold text-[var(--fg-page)] mb-2.5 group-hover:text-orange-500 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-[var(--muted-fg)] leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--subtle-border)]">
                  <div className="text-xs font-semibold text-[var(--fg-page)] mb-3 uppercase tracking-wider font-mono">
                    Key Deliverables
                  </div>
                  <ul className="space-y-2">
                    {service.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-xs text-[var(--muted-fg)]">
                        <Check className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
