'use client';

import { useState } from 'react';
import { Mail, Send, Check, Copy, Globe, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { LinkedinIcon, TelegramIcon } from './Icons';
import { siteConfig } from '@/data/portfolio';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    service: 'Full-Cycle MVP (Laravel + Flutter)',
    budget: '$3,000 – $6,000',
    timeline: 'Within 1 Month',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailto = `mailto:${siteConfig.email}?subject=Freelance Project Inquiry: ${formState.service} from ${encodeURIComponent(
      formState.name
    )}&body=${encodeURIComponent(
      `Name: ${formState.name}
Email: ${formState.email}
Service: ${formState.service}
Budget Range: ${formState.budget}
Target Timeline: ${formState.timeline}

Project Details:
${formState.message}`
    )}`;
    window.location.href = mailto;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="section-label">
            Let&apos;s Build Together
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--fg-page)] leading-tight mb-4">
            Ready to ship? Let&apos;s discuss your roadmap.
          </h2>
          <p className="text-base text-[var(--muted-fg)] leading-relaxed font-normal">
            I work directly with founders and product teams. No middlemen, no sales reps. Submit your project requirements below to receive a proposal within 24 hours.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Direct Channels Column */}
          <div className="lg:col-span-5 space-y-4">
            {/* Primary Email Card */}
            <div className="bento-card p-6">
              <div className="flex items-center gap-3 text-[var(--accent)] mb-3">
                <Mail className="w-5 h-5" />
                <span className="text-xs font-mono uppercase tracking-wider font-semibold">Direct Email</span>
              </div>
              <div className="text-base sm:text-lg font-bold text-[var(--fg-page)] mb-2 font-mono break-all">
                {siteConfig.email}
              </div>
              <p className="text-xs text-[var(--muted-fg)] mb-4 leading-relaxed">
                Replies guaranteed within 12 hours. Send briefs, wireframes, or RFPs directly.
              </p>
              <button
                onClick={copyEmail}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-[var(--card-border)] bg-[var(--muted-bg)] hover:bg-[var(--card-bg)] text-xs font-medium text-[var(--fg-page)] transition-all cursor-pointer shadow-2xs"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500 font-medium">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[var(--muted-fg)]" />
                    <span>Copy Email Address</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={siteConfig.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="bento-card p-4 flex flex-col justify-between group hover:border-[var(--card-hover-border)]"
              >
                <div className="flex items-center justify-between text-[var(--muted-fg)] group-hover:text-[var(--accent)] transition-colors">
                  <TelegramIcon className="w-5 h-5" />
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                <div className="mt-4">
                  <div className="text-xs font-mono text-[var(--muted-fg)]">Fast Async Chat</div>
                  <div className="text-sm font-bold text-[var(--fg-page)]">Telegram</div>
                </div>
              </a>

              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bento-card p-4 flex flex-col justify-between group hover:border-[var(--card-hover-border)]"
              >
                <div className="flex items-center justify-between text-[var(--muted-fg)] group-hover:text-[var(--accent)] transition-colors">
                  <LinkedinIcon className="w-5 h-5" />
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                <div className="mt-4">
                  <div className="text-xs font-mono text-[var(--muted-fg)]">Connect Profile</div>
                  <div className="text-sm font-bold text-[var(--fg-page)]">LinkedIn</div>
                </div>
              </a>
            </div>

            {/* Working Arrangement / Availability Note */}
            <div className="bento-card p-5 border-l-4 border-l-[var(--accent)] space-y-3">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[var(--accent)]" />
                <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-[var(--fg-page)]">
                  Availability &amp; Work Terms
                </h4>
              </div>
              <p className="text-xs text-[var(--muted-fg)] leading-relaxed">
                Available for freelance projects, MVP development, and ongoing consulting. Transparent communication with regular updates and clear milestones.
              </p>
              <div className="pt-2 border-t border-[var(--subtle-border)] flex items-center gap-2 text-xs text-emerald-500 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>30-Day Post-Launch Bug Warranty included</span>
              </div>
            </div>
          </div>

          {/* Inquiry Form Column */}
          <div className="lg:col-span-7">
            <div className="bento-card p-6 sm:p-8">
              <h3 className="text-xl font-bold text-[var(--fg-page)] mb-2">
                Project Inquiry &amp; Scope Form
              </h3>
              <p className="text-xs text-[var(--muted-fg)] mb-6">
                Tell me about your product. I will review your requirements and reply with feasibility and estimates within 24 hours.
              </p>

              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-[var(--fg-page)]">Inquiry Prepared!</h4>
                  <p className="text-xs text-[var(--muted-fg)] max-w-sm mx-auto">
                    Your email client has opened with the pre-filled inquiry. If not, feel free to write directly to {siteConfig.email}.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-semibold text-[var(--accent)] hover:underline mt-2 inline-block cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-mono text-[var(--muted-fg)] mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Alex Smith"
                        className="w-full px-4 py-2.5 rounded-2xl border border-[var(--card-border)] bg-[var(--muted-bg)] text-sm text-[var(--fg-page)] placeholder:text-[var(--muted-fg)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-mono text-[var(--muted-fg)] mb-1.5">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-2.5 rounded-2xl border border-[var(--card-border)] bg-[var(--muted-bg)] text-sm text-[var(--fg-page)] placeholder:text-[var(--muted-fg)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="service" className="block text-xs font-mono text-[var(--muted-fg)] mb-1.5">
                        Primary Need
                      </label>
                      <select
                        id="service"
                        value={formState.service}
                        onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                        style={{ colorScheme: 'inherit' }}
                        className="w-full px-3 py-2.5 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] text-xs text-[var(--fg-page)] focus:outline-none focus:border-[var(--accent)] transition-colors cursor-pointer [&>option]:bg-white dark:[&>option]:bg-[#1c1c1e] [&>option]:text-[#1d1d1f] dark:[&>option]:text-[#f5f5f7]"
                      >
                        <option value="Full-Cycle MVP (Laravel + Flutter)">Full MVP Sprint</option>
                        <option value="Laravel Backend Architecture">Laravel Backend</option>
                        <option value="Flutter Mobile App">Flutter Mobile App</option>
                        <option value="REST API Architecture">REST API Design</option>
                        <option value="Fractional Staff Engineer">Fractional / Retainer</option>
                        <option value="Architecture & Code Audit">Code &amp; Security Audit</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="budget" className="block text-xs font-mono text-[var(--muted-fg)] mb-1.5">
                        Estimated Budget
                      </label>
                      <select
                        id="budget"
                        value={formState.budget}
                        onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                        style={{ colorScheme: 'inherit' }}
                        className="w-full px-3 py-2.5 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] text-xs text-[var(--fg-page)] focus:outline-none focus:border-[var(--accent)] transition-colors cursor-pointer [&>option]:bg-white dark:[&>option]:bg-[#1c1c1e] [&>option]:text-[#1d1d1f] dark:[&>option]:text-[#f5f5f7]"
                      >
                        <option value="< $3,000 (Small sprint / Audit)">&lt; $3,000</option>
                        <option value="$3,000 – $6,000">$3,000 – $6,000</option>
                        <option value="$6,000 – $15,000+">$6,000 – $15,000+</option>
                        <option value="Hourly / Retainer ($45–$65/hr)">Hourly ($45–$65/hr)</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="timeline" className="block text-xs font-mono text-[var(--muted-fg)] mb-1.5">
                        Target Timeline
                      </label>
                      <select
                        id="timeline"
                        value={formState.timeline}
                        onChange={(e) => setFormState({ ...formState, timeline: e.target.value })}
                        style={{ colorScheme: 'inherit' }}
                        className="w-full px-3 py-2.5 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] text-xs text-[var(--fg-page)] focus:outline-none focus:border-[var(--accent)] transition-colors cursor-pointer [&>option]:bg-white dark:[&>option]:bg-[#1c1c1e] [&>option]:text-[#1d1d1f] dark:[&>option]:text-[#f5f5f7]"
                      >
                        <option value="ASAP (Within 2–3 weeks)">ASAP (2–3 weeks)</option>
                        <option value="Within 1 Month">Within 1 Month</option>
                        <option value="Within 2–3 Months">2–3 Months</option>
                        <option value="Flexible / Ongoing">Flexible / Ongoing</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-mono text-[var(--muted-fg)] mb-1.5">
                      Project Details &amp; Goals
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Briefly describe what you are building, the current state of code (if any), and key deliverables you need..."
                      className="w-full px-4 py-2.5 rounded-2xl border border-[var(--card-border)] bg-[var(--muted-bg)] text-sm text-[var(--fg-page)] placeholder:text-[var(--muted-fg)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-medium text-xs tracking-tight bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white shadow-xs active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Send Project Inquiry</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
