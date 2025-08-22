'use client'

import React, { useState, useEffect, useRef, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import VortexShader from './VortexShader'
import DropletMorph from './DropletMorph'
import VideoFallback from './VideoFallback'
import styles from './HeroSequence.module.scss'

// Lazy load heavy components with fallback
const VortexShaderLazy = dynamic(() => import('./VortexShaderFallback'), {
  ssr: false,
  loading: () => null
})

type SequenceState = 'ambient' | 'whirlpool' | 'droplet' | 'resolve' | 'idle'

interface HeroSequenceProps {
  onComplete?: () => void
  onSkip?: () => void
  useVideoFallback?: boolean
  lottieUrl?: string
  videoUrl?: string
}

export default function HeroSequence({ 
  onComplete, 
  onSkip,
  useVideoFallback = false,
  lottieUrl,
  videoUrl
}: HeroSequenceProps) {
  const [currentState, setCurrentState] = useState<SequenceState>('ambient')
  const [isSkipped, setIsSkipped] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const sequenceRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // State machine for animation sequence
  useEffect(() => {
    if (isSkipped || prefersReducedMotion) return

    const stateDurations: Record<SequenceState, number> = {
      ambient: 1500,
      whirlpool: 1500, 
      droplet: 1500,
      resolve: 1500,
      idle: 3000
    }

    const nextStates: Record<SequenceState, SequenceState> = {
      ambient: 'whirlpool',
      whirlpool: 'droplet',
      droplet: 'resolve',
      resolve: 'idle',
      idle: 'ambient'
    }

    timeoutRef.current = setTimeout(() => {
      const nextState = nextStates[currentState]
      
      if (currentState === 'resolve') {
        // Announce completion
        announceState('Animation complete')
        onComplete?.()
      }
      
      setCurrentState(nextState)
    }, stateDurations[currentState])

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [currentState, isSkipped, prefersReducedMotion, onComplete])

  const handleSkip = () => {
    setIsSkipped(true)
    setIsVisible(false)
    announceState('Animation skipped')
    onSkip?.()
    
    // Track skip event
    if (typeof window !== 'undefined' && window.track) {
      window.track('intro_skip', {
        category: 'engagement',
        label: currentState
      })
    }
  }

  const announceState = (message: string) => {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', 'polite')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message
    document.body.appendChild(announcement)
    
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }

  // Don't render if skipped or reduced motion with no fallback
  if (isSkipped || (prefersReducedMotion && !useVideoFallback)) {
    return null
  }

  // Render video/Lottie fallback for reduced motion
  if (prefersReducedMotion && useVideoFallback) {
    return (
      <VideoFallback
        videoUrl={videoUrl}
        lottieUrl={lottieUrl}
        onComplete={onComplete}
        className={styles.fallback}
      />
    )
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={sequenceRef}
          className={styles.sequence}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          role="img"
          aria-label="Water purification animation"
        >
          {/* Skip button */}
          <button
            className={styles.skipButton}
            onClick={handleSkip}
            aria-label="Skip animation"
          >
            <span>Skip Animation</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2 2l12 6-12 6V2z"/>
              <path d="M14 2v12"/>
            </svg>
          </button>

          {/* Animation layers */}
          <div className={styles.layers}>
            {/* Ambient state - subtle ripples */}
            {currentState === 'ambient' && (
              <motion.div
                className={styles.ambient}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              >
                <div className={styles.ripples} />
              </motion.div>
            )}

            {/* Whirlpool state */}
            {currentState === 'whirlpool' && (
              <Suspense fallback={<div className={styles.placeholder} />}>
                <VortexShaderLazy className={styles.vortex} />
              </Suspense>
            )}

            {/* Droplet state */}
            {currentState === 'droplet' && (
              <DropletMorph
                className={styles.droplet}
                isActive={true}
              />
            )}


            {/* Resolve state - fade to background */}
            {currentState === 'resolve' && (
              <motion.div
                className={styles.resolve}
                initial={{ opacity: 1, filter: 'blur(0px)' }}
                animate={{ opacity: 0.3, filter: 'blur(2px)' }}
                transition={{ duration: 1.5 }}
              />
            )}
          </div>


          {/* State announcement for screen readers */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            {currentState === 'ambient' && 'Water surface rippling'}
            {currentState === 'whirlpool' && 'Vortex forming'}
            {currentState === 'droplet' && 'Water droplet forming'}
            {currentState === 'resolve' && 'Purification complete'}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}