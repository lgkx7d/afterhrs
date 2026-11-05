'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  ClockCountdown,
  Compass,
  LockKey,
  SlidersHorizontal,
} from '@phosphor-icons/react';
import { EVENT_CONFIG, PREVIEW_COUNTDOWN_OFFSET_DAYS } from '@/config/event';
import { soundEngine } from '@/lib/sound';

gsap.registerPlugin(ScrollTrigger);

interface CountdownBreakdown {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

function AnimatedDigitUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="border border-scarlet-500/50 bg-void-950 p-4 sm:p-6 flex flex-col justify-between">
      <div className="relative h-14 sm:h-20 overflow-hidden flex items-center justify-start">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: '75%', opacity: 0, filter: 'blur(4px)' }}
            animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: '-75%', opacity: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="tabular-nums-data text-4xl sm:text-6xl font-extrabold text-bone-100 tracking-tight block"
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="mt-3 pt-2 border-t border-[var(--color-border-hairline)] flex items-center justify-between">
        <span className="font-extended text-[10px] font-bold tracking-[0.22em] text-ash-300 uppercase">
          {label}
        </span>
        <span className="w-1.5 h-1.5 bg-scarlet-500" />
      </div>
    </div>
  );
}

export function EventRevealSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [simulateCountdown, setSimulateCountdown] = useState(EVENT_CONFIG.isConfirmed);
  const [timeLeft, setTimeLeft] = useState<CountdownBreakdown>({
    days: '14',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  // Target timestamp: uses EVENT_CONFIG.date when confirmed, or a 14-day horizon when previewing the countdown engine
  const targetTimestamp = useMemo(() => {
    if (EVENT_CONFIG.date) {
      return new Date(EVENT_CONFIG.date).getTime();
    }
    return Date.now() + PREVIEW_COUNTDOWN_OFFSET_DAYS * 24 * 60 * 60 * 1000;
  }, []);

  useEffect(() => {
    if (!simulateCountdown && !EVENT_CONFIG.isConfirmed) return;

    const updateTimer = () => {
      const diff = Math.max(0, targetTimestamp - Date.now());
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        days: String(d).padStart(2, '0'),
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
        seconds: String(s).padStart(2, '0'),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [simulateCountdown, targetTimestamp]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const cells = section.querySelectorAll('.spec-ledger-cell');
      gsap.fromTo(
        cells,
        { y: 28, opacity: 0.15 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.06,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 76%',
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  const specRows = [
    {
      field: 'EVENT TITLE',
      value: EVENT_CONFIG.title ?? 'COMING SOON // CLASSIFIED TRANSMISSION',
      isConfirmed: Boolean(EVENT_CONFIG.title),
    },
    {
      field: 'EVENT DATE',
      value: EVENT_CONFIG.dateFormatted ?? 'COMING SOON // DATE LOCK PENDING',
      isConfirmed: Boolean(EVENT_CONFIG.dateFormatted),
    },
    {
      field: 'STARTING TIME',
      value: EVENT_CONFIG.startTime ?? 'COMING SOON // DOORS TBA',
      isConfirmed: Boolean(EVENT_CONFIG.startTime),
    },
    {
      field: 'VENUE',
      value: EVENT_CONFIG.venue ?? 'COMING SOON // DISCLOSED TO REGISTERED GUESTS',
      isConfirmed: Boolean(EVENT_CONFIG.venue),
    },
    {
      field: 'LOCATION',
      value: `${EVENT_CONFIG.location} (${EVENT_CONFIG.coordinates})`,
      isConfirmed: true,
    },
    {
      field: 'EVENT CATEGORY',
      value: EVENT_CONFIG.category,
      isConfirmed: true,
    },
    {
      field: 'AGE RESTRICTIONS',
      value: EVENT_CONFIG.ageRestriction ?? 'COMING SOON',
      isConfirmed: Boolean(EVENT_CONFIG.ageRestriction),
    },
    {
      field: 'TICKET INFORMATION',
      value: EVENT_CONFIG.ticketInfo ?? 'COMING SOON // REGISTER FOR FIRST WAVE ACCESS',
      isConfirmed: Boolean(EVENT_CONFIG.ticketInfo),
    },
  ];

  return (
    <section
      id="event"
      ref={sectionRef}
      className="relative w-full bg-void-950 py-24 sm:py-32 px-4 sm:px-8 lg:px-12 border-b border-[var(--color-border-hairline)]"
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Editorial Section Header (Heading leads first; no kicker above heading) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-[var(--color-border-hairline)] items-end">
          <div className="lg:col-span-8">
            <h2
              className="font-display font-black uppercase text-bone-100 tracking-[-0.03em] leading-[0.9]"
              style={{ fontSize: 'clamp(2.6rem, 6vw, 4.75rem)' }}
            >
              THE UPCOMING <span className="text-scarlet-500">TRANSMISSION.</span>
            </h2>
            <p className="mt-5 font-sans text-base sm:text-lg text-ash-300 max-w-[66ch] leading-relaxed">
              {EVENT_CONFIG.description}
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between gap-4">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-crimson-950 border border-scarlet-500/60">
              <LockKey size={16} weight="bold" className="text-scarlet-400" aria-hidden="true" />
              <span className="font-extended text-[10px] font-bold tracking-[0.2em] text-bone-100 uppercase">
                {EVENT_CONFIG.isConfirmed
                  ? 'TRANSMISSION CONFIRMED'
                  : 'STATUS: COMING SOON // DOSSIER LOCKED'}
              </span>
            </div>

            {/* Interactive Switch to Preview the Live Countdown Engine when date is TBA */}
            {!EVENT_CONFIG.isConfirmed && (
              <button
                type="button"
                onClick={() => {
                  soundEngine.playHoverTick(230);
                  setSimulateCountdown((prev) => !prev);
                }}
                aria-pressed={simulateCountdown}
                className="px-4 py-2.5 bg-void-900 border border-[var(--color-border-hairline)] hover:border-scarlet-400 text-ash-300 hover:text-bone-100 font-extended text-[10px] font-bold tracking-[0.18em] uppercase inline-flex items-center gap-2.5 transition-colors cursor-pointer"
              >
                <SlidersHorizontal size={15} weight="bold" className="text-scarlet-400" aria-hidden="true" />
                <span>
                  {simulateCountdown
                    ? 'HIDE COUNTDOWN ENGINE PREVIEW'
                    : 'TEST LIVE COUNTDOWN ENGINE'}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Live Animated Numerical Countdown Console (Active when date is confirmed or previewed) */}
        <div className="mt-10 border border-scarlet-500/50 bg-void-900/90 p-6 sm:p-8 shadow-stage">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--color-border-hairline)]">
            <div className="flex items-center gap-3">
              <ClockCountdown size={22} weight="bold" className="text-scarlet-400" aria-hidden="true" />
              <h3 className="font-extended text-xs sm:text-sm font-extrabold tracking-[0.22em] text-bone-100 uppercase">
                {EVENT_CONFIG.isConfirmed
                  ? 'LIVE TRANSMISSION COUNTDOWN'
                  : simulateCountdown
                  ? 'COUNTDOWN TELEMETRY PREVIEW // OFFICIAL DATE COMING SOON'
                  : 'CHRONOMETER STANDBY // AWAITING DATE CONFIRMATION'}
              </h3>
            </div>
            <span className="tabular-nums-data text-xs text-ash-300">
              SOURCE: src/config/event.ts
            </span>
          </div>

          {simulateCountdown || EVENT_CONFIG.isConfirmed ? (
            <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
              <AnimatedDigitUnit value={timeLeft.days} label="DAYS" />
              <AnimatedDigitUnit value={timeLeft.hours} label="HOURS" />
              <AnimatedDigitUnit value={timeLeft.minutes} label="MINUTES" />
              <AnimatedDigitUnit value={timeLeft.seconds} label="SECONDS" />
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {['DAYS', 'HOURS', 'MINUTES', 'SECONDS'].map((unit) => (
                <div
                  key={unit}
                  className="border border-[var(--color-border-hairline)] bg-void-950/90 p-5 sm:p-6 flex flex-col justify-between"
                >
                  <span className="tabular-nums-data text-3xl sm:text-5xl font-bold text-scarlet-500/80 tracking-widest">
                    TBA
                  </span>
                  <div className="mt-4 pt-2 border-t border-[var(--color-border-hairline)] flex items-center justify-between">
                    <span className="font-extended text-[10px] font-bold tracking-[0.22em] text-ash-300 uppercase">
                      {unit}
                    </span>
                    <span className="font-extended text-[9px] tracking-[0.16em] text-ash-500 uppercase">
                      LOCKED
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Experimental Editorial Event Specification Ledger */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-[var(--color-border-hairline)]">
          {specRows.map((item) => (
            <div
              key={item.field}
              onMouseEnter={() => soundEngine.playHoverTick(165)}
              className="spec-ledger-cell group border-r border-b border-[var(--color-border-hairline)] bg-void-950 hover:bg-void-900 p-6 sm:p-8 flex flex-col justify-between gap-6 transition-colors duration-200"
            >
              <div>
                <h3 className="font-extended text-xs font-extrabold tracking-[0.22em] text-scarlet-400 uppercase">
                  {item.field}
                </h3>
                <p
                  className={`mt-4 font-sans text-base sm:text-lg font-semibold leading-snug ${
                    item.isConfirmed ? 'text-bone-100' : 'text-ash-300'
                  }`}
                >
                  {item.value}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--color-border-hairline)] flex items-center justify-between">
                <span
                  className={`font-extended text-[9px] font-bold tracking-[0.2em] uppercase px-2 py-0.5 ${
                    item.isConfirmed
                      ? 'bg-scarlet-500 text-void-950'
                      : 'bg-crimson-950 text-ash-300 border border-scarlet-500/40'
                  }`}
                >
                  {item.isConfirmed ? 'CONFIRMED' : 'COMING SOON'}
                </span>
                <Compass
                  size={16}
                  className="text-ash-500 group-hover:text-scarlet-400 transition-colors"
                  aria-hidden="true"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Booking Destination & Registration Action Bar */}
        <div className="mt-10 border border-scarlet-500 bg-scarlet-500 text-void-950 p-6 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-crimson">
          <div>
            <h3 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-[-0.02em] text-void-950">
              PRIORITY ACCESS & BOOKING DESTINATION
            </h3>
            <p className="mt-2 font-sans text-sm sm:text-base font-medium text-void-950/90 max-w-[64ch]">
              Register below to receive the encrypted venue coordinates and first-wave ticket link the moment the countdown locks, or connect directly on our official Instagram channel.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            <a
              href="#register"
              onMouseEnter={() => soundEngine.playHoverTick(240)}
              className="px-6 py-4 bg-void-950 text-bone-100 font-extended text-xs font-extrabold tracking-[0.2em] uppercase inline-flex items-center gap-3 hover:bg-bone-100 hover:text-void-950 transition-colors"
            >
              <span>GET NOTIFIED FIRST</span>
              <ArrowUpRight size={17} weight="bold" aria-hidden="true" />
            </a>

            <a
              href={EVENT_CONFIG.bookingDestination}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundEngine.playHoverTick(210)}
              className="px-6 py-4 bg-transparent border-2 border-void-950 text-void-950 font-extended text-xs font-extrabold tracking-[0.2em] uppercase inline-flex items-center gap-3 hover:bg-void-950 hover:text-bone-100 transition-colors"
            >
              <span>OFFICIAL CHANNEL ({EVENT_CONFIG.instagramHandle})</span>
              <ArrowUpRight size={17} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
