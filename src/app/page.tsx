'use client';

import React from 'react';
import { CinematicIntro } from '@/components/sections/CinematicIntro';
import { CustomCursor } from '@/components/motion/CustomCursor';
import { Navigation } from '@/components/layout/Navigation';
import { HeroExperience } from '@/components/sections/HeroExperience';
import { VelocityMarquee } from '@/components/motion/VelocityMarquee';
import { EventRevealSection } from '@/components/sections/EventRevealSection';
import { ScrollStorytellingSection } from '@/components/sections/ScrollStorytellingSection';
import { EventGallerySection } from '@/components/sections/EventGallerySection';
import { AboutSection } from '@/components/sections/AboutSection';
import { RegistrationSection } from '@/components/sections/RegistrationSection';
import { CinematicFooter } from '@/components/layout/CinematicFooter';

export default function AfterhrsHomePage() {
  return (
    <div className="relative min-h-[100dvh] w-full bg-void-950 text-bone-100 overflow-x-hidden">
      {/* Skip-to-content accessibility link */}
      <a
        href="#event"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[150] focus:px-5 focus:py-3 focus:bg-scarlet-500 focus:text-void-950 focus:font-extended focus:text-xs focus:font-bold"
      >
        SKIP TO EVENT TRANSMISSION
      </a>

      {/* Contextual Interactive Cursor */}
      <CustomCursor />

      {/* 04. Four-Phase Cinematic Intro Sequence (Non-blocking overlay with Skip & Reduced-Motion support) */}
      <CinematicIntro />

      {/* 13 & 14. Architectural Navigation Bar + Opt-In Procedural Soundstage Toggle */}
      <Navigation />

      <main>
        {/* 05. Main Hero Experience (3D WebGL Crimson Soundstage + Liquid Monolith + Warped AFTERHRS Wordmark) */}
        <HeroExperience />

        {/* Scroll-Velocity Kinetic Typography Marquee */}
        <VelocityMarquee
          items={[
            "THE NIGHT DOESN'T END HERE",
            'AFTERHRS PRODUCTIONS',
            'HYDERABAD UNDERGROUND',
            'AN EXPERIENCE IS COMING',
          ]}
          inverted={true}
        />

        {/* 06. Configurable Event Reveal & Live Numerical Countdown Console */}
        <EventRevealSection />

        {/* 07. Immersive Scroll Storytelling (Pinned 4-Act Horizontal Soundstage Sequence) */}
        <ScrollStorytellingSection />

        {/* Counter-Directional Brutalist Signal Marquee */}
        <VelocityMarquee
          items={[
            'BEYOND THE ORDINARY',
            'CRIMSON ARCHITECTURE',
            '360° IMMERSIVE SOUNDSTAGE',
            '@AFTERHRS_PROD',
          ]}
          inverted={false}
        />

        {/* 09. Asymmetric Editorial Visual Archive & Full-Screen Lightbox */}
        <EventGallerySection />

        {/* 10. About AFTERHRS (Full-Bleed Crimson Manifesto + Pitch-Black Ethos Columns) */}
        <AboutSection />

        {/* 11. Event Registration / Priority Dispatch Terminal */}
        <RegistrationSection />
      </main>

      {/* 12. Unconventional Cinematic Footer */}
      <CinematicFooter />
    </div>
  );
}

