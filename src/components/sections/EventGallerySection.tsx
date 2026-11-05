'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowsOutSimple,
  CaretLeft,
  CaretRight,
  FilmStrip,
  LockSimple,
  X,
} from '@phosphor-icons/react';
import { GALLERY_ARCHIVE, GalleryArchiveItem } from '@/config/event';
import { soundEngine } from '@/lib/sound';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ['ALL', 'BRAND ARTIFACT', 'TRIPTYCH SERIES', 'TRANSMISSION REEL'] as const;

export function EventGallerySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const filterId = useId().replace(/:/g, '');
  const [selectedCategory, setSelectedCategory] = useState<(typeof CATEGORIES)[number]>('ALL');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    selectedCategory === 'ALL'
      ? GALLERY_ARCHIVE
      : GALLERY_ARCHIVE.filter((item) => item.category === selectedCategory);

  const inspectableItems = GALLERY_ARCHIVE.filter((item) => item.imageSrc !== null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const plates = section.querySelectorAll('.archive-plate-card');
      gsap.fromTo(
        plates,
        { y: 36, opacity: 0.15 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.08,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
          },
        }
      );
    });

    return () => mm.revert();
  }, [selectedCategory]);

  // Keyboard navigation inside full-screen lightbox
  useEffect(() => {
    if (activeLightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setActiveLightboxIndex((prev) =>
          prev === null ? 0 : (prev + 1) % inspectableItems.length
        );
      } else if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex((prev) =>
          prev === null
            ? 0
            : (prev - 1 + inspectableItems.length) % inspectableItems.length
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeLightboxIndex, inspectableItems.length]);

  const handleOpenLightbox = (item: GalleryArchiveItem) => {
    if (!item.imageSrc) return;
    const idx = inspectableItems.findIndex((i) => i.id === item.id);
    if (idx !== -1) {
      soundEngine.playHoverTick(250);
      setActiveLightboxIndex(idx);
    }
  };

  const currentLightboxItem =
    activeLightboxIndex !== null ? inspectableItems[activeLightboxIndex] : null;

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative w-full bg-void-950 py-24 sm:py-32 px-4 sm:px-8 lg:px-12 border-b border-[var(--color-border-hairline)]"
    >
      {/* Shared SVG Displacement Filter for Hover Distortion */}
      <svg className="sr-only" aria-hidden="true">
        <defs>
          <filter id={`gallery-wave-${filterId}`}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015 0.04"
              numOctaves="2"
              result="warp"
            />
            <feDisplacementMap
              xChannelSelector="R"
              yChannelSelector="G"
              scale="10"
              in="SourceGraphic"
              in2="warp"
            />
          </filter>
        </defs>
      </svg>

      <div className="max-w-[1600px] mx-auto">
        {/* Editorial Section Header (Heading leads first; no kicker above heading) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[var(--color-border-hairline)]">
          <div>
            <h2
              className="font-display font-black uppercase text-bone-100 tracking-[-0.03em] leading-[0.9]"
              style={{ fontSize: 'clamp(2.6rem, 6vw, 4.75rem)' }}
            >
              EDITORIAL <span className="text-scarlet-500">VISUAL ARCHIVE.</span>
            </h2>
            <p className="mt-4 font-sans text-base sm:text-lg text-ash-300 max-w-[66ch] leading-relaxed">
              Verified AFTERHRS brand plates, triptych installations, and reserved live-event documentation vaults. Zero stock crowd photography—only authentic artifacts from the AFTERHRS archive.
            </p>
          </div>

          {/* Filter Bar */}
          <div
            role="tablist"
            aria-label="Filter visual archive"
            className="flex flex-wrap items-center gap-2"
          >
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    soundEngine.playHoverTick(200);
                    setSelectedCategory(category);
                  }}
                  className={`px-4 py-2.5 font-extended text-[10px] font-bold tracking-[0.2em] uppercase border transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-scarlet-500 border-scarlet-500 text-void-950'
                      : 'bg-void-900 border-[var(--color-border-hairline)] text-ash-300 hover:border-scarlet-400 hover:text-bone-100'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric Editorial Archive Composition */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {filteredItems.map((item) => {
            const hasImage = Boolean(item.imageSrc);
            return (
              <article
                key={item.id}
                onMouseEnter={() => soundEngine.playHoverTick(170)}
                data-cursor={hasImage ? 'VIEW' : 'EXPLORE'}
                className={`archive-plate-card ${item.colSpan} group border border-[var(--color-border-hairline)] hover:border-scarlet-500 bg-void-900/90 flex flex-col justify-between overflow-hidden shadow-stage transition-colors duration-300`}
              >
                {/* Visual Frame */}
                {hasImage ? (
                  <button
                    type="button"
                    onClick={() => handleOpenLightbox(item)}
                    aria-label={`Inspect ${item.title} in full-screen archive viewer`}
                    className="relative w-full overflow-hidden bg-void-950 text-left cursor-pointer block"
                  >
                    <div
                      className={`w-full overflow-hidden ${
                        item.aspect === 'panoramic'
                          ? 'h-64 sm:h-80 lg:h-96'
                          : item.aspect === 'square'
                          ? 'h-80 sm:h-[420px]'
                          : 'h-80 sm:h-[420px]'
                      }`}
                    >
                      <img
                        src={item.imageSrc!}
                        alt={item.alt}
                        width={item.width}
                        height={item.height}
                        loading="lazy"
                        className="w-full h-full object-cover safelight-plate group-hover:scale-[1.04] transition-transform duration-700"
                      />
                    </div>

                    {/* Hover Inspection Overlay */}
                    <div className="absolute top-4 right-4 px-3 py-1.5 bg-void-950/90 border border-scarlet-500/60 text-bone-100 font-extended text-[10px] font-bold tracking-[0.18em] uppercase inline-flex items-center gap-2 group-hover:bg-scarlet-500 group-hover:text-void-950 transition-colors">
                      <span>INSPECT PLATE</span>
                      <ArrowsOutSimple size={14} weight="bold" aria-hidden="true" />
                    </div>
                  </button>
                ) : (
                  /* Authentic Unfabricated Vault Placeholder for Upcoming Live Event Reels */
                  <div className="relative w-full h-72 sm:h-80 bg-void-950 border-b border-[var(--color-border-hairline)] p-8 flex flex-col items-start justify-between overflow-hidden">
                    <div
                      className="pointer-events-none absolute inset-0 opacity-25"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(45deg, rgba(230, 0, 0, 0.14) 0px, rgba(230, 0, 0, 0.14) 2px, transparent 2px, transparent 14px)',
                      }}
                    />
                    <div className="relative z-10 flex items-center gap-3 px-3.5 py-1.5 bg-crimson-950 border border-scarlet-500/50">
                      <LockSimple size={15} weight="bold" className="text-scarlet-400" aria-hidden="true" />
                      <span className="font-extended text-[10px] font-bold tracking-[0.2em] text-bone-100 uppercase">
                        COMING SOON // ZERO FABRICATION POLICY
                      </span>
                    </div>

                    <div className="relative z-10 my-auto">
                      <FilmStrip size={36} weight="duotone" className="text-scarlet-500 mb-3" aria-hidden="true" />
                      <p className="font-extended text-xs font-bold tracking-[0.2em] text-bone-100 uppercase">
                        AWAITING OFFICIAL EVENT CAPTURE
                      </p>
                      <p className="mt-2 font-sans text-xs sm:text-sm text-ash-300 max-w-[52ch]">
                        AFTERHRS never substitutes stock crowd or performer photography. This vault unlocks immediately following our Hyderabad transmission.
                      </p>
                    </div>
                  </div>
                )}

                {/* Caption & Metadata Footer (Heading leads first; no kicker above heading) */}
                <div className="p-6 sm:p-7 flex flex-col justify-between gap-4 bg-void-900">
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-[-0.02em] text-bone-100">
                      {item.title}
                    </h3>
                    <p className="mt-2 font-sans text-sm text-ash-300 leading-relaxed max-w-[64ch]">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--color-border-hairline)] flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-extended text-[10px] font-bold tracking-[0.18em] text-scarlet-400 uppercase">
                      {item.category}
                    </span>
                    <span className="tabular-nums-data text-xs text-ash-500">
                      {item.code} // {item.provenance}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Accessible Full-Screen Lightbox Viewer (@radix-ui/react-dialog) */}
      <Dialog.Root
        open={activeLightboxIndex !== null}
        onOpenChange={(open) => {
          if (!open) setActiveLightboxIndex(null);
        }}
      >
        <AnimatePresence>
          {currentLightboxItem && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="fixed inset-0 z-[90] bg-void-950/95 backdrop-blur-md"
                />
              </Dialog.Overlay>

              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="fixed inset-0 z-[95] flex flex-col justify-between p-4 sm:p-8 lg:p-12 overflow-y-auto focus:outline-none"
                >
                  {/* Top Bar */}
                  <div className="w-full max-w-[1500px] mx-auto flex items-center justify-between border-b border-[var(--color-border-hairline)] pb-4">
                    <div>
                      <Dialog.Title className="font-display text-2xl sm:text-4xl font-black uppercase text-bone-100 tracking-[-0.02em]">
                        {currentLightboxItem.title}
                      </Dialog.Title>
                      <Dialog.Description className="font-sans text-xs sm:text-sm text-ash-300 mt-1">
                        {currentLightboxItem.subtitle}
                      </Dialog.Description>
                    </div>

                    <Dialog.Close asChild>
                      <button
                        type="button"
                        aria-label="Close full-screen viewer"
                        className="px-4 py-2.5 bg-void-900 border border-scarlet-500 text-bone-100 hover:bg-scarlet-500 hover:text-void-950 font-extended text-[10px] font-bold tracking-[0.2em] uppercase inline-flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <span>CLOSE [ESC]</span>
                        <X size={16} weight="bold" aria-hidden="true" />
                      </button>
                    </Dialog.Close>
                  </div>

                  {/* Center Full-Screen Plate */}
                  <div className="my-auto py-6 flex items-center justify-center max-w-[1300px] w-full mx-auto">
                    <img
                      src={currentLightboxItem.imageSrc!}
                      alt={currentLightboxItem.alt}
                      width={currentLightboxItem.width}
                      height={currentLightboxItem.height}
                      className="max-h-[68vh] w-auto object-contain border border-scarlet-500/60 shadow-crimson"
                    />
                  </div>

                  {/* Bottom Lightbox Controls */}
                  <div className="w-full max-w-[1500px] mx-auto pt-4 border-t border-[var(--color-border-hairline)] flex items-center justify-between gap-4">
                    <span className="tabular-nums-data text-xs text-ash-300">
                      PLATE 0{(activeLightboxIndex ?? 0) + 1} / 0{inspectableItems.length} — {currentLightboxItem.code}
                    </span>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveLightboxIndex((prev) =>
                            prev === null
                              ? 0
                              : (prev - 1 + inspectableItems.length) % inspectableItems.length
                          )
                        }
                        aria-label="Previous plate"
                        className="px-4 py-2.5 bg-void-900 border border-[var(--color-border-hairline)] hover:border-scarlet-400 text-bone-100 font-extended text-[10px] font-bold tracking-[0.2em] uppercase inline-flex items-center gap-2 cursor-pointer"
                      >
                        <CaretLeft size={15} weight="bold" aria-hidden="true" />
                        <span>PREV</span>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveLightboxIndex((prev) =>
                            prev === null ? 0 : (prev + 1) % inspectableItems.length
                          )
                        }
                        aria-label="Next plate"
                        className="px-4 py-2.5 bg-scarlet-500 text-void-950 font-extended text-[10px] font-extrabold tracking-[0.2em] uppercase inline-flex items-center gap-2 hover:bg-bone-100 cursor-pointer"
                      >
                        <span>NEXT</span>
                        <CaretRight size={15} weight="bold" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </section>
  );
}

