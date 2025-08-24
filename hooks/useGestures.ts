'use client'

import { useEffect, useRef, useCallback } from 'react'

interface GestureHandlers {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  onPinch?: (scale: number) => void
  onPinchStart?: () => void
  onPinchEnd?: () => void
  onLongPress?: () => void
  onTap?: () => void
  onDoubleTap?: () => void
}

interface GestureConfig {
  swipeThreshold?: number
  longPressDelay?: number
  pinchThreshold?: number
  doubleTapDelay?: number
}

export function useGestures(
  handlers: GestureHandlers = {},
  config: GestureConfig = {}
) {
  const {
    swipeThreshold = 50,
    longPressDelay = 500,
    pinchThreshold = 0.1,
    doubleTapDelay = 300
  } = config

  const elementRef = useRef<HTMLElement | null>(null)
  const touchStart = useRef<{ x: number; y: number; time: number } | null>(null)
  const longPressTimer = useRef<NodeJS.Timeout | null>(null)
  const lastTap = useRef<number>(0)
  const initialDistance = useRef<number>(0)
  const currentScale = useRef<number>(1)

  // Calculate distance between two touch points
  const getDistance = useCallback((touch1: Touch, touch2: Touch) => {
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) + 
      Math.pow(touch2.clientY - touch1.clientY, 2)
    )
  }, [])

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0]
    const now = Date.now()

    // Handle multi-touch (pinch)
    if (e.touches.length === 2) {
      initialDistance.current = getDistance(e.touches[0], e.touches[1])
      handlers.onPinchStart?.()
      return
    }

    // Single touch
    touchStart.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: now
    }

    // Start long press timer
    longPressTimer.current = setTimeout(() => {
      handlers.onLongPress?.()
    }, longPressDelay)

  }, [handlers, longPressDelay, getDistance])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!touchStart.current) return

    // Clear long press timer on move
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }

    // Handle pinch
    if (e.touches.length === 2) {
      const currentDistance = getDistance(e.touches[0], e.touches[1])
      const scale = currentDistance / initialDistance.current
      
      if (Math.abs(scale - currentScale.current) > pinchThreshold) {
        currentScale.current = scale
        handlers.onPinch?.(scale)
      }
      return
    }

    // Prevent default scrolling during gestures
    if (e.touches.length === 1) {
      const touch = e.touches[0]
      const deltaX = touch.clientX - touchStart.current.x
      const deltaY = touch.clientY - touchStart.current.y
      
      // If significant movement, prevent default
      if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
        e.preventDefault()
      }
    }
  }, [touchStart, handlers, getDistance, pinchThreshold])

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    // Clear long press timer
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }

    // Handle pinch end
    if (e.touches.length === 0 && currentScale.current !== 1) {
      handlers.onPinchEnd?.()
      currentScale.current = 1
      return
    }

    if (!touchStart.current || e.touches.length > 0) return

    const touch = e.changedTouches[0]
    const deltaX = touch.clientX - touchStart.current.x
    const deltaY = touch.clientY - touchStart.current.y
    const deltaTime = Date.now() - touchStart.current.time

    // Check for swipe
    if (Math.abs(deltaX) > swipeThreshold || Math.abs(deltaY) > swipeThreshold) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 0) {
          handlers.onSwipeRight?.()
        } else {
          handlers.onSwipeLeft?.()
        }
      } else {
        // Vertical swipe
        if (deltaY > 0) {
          handlers.onSwipeDown?.()
        } else {
          handlers.onSwipeUp?.()
        }
      }
    } else if (deltaTime < 200) {
      // Quick tap - check for double tap
      const now = Date.now()
      if (now - lastTap.current < doubleTapDelay) {
        handlers.onDoubleTap?.()
        lastTap.current = 0 // Reset to prevent triple tap
      } else {
        lastTap.current = now
        // Delay single tap to allow for double tap detection
        setTimeout(() => {
          if (lastTap.current === now) {
            handlers.onTap?.()
          }
        }, doubleTapDelay)
      }
    }

    touchStart.current = null
  }, [touchStart, handlers, swipeThreshold, doubleTapDelay])

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    element.addEventListener('touchstart', handleTouchStart, { passive: false })
    element.addEventListener('touchmove', handleTouchMove, { passive: false })
    element.addEventListener('touchend', handleTouchEnd, { passive: false })

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
      
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current)
      }
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd])

  const attachGestures = useCallback((element: HTMLElement | null) => {
    elementRef.current = element
  }, [])

  return { ref: attachGestures }
}