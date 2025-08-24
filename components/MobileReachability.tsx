'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMobile } from '@/hooks/useMobile'
import { useViewport } from '@/hooks/useViewport'
import { useHaptics } from '@/hooks/useHaptics'
import styles from './MobileReachability.module.scss'

interface MobileReachabilityProps {
  children: React.ReactNode
  className?: string
  triggerHeight?: number // Height from bottom to trigger reachability
}

export default function MobileReachability({
  children,
  className = '',
  triggerHeight = 200
}: MobileReachabilityProps) {
  const [isReachabilityMode, setIsReachabilityMode] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const { isMobile, screenSize } = useMobile()
  const { height } = useViewport()
  const { impact } = useHaptics()

  // Show hint on first load for eligible devices
  useEffect(() => {
    if (isMobile && screenSize === 'sm' && height > 700) {
      const hasSeenHint = localStorage.getItem('reachabilityHintSeen')
      if (!hasSeenHint) {
        setTimeout(() => {
          setShowHint(true)
        }, 5000) // Show after 5 seconds
      }
    }
  }, [isMobile, screenSize, height])

  const toggleReachability = () => {
    const newMode = !isReachabilityMode
    setIsReachabilityMode(newMode)
    impact(newMode ? 'medium' : 'light')
    
    // Hide hint after first use
    if (showHint) {
      setShowHint(false)
      localStorage.setItem('reachabilityHintSeen', 'true')
    }
  }

  const dismissHint = () => {
    setShowHint(false)
    localStorage.setItem('reachabilityHintSeen', 'true')
  }

  // Don't render on desktop or larger mobile screens
  if (!isMobile || screenSize !== 'sm' || height <= 700) {
    return <>{children}</>
  }

  return (
    <>
      <motion.div
        className={`${styles.container} ${className}`}
        animate={{
          paddingTop: isReachabilityMode ? `${triggerHeight}px` : '0px'
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {children}

        {/* Reachability Toggle Button */}
        <button
          className={`${styles.toggleButton} ${isReachabilityMode ? styles.active : ''}`}
          onClick={toggleReachability}
          aria-label={isReachabilityMode ? 'Exit reachability mode' : 'Enter reachability mode'}
        >
          <motion.div
            animate={{
              rotate: isReachabilityMode ? 180 : 0
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <ReachabilityIcon />
          </motion.div>
        </button>

        {/* Reachability Indicator */}
        <AnimatePresence>
          {isReachabilityMode && (
            <motion.div
              className={styles.indicator}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ThumbIcon />
              <span>One-thumb mode</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Usage Hint */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            className={styles.hintOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.hintContent}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className={styles.hintIcon}>
                <ThumbIcon />
              </div>
              <h3 className={styles.hintTitle}>One-Thumb Mode</h3>
              <p className={styles.hintText}>
                Tap the reachability button to move content down for easier one-handed use.
              </p>
              <div className={styles.hintButtons}>
                <button
                  className={styles.hintTry}
                  onClick={() => {
                    toggleReachability()
                    setShowHint(false)
                  }}
                >
                  Try it
                </button>
                <button
                  className={styles.hintDismiss}
                  onClick={dismissHint}
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Enhanced components that work with reachability
export function ReachableHeader({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <div className={`${styles.reachableHeader} ${className}`}>
      {children}
    </div>
  )
}

export function ReachableNavigation({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <div className={`${styles.reachableNav} ${className}`}>
      {children}
    </div>
  )
}

export function ReachableActions({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <div className={`${styles.reachableActions} ${className}`}>
      {children}
    </div>
  )
}

// Icon Components
function ReachabilityIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M8 12L12 8L16 12M8 16L12 12L16 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ThumbIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 10V12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12V10C3 8.89543 3.89543 8 5 8C6.10457 8 7 8.89543 7 10Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 10V8C7 6.89543 7.89543 6 9 6H10C11.1046 6 12 6.89543 12 8V10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 10V8C12 6.89543 12.8954 6 14 6C15.1046 6 16 6.89543 16 8V10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 10V8C16 6.89543 16.8954 6 18 6C19.1046 6 20 6.89543 20 8V12C20 16.4183 16.4183 20 12 20H10C8.34315 20 7 18.6569 7 17V14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}