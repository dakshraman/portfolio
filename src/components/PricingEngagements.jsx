'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Code2, 
  Rocket, 
  Layers, 
  HelpCircle,
  Calendar
} from 'lucide-react';

export default function PricingEngagements() {
  const [activeTab, setActiveTab] = useState('fixed'); // 'fixed' | 'fractional'
  const [selectedHours, setSelectedHours] = useState(20);

  // Tilt and Shine effect state for the spotlight card
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, isHovered: false });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e) => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y, isHovered: true });

    // Calculate subtle 3D tilt angles
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, isHovered: false }));
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <section id="pricing" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="section-label">
            Transparent Engagements
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--fg-page)] mb-4">
            Straightforward pricing. No surprise invoices.
          </h2>
          <p className="text-base text-[var(--muted-fg)] leading-relaxed font-normal">
            Choose between fixed-price product sprints with guaranteed milestone delivery, or flexible fractional capacity embedded directly into your engineering team.
          </p>
        </div>

        {/* Animate-UI Sliding Pill Tabs */}
        <div className="flex justify-center mb-10 sm:mb-12 px-2">
          <div className="inline-flex items-center p-1 sm:p-1.5 rounded-full nav-glass border border-[var(--card-border)] shadow-sm max-w-full overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('fixed')}
              className={`relative px-3.5 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer shrink-0 ${
                activeTab === 'fixed'
                  ? 'text-white'
                  : 'text-[var(--muted-fg)] hover:text-[var(--fg-page)]'
              }`}
            >
              {activeTab === 'fixed' && (
                <motion.div
                  layoutId="activeEngagementTab"
                  className="absolute inset-0 rounded-full bg-[var(--accent)] shadow-xs"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                <Rocket className="w-3.5 h-3.5" />
                <span>Fixed-Price Sprints</span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab('fractional')}
              className={`relative px-3.5 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer shrink-0 ${
                activeTab === 'fractional'
                  ? 'text-white'
                  : 'text-[var(--muted-fg)] hover:text-[var(--fg-page)]'
              }`}
            >
              {activeTab === 'fractional' && (
                <motion.div
                  layoutId="activeEngagementTab"
                  className="absolute inset-0 rounded-full bg-[var(--accent)] shadow-xs"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                <Clock className="w-3.5 h-3.5" />
                <span>Fractional &amp; Retainer</span>
              </span>
            </button>
          </div>
        </div>

        {/* Dynamic Content based on Active Tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'fixed' ? (
            <motion.div
              key="fixed-tab"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Spotlight Featured Card: Full-Cycle MVP (Animate-UI Tilt & Specular Shine) */}
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                  transition: mousePos.isHovered ? 'none' : 'transform 0.5s ease',
                }}
                className="lg:col-span-7 bento-card p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden border-2 border-[var(--accent)] shadow-2xl"
              >
                {/* Animate-UI Specular Shine Layer that follows cursor */}
                {mousePos.isHovered && (
                  <div
                    className="pointer-events-none absolute inset-0 z-0 opacity-40 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, var(--accent-glow-strong), transparent 70%)`,
                    }}
                  />
                )}

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[var(--accent)] text-white shadow-xs">
                      <Sparkles className="w-3.5 h-3.5" />
                      Most Popular
                    </span>
                    <span className="text-xs font-mono text-[var(--muted-fg)] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
                      3–5 Weeks Delivery
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[var(--fg-page)] mb-2">
                    Full-Cycle MVP Sprint
                  </h3>
                  <p className="text-sm text-[var(--muted-fg)] leading-relaxed mb-6">
                    Turn your concept into a production-ready, launchable product. I take complete ownership of the backend architecture, mobile apps, database design, and store deployment.
                  </p>

                  {/* Pricing Display */}
                  <div className="p-5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-[var(--subtle-border)] mb-7">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-extrabold font-mono text-[var(--fg-page)]">
                        Custom Quote
                      </span>
                      <span className="text-xs sm:text-sm text-[var(--muted-fg)] font-mono">
                        (Typically $3,500 – $7,500)
                      </span>
                    </div>
                    <p className="text-xs text-[var(--muted-fg)] mt-1.5">
                      Fixed milestone billing: 40% upfront kickoff, 30% after staging build, 30% upon production deployment.
                    </p>
                  </div>

                  {/* Included Deliverables */}
                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-mono uppercase tracking-wider text-[var(--fg-page)] font-bold">
                      What&apos;s Included in the Sprint:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[var(--fg-page)]">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                        <span>Laravel scalable backend &amp; REST APIs</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                        <span>Flutter cross-platform app (iOS &amp; Android)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                        <span>Database schema design &amp; query indexing</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                        <span>Stripe / Razorpay payment integration</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                        <span>Admin portal for managing users &amp; data</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                        <span>30-Day complimentary bug warranty</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 pt-4 border-t border-[var(--subtle-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-[var(--muted-fg)]">
                    Direct access via Slack / Telegram · Weekly Loom updates
                  </div>
                  <Link
                    href="#contact"
                    className="w-full sm:w-auto btn-primary"
                  >
                    <span>Discuss Your Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Side Card: Architecture & Code Audit */}
              <div className="lg:col-span-5 bento-card p-7 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[var(--muted-bg)] text-[var(--muted-fg)] border border-[var(--subtle-border)]">
                      Fast Turnaround
                    </span>
                    <span className="text-xs font-mono text-emerald-500 font-semibold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      3 Business Days
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[var(--fg-page)] mb-2">
                    Codebase &amp; Architecture Audit
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--muted-fg)] leading-relaxed mb-6">
                    Diagnose sluggish APIs, uncover database bottlenecks, and identify security vulnerabilities in your existing Laravel backend or Flutter codebase before scaling.
                  </p>

                  {/* Fixed Price */}
                  <div className="p-4 rounded-2xl bg-[var(--muted-bg)] border border-[var(--subtle-border)] mb-6">
                    <div className="text-3xl font-extrabold font-mono text-[var(--fg-page)]">
                      $950
                    </div>
                    <div className="text-xs text-[var(--muted-fg)] mt-1">
                      Flat fee · Full comprehensive review delivered in 72 hours
                    </div>
                  </div>

                  {/* Inclusions */}
                  <div className="space-y-3 mb-6">
                    <div className="text-xs font-mono uppercase tracking-wider text-[var(--fg-page)] font-bold">
                      Key Deliverables:
                    </div>
                    <ul className="space-y-2 text-xs text-[var(--fg-page)]">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                        <span>Slow query &amp; N+1 query profiling report</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                        <span>Security, auth, and API rate-limiting audit</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                        <span>Actionable PDF summary + 45-min video review call</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                        <span>Prioritized GitHub pull-request fixes for top 3 issues</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--subtle-border)]">
                  <Link
                    href="#contact"
                    className="w-full btn-ghost"
                  >
                    <span>Book Code Audit</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="fractional-tab"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Fractional Staff Engineer Card */}
              <div className="lg:col-span-7 bento-card p-7 sm:p-9 flex flex-col justify-between border-2 border-[var(--accent)] shadow-2xl">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[var(--accent)] text-white shadow-xs">
                      Dedicated Engineering
                    </span>
                    <span className="text-xs font-mono text-[var(--muted-fg)]">
                      Weekly Retainer / Ongoing
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[var(--fg-page)] mb-2">
                    Fractional Staff Developer
                  </h3>
                  <p className="text-sm text-[var(--muted-fg)] leading-relaxed mb-6">
                    Embed a senior Laravel and Flutter specialist into your team without the long hiring cycle or payroll overhead. Perfect for shipping roadmap features and refactoring critical infrastructure.
                  </p>

                  {/* Hourly / Weekly Rates */}
                  <div className="p-5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-[var(--subtle-border)] mb-7">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-extrabold font-mono text-[var(--fg-page)]">
                        $45 – $65
                      </span>
                      <span className="text-sm text-[var(--muted-fg)] font-mono">
                        / hour
                      </span>
                    </div>
                    <div className="text-xs text-[var(--muted-fg)] mt-1.5">
                      Flexible packages from 10 to 30 hours per week · Billed weekly with tracked time logs
                    </div>
                  </div>

                  {/* Inclusions */}
                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-mono uppercase tracking-wider text-[var(--fg-page)] font-bold">
                      How We Collaborate:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[var(--fg-page)]">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                        <span>Daily async standups via Slack or Discord</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                        <span>Feature development, bug fixes, &amp; refactoring</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                        <span>Direct GitHub PR reviews &amp; code quality checks</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                        <span>Sprint planning &amp; technical advisory</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--subtle-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-[var(--muted-fg)]">
                    No long-term lock-in · Cancel or adjust weekly
                  </div>
                  <Link
                    href="#contact"
                    className="w-full sm:w-auto btn-primary"
                  >
                    <span>Check Retainer Availability</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Animate-UI Interactive Hours & Scope Estimator */}
              <div className="lg:col-span-5 bento-card p-7 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--accent)] font-semibold mb-3">
                    <Zap className="w-4 h-4" />
                    <span>Sprint Capacity Planner</span>
                  </div>

                  <h3 className="text-xl font-bold text-[var(--fg-page)] mb-2">
                    Estimate Your Weekly Block
                  </h3>
                  <p className="text-xs text-[var(--muted-fg)] leading-relaxed mb-6">
                    Adjust the weekly hours below to estimate the budget and output for an embedded engineering sprint.
                  </p>

                  {/* Slider Control */}
                  <div className="p-5 rounded-2xl bg-[var(--muted-bg)] border border-[var(--subtle-border)] mb-6">
                    <div className="flex justify-between items-center text-xs font-mono mb-2">
                      <span className="text-[var(--muted-fg)]">Dedicated Weekly Hours:</span>
                      <span className="font-bold text-base text-[var(--accent)]">
                        {selectedHours} hrs / week
                      </span>
                    </div>

                    <input
                      type="range"
                      min="10"
                      max="35"
                      step="5"
                      value={selectedHours}
                      onChange={(e) => setSelectedHours(Number(e.target.value))}
                      className="w-full h-2 rounded-lg bg-[var(--card-border)] accent-[var(--accent)] cursor-pointer"
                    />

                    <div className="flex justify-between text-[9px] sm:text-[10px] font-mono text-[var(--muted-fg)] mt-2">
                      <span>10h (Part-Time)</span>
                      <span>20h (Core)</span>
                      <span>35h (Full Focus)</span>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[var(--subtle-border)] flex items-center justify-between">
                      <span className="text-xs text-[var(--muted-fg)]">Estimated Weekly Cost:</span>
                      <span className="font-mono font-bold text-lg text-[var(--fg-page)]">
                        ${selectedHours * 50} – ${selectedHours * 60}
                      </span>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="space-y-2 text-xs text-[var(--muted-fg)] mb-6">
                    <div className="font-semibold text-[var(--fg-page)] font-mono text-[11px] uppercase tracking-wider">
                      Best Suited For:
                    </div>
                    {selectedHours <= 15 ? (
                      <p>Ongoing maintenance, code reviews, architectural advice, and small weekly feature improvements.</p>
                    ) : selectedHours <= 25 ? (
                      <p>Active feature sprints, shipping key modules, API endpoints, and resolving complex edge cases.</p>
                    ) : (
                      <p>Fast-paced product buildout, major refactoring initiatives, and dedicated full-cycle execution.</p>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--subtle-border)]">
                  <Link
                    href="#contact"
                    className="w-full btn-ghost"
                  >
                    <span>Inquire About This Block</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Guarantees & Transparency Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14 pt-8 border-t border-[var(--subtle-border)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[var(--fg-page)]">30-Day Bug Warranty</div>
              <div className="text-xs text-[var(--muted-fg)]">Zero-cost post-launch defect fixes on fixed projects.</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center shrink-0 border border-[var(--accent)]/20">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[var(--fg-page)]">100% Code &amp; IP Ownership</div>
              <div className="text-xs text-[var(--muted-fg)]">All repositories, credentials, and assets belong to you.</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0 border border-blue-500/20">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[var(--fg-page)]">Clear Weekly Invoicing</div>
              <div className="text-xs text-[var(--muted-fg)]">Transparent milestone sign-offs and simple payment terms.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
