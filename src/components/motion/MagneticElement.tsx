'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

interface MagneticElementProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export function MagneticElement({
  children,
  strength = 0.28,
  className,
}: MagneticElementProps) {
  const elRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference) and (pointer: fine)', () => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'elastic.out(1, 0.4)' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'elastic.out(1, 0.4)' });

      const onPointerMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width / 2) * strength;
        const dy = (e.clientY - r.top - r.height / 2) * strength;
        xTo(dx);
        yTo(dy);
      };

      const onPointerLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener('pointermove', onPointerMove);
      el.addEventListener('pointerleave', onPointerLeave);

      return () => {
        el.removeEventListener('pointermove', onPointerMove);
        el.removeEventListener('pointerleave', onPointerLeave);
        gsap.set(el, { x: 0, y: 0 });
      };
    });

    return () => mm.revert();
  }, [strength]);

  return (
    <div ref={elRef} className={cn('inline-block will-change-transform', className)}>
      {children}
    </div>
  );
}

