export interface EventConfiguration {
  /** Set to true once official event date, venue, and ticketing are locked */
  isConfirmed: boolean;
  /** Event headline title (null displays COMING SOON placeholder) */
  title: string | null;
  /** Supporting event narrative */
  description: string;
  /** ISO 8601 date string for the live countdown once confirmed (e.g. '2026-12-19T22:00:00+05:30') */
  date: string | null;
  /** Human-readable date label when confirmed */
  dateFormatted: string | null;
  /** Doors / starting time */
  startTime: string | null;
  /** Confirmed venue name */
  venue: string | null;
  /** City and coordinates */
  location: string;
  coordinates: string;
  /** Production format / category */
  category: string;
  /** Entry age policy */
  ageRestriction: string | null;
  /** Tier / access structure */
  ticketInfo: string | null;
  /** Official external booking or social destination */
  bookingDestination: string;
  /** Official Instagram profile */
  instagramUrl: string;
  instagramHandle: string;
  /** Status badge copy */
  statusText: string;
}

/**
 * CENTRAL EVENT CONFIGURATION STORE
 * Edit this object to transition the portal from COMING SOON mode
 * into LIVE CONFIRMED COUNTDOWN & TICKETING mode.
 */
export const EVENT_CONFIG: EventConfiguration = {
  isConfirmed: false,
  title: null,
  description:
    'AFTERHRS PRODUCTIONS is engineering an uncompromising nocturnal environment in Hyderabad. High-output sound architecture, crimson spatial lighting, and raw underground energy designed to push past conventional nightlife.',
  date: null,
  dateFormatted: null,
  startTime: null,
  venue: null,
  location: 'HYDERABAD, IN',
  coordinates: '17.3850° N, 78.4867° E',
  category: 'IMMERSIVE AUDIOVISUAL PRODUCTION',
  ageRestriction: '21+ // GOVERNMENT ID REQUIRED AT ENTRY',
  ticketInfo: null,
  bookingDestination: 'https://www.instagram.com/afterhrs_prod/',
  instagramUrl: 'https://www.instagram.com/afterhrs_prod/',
  instagramHandle: '@afterhrs_prod',
  statusText: 'AN EXPERIENCE IS COMING.',
};

/**
 * Configurable preview preset used only when a visitor explicitly toggles
 * the "SIMULATE CONFIRMED COUNTDOWN" switch in the Event Reveal console
 * to inspect how the live numerical countdown operates once a date is announced.
 */
export const PREVIEW_COUNTDOWN_OFFSET_DAYS = 14;

export interface GalleryArchiveItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'BRAND ARTIFACT' | 'TRIPTYCH SERIES' | 'TRANSMISSION REEL';
  aspect: 'square' | 'panoramic' | 'portrait' | 'wide';
  colSpan: string;
  imageSrc: string | null;
  width: number;
  height: number;
  alt: string;
  code: string;
  provenance: string;
}

export const GALLERY_ARCHIVE: GalleryArchiveItem[] = [
  {
    id: 'artifact-emblem',
    title: 'AFTERHRS // PRIMARY INSIGNIA',
    subtitle: 'Distorted condensed black letterforms suspended in arterial crimson and thermal amber streaks.',
    category: 'BRAND ARTIFACT',
    aspect: 'square',
    colSpan: 'lg:col-span-7',
    imageSrc: '/brand/afterhrs-logo-clean.jpg',
    width: 980,
    height: 980,
    alt: 'AFTERHRS PRODUCTIONS official square logo artwork with warped black typography on crimson background',
    code: 'AH-ARC-001',
    provenance: 'Official @afterhrs_prod Instagram Brand Release',
  },
  {
    id: 'artifact-wordmark',
    title: 'WARPED SIGNAL LOCKUP',
    subtitle: 'Close-range optical study of the concave arch envelope and luminous cream PRODUCTIONS sub-baseline.',
    category: 'BRAND ARTIFACT',
    aspect: 'wide',
    colSpan: 'lg:col-span-5',
    imageSrc: '/brand/afterhrs-wordmark-plate.jpg',
    width: 980,
    height: 640,
    alt: 'AFTERHRS PRODUCTIONS cropped typographic lockup showing red outer glow and cream subtitle',
    code: 'AH-ARC-002',
    provenance: 'Official @afterhrs_prod Instagram Brand Release',
  },
  {
    id: 'artifact-panoramic',
    title: 'PINNED GRID MONOLITH // FULL SPAN',
    subtitle: 'Three-channel panoramic banner spanning the @afterhrs_prod grid architecture.',
    category: 'TRIPTYCH SERIES',
    aspect: 'panoramic',
    colSpan: 'lg:col-span-12',
    imageSrc: '/brand/afterhrs-panoramic-clean.jpg',
    width: 978,
    height: 430,
    alt: 'AFTERHRS panoramic three-column banner artwork in black and blood red',
    code: 'AH-ARC-003',
    provenance: 'Official @afterhrs_prod Pinned Grid Banner',
  },
  {
    id: 'triptych-01',
    title: 'SECTOR I // AF-TENSION',
    subtitle: 'Left-flank vertical shear from the three-part Instagram grid installation.',
    category: 'TRIPTYCH SERIES',
    aspect: 'portrait',
    colSpan: 'lg:col-span-4',
    imageSrc: '/brand/afterhrs-panel-01.jpg',
    width: 290,
    height: 394,
    alt: 'AFTERHRS triptych panel 1 showing the letters A and F in warped black ink on red',
    code: 'AH-TRP-01',
    provenance: 'Official @afterhrs_prod Grid Panel I',
  },
  {
    id: 'triptych-02',
    title: 'SECTOR II // TER-COMPRESSION',
    subtitle: 'Central apex compression where the letterforms arch upward against the scarlet field.',
    category: 'TRIPTYCH SERIES',
    aspect: 'portrait',
    colSpan: 'lg:col-span-4',
    imageSrc: '/brand/afterhrs-panel-02.jpg',
    width: 290,
    height: 394,
    alt: 'AFTERHRS triptych panel 2 showing the letters T, E, and R in warped black ink on red',
    code: 'AH-TRP-02',
    provenance: 'Official @afterhrs_prod Grid Panel II',
  },
  {
    id: 'triptych-03',
    title: 'SECTOR III // HRS-THERMAL',
    subtitle: 'Right-flank terminal forms crossed by vertical burnt-orange light leaks.',
    category: 'TRIPTYCH SERIES',
    aspect: 'portrait',
    colSpan: 'lg:col-span-4',
    imageSrc: '/brand/afterhrs-panel-03.jpg',
    width: 290,
    height: 394,
    alt: 'AFTERHRS triptych panel 3 showing the letters H, R, and S with vertical thermal orange light streak',
    code: 'AH-TRP-03',
    provenance: 'Official @afterhrs_prod Grid Panel III',
  },
  {
    id: 'transmission-pending-01',
    title: 'LIVE FLOOR DOCUMENTATION // LOCKED',
    subtitle: 'Reserved exclusively for verified photographs and motion reels captured at the inaugural AFTERHRS production. Zero stock or fabricated crowd imagery.',
    category: 'TRANSMISSION REEL',
    aspect: 'wide',
    colSpan: 'lg:col-span-6',
    imageSrc: null,
    width: 960,
    height: 540,
    alt: 'Placeholder vault slot for upcoming live event photography',
    code: 'AH-VLT-PENDING-A',
    provenance: 'Unannounced // Awaiting Live Event Capture',
  },
  {
    id: 'transmission-pending-02',
    title: 'SPATIAL RIG & SOUNDSTAGE STUDY // LOCKED',
    subtitle: 'Reserved for architectural lighting and custom stage fabrication documentation from Hyderabad transmission 001.',
    category: 'TRANSMISSION REEL',
    aspect: 'wide',
    colSpan: 'lg:col-span-6',
    imageSrc: null,
    width: 960,
    height: 540,
    alt: 'Placeholder vault slot for upcoming stage architecture documentation',
    code: 'AH-VLT-PENDING-B',
    provenance: 'Unannounced // Awaiting Live Event Capture',
  },
];

export interface StoryAct {
  actCode: string;
  title: string;
  headline: string;
  body: string;
  specLabel: string;
  specValue: string;
  imageSrc: string;
}

export const STORYTELLING_ACTS: StoryAct[] = [
  {
    actCode: 'ACT I // THRESHOLD',
    title: 'LEAVE THE DAYLIGHT AT THE DOOR.',
    headline: 'ORDINARY NIGHTLIFE REPEATS A SCRIPT. WE BURN THE PAGE.',
    body: 'Most events in the city are interchangeable rooms with predictable playlists. AFTERHRS begins where convention collapses—stripping away velvet-rope cliches to construct a raw, subterranean sanctuary in Hyderabad.',
    specLabel: 'ILLUMINATION SPECTRUM',
    specValue: '625NM — 740NM DEEP SCARLET',
    imageSrc: '/brand/afterhrs-panel-01.jpg',
  },
  {
    actCode: 'ACT II // ACOUSTIC MASS',
    title: 'SOUND YOU FEEL IN YOUR STERNUM.',
    headline: 'ENGINEERED FOR PHYSICAL PRESENCE, NOT BACKGROUND CONVERSATION.',
    body: 'Low-end frequencies sculpted for architectural resonance. Every transition, sub-bass pressure wave, and spatial sweep is calibrated so the room itself behaves like a single living instrument.',
    specLabel: 'FUNDAMENTAL RESONANCE',
    specValue: '32HZ — 64HZ SUBTERRANEAN PRESSURE',
    imageSrc: '/brand/afterhrs-panel-02.jpg',
  },
  {
    actCode: 'ACT III // CRIMSON ARCHITECTURE',
    title: 'THE ROOM IS THE HEADLINER.',
    headline: 'SHADOW, SMOKE, AND MONOLITHIC RED LIGHT.',
    body: 'We design total environments. Custom lighting geometry, dense atmospheric haze, and stark brutalist sightlines dissolve the boundary between performer and floor.',
    specLabel: 'SPATIAL CONFIGURATION',
    specValue: '360° IMMERSIVE SOUNDSTAGE',
    imageSrc: '/brand/afterhrs-panel-03.jpg',
  },
  {
    actCode: 'ACT IV // THE AFTERMATH',
    title: 'WHEN THE LIGHTS CUT, THE MEMORY REMAINS.',
    headline: 'UNREPEATABLE NIGHTS. ZERO SECOND TAKES.',
    body: 'No two AFTERHRS transmissions share the same blueprint. Once the final frequency decays, the chapter closes permanently—until the next signal surfaces.',
    specLabel: 'TRANSMISSION PROTOCOL',
    specValue: 'LIMITED CAPACITY // RSVP VERIFIED',
    imageSrc: '/brand/afterhrs-logo-clean.jpg',
  },
];

