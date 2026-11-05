'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from '@phosphor-icons/react';
import { AfterhrsWordmark } from '@/components/ui/AfterhrsWordmark';
import { EVENT_CONFIG } from '@/config/event';
import { soundEngine } from '@/lib/sound';

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    title: 'UNDERGROUND AUTONOMY',
    body: 'Born in Hyderabad to challenge formulaic nightlife. We reject velvet-rope posturing in favor of raw creative intensity, sonic integrity, and rooms where the music and environment command total attention.',
    tag: 'IDENTITY // REBELLIOUS',
  },
  {
    title: 'CINEMATIC ARCHITECTURE',
    body: 'Every AFTERHRS event is approached like a film production set. From custom crimson lighting arrays to dense spatial haze and brutalist visual identity, the room is choreographed from entrance to final blackout.',
    tag: 'CRAFT // EXPERIMENTAL',
  },
  {
    title: 'CURATED COMMUNITY',
    body: 'An experience is defined by who shares the floor. By prioritizing intentional registration and direct community access, we protect the energy inside the room.',
    tag: 'CULTURE // UNCOMPROMISING',
  },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const crimsonBlockRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const crimsonBlock = crimsonBlockRef.current;
    if (!section || !crimsonBlock) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        crimsonBlock,
        { clipPath: 'polygon(0% 8%, 100% 0%, 100% 100%, 0% 100%)' },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          ease: 'none',
          scrollTrigger: {
            trigger: crimsonBlock,
            start: 'top 85%',
            end: 'top 25%',
            scrub: true,
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-void-950 border-b border-[var(--color-border-hairline)] overflow-hidden"
    >
      {/* Part 1: Full-Bleed Crimson-Drenched Editorial Manifesto Block (Contrasting Light/Saturated vs Dark) */}
      <div
        ref={crimsonBlockRef}
        className="w-full bg-scarlet-500 text-void-950 py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-void-950"
      >
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Editorial Statement (Heading leads first; no kicker above heading) */}
          <div className="lg:col-span-7">
            <h2
              className="font-display font-black uppercase text-void-950 tracking-[-0.03em] leading-[0.88]"
              style={{ fontSize: 'clamp(2.8rem, 6.8vw, 5.5rem)' }}
            >
              BEYOND THE ORDINARY.
            </h2>

            <p className="mt-6 font-sans text-lg sm:text-xl font-semibold text-void-950/90 max-w-[64ch] leading-relaxed">
              AFTERHRS PRODUCTIONS is a Hyderabad-based event production brand dedicated to underground, experimental, and cinematic nocturnal experiences.
            </p>

            <p className="mt-4 font-sans text-base sm:text-lg text-void-950/85 max-w-[66ch] leading-relaxed">
              We do not rent a room and call it a show. We treat space, sound, shadow, and visual tension as a single medium—transforming physical venues into high-contrast dimensions where the unpredictable takes center stage.
            </p>

            <div className="mt-8 pt-6 border-t border-void-950/30 flex flex-wrap items-center gap-6">
              <a
                href={EVENT_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundEngine.playHoverTick(235)}
                className="px-6 py-3.5 bg-void-950 text-bone-100 font-extended text-xs font-extrabold tracking-[0.2em] uppercase inline-flex items-center gap-3 hover:bg-bone-100 hover:text-void-950 transition-colors"
              >
                <span>FOLLOW {EVENT_CONFIG.instagramHandle}</span>
                <ArrowUpRight size={17} weight="bold" aria-hidden="true" />
              </a>
              <span className="tabular-nums-data text-xs font-bold text-void-950">
                HYDERABAD // {EVENT_CONFIG.coordinates}
              </span>
            </div>
          </div>

          {/* Right Official Brand Triptych & Interactive Wordmark Study */}
          <div className="lg:col-span-5 bg-void-950 p-6 sm:p-8 border-2 border-void-950 shadow-stage text-bone-100">
            <AfterhrsWordmark
              variant="crimson-plate"
              showSubtitle={true}
              interactive={true}
              className="py-4"
            />
            <div className="mt-6 pt-4 border-t border-[var(--color-border-hairline)] flex items-center justify-between text-xs text-ash-300">
              <span className="font-extended text-[10px] font-bold tracking-[0.2em] uppercase">
                OFFICIAL BRAND SIGNATURE
              </span>
              <span className="tabular-nums-data text-xs text-scarlet-400">
                REV // 2026
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: Pitch-Black Architectural Ethos Columns */}
      <div className="max-w-[1600px] mx-auto py-20 sm:py-28 px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-l border-[var(--color-border-hairline)]">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              onMouseEnter={() => soundEngine.playHoverTick(185)}
              className="border-r border-b border-[var(--color-border-hairline)] bg-void-900/75 hover:bg-void-900 p-8 sm:p-10 flex flex-col justify-between gap-8 transition-colors"
            >
              <div>
                <h3 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-[-0.02em] text-bone-100">
                  {pillar.title}
                </h3>
                <p className="mt-4 font-sans text-base text-ash-300 leading-relaxed max-w-[62ch]">
                  {pillar.body}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--color-border-hairline)] flex items-center justify-between">
                <span className="font-extended text-[10px] font-bold tracking-[0.2em] text-scarlet-400 uppercase">
                  {pillar.tag}
                </span>
                <span className="w-2 h-2 bg-scarlet-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

