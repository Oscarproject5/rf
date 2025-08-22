'use client'

import React, { Suspense } from 'react'
import { MeshGradient } from '@paper-design/shaders-react'
import styles from './PaperBackground.module.scss'

interface PaperBackgroundProps {
  className?: string
  children?: React.ReactNode
}

export default function PaperBackground({ className = '', children }: PaperBackgroundProps) {
  return (
    <div className={`${styles.container} ${className}`}>
      {/* Fallback background */}
      <div className={styles.fallback} />
      
      {/* Primary shader layer */}
      <Suspense fallback={null}>
        <MeshGradient
          colors={['#1e3a8a', '#3b82f6', '#60a5fa', '#dbeafe']}
          speed={0.3}
          distortion={0.8}
          swirl={0.1}
          className={styles.primary}
        />
      </Suspense>

      {/* Wireframe overlay - simulated with second layer */}
      <Suspense fallback={null}>
        <MeshGradient
          colors={['#0c4a6e', '#0369a1', '#0ea5e9', '#7dd3fc']}
          speed={0.2}
          distortion={1.0}
          swirl={0.2}
          className={styles.wireframe}
        />
      </Suspense>

      {/* Content */}
      {children && (
        <div className={styles.content}>
          {children}
        </div>
      )}
    </div>
  )
}