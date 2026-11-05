'use client';

import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight, ArrowUpRight, Broadcast } from '@phosphor-icons/react';
import { AfterhrsWordmark } from '@/components/ui/AfterhrsWordmark';
import { MagneticElement } from '@/components/motion/MagneticElement';
import { EVENT_CONFIG } from '@/config/event';
import { soundEngine } from '@/lib/sound';

gsap.registerPlugin(ScrollTrigger);

const CrimsonSoundstageCanvas = dynamic(
  () =>
    import('@/components/canvas/CrimsonSoundstageCanvas').then(
      (mod) => mod.CrimsonSoundstageCanvas
    ),
  { ssr: false }
);

export function HeroExperience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageContentRef = useRef<HTMLDivElement | null>(null);
  const wordmarkLayerRef = useRef<HTMLDivElement | null>(null);
  const plateLayerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Multi-layer pointer depth parallax
      const xWordmark = gsap.quickTo(wordmarkLayerRef.current, 'x', {
        duration: 0.6,
        ease: 'power3.out',
      });
      const yWordmark = gsap.quickTo(wordmarkLayerRef.current, 'y', {
        duration: 0.6,
        ease: 'power3.out',
      });
      const xPlate = gsap.quickTo(plateLayerRef.current, 'x', {
        duration: 0.75,
        ease: 'power3.out',
      });
      const yPlate = gsap.quickTo(plateLayerRef.current, 'y', {
        duration: 0.75,
        ease: 'power3.out',
      });

      const onPointerMove = (e: PointerEvent) => {
        const nx = (e.clientX / Math.max(window.innerWidth, 1) - 0.5) * 2;
        const ny = (e.clientY / Math.max(window.innerHeight, 1) - 0.5) * 2;
        xWordmark(nx * -18);
        yWordmark(ny * -12);
        xPlate(nx * 24);
        yPlate(ny * 16);
      };

      window.addEventListener('pointermove', onPointerMove, { passive: true });

      // Scroll-driven exit choreography into the Event Reveal section
      gsap.to(stageContentRef.current, {
        yPercent: -14,
        scale: 0.94,
        opacity: 0.18,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      return () => {
        window.removeEventListener('pointermove', onPointerMove);
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-[100dvh] w-full bg-void-950 pt-24 pb-12 px-4 sm:px-8 lg:px-12 flex flex-col justify-between overflow-hidden border-b border-[var(--color-border-hairline)]"
    >
      {/* 3D WebGL Volumetric Crimson Soundstage + Relativistic Monolith */}
      <CrimsonSoundstageCanvas />

      {/* Subtle Architectural Grid Hairlines */}
      <div
        className="pointer-events-none absolute inset-0 max-w-[1600px] mx-auto border-x border-[var(--color-border-hairline)]"
        aria-hidden="true"
      />

      <div
        ref={stageContentRef}
        className="relative z-10 max-w-[1600px] w-full mx-auto my-auto flex flex-col gap-5 sm:gap-7 lg:gap-8 pt-1 sm:pt-2"
      >
        {/* Massive Interactive Warped AFTERHRS Wordmark + Brand Plate Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          <div ref={wordmarkLayerRef} className="lg:col-span-8 will-change-transform">
            <AfterhrsWordmark
              variant="void-monolith"
              showSubtitle={true}
              interactive={true}
              className="max-w-[520px] xl:max-w-[560px]"
            />
          </div>

          {/* Authentic Official Brand Emblem Plate (LCP candidate with fetchpriority="high") */}
          <div
            ref={plateLayerRef}
            className="hidden sm:flex lg:col-span-4 flex-col items-end will-change-transform"
          >
            <div
              data-cursor="EXPLORE"
              className="w-full max-w-[380px] border border-scarlet-500/60 bg-void-900/90 p-3 shadow-crimson"
            >
              <div className="relative overflow-hidden border border-scarlet-500/30">
                <img
                  src="/brand/afterhrs-wordmark-plate.jpg"
                  alt="AFTERHRS PRODUCTIONS official crimson and black emblem"
                  width={980}
                  height={640}
                  fetchPriority="high"
                  className="w-full h-44 sm:h-48 object-cover safelight-plate"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-void-950/90 border border-scarlet-500/40 px-3 py-1.5 flex items-center justify-between">
                  <span className="font-extended text-[10px] font-bold tracking-[0.2em] text-bone-100 uppercase">
                    {EVENT_CONFIG.statusText}
                  </span>
                  <span className="w-2 h-2 bg-scarlet-500 pulse-signal" />
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-ash-300">
                <span className="font-extended text-[10px] tracking-[0.18em] uppercase">
                  {EVENT_CONFIG.location}
                </span>
                <span className="tabular-nums-data text-[11px] text-ash-300">
                  {EVENT_CONFIG.coordinates}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dominant Hero Statement & Conversion Architecture (No kicker above h1 per craft floor) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end border-t border-[var(--color-border-hairline)] pt-6 sm:pt-8 lg:pt-10">
          <div className="lg:col-span-7">
            <h1
              className="font-display font-black uppercase text-bone-100 tracking-[-0.03em] leading-[0.88]"
              style={{ fontSize: 'clamp(3.1rem, 7.2vw, 5.75rem)' }}
            >
              THE NIGHT DOESN&apos;T{' '}
              <span className="text-scarlet-500">END HERE.</span>
            </h1>

            <p className="mt-4 sm:mt-5 font-sans text-sm sm:text-lg lg:text-xl text-ash-300 max-w-[65ch] leading-relaxed">
              AFTERHRS PRODUCTIONS PRESENTS SOMETHING BEYOND THE ORDINARY. An underground audiovisual architecture engineered in Hyderabad for those who refuse predictable nights.
            </p>
          </div>

          {/* Primary Actions & Status Console */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-4">
            <MagneticElement strength={0.26} className="w-full sm:w-auto">
              <a
                href="#register"
                onMouseEnter={() => soundEngine.playHoverTick(250)}
                className="w-full sm:w-auto px-7 py-4 bg-scarlet-500 text-void-950 font-extended text-xs font-extrabold tracking-[0.22em] uppercase inline-flex items-center justify-between sm:justify-center gap-3 hover:bg-bone-100 transition-colors duration-200 shadow-crimson"
              >
                <span>REGISTER ACCESS</span>
                <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
              </a>
            </MagneticElement>

            <MagneticElement strength={0.22} className="w-full sm:w-auto">
              <a
                href="#event"
                onMouseEnter={() => soundEngine.playHoverTick(190)}
                className="w-full sm:w-auto px-6 py-4 bg-void-900/95 border border-scarlet-500/60 text-bone-100 font-extended text-xs font-bold tracking-[0.2em] uppercase inline-flex items-center justify-between sm:justify-center gap-3 hover:border-bone-100 hover:bg-crimson-900/60 transition-colors duration-200"
              >
                <span>THE TRANSMISSION</span>
                <ArrowDownRight size={18} weight="bold" aria-hidden="true" />
              </a>
            </MagneticElement>
          </div>
        </div>

        {/* Mobile Brand Emblem Plate (Positioned below primary CTAs on <640px so headline + CTAs stay in first viewport) */}
        <div className="sm:hidden border border-scarlet-500/60 bg-void-900/90 p-2.5 shadow-crimson">
          <div className="relative overflow-hidden border border-scarlet-500/30">
            <img
              src="/brand/afterhrs-wordmark-plate.jpg"
              alt="AFTERHRS PRODUCTIONS official crimson and black emblem"
              width={980}
              height={640}
              className="w-full h-32 object-cover safelight-plate"
            />
            <div className="absolute bottom-2 left-2 right-2 bg-void-950/90 border border-scarlet-500/40 px-2.5 py-1 flex items-center justify-between">
              <span className="font-extended text-[10px] font-bold tracking-[0.18em] text-bone-100 uppercase">
                {EVENT_CONFIG.statusText}
              </span>
              <span className="w-2 h-2 bg-scarlet-500 pulse-signal" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stage Status Strip */}
      <div className="relative z-10 max-w-[1600px] w-full mx-auto mt-10 pt-4 border-t border-[var(--color-border-hairline)] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Broadcast size={18} weight="bold" className="text-scarlet-400" aria-hidden="true" />
          <span className="font-extended text-[10px] sm:text-xs font-bold tracking-[0.22em] text-bone-100 uppercase">
            STATUS: {EVENT_CONFIG.statusText}
          </span>
        </div>

        <div className="flex items-center gap-6">
          <span className="font-sans text-xs text-ash-300 hidden md:inline">
            MOVE CURSOR TO DISTORT FIELD // SCROLL TO ENTER SOUNDSTAGE
          </span>
          <a
            href={EVENT_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-extended text-[10px] sm:text-xs font-bold tracking-[0.2em] text-scarlet-400 hover:text-bone-100 uppercase underline"
          >
            {EVENT_CONFIG.instagramHandle}
          </a>
        </div>
      </div>
    </section>
  );
}
