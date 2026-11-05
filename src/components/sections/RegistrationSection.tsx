'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  BellRinging,
  CheckCircle,
  Crown,
  InstagramLogo,
  Lightning,
  UsersThree,
  WarningOctagon,
} from '@phosphor-icons/react';
import { EVENT_CONFIG } from '@/config/event';
import { soundEngine } from '@/lib/sound';
import { MagneticElement } from '@/components/motion/MagneticElement';

type PassIntentId =
  | 'EARLY_BIRD_GEN_1299'
  | 'EARLY_BIRD_VIP_1699'
  | 'EARLY_BIRD_6PAX_GEN_7200';

interface RegistrationPayload {
  fullName: string;
  email: string;
  instagram: string;
  intent: PassIntentId;
  referenceCode: string;
  timestamp: string;
}

interface PassCardSpec {
  id: PassIntentId;
  name: string;
  price: string;
  subPrice: string;
  badge: string;
  featured: boolean;
  perks: string[];
  ctaLabel: string;
}

const PASS_CARDS: PassCardSpec[] = [
  {
    id: 'EARLY_BIRD_GEN_1299',
    name: 'GEN',
    price: '₹1,299',
    subPrice: 'EARLY BIRD // SINGLE ENTRY',
    badge: 'WAVE 01 // FLOOR',
    featured: false,
    perks: [
      '01 // FULL SOUNDSTAGE FLOOR ACCESS',
      '02 // 360° IMMERSIVE AUDIOVISUAL RIG',
      '03 // GENERAL BAR & SANCTUARY ENTRY',
    ],
    ctaLabel: 'SELECT GEN PASS',
  },
  {
    id: 'EARLY_BIRD_VIP_1699',
    name: 'VIP',
    price: '₹1,699',
    subPrice: 'EARLY BIRD // PRIORITY ELEVATED ACCESS',
    badge: 'APEX TIER // MOST COVETED',
    featured: true,
    perks: [
      '01 // PRIORITY FAST-TRACK VENUE ENTRY',
      '02 // ELEVATED VIP DECK & STAGE SIGHTLINES',
      '03 // DEDICATED VIP BAR & PRIVATE LOUNGE',
      '04 // COMMEMORATIVE AFTERHRS ACCESS WRISTBAND',
    ],
    ctaLabel: 'LOCK VIP PASS // ₹1,699',
  },
  {
    id: 'EARLY_BIRD_6PAX_GEN_7200',
    name: '6 PAX (GEN)',
    price: '₹7,200',
    subPrice: 'EARLY BIRD // ₹1,200 PER PERSON',
    badge: 'WAVE 01 // CREW PACK',
    featured: false,
    perks: [
      '01 // COLLECTIVE ENTRY FOR 6 GUESTS',
      '02 // FULL SOUNDSTAGE FLOOR ACCESS',
      '03 // UNIFIED GROUP PASS & FAST CHECK-IN',
    ],
    ctaLabel: 'SELECT 6 PAX PASS',
  },
];

export function RegistrationSection() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const [intent, setIntent] = useState<PassIntentId>('EARLY_BIRD_VIP_1699');
  const [submittedRecord, setSubmittedRecord] = useState<RegistrationPayload | null>(null);
  const [formErrorSummary, setFormErrorSummary] = useState<string | null>(null);

  // Synchronize programmatic aria-invalid with visual :user-invalid
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const dirtyState = new WeakMap<HTMLElement, { hasInteracted: boolean; hasBlurred: boolean }>();
    const supportsUserInvalid =
      typeof CSS !== 'undefined' && CSS.supports && CSS.supports('selector(:user-invalid)');

    const syncFieldState = (input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
      const isUserInvalid = supportsUserInvalid
        ? input.matches(':user-invalid')
        : !input.checkValidity();

      if (!supportsUserInvalid) {
        input.classList.toggle('user-invalid-fallback', !input.checkValidity());
        input.classList.toggle('user-valid-fallback', input.checkValidity());
      }

      if (isUserInvalid) {
        input.setAttribute('aria-invalid', 'true');
      } else {
        input.removeAttribute('aria-invalid');
      }
    };

    const handleBlur = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target || !target.matches?.('input, select, textarea')) return;
      const input = target as HTMLInputElement;
      const state = dirtyState.get(input) || { hasInteracted: false, hasBlurred: false };
      state.hasBlurred = true;
      dirtyState.set(input, state);
      if (state.hasInteracted || supportsUserInvalid) {
        syncFieldState(input);
      }
    };

    const handleInput = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target || !target.matches?.('input, select, textarea')) return;
      const input = target as HTMLInputElement;
      const state = dirtyState.get(input) || { hasInteracted: false, hasBlurred: false };
      state.hasInteracted = true;
      dirtyState.set(input, state);
      if (input.getAttribute('aria-invalid') === 'true' || state.hasBlurred) {
        syncFieldState(input);
      }
    };

    form.addEventListener('blur', handleBlur, true);
    form.addEventListener('input', handleInput, true);

    return () => {
      form.removeEventListener('blur', handleBlur, true);
      form.removeEventListener('input', handleInput, true);
    };
  }, [submittedRecord]);

  const handleSelectCard = (cardId: PassIntentId) => {
    soundEngine.playHoverTick(240);
    setIntent(cardId);
    terminalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      const elements = Array.from(form.elements) as HTMLElement[];
      let firstInvalid: HTMLElement | null = null;
      for (const el of elements) {
        if ('checkValidity' in el && typeof (el as HTMLInputElement).checkValidity === 'function') {
          const input = el as HTMLInputElement;
          if (!input.checkValidity()) {
            input.classList.add('user-invalid-fallback');
            input.setAttribute('aria-invalid', 'true');
            if (!firstInvalid) firstInvalid = input;
          }
        }
      }
      setFormErrorSummary('Please complete all required fields in valid format before locking your pass reservation.');
      firstInvalid?.focus();
      return;
    }

    setFormErrorSummary(null);
    const data = new FormData(form);
    const fullName = String(data.get('fullName') || '').trim();
    const email = String(data.get('email') || '').trim();
    const instagram = String(data.get('instagram') || '').trim();

    const refHash = `AH-HYD-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Date.now()
      .toString()
      .slice(-4)}`;

    const record: RegistrationPayload = {
      fullName,
      email,
      instagram: instagram ? (instagram.startsWith('@') ? instagram : `@${instagram}`) : 'UNSPECIFIED',
      intent,
      referenceCode: refHash,
      timestamp: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem('afterhrs_rsvp_registry') || '[]');
      localStorage.setItem('afterhrs_rsvp_registry', JSON.stringify([record, ...existing]));
    } catch {
      // ignore storage quota errors
    }

    soundEngine.playHoverTick(310);
    setSubmittedRecord(record);
  };

  const activePass = PASS_CARDS.find((c) => c.id === intent) || PASS_CARDS[1];

  return (
    <section
      id="register"
      className="relative w-full bg-void-950 py-24 sm:py-32 px-4 sm:px-8 lg:px-12 border-b border-[var(--color-border-hairline)] overflow-hidden"
    >
      {/* Intense Atmospheric Crimson Aura Behind Center VIP Monolith */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 34%, rgba(230, 0, 0, 0.26) 0%, rgba(138, 0, 10, 0.12) 38%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1600px] mx-auto">
        {/* Section Header (Heading leads first; no kicker above heading) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-14 border-b border-[var(--color-border-hairline)]">
          <div>
            <h2
              className="font-display font-black uppercase text-bone-100 tracking-[-0.03em] leading-[0.88]"
              style={{ fontSize: 'clamp(2.6rem, 6vw, 4.75rem)' }}
            >
              EARLY BIRD <span className="text-scarlet-500">PASSES.</span>
            </h2>
            <p className="mt-4 font-sans text-base sm:text-lg text-ash-300 max-w-[60ch] leading-relaxed">
              Select your pass tier below. First-wave Early Bird allocation is strictly limited—once locked, reserve your pass in the dispatch terminal.
            </p>
          </div>

          <div className="flex items-center gap-3 px-4 py-2.5 bg-void-900 border border-scarlet-500/60">
            <span className="w-2 h-2 bg-scarlet-500 pulse-signal" />
            <span className="font-extended text-[10px] font-bold tracking-[0.22em] text-bone-100 uppercase">
              WAVE 01 // EARLY BIRD LIVE
            </span>
          </div>
        </div>

        {/* 3-Card Podium Showcase: Left (GEN) Smaller // Center (VIP) Big Dominant Monolith // Right (6 PAX) Smaller */}
        <div className="mt-14 lg:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {PASS_CARDS.map((card) => {
            const isSelected = intent === card.id;
            const isVip = card.featured;

            return (
              <div
                key={card.id}
                onClick={() => handleSelectCard(card.id)}
                onMouseEnter={() => soundEngine.playHoverTick(isVip ? 260 : 200)}
                className={`group relative cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                  isVip
                    ? 'lg:col-span-4 lg:-my-6 z-20 bg-void-900 border-2 border-scarlet-500 p-8 sm:p-10 lg:p-12 shadow-[0_0_85px_-12px_rgba(230,0,0,0.58)]'
                    : 'lg:col-span-4 lg:scale-[0.94] z-10 bg-void-950/95 border border-scarlet-500/40 hover:border-scarlet-500 p-7 sm:p-8 lg:p-9 shadow-[0_0_40px_-15px_rgba(230,0,0,0.22)] hover:shadow-[0_0_55px_-10px_rgba(230,0,0,0.42)]'
                } ${
                  isSelected && !isVip ? 'border-scarlet-400 bg-void-900/90' : ''
                }`}
              >
                {/* Top Crimson Aura Bar on Center VIP Monolith */}
                {isVip && (
                  <div className="mb-8 -mx-8 -mt-8 sm:-mx-10 sm:-mt-10 lg:-mx-12 lg:-mt-12 px-8 py-3 bg-scarlet-500 text-void-950 flex items-center justify-between">
                    <span className="font-extended text-[10px] font-extrabold tracking-[0.24em] uppercase">
                      {card.badge}
                    </span>
                    <Crown size={18} weight="fill" aria-hidden="true" />
                  </div>
                )}

                <div>
                  {/* Card Tier Title Leads First */}
                  <div className="flex items-start justify-between gap-4">
                    <h3
                      className={`font-display font-black uppercase tracking-[-0.03em] leading-[0.88] ${
                        isVip
                          ? 'text-5xl sm:text-6xl text-bone-100'
                          : 'text-4xl sm:text-5xl text-bone-100'
                      }`}
                    >
                      {card.name}
                    </h3>

                    {!isVip && (
                      <span className="px-2.5 py-1 bg-crimson-950 border border-scarlet-500/40 font-extended text-[9px] font-bold tracking-[0.2em] text-scarlet-400 uppercase">
                        {card.badge}
                      </span>
                    )}
                  </div>

                  <p className="mt-2 font-extended text-[10px] font-bold tracking-[0.2em] text-scarlet-400 uppercase">
                    {card.subPrice}
                  </p>

                  {/* Massive Price Display */}
                  <div className="mt-6 pb-6 border-b border-[var(--color-border-hairline)] flex items-baseline justify-between">
                    <span
                      className={`tabular-nums-data font-extrabold tracking-tight ${
                        isVip
                          ? 'text-5xl sm:text-6xl text-bone-100'
                          : 'text-4xl sm:text-5xl text-bone-100'
                      }`}
                    >
                      {card.price}
                    </span>
                    <span className="font-extended text-[10px] font-bold tracking-[0.18em] text-ash-300 uppercase">
                      {isSelected ? 'ACTIVE SELECTION' : 'EARLY BIRD'}
                    </span>
                  </div>

                  {/* Architectural Spec Perks */}
                  <ul className="mt-6 space-y-3.5">
                    {card.perks.map((perk) => (
                      <li
                        key={perk}
                        className="flex items-center gap-3 font-sans text-xs sm:text-sm text-ash-300"
                      >
                        <span
                          className={`w-1.5 h-1.5 shrink-0 ${
                            isVip ? 'bg-scarlet-400' : 'bg-scarlet-500/70'
                          }`}
                        />
                        <span className={isVip ? 'text-bone-100 font-medium' : ''}>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Button */}
                <div className="mt-9 pt-5 border-t border-[var(--color-border-hairline)]">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectCard(card.id);
                    }}
                    className={`w-full py-4 px-6 font-extended text-xs font-extrabold tracking-[0.22em] uppercase inline-flex items-center justify-between transition-colors cursor-pointer ${
                      isVip
                        ? 'bg-scarlet-500 text-void-950 hover:bg-bone-100 shadow-crimson'
                        : isSelected
                        ? 'bg-bone-100 text-void-950'
                        : 'bg-void-900 border border-scarlet-500/60 text-bone-100 group-hover:bg-scarlet-500 group-hover:text-void-950'
                    }`}
                  >
                    <span>{isSelected ? `SELECTED // ${card.name}` : card.ctaLabel}</span>
                    {isVip ? (
                      <Lightning size={17} weight="fill" aria-hidden="true" />
                    ) : card.id === 'EARLY_BIRD_6PAX_GEN_7200' ? (
                      <UsersThree size={17} weight="bold" aria-hidden="true" />
                    ) : (
                      <ArrowUpRight size={17} weight="bold" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Unified Pass Reservation & Official Dispatch Terminal */}
        <div
          ref={terminalRef}
          className="mt-16 lg:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-12 border-t border-[var(--color-border-hairline)]"
        >
          {/* Left Column: Selected Pass Summary & Direct Instagram Booking Channel */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="border border-scarlet-500/60 bg-void-900/95 p-6 sm:p-8 shadow-crimson">
              <div className="flex items-center justify-between gap-4 pb-5 border-b border-[var(--color-border-hairline)]">
                <h3 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-[-0.02em] text-bone-100">
                  LOCKED TIER: <span className="text-scarlet-500">{activePass.name}</span>
                </h3>
                <span className="tabular-nums-data text-2xl sm:text-3xl font-extrabold text-bone-100">
                  {activePass.price}
                </span>
              </div>

              <p className="mt-4 font-sans text-sm text-ash-300 leading-relaxed">
                {activePass.subPrice}. Complete the reservation dispatch on the right or message our official Instagram channel directly to finalize your Early Bird pass.
              </p>

              <div className="mt-6 pt-5 border-t border-[var(--color-border-hairline)]">
                <a
                  href={EVENT_CONFIG.bookingDestination}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => soundEngine.playHoverTick(230)}
                  className="w-full py-3.5 px-5 bg-void-950 border border-scarlet-500/60 text-bone-100 font-extended text-xs font-extrabold tracking-[0.2em] uppercase inline-flex items-center justify-between hover:bg-scarlet-500 hover:text-void-950 transition-colors"
                >
                  <span className="inline-flex items-center gap-2">
                    <InstagramLogo size={18} weight="bold" aria-hidden="true" />
                    <span>DM {EVENT_CONFIG.instagramHandle} FOR INSTANT PASSES</span>
                  </span>
                  <ArrowUpRight size={17} weight="bold" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Reservation Dispatch Form */}
          <div className="lg:col-span-7 border border-scarlet-500/60 bg-void-900/95 p-6 sm:p-10 shadow-crimson">
            {!submittedRecord ? (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate={false}
                className="flex flex-col gap-6"
              >
                <div className="pb-5 border-b border-[var(--color-border-hairline)] flex flex-wrap items-center justify-between gap-4">
                  <h3 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-[-0.02em] text-bone-100">
                    PASS RESERVATION DISPATCH
                  </h3>
                  <span className="px-3 py-1 bg-scarlet-500 text-void-950 font-extended text-[10px] font-extrabold tracking-[0.2em] uppercase">
                    {activePass.name} // {activePass.price}
                  </span>
                </div>

                {formErrorSummary && (
                  <div
                    role="alert"
                    aria-live="polite"
                    className="p-4 bg-crimson-950 border border-ember-400 text-bone-100 flex items-center gap-3 text-sm"
                  >
                    <WarningOctagon size={20} weight="bold" className="text-ember-400 shrink-0" aria-hidden="true" />
                    <span>{formErrorSummary}</span>
                  </div>
                )}

                {/* Quick Tier Switcher */}
                <div className="grid grid-cols-3 gap-2.5" role="radiogroup" aria-label="Selected pass tier">
                  {PASS_CARDS.map((opt) => {
                    const active = intent === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => {
                          soundEngine.playHoverTick(205);
                          setIntent(opt.id);
                        }}
                        className={`py-3 px-3 font-extended text-[10px] font-bold tracking-[0.16em] uppercase border text-center transition-colors cursor-pointer ${
                          active
                            ? 'bg-scarlet-500 border-scarlet-500 text-void-950'
                            : 'bg-void-950 border-[var(--color-border-hairline)] text-ash-300 hover:border-scarlet-400 hover:text-bone-100'
                        }`}
                      >
                        {opt.name} · {opt.price}
                      </button>
                    );
                  })}
                </div>

                {/* Full Name + Email in clean 2-col layout on desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col">
                    <label
                      htmlFor="afterhrs-fullname"
                      className="font-extended text-xs font-bold tracking-[0.2em] text-bone-100 uppercase"
                    >
                      FULL NAME *
                    </label>
                    <span id="fullname-hint" className="font-sans text-xs text-ash-300 mt-1 mb-2">
                      Government ID name (2–60 chars).
                    </span>
                    <input
                      id="afterhrs-fullname"
                      name="fullName"
                      type="text"
                      required
                      minLength={2}
                      maxLength={60}
                      autoComplete="name"
                      placeholder="E.G. AARAV REDDY"
                      aria-describedby="fullname-hint"
                      aria-errormessage="fullname-error"
                      className="afterhrs-input h-12 px-4 font-sans text-sm sm:text-base"
                    />
                    <div id="fullname-error" className="field-error-msg" role="alert">
                      <WarningOctagon size={16} weight="bold" aria-hidden="true" />
                      <span>Enter your full name (min 2 chars).</span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="afterhrs-email"
                      className="font-extended text-xs font-bold tracking-[0.2em] text-bone-100 uppercase"
                    >
                      EMAIL ADDRESS *
                    </label>
                    <span id="email-hint" className="font-sans text-xs text-ash-300 mt-1 mb-2">
                      For pass link & venue coordinates.
                    </span>
                    <input
                      id="afterhrs-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="YOU@DOMAIN.COM"
                      aria-describedby="email-hint"
                      aria-errormessage="email-error"
                      className="afterhrs-input h-12 px-4 font-sans text-sm sm:text-base"
                    />
                    <div id="email-error" className="field-error-msg" role="alert">
                      <WarningOctagon size={16} weight="bold" aria-hidden="true" />
                      <span>Enter a valid email address.</span>
                    </div>
                  </div>
                </div>

                {/* Instagram Handle */}
                <div className="flex flex-col">
                  <label
                    htmlFor="afterhrs-ig"
                    className="font-extended text-xs font-bold tracking-[0.2em] text-bone-100 uppercase"
                  >
                    INSTAGRAM HANDLE (OPTIONAL)
                  </label>
                  <span id="ig-hint" className="font-sans text-xs text-ash-300 mt-1 mb-2">
                    For @afterhrs_prod guestlist verification.
                  </span>
                  <input
                    id="afterhrs-ig"
                    name="instagram"
                    type="text"
                    maxLength={40}
                    autoComplete="username"
                    placeholder="@YOURHANDLE"
                    aria-describedby="ig-hint"
                    className="afterhrs-input h-12 px-4 font-sans text-sm sm:text-base"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <MagneticElement strength={0.2} className="w-full sm:w-auto">
                    <button
                      type="submit"
                      onMouseEnter={() => soundEngine.playHoverTick(255)}
                      className="w-full sm:w-auto px-8 py-4 bg-scarlet-500 text-void-950 font-extended text-xs font-extrabold tracking-[0.22em] uppercase inline-flex items-center justify-center gap-3 hover:bg-bone-100 transition-colors cursor-pointer shadow-crimson"
                    >
                      <BellRinging size={18} weight="bold" aria-hidden="true" />
                      <span>RESERVE {activePass.name} PASS ({activePass.price})</span>
                    </button>
                  </MagneticElement>

                  <span className="font-sans text-xs text-ash-300">
                    Locks Early Bird tier on the dispatch list.
                  </span>
                </div>
              </form>
            ) : (
              <div className="flex flex-col justify-between gap-8" role="status" aria-live="polite">
                <div className="pb-6 border-b border-[var(--color-border-hairline)] flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle size={28} weight="fill" className="text-scarlet-400" aria-hidden="true" />
                    <h3 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-[-0.02em] text-bone-100">
                      PASS RESERVATION LOGGED
                    </h3>
                  </div>
                </div>

                <p className="font-sans text-base text-ash-300 leading-relaxed max-w-[62ch]">
                  Your Early Bird pass reservation has been logged for Hyderabad. Connect via our official Instagram channel below with your Dispatch ID to complete verification with <strong className="text-bone-100">@afterhrs_prod</strong>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border border-[var(--color-border-hairline)] bg-void-950 p-6">
                  <div>
                    <span className="font-extended text-[10px] font-bold tracking-[0.2em] text-ash-500 uppercase block">
                      REGISTERED NAME
                    </span>
                    <span className="font-sans text-base font-bold text-bone-100 mt-1 block">
                      {submittedRecord.fullName}
                    </span>
                  </div>
                  <div>
                    <span className="font-extended text-[10px] font-bold tracking-[0.2em] text-ash-500 uppercase block">
                      DISPATCH EMAIL
                    </span>
                    <span className="font-sans text-base font-bold text-bone-100 mt-1 block">
                      {submittedRecord.email}
                    </span>
                  </div>
                  <div>
                    <span className="font-extended text-[10px] font-bold tracking-[0.2em] text-ash-500 uppercase block">
                      PASS TIER
                    </span>
                    <span className="font-extended text-xs font-bold text-scarlet-400 mt-1 block">
                      {activePass.name} ({activePass.price})
                    </span>
                  </div>
                  <div>
                    <span className="font-extended text-[10px] font-bold tracking-[0.2em] text-ash-500 uppercase block">
                      DISPATCH LOG ID
                    </span>
                    <span className="tabular-nums-data text-sm font-bold text-bone-200 mt-1 block">
                      {submittedRecord.referenceCode}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <a
                    href={EVENT_CONFIG.bookingDestination}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-4 bg-scarlet-500 text-void-950 font-extended text-xs font-extrabold tracking-[0.2em] uppercase inline-flex items-center gap-3 hover:bg-bone-100 transition-colors"
                  >
                    <span>VERIFY ON INSTAGRAM ({EVENT_CONFIG.instagramHandle})</span>
                    <ArrowUpRight size={17} weight="bold" aria-hidden="true" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setSubmittedRecord(null)}
                    className="px-5 py-4 bg-void-950 border border-[var(--color-border-hairline)] text-ash-300 hover:text-bone-100 font-extended text-[10px] font-bold tracking-[0.2em] uppercase cursor-pointer"
                  >
                    CHANGE PASS TIER
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
