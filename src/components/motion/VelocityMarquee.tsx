'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface VelocityMarqueeProps {
  items: string[];
  inverted?: boolean;
}

export function VelocityMarquee({ items, inverted = false }: VelocityMarqueeProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tween = gsap.to(track, {
        xPercent: inverted ? 0 : -50,
        startAt: { xPercent: inverted ? -50 : 0 },
        duration: 24,
        ease: 'none',
        repeat: -1,
      });

      ScrollTrigger.create({
        trigger: track,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const velocity = Math.min(Math.abs(self.getVelocity()) / 700, 3.5);
          gsap.to(tween, {
            timeScale: 1 + velocity,
            duration: 0.25,
            overwrite: true,
          });
          gsap.to(track, {
            skewX: inverted ? velocity * 3.5 : -velocity * 3.5,
            duration: 0.25,
            overwrite: true,
          });
        },
      });

      return () => {
        tween.kill();
      };
    });

    return () => mm.revert();
  }, [inverted]);

  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div
      className={`w-full overflow-hidden border-y border-[var(--color-border-hairline)] py-3.5 select-none ${
        inverted ? 'bg-scarlet-500 text-void-950' : 'bg-void-900 text-bone-100'
      }`}
      aria-hidden="true"
    >
      <div ref={trackRef} className="flex w-max items-center gap-8 will-change-transform">
        {repeated.map((text, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span className="font-display text-2xl sm:text-4xl font-black uppercase tracking-[-0.02em]">
              {text}
            </span>
            <span
              className={`w-2.5 h-2.5 rotate-45 ${
                inverted ? 'bg-void-950' : 'bg-scarlet-500'
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

