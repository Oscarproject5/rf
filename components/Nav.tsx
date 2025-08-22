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
  { href: '#services', label: 'Solutions' },
  { href: '#systems', label: 'Systems' },
  { href: '#testimonials', label: 'Reviews' },
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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const href = e.currentTarget.getAttribute('href')
    if (!href) return
    
    setIsMobileMenuOpen(false)
    
    // Handle scroll to top for logo
    if (href === '#hero' || href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    
    // Smooth scroll to section
    const element = document.querySelector(href)
    if (element) {
      const yOffset = -80 // Account for fixed header height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  const handlePhoneClick = () => {
    // Phone click handler
    console.log('Phone clicked')
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
            onClick={handleNavClick}
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
            <div className={styles.logoIcon}>
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
                <path 
                  d="M20 8C20 8 12 16 12 24C12 28.4183 15.5817 32 20 32C24.4183 32 28 28.4183 28 24C28 16 20 8 20 8Z" 
                  fill="currentColor"
                />
                <path 
                  d="M20 20C20 20 16 24 16 26C16 27.1046 16.8954 28 18 28C19.1046 28 20 27.1046 20 26C20 24 20 20 20 20Z" 
                  fill="white"
                  opacity="0.3"
                />
              </svg>
            </div>
            
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
              <span className={styles.logoMain}>Love Water</span>
              <span className={styles.logoTag}>RGV</span>
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
                    onClick={handleNavClick}
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
                onClick={() => {
                  const element = document.querySelector('#contact')
                  if (element) {
                    const yOffset = -80
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
                    window.scrollTo({ top: y, behavior: 'smooth' })
                  }
                }}
                ariaLabel="Get free water test"
                className={styles.ctaButton}
              >
                Get Free Test
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
        <AnimatePresence mode="wait">
          {isMobileMenuOpen && (
            <motion.div
              key="mobile-menu"
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
                        onClick={handleNavClick}
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
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      const element = document.querySelector('#contact')
                      if (element) {
                        const yOffset = -80
                        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
                        window.scrollTo({ top: y, behavior: 'smooth' })
                      }
                    }}
                    className={styles.mobileCTA}
                    ariaLabel="Get free water test"
                  >
                    Get Your Free Water Test
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