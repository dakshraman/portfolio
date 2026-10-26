'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  aboutStats,
  aboutText,
  experiences,
  highlights,
  projects,
  services,
  siteConfig,
  testimonials,
} from '@/data/portfolio';
import { STATION_MAP } from './studioConfig';

const PROJECT_ACCENTS = ['#A78BFA', '#22D3EE', '#FE7F2D', '#4ADE80', '#F472B6', '#FBBF24'];

const SKILL_GROUPS = [
  {
    title: 'Backend & APIs',
    accent: '#FE7F2D',
    items: ['Laravel', 'PHP', 'REST APIs', 'SQL', 'API Design', 'System Architecture'],
  },
  {
    title: 'Mobile',
    accent: '#22D3EE',
    items: ['Flutter', 'Dart', 'Firebase', 'App Store deployment'],
  },
  {
    title: 'Frontend',
    accent: '#A78BFA',
    items: ['React.js', 'Next.js', 'WordPress', 'Shopify', 'Responsive UI'],
  },
  {
    title: 'DevOps & Platform',
    accent: '#4ADE80',
    items: ['Linux', 'Docker', 'CI/CD', 'Cloud deployment', 'Server management'],
  },
  {
    title: 'Also in the toolbox',
    accent: '#F472B6',
    items: ['Python', 'Java', 'C++', 'Cyber Security', 'Performance tuning'],
  },
];

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function ArrowIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function ExternalIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1116 0z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function CopyIcon({ copied }) {
  return copied ? (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 13l4 4L19 7" />
    </svg>
  ) : (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V6a2 2 0 012-2h9" />
    </svg>
  );
}

function AboutPanel() {
  return (
    <div className="studio-modal__content">
      <p className="studio-modal__lead">{aboutText[0]}</p>
      <p className="studio-modal__body-copy">{aboutText[1]}</p>

      <div className="studio-stats">
        {aboutStats.map((stat) => (
          <div className="studio-stat" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>

      <h3 className="studio-modal__subhead">The road so far</h3>
      <div className="studio-timeline">
        {experiences.map((experience) => (
          <article className="studio-timeline__item" key={`${experience.company}-${experience.period}`}>
            <div className="studio-timeline__dot" />
            <div>
              <div className="studio-timeline__top">
                <h4>{experience.role}</h4>
                <span>{experience.period}</span>
              </div>
              <p className="studio-timeline__company">{experience.company} · {experience.location}</p>
              <p>{experience.description}</p>
              <div className="studio-chip-row">
                {experience.technologies.map((tech) => (
                  <span className="studio-chip" key={tech}>{tech}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <blockquote className="studio-quote">
        <p>&ldquo;{testimonials[0].quote}&rdquo;</p>
        <footer>{testimonials[0].name} · {testimonials[0].role}</footer>
      </blockquote>

      <div className="studio-modal__actions">
        <a href={`mailto:${siteConfig.email}?subject=Project%20inquiry%20%E2%80%94%20Virtual%20Studio`} className="studio-btn studio-btn--primary">
          <MailIcon />
          Start a conversation
        </a>
        <a href="/Raman-Daksh.pdf" className="studio-btn" target="_blank" rel="noopener noreferrer">
          <DownloadIcon />
          Download resume
        </a>
      </div>
    </div>
  );
}

function ProjectsPanel() {
  const [filter, setFilter] = useState('All');
  const categories = useMemo(() => ['All', ...new Set(projects.map((project) => project.category))], []);
  const filtered = useMemo(
    () => (filter === 'All' ? projects : projects.filter((project) => project.category === filter)),
    [filter]
  );

  return (
    <div className="studio-modal__content">
      <p className="studio-modal__lead">
        A gallery of shipped products: mobile apps, APIs, CRMs, and platforms built for real users.
      </p>

      <div className="studio-highlight-grid">
        {highlights.map((highlight, index) => (
          <article
            className="studio-highlight-card"
            key={highlight.title}
            style={{ '--card-accent': highlight.accent || PROJECT_ACCENTS[index % PROJECT_ACCENTS.length] }}
          >
            <div className="studio-highlight-card__art" aria-hidden="true">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div className="studio-highlight-card__rings" />
            </div>
            <div className="studio-highlight-card__body">
              <p className="studio-eyebrow">Featured build</p>
              <h3>{highlight.title}</h3>
              <p>{highlight.description}</p>
              <div className="studio-chip-row">
                {highlight.tags.map((tag) => (
                  <span className="studio-chip" key={tag}>{tag}</span>
                ))}
              </div>
              <div className="studio-card-links">
                {highlight.github && (
                  <a href={highlight.github} target="_blank" rel="noopener noreferrer">
                    Visit project <ExternalIcon />
                  </a>
                )}
                {highlight.backend && (
                  <a href={highlight.backend} target="_blank" rel="noopener noreferrer">
                    Backend repo <ExternalIcon />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="studio-filter-bar" role="group" aria-label="Filter projects by category">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`studio-filter ${filter === category ? 'is-active' : ''}`}
            aria-pressed={filter === category}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="studio-project-grid">
        {filtered.map((project) => {
          const index = projects.indexOf(project);
          const accent = PROJECT_ACCENTS[index % PROJECT_ACCENTS.length];
          return (
            <article className="studio-project-card" key={project.title} style={{ '--card-accent': accent }}>
              <div className="studio-project-card__art" aria-hidden="true">
                <span className="studio-project-card__index">{String(index + 1).padStart(2, '0')}</span>
                <span className="studio-project-card__line" />
                <span className="studio-project-card__line studio-project-card__line--short" />
              </div>
              <p className="studio-eyebrow">{project.category}</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="studio-chip-row">
                {project.tags.map((tag) => (
                  <span className="studio-chip" key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          );
        })}
      </div>

      <div className="studio-modal__actions">
        <Link href="/#projects" className="studio-btn studio-btn--primary">
          Read the full case studies
          <ArrowIcon />
        </Link>
        <Link href="/freelance" className="studio-btn">
          See how I can help
          <ArrowIcon />
        </Link>
      </div>
    </div>
  );
}

function SkillsPanel() {
  return (
    <div className="studio-modal__content">
      <p className="studio-modal__lead">
        Four years of production work across the Laravel and Flutter ecosystems, with the infrastructure
        to ship and keep it running.
      </p>

      <div className="studio-skill-grid">
        {SKILL_GROUPS.map((group) => (
          <section className="studio-skill-card" key={group.title} style={{ '--card-accent': group.accent }}>
            <div className="studio-skill-card__head">
              <span className="studio-skill-card__beacon" />
              <h3>{group.title}</h3>
            </div>
            <div className="studio-chip-row">
              {group.items.map((item) => (
                <span className="studio-chip" key={item}>{item}</span>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="studio-skill-note">
        <span className="studio-skill-note__dot" />
        <p>
          Primary stack: <strong>Laravel + Flutter + React</strong>. Currently exploring real-time
          systems, AI-assisted developer tooling, and edge deployment.
        </p>
      </div>

      <h3 className="studio-modal__subhead">Services that use this stack</h3>
      <div className="studio-service-list">
        {services.map((service) => (
          <Link href={`/services/${service.slug}`} className="studio-service-row" key={service.slug}>
            <span>
              <strong>{service.title}</strong>
              <small>{service.features.slice(0, 2).join(' · ')}</small>
            </span>
            <ArrowIcon />
          </Link>
        ))}
      </div>

      <div className="studio-modal__actions">
        <Link href="/#services" className="studio-btn studio-btn--primary">
          Explore all services
          <ArrowIcon />
        </Link>
        <a href={`mailto:${siteConfig.email}?subject=Technical%20consulting`} className="studio-btn">
          <MailIcon />
          Ask a technical question
        </a>
      </div>
    </div>
  );
}

function ContactPanel() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${siteConfig.email}`;
    }
  };

  return (
    <div className="studio-modal__content">
      <p className="studio-modal__lead">
        Have a product to ship, a backend to untangle, or a technical decision to pressure-test?
        The mailbox is open.
      </p>

      <div className="studio-contact-card">
        <div className="studio-contact-card__status">
          <span className="studio-status-dot" />
          {siteConfig.availability}
        </div>
        <a className="studio-contact-email" href={`mailto:${siteConfig.email}`}>
          {siteConfig.email}
        </a>
        <div className="studio-contact-meta">
          <span><PinIcon /> {siteConfig.location}</span>
          <span>4+ years · 20+ projects</span>
        </div>
        <div className="studio-modal__actions studio-modal__actions--tight">
          <a
            href={`mailto:${siteConfig.email}?subject=Project%20inquiry%20%E2%80%94%20Virtual%20Studio&body=Hi%20Raman%2C%0A%0AI%27d%20like%20to%20talk%20about%20a%20project.%0A%0AProject%3A%20%0ATimeline%3A%20%0ABudget%3A%20`}
            className="studio-btn studio-btn--primary"
          >
            <MailIcon />
            Send a project brief
          </a>
          <button type="button" className="studio-btn" onClick={copyEmail}>
            <CopyIcon copied={copied} />
            {copied ? 'Copied' : 'Copy email'}
          </button>
        </div>
        <p className="studio-contact-note" aria-live="polite">
          {copied ? 'Email address copied to clipboard.' : 'Typical reply within one business day.'}
        </p>
      </div>

      <div className="studio-social-grid">
        <a href={siteConfig.github} target="_blank" rel="noopener noreferrer">
          <span>GitHub</span>
          <small>Code & open source</small>
          <ExternalIcon />
        </a>
        <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">
          <span>LinkedIn</span>
          <small>Experience & recommendations</small>
          <ExternalIcon />
        </a>
        <a href={siteConfig.telegram} target="_blank" rel="noopener noreferrer">
          <span>Telegram</span>
          <small>Quick questions</small>
          <ExternalIcon />
        </a>
        <a href="/Raman-Daksh.pdf" target="_blank" rel="noopener noreferrer">
          <span>Résumé</span>
          <small>One-page PDF</small>
          <DownloadIcon />
        </a>
      </div>

      <div className="studio-contact-footer">
        <p>Prefer a quieter, faster read?</p>
        <Link href="/#contact" className="studio-btn studio-btn--ghost">
          Open the classic contact section
          <ArrowIcon />
        </Link>
      </div>
    </div>
  );
}

const PANEL_CONTENT = {
  about: AboutPanel,
  projects: ProjectsPanel,
  skills: SkillsPanel,
  contact: ContactPanel,
};

const PANEL_TITLES = {
  about: 'The person behind the pixels.',
  projects: 'Selected work, shipped.',
  skills: 'The stack behind the studio.',
  contact: 'Let’s build something worth shipping.',
};

export default function StudioModals({ stationId, onClose }) {
  const reduceMotion = useReducedMotion();
  const panelRef = useRef(null);
  const station = stationId ? STATION_MAP[stationId] : null;
  const Content = stationId ? PANEL_CONTENT[stationId] : null;

  useEffect(() => {
    if (!stationId) return undefined;

    const previousFocus = document.activeElement;
    const panel = panelRef.current;
    const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusable = panel ? Array.from(panel.querySelectorAll(focusableSelector)) : [];

    if (focusable.length) {
      focusable[0].focus({ preventScroll: true });
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !panel) return;

      const items = Array.from(panel.querySelectorAll(focusableSelector));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      if (previousFocus && typeof previousFocus.focus === 'function') {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, [stationId, onClose]);

  return (
    <AnimatePresence>
      {station && Content && (
        <motion.div
          className="studio-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.24 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={panelRef}
            className="studio-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="studio-modal-title"
            aria-describedby="studio-modal-description"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 28, scale: reduceMotion ? 1 : 0.975 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : 18, scale: reduceMotion ? 1 : 0.985 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{ '--station-accent': station.accent }}
          >
            <button
              type="button"
              className="studio-modal__close"
              onClick={onClose}
              aria-label={`Close ${station.label} panel`}
              title="Close (Esc)"
            >
              <CloseIcon />
            </button>
            <div className="studio-modal__glow" aria-hidden="true" />

            <div className="studio-modal__titlebar" aria-hidden="true">
              <span className="studio-modal__titlebar-label">
                <span className="studio-modal__titlebar-gem" />
                {station.label}
              </span>
              <span className="studio-modal__titlebar-meta">
                Station {String(station.order).padStart(2, '0')} / 04
              </span>
            </div>

            <div className="studio-modal__scroll">
              <header className="studio-modal__header">
                <p className="studio-modal__eyebrow">
                  <span className="studio-modal__eyebrow-dot" />
                  Station {String(station.order).padStart(2, '0')} · {station.tagline}
                </p>
                <h2 id="studio-modal-title">{PANEL_TITLES[station.id]}</h2>
                <p id="studio-modal-description" className="studio-modal__description">
                  {station.description}
                </p>
              </header>

              <Content />

              <footer className="studio-modal__footer">
                <div>
                  <span className="studio-modal__footer-mark">RD</span>
                  <p>Raman Daksh · Freelance software engineer</p>
                </div>
                <div className="studio-modal__footer-links">
                  <span className="studio-modal__esc-hint"><kbd>Esc</kbd> to close</span>
                  <Link href="/">Switch to classic view</Link>
                  <a href="/Raman-Daksh.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
                </div>
              </footer>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
