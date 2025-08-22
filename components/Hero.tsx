'use client'

import React from 'react'
import { motion } from 'framer-motion'
import MagneticButton from './MagneticButton'
import SpanAccent from './SpanAccent'
import styles from './Hero.module.scss'

interface HeroProps {
  className?: string
}

export default function Hero({ className = '' }: HeroProps) {

  const handleCTAClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className={`${styles.hero} ${className}`}>

      <div className={styles.container}>
        <div className={styles.content}>
          {/* Trust signals */}
          <motion.div
            className={styles.trustSignals}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className={styles.trustBadge}>
              <svg viewBox="0 0 24 24" className={styles.starIcon}>
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  fill="currentColor"
                />
              </svg>
              <span>4.9/5 Stars</span>
            </div>
            <div className={styles.trustBadge}>
              <svg viewBox="0 0 24 24" className={styles.shieldIcon}>
                <path
                  d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"
                  fill="currentColor"
                />
              </svg>
              <span>Licensed & Insured</span>
            </div>
            <div className={styles.trustBadge}>
              <span>2,000+ Happy Families</span>
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            className={styles.headline}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <SpanAccent accentIndex={1}>
              Pure Water. Protected Families. Proven Results.
            </SpanAccent>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className={styles.subheadline}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Join 2,000+ RGV families who chose Love Water for cleaner, safer water. 
            Free in-home testing reveals what's really in your{' '}
            <SpanAccent accentIndex={0}>McAllen tap water.</SpanAccent>
          </motion.p>

          {/* CTA Button */}
          <motion.div
            className={styles.ctaContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <MagneticButton
              variant="primary"
              size="lg"
              onClick={handleCTAClick}
              className={styles.primaryCTA}
              ariaLabel="Get your free water test"
            >
              <svg viewBox="0 0 24 24" className={styles.ctaIcon}>
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  fill="currentColor"
                />
              </svg>
              Get Your Free Water Test
            </MagneticButton>

            <div className={styles.secondaryActions}>
              <a
                href="tel:+19565557873"
                className={styles.phoneLink}
                onClick={() => {
                  if (typeof window !== 'undefined' && window.track) {
                    window.track('phone_click', {
                      category: 'conversion',
                      label: 'hero_phone'
                    })
                  }
                }}
              >
                <svg viewBox="0 0 24 24" className={styles.phoneIcon}>
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                    fill="currentColor"
                  />
                </svg>
                Call (956) 555-PURE
              </a>

              <span className={styles.urgency}>
                Same-day service available
              </span>
            </div>
          </motion.div>

          {/* Service highlights */}
          <motion.div
            className={styles.highlights}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <div className={styles.highlight}>
              <svg viewBox="0 0 24 24" className={styles.highlightIcon}>
                <path
                  d="M9 11H7l2-7 2 7h-2zm4 0h-2l2-7 2 7h-2zm4 0h-2l2-7 2 7h-2z"
                  fill="currentColor"
                />
              </svg>
              <span>Free 15-Point Water Test</span>
            </div>
            <div className={styles.highlight}>
              <svg viewBox="0 0 24 24" className={styles.highlightIcon}>
                <path
                  d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"
                  fill="currentColor"
                />
              </svg>
              <span>Up to 25-Year Warranty</span>
            </div>
            <div className={styles.highlight}>
              <svg viewBox="0 0 24 24" className={styles.highlightIcon}>
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                  fill="currentColor"
                />
              </svg>
              <span>RGV Local Experts</span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}