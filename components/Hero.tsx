'use client'

import React, { useState, useEffect } from 'react'
import MagneticButton from './MagneticButton'
import styles from './Hero.module.scss'

interface HeroProps {
  className?: string
}

export default function Hero({ className = '' }: HeroProps) {
  const images = [
    {
      src: '/close-up-kid-filling-bottle-with-water.jpg',
      alt: 'Child filling water bottle - clean water for families'
    },
    {
      src: '/portrait-man-home-drinking-glass-water.jpg',
      alt: 'Man enjoying clean drinking water at home'
    },
    {
      src: '/H2O-56SEM-R-48-1_l2.jpg',
      alt: 'Professional water softener system for whole home filtration'
    },
    {
      src: '/Gemini_Generated_Image_vg90hvvg90hvvg90.png',
      alt: 'Modern water purification system'
    }
  ]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    // Different durations for each image
    const durations = [4000, 4000, 16000, 4000] // Water softener stays for 16 seconds, others for 4
    
    const timeout = setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, durations[currentImageIndex])

    return () => clearTimeout(timeout)
  }, [currentImageIndex, images.length])

  const handleCTAClick = () => {
    if (typeof window !== 'undefined') {
      const contactElement = document.getElementById('contact')
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <section id="hero" className={`${styles.hero} ${className}`}>
      <div className={styles.container}>
        {/* Top trust badges */}
        <div className={styles.topBadges}>
          <div className={styles.topBadge}>
            <svg viewBox="0 0 20 20" fill="currentColor" className={styles.topBadgeIcon}>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span>4.9/5 Stars</span>
          </div>
          <div className={styles.topBadge}>
            <svg viewBox="0 0 20 20" fill="currentColor" className={styles.topBadgeIcon}>
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
            </svg>
            <span>Licensed & Insured</span>
          </div>
          <div className={styles.topBadge}>
            <svg viewBox="0 0 20 20" fill="currentColor" className={styles.topBadgeIcon}>
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
            </svg>
            <span>2,000+ Happy Families</span>
          </div>
        </div>

        {/* Main content grid */}
        <div className={styles.mainGrid}>
          {/* Left content */}
          <div className={styles.leftContent}>
            <h1 className={styles.headline}>
              Pure Water.
              <br />
              Protected Families.
              <br />
              Proven Results.
            </h1>

            <p className={styles.description}>
              Join 2,000+ RGV families who chose Love Water for cleaner, safer water. 
              Free in-home testing reveals what's really in your McAllen tap water.
            </p>

            <div className={styles.ctaGroup}>
              <MagneticButton
                variant="primary"
                size="lg"
                onClick={handleCTAClick}
                className={styles.primaryBtn}
                ariaLabel="Get your free water test"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className={styles.btnIcon}>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                Get Your Free Water Test
              </MagneticButton>
            </div>

            <div className={styles.contactInfo}>
              <a href="tel:+19565557873" className={styles.phoneLink}>
                Call (956) 555-PURE
              </a>
              <span className={styles.availability}>Same-day service available</span>
            </div>
          </div>

          {/* Right image slideshow */}
          <div className={styles.rightImage}>
            <div className={styles.imageFrame}>
              <div className={styles.slideshow}>
                {images.map((image, index) => (
                  <img 
                    key={index}
                    src={image.src} 
                    alt={image.alt} 
                    className={`${styles.heroImage} ${index === currentImageIndex ? styles.active : ''}`}
                  />
                ))}
              </div>
              {/* Slideshow indicators */}
              <div className={styles.indicators}>
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.indicator} ${index === currentImageIndex ? styles.active : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom features */}
        <div className={styles.bottomFeatures}>
          <div className={styles.feature}>
            <span className={styles.featureLabel}>Free 15-Point Water Test</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureLabel}>Up to 25-Year Warranty</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureLabel}>RGV Local Experts</span>
          </div>
        </div>
      </div>
    </section>
  )
}