import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: {
          950: 'var(--primitive-void-950)',
          900: 'var(--primitive-void-900)',
          850: 'var(--primitive-void-850)',
        },
        crimson: {
          950: 'var(--primitive-crimson-950)',
          900: 'var(--primitive-crimson-900)',
          700: 'var(--primitive-crimson-700)',
          600: 'var(--primitive-crimson-600)',
        },
        scarlet: {
          500: 'var(--primitive-scarlet-500)',
          400: 'var(--primitive-scarlet-400)',
        },
        ember: {
          500: 'var(--primitive-ember-500)',
          400: 'var(--primitive-ember-400)',
        },
        bone: {
          100: 'var(--primitive-bone-100)',
          200: 'var(--primitive-bone-200)',
        },
        ash: {
          300: 'var(--primitive-ash-300)',
          500: 'var(--primitive-ash-500)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        extended: ['var(--font-extended)', 'sans-serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      boxShadow: {
        stage: '0 24px 60px -12px rgba(0, 0, 0, 0.92)',
        crimson: '0 18px 44px -10px rgba(138, 0, 10, 0.55)',
      },
    },
  },
  plugins: [],
};

export default config;

