'use client'

import { useState, useEffect } from 'react'
import { useMobile } from '@/hooks/useMobile'
import { useDeviceMotion } from '@/hooks/useDeviceMotion'
import { usePWA } from '@/hooks/usePWA'
import MobileBottomNav, { HomeIcon, ServicesIcon, SystemsIcon, ContactIcon } from './MobileBottomNav'
import MobileDrawer from './MobileDrawer'
import FloatingActionButton, { CallAction, WhatsAppAction, EmailAction, QuoteAction } from './FloatingActionButton'
import PullToRefresh from './PullToRefresh'
import MobileReachability from './MobileReachability'
import TiltParallax from './TiltParallax'
import styles from './MobileLayout.module.scss'

interface MobileLayoutProps {
  children: React.ReactNode
  className?: string
}

export default function MobileLayout({ children, className = '' }: MobileLayoutProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { isMobile } = useMobile()
  const { shake } = useDeviceMotion()
  const { isInstallable, installApp, shareApp } = usePWA()

  // Easter egg: Shake to reveal special features
  useEffect(() => {
    if (shake.isShaking && shake.shakeCount === 3) {
      // Show special offer or Easter egg
      showEasterEgg()
    }
  }, [shake])

  const showEasterEgg = () => {
    // Show a special modal or effect
    const modal = document.createElement('div')
    modal.innerHTML = `
      <div style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #8b5cf6, #a78bfa);
        color: white;
        padding: 2rem;
        border-radius: 20px;
        text-align: center;
        z-index: 9999;
        box-shadow: 0 20px 40px rgba(139, 92, 246, 0.4);
      ">
        <h3>🎉 You found it!</h3>
        <p>Triple shake for 15% off your first service!</p>
        <button onclick="this.parentElement.parentElement.remove()" style="
          background: white;
          color: #8b5cf6;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          margin-top: 1rem;
          cursor: pointer;
        ">Claim Offer</button>
      </div>
    `
    document.body.appendChild(modal)
    setTimeout(() => modal.remove(), 5000)
  }

  const handleRefresh = async () => {
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 2000))
    window.location.reload()
  }

  const navItems = [
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
  ]

  const drawerItems = [
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
  ]

  const floatingActions = [
    CallAction(),
    WhatsAppAction(),
    EmailAction(),
    QuoteAction()
  ]

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

  // Add edge swipe detection for drawer
  useEffect(() => {
    if (!isMobile) return

    let startX = 0
    const edgeThreshold = 20

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (startX <= edgeThreshold && e.touches[0].clientX > startX + 50) {
        setIsDrawerOpen(true)
      }
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchmove', handleTouchMove, { passive: true })

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
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
      
      {/* Reachability Wrapper */}
      <MobileReachability>
        {/* Pull to Refresh Wrapper */}
        <PullToRefresh onRefresh={handleRefresh}>
          {/* Tilt Parallax Wrapper */}
          <TiltParallax intensity={0.3}>
            {/* Main Content */}
            <div className={styles.content}>
              {children}
            </div>
          </TiltParallax>
        </PullToRefresh>
      </MobileReachability>

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

      {/* Floating Action Button */}
      <FloatingActionButton
        actions={floatingActions}
        position="bottom-right"
      />

      {/* Edge Swipe Indicator */}
      <div className={styles.edgeIndicator} />
    </div>
  )
}