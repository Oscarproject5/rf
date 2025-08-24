'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useTiltParallax } from '@/hooks/useDeviceMotion'
import { useMobile } from '@/hooks/useMobile'
import styles from './TiltParallax.module.scss'

interface TiltParallaxProps {
  children: React.ReactNode
  intensity?: number
  depth?: number
  className?: string
  disabled?: boolean
}

export default function TiltParallax({
  children,
  intensity = 1,
  depth = 1,
  className = '',
  disabled = false
}: TiltParallaxProps) {
  const { isMobile, isTouchDevice } = useMobile()
  const { tiltX, tiltY, isActive, getParallaxStyles } = useTiltParallax(intensity)
  const [showPermissionPrompt, setShowPermissionPrompt] = useState(false)
  const [permissionDenied, setPermissionDenied] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const requestMotionPermission = async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission()
        if (permission === 'granted') {
          setShowPermissionPrompt(false)
          setPermissionDenied(false)
        } else {
          setPermissionDenied(true)
          setShowPermissionPrompt(false)
        }
      } catch (error) {
        setPermissionDenied(true)
        setShowPermissionPrompt(false)
      }
    }
  }

  useEffect(() => {
    // Show permission prompt on iOS devices
    if (isMobile && isTouchDevice && !disabled) {
      const hasAskedPermission = localStorage.getItem('tiltPermissionAsked')
      if (!hasAskedPermission && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        setTimeout(() => {
          setShowPermissionPrompt(true)
        }, 2000) // Show after 2 seconds
      }
    }
  }, [isMobile, isTouchDevice, disabled])

  const handlePermissionRequest = () => {
    localStorage.setItem('tiltPermissionAsked', 'true')
    requestMotionPermission()
  }

  const handlePermissionDismiss = () => {
    localStorage.setItem('tiltPermissionAsked', 'true')
    setShowPermissionPrompt(false)
  }

  if (disabled || !isMobile || !isTouchDevice) {
    return <div className={className}>{children}</div>
  }

  return (
    <>
      <motion.div
        ref={containerRef}
        className={`${styles.tiltContainer} ${className}`}
        style={getParallaxStyles(depth)}
        animate={{
          rotateX: isActive ? tiltY * 2 : 0,
          rotateY: isActive ? -tiltX * 2 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 30
        }}
      >
        {children}
        
        {/* Tilt indicator */}
        {isActive && !permissionDenied && (
          <motion.div
            className={styles.tiltIndicator}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
          >
            <div 
              className={styles.dot}
              style={{
                transform: `translateX(${tiltX * 20}px) translateY(${tiltY * 20}px)`
              }}
            />
          </motion.div>
        )}
      </motion.div>

      {/* Permission Prompt Modal */}
      {showPermissionPrompt && (
        <motion.div
          className={styles.permissionModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.permissionContent}
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <div className={styles.permissionIcon}>
              <PhoneIcon />
            </div>
            <h3 className={styles.permissionTitle}>
              Interactive Experience
            </h3>
            <p className={styles.permissionText}>
              Tilt your device to explore our content in an immersive way. 
              This requires access to device motion sensors.
            </p>
            <div className={styles.permissionButtons}>
              <button
                className={styles.permissionAllow}
                onClick={handlePermissionRequest}
              >
                Enable Tilt
              </button>
              <button
                className={styles.permissionDeny}
                onClick={handlePermissionDismiss}
              >
                Maybe Later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

// Enhanced tilt components for specific use cases
export function TiltCard({ 
  children, 
  className = '',
  glowEffect = true 
}: {
  children: React.ReactNode
  className?: string
  glowEffect?: boolean
}) {
  const { tiltX, tiltY, isActive } = useTiltParallax(0.5)

  return (
    <motion.div
      className={`${styles.tiltCard} ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${tiltY * 5}deg) rotateY(${-tiltX * 5}deg)`,
        boxShadow: glowEffect && isActive 
          ? `${tiltX * 10}px ${tiltY * 10}px 20px rgba(139, 92, 246, 0.3)`
          : undefined
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {children}
    </motion.div>
  )
}

export function TiltBackground({ 
  children,
  layers = 3,
  intensity = 1
}: {
  children: React.ReactNode
  layers?: number
  intensity?: number
}) {
  const { getParallaxStyles } = useTiltParallax(intensity)

  return (
    <div className={styles.tiltBackground}>
      {/* Multiple parallax layers */}
      {Array.from({ length: layers }, (_, i) => (
        <div
          key={i}
          className={styles.parallaxLayer}
          style={{
            ...getParallaxStyles((i + 1) * 0.3),
            zIndex: -i - 1,
            opacity: 0.8 - (i * 0.2)
          }}
        />
      ))}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}

// Icon component
function PhoneIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
      <line x1="12" y1="18" x2="12.01" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}