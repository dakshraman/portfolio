'use client';

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/portfolio';

const categories = ['All', 'Laravel', 'Flutter', 'DevOps', 'API', 'Full Stack'];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Laravel') return project.tags.some((t) => t.toLowerCase().includes('laravel'));
    if (activeCategory === 'Flutter') return project.tags.some((t) => t.toLowerCase().includes('flutter'));
    if (activeCategory === 'DevOps') return project.tags.some((t) => t.toLowerCase().includes('devops') || t.toLowerCase().includes('cloud') || t.toLowerCase().includes('linux'));
    if (activeCategory === 'API') return project.tags.some((t) => t.toLowerCase().includes('api'));
    if (activeCategory === 'Full Stack') return project.tags.some((t) => t.toLowerCase().includes('full stack') || t.toLowerCase().includes('erp'));
    return true;
  });

  return (
    <section id="projects" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="section-label">
              Selected Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--fg-page)]">
              Proven work shipped to production.
            </h2>
          </div>

          {/* Category Filter Tabs (Apple Pill Design) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl sm:rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] shadow-xs">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeCategory === category
                    ? 'bg-[var(--accent)] text-white shadow-xs font-semibold'
                    : 'text-[var(--muted-fg)] hover:text-[var(--fg-page)] hover:bg-[var(--muted-bg)]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.title}
              className="bento-card p-6 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-md bg-[var(--muted-bg)] text-[var(--muted-fg)] border border-[var(--subtle-border)]">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[var(--muted-fg)]">
                      #{String(idx + 1).padStart(2, '0')}
                    </span>
                    {(project.link || project.github) && (
                      <a
                        href={project.link || project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 rounded-full border border-[var(--subtle-border)] flex items-center justify-center text-[var(--muted-fg)] hover:text-[var(--accent)] hover:border-[var(--card-hover-border)] transition-colors"
                        aria-label={`Open ${project.title}`}
                      >
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[var(--fg-page)] mb-2.5 group-hover:text-[var(--accent)] transition-colors">
                  {(project.link || project.github) ? (
                    <a
                      href={project.link || project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {project.title}
                    </a>
                  ) : (
                    project.title
                  )}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--muted-fg)] leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--subtle-border)]">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--muted-bg)] text-[var(--fg-page)] border border-[var(--subtle-border)]"
                    >
                      {tag}
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
