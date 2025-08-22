'use client'

import React from 'react'
import { motion } from 'framer-motion'
import styles from './DropletMorph.module.scss'

interface DropletMorphProps {
  className?: string
  isActive?: boolean
}

export default function DropletMorph({ 
  className = '', 
  isActive = false
}: DropletMorphProps) {
  // Droplet path variations for morphing
  const dropletPaths = {
    initial: "M50,20 Q30,40 50,80 Q70,40 50,20 Z",
    stretched: "M50,15 Q25,35 50,85 Q75,35 50,15 Z", 
    compressed: "M50,25 Q35,45 50,75 Q65,45 50,25 Z"
  }
  
  // Animation variants
  const dropletVariants = {
    initial: {
      scale: 0,
      opacity: 0,
      y: -20,
      rotateZ: 0
    },
    forming: {
      scale: [0, 0.3, 0.7, 1.3, 0.95, 1.05, 1],
      opacity: [0, 0.4, 0.7, 0.9, 1, 1, 1],
      y: [-20, -15, -8, -3, 2, -1, 0],
      rotateZ: [0, -5, 3, -2, 1, 0, 0],
      transition: {
        duration: 2.2,
        ease: [0.68, -0.55, 0.265, 1.55],
        times: [0, 0.15, 0.35, 0.55, 0.75, 0.9, 1]
      }
    },
    traveling: {
      x: [0, 100, 200],
      scale: [1, 0.8, 1.1, 1],
      transition: {
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.5, 0.8, 1]
      }
    },
    purified: {
      scale: 1.1,
      filter: "brightness(1.3) saturate(1.2)",
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }
  
  const pathVariants = {
    initial: {
      d: "M50,50 Q50,50 50,50 Q50,50 50,50 Z"
    },
    forming: {
      d: [
        "M50,50 Q50,50 50,50 Q50,50 50,50 Z",
        "M50,30 Q40,35 50,60 Q60,35 50,30 Z", 
        "M50,25 Q35,30 50,70 Q65,30 50,25 Z",
        dropletPaths.stretched,
        dropletPaths.compressed,
        dropletPaths.initial
      ],
      transition: {
        duration: 2.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        times: [0, 0.2, 0.4, 0.6, 0.8, 1]
      }
    },
    morphing: {
      d: [
        dropletPaths.initial,
        dropletPaths.stretched,
        dropletPaths.compressed,
        dropletPaths.initial
      ],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        times: [0, 0.3, 0.7, 1]
      }
    }
  }
  
  // Wireframe outline variants
  const wireframeVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
      strokeDasharray: "0 1000"
    },
    drawing: {
      pathLength: [0, 1],
      opacity: [0, 0.8, 0.6],
      strokeDasharray: ["0 1000", "100 0"],
      transition: {
        duration: 1.8,
        ease: "easeInOut",
        delay: 0.8,
        times: [0, 0.7, 1]
      }
    }
  }
  
  const getCurrentState = () => {
    return isActive ? 'forming' : 'initial'
  }
  
  return (
    <motion.div
      className={`${styles.droplet} ${className}`}
      variants={dropletVariants}
      initial="initial"
      animate={getCurrentState()}
    >
      <svg
        viewBox="0 0 100 100"
        className={styles.dropletSvg}
        aria-hidden="true"
      >
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="dropletGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
          </linearGradient>
          
          <filter id="dropletGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="dropletHighlight" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="#8b5cf6" floodOpacity="0.3"/>
          </filter>
        </defs>
        
        {/* Main droplet path */}
        <motion.path
          variants={pathVariants}
          initial="initial"
          animate={isActive ? "forming" : "initial"}
          fill="url(#dropletGradient)"
          filter="url(#dropletGlow)"
          className={styles.dropletPath}
        />
        
        {/* Wireframe outline */}
        <motion.path
          d={dropletPaths.initial}
          fill="none"
          stroke="#ffffff"
          strokeWidth="1"
          strokeOpacity="0.6"
          variants={wireframeVariants}
          initial="hidden"
          animate={isActive ? "drawing" : "hidden"}
          className={styles.wireframe}
        />
        
        {/* Highlight dot */}
        <motion.circle
          cx="45"
          cy="35"
          r="3"
          fill="#ffffff"
          opacity="0.8"
          initial={{ scale: 0, opacity: 0 }}
          animate={isActive ? { 
            scale: [0, 2, 1.2, 1], 
            opacity: [0, 0.9, 1, 0.8],
            x: [0, -2, 1, 0],
            y: [0, -3, 1, 0],
            transition: { duration: 1.5, delay: 1.2 }
          } : { scale: 0, opacity: 0 }}
        />
        
        {/* Additional creation particles */}
        {[...Array(3)].map((_, i) => (
          <motion.circle
            key={i}
            cx={40 + i * 5}
            cy={30 + i * 2}
            r="1"
            fill="#a78bfa"
            initial={{ scale: 0, opacity: 0 }}
            animate={isActive ? {
              scale: [0, 1.5, 0],
              opacity: [0, 0.7, 0],
              y: [0, -10, -20],
              transition: {
                duration: 1,
                delay: 0.4 + i * 0.1,
                ease: "easeOut"
              }
            } : { scale: 0, opacity: 0 }}
          />
        ))}
        
      </svg>
      
    </motion.div>
  )
}