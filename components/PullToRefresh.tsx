'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePullToRefresh } from '@/hooks/usePullToRefresh'
import { useMobile } from '@/hooks/useMobile'
import styles from './PullToRefresh.module.scss'

interface PullToRefreshProps {
  onRefresh: () => Promise<void> | void
  children: React.ReactNode
  disabled?: boolean
  threshold?: number
}

export default function PullToRefresh({
  onRefresh,
  children,
  disabled = false,
  threshold = 80
}: PullToRefreshProps) {
  const { isMobile } = useMobile()
  
  const {
    isPulling,
    isRefreshing,
    pullDistance,
    canRefresh,
    progress,
    attachContainer
  } = usePullToRefresh({
    onRefresh,
    threshold,
    disabled: disabled || !isMobile
  })

  if (!isMobile) {
    return <>{children}</>
  }

  return (
    <div 
      ref={attachContainer}
      className={styles.container}
      style={{
        transform: isPulling || isRefreshing ? `translateY(${Math.min(pullDistance, threshold)}px)` : undefined,
        transition: isPulling ? 'none' : 'transform 0.3s ease-out'
      }}
    >
      {/* Pull indicator */}
      <AnimatePresence>
        {(isPulling || isRefreshing) && (
          <motion.div
            className={styles.indicator}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              transform: `translateY(${pullDistance - threshold}px)`
            }}
          >
            <div className={styles.iconContainer}>
              {isRefreshing ? (
                <motion.div
                  className={styles.spinner}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <SpinnerIcon />
                </motion.div>
              ) : (
                <motion.div
                  className={`${styles.arrow} ${canRefresh ? styles.ready : ''}`}
                  animate={{
                    rotate: canRefresh ? 180 : 0,
                    scale: progress
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                >
                  <ArrowIcon />
                </motion.div>
              )}
            </div>
            
            <div className={styles.textContainer}>
              <p className={styles.text}>
                {isRefreshing 
                  ? 'Refreshing...' 
                  : canRefresh 
                    ? 'Release to refresh' 
                    : 'Pull to refresh'
                }
              </p>
            </div>

            {/* Progress indicator */}
            <div className={styles.progressContainer}>
              <div 
                className={styles.progressBar}
                style={{
                  width: `${Math.min(progress * 100, 100)}%`,
                  background: canRefresh 
                    ? 'linear-gradient(90deg, #10b981, #34d399)'
                    : 'linear-gradient(90deg, #8b5cf6, #a78bfa)'
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}

// Icon Components
function ArrowIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 19V5M5 12L12 5L19 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SpinnerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M21 12A9 9 0 1 1 3 12A9 9 0 0 1 21 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.25"
      />
      <path
        d="M21 12A9 9 0 0 0 12 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}