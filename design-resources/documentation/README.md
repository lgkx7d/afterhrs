# Technical Documentation & Standards

## Modern Web Guidance Applied
1. **`motion`**: Compositor-friendly `transform` and `opacity` transitions paired with case-by-case `@media (prefers-reduced-motion: reduce)` rules.
2. **`validate-input-after-interaction`**: CSS `:user-invalid` and `:user-valid` pseudo-classes with `.user-invalid-fallback` support and format hints positioned *above* inputs so mobile autocomplete popovers never obscure them.
3. **`accessible-error-announcement`**: Capture-phase `blur` and `input` listeners synchronizing `aria-invalid="true"` with `:user-invalid` and linking inline error messages via `aria-errormessage` and `aria-describedby`.
4. **`optimize-image-priority`**: `fetchpriority="high"` on the hero brand plate (without `loading="lazy"`), and `loading="lazy"` (without `fetchpriority="low"`) on below-the-fold gallery plates.

