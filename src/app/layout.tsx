import type { Metadata } from 'next';
import './globals.css';
import { SmoothScrollProvider } from '@/components/motion/SmoothScrollProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://afterhrs.in'),
  title: 'AFTERHRS PRODUCTIONS — Beyond The Ordinary | Hyderabad',
  description:
    'AFTERHRS PRODUCTIONS is an underground, experimental, and cinematic event production house based in Hyderabad. The night does not end here.',
  keywords: [
    'AFTERHRS PRODUCTIONS',
    'afterhrs_prod',
    'Hyderabad events',
    'underground events Hyderabad',
    'immersive event production',
    'audiovisual experience India',
  ],
  openGraph: {
    title: 'AFTERHRS PRODUCTIONS — THE NIGHT DOESN’T END HERE.',
    description:
      'AFTERHRS PRODUCTIONS presents something beyond the ordinary. Underground audiovisual event experiences in Hyderabad.',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/brand/afterhrs-logo-clean.jpg',
        width: 980,
        height: 980,
        alt: 'AFTERHRS PRODUCTIONS Official Emblem',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AFTERHRS PRODUCTIONS',
    url: 'https://www.instagram.com/afterhrs_prod/',
    sameAs: ['https://www.instagram.com/afterhrs_prod/'],
    location: {
      '@type': 'Place',
      name: 'Hyderabad, Telangana, India',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Hyderabad',
        addressRegion: 'Telangana',
        addressCountry: 'IN',
      },
    },
    description:
      'Hyderabad-based underground and experimental event production brand creating immersive nocturnal experiences.',
  };

  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="preload"
          href="/fonts/big-shoulders-display-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/unbounded-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-void-950 text-bone-100 antialiased selection:bg-scarlet-500 selection:text-void-950">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
