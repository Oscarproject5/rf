'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import Image from 'next/image'
import MagneticButton from './MagneticButton'
import styles from './Hero.module.scss'

interface HeroProps {
  className?: string
}

export default function Hero({ className = '' }: HeroProps) {
  const images = useMemo(() => [
    {
      src: '/close-up-kid-filling-bottle-with-water.jpg',
      alt: 'Child filling water bottle - clean water for families',
      priority: true // Prioritize first image for faster initial load
    },
    {
      src: '/portrait-man-home-drinking-glass-water.jpg',
      alt: 'Man enjoying clean drinking water at home',
      priority: false
    },
    {
      src: '/H2O-56SEM-R-48-1_l2.jpg',
      alt: 'Professional water softener system for whole home filtration',
      priority: false
    },
    {
      src: '/Gemini_Generated_Image_vg90hvvg90hvvg90.png',
      alt: 'Modern water purification system',
      priority: false
    }
  ], [])

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    // Different durations for each image
    const durations = [4000, 4000, 16000, 4000] // Water softener stays for 16 seconds, others for 4
    
    const timeout = setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, durations[currentImageIndex])

    return () => clearTimeout(timeout)
  }, [currentImageIndex, images.length])

  const handleCTAClick = useCallback(() => {
    if (typeof window !== 'undefined') {
      const contactElement = document.getElementById('contact')
      if (contactElement) {
        // Use requestAnimationFrame for smoother scrolling on mobile
        requestAnimationFrame(() => {
          contactElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
        })
      }
    }
  }, [])

  return (
    <section id="hero" className={`${styles.hero} ${className}`}>
      <div className={styles.container}>
        {/* Top trust badges - Desktop only */}
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
              Love Water.
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
              <a href="tel:+19565791750" className={styles.phoneLink}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '20px', height: '20px' }}>
                  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                </svg>
                Call (956) 579-1750
              </a>
              <span className={styles.availability}>Same-day service available</span>
            </div>
          </div>

          {/* Right image slideshow */}
          <div className={styles.rightImage}>
            <div className={styles.imageFrame}>
              <div className={styles.slideshow}>
                {images.map((image, index) => (
                  <Image 
                    key={index}
                    src={image.src} 
                    alt={image.alt} 
                    width={500}
                    height={400}
                    sizes="(max-width: 768px) 100vw, 500px"
                    quality={85}
                    priority={index === 0}
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

        {/* Bottom features - Desktop only */}
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

        {/* Bottom divider line */}
        <div className={styles.bottomDivider}></div>
      </div>
    </section>
  )
}