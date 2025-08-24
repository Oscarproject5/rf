'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Schema from '@/components/Schema'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

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

// Footer is imported at the top now

export default function HomePage() {
  return (
    <>
      {/* SEO Schema markup */}
      <Schema />
      
      {/* Background - loads independently */}
      <Suspense fallback={<div style={{ position: 'fixed', inset: 0, background: '#000', zIndex: -1 }} />}>
        <PaperBackground />
      </Suspense>
      
      {/* Critical content loads first */}
      <Nav />
      
      <div className="fade-in stagger-1">
        <Hero />
      </div>
      
      {/* Secondary content loads progressively with intersection observer */}
      <LazySection className="fade-in stagger-2">
        <Services />
      </LazySection>
      
      <LazySection className="fade-in stagger-3">
        <Systems />
      </LazySection>
      
      <LazySection className="fade-in stagger-4" id="how-it-works">
        <section style={{ padding: '4rem 0' }}>
          <WaterSoftenerDiagram />
        </section>
      </LazySection>
      
      <LazySection className="fade-in stagger-5">
        <Testimonials />
      </LazySection>
      
      <LazySection className="fade-in stagger-6">
        <FAQ />
      </LazySection>
      
      <LazySection className="fade-in stagger-7">
        <CallToAction />
      </LazySection>
      
      <LazySection className="fade-in stagger-8">
        <Footer />
      </LazySection>
    </>
  )
}