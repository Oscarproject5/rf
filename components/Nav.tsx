'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MagneticButton from './MagneticButton'
import GooeyFilterDefs from './GooeyFilterDefs'
import styles from './Nav.module.scss'

interface NavProps {
  className?: string
}

const navItems = [
  { href: '#systems', label: 'Systems' },
  { href: '#service-areas', label: 'Service Areas' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' }
]

export default function Nav({ className = '' }: NavProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)
    
    // Smooth scroll to section
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }

    // Track navigation
    if (typeof window !== 'undefined' && window.track) {
      window.track('nav_click', {
        category: 'navigation',
        label: href.replace('#', '')
      })
    }
  }

  const handlePhoneClick = () => {
    if (typeof window !== 'undefined' && window.track) {
      window.track('phone_click', {
        category: 'conversion',
        label: 'nav_phone'
      })
    }
  }

  return (
    <>
      <GooeyFilterDefs />
      
      <motion.nav
        className={`${styles.nav} ${className}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          backgroundColor: isScrolled 
            ? 'rgba(0, 0, 0, 0.9)' 
            : 'rgba(0, 0, 0, 0.3)',
          backdropFilter: isScrolled ? 'blur(20px)' : 'blur(10px)'
        }}
      >
        <div className={styles.container}>
          {/* Logo */}
          <motion.a
            href="#hero"
            className={styles.logo}
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('#hero')
            }}
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0
            }}
            transition={{ 
              duration: 0.8, 
              ease: [0.68, -0.55, 0.265, 1.55],
              delay: 0.2
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.svg 
              role="img" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg" 
              className={styles.logoIcon}
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ 
                duration: 1, 
                ease: "easeOut",
                delay: 0.5
              }}
            >
              <title>Drupal</title>
              <motion.path 
                d="M15.78 5.113C14.09 3.425 12.48 1.815 11.998 0c-.48 1.815-2.09 3.425-3.778 5.113-2.534 2.53-5.405 5.4-5.405 9.702a9.184 9.185 0 1018.368 0c0-4.303-2.871-7.171-5.405-9.702M6.72 16.954c-.563-.019-2.64-3.6 1.215-7.416l2.55 2.788a.218.218 0 01-.016.325c-.61.625-3.204 3.227-3.527 4.126-.066.186-.164.18-.222.177M12 21.677a3.158 3.158 0 01-3.158-3.159 3.291 3.291 0 01.787-2.087c.57-.696 2.37-2.655 2.37-2.655s1.774 1.988 2.367 2.649a3.09 3.09 0 01.792 2.093A3.158 3.158 0 0112 21.677m6.046-5.123c-.068.15-.223.398-.431.405-.371.014-.411-.177-.686-.583-.604-.892-5.864-6.39-6.848-7.455-.866-.935-.122-1.595.223-1.94C10.736 6.547 12 5.285 12 5.285s3.766 3.574 5.336 6.016c1.57 2.443 1.029 4.556.71 5.253" 
                fill="currentColor"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ 
                  duration: 1.5, 
                  ease: "easeInOut",
                  delay: 0.8
                }}
              />
            </motion.svg>
            
            <motion.span 
              className={styles.logoText}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.6, 
                ease: "easeOut",
                delay: 1.2 
              }}
            >
              Love Water
            </motion.span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className={styles.desktopNav}>
            <motion.ul 
              className={styles.navList}
            >
              {navItems.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href={item.href}
                    className={styles.navLink}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(item.href)
                    }}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            {/* Contact Info */}
            <div className={styles.contactInfo}>
              <a
                href="tel:+19565557873"
                className={styles.phoneNumber}
                onClick={handlePhoneClick}
                aria-label="Call Love Water at (956) 555-PURE"
              >
                <svg viewBox="0 0 24 24" className={styles.phoneIcon}>
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                    fill="currentColor"
                  />
                </svg>
                (956) 555-PURE
              </a>

              <MagneticButton
                variant="primary"
                size="sm"
                onClick={() => handleNavClick('#contact')}
                ariaLabel="Get free water test"
              >
                Free Water Test
              </MagneticButton>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className={styles.mobileMenuButton}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <span className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className={styles.mobileMenu}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className={styles.mobileMenuContent}>
                <ul className={styles.mobileNavList}>
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <a
                        href={item.href}
                        className={styles.mobileNavLink}
                        onClick={(e) => {
                          e.preventDefault()
                          handleNavClick(item.href)
                        }}
                      >
                        {item.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>

                <div className={styles.mobileContact}>
                  <a
                    href="tel:+19565557873"
                    className={styles.mobilePhone}
                    onClick={handlePhoneClick}
                  >
                    <svg viewBox="0 0 24 24" className={styles.phoneIcon}>
                      <path
                        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                        fill="currentColor"
                      />
                    </svg>
                    (956) 555-PURE
                  </a>

                  <MagneticButton
                    variant="primary"
                    size="md"
                    onClick={() => handleNavClick('#contact')}
                    className={styles.mobileCTA}
                    ariaLabel="Get free water test"
                  >
                    Free Water Test
                  </MagneticButton>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}