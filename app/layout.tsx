import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Instrument_Serif } from 'next/font/google'
import Script from 'next/script'
import MobileLayout from '@/components/MobileLayout'
import './globals.scss'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-primary',
  display: 'optional', // Changed from 'swap' to 'optional' to prevent layout shift
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif']
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-accent',
  display: 'optional', // Changed from 'swap' to 'optional' to prevent layout shift
  fallback: ['Georgia', 'Times New Roman', 'serif']
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
        {/* Cache Control - Prevent browser caching during development */}
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="icon" href="/logo.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/logo.jpg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8b5cf6" />
      </head>
      <body suppressHydrationWarning>

        {/* Mobile Layout Wrapper */}
        <MobileLayout>
          {/* Main content */}
          <main id="main-content">
            {children}
          </main>
        </MobileLayout>

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

        {/* Service Worker - Unregister any existing service workers */}
        <Script id="unregister-service-worker" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              navigator.serviceWorker.getRegistrations().then(function(registrations) {
                for(let registration of registrations) {
                  registration.unregister();
                  console.log('Service Worker unregistered');
                }
              });
            }
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

        {/* Web Vitals monitoring */}
        <Script id="web-vitals" strategy="afterInteractive">
          {`
            function sendToAnalytics(metric) {
              if (typeof gtag !== 'undefined') {
                gtag('event', metric.name, {
                  event_category: 'Web Vitals',
                  event_label: metric.id,
                  value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
                  non_interaction: true,
                });
              }
              console.log('Web Vitals:', metric);
            }
            
            // Import and use web-vitals library when available
            if ('PerformanceObserver' in window) {
              // LCP
              new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                const lastEntry = entries[entries.length - 1];
                sendToAnalytics({
                  name: 'LCP',
                  value: lastEntry.startTime,
                  id: 'lcp-' + Date.now()
                });
              }).observe({entryTypes: ['largest-contentful-paint']});
              
              // FID
              new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                entries.forEach((entry) => {
                  sendToAnalytics({
                    name: 'FID',
                    value: entry.processingStart - entry.startTime,
                    id: 'fid-' + Date.now()
                  });
                });
              }).observe({entryTypes: ['first-input']});
              
              // CLS
              let clsValue = 0;
              new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                entries.forEach((entry) => {
                  if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                  }
                });
                sendToAnalytics({
                  name: 'CLS',
                  value: clsValue,
                  id: 'cls-' + Date.now()
                });
              }).observe({entryTypes: ['layout-shift']});
            }
          `}
        </Script>
      </body>
    </html>
  )
}