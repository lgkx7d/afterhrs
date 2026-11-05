'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STORYTELLING_ACTS } from '@/config/event';
import { soundEngine } from '@/lib/sound';

gsap.registerPlugin(ScrollTrigger);

export function ScrollStorytellingSection() {
  const outerRef = useRef<HTMLElement | null>(null);
  const pinWrapRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const bgTypographyRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const outer = outerRef.current;
    const pinWrap = pinWrapRef.current;
    const track = trackRef.current;
    const bgTypo = bgTypographyRef.current;
    if (!outer || !pinWrap || !track) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinWrap,
          start: 'top top',
          end: () => `+=${Math.max(1800, track.scrollWidth - window.innerWidth)}`,
          pin: true,
          scrub: 0.85,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              STORYTELLING_ACTS.length - 1,
              Math.floor(self.progress * STORYTELLING_ACTS.length)
            );
            setActiveIndex(idx);
          },
        },
      });

      tl.to(
        track,
        {
          x: getScrollAmount,
          ease: 'none',
        },
        0
      );

      if (bgTypo) {
        tl.to(
          bgTypo,
          {
            xPercent: -28,
            ease: 'none',
          },
          0
        );
      }

      return () => {
        tl.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={outerRef}
      className="relative w-full bg-void-950 border-b border-[var(--color-border-hairline)] overflow-hidden"
    >
      <div
        ref={pinWrapRef}
        className="relative min-h-[100dvh] w-full flex flex-col justify-between py-20 lg:py-0 overflow-hidden"
      >
        {/* Deep Parallax Background Typography Moving in Opposing Velocity */}
        <div
          ref={bgTypographyRef}
          aria-hidden="true"
          className="pointer-events-none hidden lg:flex items-center whitespace-nowrap absolute top-1/2 -translate-y-1/2 left-0 select-none opacity-[0.07]"
        >
          <span
            className="font-display font-black uppercase text-scarlet-500 tracking-[-0.03em]"
            style={{ fontSize: '24vw', lineHeight: 0.85 }}
          >
            BEYOND THE ORDINARY // HYDERABAD SOUNDSTAGE // AFTERHRS PRODUCTIONS
          </span>
        </div>

        {/* Top Pinned Stage Header (Heading leads first; no kicker above heading) */}
        <div className="relative z-10 max-w-[1600px] w-full mx-auto px-4 sm:px-8 lg:px-12 lg:pt-24 pb-6 border-b border-[var(--color-border-hairline)] flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h2
              className="font-display font-black uppercase text-bone-100 tracking-[-0.03em] leading-[0.9]"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4.25rem)' }}
            >
              AN ENGINEERED <span className="text-scarlet-500">SENSORY RITUAL.</span>
            </h2>
            <p className="mt-3 font-sans text-sm sm:text-base text-ash-300 max-w-[64ch]">
              Scroll through the four acts of an AFTERHRS production—from initial blackout at the threshold to the final reverberation on the floor.
            </p>
          </div>

          {/* Act Progress Matrix */}
          <div className="flex items-center gap-2" aria-label="Storytelling Sequence Progress">
            {STORYTELLING_ACTS.map((act, idx) => (
              <div
                key={act.actCode}
                className={`h-2 transition-all duration-300 ${
                  idx === activeIndex
                    ? 'w-12 bg-scarlet-500'
                    : idx < activeIndex
                    ? 'w-6 bg-crimson-700'
                    : 'w-6 bg-void-850 border border-[var(--color-border-hairline)]'
                }`}
                title={act.actCode}
              />
            ))}
          </div>
        </div>

        {/* Horizontal Scrollytelling Track on Desktop / Vertical Stack on Mobile */}
        <div
          ref={trackRef}
          className="relative z-10 flex flex-col lg:flex-row lg:w-max items-stretch gap-8 lg:gap-12 px-4 sm:px-8 lg:px-12 my-auto py-8 lg:py-10 will-change-transform"
        >
          {STORYTELLING_ACTS.map((act, index) => (
            <article
              key={act.actCode}
              onMouseEnter={() => {
                setActiveIndex(index);
                soundEngine.playHoverTick(175 + index * 20);
              }}
              data-cursor="EXPLORE"
              className="w-full lg:w-[78vw] xl:w-[66vw] max-w-[1040px] border border-scarlet-500/45 bg-void-900/92 shadow-stage grid grid-cols-1 md:grid-cols-12 overflow-hidden"
            >
              {/* Left Narrative Column (Heading leads first; no kicker above heading) */}
              <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-between gap-8 border-b md:border-b-0 md:border-r border-[var(--color-border-hairline)]">
                <div>
                  <h3
                    className="font-display font-black uppercase text-bone-100 tracking-[-0.02em] leading-[0.92]"
                    style={{ fontSize: 'clamp(2rem, 3.6vw, 3.4rem)' }}
                  >
                    {act.title}
                  </h3>

                  <p className="mt-4 font-extended text-xs font-bold tracking-[0.18em] text-scarlet-400 uppercase">
                    {act.headline}
                  </p>

                  <p className="mt-5 font-sans text-base text-ash-300 leading-relaxed max-w-[58ch]">
                    {act.body}
                  </p>
                </div>

                {/* Bottom Utilitarian Spec Plate */}
                <div className="pt-6 border-t border-[var(--color-border-hairline)] flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="block font-extended text-[10px] font-bold tracking-[0.2em] text-ash-500 uppercase">
                      {act.specLabel}
                    </span>
                    <span className="mt-1 block tabular-nums-data text-xs sm:text-sm font-bold text-bone-100">
                      {act.specValue}
                    </span>
                  </div>

                  <span className="px-3 py-1.5 bg-crimson-950 border border-scarlet-500/50 font-extended text-[10px] font-extrabold tracking-[0.22em] text-bone-200 uppercase">
                    {act.actCode}
                  </span>
                </div>
              </div>

              {/* Right Darkroom Safelight Exposure Plate */}
              <div className="md:col-span-5 relative min-h-[280px] sm:min-h-[360px] bg-void-950 overflow-hidden group">
                <img
                  src={act.imageSrc}
                  alt={`${act.title} — AFTERHRS visual plate`}
                  width={480}
                  height={620}
                  loading="lazy"
                  className="w-full h-full object-cover safelight-plate group-hover:scale-105"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(5,5,5,0.15) 0%, rgba(5,5,5,0.78) 100%)',
                  }}
                />
                <div className="absolute bottom-4 left-4 right-4 bg-void-950/90 border border-scarlet-500/40 px-3.5 py-2 flex items-center justify-between">
                  <span className="font-extended text-[10px] font-bold tracking-[0.2em] text-bone-100 uppercase">
                    SAFELIGHT EXPOSURE
                  </span>
                  <span className="tabular-nums-data text-xs text-scarlet-400 font-bold">
                    0{index + 1} / 0{STORYTELLING_ACTS.length}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Pinned Stage Footer */}
        <div className="relative z-10 max-w-[1600px] w-full mx-auto px-4 sm:px-8 lg:px-12 pb-6 pt-4 border-t border-[var(--color-border-hairline)] flex items-center justify-between text-xs text-ash-300">
          <span className="font-extended text-[10px] tracking-[0.2em] uppercase">
            ACTIVE CHAMBER: {STORYTELLING_ACTS[activeIndex]?.actCode}
          </span>
          <span className="tabular-nums-data text-xs text-ash-500">
            SCROLL TO TRAVERSE SOUNDSTAGE
          </span>
        </div>
      </div>
    </section>
  );
}

