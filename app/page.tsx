'use client'

import dynamic from 'next/dynamic'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import PaperBackground from '@/components/PaperBackground'
import Schema from '@/components/Schema'

// Lazy load heavy components
const BackgroundVariants = dynamic(() => import('@/components/BackgroundVariants'), {
  ssr: false
})

export default function HomePage() {
  return (
    <>
      {/* SEO Schema markup */}
      <Schema />
      
      {/* Background */}
      <PaperBackground />
      
      {/* Navigation */}
      <Nav />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Placeholder sections for the complete implementation */}
      <section id="social-proof" className="section">
        <div className="container">
          <h2>Trusted by 2,000+ RGV Families</h2>
          {/* SocialProof component would go here */}
        </div>
      </section>
      
      <section id="systems" className="section">
        <div className="container">
          <h2>Water Treatment Systems</h2>
          {/* ProductCards component would go here */}
        </div>
      </section>
      
      <section id="about" className="section">
        <div className="container">
          <h2>Why Choose Love Water</h2>
          {/* Ethos component would go here */}
        </div>
      </section>
      
      <section id="service-areas" className="section">
        <div className="container">
          <h2>Serving the Rio Grande Valley</h2>
          {/* ServiceArea component would go here */}
        </div>
      </section>
      
      <section id="contact" className="section">
        <div className="container">
          <h2>Get Your Free Water Test</h2>
          {/* Contact form would go here */}
        </div>
      </section>
      
      {/* Footer placeholder */}
      <footer className="section">
        <div className="container">
          <p>&copy; 2024 Love Water. Licensed & Insured.</p>
        </div>
      </footer>
    </>
  )
}