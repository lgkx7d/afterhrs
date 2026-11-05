'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  AFTERHRS_LOGO_VIEWBOX,
  AFTERHRS_PRODUCTIONS_PATH,
  AFTERHRS_WORDMARK_PATH,
  AFTERHRS_WORDMARK_VIEWBOX,
} from '@/config/afterhrsLogoPath';

interface AfterhrsWordmarkProps {
  variant?: 'void-monolith' | 'crimson-plate' | 'navbar' | 'footer-colossal';
  showSubtitle?: boolean;
  interactive?: boolean;
  className?: string;
}

/**
 * Authentic AFTERHRS PRODUCTIONS Vector & Wavy Shader Lockup
 * Uses the exact pixel-traced contour paths from the official AFTERHRS logo
 * (11 closed contours for AFTERHRS, 16 closed contours for PRODUCTIONS)
 * paired with a continuous + pointer-reactive wavy displacement filter.
 */
export function AfterhrsWordmark({
  variant = 'void-monolith',
  showSubtitle = true,
  interactive = true,
  className,
}: AfterhrsWordmarkProps) {
  const uid = useId().replace(/:/g, '');
  const turbulenceRef = useRef<SVGFETurbulenceElement | null>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pointerBoostRef = useRef(0);
  const pointerPosRef = useRef({ x: 0, y: 0 });
  const [chromaOffset, setChromaOffset] = useState({ x: 0, y: 0 });

  // Continuous organic wavy undulation + pointer-reactive wave amplification
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || variant === 'navbar') return;

    let rafId = 0;
    let startTime = performance.now();

    const animateWave = (now: number) => {
      const elapsed = (now - startTime) * 0.001;
      // Smoothly decay pointer boost back toward baseline wave
      pointerBoostRef.current *= 0.94;

      if (turbulenceRef.current && displacementRef.current) {
        const freqX = 0.0065 + Math.sin(elapsed * 1.35) * 0.0022 + pointerBoostRef.current * 0.006;
        const freqY = 0.018 + Math.cos(elapsed * 1.05) * 0.0045 + pointerBoostRef.current * 0.012;
        const baseScale = variant === 'crimson-plate' ? 7.5 : 6.5;
        const waveScale =
          baseScale + Math.sin(elapsed * 2.1) * 2.4 + pointerBoostRef.current * 18.0;

        turbulenceRef.current.setAttribute(
          'baseFrequency',
          `${freqX.toFixed(4)} ${freqY.toFixed(4)}`
        );
        displacementRef.current.setAttribute('scale', waveScale.toFixed(2));
      }

      rafId = requestAnimationFrame(animateWave);
    };

    rafId = requestAnimationFrame(animateWave);
    return () => cancelAnimationFrame(rafId);
  }, [variant]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / Math.max(rect.width, 1) - 0.5;
    const ny = (e.clientY - rect.top) / Math.max(rect.height, 1) - 0.5;

    const velocity = Math.min(
      1.2,
      Math.hypot(nx - pointerPosRef.current.x, ny - pointerPosRef.current.y) * 8
    );
    pointerPosRef.current = { x: nx, y: ny };
    pointerBoostRef.current = Math.min(1.0, Math.max(pointerBoostRef.current, 0.45 + velocity));

    setChromaOffset({ x: nx * 10, y: ny * 6 });
  };

  const handlePointerLeave = () => {
    if (!interactive) return;
    setChromaOffset({ x: 0, y: 0 });
  };

  // Navbar compact brand lockup using the exact traced AFTERHRS vector paths
  if (variant === 'navbar') {
    return (
      <div className={cn('inline-flex items-center select-none', className)}>
        <svg
          viewBox={showSubtitle ? AFTERHRS_LOGO_VIEWBOX : AFTERHRS_WORDMARK_VIEWBOX}
          className="h-9 sm:h-11 w-auto overflow-visible"
          role="img"
          aria-label="AFTERHRS PRODUCTIONS"
        >
          <defs>
            <filter
              id={`nav-glow-${uid}`}
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
              colorInterpolationFilters="sRGB"
            >
              <feDropShadow
                dx="0"
                dy="0"
                stdDeviation="12"
                floodColor="#FF0000"
                floodOpacity="0.98"
              />
            </filter>
          </defs>
          <path
            d={AFTERHRS_WORDMARK_PATH}
            fillRule="evenodd"
            fill="#050505"
            stroke="#FF1A1A"
            strokeWidth="18"
            paintOrder="stroke fill"
            strokeLinejoin="round"
            filter={`url(#nav-glow-${uid})`}
          />
          {showSubtitle && (
            <path
              d={AFTERHRS_PRODUCTIONS_PATH}
              fillRule="evenodd"
              fill="#FFF5B8"
              stroke="#FF9900"
              strokeWidth="4"
              paintOrder="stroke fill"
            />
          )}
        </svg>
      </div>
    );
  }

  const isCrimsonPlate = variant === 'crimson-plate';

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      data-cursor={interactive ? 'DISTORT' : undefined}
      className={cn(
        'relative select-none w-full flex flex-col items-center justify-center',
        interactive && 'cursor-crosshair',
        className
      )}
    >
      <svg
        viewBox={showSubtitle ? AFTERHRS_LOGO_VIEWBOX : AFTERHRS_WORDMARK_VIEWBOX}
        className="w-full h-auto overflow-visible"
        role="img"
        aria-label="AFTERHRS PRODUCTIONS"
      >
        <defs>
          {/* Continuous & Interactive Wavy Distortion + Authentic Blood-Red Halo Filter */}
          <filter
            id={`afterhrs-wave-${uid}`}
            x="-18%"
            y="-22%"
            width="136%"
            height="144%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              ref={turbulenceRef}
              type="fractalNoise"
              baseFrequency="0.0065 0.018"
              numOctaves="2"
              seed="11"
              result="waveNoise"
            />
            <feDisplacementMap
              ref={displacementRef}
              in="SourceGraphic"
              in2="waveNoise"
              scale="7"
              xChannelSelector="R"
              yChannelSelector="G"
              result="wavyWordmark"
            />
            <feDropShadow
              in="wavyWordmark"
              dx="0"
              dy="0"
              stdDeviation="11"
              floodColor="#FF0000"
              floodOpacity="0.98"
              result="redGlowNear"
            />
            <feDropShadow
              in="redGlowNear"
              dx="0"
              dy="4"
              stdDeviation="22"
              floodColor="#E60000"
              floodOpacity="0.85"
              result="redGlowFar"
            />
          </filter>

          {/* Warm Luminous Glow for the Exact Traced P R O D U C T I O N S Subtitle */}
          <filter
            id={`productions-glow-${uid}`}
            x="-20%"
            y="-40%"
            width="140%"
            height="180%"
            colorInterpolationFilters="sRGB"
          >
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="7"
              floodColor="#FFB800"
              floodOpacity="0.9"
            />
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="16"
              floodColor="#E60000"
              floodOpacity="0.75"
            />
          </filter>
        </defs>

        {/* Secondary Chromatic Wave Ghost Layer on Pointer Movement */}
        {interactive && (
          <g
            style={{
              transform: `translate3d(${chromaOffset.x.toFixed(1)}px, ${chromaOffset.y.toFixed(1)}px, 0)`,
              transition: 'transform 0.12s ease-out',
            }}
            opacity="0.52"
          >
            <path
              d={AFTERHRS_WORDMARK_PATH}
              fillRule="evenodd"
              fill="none"
              stroke="#FF2200"
              strokeWidth="10"
              strokeLinejoin="round"
            />
          </g>
        )}

        {/* Primary Authentic Wavy AFTERHRS Vector Wordmark */}
        <g filter={`url(#afterhrs-wave-${uid})`}>
          <path
            d={AFTERHRS_WORDMARK_PATH}
            fillRule="evenodd"
            fill="#050505"
            stroke={isCrimsonPlate ? '#FF0500' : '#E60000'}
            strokeWidth={isCrimsonPlate ? '16' : '18'}
            paintOrder="stroke fill"
            strokeLinejoin="round"
          />
        </g>

        {/* Authentic Traced P R O D U C T I O N S Subtitle */}
        {showSubtitle && (
          <g filter={`url(#productions-glow-${uid})`}>
            <path
              d={AFTERHRS_PRODUCTIONS_PATH}
              fillRule="evenodd"
              fill="#FFF5B8"
              stroke="#FFD166"
              strokeWidth="2.5"
              paintOrder="stroke fill"
              strokeLinejoin="round"
            />
          </g>
        )}
      </svg>
    </div>
  );
}
