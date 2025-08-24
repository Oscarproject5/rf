'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface PullToRefreshOptions {
  onRefresh: () => Promise<void> | void
  threshold?: number
  maxDistance?: number
  resistance?: number
  disabled?: boolean
}

interface PullToRefreshState {
  isPulling: boolean
  isRefreshing: boolean
  pullDistance: number
  canRefresh: boolean
}

export function usePullToRefresh(options: PullToRefreshOptions) {
  const {
    onRefresh,
    threshold = 80,
    maxDistance = 120,
    resistance = 2.5,
    disabled = false
  } = options

  const [state, setState] = useState<PullToRefreshState>({
    isPulling: false,
    isRefreshing: false,
    pullDistance: 0,
    canRefresh: false
  })

  const startY = useRef<number>(0)
  const currentY = useRef<number>(0)
  const containerRef = useRef<HTMLElement | null>(null)

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (disabled || state.isRefreshing) return
    
    // Only trigger if at top of page
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    if (scrollTop > 0) return

    startY.current = e.touches[0].clientY
    currentY.current = startY.current

    setState(prev => ({
      ...prev,
      isPulling: true
    }))
  }, [disabled, state.isRefreshing])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!state.isPulling || disabled || state.isRefreshing) return

    currentY.current = e.touches[0].clientY
    const deltaY = currentY.current - startY.current

    // Only pull down
    if (deltaY <= 0) return

    // Apply resistance
    const pullDistance = Math.min(deltaY / resistance, maxDistance)
    const canRefresh = pullDistance >= threshold

    setState(prev => ({
      ...prev,
      pullDistance,
      canRefresh
    }))

    // Prevent default scrolling when pulling
    if (deltaY > 10) {
      e.preventDefault()
    }
  }, [state.isPulling, disabled, state.isRefreshing, resistance, maxDistance, threshold])

  const handleTouchEnd = useCallback(async () => {
    if (!state.isPulling || disabled) return

    setState(prev => ({
      ...prev,
      isPulling: false
    }))

    if (state.canRefresh && !state.isRefreshing) {
      setState(prev => ({
        ...prev,
        isRefreshing: true,
        pullDistance: threshold // Keep at threshold during refresh
      }))

      try {
        await onRefresh()
      } finally {
        setState(prev => ({
          ...prev,
          isRefreshing: false,
          pullDistance: 0,
          canRefresh: false
        }))
      }
    } else {
      // Animate back to 0
      const animate = () => {
        setState(prev => {
          const newDistance = Math.max(0, prev.pullDistance - 5)
          if (newDistance > 0) {
            requestAnimationFrame(animate)
          }
          return {
            ...prev,
            pullDistance: newDistance,
            canRefresh: false
          }
        })
      }
      requestAnimationFrame(animate)
    }
  }, [state.isPulling, state.canRefresh, state.isRefreshing, disabled, onRefresh, threshold])

  useEffect(() => {
    const container = containerRef.current || document.body

    container.addEventListener('touchstart', handleTouchStart, { passive: false })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })
    container.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd])

  const attachContainer = useCallback((element: HTMLElement | null) => {
    containerRef.current = element
  }, [])

  return {
    ...state,
    attachContainer,
    progress: Math.min(state.pullDistance / threshold, 1)
  }
}