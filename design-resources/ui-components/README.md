# UI Components Resource Library

Curated architecture references and customization patterns from **shadcn/ui**, **Radix UI**, **Aceternity UI**, **Magic UI**, **React Bits**, **21st.dev**, **GodUI**, and **Animate UI** adapted for the **AFTERHRS PRODUCTIONS** brutalist darkroom aesthetic.

## Key Implementation Rules
- **Zero-Radius Brutalism:** All components override default `rounded-md` / `rounded-xl` utility classes with `rounded-none` (`0px`) and `1px` crimson hairlines (`border-[var(--color-border-hairline)]`).
- **Accessible Primitives:** Interactive modals and overlays use `@radix-ui/react-dialog` with focus trapping, `Escape` dismissal, and `aria-describedby` bindings.
- **No Generic Cards:** Information is presented in architectural spec ledgers, stepped exposure strips, and full-bleed editorial splits.

