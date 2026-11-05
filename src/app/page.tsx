'use client';

import React from 'react';
import { CinematicIntro } from '@/components/sections/CinematicIntro';
import GlowCursor from '@/components/motion/GlowCursor';
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

      {/* React Bits WebGL2 Fluid Comet GlowCursor */}
      <div className="fixed inset-0 w-screen h-screen pointer-events-none z-[85]">
        <GlowCursor
          color="#f10505"
          secondaryColor="#f10505"
          intensity={1.3}
          trailWidth={3}
          linger={1.4}
          glow={0.8}
          hotspot={0.8}
          followSpeed={0.6}
          grain={0}
          quality="high"
          clickBurst={true}
          theme="dark"
          enabled={true}
        />
      </div>

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

