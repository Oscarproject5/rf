'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import styles from './MagneticButton.module.scss'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  ariaLabel?: string
}

export default function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  ariaLabel
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (disabled || prefersReducedMotion) return
    
    const button = buttonRef.current
    if (!button) return

    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    // Apply magnetic effect with reduced intensity
    setPosition({ x: x * 0.3, y: y * 0.3 })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setPosition({ x: 0, y: 0 })
  }

  const handleClick = () => {
    if (onClick && !disabled) {
      onClick()
      
      // Track button click
      if (typeof window !== 'undefined' && window.track) {
        window.track('cta_click', {
          category: 'conversion',
          label: ariaLabel || 'magnetic_button'
        })
      }
    }
  }

  const buttonClasses = clsx(
    styles.magneticButton,
    styles[variant],
    styles[size],
    {
      [styles.disabled]: disabled,
      [styles.hovered]: isHovered
    },
    className
  )

  const motionProps = {
    animate: prefersReducedMotion 
      ? {} 
      : { 
          x: position.x, 
          y: position.y,
          scale: isHovered ? 1.05 : 1
        },
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      mass: 0.8
    },
    whileTap: prefersReducedMotion ? {} : { scale: 0.95 }
  }

  // Render as link if href is provided
  if (href && !disabled) {
    return (
      <motion.a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={buttonClasses}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        aria-label={ariaLabel}
        {...motionProps}
      >
        <span className={styles.content}>
          {children}
        </span>
        
        {/* Glow effect */}
        {!prefersReducedMotion && (
          <motion.div
            className={styles.glow}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1.2 : 0.8
            }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.a>
    )
  }

  // Render as button
  return (
    <motion.button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      className={buttonClasses}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel}
      {...motionProps}
    >
      <span className={styles.content}>
        {children}
      </span>
      
      {/* Glow effect */}
      {!prefersReducedMotion && (
        <motion.div
          className={styles.glow}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1.2 : 0.8
          }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  )
}