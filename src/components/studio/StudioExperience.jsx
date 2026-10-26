'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import StudioJoystick from './StudioJoystick';
import StudioModals from './StudioModals';
import { createStudio } from './studioEngine';
import { STUDIO_STATIONS, STATION_MAP } from './studioConfig';

const EASE = [0.16, 1, 0.3, 1];

function ArrowLeftIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
    </svg>
  );
}

/*
 * Original 24×24 pixel glyphs for the station hotbar. They are built from
 * rectangles (not strokes) so they stay crisp at every slot size and inherit
 * the station accent through currentColor.
 */
function StationGlyph({ id }) {
  const glyphs = {
    about: (
      <>
        <rect x="3" y="4" width="18" height="2" />
        <rect x="3" y="4" width="2" height="9" />
        <rect x="19" y="4" width="2" height="9" />
        <rect x="3" y="11" width="18" height="2" />
        <rect x="6" y="6" width="12" height="3" opacity="0.48" />
        <rect x="10" y="13" width="4" height="2" />
        <rect x="8" y="15" width="8" height="2" />
        <rect x="3" y="19" width="18" height="2" />
      </>
    ),
    projects: (
      <>
        <rect x="3" y="3" width="18" height="2" />
        <rect x="3" y="3" width="2" height="18" />
        <rect x="19" y="3" width="2" height="18" />
        <rect x="3" y="19" width="18" height="2" />
        <rect x="7" y="7" width="10" height="6" opacity="0.48" />
        <rect x="7" y="15" width="6" height="2" opacity="0.75" />
        <rect x="15" y="15" width="2" height="2" />
      </>
    ),
    skills: (
      <>
        <rect x="4" y="3" width="16" height="2" />
        <rect x="4" y="3" width="2" height="18" />
        <rect x="18" y="3" width="2" height="18" />
        <rect x="4" y="19" width="16" height="2" />
        <rect x="4" y="8" width="16" height="2" opacity="0.65" />
        <rect x="4" y="13" width="16" height="2" opacity="0.65" />
        <rect x="7" y="5" width="2" height="2" />
        <rect x="7" y="10" width="2" height="2" />
        <rect x="7" y="15" width="2" height="2" />
        <rect x="13" y="5" width="5" height="2" opacity="0.4" />
        <rect x="13" y="10" width="5" height="2" opacity="0.4" />
        <rect x="13" y="15" width="5" height="2" opacity="0.4" />
      </>
    ),
    contact: (
      <>
        <rect x="3" y="6" width="14" height="2" />
        <rect x="3" y="6" width="2" height="7" />
        <rect x="15" y="6" width="2" height="7" />
        <rect x="3" y="13" width="14" height="2" />
        <rect x="6" y="9" width="8" height="2" opacity="0.5" />
        <rect x="11" y="15" width="2" height="7" />
        <rect x="8" y="20" width="8" height="2" />
        <rect x="18" y="3" width="2" height="7" />
        <rect x="20" y="3" width="2" height="2" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      width="28"
      height="28"
      fill="currentColor"
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      {glyphs[id]}
    </svg>
  );
}

export default function StudioExperience() {
  const shellRef = useRef(null);
  const engineRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const [isReady, setIsReady] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [progress, setProgress] = useState(11);
  const [error, setError] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [nearbyId, setNearbyId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [travelId, setTravelId] = useState(null);
  const [dockOpen, setDockOpen] = useState(false);

  /* ---------------------------------------------------------------- */
  /* Engine lifecycle                                                  */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    const mount = shellRef.current?.querySelector('.studio-canvas-mount');
    if (!mount) return undefined;

    const canvas = document.createElement('canvas');
    canvas.className = 'studio-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    mount.appendChild(canvas);

    const engine = createStudio({
      canvas,
      onReady: () => setIsReady(true),
      onNearby: (id) => setNearbyId(id),
      onHover: (id) => setHoveredId(id),
      onOpen: (id) => {
        setTravelId(null);
        setActiveId(id);
      },
      onTravel: (id) => setTravelId(id),
      onError: (message) => setError(message),
    });
    engineRef.current = engine;
    if (
      process.env.NODE_ENV === 'development' ||
      new URLSearchParams(window.location.search).has('debug')
    ) {
      window.__studio = engine;
    }

    return () => {
      engine.destroy();
      engineRef.current = null;
      delete window.__studio;
      canvas.remove();
    };
  }, []);

  // Pause the simulation while the loader or a station panel is in charge.
  useEffect(() => {
    engineRef.current?.setPaused(showLoading || Boolean(activeId) || Boolean(error));
  }, [showLoading, activeId, error]);

  // Lock the document behind the full-screen experience.
  useEffect(() => {
    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = 'hidden';
    body.classList.add('studio-body');
    return () => {
      body.style.overflow = previousOverflow;
      body.classList.remove('studio-body');
    };
  }, []);

  // Fill the bar honestly while the scene compiles; complete it on first frame.
  useEffect(() => {
    if (isReady || error) return undefined;
    const interval = window.setInterval(() => {
      setProgress((value) => Math.min(91, value + Math.max(1, Math.round((92 - value) * 0.09))));
    }, 220);
    return () => window.clearInterval(interval);
  }, [isReady, error]);

  useEffect(() => {
    if (!isReady) return undefined;
    const timeout = window.setTimeout(() => setShowLoading(false), 400);
    return () => window.clearTimeout(timeout);
  }, [isReady]);

  /* ---------------------------------------------------------------- */
  /* Handlers                                                          */
  /* ---------------------------------------------------------------- */

  const openNearby = () => {
    engineRef.current?.interact();
  };

  const handlePrompt = () => {
    if (nearbyId) {
      openNearby();
      return;
    }
    if (hoveredId) {
      setTravelId(hoveredId);
      engineRef.current?.travelTo(hoveredId);
    }
  };

  const handleStationSelect = (id) => {
    setDockOpen(false);
    if (!STATION_MAP[id]) return;
    setTravelId(id);
    engineRef.current?.travelTo(id);
  };

  const closeModal = useCallback(() => setActiveId(null), []);

  const handleTouchAction = () => {
    if (nearbyId) {
      openNearby();
    } else {
      setDockOpen(true);
    }
  };

  /* ---------------------------------------------------------------- */
  /* Derived UI                                                        */
  /* ---------------------------------------------------------------- */

  const promptStation = STATION_MAP[nearbyId || hoveredId || ''] || null;
  const travelStation = STATION_MAP[travelId || ''] || null;
  const promptMode = activeId || error
    ? 'hidden'
    : nearbyId
      ? 'near'
      : hoveredId
        ? 'hover'
        : 'idle';

  const progressValue = isReady ? 100 : progress;
  const loadingLabel = progressValue >= 100
    ? 'World ready'
    : progressValue > 70
      ? 'Lighting the torches'
      : progressValue > 38
        ? 'Placing the blocks'
        : 'Spawning the robot';

  const liveMessage = activeId
    ? `${STATION_MAP[activeId].label} panel open.`
    : nearbyId
      ? `${STATION_MAP[nearbyId].label} in range. Press E or Enter to open.`
      : travelId
        ? `Walking to ${STATION_MAP[travelId].label}.`
        : '';

  return (
    <div
      ref={shellRef}
      className={`studio-shell ${isReady ? 'is-ready' : ''}`}
      tabIndex={-1}
    >
      <div className="studio-canvas-mount" />
      <div className="studio-vignette" aria-hidden="true" />
      <div className="studio-grain" aria-hidden="true" />

      <p className="studio-sr-only" role="status" aria-live="polite">{liveMessage}</p>

      <div
        className="studio-interface"
        inert={showLoading || Boolean(activeId) || Boolean(error)}
      >
        {/* Top bar ------------------------------------------------------ */}
        <header className="studio-topbar">
          <div className="studio-brand">
            <span className="studio-brand__mark" aria-hidden="true">RD</span>
            <span className="studio-brand__text">
              <strong>Raman Daksh</strong>
              <small>Virtual Studio · 2026</small>
            </span>
          </div>

          <div className="studio-status">
            <span className="studio-status__dot" aria-hidden="true" />
            <span>Available for work</span>
          </div>

          <Link
            href="/"
            className="studio-classic"
            title="Switch to Classic View"
            aria-label="Switch to Classic View"
          >
            <ArrowLeftIcon />
            <span className="studio-classic__long">Switch to Classic View</span>
            <span className="studio-classic__short" aria-hidden="true">Classic</span>
          </Link>
        </header>

        {/* Station dock ------------------------------------------------ */}
        {dockOpen && (
          <button
            type="button"
            className="studio-dock-scrim"
            aria-label="Close station list"
            onClick={() => setDockOpen(false)}
          />
        )}

        <nav
          id="studio-dock"
          className={`studio-dock ${dockOpen ? 'is-open' : ''}`}
          aria-label="Studio stations"
        >
          <div className="studio-dock__head">
            <span className="studio-dock__eyebrow">
              <SparkIcon />
              Quick bar / Stations
            </span>
            <button
              type="button"
              className="studio-dock__close"
              aria-label="Close station list"
              onClick={() => setDockOpen(false)}
            >
              <CloseIcon />
            </button>
          </div>

          <div className="studio-dock__list">
            {STUDIO_STATIONS.map((station) => {
              const isNear = nearbyId === station.id;
              const isTravel = travelId === station.id;
              const isHovered = hoveredId === station.id;

              return (
                <button
                  key={station.id}
                  type="button"
                  className={`studio-dock__item ${isNear ? 'is-near' : ''} ${isTravel ? 'is-travel' : ''} ${isHovered ? 'is-hovered' : ''}`}
                  style={{ '--station-accent': station.accent }}
                  onClick={() => handleStationSelect(station.id)}
                >
                  <span className="studio-dock__top">
                    <span className="studio-dock__glyph" aria-hidden="true">
                      <StationGlyph id={station.id} />
                    </span>
                    <span className="studio-dock__number">{String(station.order).padStart(2, '0')}</span>
                  </span>
                  <span className="studio-dock__label">
                    <strong>{station.label}</strong>
                    <small>{station.tagline}</small>
                  </span>
                  <span className="studio-dock__state">
                    {isNear ? 'Here' : isTravel ? 'Routing' : 'Walk'}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="studio-dock__foot">Select a station to auto-pilot the robot.</p>
        </nav>

        {/* Controls legend -------------------------------------------- */}
        <div className="studio-legend" aria-hidden="true">
          <span className="studio-legend__group">
            <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd>
            <span>Move</span>
          </span>
          <span className="studio-legend__divider" />
          <span className="studio-legend__group">
            <kbd>E</kbd>
            <span>Interact</span>
          </span>
          <span className="studio-legend__divider studio-legend__divider--wide" />
          <span className="studio-legend__group studio-legend__group--wide">
            <span>Click floor to walk</span>
          </span>
        </div>

        {/* Contextual interaction prompt ------------------------------ */}
        <div className="studio-prompt-slot">
          <AnimatePresence mode="wait">
            {promptMode !== 'hidden' && (
              <motion.div
                key={promptMode === 'idle' ? 'idle' : `${promptMode}-${promptStation?.id}`}
                className={`studio-prompt studio-prompt--${promptMode}`}
                style={promptStation ? { '--station-accent': promptStation.accent } : undefined}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.22, ease: EASE }}
              >
                {promptStation && promptMode === 'near' ? (
                  <button type="button" className="studio-prompt__button" onClick={handlePrompt}>
                    <span className="studio-prompt__beacon" aria-hidden="true" />
                    <span className="studio-prompt__copy">
                      <small>In range</small>
                      <strong>Open {promptStation.label}</strong>
                    </span>
                    <span className="studio-prompt__input">
                      <kbd>E</kbd>
                      <span className="studio-prompt__input-label">Open</span>
                    </span>
                  </button>
                ) : promptStation ? (
                  <div className="studio-prompt__readout">
                    <span className="studio-prompt__beacon" aria-hidden="true" />
                    <span className="studio-prompt__copy">
                      <small>Station scanned</small>
                      <strong>{promptStation.label}</strong>
                    </span>
                    <span className="studio-prompt__input">
                      <span className="studio-prompt__tap">Tap</span>
                      <span className="studio-prompt__input-label">Click to walk</span>
                    </span>
                  </div>
                ) : (
                  <div className="studio-prompt__idle">
                    <span className="studio-prompt__idle-dot" aria-hidden="true" />
                    <span className="studio-prompt__desktop">WASD / arrows to move · approach a station to open it</span>
                    <span className="studio-prompt__mobile">Drag to move · tap any station to travel</span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Travel indicator ------------------------------------------- */}
        <AnimatePresence>
          {travelStation && !activeId && (
            <motion.div
              className="studio-route"
              style={{ '--station-accent': travelStation.accent }}
              initial={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.25 }}
            >
              <span className="studio-route__beacon" aria-hidden="true" />
              <span>Auto-pilot engaged</span>
              <strong>{travelStation.label}</strong>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Touch controls --------------------------------------------- */}
        <div className="studio-touch">
          <StudioJoystick
            accent={nearbyId ? STATION_MAP[nearbyId].accent : '#FE7F2D'}
            onChange={(x, y) => engineRef.current?.setJoystick(x, y)}
          />

          <div className="studio-touch__actions">
            <button
              type="button"
              className={`studio-touch__action ${nearbyId ? 'is-active' : ''}`}
              style={nearbyId ? { '--station-accent': STATION_MAP[nearbyId].accent } : undefined}
              onClick={handleTouchAction}
            >
              <span className="studio-touch__action-dot" aria-hidden="true" />
              {nearbyId ? `Open ${STATION_MAP[nearbyId].shortLabel}` : 'Stations'}
            </button>
            <span className="studio-touch__hint">
              {nearbyId ? 'Station in range' : 'Tap the room to walk'}
            </span>
          </div>
        </div>

        <button
          type="button"
          className="studio-rooms-toggle"
          onClick={() => setDockOpen(true)}
          aria-expanded={dockOpen}
          aria-controls="studio-dock"
        >
          <SparkIcon />
          Stations
        </button>
      </div>

      {/* Loading ----------------------------------------------------- */}
      <AnimatePresence>
        {showLoading && !error && (
          <motion.div
            className="studio-loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.45, ease: 'easeInOut' }}
          >
            <div className="studio-loading__grid" aria-hidden="true" />
            <div className="studio-loading__mark" aria-hidden="true">
              <span>RD</span>
            </div>
            <div className="studio-loading__body">
              <p className="studio-loading__eyebrow">Raman Daksh / Virtual Studio</p>
              <h1>
                Building the room
                <span aria-hidden="true">.</span>
              </h1>
              <span className="studio-loading__splash" aria-hidden="true">
                Now with 100% more blocks!
              </span>
              <p className="studio-loading__copy">
                Carving the room block by block, lighting the torches, spawning the robot.
              </p>
              <div
                className="studio-loading__progress"
                role="progressbar"
                aria-label="Loading the 3D studio"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progressValue}
              >
                <span style={{ width: `${progressValue}%` }} />
              </div>
              <div className="studio-loading__meta">
                <span>{loadingLabel}</span>
                <span>{String(progressValue).padStart(3, '0')}%</span>
              </div>
              <Link href="/" className="studio-loading__skip">
                Skip to classic view
                <ArrowRightIcon />
              </Link>
            </div>
            <p className="studio-loading__note">WebGL · Three.js · No external assets</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fatal / WebGL fallback -------------------------------------- */}
      <AnimatePresence>
        {error && (
          <motion.div
            className="studio-fatal"
            role="alert"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="studio-fatal__card">
              <p className="studio-fatal__eyebrow">Studio offline</p>
              <h1>This browser could not open the 3D room.</h1>
              <p>{error}</p>
              <div className="studio-fatal__actions">
                <Link href="/" className="studio-btn studio-btn--primary">
                  Open the classic portfolio
                  <ArrowRightIcon />
                </Link>
                <button type="button" className="studio-btn" onClick={() => window.location.reload()}>
                  Try again
                </button>
              </div>
              <nav className="studio-fatal__links" aria-label="Classic sections">
                <Link href="/#about">About</Link>
                <Link href="/#projects">Projects</Link>
                <Link href="/#skills">Skills</Link>
                <Link href="/#contact">Contact</Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <StudioModals stationId={activeId} onClose={closeModal} />
    </div>
  );
}
