'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  BellRinging,
  CheckCircle,
  InstagramLogo,
  WarningOctagon,
} from '@phosphor-icons/react';
import { EVENT_CONFIG } from '@/config/event';
import { soundEngine } from '@/lib/sound';
import { MagneticElement } from '@/components/motion/MagneticElement';

interface RegistrationPayload {
  fullName: string;
  email: string;
  instagram: string;
  intent: 'EARLY_BIRD_GEN_1299' | 'EARLY_BIRD_VIP_1699' | 'EARLY_BIRD_6PAX_GEN_7200';
  referenceCode: string;
  timestamp: string;
}

export function RegistrationSection() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [intent, setIntent] = useState<RegistrationPayload['intent']>('EARLY_BIRD_GEN_1299');
  const [submittedRecord, setSubmittedRecord] = useState<RegistrationPayload | null>(null);
  const [formErrorSummary, setFormErrorSummary] = useState<string | null>(null);

  // Synchronize programmatic aria-invalid with visual :user-invalid (per modern-web-guidance)
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      // Mark all invalid controls with aria-invalid="true" and focus the first invalid control
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
      setFormErrorSummary('Please complete all required transmission fields in valid format before locking registration.');
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

  return (
    <section
      id="register"
      className="relative w-full bg-void-950 py-24 sm:py-32 px-4 sm:px-8 lg:px-12 border-b border-[var(--color-border-hairline)] overflow-hidden"
    >
      {/* Subtle Crimson Radial Glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 20% 80%, rgba(230, 0, 0, 0.18) 0%, rgba(74, 0, 6, 0.1) 42%, transparent 72%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Editorial Dispatch & Direct Official Destination (Heading leads first; no kicker above heading) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-10">
          <div>
            <h2
              className="font-display font-black uppercase text-bone-100 tracking-[-0.03em] leading-[0.9]"
              style={{ fontSize: 'clamp(2.6rem, 6vw, 4.75rem)' }}
            >
              REGISTER <span className="text-scarlet-500">INTEREST.</span>
            </h2>

            <p className="mt-5 font-sans text-base sm:text-lg text-ash-300 max-w-[60ch] leading-relaxed">
              Lock your coordinates on the AFTERHRS priority dispatch list. When the upcoming Hyderabad event date, secret venue, and ticket wave go live, registered contacts receive the first transmission.
            </p>
          </div>

          {/* Direct Booking / Official Destination Block */}
          <div className="border border-scarlet-500/50 bg-void-900/90 p-6 sm:p-8 shadow-stage">
            <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-[-0.02em] text-bone-100">
              OFFICIAL DISPATCH & BOOKING CHANNEL
            </h3>
            <p className="mt-3 font-sans text-sm text-ash-300 leading-relaxed">
              {EVENT_CONFIG.isConfirmed
                ? 'Official ticket wave is active. Proceed directly to our verified booking destination.'
                : 'Ticketing has not opened yet. Never trust third-party resellers—all official announcements and ticket drops originate from @afterhrs_prod.'}
            </p>

            <div className="mt-6 pt-5 border-t border-[var(--color-border-hairline)] flex flex-col sm:flex-row gap-3">
              <a
                href={EVENT_CONFIG.bookingDestination}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundEngine.playHoverTick(230)}
                className="w-full py-3.5 px-5 bg-scarlet-500 text-void-950 font-extended text-xs font-extrabold tracking-[0.2em] uppercase inline-flex items-center justify-between hover:bg-bone-100 transition-colors"
              >
                <span className="inline-flex items-center gap-2">
                  <InstagramLogo size={18} weight="bold" aria-hidden="true" />
                  <span>{EVENT_CONFIG.instagramHandle}</span>
                </span>
                <ArrowUpRight size={17} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Registration Terminal Form or Confirmation Ledger */}
        <div className="lg:col-span-7 border border-scarlet-500/60 bg-void-900/95 p-6 sm:p-10 lg:p-12 shadow-crimson">
          {!submittedRecord ? (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate={false}
              className="flex flex-col gap-7"
            >
              <div className="pb-6 border-b border-[var(--color-border-hairline)] flex flex-wrap items-center justify-between gap-4">
                <h3 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-[-0.02em] text-bone-100">
                  TRANSMISSION DISPATCH FORM
                </h3>
                <span className="font-extended text-[10px] font-bold tracking-[0.2em] text-scarlet-400 uppercase">
                  HYDERABAD // PRIORITY LIST
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

              {/* Pass Tier Selector */}
              <div>
                <span className="block font-extended text-xs font-bold tracking-[0.2em] text-bone-100 uppercase mb-3">
                  SELECT EARLY BIRD PASS TIER
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" role="radiogroup" aria-label="Early Bird pass tier">
                  {[
                    { id: 'EARLY_BIRD_GEN_1299', label: 'GEN // ₹1,299' },
                    { id: 'EARLY_BIRD_VIP_1699', label: 'VIP // ₹1,699' },
                    { id: 'EARLY_BIRD_6PAX_GEN_7200', label: '6 PAX (GEN) // ₹7,200' },
                  ].map((opt) => {
                    const active = intent === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => {
                          soundEngine.playHoverTick(205);
                          setIntent(opt.id as RegistrationPayload['intent']);
                        }}
                        className={`py-3.5 px-4 font-extended text-[10px] font-bold tracking-[0.18em] uppercase border text-left flex items-center justify-between transition-colors cursor-pointer ${
                          active
                            ? 'bg-scarlet-500 border-scarlet-500 text-void-950'
                            : 'bg-void-950 border-[var(--color-border-hairline)] text-ash-300 hover:border-scarlet-400 hover:text-bone-100'
                        }`}
                      >
                        <span>{opt.label}</span>
                        <span className={`w-2 h-2 ${active ? 'bg-void-950' : 'bg-scarlet-500/50'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Full Name Field (Hint placed ABOVE input per modern-web-guidance) */}
              <div className="flex flex-col">
                <label
                  htmlFor="afterhrs-fullname"
                  className="font-extended text-xs font-bold tracking-[0.2em] text-bone-100 uppercase"
                >
                  FULL NAME *
                </label>
                <span id="fullname-hint" className="font-sans text-xs text-ash-300 mt-1 mb-2">
                  Enter your full name as it appears on government ID (2–60 characters).
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
                  <span>Please enter your full name (minimum 2 characters).</span>
                </div>
              </div>

              {/* Email Address Field (Hint placed ABOVE input per modern-web-guidance) */}
              <div className="flex flex-col">
                <label
                  htmlFor="afterhrs-email"
                  className="font-extended text-xs font-bold tracking-[0.2em] text-bone-100 uppercase"
                >
                  EMAIL ADDRESS *
                </label>
                <span id="email-hint" className="font-sans text-xs text-ash-300 mt-1 mb-2">
                  Format: name@domain.com — used for first-wave ticket links and venue release.
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
                  <span>Please enter a valid email address (e.g. you@example.com).</span>
                </div>
              </div>

              {/* Instagram Handle (Optional) */}
              <div className="flex flex-col">
                <label
                  htmlFor="afterhrs-ig"
                  className="font-extended text-xs font-bold tracking-[0.2em] text-bone-100 uppercase"
                >
                  INSTAGRAM HANDLE (OPTIONAL)
                </label>
                <span id="ig-hint" className="font-sans text-xs text-ash-300 mt-1 mb-2">
                  Used for community guestlist verification alongside @afterhrs_prod.
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
                    className="w-full sm:w-auto px-8 py-4 bg-scarlet-500 text-void-950 font-extended text-xs font-extrabold tracking-[0.22em] uppercase inline-flex items-center justify-center gap-3 hover:bg-bone-100 transition-colors cursor-pointer"
                  >
                    <BellRinging size={18} weight="bold" aria-hidden="true" />
                    <span>REGISTER FOR TRANSMISSION</span>
                  </button>
                </MagneticElement>

                <span className="font-sans text-xs text-ash-300">
                  No payment required. Interest registration only.
                </span>
              </div>
            </form>
          ) : (
            /* Honest Confirmation State (Records Interest / Notification Request without simulating fake ticket purchase) */
            <div className="flex flex-col justify-between gap-8" role="status" aria-live="polite">
              <div className="pb-6 border-b border-[var(--color-border-hairline)] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle size={28} weight="fill" className="text-scarlet-400" aria-hidden="true" />
                  <h3 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-[-0.02em] text-bone-100">
                    INTEREST REGISTERED // STANDBY FOR SIGNAL
                  </h3>
                </div>
              </div>

              <p className="font-sans text-base text-ash-300 leading-relaxed max-w-[62ch]">
                Your interest has been logged locally for the upcoming AFTERHRS PRODUCTIONS transmission in Hyderabad. Please note: <strong className="text-bone-100">this is a notification registration, not a confirmed ticket booking</strong>. When the official date and ticketing link go live, connect via our official Instagram channel below.
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
                    PREFERENCE TIER
                  </span>
                  <span className="font-extended text-xs font-bold text-scarlet-400 mt-1 block">
                    {submittedRecord.intent.replace(/_/g, ' ')}
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
                  <span>CONNECT ON INSTAGRAM ({EVENT_CONFIG.instagramHandle})</span>
                  <ArrowUpRight size={17} weight="bold" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={() => setSubmittedRecord(null)}
                  className="px-5 py-4 bg-void-950 border border-[var(--color-border-hairline)] text-ash-300 hover:text-bone-100 font-extended text-[10px] font-bold tracking-[0.2em] uppercase cursor-pointer"
                >
                  UPDATE REGISTRATION
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

