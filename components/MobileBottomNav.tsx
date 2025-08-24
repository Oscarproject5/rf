'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useViewport } from '@/hooks/useViewport'
import { useMobile } from '@/hooks/useMobile'
import { useHaptics } from '@/hooks/useHaptics'
import styles from './MobileBottomNav.module.scss'

interface NavItem {
  id: string
  icon: React.ReactNode
  label: string
  href: string
  onClick?: () => void
}

interface MobileBottomNavProps {
  items: NavItem[]
  activeItem?: string
  className?: string
}

export default function MobileBottomNav({ 
  items, 
  activeItem,
  className = '' 
}: MobileBottomNavProps) {
  const [isVisible, setIsVisible] = useState(true)
  const { scrollDirection, safeAreaBottom } = useViewport()
  const { isMobile } = useMobile()
  const { selection } = useHaptics()

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    if (scrollDirection === 'down') {
      setIsVisible(false)
    } else if (scrollDirection === 'up') {
      setIsVisible(true)
    }
  }, [scrollDirection])

  const handleItemClick = (item: NavItem, e: React.MouseEvent) => {
    e.preventDefault()
    selection() // Haptic feedback
    
    if (item.onClick) {
      item.onClick()
    } else {
      // Smooth scroll to section
      const element = document.querySelector(item.href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  if (!isMobile) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          className={`${styles.bottomNav} ${className}`}
          style={{
            paddingBottom: `${safeAreaBottom}px`
          }}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <div className={styles.navContainer}>
            {items.map((item, index) => (
              <motion.button
                key={item.id}
                className={`${styles.navItem} ${activeItem === item.id ? styles.active : ''}`}
                onClick={(e) => handleItemClick(item, e)}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={styles.iconContainer}>
                  {item.icon}
                  {activeItem === item.id && (
                    <motion.div
                      className={styles.activeIndicator}
                      layoutId="activeIndicator"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </div>
                <span className={styles.label}>{item.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

// Home Icon Component
export function HomeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 12L5 10M5 10L12 3L19 10M5 10V20A1 1 0 006 21H9M19 10L21 12M19 10V20A1 1 0 0018 21H15M9 21V16A1 1 0 0110 15H14A1 1 0 0115 16V21M9 21H15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Services Icon Component
export function ServicesIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M19.428 15.428A2 2 0 0021 13.5V6a2 2 0 00-2-2H5a2 2 0 00-2 2v7.5a2 2 0 001.572 1.928L12 18l7.428-2.572z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 8v8M8 12h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Systems Icon Component
export function SystemsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6H16a5 5 0 011 9.9M9 19l3 3 3-3M12 12v9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Contact Icon Component
export function ContactIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}