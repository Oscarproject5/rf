'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useMobile } from '@/hooks/useMobile'
import { usePWA } from '@/hooks/usePWA'
import { initializeMobileOptimizations } from '@/lib/mobilePerformance'
import MobileBottomNav, { HomeIcon, ServicesIcon, SystemsIcon, ContactIcon } from './MobileBottomNav'
import MobileDrawer from './MobileDrawer'
import FloatingActionButton from './FloatingActionButton'
import styles from './MobileLayout.module.scss'

interface MobileLayoutProps {
  children: React.ReactNode
  className?: string
}

export default function MobileLayout({ children, className = '' }: MobileLayoutProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { isMobile } = useMobile()
  const { isInstallable, installApp, shareApp } = usePWA()
  
  // Initialize mobile performance optimizations
  useEffect(() => {
    if (isMobile) {
      initializeMobileOptimizations()
    }
  }, [isMobile])

  const navItems = useMemo(() => [
    {
      id: 'home',
      icon: <HomeIcon />,
      label: 'Home',
      href: '#hero'
    },
    {
      id: 'services',
      icon: <ServicesIcon />,
      label: 'Services',
      href: '#services'
    },
    {
      id: 'systems',
      icon: <SystemsIcon />,
      label: 'Systems',
      href: '#systems'
    },
    {
      id: 'contact',
      icon: <ContactIcon />,
      label: 'Contact',
      href: '#contact'
    }
  ], [])

  const drawerItems = useMemo(() => [
    {
      id: 'home',
      label: 'Home',
      href: '#hero',
      icon: <HomeIcon />
    },
    {
      id: 'services',
      label: 'Our Services',
      href: '#services',
      icon: <ServicesIcon />
    },
    {
      id: 'systems',
      label: 'Water Systems',
      href: '#systems',
      icon: <SystemsIcon />
    },
    {
      id: 'how-it-works',
      label: 'How It Works',
      href: '#how-it-works'
    },
    {
      id: 'testimonials',
      label: 'Testimonials',
      href: '#testimonials'
    },
    {
      id: 'faq',
      label: 'FAQ',
      href: '#faq'
    },
    {
      id: 'contact',
      label: 'Contact Us',
      href: '#contact',
      icon: <ContactIcon />
    },
    ...(isInstallable ? [{
      id: 'install',
      label: 'Install App',
      onClick: installApp
    }] : []),
    {
      id: 'share',
      label: 'Share',
      onClick: shareApp
    }
  ], [isInstallable, installApp, shareApp])


  // Track active section for navigation
  useEffect(() => {
    if (!isMobile) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            if (['hero', 'services', 'systems', 'contact'].includes(id)) {
              setActiveSection(id === 'hero' ? 'home' : id)
            }
          }
        })
      },
      { threshold: 0.3 }
    )

    const sections = ['hero', 'services', 'systems', 'contact']
    sections.forEach(id => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [isMobile])

  // Add edge swipe detection for drawer with throttling
  useEffect(() => {
    if (!isMobile) return

    let startX = 0
    let isSwipeActive = false
    const edgeThreshold = 20

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX
      isSwipeActive = startX <= edgeThreshold
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isSwipeActive) return // Early exit if not edge swipe
      
      if (e.touches[0].clientX > startX + 50) {
        setIsDrawerOpen(true)
        isSwipeActive = false // Prevent multiple triggers
      }
    }

    const handleTouchEnd = () => {
      isSwipeActive = false
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchmove', handleTouchMove, { passive: true })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isMobile])

  if (!isMobile) {
    // Return desktop layout
    return <div className={className}>{children}</div>
  }

  return (
    <div className={`${styles.mobileLayout} ${className}`}>
      {/* PWA Status Bar */}
      <div className={styles.statusBar} />
      
      {/* Main Content */}
      <div className={styles.content}>
        {children}
      </div>

      {/* Mobile Navigation */}
      <MobileBottomNav
        items={navItems}
        activeItem={activeSection}
      />

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        items={drawerItems}
        title="Love Water"
        footer={
          <div className={styles.drawerFooter}>
            <p>Rio Grande Valley's Water Experts</p>
            <p>📞 (956) 123-4567</p>
          </div>
        }
      />

      {/* Floating Action Button - Phone Only */}
      <FloatingActionButton
        position="bottom-right"
      />

      {/* Edge Swipe Indicator */}
      <div className={styles.edgeIndicator} />
    </div>
  )
}