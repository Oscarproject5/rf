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

  // Hint disabled - no popup
  useEffect(() => {
    setShowHint(false)
  }, [])

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