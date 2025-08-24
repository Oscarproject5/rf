'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Schema from '@/components/Schema'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

// Mobile layout wrapper
import MobileLayout from '@/components/MobileLayout'

// Footer is imported statically but will render last
import Footer from '@/components/Footer'

// Dynamic imports with optimized loading states and better chunking
const PaperBackground = dynamic(() => import('@/components/PaperBackground'), {
  loading: () => <div className="skeleton" style={{ position: 'fixed', inset: 0, zIndex: -1, background: '#000' }} />,
  ssr: false
})

// Lazy-loaded components with intersection observer
const Services = dynamic(() => import('@/components/Services'), {
  loading: () => <div className="skeleton" style={{ height: '400px', margin: '2rem', borderRadius: '1rem' }} />
})

const Systems = dynamic(() => import('@/components/Systems'), {
  loading: () => <div className="skeleton" style={{ height: '600px', margin: '2rem', borderRadius: '1rem' }} />
})

// Heavy 3D component - only load when needed
const WaterSoftenerDiagram = dynamic(
  () => import('@/components/WaterSoftenerDiagram'),
  {
    loading: () => (
      <div className="skeleton" style={{ 
        height: '600px', 
        margin: '2rem', 
        borderRadius: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#666'
      }}>
        Loading interactive diagram...
      </div>
    ),
    ssr: false
  }
)

const Testimonials = dynamic(() => import('@/components/Testimonials'), {
  loading: () => <div className="skeleton" style={{ height: '400px', margin: '2rem', borderRadius: '1rem' }} />
})

const MobileTestimonials = dynamic(() => import('@/components/MobileTestimonials'), {
  loading: () => <div className="skeleton" style={{ height: '400px', margin: '2rem', borderRadius: '1rem' }} />
})

const CallToAction = dynamic(() => import('@/components/CallToAction'), {
  loading: () => <div className="skeleton" style={{ height: '200px', margin: '2rem', borderRadius: '1rem' }} />
})

const FAQ = dynamic(() => import('@/components/FAQ'), {
  loading: () => <div className="skeleton" style={{ height: '600px', margin: '2rem', borderRadius: '1rem' }} />
})

// Lazy loading component wrapper
function LazySection({ children, className = '', id }: {
  children: React.ReactNode
  className?: string
  id?: string
}) {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
    triggerOnce: true
  })

  return (
    <div ref={ref} className={className} id={id}>
      {isVisible ? children : null}
    </div>
  )
}

// Sample testimonials data for mobile component
const testimonialData = [
  {
    id: '1',
    name: 'Maria Rodriguez',
    location: 'McAllen, TX',
    rating: 5,
    text: 'Love Water transformed our home! The water tastes amazing and our skin feels so much softer. Professional service from start to finish.',
    service: 'Whole House System',
    date: '2024-01-15'
  },
  {
    id: '2',
    name: 'Carlos Mendez',
    location: 'Edinburg, TX',
    rating: 5,
    text: 'Best investment we\'ve made for our family. The free testing showed us what was really in our water. Now we have peace of mind.',
    service: 'RO + Softener',
    date: '2024-02-03'
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    location: 'Mission, TX',
    rating: 5,
    text: 'Outstanding customer service! They explained everything clearly and the installation was quick and clean. Highly recommend!',
    service: 'Reverse Osmosis',
    date: '2024-02-20'
  },
  {
    id: '4',
    name: 'Roberto Flores',
    location: 'Brownsville, TX',
    rating: 5,
    text: 'Finally, water that doesn\'t leave spots on our dishes! The whole family notices the difference. Thank you Love Water!',
    service: 'Water Softener',
    date: '2024-03-08'
  }
]

// Register service worker for PWA functionality
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration)
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}

export default function HomePage() {
  return (
    <MobileLayout>
      {/* SEO Schema markup */}
      <Schema />
      
      {/* Background - loads independently */}
      <Suspense fallback={<div style={{ position: 'fixed', inset: 0, background: '#000', zIndex: -1 }} />}>
        <PaperBackground />
      </Suspense>
      
      {/* Critical content loads first */}
      <Nav />
      
      <div className="fade-in stagger-1" id="hero">
        <Hero />
      </div>
      
      {/* Secondary content loads progressively with intersection observer */}
      <LazySection className="fade-in stagger-2" id="services">
        <Services />
      </LazySection>
      
      <LazySection className="fade-in stagger-3" id="systems">
        <Systems />
      </LazySection>
      
      <LazySection className="fade-in stagger-4" id="how-it-works">
        <section style={{ padding: '4rem 0' }}>
          <WaterSoftenerDiagram />
        </section>
      </LazySection>
      
      <LazySection className="fade-in stagger-5" id="testimonials">
        <MobileTestimonials testimonials={testimonialData} />
        <div style={{ display: 'none' }} className="desktop-only">
          <Testimonials />
        </div>
      </LazySection>
      
      <LazySection className="fade-in stagger-6" id="faq">
        <FAQ />
      </LazySection>
      
      <LazySection className="fade-in stagger-7" id="contact">
        <CallToAction />
      </LazySection>
      
      <LazySection className="fade-in stagger-8">
        <Footer />
      </LazySection>
    </MobileLayout>
  )
}