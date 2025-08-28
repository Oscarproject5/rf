'use client'

import React, { Suspense, memo, useEffect, useState } from 'react'
import { MeshGradient } from '@paper-design/shaders-react'
import styles from './PaperBackground.module.scss'

interface PaperBackgroundProps {
  className?: string
  children?: React.ReactNode
}

const PaperBackground = memo(function PaperBackground({ className = '', children }: PaperBackgroundProps) {
  const [isDesktop, setIsDesktop] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setIsDesktop(window.innerWidth > 768)
    // Delay shader mounting slightly to prioritize content
    const timer = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <div className={`${styles.container} ${className}`}>
      {/* Fallback background always visible */}
      <div className={styles.fallback} />
      
      {/* Primary shader layer - only after mount */}
      {mounted && (
        <Suspense fallback={null}>
          <MeshGradient
            colors={['#0f172a', '#0e7490', '#06b6d4', '#0891b2']}
            className={styles.primary}
          />
        </Suspense>
      )}

      {/* Ambient glow overlay - only on mobile for performance */}
      {mounted && !isDesktop && (
        <Suspense fallback={null}>
          <MeshGradient
            colors={['#000000', '#0891b2', '#06b6d4', '#000000']}
            className={styles.wireframe}
          />
        </Suspense>
      )}

      {/* Content */}
      {children && (
        <div className={styles.content}>
          {children}
        </div>
      )}
    </div>
  )
})

export default PaperBackground