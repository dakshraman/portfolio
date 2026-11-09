'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Experience', href: '#experience' },
    { label: 'Writing', href: '#blog' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 sm:py-4 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <nav
          className={`nav-glass rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'shadow-lg shadow-black/5 dark:shadow-black/25' : ''
          }`}
          aria-label="Main Navigation"
        >
          {/* Brand & Availability Status */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Raman Daksh - Home"
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 text-white font-bold text-sm tracking-tight shadow-md group-hover:scale-105 transition-transform">
              RD
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm tracking-tight text-[var(--fg-page)] leading-none group-hover:text-orange-500 transition-colors">
                Raman Daksh
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-[var(--muted-fg)] mt-1 font-mono">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Available for work
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-3.5 py-1.5 text-xs lg:text-sm font-medium text-[var(--muted-fg)] hover:text-[var(--fg-page)] rounded-full hover:bg-[var(--muted-bg)] transition-colors flex items-center gap-1.5"
              >
                {item.label}
                {item.badge && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-orange-500/10 text-orange-500 border border-orange-500/20">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Right Controls: Theme Toggle + CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <ThemeToggle />

            <Link
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full bg-[var(--fg-page)] text-[var(--bg-page)] hover:opacity-90 active:scale-95 transition-all shadow-sm"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--fg-page)]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileOpen && (
          <div className="md:hidden mt-2 nav-glass rounded-2xl p-4 shadow-xl border border-[var(--card-border)] animate-in fade-in duration-200">
            <div className="flex flex-col gap-1">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium text-[var(--fg-page)] hover:bg-[var(--muted-bg)] rounded-xl transition-colors flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-500 border border-orange-500/20">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
              <div className="pt-2 mt-2 border-t border-[var(--subtle-border)]">
                <Link
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl bg-[var(--fg-page)] text-[var(--bg-page)] hover:opacity-90 transition-opacity"
                >
                  <span>Get in Touch</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
