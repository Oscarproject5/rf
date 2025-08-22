'use client'

import React, { useEffect, useRef, useState } from 'react'
import Lottie from 'lottie-react'
import { motion } from 'framer-motion'
import styles from './VideoFallback.module.scss'

interface VideoFallbackProps {
  videoUrl?: string
  lottieUrl?: string
  onComplete?: () => void
  className?: string
}

export default function VideoFallback({ 
  videoUrl, 
  lottieUrl, 
  onComplete, 
  className = '' 
}: VideoFallbackProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [lottieData, setLottieData] = useState(null)

  // Load Lottie animation data
  useEffect(() => {
    if (lottieUrl && !videoUrl) {
      fetch(lottieUrl)
        .then(response => response.json())
        .then(data => {
          setLottieData(data)
          setIsLoaded(true)
        })
        .catch(error => {
          console.error('Failed to load Lottie animation:', error)
          setHasError(true)
        })
    }
  }, [lottieUrl, videoUrl])

  const handleVideoLoad = () => {
    setIsLoaded(true)
  }

  const handleVideoError = () => {
    setHasError(true)
  }

  const handleVideoEnd = () => {
    onComplete?.()
    
    // Track completion
    if (typeof window !== 'undefined' && window.track) {
      window.track('intro_complete', {
        category: 'engagement',
        label: 'video_fallback'
      })
    }
  }

  const handleLottieComplete = () => {
    onComplete?.()
    
    // Track completion
    if (typeof window !== 'undefined' && window.track) {
      window.track('intro_complete', {
        category: 'engagement',
        label: 'lottie_fallback'
      })
    }
  }

  // Render video if available
  if (videoUrl && !hasError) {
    return (
      <motion.div
        className={`${styles.fallback} ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <video
          ref={videoRef}
          className={styles.video}
          autoPlay
          muted
          playsInline
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          onEnded={handleVideoEnd}
          poster="/water-animation-poster.jpg"
          aria-label="Water purification process animation"
        >
          <source src={videoUrl} type="video/webm" />
          <source src={videoUrl.replace('.webm', '.mp4')} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {!isLoaded && (
          <div className={styles.loading}>
            <div className={styles.spinner} />
            <p>Loading animation...</p>
          </div>
        )}
      </motion.div>
    )
  }

  // Render Lottie if available
  if (lottieData && !hasError) {
    return (
      <motion.div
        className={`${styles.fallback} ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Lottie
          animationData={lottieData}
          className={styles.lottie}
          onComplete={handleLottieComplete}
          loop={false}
          autoplay={true}
          aria-label="Water purification process animation"
        />
      </motion.div>
    )
  }

  // Static fallback image
  return (
    <motion.div
      className={`${styles.fallback} ${styles.static} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.staticImage}>
        <svg viewBox="0 0 200 200" className={styles.waterDropIcon}>
          <defs>
            <linearGradient id="dropGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          
          <path
            d="M100,40 Q60,80 100,160 Q140,80 100,40 Z"
            fill="url(#dropGradient)"
            stroke="#ffffff"
            strokeWidth="2"
            strokeOpacity="0.6"
          />
          
          <circle
            cx="85"
            cy="70"
            r="6"
            fill="#ffffff"
            opacity="0.8"
          />
        </svg>
        
        <h3 className={styles.staticTitle}>Pure Water Solutions</h3>
        <p className={styles.staticDescription}>
          Professional water treatment systems for your Rio Grande Valley home
        </p>
      </div>
    </motion.div>
  )
}