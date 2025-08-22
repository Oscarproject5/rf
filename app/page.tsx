'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Schema from '@/components/Schema'
import Footer from '@/components/Footer'

// Dynamic imports with loading states
const PaperBackground = dynamic(() => import('@/components/PaperBackground'), {
  loading: () => <div className="skeleton" style={{ position: 'fixed', inset: 0, zIndex: -1 }} />,
  ssr: false
})

const Services = dynamic(() => import('@/components/Services'), {
  loading: () => <div className="skeleton" style={{ height: '400px', margin: '2rem' }} />
})

const Systems = dynamic(() => import('@/components/Systems'), {
  loading: () => <div className="skeleton" style={{ height: '600px', margin: '2rem' }} />
})

const Testimonials = dynamic(() => import('@/components/Testimonials'), {
  loading: () => <div className="skeleton" style={{ height: '400px', margin: '2rem' }} />
})

const CallToAction = dynamic(() => import('@/components/CallToAction'), {
  loading: () => <div className="skeleton" style={{ height: '200px', margin: '2rem' }} />
})

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
      <div className="fade-in">
        <Nav />
      </div>
      
      <div className="fade-in stagger-1">
        <Hero />
      </div>
      
      {/* Secondary content loads progressively */}
      <div className="fade-in stagger-2">
        <Services />
      </div>
      
      <div className="fade-in stagger-3">
        <Systems />
      </div>
      
      <div className="fade-in stagger-4">
        <Testimonials />
      </div>
      
      <div className="fade-in stagger-5">
        <CallToAction />
      </div>
      
      <div className="fade-in stagger-5">
        <Footer />
      </div>
    </>
  )
}