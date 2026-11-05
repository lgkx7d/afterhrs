'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

type CursorMode = 'DEFAULT' | 'EXPLORE' | 'DISTORT' | 'VIEW' | 'MAGNETIC' | 'AUDIO';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const [mode, setMode] = useState<CursorMode>('DEFAULT');
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || prefersReduced) {
      setEnabled(false);
      return;
    }
    setEnabled(true);

    const ring = cursorRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const xToRing = gsap.quickTo(ring, 'x', { duration: 0.32, ease: 'power3.out' });
    const yToRing = gsap.quickTo(ring, 'y', { duration: 0.32, ease: 'power3.out' });
    const xToDot = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' });
    const yToDot = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' });

    const onPointerMove = (e: PointerEvent) => {
      xToRing(e.clientX);
      yToRing(e.clientY);
      xToDot(e.clientX);
      yToDot(e.clientY);

      const target = e.target as HTMLElement | null;
      const cursorCarrier = target?.closest?.('[data-cursor]') as HTMLElement | null;
      if (cursorCarrier) {
        const nextMode = (cursorCarrier.getAttribute('data-cursor') as CursorMode) || 'EXPLORE';
        setMode(nextMode);
      } else if (target?.closest?.('a, button, input, select, textarea, [role="button"]')) {
        setMode('MAGNETIC');
      } else {
        setMode('DEFAULT');
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [enabled]);

  if (!enabled) return null;

  const isExpanded = mode !== 'DEFAULT';

  return (
    <div className="pointer-events-none fixed inset-0 z-[120] overflow-hidden hidden lg:block" aria-hidden="true">
      {/* Precision Center Reticle Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-scarlet-400 mix-blend-screen"
      />

      {/* Contextual Brutalist Frame Cursor */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-[width,height,background-color,border-color] duration-200 ${
          isExpanded
            ? 'w-20 h-20 bg-scarlet-500/20 border border-scarlet-400 backdrop-blur-[2px]'
            : 'w-9 h-9 bg-transparent border border-scarlet-500/55'
        }`}
      >
        {isExpanded && (
          <span className="font-extended text-[8px] font-bold tracking-[0.2em] text-bone-100 uppercase">
            {mode}
          </span>
        )}
      </div>
    </div>
  );
}

