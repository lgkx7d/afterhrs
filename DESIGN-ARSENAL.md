# DESIGN ARSENAL — AFTERHRS PRODUCTIONS

Complete inventory of researched UI/UX systems, animation engines, 3D/WebGL frameworks, typography foundries, creative graphics tools, inspiration archives, and agentic engineering skills evaluated and integrated into **AFTERHRS PRODUCTIONS**.

---

## 1. UI Components & Design Systems

| Resource | Official URL | Installation Command | Status | License | Stack Compatibility | Project Integration |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **shadcn/ui** | https://ui.shadcn.com/ | `npx shadcn@latest init` (Primitives via `@radix-ui/*`, `class-variance-authority`, `clsx`, `tailwind-merge`) | **Installed & Active** | MIT (Free / Open-Source) | Next.js App Router, React 18, TypeScript, Tailwind CSS | Core component architecture (`src/lib/utils.ts`, accessible dialog/modal primitives, custom brutalist button & form primitives without generic SaaS rounded cards). |
| **Radix UI** | https://www.radix-ui.com/ | `npm i @radix-ui/react-dialog @radix-ui/react-slot` | **Installed & Active** | MIT (Free / Open-Source) | React 18, Next.js SSR | Powers accessible keyboard-navigable full-screen Lightbox inspection modal and polymorphic trigger slots. |
| **Aceternity UI** | https://ui.aceternity.com/ | Copy-paste source / `npx shadcn@latest add` (Framer Motion + Tailwind) | **Source Patterns Integrated** | Free core components (MIT-style source) / Pro paid | Next.js, React, Tailwind CSS, Framer Motion | Adapted spotlight tracking and 3D perspective card tilt math into custom brutalist darkroom plates (`src/components/sections/EventGallery.tsx`). |
| **Magic UI** | https://magicui.design/ | Copy-paste source / `npx shadcn@latest add` | **Source Patterns Integrated** | MIT (Open-Source core) | Next.js, React, Tailwind CSS, Framer Motion | Adapted velocity-reactive infinite marquee architecture and border-beam signal indicators (`src/components/motion/VelocityMarquee.tsx`). |
| **React Bits** | https://reactbits.dev/ | Copy-paste source / CLI (`npx jsrepo`) | **Source Patterns Integrated** | MIT (Free / Open-Source) | React, TypeScript, Tailwind, GSAP / Framer Motion | Adapted magnetic cursor attraction, decrypted/scrambled transmission text reveal, and noise overlay patterns (`src/components/motion/MagneticElement.tsx`, `src/components/motion/ScrambleText.tsx`). |
| **21st.dev** | https://21st.dev/ | Component registry (`npx shadcn@latest add`) | **Evaluated / Reference** | Open registry (MIT/Apache per component) | React, Next.js, Tailwind CSS | Referenced for interactive editorial hero HUD layouts and minimal command-style registration controls. |
| **GodUI** | https://godui.design/ | Source reference patterns | **Evaluated / Reference** | Freemium / Reference | React, Tailwind CSS | Referenced for high-contrast dark-mode micro-interactions and tactile switches. |
| **Animate UI** | https://animate-ui.com/ | Copy-paste source (Motion + Tailwind) | **Source Patterns Integrated** | Open-Source (MIT) | React, Framer Motion, Tailwind CSS | Referenced for orchestrated staggered navigation curtain transitions. |

---

## 2. Animation & Motion Engineering

| Resource | Official URL | Installation Command | Status | License | Stack Compatibility | Project Integration |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **GSAP + ScrollTrigger** | https://gsap.com/ | `npm i gsap @gsap/react` | **Installed & Active** | Standard "No Charge" GSAP License (Free for commercial sites) | React 18, Next.js App Router, TypeScript | Primary choreography engine: 4-phase cinematic intro sequence, pinned horizontal 4-Act scrollytelling manifesto, velocity-skewed typography, and parallax depth layers. |
| **Motion (Framer Motion)** | https://motion.dev/ | `npm i framer-motion` | **Installed & Active** | MIT (Free / Open-Source) | React 18, Next.js | UI-level state transitions: Full-screen navigation curtain, gallery lightbox modal, live countdown digit flips, and registration state morphing. |
| **Lenis** | https://lenis.dev/ | `npm i lenis` | **Installed & Active** | MIT (Free / Open-Source) | Vanilla JS / React / Next.js | Smooth inertial scrolling (`src/components/motion/SmoothScrollProvider.tsx`) synchronized on a single loop with `gsap.ticker` and `ScrollTrigger.update` to prevent dual-RAF jitter. |
| **Three.js** | https://threejs.org/ | `npm i three @types/three` | **Installed & Active** | MIT (Free / Open-Source) | WebGL / Browser Canvas | Core 3D rendering engine for the hero crimson monolith, custom GLSL vertex/fragment shaders, and pointer-reactive lighting field. |
| **React Three Fiber (R3F)** | https://r3f.docs.pmnd.rs/ | `npm i @react-three/fiber` | **Installed & Active** | MIT (Free / Open-Source) | React 18, Three.js | Declarative React scene graph (`src/components/canvas/CrimsonSoundstageCanvas.tsx`), dynamically imported (`ssr: false`) and paused when offscreen via `IntersectionObserver`. |
| **Drei** | https://github.com/pmndrs/drei | `npm i @react-three/drei` | **Installed & Active** | MIT (Free / Open-Source) | React Three Fiber | Environment helpers, float physics, and responsive camera utilities inside the 3D hero stage. |
| **Rive** | https://rive.app/ | `npm i @rive-app/react-canvas` | **Evaluated (Omitted)** | MIT runtime / Freemium editor | React, Canvas/WebGL | Omitted to avoid bundling a second WASM runtime alongside Three.js; interactive vector state machines are handled natively via SVG filters + GSAP. |
| **Theatre.js** | https://www.theatrejs.com/ | `npm i @theatre/core @theatre/studio` | **Evaluated (Omitted)** | Apache-2.0 | Three.js, React | Omitted from production bundle to keep JS payload lean; camera and light keyframes are driven directly by GSAP timelines and pointer lerp in `useFrame`. |

---

## 3. Typography

| Resource | Official URL | Installation / Delivery | Status | License | Stack Compatibility | Project Integration |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Google Fonts (Self-Hosted WOFF2)** | https://fonts.google.com/ | Self-hosted variable `.woff2` in `/public/fonts/` via `@font-face` | **Installed & Active** | SIL Open Font License (OFL 1.1) — 100% Free Commercial | All modern browsers (`font-display: swap`) | **Big Shoulders Display** (Brutalist condensed display headlines), **Unbounded** (Wide-tracked `P R O D U C T I O N S` industrial extended caps), **Bricolage Grotesque** (Editorial body), **JetBrains Mono** (Technical coordinates, timestamps, live countdown digits). |
| **Fontshare** | https://www.fontshare.com/ | Self-hosted WOFF2 / CDN | **Researched & Documented** | ITF Free Font License (Commercial OK) | Web `@font-face` | Documented in `/design-resources/typography/` as approved fallback pairings (`Clash Display`, `Cabinet Grotesk`). |
| **Pangram Pangram** | https://pangrampangram.com/ | Trial / Paid Commercial License | **Researched (Not Installed — Commercial License Required)** | Free for personal testing only; paid for commercial | Web | Researched (`PP Neue Montreal`, `PP Right Gothic`) for editorial proportion benchmarks; replaced in production with OFL-licensed **Big Shoulders Display** + custom SVG warped **AFTERHRS** logotype to ensure 100% commercial license compliance. |
| **Velvetyne** | https://velvetyne.fr/ | Open-source libre foundry | **Researched & Documented** | SIL OFL 1.1 (Free Commercial) | Web | Referenced experimental brutalist type geometry and ink-trap distortion techniques for our custom SVG `<feTurbulence>` / `<feDisplacementMap>` AFTERHRS wordmark. |

---

## 4. Graphics, Shaders & Creative Tools

| Resource | Official URL | Installation Command | Status | License | Stack Compatibility | Project Integration |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Lucide Icons** | https://lucide.dev/ | `npm i lucide-react` | **Installed & Active** | ISC License (Free / Open-Source) | React, Next.js | Minimal technical glyphs (arrows, audio waveform indicators, close/fullscreen controls). |
| **Phosphor Icons** | https://phosphoricons.com/ | `npm i @phosphor-icons/react` | **Installed & Active** | MIT License (Free / Open-Source) | React, Next.js | Precision architectural & broadcast icons (`Broadcast`, `SpeakerHigh`, `SpeakerSlash`, `Compass`, `ArrowUpRight`, `SealCheck`). |
| **ShaderToy** | https://www.shadertoy.com/ | Custom GLSL Fragment/Vertex Shaders | **Integrated (Custom GLSL)** | Custom authored GLSL | Three.js `ShaderMaterial` | Custom volumetric crimson smoke, relativistic horizon distortion, and liquid chromatic aberration shaders in `src/components/canvas/CrimsonSoundstageCanvas.tsx`. |
| **Iconoir** | https://iconoir.com/ | `npm i iconoir-react` | **Evaluated (Omitted)** | MIT | React | Omitted to maintain single-stroke consistency with Phosphor + Lucide as required by UI quality standards. |
| **LottieFiles** | https://lottiefiles.com/ | `npm i lottie-web` | **Evaluated (Omitted)** | MIT player | Web | Omitted in favor of procedural SVG + WebGL animations with zero JSON asset overhead. |
| **Spline** | https://spline.design/ | `@splinetool/react-spline` | **Evaluated (Omitted)** | Freemium | React, WebGL | Omitted because raw React Three Fiber + custom GLSL shaders deliver superior 60fps performance without external `.splinecode` network waterfalls. |
| **Haikei** | https://haikei.app/ | Procedural SVG generation | **Integrated (Procedural SVG)** | Free | SVG / CSS | Procedural SVG noise and organic displacement filters (`<feTurbulence>`, `<feDisplacementMap>`) built directly into the DOM. |

---

## 5. Design Inspiration & Benchmarks

| Resource | Official URL | Role in Project |
| :--- | :--- | :--- |
| **Awwwards** | https://www.awwwards.com/ | Benchmarked SOTD scrollytelling choreography, custom cursor state machines, and non-percentage theatrical preloaders. |
| **Godly** | https://godly.website/ | Benchmarked kinetic typography transitions, pinned horizontal narrative chapters, and experimental dark-mode editorial grids. |
| **Minimal Gallery** | https://minimal.gallery/ | Benchmarked brutalist 1px structural hairlines, disciplined negative space, and high-contrast typographic hierarchy. |

---

## 6. Agent Skills & Engineering Governance

| Skill / Tool | Source / Path | Status & Application |
| :--- | :--- | :--- |
| **Impeccable Design Direction** | `/Users/pendemjr/.gemini/config/skills/impeccable/SKILL.md` | **Active** — Governed `PRODUCT.md`, `concept-seed` direction raises (`seed:1d9564e67c5a590f`), surface brief contract, and `craft-floor.md` verification. |
| **Modern Web Guidance** | `npx -y modern-web-guidance@latest` | **Active** — Applied `motion`, `validate-input-after-interaction` (`:user-invalid`), `accessible-error-announcement` (`aria-invalid` sync), and `optimize-image-priority` (`fetchpriority="high"`). |
| **UI/UX Pro Max** | `/Users/pendemjr/.gemini/config/skills/ui-ux-pro-max/SKILL.md` | **Active** — Generated brutalist high-variance (`9/10`), complex-motion (`9/10`), spacious (`3/10`) design parameters and GSAP pointer cleanup patterns. |
| **Design System Architecture** | `/Users/pendemjr/.gemini/config/skills/design-system/SKILL.md` | **Active** — Structured 3-layer CSS token hierarchy (Primitive → Semantic → Component) in `src/app/globals.css` and `DESIGN-SYSTEM.md`. |

