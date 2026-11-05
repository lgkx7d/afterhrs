'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { AfterhrsWordmark } from '@/components/ui/AfterhrsWordmark';

interface CinematicIntroProps {
  onComplete?: () => void;
}

/**
 * 04. CINEMATIC INTRO / LOADING EXPERIENCE
 * Four-phase film production sequence (No percentage counters):
 * - PHASE 1: BLACKOUT — Low-frequency visual pulse + thin 1px crimson horizon line.
 * - PHASE 2: BRAND REVEAL — Warped AFTERHRS wordmark emerges through clip-path & SVG turbulence distortion.
 * - PHASE 3: ATMOSPHERE — Controlled crimson smoke, vertical thermal light leak & analog film grain.
 * - PHASE 4: TRANSITION — AFTERHRS expands past the viewport with an iris/slit mask reveal into the hero.
 * Includes an explicit Skip button (and Escape key shortcut) and respects prefers-reduced-motion.
 */
export function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [completed, setCompleted] = useState(false);
  const [phaseLabel, setPhaseLabel] = useState<string>('PHASE I // BLACKOUT');
  const rootRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const pulseRef = useRef<HTMLDivElement | null>(null);
  const brandWrapRef = useRef<HTMLDivElement | null>(null);
  const atmosphereRef = useRef<HTMLDivElement | null>(null);
  const streakRef = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const finishIntro = useCallback(() => {
    if (tlRef.current) {
      tlRef.current.kill();
    }
    setCompleted(true);
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      finishIntro();
      return;
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        finishIntro();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          finishIntro();
        },
      });
      tlRef.current = tl;

      // Initial states
      gsap.set(lineRef.current, { scaleX: 0, opacity: 1 });
      gsap.set(pulseRef.current, { scale: 0.4, opacity: 0 });
      gsap.set(brandWrapRef.current, {
        clipPath: 'polygon(0% 49%, 100% 49%, 100% 51%, 0% 51%)',
        scale: 0.88,
        opacity: 0,
        filter: 'blur(8px) contrast(1.8)',
      });
      gsap.set(atmosphereRef.current, { opacity: 0 });
      gsap.set(streakRef.current, { scaleY: 0, opacity: 0 });

      // PHASE 1 — BLACKOUT & HORIZON IGNITION (0.0s -> 0.75s)
      tl.to(pulseRef.current, {
        opacity: 0.55,
        scale: 1.15,
        duration: 0.45,
        ease: 'power2.out',
      })
        .to(
          lineRef.current,
          {
            scaleX: 1,
            duration: 0.55,
            ease: 'expo.inOut',
          },
          0.1
        )
        // PHASE 2 — BRAND REVEAL (0.65s -> 1.65s)
        .call(() => setPhaseLabel('PHASE II // SIGNAL IGNITION'), [], 0.65)
        .to(
          brandWrapRef.current,
          {
            opacity: 1,
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            scale: 1,
            filter: 'blur(0px) contrast(1.08)',
            duration: 0.85,
            ease: 'expo.out',
          },
          0.65
        )
        .to(
          lineRef.current,
          {
            opacity: 0.18,
            height: '180px',
            filter: 'blur(36px)',
            duration: 0.65,
            ease: 'power3.out',
          },
          0.75
        )
        // PHASE 3 — ATMOSPHERE & LIGHT LEAKS (1.4s -> 2.25s)
        .call(() => setPhaseLabel('PHASE III // RED ROOM ATMOSPHERE'), [], 1.4)
        .to(
          atmosphereRef.current,
          {
            opacity: 1,
            duration: 0.65,
            ease: 'power2.out',
          },
          1.35
        )
        .to(
          streakRef.current,
          {
            scaleY: 1,
            opacity: 0.85,
            duration: 0.6,
            ease: 'expo.out',
          },
          1.45
        )
        // PHASE 4 — VIEWPORT EXPANSION & MASK TRANSITION (2.25s -> 3.05s)
        .call(() => setPhaseLabel('PHASE IV // ENTERING AFTERHRS'), [], 2.2)
        .to(
          brandWrapRef.current,
          {
            scale: 4.8,
            opacity: 0,
            filter: 'blur(14px) contrast(2)',
            duration: 0.78,
            ease: 'expo.in',
          },
          2.22
        )
        .to(
          rootRef.current,
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
            duration: 0.72,
            ease: 'expo.inOut',
          },
          2.32
        );
    }, rootRef);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      ctx.revert();
    };
  }, [finishIntro]);

  if (completed) return null;

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-label="AFTERHRS Productions Cinematic Intro"
      style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
      className="fixed inset-0 z-[100] bg-void-950 flex flex-col items-center justify-between p-6 sm:p-10 overflow-hidden select-none"
    >
      {/* Phase 1 Low-Frequency Subterranean Pulse */}
      <div
        ref={pulseRef}
        className="pointer-events-none absolute inset-0 m-auto w-[48vw] h-[48vw] max-w-[620px] max-h-[620px] opacity-0"
        style={{
          background:
            'radial-gradient(circle, rgba(230, 0, 0, 0.34) 0%, rgba(138, 0, 10, 0.12) 45%, transparent 72%)',
        }}
      />

      {/* Phase 3 Atmospheric Crimson Smoke & Vertical Thermal Light Leak */}
      <div
        ref={atmosphereRef}
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 55%, rgba(230, 0, 0, 0.28) 0%, rgba(74, 0, 6, 0.22) 45%, rgba(5, 5, 5, 0.96) 80%)',
        }}
      />
      <div
        ref={streakRef}
        className="pointer-events-none absolute top-0 bottom-0 right-[16%] w-16 origin-top opacity-0"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(217, 78, 15, 0.42) 48%, rgba(255, 196, 112, 0.65) 55%, rgba(230, 0, 0, 0.35) 75%, transparent 100%)',
          filter: 'blur(10px)',
        }}
      />

      {/* Top Production Slate Bar */}
      <div className="relative z-10 w-full flex items-center justify-between border-b border-[var(--color-border-hairline)] pb-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 bg-scarlet-500 pulse-signal" />
          <span className="font-extended text-[10px] sm:text-xs tracking-[0.26em] text-ash-300 uppercase">
            {phaseLabel}
          </span>
        </div>
        <span className="tabular-nums-data text-xs text-ash-500 hidden sm:inline">
          17.3850° N // 78.4867° E
        </span>
      </div>

      {/* Center Stage: Thin Red Line + Emerging Warped AFTERHRS Emblem */}
      <div className="relative z-10 w-full max-w-5xl flex items-center justify-center my-auto py-12">
        {/* Phase 1 Emerging Thin Crimson Laser Line */}
        <div
          ref={lineRef}
          className="pointer-events-none absolute left-0 right-0 h-[1px] bg-scarlet-400 origin-center"
          style={{
            boxShadow: '0 0 24px 2px rgba(255, 26, 26, 0.9)',
          }}
        />

        {/* Phase 2 Physical Brand Emergence */}
        <div ref={brandWrapRef} className="w-full max-w-4xl px-4 will-change-transform">
          <AfterhrsWordmark variant="void-monolith" showSubtitle={true} interactive={false} />
        </div>
      </div>

      {/* Bottom Controls: Non-blocking Skip Option */}
      <div className="relative z-10 w-full flex items-center justify-between border-t border-[var(--color-border-hairline)] pt-4">
        <span className="font-sans text-xs text-ash-300 tracking-wide">
          HYDERABAD UNDERGROUND PRODUCTION HOUSE
        </span>

        <button
          type="button"
          onClick={finishIntro}
          className="px-4 py-2 bg-void-900 border border-scarlet-500/60 text-bone-100 font-extended text-[10px] tracking-[0.22em] uppercase hover:bg-scarlet-500 hover:text-void-950 transition-colors duration-200 cursor-pointer"
        >
          SKIP INTRO [ESC]
        </button>
      </div>
    </div>
  );
}

