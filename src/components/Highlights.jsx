'use client';

import { useState } from 'react';
import { 
  ArrowUpRight, 
  ExternalLink, 
  Server, 
  Terminal, 
  Cpu, 
  Database, 
  ShieldCheck, 
  Check, 
  Smartphone, 
  MapPin, 
  Radio, 
  Activity, 
  Code2, 
  Layers, 
  Zap, 
  School, 
  Users, 
  DollarSign, 
  Sparkles,
  FileText
} from 'lucide-react';
import { GithubIcon } from './Icons';

export default function Highlights() {
  // Interactive preview tabs for Flagship showcases
  const [clouddeckTab, setClouddeckTab] = useState('services');
  const [borrowRadius, setBorrowRadius] = useState('2km');
  const [devkitTab, setDevkitTab] = useState('validate');
  const [erpTab, setErpTab] = useState('overview');

  return (
    <section id="highlights" className="py-20 md:py-32 relative">
      {/* Background ambient lighting */}
      <div className="editorial-glow top-1/3 right-1/4 -translate-y-1/2 w-[600px] h-[300px] opacity-25" />
      <div className="editorial-glow bottom-1/4 left-10 w-[500px] h-[300px] opacity-20" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <div className="section-label">
            Featured Flagships
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--fg-page)] leading-tight mb-5">
            Engineered for scale, speed, and real-world impact.
          </h2>
          <p className="text-base sm:text-lg text-[var(--muted-fg)] leading-relaxed font-normal">
            Deep architectural breakdowns of four production systems engineered end-to-end — spanning high-concurrency cloud control panels, hyper-local Flutter mobile apps, modular TypeScript tooling, and campus enterprise ERPs.
          </p>
        </div>

        {/* Flagship Showcases Stack (Expanded Sections) */}
        <div className="space-y-16 md:space-y-28">

          {/* ========================================================
              FLAGSHIP 01: CloudDeck (Cloud & DevOps)
              ======================================================== */}
          <div className="bento-card p-6 sm:p-8 lg:p-10 border border-[var(--card-border)] relative overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Content Column */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-xs font-mono font-bold tracking-wider px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
                    FLAGSHIP #01 &bull; CLOUD &amp; DEVOPS
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live Production Release
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--fg-page)] mb-3">
                    CloudDeck — Open-Source Cloud Hosting Control Panel
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--muted-fg)] leading-relaxed">
                    Traditional control panels consume over 1GB idle RAM before handling any traffic. CloudDeck was engineered with a Go daemon and Next.js frontend to idle under <strong className="text-[var(--fg-page)]">50MB RAM</strong> while managing multi-PHP (8.1–8.4), automated Let&apos;s Encrypt TLS, MariaDB, Postfix/Dovecot email, and PowerDNS.
                  </p>
                </div>

                {/* Technical Highlights Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono text-[var(--fg-page)]">
                  <div className="flex items-center gap-2 bg-[var(--muted-bg)] px-3 py-2 rounded-xl border border-[var(--subtle-border)]">
                    <Check className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                    <span>Multi-PHP 8.1–8.4 Sockets</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[var(--muted-bg)] px-3 py-2 rounded-xl border border-[var(--subtle-border)]">
                    <Check className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                    <span>1-Click Automated SSL/TLS</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[var(--muted-bg)] px-3 py-2 rounded-xl border border-[var(--subtle-border)]">
                    <Check className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                    <span>Polyglot: Go, Node, Python</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[var(--muted-bg)] px-3 py-2 rounded-xl border border-[var(--subtle-border)]">
                    <Check className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                    <span>PowerDNS + Postfix/Dovecot</span>
                  </div>
                </div>

                {/* Performance Metrics Bento Row */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-[var(--muted-bg)] border border-[var(--subtle-border)]">
                    <div className="text-xl sm:text-2xl font-bold text-[var(--accent)] font-mono">&lt; 50 MB</div>
                    <div className="text-[11px] font-mono text-[var(--muted-fg)] mt-0.5">Idle Memory</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[var(--muted-bg)] border border-[var(--subtle-border)]">
                    <div className="text-xl sm:text-2xl font-bold text-[var(--fg-page)] font-mono">Multi-PHP</div>
                    <div className="text-[11px] font-mono text-[var(--muted-fg)] mt-0.5">8.1 through 8.4</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[var(--muted-bg)] border border-[var(--subtle-border)]">
                    <div className="text-xl sm:text-2xl font-bold text-emerald-500 font-mono">100%</div>
                    <div className="text-[11px] font-mono text-[var(--muted-fg)] mt-0.5">Open Source</div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="https://clouddeck.dakshraman.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <span>Launch CloudDeck Demo</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <a
                    href="https://github.com/dakshraman/clouddeck"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>Source Repository</span>
                  </a>
                </div>
              </div>

              {/* Interactive Telemetry Showcase Column */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-[var(--card-border)] bg-[#0d1117] text-gray-200 shadow-2xl overflow-hidden font-mono text-xs">
                  {/* macOS Terminal Titlebar */}
                  <div className="px-4 py-3 bg-[#161b22] border-b border-gray-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                      <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                      <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                      <span className="ml-2 text-gray-400 text-[11px]">clouddeck-daemon@node-01: ~</span>
                    </div>

                    <div className="flex items-center gap-1 bg-[#21262d] p-0.5 rounded-lg border border-gray-700 text-[10px]">
                      <button
                        onClick={() => setClouddeckTab('services')}
                        className={`px-2 py-0.5 rounded transition-colors ${clouddeckTab === 'services' ? 'bg-[#30363d] text-white font-semibold' : 'text-gray-400 hover:text-white'}`}
                      >
                        Services
                      </button>
                      <button
                        onClick={() => setClouddeckTab('telemetry')}
                        className={`px-2 py-0.5 rounded transition-colors ${clouddeckTab === 'telemetry' ? 'bg-[#30363d] text-white font-semibold' : 'text-gray-400 hover:text-white'}`}
                      >
                        Telemetry
                      </button>
                    </div>
                  </div>

                  {/* Terminal Body */}
                  <div className="p-4 sm:p-5 space-y-3.5">
                    {clouddeckTab === 'services' ? (
                      <>
                        <div className="text-[11px] text-gray-400 pb-2 border-b border-gray-800 flex items-center justify-between">
                          <span>DAEMON PROCESS SUBSYSTEM</span>
                          <span className="text-emerald-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                            UPTIME: 48d 14h 22m
                          </span>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 rounded-lg bg-[#161b22] border border-gray-800">
                            <div className="flex items-center gap-2">
                              <span className="text-emerald-400 text-[10px]">●</span>
                              <span className="font-semibold text-white">nginx/1.24.0</span>
                              <span className="text-[10px] text-gray-400">HTTP/2 + TLS 1.3</span>
                            </div>
                            <span className="text-gray-300 text-[11px]">PORT 80/443</span>
                          </div>

                          <div className="flex items-center justify-between p-2 rounded-lg bg-[#161b22] border border-gray-800">
                            <div className="flex items-center gap-2">
                              <span className="text-emerald-400 text-[10px]">●</span>
                              <span className="font-semibold text-white">php-fpm@8.3</span>
                              <span className="text-[10px] text-gray-400">Socket Pool</span>
                            </div>
                            <span className="text-emerald-400 text-[11px]">ACTIVE (4.2 MB)</span>
                          </div>

                          <div className="flex items-center justify-between p-2 rounded-lg bg-[#161b22] border border-gray-800">
                            <div className="flex items-center gap-2">
                              <span className="text-emerald-400 text-[10px]">●</span>
                              <span className="font-semibold text-white">mariadb.service</span>
                              <span className="text-[10px] text-gray-400">InnoDB 10.11</span>
                            </div>
                            <span className="text-gray-300 text-[11px]">PORT 3306</span>
                          </div>

                          <div className="flex items-center justify-between p-2 rounded-lg bg-[#161b22] border border-gray-800">
                            <div className="flex items-center gap-2">
                              <span className="text-emerald-400 text-[10px]">●</span>
                              <span className="font-semibold text-white">powerdns.auth</span>
                              <span className="text-[10px] text-gray-400">Zone Cluster</span>
                            </div>
                            <span className="text-gray-300 text-[11px]">PORT 53 (UDP)</span>
                          </div>
                        </div>

                        <div className="pt-2 flex items-center justify-between text-[11px] text-gray-400">
                          <span>Memory footprint:</span>
                          <span className="text-emerald-400 font-bold">42.6 MB / 1024 MB (4.1%)</span>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-3">
                        <div className="text-[11px] text-gray-400">SYSTEM TELEMETRY SUMMARY</div>
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                              <span>CPU Load (Dual vCPU)</span>
                              <span>1.2%</span>
                            </div>
                            <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                              <div className="h-full bg-[var(--accent)] w-[1.2%]" />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                              <span>Resident RAM</span>
                              <span>42.6 MB (4.1%)</span>
                            </div>
                            <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-400 w-[4.1%]" />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                              <span>NVMe Storage</span>
                              <span>12.4 GB / 80 GB (15.5%)</span>
                            </div>
                            <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                              <div className="h-full bg-purple-400 w-[15.5%]" />
                            </div>
                          </div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-[#161b22] text-[11px] text-gray-300 space-y-1">
                          <div className="text-gray-400 text-[10px]">DAEMON LOG STREAM</div>
                          <div className="text-emerald-400">&gt; letsencrypt certbot: renew_check OK (all 12 certs valid)</div>
                          <div>&gt; nginx reloaded with zero dropped connections</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* ========================================================
              FLAGSHIP 02: Borrow Nearby (Flutter & Laravel Mobile Platform)
              ======================================================== */}
          <div className="bento-card p-6 sm:p-8 lg:p-10 border border-[var(--card-border)] relative overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Interactive Mobile Radar Showcase (Order 2 on mobile, Order 1 on lg) */}
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-xl p-5 sm:p-6 space-y-4">
                  {/* Mock Device Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-[var(--subtle-border)]">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-xs font-mono">
                        BN
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[var(--fg-page)] font-mono">Borrow Nearby App</div>
                        <div className="text-[10px] text-[var(--muted-fg)]">Hyperlocal Geospatial Engine</div>
                      </div>
                    </div>

                    {/* Radius Filter Toggle */}
                    <div className="flex items-center gap-1 bg-[var(--muted-bg)] p-1 rounded-xl text-[10px] font-mono">
                      {['1km', '2km', '5km'].map((radius) => (
                        <button
                          key={radius}
                          onClick={() => setBorrowRadius(radius)}
                          className={`px-2 py-0.5 rounded-lg transition-colors ${borrowRadius === radius ? 'bg-[var(--accent)] text-white font-semibold' : 'text-[var(--muted-fg)] hover:text-[var(--fg-page)]'}`}
                        >
                          &lt; {radius}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Nearby Discovery Items Stream */}
                  <div className="space-y-2.5">
                    <div className="p-3 rounded-xl bg-[var(--muted-bg)] border border-[var(--subtle-border)] flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-[var(--fg-page)]">
                          <span>Sony Alpha A7 IV Camera</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-500 font-mono font-medium">Available</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-[var(--muted-fg)] font-mono">
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-[var(--accent)]" /> 0.8 km away</span>
                          <span>&bull;</span>
                          <span>Deposit Escrow Verified</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-[var(--fg-page)]">$25/day</span>
                    </div>

                    <div className="p-3 rounded-xl bg-[var(--muted-bg)] border border-[var(--subtle-border)] flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-[var(--fg-page)]">
                          <span>DeWalt Cordless Drill Kit</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-500 font-mono font-medium">Available</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-[var(--muted-fg)] font-mono">
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-[var(--accent)]" /> 1.2 km away</span>
                          <span>&bull;</span>
                          <span>18 Successful Lends</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-[var(--fg-page)]">$10/day</span>
                    </div>

                    <div className="p-3 rounded-xl bg-[var(--muted-bg)] border border-[var(--subtle-border)] flex items-center justify-between opacity-75">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-[var(--fg-page)]">
                          <span>4-Person All-Weather Tent</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-500 font-mono font-medium">In Loan</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-[var(--muted-fg)] font-mono">
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-[var(--accent)]" /> 2.1 km away</span>
                          <span>&bull;</span>
                          <span>Returns tomorrow</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-[var(--muted-fg)]">$15/day</span>
                    </div>
                  </div>

                  {/* Real-Time Status Bar */}
                  <div className="pt-2 flex items-center justify-between text-[11px] font-mono border-t border-[var(--subtle-border)]">
                    <span className="text-[var(--muted-fg)] flex items-center gap-1.5">
                      <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                      WebSocket Live Feed
                    </span>
                    <span className="text-[var(--accent)] font-semibold">PostGIS Radius: &lt;50ms</span>
                  </div>
                </div>
              </div>

              {/* Content Column (Order 1 on mobile, Order 2 on lg) */}
              <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-xs font-mono font-bold tracking-wider px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    FLAGSHIP #02 &bull; MOBILE APP &amp; REST API
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[var(--muted-fg)] bg-[var(--muted-bg)] px-2.5 py-1 rounded-full border border-[var(--subtle-border)]">
                    Flutter iOS/Android + Laravel
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--fg-page)] mb-3">
                    Borrow Nearby — Hyperlocal Peer-to-Peer Mobile Marketplace
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--muted-fg)] leading-relaxed">
                    A live location-based community sharing platform deployed to production on iOS and Android. Built from concept to app store release, allowing neighbors to discover, lend, and borrow items with sub-50ms spatial queries, WebSocket real-time chat, and escrow protections.
                  </p>
                </div>

                {/* Technical Highlights Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono text-[var(--fg-page)]">
                  <div className="flex items-center gap-2 bg-[var(--muted-bg)] px-3 py-2 rounded-xl border border-[var(--subtle-border)]">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Cross-Platform Flutter Build</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[var(--muted-bg)] px-3 py-2 rounded-xl border border-[var(--subtle-border)]">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>PostGIS Spatial Querying</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[var(--muted-bg)] px-3 py-2 rounded-xl border border-[var(--subtle-border)]">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Encrypted In-App Chat</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[var(--muted-bg)] px-3 py-2 rounded-xl border border-[var(--subtle-border)]">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Offline-First SQLite Caching</span>
                  </div>
                </div>

                {/* Performance Metrics Bento Row */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-[var(--muted-bg)] border border-[var(--subtle-border)]">
                    <div className="text-xl sm:text-2xl font-bold text-emerald-500 font-mono">&lt; 50 ms</div>
                    <div className="text-[11px] font-mono text-[var(--muted-fg)] mt-0.5">Spatial Latency</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[var(--muted-bg)] border border-[var(--subtle-border)]">
                    <div className="text-xl sm:text-2xl font-bold text-[var(--fg-page)] font-mono">60 FPS</div>
                    <div className="text-[11px] font-mono text-[var(--muted-fg)] mt-0.5">Native UI Feel</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[var(--muted-bg)] border border-[var(--subtle-border)]">
                    <div className="text-xl sm:text-2xl font-bold text-[var(--accent)] font-mono">iOS &amp; Android</div>
                    <div className="text-[11px] font-mono text-[var(--muted-fg)] mt-0.5">One Codebase</div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="https://borrownearby.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <span>Visit Live Platform</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>


          {/* ========================================================
              FLAGSHIP 03: Devkit (Developer Tools & SDK)
              ======================================================== */}
          <div className="bento-card p-6 sm:p-8 lg:p-10 border border-[var(--card-border)] relative overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Content Column */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-xs font-mono font-bold tracking-wider px-3 py-1 rounded-full bg-purple-500/10 text-purple-500 border border-purple-500/20">
                    FLAGSHIP #03 &bull; DEVELOPER TOOLKIT &amp; SDK
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[var(--muted-fg)] bg-[var(--muted-bg)] px-2.5 py-1 rounded-full border border-[var(--subtle-border)]">
                    TypeScript &bull; Dual ESM/CJS
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--fg-page)] mb-3">
                    Devkit — Zero-Dependency TypeScript Utility Toolkit
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--muted-fg)] leading-relaxed">
                    Eliminating boilerplate across full-stack repositories. Devkit packages battle-tested, zero-external-dependency utilities for cryptographically secure tokens, strict payload validation, API contract generators, and standardized logging with 100% strict typing.
                  </p>
                </div>

                {/* Technical Highlights Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono text-[var(--fg-page)]">
                  <div className="flex items-center gap-2 bg-[var(--muted-bg)] px-3 py-2 rounded-xl border border-[var(--subtle-border)]">
                    <Check className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                    <span>0 External Dependencies</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[var(--muted-bg)] px-3 py-2 rounded-xl border border-[var(--subtle-border)]">
                    <Check className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                    <span>Tree-Shakeable Bundles</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[var(--muted-bg)] px-3 py-2 rounded-xl border border-[var(--subtle-border)]">
                    <Check className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                    <span>Universal: Node, Bun, Workers</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[var(--muted-bg)] px-3 py-2 rounded-xl border border-[var(--subtle-border)]">
                    <Check className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                    <span>100% Strict Type Safety</span>
                  </div>
                </div>

                {/* Performance Metrics Bento Row */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-[var(--muted-bg)] border border-[var(--subtle-border)]">
                    <div className="text-xl sm:text-2xl font-bold text-purple-500 font-mono">0 Deps</div>
                    <div className="text-[11px] font-mono text-[var(--muted-fg)] mt-0.5">Zero CVE Risks</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[var(--muted-bg)] border border-[var(--subtle-border)]">
                    <div className="text-xl sm:text-2xl font-bold text-[var(--fg-page)] font-mono">1.4 KB</div>
                    <div className="text-[11px] font-mono text-[var(--muted-fg)] mt-0.5">Gzipped Core</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[var(--muted-bg)] border border-[var(--subtle-border)]">
                    <div className="text-xl sm:text-2xl font-bold text-emerald-500 font-mono">4+ Hours</div>
                    <div className="text-[11px] font-mono text-[var(--muted-fg)] mt-0.5">Saved per Repo</div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="https://devkit.dakshraman.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <span>Explore Devkit Docs</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Interactive Code Editor Showcase Column */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-[var(--card-border)] bg-[#0d1117] text-gray-200 shadow-2xl overflow-hidden font-mono text-xs">
                  {/* Editor Titlebar & File Tabs */}
                  <div className="px-4 py-3 bg-[#161b22] border-b border-gray-800 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setDevkitTab('validate')}
                        className={`px-2.5 py-1 rounded text-[11px] transition-colors flex items-center gap-1.5 ${devkitTab === 'validate' ? 'bg-[#21262d] text-white font-semibold border border-gray-700' : 'text-gray-400 hover:text-white'}`}
                      >
                        <Code2 className="w-3.5 h-3.5 text-purple-400" />
                        <span>validate.ts</span>
                      </button>
                      <button
                        onClick={() => setDevkitTab('crypto')}
                        className={`px-2.5 py-1 rounded text-[11px] transition-colors flex items-center gap-1.5 ${devkitTab === 'crypto' ? 'bg-[#21262d] text-white font-semibold border border-gray-700' : 'text-gray-400 hover:text-white'}`}
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>crypto.ts</span>
                      </button>
                    </div>

                    <span className="text-[10px] text-gray-500">TypeScript 5.4 Strict</span>
                  </div>

                  {/* Code Snippet */}
                  <div className="p-4 sm:p-5 overflow-x-auto text-[11px] leading-relaxed">
                    {devkitTab === 'validate' ? (
                      <pre className="text-gray-300">
                        <span className="text-purple-400">import</span> &#123; createContract, isEmail, sanitize &#125; <span className="text-purple-400">from</span> <span className="text-emerald-400">&apos;@devkit/core&apos;</span>;{'\n\n'}
                        <span className="text-gray-500">// Zero runtime dependencies &bull; Type inferred contracts</span>{'\n'}
                        <span className="text-purple-400">export const</span> ProjectContract = createContract&#40;&#123;{'\n'}
                        {'  '}name: &#40;val&#41; =&gt; val.length &gt;= 2 &amp;&amp; sanitize&#40;val&#41;,{'\n'}
                        {'  '}email: &#40;val&#41; =&gt; isEmail&#40;val&#41;,{'\n'}
                        {'  '}budget: &#91;<span className="text-amber-400">&apos;$3k–$6k&apos;</span>, <span className="text-amber-400">&apos;$6k–$15k&apos;</span>&#93; as <span className="text-purple-400">const</span>,{'\n'}
                        &#125;&#41;;{'\n\n'}
                        <span className="text-gray-500">// Auto-generates exact TypeScript types</span>{'\n'}
                        <span className="text-purple-400">export type</span> ProjectPayload = <span className="text-blue-400">InferContract</span>&lt;<span className="text-purple-400">typeof</span> ProjectContract&gt;;
                      </pre>
                    ) : (
                      <pre className="text-gray-300">
                        <span className="text-purple-400">import</span> &#123; secureToken, timingSafeEqual &#125; <span className="text-purple-400">from</span> <span className="text-emerald-400">&apos;@devkit/crypto&apos;</span>;{'\n\n'}
                        <span className="text-gray-500">// Cryptographically uniform session token generator</span>{'\n'}
                        <span className="text-purple-400">export function</span> generateApiKey&#40;&#41;: <span className="text-blue-400">string</span> &#123;{'\n'}
                        {'  '}<span className="text-purple-400">return</span> secureToken&#40;&#123; bytes: 32, prefix: <span className="text-emerald-400">&apos;dk_live_&apos;</span> &#125;&#41;;{'\n'}
                        &#125;{'\n\n'}
                        <span className="text-gray-500">// Resistant to side-channel timing attacks</span>{'\n'}
                        <span className="text-purple-400">export const</span> isValid = timingSafeEqual&#40;providedToken, secret&#41;;
                      </pre>
                    )}
                  </div>

                  {/* Benchmark Footer */}
                  <div className="px-4 py-2.5 bg-[#161b22] border-t border-gray-800 flex items-center justify-between text-[11px] text-gray-400">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <Zap className="w-3.5 h-3.5" />
                      Execution: &lt; 0.08ms
                    </span>
                    <span>100% Tree-Shakeable</span>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* ========================================================
              FLAGSHIP 04: Advanced School ERP (Enterprise Platform)
              ======================================================== */}
          <div className="bento-card p-6 sm:p-8 lg:p-10 border border-[var(--card-border)] relative overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Interactive Enterprise Console (Order 2 on mobile, Order 1 on lg) */}
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-xl p-5 sm:p-6 space-y-4">
                  {/* Console Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-[var(--subtle-border)]">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-xs font-mono">
                        ERP
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[var(--fg-page)] font-mono">Campus Operations Center</div>
                        <div className="text-[10px] text-[var(--muted-fg)]">Academic Year 2025–26 &bull; Term 2</div>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      Live Database Sync
                    </span>
                  </div>

                  {/* Operational Metrics Cards */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-[var(--muted-bg)] border border-[var(--subtle-border)]">
                      <div className="text-[10px] font-mono text-[var(--muted-fg)]">Active Enrollment</div>
                      <div className="text-lg font-bold text-[var(--fg-page)] font-mono mt-0.5">542 Students</div>
                      <div className="text-[10px] text-emerald-500 font-mono mt-0.5">+14% vs Previous Term</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[var(--muted-bg)] border border-[var(--subtle-border)]">
                      <div className="text-[10px] font-mono text-[var(--muted-fg)]">Fee Reconciliation</div>
                      <div className="text-lg font-bold text-amber-500 font-mono mt-0.5">98.4% Settled</div>
                      <div className="text-[10px] text-[var(--muted-fg)] font-mono mt-0.5">Automated Reminders</div>
                    </div>
                  </div>

                  {/* Automated Activity Stream */}
                  <div className="space-y-2 text-xs font-mono">
                    <div className="p-2.5 rounded-xl bg-[var(--muted-bg)] border border-[var(--subtle-border)] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-[var(--fg-page)]">Razorpay Fee Auto-Settled</span>
                      </div>
                      <span className="text-[10px] text-[var(--muted-fg)]">Grade 10 &bull; $1,250</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[var(--muted-bg)] border border-[var(--subtle-border)] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-[var(--accent)]" />
                        <span className="text-[var(--fg-page)]">Batch Report Cards Generated</span>
                      </div>
                      <span className="text-[10px] text-[var(--muted-fg)]">64 PDFs Dispatched</span>
                    </div>
                  </div>

                  {/* Security Clearance Pill */}
                  <div className="pt-2 flex items-center justify-between text-[11px] font-mono border-t border-[var(--subtle-border)]">
                    <span className="text-[var(--muted-fg)]">Security Architecture:</span>
                    <span className="text-emerald-500 font-semibold">5-Tier RBAC &bull; AES-256</span>
                  </div>
                </div>
              </div>

              {/* Content Column (Order 1 on mobile, Order 2 on lg) */}
              <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-xs font-mono font-bold tracking-wider px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    FLAGSHIP #04 &bull; ENTERPRISE CAMPUS AUTOMATION
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[var(--muted-fg)] bg-[var(--muted-bg)] px-2.5 py-1 rounded-full border border-[var(--subtle-border)]">
                    Laravel &bull; PostgreSQL &bull; RBAC
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--fg-page)] mb-3">
                    Advanced School ERP — Enterprise Campus Operations System
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--muted-fg)] leading-relaxed">
                    Educational institutions often struggle with fragmented paperwork, delayed fee collections, and manual report card generation. Built an end-to-end Laravel platform managing student admissions, online payment gateway reconciliation, automated gradebooks, and staff payroll for 500+ active campus members.
                  </p>
                </div>

                {/* Technical Highlights Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono text-[var(--fg-page)]">
                  <div className="flex items-center gap-2 bg-[var(--muted-bg)] px-3 py-2 rounded-xl border border-[var(--subtle-border)]">
                    <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Granular 5-Role RBAC Security</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[var(--muted-bg)] px-3 py-2 rounded-xl border border-[var(--subtle-border)]">
                    <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Payment Gateway Reconciliation</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[var(--muted-bg)] px-3 py-2 rounded-xl border border-[var(--subtle-border)]">
                    <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Automated PDF Gradebook Engine</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[var(--muted-bg)] px-3 py-2 rounded-xl border border-[var(--subtle-border)]">
                    <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>SMS/Email Notification Dispatch</span>
                  </div>
                </div>

                {/* Performance Metrics Bento Row */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-[var(--muted-bg)] border border-[var(--subtle-border)]">
                    <div className="text-xl sm:text-2xl font-bold text-amber-500 font-mono">500+</div>
                    <div className="text-[11px] font-mono text-[var(--muted-fg)] mt-0.5">Active Users</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[var(--muted-bg)] border border-[var(--subtle-border)]">
                    <div className="text-xl sm:text-2xl font-bold text-[var(--fg-page)] font-mono">35%</div>
                    <div className="text-[11px] font-mono text-[var(--muted-fg)] mt-0.5">Admin Time Saved</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[var(--muted-bg)] border border-[var(--subtle-border)]">
                    <div className="text-xl sm:text-2xl font-bold text-emerald-500 font-mono">Zero</div>
                    <div className="text-[11px] font-mono text-[var(--muted-fg)] mt-0.5">Discrepancies</div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="https://erp-web-lctn.onrender.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <span>Launch ERP Live Demo</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
