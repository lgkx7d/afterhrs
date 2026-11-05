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

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Pointer depth parallax on wordmark
      const xWordmark = gsap.quickTo(wordmarkLayerRef.current, 'x', {
        duration: 0.6,
        ease: 'power3.out',
      });
      const yWordmark = gsap.quickTo(wordmarkLayerRef.current, 'y', {
        duration: 0.6,
        ease: 'power3.out',
      });

      const onPointerMove = (e: PointerEvent) => {
        const nx = (e.clientX / Math.max(window.innerWidth, 1) - 0.5) * 2;
        const ny = (e.clientY / Math.max(window.innerHeight, 1) - 0.5) * 2;
        xWordmark(nx * -18);
        yWordmark(ny * -12);
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
      className="relative min-h-[100dvh] w-full bg-void-950 pt-24 pb-10 px-4 sm:px-8 lg:px-12 flex flex-col justify-between overflow-hidden border-b border-[var(--color-border-hairline)]"
    >
      {/* 3D WebGL Volumetric Crimson Soundstage + Glossy Ferrofluid Obsidian Singularity */}
      <CrimsonSoundstageCanvas />

      <div
        ref={stageContentRef}
        className="relative z-10 max-w-[1600px] w-full mx-auto my-auto flex flex-col gap-6 sm:gap-8 lg:gap-9 pt-1 sm:pt-2"
      >
        {/* Massive Interactive Warped AFTERHRS Wordmark (Right flank left open for unobstructed 3D Ferrofluid Orb) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          <div ref={wordmarkLayerRef} className="lg:col-span-7 will-change-transform">
            <AfterhrsWordmark
              variant="void-monolith"
              showSubtitle={true}
              interactive={true}
              className="max-w-[500px] xl:max-w-[540px]"
            />
          </div>
        </div>

        {/* Dominant Hero Statement & Conversion Architecture (No kicker above h1 per craft floor; no horizontal line cutting across 3D orb) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end pt-2 sm:pt-4">
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
                <span>BOOK PASSES</span>
                <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
              </a>
            </MagneticElement>

            <MagneticElement strength={0.22} className="w-full sm:w-auto">
              <a
                href="#register"
                onMouseEnter={() => soundEngine.playHoverTick(190)}
                className="w-full sm:w-auto px-6 py-4 bg-void-900/95 border border-scarlet-500/60 text-bone-100 font-extended text-xs font-bold tracking-[0.2em] uppercase inline-flex items-center justify-between sm:justify-center gap-3 hover:border-bone-100 hover:bg-crimson-900/60 transition-colors duration-200"
              >
                <span>PASS TIERS</span>
                <ArrowDownRight size={18} weight="bold" aria-hidden="true" />
              </a>
            </MagneticElement>
          </div>
        </div>
      </div>

      {/* Bottom Stage Status Strip */}
      <div className="relative z-10 max-w-[1600px] w-full mx-auto mt-8 pt-4 border-t border-[var(--color-border-hairline)] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Broadcast size={18} weight="bold" className="text-scarlet-400" aria-hidden="true" />
          <span className="font-extended text-[10px] sm:text-xs font-bold tracking-[0.22em] text-bone-100 uppercase">
            EARLY BIRD: GEN ₹1,299 · VIP ₹1,699 · 6 PAX (GEN) ₹7,200
          </span>
        </div>

        <div className="flex items-center gap-6">
          <span className="font-sans text-xs text-ash-300 hidden md:inline">
            HYDERABAD, IN // SCROLL TO EXPLORE PASSES
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
