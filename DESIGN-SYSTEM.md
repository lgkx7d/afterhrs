# DESIGN SYSTEM — AFTERHRS PRODUCTIONS

**Visual World:** Underground Crimson Soundstage & Signal Transmission Architecture  
**Location Identity:** Hyderabad, IN (`17.3850° N, 78.4867° E`)  
**Brand Reference:** `@afterhrs_prod` Official Instagram Visual Identity

---

## 01. Brand DNA & Aesthetic Direction

AFTERHRS PRODUCTIONS is an underground, rebellious, experimental, cinematic event production house based in Hyderabad. The digital experience rejects SaaS conventions (rounded cards, glassmorphic badges, purple/blue gradients, generic countdown boxes) in favor of an architectural nocturnal soundstage drenched in blood red, deep crimson, burnt thermal orange, and pitch black.

### Core Visual Pillars
1. **Authentic Brand Mark Preservation:** The heavy, warped, arched black `AFTERHRS` letterforms with a feathered blood-red halo (`#FF0000`) and wide-tracked glowing cream `P R O D U C T I O N S` subtitle are preserved both via authentic photographic plates (`/brand/afterhrs-logo-clean.jpg`, `/brand/afterhrs-panoramic-clean.jpg`) and a responsive SVG + displacement-shader vector system.
2. **Darkroom Safelight & Relativistic Horizon:** Surfaces emerge out of pitch black (`#050505`) through crimson safelight illumination (`#E60000`) and stepped chemical-exposure reveals.
3. **Brutalist Architectural Grid:** Exposed `1px` structural hairlines (`rgba(230, 0, 0, 0.22)`), zero border-radius (`0px`), stark asymmetric editorial columns, and full-bleed crimson manifesto inversions.

---

## 02. Three-Layer Color Token Architecture

### Layer 1: Primitive Tokens (`--primitive-*`)
```css
--primitive-void-950: #050505;      /* Pitch Black Void */
--primitive-void-900: #0A0708;      /* Warm Obsidian Stage */
--primitive-void-850: #12090B;      /* Smoked Charcoal Crimson */
--primitive-crimson-950: #2A0003;   /* Deep Clotted Blood */
--primitive-crimson-900: #4D0006;   /* Darkroom Safelight Shadow */
--primitive-crimson-700: #8A000A;   /* Deep Crimson */
--primitive-crimson-600: #C4000D;   /* Arterial Red */
--primitive-scarlet-500: #E60000;   /* Aggressive Blood Red (Primary Brand) */
--primitive-scarlet-400: #FF1A1A;   /* High-Intensity Laser Red */
--primitive-ember-500: #D94E0F;     /* Burnt Orange Thermal Streak (Secondary) */
--primitive-ember-400: #FF6B2B;     /* Molten Amber Accent */
--primitive-bone-100: #F5EFE6;      /* High-Contrast Off-White */
--primitive-bone-200: #FFF5B8;      /* Warm Luminous Production Cream */
--primitive-ash-300: #C8B6B4;       /* Crimson-Tinted Secondary Copy (Never neutral gray) */
--primitive-ash-500: #8F7573;       /* Crimson-Tinted Muted Metadata */
--primitive-signal-valid: #22C55E;  /* Transmission Locked Green */
```

### Layer 2: Semantic Tokens (`--color-*`)
```css
--color-bg-primary: var(--primitive-void-950);
--color-bg-elevated: var(--primitive-void-900);
--color-bg-surface: var(--primitive-void-850);
--color-bg-crimson-drenched: var(--primitive-scarlet-500);
--color-text-primary: var(--primitive-bone-100);
--color-text-secondary: var(--primitive-ash-300);
--color-text-muted: var(--primitive-ash-500);
--color-text-on-crimson: var(--primitive-void-950);
--color-brand-red: var(--primitive-scarlet-500);
--color-brand-crimson: var(--primitive-crimson-700);
--color-brand-ember: var(--primitive-ember-500);
--color-brand-glow: var(--primitive-bone-200);
--color-border-hairline: rgba(230, 0, 0, 0.24);
--color-border-strong: rgba(230, 0, 0, 0.65);
```

### Layer 3: Component Tokens
```css
--nav-bg: rgba(5, 5, 5, 0.82);
--nav-border: var(--color-border-hairline);
--btn-primary-bg: var(--color-brand-red);
--btn-primary-fg: var(--primitive-void-950);
--btn-primary-hover-bg: var(--primitive-bone-100);
--input-bg: rgba(18, 9, 11, 0.9);
--input-border: rgba(230, 0, 0, 0.35);
--input-border-focus: var(--primitive-scarlet-400);
--input-border-invalid: var(--primitive-ember-400);
```

---

## 03. Typography System

All fonts are self-hosted variable `.woff2` assets in `/public/fonts/` with `font-display: swap`.

| Role | Font Family | CSS Variable | Weights | Tracking & Line-Height | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Brutalist Display** | `Big Shoulders Display` | `--font-display` | `800–900` | `-0.03em` / `0.88` | Massive section statements, kinetic marquees, monumental hero/footer headlines. |
| **Extended Industrial** | `Unbounded` | `--font-extended` | `600–800` | `0.22em–0.38em` / `1.1` | `P R O D U C T I O N S` lockup, act titles, structural transmission headers. |
| **Editorial Body** | `Bricolage Grotesque` | `--font-sans` | `400–600` | `-0.01em` / `1.6` | Narrative prose, event descriptions, manifesto copy (measure constrained to `60ch–72ch`). |
| **Technical Data / Numerals** | `JetBrains Mono` | `--font-mono` | `400–700` | `0.06em` / `1.4` | Live countdown numerals (`font-variant-numeric: tabular-nums`), GPS coordinates, frequencies, and RSVP serial codes. |

### Responsive Fluid Type Scale
- **Hero Monumental:** `clamp(3.25rem, 8.5vw, 5.85rem)` (`max <= 6rem` per craft floor)
- **Section Display (H2):** `clamp(2.5rem, 6vw, 4.75rem)`
- **Editorial Subhead (H3):** `clamp(1.35rem, 2.4vw, 2.15rem)`
- **Body Lead:** `clamp(1.05rem, 1.2vw, 1.25rem)`
- **Body Standard:** `1rem` (`16px`)
- **Technical Spec:** `0.8125rem` (`13px`)

---

## 04. Layout, Spacing & Browser Surfaces

- **Spacing Rhythm:** 8px base spatial unit (`8px`, `16px`, `24px`, `32px`, `48px`, `64px`, `96px`, `128px`), with generous vertical separation (`96px–144px`) between narrative acts and tight grouping (`12px–24px`) inside data clusters.
- **Zero-Radius Brutalism:** Every container, input, plate, and button uses `0px` border radius with chamfered or architectural `1px` hairlines.
- **Themed Browser Surfaces:**
  - `::selection`: Blood-red background (`#E60000`) with pitch-black text (`#050505`).
  - Scrollbar: `6px` obsidian track (`#050505`) with crimson thumb (`#8A000A` -> `#E60000` on hover).
  - Caret & Focus Ring: `caret-color: #FF1A1A` and `2px solid #FF1A1A` with `3px` offset on `:focus-visible`.

---

## 05. Motion & Interaction Choreography

1. **Unified Animation Loop:** Lenis smooth scrolling is driven by `gsap.ticker.add((time) => lenis.raf(time * 1000))` with `gsap.ticker.lagSmoothing(0)` so scroll position and GSAP ScrollTrigger pins never desynchronize.
2. **4-Phase Intro Sequence:** Blackout pulse → Warped AFTERHRS emergence with SVG displacement → Crimson smoke & thermal streak atmosphere → Viewport-expanding transition (with immediate `[ SKIP INTRO // ESC ]` and automatic bypass on `prefers-reduced-motion: reduce`).
3. **WebGL Performance Discipline:** The React Three Fiber canvas runs at capped `dpr={[1, 1.5]}`, uses an `IntersectionObserver` to set `frameloop="never"` when scrolled out of view, and degrades gracefully on low-power/reduced-motion devices.

