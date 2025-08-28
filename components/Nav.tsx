'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import MagneticButton from './MagneticButton'
import GooeyFilterDefs from './GooeyFilterDefs'
import styles from './Nav.module.scss'

interface NavProps {
  className?: string
}

const navItems = [
  { href: '#services', label: 'Solutions' },
  { href: '#systems', label: 'Systems' },
  { href: '#products', label: 'Products' },
  { href: '#testimonials', label: 'Reviews' },
  { href: '#faq', label: 'FAQ' },
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
    
    console.log('Nav clicked:', href) // Debug log
    
    if (!href || href === '#') return
    
    // Close mobile menu immediately
    setIsMobileMenuOpen(false)
    
    // Small delay to allow menu animation to start
    setTimeout(() => {
      // Handle scroll to top for logo/hero
      if (href === '#hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      
      // Find the target section
      const targetId = href.replace('#', '')
      console.log('Looking for element with id:', targetId) // Debug log
      
      // Try multiple methods to find the element
      let element = document.getElementById(targetId)
      
      // If not found by ID, try querySelector
      if (!element) {
        element = document.querySelector(`[id="${targetId}"]`)
      }
      
      // If still not found, try finding section with that ID
      if (!element) {
        element = document.querySelector(`section#${targetId}`)
      }
      
      console.log('Found element:', element) // Debug log
      
      if (element) {
        // Get header height dynamically
        const header = document.querySelector('nav')
        const headerHeight = header ? header.offsetHeight : 80
        
        // Calculate scroll position
        const elementTop = element.getBoundingClientRect().top
        const currentScrollY = window.pageYOffset || document.documentElement.scrollTop
        const scrollToPosition = elementTop + currentScrollY - headerHeight - 10
        
        console.log('Scrolling to position:', scrollToPosition) // Debug log
        
        // Use native smooth scroll with fallback
        try {
          window.scrollTo({
            top: scrollToPosition,
            behavior: 'smooth'
          })
        } catch (error) {
          // Fallback for browsers that don't support smooth scroll
          console.log('Smooth scroll failed, using fallback')
          window.scrollTo(0, scrollToPosition)
        }
        
        // Additional fallback for stubborn browsers
        setTimeout(() => {
          const currentPosition = window.pageYOffset || document.documentElement.scrollTop
          if (Math.abs(currentPosition - scrollToPosition) > 100) {
            console.log('Scroll didn\'t work, trying again')
            element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 500)
      } else {
        console.error(`Section with id "${targetId}" not found in the DOM`)
        // Try to find all elements with IDs and log them
        const allIds = Array.from(document.querySelectorAll('[id]')).map(el => el.id)
        console.log('Available IDs in page:', allIds)
      }
    }, 150) // Delay to allow menu close animation
  }

  const handlePhoneClick = () => {
    // Phone click handler
    console.log('Phone clicked')
  }

  return (
    <>
      <GooeyFilterDefs />
      
      <motion.nav
        className={`${styles.nav} ${className} fade-in`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          backgroundColor: isScrolled 
            ? 'rgba(0, 0, 0, 0.85)' 
            : 'rgba(0, 0, 0, 0.4)',
          backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'blur(12px) saturate(150%)',
          WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'blur(12px) saturate(150%)',
          borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.05)'
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
              <Image 
                src="/logo.jpg" 
                alt="Love Water Logo" 
                width={40} 
                height={40}
                className={styles.logoImage}
                priority
                sizes="(max-width: 768px) 32px, 40px"
                quality={85}
                loading="eager"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
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
                href="tel:+19565791750"
                className={styles.phoneNumber}
                onClick={handlePhoneClick}
                aria-label="Call Love Water at (956) 579-1750"
              >
                <svg viewBox="0 0 24 24" className={styles.phoneIcon}>
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                    fill="currentColor"
                  />
                </svg>
                (956) 579-1750
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
                        onClick={(e) => {
                          handleNavClick(e)
                          // Ensure menu closes on mobile
                          setIsMobileMenuOpen(false)
                        }}
                      >
                        {item.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>

                <div className={styles.mobileContact}>
                  <a
                    href="tel:+19565791750"
                    className={styles.mobilePhone}
                    onClick={handlePhoneClick}
                  >
                    <svg viewBox="0 0 24 24" className={styles.phoneIcon}>
                      <path
                        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                        fill="currentColor"
                      />
                    </svg>
                    (956) 579-1750
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