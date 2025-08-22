import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Instrument_Serif } from 'next/font/google'
import Script from 'next/script'
import './globals.scss'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-primary',
  display: 'swap',
  preload: true,
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-accent',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#8b5cf6',
}

export const metadata: Metadata = {
  title: 'Water Filtration Systems RGV | Free Testing | Love Water McAllen',
  description: 'Free water testing & custom filtration systems for McAllen, Brownsville, Harlingen. RGV\'s trusted water experts since 2018. Licensed, insured, guaranteed.',
  keywords: [
    'water filtration McAllen',
    'water softener Brownsville', 
    'reverse osmosis Harlingen',
    'RGV water treatment',
    'Rio Grande Valley water testing'
  ],
  authors: [{ name: 'Love Water' }],
  creator: 'Love Water',
  publisher: 'Love Water',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://lovewaterrgv.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Water Filtration Systems RGV | Free Testing | Love Water McAllen',
    description: 'Free water testing & custom filtration systems for McAllen, Brownsville, Harlingen. RGV\'s trusted water experts since 2018.',
    url: 'https://lovewaterrgv.com',
    siteName: 'Love Water',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Love Water - Rio Grande Valley Water Treatment Experts',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Water Filtration Systems RGV | Free Testing | Love Water McAllen',
    description: 'Free water testing & custom filtration systems for the Rio Grande Valley.',
    images: ['/og-image.jpg'],
    creator: '@LoveWaterRGV',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${instrumentSerif.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        {/* Skip to main content link for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* Main content */}
        <main id="main-content">
          {children}
        </main>

        {/* Google Analytics - Replace with actual tracking ID */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_TRACKING_ID', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `}
        </Script>

        {/* Analytics tracking utility */}
        <Script id="analytics-tracker" strategy="afterInteractive">
          {`
            window.track = function(eventName, payload = {}) {
              if (typeof gtag !== 'undefined') {
                gtag('event', eventName, {
                  event_category: payload.category || 'engagement',
                  event_label: payload.label || '',
                  value: payload.value || 0,
                  ...payload
                });
              }
              console.log('Track:', eventName, payload);
            };
          `}
        </Script>
      </body>
    </html>
  )
}