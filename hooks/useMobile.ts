'use client'

import { useEffect, useState, useCallback, useRef } from 'react'

interface MobileDetection {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isTouchDevice: boolean
  isIOS: boolean
  isAndroid: boolean
  isSafari: boolean
  isChrome: boolean
  screenSize: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  orientation: 'portrait' | 'landscape'
  hasNotch: boolean
  supportsHover: boolean
}

export function useMobile(): MobileDetection {
  const [detection, setDetection] = useState<MobileDetection>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isTouchDevice: false,
    isIOS: false,
    isAndroid: false,
    isSafari: false,
    isChrome: false,
    screenSize: 'lg',
    orientation: 'portrait',
    hasNotch: false,
    supportsHover: false,
  })
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const detectDevice = useCallback(() => {
    if (typeof window === 'undefined') return

    const width = window.innerWidth
    const height = window.innerHeight
    const userAgent = navigator.userAgent.toLowerCase()

    // Screen size detection
    let screenSize: MobileDetection['screenSize'] = 'lg'
    if (width < 640) screenSize = 'sm'
    else if (width < 768) screenSize = 'md'
    else if (width < 1024) screenSize = 'lg'
    else if (width < 1280) screenSize = 'xl'
    else screenSize = '2xl'

    // Device type detection
    const isMobile = width <= 768 || /android|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
    const isTablet = width > 768 && width <= 1024 && /ipad|tablet|kindle|playbook|silk/i.test(userAgent)
    const isDesktop = !isMobile && !isTablet

    // Touch detection
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    // OS detection
    const isIOS = /iphone|ipad|ipod/i.test(userAgent)
    const isAndroid = /android/i.test(userAgent)

    // Browser detection
    const isSafari = /safari/i.test(userAgent) && !/chrome/i.test(userAgent)
    const isChrome = /chrome/i.test(userAgent)

    // Orientation
    const orientation = width > height ? 'landscape' : 'portrait'

    // Notch detection (iOS safe area)
    const hasNotch = isIOS && (
      // iPhone X and newer have safe area insets
      CSS.supports('padding: max(0px)') || 
      // Fallback detection
      (width === 375 && height === 812) || // iPhone X/XS
      (width === 414 && height === 896) || // iPhone XR/11
      (width === 390 && height === 844) || // iPhone 12/13 Mini
      (width === 393 && height === 852)    // iPhone 14/15
    )

    // Hover support detection
    const supportsHover = window.matchMedia('(hover: hover)').matches

    setDetection({
      isMobile,
      isTablet,
      isDesktop,
      isTouchDevice,
      isIOS,
      isAndroid,
      isSafari,
      isChrome,
      screenSize,
      orientation,
      hasNotch,
      supportsHover,
    })
  }, [])

  useEffect(() => {
    detectDevice()

    // Debounced resize handler for better performance
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
      resizeTimeoutRef.current = setTimeout(() => {
        detectDevice()
      }, 150) // Debounce for 150ms
    }

    const handleOrientationChange = () => {
      // Add small delay for orientation change
      setTimeout(detectDevice, 100)
    }

    window.addEventListener('resize', handleResize, { passive: true })
    window.addEventListener('orientationchange', handleOrientationChange, { passive: true })

    return () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleOrientationChange)
    }
  }, [detectDevice])

  return detection
}