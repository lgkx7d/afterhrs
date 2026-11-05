# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack
Next.js (App Router), React, TypeScript, Tailwind CSS, GSAP + ScrollTrigger, Lenis, Framer Motion, Three.js / React Three Fiber / Drei, Custom GLSL Shaders (explicitly specified in project brief).

## Users
Nightlife seekers, electronic/underground culture enthusiasts, artists, creative community members, and event attendees in Hyderabad and across India discovering AFTERHRS PRODUCTIONS and registering for upcoming underground/experimental immersive events.

## Product Purpose
An immersive, cinematic digital experience and event announcement/registration portal for AFTERHRS PRODUCTIONS, a Hyderabad-based event production brand. Success means visitors immediately associate AFTERHRS with an extraordinary, uncompromising event experience, explore the entire interactive narrative, and register their interest or book tickets for upcoming productions.

## Positioning
Unlike conventional ticketing listings or generic nightclub templates, AFTERHRS PRODUCTIONS treats the web portal itself as the first act of the production — an underground, rebellious, experimental, cinematic WebGL and scroll-choreographed environment that builds anticipation and exclusivity before event details are even unveiled.

## Operating Context
Visited primarily on mobile devices (via Instagram links from `@afterhrs_prod`) and desktop/laptop screens, often in low-light evening/night environments. Visitors transition from social discovery to immersive exploration, inspecting the upcoming transmission/event, viewing the editorial archive, and completing registration/RSVP.

## Capabilities and Constraints
- Central configurable event data store (`src/config/event.ts`) supporting both "COMING SOON" transmission states and live confirmed event states (with animated countdown, venue, lineup, age restrictions, and booking destination).
- Interactive 4-phase cinematic intro sequence with skip option and `prefers-reduced-motion` support.
- WebGL / GLSL custom shader distortion, liquid/warped AFTERHRS brand typography faithful to the official Instagram branding, interactive red illumination, and cursor-reactive depth.
- Scrollytelling sequences, editorial visual archive/gallery using authentic supplied brand assets and non-fabricated transmission placeholders, and a validated registration/RSVP flow.
- Optional non-autoplaying procedural Web Audio ambient soundscape & interaction synth toggle.
- Must not invent fake event names, dates, venues, lineups, ticket prices, or fabricated crowd/performer photos.

## Brand Commitments
- Brand Name: AFTERHRS PRODUCTIONS
- Instagram: `https://www.instagram.com/afterhrs_prod/`
- Brand Personality: Underground, Rebellious, Experimental, Premium, Energetic, Unpredictable, Cinematic.
- Primary Palette: Aggressive blood red (`#E60000` / `#FF1100`), deep crimson (`#7A0000`), pitch black (`#050505`), burnt orange (`#D94E0F`) as subtle secondary, and warm off-white (`#F5EFE6` / `#FFF8DC`) for high-contrast typography.
- Brand Mark: Preserve the authentic warped/arched heavy condensed black `AFTERHRS` wordmark with blood-red outer glow and wide-tracked glowing `PRODUCTIONS` subtitle from the supplied Instagram assets.

## Evidence on Hand
- Official Instagram brand captures supplied by the user:
  - `/Users/pendemjr/.gemini/antigravity/brain/07e15dcd-fa3f-448c-848f-8e20feab5ef3/.user_uploaded/media_1793728088849_f368901f.jpg` (3-panel pinned Instagram banner showing the warped black-on-red AFTERHRS letterforms)
  - `/Users/pendemjr/.gemini/antigravity/brain/07e15dcd-fa3f-448c-848f-8e20feab5ef3/.user_uploaded/media_1793728101947_3761a67f.jpg` (Official AFTERHRS PRODUCTIONS square emblem on distressed crimson/burnt-orange vertical streak canvas)
- Event specifics (title, date, time, venue, ticket price, crowd photography) are deliberately unconfirmed at this stage and must be represented via honest, configurable "COMING SOON / TRANSMISSION PENDING" states without fabrication.

## Product Principles
1. Every interaction and motion sequence serves atmosphere, anticipation, and narrative progression rather than decoration.
2. Authentic brand fidelity: honor the raw, warped, blood-red and pitch-black visual signature of AFTERHRS without diluting it into SaaS cards or generic neon templates.
3. Uncompromising performance and accessibility: 60fps compositor/WebGL choreography paired with complete `prefers-reduced-motion`, keyboard navigation, and mobile responsiveness.
4. Zero fabrication: distinguish confirmed brand artifacts from unannounced event parameters through a centralized configuration architecture.

## Accessibility & Inclusion
- Full support for `prefers-reduced-motion: reduce` (bypassing intensive intro/shader motion automatically and providing an immediate skip button).
- WCAG AA contrast ratios on all editorial, informational, and form controls; synchronized `:user-invalid` and `aria-invalid` form validation; full keyboard focus visibility.

