---
name: AFTERHRS PRODUCTIONS
description: Underground Crimson Soundstage & Signal Transmission Architecture
colors:
  arterial-scarlet: "#E60000"
  laser-red: "#FF1F1F"
  deep-crimson: "#8A000A"
  safelight-shadow: "#4A0006"
  thermal-ember: "#D94E0F"
  molten-amber: "#FF6B2B"
  luminous-cream: "#FFF5B8"
  pitch-void: "#050505"
  obsidian-stage: "#0A0607"
  smoked-charcoal: "#13090B"
  bone-white: "#F5EFE6"
  crimson-ash: "#D4BDBC"
  muted-oxide: "#A88B89"
  signal-valid: "#22C55E"
typography:
  display:
    fontFamily: "'Big Shoulders Display', sans-serif"
    fontSize: "5.75rem"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: "-0.03em"
  display-colossal:
    fontFamily: "'Big Shoulders Display', sans-serif"
    fontSize: "5.5rem"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "'Big Shoulders Display', sans-serif"
    fontSize: "4.75rem"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.03em"
  headline-md:
    fontFamily: "'Big Shoulders Display', sans-serif"
    fontSize: "4.25rem"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.03em"
  headline-sm:
    fontFamily: "'Big Shoulders Display', sans-serif"
    fontSize: "3.4rem"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "-0.02em"
  display-min:
    fontFamily: "'Big Shoulders Display', sans-serif"
    fontSize: "3.1rem"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: "-0.03em"
  headline-min-lg:
    fontFamily: "'Big Shoulders Display', sans-serif"
    fontSize: "2.8rem"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: "-0.03em"
  headline-min:
    fontFamily: "'Big Shoulders Display', sans-serif"
    fontSize: "2.6rem"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.03em"
  headline-compact:
    fontFamily: "'Big Shoulders Display', sans-serif"
    fontSize: "2.4rem"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.03em"
  subheadline:
    fontFamily: "'Big Shoulders Display', sans-serif"
    fontSize: "2rem"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "-0.02em"
  title:
    fontFamily: "'Unbounded', sans-serif"
    fontSize: "1.25rem"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "0.22em"
  body:
    fontFamily: "'Bricolage Grotesque', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "-0.01em"
  body-sm:
    fontFamily: "'Bricolage Grotesque', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.01em"
  label:
    fontFamily: "'Unbounded', sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.2em"
  label-sm:
    fontFamily: "'Unbounded', sans-serif"
    fontSize: "11px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.2em"
  label-xs:
    fontFamily: "'Unbounded', sans-serif"
    fontSize: "10px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.2em"
  label-micro:
    fontFamily: "'Unbounded', sans-serif"
    fontSize: "9px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.2em"
  mono:
    fontFamily: "'JetBrains Mono', monospace"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.06em"
rounded:
  none: "0px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "48px"
  2xl: "64px"
  3xl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.arterial-scarlet}"
    textColor: "{colors.pitch-void}"
    rounded: "{rounded.none}"
    padding: "16px 28px"
  button-primary-hover:
    backgroundColor: "{colors.bone-white}"
    textColor: "{colors.pitch-void}"
  button-secondary:
    backgroundColor: "{colors.obsidian-stage}"
    textColor: "{colors.bone-white}"
    rounded: "{rounded.none}"
    padding: "16px 24px"
---

# Design System: AFTERHRS PRODUCTIONS

## Overview

**Creative North Star: "The Nocturnal Red-Room Soundstage"**

AFTERHRS PRODUCTIONS rejects conventional event-marketing templates, SaaS card grids, and decorative neon gradients in favor of an architectural nocturnal soundstage drenched in arterial blood red (`#E60000`), deep crimson (`#8A000A`), burnt thermal orange (`#D94E0F`), and pitch black (`#050505`). Every surface behaves as part of a physical production environment—combining brutalist 1px structural hairlines, darkroom safelight plate development, and pointer-reactive WebGL distortion.

At the core of the system is the authentic AFTERHRS brand mark: heavy, condensed black letterforms warped along a concave arch envelope with a feathered blood-red halo and wide-tracked luminous cream `PRODUCTIONS` sub-lettering.

**Key Characteristics:**
- Full-commitment crimson and pitch-black palette with crimson-tinted secondary copy (never neutral gray).
- Zero-radius (`0px`) brutalist geometry anchored by exposed `1px` crimson hairlines.
- Self-hosted variable typography pairing ultra-condensed industrial display (`Big Shoulders Display`) with wide-tracked extended geometric headers (`Unbounded`) and crisp editorial body copy (`Bricolage Grotesque`).
- Unified Lenis + GSAP ScrollTrigger choreography and offscreen-paused React Three Fiber custom GLSL shaders.

## Colors

The palette operates between pitch-void darkness and drenched arterial scarlet, with secondary text tinted from the crimson spectrum so no neutral gray ever dulls the surface.

### Primary
- **Arterial Scarlet** (`#E60000`): Primary brand field, high-priority CTAs, active navigation indicators, and full-bleed manifesto sections.
- **Laser Red** (`#FF1F1F`): Focus rings, caret indicator, active reticle, and high-intensity rim lighting.
- **Deep Crimson** (`#8A000A`): Structural accents, scrollbar thumb, and volumetric shader midtones.
- **Safelight Shadow** (`#4A0006`): Darkroom exposure backgrounds and invalid field highlight base.

### Secondary
- **Thermal Ember** (`#D94E0F`): Subtle secondary accent inspired by the vertical light leak in the official AFTERHRS artwork.
- **Molten Amber** (`#FF6B2B`): Validation alerts and specular highlights.

### Tertiary
- **Luminous Cream** (`#FFF5B8`): Reserved for the glowing `P R O D U C T I O N S` lockup and verified dispatch badges.
- **Signal Valid** (`#22C55E`): Form field `:user-valid` border confirmation.

### Neutral
- **Pitch Void** (`#050505`): Primary page ground and text color on scarlet-drenched surfaces.
- **Obsidian Stage** (`#0A0607`): Elevated ledger cells and navigation bar background.
- **Smoked Charcoal** (`#13090B`): Form input ground and modal surfaces.
- **Bone White** (`#F5EFE6`): Primary display and editorial headline ink on dark surfaces.
- **Crimson Ash** (`#D4BDBC`): Secondary body copy tinted with warm crimson rather than neutral gray.
- **Muted Oxide** (`#A88B89`): Supporting metadata, coordinates, and input placeholders.

### Named Rules
**The Crimson-Tinted Neutral Rule.** Secondary and muted text on dark surfaces must be tinted from the crimson/bone spectrum (`#D4BDBC`, `#A88B89`), never neutral gray (`#888888` or `#9CA3AF`).
**The Drenched Inversion Rule.** At least one major narrative section commits to a full-bleed Arterial Scarlet (`#E60000`) ground with Pitch Void (`#050505`) typography, echoing the black-on-red AFTERHRS Instagram identity.

## Typography

**Display Font:** `Big Shoulders Display` (with `sans-serif` fallback)
**Extended Title Font:** `Unbounded` (with `sans-serif` fallback)
**Body Font:** `Bricolage Grotesque` (with `sans-serif` fallback)
**Label/Mono Font:** `JetBrains Mono` (strictly for tabular numerals, coordinates, and hashes)

**Character:** Monumental, compressed vertical tension contrasted against wide-tracked horizontal industrial plates.

### Hierarchy
- **Display** (`900`, `clamp(3.1rem, 7.2vw, 5.75rem)`, `line-height: 0.88`): Hero and closing footer statements.
- **Headline** (`900`, `clamp(2.4rem, 6vw, 4.75rem)`, `line-height: 0.9`): Primary section headings (`<h2>`), always leading their container with no kicker above.
- **Title** (`800`, `1.25rem`, `line-height: 1.15`, `letter-spacing: 0.22em`): Extended industrial act titles and ledger headers.
- **Body** (`400`, `1rem–1.125rem`, `line-height: 1.6`): Narrative prose constrained to `60ch–68ch`.
- **Label** (`700`, `0.75rem`, `letter-spacing: 0.2em`, uppercase): Navigation links, buttons, and status badges.

### Named Rules
**The No-Kicker Rule.** Headings (`<h1>`, `<h2>`, `<h3>`) always lead at the top of their container and speak for themselves; never place a small eyebrow or kicker label above a heading.
**The Honest Monospace Rule.** `JetBrains Mono` is used strictly for tabular numerals (`font-variant-numeric: tabular-nums`), live countdown digits, GPS coordinates, and cryptographic RSVP codes—never as a decorative costume for ordinary prose or buttons.

## Layout

The layout uses a `1600px` maximum architectural container divided into a 12-column CSS Grid with exposed `1px` crimson hairlines (`rgba(230, 0, 0, 0.26)`). Vertical section rhythm is generous (`96px–128px`), while data cells inside the Event Reveal ledger and Ethos columns share collapsed `1px` borders (`border-t border-l` on the parent, `border-r border-b` on each cell). On desktop (`>= 1024px`), the Experience section pins the viewport and scrolls horizontally across four soundstage chambers; on mobile and reduced-motion viewports, it linearizes into a vertical stack.

## Elevation & Depth

Depth is achieved through three mechanisms: WebGL shader lighting in the hero stage, tonal layering from Pitch Void (`#050505`) to Smoked Charcoal (`#13090B`), and soft-blurred offset shadows (`shadow-stage`, `shadow-crimson`). Hard zero-blur offset shadows (`4px 4px 0`) and zero-offset neon box halos are never used.

### Shadow Vocabulary
- **Stage Elevation** (`box-shadow: 0 24px 60px -12px rgba(0, 0, 0, 0.92)`): Primary archive plates, horizontal act chambers, and curtain cards.
- **Crimson Ignition** (`box-shadow: 0 18px 44px -10px rgba(138, 0, 10, 0.55)`): Primary CTAs, registration terminal, and full-screen lightbox plates.

## Shapes

Every surface, button, input, dialog, and photographic plate uses strict `0px` square corners (`border-radius: 0px`). Organic curvature belongs exclusively to the warped `AFTERHRS` SVG arch baseline and the 3D liquid torus-knot monolith.

## Components

### Buttons
- **Shape:** Sharp architectural rectangle (`0px` radius).
- **Primary:** Arterial Scarlet (`#E60000`) background, Pitch Void (`#050505`) text in `Unbounded` `800` uppercase (`0.22em` tracking), `16px 28px` padding.
- **Hover / Focus:** Transitions to Bone White (`#F5EFE6`) background with magnetic spring attraction on fine pointers and a `2px` Laser Red (`#FF1F1F`) focus ring at `3px` offset.
- **Secondary:** Obsidian Stage (`#0A0607`) background with `1px solid rgba(230, 0, 0, 0.6)` border and Bone White text.

### Cards / Containers
- **Corner Style:** `0px` radius.
- **Background:** Obsidian Stage (`#0A0607`) or Pitch Void (`#050505`).
- **Shadow Strategy:** `0 24px 60px -12px rgba(0, 0, 0, 0.92)`.
- **Border:** `1px solid rgba(230, 0, 0, 0.26)` shifting to `#E60000` on hover.
- **Internal Padding:** `24px` to `40px`.

### Inputs / Fields
- **Style:** `1px solid rgba(230, 0, 0, 0.38)` over Smoked Charcoal (`rgba(19, 9, 11, 0.92)`), `0px` radius, `48px` height, with format hints placed *above* the input.
- **Focus:** Border shifts to `#FF1F1F` with `0 14px 32px -8px rgba(230, 0, 0, 0.28)` shadow.
- **Error / Valid:** Deferred validation via `:user-invalid` (`#FF6B2B` border + inline error alert) and `:user-valid` (`#22C55E` border) synchronized with `aria-invalid`.

### Navigation
- **Style:** Fixed `64px–80px` top architectural bar with `backdrop-filter: blur(12px)`, `2px` live scroll progress laser bar at the bottom edge, explicit opt-in Web Audio sound toggle (`SOUND [OFF / ON]`), and a full-screen clip-path stage curtain.

### Warped AFTERHRS Wordmark (`AfterhrsWordmark`)
- **Description:** SVG + `<feTurbulence>` / `<feDisplacementMap>` liquid-distorted brand lockup preserving the concave arch envelope, blood-red outer halo, and luminous cream `PRODUCTIONS` subtitle.

## Do's and Don'ts

### Do:
- **Do** preserve the authentic warped `AFTERHRS` letterforms and official Instagram plates (`/brand/afterhrs-*.jpg`).
- **Do** start every heading (`<h1>`, `<h2>`, `<h3>`) at the top of its block without an eyebrow or kicker above it.
- **Do** keep unconfirmed event details as explicit `COMING SOON` placeholders governed by `src/config/event.ts`.
- **Do** pause heavy WebGL rendering when offscreen and respect `prefers-reduced-motion: reduce`.

### Don't:
- **Don't** invent fake event dates, venues, lineups, ticket prices, or stock crowd photography.
- **Don't** use rounded SaaS cards (`border-radius > 0`), gradient text, or neutral gray secondary text.
- **Don't** autoplay audio under any circumstance; sound must be explicitly toggled by the visitor.
