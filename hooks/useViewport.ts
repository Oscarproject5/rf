'use client'

import { useEffect, useState } from 'react'

interface ViewportSize {
  width: number
  height: number
  scrollY: number
  scrollX: number
  innerHeight: number
  innerWidth: number
  outerHeight: number
  outerWidth: number
  safeAreaTop: number
  safeAreaBottom: number
  safeAreaLeft: number
  safeAreaRight: number
  isScrollingDown: boolean
  isScrollingUp: boolean
  scrollDirection: 'up' | 'down' | 'none'
}

export function useViewport() {
  const [viewport, setViewport] = useState<ViewportSize>({
    width: 0,
    height: 0,
    scrollY: 0,
    scrollX: 0,
    innerHeight: 0,
    innerWidth: 0,
    outerHeight: 0,
    outerWidth: 0,
    safeAreaTop: 0,
    safeAreaBottom: 0,
    safeAreaLeft: 0,
    safeAreaRight: 0,
    isScrollingDown: false,
    isScrollingUp: false,
    scrollDirection: 'none'
  })

  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    let ticking = false

    const updateViewport = () => {
      if (typeof window === 'undefined') return

      const currentScrollY = window.scrollY
      const scrollDirection = currentScrollY > lastScrollY ? 'down' : currentScrollY < lastScrollY ? 'up' : 'none'

      // Get safe area insets from CSS environment variables
      const safeAreaTop = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('env(safe-area-inset-top)').replace('px', '')) || 0
      const safeAreaBottom = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('env(safe-area-inset-bottom)').replace('px', '')) || 0
      const safeAreaLeft = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('env(safe-area-inset-left)').replace('px', '')) || 0
      const safeAreaRight = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('env(safe-area-inset-right)').replace('px', '')) || 0

      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
        scrollY: currentScrollY,
        scrollX: window.scrollX,
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth,
        outerHeight: window.outerHeight,
        outerWidth: window.outerWidth,
        safeAreaTop,
        safeAreaBottom,
        safeAreaLeft,
        safeAreaRight,
        isScrollingDown: scrollDirection === 'down',
        isScrollingUp: scrollDirection === 'up',
        scrollDirection
      })

      setLastScrollY(currentScrollY)
      ticking = false
    }

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateViewport)
        ticking = true
      }
    }

    const handleResize = () => requestTick()
    const handleScroll = () => requestTick()
    const handleOrientationChange = () => {
      setTimeout(requestTick, 100) // Delay for orientation change
    }

    // Initial update
    updateViewport()

    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('orientationchange', handleOrientationChange)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('orientationchange', handleOrientationChange)
    }
  }, [lastScrollY])

  return viewport
}