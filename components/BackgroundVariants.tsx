'use client'

import React, { Suspense, useState } from 'react'
import { NeuroNoise, Waves, SimplexNoise, Voronoi } from '@paper-design/shaders-react'
import styles from './BackgroundVariants.module.scss'

type BackgroundType = 'mesh' | 'aurora' | 'flow' | 'noise' | 'voronoi'

interface BackgroundVariantsProps {
  className?: string
  children?: React.ReactNode
  variant?: BackgroundType
  showToggle?: boolean
}

const backgroundComponents = {
  aurora: (
    <NeuroNoise
      className={styles.shader}
    />
  ),
  flow: (
    <Waves
      className={styles.shader}
    />
  ),
  noise: (
    <SimplexNoise
      className={styles.shader}
    />
  ),
  voronoi: (
    <Voronoi
      className={styles.shader}
    />
  ),
}

export default function BackgroundVariants({ 
  className = '', 
  children, 
  variant = 'aurora',
  showToggle = false 
}: BackgroundVariantsProps) {
  const [currentVariant, setCurrentVariant] = useState<BackgroundType>(variant)

  const handleVariantChange = (newVariant: BackgroundType) => {
    setCurrentVariant(newVariant)
    // Track background change
    if (typeof window !== 'undefined' && window.track) {
      window.track('background_change', {
        category: 'ui',
        label: newVariant
      })
    }
  }

  return (
    <div className={`${styles.container} ${className}`}>
      {/* Fallback background */}
      <div className={styles.fallback} />
      
      {/* Active shader */}
      <Suspense fallback={null}>
        {currentVariant !== 'mesh' && backgroundComponents[currentVariant]}
      </Suspense>

      {/* Background toggle controls */}
      {showToggle && (
        <div className={styles.toggle} role="region" aria-label="Background options">
          <button
            onClick={() => handleVariantChange('aurora')}
            className={currentVariant === 'aurora' ? styles.active : ''}
            aria-label="Aurora background"
          >
            Aurora
          </button>
          <button
            onClick={() => handleVariantChange('flow')}
            className={currentVariant === 'flow' ? styles.active : ''}
            aria-label="Flow background"
          >
            Flow
          </button>
          <button
            onClick={() => handleVariantChange('noise')}
            className={currentVariant === 'noise' ? styles.active : ''}
            aria-label="Noise background"
          >
            Noise
          </button>
          <button
            onClick={() => handleVariantChange('voronoi')}
            className={currentVariant === 'voronoi' ? styles.active : ''}
            aria-label="Voronoi background"
          >
            Voronoi
          </button>
        </div>
      )}

      {/* Content */}
      {children && (
        <div className={styles.content}>
          {children}
        </div>
      )}
    </div>
  )
}