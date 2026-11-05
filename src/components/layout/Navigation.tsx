'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SpeakerHigh, SpeakerSlash, ArrowUpRight, List, X } from '@phosphor-icons/react';
import { AfterhrsWordmark } from '@/components/ui/AfterhrsWordmark';
import { MagneticElement } from '@/components/motion/MagneticElement';
import { soundEngine } from '@/lib/sound';
import { EVENT_CONFIG } from '@/config/event';

const NAV_ITEMS = [
  { label: 'Home', href: '#home', coord: '00.0' },
  { label: 'The Event', href: '#event', coord: '01.4' },
  { label: 'Experience', href: '#experience', coord: '02.8' },
  { label: 'Gallery', href: '#gallery', coord: '03.6' },
  { label: 'About', href: '#about', coord: '04.2' },
  { label: 'Register', href: '#register', coord: '05.0' },
];

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / docHeight)) : 0;
      setScrollProgress(pct);

      const sections = ['home', 'event', 'experience', 'gallery', 'about', 'register'];
      const viewportMid = window.scrollY + window.innerHeight * 0.36;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (viewportMid >= top && viewportMid < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const handleToggleSound = async () => {
    const nextState = await soundEngine.toggle();
    setSoundActive(nextState);
    if (nextState) {
      soundEngine.playHoverTick(240);
    }
  };

  const handleNavClick = () => {
    soundEngine.playHoverTick(210);
    setMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--nav-border)]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Brand Logo Lockup */}
          <a
            href="#home"
            onClick={handleNavClick}
            onMouseEnter={() => soundEngine.playHoverTick(170)}
            className="focus-visible:outline-scarlet-400"
            aria-label="AFTERHRS PRODUCTIONS — Home"
          >
            <AfterhrsWordmark variant="navbar" showSubtitle={true} interactive={false} />
          </a>

          {/* Desktop Architectural Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden xl:flex items-center gap-1 border border-[var(--color-border-hairline)] bg-void-950/90 px-2 py-1.5"
          >
            {NAV_ITEMS.map((item) => {
              const isCurrent = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  onMouseEnter={() => soundEngine.playHoverTick(195)}
                  className={`px-3.5 py-1.5 font-extended text-[11px] uppercase tracking-[0.18em] transition-colors duration-200 ${
                    isCurrent
                      ? 'bg-scarlet-500 text-void-950 font-bold'
                      : 'text-bone-100 hover:text-scarlet-400'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Controls: Sound Toggle + Register CTA + Curtain Trigger */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Explicit Sound Toggle (Never Autoplays) */}
            <button
              type="button"
              onClick={handleToggleSound}
              aria-pressed={soundActive}
              aria-label={soundActive ? 'Mute ambient soundstage' : 'Enable ambient soundstage'}
              data-cursor="AUDIO"
              className={`h-10 px-3 sm:px-4 border flex items-center gap-2 font-extended text-[10px] tracking-[0.2em] uppercase transition-colors duration-200 cursor-pointer ${
                soundActive
                  ? 'bg-crimson-700/80 border-scarlet-400 text-bone-100'
                  : 'bg-void-900 border-[var(--color-border-hairline)] text-ash-300 hover:border-scarlet-500 hover:text-bone-100'
              }`}
            >
              {soundActive ? (
                <SpeakerHigh size={15} weight="bold" aria-hidden="true" className="text-scarlet-400" />
              ) : (
                <SpeakerSlash size={15} weight="regular" aria-hidden="true" />
              )}
              <span className="hidden sm:inline">{soundActive ? 'SOUND [ON]' : 'SOUND [OFF]'}</span>
            </button>

            {/* Primary Register CTA */}
            <MagneticElement strength={0.22} className="hidden sm:inline-block">
              <a
                href="#register"
                onClick={handleNavClick}
                onMouseEnter={() => soundEngine.playHoverTick(240)}
                className="h-10 px-5 bg-scarlet-500 text-void-950 font-extended text-[11px] font-extrabold tracking-[0.2em] uppercase inline-flex items-center gap-2 hover:bg-bone-100 transition-colors duration-200"
              >
                <span>REGISTER</span>
                <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
              </a>
            </MagneticElement>

            {/* Full-Screen Stage Menu Toggle */}
            <button
              type="button"
              onClick={() => {
                soundEngine.playHoverTick(220);
                setMenuOpen((prev) => !prev);
              }}
              aria-expanded={menuOpen}
              aria-controls="afterhrs-stage-curtain"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="h-10 px-3.5 bg-void-900 border border-scarlet-500/55 text-bone-100 hover:bg-scarlet-500 hover:text-void-950 transition-colors duration-200 inline-flex items-center gap-2 cursor-pointer"
            >
              {menuOpen ? (
                <X size={18} weight="bold" aria-hidden="true" />
              ) : (
                <List size={18} weight="bold" aria-hidden="true" />
              )}
              <span className="font-extended text-[10px] font-bold tracking-[0.2em] uppercase">
                {menuOpen ? 'CLOSE' : 'INDEX'}
              </span>
            </button>
          </div>
        </div>

        {/* Live Scroll Progress Laser Bar */}
        <div className="w-full h-[2px] bg-void-950 overflow-hidden" aria-hidden="true">
          <div
            className="h-full bg-scarlet-500 origin-left transition-transform duration-75"
            style={{ transform: `scaleX(${scrollProgress})` }}
          />
        </div>
      </header>

      {/* Full-Screen Animated Brutalist Stage Curtain Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="afterhrs-stage-curtain"
            role="dialog"
            aria-modal="true"
            aria-label="Site Navigation Directory"
            initial={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }}
            animate={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
            exit={{ clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-void-950 pt-24 pb-10 px-6 sm:px-12 flex flex-col justify-between overflow-y-auto"
          >
            {/* Atmospheric Crimson Glow Backdrop */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(circle at 82% 28%, rgba(230, 0, 0, 0.25) 0%, rgba(74, 0, 6, 0.14) 45%, transparent 75%)',
              }}
              aria-hidden="true"
            />

            <div className="relative z-10 max-w-[1500px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 my-auto py-6">
              {/* Navigation Directory */}
              <div className="lg:col-span-8 flex flex-col divide-y divide-[var(--color-border-hairline)] border-y border-[var(--color-border-hairline)]">
                {NAV_ITEMS.map((item, idx) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={handleNavClick}
                    onMouseEnter={() => soundEngine.playHoverTick(180 + idx * 18)}
                    initial={{ opacity: 0, x: -28 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + idx * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="group py-4 sm:py-5 flex items-baseline justify-between gap-4 hover:bg-scarlet-500 hover:px-6 transition-all duration-300"
                  >
                    <span className="font-display text-4xl sm:text-6xl font-black uppercase tracking-[-0.02em] text-bone-100 group-hover:text-void-950">
                      {item.label}
                    </span>
                    <span className="tabular-nums-data text-xs sm:text-sm text-ash-300 group-hover:text-void-950 font-semibold">
                      [{item.coord} HZ]
                    </span>
                  </motion.a>
                ))}
              </div>

              {/* Right Column: Official Brand Plate & Social Channel */}
              <div className="lg:col-span-4 flex flex-col justify-between border border-[var(--color-border-hairline)] bg-void-900/90 p-6 sm:p-8 shadow-stage">
                <div>
                  <img
                    src="/brand/afterhrs-wordmark-plate.jpg"
                    alt="AFTERHRS PRODUCTIONS official brand plate"
                    width={490}
                    height={320}
                    loading="lazy"
                    className="w-full h-44 object-cover border border-scarlet-500/40 mb-6"
                  />
                  <p className="font-sans text-sm text-ash-300 leading-relaxed">
                    Underground audiovisual event production house operating out of Hyderabad. Built for what happens after the conventional night ends.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[var(--color-border-hairline)] flex flex-col gap-3">
                  <a
                    href={EVENT_CONFIG.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-5 bg-scarlet-500 text-void-950 font-extended text-xs font-extrabold tracking-[0.2em] uppercase inline-flex items-center justify-between hover:bg-bone-100 transition-colors"
                  >
                    <span>INSTAGRAM {EVENT_CONFIG.instagramHandle}</span>
                    <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
                  </a>
                  <span className="tabular-nums-data text-xs text-ash-500">
                    {EVENT_CONFIG.location} // {EVENT_CONFIG.coordinates}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

