'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp, ArrowUpRight, InstagramLogo } from '@phosphor-icons/react';
import { AfterhrsWordmark } from '@/components/ui/AfterhrsWordmark';
import { EVENT_CONFIG } from '@/config/event';
import { soundEngine } from '@/lib/sound';

gsap.registerPlugin(ScrollTrigger);

export function CinematicFooter() {
  const footerRef = useRef<HTMLElement | null>(null);
  const closingLineRef = useRef<HTMLHeadingElement | null>(null);
  const colossalWordmarkRef = useRef<HTMLDivElement | null>(null);
  const redHorizonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: 'top 80%',
          end: 'bottom bottom',
          scrub: 0.6,
        },
      });

      tl.fromTo(
        redHorizonRef.current,
        { opacity: 0.15, scaleY: 0.4 },
        { opacity: 1, scaleY: 1, ease: 'power2.out' },
        0
      )
        .fromTo(
          closingLineRef.current,
          { y: 36, opacity: 0.2 },
          { y: 0, opacity: 1, ease: 'power3.out' },
          0.1
        )
        .fromTo(
          colossalWordmarkRef.current,
          { scale: 0.9, y: 40, opacity: 0.25 },
          { scale: 1, y: 0, opacity: 1, ease: 'expo.out' },
          0.15
        );

      return () => {
        tl.kill();
      };
    });

    return () => mm.revert();
  }, []);

  const handleBackToTop = () => {
    soundEngine.playHoverTick(260);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-void-950 pt-24 pb-12 px-4 sm:px-8 lg:px-12 overflow-hidden select-none"
    >
      {/* Dynamic Red Floor Illumination */}
      <div
        ref={redHorizonRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[65%] origin-bottom"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(230, 0, 0, 0.44) 0%, rgba(138, 0, 10, 0.22) 45%, transparent 78%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1600px] mx-auto flex flex-col justify-between gap-16">
        {/* Top Closing Statement & Navigation Matrix (Heading leads first; no kicker above heading) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14 border-b border-[var(--color-border-hairline)] items-end">
          <div className="lg:col-span-7">
            <h2
              ref={closingLineRef}
              className="font-display font-black uppercase text-bone-100 tracking-[-0.03em] leading-[0.88]"
              style={{ fontSize: 'clamp(2.8rem, 6.6vw, 5.5rem)' }}
            >
              YOU HAVEN&apos;T SEEN THE <span className="text-scarlet-500">LAST OF US.</span>
            </h2>
            <p className="mt-5 font-sans text-base sm:text-lg text-ash-300 max-w-[60ch]">
              The curtain only falls for those watching from the outside. Stay locked to our official Hyderabad signal for upcoming transmissions, secret warehouse coordinates, and visual releases.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Direct Instagram Integration Box */}
            <div className="border border-scarlet-500/50 bg-void-900/90 p-6 flex flex-col justify-between gap-6">
              <div>
                <h3 className="font-extended text-xs font-extrabold tracking-[0.22em] text-scarlet-400 uppercase">
                  INSTAGRAM CHANNEL
                </h3>
                <p className="mt-2 font-sans text-sm text-ash-300">
                  Direct dispatches, lineup drops, and visual reels.
                </p>
              </div>
              <a
                href={EVENT_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundEngine.playHoverTick(230)}
                className="py-3 px-4 bg-scarlet-500 text-void-950 font-extended text-[10px] font-extrabold tracking-[0.2em] uppercase inline-flex items-center justify-between hover:bg-bone-100 transition-colors"
              >
                <span className="inline-flex items-center gap-2">
                  <InstagramLogo size={16} weight="bold" aria-hidden="true" />
                  <span>{EVENT_CONFIG.instagramHandle}</span>
                </span>
                <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
              </a>
            </div>

            {/* Directory & Return to Top */}
            <div className="border border-[var(--color-border-hairline)] bg-void-900/90 p-6 flex flex-col justify-between gap-6">
              <div>
                <h3 className="font-extended text-xs font-extrabold tracking-[0.22em] text-bone-100 uppercase">
                  PRODUCTION BASE
                </h3>
                <p className="mt-2 font-sans text-sm text-ash-300">
                  Hyderabad, Telangana, India
                </p>
                <span className="mt-1 block tabular-nums-data text-xs text-ash-500">
                  {EVENT_CONFIG.coordinates}
                </span>
              </div>

              <button
                type="button"
                onClick={handleBackToTop}
                className="py-3 px-4 bg-void-950 border border-scarlet-500/50 text-bone-100 hover:bg-scarlet-500 hover:text-void-950 font-extended text-[10px] font-bold tracking-[0.2em] uppercase inline-flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>RETURN TO TOP</span>
                <ArrowUp size={15} weight="bold" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Colossal Edge-to-Edge AFTERHRS Typography */}
        <div ref={colossalWordmarkRef} className="w-full max-w-4xl mx-auto py-2 will-change-transform">
          <AfterhrsWordmark
            variant="void-monolith"
            showSubtitle={true}
            interactive={true}
          />
        </div>

        {/* Bottom Legal & Navigation Strip */}
        <div className="pt-6 border-t border-[var(--color-border-hairline)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-ash-300">
          <div className="flex flex-wrap items-center gap-6">
            <a href="#home" className="hover:text-scarlet-400 uppercase font-extended text-[10px] tracking-[0.18em]">
              HOME
            </a>
            <a href="#event" className="hover:text-scarlet-400 uppercase font-extended text-[10px] tracking-[0.18em]">
              THE EVENT
            </a>
            <a href="#experience" className="hover:text-scarlet-400 uppercase font-extended text-[10px] tracking-[0.18em]">
              EXPERIENCE
            </a>
            <a href="#gallery" className="hover:text-scarlet-400 uppercase font-extended text-[10px] tracking-[0.18em]">
              GALLERY
            </a>
            <a href="#about" className="hover:text-scarlet-400 uppercase font-extended text-[10px] tracking-[0.18em]">
              ABOUT
            </a>
            <a href="#register" className="hover:text-scarlet-400 uppercase font-extended text-[10px] tracking-[0.18em]">
              REGISTER
            </a>
          </div>

          <span className="tabular-nums-data text-xs text-ash-500">
            © 2026 AFTERHRS PRODUCTIONS // ALL RIGHTS RESERVED
          </span>
        </div>
      </div>
    </footer>
  );
}

