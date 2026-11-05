# Animation & Motion Engines Library

## 1. Unified Lenis + GSAP ScrollTrigger Loop
```ts
const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
lenis.on('scroll', ScrollTrigger.update);
const update = (time: number) => lenis.raf(time * 1000);
gsap.ticker.add(update);
gsap.ticker.lagSmoothing(0);
```

## 2. React Three Fiber + Custom GLSL Shaders
- Vertex displacement + volumetric crimson FBM (Fractional Brownian Motion) smoke shader.
- Relativistic pointer-velocity light bending around the central 3D torus-knot monolith.
- Automatic `IntersectionObserver` pausing (`frameloop={isVisible ? 'always' : 'never'}`) to preserve 60fps scroll performance when below the fold.

## 3. Framer Motion UI Choreography
- Full-screen navigation curtain with staggered link reveals.
- Layout-animated gallery lightbox inspection modal.
- Animated tabular-numeral flip transitions for the live event countdown.

