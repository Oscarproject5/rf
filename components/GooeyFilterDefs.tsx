'use client'

import React from 'react'

export default function GooeyFilterDefs() {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
      <defs>
        {/* Gooey filter for morphing effects */}
        <filter id="gooey" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feColorMatrix 
            in="blur" 
            mode="matrix" 
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" 
            result="goo" 
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>

        {/* Enhanced gooey effect for buttons */}
        <filter id="gooey-button" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feColorMatrix 
            in="blur" 
            mode="matrix" 
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10" 
            result="goo" 
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>

        {/* Subtle gooey effect for navigation */}
        <filter id="gooey-nav" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feColorMatrix 
            in="blur" 
            mode="matrix" 
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 15 -6" 
            result="goo" 
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>

        {/* Liquid cursor effect */}
        <filter id="liquid" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feColorMatrix 
            in="blur" 
            mode="matrix" 
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -12" 
            result="liquid" 
          />
          <feComposite in="SourceGraphic" in2="liquid" operator="atop" />
        </filter>

        {/* Gradient definitions */}
        <linearGradient id="buttonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#9333ea" />
        </linearGradient>

        <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#9333ea" stopOpacity="0" />
        </radialGradient>

        {/* Drop shadow filters */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#8b5cf6" floodOpacity="0.6"/>
        </filter>

        <filter id="subtle-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#8b5cf6" floodOpacity="0.3"/>
        </filter>
      </defs>
    </svg>
  )
}